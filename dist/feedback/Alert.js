// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../buttons/IconButton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const ICONS = { info: "info", success: "circle-check", warning: "triangle-alert", danger: "circle-alert" };
const FOCUSABLE = 'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';
function focusBefore(el) {
  const all = [...el.ownerDocument.querySelectorAll(FOCUSABLE)].filter((f) => !el.contains(f) && f.offsetParent !== null);
  const before = all.filter((f) => el.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_PRECEDING);
  return before[before.length - 1] || all.find((f) => el.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) || null;
}
function Alert({ tone = "info", title, urgent = false, actionLabel, onAction, actions, onClose, closeLabel = "Lukk", focusOnClose, className, style, children, ...rest }) {
  const ref = React.useRef(null);
  const role = tone === "danger" && urgent ? "alert" : "status";
  const close = () => {
    const target = focusOnClose?.current || ref.current && focusBefore(ref.current);
    if (target && typeof target.focus === "function") target.focus();
    onClose?.();
  };
  return /* @__PURE__ */ jsxs("div", { ref, role, className: cx("s-alert", "s-alert--" + tone, className), style, ...rest, children: [
    /* @__PURE__ */ jsx(Icon, { name: ICONS[tone] || "info", size: 18, className: "s-alert__icon" }),
    /* @__PURE__ */ jsxs("div", { className: "s-alert__body", children: [
      title ? /* @__PURE__ */ jsx("div", { className: "s-alert__title", children: title }) : null,
      children ? /* @__PURE__ */ jsx("div", { className: "s-alert__text", children }) : null,
      actionLabel || actions ? /* @__PURE__ */ jsxs("div", { className: "s-alert__actions", children: [
        actionLabel ? /* @__PURE__ */ jsx("button", { type: "button", className: "s-alert__action", onClick: onAction, children: actionLabel }) : null,
        actions
      ] }) : null
    ] }),
    onClose ? /* @__PURE__ */ jsx(IconButton, { icon: "x", label: closeLabel, size: "sm", className: "s-alert__close", onClick: close }) : null
  ] });
}
export {
  Alert,
  focusBefore
};
