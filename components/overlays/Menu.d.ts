import * as React from 'react';
import type { PopoverProps } from './Popover';

export interface MenuItem {
  /** Given to onSelect. Also the React key. */
  id?: string;
  /** The text: a verb phrase in sentence case, "Delete project". A string is what the letter keys search in. */
  label: React.ReactNode;
  /** A Lucide name from the set (see components/icon/iconData.js), or an element. */
  icon?: string | React.ReactNode;
  /** Called when the item is chosen, with its `id`. */
  onSelect?: (id: string | undefined, event: React.SyntheticEvent) => void;
  /** Renders the item as a link (role="menuitem" on an <a>). */
  href?: string;
  /** Kept in the list and read by screen readers (aria-disabled), skipped by the arrow keys, does nothing when chosen. */
  disabled?: boolean;
  /** Set apart in the danger colour, for delete and the like. Put it last, after a separator. */
  danger?: boolean;
  /** A boolean makes the item a menuitemcheckbox with aria-checked and a check mark. Choosing it still closes the menu. */
  checked?: boolean;
  /** Classes on the item. */
  className?: string;
}
export interface MenuSeparator { separator: true }
export interface MenuGroup {
  /** The group's heading, read as the name of the group. */
  label: React.ReactNode;
  /** The items in the group. */
  items: MenuItem[];
}
export type MenuEntry = MenuItem | MenuSeparator | MenuGroup | '-';

/**
 * A menu button (WAI-ARIA APG menu button pattern): a Button or IconButton with aria-haspopup="menu" that opens a
 * list of actions in a Popover with role="menu". Keyboard: Enter, Space and ArrowDown open on the first item, ArrowUp
 * on the last; ArrowDown/ArrowUp move with wrap; Home and End jump; a letter goes to the next item starting with it;
 * Enter and Space choose and close; Esc closes and returns focus to the button; Tab closes and moves on. Items are
 * 44 px on touch and 32 px with a mouse.
 */
export interface MenuProps extends Omit<PopoverProps, 'trigger' | 'children' | 'autoFocus' | 'panelRef' | 'open' | 'defaultOpen' | 'onOpenChange' | 'side' | 'align' | 'portal' | 'className'> {
  /**
   * The button. Default: an IconButton with the ellipsis icon, named by `triggerLabel`. A trigger that cannot take a
   * ref (a string, a fragment) is replaced by the default; in development that logs a warning.
   */
  trigger?: React.ReactElement;
  /** Accessible name of the default trigger. Default "Flere valg"; English surfaces pass "More actions". */
  triggerLabel?: string;
  /** Items, separators ('-' or { separator: true }) and labelled groups, in order. */
  items: MenuEntry[];
  /** Accessible name of the menu itself. Without it the menu is named by its button (aria-labelledby). */
  label?: string;
  /** Called for every chosen item, after the item's own onSelect. */
  onSelect?: (id: string | undefined, item: MenuItem, event: React.SyntheticEvent) => void;
  /** Controlled open state. Leave it out for an uncontrolled menu. */
  open?: boolean;
  /** Open from the start, uncontrolled. Default false. */
  defaultOpen?: boolean;
  /** Called with the new state and why: 'trigger', 'keyboard', 'escape', 'outside', 'blur', 'tab' or 'select'. */
  onOpenChange?: (open: boolean, reason: string) => void;
  /** Preferred side. Default "bottom"; it flips when there is no room. */
  side?: 'bottom' | 'top';
  /** Which edge of the button the menu lines up with. Default 'start' (left); 'end' for a button at the right of a row. */
  align?: 'start' | 'end';
  /** Render the menu into document.body (position: fixed), for a button inside a dialog body, a card with overflow hidden or a transformed parent. Off by default. */
  portal?: boolean;
  /** Classes on the menu. */
  className?: string;
}
export declare function Menu(props: MenuProps): React.JSX.Element;
