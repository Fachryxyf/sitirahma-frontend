// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Perpustakaan SMPN 257 Jakarta Timur | Dibuat oleh Siti Rahmawati</p>
    </footer>
  );
};

export default Footer;