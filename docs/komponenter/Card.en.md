---
name: Card
group: display
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/card/
typer: dist/display/Card.d.ts
---

# Card

A surface that holds content that belongs together. `outlined` by default: `--surface-1`, a 1 px `--border` and 14 px corners, no shadow, because borders carry structure in Sassy and a shadow only means "lifted". `raised` swaps the border for `--shadow-md` for things that float, `sunken` is `--surface-2` without a border for wells and quotes. Four paddings (none, sm 12, md 20, lg 32 px) and `interactive` for a card that can be pressed.

## When to use

- A group of content that should stand apart from the page around it: a project, a setting, a summary.
- `raised` for what sits on top of something else: a popover, a floating panel.
- `sunken` for a well inside a card: a quote, an example, a summary.
- `interactive` with `as="a"` and `href` when the whole card is a link.

## When not to

- A row in a list that opens something: [ListItem](ListItem.en.md). It has a fixed height, a chevron and keyboard support.
- An empty list: [EmptyState](EmptyState.en.md) with `framed`.
- A message: [Toast](Toast.en.md).
- A dialog: [Dialog](Dialog.en.md). A card is not modal.

## Do

- Stay at one card level. Inside an `outlined` card use `sunken`, not another `outlined`.
- Pick `as` by the content: `article` for a self-contained unit, `section` for a group with a heading, `li` in a list.
- Give an interactive card one clear destination and make it a link (`as="a" href`), so the keyboard reaches it.
- Let the heading in the card follow the page outline (`h2`, `h3`).

## Don't

- Don't `interactive` on a `div` with `onClick`. It gets no role and takes no focus.
- Don't use a coloured left border as a status marker. Use a [Badge](Badge.en.md) inside.
- Don't put a shadow on cards that sit still. `raised` is for what floats.
- Don't nest cards inside cards inside cards.

## Example

```jsx
import { Card, Badge } from 'sassy/components';

<Card as="article">
  <h3>Recipe app</h3>
  <p>Works offline and syncs when the network is back.</p>
  <Badge tone="success" dot>Live</Badge>
</Card>
<Card variant="sunken" padding="sm">A quote or an example</Card>
<Card interactive as="a" href="#/project/12" padding="lg">Open the project</Card>
```

## Props

The types are in `dist/display/Card.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/card/).

<!-- props: CardProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'outlined' \| 'raised' \| 'sunken'` | `'outlined'` | outlined (edge, no shadow), raised (shadow, for things that float), sunken (sunken surface, for wells and quotes). |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | none, sm 12 px, md 20 px, lg 32 px. |
| `interactive` | `boolean` | `false` | Hover lift + pointer |
| `as` | `'div' \| 'section' \| 'article' \| 'a' \| 'li'` | `'div'` | Which element it renders as. |
| `href` | `string` | – | With `as="a"`: the link target. Passed through to the element. |
| `target` | `string` | – | With `as="a"`: where the link opens, e.g. "_blank". |
| `rel` | `string` | – | With `as="a"`: the link relationship, e.g. "noopener". |
| `children` | `React.ReactNode` | – | The content. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Accessibility

- **Element and role.** What `as` says: `div` (default), `section`, `article`, `a` or `li`. No role is added. A `section` is a landmark only when it also has a name (`aria-labelledby`).
- **Keyboard and focus.** Only when the card is a link (`as="a"` with `href`): then it is in the tab order and gets the standard focus ring (2 px `--focus-color`). `interactive` alone gives a pointer cursor and a 1 px lift on hover, not keyboard support.
- **Contrast.** The text is `--fg-1` on `--surface-1` (or `--surface-2` for `sunken`), 4.5:1 in both themes. The border (`--border`) is structure, not information, and is not held at 3:1. In dark mode `raised` is `--surface-2`, so it steps lighter instead of relying on shadow.
- **Motion.** `interactive` transitions on `--dur-base`, 0 under reduced motion.
- **Built-in text.** None.
- **Known limit.** `interactive` without `as="a"` is visual, not semantic. For a card that acts as a button, put a [Button](Button.en.md) inside.

## Content

- A card has one heading, then one sentence, then a Badge or an action if needed.
- The heading is the name of the thing ("Recipe app"), not a category ("Project").
- One action per card. More actions belong on the detail page.
- Meta text (date, count) in monospace under the content.
