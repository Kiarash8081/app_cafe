import React, { useEffect, useRef } from 'react';
import { CssCoffee } from './CssCoffee';
import { BrandMark } from '../Common/BrandMark';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { openOverlayPage } from '../../utils/pageOverlay';
import './Header.css';

export function Header() {
  const { language, isLoggedIn } = useApp();
  const text = UI[language] || UI.fa;
  const heroRef = useRef(null);
  const frameRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const frame = frameRef.current;
    const header = headerRef.current;
    if (!hero || !frame || !header) return undefined;

    let target = 0;
    let current = 0;
    let running = 0;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const apply = (value) => {
      const ease = 1 - (1 - value) ** 3;
      header.style.setProperty('--scroll', ease.toFixed(4));
      frame.style.opacity = String(1 - ease * 0.42);
      frame.style.transform = `translate3d(0, ${ease * -56}px, 0) scale(${1 - ease * 0.16})`;
      header.classList.toggle('is-solid', value > 0.06);
    };

    const tick = () => {
      const speed = reduced ? 1 : 0.22;
      current += (target - current) * speed;
      if (Math.abs(target - current) < 0.001) current = target;
      apply(current);
      running = Math.abs(target - current) > 0.001 ? window.requestAnimationFrame(tick) : 0;
    };

    const read = () => {
      const rect = hero.getBoundingClientRect();
      const span = Math.max(rect.height * 0.72, 1);
      target = Math.min(1, Math.max(0, -rect.top / span));
      if (!running) running = window.requestAnimationFrame(tick);
    };

    apply(0);
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      if (running) window.cancelAnimationFrame(running);
    };
  }, []);

  const goOrder = () => {
    if (!isLoggedIn) {
      window.alert(text.loginFirst);
      openOverlayPage('loginPage');
      return;
    }
    openOverlayPage('orderPage');
  };

  return (
    <div className="masthead">
      <header className="header" id="mainHeader" ref={headerRef}>
        <div className="header-inner">
          <span className="header-gutter" aria-hidden="true" />
          <div className="logo">
            <BrandMark />
          </div>
          <nav className="header-nav" aria-label={text.brand}>
            <button type="button" onClick={() => openOverlayPage('menuPage')}>
              <i className="fas fa-mug-hot" aria-hidden="true" />
              <span>{text.menu}</span>
            </button>
            <button type="button" onClick={goOrder}>
              <i className="fas fa-bag-shopping" aria-hidden="true" />
              <span>{text.order}</span>
            </button>
            <button type="button" onClick={() => openOverlayPage('contactPage')}>
              <i className="fas fa-location-dot" aria-hidden="true" />
              <span>{text.contact}</span>
            </button>
          </nav>
        </div>
      </header>
      <section className="header-hero" ref={heroRef} aria-label={text.brand}>
        <div className="header-hero-frame" ref={frameRef}>
          <CssCoffee alt={text.brand} />
        </div>
      </section>
    </div>
  );
}
