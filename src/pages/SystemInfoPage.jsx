import React from 'react';
import { FaCogs, FaSitemap, FaCode, FaRocket } from 'react-icons/fa';
import Tooltip from '../components/Tooltip';
import './ContentPage.css';

const termDescriptions = {
    'Client-Server': 'Model arsitektur di mana client (browser Anda) meminta layanan dari server (aplikasi kami).',
    'API': 'Jembatan komunikasi yang memungkinkan frontend dan backend bertukar data secara terstruktur.',
    'React.js': 'Library JavaScript untuk membangun antarmuka pengguna (UI) yang interaktif dan modern.',
    'Spring Boot': 'Framework Java untuk membangun backend dan REST API yang tangguh.',
    'PostgreSQL': 'Sistem manajemen basis data relasional open-source yang canggih.',
    'Content-Based Filtering': 'Metode sistem rekomendasi yang menyarankan item berdasarkan kemiripan fitur atau konten dari item itu sendiri.',
    'Weighted Keyword Scoring': 'Pendekatan penilaian di mana skor dihitung berdasarkan bobot berbeda tergantung lokasi kata kunci.',
    'Preprocessing': 'Proses pembersihan teks (seperti menghapus tanda baca dan kata umum) agar siap dianalisis oleh algoritma.'
};

// PERBAIKAN: Komponen ini sekarang me-render <li> yang membungkus <div>
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
        <p className="card-description">
          Sistem ini dirancang menggunakan arsitektur <strong>Client-Server</strong>. Frontend berkomunikasi dengan Backend melalui <strong>API</strong> untuk bertukar data.
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
        <p className="card-description">
          Metode inti yang digunakan adalah <strong>Content-Based Filtering</strong> dengan pendekatan <strong>Weighted Keyword Scoring</strong>. Sebelum membandingkan, semua teks akan melalui proses <strong>Preprocessing</strong> untuk membersihkan data.
        </p>
        <hr className="card-divider" />
        <div className="terms-list-container">
          <h4 className="terms-list-title">Istilah Terkait:</h4>
          <ul className="terms-list">
            <TermPill term="Content-Based Filtering" />
            <TermPill term="Weighted Keyword Scoring" />
            <TermPill term="Preprocessing" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemInfoPage;