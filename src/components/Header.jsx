// src/components/Header.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBookReader, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };
  
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <FaBookReader className="logo-icon" />
          <span className="logo-text">Perpustakaan Digital</span>
        </div>
        
        {/* Navigasi Desktop (tidak berubah) */}
        <nav className="main-nav-desktop">
          {/* ... link-link NavLink ... */}
        </nav>
        <div className="logout-wrapper-desktop">
            <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </div>

        {/* Tombol Hamburger untuk Mobile */}
        <button className="hamburger-button" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {isMenuOpen && (
        <nav className="mobile-menu-dropdown">
          <NavLink to="/" end onClick={closeMenu} className="mobile-nav-link">Pencarian</NavLink>
          <NavLink to="/tentang" onClick={closeMenu} className="mobile-nav-link">Tentang</NavLink>
          <NavLink to="/info-sistem" onClick={closeMenu} className="mobile-nav-link">Info Sistem</NavLink>
          <NavLink to="/tutorial" onClick={closeMenu} className="mobile-nav-link">Tutorial</NavLink>
          <NavLink to="/credits" onClick={closeMenu} className="mobile-nav-link">Credits</NavLink>
          <hr className="mobile-menu-divider" />
          <button onClick={handleLogout} className="mobile-logout-button">Logout</button>
        </nav>
      )}
    </header>
  );
};

export default Header;