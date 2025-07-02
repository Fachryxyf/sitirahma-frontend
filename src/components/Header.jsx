// src/components/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaBookReader, FaSignOutAlt, FaBars, FaTimes, FaUserCircle, FaCogs, FaUsersCog } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';
import LoadingModal from './LoadingModal';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isLoggingOut, setIsLoggingOut] = useState(false); 

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    
    setTimeout(() => {
      logout();
      navigate('/auth');
    }, 1000);
  };
  
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      {isLoggingOut && <LoadingModal />}

      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <FaBookReader className="logo-icon" />
              <span className="logo-text">Perpustakaan Digital</span>
            </div>
          </Link>
          
          <div className="nav-wrapper">
            <nav className="main-nav-desktop">
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Pencarian</NavLink>
              <NavLink to="/tentang" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tentang</NavLink>
              <NavLink to="/info-sistem" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Info Sistem</NavLink>
              <NavLink to="/tutorial" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tutorial</NavLink>
              <NavLink to="/credits" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Credits</NavLink>
              {user?.role === 'ROLE_USER' && (
                <NavLink to="/kuesioner" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  <FaQuestionCircle />
                  <span>Kuesioner</span>
                </NavLink>
              )}
              {user?.role === 'ROLE_ADMIN' && (
                <>
                  <NavLink to="/admin/manage-books" className={({ isActive }) => (isActive ? 'nav-link admin-link active' : 'nav-link admin-link')}>
                    <FaCogs />
                    <span>Data Buku</span>
                  </NavLink>
                  <NavLink to="/admin/manage-users" className={({ isActive }) => (isActive ? 'nav-link admin-link active' : 'nav-link admin-link')}>
                    <FaUsersCog />
                    <span>Data Pengguna</span>
                  </NavLink>
                </>
              )}
            </nav>
            
            {user && (
              <div className="profile-menu-container" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="profile-avatar-btn">
                  <FaUserCircle />
                </button>
                {isDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      Signed in as<br/>
                      <strong>{user.username}</strong>
                    </div>
                    <hr className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item" disabled={isLoggingOut}>
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
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
            
            {user?.role === 'ROLE_USER' && (
              <NavLink to="/kuesioner" onClick={closeMenu} className="mobile-nav-link">
                <FaQuestionCircle />
                <span>Kuesioner</span>
              </NavLink>
            )}
            
            {user?.role === 'ROLE_ADMIN' && (
                <>
                    <hr className="mobile-menu-divider" />
                    <NavLink to="/admin/manage-books" onClick={closeMenu} className="mobile-nav-link admin-link">
                        <FaCogs />
                        <span>Data Buku</span>
                    </NavLink>
                    <NavLink to="/admin/manage-users" onClick={closeMenu} className="mobile-nav-link admin-link">
                        <FaUsersCog />
                        <span>Data Pengguna</span>
                    </NavLink>
                </>
            )}
            
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