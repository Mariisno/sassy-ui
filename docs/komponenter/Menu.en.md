---
name: Menu
group: overlays
status: new
since: 0.6.0
side: https://mariisno.github.io/sassy-ui/en/components/menu/
typer: dist/overlays/Menu.d.ts
---

# Menu

A menu button following the WAI-ARIA menu button pattern: a Button or IconButton with `aria-haspopup="menu"` that opens a list of actions in a [Popover](Popover.en.md) with `role="menu"`. Enter, Space and ArrowDown open on the first item, ArrowUp on the last; the arrows move with wrap, Home and End jump, a letter goes to the next item starting with it; Enter and Space choose and close, Esc closes and puts focus back on the button, Tab closes and moves on. An item can be a link (`href`), checked (`checked`), disabled (`disabled`) or set apart in the danger colour (`danger`); `'-'` is a separator and `{ label, items }` a group with a heading. Items are 44 px on touch and 32 px with a mouse.

## When to use

- The actions on one thing behind one button: a row's "More actions", a page's overflow.
- When one of the actions is delete: behind a menu it takes a deliberate second tap, set apart with `danger`.
- A choice between a few settings, such as sorting, with `checked` on the one in effect.
- `portal` when the button sits in a dialog body, a card with `overflow: hidden` or a transformed parent.

## When not to

- One or two actions a row always needs: show them as buttons.
- Navigation between pages: [AppShell](AppShell.en.md) or [Tabs](Tabs.en.md).
- A few controls that belong to a button, a filter or a form: [Popover](Popover.en.md).
- A choice in a form: [Select](Select.en.md) or [Radio](Radio.en.md).

## Do

- Write the items as verb phrases in sentence case: "Edit", "Duplicate", "Delete project".
- Put the `danger` item last, after a separator `'-'`.
- Give `triggerLabel` a name that says what the menu is for when several share a page: "More actions for Tomatoes".
- Use `align="end"` for a button at the right of a row, so the menu does not run off the edge.
- Stop the click in a row that opens something itself, so the menu button does not open the row: `onClick={(e) => e.stopPropagation()}` on your own `trigger`.

## Don't

- Don't go past seven items; split them into groups with headings, or move something to the page.
- Don't put a form or text inside the menu; the items are actions. Use [Popover](Popover.en.md).
- Don't use `disabled` to hide something; the item stays and is read. Leave it out instead.
- Don't pass a string or a fragment as `trigger`; it cannot take a ref, so the default button is used instead (a warning in development).

## Example

```jsx
import { Menu, Button } from 'sassy/components';

<Menu align="end" triggerLabel="More actions for Tomatoes" onSelect={(id) => act(id)} items={[
  { id: 'edit', label: 'Edit', icon: 'pencil' },
  { id: 'copy', label: 'Duplicate', icon: 'copy' },
  '-',
  { id: 'delete', label: 'Delete project', icon: 'trash-2', danger: true },
]} />

<Menu trigger={<Button variant="secondary" iconRight="chevron-down">Sort</Button>} onSelect={(id) => setSort(id)} items={[
  { label: 'Sort by', items: [
    { id: 'name', label: 'Name', checked: sort === 'name' },
    { id: 'date', label: 'Last changed', checked: sort === 'date' },
  ] },
]} />
```

## Props

The types are in `dist/overlays/Menu.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/menu/). The remaining props are [Popover](Popover.en.md)'s (`PopoverProps`), minus the ones the menu sets itself.

<!-- props: MenuProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | – | The button. Default: an IconButton with the ellipsis icon, named by `triggerLabel`. A trigger that cannot take a ref (a string, a fragment) is replaced by the default; in development that logs a warning. |
| `triggerLabel` | `string` | `'Flere valg'` | Accessible name of the default trigger. Default "Flere valg"; English surfaces pass "More actions". |
| `items` | `MenuEntry[]` | `[]` | Items, separators ('-' or { separator: true }) and labelled groups, in order. |
| `label` | `string` | – | Accessible name of the menu itself. Without it the menu is named by its button (aria-labelledby). |
| `onSelect` | `(id: string \| undefined, item: MenuItem, event: React.SyntheticEvent) => void` | – | Called for every chosen item, after the item's own onSelect. |
| `open` | `boolean` | – | Controlled open state. Leave it out for an uncontrolled menu. |
| `defaultOpen` | `boolean` | `false` | Open from the start, uncontrolled. Default false. |
| `onOpenChange` | `(open: boolean, reason: string) => void` | – | Called with the new state and why: 'trigger', 'keyboard', 'escape', 'outside', 'blur', 'tab' or 'select'. |
| `side` | `'bottom' \| 'top'` | `'bottom'` | Preferred side. Default "bottom"; it flips when there is no room. |
| `align` | `'start' \| 'end'` | `'start'` | Which edge of the button the menu lines up with. Default 'start' (left); 'end' for a button at the right of a row. |
| `portal` | `boolean` | `false` | Render the menu into document.body (position: fixed), for a button inside a dialog body, a card with overflow hidden or a transformed parent. Off by default. |
| `className` | `string` | – | Classes on the menu. |

Plus every prop of `PopoverProps`, except `trigger`, `children`, `autoFocus`, `panelRef`, `open`, `defaultOpen`, `onOpenChange`, `side`, `align`, `portal`, `className`.
<!-- /props -->

An item in `items`:

<!-- props: MenuItem -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | – | Given to onSelect. Also the React key. |
| `label` | `React.ReactNode` | *required* | The text: a verb phrase in sentence case, "Delete project". A string is what the letter keys search in. |
| `icon` | `string \| React.ReactNode` | – | A Lucide name from the set (see dist/icon/iconData.js), or an element. |
| `onSelect` | `(id: string \| undefined, event: React.SyntheticEvent) => void` | – | Called when the item is chosen, with its `id`. |
| `href` | `string` | – | Renders the item as a link (role="menuitem" on an <a>). |
| `disabled` | `boolean` | – | Kept in the list and read by screen readers (aria-disabled), skipped by the arrow keys, does nothing when chosen. |
| `danger` | `boolean` | – | Set apart in the danger colour, for delete and the like. Put it last, after a separator. |
| `checked` | `boolean` | – | A boolean makes the item a menuitemcheckbox with aria-checked and a check mark. Choosing it still closes the menu. |
| `className` | `string` | – | Classes on the item. |
<!-- /props -->

A group in `items` (`{ label, items }`); a separator is `'-'` or `{ separator: true }`:

<!-- props: MenuGroup -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | *required* | The group's heading, read as the name of the group. |
| `items` | `MenuItem[]` | *required* | The items in the group. |
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules and the contrast in unit tests.

- **Element and role.** The button gets `aria-haspopup="menu"`, `aria-expanded` and, while the menu is open, `aria-controls` (tested). The menu is `role="menu"`, named by the button (`aria-labelledby`) or by `label` (tested). Items are `role="menuitem"` on a `<button>` or an `<a href>`, `role="menuitemcheckbox"` with `aria-checked` when `checked` is set (tested); `role="separator"`, and `role="group"` with `aria-labelledby` pointing at the heading (tested).
- **Focus in.** The first item on Enter, Space, ArrowDown and click; the last on ArrowUp (tested).
- **Keyboard.** ArrowDown and ArrowUp move with wrap and skip `disabled` (tested). Home and End jump (tested). A letter goes to the next item starting with it, wrapping (tested). Enter and Space choose, close and put focus on the button (tested). Esc closes and puts focus on the button (tested). Tab closes and goes to the element after the button, Shift+Tab to the one before, also from the last item (tested).
- **Closing.** A click outside closes without moving focus to the button (tested). A click on an item chooses and closes (tested).
- **Disabled.** `disabled` sets `aria-disabled="true"`, not `disabled`, so the item stays in the accessibility tree and is read; the arrows skip it, and a click does nothing (tested). No hover fill.
- **Inside a dialog.** With or without `portal`: the arrows stay in the menu, Esc closes the menu and not the dialog, Tab and Shift+Tab close and keep focus in the dialog (tested).
- **Placement.** As Popover: `align="end"` lines the menu up with the button's right edge, at the bottom of the screen it flips above (tested); inside 320 px with no sideways scroll (tested); with `portal` a child of `<body>` by the button inside a transformed parent (tested).
- **Contrast.** Items are `--fg-1` on the panel; hover and focus are `--surface-2` (`--surface-3` in dark mode), measured 4.5:1 in both themes. `danger` is `--danger-fg` with `--danger-soft` on hover, 6.8:1 in both themes (tested).
- **Motion.** The Popover's fade on `--dur-fast`; none under `prefers-reduced-motion` (tested).
- **Size.** Items are at least 44 px tall on touch and 32 px with a mouse (tested); the focus ring sits inside the panel, so scrolling does not clip it.
- **Built-in text.** "Flere valg" (Norwegian) on the default button. Override with `triggerLabel` ("More actions").
- **Known limits.** No `menuitemradio`; `checked` gives `menuitemcheckbox`, and choosing a checked item closes the menu. The letter keys search the item's text, so a `label` that is not a string is not searched.

## Content

- Items are verb phrases in sentence case: "Edit", "Duplicate", "Delete project". Not "Editing", not "Delete …?".
- Delete names the object when it is not obvious: "Delete project", not just "Delete".
- The button is called "More actions" (or "More actions for Tomatoes" when several share a page); Norwegian surfaces "Flere valg".
- No icons without text in the menu; the icon is an extra, the text is the item.
