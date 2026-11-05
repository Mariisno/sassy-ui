import * as React from 'react';
/**
 * Modal dialog with scrim. Focus moves in on open, Tab stays inside, and focus returns to the opener on close.
 * Named by `title` (aria-labelledby) and described by `description` (aria-describedby).
 * Closes on Esc and scrim click when onClose is given. Locks page scroll unless `inline`.
 * `variant="sheet"` is the same dialog risen from the bottom of the screen.
 */
/** id, data-* and aria-* reach the panel (role="dialog"). */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Right-aligned actions, typically `<Button variant="ghost">Keep it</Button><Button variant="danger">Delete project</Button>` */
  footer?: React.ReactNode;
  /** Width: 440 / 600 px for the dialog, 560 / 720 px for the sheet. */
  size?: 'md' | 'lg';
  /**
   * `dialog` (default) is centred. `sheet` slides up from the bottom: full width on a phone, capped and centred on a
   * bigger screen, rounded top corners, a grab handle, padding for the home indicator, at most 90% of the height with
   * the body scrolling inside. Same modal behaviour as the dialog.
   */
  variant?: 'dialog' | 'sheet';
  /** Position the scrim absolutely inside the nearest positioned parent (for previews/embeds). Ignores `portal`. */
  inline?: boolean;
  /**
   * Render into document.body instead of where it is used, so a positioned or transformed parent (a sidebar, a
   * floating button group) cannot draw over it. A dialog opened from inside another one may use it: only the innermost
   * open dialog keeps focus and handles Esc and Tab. Off by default; no effect without a document (a build-time render). In a prerendered app, open it after hydration, or the portal does not match the server HTML.
   */
  portal?: boolean;
  /** Accessible name of the close button. Default "Lukk"; English surfaces pass "Close". */
  closeLabel?: string;
  /** Element to focus on open. Default: [autofocus]/[data-autofocus], then the first control in the body, then the panel itself (never a footer button, so Enter can't confirm by accident). */
  initialFocus?: React.RefObject<HTMLElement | null>;
  className?: string;
}
export declare function Dialog(props: DialogProps): React.JSX.Element | null;
