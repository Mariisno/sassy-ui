---
name: Progress
group: feedback
status: new
since: 0.5.7
kort: components/feedback/progress.card.html
typer: components/feedback/Progress.d.ts
---

# Progress

How far something has come: a bar (plants watered, an upload) or a ring (a session, with the number in the middle). `role="progressbar"` with `aria-valuenow/min/max`; without `value` it is indeterminate, with no `valuenow` and a calm sweep that becomes a fade under `prefers-reduced-motion`. The fill is the accent or a status colour, the track is `--surface-3` with a `--border-control` edge, so track and fill hold 3:1 in both themes and every accent.

## When to use

- Something that moves forward and has an end: plants of a total, an upload, a step of several.
- A ring with the number in the middle when one number is the most important thing on screen (time left in a session).
- Something in progress with no known length: `Progress` without `value` (indeterminate).

## When not to

- A static share (storage used): that is a meter, not progress. Write the number.
- A timer: the app owns the clock. Progress shows it, it does not count.
- A status like done/paused: [Badge](Badge.en.md).
- A whole page loading: Sussi in the `sover` pose, or an indeterminate Progress with `label="Loading"`.

## Do

- Always give `label`, or `aria-labelledby` to a visible heading. It is the name of the progress bar.
- Say what people would say in `valueText`: "12 of 30 plants", "3 min left". Otherwise the percentage is read.
- Set `max` to what is counted (plants, seconds), so `value` can be the same number as in the text.
- Pick `tone` by meaning: `success` done, `warning` nearly out, `danger` over the limit. Otherwise the accent.
- Say the number in `valueText` even when it sits in the middle of the ring; the middle is plain content.

## Don't

- Don't render a Progress without a name.
- Don't pass a `value` that is a guess. If the amount is unknown, leave `value` out.
- Don't stack several progress bars for the same thing.
- Don't put a percentage in `valueText` when the number is more concrete.

## Example

```jsx
import { Progress } from 'sussi/components';

<Progress value={12} max={30} label="Plants watered" valueText="12 of 30 plants" />
<Progress value={0.6} max={1} label="Upload" tone="success" />
<Progress label="Loading" />
<Progress variant="ring" value={95} max={180} size={72} label="Session" valueText="3 min left">1:25</Progress>
<h3 id="plants">Plants</h3>
<Progress value={12} max={30} aria-labelledby="plants" />
```

## Props

The types are in `components/feedback/Progress.d.ts`. The card: `components/feedback/progress.card.html`.

<!-- props: ProgressProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'bar' \| 'ring'` | `'bar'` | A bar or a ring. |
| `value` | `number` | – | 0–max. Leave it out while the amount is unknown (indeterminate). |
| `max` | `number` | `100` | Default 100. Pass 1 for a fraction, or the number of plants, steps, seconds. |
| `label` | `string` | – | The accessible name, required unless `aria-labelledby` points at a visible heading. |
| `valueText` | `string` | – | Read instead of the percentage, e.g. "12 av 30 planter" or "3 min igjen". |
| `size` | `number` | `48` | Ring only: its diameter in px. Default 48. The stroke follows (size / 12, at least 3 px). |
| `tone` | `'accent' \| 'success' \| 'warning' \| 'danger'` | `'accent'` | `accent` follows the app's data-accent. The status tones use Sussi's status colours. |
| `children` | `React.ReactNode` | – | Ring only: what sits in the middle, e.g. the number. Plain content, so say the value in `valueText` too. |

Plus every attribute of `<span>` (`React.HTMLAttributes<HTMLSpanElement>`), except `children`.
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/progress.e2e.test.mjs`, the colour rules in `tests/progress.test.mjs`.

- **Element and role.** A `<span>` with `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax={max}` and `aria-valuenow` (clamped to 0–max) when `value` is a number. Without `value`: no `aria-valuenow`, that is indeterminate. `aria-valuetext` from `valueText`.
- **Name.** `label` as `aria-label`. When `aria-labelledby` is set, `aria-label` is dropped, so the name is not read twice (tested).
- **Keyboard and focus.** None; it cannot be operated.
- **Contrast.** The track is `--surface-3` with a 1 px `--border-control` edge that holds 3:1 against `--bg`, `--surface-1` and `--surface-2`; the fill holds 3:1 against the track and the surfaces, in both themes and every accent, for all four tones. `warning` fills with `--warning-fg`, since `--warning` is only 2.51:1 on the track in light mode (WCAG 1.4.11).
- **Motion.** The fill slides on `--dur-base` when the value changes, 0 under reduced motion. Indeterminate: the bar sweeps (1.6 s) and the ring spins; under `prefers-reduced-motion` both become a slow opacity fade (2 s), so an unknown amount still looks alive without moving (WCAG 2.3.3).
- **Ring.** The SVG is `aria-hidden` and `focusable="false"`; the content in the middle is ordinary text. The stroke is `size / 12`, at least 3 px, and the track has an edge circle of its own.
- **Built-in text.** None.
- **Known limits.** No neutral or paused tone, no prop for the bar height (8 px) or the ring's stroke width.

## Content

- `label` is what is counted, as a noun: "Plants watered", "Upload", "Session".
- `valueText` is what you would say out loud: "12 of 30 plants", "3 min left", "nearly done".
- A number in the ring is short and in monospace (the component sets the font): "1:25", "12".
- Indeterminate: `label` says what is happening, in the present tense: "Loading", "Saving".
