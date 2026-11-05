import * as React from 'react';
/**
 * Sussi button. One primary per view; secondary for alternatives; ghost for toolbars.
 * @startingPoint section="Actions" subtitle="Primary, secondary, soft, ghost & danger buttons" viewport="700x300"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name shown before the label. */
  iconLeft?: string;
  /** Lucide icon name shown after the label (e.g. "arrow-right"). */
  iconRight?: string;
  loading?: boolean;
  fullWidth?: boolean;
  /** Render as another element, e.g. "a" for links. */
  as?: 'button' | 'a';
  href?: string;
  children?: React.ReactNode;
}
/** The ref reaches the native <button>, so an app can focus it (e.g. the first field with an error). */
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
