// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../buttons/IconButton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function useField(id, hint, error, extra) {
  const auto = "s" + React.useId().replace(/:/g, "");
  const fid = id || auto;
  const hintId = fid + "-hint";
  const describedBy = [error || hint ? hintId : null, extra].filter(Boolean).join(" ") || void 0;
  return { fid, hintId, describedBy };
}
const MODES = {
  number: { type: "text", inputMode: "numeric" },
  decimal: { type: "text", inputMode: "decimal" },
  phone: { type: "tel", inputMode: "tel", autoComplete: "tel" },
  email: { type: "email", inputMode: "email", autoComplete: "email" },
  url: { type: "url", inputMode: "url", autoComplete: "url" },
  search: { type: "search", inputMode: "search", enterKeyHint: "search" },
  date: { type: "date" },
  time: { type: "time" },
  password: { type: "password", autoComplete: "current-password" }
};
function Field({ label, hint, error, optional, optionalLabel = "Valgfritt", htmlFor, hintId, children }) {
  const hid = hintId || (htmlFor ? htmlFor + "-hint" : void 0);
  return /* @__PURE__ */ jsxs("div", { className: "s-field", children: [
    label ? /* @__PURE__ */ jsxs("label", { className: "s-field__label", htmlFor, children: [
      label,
      optional ? /* @__PURE__ */ jsx("span", { className: "s-field__opt", children: optionalLabel }) : null
    ] }) : null,
    children,
    error ? /* @__PURE__ */ jsx("span", { id: hid, role: "alert", className: "s-field__hint s-field__hint--error", children: error }) : hint ? /* @__PURE__ */ jsx("span", { id: hid, className: "s-field__hint", children: hint }) : null
  ] });
}
const Input = React.forwardRef(function Input2({ label, hint, error, optional, optionalLabel, icon, prefix, suffix, size = "md", mode, type: typeProp, passwordToggle = true, passwordToggleLabel = "Vis passord", disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
  const { fid, hintId, describedBy } = useField(id, hint, error, extra);
  const preset = MODES[mode] || {};
  const [shown, setShown] = React.useState(false);
  const toggle = mode === "password" && passwordToggle;
  const type = toggle && shown ? "text" : typeProp ?? preset.type;
  return /* @__PURE__ */ jsx(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, children: /* @__PURE__ */ jsxs("div", { className: cx("s-control", size !== "md" && "s-control--" + size, error && "s-control--invalid", disabled && "s-control--disabled", className), style, children: [
    icon ? /* @__PURE__ */ jsx("span", { className: "s-control__affix", children: /* @__PURE__ */ jsx(Icon, { name: icon, size: 16 }) }) : prefix ? /* @__PURE__ */ jsx("span", { className: "s-control__affix", children: prefix }) : null,
    /* @__PURE__ */ jsx("input", { ref, id: fid, className: "s-control__input", disabled, "aria-invalid": !!error || void 0, "aria-describedby": describedBy, ...preset, ...rest, type }),
    suffix ? /* @__PURE__ */ jsx("span", { className: "s-control__affix s-control__affix--end", children: suffix }) : null,
    toggle ? /* @__PURE__ */ jsx("span", { className: "s-control__affix s-control__affix--action", children: /* @__PURE__ */ jsx(IconButton, { size: size === "lg" ? "md" : "sm", icon: shown ? "eye-off" : "eye", label: passwordToggleLabel, "aria-pressed": shown, disabled, onClick: () => setShown((s) => !s) }) }) : null
  ] }) });
});
export {
  Field,
  Input,
  useField
};
