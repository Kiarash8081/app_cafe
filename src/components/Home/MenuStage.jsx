import React from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { openOverlayPage } from '../../utils/pageOverlay';
import './MenuStage.css';

export function MenuStage() {
  const { language, isLoggedIn, menu } = useApp();
  const text = UI[language] || UI.fa;
  const featured = menu.filter((item) => ['espresso', 'latte', 'cold-brew', 'turkish'].includes(item.id));

  const startOrder = () => {
    if (!isLoggedIn) {
      window.alert(text.loginFirst);
      openOverlayPage('loginPage');
      return;
    }
    openOverlayPage('orderPage');
  };

  return (
    <section className="experience-track" aria-label={text.stepsTitle}>
      {text.steps.map((step, index) => {
        const drink = featured[index];
        return (
          <div className="experience-slot" key={step.num} style={{ '--i': index }}>
            <article className="experience-card">
              <span className="experience-card-num">{step.num}</span>
              <p className="eyebrow">{text.stepsTitle}</p>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
              {drink && (
                <div className="stage-drink" style={{ '--bean': drink.accent }}>
                  <strong>{drink.names[language] || drink.names.en}</strong>
                  <span>{drink.blurb[language] || drink.blurb.en}</span>
                </div>
              )}
              {index === text.steps.length - 1 && (
                <button type="button" className="primary-btn glow-btn" onClick={startOrder}>
                  <span className="btn-label">{text.cta}</span>
                </button>
              )}
            </article>
          </div>
        );
      })}
    </section>
  );
}
