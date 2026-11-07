// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Card({ variant = "outlined", padding = "md", interactive = false, as = "div", className, children, ...rest }) {
  const Tag = as;
  return /* @__PURE__ */ jsx(Tag, { className: cx("s-card", "s-card--pad-" + padding, variant !== "outlined" && "s-card--" + variant, interactive && "s-card--interactive", className), ...rest, children });
}
export {
  Card
};
