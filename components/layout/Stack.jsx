import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// A layout primitive: children in a column (default) or a row, a gap from the spacing tokens, optional
// wrap and alignment. Flex with the gap as a custom property, so the CSS stays one rule and the step
// is a token (`gap={4}` is var(--space-4), 16 px). No visuals of its own and no role, except role="list"
// on a ul or ol, since list-style:none takes the list semantics away in Safari (an own `role` wins).
const ALIGN = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline' };
const JUSTIFY = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between' };
export function Stack({ as: El = 'div', direction = 'column', gap = 4, wrap = false, align, justify, className, style, children, ...rest }) {
  const role = El === 'ul' || El === 'ol' ? 'list' : undefined;
  return (
    <El role={role} className={cx('s-stack', direction === 'row' && 's-stack--row', wrap && 's-stack--wrap', className)} style={{ '--s-stack-gap': `var(--space-${gap})`, alignItems: ALIGN[align], justifyContent: JUSTIFY[justify], ...style }} {...rest}>
      {children}
    </El>
  );
}
