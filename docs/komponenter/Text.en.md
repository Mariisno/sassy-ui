---
name: Text
group: display
status: new
since: 0.11.0
side: https://mariisno.github.io/sassy-ui/en/components/text/
typer: dist/display/Text.d.ts
---

# Text

Running text in the type roles: `size` is `body` (16 px, the default), `sm` (14 px), `lead` (18 px, the intro under a page title) or `meta` (12 px DM Mono, one line of metadata); `tone` is `default` (the colour around it, `--fg-1` on a page), `muted` (`--fg-2`) or `subtle` (`--fg-3`); `mono` gives DM Mono at any size. A `<p>` by default, another element with `as`. Every tone holds 4.5:1 on `--bg`, `--surface-1` and `--surface-2` in both themes and every accent. The classes `.s-text`, `.s-text--sm`, `.s-text--muted` and the others give the same without React.

## When to use

- The intro under a page title: `size="lead"`.
- Secondary text under a row or in a card: `size="sm" tone="muted"`.
- One line of metadata, such as a date or a count: `size="meta" tone="subtle"`.
- Numbers and codes that should line up: `mono`.

## When not to

- A heading: [Heading](Heading.en.md).
- A link: [Link](Link.en.md).
- A status with a colour: [Badge](Badge.en.md) or [Alert](Alert.en.md).
- Text only for screen readers: [VisuallyHidden](VisuallyHidden.en.md).

## Do

- Keep running text at `body`; `sm` and `meta` are for what matters less.
- Use `muted` for secondary text and `subtle` only for metadata.
- Pick the element from the content: `as="span"` inside a line, `as="time"` with `dateTime` for a date.
- Let spacing come from the layout ([Stack](Stack.en.md)); the text has no margin.

## Don't

- Not `subtle` on `--surface-3`; only `default` and `muted` hold 4.5:1 there.
- Not a tone as the only carrier of meaning; an error is `error` on the field, a status is a Badge.
- Not `meta` for sentences; it is 12 px and for one line.
- Not `lead` on more than one paragraph per page.

## Example

```jsx
import { Text, Heading, Stack } from 'sassy/components';

<Stack gap={2}>
  <Heading level={1}>Sowing log</Heading>
  <Text size="lead">Everything you sowed this year, week by week.</Text>
  <Text>The tomatoes need water every morning in July.</Text>
  <Text size="sm" tone="muted">Last watered yesterday evening.</Text>
  <Text as="time" size="meta" tone="subtle" dateTime="2026-11-05">5 Nov 2026</Text>
  <Text as="span" mono>12.5 m²</Text>
</Stack>
```

Without React: `<p class="s-text s-text--sm s-text--muted">Last watered yesterday evening.</p>`.

## Props

The types are in `dist/display/Text.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/text/).

<!-- props: TextProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'p' \| 'span' \| 'div' \| 'small' \| 'strong' \| 'em' \| 'label' \| 'li' \| 'figcaption' \| 'time'` | `'p'` | The element, default `p`. `span` inside a line, `div` around blocks, `small`, `strong`, `em`, `label`, `li`, `figcaption` or `time` where that is what the text is. |
| `size` | `'body' \| 'sm' \| 'lead' \| 'meta'` | `'body'` | `body` (16 px, the default), `sm` (14 px), `lead` (18 px, the intro under a page title) or `meta` (12 px DM Mono, one-line metadata such as a date or a count). |
| `tone` | `'default' \| 'muted' \| 'subtle'` | `'default'` | `default` keeps the colour around it (`--fg-1` on a page), `muted` is `--fg-2` for secondary text, `subtle` is `--fg-3` for metadata. All hold 4.5:1 on `--bg`, `--surface-1` and `--surface-2`; on `--surface-3` use `default` or `muted`. |
| `mono` | `boolean` | `false` | DM Mono at the chosen size, for numbers and codes. `meta` is mono already. |
| `dateTime` | `string` | – | For `as="time"`: the machine-readable date, e.g. «2026-11-05». |
| `htmlFor` | `string` | – | For `as="label"`: the id of the control it names. |
| `children` | `React.ReactNode` | – | The text. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** What `as` says, `<p>` by default. No role is added.
- **Name.** None; it is text.
- **Keyboard and focus.** None.
- **Contrast.** `default` inherits the colour around it (`--fg-1` on a page, above 11:1). `muted` is `--fg-2` and `subtle` `--fg-3`; both hold 4.5:1 on `--bg`, `--surface-1` and `--surface-2` in the light and dark theme and all six accents, measured on the tokens and on the rendered text (tested). On `--surface-3`, `--fg-3` holds only 4.06:1, so use `default` or `muted` there.
- **Size.** `body` is 16 px with a line height of 1.5, `sm` 14 px, `lead` 18 px and `meta` 12 px DM Mono, all type roles. `overflow-wrap: anywhere`, so a long word breaks at 320 px (tested).
- **Motion.** None.
- **Built-in text.** None.
- **Known limits.** `meta` is 12 px; keep it to one line of metadata, not text people must read.

## Content

- One thought per paragraph; short sentences.
- The intro says what the page is for, in one sentence.
- Metadata is facts, not sentences: «5 Nov 2026», «3 plants».
- Numbers in the surface's own style: «12,5 m²» in Norwegian, «12.5 m²» in English.
