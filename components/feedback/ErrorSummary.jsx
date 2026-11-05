import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// The box at the top of a form after a failed submit, as GOV.UK and Designsystemet do it: a title, an
// optional line, and one link per field with an error. The box takes the focus when it mounts (a <section>
// with tabIndex -1, named by its title), so the person hears what went wrong and the page scrolls to it;
// the content sits in role="alert" as well, so it is read even where focus on a region reads only the name.
// A link points at the field's id with a plain href, and on click moves the focus to that element, or to
// the first control inside it when the id is a Fieldset (a radio or checkbox group), scrolling the group's
// legend into view. The app owns the list: mount the box when the submit fails, remove it when the form
// is valid, and give it a new `key` on a second failed submit so the focus moves again.
const CONTROL = 'input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])';

// The element a link should focus: the element itself when it can take focus, else its first control.
export function focusTarget(el) {
  if (!el) return null;
  if (el.matches(CONTROL)) return el;
  return el.querySelector(CONTROL);
}

export function ErrorSummary({ title = 'Noe må rettes før du kan gå videre', errors = [], autoFocus = true, level = 2, id, className, style, children, ...rest }) {
  const ref = React.useRef(null);
  const auto = 's' + React.useId().replace(/:/g, '');
  const sid = id || auto;
  const titleId = sid + '-title';
  const H = 'h' + Math.min(Math.max(level, 2), 6);
  React.useEffect(() => { if (autoFocus && ref.current) ref.current.focus(); }, [autoFocus]);
  const go = (e, targetId) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // a modifier or another button: the browser's own link behaviour
    const el = e.currentTarget.ownerDocument.getElementById(targetId);
    const target = focusTarget(el);
    if (!target) return; // no such element: the plain href still jumps to the anchor
    e.preventDefault();
    target.focus();
    if (target !== el) el.scrollIntoView({ block: 'nearest' });
  };
  return (
    <section ref={ref} id={sid} tabIndex={-1} aria-labelledby={titleId} className={cx('s-errorsummary', className)} style={style} {...rest}>
      <div role="alert">
        <H id={titleId} className="s-errorsummary__title"><Icon name="circle-alert" size={20} className="s-errorsummary__icon" />{title}</H>
        {children ? <p className="s-errorsummary__text">{children}</p> : null}
        {errors.length ? (
          <ul className="s-errorsummary__list">
            {errors.map((err, i) => (
              <li key={`${err.id || ''}-${i}`}>
                {err.id ? <a href={'#' + err.id} className="s-errorsummary__link" onClick={(e) => go(e, err.id)}>{err.message}</a> : <span className="s-errorsummary__item">{err.message}</span>}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
