// src/components/DialogBox.jsx

import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
// Kita akan buat file CSS terpisah untuk komponen reusable
import './DialogBox.css'; 

const DialogBox = ({ message, type, onClose }) => {
  const icons = {
    error: <FaExclamationTriangle className="modal-icon error" />,
    success: <FaCheckCircle className="modal-icon success" />,
    info: <FaInfoCircle className="modal-icon info" />,
    warning: <FaExclamationTriangle className="modal-icon warning" />,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {icons[type]}
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default DialogBox;