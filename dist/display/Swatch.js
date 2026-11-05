// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const LIGHT = ["#FAF8F4", "#FFFFFF"];
const DARK = ["#161613", "#1E1E1A"];
const lum = (hex) => [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
function edges(color) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color || "");
  if (!m) return {};
  const hex = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1];
  const low = (bgs) => bgs.some((b) => ratio(hex, b.slice(1)) < 3);
  return { "data-edge-light": low(LIGHT) || void 0, "data-edge-dark": low(DARK) || void 0 };
}
function Swatch({ color, label, pressed, onClick, size = "md", disabled, className, style, ...rest }) {
  const dot = /* @__PURE__ */ jsx("span", { className: "s-swatch__dot", style: { "--swatch": color } });
  const cls = cx("s-swatch", "s-swatch--" + size, className);
  if (onClick) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: cx(cls, "s-swatch--button"),
        "aria-label": label,
        "aria-pressed": pressed === void 0 ? void 0 : !!pressed,
        title: label,
        disabled,
        onClick,
        style,
        ...edges(color),
        ...rest,
        children: dot
      }
    );
  }
  return /* @__PURE__ */ jsx("span", { className: cls, role: label ? "img" : void 0, "aria-label": label, "aria-hidden": label ? void 0 : "true", style, ...edges(color), ...rest, children: dot });
}
export {
  Swatch
};
