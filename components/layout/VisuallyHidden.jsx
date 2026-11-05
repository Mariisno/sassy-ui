import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// Text for assistive technology that nobody sees: the .s-sr-only class (1 px, clipped, never display:none,
// so it is read) as a component. `focusable` is for a skip link or another control that must show when
// it has the focus: it then comes back into the flow where it stands in the document, at least 24 px tall.
// AppShell has its own styled skip link (.s-shell__skip); this is for pages without it.
export function VisuallyHidden({ as: El = 'span', focusable = false, className, children, ...rest }) {
  return (
    <El className={cx('s-sr-only', focusable && 's-sr-only--focusable', className)} {...rest}>
      {children}
    </El>
  );
}
