import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { SITE } from '../../data/site';
import { siteUrl } from '../../utils/asset';

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

function upsertLink(rel, href, extra = {}) {
  const selector = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([key, value]) => el.setAttribute(key, value));
}

export function Seo() {
  const { language, menu, siteContent } = useApp();
  const text = UI[language] || UI.fa;
  const pageUrl = siteUrl();
  const image = `${pageUrl}${SITE.image}`;
  const brand = (siteContent?.brand || '').trim() || text.brand;
  const address = (siteContent?.address || '').trim();
  const phone = (siteContent?.phone || '').trim();
  const hours = (siteContent?.hours || '').trim();

  useEffect(() => {
    document.title = text.seoTitle;
    upsertMeta('meta[name="description"]', { name: 'description', content: text.seoDescription });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' });
    upsertMeta('meta[name="author"]', { name: 'author', content: brand });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#6b4630' });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: brand });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: text.seoTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: text.seoDescription });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: language === 'fa' ? 'fa_IR' : language });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: pageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: text.seoTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: text.seoDescription });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    upsertLink('canonical', pageUrl);
    ['fa', 'en', 'ar', 'zh', 'es'].forEach((lang) => {
      upsertLink('alternate', `${pageUrl}?lang=${lang}`, { hreflang: lang });
    });
    upsertLink('alternate', pageUrl, { hreflang: 'x-default' });

    const offers = (menu || []).slice(0, 12).map((item) => ({
      '@type': 'MenuItem',
      name: item.names[language] || item.names.fa,
      description: item.blurb[language] || item.blurb.fa,
      offers: {
        '@type': 'Offer',
        price: String(item.prices?.m || ''),
        priceCurrency: 'IRR'
      }
    }));

    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CafeOrCoffeeShop',
          name: brand,
          image,
          url: pageUrl,
          ...(phone ? { telephone: phone } : {}),
          servesCuisine: 'Coffee',
          ...(address ? {
            address: {
              '@type': 'PostalAddress',
              streetAddress: address,
              addressCountry: 'IR'
            }
          } : {}),
          ...(siteContent?.mapLat && siteContent?.mapLng ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: siteContent.mapLat,
              longitude: siteContent.mapLng
            }
          } : {}),
          ...(hours ? { openingHours: hours } : {}),
          hasMenu: {
            '@type': 'Menu',
            hasMenuSection: {
              '@type': 'MenuSection',
              name: text.menu,
              hasMenuItem: offers
            }
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: (text.faqs || []).map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        }
      ]
    };

    let script = document.getElementById('nova-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'nova-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [address, brand, hours, image, language, menu, pageUrl, phone, siteContent, text]);

  return (
    <a className="skip-link" href="#site-main">
      {text.skipToContent}
    </a>
  );
}
