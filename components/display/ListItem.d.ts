import * as React from 'react';
/**
 * A row that opens something, for lists of projects, recipes, plants and the like.
 * With `href` it is a link (it can open in a new tab, and screen readers call it a link), with `onClick`
 * a button, and with neither a plain row. Leading image or icon, a title, a meta line and a trailing
 * slot that shows a chevron by default when the row opens something. At least 56 px tall.
 * Don't put buttons or links inside it: the whole row is the target.
 * @startingPoint section="Lists" subtitle="Rows that open something: link, button or plain" viewport="700x560"
 */
export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onClick'> {
  title: React.ReactNode;
  /** Second line, e.g. "25 % · 3 beds". */
  meta?: React.ReactNode;
  /** Lucide icon name, shown in a 40 px square. */
  icon?: string;
  /** Image URL, shown 48 × 48. Decorative unless imageAlt is given. */
  image?: string;
  /** What the image shows, when it adds something the title doesn't. Default "" (decorative). */
  imageAlt?: string;
  /** Anything else in front, instead of icon or image. */
  leading?: React.ReactNode;
  /** The trailing slot. Default: a chevron when the row opens something. Pass null to hide it. */
  trailing?: React.ReactNode;
  /** Makes the row a link. */
  href?: string;
  /** Makes the row a button when there's no href. With href it still runs (e.g. to close a sheet first). */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** A button gets disabled; a link gets aria-disabled="true" and loses href and onClick. */
  disabled?: boolean;
  /** Extra content under the meta line, e.g. a progress bar. */
  children?: React.ReactNode;
}
export declare function ListItem(props: ListItemProps): React.JSX.Element;
