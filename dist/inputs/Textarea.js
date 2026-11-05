// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx } from "react/jsx-runtime";
import React from "react";
import { Field, useField } from "./Input.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const Textarea = React.forwardRef(function Textarea2({ label, hint, error, optional, optionalLabel, rows = 4, disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
  const { fid, hintId, describedBy } = useField(id, hint, error, extra);
  return /* @__PURE__ */ jsx(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, children: /* @__PURE__ */ jsx("div", { className: cx("s-control", "s-control--area", error && "s-control--invalid", disabled && "s-control--disabled", className), style, children: /* @__PURE__ */ jsx("textarea", { ref, id: fid, rows, className: "s-control__input", disabled, "aria-invalid": !!error || void 0, "aria-describedby": describedBy, ...rest }) }) });
});
export {
  Textarea
};
