// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Tag({ icon, selected, onClick, onRemove, removeLabel, className, children, ...rest }) {
  const interactive = !!onClick || selected !== void 0;
  const toggle = interactive ? { type: "button", "aria-pressed": !!selected, onClick } : {};
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    icon ? /* @__PURE__ */ jsx(Icon, { name: icon, size: 14 }) : null,
    children
  ] });
  if (!onRemove) {
    const El = interactive ? "button" : "span";
    return /* @__PURE__ */ jsx(El, { className: cx("s-tag", className), ...toggle, ...rest, children: content });
  }
  const named = typeof children === "string" || typeof children === "number";
  const label = removeLabel || (named ? "Fjern " + children : "Fjern");
  return /* @__PURE__ */ jsxs("span", { className: cx("s-tag", "s-tag--removable", selected && "s-tag--selected", className), ...rest, children: [
    interactive ? /* @__PURE__ */ jsx("button", { className: "s-tag__main", ...toggle, children: content }) : content,
    /* @__PURE__ */ jsx("button", { type: "button", className: "s-tag__x", "aria-label": label, onClick: (e) => {
      e.stopPropagation();
      onRemove(e);
    }, children: /* @__PURE__ */ jsx(Icon, { name: "x", size: 12, strokeWidth: 2 }) })
  ] });
}
export {
  Tag
};
