---
name: Stack
group: layout
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/stack/
typer: dist/layout/Stack.d.ts
---

# Stack

A layout primitive: the children in a column (default) or a row, with a gap from the spacing tokens (`gap={4}` is `--space-4`, 16 px), optional wrap and alignment. Flex with the gap as a custom property, so the CSS is one rule and the step is always a token. Nothing visual of its own and no role: a surface is a Card, a frame is AppShell.

## When to use

- Fields under each other in a form, cards under each other in a list, paragraphs with even air.
- A row of small things that should wrap: tags, badges, filter buttons.
- A heading on the left and a button on the right: `direction="row"` with `justify="between"`.

## When not to

- A surface with a border and a fill: [Card](Card.en.md).
- The frame around the app, with menu and content: [AppShell](AppShell.en.md).
- A row that scrolls sideways: [ScrollRow](ScrollRow.en.md).
- A grid in two directions: write `display:grid` yourself; Stack is one axis.

## Do

- Pick `gap` from the scale: `2` (8 px) between tags, `3` (12 px) between fields, `4` (16 px) between cards, `6` (24 px) between sections.
- Use `wrap` on a row with an unknown number of children, so it does not overflow on a narrow screen.
- Set `as="ul"` when the children are a list; `role="list"` comes by itself, since the list style is removed.
- Nest stacks: a column of rows is perfectly ordinary.

## Don't

- No pixel value in `gap`; only steps from the scale.
- No `style` with `padding` or `background` to make a surface: that is Card.
- No Stack around one child.
- No `direction="row"` for something that should wrap like text; a sentence is a paragraph.

## Example

```jsx
import { Stack, Input, Textarea, Tag, Button } from 'sassy/components';

<Stack gap={3}>
  <Input label="Plant" />
  <Textarea label="Note" />
</Stack>
<Stack direction="row" gap={2} wrap>
  <Tag>Tomato</Tag><Tag>Basil</Tag><Tag>Lettuce</Tag>
</Stack>
<Stack direction="row" justify="between" align="center">
  <h2>Sowing log</h2>
  <Button variant="ghost" iconLeft="plus">New row</Button>
</Stack>
<Stack as="ul" gap={2}>
  <li>Sow tomato</li>
  <li>Prick out basil</li>
</Stack>
```

## Props

The types are in `dist/layout/Stack.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/stack/).

<!-- props: StackProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'div' \| 'section' \| 'nav' \| 'ul' \| 'ol' \| 'li' \| 'form' \| 'header' \| 'footer'` | `'div'` | The element to render, default `div`. `ul` and `ol` get `role="list"` on their own (the list style is removed, which takes the list semantics away in Safari); an own `role` wins. |
| `direction` | `'column' \| 'row'` | `'column'` | `column` (default) stacks the children; `row` puts them side by side, centred on the cross axis. |
| `gap` | `StackGap` | `4` | The spacing step between children: `--space-<gap>`, so `4` is 16 px, `2` is 8 px, `'1-5'` is 6 px. Default 4. |
| `wrap` | `boolean` | `false` | `true` lets a row wrap onto the next line, e.g. a row of tags. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | – | Alignment on the cross axis: `start`, `center`, `end`, `stretch` or `baseline`. Default: stretch in a column, center in a row. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | – | Distribution on the main axis: `start` (default), `center`, `end` or `between`. |
| `children` | `React.ReactNode` | – | The children to stack. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** What `as` says: `div` (default), `section`, `nav`, `ul`, `ol`, `li`, `form`, `header` or `footer`. No role is added, except `role="list"` on `ul` and `ol`: they get `list-style:none`, which takes the list semantics away in Safari, so the component sets the role itself; an own `role` wins (both tested).
- **Name.** None of its own. A `section` or `nav` is named with `aria-labelledby` or `aria-label` as usual.
- **Keyboard and focus.** None; the tab order is the document order, and Stack never reorders it (no `order`, no `row-reverse`).
- **Contrast.** No colours; everything is inherited.
- **Spacing.** `gap` is `var(--space-<n>)`, and the distance between the children is the measured one (tested for 2, 3 and 4). The stack has `min-width:0`, so it never grows wider than its place as a flex or grid child; a row with `wrap` breaks instead of overflowing (tested at 320 px). A long word in a child is the child's business.
- **Motion.** None.
- **Built-in text.** None.
- **Known limits.** One axis. `align` and `justify` are inline styles, so they win over a class; set them as props rather than in `className`.

## Content

- No text of its own.
- The order in the stack is the order a screen reader reads; put the most important thing first.
