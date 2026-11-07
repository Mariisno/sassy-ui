// Tells a screen reader something that has no place on the screen as text: «Lagret», «3 planter funnet»,
// «Raden er flyttet ned». Framework-free, no dependencies, safe to import on a server: nothing touches the
// document until the first call.
//
// The message goes through a live region that is created the first time it is needed, visually hidden
// (1 px and clipped, never display:none, so it is read) and kept in the page from then on: one polite region
// (role="status"), and one assertive region (role="alert") the first time `haster` is used. Each call
// empties the region, waits a moment and then writes the message, so the same message twice is read twice.
// Messages that come within that moment are read together, in order. The text is removed again after a
// while, so nobody browsing the page meets it later. While a modal dialog is open and shown (a <dialog> opened
// as modal, or aria-modal="true", as Sassy's Dialog is), the region moves into it: a screen reader treats
// everything outside a modal dialog as gone, live regions included. If that dialog closes before the message
// is written, the region moves back and the message is written there.
const PAUSE = 100; // between emptying and writing
const FORSTE = 500; // the first time a region is in the page (or has moved), so the reader has seen it before it changes
const TOM = 7000; // until the text is removed again
const SKJULT = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0';
const regioner = {};

function erModal(el) {
  if (el.getAttribute('aria-modal') === 'true') return true;
  try { return el.matches(':modal'); } catch { return false; }
}
// A dialog that is in the page and shown: a hidden one (display:none, [hidden], under aria-hidden) is not a host.
function synlig(el) {
  if (!el.isConnected || el.closest('[aria-hidden="true"]')) return false;
  return typeof el.checkVisibility === 'function' ? el.checkVisibility() : el.getClientRects().length > 0;
}
// The innermost open, shown modal dialog, or <body>.
function vert() {
  const modale = [...document.querySelectorAll('dialog[open], [aria-modal="true"]')].filter((el) => erModal(el) && synlig(el));
  return modale[modale.length - 1] || document.body;
}
// Write what waits, unless the region has been taken out of the page or should be somewhere else by now (the
// dialog it was in closed in the same tick as the call: save → kunngjor('Lagret') → close). Then it moves to
// where it belongs and waits FORSTE again, so the reader sees it there before it changes.
function skriv(r) {
  const host = vert();
  if (!r.el.isConnected || r.el.parentNode !== host) {
    host.appendChild(r.el);
    r.el.textContent = '';
    r.sett = setTimeout(() => skriv(r), FORSTE);
    return;
  }
  r.el.textContent = r.ventende.join(' ');
  r.ventende = [];
  r.tom = setTimeout(() => { r.el.textContent = ''; }, TOM);
}

/** Announce `melding` to screen readers: politely (after what is being read) by default, at once with `haster`. Does nothing without a document (on a server) or with an empty message. */
export function kunngjor(melding, { haster = false } = {}) {
  if (typeof document === 'undefined' || !document.body) return;
  const tekst = String(melding ?? '').trim();
  if (!tekst) return;
  const art = haster ? 'assertive' : 'polite';
  let r = regioner[art];
  if (!r || r.el.ownerDocument !== document) {
    const el = document.createElement('div');
    el.setAttribute('role', haster ? 'alert' : 'status');
    el.setAttribute('aria-live', art);
    el.setAttribute('aria-atomic', 'true');
    el.setAttribute('data-s-kunngjor', art);
    el.style.cssText = SKJULT;
    r = regioner[art] = { el, sett: 0, tom: 0, ventende: [] };
  }
  const host = vert();
  const ny = r.el.parentNode !== host;
  if (ny) host.appendChild(r.el);
  clearTimeout(r.sett);
  clearTimeout(r.tom);
  r.ventende.push(tekst);
  r.el.textContent = '';
  r.sett = setTimeout(() => skriv(r), ny ? FORSTE : PAUSE);
}
