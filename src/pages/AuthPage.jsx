// src/pages/AuthPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../components/DialogBox';
import './AuthPage.css';

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  
  // State untuk form (tidak berubah)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });
  const navigate = useNavigate();

  const closeDialog = () => setDialog({ isOpen: false, message: '', type: 'info' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setDialog({ isOpen: true, message: 'Harap isi semua field.', type: 'warning' });
      return;
    }
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      setDialog({ isOpen: true, message: 'Harap isi semua field.', type: 'warning' });
      return;
    }
    setDialog({ isOpen: true, message: 'Registrasi Berhasil! Silakan Login.', type: 'success' });
    setIsRightPanelActive(false);
  };

  return (
    <div className="auth-body">
      {dialog.isOpen && <DialogBox message={dialog.message} type={dialog.type} onClose={closeDialog} />}

      <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
        
        {/* Form Pendaftaran */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister} noValidate>
            <h1>Buat Akun</h1>
            <input type="text" placeholder="Nama Lengkap" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
            <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            <button type="submit">Daftar</button>
            {/* Link untuk mobile */}
            <p className="mobile-toggle-text">
              Sudah punya akun? <span onClick={() => setIsRightPanelActive(false)}>Login</span>
            </p>
          </form>
        </div>

        {/* Form Login */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} noValidate>
            <h1>Login Akun</h1>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <a href="#">Lupa password?</a>
            <button type="submit">Login</button>
            {/* Link untuk mobile */}
            <p className="mobile-toggle-text">
              Belum punya akun? <span onClick={() => setIsRightPanelActive(true)}>Daftar</span>
            </p>
          </form>
        </div>

        {/* Panel Overlay untuk Desktop */}
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