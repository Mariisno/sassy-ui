import * as React from 'react';
export interface TabItem { id: string; label: React.ReactNode; icon?: string; count?: number | string; }
/**
 * Tabs — underline for page sections, segmented for view switches / filters.
 * Keyboard: only the selected tab is in the Tab order; ←/→ move and select, Home/End jump to the ends.
 * Pass TabPanels as children to wire each tab to its content (aria-controls / aria-labelledby).
 * @startingPoint section="Navigation" subtitle="Underline & segmented tabs" viewport="700x200"
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'segmented';
  /** Base for the tab and panel ids. Defaults to React.useId(). */
  id?: string;
  /** TabPanels, rendered after the tab list. */
  children?: React.ReactNode;
  /** Names the tab list, e.g. "Prosjektvisning". Passed on with the other aria-* and data-* props. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): React.JSX.Element;

/** The content for one tab. Render it as a child of Tabs; hidden unless its tab is selected. */
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The id of the TabItem this panel belongs to. */
  value: string;
  children?: React.ReactNode;
}
export declare function TabPanel(props: TabPanelProps): React.JSX.Element | null;
