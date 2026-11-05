import * as React from 'react';
/**
 * A layout primitive: children in a column (default) or a row, a gap from the spacing tokens, optional wrap
 * and alignment. No visuals of its own and no role.
 * @startingPoint section="Layout" subtitle="Column or row, a token gap, wrap and align" viewport="700x300"
 */
export type StackGap = 0 | 'px' | '0-5' | 1 | '1-5' | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render, default `div`. `ul` and `ol` get `role="list"` on their own (the list style is removed, which takes the list semantics away in Safari); an own `role` wins. */
  as?: 'div' | 'section' | 'nav' | 'ul' | 'ol' | 'li' | 'form' | 'header' | 'footer';
  /** `column` (default) stacks the children; `row` puts them side by side, centred on the cross axis. */
  direction?: 'column' | 'row';
  /** The spacing step between children: `--space-<gap>`, so `4` is 16 px, `2` is 8 px, `'1-5'` is 6 px. Default 4. */
  gap?: StackGap;
  /** `true` lets a row wrap onto the next line, e.g. a row of tags. */
  wrap?: boolean;
  /** Alignment on the cross axis: `start`, `center`, `end`, `stretch` or `baseline`. Default: stretch in a column, center in a row. */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Distribution on the main axis: `start` (default), `center`, `end` or `between`. */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** The children to stack. */
  children?: React.ReactNode;
}
export declare function Stack(props: StackProps): React.JSX.Element;
