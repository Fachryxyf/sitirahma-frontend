// src/pages/AdminManageBooks.jsx

import React, { useState, useEffect, useCallback } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getAllBooks, createBook, updateBook, deleteBook, batchCreateBooks } from '../services/apiService';
import BookFormModal from '../components/BookFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingModal from '../components/LoadingModal';
import DialogBox from '../components/DialogBox';
import { FaEdit, FaTrash, FaPlus, FaDownload, FaUpload } from 'react-icons/fa';
import './AdminManageBooks.css';

const AdminManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isConfirmUploadOpen, setIsConfirmUploadOpen] = useState(false);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false });

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
      setDialog({ isOpen: true, message: 'Gagal memuat data buku.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const closeDialog = () => setDialog({ isOpen: false });

  const handleOpenModal = (book = null) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentBook(null);
  }, []);

  const handleFormSubmit = useCallback(async (bookData) => {
    setIsSubmitting(true);
    try {
      if (currentBook && currentBook.idBuku) {
        await updateBook(currentBook.idBuku, bookData);
      } else {
        await createBook(bookData);
      }
      handleCloseModal();
      await fetchBooks();
    } catch (error) {
      console.error("Gagal menyimpan buku:", error);
      setDialog({ isOpen: true, message: 'Gagal menyimpan buku. Pastikan ID Buku unik.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [currentBook, fetchBooks, handleCloseModal]);

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsConfirmDeleteOpen(true);
  };
  
  const handleConfirmDelete = useCallback(async () => {
    if (!bookToDelete) return;
    setIsConfirmDeleteOpen(false);
    setIsSubmitting(true);
    try {
      await deleteBook(bookToDelete.idBuku);
      await fetchBooks();
    } catch (error) {
      console.error("Gagal menghapus buku:", error);
      setDialog({ isOpen: true, message: 'Gagal menghapus buku.', type: 'error' });
    } finally {
      setIsSubmitting(false);
      setBookToDelete(null);
    }
  }, [bookToDelete, fetchBooks]);

  const handleDownloadTemplate = useCallback(async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template Buku");
    worksheet.columns = [
      { header: 'idBuku', key: 'idBuku', width: 15 },
      { header: 'judul', key: 'judul', width: 40 },
      { header: 'penulis', key: 'penulis', width: 30 },
      { header: 'kategori', key: 'kategori', width: 20 },
      { header: 'penerbit', key: 'penerbit', width: 30 },
      { header: 'tahunTerbit', key: 'tahunTerbit', width: 15 },
      { header: 'jumlahHalaman', key: 'jumlahHalaman', width: 15 },
      { header: 'coverUrl', key: 'coverUrl', width: 40 },
      { header: 'sinopsis', key: 'sinopsis', width: 60 },
      { header: 'keywords', key: 'keywords', width: 40 },
    ];
    worksheet.getRow(1).font = { bold: true };
    worksheet.addRow({
      idBuku: 'B999',
      judul: 'Contoh Judul Buku',
      penulis: 'Nama Penulis',
      kategori: 'Contoh Kategori',
      penerbit: 'Contoh Penerbit',
      tahunTerbit: 2024,
      jumlahHalaman: 200,
      coverUrl: 'https://example.com/cover.jpg',
      sinopsis: 'Ini adalah contoh sinopsis singkat untuk buku.',
      keywords: 'contoh,template,buku'
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'template-buku.xlsx');
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        try {
          const buffer = reader.result;
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);
          const worksheet = workbook.getWorksheet(1);
          const jsonData = [];
          const header = worksheet.getRow(1).values.slice(1).map(h => h.toString());
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              const rowData = {};
              const rowValues = row.values.slice(1);
              header.forEach((key, index) => { rowData[key] = rowValues[index]; });
              jsonData.push(rowData);
            }
          });
          setDataToUpload(jsonData);
          setIsConfirmUploadOpen(true);
        } catch(error) {
            console.error("Gagal membaca file Excel:", error);
            setDialog({ isOpen: true, message: 'Gagal membaca file. Pastikan format sesuai template.', type: 'error' });
        }
      };
      event.target.value = null;
    }
  }, []);

  const handleConfirmUpload = useCallback(async () => {
    if (!dataToUpload || dataToUpload.length === 0) {
      setIsConfirmUploadOpen(false);
      setDialog({ isOpen: true, message: 'Tidak ada data untuk diunggah.', type: 'warning' });
      return;
    }
    setIsConfirmUploadOpen(false);
    setIsSubmitting(true);
    try {
        const processedJson = dataToUpload.map(item => ({
            ...item,
            keywords: item.keywords ? String(item.keywords).split(',').map(kw => kw.trim()) : []
        }));
        await batchCreateBooks(processedJson);
        setDialog({ isOpen: true, message: `Berhasil mengunggah ${processedJson.length} data buku!`, type: 'success' });
        await fetchBooks();
    } catch (error) {
        console.error("Gagal mengunggah data buku:", error);
        setDialog({ isOpen: true, message: 'Upload gagal. Periksa kembali data Anda.', type: 'error' });
    } finally {
        setIsSubmitting(false);
        setDataToUpload(null);
    }
  }, [dataToUpload, fetchBooks]);

  return (
    <>
      {(isSubmitting) && <LoadingModal />}
      <BookFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} bookData={currentBook} isSubmitting={isSubmitting} />
      <ConfirmDialog isOpen={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)} onConfirm={handleConfirmDelete} title="Konfirmasi Hapus" message={`Yakin ingin menghapus "${bookToDelete?.judul}"?`} />
      <ConfirmDialog isOpen={isConfirmUploadOpen} onClose={() => setIsConfirmUploadOpen(false)} onConfirm={handleConfirmUpload} title="Konfirmasi Upload" message={`Anda akan mengunggah ${dataToUpload?.length || 0} data buku. Lanjutkan?`} />
      {dialog.isOpen && <DialogBox message={dialog.message} type={dialog.type} onClose={closeDialog} />}
      
      <div className="content-page-wrapper">
        <div className="content-card">
          <div className="card-header">
            <h2>Manajemen Data Buku</h2>
            <div className="header-actions">
              <button className="action-btn download-btn" onClick={handleDownloadTemplate}>
                <FaDownload /> Download Template Batch
              </button>
              <input type="file" id="file-upload" accept=".xlsx, .xls" style={{ display: 'none' }} onChange={handleFileUpload} />
              <label htmlFor="file-upload" className="action-btn upload-btn">
                <FaUpload /> Upload File Batch
              </label>
              <button className="add-book-btn" onClick={() => handleOpenModal()}>
                <FaPlus /> Tambah Buku
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="table-container">
              <table className="books-management-table">
                <thead>
                  <tr>
                    <th>ID Buku</th>
                    <th>Judul</th>
                    <th>Penulis</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(books) && books.map((book) => (
                    <tr key={book.idBuku}>
                      <td>{book.idBuku}</td>
                      <td>{book.judul}</td>
                      <td>{book.penulis}</td>
                      <td>{book.kategori}</td>
                      <td className="action-buttons">
                        <button className="edit-btn" onClick={() => handleOpenModal(book)}><FaEdit /></button>
                        <button className="delete-btn" onClick={() => handleDeleteClick(book)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminManageBooks;