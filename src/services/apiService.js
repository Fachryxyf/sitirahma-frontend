// src/services/apiService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk otomatis menambahkan Token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Fungsi Otentikasi ---
export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

// --- Fungsi Pencarian Buku ---
export const searchBooks = (query) => {
  return apiClient.get(`/buku/cari`, { params: { q: query } });
};

// --- PERBAIKAN: Fungsi yang Hilang Ditambahkan di Sini ---
export const getBooksByIds = (ids) => {
  // Mengirim daftar ID di dalam body dari sebuah POST request
  return apiClient.post('/buku/batch', ids);
};

export const verifyUser = (data) => {
  return apiClient.post('/auth/verify-user', data);
};

export const resetPassword = (data) => {
  return apiClient.post('/auth/reset-password', data);
};

export default apiClient;