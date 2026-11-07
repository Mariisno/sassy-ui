---
name: Textarea
group: inputs
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/textarea/
typer: dist/inputs/Textarea.d.ts
---

# Textarea

A multi-line text input for notes and descriptions, with the same label, hint and error as [Input](Input.en.md). A native `<textarea>` with four visible lines by default (`rows`), at least 88 px tall, and resizable vertically. With `count` and `maxLength` it shows a character count, «12 of 200» in English, that warns from 90 % and reports an error past the limit without stopping the typing.

## When to use

- Text that can get longer than one line: notes, descriptions, a message.
- When people should see several lines of what they wrote while writing.

## When not to

- One line (a name, an email, a number): [Input](Input.en.md).
- Formatted text with a toolbar: that is an editor, which Sassy does not have.
- A choice: [Select](Select.en.md), [Radio](Radio.en.md).

## Do

- Set `rows` by how much people usually write: 3 for a comment, 6–8 for a description.
- Say in `hint` what is allowed: "Markdown works.", "Shown on the project page."
- Give an `error` that points on: "Write at least one sentence."
- Mark the field `optional` when it is; most notes are.

## Don't

- Don't use `placeholder` as an instruction; it disappears as you type.
- Don't set a character limit without showing the count; use `count` with `maxLength`, not `maxLength` alone.
- Don't turn off vertical resizing. It is there for those who need room.
- Don't use `rows={1}`. That is an Input.

## Example

```jsx
import { Textarea } from 'sassy/components';

<Textarea label="Notes" optional optionalLabel="optional" hint="Markdown works." rows={5} />
<Textarea label="Description" error="Write at least one sentence." defaultValue="" />
<Textarea label="Note for the sowing calendar" maxLength={200} count countLang="en" hint="Shown under the day in the calendar." />
```

The count lets you type past the limit and says so instead of stopping you (as GOV.UK does). Check the length when the form is sent, and show the error there, as with every other error:

```jsx
const tooLong = note.length > 200;
<Textarea label="Note" maxLength={200} count countLang="en" value={note} onChange={(e) => setNote(e.target.value)}
  error={sent && tooLong ? 'The note can have at most 200 characters.' : undefined} />
```

## Props

The types are in `dist/inputs/Textarea.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/textarea/).

<!-- props: TextareaProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | The label above the field. |
| `hint` | `string` | – | Help text under the field, linked with `aria-describedby`. |
| `error` | `string` | – | Error message. Replaces the hint, sets `aria-invalid` and is announced. |
| `optional` | `boolean` | – | Adds a quiet "Valgfritt" after the label. |
| `optionalLabel` | `string` | `'Valgfritt'` | Text of the optional marker. Default "Valgfritt". |
| `rows` | `number` | `4` | Visible lines. |
| `count` | `boolean` | `false` | With `maxLength`: a character count under the field, «12 av 200». From 90 % it says how many are left, past the limit how many too many, and the field is invalid; the native limit is left off, so people can type past it and shorten. A screen reader hears the count once typing pauses. Without `count`, `maxLength` is the browser's hard limit, as before. |
| `countLang` | `'nb' \| 'en'` | `'nb'` | The language of the count: `nb` «12 av 200», «18 tegn igjen» (default) or `en` «12 of 200», «18 characters left». |

Plus every attribute of `<textarea>` (`React.TextareaHTMLAttributes<HTMLTextAreaElement>`).
<!-- /props -->

`ref` reaches the native `<textarea>` (tested).

## Accessibility

The links are tested in a browser (the hint and an app's own `aria-describedby` are tested on a Textarea).

- **Element and role.** A native `<textarea>` with a `<label for>` pointing at it.
- **Name.** `label`.
- **Description and error.** As Input: `hint` or `error` in `${id}-hint` with `aria-describedby` (your own is kept, tested); `error` sets `aria-invalid="true"` and `role="alert"`.
- **Character count.** With `count` and `maxLength`: «12 av 200» under the field («12 of 200» with `countLang="en"`), tied with `aria-describedby` after the hint, with a hidden «tegn» («characters») so it reads «12 av 200 tegn». From 90 % «· 18 igjen» («18 left») is in `--warning-fg`, past the limit «· 12 for mye» («12 too many») in `--danger-fg` with an icon, and the field gets `aria-invalid` and the danger edge, so the state is never colour alone. The browser's `maxlength` is left off, so what you paste stays. The count is not a live region; a separate, hidden polite region gets «18 tegn igjen» («18 characters left») once it has been quiet for a second, not on every keystroke (tested in a browser).
- **Keyboard.** The browser's: Enter makes a new line, Tab moves on. Nothing of its own.
- **Focus.** The frame gets a `--border-focus` edge and a 2 px `outline` in `--focus-color`; with an error the outline is `--danger`.
- **Contrast.** As Input: the edge `--border-control` at least 3:1, the text `--fg-1`, the hint `--fg-3`, the error `--danger-fg`.
- **State.** `disabled` on the element, 55% opacity.
- **Target.** At least 88 px tall; `rows` and the resize handle (`resize: vertical`) give more.
- **Motion.** As Input.
- **Built-in text.** "Valgfritt" with `optional`; override with `optionalLabel`.
- **Known limit.** The count counts UTF-16 units, as `maxlength` does, so an emoji can count as two. A form reset with `reset()` while the app does not own the value does not update the count; use `value` then.

## Content

- The label is a noun: "Notes", "Description", "Message".
- `hint` says what is allowed and where it shows: "Markdown works.", "Only you see this."
- `placeholder` is empty, or a short example.
- `error` points on: "Write at least one sentence." Not "Too short".
