import React from 'react';
import { Icon } from '../icon/Icon.jsx';
import { Link } from './Link.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// «Tilbake»: a standalone Link with a chevron before the text, for the top of a page that was opened
// from another (a plant from the list, a day from the week). It is Link, so `href`, or `as` with `to`
// for a router, and the ref reach the <a>; standalone gives the medium weight and the 24 px target
// (2.5.8), and stays inline text. The chevron is an inline icon before the text; the link does not wrap
// (white-space:nowrap, the label is short), so the chevron and the text stay on one line, and nothing
// but the text goes into the accessible name. The text defaults to «Tilbake» and says where it goes when
// that helps: «Tilbake til planter».
// A back link is a link to a known place, never history.back(): that is a Button with onClick.
export const BackLink = React.forwardRef(function BackLink({ className, children = 'Tilbake', ...rest }, ref) {
  return (
    <Link ref={ref} variant="standalone" className={cx('s-backlink', className)} {...rest}>
      <Icon name="chevron-left" size={18} className="s-backlink__icon" />
      {children}
    </Link>
  );
});
