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
  /** With `maxLength`: a character count under the field, «12 av 200». From 90 % it says how many are left, past the limit how many too many, and the field is invalid; the native limit is left off, so people can type past it and shorten. A screen reader hears the count once typing pauses. Without `count`, `maxLength` is the browser's hard limit, as before. */
  count?: boolean;
  /** The language of the count: `nb` «12 av 200», «18 tegn igjen» (default) or `en` «12 of 200», «18 characters left». */
  countLang?: 'nb' | 'en';
}
/** The ref reaches the native <textarea>, so an app can focus it (e.g. the first field with an error). */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
