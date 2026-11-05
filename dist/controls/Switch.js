// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Switch = React.forwardRef(function Switch2({ label, description, disabled, className, style, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("s-check", disabled && "s-check--disabled", className), style, children: [
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", role: "switch", className: "s-check__input", disabled, ...rest }),
    /* @__PURE__ */ jsx("span", { className: "s-switch__track", children: /* @__PURE__ */ jsx("span", { className: "s-switch__thumb" }) }),
    label || description ? /* @__PURE__ */ jsxs("span", { className: "s-check__text", children: [
      label,
      description ? /* @__PURE__ */ jsx("span", { className: "s-check__desc", children: description }) : null
    ] }) : null
  ] });
});
export {
  Switch
};
