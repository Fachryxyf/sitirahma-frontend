// src/components/BookCard.jsx

import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import './BookCard.css';

const BookCard = ({ book, onReadMore }) => {
  const { user } = useAuth();

  return (
    <div className="book-card-horizontal">
      {user?.role === 'ROLE_ADMIN' && book.score > 0 && (
        <div className="book-card-score">
          Skor: {book.score.toFixed(3)}
        </div>
      )}

      <img 
        src={book.coverUrl} 
        alt={`Cover ${book.judul}`} 
        className="book-card-cover" 
      />
      <div className="book-card-details">
        <div className="book-card-header">
          <span className="book-card-category">{book.kategori}</span>
        </div>

        <h3 className="book-card-title">{book.judul}</h3>
        <p className="book-card-author">oleh {book.penulis}</p>
        
        {/* PENAMBAHAN: Menampilkan ID Buku */}
        <p className="book-card-id">ID: {book.idBuku}</p>
        
        <p className="book-card-synopsis">
          {book.sinopsis.substring(0, 100)}...
        </p>
        <button onClick={() => onReadMore(book)} className="read-more-btn">
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default BookCard;