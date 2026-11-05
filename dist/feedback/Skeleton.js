// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Skeleton({ variant = "text", lines = 1, width, height, size = 40, className, style, ...rest }) {
  if (variant === "text") {
    const n = Math.max(1, Math.floor(lines));
    const line = (i) => /* @__PURE__ */ jsx("span", { className: cx("s-skeleton", "s-skeleton--text", n > 1 && i === n - 1 && "s-skeleton--last") }, i);
    if (n === 1) return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cx("s-skeleton", "s-skeleton--text", className), style: { width, ...style }, ...rest });
    return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cx("s-skeleton-lines", className), style: { width, ...style }, ...rest, children: Array.from({ length: n }, (_, i) => line(i)) });
  }
  const dims = variant === "circle" ? { width: size, height: size } : { width, height };
  return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cx("s-skeleton", "s-skeleton--" + variant, className), style: { ...dims, ...style }, ...rest });
}
export {
  Skeleton
};
