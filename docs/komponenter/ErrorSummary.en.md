---
name: ErrorSummary
group: feedback
status: new
since: 0.7.0
kort: components/feedback/errorsummary.card.html
typer: components/feedback/ErrorSummary.d.ts
---

# ErrorSummary

The box at the top of a form after a failed submit, as GOV.UK and Designsystemet do it: a title, an optional line and one link per field with an error. It takes the focus when it appears, so people hear what went wrong and the page scrolls to it; each link moves the focus to its field, or to the first control in a [Fieldset](Fieldset.en.md). The app owns the list: mount the box when the submit fails, remove it when the form is valid.

## When to use

- A form with several fields where the submit stopped on errors, above all when the fields do not fit on one screen.
- The form is validated on submit, not while typing.
- The errors are also under the fields (`error` on Input, Fieldset): the box is the way in to them, not the replacement.

## When not to

- One error in one visible field: `error` on [Input](Input.en.md) or [Fieldset](Fieldset.en.md) alone.
- An error about the whole form and no field ("The connection dropped"): a [Toast](Toast.en.md) or a message above the button.
- Something that must be answered before going on: [Dialog](Dialog.en.md).

## Do

- Mount the box above the first field when the submit fails, and remove it when the form is valid.
- Give it a new `key` (a submit counter) on the next failed attempt, so the focus moves to it again.
- One entry per field, in the form's order, with the field's `id` and the same text as under the field.
- Point at the Fieldset's `id` for a radio or checkbox group: the focus lands on the first control in the group.
- Pick `level` by the page's heading levels; the default is `h2`.

## Don't

- Do not leave the box when the errors are fixed, and do not update the list while typing.
- Do not link to something that is not on the page; the link then becomes a plain anchor jump.
- Not a different text in the box than under the field. It is the same error.
- Not `autoFocus={false}` without telling in another way: without focus and without a `role` the box says nothing.

## Example

```jsx
import { ErrorSummary, Input, Fieldset, Radio, Button } from 'sussi/components';

const [errors, setErrors] = useState([]);
const [attempt, setAttempt] = useState(0);
const submit = (e) => {
  e.preventDefault();
  const found = [];
  if (!name.trim()) found.push({ id: 'name', message: 'Enter the plant’s name.' });
  if (!sun) found.push({ id: 'sun', message: 'Pick how much sun the spot gets.' });
  setErrors(found);
  setAttempt(attempt + 1);
};
const errorFor = (id) => errors.find((f) => f.id === id)?.message;

<form onSubmit={submit} noValidate>
  {errors.length > 0 && <ErrorSummary key={attempt} title="Something needs fixing before you go on" errors={errors}>Fix the errors below, then you can save.</ErrorSummary>}
  <Input id="name" label="Plant name" value={name} onChange={(e) => setName(e.target.value)} error={errorFor('name')} />
  <Fieldset id="sun" legend="How much sun does the spot get?" error={errorFor('sun')}>
    <Radio name="sun" value="full" label="Full sun" checked={sun === 'full'} onChange={() => setSun('full')} />
    <Radio name="sun" value="shade" label="Shade" checked={sun === 'shade'} onChange={() => setSun('shade')} />
  </Fieldset>
  <Button type="submit">Save</Button>
</form>
```

## Props

The types are in `components/feedback/ErrorSummary.d.ts`. The card: `components/feedback/errorsummary.card.html`.

<!-- props: ErrorSummaryProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | `'Noe må rettes før du kan gå videre'` | The heading. Default "Noe må rettes før du kan gå videre"; English surfaces pass "Something needs fixing before you go on". |
| `errors` | `ErrorSummaryItem[]` | `[]` | The fields with an error, in the order they are in the form. |
| `autoFocus` | `boolean` | `true` | Move the focus to the box when it mounts. Default true. Give the box a new `key` on the next failed submit so it moves again. |
| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `2` | Heading level of the title, 2–6. Default 2. Pick the one that fits the page outline. |
| `children` | `React.ReactNode` | – | One line under the title, e.g. "Rett feilene under, så kan du lagre." |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`), except `title`.
<!-- /props -->

Each entry in `errors`:

<!-- props: ErrorSummaryItem -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | – | The `id` of the control, or of the Fieldset when the error is about a group. Without it the message is plain text, not a link. |
| `message` | `React.ReactNode` | *required* | The same message as under the field: "Skriv navnet på planten." |
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/errorsummary.e2e.test.mjs`, the colour rules in `tests/errorsummary.test.mjs`.

- **Element and role.** A `<section tabIndex={-1}>` with `aria-labelledby` to the title (a named region). The content sits in a `<div role="alert">`, so it is read even where focus on a region reads only the name. This is GOV.UK's pattern.
- **Name.** The title, `h2` by default (`level`), with a `circle-alert` icon before it that is `aria-hidden`.
- **Focus.** The box takes the focus when it mounts (`autoFocus`, tested: the focus moves from the button to the box). The ring shows on `:focus`, not only `:focus-visible`, so it is seen after a mouse click on the button too. The links are plain `<a href="#id">`; on click the focus moves to the element with that id, or to the first control inside it when it is a Fieldset, and the group's legend is scrolled into view (both tested). When the element does not exist, the plain anchor jump happens.
- **Keyboard.** Tab from the box goes to the first link, then on through the document. Enter on a link is the click.
- **Contrast.** The border is `--danger`, ≥ 3:1 on `--bg` in both themes and every accent (1.4.11). The links and the icon are `--danger-fg` on `--surface-1`, ≥ 4.5:1 in both themes and every accent (`tests/errorsummary.test.mjs` measures the token pairs, `tests/errorsummary.e2e.test.mjs` the rendered colours). The links are underlined, so colour is not alone.
- **Width.** A flex column with ordinary wrapping; nothing overflows at 320 px (tested).
- **Motion.** None.
- **Built-in text.** "Noe må rettes før du kan gå videre" as the title. Override with `title`.
- **Known limits.** Some screen readers read the box twice (focus and alert), as with GOV.UK. On a failed submit the fields' own `role="alert"` regions mount at the same time as the box, and not all of them are guaranteed to be read; the focus on the box is the reliable signal, which is why the box takes it. VoiceOver does not read `aria-describedby` on a Fieldset and reads the legend only when the focus enters the first control, so the link to a group lands on that control. `scrollIntoView` only scrolls when the legend is off screen.

## Content

- The title says something must be fixed, not that people did wrong: "Something needs fixing before you go on".
- The line under it is optional and says what happens next: "Fix the errors below, then you can save."
- Each link is the field's error text, word for word: "Enter the plant’s name.", "Pick how much sun the spot gets."
- No exclamation marks, no "Error!"; see the word list in `docs/content.en.md`.
