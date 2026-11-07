// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const NEW_TAB_REL = ["noopener", "noreferrer"];
const Link = React.forwardRef(function Link2({ as: El = "a", to, variant = "inline", external, newTabLabel = "(\xE5pner i ny fane)", target, rel, className, children, ...rest }, ref) {
  const newTab = target === "_blank";
  const ext = external === void 0 ? newTab : external;
  const safeRel = newTab ? NEW_TAB_REL.concat((rel ? rel.split(/\s+/) : []).filter((r) => r && !NEW_TAB_REL.includes(r))).join(" ") : rel;
  return /* @__PURE__ */ jsxs(El, { ref, className: cx("s-link", variant !== "inline" && "s-link--" + variant, ext && "s-link--external", className), to: El === "a" ? void 0 : to, target, rel: safeRel, ...rest, children: [
    children,
    ext ? /* @__PURE__ */ jsxs(Fragment, { children: [
      "\u2060",
      /* @__PURE__ */ jsx(Icon, { name: "external-link", size: 14, className: "s-link__icon" })
    ] }) : null,
    newTab ? /* @__PURE__ */ jsx("span", { className: "s-sr-only", children: " " + newTabLabel }) : null
  ] });
});
export {
  Link
};
