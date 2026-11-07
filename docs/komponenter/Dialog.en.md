---
name: Dialog
group: overlays
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/dialog/
typer: dist/overlays/Dialog.d.ts
---

# Dialog

A modal dialog with a scrim, following the WAI-ARIA dialog pattern: focus moves in on open, Tab stays inside, Esc and a click on the scrim close it, and focus returns to what opened it. Named by `title` and described by `description`; the page behind is locked against scrolling. `variant="sheet"` is the same dialog risen from the bottom of the screen (full width on a phone, 560 px centred on a bigger screen, a grab handle, the body scrolling inside), and `portal` renders it in `<body>` so a positioned parent cannot draw over it.

## When to use

- A task that needs full attention: a short form, a choice that must be made before going on.
- Confirming something that cannot be undone, with a `danger` button and a clear "Keep it".
- `variant="sheet"` on a phone: a short form, a choice of a few options, details for one item.
- `portal` when the dialog opens from something positioned or transformed, or from another dialog.

## When not to

- Something that can be undone: do it, and show "Undo" in a [Toast](Toast.en.md).
- A message that needs no answer: [Toast](Toast.en.md).
- A hint by an icon: [Tooltip](Tooltip.en.md).
- Content that is a page of its own: a page.

## Do

- Make the title a question or a verb phrase: "Delete the project?", "Log a session".
- Have the buttons name the outcome: "Delete project" and "Keep it", never "OK" and "Cancel".
- Always give `onClose`; without it there is no close button, no Esc and no scrim close.
- Say in `description` what happens: "This removes 12 tasks and can't be undone."
- Use `initialFocus` when the first field is not the right place to start.

## Don't

- Don't open a dialog on top of a dialog without `portal`; only the innermost keeps focus and takes Esc.
- Don't use `inline` in production; it is for previews and cards.
- Don't focus the danger button from the start. The component avoids it; don't put `autofocus` on it.
- Don't put long text in a sheet; it is at most 90% of the screen, and the body scrolls.

## Example

```jsx
import { Dialog, Button, Input } from 'sassy/components';

<Dialog open={open} onClose={close} title="Delete the project?" description="This removes 12 tasks and can't be undone." closeLabel="Close"
  footer={<><Button variant="ghost" onClick={close}>Keep it</Button><Button variant="danger" onClick={remove}>Delete project</Button></>} />

<Dialog variant="sheet" portal open={logOpen} onClose={closeLog} title="Log a session" description="A session you did outside the app." closeLabel="Close"
  footer={<><Button variant="ghost" onClick={closeLog}>Cancel</Button><Button onClick={save}>Save session</Button></>}>
  <Input label="Minutes" inputMode="numeric" />
</Dialog>
```

## Props

The types are in `dist/overlays/Dialog.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/dialog/).

<!-- props: DialogProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `true` | Open. Closed, it renders nothing. |
| `onClose` | `() => void` | – | Called by Esc, a click on the scrim and the close button. Without it there is no close button, and Esc and the scrim do nothing. |
| `title` | `React.ReactNode` | – | The heading; names the dialog (`aria-labelledby`). |
| `description` | `React.ReactNode` | – | A line under the heading; describes the dialog (`aria-describedby`). |
| `children` | `React.ReactNode` | – | The content. |
| `footer` | `React.ReactNode` | – | Right-aligned actions, typically `<Button variant="ghost">Keep it</Button><Button variant="danger">Delete project</Button>` |
| `size` | `'md' \| 'lg'` | `'md'` | Width: 440 / 600 px for the dialog, 560 / 720 px for the sheet. |
| `variant` | `'dialog' \| 'sheet'` | `'dialog'` | `dialog` (default) is centred. `sheet` slides up from the bottom: full width on a phone, capped and centred on a bigger screen, rounded top corners, a grab handle, padding for the home indicator, at most 90% of the height with the body scrolling inside. Same modal behaviour as the dialog. |
| `inline` | `boolean` | `false` | Position the scrim absolutely inside the nearest positioned parent (for previews/embeds). Ignores `portal`. |
| `portal` | `boolean` | `false` | Render into document.body instead of where it is used, so a positioned or transformed parent (a sidebar, a floating button group) cannot draw over it. A dialog opened from inside another one may use it: only the innermost open dialog keeps focus and handles Esc and Tab. Off by default; no effect without a document (a build-time render). In a prerendered app, open it after hydration, or the portal does not match the server HTML. |
| `closeLabel` | `string` | `'Lukk'` | Accessible name of the close button. Default "Lukk"; English surfaces pass "Close". |
| `initialFocus` | `React.RefObject<HTMLElement \| null>` | – | Element to focus on open. Default: [autofocus]/[data-autofocus], then the first control in the body, then the panel itself (never a footer button, so Enter can't confirm by accident). |
| `className` | `string` | – | Classes on the panel. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `title`.
<!-- /props -->

Note that `open` is `true` when not set: a Dialog without `open` is open. Pass `open={false}` or leave it unmounted to hide it.

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** A `<div role="dialog" aria-modal="true" tabIndex={-1}>` in a scrim. `aria-labelledby` points at `title` (an `<h2>`), `aria-describedby` at `description` (tested). `id`, `data-*` and `aria-*` reach the panel.
- **Focus in.** `initialFocus`, else `[autofocus]`/`[data-autofocus]`, else the first control in the body, else the panel itself, so a screen reader reads the title and Enter cannot hit "Delete" (tested: focus is inside on open).
- **Keyboard.** Tab and Shift+Tab cycle inside the panel (tested, eight presses each way). Esc calls `onClose` (tested). A `focusin` outside is moved back in.
- **Focus out.** On close, focus returns to the element that had it before (tested for Esc and for a footer button), when it is still in the document.
- **Scrim.** `mousedown` on the scrim itself calls `onClose` (tested for the sheet). The page behind gets `overflow:hidden` while the dialog is open (tested), not with `inline`.
- **Nested.** Only the innermost open dialog keeps focus and handles Esc and Tab; a sheet opened through `portal` from another sheet is tested that way.
- **Close button.** An IconButton with `aria-label="Lukk"` (tested), only with `onClose`.
- **Contrast.** The panel is `--surface-1` (`--surface-2` in dark mode); the text `--fg-1`, the description `--fg-2`. The scrim is `--overlay-scrim` with a 2 px blur. The sheet's handle is decorative (`aria-hidden`) and needs no contrast.
- **Motion.** The scrim fades in on `--dur-base` and the panel rises 8 px on `--dur-slow`; the sheet slides up on `--dur-slow` (`s-sheet-up`). Under `prefers-reduced-motion` the durations are 0, and the sheet's animation is removed entirely (tested: `none`, `0s`).
- **Size.** The dialog is up to 440 px (`lg` 600), the sheet 560 (`lg` 720) and full width below that, with `env(safe-area-inset-bottom)` under the footer. The close button is 30 px.
- **Built-in text.** "Lukk" (Norwegian) on the close button. Override with `closeLabel` ("Close").
- **Known limits.** Not a native `<dialog>`, and the page behind does not get `inert`; `aria-modal` tells the screen reader the rest is unavailable. Without `title` the dialog has no name: pass `aria-label` then.

## Content

- The title is the question or the task: "Delete the project?", "Log a session". No "Confirm".
- `description` states the consequence plainly: "… and can't be undone." With the numbers: "12 tasks".
- The primary button repeats the verb from the title: "Delete project". The other says what happens instead: "Keep it", "Cancel".
- No exclamation marks, no "Are you sure?". Say what happens, and let people choose.
