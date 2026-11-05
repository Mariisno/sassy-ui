import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// What a list or page shows when there is nothing in it yet: an icon, a heading, one line on what to do,
// and at most one action. The heading level is the page's to choose (default h2), so the outline stays right.
export function EmptyState({ icon, title, description, action, level = 2, framed = false, className, children, ...rest }) {
  const H = 'h' + Math.min(Math.max(level, 2), 6);
  return (
    <div className={cx('s-empty', framed && 's-empty--framed', className)} {...rest}>
      {icon ? <span className="s-empty__icon" aria-hidden="true"><Icon name={icon} size={26} /></span> : null}
      <H className="s-empty__title">{title}</H>
      {description ? <p className="s-empty__text">{description}</p> : null}
      {children}
      {action ? <div className="s-empty__action">{action}</div> : null}
    </div>
  );
}
