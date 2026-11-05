import * as React from 'react';
/** Square icon-only button. Always pass a label (used for aria-label + native title; inside a Tooltip the title is dropped). */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name */
  icon: string;
  /** Accessible label — required */
  label: string;
  variant?: 'ghost' | 'secondary' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  round?: boolean;
}
/** The ref reaches the native <button>, so an app can focus it (e.g. the first field with an error). */
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
