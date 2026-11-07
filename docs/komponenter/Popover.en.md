---
name: Popover
group: overlays
status: new
since: 0.6.0
side: https://mariisno.github.io/sassy-ui/en/components/popover/
typer: dist/overlays/Popover.d.ts
---

# Popover

A non-modal surface anchored to the button that opens it. The button gets `aria-expanded` and `aria-controls` and toggles the panel on click; the panel sits below the button (above with `side="top"`), flips when it does not fit and there is more room on the other side, and stays 8 px inside the viewport, also at 320 px. Focus moves in on open, Esc closes with focus back on the button, a click outside and focus moving elsewhere close it, and Tab at the panel's edge goes back through the button, so the page's tab order carries on from there. [Menu](Menu.en.md) is a Popover with `role="menu"`; use that for a list of actions.

## When to use

- A few controls that belong to one button: a filter, a date pick, a colour choice.
- A short form that does not need the whole screen: "Rename", "Add a tag".
- `portal` when the button sits in a dialog body, a sidebar or anything with `overflow: hidden` or a transform.
- `align="end"` for a button at the right of a row, so the panel does not run off the edge.

## When not to

- A list of actions: [Menu](Menu.en.md), which has the roles and keys a menu needs.
- A task that needs full attention, or something that cannot be undone: [Dialog](Dialog.en.md).
- A hint by an icon: [Tooltip](Tooltip.en.md).
- Content too long for the screen: the panel scrolls, but a page or a sheet is better.

## Do

- Give `trigger` one element that can take focus, a Button or an IconButton.
- Name the panel with `aria-label` or `aria-labelledby`, and give it `role="dialog"` when it is more than a group of controls.
- Put a closing button inside the panel when something is confirmed ("Apply filter"); otherwise Esc and a click outside are enough.
- Keep the content short: a few controls, one short form.

## Don't

- Don't pass a string or a fragment as `trigger`; it cannot take a ref and the handlers, so nothing opens (a warning in development).
- Don't use a Popover without `portal` from a dialog body or a card with `overflow: hidden`; the panel is clipped.
- Don't put a [Tooltip](Tooltip.en.md) on a control in the panel; the panel scrolls and clips the bubble at its edge. Use the control's own text.
- Don't keep important content only in a popover; it closes when focus moves on.

## Example

```jsx
import { Popover, Button, Checkbox } from 'sassy/components';

<Popover trigger={<Button variant="secondary" iconRight="chevron-down">Filter</Button>} aria-label="Filter">
  <Checkbox label="Only mine" />
  <Checkbox label="Done too" />
</Popover>

<Popover portal align="end" trigger={<Button variant="secondary">Rename</Button>} aria-label="Rename" onOpenChange={(open, reason) => log(reason)}>
  <Input label="Name" defaultValue="Tomatoes" />
</Popover>
```

## Props

The types are in `dist/overlays/Popover.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/popover/). `placePopover(trigger, panel, viewport, { side, align })` is the placement on its own, exported for tests and for surfaces of your own.

<!-- props: PopoverProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | *required* | One focusable element, a Button or an IconButton. It is cloned with the ref, the handlers and the ARIA attributes. A string or a fragment cannot take them, so nothing opens; in development that logs a warning. |
| `children` | `React.ReactNode` | – | The panel's content: a few controls, a short form. |
| `open` | `boolean` | – | Controlled open state. Leave it out for an uncontrolled popover. |
| `defaultOpen` | `boolean` | `false` | Open from the start, uncontrolled. Default false. |
| `onOpenChange` | `(open: boolean, reason: string) => void` | – | Called with the new state and why: 'trigger', 'keyboard', 'escape', 'outside', 'blur', 'tab' or 'select' (Menu). |
| `side` | `'bottom' \| 'top'` | `'bottom'` | Preferred side. Default 'bottom'; it flips when there is no room. |
| `align` | `'start' \| 'end'` | `'start'` | Which edge of the trigger the panel lines up with. Default 'start' (left); 'end' for a button at the right of a row. |
| `portal` | `boolean` | `false` | Render the panel into document.body (position: fixed), so a positioned, transformed or clipped parent (a dialog body, a sidebar, a card with overflow hidden) cannot cut it off or draw over it. Off by default; no effect without a document (a build-time render). In a prerendered app, open it after hydration. |
| `autoFocus` | `boolean` | `true` | Move focus into the panel on open. Default true; Menu turns it off and places focus itself. |
| `panelRef` | `React.Ref<HTMLDivElement>` | – | Reaches the panel element. |
| `className` | `string` | – | Classes on the panel. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `children`.
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules and the placement in unit tests.

- **Element and role.** The trigger is cloned with `aria-expanded` and, while the panel is open, `aria-controls` pointing at the panel's id (tested). The panel is a `<div tabIndex={-1}>` with no role of its own; `role`, `aria-label`, `id`, `data-*` and `aria-*` reach it.
- **Focus in.** The first control in the panel, else the panel itself (tested for both).
- **Keyboard.** Esc closes and puts focus back on the trigger (tested). Tab after the last control and Shift+Tab before the first close and go back through the trigger, so focus lands on the element after or before it (tested).
- **Closing.** A click outside closes without moving focus to the trigger (tested). Focus moving to another element closes (tested); focus that just goes away (no `relatedTarget`, as on a tap in Safari) does not.
- **Inside a dialog.** With or without `portal`: the dialog's focus trap lets focus into a panel whose trigger is in the dialog, the dialog's Tab cycle leaves the panel's controls out, and Esc closes the popover first, the dialog on the next press (tested for both). A popover elsewhere on the page cannot take focus out of an open dialog (tested).
- **Placement.** Below the trigger with a 6 px gap, above when it does not fit and there is more room there (tested at the bottom of the screen); 8 px inside the viewport at 320 px with no sideways scroll (tested). With `portal` the panel is a child of `<body>` and still sits by its trigger inside a transformed, clipped parent (tested).
- **Contrast.** The panel is `--surface-1` (`--surface-2` in dark mode) with `--border` and `--shadow-lg`; the text inherits `--fg-1`.
- **Motion.** The panel fades in over 4 px on `--dur-fast` (`s-popover-down`, `s-popover-up` when above). Under `prefers-reduced-motion` the animation is removed (tested: `none`, `0s`).
- **Size.** At most the screen minus 16 px each way (`100dvh`/`100dvw`, with `vh`/`vw` as the fallback), so the panel scrolls inside when the content is taller.
- **Built-in text.** None.
- **Known limits.** The panel scrolls when taller than the screen, so a Tooltip inside it is clipped at the edge. A trigger that cannot take a ref opens nothing; in development that logs a warning.

## Content

- The button says what the panel holds: "Filter", "Sort", "Rename".
- A button inside the panel names the outcome: "Apply filter", "Save name".
- No title in the panel when the button already says it; `aria-label` repeats the button's text.
