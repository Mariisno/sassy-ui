---
name: NyVersjon
group: feedback
status: new
since: 0.5.7
side: https://mariisno.github.io/sassy-ui/en/components/nyversjon/
typer: dist/feedback/NyVersjon.d.ts
---

# NyVersjon

"Ny versjon" (new version): the notice that a new version of the app is ready. A toast built from [Toast](Toast.en.md)'s parts, with "Oppdater" (update) and the quieter "Senere" (later), announced politely from a live region without moving focus. By default it renders its own `ToastStack` from the start, so the region exists before the toast arrives; open it with `open`. Detection is the app's, with the helper in `dist/feedback/oppdatering.js`: `startOppdatering`, `vedNyVersjon`, `oppdater` and `erOpptatt`.

## When to use

- An app with a service worker, where a new version waits while you are in the middle of something.
- Together with `startOppdatering`: it reloads on its own when you are not busy, and tells you through `vedNyVersjon` when you are.
- With `updating` while the app waits for a save to finish before it reloads.

## When not to

- An ordinary message or "Undo": [Toast](Toast.en.md).
- An update that needs a choice with consequences (data is removed): [Dialog](Dialog.en.md).
- An app without a service worker: there is no new version to announce.

## Do

- Keep the component mounted from the start and drive it with `open`. The region must exist before the toast is added to it.
- Call `startOppdatering('/sw.js')` once at load, and let `sw.js` do `skipWaiting` and `clients.claim`.
- Pass the app's own reasons to wait in `opptatt` (a session in progress, a save on its way).
- Say why in `description` when `updating` is set: "Saving first."
- On English surfaces: `title`, `updateLabel`, `laterLabel` and `lang="en"`.

## Don't

- Don't render it only once `open` turns true. The region then arrives already filled, and the screen reader does not read it.
- Don't call `location.reload()` yourself; `oppdater()` reloads once.
- Don't leave out `onLater` unless the notice really has to stay.
- Don't run two stacks: in an app with its own `ToastStack`, render it inside with `stack={false}`.

## Example

```jsx
import { useEffect, useState } from 'react';
import { NyVersjon, startOppdatering, vedNyVersjon, oppdater } from 'sassy/components';

startOppdatering('/sw.js', { opptatt: () => sessionRunning() });

function UpdateNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => vedNyVersjon(() => setShow(true)), []);
  return <NyVersjon open={show} onUpdate={oppdater} onLater={() => setShow(false)} lang="en" title="New version" updateLabel="Update" laterLabel="Later" description="Update when it suits you." />;
}
```

## Props

The types are in `dist/feedback/NyVersjon.d.ts` and `dist/feedback/oppdatering.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/nyversjon/).

<!-- props: NyVersjonProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Show the notice. Keep the component mounted while it is closed, so the live region exists before the toast arrives. |
| `onUpdate` | `() => void` | *required* | «Oppdater»: reload the page, or whatever applies the new version. |
| `onLater` | `() => void` | – | «Senere»: close the notice. Without it there is no «Senere» (the notice stays until the app reloads). |
| `updating` | `boolean` | `false` | The update is on its way: «Oppdater» is disabled and aria-busy. Say why in `description`. |
| `title` | `React.ReactNode` | `'Ny versjon'` | Default "Ny versjon". English surfaces pass "New version". |
| `description` | `React.ReactNode` | – | One line under the title, e.g. "Oppdater når det passer deg." Nothing by default. |
| `updateLabel` | `React.ReactNode` | `'Oppdater'` | Default "Oppdater". |
| `laterLabel` | `React.ReactNode` | `'Senere'` | Default "Senere". |
| `stack` | `boolean` | `true` | Default true: the toast comes in its own ToastStack (bottom right, above AppShell's tab bar). Pass false to render only the toast, inside the app's own ToastStack; on its own it is then role="status" itself. |
| `stackProps` | `React.HTMLAttributes<HTMLDivElement>` | – | Reach the ToastStack it renders (an id for a test, for instance). `id`, `data-*` and `aria-*` in the other props reach the toast. |
| `className` | `string` | – | Classes on the toast. |
| `style` | `React.CSSProperties` | – | Style on the toast. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `title`, `children`.
<!-- /props -->

The helper: `startOppdatering(swUrl, options)` registers the worker (`updateViaCache: 'none'`), asks for a new one when the app comes to the foreground and every 30 minutes, and reloads once on `controllerchange` unless you are busy; the first install never reloads. `vedNyVersjon(listener)` is called when a new version waits (at once if it already waits) and returns a function that stops listening. `oppdater()` reloads, once. `erOpptatt()` is true with focus or text in a field, or an open dialog (`dialog[open]`, `[aria-modal="true"]`). Unit-tested against a fake `navigator.serviceWorker`.

<!-- props: OppdateringOptions from dist/feedback/oppdatering.d.ts -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `opptatt` | `() => boolean` | – | The app's own reasons to wait with the reload, e.g. a session in progress. |
| `hver` | `number` | – | How often to ask for a new worker, in ms. Default 30 minutes. |
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** With `stack` (default): a `ToastStack` (`role="status"`, `aria-live="polite"`) that is in the page from the start, empty; the toast inside has no role of its own. With `stack={false}` inside the app's stack: the same. Alone with `stack={false}`: the toast is `role="status"` itself.
- **Name.** `title` ("Ny versjon"), `description` and the two buttons, read as one message when the toast arrives.
- **Keyboard.** Tab reaches "Oppdater" and then "Senere", after AppShell's tab bar; Enter presses (tested). Nothing moves focus when the toast arrives (tested).
- **State.** `updating` sets `disabled` and `aria-busy="true"` on "Oppdater" (50% opacity). "Senere" exists only with `onLater`.
- **Focus.** The standard focus ring on both buttons.
- **Contrast.** The title, "Oppdater" (`--accent-text`) and "Senere" (`--fg-2`) hold 4.5:1 on the toast's surface, and the icon (`--info`) 3:1, in light and dark and with two accents (tested).
- **Target.** Both buttons are at least 24 × 24 px (tested). Known limit: under 44 px.
- **Placement.** Bottom right; above AppShell's tab bar at 390 px, not covered (tested, WCAG 2.4.11); fits 320 px without sideways scroll; back in the corner from 900 px.
- **Motion.** Rises in on `--dur-slow`, 0 under reduced motion.
- **Built-in text.** "Ny versjon", "Oppdater", "Senere" (Norwegian). Override with `title`, `updateLabel`, `laterLabel`; `lang` reaches the toast.
- **Known limit.** The helper is kept small: no waiting-worker handshake, no reload out of sight when the page is hidden, and it does not show the notice again after "Senere". An app that needs that builds it itself.

## Content

- The defaults are enough in Norwegian: "Ny versjon", "Oppdater", "Senere".
- `description` only when there is something to say: "Update when it suits you." or "Saving first." under `updating`.
- Not "You must update now". The notice is low pressure; the app reloads by itself when you are not busy.
- In English: "New version", "Update", "Later".
