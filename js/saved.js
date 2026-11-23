'use strict';

(() => {
  const favorites = window.VoksenFavorites;
  const list = document.querySelector('#personal-list');
  const empty = document.querySelector('#saved-empty');
  const status = document.querySelector('#saved-status');
  const heading = document.querySelector('#personal-title');
  if (!favorites || !list) return;

  function renderFavorites() {
    const ids = favorites.list();
    const focused = document.activeElement;
    const previousItems = [...list.children];
    const focusedItem = focused?.closest('[data-saved-id]');
    const hadFocus = focusedItem && list.contains(focusedItem);
    const focusedIndex = hadFocus ? previousItems.indexOf(focusedItem) : -1;
    const focusedId = hadFocus ? focusedItem.dataset.savedId : null;
    const wasButton = focused?.matches('button');
    const fragment = document.createDocumentFragment();

    for (const id of ids) {
      const hack = favorites.catalog.find((item) => item.id === id);
      const item = document.createElement('li');
      item.className = 'saved-guide';
      item.dataset.savedId = id;
      const card = document.createElement('a');
      card.className = 'hack-card';
      card.href = hack.href;
      for (const [name, text] of [['category', hack.category], ['title', hack.title], ['arrow', '']]) {
        const span = document.createElement('span');
        span.className = `hack-card__${name}`;
        span.textContent = text;
        if (name === 'arrow') span.setAttribute('aria-hidden', 'true');
        card.append(span);
      }
      item.append(card, favorites.createButton(id));
      fragment.append(item);
    }
    list.replaceChildren(fragment);
    list.hidden = ids.length === 0;
    empty.hidden = ids.length > 0;

    // Keep keyboard focus on the same guide, or the next available remove button.
    if (hadFocus) {
      const items = [...list.children];
      const replacement = items.find((item) => item.dataset.savedId === focusedId)
        || items[Math.min(focusedIndex, items.length - 1)];
      if (replacement) replacement.querySelector(wasButton ? 'button' : 'a').focus();
      else heading.focus();
    }
    status.textContent = ids.length
      ? `${ids.length} ${ids.length === 1 ? 'gemt guide' : 'gemte guides'}.`
      : 'Du har ikke gemt nogen guides endnu.';
    status.classList.toggle('visually-hidden', favorites.persistent);
    if (!favorites.persistent) {
      status.textContent += ' Browseren tillader ikke lokal lagring. Ændringer kan ikke huskes, når du forlader siden.';
    }
  }

  window.addEventListener('favoriteschange', renderFavorites);
  window.addEventListener('pageshow', renderFavorites);
  renderFavorites();
})();
