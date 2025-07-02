// src/services/apiService.js

import axios from 'axios';

// PERBAIKAN: Baca baseURL dari environment variables
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const verifyUser = (data) => {
  return apiClient.post('/auth/verify-user', data);
};

export const resetPassword = (data) => {
  return apiClient.post('/auth/reset-password', data);
};


// --- Fungsi Pencarian Buku ---
export const searchBooks = (query) => {
  return apiClient.get(`/buku/cari`, { params: { q: query } });
};

export const getBooksByIds = (ids) => {
  return apiClient.post('/buku/batch', ids);
};


// --- Fungsi Admin CRUD Buku ---
export const getAllBooks = () => {
  return apiClient.get('/admin/buku');
};

export const createBook = (bookData) => {
  return apiClient.post('/admin/buku', bookData);
};

export const updateBook = (id, bookData) => {
  return apiClient.put(`/admin/buku/${id}`, bookData);
};

export const deleteBook = (id) => {
  return apiClient.delete(`/admin/buku/${id}`);
};

// --- FUNGSI BARU ---
export const batchCreateBooks = (booksData) => {
  return apiClient.post('/admin/buku/batch', booksData);
};


// --- Fungsi Admin CRUD Pengguna ---
export const getAllUsers = () => {
  return apiClient.get('/admin/users');
};

export const createUser = (userData) => {
  return apiClient.post('/admin/users', userData);
};

export const updateUser = (id, userData) => {
  return apiClient.put(`/admin/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/admin/users/${id}`);
};


export default apiClient;