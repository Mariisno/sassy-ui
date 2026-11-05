import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// The shape of content that has not arrived yet: text lines, a circle (an avatar) or a rectangle (an image,
// a card). Grey --surface-3 blocks with a shimmer that sweeps once in a while; no shimmer under
// prefers-reduced-motion. A skeleton says nothing to assistive technology (aria-hidden): the region that
// holds it says it is loading, with aria-busy and one status text (see the docs for the pattern), so a
// screen reader hears «Laster oppskrifter» once instead of twelve grey blocks.
export function Skeleton({ variant = 'text', lines = 1, width, height, size = 40, className, style, ...rest }) {
  if (variant === 'text') {
    const n = Math.max(1, Math.floor(lines));
    const line = (i) => <span key={i} className={cx('s-skeleton', 's-skeleton--text', n > 1 && i === n - 1 && 's-skeleton--last')} />;
    if (n === 1) return <span aria-hidden="true" className={cx('s-skeleton', 's-skeleton--text', className)} style={{ width, ...style }} {...rest} />;
    return (
      <span aria-hidden="true" className={cx('s-skeleton-lines', className)} style={{ width, ...style }} {...rest}>
        {Array.from({ length: n }, (_, i) => line(i))}
      </span>
    );
  }
  const dims = variant === 'circle' ? { width: size, height: size } : { width, height };
  return <span aria-hidden="true" className={cx('s-skeleton', 's-skeleton--' + variant, className)} style={{ ...dims, ...style }} {...rest} />;
}
