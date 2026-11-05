import React from 'react';
import { Icon } from '../icon/Icon.jsx';
import { IconButton } from '../buttons/IconButton.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// An inline message that stays where it is until the app removes it: a soft status fill with the matching
// -fg text (like Badge), an icon per tone so colour is never the only signal, an optional title, actions
// and a close button. role="status" (polite) by default; role="alert" only for tone="danger" with `urgent`,
// which is meant for a message that appears because of something the person just did. Nothing here takes
// the focus: the alert is announced, not focused. Closing moves the focus to the control before the alert
// (or `focusOnClose`), so it does not fall to <body> when the alert leaves the page.
const ICONS = { info: 'info', success: 'circle-check', warning: 'triangle-alert', danger: 'circle-alert' };
const FOCUSABLE = 'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

// The focusable element nearest before the alert in the document, else the nearest after it.
export function focusBefore(el) {
  const all = [...el.ownerDocument.querySelectorAll(FOCUSABLE)].filter((f) => !el.contains(f) && f.offsetParent !== null);
  const before = all.filter((f) => el.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_PRECEDING);
  return before[before.length - 1] || all.find((f) => el.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) || null;
}

export function Alert({ tone = 'info', title, urgent = false, actionLabel, onAction, actions, onClose, closeLabel = 'Lukk', focusOnClose, className, style, children, ...rest }) {
  const ref = React.useRef(null);
  const role = tone === 'danger' && urgent ? 'alert' : 'status';
  const close = () => {
    const target = focusOnClose?.current || (ref.current && focusBefore(ref.current));
    if (target && typeof target.focus === 'function') target.focus();
    onClose?.();
  };
  return (
    <div ref={ref} role={role} className={cx('s-alert', 's-alert--' + tone, className)} style={style} {...rest}>
      <Icon name={ICONS[tone] || 'info'} size={18} className="s-alert__icon" />
      <div className="s-alert__body">
        {title ? <div className="s-alert__title">{title}</div> : null}
        {children ? <div className="s-alert__text">{children}</div> : null}
        {actionLabel || actions ? (
          <div className="s-alert__actions">
            {actionLabel ? <button type="button" className="s-alert__action" onClick={onAction}>{actionLabel}</button> : null}
            {actions}
          </div>
        ) : null}
      </div>
      {onClose ? <IconButton icon="x" label={closeLabel} size="sm" className="s-alert__close" onClick={close} /> : null}
    </div>
  );
}
