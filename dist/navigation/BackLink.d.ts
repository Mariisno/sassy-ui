import * as React from 'react';
import type { LinkProps } from './Link';
/**
 * «Tilbake»: a standalone Link with a chevron before the text, for the top of a page that was opened from
 * another. Built on Link, so `href`, or `as` with `to` for a router, and the ref reach the `<a>`; medium
 * weight and at least 24 px tall. The text defaults to «Tilbake».
 * @startingPoint section="Navigation" subtitle="Back to the list, to a named page, with a router" viewport="700x200"
 */
export interface BackLinkProps extends Omit<LinkProps, 'variant' | 'external' | 'target' | 'newTabLabel'> {
  /** Where the link goes: the page this one was opened from, e.g. `/planter`. */
  href?: string;
  /** The element or component to render, default `a`. Pass a router's Link (React Router: `as={RouterLink}` with `to`); it must render an `<a>`. */
  as?: React.ElementType;
  /** With `as` set to a router's Link: the route, e.g. `/planter`. Passed through to it. */
  to?: string;
  /** The link text. Default «Tilbake»; English surfaces pass "Back". Name the place when it helps: «Tilbake til planter». */
  children?: React.ReactNode;
  /** Your own classes on the link. */
  className?: string;
}
export declare const BackLink: React.ForwardRefExoticComponent<BackLinkProps & React.RefAttributes<HTMLAnchorElement>>;
