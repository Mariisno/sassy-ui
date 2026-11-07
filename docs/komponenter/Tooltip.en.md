---
name: Tooltip
group: overlays
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/tooltip/
typer: dist/overlays/Tooltip.d.ts
---

# Tooltip

A short label shown on hover and focus, after 300 ms, for icon buttons and shortcuts. The bubble is linked to the trigger with `aria-describedby`, the trigger's native `title` is removed so there is only one bubble, Esc hides the bubble without moving the mouse or focus, and the mouse can move from the trigger onto the bubble without it closing (WCAG 1.4.13). `kbd` shows a keyboard shortcut in monospace.

## When to use

- An [IconButton](IconButton.en.md) whose icon is not obvious to everyone.
- A shortcut: "Search" + `kbd="⌘K"`.
- A short addition to something that already has a name: "Saves automatically".

## When not to

- Information people must have: write it in the interface. A tooltip is a description, not a name, and does not exist on touch screens.
- Long text or links: [Dialog](Dialog.en.md) or text on the page.
- Error messages: `error` on the field.
- An element that cannot take focus (text, an icon on its own): the keyboard then never reaches the bubble.

## Do

- Wrap one element that can take focus, such as an IconButton or Button.
- Keep `content` to a few words; the bubble wraps at 260 px.
- Let the text repeat the button's `label`, with the shortcut in `kbd` when there is one.
- Use `side="bottom"` when the bubble would otherwise end up above the top of the screen.

## Don't

- Don't put anything clickable inside the bubble.
- Don't use a Tooltip as the only name of a button; `label` on IconButton is the name.
- Don't pass several elements as `children`; only one gets `aria-describedby`.
- Don't use `open` in production; it is for docs and cards.

## Example

```jsx
import { Tooltip, IconButton } from 'sassy/components';

<Tooltip content="Search" kbd="⌘K"><IconButton icon="search" label="Search" onClick={search} /></Tooltip>
<Tooltip content="Saves automatically" side="bottom"><IconButton icon="cloud" label="Sync" /></Tooltip>
```

## Props

The types are in `dist/overlays/Tooltip.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/tooltip/).

<!-- props: TooltipProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `React.ReactNode` | *required* | The text in the bubble. |
| `kbd` | `string` | – | Keyboard shortcut shown in mono, e.g. "⌘K" |
| `side` | `'top' \| 'bottom'` | `'top'` | Above or below the trigger. |
| `open` | `boolean` | `false` | Force visible (for docs/previews) |
| `children` | `React.ReactNode` | *required* | One element, e.g. an IconButton. It gets aria-describedby pointing at the bubble. |
| `id` | `string` | – | Id of the bubble. Defaults to one from React.useId(). |
| `className` | `string` | – | Classes on the wrapper. |

Plus every attribute of `<span>` (`React.HTMLAttributes<HTMLSpanElement>`), except `content`.
<!-- /props -->

## Accessibility

The behaviour is tested in a browser.

- **Element and role.** A `<span class="s-tip">` around the trigger and a `<span role="tooltip" id>` for the bubble. The trigger is cloned with `aria-describedby` pointing at the bubble (your own `aria-describedby` is kept in front, tested) and without `title` (tested; an IconButton outside a Tooltip keeps its own).
- **Name and description.** The bubble is a description of the trigger, not a name. The trigger's name is its own (`label`).
- **Showing.** Hover or focus inside the wrapper shows the bubble after 300 ms (`transition-delay`); `open` shows it with no delay.
- **Keyboard.** Tab to the trigger shows the bubble. Esc hides it while focus or the mouse stays put (both tested), and the next hover or focus shows it again (tested).
- **Pointer.** The shown bubble takes the pointer, and an invisible bridge covers the 8 px between trigger and bubble, so the mouse can move up onto the bubble (tested). A hidden bubble does not catch the mouse (tested).
- **Contrast.** `--fg-inverse` on `--surface-inverse`, 12 px medium. `kbd` is monospace at 65% opacity; it is an addition, not the only carrier of the shortcut.
- **Text.** Wraps at `min(260px, 100vw − 32px)` instead of clipping (0.5.3).
- **Motion.** Fades and moves 4 px on `--dur-fast`, 0 under reduced motion. The 300 ms delay is fixed.
- **Built-in text.** None.
- **Known limits.** The bubble is centred above or below the trigger and does not move away from the screen edge; use `side` where needed. On touch there is no hover; what the bubble says must also exist somewhere else.

## Content

- The same word as the button's `label`: "Search", "Settings". Not a new wording.
- A few words, no full stop, no "Click to …".
- The shortcut in `kbd` with symbols: "⌘K", "Ctrl+K".
- An addition can be a short sentence without a full stop: "Saves automatically".
