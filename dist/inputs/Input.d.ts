import * as React from 'react';
/**
 * What a field is for. Each mode sets the right `type`, the keyboard a phone shows (`inputMode`) and what the
 * browser may fill in (`autoComplete`); an explicit prop wins. `number` and `decimal` are `type="text"` with a
 * numeric keyboard, not `type="number"`. `password` adds a show/hide toggle.
 */
export type InputMode = 'number' | 'decimal' | 'phone' | 'email' | 'url' | 'search' | 'date' | 'time' | 'password';
/**
 * Single-line text input with label, hint and error built in.
 * The hint, or the error when there is one, is linked with aria-describedby; an error also sets aria-invalid.
 * @startingPoint section="Forms" subtitle="Text inputs, textarea & select with labels and states" viewport="700x420"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  hint?: string;
  /** Error message — also sets the invalid style */
  error?: string;
  /** Adds a quiet "Valgfritt" marker to the label */
  optional?: boolean;
  /** Text of the optional marker. Default "Valgfritt"; English surfaces pass "optional". */
  optionalLabel?: string;
  /** Leading Lucide icon */
  icon?: string;
  /** Leading text (mono), e.g. "https://" */
  prefix?: React.ReactNode;
  /** Trailing text (mono), e.g. "kg" or a ⌘K hint */
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** What the field is for: sets `type`, `inputMode` and `autoComplete` (see the table in the docs). `number` is whole numbers, `decimal` numbers with a comma or point, `phone`, `email`, `url`, `search`, `date`, `time`, `password`. Your own `type`, `inputMode` or `autoComplete` wins. Nothing is set without it. */
  mode?: InputMode;
  /** With `mode="password"`: the show/hide toggle at the end of the field. Default true. */
  passwordToggle?: boolean;
  /** The name of the password toggle, a toggle button with `aria-pressed`. Default "Vis passord"; English surfaces pass "Show password". */
  passwordToggleLabel?: string;
}
/** The ref reaches the native <input>, so an app can focus it (e.g. the first field with an error). */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
/** Label, hint and error around a control. The hint/error gets the id `hintId` (default `${htmlFor}-hint`); point the control's aria-describedby at it. */
export interface FieldProps { label?: string; hint?: string; error?: string; optional?: boolean; optionalLabel?: string; htmlFor?: string; hintId?: string; children?: React.ReactNode; }
export declare function Field(props: FieldProps): React.JSX.Element;
