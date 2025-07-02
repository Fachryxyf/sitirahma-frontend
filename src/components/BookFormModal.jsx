// src/components/BookFormModal.jsx

import React, { useState, useEffect } from 'react';
import './BookFormModal.css';

const BookFormModal = ({ isOpen, onClose, onSubmit, bookData, isSubmitting }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (bookData) {
        setFormData({
          ...bookData,
          keywords: bookData.keywords ? bookData.keywords.split(',') : []
        });
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
          keywords: []
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
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
            <label htmlFor="coverUrl">URL Gambar Sampul</label>
            <input id="coverUrl" name="coverUrl" value={formData.coverUrl || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="form-group form-full-width">
            <label htmlFor="sinopsis">Sinopsis</label>
            <textarea id="sinopsis" name="sinopsis" value={formData.sinopsis || ''} onChange={handleChange} disabled={isSubmitting}></textarea>
          </div>
          <div className="form-group form-full-width">
            <label htmlFor="keywords">Keywords (pisahkan dengan koma)</label>
            <input id="keywords" name="keywords" value={formData.keywords?.join(', ') || ''} onChange={handleKeywordsChange} disabled={isSubmitting} />
          </div>
          <div className="form-actions form-full-width">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isSubmitting}>Batal</button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;