// components/CookieConsentSection.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { recordConsent } from '../lib/api';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('corus_cookie_consent');
    if (stored === null) setShow(true);
    else setAccepted(stored === 'true');
  }, []);

  async function sendConsent(decision: boolean) {
    try {
      await recordConsent({
        consent: decision,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
    } catch (err) {
      console.error('Failed to send consent log', err);
    }
  }

  function acceptAll() {
    localStorage.setItem('corus_cookie_consent', 'true');
    setAccepted(true);
    setShow(false);
    sendConsent(true);
    if ((window as any).gtag) {
      (window as any).gtag('event', 'consent_granted');
    }
  }

  function decline() {
    localStorage.setItem('corus_cookie_consent', 'false');
    setAccepted(false);
    setShow(false);
    sendConsent(false);
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 z-50"
        >
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl rounded-2xl p-6 md:flex md:items-center md:justify-between gap-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="font-bold text-lg">We value your privacy</div>
              <div className="text-sm md:text-base text-white/80 max-w-md">
                We use cookies to improve your experience. You can accept all, decline, or manage preferences.
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button onClick={decline} className="px-5 py-2 rounded-lg border border-white/50 hover:bg-white/10">Decline</button>
              <button onClick={acceptAll} className="px-5 py-2 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-white/90">Accept All</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}