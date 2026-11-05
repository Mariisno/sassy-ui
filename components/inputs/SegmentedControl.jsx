import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A small set of two to five mutually exclusive options in a row, as one value in a form: a native radio
// group in the segmented look. A <fieldset role="radiogroup"> with a <legend> as the label (and
// aria-labelledby pointing at it, so the name holds with the role), and one visually hidden
// <input type="radio"> per option inside a <label>, so the browser gives the keyboard for free: one Tab
// stop (the checked option, or the first when nothing is checked), the arrow keys move and check within
// the group, Space checks. The face next to the input shows the state (:checked, :focus-visible).
// Not Tabs: Tabs switch what is shown (role="tablist"); this answers a question in a form.
export function SegmentedControl({ label, hint, options = [], name, value, defaultValue, onChange, fullWidth, disabled, id, className, style, 'aria-describedby': extra, ...rest }) {
  const auto = 's' + React.useId().replace(/:/g, '');
  const fid = id || auto;
  const hintId = fid + '-hint';
  const legendId = fid + '-legend';
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== undefined ? value : inner;
  const describedBy = [hint ? hintId : null, extra].filter(Boolean).join(' ') || undefined;
  const pick = (v) => { if (value === undefined) setInner(v); onChange && onChange(v); };
  return (
    <fieldset id={fid} role="radiogroup" className={cx('s-segmented', fullWidth && 's-segmented--full', className)} style={style} disabled={disabled}
      aria-labelledby={label ? legendId : undefined} aria-describedby={describedBy} {...rest}>
      {label ? <legend id={legendId} className="s-segmented__legend">{label}</legend> : null}
      <div className="s-segmented__track">
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <label key={opt.value} className={cx('s-segmented__item', opt.disabled && 's-segmented__item--disabled')}>
              <input type="radio" className="s-segmented__input" name={name || fid} value={opt.value} checked={cur === opt.value} disabled={opt.disabled} onChange={() => pick(opt.value)} />
              <span className="s-segmented__face">{opt.icon ? <Icon name={opt.icon} size={16} /> : null}{opt.label}</span>
            </label>
          );
        })}
      </div>
      {hint ? <span id={hintId} className="s-field__hint s-segmented__hint">{hint}</span> : null}
    </fieldset>
  );
}
