import * as React from 'react';
/**
 * Short hover/focus label (300ms delay). Never put essential info only in a tooltip.
 * The bubble is linked to the trigger with aria-describedby, Esc hides it, and the trigger's
 * native title is removed so there is only one bubble.
 */
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: React.ReactNode;
  /** Keyboard shortcut shown in mono, e.g. "⌘K" */
  kbd?: string;
  side?: 'top' | 'bottom';
  /** Force visible (for docs/previews) */
  open?: boolean;
  /** One element, e.g. an IconButton. It gets aria-describedby pointing at the bubble. */
  children: React.ReactNode;
  /** Id of the bubble. Defaults to one from React.useId(). */
  id?: string;
  className?: string;
}
export declare function Tooltip(props: TooltipProps): React.JSX.Element;
