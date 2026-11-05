// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const HEADING = /^h[1-6]$/;
function Disclosure({ title, open, defaultOpen = false, onToggle, className, children, ...rest }) {
  const ref = React.useRef(null);
  const controlled = open !== void 0;
  const [inner, setInner] = React.useState(defaultOpen);
  const [, rerender] = React.useReducer((n) => n + 1, 0);
  const isOpen = controlled ? open : inner;
  React.useEffect(() => {
    if (ref.current && ref.current.open !== isOpen) ref.current.open = isOpen;
  });
  const toggle = (e) => {
    const now = e.currentTarget.open;
    if (now === isOpen) return;
    if (controlled) rerender();
    else setInner(now);
    onToggle?.(now);
  };
  return /* @__PURE__ */ jsxs("details", { ref, open: isOpen, onToggle: toggle, className: cx("s-disclosure", className), ...rest, children: [
    /* @__PURE__ */ jsxs("summary", { className: "s-disclosure__summary", children: [
      React.isValidElement(title) && HEADING.test(title.type) ? React.cloneElement(title, { className: cx("s-disclosure__title", title.props.className) }) : /* @__PURE__ */ jsx("span", { className: "s-disclosure__title", children: title }),
      /* @__PURE__ */ jsx(Icon, { name: "chevron-down", size: 18, className: "s-disclosure__chevron" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "s-disclosure__body", children })
  ] });
}
export {
  Disclosure
};
