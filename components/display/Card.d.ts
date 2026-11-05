import * as React from 'react';
/**
 * Surface container. Outlined by default — borders carry structure, shadows only mean "lifted".
 * @startingPoint section="Layout" subtitle="Outlined, raised & sunken surfaces" viewport="700x300"
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'outlined' | 'raised' | 'sunken';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Hover lift + pointer */
  interactive?: boolean;
  as?: 'div' | 'section' | 'article' | 'a' | 'li';
  /** With `as="a"`: the link target. Passed through to the element. */
  href?: string;
  /** With `as="a"`: where the link opens, e.g. "_blank". */
  target?: string;
  /** With `as="a"`: the link relationship, e.g. "noopener". */
  rel?: string;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): React.JSX.Element;
