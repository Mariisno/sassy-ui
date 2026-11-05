import * as React from 'react';
/**
 * An inline message that stays on the page until the app removes it: a soft status fill with the matching text
 * colour, an icon per tone (so colour is never the only signal), an optional title, an action and a close button.
 * `role="status"` (polite) by default; `role="alert"` only for `tone="danger"` with `urgent`. It never takes the focus.
 * Closing moves the focus to the control before the alert, or to `focusOnClose`, so it does not fall to the body.
 * @startingPoint section="Feedback" subtitle="Info, success, warning, danger" viewport="700x420"
 */
export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The status colours and icon: `info` (default), `success`, `warning` or `danger`. */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** One short line in medium weight above the text. Leave it out when the text is one line. */
  title?: React.ReactNode;
  /** The message. One or two sentences: what happened and what to do next. */
  children?: React.ReactNode;
  /** Only with `tone="danger"`: `role="alert"` (assertive) instead of `role="status"`. Set it when the alert appears because of something the person just did (a save that failed), never on one that is in the page from the start. */
  urgent?: boolean;
  /** A text action in the alert's own colour, e.g. «Prøv igjen». */
  actionLabel?: string;
  onAction?: () => void;
  /** More controls after the action, e.g. a small secondary Button. */
  actions?: React.ReactNode;
  /** Shows the close button. The app removes the alert; the focus moves first. */
  onClose?: () => void;
  /** Accessible name of the close button. Default "Lukk"; English surfaces pass "Dismiss". */
  closeLabel?: string;
  /** Where the focus goes when the alert is closed. Default: the focusable element nearest before the alert. */
  focusOnClose?: React.RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): React.JSX.Element;
