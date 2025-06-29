// src/pages/CreditsPage.jsx

import React, { useState } from 'react';
import { FaUserGraduate, FaCubes, FaCloudUploadAlt, FaBoxOpen } from 'react-icons/fa';
import Tooltip from '../components/Tooltip';
import ProfileModal from '../components/ProfileModal';
import './ContentPage.css';

// Data penjelasan untuk setiap istilah
const techDescriptions = {
  'React.js (Create React App)': 'Library JavaScript untuk membangun antarmuka pengguna, diinisiasi dengan Create React App.',
  'Spring Boot': 'Framework Java untuk membangun backend dan REST API yang tangguh.',
  'PostgreSQL': 'Sistem manajemen basis data relasional open-source yang kuat.',
  'React Router': 'Library untuk menangani navigasi dan routing di aplikasi React.',
  'Axios': 'Library untuk melakukan permintaan HTTP ke API dari sisi klien.',
  'Vercel (Frontend)': 'Platform cloud untuk hosting dan deployment otomatis aplikasi frontend.',
  'Railway (Backend)': 'Platform cloud untuk hosting dan deployment aplikasi backend.',
  'Neon (Database)': 'Platform database serverless untuk PostgreSQL.',
  'React Icons': 'Menyediakan koleksi ikon populer yang mudah digunakan di React.',
  'jsPDF & jspdf-autotable': 'Library untuk membuat file PDF secara dinamis di sisi klien.',
  'Google Fonts (Poppins)': 'Layanan penyedia font web untuk tipografi aplikasi.',
  'Picsum Photos': 'Layanan penyedia gambar placeholder untuk sampul buku.',
};

// Data untuk profil Anda
const userProfile = {
  name: 'Siti Rahmawati',
  id: '202143500668',
  major: 'Teknik Informatika',
  university: 'Universitas Indraprasta PGRI',
  photoUrl: 'https://picsum.photos/seed/profile/200/200',
  quote: 'The best way to predict the future is to create it.'
};

// Komponen helper untuk merender setiap item dengan tooltip
const TechItem = ({ term }) => (
    <Tooltip content={techDescriptions[term] || 'Deskripsi tidak tersedia.'}>
        <li className="tech-list-item">{term}</li>
    </Tooltip>
);

const CreditsPage = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    // Menggunakan React Fragment agar bisa merender modal di luar wrapper utama
    <>
      <div className="content-page-wrapper">
        <h1>Credits & Apresiasi</h1>

        <div className="content-card" style={{ animationDelay: '0.1s' }}>
          <div className="card-header">
            <FaUserGraduate className="card-header-icon" />
            <h2>Pengembang Aplikasi</h2>
          </div>
          <p>
            Aplikasi ini dirancang, dikembangkan, dan diimplementasikan oleh:
          </p>
          <p 
            className="profile-link" 
            onClick={() => setIsProfileModalOpen(true)}
            style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2980b9', cursor: 'pointer', display: 'inline-block' }}
          >
            Siti Rahmawati
          </p>
          <p>
            Proyek ini merupakan bagian dari penelitian untuk memenuhi salah satu syarat kelulusan program studi Teknik Informatika.
          </p>
        </div>

        <div className="content-card" style={{ animationDelay: '0.2s' }}>
          <div className="card-header">
            <FaCubes className="card-header-icon" />
            <h2>Teknologi & Framework</h2>
          </div>
          <ul className="tech-grid">
            <TechItem term="React.js (Create React App)" />
            <TechItem term="Spring Boot" />
            <TechItem term="PostgreSQL" />
            <TechItem term="React Router" />
            <TechItem term="Axios" />
          </ul>
        </div>

        <div className="content-card" style={{ animationDelay: '0.3s' }}>
          <div className="card-header">
            <FaCloudUploadAlt className="card-header-icon" />
            <h2>Layanan Hosting</h2>
          </div>
          <ul className="tech-grid">
            <TechItem term="Vercel (Frontend)" />
            <TechItem term="Railway (Backend)" />
            <TechItem term="Neon (Database)" />
          </ul>
        </div>
        
        <div className="content-card" style={{ animationDelay: '0.4s' }}>
          <div className="card-header">
            <FaBoxOpen className="card-header-icon" />
            <h2>Library Tambahan & Aset</h2>
          </div>
          <ul className="tech-grid">
            <TechItem term="React Icons" />
            <TechItem term="jsPDF & jspdf-autotable" />
            <TechItem term="Google Fonts (Poppins)" />
            <TechItem term="Picsum Photos" />
          </ul>
        </div>
      </div>

      {/* Render modal secara kondisional */}
      {isProfileModalOpen && <ProfileModal user={userProfile} onClose={() => setIsProfileModalOpen(false)} />}
    </>
  );
};

export default CreditsPage;