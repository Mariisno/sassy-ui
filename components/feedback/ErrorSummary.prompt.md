The box at the top of a form after a failed submit: a title, an optional line and one link per field with an error. It takes the focus when it appears; a link moves the focus to its field, or to the first control in a Fieldset.

```jsx
{errors.length > 0 && (
  <ErrorSummary key={attempt} errors={[
    { id: 'navn', message: 'Skriv navnet på planten.' },
    { id: 'sol', message: 'Velg hvor mye sol stedet får.' },
  ]}>Rett feilene under, så kan du lagre.</ErrorSummary>
)}
<Input id="navn" label="Navn på planten" error="Skriv navnet på planten." />
<Fieldset id="sol" legend="Hvor mye sol får stedet?" error="Velg hvor mye sol stedet får.">…</Fieldset>
```

- Mount it when the submit fails, above the first field; remove it when the form is valid. Give it a new `key` (a submit counter) on the next failed submit, so the focus moves to it again.
- `errors` is one entry per field, in the form's order, with the field's `id` and the same message as under the field. An entry without `id` is plain text.
- It is a `<section>` with `tabIndex={-1}`, named by its title, and the content is in `role="alert"`: the focus places the person, the alert makes sure it is read.
- Each link is a plain `href="#id"`; on click the focus goes to the element with that id, or to the first control inside it when it is a Fieldset, and the group's legend is scrolled into view.
- «Noe må rettes før du kan gå videre» is the default title; English surfaces pass `title="Something needs fixing before you go on"`.
- `level` sets the heading level (default 2). Not for one error in one field: that is `error` on the field alone.
