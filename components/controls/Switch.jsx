import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

export const Switch = React.forwardRef(function Switch({ label, description, disabled, className, style, ...rest }, ref) {
  return (
    <label className={cx('s-check', disabled && 's-check--disabled', className)} style={style}>
      <input ref={ref} type="checkbox" role="switch" className="s-check__input" disabled={disabled} {...rest} />
      <span className="s-switch__track"><span className="s-switch__thumb" /></span>
      {label || description ? <span className="s-check__text">{label}{description ? <span className="s-check__desc">{description}</span> : null}</span> : null}
    </label>
  );
});
