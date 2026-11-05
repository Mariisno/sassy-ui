// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Tooltip({ content, kbd, side = "top", open = false, children, className, id, ...rest }) {
  const auto = "s" + React.useId().replace(/:/g, "");
  const tipId = id || auto + "-tip";
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const active = hover || focus;
  React.useEffect(() => {
    if (!active) return void 0;
    const onKey = (e) => {
      if (e.key === "Escape") setDismissed(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
  const on = (set) => () => {
    set(true);
    setDismissed(false);
  };
  const off = (set) => (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) set(false);
  };
  const trigger = React.isValidElement(children) ? React.cloneElement(children, {
    title: void 0,
    "aria-describedby": [children.props["aria-describedby"], tipId].filter(Boolean).join(" ")
  }) : children;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx("s-tip", side === "bottom" && "s-tip--bottom", open && "s-tip--open", dismissed && !open && "s-tip--dismissed", className),
      onMouseEnter: on(setHover),
      onMouseLeave: off(setHover),
      onFocus: on(setFocus),
      onBlur: off(setFocus),
      ...rest,
      children: [
        trigger,
        /* @__PURE__ */ jsxs("span", { id: tipId, role: "tooltip", className: "s-tip__bubble", children: [
          content,
          kbd ? /* @__PURE__ */ jsx("span", { className: "s-tip__kbd", children: kbd }) : null
        ] })
      ]
    }
  );
}
export {
  Tooltip
};
