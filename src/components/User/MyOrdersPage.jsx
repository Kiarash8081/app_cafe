import React from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { closeOverlayPage } from '../../utils/pageOverlay';

function formatPrice(n) {
  return (n || 0).toLocaleString('fa-IR');
}

export function MyOrdersPage() {
  const { language, user, getUserOrders, cancelOrder } = useApp();
  const text = UI[language] || UI.fa;
  const list = getUserOrders(user?.username);

  return (
    <section className="overlay-page ceramic-overlay" id="myOrdersPage">
      <div className="overlay-shell">
        <h2>{text.myOrders}</h2>
        {!list.length && <p>{text.noOrders}</p>}
        <ul className="order-list">
          {list.map((item) => (
            <li key={item.id} className="order-row">
              <div>
                <strong>{item.name}</strong>
                <p>{formatPrice(item.amount)} {text.toman} · {item.status === 'cancelled' ? text.cancelled : text.active}</p>
              </div>
              {item.status === 'active' && (
                <button type="button" className="ghost-btn" onClick={() => cancelOrder(item.id)}>
                  {text.cancel}
                </button>
              )}
            </li>
          ))}
        </ul>
        <button type="button" className="back-home" onClick={() => closeOverlayPage('myOrdersPage')}>{text.back}</button>
      </div>
    </section>
  );
}
