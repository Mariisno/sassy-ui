---
name: Sussi
group: mascot
status: stable
since: 0.2.0
kort: components/mascot/mascot.card.html
typer: components/mascot/Sussi.d.ts
---

# Sussi

The mascot, the cat the system is named after: white with black ears, mask, back patches and tail, and a pink nose. Always black and white, whatever the app's accent; the colours are the `--sussi-*` tokens, and dark mode gives her a thin light halo so the black parts do not vanish. Six poses as inline SVG: `hode` (head: logo, favicon, avatar), `ligger` (lying), `titter` (peeking: empty states), `sover` (sleeping: loading), `strekk` (stretching: play, 404) and `sitter` (sitting: welcome). Decorative by default; `title` names her when she carries meaning alone. `sussiPoses` gives the SVG markup per pose for favicons and static exports.

## When to use

- A friendly face where it helps: an empty state (`titter`, `ligger`), loading (`sover`), a welcome (`sitter`), a 404 (`strekk`).
- An avatar or favicon (`hode`, readable down to 16 px).
- Rarely. One Sussi per screen is enough.

## When not to

- As a logo. The wordmark is the name in plain type; Sussi is a character.
- In the app's accent or any other colour. She is black and white.
- As an icon in buttons and menus: [Icon](Icon.en.md).
- Where an icon already says the same (an empty list with an icon in [EmptyState](EmptyState.en.md) does not need a cat as well).

## Do

- Use `hode` for small sizes (16–28 px) and 32 px and up for the full body.
- Give `title` only when she is the only thing that says anything: "Loading" on an otherwise empty page.
- Let her sit next to text that carries the meaning; she is then decoration (`aria-hidden`).
- Pick the pose by the situation, and keep to one pose per situation in the app.

## Don't

- Don't recolour her, mirror her, or draw new poses without the system's owner.
- Don't animate her. She is still.
- Don't put `title` on a Sussi next to a heading that already says the same.
- Don't use her as a button.

## Example

```jsx
import { Sussi, sussiPoses } from 'sussi/components';

<Sussi pose="hode" size={28} />
<Sussi pose="titter" size={96} />
<Sussi pose="sover" size={48} title="Loading" />
const favicon = sussiPoses.hode().split('__ID__').join('favicon');
```

## Props

The types are in `components/mascot/Sussi.d.ts`. The card: `components/mascot/mascot.card.html`.

<!-- props: SussiProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pose` | `SussiPose` | `'hode'` | The pose: hode, ligger, titter, sover, strekk, sitter. |
| `size` | `number` | `48` | Square size in px. `hode` reads down to 16; use 32+ for a full body. |
| `title` | `string` | – | Accessible name. Omit when she is decorative (the usual case next to text). |

Plus every attribute of `<svg>` (`React.SVGProps<SVGSVGElement>`), except `dangerouslySetInnerHTML`.
<!-- /props -->

`sussiPoses` is an object with a function per pose that returns the SVG markup as text, with `__ID__` where a unique id goes. `sussiPoseNames` is the list of pose names.

## Accessibility

The behaviour is tested in `tests/mascot.e2e.test.mjs`.

- **Element and role.** An `<svg class="s-sussi">`. Without `title`: `aria-hidden="true"`, no role (tested for all six poses). With `title`: `role="img"` and a `<title>` element.
- **Name.** `title`, escaped before it goes into the markup, so `<` and `&` become text (tested).
- **Keyboard and focus.** None; she is not interactive.
- **Unique ids.** Every instance gets its own `clipPath` ids from `useId`, so several cats on one page do not clip each other (tested).
- **Contrast.** Black and white on any surface. In dark mode she gets a `drop-shadow` halo in `--sussi-halo` (tested), so the black parts show against a dark background.
- **Motion.** None.
- **Built-in text.** None.
- **Known limit.** `hode` reads down to 16 px; the full body needs 32 px or more.

## Content

- `title` is what she does or stands for, short: "Loading", "Nothing here yet".
- She does not speak. The text beside her does, in the same calm tone as everything else.
- Not "Sussi says …". She is a character, not a voice.
