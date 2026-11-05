---
name: IconButton
group: buttons
status: stable
since: 0.2.0
kort: components/buttons/buttons.card.html
typer: components/buttons/IconButton.d.ts
---

# IconButton

A square button with only an icon, for toolbars, row actions and the corner of a dialog. `label` is required and becomes both `aria-label` and `title`, so the button always has a name. Three variants (ghost, secondary, primary), three sizes (30, 38, 46 px) and `round` for floating actions.

## When to use

- An action whose icon everyone knows: close (×), more (…), search, settings, add.
- Where there is no room for text: in a row, in a toast, at the top of a dialog.
- A floating action at the bottom of a phone page, with `round` and `variant="primary"`.

## When not to

- When the icon is not obvious: use [Button](Button.en.md) with `iconLeft` and text. Text next to the icon is the rule in Sussi, not the exception.
- The primary action on a page: [Button](Button.en.md). An icon alone does not carry that much weight.
- A colour dot that gets picked: [Swatch](Swatch.en.md).

## Do

- Give `label` what the button does: "Close", "More", "Add task". That is the whole name.
- Wrap it in a [Tooltip](Tooltip.en.md) when the meaning is not certain. Tooltip removes the `title`, so there is only one bubble.
- Stay with the icons in the set (`components/icon/iconData.js`).
- Use `size="lg"` on touch screens; `md` is 38 px.

## Don't

- Don't leave out `label`. Without it the button is silent for a screen reader.
- Don't rely on colour alone: `primary` is for the one floating action, not decoration.
- Don't use two different icons for the same action in one app.
- Don't put text inside it. That is a Button.

## Example

```jsx
import { IconButton, Tooltip } from 'sussi/components';

<IconButton icon="ellipsis" label="More" onClick={openMenu} />
<IconButton icon="plus" label="Add task" variant="secondary" size="sm" onClick={newTask} />
<Tooltip content="Search" kbd="⌘K"><IconButton icon="search" label="Search" onClick={search} /></Tooltip>
<IconButton icon="arrow-up-right" label="Open" variant="primary" round />
```

## Props

The types are in `components/buttons/IconButton.d.ts`. The card: `components/buttons/buttons.card.html` (the "icon" row).

<!-- props: IconButtonProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | *required* | Lucide icon name |
| `label` | `string` | *required* | Accessible label — required |
| `variant` | `'ghost' \| 'secondary' \| 'primary'` | `'ghost'` | ghost (no chrome), secondary (surface and edge), primary (accent fill). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px square. |
| `round` | `boolean` | `false` | Round, for floating actions. |

Plus every attribute of `<button>` (`React.ButtonHTMLAttributes<HTMLButtonElement>`).
<!-- /props -->

`ref` reaches the native `<button>` (`tests/refs.e2e.test.mjs`).

## Accessibility

- **Element and role.** A native `<button type="button">`.
- **Name.** `label` is set as `aria-label` and `title`. The icon is decorative (`aria-hidden`). Inside a Tooltip the `title` is removed, and the bubble is linked to the button with `aria-describedby` (`tests/tooltip.e2e.test.mjs`).
- **Keyboard.** Enter and Space, like any button.
- **Focus.** A 2 px `outline` in `--focus-color` on keyboard focus, 3:1 against the surfaces in both themes and every accent.
- **Contrast.** The ghost variant is `--fg-2` on transparent and goes to `--fg-1` on hover. `primary` is `--accent-fg` on `--accent`, 4.5:1 in every accent. An `<a class="s-iconbtn">` is not underlined (0.5.6) and holds 4.5:1 on hover (`tests/linkbutton.e2e.test.mjs`).
- **State.** `disabled` on the element, 50% opacity.
- **Motion.** Transitions on `--dur-fast`, 0 under reduced motion. A press moves it 1 px down.
- **Target.** 30, 38 and 46 px square. Only `lg` reaches 44 px.
- **Built-in text.** None; `label` is the app's.

## Content

- `label` is a verb, or what the verb points at: "Close", "More", "Search", "Settings".
- The same word as in the rest of the app. If the dialog says "Close", this says "Close".
- Not "Click here to …". The screen reader already says "button".
- The tooltip repeats `label`, with the shortcut in `kbd` when there is one.
