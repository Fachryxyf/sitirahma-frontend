// src/pages/AuthPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../components/DialogBox';
import LoadingModal from '../components/LoadingModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { useAuth } from '../hooks/useAuth.js';
import { registerUser, loginUser } from '../services/apiService';
import './AuthPage.css';

// --- KOMPONEN FORM DIPINDAHKAN KE LUAR ---
// Ini adalah perbaikan utama untuk masalah "input satu huruf".

const LoginForm = ({ email, password, setEmail, setPassword, onSubmit, onForgot, onSwitch, isSubmitting }) => (
  <form onSubmit={onSubmit} noValidate className="auth-form-card">
    <h1>Login Akun</h1>
    <input 
      type="email" 
      placeholder="Email" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={isSubmitting}
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled={isSubmitting}
    />
    <a href="#" onClick={onForgot}>Lupa password?</a>
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? <div className="button-spinner"></div> : 'Login'}
    </button>
    <p className="mobile-toggle-text">
      Belum punya akun? <span onClick={onSwitch}>Daftar</span>
    </p>
  </form>
);

const RegisterForm = ({ name, email, password, setName, setEmail, setPassword, onSubmit, onSwitch, isSubmitting }) => (
  <form onSubmit={onSubmit} noValidate className="auth-form-card">
    <h1>Buat Akun Baru</h1>
    <input 
      type="text" 
      placeholder="Nama Lengkap" 
      value={name}
      onChange={(e) => setName(e.target.value)}
      disabled={isSubmitting}
    />
    <input 
      type="email" 
      placeholder="Email" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={isSubmitting}
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled={isSubmitting}
    />
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? <div className="button-spinner"></div> : 'Daftar'}
    </button>
    <p className="mobile-toggle-text">
      Sudah punya akun? <span onClick={onSwitch}>Login</span>
    </p>
  </form>
);


// --- KOMPONEN UTAMA ---

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });
  const navigate = useNavigate();
  const auth = useAuth();

  const closeDialog = () => setDialog({ isOpen: false, message: '', type: 'info' });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setDialog({ isOpen: true, message: 'Harap isi email dan password.', type: 'warning' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await loginUser({ email: loginEmail, password: loginPassword });
      auth.login(response.data.token);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Login Gagal. Periksa kembali email dan password Anda.';
      setDialog({ isOpen: true, message: message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      setDialog({ isOpen: true, message: 'Harap isi semua field registrasi.', type: 'warning' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
        setDialog({ isOpen: true, message: 'Format email tidak valid.', type: 'warning' });
        return;
    }
    if (registerPassword.length < 8) {
        setDialog({ isOpen: true, message: 'Password minimal harus 8 karakter.', type: 'warning' });
        return;
    }
    setIsLoading(true);
    try {
      await registerUser({ namaLengkap: registerName, email: registerEmail, password: registerPassword });
      setDialog({ isOpen: true, message: 'Registrasi Berhasil! Silakan Login.', type: 'success' });
      setIsRightPanelActive(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Registrasi gagal. Email mungkin sudah terdaftar.';
      setDialog({ isOpen: true, message: message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-body">
      {isLoading && <LoadingModal />}
      {isForgotModalOpen && <ForgotPasswordModal onClose={() => setIsForgotModalOpen(false)} />}
      {dialog.isOpen && <DialogBox message={dialog.message} type={dialog.type} onClose={closeDialog} />}
      
      <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
        {/* --- DESKTOP VIEW --- */}
        <div className="form-container sign-up-container">
          <RegisterForm 
            name={registerName}
            email={registerEmail}
            password={registerPassword}
            setName={setRegisterName}
            setEmail={setRegisterEmail}
            setPassword={setRegisterPassword}
            onSubmit={handleRegister}
            onSwitch={() => setIsRightPanelActive(false)}
            isSubmitting={isLoading}
          />
        </div>
        
        <div className="form-container sign-in-container">
          <LoginForm 
            email={loginEmail}
            password={loginPassword}
            setEmail={setLoginEmail}
            setPassword={setLoginPassword}
            onSubmit={handleLogin}
            onForgot={(e) => { e.preventDefault(); setIsForgotModalOpen(true); }}
            onSwitch={() => setIsRightPanelActive(true)}
            isSubmitting={isLoading}
          />
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Selamat Datang Kembali!</h1>
              <p>Untuk tetap terhubung, silakan login dengan akun Anda</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Halo!</h1>
              <p>Belum punya akun? Daftar sekarang dan mulai perjalanan Anda</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Daftar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;