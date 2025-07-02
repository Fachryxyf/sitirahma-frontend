// src/components/BookDetailModal.jsx

import React from 'react';
import './BookDetailModal.css';

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-grid">
          <img src={book.coverUrl} alt={`Cover ${book.judul}`} className="detail-modal-cover" />
          <div className="detail-modal-info">
            <span className="detail-modal-category">{book.kategori}</span>
            <h2 className="detail-modal-title">{book.judul}</h2>
            <p className="detail-modal-author">oleh {book.penulis}</p>
            <hr className="detail-modal-divider" />
            <div className="detail-modal-meta">
              {/* PERUBAHAN: ID Buku dipindahkan ke atas */}
              <span><strong>ID Buku:</strong> {book.idBuku}</span>
              <span><strong>Penerbit:</strong> {book.penerbit}</span>
              <span><strong>Tahun Terbit:</strong> {book.tahunTerbit}</span>
              <span><strong>Jumlah Halaman:</strong> {book.jumlahHalaman}</span>
            </div>
          </div>
        </div>
        <div className="detail-modal-synopsis">
          <h3>Sinopsis</h3>
          <p>{book.sinopsis}</p>
        </div>
        <div className="detail-modal-footer">
          <button onClick={onClose} className="detail-modal-close-btn">Tutup</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;