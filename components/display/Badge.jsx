import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

export function Badge({ tone = 'neutral', dot = false, outline = false, mono = false, className, children, ...rest }) {
  return (
    <span className={cx('s-badge', tone !== 'neutral' && 's-badge--' + tone, outline && 's-badge--outline', mono && 's-badge--mono', className)} {...rest}>
      {dot ? <span className="s-badge__dot" /> : null}
      {children}
    </span>
  );
}
