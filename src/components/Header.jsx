// src/components/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBookReader, FaSignOutAlt, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';
import LoadingModal from './LoadingModal'; // Impor modal loading
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State baru untuk loading saat logout
  const [isLoggingOut, setIsLoggingOut] = useState(false); 

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsLoggingOut(true); // Tampilkan modal loading
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    
    // Beri sedikit jeda agar pengguna bisa melihat loading spinner
    setTimeout(() => {
      logout();
      navigate('/auth');
      // Tidak perlu setIsLoggingOut(false) karena komponen akan unmount
    }, 1000); // Jeda 1 detik
  };
  
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Efek untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {/* Tampilkan modal loading jika sedang proses logout */}
      {isLoggingOut && <LoadingModal />}

      <header className="app-header">
        <div className="header-container">
          <div className="logo-container">
            <FaBookReader className="logo-icon" />
            <span className="logo-text">Perpustakaan Digital</span>
          </div>
          
          <div className="nav-wrapper">
            <nav className="main-nav-desktop">
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Pencarian</NavLink>
              <NavLink to="/tentang" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tentang</NavLink>
              <NavLink to="/info-sistem" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Info Sistem</NavLink>
              <NavLink to="/tutorial" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tutorial</NavLink>
              <NavLink to="/credits" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Credits</NavLink>
            </nav>
            
            <div className="profile-menu-container" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="profile-avatar-btn">
                <FaUserCircle />
              </button>

              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    Signed in as<br/>
                    <strong>{user?.username}</strong>
                  </div>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item" disabled={isLoggingOut}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="hamburger-button" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mobile-menu-dropdown">
            <NavLink to="/" end onClick={closeMenu} className="mobile-nav-link">Pencarian</NavLink>
            <NavLink to="/tentang" onClick={closeMenu} className="mobile-nav-link">Tentang</NavLink>
            <NavLink to="/info-sistem" onClick={closeMenu} className="mobile-nav-link">Info Sistem</NavLink>
            <NavLink to="/tutorial" onClick={closeMenu} className="mobile-nav-link">Tutorial</NavLink>
            <NavLink to="/credits" onClick={closeMenu} className="mobile-nav-link">Credits</NavLink>
            <hr className="mobile-menu-divider" />
            <button onClick={handleLogout} className="mobile-logout-button" disabled={isLoggingOut}>
              Logout
            </button>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;