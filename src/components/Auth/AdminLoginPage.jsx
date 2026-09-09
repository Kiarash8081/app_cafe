import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { closeOverlayPage, openOverlayPage } from '../../utils/pageOverlay';
import { UI } from '../../data/i18n';
import { ADMIN, isAdminLogin } from '../../utils/admin';
import { CoffeeCup } from '../Common/CoffeeCup';
import { RingFrame } from '../Common/RingFrame';
import './LoginRing.css';

export function AdminLoginPage() {
  const { loginUser, language } = useApp();
  const text = UI[language] || UI.fa;
  const isRtl = language === 'fa' || language === 'ar';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdminLogin(username, password)) {
      setOk(false);
      setMessage(text.wrong);
      return;
    }
    loginUser({ username: ADMIN.username, role: 'admin' });
    setOk(true);
    setMessage(text.successLogin);
    window.setTimeout(() => {
      closeOverlayPage('adminLoginPage');
      openOverlayPage('adminPage');
    }, 400);
  };

  return (
    <section className="auth-page ring-login-page" id="adminLoginPage">
      <span className="login-blob login-blob-a" aria-hidden="true" />
      <span className="login-blob login-blob-b" aria-hidden="true" />
      <span className="login-blob login-blob-c" aria-hidden="true" />
      <RingFrame className="is-live ring-login">
        <form className="ring-login-form" dir={isRtl ? 'rtl' : 'ltr'} onSubmit={handleSubmit}>
          <CoffeeCup className="login-cup" />
          <h2>{text.adminLogin}</h2>
          <p className="ring-lead">{text.adminLoginLead}</p>
          <label className="ring-field">
            <span className="visually-hidden">{text.username}</span>
            <input
              id="cafe-admin-user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={text.username}
              autoComplete="username"
              required
            />
          </label>
          <label className="ring-field">
            <span className="visually-hidden">{text.password}</span>
            <input
              id="cafe-admin-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={text.password}
              autoComplete="current-password"
              required
            />
          </label>
          <p className={`form-msg ${ok ? 'ok' : message ? 'bad' : ''}`}>{message}</p>
          <button className="ring-submit" type="submit">{text.submitLogin}</button>
          <div className="ring-links">
            <span />
            <button type="button" onClick={() => closeOverlayPage('adminLoginPage')}>{text.back}</button>
          </div>
        </form>
      </RingFrame>
    </section>
  );
}
