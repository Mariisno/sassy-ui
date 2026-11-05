Sussi, the mascot: the designer's black-and-white cat, drawn on a 64×64 grid. Use her sparingly, where a friendly face helps.

```jsx
<Sussi pose="hode" size={28} />                       {/* avatar next to her own lines */}
<Sussi pose="titter" size={96} />                     {/* empty states */}
<Sussi pose="sover" size={48} title="Laster" />       {/* loading, with a name for screen readers */}
```

- Poses: `hode` (logo, favicon, avatar), `ligger`, `titter` (empty states), `sover` (loading), `strekk` (play, 404), `sitter` (welcome).
- She is always black and white. Never recolour her with the app accent. Colours are the `--sussi-*` tokens; dark mode adds a thin halo so the black parts don't vanish.
- Decorative by default (`aria-hidden`). Pass `title` only when she carries meaning on her own.
- Not a logo: the wordmark stays `sussi.` in type.
