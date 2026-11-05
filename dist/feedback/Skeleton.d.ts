import * as React from 'react';
/**
 * The shape of content that has not arrived yet: text lines, a circle or a rectangle in `--surface-3`, with a
 * shimmer that is off under `prefers-reduced-motion`. Always `aria-hidden`: the region around it says it is
 * loading, with `aria-busy="true"` and one status text (a `Spinner` with a label, or a visually hidden line).
 * @startingPoint section="Feedback" subtitle="Text lines, circle, rectangle" viewport="700x300"
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `text` lines of body height, `circle` (an avatar), `rect` (an image, a card). */
  variant?: 'text' | 'circle' | 'rect';
  /** `text` only: how many lines. The last of several is shorter, like a paragraph. */
  lines?: number;
  /** CSS width. `text` and `rect` fill their container by default. */
  width?: number | string;
  /** `rect` only: CSS height. Default 96 px. */
  height?: number | string;
  /** `circle` only: diameter in px. Default 40. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): React.JSX.Element;
