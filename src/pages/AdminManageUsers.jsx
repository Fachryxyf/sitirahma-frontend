// src/pages/AdminManageUsers.jsx

import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/apiService';
import UserFormModal from '../components/UserFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingModal from '../components/LoadingModal';
import DialogBox from '../components/DialogBox';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './AdminManageBooks.css'; // Meminjam style

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
      setDialog({ isOpen: true, message: 'Gagal memuat data pengguna.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const closeDialog = () => setDialog({ isOpen: false });

  const handleOpenFormModal = (user = null) => {
    setCurrentUser(user);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setCurrentUser(null);
  };

  const handleFormSubmit = async (userData) => {
    if (!userData.namaLengkap || !userData.email) {
      setDialog({ isOpen: true, message: 'Nama Lengkap dan Email tidak boleh kosong.', type: 'warning' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setDialog({ isOpen: true, message: 'Format email tidak valid.', type: 'warning' });
      return;
    }
    if (!currentUser && !userData.password) {
        setDialog({ isOpen: true, message: 'Password wajib diisi untuk pengguna baru.', type: 'warning' });
        return;
    }
    if (userData.password && userData.password.length < 8) {
      setDialog({ isOpen: true, message: 'Password baru minimal harus 8 karakter.', type: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (currentUser) {
        await updateUser(currentUser.id, userData);
      } else {
        await createUser(userData);
      }
      fetchUsers();
      handleCloseFormModal();
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal menyimpan pengguna.';
      setDialog({ isOpen: true, message: message, type: 'error' });
      console.error("Gagal menyimpan pengguna:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (user) => {
    if (user.email === 'admin@sekolah.id') {
        setDialog({ isOpen: true, message: 'Akun Administrator utama tidak boleh dihapus.', type: 'error' });
        return;
    }
    setUserToDelete(user);
    setIsConfirmModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setIsConfirmModalOpen(false);
    setIsLoading(true);
    try {
      await deleteUser(userToDelete.id);
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus pengguna:", error);
      setDialog({ isOpen: true, message: 'Gagal menghapus pengguna.', type: 'error' });
    } finally {
      setIsLoading(false);
      setUserToDelete(null);
    }
  };
  
  return (
    <>
      {isSubmitting && <LoadingModal />}
      <UserFormModal isOpen={isFormModalOpen} onClose={handleCloseFormModal} onSubmit={handleFormSubmit} userData={currentUser} />
      <ConfirmDialog isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleConfirmDelete} title="Konfirmasi Hapus" message={`Yakin ingin menghapus pengguna "${userToDelete?.namaLengkap}"?`} />
      {dialog.isOpen && <DialogBox message={dialog.message} type={dialog.type} onClose={closeDialog} />}
      
      <div className="content-page-wrapper">
        <div className="content-card">
          <div className="card-header">
            <h2>Manajemen Data Pengguna</h2>
            <div className="header-actions">
              <button className="add-book-btn" onClick={() => handleOpenFormModal()}>
                <FaPlus /> Tambah Pengguna
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="table-container">
              <table className="books-management-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Lengkap</th>
                    <th>Email</th>
                    <th>Peran (Role)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.namaLengkap}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className="action-buttons">
                        <button className="edit-btn" onClick={() => handleOpenFormModal(user)}><FaEdit /></button>
                        <button className="delete-btn" onClick={() => handleDeleteClick(user)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminManageUsers;