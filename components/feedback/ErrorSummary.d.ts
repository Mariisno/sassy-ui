import * as React from 'react';
/** One field with an error: the `id` of the field (or of the Fieldset around a radio or checkbox group) and the message. */
export interface ErrorSummaryItem {
  /** The `id` of the control, or of the Fieldset when the error is about a group. Without it the message is plain text, not a link. */
  id?: string;
  /** The same message as under the field: "Skriv navnet på planten." */
  message: React.ReactNode;
}
/**
 * The box at the top of a form after a failed submit: a title, an optional line and one link per field with an
 * error. It takes the focus when it appears, so the person hears what went wrong and the page scrolls to it;
 * each link moves the focus to its field, or to the first control in a Fieldset. The app mounts it when the
 * submit fails and removes it when the form is valid.
 * @startingPoint section="Feedback" subtitle="After a failed submit: a title and a link per field" viewport="700x560"
 */
export interface ErrorSummaryProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** The heading. Default "Noe må rettes før du kan gå videre"; English surfaces pass "Something needs fixing before you go on". */
  title?: React.ReactNode;
  /** The fields with an error, in the order they are in the form. */
  errors?: ErrorSummaryItem[];
  /** Move the focus to the box when it mounts. Default true. Give the box a new `key` on the next failed submit so it moves again. */
  autoFocus?: boolean;
  /** Heading level of the title, 2–6. Default 2. Pick the one that fits the page outline. */
  level?: 2 | 3 | 4 | 5 | 6;
  /** One line under the title, e.g. "Rett feilene under, så kan du lagre." */
  children?: React.ReactNode;
}
export declare function ErrorSummary(props: ErrorSummaryProps): React.JSX.Element;
