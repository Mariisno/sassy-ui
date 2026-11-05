import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

export const Checkbox = React.forwardRef(function Checkbox({ label, description, indeterminate = false, disabled, className, style, ...rest }, ref) {
  const own = React.useRef(null);
  React.useEffect(() => { if (own.current) own.current.indeterminate = indeterminate; }, [indeterminate]);
  // The app's ref and our own (for indeterminate) both get the input.
  const setRefs = (el) => { own.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; };
  return (
    <label className={cx('s-check', disabled && 's-check--disabled', className)} style={style}>
      <input ref={setRefs} type="checkbox" className="s-check__input" disabled={disabled} {...rest} />
      <span className="s-check__box"><Icon name={indeterminate ? 'minus' : 'check'} size={13} strokeWidth={2.75} /></span>
      {label || description ? <span className="s-check__text">{label}{description ? <span className="s-check__desc">{description}</span> : null}</span> : null}
    </label>
  );
});
