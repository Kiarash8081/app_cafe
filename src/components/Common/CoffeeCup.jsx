import React from 'react';
import './CoffeeCup.css';

export function CoffeeCup({ className = '' }) {
  return (
    <svg className={`brand-cup ${className}`.trim()} viewBox="0 0 80 80" aria-hidden="true">
      <circle className="brand-cup-disc" cx="40" cy="40" r="37" />
      <path className="brand-cup-steam" d="M30 12c1 5-4 6-3 11" />
      <path className="brand-cup-steam" d="M39 9c1 6-4 7-3 13" />
      <path className="brand-cup-steam" d="M48 12c1 5-4 6-3 11" />
      <ellipse className="brand-cup-saucer" cx="38" cy="64" rx="22" ry="5.2" />
      <ellipse className="brand-cup-saucer-shine" cx="38" cy="62.6" rx="15" ry="2.2" />
      <path className="brand-cup-handle" d="M55 33c11 1 14 12 7 19-3.5 3.5-10 5-15 4" />
      <path className="brand-cup-body" d="M21 30h34c1.4 15-.6 26-8 32H29c-7-6-8.6-17-8-32z" />
      <ellipse className="brand-cup-lip" cx="38" cy="30" rx="17" ry="6" />
      <ellipse className="brand-cup-coffee" cx="38" cy="31.2" rx="13.4" ry="3.8" />
      <ellipse className="brand-cup-crema" cx="34" cy="30.6" rx="5.2" ry="1.5" />
    </svg>
  );
}
