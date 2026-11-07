// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
import { jsx } from "react/jsx-runtime";
import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Text = React.forwardRef(function Text2({ as: El = "p", size = "body", tone = "default", mono = false, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(El, { ref, className: cx("s-text", size !== "body" && "s-text--" + size, tone !== "default" && "s-text--" + tone, mono && "s-text--mono", className), ...rest, children });
});
export {
  Text
};
