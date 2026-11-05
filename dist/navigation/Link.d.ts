import * as React from 'react';
/**
 * A link: the accent text colour and an underline from base.css, plus the variants. `inline` sits in running
 * text, `standalone` is a link on its own line (medium weight, at least 24 px tall). With `target="_blank"`
 * the link gets `rel="noopener noreferrer"`, an external icon and the visually hidden «(åpner i ny fane)».
 * `as` takes a router's Link, so apps keep client-side routing.
 * @startingPoint section="Navigation" subtitle="Inline, standalone, external and new tab" viewport="700x260"
 */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The element or component to render, default `a`. Pass a router's Link (React Router: `as={RouterLink}` with `to`); it must render an `<a>`. Its own props go straight through. */
  as?: React.ElementType;
  /** Only with `as` set to a router's Link: the route, e.g. `/planter/tomat` or `{ pathname, search, hash }` (React Router's `To`). Passed through to it; a plain `<a>` ignores it, so give `href` there. */
  to?: string | { pathname?: string; search?: string; hash?: string };
  /** `inline` (default) sits in running text; `standalone` is a link on its own line: medium weight, still inline text, with a target of at least 24 px. */
  variant?: 'inline' | 'standalone';
  /** Shows the external icon after the text. Default: on when `target="_blank"`, off otherwise. `false` hides the icon on a new-tab link; `true` shows it on a link that leaves the app in the same tab. */
  external?: boolean;
  /** The visually hidden text after the link text when `target="_blank"`. Default «(åpner i ny fane)»; English surfaces pass "(opens in a new tab)". */
  newTabLabel?: string;
  /** The link text. Say where it goes, not «her» or «klikk her». */
  children?: React.ReactNode;
  /** Your own classes on the link. */
  className?: string;
  /** Your own styles on the link. */
  style?: React.CSSProperties;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
