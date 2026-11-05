import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');
// An item's icon is a Lucide name, or the app's own: a function of the size, or an element.
const icon = (it, size) => (typeof it.icon === 'string' ? <Icon name={it.icon} size={size} />
  : typeof it.icon === 'function' ? it.icon(size) : it.icon || null);

// The app frame with its main menu (variant A): a tab bar below 900 px and a sidebar
// from 900 px. Five tabs fit; with more, the fifth place becomes "Mer", a list of the rest.
// contained: the tab bar at every width, at the bottom of the parent instead of the screen, for an app
// that lives in its own frame (a phone-width shell on a big screen). The parent gives the height.
// The first thing in the tab order is a skip link to <main> (WCAG 2.4.1). It focuses main with code
// instead of following its href, so an app that routes on the hash keeps its route.
export function AppShell({ items = [], current, onNavigate, brand, footer, label = 'Hovedmeny', moreLabel = 'Mer', skipLabel = 'Hopp til innholdet', mainId, contained = false, className, children }) {
  const [open, setOpen] = React.useState(false);
  const moreBtn = React.useRef(null);
  const list = React.useRef(null);
  const main = React.useRef(null);
  const id = 's' + React.useId().replace(/:/g, '');
  const listId = id + '-more';
  const contentId = mainId || id + '-main';
  const overflow = items.length > 5;
  const shown = overflow ? items.slice(0, 4) : items;
  const rest = overflow ? items.slice(4) : [];

  // Open: focus the first item. A click outside closes it.
  React.useEffect(() => {
    if (!open) return;
    const first = list.current.querySelector('a,button');
    if (first) first.focus();
    const outside = (e) => { if (!list.current.contains(e.target) && !moreBtn.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [open]);
  const close = () => { setOpen(false); moreBtn.current.focus(); };

  const entry = (it, cls, inner, after) => {
    // The key goes on the element itself: React warns when a spread props object carries it.
    const props = {
      className: cls, 'aria-current': it.id === current ? 'page' : undefined,
      onClick: (e) => { if (onNavigate) { if (!it.href) e.preventDefault(); onNavigate(it.id, e); } if (after) after(); },
    };
    return it.href ? <a key={it.id} href={it.href} {...props}>{inner}</a> : <button key={it.id} type="button" {...props}>{inner}</button>;
  };
  const tab = (it) => entry(it, 's-shell__tab', <><span className="s-shell__pill">{icon(it, 22)}</span><span className="s-shell__label">{it.label}</span></>);

  return (
    <div className={cx('s-shell', contained && 's-shell--contained', className)}>
      <a className="s-shell__skip" href={'#' + contentId} onClick={(e) => { e.preventDefault(); main.current.focus(); }}>{skipLabel}</a>
      {contained ? null : <nav className="s-shell__side" aria-label={label}>
        {brand ? <div className="s-shell__brand">{brand}</div> : null}
        {items.map((it) => entry(it, 's-shell__item', <>{icon(it, 18)}{it.label}</>))}
        {footer ? <div className="s-shell__foot">{footer}</div> : null}
      </nav>}
      <main ref={main} id={contentId} tabIndex={-1} className="s-shell__main">{children}</main>
      <nav className="s-shell__tabbar" aria-label={label}>
        {shown.map(tab)}
        {overflow ? <>
          <div ref={list} id={listId} className="s-shell__more" hidden={!open}
            onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } }}
            // Close when focus moves somewhere else, not when it just leaves (relatedTarget null): Safari does not
            // focus a link on tap, so the list would close on mousedown and the tap would never land.
            // Clicks outside are handled by the mousedown listener above.
            onBlur={(e) => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && e.relatedTarget !== moreBtn.current) setOpen(false); }}>
            {rest.map((it) => entry(it, 's-shell__moreitem', <>{icon(it, 20)}{it.label}</>, close))}
          </div>
          <button ref={moreBtn} type="button" className={cx('s-shell__tab', rest.some((it) => it.id === current) && 'is-current')} aria-expanded={open} aria-controls={listId}
            onClick={() => setOpen((o) => !o)} onKeyDown={(e) => { if (e.key === 'Escape' && open) { e.stopPropagation(); setOpen(false); } }}>
            <span className="s-shell__pill"><Icon name="ellipsis" size={22} /></span><span className="s-shell__label">{moreLabel}</span>
          </button>
        </> : null}
      </nav>
    </div>
  );
}
