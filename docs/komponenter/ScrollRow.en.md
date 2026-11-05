---
name: ScrollRow
group: display
status: stable
since: 0.4.0
kort: components/display/swatch.card.html
typer: components/display/ScrollRow.d.ts
---

# ScrollRow

A row that scrolls sideways without a scrollbar and fades at the edge where there is more to see. The children sit on one line (`display:flex`, no wrap, an 8 px gap from `--scrollrow-gap`), and the row sets `data-fade-start` and `data-fade-end` by where you are. With `label` it is a named region that takes focus, so the keyboard can scroll it when the content has nothing to focus itself. `scrollEdges` is the arithmetic behind the fade, exported for tests and for apps that draw their own.

## When to use

- A row of small, equal things that do not fit on a phone: tags, colour dots, tabs.
- Filters above a list.
- When it should be clear that something is cut off, without arrows.

## When not to

- Cards or content people read: let it wrap onto new lines.
- Vertical lists: ordinary scrolling.
- Tabs that are the main navigation: [AppShell](AppShell.en.md) or [Tabs](Tabs.en.md); put Tabs in a ScrollRow only when they do not fit.
- An image gallery: that needs page indicators and bigger targets than this.

## Do

- Give `label` when the children cannot take focus (text, decorative dots). With buttons or links inside, Tab already scrolls them into view.
- Run the row out to the screen edge with a negative margin and the same padding, so the fade sits at the edge of the screen.
- Put the most important thing first. What sits furthest right is seen by the fewest.
- Keep the children the same size, so the row reads as one row.

## Don't

- Don't add arrows or a visible scrollbar. The fade is the cue.
- Don't put `label` on a row of buttons; the keyboard then gets two stops for the same thing.
- Don't use it for content that must be seen whole (a summary, a warning).
- Don't stack one ScrollRow right under another.

## Example

```jsx
import { ScrollRow, Tag, Swatch } from 'sussi/components';

<ScrollRow>
  {types.map((t) => <Tag key={t} selected={t === picked} onClick={() => pick(t)}>{t}</Tag>)}
</ScrollRow>
<ScrollRow label="Colours">
  {colours.map((c) => <Swatch key={c.id} color={c.hex} label={c.name} />)}
</ScrollRow>
<ScrollRow style={{ margin: '0 calc(-1 * var(--space-4))', padding: '0 var(--space-4)' }}>…</ScrollRow>
```

## Props

The types are in `components/display/ScrollRow.d.ts`. The card, shared with Swatch: `components/display/swatch.card.html`.

<!-- props: ScrollRowProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | – | Names the row as a region and makes it focusable, so the keyboard can scroll it. Give it when the children aren't focusable themselves. |
| `children` | `React.ReactNode` | – | What sits in the row: tags, dots, tabs. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`).
<!-- /props -->

`scrollEdges({ scrollLeft, clientWidth, scrollWidth, overflowX })` returns `{ start, end }`: whether there is more to see to the left and to the right, with one pixel of slack, and always `false` when the element cannot scroll.

## Accessibility

The behaviour is tested in `tests/nye.e2e.test.mjs`.

- **Element and role.** A `<div>` with `overflow-x:auto`. With `label`: `role="region"`, `aria-label` and `tabIndex=0`. Without `label`: no role, not focusable.
- **Name.** `label`, when given.
- **Keyboard.** With `label` the row takes focus, and the browser scrolls a focused scrollable element with the arrow keys. Without `label`, Tab scrolls the children into view as they take focus.
- **Focus.** A 2 px `outline` in `--focus-color` on the inside (`outline-offset:-2px`), so the mask does not hide it (tested).
- **Fade.** A 48 px mask at the edge, set by `data-fade-start`/`data-fade-end`. It is a visual hint; nothing in the content is hidden from a screen reader. Measured again on scroll and with a `ResizeObserver` when the row or its first child changes size.
- **Contrast.** The row has no colour of its own; the children's rules apply.
- **Motion.** No animation. The scrollbar is hidden (`scrollbar-width:none`), and the scrolling is the browser's own.
- **Built-in text.** None.
- **Known limit.** Without a scrollbar only the fade says there is more, and it is faint for some. Put the most important thing first.

## Content

- The row has no text of its own. `label` is a noun for what it holds: "Colours", "Types", "Filters".
- The children are short: one word per tag, one name per dot.
- No "Scroll to see more". The fade and the thumb say it.
