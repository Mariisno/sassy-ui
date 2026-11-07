---
name: Badge
group: display
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/badge/
typer: dist/display/Badge.d.ts
---

# Badge

A small pill that shows a status, a version or a count, and cannot be pressed. Seven tones (neutral, accent, success, warning, danger, info, clay) as a soft background with dark text, an optional leading dot, `outline` for a transparent variant with an edge, and `mono` for numbers and versions. The pill sizes itself to the text.

## When to use

- Status on a row or a card: "Done", "Needs review", "Paused".
- A version, count or id in monospace: `v1.2.0`, `12`, `#482`.
- A small keyword by a title: "New", "Beta".
- `dot` when the status has a colour people recognise from elsewhere in the app.

## When not to

- Something that can be pressed, filtered or removed: [Tag](Tag.en.md).
- A whole message or a warning: [Toast](Toast.en.md) or text.
- A number that keeps changing (countdown, progress): text in monospace, or [Progress](Progress.en.md).

## Do

- One or two words, sentence case.
- Pick the tone by meaning, not by colour: `success` for done, `warning` for soon, `danger` for stopped, `info` for information.
- Let `accent` follow the app's accent (`data-accent`); `success` is always moss.
- Put the word in, not only the dot. A colour alone says nothing to many people.

## Don't

- Don't put `onClick` on a Badge. It is a `<span>` without a role, and the keyboard cannot reach it.
- Don't use more than one Badge per row. Then none of them gets read.
- Don't write whole sentences in it.
- Don't use `danger` for everything important; red then loses its meaning.

## Example

```jsx
import { Badge } from 'sassy/components';

<Badge tone="success" dot>Done</Badge>
<Badge tone="warning">Needs review</Badge>
<Badge tone="accent">New</Badge>
<Badge mono outline>v1.2.0</Badge>
```

## Props

The types are in `dist/display/Badge.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/badge/).

<!-- props: BadgeProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'clay'` | `'neutral'` | `accent` follows the app's data-accent (clay, fjord, lichen or lyng); `success` is always moss. |
| `dot` | `boolean` | `false` | Leading status dot |
| `outline` | `boolean` | `false` | Transparent with an edge instead of a fill. |
| `mono` | `boolean` | `false` | Mono font — for versions, counts, IDs |
| `children` | `React.ReactNode` | – | The text, one or two words. |

Plus every attribute of `<span>` (`React.HTMLAttributes<HTMLSpanElement>`).
<!-- /props -->

## Accessibility

- **Element and role.** A `<span>` without a role. It is text, and is read as the text it holds. `id`, `data-*` and `aria-*` reach the element.
- **Keyboard and focus.** None; it cannot be pressed.
- **Name and state.** The text. The dot (`dot`) is an empty `<span>` in `currentColor` and carries no meaning on its own: the word does.
- **Contrast.** `accent` is `--accent-soft-fg` on `--accent-soft`, held at 4.5:1 in both themes and every accent (tested). `neutral` is `--fg-2` on `--surface-2`, 4.5:1 on the surfaces. The status tones are `--<tone>-fg` on `--<tone>-soft`; the theme engine holds each pair at 4.5:1 when you make your own theme (tested). `outline` is `--fg-2` on transparent with a `--border-strong` edge.
- **Text.** 12 px medium, or DM Mono 400 with `mono`. The pill sizes itself to the text and never clips it (0.5.3, WCAG 1.4.4).
- **Motion.** None.
- **Built-in text.** None.
- **Known limit.** `tone="clay"` is always clay, whatever the accent; it is for project colours, not status.

## Content

- One word when it works: "Done", "Paused", "New".
- Past tense or a state, never an action: "Archived", not "Archive".
- Numbers and versions in `mono`, no space between letter and number: `v1.2.0`.
- The same word for the same status across the app.
