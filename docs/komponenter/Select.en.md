---
name: Select
group: inputs
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/select/
typer: dist/inputs/Select.d.ts
---

# Select

A native dropdown with the same label, hint, error and frame as [Input](Input.en.md). `options` are strings or `{ value, label }`, `placeholder` adds a first empty option, and the chevron on the right is drawn by Sassy while the list that opens is the browser's own. For five or more options; fewer is [Radio](Radio.en.md) or segmented [Tabs](Tabs.en.md).

## When to use

- One choice among five or more known options: country, category, a status with many steps.
- When space is short and the options need not be visible before you choose.
- In a form that is saved with a button.

## When not to

- Two to four options: [Radio](Radio.en.md), so all are visible.
- A choice that switches a view at once: [Tabs](Tabs.en.md) `variant="segmented"`.
- Several choices at once: [Checkbox](Checkbox.en.md) or [Tag](Tag.en.md).
- Free text with suggestions: that is a combobox, which Sassy does not have.

## Do

- Give `label`. The list alone does not say what it chooses.
- Use `placeholder` ("Choose a type") when there is no sensible default, and `error` when nothing was chosen: "Choose a type."
- Sort the options the way people look: alphabetically, or the most common first.
- Pass `{ value, label }` when the value is not what people should read.

## Don't

- Don't use a Select for yes/no. That is a [Switch](Switch.en.md) or [Checkbox](Checkbox.en.md).
- Don't use long lists without order. Over twenty options need search, which Select does not have.
- Don't use `placeholder` as the label.
- Don't style the open list; it is the browser's, on purpose.

## Example

```jsx
import { Select } from 'sassy/components';

<Select label="Status" options={['Idea', 'Building', 'Live', 'Paused']} defaultValue="Building" />
<Select label="Type" placeholder="Choose a type" options={[{ value: 'c', label: 'Clay' }, { value: 's', label: 'Sand' }]} error="Choose a type." />
<Select label="Country" optional optionalLabel="optional" options={countries} hint="Used for the currency." size="sm" />
```

## Props

The types are in `dist/inputs/Select.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/select/).

<!-- props: SelectProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | The label above the field. |
| `hint` | `string` | – | Help text under the field, linked with `aria-describedby`. |
| `error` | `string` | – | Error message. Replaces the hint, sets `aria-invalid` and is announced. |
| `optional` | `boolean` | – | Adds a quiet "Valgfritt" after the label. |
| `optionalLabel` | `string` | `'Valgfritt'` | Text of the optional marker. Default "Valgfritt". |
| `options` | `Array<string \| { value: string; label: string }>` | `[]` | The options: strings, or `{ value, label }`. |
| `placeholder` | `string` | – | A first, empty option with this text. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px tall. |

Plus every attribute of `<select>` (`React.SelectHTMLAttributes<HTMLSelectElement>`), except `size`.
<!-- /props -->

`ref` reaches the native `<select>` (tested).

## Accessibility

The links are tested in a browser.

- **Element and role.** A native `<select>` with `<option>`s, and a `<label for>` pointing at it. The chevron is an `Icon` without pointer events, decorative.
- **Name.** `label`.
- **Description and error.** As Input: `hint` or `error` in `${id}-hint`, pointed at by `aria-describedby` (your own is kept); `error` sets `aria-invalid="true"` and `role="alert"` (tested for Select).
- **Keyboard.** The browser's: arrow keys, type a letter to jump, Enter/Space to open. Nothing of its own.
- **Focus.** The frame gets a `--border-focus` edge and a 2 px `outline` in `--focus-color`.
- **Contrast.** As Input: the edge `--border-control` at least 3:1, the text `--fg-1`, the chevron `--fg-3`.
- **State.** `disabled` on the element, 55% opacity.
- **Target.** 30, 38 or 46 px tall by `size`.
- **Motion.** As Input.
- **Built-in text.** "Valgfritt" with `optional`; override with `optionalLabel`.
- **Known limit.** The open list is the browser's and does not follow Sassy's theme. The placeholder option has the value `""` and can be chosen again.

## Content

- The label is what gets chosen: "Status", "Type", "Country".
- `placeholder` is "Choose …" + the noun: "Choose a type".
- The options are short and in the same form: "Idea", "Building", "Live".
- `error` when nothing is chosen: "Choose a type." Not "This field is required".
