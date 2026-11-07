// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function SegmentedControl({ label, hint, options = [], name, value, defaultValue, onChange, fullWidth, disabled, id, className, style, "aria-describedby": extra, ...rest }) {
  const auto = "s" + React.useId().replace(/:/g, "");
  const fid = id || auto;
  const hintId = fid + "-hint";
  const legendId = fid + "-legend";
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== void 0 ? value : inner;
  const describedBy = [hint ? hintId : null, extra].filter(Boolean).join(" ") || void 0;
  const pick = (v) => {
    if (value === void 0) setInner(v);
    onChange && onChange(v);
  };
  return /* @__PURE__ */ jsxs(
    "fieldset",
    {
      id: fid,
      role: "radiogroup",
      className: cx("s-segmented", fullWidth && "s-segmented--full", className),
      style,
      disabled,
      "aria-labelledby": label ? legendId : void 0,
      "aria-describedby": describedBy,
      ...rest,
      children: [
        label ? /* @__PURE__ */ jsx("legend", { id: legendId, className: "s-segmented__legend", children: label }) : null,
        /* @__PURE__ */ jsx("div", { className: "s-segmented__track", children: options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return /* @__PURE__ */ jsxs("label", { className: cx("s-segmented__item", opt.disabled && "s-segmented__item--disabled"), children: [
            /* @__PURE__ */ jsx("input", { type: "radio", className: "s-segmented__input", name: name || fid, value: opt.value, checked: cur === opt.value, disabled: opt.disabled, onChange: () => pick(opt.value) }),
            /* @__PURE__ */ jsxs("span", { className: "s-segmented__face", children: [
              opt.icon ? /* @__PURE__ */ jsx(Icon, { name: opt.icon, size: 16 }) : null,
              opt.label
            ] })
          ] }, opt.value);
        }) }),
        hint ? /* @__PURE__ */ jsx("span", { id: hintId, className: "s-field__hint s-segmented__hint", children: hint }) : null
      ]
    }
  );
}
export {
  SegmentedControl
};
