import React from 'react';
import { Popover, elementRef, canTrigger, warnTrigger } from './Popover.jsx';
import { IconButton } from '../buttons/IconButton.jsx';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

const ITEMS = '[role="menuitem"],[role="menuitemcheckbox"]';
// The items an arrow can land on: disabled ones stay in the menu and are read, but the keys pass them by.
const enabled = (el) => Array.from(el.querySelectorAll(ITEMS)).filter((n) => n.getAttribute('aria-disabled') !== 'true');
const text = (n) => (n.textContent || '').trim().toLowerCase();
const isSep = (it) => it === '-' || (it && it.separator);
const isGroup = (it) => it && Array.isArray(it.items);

// A menu button (WAI-ARIA APG menu button pattern): a Button or IconButton with aria-haspopup="menu" that opens a
// list of actions in a Popover. Enter, Space and ArrowDown open it on the first item, ArrowUp on the last; the arrows
// move with wrap, Home and End jump, a letter goes to the next item starting with it, Enter and Space choose, Esc
// closes and puts focus back on the button, Tab closes and moves on. A disabled item is skipped by the keys but
// still read; `danger` sets an item apart; a separator or a labelled group divides the list.
export function Menu({ trigger, items = [], label, triggerLabel = 'Flere valg', onSelect, open: openProp, defaultOpen = false, onOpenChange, side, align = 'start', portal = false, className, ...rest }) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : openState;
  const uid = 's' + React.useId().replace(/:/g, '');
  const panel = React.useRef(null);
  const triggerRef = React.useRef(null);
  const start = React.useRef('first'); // where focus lands when the menu opens
  const change = React.useRef(onOpenChange);
  change.current = onOpenChange;

  const setOpen = (next, reason) => { if (!controlled) setOpenState(next); if (change.current) change.current(next, reason); };
  const openAt = (where) => { start.current = where; setOpen(true, 'keyboard'); };

  React.useEffect(() => {
    if (!open || !panel.current) return;
    const list = enabled(panel.current);
    const el = start.current === 'last' ? list[list.length - 1] : list[0];
    (el || panel.current).focus();
    start.current = 'first';
  }, [open]);

  const move = (e, pick) => {
    const list = enabled(panel.current);
    if (!list.length) return;
    const i = list.indexOf(document.activeElement);
    const next = pick(list, i);
    if (next) { e.preventDefault(); next.focus(); }
  };
  const onKeyDown = (e) => {
    const { key } = e;
    if (key === 'ArrowDown') move(e, (l, i) => l[(i + 1) % l.length]);
    else if (key === 'ArrowUp') move(e, (l, i) => l[(i - 1 + l.length) % l.length]);
    else if (key === 'Home') move(e, (l) => l[0]);
    else if (key === 'End') move(e, (l) => l[l.length - 1]);
    else if (key === 'Enter' || key === ' ') {
      // Choose from the keyboard the same way as a click, on links too (Space would otherwise scroll).
      const t = e.target.closest(ITEMS);
      if (t) { e.preventDefault(); t.click(); }
    } else if (key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && key !== ' ') {
      const c = key.toLowerCase();
      move(e, (l, i) => l.slice(i + 1).concat(l.slice(0, i + 1)).find((n) => text(n).startsWith(c)));
    }
  };

  const choose = (it, e) => {
    if (it.disabled) { e.preventDefault(); return; }
    if (it.onSelect) it.onSelect(it.id, e);
    if (onSelect) onSelect(it.id, it, e);
    if (triggerRef.current) triggerRef.current.focus();
    setOpen(false, 'select');
  };
  const item = (it, i) => {
    if (isSep(it)) return <div key={'sep' + i} role="separator" className="s-menu__sep" />;
    if (isGroup(it)) {
      const gid = uid + '-g' + i;
      return (
        <div key={'g' + i} role="group" aria-labelledby={gid}>
          <div id={gid} className="s-menu__group">{it.label}</div>
          {it.items.map(item)}
        </div>
      );
    }
    const check = typeof it.checked === 'boolean';
    const props = {
      role: check ? 'menuitemcheckbox' : 'menuitem', tabIndex: -1,
      'aria-checked': check ? it.checked : undefined, 'aria-disabled': it.disabled || undefined,
      className: cx('s-menu__item', it.danger && 's-menu__item--danger', it.className),
      onClick: (e) => choose(it, e),
    };
    const inner = <>
      {it.icon ? <span className="s-menu__icon">{typeof it.icon === 'string' ? <Icon name={it.icon} size={18} /> : it.icon}</span> : null}
      <span className="s-menu__label">{it.label}</span>
      {check ? <Icon name="check" size={16} className="s-menu__check" /> : null}
    </>;
    const key = it.id || 'i' + i;
    return it.href && !it.disabled ? <a key={key} href={it.href} {...props}>{inner}</a> : <button key={key} type="button" {...props}>{inner}</button>;
  };

  // No trigger: the default button. A trigger that cannot take a ref (a string, a fragment) is replaced by it, with a warning in development.
  const ok = trigger === undefined || canTrigger(trigger);
  React.useEffect(() => { if (!ok) warnTrigger('Menu', trigger); }, [ok]);
  const base = ok && trigger !== undefined ? trigger : <IconButton icon="ellipsis" label={triggerLabel} />;
  const triggerId = base.props.id || uid + '-btn';
  const tr = React.cloneElement(base, {
    id: triggerId,
    'aria-haspopup': 'menu',
    ref: (el) => { triggerRef.current = el; const r = elementRef(base); if (typeof r === 'function') r(el); else if (r) r.current = el; },
    onKeyDown: (e) => {
      if (base.props.onKeyDown) base.props.onKeyDown(e);
      if (e.defaultPrevented) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); openAt('first'); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); openAt('last'); }
    },
  });

  return (
    <Popover trigger={tr} open={open} onOpenChange={setOpen} side={side} align={align} portal={portal} autoFocus={false} panelRef={panel}
      role="menu" aria-labelledby={label ? undefined : triggerId} aria-label={label} onKeyDown={onKeyDown} className={cx('s-menu', className)} {...rest}>
      {items.map(item)}
    </Popover>
  );
}
