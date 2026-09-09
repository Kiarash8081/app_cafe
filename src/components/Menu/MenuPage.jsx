import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { closeOverlayPage, switchOverlayPage } from '../../utils/pageOverlay';

function formatPrice(n) {
  return n.toLocaleString('fa-IR');
}

function pickList(map, language) {
  if (!map) return [];
  if (Array.isArray(map)) return map;
  return map[language] || map.en || map.fa || [];
}

export function MenuPage() {
  const { language, setCart, isLoggedIn, menu } = useApp();
  const text = UI[language] || UI.fa;
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState('');
  const drinks = useMemo(
    () => menu.filter((item) => !item.removed && (filter === 'all' || item.category === filter)),
    [filter, menu]
  );

  const orderDrink = (drink) => {
    if (drink.available === false) return;
    setCart({ drinkId: drink.id, size: 'm', qty: 1 });
    if (!isLoggedIn) {
      window.alert(text.loginFirst);
      switchOverlayPage('menuPage', 'loginPage');
      return;
    }
    switchOverlayPage('menuPage', 'orderPage');
  };

  return (
    <section className="overlay-page ceramic-overlay" id="menuPage">
      <div className="overlay-shell wide">
        <h2>{text.menu}</h2>
        <div className="filter-row">
          {['all', 'hot', 'cold', 'specialty'].map((key) => (
            <button
              key={key}
              type="button"
              className={`filter-chip ${filter === key ? 'is-on' : ''}`}
              onClick={() => setFilter(key)}
            >
              {text[key]}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {drinks.map((drink) => {
            const specs = pickList(drink.details?.specs, language);
            const ingredients = pickList(drink.details?.ingredients, language);
            const isOpen = openId === drink.id;
            const soldOut = drink.available === false;
            return (
              <article key={drink.id} className={`menu-card ${isOpen ? 'is-open' : ''} ${soldOut ? 'is-unavailable' : ''}`} style={{ '--bean': drink.accent }}>
                <div className="menu-swatch" />
                <h3>{drink.names[language] || drink.names.en}</h3>
                {soldOut && <p className="sold-out-tag">{text.soldOut}</p>}
                <p>{drink.blurb[language] || drink.blurb.en}</p>
                <strong>{formatPrice(drink.prices.m)} {text.toman}</strong>
                <div className="menu-card-actions">
                  <button type="button" className="details-btn" onClick={() => setOpenId(isOpen ? '' : drink.id)}>
                    {isOpen ? text.closeDetails : text.detailsBtn}
                  </button>
                  <button type="button" className="primary-btn" onClick={() => orderDrink(drink)} disabled={soldOut}>
                    {soldOut ? text.soldOut : text.order}
                  </button>
                </div>
                {isOpen && (
                  <div className="drink-details">
                    {specs.length > 0 && (
                      <>
                        <h4>{text.specs}</h4>
                        <ul>
                          {specs.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                      </>
                    )}
                    {ingredients.length > 0 && (
                      <>
                        <h4>{text.ingredients}</h4>
                        <ul>
                          {ingredients.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <button type="button" className="back-home" onClick={() => closeOverlayPage('menuPage')}>{text.back}</button>
      </div>
    </section>
  );
}
