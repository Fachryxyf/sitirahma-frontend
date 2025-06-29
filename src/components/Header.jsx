// src/components/Header.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBookReader, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsMenuOpen(false); // Tutup menu saat logout
    navigate('/login');
  };
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <FaBookReader className="logo-icon" />
          <span className="logo-text">Perpustakaan Digital</span>
        </div>
        
        {/* Navigasi untuk Desktop */}
        <nav className="main-nav-desktop">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Pencarian</NavLink>
          <NavLink to="/tentang" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tentang</NavLink>
          <NavLink to="/info-sistem" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Info Sistem</NavLink>
          <NavLink to="/tutorial" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tutorial</NavLink>
          <NavLink to="/credits" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Credits</NavLink>
        </nav>
        
        {/* Tombol Logout untuk Desktop */}
        <div className="logout-wrapper-desktop">
            <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </div>

        {/* Tombol Hamburger untuk Mobile */}
        <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Overlay untuk Mobile */}
        {isMenuOpen && (
          <div className="mobile-nav-overlay">
            <nav className="mobile-nav-links">
              <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Pencarian</NavLink>
              <NavLink to="/tentang" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tentang</NavLink>
              <NavLink to="/info-sistem" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Info Sistem</NavLink>
              <NavLink to="/tutorial" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tutorial</NavLink>
              <NavLink to="/credits" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Credits</NavLink>
            </nav>
            <button onClick={handleLogout} className="logout-button-mobile">
                Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;