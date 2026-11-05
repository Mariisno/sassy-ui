import React from 'react';
import { Icon } from '../icon/Icon.jsx';
import { ToastStack, toastStackContext } from './Toast.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// «Ny versjon»: the notice that a new version of the app is ready, with «Oppdater» and «Senere».
// Built from the toast's parts, so it looks like every other toast. By default it brings its own ToastStack,
// which is the live region (role="status", polite): the stack is in the page from the start, also while the
// notice is closed, so the toast is announced when it arrives and focus stays where it was.
export function NyVersjon({ open = false, onUpdate, onLater, updating = false, title = 'Ny versjon', description, updateLabel = 'Oppdater', laterLabel = 'Senere', stack = true, stackProps, className, style, ...rest }) {
  const inStack = React.useContext(toastStackContext);
  const toast = open ? (
    <div role={inStack || stack ? undefined : 'status'} className={cx('s-toast', 's-toast--info', 's-nyversjon', className)} style={style} {...rest}>
      <Icon name="info" size={18} className="s-toast__icon" />
      <div className="s-toast__body">
        <div className="s-toast__title">{title}</div>
        {description ? <div className="s-toast__desc">{description}</div> : null}
        <div className="s-nyversjon__actions">
          <button type="button" className="s-toast__action" onClick={onUpdate} disabled={updating || undefined} aria-busy={updating || undefined}>{updateLabel}</button>
          {onLater ? <button type="button" className="s-toast__action s-toast__action--quiet" onClick={onLater}>{laterLabel}</button> : null}
        </div>
      </div>
    </div>
  ) : null;
  if (!stack || inStack) return toast;
  return <ToastStack {...stackProps} className={cx('s-nyversjon-stack', stackProps && stackProps.className)}>{toast}</ToastStack>;
}
