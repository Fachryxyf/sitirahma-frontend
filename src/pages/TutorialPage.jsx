// src/pages/TutorialPage.jsx

import React from 'react';
import { FaSignInAlt, FaSearch, FaFilePdf, FaUsersCog, FaQuestionCircle } from 'react-icons/fa';
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
        <p>Gunakan username/email dan password untuk masuk. Setelah login, Anda dapat menggunakan menu navigasi di bagian atas untuk berpindah antar halaman. Untuk keluar, klik ikon profil di pojok kanan atas lalu pilih "Logout".</p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.2s' }}>
        <div className="card-header">
          <FaSearch className="card-header-icon" />
          <h2>Langkah 2: Pencarian & Hasil</h2>
        </div>
        <p>Pada halaman "Pencarian", masukkan kata kunci atau topik yang relevan. Hasil akan diurutkan berdasarkan relevansi. Klik "Baca Selengkapnya" untuk melihat detail buku.</p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.3s' }}>
        <div className="card-header">
          <FaUsersCog className="card-header-icon" />
          <h2>Fitur Khusus Admin</h2>
        </div>
        <p>Jika Anda login sebagai Admin, Anda akan melihat menu "Data Buku" dan "Data Pengguna". Di halaman tersebut, Anda dapat menambah, mengedit, menghapus, serta mengunduh template dan mengunggah data buku secara massal via file Excel.</p>
      </div>
      
      <div className="content-card" style={{ animationDelay: '0.4s' }}>
        <div className="card-header">
          <FaFilePdf className="card-header-icon" />
          <h2>Fitur Laporan Analisis (Admin)</h2>
        </div>
        <p>Setelah melakukan pencarian, Admin akan melihat tombol untuk mengunduh laporan PDF. Laporan ini berisi analisis detail hasil pencarian, termasuk skor dan kata kunci yang cocok, yang sangat berguna untuk dokumentasi.</p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.5s' }}>
        <div className="card-header">
          <FaQuestionCircle className="card-header-icon" />
          <h2>Fitur Kuesioner (User)</h2>
        </div>
        <p>Jika Anda login sebagai User, akan muncul menu "Kuesioner". Kami sangat menghargai jika Anda bersedia mengisinya untuk membantu pengembangan sistem ini di masa depan.</p>
      </div>
    </div>
  );
};

export default TutorialPage;