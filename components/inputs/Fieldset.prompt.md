A group of related controls, above all a radio or checkbox group: `<fieldset>` + `<legend>`, with hint and error tied to the group. The children are the existing Radio, Checkbox and Switch, unchanged.

```jsx
<Fieldset legend="Hvor mye sol får stedet?" hint="Målt midt på dagen.">
  <Radio name="sol" value="full" label="Full sol" />
  <Radio name="sol" value="halv" label="Halvskygge" />
  <Radio name="sol" value="skygge" label="Skygge" />
</Fieldset>
<Fieldset id="dager" legend="Hvilke dager vanner du?" error="Velg minst én dag." layout="row">
  <Checkbox name="dag" value="man" label="Mandag" />
  <Checkbox name="dag" value="tor" label="Torsdag" />
</Fieldset>
```

- `legend` is the question the group answers; it is the group's name. Always give it.
- `hint` sits under the legend, `error` under the controls with an icon; both are linked to the fieldset with `aria-describedby`. The error replaces the hint and is announced (`role="alert"`), like Field.
- An error also gives the group a `--danger` edge on the left; the icon and text carry the meaning, never the colour alone.
- `layout="row"` for two or three short options side by side; the default stacks.
- `optional` adds «Valgfritt» to the legend; English surfaces pass `optionalLabel="optional"`.
- Give the fieldset an `id` when an ErrorSummary links to it: the focus then lands on the first control in the group.
- Not for one checkbox on its own, and not as a layout box around unrelated fields.
