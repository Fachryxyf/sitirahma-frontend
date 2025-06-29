import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaBookOpen, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import './LoginPage.css';
import DialogBox from '../components/DialogBox';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({ isOpen: false, message: '', type: 'info' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password123') {
      setIsLoggingIn(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setDialog({ isOpen: true, message: 'Username atau Password Salah!', type: 'error' });
    }
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, message: '', type: 'info' });
  };

  return (
    <div className="login-page-container">
      {dialog.isOpen && (
        <DialogBox
          message={dialog.message}
          type={dialog.type}
          onClose={closeDialog}
        />
      )}
      <div className="login-card">
        {isLoggingIn ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Login Berhasil!</p>
            <p className="loading-subtext">Mengalihkan ke halaman utama...</p>
          </div>
        ) : (
          <>
            <div className="login-icon-wrapper">
              <FaBookOpen />
            </div>
            <h1 className="login-title">Sistem Rekomendasi Buku</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Username"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <a href="#" className="forgot-password-link">
              Lupa Password?
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;