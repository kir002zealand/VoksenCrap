'use strict';

// Cross-document enhancement only: the pages remain ordinary HTML documents.
(() => {
  const key = 'voksen-crap:room-entry';
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let storageAvailable = false;
  try {
    sessionStorage.setItem(`${key}:check`, '1');
    sessionStorage.removeItem(`${key}:check`);
    storageAvailable = true;
  } catch { /* Keep the original navigation when storage is blocked. */ }
  const supported = storageAvailable && location.protocol !== 'file:' &&
    'onpageswap' in window && 'onpagereveal' in window && 'navigation' in window &&
    CSS.supports('view-transition-name', 'root');
  window.VoksenRoomTransition = { supported };

  function pending() {
    try {
      const value = JSON.parse(sessionStorage.getItem(key));
      return value && Date.now() - value.time < 15000 ? value : null;
    } catch { return null; }
  }
  function clear() {
    root.classList.remove('room-entry-transition');
    document.querySelectorAll('.room-entry-source, .room-entry-target').forEach((element) => {
      element.classList.remove('room-entry-source', 'room-entry-target');
    });
    try { sessionStorage.removeItem(key); } catch { /* No storage fallback. */ }
  }

  window.addEventListener('pageswap', (event) => {
    if (!event.viewTransition) return;
    const entry = pending();
    if (!supported || motion.matches || !entry ||
        event.activation?.navigationType === 'traverse' ||
        event.activation?.entry?.url !== entry.href) {
      event.viewTransition.skipTransition();
      return;
    }
    const source = document.querySelector('.room-entry-source');
    if (!source || !entry.shared) { event.viewTransition.skipTransition(); return; }
    root.classList.add('room-entry-transition');
    // Source names must not survive a restored page from the history cache.
    event.viewTransition.finished.then(() => {
      source.classList.remove('room-entry-source');
      root.classList.remove('room-entry-transition');
    }, () => {
      source.classList.remove('room-entry-source');
      root.classList.remove('room-entry-transition');
    });
  });

  window.addEventListener('pagereveal', (event) => {
    if (!event.viewTransition) { clear(); return; }
    const entry = pending();
    const activation = window.navigation?.activation;
    if (!supported || motion.matches || !entry || entry.href !== location.href ||
        activation?.navigationType === 'traverse') {
      event.viewTransition.skipTransition();
      clear();
      return;
    }
    const target = document.querySelector('.kitchen-illustration, .room-illustration');
    if (!target || !entry.shared) { event.viewTransition.skipTransition(); clear(); return; }
    target.classList.add('room-entry-target');
    root.classList.add('room-entry-transition');
    event.viewTransition.finished.then(clear, clear);
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) clear();
  });
})();
