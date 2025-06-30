// src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';

// Impor komponen Layout
import Layout from './components/Layout.jsx';

// Impor semua halaman
import AuthPage from './pages/AuthPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SystemInfoPage from './pages/SystemInfoPage.jsx';
import TutorialPage from './pages/TutorialPage.jsx';
import CreditsPage from './pages/CreditsPage.jsx';

// Komponen Penjaga yang lebih sederhana
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route 
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="tentang" element={<AboutPage />} />
        <Route path="info-sistem" element={<SystemInfoPage />} />
        <Route path="tutorial" element={<TutorialPage />} />
        <Route path="credits" element={<CreditsPage />} />
      </Route>
    </Routes>
  );
}

export default App;