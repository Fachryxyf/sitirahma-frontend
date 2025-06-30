// src/components/LoadingModal.jsx

import React from 'react';
import './LoadingModal.css';

const LoadingModal = () => {
  return (
    <div className="loading-modal-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingModal;