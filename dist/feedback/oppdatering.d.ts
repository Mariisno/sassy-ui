/**
 * New versions arrive on their own. Framework-free, no PWA plugin: the app's sw.js does skipWaiting + clients.claim,
 * and this module registers it, asks for a new one when the app comes to the foreground and every 30 minutes, and on
 * `controllerchange` reloads once, unless you are in the middle of something. Then `vedNyVersjon` listeners are told.
 */

/** Reload the page, once. The «Oppdater» action of NyVersjon. */
export declare function oppdater(): void;

/** Called when a new version waits because you were busy (at once, if it already waits). Returns a function that stops listening. */
export declare function vedNyVersjon(lytter: () => void): () => void;

/** Are you in the middle of something? Focus in a field, text in a field, or an open dialog (`dialog[open]`, `[aria-modal="true"]`). */
export declare function erOpptatt(): boolean;

export interface OppdateringOptions {
  /** The app's own reasons to wait with the reload, e.g. a session in progress. */
  opptatt?: () => boolean;
  /** How often to ask for a new worker, in ms. Default 30 minutes. */
  hver?: number;
}

/** Register the service worker at `swUrl` (`updateViaCache: 'none'`) and follow new versions. Does nothing without serviceWorker or on file:. */
export declare function startOppdatering(swUrl: string, options?: OppdateringOptions): void;
