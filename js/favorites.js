'use strict';

// One catalog and storage API for guide hearts and the saved-guides page.
(() => {
  const key = 'voksen-crap:favorites:v1';
  const catalog = Object.freeze([
    { id: 'opvasker', category: 'KØKKEN', title: 'Klargør din opvasker', href: 'opvasker.html' },
    { id: 'sengetoej', category: 'SOVEVÆRELSE', title: 'Skift sengetøj', href: 'sengetoej.html' },
    { id: 'spejl', category: 'BADEVÆRELSE', title: 'Puds dit spejl', href: 'spejl.html' },
    { id: 'sofa', category: 'STUE', title: 'Støvsug sofaen', href: 'sofa.html' },
    { id: 'toejvask', category: 'VASKERUM', title: 'Sådan vasker du tøj', href: 'toejvask.html' },
    { id: 'vaerktoejskasse', category: 'VÆRKSTED', title: 'Orden i værktøjskassen', href: 'vaerktoejskasse.html' },
    { id: 'filer', category: 'KONTOR', title: 'Orden i dine filer', href: 'filer.html' },
    { id: 'plante', category: 'ALTAN', title: 'Vand din potteplante', href: 'plante.html' },
  ].map(Object.freeze));
  const validIds = new Set(catalog.map((hack) => hack.id));
  // Preserve an old laundry favorite; unfinished example hacks are not guides.
  const clean = (ids) => Array.isArray(ids)
    ? [...new Set(ids.map((id) => id === 'vask-toej-rigtigt' ? 'toejvask' : id)
      .filter((id) => validIds.has(id)))] : [];
  let memory = [];
  let persistent = true;
  let memoryOnly = false;

  function read() {
    if (memoryOnly) return [...memory];
    let raw;
    try {
      raw = window.localStorage.getItem(key);
      persistent = true;
    } catch {
      persistent = false;
      return [...memory];
    }
    try { memory = clean(raw === null ? [] : JSON.parse(raw)); }
    catch { memory = []; }
    return [...memory];
  }

  function write(ids) {
    memory = clean(ids);
    try {
      window.localStorage.setItem(key, JSON.stringify(memory));
      persistent = true;
    } catch {
      persistent = false;
      memoryOnly = true;
    }
    window.dispatchEvent(new Event('favoriteschange'));
    return persistent;
  }

  function updateButton(button, saved) {
    const hack = catalog.find((item) => item.id === button.dataset.favoriteId);
    if (!hack) return;
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', `${saved ? 'Fjern fra gemte guides' : 'Gem guide'}: ${hack.title}`);
  }

  function createButton(id) {
    if (!validIds.has(id)) return null;
    const button = document.createElement('button');
    button.className = 'favorite-button';
    button.type = 'button';
    button.dataset.favoriteId = id;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z');
    svg.append(path);
    button.append(svg);
    updateButton(button, read().includes(id));
    return button;
  }

  const api = Object.freeze({
    catalog, list: read, createButton,
    add(id) { return validIds.has(id) ? write([...read(), id]) : false; },
    remove(id) { return write(read().filter((savedId) => savedId !== id)); },
    get persistent() { return persistent; },
  });
  window.VoksenFavorites = api;

  function syncButtons() {
    const ids = read();
    document.querySelectorAll('button[data-favorite-id]').forEach((button) => {
      updateButton(button, ids.includes(button.dataset.favoriteId));
    });
    const status = document.querySelector('#favorite-status');
    if (status && !persistent) {
      status.classList.remove('visually-hidden');
      status.textContent = 'Browseren tillader ikke lokal lagring. Dine favoritter kan derfor ikke huskes, når du forlader siden.';
    }
  }

  const guideId = document.body.dataset.guideId;
  const intro = document.querySelector('.hack-intro');
  if (intro && validIds.has(guideId)) {
    intro.append(createButton(guideId));
    const status = document.createElement('p');
    status.id = 'favorite-status';
    status.className = 'visually-hidden favorite-status';
    status.setAttribute('role', 'status');
    document.querySelector('main').append(status);
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-favorite-id]');
    if (!button) return;
    const id = button.dataset.favoriteId;
    if (!validIds.has(id)) return;
    const saved = read().includes(id);
    if (saved) api.remove(id);
    else api.add(id);
    const status = document.querySelector('#favorite-status');
    if (status && persistent) {
      const hack = catalog.find((item) => item.id === id);
      status.textContent = `${hack.title} er ${saved ? 'fjernet fra' : 'føjet til'} dine gemte guides.`;
    }
  });
  window.addEventListener('favoriteschange', syncButtons);
  window.addEventListener('pageshow', syncButtons);
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      read();
      window.dispatchEvent(new Event('favoriteschange'));
    }
  });
  syncButtons();
})();
