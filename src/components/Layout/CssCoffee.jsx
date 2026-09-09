import React from 'react';
import { asset } from '../../utils/asset';
import './CssCoffee.css';

export function CssCoffee({ alt = '' }) {
  return (
    <div className="css-coffee">
      <img
        className="coffee-photo"
        src={asset('hero-coffee.png')}
        alt={alt}
        width="1024"
        height="768"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
