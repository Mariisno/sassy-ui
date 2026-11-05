Short label on hover/focus for icon buttons and shortcuts.

```jsx
<Tooltip content="Search" kbd="⌘K"><IconButton icon="search" label="Search" /></Tooltip>
```

- Wrap one element. Tooltip links the bubble to it with `aria-describedby` and removes its native `title`, so there is only one bubble.
- Esc hides the bubble without moving the mouse or focus. It shows again on the next hover or focus.
- The mouse can move from the trigger onto the bubble (to read or zoom it) without it closing.
