---
name: Textarea
group: inputs
status: stable
since: 0.2.0
kort: components/inputs/inputs.card.html
typer: components/inputs/Textarea.d.ts
---

# Textarea

A multi-line text input for notes and descriptions, with the same label, hint and error as [Input](Input.en.md). A native `<textarea>` with four visible lines by default (`rows`), at least 88 px tall, and resizable vertically.

## When to use

- Text that can get longer than one line: notes, descriptions, a message.
- When people should see several lines of what they wrote while writing.

## When not to

- One line (a name, an email, a number): [Input](Input.en.md).
- Formatted text with a toolbar: that is an editor, which Sussi does not have.
- A choice: [Select](Select.en.md), [Radio](Radio.en.md).

## Do

- Set `rows` by how much people usually write: 3 for a comment, 6–8 for a description.
- Say in `hint` what is allowed: "Markdown works.", "Shown on the project page."
- Give an `error` that points on: "Write at least one sentence."
- Mark the field `optional` when it is; most notes are.

## Don't

- Don't use `placeholder` as an instruction; it disappears as you type.
- Don't set a character limit without showing the count; put a counter in `hint` when there is a limit.
- Don't turn off vertical resizing. It is there for those who need room.
- Don't use `rows={1}`. That is an Input.

## Example

```jsx
import { Textarea } from 'sussi/components';

<Textarea label="Notes" optional optionalLabel="optional" hint="Markdown works." rows={5} />
<Textarea label="Description" error="Write at least one sentence." defaultValue="" />
```

## Props

The types are in `components/inputs/Textarea.d.ts`. The card: `components/inputs/inputs.card.html`.

<!-- props: TextareaProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | The label above the field. |
| `hint` | `string` | – | Help text under the field, linked with `aria-describedby`. |
| `error` | `string` | – | Error message. Replaces the hint, sets `aria-invalid` and is announced. |
| `optional` | `boolean` | – | Adds a quiet "Valgfritt" after the label. |
| `optionalLabel` | `string` | `'Valgfritt'` | Text of the optional marker. Default "Valgfritt". |
| `rows` | `number` | `4` | Visible lines. |

Plus every attribute of `<textarea>` (`React.TextareaHTMLAttributes<HTMLTextAreaElement>`).
<!-- /props -->

`ref` reaches the native `<textarea>` (`tests/refs.e2e.test.mjs`).

## Accessibility

The links are tested in `tests/forms.e2e.test.mjs` (the hint and an app's own `aria-describedby` are tested on a Textarea).

- **Element and role.** A native `<textarea>` with a `<label for>` pointing at it.
- **Name.** `label`.
- **Description and error.** As Input: `hint` or `error` in `${id}-hint` with `aria-describedby` (your own is kept, tested); `error` sets `aria-invalid="true"` and `role="alert"`.
- **Keyboard.** The browser's: Enter makes a new line, Tab moves on. Nothing of its own.
- **Focus.** The frame gets a `--border-focus` edge and a 2 px `outline` in `--focus-color`; with an error the outline is `--danger`.
- **Contrast.** As Input: the edge `--border-control` at least 3:1, the text `--fg-1`, the hint `--fg-3`, the error `--danger-fg`.
- **State.** `disabled` on the element, 55% opacity.
- **Target.** At least 88 px tall; `rows` and the resize handle (`resize: vertical`) give more.
- **Motion.** As Input.
- **Built-in text.** "Valgfritt" with `optional`; override with `optionalLabel`.
- **Known limit.** No counter or character limit built in; a limit is the app's to show in `hint`.

## Content

- The label is a noun: "Notes", "Description", "Message".
- `hint` says what is allowed and where it shows: "Markdown works.", "Only you see this."
- `placeholder` is empty, or a short example.
- `error` points on: "Write at least one sentence." Not "Too short".
