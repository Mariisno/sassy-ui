// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
const PAUSE = 100;
const FORSTE = 500;
const TOM = 7e3;
const SKJULT = "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0";
const regioner = {};
function erModal(el) {
  if (el.getAttribute("aria-modal") === "true") return true;
  try {
    return el.matches(":modal");
  } catch {
    return false;
  }
}
function synlig(el) {
  if (!el.isConnected || el.closest('[aria-hidden="true"]')) return false;
  return typeof el.checkVisibility === "function" ? el.checkVisibility() : el.getClientRects().length > 0;
}
function vert() {
  const modale = [...document.querySelectorAll('dialog[open], [aria-modal="true"]')].filter((el) => erModal(el) && synlig(el));
  return modale[modale.length - 1] || document.body;
}
function skriv(r) {
  const host = vert();
  if (!r.el.isConnected || r.el.parentNode !== host) {
    host.appendChild(r.el);
    r.el.textContent = "";
    r.sett = setTimeout(() => skriv(r), FORSTE);
    return;
  }
  r.el.textContent = r.ventende.join(" ");
  r.ventende = [];
  r.tom = setTimeout(() => {
    r.el.textContent = "";
  }, TOM);
}
function kunngjor(melding, { haster = false } = {}) {
  if (typeof document === "undefined" || !document.body) return;
  const tekst = String(melding ?? "").trim();
  if (!tekst) return;
  const art = haster ? "assertive" : "polite";
  let r = regioner[art];
  if (!r || r.el.ownerDocument !== document) {
    const el = document.createElement("div");
    el.setAttribute("role", haster ? "alert" : "status");
    el.setAttribute("aria-live", art);
    el.setAttribute("aria-atomic", "true");
    el.setAttribute("data-s-kunngjor", art);
    el.style.cssText = SKJULT;
    r = regioner[art] = { el, sett: 0, tom: 0, ventende: [] };
  }
  const host = vert();
  const ny = r.el.parentNode !== host;
  if (ny) host.appendChild(r.el);
  clearTimeout(r.sett);
  clearTimeout(r.tom);
  r.ventende.push(tekst);
  r.el.textContent = "";
  r.sett = setTimeout(() => skriv(r), ny ? FORSTE : PAUSE);
}
export {
  kunngjor
};
