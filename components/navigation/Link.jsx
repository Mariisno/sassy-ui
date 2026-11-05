import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A link. base.css already gives every <a> the accent text colour (--accent-text, 4.5:1 on --bg, --surface-1
// and --surface-2 in both themes and every accent) and an underline; .s-link adds the variants. `inline`
// sits in running text, `standalone` is a link on its own line (medium weight, 24 px tall, 2.5.8). With
// target="_blank" the link gets rel="noopener noreferrer", an external icon and the visually hidden
// «(åpner i ny fane)», so a screen reader hears where it goes; `external` shows the icon without a new
// tab (a link that leaves the app) or hides it (`external={false}`). `as` takes a router's Link, so apps
// keep client-side routing; whatever it renders must be an <a>.
const NEW_TAB_REL = ['noopener', 'noreferrer'];
export const Link = React.forwardRef(function Link({ as: El = 'a', to, variant = 'inline', external, newTabLabel = '(åpner i ny fane)', target, rel, className, children, ...rest }, ref) {
  const newTab = target === '_blank';
  const ext = external === undefined ? newTab : external;
  const safeRel = newTab ? NEW_TAB_REL.concat((rel ? rel.split(/\s+/) : []).filter((r) => r && !NEW_TAB_REL.includes(r))).join(' ') : rel;
  return (
    <El ref={ref} className={cx('s-link', variant !== 'inline' && 's-link--' + variant, ext && 's-link--external', className)} to={El === 'a' ? undefined : to} target={target} rel={safeRel} {...rest}>
      {children}
      {/* U+2060 word joiner: no line break between the last word and the icon, so the icon never stands alone on a line */}
      {ext ? <>{'\u2060'}<Icon name="external-link" size={14} className="s-link__icon" /></> : null}
      {newTab ? <span className="s-sr-only">{' ' + newTabLabel}</span> : null}
    </El>
  );
});
