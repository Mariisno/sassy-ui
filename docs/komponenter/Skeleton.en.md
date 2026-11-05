---
name: Skeleton
group: feedback
status: new
since: 0.7.0
kort: components/feedback/skeleton.card.html
typer: components/feedback/Skeleton.d.ts
---

# Skeleton

The shape of content that has not arrived yet: text lines, a circle (an avatar) or a rectangle (an image, a card) in `--surface-3`, with a shimmer that sweeps across now and then and is off under `prefers-reduced-motion`. Always `aria-hidden`: the region around it says it is loading, with `aria-busy="true"` and one status text, so a screen reader hears "Loading recipes" once instead of twelve grey blocks.

## When to use

- Content with a known shape that takes more than about a second: a list of rows, a card with an image and text, a profile.
- You know roughly how much is coming, so the skeleton can have the same height and nothing jumps when the content lands.
- The rest of the page is usable while this waits.

## When not to

- Something without a known shape, or something brief (saving, signing in): [Spinner](Spinner.en.md).
- Something with a known length: [Progress](Progress.en.md).
- A whole page loading: Sussi in the `sover` pose.
- A place that is empty, not on its way: [EmptyState](EmptyState.en.md).

## Do

- Put `aria-busy="true"` on the region around the skeletons, and one status text in it: a `Spinner` with `label`, or a visually hidden line with `role="status"` (`.s-sr-only`).
- Keep the status text in the page from the start and fill it when loading begins, so the announcement is certain; remove `aria-busy` and the text when the content is there.
- Mirror the layout that is coming: the same number of lines (`lines`), the same circle (`size`), the same card height (`height`).
- Use `width` on a single line for a heading or a short field.

## Don't

- Don't render a skeleton without a region that says it is loading; then it is only grey blocks.
- Don't add a status text per row; one per region.
- Don't make a skeleton taller or shorter than the content it stands for.
- Don't put text inside a skeleton; it is hidden from assistive technology.

## Example

```jsx
import { Skeleton, Spinner } from 'sussi/components';

<section aria-busy={loading} aria-label="Recipe">
  <span className="s-sr-only" role="status">{loading ? 'Loading the recipe' : ''}</span>
  {loading ? <Spinner size="sm" aria-hidden /> : null}
  {loading ? <Skeleton variant="rect" height={120} /> : <img src={photo} alt="" />}
  {loading ? <Skeleton lines={3} /> : <p>{text}</p>}
</section>

<div className="row">
  <Skeleton variant="circle" size={40} />
  <Skeleton lines={2} />
</div>
<Skeleton width="50%" />
```

## Props

The types are in `components/feedback/Skeleton.d.ts`. The card: `components/feedback/skeleton.card.html`.

<!-- props: SkeletonProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | `text` lines of body height, `circle` (an avatar), `rect` (an image, a card). |
| `lines` | `number` | `1` | `text` only: how many lines. The last of several is shorter, like a paragraph. |
| `width` | `number \| string` | – | CSS width. `text` and `rect` fill their container by default. |
| `height` | `number \| string` | – | `rect` only: CSS height. Default 96 px. |
| `size` | `number` | `40` | `circle` only: diameter in px. Default 40. |
| `className` | `string` | – | Your own classes on the skeleton. |
| `style` | `React.CSSProperties` | – | Your own styles on the skeleton. |

Plus every attribute of `<span>` (`React.HTMLAttributes<HTMLSpanElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/laster.e2e.test.mjs`, the rules in the source in `tests/skeleton.test.mjs`.

- **Element and role.** A `<span aria-hidden="true">` with no role; several lines are one span with `aria-hidden` around the lines, so nothing is hidden twice (tested). The skeleton says nothing itself.
- **The pattern around it.** The waiting region has `aria-busy="true"` and one text with `role="status"` (a `Spinner` with `label`, or an `.s-sr-only` line). Tested: the region has one status region, and the only text in it is the status line.
- **Keyboard and focus.** None; not focusable, does not move the focus.
- **Contrast.** The blocks are `--surface-3`, a surface, not a signal; no requirement. The shimmer is a band of `--surface-2` (tokens, no hex).
- **Motion.** The shimmer sweeps across every 2.4 s. Under `prefers-reduced-motion` it is off, and the blocks stand still (WCAG 2.3.3, tested).
- **Shapes.** `text` is 0.9 em tall with 0.3 em of air, so the lines follow the font size around them; the last of several is 60 % wide. `circle` is `size` px round. `rect` is 96 px tall and fills the width until `height`/`width` say otherwise (tested).
- **Built-in text.** None.
- **Known limits.** No `aria-busy` of its own; the region is the app's. No variant for a button or an icon: use `rect` with `width` and `height`.

## Content

- The status text says what is coming, in the present tense: "Loading recipes", "Loading the profile".
- One status text per region, not one per block.
- Norwegian surfaces: "Laster oppskrifter", "Henter profilen".
