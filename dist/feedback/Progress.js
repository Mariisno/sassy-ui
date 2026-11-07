// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Progress({ variant = "bar", value, max = 100, label, valueText, size = 48, tone = "accent", className, style, children, ...rest }) {
  const known = typeof value === "number" && Number.isFinite(value);
  const fraction = known ? Math.min(1, Math.max(0, max > 0 ? value / max : 0)) : 0;
  const aria = {
    role: "progressbar",
    "aria-label": rest["aria-labelledby"] ? void 0 : label,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    "aria-valuenow": known ? Math.min(max, Math.max(0, value)) : void 0,
    // ARIA wants it inside min–max; say more with valueText
    "aria-valuetext": valueText
  };
  const classes = cx("s-progress", "s-progress--" + variant, tone !== "accent" && "s-progress--" + tone, !known && "s-progress--indeterminate", className);
  if (variant === "ring") {
    const stroke = Math.max(3, Math.round(size / 12));
    const r = (size - stroke) / 2 - 1;
    const c = 2 * Math.PI * r;
    return /* @__PURE__ */ jsxs("span", { className: classes, style: { width: size, height: size, ...style }, ...aria, ...rest, children: [
      /* @__PURE__ */ jsxs("svg", { className: "s-progress__svg", width: size, height: size, viewBox: `0 0 ${size} ${size}`, "aria-hidden": "true", focusable: "false", children: [
        /* @__PURE__ */ jsx("circle", { className: "s-progress__edge", cx: size / 2, cy: size / 2, r, strokeWidth: stroke + 2, fill: "none" }),
        /* @__PURE__ */ jsx("circle", { className: "s-progress__track", cx: size / 2, cy: size / 2, r, strokeWidth: stroke, fill: "none" }),
        /* @__PURE__ */ jsx("circle", { className: "s-progress__fill", cx: size / 2, cy: size / 2, r, strokeWidth: stroke, fill: "none", strokeDasharray: c, strokeDashoffset: known ? c * (1 - fraction) : c * 0.75, transform: `rotate(-90 ${size / 2} ${size / 2})` })
      ] }),
      children ? /* @__PURE__ */ jsx("span", { className: "s-progress__center", children }) : null
    ] });
  }
  return /* @__PURE__ */ jsx("span", { className: classes, style, ...aria, ...rest, children: /* @__PURE__ */ jsx("span", { className: "s-progress__track", children: /* @__PURE__ */ jsx("span", { className: "s-progress__fill", style: known ? { width: fraction * 100 + "%" } : void 0 }) }) });
}
export {
  Progress
};
