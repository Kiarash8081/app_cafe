import React from 'react';
import { useApp } from '../../context/AppContext';
import { TERMS } from '../../data/terms';
import { closeOverlayPage } from '../../utils/pageOverlay';

export function TermsPage() {
  const { language } = useApp();
  const copy = TERMS[language] || TERMS.fa;

  return (
    <section className="overlay-page ceramic-overlay" id="termsPage">
      <div className="overlay-shell wide" dir={copy.dir}>
        <p className="eyebrow">{copy.kicker}</p>
        <h2>{copy.title}</h2>
        {copy.sections.map((section) => (
          <article key={section.title} className="terms-section">
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
        <button type="button" className="back-home" onClick={() => closeOverlayPage('termsPage')}>
          {copy.back}
        </button>
      </div>
    </section>
  );
}
