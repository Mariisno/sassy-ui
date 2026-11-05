import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// How far something has come: a bar, or a ring with room for a number in the middle. role="progressbar" with
// aria-valuenow/min/max; without a value it is indeterminate (no valuenow, a calm sweep). The track is
// --surface-3 with a 1 px --border-control edge, like the off switch, so it holds 3:1 on every surface, and
// the fill holds 3:1 on the track in both themes and every accent (tests/progress.test.mjs).
export function Progress({ variant = 'bar', value, max = 100, label, valueText, size = 48, tone = 'accent', className, style, children, ...rest }) {
  const known = typeof value === 'number' && Number.isFinite(value);
  const fraction = known ? Math.min(1, Math.max(0, max > 0 ? value / max : 0)) : 0;
  const aria = {
    role: 'progressbar',
    'aria-label': rest['aria-labelledby'] ? undefined : label,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuenow': known ? Math.min(max, Math.max(0, value)) : undefined, // ARIA wants it inside min–max; say more with valueText
    'aria-valuetext': valueText,
  };
  const classes = cx('s-progress', 's-progress--' + variant, tone !== 'accent' && 's-progress--' + tone, !known && 's-progress--indeterminate', className);

  if (variant === 'ring') {
    const stroke = Math.max(3, Math.round(size / 12));
    const r = (size - stroke) / 2 - 1; // 1 px inside the edge ring
    const c = 2 * Math.PI * r;
    return (
      <span className={classes} style={{ width: size, height: size, ...style }} {...aria} {...rest}>
        <svg className="s-progress__svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
          <circle className="s-progress__edge" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke + 2} fill="none" />
          <circle className="s-progress__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" />
          <circle className="s-progress__fill" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={known ? c * (1 - fraction) : c * 0.75} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        </svg>
        {children ? <span className="s-progress__center">{children}</span> : null}
      </span>
    );
  }
  return (
    <span className={classes} style={style} {...aria} {...rest}>
      <span className="s-progress__track">
        <span className="s-progress__fill" style={known ? { width: fraction * 100 + '%' } : undefined} />
      </span>
    </span>
  );
}
