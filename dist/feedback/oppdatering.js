// Sussi 0.9.0. Built from components/; edit the source, not this file.
const HVER = 30 * 60 * 1e3;
const lyttere = /* @__PURE__ */ new Set();
let ventende = false;
let lastet = false;
function oppdater() {
  if (lastet) return;
  lastet = true;
  location.reload();
}
function vedNyVersjon(lytter) {
  lyttere.add(lytter);
  if (ventende) lytter();
  return () => {
    lyttere.delete(lytter);
  };
}
function erOpptatt() {
  const a = document.activeElement;
  if (a && a !== document.body && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return true;
  if (document.querySelector('dialog[open], [aria-modal="true"]')) return true;
  const felt = document.querySelectorAll(
    'textarea, input:not([type]), input[type="text"], input[type="search"], input[type="number"], input[type="email"], input[type="url"], input[type="tel"]'
  );
  for (const f of felt) if (!f.readOnly && !f.disabled && f.value.trim()) return true;
  return false;
}
function startOppdatering(swUrl, { opptatt = () => false, hver = HVER } = {}) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator) || location.protocol === "file:") return;
  const sw = navigator.serviceWorker;
  let hadde = !!sw.controller;
  sw.addEventListener("controllerchange", () => {
    if (!hadde) {
      hadde = true;
      return;
    }
    if (!erOpptatt() && !opptatt()) return oppdater();
    ventende = true;
    lyttere.forEach((l) => l());
  });
  sw.register(swUrl, { updateViaCache: "none" }).then((reg) => {
    const sjekk = () => {
      reg.update().catch(() => void 0);
    };
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") sjekk();
    });
    setInterval(sjekk, hver);
  }).catch(() => void 0);
}
export {
  erOpptatt,
  oppdater,
  startOppdatering,
  vedNyVersjon
};
