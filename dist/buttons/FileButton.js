// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const FileButton = React.forwardRef(function FileButton2({ variant = "primary", size = "md", iconLeft, iconRight, fullWidth = false, accept, capture, multiple = false, disabled = false, onFiles, onChange, className, style, children, ...rest }, ref) {
  const iconSize = size === "lg" ? 18 : 16;
  const change = (e) => {
    const files = Array.from(e.target.files || []);
    onChange?.(e);
    if (files.length) onFiles?.(files);
    e.target.value = "";
  };
  return /* @__PURE__ */ jsxs("label", { className: cx("s-btn", "s-btn--" + variant, size !== "md" && "s-btn--" + size, fullWidth && "s-btn--full", "s-filebtn", disabled && "s-filebtn--disabled", className), style, children: [
    /* @__PURE__ */ jsx("input", { ref, type: "file", className: "s-filebtn__input", accept, capture, multiple, disabled, onChange: change, ...rest }),
    iconLeft ? /* @__PURE__ */ jsx(Icon, { name: iconLeft, size: iconSize }) : null,
    children,
    iconRight ? /* @__PURE__ */ jsx(Icon, { name: iconRight, size: iconSize }) : null
  ] });
});
export {
  FileButton
};
