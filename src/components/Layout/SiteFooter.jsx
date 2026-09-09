import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { openOverlayPage } from '../../utils/pageOverlay';
import { pickSite } from '../../utils/siteContent';
import { PlaceMap } from '../Common/PlaceMap';
import './SiteFooter.css';

export function SiteFooter() {
  const footerRef = useRef(null);
  const { language, siteContent } = useApp();
  const text = UI[language] || UI.fa;
  const brand = pickSite(siteContent, 'brand', text.brand);
  const hours = pickSite(siteContent, 'hours');
  const address = pickSite(siteContent, 'address');
  const phone = pickSite(siteContent, 'phone');

  useEffect(() => {
    const content = document.getElementById('site-content');
    const footer = footerRef.current;
    if (!content || !footer) return undefined;
    const siteFooter = () => {
      content.style.marginBottom = `${footer.offsetHeight + 36}px`;
    };
    siteFooter();
    window.addEventListener('resize', siteFooter);
    const observer = new ResizeObserver(siteFooter);
    observer.observe(footer);
    return () => {
      window.removeEventListener('resize', siteFooter);
      observer.disconnect();
    };
  }, [hours, address, phone, siteContent?.mapOn]);

  return (
    <footer id="site-footer" ref={footerRef}>
      <div className="site-footer-inner">
        <p className="footer-brand">{brand}</p>
        {(address || phone || hours) && (
          <address>
            {address && <>{address}<br /></>}
            {phone && <><a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a><br /></>}
            {hours && <>{text.hoursTitle}: {hours}</>}
          </address>
        )}
        <PlaceMap site={siteContent} title={text.mapHeading} />
        <nav className="footer-links" aria-label={brand}>
          <button type="button" onClick={() => openOverlayPage('menuPage')}>{text.menu}</button>
          <button type="button" onClick={() => openOverlayPage('contactPage')}>{text.contact}</button>
          <button type="button" onClick={() => openOverlayPage('termsPage')}>{text.termsBtn}</button>
        </nav>
        <p>{text.footerCopy}</p>
        <small>{text.copyright}</small>
      </div>
    </footer>
  );
}
