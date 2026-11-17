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
