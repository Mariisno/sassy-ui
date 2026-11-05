The shape of content that has not arrived yet. Grey blocks where the text, the avatar or the image will be.

```jsx
<section aria-busy={loading}>
  <span className="s-sr-only" role="status">{loading ? 'Laster oppskrifter' : ''}</span>
  {loading ? <Spinner aria-hidden /> : null}
  {loading ? <Skeleton lines={3} /> : <p>{text}</p>}
</section>
<Skeleton variant="circle" size={40} />
<Skeleton variant="rect" height={160} />
```

- Always `aria-hidden`: the region around it says it is loading, with `aria-busy="true"` and one status text (a `Spinner` with a label, or a visually hidden line). One announcement, not twelve grey blocks.
- `text` with `lines`: body-height lines, the last of several shorter. `circle` with `size`, `rect` with `width`/`height`.
- Match the layout that comes: the same number of lines, the same card height, so nothing jumps when the content lands.
- Shimmer sweeps now and then; under `prefers-reduced-motion` the blocks stand still.
- Not for a whole page that loads (Sussi in the `sover` pose) and not for something with a known length (`Progress`).
