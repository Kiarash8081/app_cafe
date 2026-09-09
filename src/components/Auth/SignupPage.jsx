import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { closeOverlayPage, switchOverlayPage } from '../../utils/pageOverlay';
import { BrandMark } from '../Common/BrandMark';
import { UI } from '../../data/i18n';
import './AuthSlide.css';

export function SignupPage() {
  const { signupUser, language } = useApp();
  const text = UI[language] || UI.fa;
  const isRtl = language === 'fa' || language === 'ar';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signupUser({ username, password });
      setOk(true);
      setMessage(text.successSignup);
      window.setTimeout(() => closeOverlayPage('signupPage'), 900);
    } catch {
      setOk(false);
      setMessage(text.exists);
    }
  };

  return (
    <section className="auth-page auth-slide-page ceramic-overlay" id="signupPage">
      <div className="auth-slide-box">
        <div className="auth-slide-content" dir={isRtl ? 'rtl' : 'ltr'}>
          <BrandMark />
          <h2>{text.signup}</h2>
          <p className="auth-slide-lead">{text.signupLead}</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-slide-stack">
              <label htmlFor="cafe-signup-user">{text.username}</label>
              <input id="cafe-signup-user" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="auth-slide-stack">
              <label htmlFor="cafe-signup-pass">{text.password}</label>
              <input id="cafe-signup-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <p className={`form-msg ${ok ? 'ok' : message ? 'bad' : ''}`}>{message}</p>
            <button className="auth-submit" type="submit">{text.submitSignup}</button>
          </form>
          <button type="button" className="auth-switch" onClick={() => switchOverlayPage('signupPage', 'loginPage')}>
            {text.login}
          </button>
          <button type="button" className="back-home" onClick={() => closeOverlayPage('signupPage')}>{text.back}</button>
        </div>
      </div>
    </section>
  );
}
