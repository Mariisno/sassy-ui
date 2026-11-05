Pill chip for filters, categories and removable values; becomes a toggle when `selected` is set.

```jsx
<Tag icon="hash">research</Tag>
<Tag selected={on} onClick={() => setOn(!on)}>Open</Tag>
<Tag onRemove={() => {}}>Figma</Tag>                         {/* remove button: "Fjern Figma" */}
<Tag onRemove={remove} removeLabel="Remove Figma">Figma</Tag>
```

- The remove (×) button is its own 24 px button beside the label, so it works with Enter and Space and never sits inside the toggle.
