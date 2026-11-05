import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// A Button that opens the file chooser: a <label class="s-btn"> around a visually hidden <input type="file">.
// The input stays in the tab order (it is not display:none), so keyboard focus lands on it and the label
// shows the focus ring (:has(:focus-visible), keyboard only, like Button). className and style go to the label; everything else to the input.
export const FileButton = React.forwardRef(function FileButton({ variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth = false, accept, capture, multiple = false, disabled = false, onFiles, onChange, className, style, children, ...rest }, ref) {
  const iconSize = size === 'lg' ? 18 : 16;
  const change = (e) => {
    const files = Array.from(e.target.files || []);
    onChange?.(e);
    if (files.length) onFiles?.(files);
    e.target.value = ''; // so picking the same file again fires again
  };
  return (
    <label className={cx('s-btn', 's-btn--' + variant, size !== 'md' && 's-btn--' + size, fullWidth && 's-btn--full', 's-filebtn', disabled && 's-filebtn--disabled', className)} style={style}>
      <input ref={ref} type="file" className="s-filebtn__input" accept={accept} capture={capture} multiple={multiple} disabled={disabled} onChange={change} {...rest} />
      {iconLeft ? <Icon name={iconLeft} size={iconSize} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={iconSize} /> : null}
    </label>
  );
});
