// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Badge({ tone = "neutral", dot = false, outline = false, mono = false, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("span", { className: cx("s-badge", tone !== "neutral" && "s-badge--" + tone, outline && "s-badge--outline", mono && "s-badge--mono", className), ...rest, children: [
    dot ? /* @__PURE__ */ jsx("span", { className: "s-badge__dot" }) : null,
    children
  ] });
}
export {
  Badge
};
