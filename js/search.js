'use strict';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#hack-search');
const cards = [...document.querySelectorAll('[data-hack-card]')];
const emptyMessage = document.querySelector('.search-empty');
const statusMessage = document.querySelector('#search-status');
const notice = document.querySelector('.notice');

// Keep Danish letters, normalise equivalent Unicode forms and ignore case.
const normalise = (text) => text.normalize('NFC').toLocaleLowerCase('da-DK').trim();
const searchableCards = cards.map((card) => ({
  element: card,
  text: normalise(card.textContent),
}));

function filterHacks() {
  const terms = normalise(searchInput.value).split(/\s+/).filter(Boolean);
  let matches = 0;
  for (const card of searchableCards) {
    const visible = terms.every((term) => card.text.includes(term));
    card.element.hidden = !visible;
    matches += Number(visible);
  }
  emptyMessage.hidden = matches > 0;
  statusMessage.textContent = matches === 0
    ? 'Ingen hacks matcher din søgning.'
    : `${matches} ${matches === 1 ? 'hack fundet' : 'hacks fundet'}.`;
}

searchInput.addEventListener('input', filterHacks);
searchInput.addEventListener('search', filterHacks);
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  filterHacks();
});

// Only unavailable cards use status buttons; real links navigate normally.
for (const card of cards) {
  const button = card.querySelector('button');
  if (!button) continue;
  button.addEventListener('click', () => {
    const title = card.querySelector('.hack-card__title').textContent;
    document.querySelector('#notice-description').textContent = `${title}: Vejledningen er endnu ikke klar.`;
    if (typeof notice.showModal === 'function') {
      notice.showModal();
    } else {
      statusMessage.textContent = `${title}: Vejledningen er endnu ikke klar.`;
    }
  });
}

filterHacks();
