// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../buttons/IconButton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const toastStackContext = React.createContext(false);
const InStack = toastStackContext;
const ICONS = { neutral: "info", success: "circle-check", warning: "triangle-alert", danger: "circle-alert", info: "info" };
function Toast({ tone = "neutral", title, description, actionLabel, onAction, onClose, closeLabel = "Lukk", className, style, ...rest }) {
  const inStack = React.useContext(InStack);
  return /* @__PURE__ */ jsxs("div", { role: inStack ? void 0 : "status", className: cx("s-toast", "s-toast--" + tone, className), style, ...rest, children: [
    /* @__PURE__ */ jsx(Icon, { name: ICONS[tone] || "info", size: 18, className: "s-toast__icon" }),
    /* @__PURE__ */ jsxs("div", { className: "s-toast__body", children: [
      title ? /* @__PURE__ */ jsx("div", { className: "s-toast__title", children: title }) : null,
      description ? /* @__PURE__ */ jsx("div", { className: "s-toast__desc", children: description }) : null,
      actionLabel ? /* @__PURE__ */ jsx("button", { type: "button", className: "s-toast__action", onClick: onAction, children: actionLabel }) : null
    ] }),
    onClose ? /* @__PURE__ */ jsx(IconButton, { icon: "x", label: closeLabel, size: "sm", onClick: onClose, style: { margin: "-6px -6px 0 0" } }) : null
  ] });
}
function ToastStack({ children, className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { role: "status", "aria-live": "polite", "aria-relevant": "additions text", className: cx("s-toast-stack", className), ...rest, children: /* @__PURE__ */ jsx(InStack.Provider, { value: true, children }) });
}
export {
  Toast,
  ToastStack,
  toastStackContext
};
