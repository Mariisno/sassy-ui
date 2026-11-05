import * as React from 'react';
/**
 * What a list or page shows when there is nothing in it yet. An icon, a heading, one calm line on what
 * to do next, and at most one action (usually a Button). Never blames, never pushes: "Nothing here yet.
 * Add your first task to get going." Centered, max 30ch of text.
 * @startingPoint section="Feedback" subtitle="Nothing here yet: icon, heading, one line, one action" viewport="700x560"
 */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Lucide icon name, in a 56 px soft accent circle. Decorative. */
  icon?: string;
  /** The heading, e.g. "Ingen plagg ennå". */
  title: React.ReactNode;
  /** One line on what to do, e.g. "Legg til det første plagget, så dukker det opp her." */
  description?: React.ReactNode;
  /** One action, usually a Button. */
  action?: React.ReactNode;
  /** Heading level, 2–6. Default 2. Pick the one that fits the page outline. */
  level?: 2 | 3 | 4 | 5 | 6;
  /** Draw it as a card (surface-1, border, radius). Default false: it sits on the page. */
  framed?: boolean;
  /** Extra content between the text and the action, e.g. a second line of meta. */
  children?: React.ReactNode;
}
export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;
