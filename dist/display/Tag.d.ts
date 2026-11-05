import * as React from 'react';
/** Chip for filters, categories and removable selections. */
export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  /** Lucide icon name */
  icon?: string;
  /** Makes it a toggle (aria-pressed). */
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** Shows a remove (×) button beside the label: a real button, 24 px, reachable by keyboard */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name of the remove button. Default "Fjern <text>" when the tag's content is text, else "Fjern". */
  removeLabel?: string;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.JSX.Element;
