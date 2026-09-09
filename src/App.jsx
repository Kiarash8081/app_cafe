import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Background } from './components/Layout/Background';
import { Header } from './components/Layout/Header';
import { LogoIntro } from './components/Layout/LogoIntro';
import { UserPanel } from './components/UserPanel/UserPanel';
import { HomePage } from './components/Home/HomePage';
import { SiteFooter } from './components/Layout/SiteFooter';
import { LoginPage } from './components/Auth/LoginPage';
import { AdminLoginPage } from './components/Auth/AdminLoginPage';
import { SignupPage } from './components/Auth/SignupPage';
import { MenuPage } from './components/Menu/MenuPage';
import { OrderPage } from './components/Order/OrderPage';
import { PaymentPage } from './components/Payment/PaymentPage';
import { MyOrdersPage } from './components/User/MyOrdersPage';
import { ContactPage } from './components/Contact/ContactPage';
import { TermsPage } from './components/Legal/TermsPage';
import { AdminPage } from './components/Admin/AdminPage';
import { Seo } from './components/Seo/Seo';
import './styles/App.css';

function AppShell({ siteReady, onIntroDone }) {
  const { isLoading } = useApp();

  return (
    <>
      {!siteReady && <LogoIntro onComplete={onIntroDone} dataReady={!isLoading} />}
      <Seo />
      <Background />
      <UserPanel />
      <div className={`site ${siteReady ? 'site-visible' : ''}`} id="mainSite">
        <div id="site-content">
          <Header />
          <HomePage />
        </div>
        <SiteFooter />
      </div>
      <LoginPage />
      <AdminLoginPage />
      <SignupPage />
      <MenuPage />
      <OrderPage />
      <PaymentPage />
      <MyOrdersPage />
      <ContactPage />
      <TermsPage />
      <AdminPage />
    </>
  );
}

function App() {
  const [siteReady, setSiteReady] = React.useState(false);
  const handleIntroDone = React.useCallback(() => setSiteReady(true), []);

  React.useEffect(() => {
    document.body.classList.toggle('intro-active', !siteReady);
    return () => document.body.classList.remove('intro-active');
  }, [siteReady]);

  return (
    <AppProvider>
      <AppShell siteReady={siteReady} onIntroDone={handleIntroDone} />
    </AppProvider>
  );
}

export default App;
