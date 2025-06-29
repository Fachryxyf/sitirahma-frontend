// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Impor komponen Layout
import Layout from './components/Layout.jsx';

// Impor semua halaman
import AuthPage from './pages/AuthPage.jsx'; 
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SystemInfoPage from './pages/SystemInfoPage.jsx';
import TutorialPage from './pages/TutorialPage.jsx';
import CreditsPage from './pages/CreditsPage.jsx';

function App() {
  return (
    <Routes>
      {/* Rute baru untuk otentikasi (Login & Register) */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Grup rute ini akan menggunakan Layout dengan Header & Footer */}
      <Route path="/" element={<Layout />}>
        {/* HomePage akan menjadi halaman default untuk path "/" */}
        <Route index element={<HomePage />} />
        
        {/* Halaman-halaman lainnya */}
        <Route path="tentang" element={<AboutPage />} />
        <Route path="info-sistem" element={<SystemInfoPage />} />
        <Route path="tutorial" element={<TutorialPage />} />
        <Route path="credits" element={<CreditsPage />} />
      </Route>
    </Routes>
  );
}

export default App;