// src/pages/SystemInfoPage.jsx

import React from 'react';
import { FaCogs, FaSitemap, FaCode, FaRocket } from 'react-icons/fa';
import Tooltip from '../components/Tooltip'; // Impor komponen Tooltip
import './ContentPage.css';

// Data penjelasan untuk setiap istilah
const termDescriptions = {
  'Client-Server': 'Model arsitektur di mana satu program (client) meminta layanan dari program lain (server). Di sini, browser Anda adalah client.',
  'API': 'Jembatan yang memungkinkan aplikasi frontend dan backend berkomunikasi dan bertukar data.',
  'React.js': 'Library JavaScript untuk membangun antarmuka pengguna (UI) yang interaktif.',
  'Spring Boot': 'Framework Java untuk membangun backend dan REST API yang tangguh.',
  'PostgreSQL': 'Sistem manajemen basis data relasional open-source yang canggih.',
  'Content-Based Filtering': 'Metode rekomendasi yang menyarankan item berdasarkan kemiripan konten dari item itu sendiri.',
  'Weighted Keyword Scoring': 'Pendekatan penilaian di mana skor dihitung berdasarkan bobot berbeda tergantung lokasi kata kunci.',
  'TF-IDF': 'Teknik statistik untuk mengukur seberapa penting sebuah kata dalam sebuah dokumen.',
  'Tokenisasi': 'Proses memecah kalimat menjadi unit-unit kata (token).',
  'Case Folding': 'Proses mengubah semua huruf menjadi huruf kecil.',
  'Stop Word Removal': 'Proses menghapus kata-kata umum (seperti "di", "dan", "yang").',
  'Create React App': 'Tool standar untuk membuat proyek React dengan konfigurasi awal yang solid.',
  'Railway (Backend Hosting)': 'Platform cloud untuk hosting dan deployment otomatis aplikasi backend.',
  'Vercel (Frontend Hosting)': 'Platform cloud yang dioptimalkan untuk hosting aplikasi frontend modern.',
  'Neon (Database Hosting)': 'Platform database serverless untuk PostgreSQL.'
};

// Komponen kecil untuk membuat pil istilah dengan tooltip
const TermPill = ({ term }) => (
  <li>
    <Tooltip content={termDescriptions[term] || 'Deskripsi tidak tersedia.'}>
      <div className="term-pill">{term}</div>
    </Tooltip>
  </li>
);

const SystemInfoPage = () => {
  return (
    <div className="content-page-wrapper">
      <h1>Informasi Sistem & Algoritma</h1>

      <div className="content-card" style={{ animationDelay: '0.1s' }}>
        <div className="card-header">
          <FaSitemap className="card-header-icon" />
          <h2>Arsitektur Sistem</h2>
        </div>
        <p>
          Sistem ini dirancang menggunakan arsitektur <strong>client-server</strong> berbasis web. Komunikasi antara frontend dan backend dilakukan melalui protokol <strong>API</strong>, memastikan pemisahan tanggung jawab yang jelas antara tampilan dan logika.
        </p>
        <hr className="card-divider" />
        <div className="terms-list-container">
          <h4 className="terms-list-title">Istilah Terkait:</h4>
          <ul className="terms-list">
            <TermPill term="Client-Server" />
            <TermPill term="API" />
            <TermPill term="React.js" />
            <TermPill term="Spring Boot" />
            <TermPill term="PostgreSQL" />
          </ul>
        </div>
      </div>
      
      <div className="content-card" style={{ animationDelay: '0.2s' }}>
        <div className="card-header">
          <FaCogs className="card-header-icon" />
          <h2>Alur Kerja Algoritma</h2>
        </div>
        <p>
          Metode inti yang digunakan adalah <strong>Content-Based Filtering</strong>. Sistem memberikan skor relevansi berdasarkan skema pembobotan pada lokasi kecocokan kata kunci (Judul, Penulis, Keywords, dll.) dan kebaruan buku, sebuah pendekatan hibrida yang terinspirasi dari konsep <strong>TF-IDF</strong>.
        </p>
        <hr className="card-divider" />
        <div className="terms-list-container">
          <h4 className="terms-list-title">Istilah Terkait:</h4>
          <ul className="terms-list">
            <TermPill term="Content-Based Filtering" />
            <TermPill term="Weighted Keyword Scoring" />
            <TermPill term="TF-IDF" />
          </ul>
        </div>
      </div>

    </div>
  );
};

export default SystemInfoPage;