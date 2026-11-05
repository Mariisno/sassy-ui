// Sussi 0.9.0. Built from components/; edit the source, not this file.
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
