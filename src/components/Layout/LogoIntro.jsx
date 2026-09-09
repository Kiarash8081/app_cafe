import React, { useEffect, useRef } from 'react';
import { CoffeeCup } from '../Common/CoffeeCup';
import { RingFrame } from '../Common/RingFrame';
import './LogoIntro.css';

export function LogoIntro({ onComplete = () => {}, dataReady = false }) {
  const dataReadyRef = useRef(dataReady);
  dataReadyRef.current = dataReady;

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const minimum = reduced ? 180 : 1700;
    const started = Date.now();

    const waitForData = () => new Promise((resolve) => {
      const tick = () => {
        if (cancelled || dataReadyRef.current) {
          resolve();
          return;
        }
        window.requestAnimationFrame(tick);
      };
      tick();
    });

    waitForData()
      .then(() => {
        const remain = minimum - (Date.now() - started);
        return remain > 0 ? new Promise((resolve) => window.setTimeout(resolve, remain)) : undefined;
      })
      .then(() => {
        if (!cancelled) onComplete();
      });

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div className="logo-intro" role="presentation">
      <RingFrame className="is-live">
        <div className="ring-intro-mark">
          <CoffeeCup className="intro-cup" />
          <strong>NOVA</strong>
          <small>CAFÉ</small>
        </div>
      </RingFrame>
    </div>
  );
}
