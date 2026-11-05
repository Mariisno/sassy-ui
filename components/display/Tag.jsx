import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A removable tag is a group: the label (a toggle button when selectable) and a separate remove
// button beside it, never one button inside another.
export function Tag({ icon, selected, onClick, onRemove, removeLabel, className, children, ...rest }) {
  const interactive = !!onClick || selected !== undefined;
  const toggle = interactive ? { type: 'button', 'aria-pressed': !!selected, onClick } : {};
  const content = <>{icon ? <Icon name={icon} size={14} /> : null}{children}</>;
  if (!onRemove) {
    const El = interactive ? 'button' : 'span';
    return <El className={cx('s-tag', className)} {...toggle} {...rest}>{content}</El>;
  }
  const named = typeof children === 'string' || typeof children === 'number';
  const label = removeLabel || (named ? 'Fjern ' + children : 'Fjern');
  return (
    <span className={cx('s-tag', 's-tag--removable', selected && 's-tag--selected', className)} {...rest}>
      {interactive ? <button className="s-tag__main" {...toggle}>{content}</button> : content}
      <button type="button" className="s-tag__x" aria-label={label} onClick={(e) => { e.stopPropagation(); onRemove(e); }}><Icon name="x" size={12} strokeWidth={2} /></button>
    </span>
  );
}
