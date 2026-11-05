// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { Link } from "./Link.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const BackLink = React.forwardRef(function BackLink2({ className, children = "Tilbake", ...rest }, ref) {
  return /* @__PURE__ */ jsxs(Link, { ref, variant: "standalone", className: cx("s-backlink", className), ...rest, children: [
    /* @__PURE__ */ jsx(Icon, { name: "chevron-left", size: 18, className: "s-backlink__icon" }),
    children
  ] });
});
export {
  BackLink
};
