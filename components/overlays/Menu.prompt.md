A menu button for the actions on one thing: a row's "more" button, a header's overflow. Two or three actions a row always needs can stay as buttons; from a third, or when one is delete, put them behind a menu so delete takes a deliberate second step.

```jsx
<Menu align="end" triggerLabel="More actions" onSelect={(id) => act(id)} items={[
  { id: 'edit', label: 'Edit', icon: 'pencil' },
  { id: 'copy', label: 'Duplicate', icon: 'copy' },
  '-',
  { id: 'delete', label: 'Delete', icon: 'trash-2', danger: true },
]} />
```

- The default trigger is an `IconButton` with the ellipsis, named "Flere valg" (`triggerLabel`; English surfaces pass "More actions"). Pass `trigger={<Button iconRight="chevron-down">Sort</Button>}` for a labelled one; it must be one element that takes a ref (a string or a fragment is replaced by the default, with a warning in development). The trigger gets `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`.
- Keyboard (WAI-ARIA menu button): Enter, Space and ArrowDown open on the first item, ArrowUp on the last. Arrows move with wrap, Home and End jump, a letter goes to the next item starting with it. Enter and Space choose and close, Esc closes and returns focus to the button, Tab closes and moves on.
- Items: `label`, `icon`, `onSelect` or the menu's `onSelect(id, item)`, `href` for a link, `disabled` (skipped by the keys, still read), `danger` (set apart in the danger colour: put it last, after a separator), `checked` (a `menuitemcheckbox` with a check mark). `'-'` is a separator; `{ label, items }` a labelled group.
- Items are 44 px on touch, 32 px with a mouse. Labels are sentence-case verb phrases ("Delete project", not "Delete").
- `portal` for a trigger inside a dialog body, a card with `overflow: hidden` or a transformed parent; `align="end"` for a button at the right of a row. Inside a `Dialog`, Esc closes the menu first.
- A row that opens on click: stop the click in the trigger (`onClick={(e) => e.stopPropagation()}` on your own trigger, or wrap the Menu) so opening the menu does not open the row.
