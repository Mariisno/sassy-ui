import * as React from 'react';
/**
 * A colour dot: a garment's colour, a flower's colour, a project's colour. With `onClick` it is a toggle
 * button (`aria-pressed`) with a 44 px touch target and a ring when pressed; without, a plain dot.
 * A hex colour that is under 3:1 against the page gets a firmer edge in that theme, so white shows on
 * light and black on dark. Group several in an element with `role="group"` and an `aria-label`.
 * @startingPoint section="Display" subtitle="Colour dots, plain or as toggle buttons" viewport="700x420"
 */
export interface SwatchProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'color'> {
  /** Any CSS colour. A hex value (#rgb or #rrggbb) also gets the edge check. */
  color: string;
  /** The colour's name, e.g. "Navy". Required when it is a button; without it a plain dot is decorative. */
  label?: string;
  /** Selected. Only on the button form; leave undefined for a button that is not a toggle. */
  pressed?: boolean;
  /** Makes it a button. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** sm 16 px, md 22 px, lg 26 px dot. Default md. The button target is 44 px either way (34 px with a mouse). */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
export declare function Swatch(props: SwatchProps): React.JSX.Element;
