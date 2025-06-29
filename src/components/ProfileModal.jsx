// src/components/ProfileModal.jsx

import React from 'react';
import './ProfileModal.css';

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <div className="profile-details">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-meta">{user.id}</p>
            <p className="profile-meta">{user.major}</p>
            <p className="profile-meta">{user.university}</p>
          </div>
          <div className="profile-photo-container">
            <img src={user.photoUrl} alt="Foto Profil" className="profile-photo" />
          </div>
        </div>
        <hr className="profile-divider" />
        <div className="profile-modal-body">
          <h3>Kutipan Inspiratif</h3>
          <blockquote>
            "{user.quote}"
          </blockquote>
        </div>
        <button onClick={onClose} className="profile-modal-close-button">Tutup</button>
      </div>
    </div>
  );
};

export default ProfileModal;