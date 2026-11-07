/**
 * Tells a screen reader something that has no place on the screen as text. Framework-free and safe to import
 * on a server: the live region is created on the first call, visually hidden, and stays in the page.
 */

export interface KunngjorValg {
  /** `true` reads the message at once, interrupting what is being read (an assertive region, `role="alert"`). Only for what cannot wait: a lost connection, a failed save. Default false: polite, after what is being read. */
  haster?: boolean;
}

/** Announce `melding` to screen readers through a visually hidden live region. Each call empties the region and writes the message a moment later, so a repeat is read again; calls within that moment are read together. Moves into an open modal dialog. Does nothing on a server or with an empty message. */
export declare function kunngjor(melding: string, valg?: KunngjorValg): void;
