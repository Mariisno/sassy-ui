// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../buttons/IconButton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function useField(id, hint, error, extra, counted) {
  const auto = "s" + React.useId().replace(/:/g, "");
  const fid = id || auto;
  const hintId = fid + "-hint";
  const countId = fid + "-count";
  const describedBy = [error || hint ? hintId : null, counted ? countId : null, extra].filter(Boolean).join(" ") || void 0;
  return { fid, hintId, countId, describedBy };
}
const COUNT_PAUSE = 1e3;
const COUNT_TEXT = {
  nb: { locale: "nb-NO", of: "av", unit: "tegn", left: (r) => r + " igjen", over: (o) => o + " for mye", saidLeft: (r) => r + " tegn igjen", saidOver: (o) => o + " tegn for mye" },
  en: { locale: "en-GB", of: "of", unit: "characters", left: (r) => r + " left", over: (o) => o + " too many", saidLeft: (r) => r + (r === 1 ? " character left" : " characters left"), saidOver: (o) => o + (o === 1 ? " character too many" : " characters too many") }
};
function useCharCount({ count, maxLength, value, defaultValue, onChange, countLang }) {
  const max = Math.floor(Number(maxLength));
  const on = !!count && max > 0;
  const [own, setOwn] = React.useState(() => String(defaultValue ?? "").length);
  const [said, setSaid] = React.useState("");
  const timer = React.useRef(null);
  const t = COUNT_TEXT[countLang] || COUNT_TEXT.nb;
  const n = value != null ? String(value).length : own;
  const left = max - n;
  const state = !on ? null : left < 0 ? "over" : n >= max * 0.9 ? "warn" : "ok";
  const latest = React.useRef("");
  latest.current = on ? left < 0 ? t.saidOver(-left) : t.saidLeft(left) : "";
  React.useEffect(() => () => clearTimeout(timer.current), []);
  if (!on) return { on, onChange, over: false };
  const fmt = (x) => new Intl.NumberFormat(t.locale).format(x);
  const handleChange = (e) => {
    if (value == null) setOwn(e.target.value.length);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaid(latest.current), COUNT_PAUSE);
    if (onChange) onChange(e);
  };
  const node = (countId) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { id: countId, className: cx("s-field__count", state !== "ok" && "s-field__count--" + state), children: [
      state === "over" ? /* @__PURE__ */ jsx(Icon, { name: "circle-alert", size: 14, className: "s-field__count-icon" }) : null,
      /* @__PURE__ */ jsxs("span", { children: [
        fmt(n),
        " ",
        t.of,
        " ",
        fmt(max),
        /* @__PURE__ */ jsx("span", { className: "s-sr-only", children: " " + t.unit }),
        state === "warn" ? " \xB7 " + t.left(fmt(left)) : state === "over" ? " \xB7 " + t.over(fmt(-left)) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "s-sr-only", "aria-live": "polite", children: said })
  ] });
  return { on, onChange: handleChange, over: state === "over", node };
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
function Field({ label, hint, error, optional, optionalLabel = "Valgfritt", htmlFor, hintId, counter, children }) {
  const hid = hintId || (htmlFor ? htmlFor + "-hint" : void 0);
  const message = error ? /* @__PURE__ */ jsx("span", { id: hid, role: "alert", className: "s-field__hint s-field__hint--error", children: error }) : hint ? /* @__PURE__ */ jsx("span", { id: hid, className: "s-field__hint", children: hint }) : null;
  return /* @__PURE__ */ jsxs("div", { className: "s-field", children: [
    label ? /* @__PURE__ */ jsxs("label", { className: "s-field__label", htmlFor, children: [
      label,
      optional ? /* @__PURE__ */ jsx("span", { className: "s-field__opt", children: optionalLabel }) : null
    ] }) : null,
    children,
    counter ? /* @__PURE__ */ jsxs("div", { className: "s-field__foot", children: [
      message,
      counter
    ] }) : message
  ] });
}
const Input = React.forwardRef(function Input2({ label, hint, error, optional, optionalLabel, icon, prefix, suffix, size = "md", mode, type: typeProp, passwordToggle = true, passwordToggleLabel = "Vis passord", count = false, countLang = "nb", maxLength, value, defaultValue, onChange, disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
  const counted = useCharCount({ count, maxLength, value, defaultValue, onChange, countLang });
  const { fid, hintId, countId, describedBy } = useField(id, hint, error, extra, counted.on);
  const invalid = !!error || counted.over;
  const preset = MODES[mode] || {};
  const [shown, setShown] = React.useState(false);
  const toggle = mode === "password" && passwordToggle;
  const type = toggle && shown ? "text" : typeProp ?? preset.type;
  return /* @__PURE__ */ jsx(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, counter: counted.on ? counted.node(countId) : null, children: /* @__PURE__ */ jsxs("div", { className: cx("s-control", size !== "md" && "s-control--" + size, invalid && "s-control--invalid", disabled && "s-control--disabled", className), style, children: [
    icon ? /* @__PURE__ */ jsx("span", { className: "s-control__affix", children: /* @__PURE__ */ jsx(Icon, { name: icon, size: 16 }) }) : prefix ? /* @__PURE__ */ jsx("span", { className: "s-control__affix", children: prefix }) : null,
    /* @__PURE__ */ jsx("input", { ref, id: fid, className: "s-control__input", disabled, "aria-invalid": invalid || void 0, "aria-describedby": describedBy, maxLength: counted.on ? void 0 : maxLength, value, defaultValue, onChange: counted.onChange, ...preset, ...rest, type }),
    suffix ? /* @__PURE__ */ jsx("span", { className: "s-control__affix s-control__affix--end", children: suffix }) : null,
    toggle ? /* @__PURE__ */ jsx("span", { className: "s-control__affix s-control__affix--action", children: /* @__PURE__ */ jsx(IconButton, { size: size === "lg" ? "md" : "sm", icon: shown ? "eye-off" : "eye", label: passwordToggleLabel, "aria-pressed": shown, disabled, onClick: () => setShown((s) => !s) }) }) : null
  ] }) });
});
export {
  COUNT_PAUSE,
  Field,
  Input,
  useCharCount,
  useField
};
