// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../buttons/IconButton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const toastStackContext = React.createContext(false);
const InStack = toastStackContext;
const ICONS = { neutral: "info", success: "circle-check", warning: "triangle-alert", danger: "circle-alert", info: "info" };
const TOAST_MIN = 5e3;
function toastDuration(duration, hasAction) {
  const ms = Number(duration);
  return ms > 0 && !hasAction ? Math.max(ms, TOAST_MIN) : 0;
}
let peker = null;
let folger = false;
function folgPeker() {
  if (folger || typeof document === "undefined") return;
  folger = true;
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "touch") peker = [e.clientX, e.clientY];
  }, { capture: true, passive: true });
}
function useToastTimer(duration, hasAction, onClose, ref) {
  const ms = toastDuration(duration, hasAction);
  const close = React.useRef(onClose);
  close.current = onClose;
  const left = React.useRef(ms);
  const done = React.useRef(false);
  const [pointer, setPointer] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    left.current = ms;
    done.current = false;
  }, [ms]);
  React.useEffect(() => {
    if (!ms) return void 0;
    const sync = () => setHidden(document.visibilityState === "hidden");
    sync();
    folgPeker();
    const under = peker && document.elementFromPoint(peker[0], peker[1]);
    if (under && ref.current && ref.current.contains(under)) setPointer(true);
    const move = (e) => {
      if (e.pointerType !== "touch") setPointer(!!ref.current && ref.current.contains(e.target));
    };
    document.addEventListener("visibilitychange", sync);
    document.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("pointermove", move);
    };
  }, [ms, ref]);
  const paused = pointer || focus || hidden;
  React.useEffect(() => {
    if (!ms || paused || done.current) return void 0;
    const start = Date.now();
    const t = setTimeout(() => {
      left.current = 0;
      done.current = true;
      if (close.current) close.current();
    }, left.current);
    return () => {
      clearTimeout(t);
      left.current = Math.max(0, left.current - (Date.now() - start));
    };
  }, [ms, paused]);
  if (!ms) return null;
  return {
    onPointerEnter: () => setPointer(true),
    onPointerLeave: () => setPointer(false),
    onFocus: () => setFocus(true),
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
    }
  };
}
const both = (a, b) => a && b ? (e) => {
  a(e);
  b(e);
} : a || b;
function Toast({ tone = "neutral", title, description, actionLabel, onAction, onClose, closeLabel = "Lukk", duration, className, style, onPointerEnter, onPointerLeave, onFocus, onBlur, ...rest }) {
  const inStack = React.useContext(InStack);
  const ref = React.useRef(null);
  const timer = useToastTimer(duration, !!actionLabel, onClose, ref);
  return /* @__PURE__ */ jsxs("div", { ref, role: inStack ? void 0 : "status", className: cx("s-toast", "s-toast--" + tone, className), style, onPointerEnter: both(timer?.onPointerEnter, onPointerEnter), onPointerLeave: both(timer?.onPointerLeave, onPointerLeave), onFocus: both(timer?.onFocus, onFocus), onBlur: both(timer?.onBlur, onBlur), ...rest, children: [
    /* @__PURE__ */ jsx(Icon, { name: ICONS[tone] || "info", size: 18, className: "s-toast__icon" }),
    /* @__PURE__ */ jsxs("div", { className: "s-toast__body", children: [
      title ? /* @__PURE__ */ jsx("div", { className: "s-toast__title", children: title }) : null,
      description ? /* @__PURE__ */ jsx("div", { className: "s-toast__desc", children: description }) : null,
      actionLabel ? /* @__PURE__ */ jsx("button", { type: "button", className: "s-toast__action", onClick: onAction, children: actionLabel }) : null
    ] }),
    onClose ? /* @__PURE__ */ jsx(IconButton, { icon: "x", label: closeLabel, size: "sm", onClick: onClose, style: { margin: "-6px -6px 0 0" } }) : null
  ] });
}
function ToastStack({ children, className, ...rest }) {
  React.useEffect(() => {
    folgPeker();
  }, []);
  return /* @__PURE__ */ jsx("div", { role: "status", "aria-live": "polite", "aria-relevant": "additions text", className: cx("s-toast-stack", className), ...rest, children: /* @__PURE__ */ jsx(InStack.Provider, { value: true, children }) });
}
export {
  TOAST_MIN,
  Toast,
  ToastStack,
  toastDuration,
  toastStackContext
};
