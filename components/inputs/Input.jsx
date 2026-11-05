import React from 'react';
import { Icon } from '../icon/Icon.jsx';
import { IconButton } from '../buttons/IconButton.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// Ids for a field: the control's id, the hint/error id, and aria-describedby that points at the
// hint or error (and at any aria-describedby the app passes). Shared by Input, Textarea and Select.
export function useField(id, hint, error, extra) {
  const auto = 's' + React.useId().replace(/:/g, '');
  const fid = id || auto;
  const hintId = fid + '-hint';
  const describedBy = [error || hint ? hintId : null, extra].filter(Boolean).join(' ') || undefined;
  return { fid, hintId, describedBy };
}

// What each `mode` sets on the <input>: the type, the keyboard a phone shows (inputMode) and what the
// browser may fill in (autoComplete). An explicit type, inputMode, autoComplete or enterKeyHint prop wins.
// Numbers are type="text" with a numeric keyboard, not type="number": that one changes the value under the
// mouse wheel, lets "e" and "-" through, and reads badly in screen readers; the app validates the text.
// A password gets a show/hide toggle (see below). No mode: nothing is set, as before.
const MODES = {
  number: { type: 'text', inputMode: 'numeric' },
  decimal: { type: 'text', inputMode: 'decimal' },
  phone: { type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
  email: { type: 'email', inputMode: 'email', autoComplete: 'email' },
  url: { type: 'url', inputMode: 'url', autoComplete: 'url' },
  search: { type: 'search', inputMode: 'search', enterKeyHint: 'search' },
  date: { type: 'date' },
  time: { type: 'time' },
  password: { type: 'password', autoComplete: 'current-password' },
};

export function Field({ label, hint, error, optional, optionalLabel = 'Valgfritt', htmlFor, hintId, children }) {
  const hid = hintId || (htmlFor ? htmlFor + '-hint' : undefined);
  return (
    <div className="s-field">
      {label ? <label className="s-field__label" htmlFor={htmlFor}>{label}{optional ? <span className="s-field__opt">{optionalLabel}</span> : null}</label> : null}
      {children}
      {error ? <span id={hid} role="alert" className="s-field__hint s-field__hint--error">{error}</span> : hint ? <span id={hid} className="s-field__hint">{hint}</span> : null}
    </div>
  );
}
export const Input = React.forwardRef(function Input({ label, hint, error, optional, optionalLabel, icon, prefix, suffix, size = 'md', mode, type: typeProp, passwordToggle = true, passwordToggleLabel = 'Vis passord', disabled, id, className, style, 'aria-describedby': extra, ...rest }, ref) {
  const { fid, hintId, describedBy } = useField(id, hint, error, extra);
  const preset = MODES[mode] || {};
  // The password toggle: a toggle button (aria-pressed) with one name, «Vis passord», that switches the
  // type to text and back. The value stays, so nothing is retyped. Disabled with the field. The button follows
  // the control's size (24 px in sm, see the CSS; 30 in md; 38 in lg), so it sits inside the frame.
  const [shown, setShown] = React.useState(false);
  const toggle = mode === 'password' && passwordToggle;
  const type = toggle && shown ? 'text' : (typeProp ?? preset.type);
  return (
    <Field label={label} hint={hint} error={error} optional={optional} optionalLabel={optionalLabel} htmlFor={fid} hintId={hintId}>
      <div className={cx('s-control', size !== 'md' && 's-control--' + size, error && 's-control--invalid', disabled && 's-control--disabled', className)} style={style}>
        {icon ? <span className="s-control__affix"><Icon name={icon} size={16} /></span> : prefix ? <span className="s-control__affix">{prefix}</span> : null}
        <input ref={ref} id={fid} className="s-control__input" disabled={disabled} aria-invalid={!!error || undefined} aria-describedby={describedBy} {...preset} {...rest} type={type} />
        {suffix ? <span className="s-control__affix s-control__affix--end">{suffix}</span> : null}
        {toggle ? (
          <span className="s-control__affix s-control__affix--action">
            <IconButton size={size === 'lg' ? 'md' : 'sm'} icon={shown ? 'eye-off' : 'eye'} label={passwordToggleLabel} aria-pressed={shown} disabled={disabled} onClick={() => setShown((s) => !s)} />
          </span>
        ) : null}
      </div>
    </Field>
  );
});
