How far something has come. A bar, or a ring with the number in the middle.

```jsx
<Progress value={12} max={30} label="Planter vannet" valueText="12 av 30 planter" />
<Progress value={0.6} max={1} label="Opplasting" tone="success" />
<Progress label="Laster" />                                                  {/* indeterminate */}
<Progress variant="ring" value={95} max={180} size={72} label="Økt" valueText="3 min igjen">1:25</Progress>
```

- Always a `label` (or `aria-labelledby` to a visible heading): it is the accessible name of the progressbar.
- `valueText` when the percentage is not what a person would say: "12 av 30 planter", "3 min igjen".
- No `value` means unknown: a calm sweep on the track, a fade under `prefers-reduced-motion`.
- `tone` is the accent unless the bar means something: `success` done, `warning` nearly out, `danger` over.
- The bar fills its container; put it under its own caption or inside a card. The ring takes `size` in px and keeps the number in `children`.
- Not a meter for a static value (storage used) and not a timer by itself: the app owns the clock, Progress shows it.
