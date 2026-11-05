A layout primitive: children in a column or a row with a gap from the spacing tokens. Nothing visual of its own.

```jsx
<Stack gap={3}>
  <Input label="Plante" />
  <Textarea label="Notat" />
</Stack>
<Stack direction="row" gap={2} wrap>
  <Tag>Tomat</Tag><Tag>Basilikum</Tag><Tag>Salat</Tag>
</Stack>
<Stack direction="row" justify="between" align="center">
  <h2>Sådagbok</h2>
  <Button variant="ghost" iconLeft="plus">Ny rad</Button>
</Stack>
<Stack as="ul" gap={2}>{plants.map((p) => <li key={p.id}>{p.name}</li>)}</Stack>   {/* role="list" comes by itself */}
```

- `gap` is a spacing step: `4` is `--space-4` (16 px, the default), `2` is 8 px, `'1-5'` is 6 px. Never a pixel value.
- `direction="row"` puts the children side by side, centred on the cross axis; `wrap` lets a row break onto the next line.
- `align` (`start`, `center`, `end`, `stretch`, `baseline`) and `justify` (`start`, `center`, `end`, `between`) set the two axes.
- `as` picks the element; `ul` and `ol` get `role="list"` by themselves, since the list style is removed (an own `role` wins).
- No role, no padding, no background: a surface is a `Card`, a page frame is `AppShell`. Nested stacks are fine.
