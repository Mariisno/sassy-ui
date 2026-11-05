import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

export function Card({ variant = 'outlined', padding = 'md', interactive = false, as = 'div', className, children, ...rest }) {
  const Tag = as;
  return (
    <Tag className={cx('s-card', 's-card--pad-' + padding, variant !== 'outlined' && 's-card--' + variant, interactive && 's-card--interactive', className)} {...rest}>
      {children}
    </Tag>
  );
}
