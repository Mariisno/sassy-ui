---
name: Alert
group: feedback
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/alert/
typer: dist/feedback/Alert.d.ts
---

# Alert

A message that stays on the page until the app removes it: a soft status fill with the matching text colour (like Badge), an icon per tone so colour is never the only signal, an optional title, an action and a close button. `role="status"` (polite) by default, `role="alert"` only for `tone="danger"` with `urgent`. It never takes the focus; closing moves the focus to the control before the alert, so it does not fall to `<body>` when the alert leaves the page (see known limits).

## When to use

- Something people should know while they are on the page: offline, saved, a form that did not go through, a new version.
- The message belongs somewhere: above the form, at the top of the view, under the field group it is about.
- The message should stay until people have seen it or the condition is over.

## When not to

- Something brief that happened just now and need not stay: [Toast](Toast.en.md), with undo.
- Something that must be answered before going on: [Dialog](Dialog.en.md).
- An error in one field: `error` on [Input](Input.en.md); an Alert above the form only when there are several, or the error is about the whole.
- An empty place in the app: [EmptyState](EmptyState.en.md).

## Do

- Pick `tone` by meaning: `info` to know, `success` it worked, `warning` something to watch, `danger` something went wrong.
- Say what happened and what to do: "The connection dropped on the way. Nothing was lost." The action in `actionLabel` ("Try again").
- Set `urgent` only on a `danger` that appears because people did something (the save failed), never on one that is in the page from the start.
- Pass `onClose` when the message can be closed, and remove it from the page in `onClose`. The focus has moved before it is called.
- Point `focusOnClose` at the field that should have the focus after closing when the control before the alert is not the right one.

## Don't

- Don't show several messages about the same thing, or one per field.
- Don't use `urgent` to make a message more important: `alert` interrupts what the screen reader was doing.
- Don't move the focus to the alert yourself. It is read where it appears.
- Don't give it a title that repeats the text. The title is for a message of several lines.

## Example

```jsx
import { Alert, Button } from 'sassy/components';

<Alert>Changes save as you go.</Alert>
<Alert tone="success" title="Saved" closeLabel="Dismiss">The recipe is saved.</Alert>
<Alert tone="warning" onClose={() => setOffline(false)} closeLabel="Dismiss">You're offline. Changes sync when you're back.</Alert>
<Alert tone="danger" urgent title="Couldn't save" actionLabel="Try again" onAction={retry} onClose={dismiss} closeLabel="Dismiss" focusOnClose={nameRef}>
  The connection dropped on the way. Nothing was lost.
</Alert>
<Alert tone="info" title="New version" actions={<Button size="sm" variant="secondary">See what's new</Button>}>The update arrives the next time you open the app.</Alert>
```

## Props

The types are in `dist/feedback/Alert.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/alert/).

<!-- props: AlertProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | The status colours and icon: `info` (default), `success`, `warning` or `danger`. |
| `title` | `React.ReactNode` | – | One short line in medium weight above the text. Leave it out when the text is one line. |
| `children` | `React.ReactNode` | – | The message. One or two sentences: what happened and what to do next. |
| `urgent` | `boolean` | `false` | Only with `tone="danger"`: `role="alert"` (assertive) instead of `role="status"`. Set it when the alert appears because of something the person just did (a save that failed), never on one that is in the page from the start. |
| `actionLabel` | `string` | – | A text action in the alert's own colour, e.g. «Prøv igjen». |
| `onAction` | `() => void` | – | Called when the action is pressed. |
| `actions` | `React.ReactNode` | – | More controls after the action, e.g. a small secondary Button. |
| `onClose` | `() => void` | – | Shows the close button. The app removes the alert; the focus moves first. |
| `closeLabel` | `string` | `'Lukk'` | Accessible name of the close button. Default "Lukk"; English surfaces pass "Dismiss". |
| `focusOnClose` | `React.RefObject<HTMLElement \| null>` | – | Where the focus goes when the alert is closed. Default: the focusable element nearest before the alert. |
| `className` | `string` | – | Your own classes on the alert. |
| `style` | `React.CSSProperties` | – | Your own styles on the alert. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `title`.
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the colour rules in unit tests.

- **Element and role.** A `<div role="status">`: a polite live region, read when it changes, without interrupting. A region that arrives already filled is not always read (VoiceOver in particular); when the announcement must be certain, keep the alert in the page from the start and fill it, or use `tone="danger"` with `urgent` for an error people just caused. With `tone="danger"` and `urgent` it is `role="alert"` (assertive). `urgent` on any other tone is ignored, so a piece of information cannot become an alarm by accident (tested). An explicit `role` in the props wins, for a message that is in the page from the start and should not be a live region (`role="none"`).
- **Name.** The text in `title` and `children`. The icon is `aria-hidden` and differs per tone, so the tone shows by shape and not only by colour (WCAG 1.4.1, tested).
- **Keyboard and focus.** Nothing moves the focus when a message appears (tested: the focus stays on the button that caused it). The action and the close button are ordinary buttons in document order. The close button moves the focus before `onClose`: to `focusOnClose` when it is set, otherwise to the focusable element nearest before the alert in the document, and to the nearest after when there is none before (all three tested).
- **Contrast.** The text is `--<tone>-fg` on `--<tone>-soft`, 4.5:1 in both themes and every accent (tested on the token pairs and the rendered colours of text, title, action, icon and close button). The action and the close button inherit the tone's colour; the close button's hover is a ring in the same colour, not the grey surface.
- **Target.** The action is at least 24 × 24 px (WCAG 2.5.8); the close button is an IconButton `sm`, 30 px. Known limit: under 44 px.
- **Width.** Flex with `min-width:0` on the text, so long words wrap and nothing overflows at 320 px (tested).
- **Motion.** None.
- **Built-in text.** "Lukk" on the close button. Override with `closeLabel`.
- **Known limits.** The alert does not remove itself; the app owns the state. No neutral tone: a message without a meaning is `info`. «Nearest before» is document order, so an alert at the top of a form sends the focus to the last control in the header; set `focusOnClose` there. Controls with `position: fixed` are not counted, and with no other focusable element the focus ends on `<body>`.

## Content

- The first sentence says what happened, the next what to do: "You're offline. Changes sync when you're back."
- `title` only when the text is several lines, and then a noun or a short sentence: "Couldn't save", "New version".
- `actionLabel` is the outcome: "Try again", "See what's new", not "OK".
- No exclamation marks, no blame: "The connection dropped on the way", not "Error!".
- The close button is called "Lukk"; English surfaces pass `closeLabel="Dismiss"`.
