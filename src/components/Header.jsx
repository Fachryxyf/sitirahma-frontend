// src/components/Header.jsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Impor useNavigate
import { FaBookReader, FaSignOutAlt } from 'react-icons/fa'; // Impor ikon logout
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Di masa depan, di sini akan ada proses penghapusan token/session
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <FaBookReader className="logo-icon" />
          <span className="logo-text">Perpustakaan Digital</span>
        </div>
        
        {/* Kontainer untuk navigasi dan tombol logout */}
        <div className="nav-wrapper">
          <nav className="main-nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Pencarian
            </NavLink>
            <NavLink to="/tentang" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Tentang
            </NavLink>
            <NavLink to="/info-sistem" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Info Sistem
            </NavLink>
            <NavLink to="/tutorial" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Tutorial
            </NavLink>
            <NavLink to="/credits" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Credits
            </NavLink>
          </nav>
          
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;