import * as React from 'react';
/**
 * Something is happening and nobody knows for how long: a ring in the accent that turns. `role="status"` with
 * `label` as visually hidden text, so a screen reader hears «Laster» where sighted people see the ring. Under
 * `prefers-reduced-motion` it stands still and pulses. With `aria-hidden` it is decorative: no role, no text.
 * Button's `loading` has its own matching spinner; use that inside a button.
 * @startingPoint section="Feedback" subtitle="sm, md, lg; labelled or decorative" viewport="700x200"
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `sm` 16 px (in a line of text), `md` 24 px, `lg` 40 px (a whole view). */
  size?: 'sm' | 'md' | 'lg';
  /** What is happening, in the present tense: «Laster», «Lagrer». Required, unless `aria-hidden` makes the spinner decorative next to its own text. */
  label?: string;
  /** `true` when the text next to it already says what is happening: the spinner then has no role and no text of its own. */
  'aria-hidden'?: boolean | 'true' | 'false';
  className?: string;
  style?: React.CSSProperties;
}
export declare function Spinner(props: SpinnerProps): React.JSX.Element;
