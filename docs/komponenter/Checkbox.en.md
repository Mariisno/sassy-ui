---
name: Checkbox
group: controls
status: stable
since: 0.2.0
kort: components/controls/controls.card.html
typer: components/controls/Checkbox.d.ts
---

# Checkbox

A checkbox for independent yes/no choices and task lists. A native `<input type="checkbox">` inside a `<label>`, with a drawn box (18 px, 5 px corners) that fills with the accent when checked, an optional `description` under the text, and `indeterminate` for "some of these".

## When to use

- Several choices that do not exclude each other: which days, which categories.
- A task that can be ticked off.
- A choice in a form that is saved with a button ("Remember me", "Email me a weekly summary").
- `indeterminate` on a "select all" when only some below are selected.

## When not to

- One choice among a few: [Radio](Radio.en.md).
- A setting that applies at once, with no save button: [Switch](Switch.en.md).
- Many choices as filters in a row: [Tag](Tag.en.md) with `selected`.
- A row that opens something: [ListItem](ListItem.en.md). Something to tick off is a Checkbox, not a row.

## Do

- Always give `label`. The box alone says nothing.
- Write the text as what becomes true when the box is checked: "Email me a weekly summary".
- Use `description` for the short addition ("Mondays, 08:00"), not a new sentence with another choice.
- Set `indeterminate` from the app's state; the component sets it on the native input.

## Don't

- Don't use it for a choice that should be saved at once. People then wait for a save button that is not there.
- Don't phrase the text as a question or a negation ("Don't send email"). Double negatives are hard.
- Don't put a link or a button inside `label`; the whole label is the click target.
- Don't use `disabled` as "not in your plan" without saying so beside it.

## Example

```jsx
import { Checkbox } from 'sussi/components';

<Checkbox label="Write test plan" defaultChecked />
<Checkbox label="Email me a weekly summary" description="Mondays, 08:00" checked={weekly} onChange={(e) => setWeekly(e.target.checked)} />
<Checkbox label="Select all" indeterminate={someSelected} checked={allSelected} onChange={selectAll} />
```

## Props

The types are in `components/controls/Checkbox.d.ts`. The card with Checkbox, Radio and Switch: `components/controls/controls.card.html`.

<!-- props: CheckboxProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | The text beside the box. |
| `description` | `React.ReactNode` | – | A line under the text, in `--fg-3`. |
| `indeterminate` | `boolean` | `false` | Partly checked (a dash instead of a tick). Set on the native input. |

Plus every attribute of `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), except `type`.
<!-- /props -->

`ref` reaches the native `<input>`, and `indeterminate` still works when the app has its own `ref` (`tests/refs.e2e.test.mjs`).

## Accessibility

- **Element and role.** A native `<input type="checkbox">` inside `<label>`. The input is visually hidden (`opacity:0`, 0 × 0 px); the box beside it draws the state.
- **Name.** The text in `label` and `description`, through `<label>`. Both become part of the name. Without `label` the input has no name: pass `aria-label` yourself.
- **Keyboard.** Space toggles, like any checkbox. Nothing of its own.
- **State.** `checked` and `indeterminate` on the native input (`indeterminate` is set as a property in an effect). Checked fills the box with `--accent` and shows a tick in `--accent-fg`; `indeterminate` shows a dash. `disabled` gives 50% opacity and `not-allowed`.
- **Focus.** The box gets a 2 px `outline` in `--focus-color` with a 2 px offset when the input has keyboard focus (`.s-check__input:focus-visible + .s-check__box`).
- **Contrast.** The box edge is `--border-control`, held at 3:1 or more against `--bg`, `--surface-1` and `--surface-2` in both themes and every accent (`tests/contrast.test.mjs`, `tests/focus.test.mjs`). The tick is `--accent-fg` on `--accent`, 4.5:1.
- **Motion.** The fill and the tick transition on `--dur-fast`, 0 under reduced motion.
- **Target.** The box is 18 px; the click target is the whole label (box plus text, about 22 px tall). Known limit: under 44 px on touch. Give the row room in the app when it sits in a list for fingers.
- **Built-in text.** None.

## Content

- The text is a statement that is true when the box is checked: "Show completed tasks".
- Short. Move the explanation to `description`: "Mondays, 08:00", "Only you see this".
- No full stop after the text; a full stop in `description` only when it is a whole sentence.
- Several boxes under each other start with the same kind of word (all verbs or all nouns).
