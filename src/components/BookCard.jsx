// src/components/BookCard.jsx

import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import './BookCard.css';

const BookCard = ({ book, onReadMore }) => {
  const { user } = useAuth();

  // Tambahkan pengecekan untuk memastikan 'book.sinopsis' ada sebelum dipotong
  const truncatedSinopsis = book.sinopsis
    ? book.sinopsis.substring(0, 100) + '...'
    : 'Sinopsis tidak tersedia.';

  return (
    <div className="book-card-horizontal">
      {user?.role === 'ROLE_ADMIN' && book.score != null && ( // Pengecekan score lebih aman
        <div className="book-card-score">
          Skor: {book.score.toFixed(3)}
        </div>
      )}

      <img 
        src={book.coverUrl || 'https://via.placeholder.com/100x150.png?text=No+Cover'} // Fallback jika coverUrl null
        alt={`Cover ${book.judul}`} 
        className="book-card-cover" 
      />
      <div className="book-card-details">
        <div className="book-card-header">
          <span className="book-card-category">{book.kategori || 'Tanpa Kategori'}</span>
        </div>

        <h3 className="book-card-title">{book.judul}</h3>
        <p className="book-card-author">oleh {book.penulis || 'Penulis Tidak Diketahui'}</p>
        
        <p className="book-card-id">ID: {book.idBuku}</p>
        
        <p className="book-card-synopsis">
          {truncatedSinopsis} {/* Gunakan variabel yang sudah aman */}
        </p>
        
        <button onClick={() => onReadMore(book)} className="read-more-btn">
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default BookCard;