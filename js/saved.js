'use strict';

const favorites = window.VoksenFavorites;
const personalSection = document.querySelector('#personal-saved');
const personalList = document.querySelector('#personal-list');
const savedStatus = document.querySelector('#saved-status');
const savedNotice = document.querySelector('.notice');

function showUnavailable(title) {
  const message = `${title}: Vejledningen er endnu ikke klar.`;
  document.querySelector('#notice-description').textContent = message;
  if (typeof savedNotice.showModal === 'function') savedNotice.showModal();
  else savedStatus.textContent = message;
}

for (const button of document.querySelectorAll('button[data-example-id]')) {
  button.addEventListener('click', () => showUnavailable(button.querySelector('.hack-card__title').textContent));
}

function renderFavorites() {
  const ids = favorites.list();
  personalList.replaceChildren();
  personalSection.hidden = ids.length === 0;
  for (const id of ids) {
    const hack = favorites.catalog.find((item) => item.id === id);
    const item = document.createElement('li');
    const card = document.createElement(hack.href ? 'a' : 'button');
    card.className = 'hack-card';
    if (hack.href) card.href = hack.href;
    else {
      card.type = 'button';
      card.addEventListener('click', () => showUnavailable(hack.title));
    }
    for (const [className, text] of [['category', hack.category], ['title', hack.title], ['arrow', '']]) {
      const span = document.createElement('span');
      span.className = `hack-card__${className}`;
      span.textContent = text;
      if (className === 'arrow') span.setAttribute('aria-hidden', 'true');
      card.append(span);
    }
    item.append(card);
    personalList.append(item);
  }
  savedStatus.textContent = ids.length
    ? `${ids.length} personligt gemte hacks.`
    : 'Du har ingen personligt gemte hacks. De fire kort er eksempler.';
  if (!favorites.persistent) savedStatus.textContent += ' Lokal lagring er utilgængelig; ændringer kan kun huskes i denne session.';
}

window.addEventListener('favoriteschange', renderFavorites);
window.addEventListener('pageshow', renderFavorites);
renderFavorites();
