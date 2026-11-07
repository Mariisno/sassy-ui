// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function scrollEdges({ scrollLeft, clientWidth, scrollWidth, overflowX = "auto" }) {
  if (overflowX !== "auto" && overflowX !== "scroll") return { start: false, end: false };
  return { start: scrollLeft > 1, end: scrollLeft + clientWidth < scrollWidth - 1 };
}
function ScrollRow({ label, className, children, ...rest }) {
  const ref = React.useRef(null);
  const [edge, setEdge] = React.useState({ start: false, end: false });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
    const measure = () => setEdge((was) => {
      const now = scrollEdges({ scrollLeft: Math.abs(el.scrollLeft), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, overflowX: getComputedStyle(el).overflowX });
      return now.start === was.start && now.end === was.end ? was : now;
    });
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (ro) {
      ro.observe(el);
      if (el.firstElementChild) ro.observe(el.firstElementChild);
    }
    return () => {
      el.removeEventListener("scroll", measure);
      if (ro) ro.disconnect();
    };
  }, []);
  const region = label ? { role: "region", "aria-label": label, tabIndex: 0 } : {};
  return /* @__PURE__ */ jsx("div", { ref, className: cx("s-scrollrow", className), "data-fade-start": edge.start || void 0, "data-fade-end": edge.end || void 0, ...region, ...rest, children });
}
export {
  ScrollRow,
  scrollEdges
};
