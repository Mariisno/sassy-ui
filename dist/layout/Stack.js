// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const ALIGN = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" };
const JUSTIFY = { start: "flex-start", center: "center", end: "flex-end", between: "space-between" };
function Stack({ as: El = "div", direction = "column", gap = 4, wrap = false, align, justify, className, style, children, ...rest }) {
  const role = El === "ul" || El === "ol" ? "list" : void 0;
  return /* @__PURE__ */ jsx(El, { role, className: cx("s-stack", direction === "row" && "s-stack--row", wrap && "s-stack--wrap", className), style: { "--s-stack-gap": `var(--space-${gap})`, alignItems: ALIGN[align], justifyContent: JUSTIFY[justify], ...style }, ...rest, children });
}
export {
  Stack
};
