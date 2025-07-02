// src/components/UserFormModal.jsx

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // 1. Impor createPortal
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import './UserFormModal.css';

// --- Komponen Dropdown Kustom ---
const CustomDropdown = ({ options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, dropUp: false });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const handleOpen = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 120; // Perkiraan tinggi dropdown

    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      dropUp: spaceBelow < dropdownHeight // Cek jika ruang di bawah tidak cukup
    });
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const DropdownMenu = () => (
    <div 
        ref={dropdownRef}
        className={`dropdown-modal ${position.dropUp ? 'drop-up' : ''}`}
        style={{ 
            top: position.dropUp ? 'auto' : `${position.top + 4}px`,
            bottom: position.dropUp ? `${window.innerHeight - position.top + 4}px` : 'auto',
            left: `${position.left}px`,
            width: `${position.width}px`
        }}
    >
        {options.map(option => (
            <div key={option.value} onClick={() => handleSelect(option.value)} className={`dropdown-option ${value === option.value ? 'selected' : ''}`}>
                <span className="option-label">{option.label}</span>
                <span className="option-description">{option.description}</span>
                {value === option.value && <FaCheck style={{marginLeft: 'auto', color: 'inherit'}}/>}
            </div>
        ))}
    </div>
  );

  return (
    <div className="custom-dropdown">
      <div 
        ref={triggerRef}
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleOpen}
      >
        <div className="dropdown-value">
          {selectedOption ? selectedOption.label : 'Pilih Peran...'}
        </div>
        <FaChevronDown className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
      </div>
      {/* 2. Gunakan createPortal untuk merender menu di body */}
      {isOpen && createPortal(<DropdownMenu />, document.body)}
    </div>
  );
};

const UserFormModal = ({ isOpen, onClose, onSubmit, userData }) => {
  const [formData, setFormData] = useState({});

    const roleOptions = [
        { value: 'ROLE_USER', label: 'User', description: 'Akses standar untuk mencari buku.' },
        { value: 'ROLE_ADMIN', label: 'Admin', description: 'Akses penuh termasuk manajemen data.' }
    ];

  useEffect(() => {
    if (userData) {
      setFormData({
        namaLengkap: userData.namaLengkap || '',
        email: userData.email || '',
        password: '',
        role: userData.role || 'ROLE_USER'
      });
    } else {
      setFormData({
        namaLengkap: '',
        email: '',
        password: '',
        role: 'ROLE_USER'
      });
    }
  }, [userData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-form-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{userData ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
        <form onSubmit={handleSubmit} className="user-form-grid">
          
          <div className="form-group form-full-width">
            <label htmlFor="namaLengkap">Nama Lengkap</label>
            <input 
              id="namaLengkap" 
              name="namaLengkap" 
              value={formData.namaLengkap} 
              onChange={handleChange} 
              required 
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="form-group form-full-width">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="contoh@email.com"
            />
          </div>

          <div className="form-group form-full-width">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder={userData ? 'Kosongkan jika tidak ingin mengubah' : 'Masukkan password'}
            />
          </div>

          <div className="form-group form-full-width">
              <label htmlFor="role">Peran (Role)</label>
              <CustomDropdown
                  name="role"
                  options={roleOptions}
                  value={formData.role}
                  onChange={handleChange}
              />
          </div>
          
          <div className="form-actions form-full-width">
            <button type="button" onClick={onClose} className="cancel-btn">
              Batal
            </button>
            <button type="submit" className="submit-btn">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;