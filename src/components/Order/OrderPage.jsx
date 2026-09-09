import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { closeOverlayPage, switchOverlayPage } from '../../utils/pageOverlay';

function formatPrice(n) {
  return n.toLocaleString('fa-IR');
}

export function OrderPage() {
  const { language, cart, setCart, isLoggedIn, menu } = useApp();
  const text = UI[language] || UI.fa;
  const drinks = useMemo(
    () => menu.filter((item) => !item.removed && item.available !== false),
    [menu]
  );
  const drink = drinks.find((item) => item.id === cart?.drinkId) || drinks[0];
  const size = cart?.size || 'm';
  const qty = Math.min(8, Math.max(1, cart?.qty || 1));
  const total = drink ? (drink.prices[size] || drink.prices.m) * qty : 0;

  const update = (patch) => {
    if (!drink) return;
    setCart({ drinkId: drink.id, size, qty, ...patch });
  };

  const goPay = () => {
    if (!drink) return;
    if (!isLoggedIn) {
      window.alert(text.loginFirst);
      switchOverlayPage('orderPage', 'loginPage');
      return;
    }
    setCart({ drinkId: drink.id, size, qty, amount: total, name: drink.names[language] || drink.names.en });
    switchOverlayPage('orderPage', 'paymentPage');
  };

  return (
    <section className="overlay-page ceramic-overlay" id="orderPage">
      <div className="overlay-shell">
        <h2>{text.order}</h2>
        {!drink && <p className="hero-lead">{text.emptyCart}</p>}
        {drink && (
          <form className="overlay-form" onSubmit={(e) => { e.preventDefault(); goPay(); }}>
            <div className="field">
              <label htmlFor="drink-select">{text.pickDrink}</label>
              <select id="drink-select" value={drink.id} onChange={(e) => update({ drinkId: e.target.value })}>
                {drinks.map((item) => (
                  <option key={item.id} value={item.id}>{item.names[language] || item.names.en}</option>
                ))}
              </select>
            </div>
            <div className="size-row">
              {['s', 'm', 'l'].map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-chip ${size === key ? 'is-on' : ''}`}
                  onClick={() => update({ size: key })}
                >
                  {text[`size${key.toUpperCase()}`]} · {formatPrice(drink.prices[key])}
                </button>
              ))}
            </div>
            <div className="field">
              <span className="qty-label">{text.qty}</span>
              <div className="qty-row" role="group" aria-label={text.qty}>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => update({ qty: Math.max(1, qty - 1) })}
                  disabled={qty <= 1}
                  aria-label="-"
                >
                  −
                </button>
                <span className="qty-value">{qty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => update({ qty: Math.min(8, qty + 1) })}
                  disabled={qty >= 8}
                  aria-label="+"
                >
                  +
                </button>
              </div>
            </div>
            <p className="total-line">{text.total}: {formatPrice(total)} {text.toman}</p>
            <button className="primary-btn" type="submit">{text.pay}</button>
          </form>
        )}
        <button type="button" className="back-home" onClick={() => closeOverlayPage('orderPage')}>{text.back}</button>
      </div>
    </section>
  );
}
