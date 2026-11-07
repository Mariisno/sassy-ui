---
name: Heading
group: display
status: new
since: 0.11.0
side: https://mariisno.github.io/sassy-ui/en/components/heading/
typer: dist/display/Heading.d.ts
---

# Heading

A heading whose level and look are two things: `level` picks the element, `<h1>` to `<h6>`, so the page outline is right, and `size` picks the look from the type roles (`display`, `h1`, `h2`, `h3`, `h4`), so a section can be an h2 that looks like an h3. Without `size` the look follows the level, the same as base.css gives a bare `<h1>`–`<h4>`; h5 and h6 look like h4. The classes `.s-display` and `.s-h1`–`.s-h4` give the same looks without React.

## When to use

- The title of a page, and the headings of the sections under it.
- A heading that needs another level than it looks like: an h2 in a card that should look like an h3.
- A large title on a landing page: `size="display"`.
- Without React: `<h2 class="s-h3">` gives the same look.

## When not to

- Text that should only be large or bold without being a heading: [Text](Text.en.md) with `size="lead"`, or `<strong>`.
- The title of a Dialog, a Card or an EmptyState: they have their own.
- The label of a field: `label` on [Input](Input.en.md).

## Do

- Pick `level` from the outline: one h1 per page, and no skipped levels going down (h2 → h3, not h2 → h4).
- Use `size` when the look should differ from the level, not another level.
- Let spacing come from the layout ([Stack](Stack.en.md) with `gap`); the heading has no margin.
- Give the heading `tabIndex={-1}` and move the focus there with the ref after a page change in a single-page app.

## Don't

- Don't pick a level for its size; an h4 because h2 is too big breaks the outline for screen readers.
- Not several h1 on one page.
- Not a heading without text, or with an icon only.
- Not `display` on more than one title per page; it is for front pages.

## Example

```jsx
import { Heading, Text, Stack } from 'sassy/components';

<Stack gap={2}>
  <Heading level={1}>Sowing log</Heading>
  <Text size="lead" tone="muted">Everything you sowed this year, week by week.</Text>
</Stack>
<Heading level={2}>This week</Heading>
<Heading level={3} size="h4">Watering</Heading>
<Heading level={1} size="display">The garden</Heading>
```

Without React: `<h2 class="s-h3">Watering</h2>`.

## Props

The types are in `dist/display/Heading.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/heading/).

<!-- props: HeadingProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | *required* | The heading level, 1–6: the element is `<h1>`–`<h6>`. Follow the page outline: one h1, then no skipped level going down. |
| `size` | `HeadingSize` | – | The look, when it should differ from the level: `display`, `h1`, `h2`, `h3` or `h4`. Default: the level's own (h5 and h6 look like h4). |
| `children` | `React.ReactNode` | – | The heading text. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLHeadingElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** `<h1>`–`<h6>` from `level`, so the role is heading and the level is the element's (tested for all six). A level outside 1–6 becomes the nearest; without a valid number it is h2.
- **Name.** The text in the heading.
- **Keyboard and focus.** None; the heading is not in the tab order. With `tabIndex={-1}` an app can move the focus there (the ref reaches the element).
- **Contrast.** `--fg-1` on `--bg`, `--surface-1`, `--surface-2` and `--surface-3`, above 11:1 in both themes and every accent.
- **Size and wrapping.** The look is the type roles `--type-display`, `--type-h1`, `--type-h2` and `--type-h3`, and the h4 rule from base.css (16 px semibold), and follows the browser's zoom. `text-wrap: balance` and `overflow-wrap: anywhere`, so a long word breaks instead of overflowing at 320 px (tested).
- **Motion.** None.
- **Built-in text.** None.
- **Known limits.** The tokens are in px, so the browser's minimum font size works but a changed default font size does not; zoom works.

## Content

- Short and concrete: «This week», not «An overview of everything that happened this week».
- Sentence case: «Plants in the greenhouse».
- No full stop at the end, and no colon.
- The heading says what the section holds, so someone jumping between headings knows where they are.
