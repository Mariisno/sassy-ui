Brief, non-blocking confirmation or warning; offer Undo rather than asking "are you sure?".

```jsx
<ToastStack>
  <Toast tone="success" title="Task archived" actionLabel="Undo" onAction={undo} onClose={dismiss} closeLabel="Dismiss" />
</ToastStack>
```

- Keep `ToastStack` in the page from the start, also when it is empty. It is the live region, and screen readers only announce what is added to a region that is already there. A `Toast` on its own is `role="status"`.
- Auto-dismiss after ~5s unless it has an action. One line title; past tense for completed actions.
- The close button is called "Lukk" by default, like Dialog. English surfaces pass `closeLabel="Dismiss"`.
