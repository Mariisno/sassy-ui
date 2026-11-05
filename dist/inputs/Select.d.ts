import * as React from 'react';
/** Native select styled to match Input. Prefer Radio/Tabs for ≤ 4 options. */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Text of the optional marker. Default "Valgfritt". */
  optionalLabel?: string;
  options: Array<string | { value: string; label: string }>;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}
/** The ref reaches the native <select>, so an app can focus it (e.g. the first field with an error). */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
