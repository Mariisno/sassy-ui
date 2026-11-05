import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A row that opens something: a link with href, a button with onClick, a plain row otherwise.
// Leading image or icon, a title, a meta line, and a trailing slot (a chevron by default when it opens).
export function ListItem({ title, meta, icon, image, imageAlt = '', leading, trailing, href, onClick, disabled, className, children, ...rest }) {
  const El = href ? 'a' : onClick ? 'button' : 'div';
  const opens = El !== 'div';
  const lead = leading !== undefined ? leading
    : image ? <img className="s-listitem__img" src={image} alt={imageAlt} />
    : icon ? <span className="s-listitem__icon"><Icon name={icon} size={20} /></span>
    : null;
  const trail = trailing !== undefined ? trailing : opens ? <Icon name="chevron-right" size={18} /> : null;
  // onClick works on both forms, as in AppShell. A disabled link keeps its role but loses href and onClick.
  const props = El === 'a' ? (disabled ? { 'aria-disabled': 'true' } : { href, onClick })
    : El === 'button' ? { type: 'button', onClick, disabled } : {};
  return (
    <El className={cx('s-listitem', opens && 's-listitem--opens', className)} {...props} {...rest}>
      {lead ? <span className="s-listitem__lead">{lead}</span> : null}
      <span className="s-listitem__body">
        <span className="s-listitem__title">{title}</span>
        {/* the space keeps title and meta apart in the accessible name; a flex column doesn't render it */}
        {meta ? <>{' '}<span className="s-listitem__meta">{meta}</span></> : null}
        {children}
      </span>
      {trail ? <span className="s-listitem__trail">{trail}</span> : null}
    </El>
  );
}
