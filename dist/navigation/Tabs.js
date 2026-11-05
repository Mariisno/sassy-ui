// Sussi 0.9.0. Built from components/; edit the source, not this file.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const tabId = (base, v) => base + "-tab-" + v;
const panelId = (base, v) => base + "-panel-" + v;
const TabsContext = React.createContext(null);
function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", id, children, className, style, ...rest }) {
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && items[0].id));
  const auto = "s" + React.useId().replace(/:/g, "");
  const base = id || auto;
  const cur = value ?? inner;
  const refs = React.useRef([]);
  const pick = (v) => {
    if (value === void 0) setInner(v);
    onChange && onChange(v);
  };
  const panels = /* @__PURE__ */ new Set();
  React.Children.forEach(children, (c) => {
    if (c && c.type === TabPanel) panels.add(c.props.value);
  });
  const focusable = items.some((t) => t.id === cur) ? cur : items[0] && items[0].id;
  const onKeyDown = (e) => {
    const i = items.findIndex((t) => t.id === e.currentTarget.dataset.value);
    const last = items.length - 1;
    const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (to === void 0) return;
    e.preventDefault();
    refs.current[to] && refs.current[to].focus();
    pick(items[to].id);
  };
  return /* @__PURE__ */ jsxs(TabsContext.Provider, { value: { base, cur }, children: [
    /* @__PURE__ */ jsx("div", { role: "tablist", className: cx("s-tabs", variant === "segmented" && "s-tabs--segmented", className), style, ...rest, children: items.map((t, i) => /* @__PURE__ */ jsxs(
      "button",
      {
        ref: (el) => {
          refs.current[i] = el;
        },
        id: tabId(base, t.id),
        "data-value": t.id,
        role: "tab",
        type: "button",
        "aria-selected": cur === t.id,
        "aria-controls": panels.has(t.id) ? panelId(base, t.id) : void 0,
        tabIndex: t.id === focusable ? 0 : -1,
        className: "s-tab",
        onClick: () => pick(t.id),
        onKeyDown,
        children: [
          t.icon ? /* @__PURE__ */ jsx(Icon, { name: t.icon, size: 16 }) : null,
          t.label,
          t.count !== void 0 ? /* @__PURE__ */ jsx("span", { className: "s-tab__count", children: t.count }) : null
        ]
      },
      t.id
    )) }),
    children
  ] });
}
function TabPanel({ value, children, className, style, ...rest }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  const selected = ctx.cur === value;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tabpanel",
      id: panelId(ctx.base, value),
      "aria-labelledby": tabId(ctx.base, value),
      tabIndex: 0,
      hidden: !selected,
      className: cx("s-tabpanel", className),
      style,
      ...rest,
      children
    }
  );
}
export {
  TabPanel,
  Tabs
};
