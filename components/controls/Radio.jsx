import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

export const Radio = React.forwardRef(function Radio({ label, description, disabled, className, style, ...rest }, ref) {
  return (
    <label className={cx('s-check', 's-check--radio', disabled && 's-check--disabled', className)} style={style}>
      <input ref={ref} type="radio" className="s-check__input" disabled={disabled} {...rest} />
      <span className="s-check__box"><span className="s-check__dot" /></span>
      {label || description ? <span className="s-check__text">{label}{description ? <span className="s-check__desc">{description}</span> : null}</span> : null}
    </label>
  );
});
