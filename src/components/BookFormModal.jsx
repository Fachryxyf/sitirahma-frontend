// src/components/BookFormModal.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Kita gunakan axios untuk upload ke Cloudinary
import './BookFormModal.css';

const BookFormModal = ({ isOpen, onClose, onSubmit, bookData, isSubmitting }) => {
  const [formData, setFormData] = useState({});
  // State baru untuk loading saat upload gambar
  const [isUploading, setIsUploading] = useState(false); 

  useEffect(() => {
    if (isOpen) {
      if (bookData) {
        // --- AWAL PERBAIKAN ---
        let keywordsArray = []; // Siapkan array kosong

        if (bookData.keywords) {
          // Cek apakah keywords sudah array, jika ya, langsung gunakan.
          // Jika tidak (berarti string), baru di-split.
          keywordsArray = Array.isArray(bookData.keywords)
            ? bookData.keywords
            : bookData.keywords.split(',');
        }
        
        setFormData({
          ...bookData,
          keywords: keywordsArray.map(kw => kw.trim()) // Pastikan setiap elemen di-trim
        });
        // --- AKHIR PERBAIKAN ---
      } else {
        setFormData({
          idBuku: '',
          judul: '',
          penulis: '',
          kategori: '',
          penerbit: '',
          tahunTerbit: new Date().getFullYear(),
          jumlahHalaman: '',
          coverUrl: '',
          sinopsis: '',
          keywords: [] // Tetap array kosong untuk buku baru
        });
      }
    }
  }, [bookData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleKeywordsChange = (e) => {
    const keywordsArray = e.target.value.split(',').map(kw => kw.trim());
    setFormData(prev => ({ ...prev, keywords: keywordsArray }));
  };

  // --- FUNGSI BARU UNTUK UPLOAD GAMBAR ---
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    setIsUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        uploadData
      );
      // Ambil URL aman dari respons Cloudinary dan set ke form
      setFormData(prev => ({ ...prev, coverUrl: response.data.secure_url }));
    } catch (error) {
      console.error("Gagal mengunggah gambar ke Cloudinary:", error);
      alert("Upload gambar gagal.");
    } finally {
      setIsUploading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || isUploading) return;
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="book-form-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{bookData ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
        <form onSubmit={handleSubmit} className="book-form-grid">
          
          <div className="form-group">
            <label htmlFor="idBuku">ID Buku</label>
            <input id="idBuku" name="idBuku" value={formData.idBuku || ''} onChange={handleChange} required disabled={!!bookData || isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="judul">Judul Buku</label>
            <input id="judul" name="judul" value={formData.judul || ''} onChange={handleChange} required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="penulis">Penulis</label>
            <input id="penulis" name="penulis" value={formData.penulis || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="kategori">Kategori</label>
            <input id="kategori" name="kategori" value={formData.kategori || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="penerbit">Penerbit</label>
            <input id="penerbit" name="penerbit" value={formData.penerbit || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="tahunTerbit">Tahun Terbit</label>
            <input id="tahunTerbit" name="tahunTerbit" value={formData.tahunTerbit || ''} onChange={handleChange} type="number" disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="jumlahHalaman">Jumlah Halaman</label>
            <input id="jumlahHalaman" name="jumlahHalaman" value={formData.jumlahHalaman || ''} onChange={handleChange} type="number" disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="coverFile">Upload Gambar Sampul (opsional)</label>
            <input id="coverFile" name="coverFile" type="file" accept="image/*" onChange={handleImageUpload} disabled={isSubmitting || isUploading} />
          </div>

          <div className="form-group">
            <label htmlFor="coverUrl">URL Gambar Sampul (otomatis terisi setelah upload)</label>
            <input id="coverUrl" name="coverUrl" value={formData.coverUrl || ''} onChange={handleChange} placeholder="https://..." disabled={isSubmitting} />
          </div>

          {isUploading && <p className="upload-status">Mengunggah gambar...</p>}
          
          <div className="form-group form-full-width">
            <label htmlFor="sinopsis">Sinopsis</label>
            <textarea id="sinopsis" name="sinopsis" value={formData.sinopsis || ''} onChange={handleChange} disabled={isSubmitting}></textarea>
          </div>
          <div className="form-group form-full-width">
            <label htmlFor="keywords">Keywords (pisahkan dengan koma)</label>
            <input id="keywords" name="keywords" value={formData.keywords?.join(', ') || ''} onChange={handleKeywordsChange} disabled={isSubmitting} />
          </div>
          
          <div className="form-actions form-full-width">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isSubmitting || isUploading}>Batal</button>
            <button type="submit" className="submit-btn" disabled={isSubmitting || isUploading}>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;