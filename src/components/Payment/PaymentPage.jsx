import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { closeOverlayPage } from '../../utils/pageOverlay';

function formatPrice(n) {
  return (n || 0).toLocaleString('fa-IR');
}

export function PaymentPage() {
  const { language, cart, placeOrder } = useApp();
  const text = UI[language] || UI.fa;
  const [message, setMessage] = useState('');

  const handlePay = (e) => {
    e.preventDefault();
    if (!cart) {
      setMessage(text.emptyCart);
      return;
    }
    placeOrder({
      drinkId: cart.drinkId,
      name: cart.name,
      size: cart.size,
      qty: cart.qty,
      amount: cart.amount
    });
    setMessage(text.paid);
    window.setTimeout(() => closeOverlayPage('paymentPage'), 1000);
  };

  return (
    <section className="overlay-page ceramic-overlay" id="paymentPage">
      <div className="overlay-shell">
        <h2>{text.pay}</h2>
        <form className="overlay-form" onSubmit={handlePay}>
          <p>{cart?.name || text.emptyCart}</p>
          {cart && (
            <p className="total-line">{text.total}: {formatPrice(cart.amount)} {text.toman}</p>
          )}
          <p className={`form-msg ${message ? 'ok' : ''}`}>{message}</p>
          <button className="primary-btn" type="submit" disabled={!cart}>{text.confirmPay}</button>
        </form>
        <button type="button" className="back-home" onClick={() => closeOverlayPage('paymentPage')}>{text.back}</button>
      </div>
    </section>
  );
}
