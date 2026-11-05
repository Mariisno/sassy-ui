import * as React from 'react';
/**
 * A group of related controls, above all a radio or checkbox group: a native `<fieldset>` with a `<legend>`
 * that names the group, an optional hint under the legend and an error under the controls, both tied to the
 * group with aria-describedby. The error carries an icon and text and is announced (`role="alert"`), so colour
 * is never the only signal. The children are the existing Radio, Checkbox and Switch, unchanged.
 * @startingPoint section="Forms" subtitle="Radio and checkbox groups with legend, hint and error" viewport="700x520"
 */
export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** The question or name of the group, in the `<legend>`: "Hvor mye sol får stedet?" */
  legend: React.ReactNode;
  /** One line under the legend, e.g. "Velg alle som passer." Linked with aria-describedby. Hidden while there is an error. */
  hint?: React.ReactNode;
  /** The error under the controls, with an icon: "Velg minst én dag." Replaces the hint, is announced, and gives the group a danger edge. `aria-invalid` is not set on the group (ARIA does not allow it there); set it on the controls if the app wants it. */
  error?: React.ReactNode;
  /** Adds a quiet "Valgfritt" marker to the legend. */
  optional?: boolean;
  /** Text of the optional marker. Default "Valgfritt"; English surfaces pass "optional". */
  optionalLabel?: string;
  /** `column` (default) stacks the controls; `row` lays them side by side and wraps, for two or three short options. */
  layout?: 'column' | 'row';
  /** The controls: Radio, Checkbox or Switch, with a shared `name` for radios. */
  children?: React.ReactNode;
}
/** The error link in an ErrorSummary may point at the fieldset's `id`: the focus then lands on the first control in the group. */
export declare function Fieldset(props: FieldsetProps): React.JSX.Element;
