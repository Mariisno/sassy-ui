import * as React from 'react';
/**
 * «Ny versjon»: a new version of the app is ready. A toast with «Oppdater» and «Senere», announced politely
 * (role="status") without moving focus. By default it renders its own ToastStack, which is the live region and
 * is in the page from the start, so keep the component mounted and open it with `open`.
 * Detection is the app's: see `startOppdatering` and `vedNyVersjon` in `dist/feedback/oppdatering.js`.
 * @startingPoint section="Feedback" subtitle="A new version is ready: Oppdater or Senere" viewport="700x220"
 */
export interface NyVersjonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Show the notice. Keep the component mounted while it is closed, so the live region exists before the toast arrives. */
  open?: boolean;
  /** «Oppdater»: reload the page, or whatever applies the new version. */
  onUpdate: () => void;
  /** «Senere»: close the notice. Without it there is no «Senere» (the notice stays until the app reloads). */
  onLater?: () => void;
  /** The update is on its way: «Oppdater» is disabled and aria-busy. Say why in `description`. */
  updating?: boolean;
  /** Default "Ny versjon". English surfaces pass "New version". */
  title?: React.ReactNode;
  /** One line under the title, e.g. "Oppdater når det passer deg." Nothing by default. */
  description?: React.ReactNode;
  /** Default "Oppdater". */
  updateLabel?: React.ReactNode;
  /** Default "Senere". */
  laterLabel?: React.ReactNode;
  /** Default true: the toast comes in its own ToastStack (bottom right, above AppShell's tab bar). Pass false
   * to render only the toast, inside the app's own ToastStack; on its own it is then role="status" itself. */
  stack?: boolean;
  /** Reach the ToastStack it renders (an id for a test, for instance). `id`, `data-*` and `aria-*` in the other props reach the toast. */
  stackProps?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}
export declare function NyVersjon(props: NyVersjonProps): React.JSX.Element | null;
