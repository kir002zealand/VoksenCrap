"use strict";

// Stable hack identifier; add its real page URL when that page is implemented.
const ovenButton = document.querySelector('[data-hack="rengoer-ovnen"]');
const notice = document.querySelector('.notice');

if (ovenButton && notice && typeof notice.showModal === 'function') {
  ovenButton.hidden = false;
  ovenButton.addEventListener('click', () => notice.showModal());
}
