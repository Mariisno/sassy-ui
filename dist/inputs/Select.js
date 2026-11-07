// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Field, useField } from "./Input.js";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const Select = React.forwardRef(function Select2({ label, hint, error, optional, optionalLabel, options = [], placeholder, size = "md", disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
  const { fid, hintId, describedBy } = useField(id, hint, error, extra);
  return /* @__PURE__ */ jsx(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, children: /* @__PURE__ */ jsxs("div", { className: cx("s-control", size !== "md" && "s-control--" + size, error && "s-control--invalid", disabled && "s-control--disabled", className), style, children: [
    /* @__PURE__ */ jsxs("select", { ref, id: fid, className: "s-control__input s-control__select", disabled, "aria-invalid": !!error || void 0, "aria-describedby": describedBy, ...rest, children: [
      placeholder ? /* @__PURE__ */ jsx("option", { value: "", children: placeholder }) : null,
      options.map((o) => {
        const v = typeof o === "string" ? { value: o, label: o } : o;
        return /* @__PURE__ */ jsx("option", { value: v.value, children: v.label }, v.value);
      })
    ] }),
    /* @__PURE__ */ jsx(Icon, { name: "chevron-down", size: 16, className: "s-control__chev" })
  ] }) });
});
export {
  Select
};
