// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function ListItem({ title, meta, icon, image, imageAlt = "", leading, trailing, href, onClick, disabled, className, children, ...rest }) {
  const El = href ? "a" : onClick ? "button" : "div";
  const opens = El !== "div";
  const lead = leading !== void 0 ? leading : image ? /* @__PURE__ */ jsx("img", { className: "s-listitem__img", src: image, alt: imageAlt }) : icon ? /* @__PURE__ */ jsx("span", { className: "s-listitem__icon", children: /* @__PURE__ */ jsx(Icon, { name: icon, size: 20 }) }) : null;
  const trail = trailing !== void 0 ? trailing : opens ? /* @__PURE__ */ jsx(Icon, { name: "chevron-right", size: 18 }) : null;
  const props = El === "a" ? disabled ? { "aria-disabled": "true" } : { href, onClick } : El === "button" ? { type: "button", onClick, disabled } : {};
  return /* @__PURE__ */ jsxs(El, { className: cx("s-listitem", opens && "s-listitem--opens", className), ...props, ...rest, children: [
    lead ? /* @__PURE__ */ jsx("span", { className: "s-listitem__lead", children: lead }) : null,
    /* @__PURE__ */ jsxs("span", { className: "s-listitem__body", children: [
      /* @__PURE__ */ jsx("span", { className: "s-listitem__title", children: title }),
      meta ? /* @__PURE__ */ jsxs(Fragment, { children: [
        " ",
        /* @__PURE__ */ jsx("span", { className: "s-listitem__meta", children: meta })
      ] }) : null,
      children
    ] }),
    trail ? /* @__PURE__ */ jsx("span", { className: "s-listitem__trail", children: trail }) : null
  ] });
}
export {
  ListItem
};
