// src/components/ConfirmDialog.jsx

import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ConfirmDialog.css';

const ConfirmDialog = ({ title, message, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="confirm-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-icon">
          <FaExclamationTriangle />
        </div>
        <h2 className="confirm-dialog-title">{title}</h2>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-actions">
          <button onClick={onClose} className="cancel-btn">
            Batal
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;