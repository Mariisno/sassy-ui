---
name: Swatch
group: display
status: stable
since: 0.4.0
kort: components/display/swatch.card.html
typer: components/display/Swatch.d.ts
---

# Swatch

A colour dot: the colour of a garment, a flower, a project. Without `onClick` it is a plain dot, named by `label` or hidden from screen readers without one. With `onClick` it is a toggle button (`aria-pressed`) with a 44 px target and a ring when selected. A hex colour under 3:1 against the page gets a firmer edge in that theme, so white shows on light and black on dark.

## When to use

- Showing the colour of a thing next to its name, in a [ListItem](ListItem.en.md) `leading`.
- Picking one or more colours: a row of Swatches as buttons, in a named group.
- Filtering by colour.

## When not to

- Status (done, paused): [Badge](Badge.en.md). A colour without a name says nothing.
- A choice that has text: [Tag](Tag.en.md) or [Radio](Radio.en.md).
- A large colour area or a colour picker with a wheel: that is not a dot.

## Do

- Always give a button a `label`: the colour's name ("Navy"). The dot alone is mute.
- Set `pressed` from the app's state when it is a toggle; the selection shows as a ring, not only a colour.
- Wrap several buttons in an element with `role="group"` and an `aria-label`.
- Put many dots in a [ScrollRow](ScrollRow.en.md) on a phone instead of wrapping one dot onto the next line.

## Don't

- Don't use a dot without `label` as the only carrier of information. Without a name it is `aria-hidden`.
- Don't set `pressed` on a button that is not a toggle (say, "open the colour picker"). Leave it `undefined`.
- Don't give it any other shape than round; then it is not a Swatch.
- Don't show more than one selection by colour alone. The ring is the selection.

## Example

```jsx
import { Swatch, ListItem } from 'sussi/components';

<Swatch color="#1F3A5F" label="Navy" />
<div role="group" aria-label="Colour">
  {colours.map((c) => <Swatch key={c.id} color={c.hex} label={c.name} pressed={picked === c.id} onClick={() => pick(c.id)} />)}
</div>
<ListItem title="Tulips" leading={<Swatch color="#B58AA0" />} />
```

## Props

The types are in `components/display/Swatch.d.ts`. The card, shared with ScrollRow: `components/display/swatch.card.html`.

<!-- props: SwatchProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `string` | *required* | Any CSS colour. A hex value (#rgb or #rrggbb) also gets the edge check. |
| `label` | `string` | – | The colour's name, e.g. "Navy". Required when it is a button; without it a plain dot is decorative. |
| `pressed` | `boolean` | – | Selected. Only on the button form; leave undefined for a button that is not a toggle. |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | – | Makes it a button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 16 px, md 22 px, lg 26 px dot. Default md. The button target is 44 px either way (34 px with a mouse). |
| `disabled` | `boolean` | – | Disabled. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`), except `onClick`, `color`.
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/nye.e2e.test.mjs`.

- **Element and role.** Without `onClick`: a `<span>` with `role="img"` and `aria-label` when `label` is given, otherwise `aria-hidden="true"`. With `onClick`: a `<button type="button">` with `aria-label` and `title` equal to `label`, and `aria-pressed` when `pressed` is set (`true`/`false`), otherwise no `aria-pressed`.
- **Name.** `label`.
- **Keyboard.** Enter and Space on the button (Space tested).
- **State.** `pressed` shows as a ring: 2 px `--bg` and 4 px `--accent` around the dot, on top of `aria-pressed`. `disabled` gives 50% opacity.
- **Focus.** The standard focus ring (2 px `--focus-color`) on the button.
- **Contrast.** The dot has a faint inner edge (18% dark in light mode, 18% light in dark). A hex colour under 3:1 against `--bg` or `--surface-1` in a theme gets a 1.5 px `--fg-3` edge in that theme (WCAG 1.4.11, tested: white and heather in light, black in dark). Other colour formats (`rgb()`, names) do not get the check.
- **Target.** The button is 44 × 44 px (tested on touch); 34 px with a mouse and a fine pointer. The dot is 16, 22 or 26 px.
- **Motion.** The edge transitions on `--dur-fast`, 0 under reduced motion.
- **Built-in text.** None.
- **Known limit.** The group (`role="group"`, `aria-label`) is the app's to add. A button without `label` has no name.

## Content

- `label` is the colour's name the way people say it: "Navy", "Dusty pink", not "#1F3A5F".
- The group is named after the choice: "Colour", "Flower colour".
- If the colour needs an explanation (stock, maker), it belongs in the text beside it, not in `label`.
