import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeSun } from './ThemeSun';
import { UI, THEME_LABELS } from '../../data/i18n';
import { openOverlayPage } from '../../utils/pageOverlay';

export function UserPanel() {
  const { user, logoutUser, language, theme, setLanguage, setTheme, isLoggedIn, isAdmin } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const text = UI[language] || UI.fa;

  const languageOptions = [
    { value: 'fa', label: 'فارسی' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'zh', label: '中文' },
    { value: 'es', label: 'Español' }
  ];

  const themeOptions = Object.keys(THEME_LABELS).map((value) => ({
    value,
    label: THEME_LABELS[value][language] || THEME_LABELS[value].en
  }));

  const open = (id) => {
    setIsOpen(false);
    openOverlayPage(id);
  };

  return (
    <>
      <div className={`panel-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <button
        type="button"
        className={`user-panel-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((value) => !value)}
        aria-label={text.panel}
        aria-expanded={isOpen}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-ellipsis-vertical'}`} />
      </button>
      <aside className={`user-panel ${isOpen ? 'open' : ''}`}>
        <h3 className="panel-title">{text.panel}</h3>
        {isLoggedIn && (
          <p className="user-name-display">
            <strong>{user.username}</strong>
            {isAdmin ? <span className="admin-chip">{text.adminPanel}</span> : null}
          </p>
        )}
        {!isLoggedIn && (
          <>
            <button className="panel-btn" onClick={() => open('loginPage')}>
              <i className="fas fa-right-to-bracket" /> {text.login}
            </button>
            <button className="panel-btn" onClick={() => open('signupPage')}>
              <i className="fas fa-user-plus" /> {text.signup}
            </button>
          </>
        )}
        {!isAdmin && (
          <button className="panel-btn admin-entry" onClick={() => open('adminLoginPage')}>
            <i className="fas fa-user-shield" /> {text.adminLogin}
          </button>
        )}
        {isLoggedIn && isAdmin && (
          <button className="panel-btn" onClick={() => open('adminPage')}>
            <i className="fas fa-sliders" /> {text.adminPanel}
          </button>
        )}
        {isLoggedIn && (
          <button className="panel-btn" onClick={() => open('myOrdersPage')}>
            <i className="fas fa-mug-saucer" /> {text.myOrders}
          </button>
        )}
        <div className="panel-section">
          <label className="panel-label">{text.language}</label>
          <select className="panel-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="panel-section">
          <label className="panel-label">{text.theme}</label>
          <div className="theme-options">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`theme-swatch ${theme === option.value ? 'active' : ''}`}
                onClick={() => setTheme(option.value)}
                title={option.label}
                data-theme-value={option.value}
              >
                <span className="swatch-dot" />
              </button>
            ))}
          </div>
          <ThemeSun theme={theme} />
        </div>
        {isLoggedIn && (
          <button className="panel-btn" onClick={() => { logoutUser(); setIsOpen(false); }} style={{ color: '#8a5d5d' }}>
            <i className="fas fa-sign-out-alt" /> {text.logout}
          </button>
        )}
      </aside>
    </>
  );
}
