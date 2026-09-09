import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { closeOverlayPage } from '../../utils/pageOverlay';
import { pickSite } from '../../utils/siteContent';
import { PlaceMap } from '../Common/PlaceMap';

export function ContactPage() {
  const { language, siteContent } = useApp();
  const text = UI[language] || UI.fa;
  const [message, setMessage] = useState('');
  const hours = pickSite(siteContent, 'hours');
  const address = pickSite(siteContent, 'address');
  const phone = pickSite(siteContent, 'phone');

  return (
    <section className="overlay-page ceramic-overlay" id="contactPage">
      <div className="overlay-shell">
        <h2>{text.contactTitle}</h2>
        {hours && <p>{text.hoursTitle}: {hours}</p>}
        {address && <p>{text.contactAddress}: {address}</p>}
        {phone && <p>{text.contactPhone}: <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a></p>}
        {!hours && !address && !phone && !siteContent?.mapOn && (
          <p className="hero-lead">{text.placeEmpty}</p>
        )}
        <PlaceMap site={siteContent} title={text.mapHeading} />
        <form
          className="overlay-form"
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(text.sent);
          }}
        >
          <div className="field">
            <label htmlFor="contact-name">{text.name}</label>
            <input id="contact-name" required />
          </div>
          <div className="field">
            <label htmlFor="contact-msg">{text.message}</label>
            <textarea id="contact-msg" rows="4" required />
          </div>
          <p className={`form-msg ${message ? 'ok' : ''}`}>{message}</p>
          <button className="primary-btn" type="submit">{text.send}</button>
        </form>
        <button type="button" className="back-home" onClick={() => closeOverlayPage('contactPage')}>{text.back}</button>
      </div>
    </section>
  );
}
