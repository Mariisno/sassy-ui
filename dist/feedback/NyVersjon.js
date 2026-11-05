// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { ToastStack, toastStackContext } from "./Toast.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function NyVersjon({ open = false, onUpdate, onLater, updating = false, title = "Ny versjon", description, updateLabel = "Oppdater", laterLabel = "Senere", stack = true, stackProps, className, style, ...rest }) {
  const inStack = React.useContext(toastStackContext);
  const toast = open ? /* @__PURE__ */ jsxs("div", { role: inStack || stack ? void 0 : "status", className: cx("s-toast", "s-toast--info", "s-nyversjon", className), style, ...rest, children: [
    /* @__PURE__ */ jsx(Icon, { name: "info", size: 18, className: "s-toast__icon" }),
    /* @__PURE__ */ jsxs("div", { className: "s-toast__body", children: [
      /* @__PURE__ */ jsx("div", { className: "s-toast__title", children: title }),
      description ? /* @__PURE__ */ jsx("div", { className: "s-toast__desc", children: description }) : null,
      /* @__PURE__ */ jsxs("div", { className: "s-nyversjon__actions", children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "s-toast__action", onClick: onUpdate, disabled: updating || void 0, "aria-busy": updating || void 0, children: updateLabel }),
        onLater ? /* @__PURE__ */ jsx("button", { type: "button", className: "s-toast__action s-toast__action--quiet", onClick: onLater, children: laterLabel }) : null
      ] })
    ] })
  ] }) : null;
  if (!stack || inStack) return toast;
  return /* @__PURE__ */ jsx(ToastStack, { ...stackProps, className: cx("s-nyversjon-stack", stackProps && stackProps.className), children: toast });
}
export {
  NyVersjon
};
