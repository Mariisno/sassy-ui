---
name: Toast
group: feedback
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/toast/
typer: dist/feedback/Toast.d.ts
---

# Toast

Brief feedback that does not get in the way: "Task archived", with "Undo" beside it. `ToastStack` is the container at the bottom right and the live region (`role="status"`, `aria-live="polite"`); it is in the page from the start, empty, and toasts are added to it. A `Toast` on its own is `role="status"` itself. Five tones that only change the icon and its colour, an optional action and a close button named "Lukk". With `duration` the toast goes by itself (it calls `onClose`); the clock stops while the pointer is on it, the focus is inside it or the page is hidden, and it is never under 5 seconds. A toast with an action ("Undo") never has a clock: it stays until it is used or dismissed, also with `duration`. Without `duration` it stays until the app removes it, as before.

## When to use

- Confirming that something is done, without interrupting: "Saved", "Task archived".
- Undo after an action that can be reversed, instead of "Are you sure?" before it.
- A quiet warning that needs no answer: "You're offline. We'll save when you're back."

## When not to

- Something that must be answered before going on: [Dialog](Dialog.en.md).
- An error in a field: `error` on [Input](Input.en.md), where the error is.
- A new version of the app: [NyVersjon](NyVersjon.en.md), a toast with two actions.
- Content that should stay: text on the page, or a [Badge](Badge.en.md).
- A message only screen readers need: [kunngjor](Kunngjor.en.md).

## Do

- Render `ToastStack` from the start, also empty. A region that arrives already filled is often not read.
- Give destructive actions "Undo" (`actionLabel` + `onAction`) and let the action happen at once.
- Give a plain status toast a `duration` (5–6 seconds); one with an action stays until people have seen it, and `duration` does not apply to it.
- Pass `closeLabel="Dismiss"` on English surfaces.
- One line in `title`, past tense for what was done.

## Don't

- Don't move focus to the toast. It is announced; people carry on where they were.
- Don't show more than one toast about the same thing; change the text of the one that is there.
- Don't toast everything. A saved form that shows what was saved needs none.
- Don't use `danger` for something that went well.

## Example

```jsx
import { Toast, ToastStack } from 'sassy/components';

<ToastStack>
  {archived && <Toast tone="success" title="Task archived" actionLabel="Undo" onAction={undo} onClose={dismiss} closeLabel="Dismiss" />}
  {offline && <Toast tone="warning" title="You're offline" description="We'll save when you're back." closeLabel="Dismiss" />}
  {saved && <Toast tone="success" title="Saved" onClose={() => setSaved(false)} closeLabel="Dismiss" duration={6000} />}
</ToastStack>
```

### Delete and undo

Delete at once, without "Are you sure?", and offer "Undo" in a toast. The app keeps what was deleted until the toast is closed, and puts it back in the same place on "Undo". The toast has no clock, since it has an action: it stays until people use "Undo" or dismiss it, or a new delete replaces it. When it is closed, the delete is final; send it to the server then, or send it at once and restore it on "Undo".

```jsx
function Beds({ beds, setBeds }) {
  const [deleted, setDeleted] = useState(null); // { row, place }
  const remove = (row) => {
    setDeleted({ row, place: beds.indexOf(row) });
    setBeds(beds.filter((b) => b !== row));
  };
  const undo = () => {
    setBeds((b) => [...b.slice(0, deleted.place), deleted.row, ...b.slice(deleted.place)]);
    setDeleted(null);
  };
  return (
    <ToastStack>
      {deleted && <Toast key={deleted.row.id} title="Deleted" description={deleted.row.name} actionLabel="Undo" onAction={undo} onClose={() => setDeleted(null)} closeLabel="Dismiss" />}
    </ToastStack>
  );
}
```

- The delete button goes with the row; move the focus to the next row (or the heading above the list), so the keyboard does not end up on `<body>`. After "Undo", move the focus to the row that came back.
- A `key` per delete, so a new delete gets a new toast.
- One toast at a time for deletes: a new delete makes the previous one final and replaces the toast.

## Props

The types are in `dist/feedback/Toast.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/toast/).

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
| `duration` | `number` | – | Milliseconds until a plain status toast goes by itself: it calls `onClose` once, as the × does. Default none: the toast stays until the app removes it. Never under 5000. A toast with an action (`actionLabel`) ignores it and stays until it is handled or dismissed. The clock stops while the pointer is on the toast, while the focus is inside it and while the page is hidden. |
| `className` | `string` | – | Classes on the toast. |
| `style` | `React.CSSProperties` | – | Style on the toast. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `title`.
<!-- /props -->

`ToastStack` takes the attributes of a `<div>` (`id`, `className`, `data-*`, `aria-*`); they reach the container (tested).

## Accessibility

- **Element and role.** `ToastStack` is a `<div role="status" aria-live="polite" aria-relevant="additions text">`. A `Toast` inside it has no role of its own; a `Toast` on its own is `role="status"` (tested in a browser). `id`, `data-*` and `aria-*` reach the toast.
- **Name.** The text in `title` and `description`. The icon is decorative.
- **Keyboard.** The action and the close button are ordinary buttons; Tab reaches them in document order. Nothing moves focus when a toast arrives (tested for NyVersjon, which is built from the same parts).
- **Focus.** The standard focus ring on the action and on ×.
- **Contrast.** `title` is `--fg-1`, `description` `--fg-2` and the action `--accent-text`, all 4.5:1 on the toast's surface (`--surface-1` in light mode, `--surface-2` in dark; tested). The icon is `--fg-3` or the status colour.
- **Target.** The action is at least 24 × 24 px (WCAG 2.5.8, tested); the close button is an IconButton `sm`, 30 px. Known limit: under 44 px.
- **Placement.** Bottom right, 20 px from the edge. Under 480 px the stack spans the width with 16 px gutters, so a 360 px toast fits 320 px. In a page with AppShell (not `contained`) the stack sits above the tab bar below 900 px (WCAG 2.4.11).
- **Motion.** The toast rises in on `--dur-slow`, 0 under reduced motion.
- **Built-in text.** "Lukk" (Norwegian) on the close button. Override with `closeLabel`.
- **Time.** Without `duration` there is no clock. With `duration`, `onClose` is called once when the time is up, never before 5 seconds. A toast with an action ignores `duration` and stays until it is used or dismissed: a clock, even one that stops on hover and focus, can take "Undo" away from someone reading in a screen reader's browse mode, which moves neither the focus nor the pointer. The clock stops while the pointer is on the toast (also one that appears under a still pointer), while the focus is inside it and while the page is hidden, and goes on with what was left (tested in a browser). The toast that goes is not announced; the live region is the same.
- **Known limit.** The app removes the toast in `onClose`; without `onClose`, `duration` does nothing. There is no queue: the app holds the list of toasts, and one at a time about the same thing is the advice.

## Content

- `title` in the past tense for what was done: "Task archived", "Saved". Not "Your task has been archived!".
- `description` only when something more happens: "We'll save when you're back."
- The action is one word: "Undo". Rarely anything else.
- No "Success!" and no emoji. The tone says it with the icon.
