import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import './CustomDropdown.css';

const DropdownMenu = ({ options, onSelect, selectedValue, position, dropdownRef }) => {
  return (
    <div 
      ref={dropdownRef}
      className={`dropdown-menu-portal ${position.dropUp ? 'drop-up' : ''}`}
      style={{ 
          top: position.dropUp ? 'auto' : `${position.top + 4}px`,
          bottom: position.dropUp ? `${window.innerHeight - position.top + position.height + 4}px` : 'auto',
          left: `${position.left}px`,
          width: `${position.width}px`
      }}
    >
      {options.map(option => (
          <div key={option.value} onClick={() => onSelect(option.value)} className={`dropdown-option ${selectedValue === option.value ? 'selected' : ''}`}>
              <div className="option-text">
                <span className="option-label">{option.label}</span>
                {option.description && <span className="option-description">{option.description}</span>}
              </div>
              {selectedValue === option.value && <FaCheck className="option-check-icon" />}
          </div>
      ))}
    </div>
  );
};

const CustomDropdown = ({ options, value, onChange, name, placeholder = 'Pilih salah satu...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({});
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const handleToggle = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 200;

      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        dropUp: spaceBelow < dropdownHeight
      });
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target) && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  
  return (
    <div className="custom-dropdown">
      <div 
        ref={triggerRef}
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <span className="dropdown-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
      </div>
      {isOpen && createPortal(
        <DropdownMenu 
            options={options} 
            onSelect={handleSelect} 
            selectedValue={value}
            position={position}
            dropdownRef={dropdownRef}
        />, 
        document.body
      )}
    </div>
  );
};

export default CustomDropdown;