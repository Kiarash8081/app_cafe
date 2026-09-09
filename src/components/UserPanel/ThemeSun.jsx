import React from 'react';
import './ThemeSun.css';

export function ThemeSun({ theme = 'default' }) {
  const mode = theme === 'gold' ? 'is-gold' : 'is-day';

  return (
    <div className={`theme-sun ${mode}`} aria-hidden="true">
      <div className="theme-sun-glow" />
      <div className="theme-sun-body">
        <div className="theme-sun-rings">
          <div /><div /><div /><div /><div /><div /><div /><div />
        </div>
        <div className="theme-sun-core" />
        <div className="theme-sun-moon" />
      </div>
    </div>
  );
}
