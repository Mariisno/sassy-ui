// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const CONTROL = 'input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])';
function focusTarget(el) {
  if (!el) return null;
  if (el.matches(CONTROL)) return el;
  return el.querySelector(CONTROL);
}
function ErrorSummary({ title = "Noe m\xE5 rettes f\xF8r du kan g\xE5 videre", errors = [], autoFocus = true, level = 2, id, className, style, children, ...rest }) {
  const ref = React.useRef(null);
  const auto = "s" + React.useId().replace(/:/g, "");
  const sid = id || auto;
  const titleId = sid + "-title";
  const H = "h" + Math.min(Math.max(level, 2), 6);
  React.useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus();
  }, [autoFocus]);
  const go = (e, targetId) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = e.currentTarget.ownerDocument.getElementById(targetId);
    const target = focusTarget(el);
    if (!target) return;
    e.preventDefault();
    target.focus();
    if (target !== el) el.scrollIntoView({ block: "nearest" });
  };
  return /* @__PURE__ */ jsx("section", { ref, id: sid, tabIndex: -1, "aria-labelledby": titleId, className: cx("s-errorsummary", className), style, ...rest, children: /* @__PURE__ */ jsxs("div", { role: "alert", children: [
    /* @__PURE__ */ jsxs(H, { id: titleId, className: "s-errorsummary__title", children: [
      /* @__PURE__ */ jsx(Icon, { name: "circle-alert", size: 20, className: "s-errorsummary__icon" }),
      title
    ] }),
    children ? /* @__PURE__ */ jsx("p", { className: "s-errorsummary__text", children }) : null,
    errors.length ? /* @__PURE__ */ jsx("ul", { className: "s-errorsummary__list", children: errors.map((err, i) => /* @__PURE__ */ jsx("li", { children: err.id ? /* @__PURE__ */ jsx("a", { href: "#" + err.id, className: "s-errorsummary__link", onClick: (e) => go(e, err.id), children: err.message }) : /* @__PURE__ */ jsx("span", { className: "s-errorsummary__item", children: err.message }) }, `${err.id || ""}-${i}`)) }) : null
  ] }) });
}
export {
  ErrorSummary,
  focusTarget
};
