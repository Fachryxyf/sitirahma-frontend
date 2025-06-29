// src/pages/AboutPage.jsx

import React from 'react';
import { FaUniversity, FaBullseye, FaMapMarkerAlt } from 'react-icons/fa';
import './ContentPage.css'; // Menggunakan file CSS terpusat

const AboutPage = () => {
  return (
    <div className="content-page-wrapper">
      <h1>Tentang Perpustakaan SMPN 257</h1>

      <div className="content-card" style={{ animationDelay: '0.1s' }}>
        <div className="card-header">
          <FaUniversity className="card-header-icon" />
          <h2>Peran dan Visi</h2>
        </div>
        <p>
          Perpustakaan merupakan elemen fundamental dalam mendukung proses belajar mengajar di SMPN 257 Jakarta Timur. Sebagai institusi pendidikan formal, sekolah ini memanfaatkan perpustakaan sebagai pusat sumber belajar utama bagi siswa dan guru. Dengan pengelolaan yang baik dan koleksi yang terstruktur, perpustakaan bertujuan untuk memperluas wawasan serta mendukung perkembangan akademik setiap siswa.
        </p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.2s' }}>
        <div className="card-header">
          <FaBullseye className="card-header-icon" />
          <h2>Tantangan dan Solusi Digital</h2>
        </div>
        <p>
          Seiring pertumbuhan koleksi buku, muncul tantangan dalam menyediakan akses yang cepat dan tepat. Pencarian manual terbukti kurang efektif. Untuk mengatasi masalah ini, sistem perpustakaan digital ini dikembangkan dengan algoritma <strong>Content-Based Filtering</strong> untuk memberikan rekomendasi yang lebih cepat, efisien, dan tepat sasaran.
        </p>
      </div>

      <div className="content-card" style={{ animationDelay: '0.3s' }}>
        <div className="card-header">
          <FaMapMarkerAlt className="card-header-icon" />
          <h2>Lokasi</h2>
        </div>
        <p>
          <strong>Jalan Kel. Rambutan No.50, RT.4/RW.3, Rambutan, Kec. Ciracas, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13830</strong>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;