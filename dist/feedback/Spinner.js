// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Spinner({ size = "md", label, className, style, ...rest }) {
  const hidden = rest["aria-hidden"] === true || rest["aria-hidden"] === "true";
  return /* @__PURE__ */ jsxs("span", { role: hidden ? void 0 : "status", className: cx("s-spinner", size !== "md" && "s-spinner--" + size, className), style, ...rest, children: [
    /* @__PURE__ */ jsx("span", { className: "s-spinner__ring", "aria-hidden": "true" }),
    !hidden && label ? /* @__PURE__ */ jsx("span", { className: "s-sr-only", children: label }) : null
  ] });
}
export {
  Spinner
};
