import React from 'react';
import './RingFrame.css';

export function RingFrame({ children, className = '' }) {
  return (
    <div className={`ring ${className}`}>
      <i className="ring-line" style={{ '--clr': '#c48a4a' }} />
      <i className="ring-line" style={{ '--clr': '#6b4630' }} />
      <i className="ring-line" style={{ '--clr': '#e8c56b' }} />
      {children}
    </div>
  );
}
