// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { books as fallbackData } from '../data/books';
import { searchAndRecommend } from '../services/recommendationEngine.js';
import { generatePdfReport } from '../services/pdfReportService.js';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import DialogBox from '../components/DialogBox';
import { useAuth } from '../hooks/useAuth.js'; // Impor useAuth
import { FaFilePdf } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth(); // Dapatkan informasi pengguna dari konteks
  
  const [allBooks, setAllBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });

  useEffect(() => {
    // Logika untuk memuat data awal
    setAllBooks(fallbackData);
    setDisplayedBooks(fallbackData);
    setIsLoading(false);
  }, []);
  
  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setDialog({ isOpen: true, message: 'Harap masukkan kata kunci pencarian.', type: 'warning' });
      return;
    }
    const result = searchAndRecommend(searchQuery, allBooks);
    setDisplayedBooks(result.sortedBooks);
    setSearchResult(result);
  };

  const handleDownloadReport = () => {
    if (searchResult && searchResult.sortedBooks.length > 0) {
      generatePdfReport(searchResult);
    } else {
      setDialog({ isOpen: true, message: 'Lakukan pencarian yang menghasilkan data sebelum membuat laporan.', type: 'info' });
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

      {/* Header sudah ada di komponen Layout */}
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
          </form>
          
          {/* PERUBAHAN: Tombol download hanya muncul jika ada hasil DAN peran adalah ADMIN */}
          {searchResult && user?.role === 'ROLE_ADMIN' && (
            <button onClick={handleDownloadReport} className="download-report-button">
              <FaFilePdf />
              <span>Download Laporan Analisis</span>
            </button>
          )}
        </section>

        <section className="results-section">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="books-grid-horizontal">
              {displayedBooks.length > 0 ? (
                displayedBooks.map((book) => (
                  <BookCard key={book.id_buku} book={book} onReadMore={handleReadMore} />
                ))
              ) : (
                <p>Tidak ada buku yang ditemukan untuk kata kunci ini.</p>
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