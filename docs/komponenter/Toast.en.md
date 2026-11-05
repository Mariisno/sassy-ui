---
name: Toast
group: feedback
status: stable
since: 0.2.0
kort: components/feedback/toast.card.html
typer: components/feedback/Toast.d.ts
---

# Toast

Brief feedback that does not get in the way: "Task archived", with "Undo" beside it. `ToastStack` is the container at the bottom right and the live region (`role="status"`, `aria-live="polite"`); it is in the page from the start, empty, and toasts are added to it. A `Toast` on its own is `role="status"` itself. Five tones that only change the icon and its colour, an optional action and a close button named "Lukk".

## When to use

- Confirming that something is done, without interrupting: "Saved", "Task archived".
- Undo after an action that can be reversed, instead of "Are you sure?" before it.
- A quiet warning that needs no answer: "You're offline. We'll save when you're back."

## When not to

- Something that must be answered before going on: [Dialog](Dialog.en.md).
- An error in a field: `error` on [Input](Input.en.md), where the error is.
- A new version of the app: [NyVersjon](NyVersjon.en.md), a toast with two actions.
- Content that should stay: text on the page, or a [Badge](Badge.en.md).

## Do

- Render `ToastStack` from the start, also empty. A region that arrives already filled is often not read.
- Give destructive actions "Undo" (`actionLabel` + `onAction`) and let the action happen at once.
- Let the app remove a toast after a few seconds when it has no action; one with an action stays until people have seen it.
- Pass `closeLabel="Dismiss"` on English surfaces.
- One line in `title`, past tense for what was done.

## Don't

- Don't move focus to the toast. It is announced; people carry on where they were.
- Don't show more than one toast about the same thing; change the text of the one that is there.
- Don't toast everything. A saved form that shows what was saved needs none.
- Don't use `danger` for something that went well.

## Example

```jsx
import { Toast, ToastStack } from 'sussi/components';

<ToastStack>
  {archived && <Toast tone="success" title="Task archived" actionLabel="Undo" onAction={undo} onClose={dismiss} closeLabel="Dismiss" />}
  {offline && <Toast tone="warning" title="You're offline" description="We'll save when you're back." closeLabel="Dismiss" />}
</ToastStack>
```

## Props

The types are in `components/feedback/Toast.d.ts`. The card: `components/feedback/toast.card.html`.

<!-- props: ToastProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | Which icon it gets, and the icon's colour. |
| `title` | `React.ReactNode` | – | One line, past tense for what was done: "Task archived". |
| `description` | `React.ReactNode` | – | A second line, in `--fg-2`. |
| `actionLabel` | `string` | – | The text of the action, usually "Undo". |
| `onAction` | `() => void` | – | Called when the action is pressed. |
| `onClose` | `() => void` | – | Shows a close button (×) that calls this. |
| `closeLabel` | `string` | `'Lukk'` | Accessible name of the close button. Default "Lukk" (like Dialog); English surfaces pass "Dismiss". |
| `className` | `string` | – | Classes on the toast. |
| `style` | `React.CSSProperties` | – | Style on the toast. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `title`.
<!-- /props -->

`ToastStack` takes the attributes of a `<div>` (`id`, `className`, `data-*`, `aria-*`); they reach the container (`tests/refs.e2e.test.mjs`).

## Accessibility

- **Element and role.** `ToastStack` is a `<div role="status" aria-live="polite" aria-relevant="additions text">`. A `Toast` inside it has no role of its own; a `Toast` on its own is `role="status"` (tested in `tests/refs.e2e.test.mjs`). `id`, `data-*` and `aria-*` reach the toast.
- **Name.** The text in `title` and `description`. The icon is decorative.
- **Keyboard.** The action and the close button are ordinary buttons; Tab reaches them in document order. Nothing moves focus when a toast arrives (tested for NyVersjon, which is built from the same parts).
- **Focus.** The standard focus ring on the action and on ×.
- **Contrast.** `title` is `--fg-1`, `description` `--fg-2` and the action `--accent-text`, all 4.5:1 on the toast's surface (`--surface-1` in light mode, `--surface-2` in dark; `tests/contrast.test.mjs`). The icon is `--fg-3` or the status colour.
- **Target.** The action is at least 24 × 24 px (WCAG 2.5.8, `tests/polish.test.mjs`); the close button is an IconButton `sm`, 30 px. Known limit: under 44 px.
- **Placement.** Bottom right, 20 px from the edge. Under 480 px the stack spans the width with 16 px gutters, so a 360 px toast fits 320 px. In a page with AppShell (not `contained`) the stack sits above the tab bar below 900 px (WCAG 2.4.11).
- **Motion.** The toast rises in on `--dur-slow`, 0 under reduced motion.
- **Built-in text.** "Lukk" (Norwegian) on the close button. Override with `closeLabel`.
- **Known limit.** The toast does not remove itself. The timer is the app's; "about five seconds without an action" is the advice, not the code.

## Content

- `title` in the past tense for what was done: "Task archived", "Saved". Not "Your task has been archived!".
- `description` only when something more happens: "We'll save when you're back."
- The action is one word: "Undo". Rarely anything else.
- No "Success!" and no emoji. The tone says it with the icon.
