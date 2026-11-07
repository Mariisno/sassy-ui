// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Radio = React.forwardRef(function Radio2({ label, description, disabled, className, style, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("s-check", "s-check--radio", disabled && "s-check--disabled", className), style, children: [
    /* @__PURE__ */ jsx("input", { ref, type: "radio", className: "s-check__input", disabled, ...rest }),
    /* @__PURE__ */ jsx("span", { className: "s-check__box", children: /* @__PURE__ */ jsx("span", { className: "s-check__dot" }) }),
    label || description ? /* @__PURE__ */ jsxs("span", { className: "s-check__text", children: [
      label,
      description ? /* @__PURE__ */ jsx("span", { className: "s-check__desc", children: description }) : null
    ] }) : null
  ] });
});
export {
  Radio
};
