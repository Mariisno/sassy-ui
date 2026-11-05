import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A section that shows and hides: native <details> and <summary>, so the browser gives the button role,
// aria-expanded, Enter and Space, and the content is in the page (and found by the browser's find in
// page) whether it is open or not. The summary is a 44 px row with the title and a chevron that turns
// when the section opens; the turn runs on --dur-base, which the tokens make 0 under
// prefers-reduced-motion. Uncontrolled with `defaultOpen`, or controlled with `open` and `onToggle`:
// the browser opens the element itself before React hears of it, so a controlled Disclosure sets
// the element back after every render when the app did not take the change. A heading passed as `title`
// carries the title class itself (a <span> around a heading is not valid HTML); anything else gets a <span>.
const HEADING = /^h[1-6]$/;
export function Disclosure({ title, open, defaultOpen = false, onToggle, className, children, ...rest }) {
  const ref = React.useRef(null);
  const controlled = open !== undefined;
  const [inner, setInner] = React.useState(defaultOpen);
  const [, rerender] = React.useReducer((n) => n + 1, 0);
  const isOpen = controlled ? open : inner;
  React.useEffect(() => { if (ref.current && ref.current.open !== isOpen) ref.current.open = isOpen; });
  const toggle = (e) => {
    const now = e.currentTarget.open;
    if (now === isOpen) return; // the toggle event after our own sync, or the one some browsers fire on mount
    if (controlled) rerender(); else setInner(now);
    onToggle?.(now);
  };
  return (
    <details ref={ref} open={isOpen} onToggle={toggle} className={cx('s-disclosure', className)} {...rest}>
      <summary className="s-disclosure__summary">
        {React.isValidElement(title) && HEADING.test(title.type) ? React.cloneElement(title, { className: cx('s-disclosure__title', title.props.className) }) : <span className="s-disclosure__title">{title}</span>}
        <Icon name="chevron-down" size={18} className="s-disclosure__chevron" />
      </summary>
      <div className="s-disclosure__body">{children}</div>
    </details>
  );
}
