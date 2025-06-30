// src/pages/HomePage.jsx

import React, { useState, useEffect, useCallback } from 'react'; // Impor useCallback
import { FaFilePdf, FaSyncAlt } from 'react-icons/fa'; // Impor ikon reset
import { searchBooks, getBooksByIds } from '../services/apiService.js';
import { generatePdfReport } from '../services/pdfReportService.js';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import DialogBox from '../components/DialogBox';
import { useAuth } from '../hooks/useAuth.js';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Selamat Datang!");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });

  // PERBAIKAN: Logika load data awal dipisahkan agar bisa dipanggil ulang
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    const lastSearchIds = JSON.parse(localStorage.getItem(`last_search_${user?.username}`));
    
    if (lastSearchIds && lastSearchIds.length > 0) {
      try {
        setPageTitle("Berdasarkan Pencarian Terakhir Anda");
        const response = await getBooksByIds(lastSearchIds);
        setDisplayedBooks(response.data);
      } catch (error) {
        console.error("Gagal mengambil data riwayat:", error);
        setPageTitle("Selamat Datang di Perpustakaan Digital");
        setDisplayedBooks([]);
      }
    } else {
      setPageTitle("Selamat Datang di Perpustakaan Digital");
      setDisplayedBooks([]);
    }
    
    setIsLoading(false);
  }, [user]); // Dependensi pada user

  useEffect(() => {
    if (user) {
        loadInitialData();
    }
  }, [user, loadInitialData]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setDialog({ isOpen: true, message: 'Harap masukkan kata kunci pencarian.', type: 'warning' });
      return;
    }
    
    setIsLoading(true);
    setPageTitle(`Hasil Pencarian untuk "${searchQuery}"`);
    try {
      const response = await searchBooks(searchQuery);
      setDisplayedBooks(response.data);
      
      const top6Ids = response.data.slice(0, 6).map(book => book.idBuku);
      if (user) {
        localStorage.setItem(`last_search_${user.username}`, JSON.stringify(top6Ids));
      }
      
      setSearchResult({ query: searchQuery, sortedBooks: response.data });
    } catch (error) {
      console.error("Gagal melakukan pencarian:", error);
      setDialog({ isOpen: true, message: 'Terjadi kesalahan saat mencari buku.', type: 'error' });
      setDisplayedBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

    // FUNGSI BARU: Untuk mereset pencarian
  const handleResetSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    loadInitialData(); // Panggil kembali logika data awal
  };

  const handleDownloadReport = () => {
    if (searchResult && searchResult.sortedBooks.length > 0) {
      generatePdfReport(searchResult);
    } else {
      setDialog({ 
        isOpen: true, 
        message: 'Lakukan pencarian yang menghasilkan data sebelum membuat laporan.', 
        type: 'info' 
      });
    }
  };

  const handleReadMore = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, message: '', type: 'info' });
  };

  return (
    <div className="homepage-container">
      {dialog.isOpen && (
        <DialogBox
          message={dialog.message}
          type={dialog.type}
          onClose={closeDialog}
        />
      )}

      <main>
        <section className="search-section">
          <h2>Pencarian Buku</h2>
          <p>Ketik topik, judul, atau kata kunci yang relevan.</p>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Contoh: 'kerajaan nusantara' atau 'ekosistem laut'"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Cari
            </button>
            {/* TOMBOL BARU: Reset Pencarian */}
            <button type="button" onClick={handleResetSearch} className="reset-button" title="Reset Pencarian">
                <FaSyncAlt />
            </button>
          </form>
          
          {searchResult && user?.role === 'ROLE_ADMIN' && (
            <button onClick={handleDownloadReport} className="download-report-button">
              <FaFilePdf />
              <span>Download Laporan Analisis</span>
            </button>
          )}
        </section>

        <section className="results-section">
          <h2 className="results-title">{pageTitle}</h2>
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="books-grid-horizontal">
              {displayedBooks.length > 0 ? (
                displayedBooks.map((book) => (
                  <BookCard key={book.idBuku} book={book} onReadMore={handleReadMore} />
                ))
              ) : (
                <p className="no-books-message">
                  Tidak ada buku untuk ditampilkan. Coba lakukan pencarian baru di atas.
                </p>
              )}
            </div>
          )}
        </section>
      </main>

      <BookDetailModal book={selectedBook} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;