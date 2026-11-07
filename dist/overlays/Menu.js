// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Popover, elementRef, canTrigger, warnTrigger } from "./Popover.js";
import { IconButton } from "../buttons/IconButton.js";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const ITEMS = '[role="menuitem"],[role="menuitemcheckbox"]';
const enabled = (el) => Array.from(el.querySelectorAll(ITEMS)).filter((n) => n.getAttribute("aria-disabled") !== "true");
const text = (n) => (n.textContent || "").trim().toLowerCase();
const isSep = (it) => it === "-" || it && it.separator;
const isGroup = (it) => it && Array.isArray(it.items);
function Menu({ trigger, items = [], label, triggerLabel = "Flere valg", onSelect, open: openProp, defaultOpen = false, onOpenChange, side, align = "start", portal = false, className, ...rest }) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const controlled = openProp !== void 0;
  const open = controlled ? openProp : openState;
  const uid = "s" + React.useId().replace(/:/g, "");
  const panel = React.useRef(null);
  const triggerRef = React.useRef(null);
  const start = React.useRef("first");
  const change = React.useRef(onOpenChange);
  change.current = onOpenChange;
  const setOpen = (next, reason) => {
    if (!controlled) setOpenState(next);
    if (change.current) change.current(next, reason);
  };
  const openAt = (where) => {
    start.current = where;
    setOpen(true, "keyboard");
  };
  React.useEffect(() => {
    if (!open || !panel.current) return;
    const list = enabled(panel.current);
    const el = start.current === "last" ? list[list.length - 1] : list[0];
    (el || panel.current).focus();
    start.current = "first";
  }, [open]);
  const move = (e, pick) => {
    const list = enabled(panel.current);
    if (!list.length) return;
    const i = list.indexOf(document.activeElement);
    const next = pick(list, i);
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };
  const onKeyDown = (e) => {
    const { key } = e;
    if (key === "ArrowDown") move(e, (l, i) => l[(i + 1) % l.length]);
    else if (key === "ArrowUp") move(e, (l, i) => l[(i - 1 + l.length) % l.length]);
    else if (key === "Home") move(e, (l) => l[0]);
    else if (key === "End") move(e, (l) => l[l.length - 1]);
    else if (key === "Enter" || key === " ") {
      const t = e.target.closest(ITEMS);
      if (t) {
        e.preventDefault();
        t.click();
      }
    } else if (key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && key !== " ") {
      const c = key.toLowerCase();
      move(e, (l, i) => l.slice(i + 1).concat(l.slice(0, i + 1)).find((n) => text(n).startsWith(c)));
    }
  };
  const choose = (it, e) => {
    if (it.disabled) {
      e.preventDefault();
      return;
    }
    if (it.onSelect) it.onSelect(it.id, e);
    if (onSelect) onSelect(it.id, it, e);
    if (triggerRef.current) triggerRef.current.focus();
    setOpen(false, "select");
  };
  const item = (it, i) => {
    if (isSep(it)) return /* @__PURE__ */ jsx("div", { role: "separator", className: "s-menu__sep" }, "sep" + i);
    if (isGroup(it)) {
      const gid = uid + "-g" + i;
      return /* @__PURE__ */ jsxs("div", { role: "group", "aria-labelledby": gid, children: [
        /* @__PURE__ */ jsx("div", { id: gid, className: "s-menu__group", children: it.label }),
        it.items.map(item)
      ] }, "g" + i);
    }
    const check = typeof it.checked === "boolean";
    const props = {
      role: check ? "menuitemcheckbox" : "menuitem",
      tabIndex: -1,
      "aria-checked": check ? it.checked : void 0,
      "aria-disabled": it.disabled || void 0,
      className: cx("s-menu__item", it.danger && "s-menu__item--danger", it.className),
      onClick: (e) => choose(it, e)
    };
    const inner = /* @__PURE__ */ jsxs(Fragment, { children: [
      it.icon ? /* @__PURE__ */ jsx("span", { className: "s-menu__icon", children: typeof it.icon === "string" ? /* @__PURE__ */ jsx(Icon, { name: it.icon, size: 18 }) : it.icon }) : null,
      /* @__PURE__ */ jsx("span", { className: "s-menu__label", children: it.label }),
      check ? /* @__PURE__ */ jsx(Icon, { name: "check", size: 16, className: "s-menu__check" }) : null
    ] });
    const key = it.id || "i" + i;
    return it.href && !it.disabled ? /* @__PURE__ */ jsx("a", { href: it.href, ...props, children: inner }, key) : /* @__PURE__ */ jsx("button", { type: "button", ...props, children: inner }, key);
  };
  const ok = trigger === void 0 || canTrigger(trigger);
  React.useEffect(() => {
    if (!ok) warnTrigger("Menu", trigger);
  }, [ok]);
  const base = ok && trigger !== void 0 ? trigger : /* @__PURE__ */ jsx(IconButton, { icon: "ellipsis", label: triggerLabel });
  const triggerId = base.props.id || uid + "-btn";
  const tr = React.cloneElement(base, {
    id: triggerId,
    "aria-haspopup": "menu",
    ref: (el) => {
      triggerRef.current = el;
      const r = elementRef(base);
      if (typeof r === "function") r(el);
      else if (r) r.current = el;
    },
    onKeyDown: (e) => {
      if (base.props.onKeyDown) base.props.onKeyDown(e);
      if (e.defaultPrevented) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        openAt("first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        openAt("last");
      }
    }
  });
  return /* @__PURE__ */ jsx(
    Popover,
    {
      trigger: tr,
      open,
      onOpenChange: setOpen,
      side,
      align,
      portal,
      autoFocus: false,
      panelRef: panel,
      role: "menu",
      "aria-labelledby": label ? void 0 : triggerId,
      "aria-label": label,
      onKeyDown,
      className: cx("s-menu", className),
      ...rest,
      children: items.map(item)
    }
  );
}
export {
  Menu
};
