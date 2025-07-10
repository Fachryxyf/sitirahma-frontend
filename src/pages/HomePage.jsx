// src/pages/HomePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { FaFilePdf, FaSyncAlt } from 'react-icons/fa';
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

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    const lastSearchIds = user ? JSON.parse(localStorage.getItem(`last_search_${user.username}`)) : null;
    
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
  }, [user]);

  useEffect(() => {
    if (user) {
        loadInitialData();
    }
  }, [user, loadInitialData]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      loadInitialData();
      setSearchResult(null);
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

  const handleResetSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    loadInitialData();
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

  const handleDownloadReport = () => {
    if (searchResult && searchResult.sortedBooks.length > 0) {
      generatePdfReport(searchResult);
    } else {
      setDialog({ isOpen: true, message: 'Lakukan pencarian yang menghasilkan data sebelum membuat laporan.', type: 'info' });
    }
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
            <button type="button" onClick={handleResetSearch} className="reset-button" title="Reset Pencarian">
                <FaSyncAlt />
            </button>
          </form>
          
          {searchResult && searchResult.sortedBooks && searchResult.sortedBooks.length > 0 && user?.role === 'ROLE_ADMIN' && (
            <button 
              onClick={handleDownloadReport} 
              className="download-report-button"
            >
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
            displayedBooks.length > 0 ? (
              <div className="books-grid-horizontal">
                {/* PERBAIKAN UTAMA DI SINI */}
                {displayedBooks.map((book) => (
                  <BookCard
                    key={book.idBuku}      
                    book={book} // Mengirim seluruh objek buku
                    onReadMore={() => handleReadMore(book)}
                  />
                ))}
              </div>
            ) : (
              <div className="no-books-container">
                <p className="no-books-message">
                  Tidak ada buku untuk ditampilkan. Coba lakukan pencarian baru di atas.
                </p>
              </div>
            )
          )}
        </section>
      </main>

      <BookDetailModal book={selectedBook} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;