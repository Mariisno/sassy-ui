---
name: Tabs
group: navigation
status: stable
since: 0.2.0
kort: components/navigation/tabs.card.html
typer: components/navigation/Tabs.d.ts
---

# Tabs

Tabs switch between sibling views: `underline` for sections of a page, `segmented` for view switches and filters. The keyboard follows the WAI-ARIA tabs pattern: only the selected tab is in the Tab order, ← and → move and select, Home and End jump to the ends. `TabPanel`s as children are wired to their tab with `aria-controls` and `aria-labelledby`, and the panels not shown stay mounted, so what you typed survives a switch. Controlled (`value`) or not (`defaultValue`).

## When to use

- Sections of one page that share a context: tasks, notes, settings of the same project (`underline`).
- A compact view switch: list or board, week or month (`segmented`).
- A filter with two to four values where one is always selected (`segmented` without panels).

## When not to

- The app's main navigation: [AppShell](AppShell.en.md).
- Steps of a process taken in order: "Next" and "Back" buttons.
- Many tabs that do not fit: [Select](Select.en.md), or put the tabs in a [ScrollRow](ScrollRow.en.md) as a last resort.
- Filters where several can be selected at once: [Tag](Tag.en.md).
- One answer in a form, read on submit: [SegmentedControl](SegmentedControl.en.md). Tabs switch what is shown; it answers a question.

## Do

- Put the content in `TabPanel`s as children, so tab and panel are linked for the screen reader.
- Name the tab list with `aria-label` when there is no heading right above it.
- Two to five tabs, one or two words each. `count` for a number that means something ("Tasks 12").
- Always have one tab selected. Without `defaultValue` it is the first.

## Don't

- Don't make a tab an action ("Add"). Tabs show, they do not do.
- Don't use icons without text in tabs.
- Don't put panels outside `Tabs`; `TabPanel` renders nothing without a Tabs around it.
- Don't put two tab sets that look alike on the same page without an `aria-label` that tells them apart.

## Example

```jsx
import { Tabs, TabPanel } from 'sussi/components';

<Tabs aria-label="Project" items={[{ id: 'tasks', label: 'Tasks', count: 12 }, { id: 'notes', label: 'Notes' }]} onChange={setTab}>
  <TabPanel value="tasks">…</TabPanel>
  <TabPanel value="notes">…</TabPanel>
</Tabs>
<Tabs variant="segmented" aria-label="View" items={[{ id: 'list', label: 'List', icon: 'list' }, { id: 'board', label: 'Board', icon: 'layout-grid' }]} value={view} onChange={setView} />
```

## Props

The types are in `components/navigation/Tabs.d.ts`. The card: `components/navigation/tabs.card.html`.

<!-- props: TabsProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `TabItem[]` | `[]` | The tabs. |
| `value` | `string` | – | The selected tab (controlled). |
| `defaultValue` | `string` | – | The tab selected at first (uncontrolled). Otherwise the first. |
| `onChange` | `(id: string) => void` | – | Called when a tab is selected, with its `id`. |
| `variant` | `'underline' \| 'segmented'` | `'underline'` | underline for sections of a page, segmented for view switches and filters. |
| `id` | `string` | – | Base for the tab and panel ids. Defaults to React.useId(). |
| `children` | `React.ReactNode` | – | TabPanels, rendered after the tab list. |
| `aria-label` | `string` | – | Names the tab list, e.g. "Prosjektvisning". Passed on with the other aria-* and data-* props. |
| `className` | `string` | – | Classes on the tab list. |
| `style` | `React.CSSProperties` | – | Style on the tab list. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `onChange`, `defaultValue`.
<!-- /props -->

### TabItem

<!-- props: TabItem -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | *required* | The key; `value` and `TabPanel value` point at it. |
| `label` | `React.ReactNode` | *required* | The text on the tab. |
| `icon` | `string` | – | Lucide icon name before the text. |
| `count` | `number \| string` | – | A number after the text, in monospace. |
<!-- /props -->

### TabPanel

<!-- props: TabPanelProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | *required* | The id of the TabItem this panel belongs to. |
| `children` | `React.ReactNode` | – | The content. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/tabs.e2e.test.mjs`.

- **Element and role.** A `<div role="tablist">` with a `<button role="tab" type="button">` per tab, `aria-selected` on the selected one, and `aria-controls` to the panel when the tab has a `TabPanel` (not otherwise, tested). `TabPanel` is a `<div role="tabpanel">` with `aria-labelledby` to its tab, `tabIndex=0`, and `hidden` when not selected.
- **Name.** A tab is named by its text (`label`, with `count` after). The tab list is named by `aria-label`. The panel is named by its tab.
- **Keyboard.** Tab lands on the selected tab (roving `tabindex`: 0 on the selected, −1 on the rest) and goes on into the panel. ← and → move focus and select, wrapping at the ends; Home and End jump to the first and last. `onChange` is called on every selection (tested).
- **Focus.** The standard focus ring on the tab, and on the panel, which can take focus even when it has no links.
- **State.** Selected is `aria-selected="true"`, the text `--fg-1` and a 2 px line in `--accent` underneath (`underline`), or a raised segment in `--surface-1` with `--shadow-sm` (`segmented`; `--surface-3` in dark mode). Never colour alone.
- **Contrast.** Unselected text is `--fg-2`, selected `--fg-1`. `count` is `--fg-3`, and `--fg-2` on the selected tab, since `--fg-3` on the dark segment was 4.31:1 (0.5.3, `tests/polish.test.mjs`).
- **Content.** Panels not shown stay mounted, so forms in them keep what you typed (tested).
- **Target.** The tabs are 40 px tall, the segments 30 px. Known limit: under 44 px on touch.
- **Motion.** The colour transitions on `--dur-fast`, 0 under reduced motion.
- **Built-in text.** None.
- **Known limit.** Horizontal only. An arrow-key selection is immediate (automatic activation); there is no mode where Enter must be pressed.

## Content

- Tab labels are plural nouns or view names: "Tasks", "Notes", "List", "Board".
- One or two words. If they do not fit, there are too many tabs.
- `count` is a number without text: `12`, not "12 items".
- `aria-label` is what the tabs are about: "Project", "View".
