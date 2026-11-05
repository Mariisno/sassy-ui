import * as React from 'react';
/** Multi-line text input with label, hint and error. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Text of the optional marker. Default "Valgfritt". */
  optionalLabel?: string;
  rows?: number;
}
/** The ref reaches the native <textarea>, so an app can focus it (e.g. the first field with an error). */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
