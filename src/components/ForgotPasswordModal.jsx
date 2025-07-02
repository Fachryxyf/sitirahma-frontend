// src/components/ForgotPasswordModal.jsx

import React, { useState } from 'react';
import DialogBox from './DialogBox';
import { verifyUser, resetPassword } from '../services/apiService';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });

  const closeDialog = () => setDialog({ isOpen: false, message: '', type: 'info' });

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!namaLengkap.trim() || !email.trim()) {
      setDialog({ isOpen: true, message: 'Nama Lengkap dan Email tidak boleh kosong.', type: 'warning' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyUser({ namaLengkap, email });
      if (response.data === true) {
        setStep(2);
      } else {
        setDialog({ isOpen: true, message: 'Kombinasi Nama Lengkap dan Email tidak ditemukan.', type: 'error' });
      }
    } catch (error) {
      console.error("Proses verifikasi gagal:", error);
      setDialog({ isOpen: true, message: 'Verifikasi gagal. Coba lagi nanti.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setDialog({ isOpen: true, message: 'Password baru dan konfirmasi tidak boleh kosong.', type: 'warning' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setDialog({ isOpen: true, message: 'Password baru dan konfirmasi tidak cocok.', type: 'warning' });
      return;
    }
    // PENAMBAHAN: Validasi panjang password
    if (newPassword.length < 8) {
        setDialog({ isOpen: true, message: 'Password baru minimal harus 8 karakter.', type: 'warning' });
        return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({ namaLengkap, email, newPassword });
      setDialog({ isOpen: true, message: response.data, type: 'success' });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Proses reset password gagal:", error);
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
            <p>Masukkan Nama Lengkap dan Email Anda untuk melanjutkan.</p>
            <input type="text" placeholder="Nama Lengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Verifikasi</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleReset} noValidate>
            <h2>Reset Password</h2>
            <p>Masukkan password baru untuk akun dengan email <strong>{email}</strong>.</p>
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