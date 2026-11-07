import * as React from 'react';
/** The looks a heading can take, from Sassy's type roles: `display` (50 px), `h1` (31 px), `h2` (25 px), `h3` (18 px), `h4` (16 px semibold). */
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4';
/**
 * A heading. `level` picks the element, `<h1>` to `<h6>`, so the page outline is right; `size` picks the look
 * from the type roles, so the outline and the look can differ. Without `size` the look follows the level (h5
 * and h6 look like h4). The classes `.s-display` and `.s-h1`–`.s-h4` give the same looks without React.
 * @startingPoint section="Display" subtitle="Heading levels and sizes, Text sizes and tones" viewport="700x420"
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The heading level, 1–6: the element is `<h1>`–`<h6>`. Follow the page outline: one h1, then no skipped level going down. */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** The look, when it should differ from the level: `display`, `h1`, `h2`, `h3` or `h4`. Default: the level's own (h5 and h6 look like h4). */
  size?: HeadingSize;
  /** The heading text. */
  children?: React.ReactNode;
}
/** The ref reaches the heading element, so an app can move the focus to it (with `tabIndex={-1}`) after a page change. */
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
