import * as React from 'react';
export interface AppShellItem {
  id: string;
  label: string;
  /**
   * A Lucide icon name, or the app's own icon: a function that gets the size (22 in the tab bar, 18 in the
   * sidebar, 20 under "Mer") and returns an element, or an element. Draw your own on Lucide's grid
   * (24 × 24, 1.75 stroke, `currentColor`) so it matches. Decorative: the label names the item.
   */
  icon?: string | ((size: number) => React.ReactNode) | React.ReactNode;
  /** Link target, e.g. "#/planter". Without it the item is a button and onNavigate does the navigation. */
  href?: string;
}
/**
 * The app frame with its main menu (variant A): a tab bar at the bottom below 900 px, a sidebar from 900 px.
 * Up to five tabs fit; with more, the fifth place becomes "Mer", a keyboard-usable list of the rest
 * (Esc closes it and focus goes back to "Mer"). The active item is marked with aria-current="page", a filled
 * surface (3:1 against the page) and a semibold label. Targets are at least 44 px, and the tab bar pads for
 * the iPhone home indicator. Renders the page's <main> (focusable, with a skip link to it first in the tab
 * order): don't put another one inside.
 * @startingPoint section="Navigation" subtitle="Tab bar on phones, sidebar from 900 px" viewport="700x420"
 */
export interface AppShellProps {
  items: AppShellItem[];
  /** id of the current item. */
  current?: string;
  onNavigate?: (id: string, e: React.MouseEvent) => void;
  /** Top of the sidebar, e.g. the wordmark. Sidebar only. */
  brand?: React.ReactNode;
  /** Bottom of the sidebar, e.g. account or a count. Sidebar only. */
  footer?: React.ReactNode;
  /** Accessible name of both menus. Default "Hovedmeny". */
  label?: string;
  /** Label of the overflow tab. Default "Mer". */
  moreLabel?: string;
  /**
   * Text of the skip link, the first thing in the tab order (WCAG 2.4.1). It shows when it has focus and
   * moves focus to <main> with code, so an app that routes on the hash keeps its route. Default "Hopp til
   * innholdet"; English surfaces pass "Skip to content".
   */
  skipLabel?: string;
  /** id of <main>, the skip link's target. Default: a generated id. */
  mainId?: string;
  /**
   * The tab bar at every width, at the bottom of the parent instead of fixed to the screen, and no sidebar.
   * For an app that lives in its own frame, like a phone-width shell on a big screen. The parent
   * gives the height (AppShell fills it), and the page sets its own padding. Default false.
   */
  contained?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export declare function AppShell(props: AppShellProps): React.JSX.Element;
