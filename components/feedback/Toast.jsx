import React from 'react';
import { Icon } from '../icon/Icon.jsx';
import { IconButton } from '../buttons/IconButton.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// ToastStack is the live region. It is in the page from the start, so a toast added to it is announced;
// a region that arrives already filled is often read by no one. A toast inside it has no role of its own.
// Exported for NyVersjon, which is built from the toast's parts; not part of the public types.
export const toastStackContext = React.createContext(false);
const InStack = toastStackContext;

const ICONS = { neutral: 'info', success: 'circle-check', warning: 'triangle-alert', danger: 'circle-alert', info: 'info' };
export function Toast({ tone = 'neutral', title, description, actionLabel, onAction, onClose, closeLabel = 'Lukk', className, style, ...rest }) {
  const inStack = React.useContext(InStack);
  return (
    <div role={inStack ? undefined : 'status'} className={cx('s-toast', 's-toast--' + tone, className)} style={style} {...rest}>
      <Icon name={ICONS[tone] || 'info'} size={18} className="s-toast__icon" />
      <div className="s-toast__body">
        {title ? <div className="s-toast__title">{title}</div> : null}
        {description ? <div className="s-toast__desc">{description}</div> : null}
        {actionLabel ? <button type="button" className="s-toast__action" onClick={onAction}>{actionLabel}</button> : null}
      </div>
      {onClose ? <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} style={{ margin: '-6px -6px 0 0' }} /> : null}
    </div>
  );
}
export function ToastStack({ children, className, ...rest }) {
  return (
    <div role="status" aria-live="polite" aria-relevant="additions text" className={cx('s-toast-stack', className)} {...rest}>
      <InStack.Provider value={true}>{children}</InStack.Provider>
    </div>
  );
}
