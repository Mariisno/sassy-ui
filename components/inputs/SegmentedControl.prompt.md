Two to five mutually exclusive options in a row, as one value in a form. A native radio group in the segmented look: one Tab stop, the arrow keys move within.

```jsx
<SegmentedControl label="Hvor står planten?" options={['Ute', 'Inne', 'Drivhus']} defaultValue="Ute" />
<SegmentedControl label="Enhet" options={[{ value: 'g', label: 'Gram' }, { value: 'dl', label: 'Desiliter' }]} value={unit} onChange={setUnit} fullWidth />
```

- `label` is the question the options answer; it is the group's name (the `<legend>`). Without it, pass `aria-label`.
- Always give `defaultValue` or `value`: an empty segmented control looks like a row of buttons.
- Two to five short options, all visible at once. More, or long labels: Select or Radio.
- Not Tabs. `Tabs variant="segmented"` switches what is shown (a view or a filter, applies at once); SegmentedControl is a value in a form (`role="radiogroup"`), read on submit or with `onChange`.
- `fullWidth` for a control that should line up with the inputs above it on a phone.
