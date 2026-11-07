---
name: Spinner
group: feedback
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/spinner/
typer: dist/feedback/Spinner.d.ts
---

# Spinner

Something is happening and nobody knows for how long: a ring in the accent that turns. `role="status"` with `label` as visually hidden text, so a screen reader hears "Loading" where others see the ring. Under `prefers-reduced-motion` it stands still and pulses. With `aria-hidden` it is decorative next to its own text, with no role and no text. Button's `loading` has its own matching ring; use that inside a button.

## When to use

- Something is in progress with no known length and takes more than about a second: fetching a list, saving, signing in.
- A whole view is waiting: `size="lg"` in the middle of the surface, with a `label` that says what is being fetched.
- One word in a line is waiting: `size="sm"` next to the text, with `aria-hidden` when the text already says it.

## When not to

- Something with a known length: [Progress](Progress.en.md).
- Content with a known shape (a list, a card): [Skeleton](Skeleton.en.md), so nothing jumps when it arrives.
- Inside a button: `loading` on [Button](Button.en.md).
- A whole page loading: Sussi in the `sover` pose.

## Do

- Always give `label`, in the present tense: "Loading", "Saving", "Loading recipes". It is what the screen reader hears.
- Use `aria-hidden` only when the text next to it already says what is happening, and put `role="status"` on that text instead.
- Wait about a second before showing it; a ring that flashes is worse than nothing.
- Remove it when the content is there, and let the content take its place.

## Don't

- Don't render a Spinner without `label` and without `aria-hidden`: that is an empty status region.
- Don't put a Spinner inside a Button; the button has its own.
- Don't show several spinners in one view. One says it.
- Don't use a spinner as a sign that the app is slow: find out why.

## Example

```jsx
import { Spinner, Button } from 'sassy/components';

<Spinner label="Loading" />
<Spinner size="lg" label="Loading recipes" />
<p role="status">Saving <Spinner size="sm" aria-hidden /></p>
<Button loading>Saving</Button>
```

## Props

The types are in `dist/feedback/Spinner.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/spinner/).

<!-- props: SpinnerProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `sm` 16 px (in a line of text), `md` 24 px, `lg` 40 px (a whole view). |
| `label` | `string` | – | What is happening, in the present tense: «Laster», «Lagrer». Required, unless `aria-hidden` makes the spinner decorative next to its own text. |
| `aria-hidden` | `boolean \| 'true' \| 'false'` | – | `true` when the text next to it already says what is happening: the spinner then has no role and no text of its own. |
| `className` | `string` | – | Your own classes on the spinner. |
| `style` | `React.CSSProperties` | – | Your own styles on the spinner. |

Plus every attribute of `<span>` (`React.HTMLAttributes<HTMLSpanElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the colour rules in unit tests.

- **Element and role.** A `<span role="status">` with the ring `aria-hidden` and `label` as visually hidden text (`.s-sr-only`: 1 px, clipped, not `display:none`, so it is read). With `aria-hidden` the span has no role and no text (tested).
- **Name.** `label`, as the content of the status region. A live region that arrives already filled is not always read; when the announcement must be certain, keep a `role="status"` text in the page from the start and set its text when loading begins (the pattern in [Skeleton](Skeleton.en.md)).
- **Keyboard and focus.** None; it cannot be operated, and it does not move the focus.
- **Contrast.** The arc is `--accent` through `currentColor`, 3:1 on `--bg`, `--surface-1` and `--surface-2` in both themes and every accent (WCAG 1.4.11; tested on the tokens and the rendered colour). The rest of the ring is `--surface-3`, a track, not a signal.
- **Motion.** The ring turns (0.8 s, linear). Under `prefers-reduced-motion` it stands still and pulses in opacity (1.6 s), and Button's `.s-btn__spin` does the same (WCAG 2.3.3, tested).
- **Sizes.** `sm` 16 px with a 2 px stroke, `md` 24 px with 3 px, `lg` 40 px with 4 px (tested).
- **Built-in text.** None; `label` is the app's.
- **Known limits.** No tone prop: the ring is always the accent. Set `color` in `style` or a class for another colour (the arc is `currentColor`).

## Content

- `label` is what is happening, in the present tense and without a full stop: "Loading", "Saving", "Loading recipes".
- Say what is being fetched when there is more than one thing on the page: "Loading recipes", not just "Loading".
- Norwegian surfaces: "Laster", "Lagrer", "Henter oppskrifter".
