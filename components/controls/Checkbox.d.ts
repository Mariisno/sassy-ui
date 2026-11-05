import * as React from 'react';
/** Checkbox with optional label + description. */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
}
/** The ref reaches the native <input>, so an app can focus it (e.g. the first field with an error). */
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
