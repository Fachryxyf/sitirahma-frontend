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
    navigate('/auth');
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
        
        <div className="nav-wrapper">
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
        </div>

        {/* Tombol Hamburger untuk Mobile */}
        <button className="hamburger-button" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Dropdown untuk Mobile (tidak berubah) */}
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