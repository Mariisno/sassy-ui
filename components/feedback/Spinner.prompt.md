Something is happening and nobody knows for how long. A ring in the accent that turns; still and pulsing under `prefers-reduced-motion`.

```jsx
<Spinner label="Laster" />
<Spinner size="lg" label="Laster oppskrifter" />
<p aria-live="polite">Lagrer <Spinner size="sm" aria-hidden /></p>
<Button loading>Lagrer</Button>   {/* Button has its own spinner; do not put a Spinner inside it */}
```

- `role="status"` with `label` as visually hidden text: a screen reader hears «Laster» where sighted people see the ring. `label` is required.
- `aria-hidden` makes it decorative, with no role and no text: only next to text that already says what is happening.
- Sizes: `sm` 16 px in a line of text, `md` 24 px, `lg` 40 px for a whole view.
- Something with a known length is a `Progress`, a whole page that loads is Sussi in the `sover` pose, content whose shape is known is a `Skeleton`.
- Do not show it for anything under about a second; a ring that flashes is worse than nothing.
