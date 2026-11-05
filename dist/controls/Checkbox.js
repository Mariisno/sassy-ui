// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const Checkbox = React.forwardRef(function Checkbox2({ label, description, indeterminate = false, disabled, className, style, ...rest }, ref) {
  const own = React.useRef(null);
  React.useEffect(() => {
    if (own.current) own.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const setRefs = (el) => {
    own.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };
  return /* @__PURE__ */ jsxs("label", { className: cx("s-check", disabled && "s-check--disabled", className), style, children: [
    /* @__PURE__ */ jsx("input", { ref: setRefs, type: "checkbox", className: "s-check__input", disabled, ...rest }),
    /* @__PURE__ */ jsx("span", { className: "s-check__box", children: /* @__PURE__ */ jsx(Icon, { name: indeterminate ? "minus" : "check", size: 13, strokeWidth: 2.75 }) }),
    label || description ? /* @__PURE__ */ jsxs("span", { className: "s-check__text", children: [
      label,
      description ? /* @__PURE__ */ jsx("span", { className: "s-check__desc", children: description }) : null
    ] }) : null
  ] });
});
export {
  Checkbox
};
