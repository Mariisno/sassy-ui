// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Fieldset({ legend, hint, error, optional, optionalLabel = "Valgfritt", layout = "column", id, className, style, children, "aria-describedby": extra, ...rest }) {
  const auto = "s" + React.useId().replace(/:/g, "");
  const fid = id || auto;
  const hintId = fid + "-hint";
  const describedBy = [error || hint ? hintId : null, extra].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs("fieldset", { id: fid, className: cx("s-fieldset", error && "s-fieldset--invalid", className), style, "aria-describedby": describedBy, ...rest, children: [
    /* @__PURE__ */ jsxs("legend", { className: "s-fieldset__legend", children: [
      legend,
      optional ? /* @__PURE__ */ jsx("span", { className: "s-field__opt", children: optionalLabel }) : null
    ] }),
    hint && !error ? /* @__PURE__ */ jsx("span", { id: hintId, className: "s-field__hint s-fieldset__hint", children: hint }) : null,
    /* @__PURE__ */ jsx("div", { className: cx("s-fieldset__items", layout === "row" && "s-fieldset__items--row"), children }),
    error ? /* @__PURE__ */ jsxs("span", { id: hintId, role: "alert", className: "s-field__hint s-field__hint--error s-fieldset__error", children: [
      /* @__PURE__ */ jsx(Icon, { name: "circle-alert", size: 14, className: "s-fieldset__error-icon" }),
      /* @__PURE__ */ jsx("span", { children: error })
    ] }) : null
  ] });
}
export {
  Fieldset
};
