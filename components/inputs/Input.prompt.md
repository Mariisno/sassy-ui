Labelled single-line text input with hint/error — the default form control.

```jsx
<Input label="Project name" placeholder="e.g. Garden log" />
<Input icon="search" placeholder="Search" suffix="⌘K" />
<Input label="Email" mode="email" error="That doesn't look like an email yet." />
<Input label="Plants per row" mode="number" />
<Input label="Password" mode="password" autoComplete="new-password" passwordToggleLabel="Show password" />
```

- Mark the rare optional field with `optional` instead of asterisking required ones. It reads "Valgfritt"; English surfaces pass `optionalLabel="optional"`.
- `hint` and `error` are linked to the field with aria-describedby, so screen readers read them. Your own `aria-describedby` is kept too.
- `mode` sets `type`, `inputMode` and `autoComplete` for the common fields: `number`, `decimal`, `phone`, `email`, `url`, `search`, `date`, `time`, `password`. Numbers are text with a numeric keyboard, not `type="number"`. Your own `type`/`inputMode`/`autoComplete` wins.
- `mode="password"` adds a show/hide toggle (`aria-pressed`, named "Vis passord"; pass `passwordToggleLabel` in English). Pass `autoComplete="new-password"` when the password is being set.
- Error copy explains how to fix, never blames ("…yet", not "Invalid").
