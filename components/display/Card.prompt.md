Surface container for grouped content — outlined by default, raised for floating things, sunken for wells.

```jsx
<Card><h3>Recipe app</h3><p>Offline-first recipe box.</p></Card>
<Card variant="raised" padding="lg">…</Card>
<Card interactive as="a" href="#">…</Card>
```

- Radius 14px, padding sm 12 / md 20 / lg 32. Don't nest outlined cards; use sunken inside.
