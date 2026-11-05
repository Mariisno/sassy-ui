// New versions arrive on their own, also in the app on the home screen. Framework-free; no PWA plugin.
//
// A home-screen app (on an iPhone above all) is almost never reloaded: it is brought back from memory.
// So the app asks for a new service worker itself when it comes to the foreground and every 30 minutes.
// When a new one takes over (the app's sw.js does skipWaiting + clients.claim, so `controllerchange` fires),
// the page reloads once, unless you are in the middle of something: focus or text in a field, an open dialog,
// or what the app itself says is busy (`opptatt`). Then the `vedNyVersjon` listeners are told, and the app
// shows <NyVersjon> with «Oppdater» (`oppdater`) and «Senere».
//
// Call startOppdatering once per page. The state lives in this module, so every vedNyVersjon listener hears the same new version.
const HVER = 30 * 60 * 1000;

const lyttere = new Set();
let ventende = false;
let lastet = false;

/** Reload the page, once. The toast's «Oppdater». */
export function oppdater() {
  if (lastet) return;
  lastet = true;
  location.reload();
}

/** Called when a new version waits because you are busy (at once, if it already waits). Returns a function that stops listening. */
export function vedNyVersjon(lytter) {
  lyttere.add(lytter);
  if (ventende) lytter();
  return () => { lyttere.delete(lytter); };
}

/** Are you in the middle of something? Focus in a field, text in a field, or an open dialog. */
export function erOpptatt() {
  const a = document.activeElement;
  if (a && a !== document.body && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return true;
  if (document.querySelector('dialog[open], [aria-modal="true"]')) return true;
  const felt = document.querySelectorAll(
    'textarea, input:not([type]), input[type="text"], input[type="search"], input[type="number"], input[type="email"], input[type="url"], input[type="tel"]',
  );
  for (const f of felt) if (!f.readOnly && !f.disabled && f.value.trim()) return true;
  return false;
}

/**
 * Register the service worker and follow new versions.
 * `opptatt` adds the app's own reasons to wait (a session in progress, a save on its way).
 * `hver` is how often to ask for a new worker, in ms (default 30 minutes).
 */
export function startOppdatering(swUrl, { opptatt = () => false, hver = HVER } = {}) {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator) || location.protocol === 'file:') return;
  const sw = navigator.serviceWorker;
  let hadde = !!sw.controller; // no controller: first install, and the page is already fresh

  sw.addEventListener('controllerchange', () => {
    if (!hadde) { hadde = true; return; }
    if (!erOpptatt() && !opptatt()) return oppdater();
    ventende = true;
    lyttere.forEach((l) => l());
  });

  sw.register(swUrl, { updateViaCache: 'none' })
    .then((reg) => {
      const sjekk = () => { reg.update().catch(() => undefined); };
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') sjekk(); });
      setInterval(sjekk, hver);
    })
    .catch(() => undefined);
}
