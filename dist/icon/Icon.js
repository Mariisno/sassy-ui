// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
import { iconData } from "./iconData.js";
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function Icon({ name, size = 18, strokeWidth = 1.75, className, style, title, ...rest }) {
  const inner = iconData[name];
  if (!inner) return null;
  return /* @__PURE__ */ jsx("svg", { className: ["s-icon", className].filter(Boolean).join(" "), width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": title ? void 0 : true, role: title ? "img" : void 0, style, ...rest, dangerouslySetInnerHTML: { __html: (title ? "<title>" + esc(title) + "</title>" : "") + inner } });
}
export {
  Icon
};
