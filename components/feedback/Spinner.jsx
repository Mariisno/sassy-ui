import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// Something is happening and nobody knows for how long. A ring in the accent that turns; under
// prefers-reduced-motion it stands still and pulses instead. role="status" with the label as visually
// hidden text, so a screen reader hears «Laster» where sighted people see the ring. With aria-hidden
// it is decorative (next to its own text, or inside a control that already says it is busy) and has
// no role and no text. Button's `loading` has its own, matching spinner (.s-btn__spin).
export function Spinner({ size = 'md', label, className, style, ...rest }) {
  const hidden = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true';
  return (
    <span role={hidden ? undefined : 'status'} className={cx('s-spinner', size !== 'md' && 's-spinner--' + size, className)} style={style} {...rest}>
      <span className="s-spinner__ring" aria-hidden="true" />
      {!hidden && label ? <span className="s-sr-only">{label}</span> : null}
    </span>
  );
}
