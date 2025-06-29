// src/components/BookCard.jsx
import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onReadMore }) => {
  return (
    <div className="book-card-horizontal">
      {/* Skor sekarang adalah poin, bukan persen */}
      {book.score && book.score > 0 && (
        <div className="book-card-score">
          {/* Menampilkan skor dengan 1 desimal */}
          Skor: {book.score.toFixed(1)}
        </div>
      )}

      <img 
        src={book.coverUrl} 
        alt={`Cover ${book.judul}`} 
        className="book-card-cover" 
      />
      <div className="book-card-details">
        <span className="book-card-category">{book.kategori}</span>
        <h3 className="book-card-title">{book.judul}</h3>
        <p className="book-card-author">oleh {book.penulis}</p>
        <p className="book-card-synopsis">
          {book.sinopsis.substring(0, 120)}...
        </p>
        <button onClick={() => onReadMore(book)} className="read-more-btn">
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default BookCard;