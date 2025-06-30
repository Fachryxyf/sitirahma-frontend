// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // PERBAIKAN: Tampilkan layar loading jika AuthContext masih memeriksa status login
  if (isLoading) {
    // Tampilkan komponen spinner atau null agar tidak ada yang dirender sementara
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );
  }

  // Setelah loading selesai, baru buat keputusan
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;