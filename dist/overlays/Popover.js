// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { createPortal } from "react-dom";
const cx = (...a) => a.filter(Boolean).join(" ");
const FOCUSABLE = 'a[href]:not([tabindex="-1"]),button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
const focusables = (el) => Array.from(el.querySelectorAll(FOCUSABLE)).filter((n) => n.getClientRects().length > 0 && n.getAttribute("tabindex") !== "-1");
const GAP = 6;
const PAD = 8;
function placePopover(trigger, panel, viewport, { side = "bottom", align = "start" } = {}) {
  const below = viewport.height - trigger.bottom - GAP, above = trigger.top - GAP;
  let s = side;
  if (s === "bottom" && panel.height > below && above > below) s = "top";
  else if (s === "top" && panel.height > above && below > above) s = "bottom";
  let y = s === "bottom" ? trigger.bottom + GAP : trigger.top - GAP - panel.height;
  let x = align === "end" ? trigger.right - panel.width : trigger.left;
  x = Math.max(PAD, Math.min(x, viewport.width - PAD - panel.width));
  y = Math.max(PAD, Math.min(y, viewport.height - PAD - panel.height));
  return { side: s, x, y };
}
const useIsoLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
const dev = typeof process === "undefined" || !process.env || true;
const canTrigger = (trigger) => React.isValidElement(trigger) && trigger.type !== React.Fragment;
const warnTrigger = (name, trigger) => {
  if (dev && typeof console !== "undefined") console.warn(`${name}: trigger must be one element that takes a ref, such as a Button or an IconButton; got ${trigger == null ? String(trigger) : typeof trigger === "string" ? "a string" : trigger.type === React.Fragment ? "a fragment" : typeof trigger}.`);
};
const setRef = (ref, el) => {
  if (typeof ref === "function") ref(el);
  else if (ref) ref.current = el;
};
const elementRef = (el) => "ref" in el.props ? el.props.ref : Number(React.version.split(".")[0]) >= 19 ? null : el.ref;
function Popover({ open: openProp, defaultOpen = false, onOpenChange, trigger, children, side = "bottom", align = "start", portal = false, autoFocus = true, panelRef, className, id, style, onKeyDown, ...rest }) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const controlled = openProp !== void 0;
  const open = controlled ? openProp : openState;
  const triggerRef = React.useRef(null);
  const panel = React.useRef(null);
  const wrap = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  const uid = "s" + React.useId().replace(/:/g, "");
  const panelId = id || uid + "-panel";
  const change = React.useRef(onOpenChange);
  change.current = onOpenChange;
  const setOpen = React.useCallback((next, reason) => {
    if (!controlled) setOpenState(next);
    if (change.current) change.current(next, reason);
  }, [controlled]);
  const close = React.useCallback((reason, focusTrigger) => {
    if (focusTrigger && triggerRef.current) triggerRef.current.focus();
    setOpen(false, reason);
  }, [setOpen]);
  useIsoLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return void 0;
    }
    const place = () => {
      const t = triggerRef.current, p = panel.current;
      if (!t || !p) return;
      const r = placePopover(t.getBoundingClientRect(), p.getBoundingClientRect(), { width: window.innerWidth, height: window.innerHeight }, { side, align });
      if (!portal) {
        const w = wrap.current.getBoundingClientRect();
        r.x -= w.left;
        r.y -= w.top;
      }
      p.style.left = r.x + "px";
      p.style.top = r.y + "px";
      setPos((old) => old && old.x === r.x && old.y === r.y && old.side === r.side ? old : r);
    };
    place();
    if (autoFocus && panel.current && !panel.current.contains(document.activeElement)) (focusables(panel.current)[0] || panel.current).focus();
    window.addEventListener("resize", place);
    document.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      document.removeEventListener("scroll", place, true);
    };
  }, [open, side, align, portal]);
  React.useEffect(() => {
    if (!open) return void 0;
    const el = panel.current;
    const outside = (e) => {
      if (!el.contains(e.target) && !(triggerRef.current && triggerRef.current.contains(e.target))) close("outside", false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, close]);
  const onPanelKeyDown = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      e.preventDefault();
      close("escape", true);
      return;
    }
    if (e.key !== "Tab") return;
    const list = focusables(panel.current);
    const cur = document.activeElement;
    const atEdge = !list.length || (e.shiftKey ? cur === list[0] || cur === panel.current : cur === list[list.length - 1] || cur === panel.current);
    if (atEdge) close("tab", true);
  };
  const onBlur = (e) => {
    const to = e.relatedTarget;
    if (open && to && !panel.current.contains(to) && !(triggerRef.current && triggerRef.current.contains(to))) close("blur", false);
  };
  const ok = canTrigger(trigger);
  React.useEffect(() => {
    if (!ok) warnTrigger("Popover", trigger);
  }, [ok]);
  const tr = ok ? React.cloneElement(trigger, {
    ref: (el) => {
      triggerRef.current = el;
      setRef(elementRef(trigger), el);
    },
    "aria-expanded": open,
    "aria-controls": open ? panelId : void 0,
    onClick: (e) => {
      if (trigger.props.onClick) trigger.props.onClick(e);
      if (!e.defaultPrevented) setOpen(!open, "trigger");
    },
    onKeyDown: (e) => {
      if (trigger.props.onKeyDown) trigger.props.onKeyDown(e);
      if (!e.defaultPrevented && e.key === "Escape" && open) {
        e.stopPropagation();
        e.preventDefault();
        close("escape", true);
      }
    }
  }) : trigger;
  const node = open ? /* @__PURE__ */ jsx(
    "div",
    {
      ref: (el) => {
        panel.current = el;
        setRef(panelRef, el);
      },
      id: panelId,
      tabIndex: -1,
      onKeyDown: onPanelKeyDown,
      className: cx("s-popover__panel", portal && "s-popover__panel--portal", pos && pos.side === "top" && "s-popover__panel--top", className),
      style: { ...style, left: pos ? pos.x : 0, top: pos ? pos.y : 0 },
      ...rest,
      children
    }
  ) : null;
  const usePortal = portal && typeof document !== "undefined";
  return /* @__PURE__ */ jsxs("span", { ref: wrap, className: "s-popover", onBlur, children: [
    tr,
    usePortal ? createPortal(node, document.body) : node
  ] });
}
export {
  Popover,
  canTrigger,
  elementRef,
  placePopover,
  warnTrigger
};
