import React from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { openOverlayPage } from '../../utils/pageOverlay';
import { pickSite } from '../../utils/siteContent';
import { PlaceMap } from '../Common/PlaceMap';
import { MenuStage } from './MenuStage';

export function HomePage() {
  const { isLoggedIn, language, siteContent } = useApp();
  const text = UI[language] || UI.fa;
  const [activeAction, setActiveAction] = React.useState('signup');
  const title = pickSite(siteContent, 'title', text.title);
  const lead = pickSite(siteContent, 'text', text.text);
  const hours = pickSite(siteContent, 'hours');
  const address = pickSite(siteContent, 'address');
  const phone = pickSite(siteContent, 'phone');
  const hasPlace = Boolean(hours || address || phone || siteContent?.mapOn);

  const actions = [
    { id: 'signup', label: text.signup, detail: text.loginDetail, icon: 'fa-user-plus', run: () => openOverlayPage('signupPage') },
    { id: 'login', label: text.login, detail: text.loginDetail, icon: 'fa-right-to-bracket', run: () => openOverlayPage('loginPage') },
    { id: 'menu', label: text.menu, detail: text.menuDetail, icon: 'fa-mug-hot', run: () => openOverlayPage('menuPage') },
    {
      id: 'order',
      label: text.order,
      detail: text.orderDetail,
      icon: 'fa-bag-shopping',
      run: () => {
        if (!isLoggedIn) {
          window.alert(text.loginFirst);
          openOverlayPage('loginPage');
          return;
        }
        openOverlayPage('orderPage');
      }
    },
    { id: 'orders', label: text.myOrders, detail: text.myOrdersDetail, icon: 'fa-receipt', run: () => (isLoggedIn ? openOverlayPage('myOrdersPage') : openOverlayPage('loginPage')) },
    { id: 'contact', label: text.contact, detail: text.contactDetail, icon: 'fa-envelope', run: () => openOverlayPage('contactPage') }
  ];

  const current = actions.find((item) => item.id === activeAction) || actions[0];

  return (
    <main className="home-page" id="site-main">
      <section className="hero-panel">
        <div className="hero-copy">
          <h1>{title}</h1>
          <p className="hero-lead">{lead}</p>
          <p className="hero-detail">{current.detail}</p>
          <button type="button" className="primary-btn glow-btn" onClick={current.run}>
            <span className="btn-label">{current.label}</span>
          </button>
        </div>
        <div className="hero-actions">
          {actions.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`action-chip ${activeAction === item.id ? 'is-on' : ''}`}
              onClick={() => setActiveAction(item.id)}
            >
              <i className={`fas ${item.icon}`} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {hasPlace && (
        <section className="visit-strip" aria-label={text.visitUs}>
          {hours && (
            <article className="visit-card">
              <h3>{text.hoursTitle}</h3>
              <p>{hours}</p>
            </article>
          )}
          {address && (
            <article className="visit-card">
              <h3>{text.contactAddress}</h3>
              <p>{address}</p>
            </article>
          )}
          {phone && (
            <article className="visit-card">
              <h3>{text.contactPhone}</h3>
              <p><a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a></p>
            </article>
          )}
          {siteContent?.mapOn && (
            <article className="visit-card visit-map">
              <h3>{text.mapHeading}</h3>
              <PlaceMap site={siteContent} title={text.mapHeading} />
            </article>
          )}
        </section>
      )}

      <section className="feature-grid">
        <h2>{text.featureHeading}</h2>
        <div className="cards">
          {text.cards.map((card) => (
            <article key={card.title} className="feature-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <MenuStage />

      <section className="faq-block" aria-labelledby="faq-heading">
        <h2 id="faq-heading">{text.faqHeading}</h2>
        <div className="faq-grid">
          {text.faqs?.map((item) => (
            <article key={item.q} className="faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
