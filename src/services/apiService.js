// src/services/apiService.js

import axios from 'axios';

// Buat instance axios dengan URL dasar dari backend kita
// Pastikan backend Spring Boot Anda berjalan di port 8080
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Otomatisasi Penambahan Token JWT
// 'Interceptor' ini akan berjalan pada setiap request yang dibuat
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

// Fungsi untuk endpoint registrasi
export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

// Fungsi untuk endpoint login
export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export default apiClient;