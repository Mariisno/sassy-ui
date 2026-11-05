import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// The surfaces a swatch sits on, light and dark. A colour under 3:1 against either gets a firmer edge
// in that theme (WCAG 1.4.11), so white still shows in light mode and black in dark mode.
const LIGHT = ['#FAF8F4', '#FFFFFF'];
const DARK = ['#161613', '#1E1E1A'];
const lum = (hex) => [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
function edges(color) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color || '');
  if (!m) return {};
  const hex = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1];
  const low = (bgs) => bgs.some((b) => ratio(hex, b.slice(1)) < 3);
  return { 'data-edge-light': low(LIGHT) || undefined, 'data-edge-dark': low(DARK) || undefined };
}

// A colour dot. With onClick it is a toggle button (aria-pressed) with a 44 px target, for picking a colour
// or filtering by one; without, it is a plain dot, named when it has a label and hidden when it doesn't.
export function Swatch({ color, label, pressed, onClick, size = 'md', disabled, className, style, ...rest }) {
  const dot = <span className="s-swatch__dot" style={{ '--swatch': color }} />;
  const cls = cx('s-swatch', 's-swatch--' + size, className);
  if (onClick) {
    return (
      <button type="button" className={cx(cls, 's-swatch--button')} aria-label={label} aria-pressed={pressed === undefined ? undefined : !!pressed}
        title={label} disabled={disabled} onClick={onClick} style={style} {...edges(color)} {...rest}>{dot}</button>
    );
  }
  return (
    <span className={cls} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'} style={style} {...edges(color)} {...rest}>{dot}</span>
  );
}
