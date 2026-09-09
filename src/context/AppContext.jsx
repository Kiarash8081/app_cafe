import React, { createContext, useContext, useEffect, useState } from 'react';
import { COFFEE_MENU, mergeMenu } from '../data/menu';
import { EMPTY_SITE_CONTENT } from '../utils/siteContent';
import { ADMIN, isAdminLogin, isAdminUser } from '../utils/admin';

const AppContext = createContext();
const THEME_VALUES = ['default', 'gold'];
const LANGS = ['fa', 'en', 'ar', 'zh', 'es'];
const STORE = {
  prefs: 'novaCafePrefs',
  user: 'novaCafeUser',
  users: 'novaCafeUsers',
  orders: 'novaCafeOrders',
  menu: 'novaCafeMenu',
  extras: 'novaCafeExtras'
};

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('fa');
  const [theme, setThemeState] = useState('default');
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState(null);
  const [menu, setMenu] = useState(COFFEE_MENU);
  const [menuPatches, setMenuPatches] = useState({});
  const [siteContent, setSiteContent] = useState(EMPTY_SITE_CONTENT);
  const [extraItems, setExtraItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefs = readStore(STORE.prefs, { language: 'fa', theme: 'default' });
    const savedTheme = prefs.theme === 'dark' ? 'default' : prefs.theme;
    const langParam = new URLSearchParams(window.location.search).get('lang');
    const nextLang = LANGS.includes(langParam) ? langParam : (LANGS.includes(prefs.language) ? prefs.language : 'fa');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    }
    setLanguage(nextLang);
    setThemeState(THEME_VALUES.includes(savedTheme) ? savedTheme : 'default');
    const savedUser = readStore(STORE.user, null);
    setUser(savedUser);
    const savedOrders = readStore(STORE.orders, []);
    setOrders(Array.isArray(savedOrders) ? savedOrders : []);
    const patches = readStore(STORE.menu, {});
    setMenuPatches(patches && typeof patches === 'object' ? patches : {});
    const extras = readStore(STORE.extras, []);
    const safeExtras = (Array.isArray(extras) ? extras : [])
      .filter((item) => item && item.id && item.names)
      .map((item) => ({ ...item, custom: true }));
    setExtraItems(safeExtras);
    setMenu(mergeMenu(COFFEE_MENU, patches && typeof patches === 'object' ? patches : {}, safeExtras));
    const savedSite = readStore(STORE.site, EMPTY_SITE_CONTENT);
    setSiteContent({ ...EMPTY_SITE_CONTENT, ...(savedSite && typeof savedSite === 'object' ? savedSite : {}) });
    if (prefs.theme === 'dark') {
      writeStore(STORE.prefs, { language: LANGS.includes(prefs.language) ? prefs.language : 'fa', theme: 'default' });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (theme === 'default') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' || language === 'ar' ? 'rtl' : 'ltr';
  }, [theme, language]);

  const setLanguageSafe = (next) => {
    const language = LANGS.includes(next) ? next : 'fa';
    setLanguage(language);
    writeStore(STORE.prefs, { language, theme });
  };

  const setTheme = (next) => {
    const safe = THEME_VALUES.includes(next) ? next : 'default';
    setThemeState(safe);
    writeStore(STORE.prefs, { language, theme: safe });
  };

  const signupUser = ({ username, password }) => {
    if (username.trim().toLowerCase() === ADMIN.username) {
      throw new Error('exists');
    }
    const users = readStore(STORE.users, []);
    if (users.some((item) => item.username === username)) {
      throw new Error('exists');
    }
    const record = { username, password };
    writeStore(STORE.users, [...users, record]);
    setUser(record);
    writeStore(STORE.user, record);
  };

  const loginUser = (userData) => {
    setUser(userData);
    writeStore(STORE.user, userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(STORE.user);
    setCart(null);
  };

  const findSavedUser = () => readStore(STORE.user, null);

  const findAccount = (username, password) => {
    if (isAdminLogin(username, password)) {
      return { username: ADMIN.username, role: 'admin' };
    }
    const users = readStore(STORE.users, []);
    return users.find((item) => item.username === username && item.password === password) || null;
  };

  const saveMenuPatches = (nextPatches, extras = extraItems) => {
    setMenuPatches(nextPatches);
    setMenu(mergeMenu(COFFEE_MENU, nextPatches, extras));
    writeStore(STORE.menu, nextPatches);
  };

  const saveExtras = (nextExtras, patches = menuPatches) => {
    setExtraItems(nextExtras);
    setMenu(mergeMenu(COFFEE_MENU, patches, nextExtras));
    writeStore(STORE.extras, nextExtras);
  };

  const updateSiteContent = (patch) => {
    if (!isAdminUser(user)) return;
    setSiteContent((prev) => {
      const next = { ...EMPTY_SITE_CONTENT, ...prev, ...patch };
      writeStore(STORE.site, next);
      return next;
    });
  };

  const updateMenuItem = (id, patch) => {
    if (!isAdminUser(user)) return;
    const next = {
      ...menuPatches,
      [id]: {
        ...(menuPatches[id] || {}),
        ...patch,
        names: { ...(menuPatches[id]?.names || {}), ...(patch.names || {}) },
        prices: { ...(menuPatches[id]?.prices || {}), ...(patch.prices || {}) },
        blurb: { ...(menuPatches[id]?.blurb || {}), ...(patch.blurb || {}) },
        details: {
          specs: { ...(menuPatches[id]?.details?.specs || {}), ...(patch.details?.specs || {}) },
          ingredients: { ...(menuPatches[id]?.details?.ingredients || {}), ...(patch.details?.ingredients || {}) }
        }
      }
    };
    saveMenuPatches(next);
  };

  const addMenuItem = ({ name, category, prices, blurb }) => {
    if (!isAdminUser(user)) return null;
    const label = String(name || '').trim();
    if (!label) return null;
    const id = `custom-${Date.now()}`;
    const item = {
      id,
      custom: true,
      available: true,
      removed: false,
      category: ['hot', 'cold', 'specialty'].includes(category) ? category : 'specialty',
      accent: '#6b4630',
      prices: {
        s: Number(prices?.s) || 0,
        m: Number(prices?.m) || 0,
        l: Number(prices?.l) || 0
      },
      names: { fa: label, en: label, ar: label, zh: label, es: label },
      blurb: { fa: blurb || '', en: blurb || '', ar: blurb || '', zh: blurb || '', es: blurb || '' },
      details: {
        specs: { fa: [], en: [], ar: [], zh: [], es: [] },
        ingredients: { fa: [], en: [], ar: [], zh: [], es: [] }
      }
    };
    saveExtras([...extraItems, item]);
    return id;
  };

  const removeMenuItem = (id) => {
    if (!isAdminUser(user)) return;
    if (String(id).startsWith('custom-')) {
      const nextExtras = extraItems.filter((item) => item.id !== id);
      const nextPatches = { ...menuPatches };
      delete nextPatches[id];
      saveExtras(nextExtras, nextPatches);
      writeStore(STORE.menu, nextPatches);
      setMenuPatches(nextPatches);
      return;
    }
    updateMenuItem(id, { removed: true });
  };

  const restoreMenuItem = (id) => {
    if (!isAdminUser(user)) return;
    updateMenuItem(id, { removed: false });
  };

  const placeOrder = (payload) => {
    const record = {
      id: `${Date.now()}`,
      username: user?.username || 'guest',
      status: 'active',
      createdAt: Date.now(),
      ...payload
    };
    setOrders((prev) => {
      const next = [record, ...prev];
      writeStore(STORE.orders, next);
      return next;
    });
    setCart(null);
    return record;
  };

  const cancelOrder = (id) => {
    setOrders((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item));
      writeStore(STORE.orders, next);
      return next;
    });
  };

  const getUserOrders = (username) => orders.filter((item) => item.username === username);

  const isLoggedIn = Boolean(user);
  const isAdmin = isAdminUser(user);

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        theme,
        orders,
        cart,
        setCart,
        menu,
        siteContent,
        isLoading,
        isLoggedIn,
        isAdmin,
        setLanguage: setLanguageSafe,
        setTheme,
        signupUser,
        loginUser,
        logoutUser,
        findSavedUser,
        findAccount,
        updateMenuItem,
        addMenuItem,
        removeMenuItem,
        restoreMenuItem,
        updateSiteContent,
        placeOrder,
        cancelOrder,
        getUserOrders
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
