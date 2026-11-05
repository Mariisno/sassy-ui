// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function VisuallyHidden({ as: El = "span", focusable = false, className, children, ...rest }) {
  return /* @__PURE__ */ jsx(El, { className: cx("s-sr-only", focusable && "s-sr-only--focusable", className), ...rest, children });
}
export {
  VisuallyHidden
};
