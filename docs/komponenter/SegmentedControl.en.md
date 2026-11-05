---
name: SegmentedControl
group: inputs
status: new
since: 0.7.0
kort: components/inputs/segmentedcontrol.card.html
typer: components/inputs/SegmentedControl.d.ts
---

# SegmentedControl

Two to five mutually exclusive options in a row, as one value in a form. Underneath it is a native radio group: a `<fieldset role="radiogroup">` with a `<legend>` that names the group, and one visually hidden `<input type="radio">` per option inside a `<label>`, so the browser gives the keyboard for free: one Tab stop, the arrow keys move and check within the group. The look is the same track as [Tabs](Tabs.en.md) `variant="segmented"`, but the role is another: Tabs switch what is shown, SegmentedControl answers a question.

## When to use

- A question with two to five short answers that should all be visible at once: "Outdoors / Indoors / Greenhouse", "Grams / Decilitres / Pieces".
- A choice in a form, read on submit or with `onChange`, where one option is always checked.
- Where a [Radio](Radio.en.md) group takes too much height and the options are short enough to sit side by side.

## When not to

- Switching a view or a filter that applies at once (list or board, week or month): [Tabs](Tabs.en.md) `variant="segmented"`. It has `role="tablist"` and its panels wired.
- More than five options, or long labels: [Select](Select.en.md) or [Radio](Radio.en.md) with descriptions.
- Several choices at once: a group of [Checkbox](Checkbox.en.md), or [Tag](Tag.en.md).
- On or off: [Switch](Switch.en.md).

## Do

- Give `label`: the question the options answer. It is the group's name. Without a visible label, pass `aria-label`.
- Always give `defaultValue` or `value`. An empty segmented control looks like a row of buttons.
- Keep the labels to one or two words in the same form: "Outdoors", "Indoors", "Greenhouse".
- Use `fullWidth` in a form on a phone, so the track lines up with the fields above.
- Give the radios a `name` when the form is submitted natively; otherwise they are named after the group's id.

## Don't

- Not as a view switch. What changes what is shown is Tabs.
- Not more than five, and no icons without text. Every option is read at a glance.
- Not for actions ("Save", "Delete"): that is [Button](Button.en.md).
- No error message under it. One option is always checked, so it cannot be empty; validate what belongs to it in the field beside it.

## Example

```jsx
import { SegmentedControl } from 'sussi/components';

<SegmentedControl label="Where is the plant?" hint="Can be changed later." options={['Outdoors', 'Indoors', 'Greenhouse']} defaultValue="Outdoors" />

<SegmentedControl
  label="Unit"
  options={[{ value: 'g', label: 'Grams' }, { value: 'dl', label: 'Decilitres' }, { value: 'pcs', label: 'Pieces' }]}
  value={unit}
  onChange={setUnit}
  fullWidth
/>

<SegmentedControl aria-label="Sown" options={[{ value: 'spring', label: 'Spring', icon: 'sprout' }, { value: 'autumn', label: 'Autumn', icon: 'leaf' }]} defaultValue="spring" />
```

## Props

The types are in `components/inputs/SegmentedControl.d.ts`. The card: `components/inputs/segmentedcontrol.card.html`.

<!-- props: SegmentedControlProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | The question or name of the group, in the `<legend>`: "Where is the plant?". Without it, pass `aria-label`. |
| `hint` | `React.ReactNode` | – | One line under the control, e.g. "Can be changed later." Linked with aria-describedby. |
| `options` | `Array<string \| SegmentedOption>` | `[]` | Two to five options. Strings, or `{ value, label, icon?, disabled? }`. |
| `name` | `string` | – | The radios' `name`. Defaults to the group's id. |
| `value` | `string` | – | The checked value (controlled). |
| `defaultValue` | `string` | – | The value checked at first (uncontrolled). Always give one of the two: an empty segmented control looks like a row of buttons. |
| `onChange` | `(value: string) => void` | – | Called with the value of the option that was picked. |
| `fullWidth` | `boolean` | – | The track fills the width and the options share it equally. |
| `disabled` | `boolean` | – | Disables every option and dims the control. |

Plus every attribute of `<fieldset>` (`React.FieldsetHTMLAttributes<HTMLFieldSetElement>`), except `onChange`, `defaultValue`.
<!-- /props -->

### SegmentedOption

<!-- props: SegmentedOption -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | *required* | The value, what `onChange` gets. |
| `label` | `React.ReactNode` | *required* | The text on the option. |
| `icon` | `string` | – | Lucide icon before the label. |
| `disabled` | `boolean` | – | This option cannot be picked; the rest still can. |
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/segmentedcontrol.e2e.test.mjs`, the rules in `tests/segmentedcontrol.test.mjs`.

- **Element and role.** A native `<fieldset>` with `role="radiogroup"` and a `<legend>`; each option is a native `<input type="radio">` in a `<label>`. No keyboard code of its own: it is all the browser's.
- **Name.** The group is named by `label` (the legend, also through `aria-labelledby`, so the name holds with the role). Each option is named by its label. Without `label` you must pass `aria-label` (tested).
- **Description.** `hint` gets the id `<id>-hint`, and the group points at it with `aria-describedby`, plus what the app passes itself.
- **Keyboard.** One Tab stop: Tab lands on the checked option (or the first when nothing is checked), ←/→ and ↑/↓ move and check within the group and wrap, Space checks, Tab again leaves the group (tested).
- **Focus.** The visually hidden radio has the focus; the face beside it shows the ring, 2 px `--focus-color` with a 2 px offset (`:focus-visible`).
- **State.** The checked face is lifted with `--surface-1` (`--surface-3` in dark mode), a shadow and `--fg-1` text; the others are `--fg-2` on `--surface-2`. The state is `:checked` on the radio, so it is read as "checked" whatever the colour. `disabled` on the group disables every radio (native) and dims them; `disabled` on one option disables that one.
- **Contrast.** `--fg-2` on `--surface-2` and `--fg-1` on `--surface-1`/`--surface-3` are at least 4.5:1 in both themes and every accent (`tests/segmentedcontrol.test.mjs`).
- **Target.** The track is 36 px tall and each face 30 px tall, exactly as Tabs `variant="segmented"`, and at least 40 px wide (2.5.8).
- **Motion.** Background, colour and shadow transition on `--dur-fast`, 0 under reduced motion.
- **Built-in text.** None.
- **Known limits.** The labels do not wrap. Five long words do not fit at 320 px; use Radio or Select then.

## Content

- `label` is the question the group answers, as a noun or a sentence: "Unit", "Where is the plant?".
- The options are one or two words in the same form: "Outdoors", "Indoors", "Greenhouse". Not sentences.
- `hint` is one line on consequence: "Can be changed later."
