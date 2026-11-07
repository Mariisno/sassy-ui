// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const icon = (it, size) => typeof it.icon === "string" ? /* @__PURE__ */ jsx(Icon, { name: it.icon, size }) : typeof it.icon === "function" ? it.icon(size) : it.icon || null;
function AppShell({ items = [], current, onNavigate, brand, footer, label = "Hovedmeny", moreLabel = "Mer", skipLabel = "Hopp til innholdet", mainId, contained = false, className, children }) {
  const [open, setOpen] = React.useState(false);
  const moreBtn = React.useRef(null);
  const list = React.useRef(null);
  const main = React.useRef(null);
  const id = "s" + React.useId().replace(/:/g, "");
  const listId = id + "-more";
  const contentId = mainId || id + "-main";
  const overflow = items.length > 5;
  const shown = overflow ? items.slice(0, 4) : items;
  const rest = overflow ? items.slice(4) : [];
  React.useEffect(() => {
    if (!open) return;
    const first = list.current.querySelector("a,button");
    if (first) first.focus();
    const outside = (e) => {
      if (!list.current.contains(e.target) && !moreBtn.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);
  const close = () => {
    setOpen(false);
    moreBtn.current.focus();
  };
  const entry = (it, cls, inner, after) => {
    const props = {
      className: cls,
      "aria-current": it.id === current ? "page" : void 0,
      onClick: (e) => {
        if (onNavigate) {
          if (!it.href) e.preventDefault();
          onNavigate(it.id, e);
        }
        if (after) after();
      }
    };
    return it.href ? /* @__PURE__ */ jsx("a", { href: it.href, ...props, children: inner }, it.id) : /* @__PURE__ */ jsx("button", { type: "button", ...props, children: inner }, it.id);
  };
  const tab = (it) => entry(it, "s-shell__tab", /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "s-shell__pill", children: icon(it, 22) }),
    /* @__PURE__ */ jsx("span", { className: "s-shell__label", children: it.label })
  ] }));
  return /* @__PURE__ */ jsxs("div", { className: cx("s-shell", contained && "s-shell--contained", className), children: [
    /* @__PURE__ */ jsx("a", { className: "s-shell__skip", href: "#" + contentId, onClick: (e) => {
      e.preventDefault();
      main.current.focus();
    }, children: skipLabel }),
    contained ? null : /* @__PURE__ */ jsxs("nav", { className: "s-shell__side", "aria-label": label, children: [
      brand ? /* @__PURE__ */ jsx("div", { className: "s-shell__brand", children: brand }) : null,
      items.map((it) => entry(it, "s-shell__item", /* @__PURE__ */ jsxs(Fragment, { children: [
        icon(it, 18),
        it.label
      ] }))),
      footer ? /* @__PURE__ */ jsx("div", { className: "s-shell__foot", children: footer }) : null
    ] }),
    /* @__PURE__ */ jsx("main", { ref: main, id: contentId, tabIndex: -1, className: "s-shell__main", children }),
    /* @__PURE__ */ jsxs("nav", { className: "s-shell__tabbar", "aria-label": label, children: [
      shown.map(tab),
      overflow ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: list,
            id: listId,
            className: "s-shell__more",
            hidden: !open,
            onKeyDown: (e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                close();
              }
            },
            onBlur: (e) => {
              if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && e.relatedTarget !== moreBtn.current) setOpen(false);
            },
            children: rest.map((it) => entry(it, "s-shell__moreitem", /* @__PURE__ */ jsxs(Fragment, { children: [
              icon(it, 20),
              it.label
            ] }), close))
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            ref: moreBtn,
            type: "button",
            className: cx("s-shell__tab", rest.some((it) => it.id === current) && "is-current"),
            "aria-expanded": open,
            "aria-controls": listId,
            onClick: () => setOpen((o) => !o),
            onKeyDown: (e) => {
              if (e.key === "Escape" && open) {
                e.stopPropagation();
                setOpen(false);
              }
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "s-shell__pill", children: /* @__PURE__ */ jsx(Icon, { name: "ellipsis", size: 22 }) }),
              /* @__PURE__ */ jsx("span", { className: "s-shell__label", children: moreLabel })
            ]
          }
        )
      ] }) : null
    ] })
  ] });
}
export {
  AppShell
};
