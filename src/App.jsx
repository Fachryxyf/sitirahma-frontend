// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Impor komponen Layout
import Layout from './components/Layout.jsx'; // Ditambahkan .jsx untuk konsistensi

// Impor semua halaman dengan ekstensi file
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SystemInfoPage from './pages/SystemInfoPage.jsx';
import TutorialPage from './pages/TutorialPage.jsx';
import CreditsPage from './pages/CreditsPage.jsx';

function App() {
  return (
    <Routes>
      {/* Rute ini tidak menggunakan Layout (Header & Footer) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Grup rute ini akan menggunakan Layout yang sama */}
      <Route path="/" element={<Layout />}>
        {/* HomePage akan menjadi halaman default untuk path "/" */}
        <Route index element={<HomePage />} />
        
        {/* Halaman-halaman lainnya */}
        <Route path="tentang" element={<AboutPage />} />
        <Route path="info-sistem" element={<SystemInfoPage />} />
        <Route path="tutorial" element={<TutorialPage />} />
        <Route path="credits" element={<CreditsPage />} />

        {/* Rute untuk halaman tidak ditemukan bisa ditambahkan di sini */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;