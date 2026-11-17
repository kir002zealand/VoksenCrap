'use strict';

// Shared storage API. Examples are never automatically saved.
(() => {
  const key = 'voksen-crap:favorites:v1';
  const catalog = Object.freeze([
    { id: 'rengoer-ovnen', category: 'KØKKEN', title: 'Rengør ovnen' },
    { id: 'fjern-kalk', category: 'BADEVÆRELSE', title: 'Fjern kalk fra bruseren' },
    { id: 'vask-toej-rigtigt', category: 'VASKERUM', title: 'Vask dit tøj rigtigt' },
    { id: 'hold-budget', category: 'ØKONOMI', title: 'Hold styr på budgettet' },
    { id: 'opvasker', category: 'KØKKEN', title: 'Klargør din opvasker', href: 'opvasker.html' },
  ].map(Object.freeze));
  const validIds = new Set(catalog.map((hack) => hack.id));
  const clean = (ids) => Array.isArray(ids)
    ? [...new Set(ids.filter((id) => validIds.has(id)))] : [];
  let memory = [];
  let available = true;
  let memoryOnly = false;

  function read() {
    if (memoryOnly) return [...memory];
    try {
      const raw = window.localStorage.getItem(key);
      memory = clean(raw === null ? [] : JSON.parse(raw));
      available = true;
    } catch {
      // Keep this session usable if storage is disabled or its data is invalid.
      available = false;
    }
    return [...memory];
  }

  function write(ids) {
    memory = clean(ids);
    try {
      window.localStorage.setItem(key, JSON.stringify(memory));
      available = true;
    } catch { available = false; memoryOnly = true; }
    window.dispatchEvent(new Event('favoriteschange'));
    return available;
  }

  window.VoksenFavorites = Object.freeze({
    catalog,
    list: read,
    add(id) {
      if (!validIds.has(id)) return false;
      return write([...read(), id]);
    },
    remove(id) { return write(read().filter((savedId) => savedId !== id)); },
    get persistent() { return available; },
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      read();
      window.dispatchEvent(new Event('favoriteschange'));
    }
  });
})();
