import * as React from 'react';
/**
 * Running text in Sassy's type roles: a size (body, sm, lead, meta), a tone (default, muted, subtle) and DM Mono
 * with `mono`. A `<p>` by default; `as` picks another element. The classes `.s-text`, `.s-text--sm`,
 * `.s-text--lead`, `.s-text--meta`, `.s-text--muted`, `.s-text--subtle` and `.s-text--mono` give the same
 * looks without React.
 */
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The element, default `p`. `span` inside a line, `div` around blocks, `small`, `strong`, `em`, `label`, `li`, `figcaption` or `time` where that is what the text is. */
  as?: 'p' | 'span' | 'div' | 'small' | 'strong' | 'em' | 'label' | 'li' | 'figcaption' | 'time';
  /** `body` (16 px, the default), `sm` (14 px), `lead` (18 px, the intro under a page title) or `meta` (12 px DM Mono, one-line metadata such as a date or a count). */
  size?: 'body' | 'sm' | 'lead' | 'meta';
  /** `default` keeps the colour around it (`--fg-1` on a page), `muted` is `--fg-2` for secondary text, `subtle` is `--fg-3` for metadata. All hold 4.5:1 on `--bg`, `--surface-1` and `--surface-2`; on `--surface-3` use `default` or `muted`. */
  tone?: 'default' | 'muted' | 'subtle';
  /** DM Mono at the chosen size, for numbers and codes. `meta` is mono already. */
  mono?: boolean;
  /** For `as="time"`: the machine-readable date, e.g. «2026-11-05». */
  dateTime?: string;
  /** For `as="label"`: the id of the control it names. */
  htmlFor?: string;
  /** The text. */
  children?: React.ReactNode;
}
/** The ref reaches the element `as` renders. */
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;
