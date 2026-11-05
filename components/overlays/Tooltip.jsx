import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// The bubble describes its trigger (aria-describedby), so screen readers read it too.
// Esc hides it while the pointer or focus stays put (WCAG 1.4.13); it comes back on the next hover or focus.
// The trigger loses its native title: the bubble already says it, and two bubbles look messy.
export function Tooltip({ content, kbd, side = 'top', open = false, children, className, id, ...rest }) {
  const auto = 's' + React.useId().replace(/:/g, '');
  const tipId = id || auto + '-tip';
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const active = hover || focus;
  React.useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setDismissed(true); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);
  const on = (set) => () => { set(true); setDismissed(false); };
  const off = (set) => (e) => { if (!e.currentTarget.contains(e.relatedTarget)) set(false); };
  const trigger = React.isValidElement(children)
    ? React.cloneElement(children, {
      title: undefined,
      'aria-describedby': [children.props['aria-describedby'], tipId].filter(Boolean).join(' '),
    })
    : children;
  return (
    <span className={cx('s-tip', side === 'bottom' && 's-tip--bottom', open && 's-tip--open', dismissed && !open && 's-tip--dismissed', className)}
      onMouseEnter={on(setHover)} onMouseLeave={off(setHover)} onFocus={on(setFocus)} onBlur={off(setFocus)} {...rest}>
      {trigger}
      <span id={tipId} role="tooltip" className="s-tip__bubble">{content}{kbd ? <span className="s-tip__kbd">{kbd}</span> : null}</span>
    </span>
  );
}
