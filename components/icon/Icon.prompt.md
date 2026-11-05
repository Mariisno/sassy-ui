Inline Lucide icon at stroke 1.75 that inherits text color — use for every glyph in Sussi UI; never emoji.

```jsx
<Icon name="leaf" />
<Icon name="check" size={16} style={{ color: 'var(--success)' }} />
```

- `size`: 16 (dense rows), 18 (default, next to 14px text), 20–24 (standalone).
- Shipped set lives in `iconData.js`; raw SVGs in `assets/icons/`. Need more? Add from lucide-static@0.460.0.
