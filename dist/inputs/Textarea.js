// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx } from "react/jsx-runtime";
import React from "react";
import { Field, useField, useCharCount } from "./Input.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const Textarea = React.forwardRef(function Textarea2({ label, hint, error, optional, optionalLabel, rows = 4, count = false, countLang = "nb", maxLength, value, defaultValue, onChange, disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
  const counted = useCharCount({ count, maxLength, value, defaultValue, onChange, countLang });
  const { fid, hintId, countId, describedBy } = useField(id, hint, error, extra, counted.on);
  const invalid = !!error || counted.over;
  return /* @__PURE__ */ jsx(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, counter: counted.on ? counted.node(countId) : null, children: /* @__PURE__ */ jsx("div", { className: cx("s-control", "s-control--area", invalid && "s-control--invalid", disabled && "s-control--disabled", className), style, children: /* @__PURE__ */ jsx("textarea", { ref, id: fid, rows, className: "s-control__input", disabled, "aria-invalid": invalid || void 0, "aria-describedby": describedBy, maxLength: counted.on ? void 0 : maxLength, value, defaultValue, onChange: counted.onChange, ...rest }) }) });
});
export {
  Textarea
};
