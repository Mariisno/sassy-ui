import React from 'react';
import { Field, useField } from './Input.jsx';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

export const Select = React.forwardRef(function Select({ label, hint, error, optional, optionalLabel, options = [], placeholder, size = 'md', disabled, id, className, style, 'aria-describedby': extra, ...rest }, ref) {
  const { fid, hintId, describedBy } = useField(id, hint, error, extra);
  return (
    <Field label={label} hint={hint} error={error} optional={optional} optionalLabel={optionalLabel} htmlFor={fid} hintId={hintId}>
      <div className={cx('s-control', size !== 'md' && 's-control--' + size, error && 's-control--invalid', disabled && 's-control--disabled', className)} style={style}>
        <select ref={ref} id={fid} className="s-control__input s-control__select" disabled={disabled} aria-invalid={!!error || undefined} aria-describedby={describedBy} {...rest}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => { const v = typeof o === 'string' ? { value: o, label: o } : o; return <option key={v.value} value={v.value}>{v.label}</option>; })}
        </select>
        <Icon name="chevron-down" size={16} className="s-control__chev" />
      </div>
    </Field>
  );
});
