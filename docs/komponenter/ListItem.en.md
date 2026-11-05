---
name: ListItem
group: display
status: stable
since: 0.3.0
kort: components/display/listitem.card.html
typer: components/display/ListItem.d.ts
---

# ListItem

A row that opens something: a project, a recipe, a plant. With `href` it is a link, with `onClick` a button, and with neither a plain row. In front sits an icon (a 40 px square) or an image (48 × 48), then the title and a meta line, and at the end a chevron when the row opens something. At least 56 px tall, with a fixed lead column so the titles line up in a list that mixes icons and images.

## When to use

- Lists where every row leads to a detail page: projects, sessions, recipes.
- Rows that open a sheet or a dialog (`onClick`).
- A row with no destination, showing only title and meta, when the rest of the list is rows that open something.

## When not to

- Something to tick off: [Checkbox](Checkbox.en.md).
- A row that expands in place: [Disclosure](Disclosure.en.md).
- A row with several actions (edit, delete): put the actions on the detail page, or use a [Card](Card.en.md) with buttons.
- Content people read rather than navigate: text and [Card](Card.en.md).

## Do

- Use `href` when the app has routes. The row can then open in a new tab, and the screen reader says "link".
- Put what tells the rows apart in `meta`: "25 % · 3 beds", "Quick weeknight dinner · 20 min".
- Keep `children` to phrasing content (`span`, text, Badge, a Progress bar), because the row is an `<a>` or a `<button>`.
- Give `imageAlt` only when the picture says something the title does not.
- Use `trailing` for a [Badge](Badge.en.md) when the status matters more than the chevron.

## Don't

- Don't put buttons or links inside the row. The whole row is the target, and a button in a button is invalid.
- Don't put `<div>`, `<p>` or headings in `children`.
- Don't hide the chevron (`trailing={null}`) unless the list is obviously navigation.
- Don't `disabled` without saying why in `meta`.

## Example

```jsx
import { ListItem, Badge, Progress } from 'sussi/components';

<ListItem href="#/recipe/soup" icon="book-open" title="Lentil soup" meta="Quick weeknight dinner · 20 min" />
<ListItem onClick={openProject} image={cover} title="Tomatoes" meta="25 % · 3 beds">
  <Progress value={25} label="Progress" />
</ListItem>
<ListItem icon="archive" title="Last year's seeds" meta="8 packets" />
<ListItem href="#/p/1" title="Basil" trailing={<Badge tone="success">Done</Badge>} />
<ListItem href="#/p/2" onClick={closeSheet} title="Mint" />
```

## Props

The types are in `components/display/ListItem.d.ts`. The card: `components/display/listitem.card.html`.

<!-- props: ListItemProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | *required* | The title, required. |
| `meta` | `React.ReactNode` | – | Second line, e.g. "25 % · 3 beds". |
| `icon` | `string` | – | Lucide icon name, shown in a 40 px square. |
| `image` | `string` | – | Image URL, shown 48 × 48. Decorative unless imageAlt is given. |
| `imageAlt` | `string` | `''` | What the image shows, when it adds something the title doesn't. Default "" (decorative). |
| `leading` | `React.ReactNode` | – | Anything else in front, instead of icon or image. |
| `trailing` | `React.ReactNode` | – | The trailing slot. Default: a chevron when the row opens something. Pass null to hide it. |
| `href` | `string` | – | Makes the row a link. |
| `onClick` | `(e: React.MouseEvent<HTMLElement>) => void` | – | Makes the row a button when there's no href. With href it still runs (e.g. to close a sheet first). |
| `disabled` | `boolean` | – | A button gets disabled; a link gets aria-disabled="true" and loses href and onClick. |
| `children` | `React.ReactNode` | – | Extra content under the meta line, e.g. a progress bar. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`), except `title`, `onClick`.
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/listitem.e2e.test.mjs`.

- **Element and role.** `<a href>` with `href`, `<button type="button">` with `onClick`, otherwise `<div>`. A row with no destination is not focusable and has no chevron.
- **Name.** Title and meta, with a space between them in the accessible name ("Lentil soup Quick weeknight dinner · 20 min"). The text in `children` becomes part of the name too. The image is decorative (`alt=""`) without `imageAlt`.
- **Keyboard.** Enter and Space on a button row, Enter on a link row (tested). A link with `onClick` runs it on click and on Enter.
- **State.** `disabled` on a button is `disabled`; on a link it is `aria-disabled="true"`, and `href` and `onClick` are removed, so it goes nowhere. Both are 50% opacity.
- **Focus.** The standard focus ring, 2 px `--focus-color` (tested visible on both the link and the button).
- **Contrast.** Title `--fg-1`, meta `--fg-2`, chevron `--fg-3` going to `--fg-1` on hover, all on `--surface-1`. The row inherits Sussi's font as a button too (`font:inherit`).
- **Target.** At least 56 px tall (tested ≥ 44). A long title wraps and keeps the chevron in view at 320 px.
- **Motion.** Transitions on `--dur-fast`; a press moves it 1 px down.
- **Built-in text.** None.
- **Known limit.** As an `<a>` or `<button>` the row takes phrasing content only. A progress bar is fine ([Progress](Progress.en.md) is a `<span>`), a `<div>` is not.

## Content

- The title is the name of the thing: "Tomatoes", "Lentil soup".
- `meta` is one line with what tells the rows apart, separated by " · ": "25 % · 3 beds".
- Numbers and time in meta are short: "20 min", "yesterday", not "20 minutes ago yesterday".
- The chevron needs no text. If the row has to say "open", the title is wrong.
