---
name: Input
group: inputs
status: stable
since: 0.2.0
kort: components/inputs/inputs.card.html
typer: components/inputs/Input.d.ts
---

# Input

A single-line text input with label, hint and error built in. The input is a native `<input>` in a frame (`.s-control`) that shows focus, error and disabled; the label is a `<label>` that points at the input; the hint, or the error when there is one, is linked with `aria-describedby`, and an error sets `aria-invalid` and is announced. `mode` says what the field is for (a number, an email, a phone, a date, a password …) and sets the right `type`, keyboard on a phone and autofill; a password gets a show/hide toggle. `Field` is the same label/hint/error anatomy around a control you build yourself.

## When to use

- Short text: name, email, search, a number, an address.
- With `icon` or `prefix`/`suffix` when the field needs a cue inside: a search icon, "https://", "kg".
- `Field` around your own control (a date picker, a colour input) so it gets the same label, hint and error as the rest of the form.

## When not to

- Several lines: [Textarea](Textarea.en.md).
- A choice among known options: [Select](Select.en.md), [Radio](Radio.en.md) or [Tag](Tag.en.md).
- On or off: [Switch](Switch.en.md) or [Checkbox](Checkbox.en.md).
- Picking a file: [FileButton](FileButton.en.md).

## Do

- Always give `label`. A field with only a `placeholder` loses its name the moment you type.
- Mark the rare optional field with `optional` instead of putting an asterisk on every required one.
- Write `error` as an explanation with a next step: "That doesn't look like an email yet."
- Use `hint` for format and consequence: "As it says on the label.", "Shown on your profile."
- Set `mode` on every field that is not free text (`number`, `email`, `phone`, `date` …), so the phone gives the right keyboard and the browser fills in the right thing. The table below says what each sets.

## Don't

- Don't use `placeholder` as the label. It is an example, in `--fg-3`, and it disappears.
- Don't show an error before people have had a chance to fill in. Validate on blur or on submit.
- Don't write "Invalid value", error codes or exclamation marks.
- Don't make `prefix`/`suffix` the only carrier of a unit; say the unit in the label or the hint too.
- Don't use `type="number"` for numbers. `mode="number"` gives text with a numeric keyboard: `type="number"` changes the value under the mouse wheel, lets "e" and "-" through and reads badly. Validate the text in the app.

## Example

```jsx
import { Input, Field } from 'sussi/components';

<Input label="Project name" placeholder="e.g. Garden log" />
<Input icon="search" placeholder="Search" suffix="⌘K" aria-label="Search" />
<Input label="Email" mode="email" error="That doesn't look like an email yet." />
<Input label="Weight" mode="decimal" suffix="kg" hint="In kilograms." optional optionalLabel="optional" />
<Input label="Plants per row" mode="number" />
<Input label="Sown" mode="date" />
<Input label="Password" mode="password" autoComplete="new-password" hint="At least twelve characters." passwordToggleLabel="Show password" />
<Field label="Colour" htmlFor="colour" hint="Shown on the project card.">
  <input id="colour" type="color" aria-describedby="colour-hint" />
</Field>
```

## Props

The types are in `components/inputs/Input.d.ts`. The card with Input, Textarea and Select: `components/inputs/inputs.card.html`.

<!-- props: InputProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | The label above the field. |
| `hint` | `string` | – | Help text under the field, linked with `aria-describedby`. |
| `error` | `string` | – | Error message — also sets the invalid style |
| `optional` | `boolean` | – | Adds a quiet "Valgfritt" marker to the label |
| `optionalLabel` | `string` | `'Valgfritt'` | Text of the optional marker. Default "Valgfritt"; English surfaces pass "optional". |
| `icon` | `string` | – | Leading Lucide icon |
| `prefix` | `React.ReactNode` | – | Leading text (mono), e.g. "https://" |
| `suffix` | `React.ReactNode` | – | Trailing text (mono), e.g. "kg" or a ⌘K hint |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px tall. |
| `mode` | `InputMode` | – | What the field is for: sets `type`, `inputMode` and `autoComplete` (see the table in the docs). `number` is whole numbers, `decimal` numbers with a comma or point, `phone`, `email`, `url`, `search`, `date`, `time`, `password`. Your own `type`, `inputMode` or `autoComplete` wins. Nothing is set without it. |
| `passwordToggle` | `boolean` | `true` | With `mode="password"`: the show/hide toggle at the end of the field. Default true. |
| `passwordToggleLabel` | `string` | `'Vis passord'` | The name of the password toggle, a toggle button with `aria-pressed`. Default "Vis passord"; English surfaces pass "Show password". |

Plus every attribute of `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), except `size`, `prefix`.
<!-- /props -->

`ref` reaches the native `<input>`, so an app can move focus to the first field with an error (`tests/refs.e2e.test.mjs`).

### What `mode` sets

| `mode` | `type` | `inputMode` | `autoComplete` | For |
| --- | --- | --- | --- | --- |
| `number` | `text` | `numeric` | – | Whole numbers: a count, a year, a postcode. Not `type="number"`. |
| `decimal` | `text` | `decimal` | – | Numbers with a comma or point: weight, price, amount. |
| `phone` | `tel` | `tel` | `tel` | A phone number. |
| `email` | `email` | `email` | `email` | An email address. |
| `url` | `url` | `url` | `url` | A web address. |
| `search` | `search` | `search` | – | A search field; the phone's Enter key says "Search" (`enterKeyHint`). |
| `date` | `date` | – | – | A date, with the browser's own picker. |
| `time` | `time` | – | – | A time of day, with the browser's own picker. |
| `password` | `password` | – | `current-password` | A password, with a show/hide toggle. Pass `autoComplete="new-password"` when the password is being set. |

Your own `type`, `inputMode`, `autoComplete` or `enterKeyHint` wins over the table. Without `mode` nothing is set, as before.

### Field

<!-- props: FieldProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | The label. |
| `hint` | `string` | – | Help text under the control. |
| `error` | `string` | – | Error message; shown instead of the hint, with `role="alert"`. |
| `optional` | `boolean` | – | Adds the optional marker after the label. |
| `optionalLabel` | `string` | `'Valgfritt'` | The text of the optional marker. |
| `htmlFor` | `string` | – | The control's id, so the label points at it. |
| `hintId` | `string` | – | The id the hint or error gets. Default `${htmlFor}-hint`; point the control's `aria-describedby` at it. |
| `children` | `React.ReactNode` | – | The control. |
<!-- /props -->

## Accessibility

The links are tested in `tests/forms.e2e.test.mjs`.

- **Element and role.** A native `<input>` (the type comes from `mode`, or is yours: `text`, `email` …) with a `<label for>` pointing at it. The id is `id` or a generated one.
- **Name.** `label`. `prefix`, `suffix` and the icon are visual and do not become part of the name. Without `label` you must pass `aria-label` (as the search field in the example does).
- **Description.** `hint`, or `error` when there is one, gets the id `${id}-hint`, and the input's `aria-describedby` points at it. Your own `aria-describedby` is kept as well (tested).
- **Error.** `error` sets `aria-invalid="true"`, turns the edge `--danger` and is announced when it appears (`role="alert"`); a `hint` has no role (tested, WCAG 4.1.3).
- **Keyboard.** The browser's. Nothing of its own. `mode` picks the keyboard on a phone (`inputMode`); `number` and `decimal` are text fields with a numeric keyboard, so the mouse wheel does not change the value and a screen reader reads them as an ordinary field.
- **Password.** `mode="password"` puts a button at the end of the field, an IconButton (24, 30 or 38 px by `size`, never under 24) with `aria-pressed` named "Vis passord" (`passwordToggleLabel`), which switches `type` to `text` and back; the value stays. The button has its own focus ring; while it holds the focus (mouse or keyboard) the frame draws no ring and keeps its resting border, or the `--danger` border when invalid. `passwordToggle={false}` removes it (tested, `tests/input-modes.e2e.test.mjs`).
- **Focus.** The frame gets a `--border-focus` edge and a 2 px `outline` in `--focus-color` when the input has focus (`:focus-within`); with an error the outline is `--danger`. The input itself has no ring of its own.
- **Contrast.** The edge is `--border-control`, at least 3:1 against the surfaces (`tests/focus.test.mjs`, `tests/contrast.test.mjs`). The text is `--fg-1`, placeholder and hint `--fg-3` (4.5:1 on `--bg`, `--surface-1` and `--surface-2`), the error `--danger-fg`.
- **State.** `disabled` sets `disabled` on the input, 55% opacity, `--surface-2` and no pointer events.
- **Target.** 30, 38 or 46 px tall by `size`.
- **Motion.** Edge and shadow transition on `--dur-fast`, 0 under reduced motion.
- **Built-in text.** "Valgfritt" (Norwegian for optional) after the label with `optional`. Override with `optionalLabel` ("optional" on English surfaces, tested). "Vis passord" (show password) on the password toggle; override with `passwordToggleLabel`.

## Content

- The label is a noun, no colon: "Email", "Project name".
- `placeholder` is an example that starts with "e.g.", or is empty. Never an instruction.
- `hint` is one sentence on format or consequence, with a full stop.
- `error` says what is wrong and what to do: "That doesn't look like an email yet." "That name is taken. Try another." Never "Invalid".
- Mark the optional, not the required. Most fields are required.
