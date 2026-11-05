Anchored, non-modal surface for a few controls that belong to one button: a filter, a date pick, a colour choice. For a list of actions use `Menu`; for a task that needs the whole screen use `Dialog`.

```jsx
<Popover trigger={<Button variant="secondary" iconRight="chevron-down">Filter</Button>} aria-label="Filter">
  <Checkbox label="Only mine" />
  <Checkbox label="Done too" />
</Popover>
```

- `trigger` is one focusable element (Button, IconButton). It gets `aria-expanded`, `aria-controls`, the click and the ref. A string or a fragment cannot take them, so nothing opens (a warning in development).
- Placed below the trigger (`side="top"` above), flips when it does not fit, stays 8 px inside the viewport, also at 320 px. `align="end"` for a button at the right of a row.
- Opens on click; closes on Esc (focus back on the trigger), on a click outside and when focus moves elsewhere. Tab at the panel's edge goes back through the trigger, so the page's tab order carries on.
- `portal` renders the panel in `<body>` (position: fixed): use it from inside a dialog body, a sidebar or anything with `overflow: hidden` or a transform. Inside a `Dialog`, Esc closes the popover first, the dialog on the next press.
- Name the panel with `aria-label` or `aria-labelledby`, and give it a `role` when it is more than a group of controls (`role="dialog"` for a small form).
- `open` + `onOpenChange(open, reason)` for a controlled popover.
- The panel scrolls when it is taller than the screen, so a `Tooltip` on a control inside it is clipped at the panel's edge: use the control's own label instead.
