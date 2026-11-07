// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function EmptyState({ icon, title, description, action, level = 2, framed = false, className, children, ...rest }) {
  const H = "h" + Math.min(Math.max(level, 2), 6);
  return /* @__PURE__ */ jsxs("div", { className: cx("s-empty", framed && "s-empty--framed", className), ...rest, children: [
    icon ? /* @__PURE__ */ jsx("span", { className: "s-empty__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { name: icon, size: 26 }) }) : null,
    /* @__PURE__ */ jsx(H, { className: "s-empty__title", children: title }),
    description ? /* @__PURE__ */ jsx("p", { className: "s-empty__text", children: description }) : null,
    children,
    action ? /* @__PURE__ */ jsx("div", { className: "s-empty__action", children: action }) : null
  ] });
}
export {
  EmptyState
};
