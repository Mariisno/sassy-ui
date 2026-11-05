import * as React from 'react';
/**
 * A horizontal row that scrolls without a scrollbar and fades at the edge where there is more to see.
 * For tabs, chips and colour swatches that don't fit on a phone. The children sit in one line
 * (`display:flex`, no wrap, `gap` from `--scrollrow-gap`, default 8 px).
 * @startingPoint section="Display" subtitle="A row that scrolls sideways and fades where there is more" viewport="700x420"
 */
export interface ScrollRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Names the row as a region and makes it focusable, so the keyboard can scroll it. Give it when the children aren't focusable themselves. */
  label?: string;
  children?: React.ReactNode;
}
export declare function ScrollRow(props: ScrollRowProps): React.JSX.Element;
/** Which edges have more to see. Exported for tests and for apps that draw their own fade. */
export declare function scrollEdges(m: { scrollLeft: number; clientWidth: number; scrollWidth: number; overflowX?: string }): { start: boolean; end: boolean };
