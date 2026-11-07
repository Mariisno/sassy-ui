import * as React from 'react';
/**
 * How far something has come: a bar (plants watered, upload) or a ring (a session, with the number in the middle).
 * role="progressbar" with aria-valuenow/min/max. Without `value` it is indeterminate: no valuenow and a calm sweep
 * (a fade under prefers-reduced-motion). The fill is the accent, or a status colour; the track is --surface-3 with
 * a --border-control edge, so track and fill hold 3:1 in both themes and every accent (WCAG 1.4.11).
 * @startingPoint section="Feedback" subtitle="Bar or ring, determinate or not" viewport="700x300"
 */
export interface ProgressProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: 'bar' | 'ring';
  /** 0–max. Leave it out while the amount is unknown (indeterminate). */
  value?: number;
  /** Default 100. Pass 1 for a fraction, or the number of plants, steps, seconds. */
  max?: number;
  /** The accessible name, required unless `aria-labelledby` points at a visible heading. */
  label?: string;
  /** Read instead of the percentage, e.g. "12 av 30 planter" or "3 min igjen". */
  valueText?: string;
  /** Ring only: its diameter in px. Default 48. The stroke follows (size / 12, at least 3 px). */
  size?: number;
  /** `accent` follows the app's data-accent. The status tones use Sassy's status colours. */
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  /** Ring only: what sits in the middle, e.g. the number. Plain content, so say the value in `valueText` too. */
  children?: React.ReactNode;
}
export declare function Progress(props: ProgressProps): React.JSX.Element;
