import React from 'react';
import { useApp } from '../../context/AppContext';
import { pickSite } from '../../utils/siteContent';
import { CoffeeCup } from './CoffeeCup';

export function BrandMark() {
  const { siteContent } = useApp();
  const custom = pickSite(siteContent, 'brand');

  return (
    <div className="brand-mark">
      <CoffeeCup />
      <span className="brand-text">
        {custom ? (
          <strong className="brand-custom">{custom}</strong>
        ) : (
          <>
            <strong>NOVA</strong>
            <small>CAFÉ</small>
          </>
        )}
      </span>
    </div>
  );
}
