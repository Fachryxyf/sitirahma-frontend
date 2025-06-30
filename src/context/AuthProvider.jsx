// src/context/AuthProvider.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('jwtToken');
      if (savedToken) {
        const decodedToken = jwtDecode(savedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          // PERBAIKAN: Cara membaca peran yang benar dan aman
          const userRole = decodedToken.authorities?.[0] || 'ROLE_USER';
          setUser({ username: decodedToken.sub, role: userRole });
          setToken(savedToken);
        } else {
          localStorage.removeItem('jwtToken');
        }
      }
    } catch (error) {
      console.error("Token tidak valid, menghapus token:", error);
      localStorage.removeItem('jwtToken');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem('jwtToken', jwtToken);
    const decodedToken = jwtDecode(jwtToken);
    const userRole = decodedToken.authorities?.[0] || 'ROLE_USER';
    setUser({ username: decodedToken.sub, role: userRole });
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
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