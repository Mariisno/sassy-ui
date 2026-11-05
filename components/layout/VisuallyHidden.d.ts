import * as React from 'react';
/**
 * Text for assistive technology that nobody sees: the `.s-sr-only` class as a component (1 px, clipped, never
 * `display:none`, so it is read). `focusable` is for a skip link or another control that must show when it has
 * the focus: it then comes back into the flow where it stands in the document.
 * @startingPoint section="Layout" subtitle="Read by a screen reader, off screen for everyone else" viewport="700x200"
 */
export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render, default `span`. `a` for a skip link (with `href` and `focusable`), `button` for a control shown only on focus, `div` or `p` for a block of text. */
  as?: 'span' | 'div' | 'p' | 'a' | 'button' | 'label' | 'legend' | 'h2' | 'h3';
  /** `true` shows the element while it has the focus (a skip link, WCAG 2.4.1); it is then in the flow, at least 24 px tall. */
  focusable?: boolean;
  /** With `as="a"`: the link target, e.g. `#main`. Passed through to the element. */
  href?: string;
  /** The text a screen reader reads: «(åpner i ny fane)», a heading for a region, a label for an icon-only control that cannot take `aria-label`. */
  children?: React.ReactNode;
}
export declare function VisuallyHidden(props: VisuallyHiddenProps): React.JSX.Element;
