import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

export const IconButton = React.forwardRef(function IconButton({ icon, label, variant = 'ghost', size = 'md', round = false, className, ...rest }, ref) {
  const s = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
  return (
    <button ref={ref} type="button" aria-label={label} title={label} className={cx('s-iconbtn', variant !== 'ghost' && 's-iconbtn--' + variant, size !== 'md' && 's-iconbtn--' + size, round && 's-iconbtn--round', className)} {...rest}>
      <Icon name={icon} size={s} />
    </button>
  );
});
