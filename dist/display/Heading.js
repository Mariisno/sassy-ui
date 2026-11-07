// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const SIZES = ["display", "h1", "h2", "h3", "h4"];
const Heading = React.forwardRef(function Heading2({ level, size, className, children, ...rest }, ref) {
  const n = Math.min(6, Math.max(1, Math.round(Number(level)) || 2));
  const El = "h" + n;
  const look = SIZES.includes(size) ? size : n <= 4 ? "h" + n : "h4";
  return /* @__PURE__ */ jsx(El, { ref, className: cx("s-" + look, className), ...rest, children });
});
export {
  Heading
};
