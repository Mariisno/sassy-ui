import * as React from 'react';
/** Small non-interactive status pill. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `accent` follows the app's data-accent (clay, fjord, lichen or lyng); `success` is always moss. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'clay';
  /** Leading status dot */
  dot?: boolean;
  outline?: boolean;
  /** Mono font — for versions, counts, IDs */
  mono?: boolean;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;
