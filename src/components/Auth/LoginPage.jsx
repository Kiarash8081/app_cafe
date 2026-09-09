import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { closeOverlayPage, openOverlayPage, switchOverlayPage } from '../../utils/pageOverlay';
import { UI } from '../../data/i18n';
import { ADMIN, isAdminLogin } from '../../utils/admin';
import { CoffeeCup } from '../Common/CoffeeCup';
import { RingFrame } from '../Common/RingFrame';
import './LoginRing.css';

export function LoginPage() {
  const { loginUser, findAccount, findSavedUser, language } = useApp();
  const text = UI[language] || UI.fa;
  const isRtl = language === 'fa' || language === 'ar';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdminLogin(username, password)) {
      loginUser({ username: ADMIN.username, role: 'admin' });
      setOk(true);
      setMessage(text.successLogin);
      window.setTimeout(() => {
        closeOverlayPage('loginPage');
        openOverlayPage('adminPage');
      }, 500);
      return;
    }

    const match = findAccount(username, password) || (() => {
      const saved = findSavedUser();
      if (saved && saved.username === username && saved.password === password) return saved;
      return null;
    })();

    if (!match) {
      const saved = findSavedUser();
      setOk(false);
      setMessage(saved ? text.wrong : text.noUser);
      return;
    }
    loginUser(match);
    setOk(true);
    setMessage(text.successLogin);
    window.setTimeout(() => closeOverlayPage('loginPage'), 900);
  };

  return (
    <section className="auth-page ring-login-page" id="loginPage">
      <span className="login-blob login-blob-a" aria-hidden="true" />
      <span className="login-blob login-blob-b" aria-hidden="true" />
      <span className="login-blob login-blob-c" aria-hidden="true" />
      <RingFrame className="is-live ring-login">
        <form className="ring-login-form" dir={isRtl ? 'rtl' : 'ltr'} onSubmit={handleSubmit}>
          <CoffeeCup className="login-cup" />
          <h2>{text.login}</h2>
          <p className="ring-lead">{text.loginLead}</p>
          <label className="ring-field">
            <span className="visually-hidden">{text.username}</span>
            <input
              id="cafe-login-user"
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
              id="cafe-login-pass"
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
            <button type="button" onClick={() => switchOverlayPage('loginPage', 'signupPage')}>{text.signup}</button>
            <button type="button" onClick={() => closeOverlayPage('loginPage')}>{text.back}</button>
          </div>
        </form>
      </RingFrame>
    </section>
  );
}
