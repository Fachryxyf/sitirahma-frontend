import React, { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';
import apiClient from '../services/apiService'; // Impor apiClient

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = () => {
      const savedToken = localStorage.getItem('jwtToken');
      if (savedToken) {
        try {
          const decodedToken = jwtDecode(savedToken);
          // Cek jika token sudah kadaluwarsa
          if (decodedToken.exp * 1000 > Date.now()) {
            const userRole = decodedToken.authorities?.[0] || 'ROLE_USER';
            setUser({ username: decodedToken.sub, role: userRole });
            setToken(savedToken);
            // Atur token di header axios untuk sesi yang dipulihkan
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          } else {
            // Token kadaluwarsa, hapus
            localStorage.removeItem('jwtToken');
          }
        } catch (error) {
          console.error("Token tidak valid, menghapus token:", error);
          localStorage.removeItem('jwtToken');
        }
      }
      setIsLoading(false);
    };
    bootstrapAuth();
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem('jwtToken', jwtToken);
    const decodedToken = jwtDecode(jwtToken);
    const userRole = decodedToken.authorities?.[0] || 'ROLE_USER';
    setUser({ username: decodedToken.sub, role: userRole });
    setToken(jwtToken);
    // Atur token di header axios untuk permintaan selanjutnya
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
    // Hapus token dari header axios
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      logout,
      isAuthenticated: !!token,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};