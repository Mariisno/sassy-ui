import * as React from 'react';
/**
 * A non-modal surface anchored to its trigger (WAI-ARIA disclosure, placed like a dropdown). The trigger gets
 * aria-expanded and aria-controls and toggles the panel on click. The panel sits below the trigger (or above with
 * `side="top"`), flips to the other side when it does not fit and there is more room there, and stays inside the
 * viewport with 8 px to spare, also at 320 px. Focus moves in on open (the first control, else the panel), Esc closes
 * and puts focus back on the trigger, a click outside and focus moving elsewhere close it, and Tab at the panel's edge
 * goes back through the trigger so the page's tab order carries on. The fade stops under prefers-reduced-motion.
 * The panel scrolls when taller than the screen (overflow: auto), so a Tooltip inside it is clipped at the panel's edge.
 * Inside a Dialog, with or without `portal`: the dialog keeps its own Tab order and focus trap, Esc closes the popover first.
 */
/** id, data-*, aria-*, role and the rest reach the panel. */
export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * One focusable element, a Button or an IconButton. It is cloned with the ref, the handlers and the ARIA attributes.
   * A string or a fragment cannot take them, so nothing opens; in development that logs a warning.
   */
  trigger: React.ReactElement;
  /** The panel's content: a few controls, a short form. */
  children?: React.ReactNode;
  /** Controlled open state. Leave it out for an uncontrolled popover. */
  open?: boolean;
  /** Open from the start, uncontrolled. Default false. */
  defaultOpen?: boolean;
  /** Called with the new state and why: 'trigger', 'keyboard', 'escape', 'outside', 'blur', 'tab' or 'select' (Menu). */
  onOpenChange?: (open: boolean, reason: string) => void;
  /** Preferred side. Default 'bottom'; it flips when there is no room. */
  side?: 'bottom' | 'top';
  /** Which edge of the trigger the panel lines up with. Default 'start' (left); 'end' for a button at the right of a row. */
  align?: 'start' | 'end';
  /**
   * Render the panel into document.body (position: fixed), so a positioned, transformed or clipped parent (a dialog body,
   * a sidebar, a card with overflow hidden) cannot cut it off or draw over it. Off by default; no effect without a
   * document (a build-time render). In a prerendered app, open it after hydration.
   */
  portal?: boolean;
  /** Move focus into the panel on open. Default true; Menu turns it off and places focus itself. */
  autoFocus?: boolean;
  /** Reaches the panel element. */
  panelRef?: React.Ref<HTMLDivElement>;
  /** Classes on the panel. */
  className?: string;
}
export declare function Popover(props: PopoverProps): React.JSX.Element;

export interface PopoverRect { top: number; bottom: number; left: number; right: number; width: number; height: number }
export interface PopoverPlacement { side: 'bottom' | 'top'; x: number; y: number }
/** The placement logic on its own: where a panel of this size goes for this trigger in this viewport, in viewport coordinates. */
export declare function placePopover(trigger: PopoverRect, panel: { width: number; height: number }, viewport: { width: number; height: number }, options?: { side?: 'bottom' | 'top'; align?: 'start' | 'end' }): PopoverPlacement;
