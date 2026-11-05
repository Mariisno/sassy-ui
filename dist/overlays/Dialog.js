// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../buttons/IconButton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
const focusables = (el) => Array.from(el.querySelectorAll(FOCUSABLE)).filter((n) => n.getClientRects().length > 0 && !n.closest(".s-popover__panel"));
const belongs = (el, node) => {
  for (let n = node; n; ) {
    if (el.contains(n)) return true;
    const panel = n.closest(".s-popover__panel");
    if (!panel || !panel.id) return false;
    n = document.querySelector(`[aria-controls="${panel.id}"]`);
  }
  return false;
};
const OPEN = [];
const innermost = (el) => OPEN[OPEN.length - 1] === el;
function Dialog({ open = true, onClose, title, description, children, footer, size = "md", variant = "dialog", inline = false, portal = false, closeLabel = "Lukk", initialFocus, className, ...rest }) {
  const panel = React.useRef(null);
  const uid = React.useId();
  const titleId = uid + "-title";
  const descId = uid + "-desc";
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  React.useEffect(() => {
    if (!open) return;
    const el = panel.current;
    const opener = document.activeElement;
    OPEN.push(el);
    const body = el.querySelector(".s-dialog__body");
    const target = initialFocus && initialFocus.current || el.querySelector("[autofocus],[data-autofocus]") || body && focusables(body)[0] || el;
    target.focus();
    const keepInside = (e) => {
      if (innermost(el) && !belongs(el, e.target)) (focusables(el)[0] || el).focus();
    };
    document.addEventListener("focusin", keepInside);
    const prevOverflow = document.body.style.overflow;
    if (!inline) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("focusin", keepInside);
      OPEN.splice(OPEN.indexOf(el), 1);
      if (!inline) document.body.style.overflow = prevOverflow;
      if (opener && opener.focus && document.contains(opener)) opener.focus();
    };
  }, [open, inline, portal]);
  const onKeyDown = (e) => {
    const el = panel.current;
    if (!innermost(el)) return;
    if (e.key === "Escape" && closeRef.current) {
      e.stopPropagation();
      closeRef.current();
      return;
    }
    if (e.key !== "Tab") return;
    const list = focusables(el);
    if (!list.length) {
      e.preventDefault();
      el.focus();
      return;
    }
    const first = list[0], last = list[list.length - 1], cur = document.activeElement;
    if (e.shiftKey && (cur === first || cur === el)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && cur === last) {
      e.preventDefault();
      first.focus();
    }
  };
  if (!open) return null;
  const sheet = variant === "sheet";
  const node = /* @__PURE__ */ jsx("div", { className: cx("s-dialog-scrim", inline && "s-dialog-scrim--inline", sheet && "s-dialog-scrim--sheet"), onMouseDown: (e) => {
    if (e.target === e.currentTarget && onClose) {
      e.preventDefault();
      onClose();
    }
  }, children: /* @__PURE__ */ jsxs("div", { ref: panel, role: "dialog", "aria-modal": "true", "aria-labelledby": title ? titleId : void 0, "aria-describedby": description ? descId : void 0, tabIndex: -1, onKeyDown, className: cx("s-dialog", size === "lg" && "s-dialog--lg", sheet && "s-dialog--sheet", className), ...rest, children: [
    sheet ? /* @__PURE__ */ jsx("div", { className: "s-dialog__handle", "aria-hidden": "true" }) : null,
    /* @__PURE__ */ jsxs("div", { className: "s-dialog__head", children: [
      /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        title ? /* @__PURE__ */ jsx("h2", { id: titleId, className: "s-dialog__title", children: title }) : null,
        description ? /* @__PURE__ */ jsx("p", { id: descId, className: "s-dialog__desc", children: description }) : null
      ] }),
      onClose ? /* @__PURE__ */ jsx(IconButton, { icon: "x", label: closeLabel, size: "sm", onClick: onClose, style: { margin: "-4px -6px 0 0" } }) : null
    ] }),
    children ? /* @__PURE__ */ jsx("div", { className: "s-dialog__body", children }) : null,
    footer ? /* @__PURE__ */ jsx("div", { className: "s-dialog__foot", children: footer }) : null
  ] }) });
  return portal && !inline && typeof document !== "undefined" ? createPortal(node, document.body) : node;
}
export {
  Dialog
};
