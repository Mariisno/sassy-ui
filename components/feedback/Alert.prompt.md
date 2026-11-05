An inline message that stays on the page until the app removes it. Not a toast (that is transient) and not a dialog (that blocks).

```jsx
<Alert>Endringer lagres etter hvert.</Alert>
<Alert tone="success" title="Lagret">Oppskriften er lagret.</Alert>
<Alert tone="warning" onClose={() => setShown(false)}>Du er frakoblet. Endringene synkes når du er tilbake.</Alert>
<Alert tone="danger" urgent title="Kunne ikke lagre" actionLabel="Prøv igjen" onAction={retry}>Nettet forsvant underveis.</Alert>
```

- Four tones with the status tokens: soft fill, `-fg` text, an icon per tone. Colour is never the only signal.
- `role="status"` (polite) by default. `urgent` gives `role="alert"`, and only with `tone="danger"`; use it for a message that appears because of something the person just did, never for one in the page from the start.
- It never takes the focus. Closing (`onClose` shows the ×) moves the focus to the control before the alert, or to `focusOnClose`, then calls `onClose`; the app removes the alert.
- `actionLabel`/`onAction` is a text action in the alert's colour; `actions` takes more controls (a small secondary Button).
- «Lukk» on the close button by default; English surfaces pass `closeLabel="Dismiss"`.
- Put it where the thing it is about is: above a form, at the top of a view, under the field group. One alert per thing.
