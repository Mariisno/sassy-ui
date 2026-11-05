Modal for focused tasks and irreversible confirmations — prefer undo-toasts over confirm dialogs for reversible actions.

```jsx
<Dialog open={open} onClose={() => setOpen(false)} title="Delete project?" description="This removes 12 tasks and can't be undone."
  footer={<><Button variant="ghost" onClick={close}>Keep it</Button><Button variant="danger">Delete project</Button></>} />
```

- Title is a question or verb phrase; buttons name the outcome ("Delete project", not "OK").
- Accessible by default: focus moves in on open (first control in the body, else the panel), Tab and Shift+Tab stay inside, Esc closes, and focus returns to the button that opened it. The title names the dialog and the description describes it.
- The close button says "Lukk" by default; English surfaces pass `closeLabel="Close"`. Use `initialFocus={ref}` to pick the starting control.

**Sheet.** `variant="sheet"` is the same dialog risen from the bottom: a short form, a choice of a few options, details for one item on a phone.

```jsx
<Dialog variant="sheet" portal open={open} onClose={close} title="Log a session" description="A session you did outside the app."
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button onClick={save}>Save session</Button></>}>
  <Input label="Minutes" inputMode="numeric" />
</Dialog>
```

- Full width on a phone, 560 px and centred on a bigger screen (`size="lg"` is 720). Rounded top corners, a grab handle (decorative), padding for the home indicator, at most 90% of the height; the title and the footer stay put and the body scrolls.
- It slides up over `--dur-slow`; under `prefers-reduced-motion` it just appears.
- Same modal behaviour as the dialog: focus in, Tab inside, Esc and the scrim close it, focus goes back.
- `portal` renders the dialog or sheet in `<body>`, so a sidebar, a floating button group or any positioned parent cannot draw over it. Use it when the dialog opens from inside something positioned or transformed, also from inside another dialog: only the innermost open one keeps focus and handles Esc and Tab. Not with `inline`.
