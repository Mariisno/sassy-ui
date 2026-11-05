Text button for actions — primary for the single main action in a view, secondary/ghost for everything else.

```jsx
<Button>Save changes</Button>
<Button variant="secondary" iconLeft="plus">New project</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="danger" iconLeft="trash-2">Delete</Button>
```

- Variants: primary (moss fill), secondary (white + border), soft (moss tint), ghost (no chrome), danger (brick).
- Sizes sm 30 / md 38 / lg 46px. `loading` swaps the left icon for a spinner and turns the button off with `aria-disabled`, so it keeps focus. Pass `aria-disabled` (not `disabled`) for an off button that should stay reachable.
- Labels: sentence case verb first ("Save changes", not "SAVE" or "OK").
