---
name: Button
group: buttons
status: stable
since: 0.2.0
kort: components/buttons/buttons.card.html
typer: components/buttons/Button.d.ts
---

# Button

The button is the ordinary action in Sussi: one primary per view, secondary and ghost for the rest. Five variants (primary, secondary, soft, ghost, danger), three sizes (30, 38 and 46 px), an icon before or after the text, and a `loading` state that swaps the icon for a spinner and turns the button off without losing focus. It renders as a link with `as="a"`.

## When to use

- An action that does something when pressed: save, add, delete, continue.
- The one main action on a page or in a dialog is `primary`. The alternatives are `secondary` or `ghost`.
- `danger` for what cannot be undone, at the bottom of a confirmation dialog.
- `soft` for an action that should be seen a little, without competing with the primary one.

## When not to

- An icon alone, no text: use [IconButton](IconButton.en.md), which always has an accessible name.
- Picking a file: use [FileButton](FileButton.en.md), a button around a file input.
- Going to another page: a plain link (`<a>`), or `Button as="a"` when the link should look like a button.
- Turning something on or off: [Switch](Switch.en.md) or [Checkbox](Checkbox.en.md).
- Choosing between views: [Tabs](Tabs.en.md).

## Do

- One `primary` per view. Several primaries means none is.
- Say what happens, verb first: "Save changes", "Add task", "Delete project".
- Use `size="lg"` (46 px) where people tap with a finger. `md` is 38 px, under the 44 px Sussi wants on touch.
- Set `loading` while something saves, so it cannot be pressed twice.
- Undo in a toast rather than a confirmation dialog when the action can be reversed.

## Don't

- Don't write "OK", "Submit" or "Yes". The button names the outcome.
- Don't use `danger` for something that can be undone. A plain button and an "Undo" toast is enough.
- Don't make an icon button out of Button by leaving out the text. That is IconButton.
- Don't set `disabled` on a button without saying why somewhere else. People cannot see what is missing.

## Example

```jsx
import { Button } from 'sussi/components';

<Button onClick={save}>Save changes</Button>
<Button variant="secondary" iconLeft="plus" onClick={create}>New project</Button>
<Button variant="ghost" size="sm" onClick={cancel}>Cancel</Button>
<Button variant="danger" iconLeft="trash-2" onClick={remove}>Delete project</Button>
<Button loading>Saving</Button>
<Button as="a" href="#/archive" variant="soft" iconRight="arrow-right">See the archive</Button>
```

## Props

The types are in `components/buttons/Button.d.ts`. The card with every variant, size and state: `components/buttons/buttons.card.html`.

<!-- props: ButtonProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'danger'` | `'primary'` | primary (accent fill), secondary (surface and edge), soft (soft accent), ghost (no chrome), danger. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px tall. |
| `iconLeft` | `string` | – | Lucide icon name shown before the label. |
| `iconRight` | `string` | – | Lucide icon name shown after the label (e.g. "arrow-right"). |
| `loading` | `boolean` | `false` | Shows a spinner instead of the left icon, hides the right one, and turns the button off while it keeps focus (`aria-disabled`, `aria-busy`). |
| `fullWidth` | `boolean` | `false` | Fills the width. |
| `as` | `'button' \| 'a'` | `'button'` | Render as another element, e.g. "a" for links. |
| `href` | `string` | – | Link target when `as="a"`. |
| `children` | `React.ReactNode` | – | The text on the button. |

Plus every attribute of `<button>` (`React.ButtonHTMLAttributes<HTMLButtonElement>`).
<!-- /props -->

`ref` reaches the native `<button>`, so an app can move focus to it (tested in `tests/refs.e2e.test.mjs`).

## Accessibility

- **Element and role.** A native `<button type="button">` (`type` can be overridden, e.g. `type="submit"`). With `as="a"` it is an `<a>` and takes `href`; `disabled` then has no effect, and the keyboard uses Enter alone.
- **Keyboard.** Enter and Space press it, like any button. Nothing of its own.
- **Name.** The text in `children`. The icons are decorative (`aria-hidden`), so a button without text has no name: use IconButton.
- **State.** `disabled` on the element takes the button out of the tab order. `loading` sets `aria-disabled="true"` and `aria-busy="true"` instead, and stops the click (and the form submit): native `disabled` would move focus to the top of the page mid-submit, and a screen reader would lose its place. For a button that is off but should stay reachable, for example with a [Tooltip](Tooltip.en.md) that says why, pass `aria-disabled` instead of `disabled`: it looks off, does nothing, and keeps focus. Both are 50% opacity with a `not-allowed` cursor.
- **Focus.** A 2 px `outline` in `--focus-color` with a 2 px offset, on keyboard focus only (`:focus-visible`). The ring is an `outline`, so it survives forced-colors mode too. `--focus-color` holds 3:1 against `--bg`, `--surface-1` and `--surface-2` in both themes and every accent (`tests/contrast.test.mjs`).
- **Contrast.** The text on the primary button holds 4.5:1 on the accent in both themes and every accent, also on hover and press. A link with the button classes keeps readable text on hover (`tests/linkbutton.e2e.test.mjs`). The danger button's text is `--danger-fg-on` (white in light mode, near-black in dark), 4.5:1 on `--danger` and `--danger-hover` in both themes and every accent (`tests/contrast.test.mjs`).
- **Press.** Moves 1 px down, no scaling.
- **Motion.** The transitions use `--dur-fast`, which is 0 under `prefers-reduced-motion`. Under reduced motion the `loading` spinner stands still and pulses instead.
- **Target.** 30, 38 and 46 px tall. Only `lg` reaches the 44 px Sussi asks for on touch.
- **Built-in text.** None. The button says what you pass in.

## Content

- Verb first, sentence case: "Save changes", not "SAVE" or "Save Changes".
- One to three words. Anything longer belongs in the text above the button.
- Name the object when there is any doubt: "Delete project", not "Delete".
- The primary button in a dialog repeats what the title asks: "Delete the project?" → "Delete project". The alternative says what happens instead: "Keep it".
- No exclamation marks, no emoji. An arrow (→) is fine in `iconRight`, not in the text.
