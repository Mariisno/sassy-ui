import * as React from 'react';
/** Transient, non-blocking feedback. Pair destructive actions with an Undo action instead of a confirm dialog. */
/** id, data-* and aria-* reach the toast element. */
export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  /** Accessible name of the close button. Default "Lukk" (like Dialog); English surfaces pass "Dismiss". */
  closeLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): React.JSX.Element;
/** Fixed bottom-right container for stacking toasts, and their live region (role="status"). Render it from the start, empty, and add toasts to it. */
export declare function ToastStack(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
