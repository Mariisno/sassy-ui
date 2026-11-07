---
name: VisuallyHidden
group: layout
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/visuallyhidden/
typer: dist/layout/VisuallyHidden.d.ts
---

# VisuallyHidden

Text for assistive technology that nobody sees: the `.s-sr-only` class as a component. The element is 1 px, clipped and out of the flow, never `display:none` or `visibility:hidden`, so a screen reader reads it and `role="status"` on it is announced. `focusable` is for a skip link or another control that must show when it has the focus: it then comes back into the flow where it stands in the document, at least 24 px tall. AppShell has its own skip link; this is for pages without it.

## When to use

- The words only a screen reader needs: «(åpner i ny fane)», a heading for a region, what an icon button does when it cannot take `aria-label`.
- A status line that should be read without taking space: `role="status"` with "Saved" or "Loading the recipe".
- A skip link on a page without [AppShell](AppShell.en.md): `as="a"` with `href` and `focusable`.

## When not to

- Text everyone should see: write it visibly.
- A control that should be gone: remove it. A control hidden from sight is still in the tab order.
- A name for a button that already has `aria-label` or `label` ([IconButton](IconButton.en.md)).
- Content hidden from everyone, screen readers too: `hidden` or `aria-hidden`.

## Do

- Prefer a visible text; use this for what is only needed when read aloud.
- Start the text with a space when it sits inside a link or a button, so the hidden words do not run into the visible ones.
- Set `focusable` only on something that can take the focus: a link or a button.
- Give the skip link a target that can take the focus: `id` and `tabIndex={-1}` on the content.

## Don't

- No `display:none` or `hidden` on top; it is then not read.
- No long paragraphs; a screen reader cannot skip them.
- No `focusable` on a `span`; it cannot take the focus, so it never shows.
- No VisuallyHidden as the only content of an element everyone should be able to use.

## Example

```jsx
import { VisuallyHidden, Icon } from 'sassy/components';

<VisuallyHidden as="a" href="#content" focusable>Skip to content</VisuallyHidden>
<h2><VisuallyHidden>Plants in</VisuallyHidden> The greenhouse</h2>
<button type="button"><Icon name="trash-2" /><VisuallyHidden> Delete the row</VisuallyHidden></button>
<VisuallyHidden role="status">Saved</VisuallyHidden>
```

## Props

The types are in `dist/layout/VisuallyHidden.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/visuallyhidden/).

<!-- props: VisuallyHiddenProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'span' \| 'div' \| 'p' \| 'a' \| 'button' \| 'label' \| 'legend' \| 'h2' \| 'h3'` | `'span'` | The element to render, default `span`. `a` for a skip link (with `href` and `focusable`), `button` for a control shown only on focus, `div` or `p` for a block of text. |
| `focusable` | `boolean` | `false` | `true` shows the element while it has the focus (a skip link, WCAG 2.4.1); it is then in the flow, at least 24 px tall. |
| `href` | `string` | – | With `as="a"`: the link target, e.g. `#main`. Passed through to the element. |
| `children` | `React.ReactNode` | – | The text a screen reader reads: «(åpner i ny fane)», a heading for a region, a label for an icon-only control that cannot take `aria-label`. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** What `as` says: `span` (default), `div`, `p`, `a`, `label`, `legend`, `h2` or `h3`. No role is added; `role="status"` or `role="alert"` is passed as a prop.
- **Name.** The text. It is part of the name of the element it sits in (a button, a link), like ordinary text.
- **Keyboard and focus.** A `focusable` element is in the tab order like any other, and shows while it has the focus: `position:static`, `inline-flex`, at least 24 px tall (tested: 1 × 1 px at rest, visible and at least 24 px with the focus, and Enter moves the focus to the target). Without `focusable` the element is not in the tab order unless it can take the focus itself; that would be an invisible focus, so do not do that.
- **Contrast.** No colours of its own; a shown skip link is an ordinary link in `--accent-text` (4.5:1), or what `className` says.
- **Target.** Shown with the focus: at least 24 px tall (WCAG 2.5.8).
- **Motion.** None.
- **Built-in text.** None.
- **Known limits.** `clip` is the old property, on purpose: `clip-path` is not read as reliably in every combination. Shown with the focus, the link sits in the flow and pushes the content below it down while it has the focus; for an overlay that moves nothing, like AppShell's pill, give it `className` with `position:fixed` or `absolute` and its own style.

## Content

- Short and concrete: "Delete the row", not "Delete".
- The same words as elsewhere in the app; the text is part of the name, not an explanation.
- «(åpner i ny fane)» in parentheses after the link text, as [Link](Link.en.md) does.
