A row that scrolls sideways without a scrollbar, and fades where there is more to see.

```jsx
<ScrollRow>{typer.map((t) => <Tag key={t} selected={t === valgt} onClick={() => velg(t)}>{t}</Tag>)}</ScrollRow>
<ScrollRow label="Farger">{farger.map((f) => <Swatch key={f.id} color={f.hex} label={f.navn} onClick={…} />)}</ScrollRow>
<ScrollRow style={{ margin: '0 calc(-1 * var(--space-4))', padding: '0 var(--space-4)' }}>…</ScrollRow>   {/* out to the screen edge */}
```

- Use it when a row of small, equal things doesn't fit on a phone: tabs, chips, colour swatches. Not for cards or content people read.
- The fade is the cue that something is cut off, so don't add arrows or a scrollbar.
- Give `label` when the children can't take focus (plain text, decorative dots). With buttons or links inside, Tab already scrolls them into view.
- To run it out to the screen edge, give it a negative margin and the same padding, as in the third example.
