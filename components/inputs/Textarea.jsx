import React from 'react';
import { Field, useField } from './Input.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

export const Textarea = React.forwardRef(function Textarea({ label, hint, error, optional, optionalLabel, rows = 4, disabled, id, className, style, 'aria-describedby': extra, ...rest }, ref) {
  const { fid, hintId, describedBy } = useField(id, hint, error, extra);
  return (
    <Field label={label} hint={hint} error={error} optional={optional} optionalLabel={optionalLabel} htmlFor={fid} hintId={hintId}>
      <div className={cx('s-control', 's-control--area', error && 's-control--invalid', disabled && 's-control--disabled', className)} style={style}>
        <textarea ref={ref} id={fid} rows={rows} className="s-control__input" disabled={disabled} aria-invalid={!!error || undefined} aria-describedby={describedBy} {...rest} />
      </div>
    </Field>
  );
});
