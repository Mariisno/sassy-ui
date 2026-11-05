Text for assistive technology that nobody sees: `.s-sr-only` as a component. `focusable` makes a skip link show while it has the focus.

```jsx
<VisuallyHidden as="a" href="#innhold" focusable>Hopp til innholdet</VisuallyHidden>
<h2><VisuallyHidden>Planter i</VisuallyHidden> Drivhuset</h2>
<button><Icon name="trash-2" /><VisuallyHidden>Slett raden</VisuallyHidden></button>
<VisuallyHidden role="status">Lagret</VisuallyHidden>
```

- 1 px, clipped and off screen, never `display:none` or `visibility:hidden`, so screen readers read it and `role="status"` on it is announced.
- `focusable` only on something that can take the focus (a link, a button): it then comes back into the flow where it stands, at least 24 px tall. AppShell has its own skip link; this is for pages without it.
- Not for text everyone should see, and not to hide a control: a control that is hidden from sight is still in the tab order.
- Prefer a visible label; use this for the words only a screen reader needs (a heading for a region, the object of an icon button, «(åpner i ny fane)»).
- Inside the text of a link or a button, start it with a space so the hidden words do not run into the visible ones.
