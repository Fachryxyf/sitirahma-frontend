// src/components/Tooltip.jsx

import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className="tooltip-box">{content}</div>}
    </div>
  );
};

export default Tooltip;