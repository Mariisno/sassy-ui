import * as React from 'react';
/** Toggle for settings that apply immediately (no Save button). */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}
/** The ref reaches the native <input>, so an app can focus it (e.g. the first field with an error). */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
