'use strict';

(() => {
  const button = document.querySelector('.desktop-menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  if (!button || !navigation) return;
  const desktop = window.matchMedia('(min-width: 1024px)');
  let open = false;

  function setOpen(value, restoreFocus = false) {
    open = value;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
    navigation.hidden = desktop.matches && !open;
    if (restoreFocus) button.focus();
  }

  function updateLayout() {
    const focused = document.activeElement;
    button.hidden = !desktop.matches;
    setOpen(false);
    if (desktop.matches && navigation.contains(focused)) button.focus();
    if (!desktop.matches && focused === button) navigation.querySelector('a').focus();
  }

  button.addEventListener('click', () => setOpen(!open));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && desktop.matches && open) {
      setOpen(false, true);
    }
  });
  document.addEventListener('click', (event) => {
    if (desktop.matches && open && !navigation.contains(event.target) && !button.contains(event.target)) {
      setOpen(false);
    }
  });
  document.addEventListener('focusin', (event) => {
    if (desktop.matches && open && !navigation.contains(event.target) && !button.contains(event.target)) {
      setOpen(false);
    }
  });
  desktop.addEventListener('change', updateLayout);
  updateLayout();
})();
