// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const IconButton = React.forwardRef(function IconButton2({ icon, label, variant = "ghost", size = "md", round = false, className, ...rest }, ref) {
  const s = size === "sm" ? 16 : size === "lg" ? 20 : 18;
  return /* @__PURE__ */ jsx("button", { ref, type: "button", "aria-label": label, title: label, className: cx("s-iconbtn", variant !== "ghost" && "s-iconbtn--" + variant, size !== "md" && "s-iconbtn--" + size, round && "s-iconbtn--round", className), ...rest, children: /* @__PURE__ */ jsx(Icon, { name: icon, size: s }) });
});
export {
  IconButton
};
