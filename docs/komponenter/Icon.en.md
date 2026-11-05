---
name: Icon
group: icon
status: stable
since: 0.2.0
kort: components/icon/icon.card.html
typer: components/icon/Icon.d.ts
---

# Icon

A Lucide icon drawn inline as SVG, so it inherits `currentColor` and Sussi's stroke width of 1.75 (softer than Lucide's 2). The set is 101 icons in `components/icon/iconData.js`: 100 from Lucide and one drawn for Sussi (`yarn`, a ball of yarn). Decorative by default (`aria-hidden`); with `title` it is a named image. A name that is not in the set renders nothing.

## When to use

- Every glyph in a Sussi interface: in buttons, menus, rows, empty states.
- An icon that carries meaning on its own (a status column without text): with `title`.
- 16 px in dense rows and buttons, 18 px (default) next to 14 px text, 20–24 px standalone or in a card.

## When not to

- Emoji: never in a Sussi interface. Use an icon from the set.
- An illustration or a picture: that is not an icon.
- The mascot: [Sussi](Sussi.en.md).
- An icon that is not in the set: fetch it from Lucide and add it to both `iconData.js` and `assets/icons/` first. An unknown name renders nothing, and `tests/icon-names.test.mjs` guards the cards and prompts.

## Do

- Put an icon next to text, not instead of text, in navigation and buttons.
- Let the colour inherit: `--fg-2` or `--fg-3` as a rule, `--accent-text` for the rare feature icon.
- Give `title` only when the icon says something the text beside it does not.
- Use the same icon for the same thing across the app.

## Don't

- Don't fill the icon or use several colours. The set is stroke, one colour.
- Don't put `title` on an icon next to text that says the same; it is then read twice.
- Don't scale with CSS; set `size`.
- Don't add an icon font or another set beside it.

## Example

```jsx
import { Icon } from 'sussi/components';

<Icon name="leaf" />
<Icon name="check" size={16} style={{ color: 'var(--success)' }} />
<Icon name="circle-alert" size={20} title="Needs review" />
<Icon name="yarn" size={24} strokeWidth={2} />
```

## Props

The types are in `components/icon/Icon.d.ts`. The card with the whole set: `components/icon/icon.card.html`.

<!-- props: IconProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | *required* | Lucide icon name, e.g. "house", "check", "chevron-down", "leaf". See components/icon/iconData.js for the full shipped set. |
| `size` | `number` | `18` | Pixel size. 16 in dense UI, 18 default, 20–24 for standalone. |
| `strokeWidth` | `number` | `1.75` | Stroke width. Sussi default is 1.75 (softer than Lucide's 2). |
| `title` | `string` | – | Accessible label. Omit for decorative icons. |

Plus every attribute of `<svg>` (`React.SVGProps<SVGSVGElement>`), except `name`.
<!-- /props -->

## Accessibility

- **Element and role.** An `<svg>` with `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`. Without `title`: `aria-hidden="true"`, no role. With `title`: `role="img"` and a `<title>` element inside.
- **Name.** `title`. The text goes into raw SVG markup, so it is escaped; a project name with `<` or `&` from a user becomes text, not markup (tested in `tests/icon.e2e.test.mjs`).
- **Keyboard and focus.** None; the icon is not interactive. In a button, the button has the focus.
- **Contrast.** The icon is `currentColor`. Next to text it follows the text's colour and contrast. On its own as information (a status icon) 3:1 for graphics applies; that is the app's choice of colour.
- **Motion.** None.
- **Built-in text.** None.
- **Known limit.** A name that does not exist gives `null`, with no warning in the browser. `tests/icon-names.test.mjs` catches it in the cards and prompts, not in an app that uses Sussi.

## Content

- `title` is a noun or a short state: "Needs review", "Done", "New".
- Not "icon" in `title`; the screen reader says "image".
- The icon needs no text when it sits in an [IconButton](IconButton.en.md) (the button has `label`) or next to text.
