// src/pages/TutorialPage.jsx

import React from 'react';
import { FaSignInAlt, FaSearch, FaFilePdf } from 'react-icons/fa';
import './ContentPage.css';

const TutorialPage = () => {
  return (
    <div className="content-page-wrapper">
      <h1>Tutorial Penggunaan Sistem</h1>

      <div className="content-card" style={{ animationDelay: '0.1s' }}>
        <div className="card-header">
          <FaSignInAlt className="card-header-icon" />
          <h2>Langkah 1: Login & Navigasi</h2>
        </div>
        <p>Gunakan username <strong>admin</strong> dan password <strong>password123</strong> untuk masuk. Setelah login, Anda dapat menggunakan menu navigasi di bagian atas untuk berpindah antar halaman. Untuk keluar, gunakan tombol "Logout".</p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.2s' }}>
        <div className="card-header">
          <FaSearch className="card-header-icon" />
          <h2>Langkah 2: Pencarian & Hasil</h2>
        </div>
        <p>Pada halaman "Pencarian", masukkan kata kunci atau topik yang relevan (contoh: <code>sejarah kerajaan</code>) lalu klik "Cari". Hasil akan ditampilkan dalam bentuk kartu buku, diurutkan berdasarkan skor relevansi tertinggi. Klik "Baca Selengkapnya" untuk melihat detail buku.</p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.3s' }}>
        <div className="card-header">
          <FaFilePdf className="card-header-icon" />
          <h2>Langkah 3: Laporan Analisis</h2>
        </div>
        <p>Setelah melakukan pencarian, sebuah tombol untuk mengunduh laporan PDF akan muncul. Laporan ini berisi ringkasan hasil pencarian dan analisis bobot kata kunci, sangat berguna untuk dokumentasi penelitian Anda.</p>
      </div>
    </div>
  );
};

export default TutorialPage;