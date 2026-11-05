import React from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../buttons/IconButton.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
// Controls inside an open Popover or Menu panel are left out: the popover moves focus back through its trigger on Tab,
// so the dialog's first and last are the dialog's own, also with a popover rendered in place inside it.
const focusables = (el) => Array.from(el.querySelectorAll(FOCUSABLE)).filter((n) => n.getClientRects().length > 0 && !n.closest('.s-popover__panel'));
// Whether a focused node is inside this dialog or in a Popover/Menu panel that was opened from inside it (through the
// portal, so not in the dialog's DOM): the panel's id is on the aria-controls of its trigger. A panel opened from
// another panel is followed up the chain. A popover elsewhere on the page does not count.
const belongs = (el, node) => {
  for (let n = node; n; ) {
    if (el.contains(n)) return true;
    const panel = n.closest('.s-popover__panel');
    if (!panel || !panel.id) return false;
    n = document.querySelector(`[aria-controls="${panel.id}"]`);
  }
  return false;
};

// The open panels, innermost last. A dialog rendered through a portal is not inside the DOM of the dialog
// that opened it, so only the innermost one keeps focus in and traps Tab; the ones beneath wait their turn.
const OPEN = [];
const innermost = (el) => OPEN[OPEN.length - 1] === el;

// Modal dialog (WAI-ARIA dialog pattern): focus moves in on open, Tab and Shift+Tab stay inside,
// Esc and the scrim close it, and focus goes back to whatever opened it.
// variant="sheet" is the same dialog risen from the bottom of the screen; portal renders it in <body>.
export function Dialog({ open = true, onClose, title, description, children, footer, size = 'md', variant = 'dialog', inline = false, portal = false, closeLabel = 'Lukk', initialFocus, className, ...rest }) {
  const panel = React.useRef(null);
  const uid = React.useId();
  const titleId = uid + '-title';
  const descId = uid + '-desc';
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;

  React.useEffect(() => {
    if (!open) return;
    const el = panel.current;
    const opener = document.activeElement;
    OPEN.push(el);
    // Explicit target first, then something marked autofocus, then the first control in the body.
    // Otherwise the panel itself, so a screen reader reads the title and Enter can't hit "Delete".
    const body = el.querySelector('.s-dialog__body');
    const target = (initialFocus && initialFocus.current) || el.querySelector('[autofocus],[data-autofocus]') || (body && focusables(body)[0]) || el;
    target.focus();

    const keepInside = (e) => { if (innermost(el) && !belongs(el, e.target)) (focusables(el)[0] || el).focus(); };
    document.addEventListener('focusin', keepInside);
    const prevOverflow = document.body.style.overflow;
    if (!inline) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('focusin', keepInside);
      OPEN.splice(OPEN.indexOf(el), 1);
      if (!inline) document.body.style.overflow = prevOverflow;
      if (opener && opener.focus && document.contains(opener)) opener.focus();
    };
  }, [open, inline, portal]); // portal re-parents the panel, so the stack and the trap must follow it

  const onKeyDown = (e) => {
    const el = panel.current;
    if (!innermost(el)) return; // a dialog opened from this one, through a portal, handles its own keys
    if (e.key === 'Escape' && closeRef.current) { e.stopPropagation(); closeRef.current(); return; }
    if (e.key !== 'Tab') return;
    const list = focusables(el);
    if (!list.length) { e.preventDefault(); el.focus(); return; }
    const first = list[0], last = list[list.length - 1], cur = document.activeElement;
    if (e.shiftKey && (cur === first || cur === el)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
  };

  if (!open) return null;
  const sheet = variant === 'sheet';
  const node = (
    <div className={cx('s-dialog-scrim', inline && 's-dialog-scrim--inline', sheet && 's-dialog-scrim--sheet')} onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) { e.preventDefault(); onClose(); } }}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descId : undefined} tabIndex={-1} onKeyDown={onKeyDown} className={cx('s-dialog', size === 'lg' && 's-dialog--lg', sheet && 's-dialog--sheet', className)} {...rest}>
        {sheet ? <div className="s-dialog__handle" aria-hidden="true" /> : null}
        <div className="s-dialog__head">
          <div style={{ flex: 1, minWidth: 0 }}>
            {title ? <h2 id={titleId} className="s-dialog__title">{title}</h2> : null}
            {description ? <p id={descId} className="s-dialog__desc">{description}</p> : null}
          </div>
          {onClose ? <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} style={{ margin: '-4px -6px 0 0' }} /> : null}
        </div>
        {children ? <div className="s-dialog__body">{children}</div> : null}
        {footer ? <div className="s-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
  // inline positions the scrim inside its parent, so it stays where it is rendered; without a document (a build-time render) there is nothing to portal into.
  return portal && !inline && typeof document !== 'undefined' ? createPortal(node, document.body) : node;
}
