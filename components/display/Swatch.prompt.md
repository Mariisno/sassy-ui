A colour dot. Plain to show a colour, a toggle button to pick or filter by one.

```jsx
<Swatch color="#1F3A5F" label="Marineblå" />                                  {/* plain, named */}
<div role="group" aria-label="Farge" className="row">
  {farger.map((f) => <Swatch key={f.id} color={f.hex} label={f.navn} pressed={valgt === f.id} onClick={() => velg(f.id)} />)}
</div>
<ListItem title="Tulipaner" leading={<Swatch color="#B58AA0" />} />           {/* decorative next to a name */}
```

- Always give a button a `label`: the colour's name. The dot alone says nothing to a screen reader.
- `pressed` makes it a toggle (single or multi select). Selection is a ring, not only a colour change.
- White and black are handled: a hex colour below 3:1 against the page gets a firmer edge in that theme.
- Many colours in a row on a phone: put them in a `ScrollRow` instead of wrapping one dot onto a second line.
