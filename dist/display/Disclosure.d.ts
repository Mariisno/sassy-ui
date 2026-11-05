import * as React from 'react';
/**
 * A section that shows and hides: native `<details>` and `<summary>`, so the browser gives the button role,
 * `aria-expanded`, Enter and Space, and the content stays in the page whether it is open or not. A 44 px
 * row with the title and a chevron that turns when the section opens. Uncontrolled with `defaultOpen`, or
 * controlled with `open` and `onToggle`. One section at a time; an accordion is several Disclosures.
 * @startingPoint section="Display" subtitle="Closed, open, controlled" viewport="700x320"
 */
export interface DisclosureProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title' | 'open' | 'onToggle'> {
  /** The row's text: what the section holds, e.g. «Vanning og gjødsling». Pass a heading element (`<h3>`) when the section is a part of the page outline. */
  title: React.ReactNode;
  /** Controlled: whether the section is open. Pair with `onToggle`; leave it out for an uncontrolled section. */
  open?: boolean;
  /** Uncontrolled: open on the first render. Default false. */
  defaultOpen?: boolean;
  /** Called with the new state when the person opens or closes the section. With `open` set, the app updates `open` here. */
  onToggle?: (open: boolean) => void;
  /** The section's content. Rendered whether the section is open or not. */
  children?: React.ReactNode;
  /** Your own classes on the `<details>`. */
  className?: string;
  /** Your own styles on the `<details>`. */
  style?: React.CSSProperties;
}
export declare function Disclosure(props: DisclosureProps): React.JSX.Element;
