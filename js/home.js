'use strict';

(() => {
  const house = document.querySelector('.dollhouse');
  if (!house) return;
  const image = house.querySelector('.dollhouse__image');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const page = document.querySelector('.home-page');
  let finished = false;
  let started = false;
  let fallback;

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(fallback);
    page.classList.remove('intro-pending', 'intro-opening');
    page.classList.add('intro-complete');
  }

  function start() {
    if (started || finished) return;
    started = true;
    if (reducedMotion.matches || document.hidden) return finish();
    // Two frames allow the closed position to paint before the doors rotate.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (finished) return;
      page.classList.add('intro-opening');
      fallback = setTimeout(finish, 3700);
    }));
  }

  if (reducedMotion.matches) return;
  page.classList.add('intro-pending');
  // Never hide content or trap keyboard users behind an intro.
  document.addEventListener('focusin', finish, { once: true });
  reducedMotion.addEventListener('change', (event) => { if (event.matches) finish(); });
  house.querySelector('.dollhouse__door--right').addEventListener('transitionend', (event) => {
    if (event.propertyName === 'transform') finish();
  });
  if (image.complete) start();
  else {
    image.addEventListener('load', start, { once: true });
    image.addEventListener('error', finish, { once: true });
  }
  // Includes slow images and background tabs; the original page remains usable.
  setTimeout(finish, 8000);
})();

// One shared camera transition for all existing room links. Native navigation
// remains the fallback for reduced motion, modified clicks and unsupported APIs.
(() => {
  const house = document.querySelector('.dollhouse');
  const source = house?.querySelector('.dollhouse__image');
  if (!source) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = null;

  function reset() {
    if (!active) return;
    const previous = active;
    active = null;
    clearTimeout(previous.timeout);
    clearTimeout(previous.overlap);
    previous.animation?.cancel();
    previous.source?.classList.remove('room-entry-source');
    previous.layer?.remove();
  }

  function navigate() {
    if (!active || active.navigating) return;
    active.navigating = true;
    clearTimeout(active.timeout);
    if (active.crossDocument && !reducedMotion.matches) {
      try {
        sessionStorage.setItem('voksen-crap:room-entry', JSON.stringify({ href: active.href, time: Date.now(), shared: true }));
      } catch { /* Ordinary navigation remains available without storage. */ }
    }
    window.location.assign(active.href);
  }

  house.addEventListener('click', (event) => {
    const link = event.target.closest('a.dollhouse__link');
    if (!link || !house.contains(link) || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    if (active) {
      event.preventDefault();
      return;
    }
    if (reducedMotion.matches || !source.complete || !source.naturalWidth ||
        typeof source.animate !== 'function') return;

    const crossDocument = window.VoksenRoomTransition?.supported === true;
    const preload = document.createElement('link');
    preload.rel = 'prefetch';
    preload.href = link.href;
    document.head.append(preload);

    // A native shared-element transition owns the whole movement. Do not run
    // the older full-house camera at the same time.
    if (crossDocument) {
      link.classList.add('room-entry-source');
      active = { source: link, href: link.href, crossDocument: true };
      event.preventDefault();
      navigate();
      return;
    }

    const room = link.getBoundingClientRect();
    const image = source.getBoundingClientRect();
    if (!room.width || !room.height || !image.width || !image.height) return;
    const viewport = window.visualViewport;
    const width = viewport?.width || window.innerWidth;
    const height = viewport?.height || window.innerHeight;
    const offsetX = viewport?.offsetLeft || 0;
    const offsetY = viewport?.offsetTop || 0;
    const centerX = room.left + room.width / 2 - image.left;
    const centerY = room.top + room.height / 2 - image.top;
    const scale = Math.max(width / room.width, height / room.height);
    const endX = offsetX + width / 2 - centerX * scale;
    const endY = offsetY + height / 2 - centerY * scale;

    const layer = document.createElement('div');
    layer.className = 'room-transition';
    layer.setAttribute('aria-hidden', 'true');
    const camera = source.cloneNode(false);
    camera.className = 'room-transition__image';
    camera.alt = '';
    layer.append(camera);
    layer.addEventListener('wheel', (wheel) => wheel.preventDefault(), { passive: false });
    document.body.append(layer);

    try {
      const animation = camera.animate([
        { width: `${image.width}px`, height: `${image.height}px`,
          transform: `translate(${image.left}px, ${image.top}px) scale(1)` },
        { width: `${image.width}px`, height: `${image.height}px`,
          transform: `translate(${endX}px, ${endY}px) scale(${scale})` }
      ], { duration: 1100, easing: 'cubic-bezier(.45, 0, .2, 1)', fill: 'both' });
      active = { layer, animation, href: link.href, crossDocument,
        timeout: setTimeout(navigate, 1400),
        overlap: null };
      event.preventDefault();
      animation.finished.then(navigate).catch(() => {});
    } catch {
      layer.remove();
      // The original anchor still navigates if animation setup fails.
    }
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) navigate();
  });
  // Never restore a frozen zoom from the browser's back/forward cache.
  window.addEventListener('pageshow', reset);
  window.addEventListener('pagehide', () => {
    // The outgoing transition must capture the camera, not the reset house.
    if (!active?.navigating) reset();
  });
  // Finish safely if orientation or viewport dimensions change mid-transition.
  window.addEventListener('resize', navigate);
})();
