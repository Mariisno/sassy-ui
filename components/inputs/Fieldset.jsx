import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A group of related controls, above all a radio or checkbox group: a native <fieldset> with a <legend>
// that names the group, an optional hint under the legend and an error under the controls, both tied to
// the group with aria-describedby. The error carries an icon and text (and role="alert", like Field), so
// colour is never the only signal; the group also gets a --danger edge on the left, like .s-control's
// border. The error replaces the hint, as in Field. The children are the existing Radio, Checkbox and
// Switch, unchanged: the fieldset adds nothing to them. aria-invalid is not set on the fieldset (ARIA
// does not allow it on a group); the app sets it on the controls when that is wanted.
export function Fieldset({ legend, hint, error, optional, optionalLabel = 'Valgfritt', layout = 'column', id, className, style, children, 'aria-describedby': extra, ...rest }) {
  const auto = 's' + React.useId().replace(/:/g, '');
  const fid = id || auto;
  const hintId = fid + '-hint';
  const describedBy = [error || hint ? hintId : null, extra].filter(Boolean).join(' ') || undefined;
  return (
    <fieldset id={fid} className={cx('s-fieldset', error && 's-fieldset--invalid', className)} style={style} aria-describedby={describedBy} {...rest}>
      <legend className="s-fieldset__legend">{legend}{optional ? <span className="s-field__opt">{optionalLabel}</span> : null}</legend>
      {hint && !error ? <span id={hintId} className="s-field__hint s-fieldset__hint">{hint}</span> : null}
      <div className={cx('s-fieldset__items', layout === 'row' && 's-fieldset__items--row')}>{children}</div>
      {error ? (
        <span id={hintId} role="alert" className="s-field__hint s-field__hint--error s-fieldset__error">
          <Icon name="circle-alert" size={14} className="s-fieldset__error-icon" />
          <span>{error}</span>
        </span>
      ) : null}
    </fieldset>
  );
}
