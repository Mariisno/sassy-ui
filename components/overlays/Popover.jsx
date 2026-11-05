import React from 'react';
import { createPortal } from 'react-dom';
const cx = (...a) => a.filter(Boolean).join(' ');

// tabindex="-1" is left out everywhere, also on links: a Menu's items are such, and Tab must pass them by.
const FOCUSABLE = 'a[href]:not([tabindex="-1"]),button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
const focusables = (el) => Array.from(el.querySelectorAll(FOCUSABLE)).filter((n) => n.getClientRects().length > 0 && n.getAttribute('tabindex') !== '-1');
const GAP = 6; // between the trigger and the panel
const PAD = 8; // kept free at every edge of the viewport

// Where the panel goes, in viewport coordinates. Below the trigger (or above, with side="top"); it flips to the
// other side when it does not fit and there is more room there; then it is pushed inside the viewport, PAD from
// the edges. align="start" lines the panel up with the trigger's left edge, "end" with its right edge.
export function placePopover(trigger, panel, viewport, { side = 'bottom', align = 'start' } = {}) {
  const below = viewport.height - trigger.bottom - GAP, above = trigger.top - GAP;
  let s = side;
  if (s === 'bottom' && panel.height > below && above > below) s = 'top';
  else if (s === 'top' && panel.height > above && below > above) s = 'bottom';
  let y = s === 'bottom' ? trigger.bottom + GAP : trigger.top - GAP - panel.height;
  let x = align === 'end' ? trigger.right - panel.width : trigger.left;
  x = Math.max(PAD, Math.min(x, viewport.width - PAD - panel.width));
  y = Math.max(PAD, Math.min(y, viewport.height - PAD - panel.height));
  return { side: s, x, y };
}

// Layout effect in the browser; a plain effect in a build-time render, where React 18 would warn about the former.
const useIsoLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
// Dev only: a trigger that cannot take a ref and the handlers (a string, a fragment) never opens anything.
const dev = typeof process === 'undefined' || !process.env || process.env.NODE_ENV !== 'production';
export const canTrigger = (trigger) => React.isValidElement(trigger) && trigger.type !== React.Fragment;
export const warnTrigger = (name, trigger) => { if (dev && typeof console !== 'undefined') console.warn(`${name}: trigger must be one element that takes a ref, such as a Button or an IconButton; got ${trigger == null ? String(trigger) : typeof trigger === 'string' ? 'a string' : trigger.type === React.Fragment ? 'a fragment' : typeof trigger}.`); };
const setRef = (ref, el) => { if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; };
// The ref an element already carries: a prop from React 19, element.ref before that (reading it warns in 19).
export const elementRef = (el) => ('ref' in el.props ? el.props.ref : Number(React.version.split('.')[0]) >= 19 ? null : el.ref);

// A non-modal surface anchored to its trigger (a Button or an IconButton): the trigger gets aria-expanded and
// aria-controls, a click toggles the panel, and the panel closes on Esc (focus back on the trigger), on a click
// outside and when focus moves elsewhere. Tab at the panel's edge goes back through the trigger, so the tab
// order stays the page's. `portal` renders the panel in <body>, position: fixed, for a trigger inside a
// positioned, transformed or clipped parent; without it the panel is absolute next to the trigger.
// The panel scrolls when taller than the screen (overflow: auto), so a Tooltip inside it is clipped at the panel's edge.
export function Popover({ open: openProp, defaultOpen = false, onOpenChange, trigger, children, side = 'bottom', align = 'start', portal = false, autoFocus = true, panelRef, className, id, style, onKeyDown, ...rest }) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : openState;
  const triggerRef = React.useRef(null);
  const panel = React.useRef(null);
  const wrap = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  const uid = 's' + React.useId().replace(/:/g, '');
  const panelId = id || uid + '-panel';
  const change = React.useRef(onOpenChange);
  change.current = onOpenChange;

  const setOpen = React.useCallback((next, reason) => {
    if (!controlled) setOpenState(next);
    if (change.current) change.current(next, reason);
  }, [controlled]);
  // Close and, when asked, put focus back on the trigger first, so the browser's own Tab then continues from there.
  const close = React.useCallback((reason, focusTrigger) => {
    if (focusTrigger && triggerRef.current) triggerRef.current.focus();
    setOpen(false, reason);
  }, [setOpen]);

  // Measure and place the panel before it is painted, and again when the page scrolls or resizes while it is open.
  useIsoLayoutEffect(() => {
    if (!open) { setPos(null); return undefined; }
    const place = () => {
      const t = triggerRef.current, p = panel.current;
      if (!t || !p) return;
      const r = placePopover(t.getBoundingClientRect(), p.getBoundingClientRect(), { width: window.innerWidth, height: window.innerHeight }, { side, align });
      if (!portal) { const w = wrap.current.getBoundingClientRect(); r.x -= w.left; r.y -= w.top; }
      p.style.left = r.x + 'px'; p.style.top = r.y + 'px'; // straight onto the element, so it is in place before focus and paint
      setPos((old) => (old && old.x === r.x && old.y === r.y && old.side === r.side ? old : r));
    };
    place();
    // Focus goes in: the first control, else the panel itself. Menu passes autoFocus={false} and places focus itself.
    if (autoFocus && panel.current && !panel.current.contains(document.activeElement)) (focusables(panel.current)[0] || panel.current).focus();
    window.addEventListener('resize', place);
    document.addEventListener('scroll', place, true);
    return () => { window.removeEventListener('resize', place); document.removeEventListener('scroll', place, true); };
  }, [open, side, align, portal]); // autoFocus matters on open only

  // A click outside closes it, without moving focus.
  React.useEffect(() => {
    if (!open) return undefined;
    const el = panel.current;
    const outside = (e) => { if (!el.contains(e.target) && !(triggerRef.current && triggerRef.current.contains(e.target))) close('outside', false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, close]);

  const onPanelKeyDown = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented) return;
    if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); close('escape', true); return; }
    if (e.key !== 'Tab') return;
    // Leaving the panel by Tab: back through the trigger, so the page's tab order carries on from there.
    const list = focusables(panel.current);
    const cur = document.activeElement;
    const atEdge = !list.length || (e.shiftKey ? cur === list[0] || cur === panel.current : cur === list[list.length - 1] || cur === panel.current);
    if (atEdge) close('tab', true);
  };
  // Close when focus moves somewhere else, not when it just leaves (relatedTarget null): Safari does not focus a
  // button on tap, so the panel would close on pointerdown and the tap would never land. On the wrapper: React's
  // onBlur bubbles from the trigger and from the panel, also when the panel is rendered through the portal.
  const onBlur = (e) => {
    const to = e.relatedTarget;
    if (open && to && !panel.current.contains(to) && !(triggerRef.current && triggerRef.current.contains(to))) close('blur', false);
  };

  const ok = canTrigger(trigger);
  React.useEffect(() => { if (!ok) warnTrigger('Popover', trigger); }, [ok]);
  const tr = ok ? React.cloneElement(trigger, {
    ref: (el) => { triggerRef.current = el; setRef(elementRef(trigger), el); },
    'aria-expanded': open,
    'aria-controls': open ? panelId : undefined,
    onClick: (e) => { if (trigger.props.onClick) trigger.props.onClick(e); if (!e.defaultPrevented) setOpen(!open, 'trigger'); },
    onKeyDown: (e) => {
      if (trigger.props.onKeyDown) trigger.props.onKeyDown(e);
      if (!e.defaultPrevented && e.key === 'Escape' && open) { e.stopPropagation(); e.preventDefault(); close('escape', true); }
    },
  }) : trigger;

  const node = open ? (
    <div ref={(el) => { panel.current = el; setRef(panelRef, el); }} id={panelId} tabIndex={-1} onKeyDown={onPanelKeyDown}
      className={cx('s-popover__panel', portal && 's-popover__panel--portal', pos && pos.side === 'top' && 's-popover__panel--top', className)}
      style={{ ...style, left: pos ? pos.x : 0, top: pos ? pos.y : 0 }} {...rest}>
      {children}
    </div>
  ) : null;
  const usePortal = portal && typeof document !== 'undefined';
  return (
    <span ref={wrap} className="s-popover" onBlur={onBlur}>
      {tr}
      {usePortal ? createPortal(node, document.body) : node}
    </span>
  );
}
