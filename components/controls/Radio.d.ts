import * as React from 'react';
/** Radio button. Group by giving several the same name. */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}
/** The ref reaches the native <input>, so an app can focus it (e.g. the first field with an error). */
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
