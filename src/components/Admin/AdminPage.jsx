import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UI } from '../../data/i18n';
import { closeOverlayPage } from '../../utils/pageOverlay';
import { EMPTY_SITE_CONTENT } from '../../utils/siteContent';
import { PlaceMap } from '../Common/PlaceMap';
import './AdminPage.css';

function linesToText(value) {
  return Array.isArray(value) ? value.join('\n') : '';
}

function textToLines(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatPrice(n) {
  return Number(n || 0).toLocaleString('fa-IR');
}

export function AdminPage() {
  const { language, menu, updateMenuItem, addMenuItem, removeMenuItem, restoreMenuItem, updateSiteContent, siteContent, isAdmin } = useApp();
  const text = UI[language] || UI.fa;
  const [tab, setTab] = useState('menu');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState('');
  const [showAdd, setShowAdd] = useState(true);
  const [drafts, setDrafts] = useState({});
  const [savedId, setSavedId] = useState('');
  const [siteDraft, setSiteDraft] = useState({ ...EMPTY_SITE_CONTENT, ...siteContent });
  const [siteSaved, setSiteSaved] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'hot', blurb: '', s: '', m: '', l: '' });
  const [addError, setAddError] = useState(false);

  useEffect(() => {
    setSiteDraft({ ...EMPTY_SITE_CONTENT, ...siteContent });
  }, [siteContent]);

  const rows = useMemo(
    () => menu.map((drink) => {
      const draft = drafts[drink.id] || {};
      return {
        drink,
        name: draft.name ?? (drink.names[language] || drink.names.en || ''),
        category: draft.category ?? drink.category,
        prices: draft.prices || { ...drink.prices },
        blurb: draft.blurb ?? (drink.blurb[language] || drink.blurb.en || ''),
        specs: draft.specs ?? linesToText(drink.details?.specs?.[language] || drink.details?.specs?.en),
        ingredients: draft.ingredients ?? linesToText(drink.details?.ingredients?.[language] || drink.details?.ingredients?.en)
      };
    }),
    [menu, drafts, language]
  );

  const visibleRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const name = `${row.name} ${row.drink.names?.fa || ''} ${row.drink.names?.en || ''}`.toLowerCase();
      return name.includes(q);
    });
  }, [query, rows]);

  const patchDraft = (id, next) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...next } }));
    setSavedId('');
  };

  const saveItem = (row) => {
    updateMenuItem(row.drink.id, {
      names: { [language]: row.name },
      category: row.category,
      prices: {
        s: Number(row.prices.s) || 0,
        m: Number(row.prices.m) || 0,
        l: Number(row.prices.l) || 0
      },
      blurb: { [language]: row.blurb },
      details: {
        specs: { [language]: textToLines(row.specs) },
        ingredients: { [language]: textToLines(row.ingredients) }
      }
    });
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[row.drink.id];
      return next;
    });
    setSavedId(row.drink.id);
  };

  const hasPlace = Boolean(siteDraft.address || (siteDraft.mapLat && siteDraft.mapLng));

  const saveSite = (withMap = false, turnOffMap = false) => {
    const mapOn = turnOffMap ? false : (withMap ? hasPlace : Boolean(siteDraft.mapOn && hasPlace));
    updateSiteContent({ ...siteDraft, mapOn });
    setSiteDraft((prev) => ({ ...prev, mapOn }));
    setMapError(false);
    setSiteSaved(true);
  };

  const registerMap = () => {
    if (!hasPlace) {
      setSiteSaved(false);
      setMapError(true);
      return;
    }
    saveSite(true);
  };

  const addDrink = () => {
    if (!newItem.name.trim()) {
      setAddError(true);
      return;
    }
    const id = addMenuItem({
      name: newItem.name,
      category: newItem.category,
      blurb: newItem.blurb,
      prices: { s: newItem.s, m: newItem.m, l: newItem.l }
    });
    if (id) {
      setNewItem({ name: '', category: 'hot', blurb: '', s: '', m: '', l: '' });
      setAddError(false);
      setSavedId(id);
      setOpenId(id);
      setShowAdd(false);
      setTab('menu');
    }
  };

  const deleteDrink = (id) => {
    if (window.confirm(text.confirmDelete)) removeMenuItem(id);
  };

  if (!isAdmin) {
    return (
      <section className="overlay-page ceramic-overlay" id="adminPage">
        <div className="overlay-shell">
          <h2>{text.adminTitle}</h2>
          <p>{text.loginFirst}</p>
          <button type="button" className="back-home" onClick={() => closeOverlayPage('adminPage')}>{text.back}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="overlay-page ceramic-overlay" id="adminPage">
      <div className="overlay-shell wide admin-shell">
        <header className="admin-head">
          <div>
            <h2>{text.adminTitle}</h2>
            <p className="hero-lead">{text.adminLead}</p>
          </div>
          <div className="admin-tabs" role="tablist">
            <button type="button" className={tab === 'menu' ? 'is-on' : ''} onClick={() => setTab('menu')}>
              <i className="fas fa-mug-hot" aria-hidden="true" /> {text.coffeeList}
            </button>
            <button type="button" className={tab === 'site' ? 'is-on' : ''} onClick={() => setTab('site')}>
              <i className="fas fa-gear" aria-hidden="true" /> {text.adminSiteTab}
            </button>
          </div>
        </header>

        {tab === 'menu' && (
          <>
            <div className="admin-toolbar">
              <input
                className="admin-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={text.searchCoffee}
              />
              <button type="button" className="admin-btn admin-btn-add" onClick={() => setShowAdd((v) => !v)}>
                <i className="fas fa-plus" aria-hidden="true" /> {text.addItem}
              </button>
            </div>
            <p className="admin-count">{visibleRows.length} / {rows.length}</p>

            {showAdd && (
              <article className="admin-card admin-add">
                <h3>{text.addItem}</h3>
                <div className="admin-add-grid">
                  <label>
                    {text.itemName}
                    <input value={newItem.name} onChange={(e) => { setNewItem({ ...newItem, name: e.target.value }); setAddError(false); }} />
                  </label>
                  <label>
                    {text.itemCategory}
                    <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                      <option value="hot">{text.hot}</option>
                      <option value="cold">{text.cold}</option>
                      <option value="specialty">{text.specialty}</option>
                    </select>
                  </label>
                </div>
                <div className="admin-prices">
                  {['s', 'm', 'l'].map((size) => (
                    <label key={size}>
                      {text[`size${size.toUpperCase()}`]}
                      <input type="number" min="0" step="1000" value={newItem[size]} onChange={(e) => setNewItem({ ...newItem, [size]: e.target.value })} />
                    </label>
                  ))}
                </div>
                <label>
                  {text.detailsBtn}
                  <textarea rows="2" value={newItem.blurb} onChange={(e) => setNewItem({ ...newItem, blurb: e.target.value })} />
                </label>
                <div className="admin-row-actions">
                  <button type="button" className="admin-btn admin-btn-add" onClick={addDrink}>{text.addItem}</button>
                  <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setShowAdd(false)}>{text.cancel}</button>
                </div>
                {addError && <p className="form-msg bad">{text.itemNeedName}</p>}
                {savedId.startsWith('custom-') && <p className="form-msg ok">{text.savedOk}</p>}
              </article>
            )}

            <div className="admin-list">
              {visibleRows.map((row) => {
                const open = openId === row.drink.id;
                const soldOut = row.drink.available === false;
                const gone = Boolean(row.drink.removed);
                return (
                  <article key={row.drink.id} className={`admin-row ${soldOut ? 'is-unavailable' : ''} ${gone ? 'is-removed' : ''} ${open ? 'is-open' : ''}`}>
                    <div className="admin-row-main">
                      <button type="button" className="admin-row-name" onClick={() => setOpenId(open ? '' : row.drink.id)}>
                        <strong>{row.name}</strong>
                        <span>{text[row.category] || row.category} · {formatPrice(row.prices.m)} {text.toman}</span>
                      </button>
                      <div className="admin-row-flags">
                        {soldOut && <em>{text.soldOut}</em>}
                        {gone && <em>{text.deleteItem}</em>}
                      </div>
                      <div className="admin-row-actions">
                        <button type="button" className="admin-btn" onClick={() => setOpenId(open ? '' : row.drink.id)}>
                          {open ? text.closeDetails : text.editItem}
                        </button>
                        <button
                          type="button"
                          className="admin-btn"
                          onClick={() => updateMenuItem(row.drink.id, { available: soldOut })}
                        >
                          {soldOut ? text.markAvailable : text.markUnavailable}
                        </button>
                        {gone ? (
                          <button type="button" className="admin-btn" onClick={() => restoreMenuItem(row.drink.id)}>{text.restoreItem}</button>
                        ) : (
                          <button type="button" className="admin-btn admin-btn-danger" onClick={() => deleteDrink(row.drink.id)}>{text.deleteItem}</button>
                        )}
                      </div>
                    </div>
                    {open && (
                      <div className="admin-row-edit">
                        <label>
                          {text.itemName}
                          <input value={row.name} onChange={(e) => patchDraft(row.drink.id, { name: e.target.value })} />
                        </label>
                        <label>
                          {text.itemCategory}
                          <select value={row.category} onChange={(e) => patchDraft(row.drink.id, { category: e.target.value })}>
                            <option value="hot">{text.hot}</option>
                            <option value="cold">{text.cold}</option>
                            <option value="specialty">{text.specialty}</option>
                          </select>
                        </label>
                        <div className="admin-prices">
                          {['s', 'm', 'l'].map((size) => (
                            <label key={size}>
                              {text[`size${size.toUpperCase()}`]}
                              <input type="number" min="0" step="1000" value={row.prices[size]} onChange={(e) => patchDraft(row.drink.id, { prices: { ...row.prices, [size]: e.target.value } })} />
                            </label>
                          ))}
                        </div>
                        <label>
                          {text.detailsBtn}
                          <textarea rows="3" value={row.blurb} onChange={(e) => patchDraft(row.drink.id, { blurb: e.target.value })} />
                        </label>
                        <label>
                          {text.specs}
                          <textarea rows="4" value={row.specs} onChange={(e) => patchDraft(row.drink.id, { specs: e.target.value })} />
                        </label>
                        <label>
                          {text.ingredients}
                          <textarea rows="3" value={row.ingredients} onChange={(e) => patchDraft(row.drink.id, { ingredients: e.target.value })} />
                        </label>
                        <button type="button" className="admin-btn admin-btn-add" onClick={() => saveItem(row)}>{text.saveChanges}</button>
                        {savedId === row.drink.id && <p className="form-msg ok">{text.savedOk}</p>}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {tab === 'site' && (
          <article className="admin-card admin-site">
            <h3>{text.siteSettings}</h3>
            <label>
              {text.brand}
              <input value={siteDraft.brand} onChange={(e) => { setSiteDraft({ ...siteDraft, brand: e.target.value }); setSiteSaved(false); setMapError(false); }} />
            </label>
            <label>
              {text.pageTitle}
              <input value={siteDraft.title} onChange={(e) => { setSiteDraft({ ...siteDraft, title: e.target.value }); setSiteSaved(false); }} />
            </label>
            <label>
              {text.pageText}
              <textarea rows="3" value={siteDraft.text} onChange={(e) => { setSiteDraft({ ...siteDraft, text: e.target.value }); setSiteSaved(false); }} />
            </label>
            <label>
              {text.hoursTitle}
              <input value={siteDraft.hours} onChange={(e) => { setSiteDraft({ ...siteDraft, hours: e.target.value }); setSiteSaved(false); }} />
            </label>
            <label>
              {text.contactAddress}
              <textarea rows="2" value={siteDraft.address} onChange={(e) => { setSiteDraft({ ...siteDraft, address: e.target.value }); setSiteSaved(false); }} />
            </label>
            <label>
              {text.contactPhone}
              <input value={siteDraft.phone} onChange={(e) => { setSiteDraft({ ...siteDraft, phone: e.target.value }); setSiteSaved(false); }} />
            </label>
            <div className="admin-prices">
              <label>
                {text.mapLat}
                <input value={siteDraft.mapLat} onChange={(e) => { setSiteDraft({ ...siteDraft, mapLat: e.target.value }); setSiteSaved(false); }} />
              </label>
              <label>
                {text.mapLng}
                <input value={siteDraft.mapLng} onChange={(e) => { setSiteDraft({ ...siteDraft, mapLng: e.target.value }); setSiteSaved(false); }} />
              </label>
            </div>
            <p className="hero-lead">{text.mapHint}</p>
            <div className="admin-row-actions">
              <button type="button" className="admin-btn admin-btn-add" onClick={() => saveSite(false)}>{text.saveChanges}</button>
              <button type="button" className="admin-btn" onClick={registerMap}>{text.registerMap}</button>
              {siteDraft.mapOn && (
                <button type="button" className="admin-btn admin-btn-ghost" onClick={() => saveSite(false, true)}>{text.hideMap}</button>
              )}
            </div>
            {mapError && <p className="form-msg bad">{text.mapNeedPlace}</p>}
            {siteSaved && <p className="form-msg ok">{text.savedOk}</p>}
            <PlaceMap site={{ ...siteDraft, mapOn: siteDraft.mapOn || hasPlace }} title={text.mapHeading} />
          </article>
        )}

        <button type="button" className="back-home" onClick={() => closeOverlayPage('adminPage')}>{text.back}</button>
      </div>
    </section>
  );
}
