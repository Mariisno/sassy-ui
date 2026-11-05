A button that opens the file chooser. The same look as Button, but a `<label>` around a hidden `<input type="file">`.

```jsx
<FileButton iconLeft="image" accept="image/*" capture="environment" onFiles={([f]) => take(f)}>Ta bilde</FileButton>
<FileButton variant="secondary" iconLeft="image" accept="image/*" multiple onFiles={add}>Velg bilder</FileButton>
<FileButton variant="ghost" size="sm" accept=".json,application/json" onFiles={([f]) => restore(f)}>Hent fra sikkerhetskopi</FileButton>
```

- Same variants and sizes as Button; the label names the outcome ("Ta bilde", "Velg fil"), never "Browse".
- `onFiles` gets a non-empty `File[]`, and the input is reset after each pick, so the same file can be picked twice in a row.
- Keyboard: Tab lands on the hidden input, the label shows the focus ring, Enter or Space opens the chooser.
- `disabled` looks like a disabled Button and takes no clicks or focus.
- Input props pass through (`id`, `name`, `aria-describedby`); `className` and `style` go to the label.
