import * as React from 'react';
/** One option in a SegmentedControl. A plain string is both value and label. */
export interface SegmentedOption {
  /** The value, what `onChange` gets. */
  value: string;
  /** The text on the option. */
  label: React.ReactNode;
  /** Lucide icon before the label. */
  icon?: string;
  /** This option cannot be picked; the rest still can. */
  disabled?: boolean;
}
/**
 * Two to five mutually exclusive options in a row, as one value in a form: a native radio group
 * (`<fieldset role="radiogroup">` with a `<legend>`, one hidden `<input type="radio">` per option) in the
 * segmented look. One Tab stop, the arrow keys move and check within the group. Not Tabs: Tabs switch what
 * is shown, this answers a question in a form.
 * @startingPoint section="Forms" subtitle="Two to five exclusive options in a row" viewport="700x360"
 */
export interface SegmentedControlProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> {
  /** The question or name of the group, in the `<legend>`: "Where is the plant?". Without it, pass `aria-label`. */
  label?: React.ReactNode;
  /** One line under the control, e.g. "Can be changed later." Linked with aria-describedby. */
  hint?: React.ReactNode;
  /** Two to five options. Strings, or `{ value, label, icon?, disabled? }`. */
  options: Array<string | SegmentedOption>;
  /** The radios' `name`. Defaults to the group's id. */
  name?: string;
  /** The checked value (controlled). */
  value?: string;
  /** The value checked at first (uncontrolled). Always give one of the two: an empty segmented control looks like a row of buttons. */
  defaultValue?: string;
  /** Called with the value of the option that was picked. */
  onChange?: (value: string) => void;
  /** The track fills the width and the options share it equally. */
  fullWidth?: boolean;
  /** Disables every option and dims the control. */
  disabled?: boolean;
}
export declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;
