import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// `loading` and `aria-disabled` turn the button off without native `disabled`: a disabled button loses focus (the
// browser moves it to <body>), so a keyboard or screen reader user would be thrown out mid-submit. They keep focus,
// look off (.s-btn[aria-disabled="true"]) and stop the click, so a submit button does not submit again.
// Native `disabled` is still there for a button that should leave the tab order.
export const Button = React.forwardRef(function Button({ variant = 'primary', size = 'md', iconLeft, iconRight, loading = false, fullWidth = false, as = 'button', className, children, disabled, onClick, 'aria-disabled': ariaDisabled, ...rest }, ref) {
  const Tag = as;
  const iconSize = size === 'lg' ? 18 : 16;
  const off = loading || ariaDisabled === true || ariaDisabled === 'true';
  const click = (e) => { if (off) { e.preventDefault(); return; } if (onClick) onClick(e); };
  return (
    <Tag ref={ref} className={cx('s-btn', 's-btn--' + variant, size !== 'md' && 's-btn--' + size, fullWidth && 's-btn--full', className)} disabled={Tag === 'button' ? disabled : undefined} aria-disabled={off ? 'true' : undefined} aria-busy={loading || undefined} onClick={click} {...(Tag === 'button' && !rest.type ? { type: 'button' } : {})} {...rest}>
      {loading ? <span className="s-btn__spin" /> : iconLeft ? <Icon name={iconLeft} size={iconSize} /> : null}
      {children}
      {iconRight && !loading ? <Icon name={iconRight} size={iconSize} /> : null}
    </Tag>
  );
});
