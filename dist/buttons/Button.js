// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const Button = React.forwardRef(function Button2({ variant = "primary", size = "md", iconLeft, iconRight, loading = false, fullWidth = false, as = "button", className, children, disabled, onClick, "aria-disabled": ariaDisabled, ...rest }, ref) {
  const Tag = as;
  const iconSize = size === "lg" ? 18 : 16;
  const off = loading || ariaDisabled === true || ariaDisabled === "true";
  const click = (e) => {
    if (off) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };
  return /* @__PURE__ */ jsxs(Tag, { ref, className: cx("s-btn", "s-btn--" + variant, size !== "md" && "s-btn--" + size, fullWidth && "s-btn--full", className), disabled: Tag === "button" ? disabled : void 0, "aria-disabled": off ? "true" : void 0, "aria-busy": loading || void 0, onClick: click, ...Tag === "button" && !rest.type ? { type: "button" } : {}, ...rest, children: [
    loading ? /* @__PURE__ */ jsx("span", { className: "s-btn__spin" }) : iconLeft ? /* @__PURE__ */ jsx(Icon, { name: iconLeft, size: iconSize }) : null,
    children,
    iconRight && !loading ? /* @__PURE__ */ jsx(Icon, { name: iconRight, size: iconSize }) : null
  ] });
});
export {
  Button
};
