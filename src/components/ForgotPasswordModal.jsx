// src/components/ForgotPasswordModal.jsx

import React, { useState } from 'react';
import DialogBox from './DialogBox';
import { verifyUser, resetPassword } from '../services/apiService';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1); // 1: verifikasi, 2: reset
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });

  const closeDialog = () => setDialog({ isOpen: false, message: '', type: 'info' });

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await verifyUser({ username, email });
      if (response.data === true) {
        setStep(2); // Lanjut ke langkah reset password
      } else {
        setDialog({ isOpen: true, message: 'Kombinasi Username dan Email tidak ditemukan.', type: 'error' });
      }
    } catch (error) {
      setDialog({ isOpen: true, message: 'Verifikasi gagal. Coba lagi nanti.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setDialog({ isOpen: true, message: 'Password baru dan konfirmasi tidak cocok.', type: 'warning' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetPassword({ username, email, newPassword });
      setDialog({ isOpen: true, message: response.data, type: 'success' });
      setTimeout(() => {
        onClose(); // Tutup modal setelah sukses
      }, 2000);
    } catch (error) {
      setDialog({ isOpen: true, message: 'Gagal mereset password.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {dialog.isOpen && <DialogBox message={dialog.message} type={dialog.type} onClose={closeDialog} />}
      <div className="forgot-password-modal" onClick={(e) => e.stopPropagation()}>
        {isLoading && <div className="loading-overlay"><div className="loading-spinner"></div></div>}
        
        {step === 1 && (
          <form onSubmit={handleVerify} noValidate>
            <h2>Verifikasi Akun</h2>
            <p>Masukkan username dan email Anda untuk melanjutkan.</p>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Verifikasi</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleReset} noValidate>
            <h2>Reset Password</h2>
            <p>Masukkan password baru Anda untuk akun <strong>{username}</strong>.</p>
            <input type="password" placeholder="Password Baru" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Konfirmasi Password Baru" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit">Ubah Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;