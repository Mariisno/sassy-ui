---
name: AppShell
group: navigation
status: stable
since: 0.3.0
kort: components/navigation/appshell.card.html
typer: components/navigation/AppShell.d.ts
---

# AppShell

The frame around an app, with its main menu: a tab bar at the bottom below 900 px and a 248 px sidebar from 900 px, both `<nav aria-label="Hovedmeny">` with `aria-current="page"` on the item you are on. Up to five tabs fit; with more, the fifth becomes "Mer" (more), a keyboard-usable list of the rest. AppShell renders the page's `<main>` with room for the tab bar and the home indicator, and the first thing in the tab order is a skip link to `<main>`. `contained` gives the tab bar at every width, at the bottom of the app's own frame.

## When to use

- Around the whole app, once, with three to five items in the main menu.
- An app that should work as well on a phone as on a big screen.
- `contained` for an app that stays phone-width on a big screen, inside its own frame.

## When not to

- Tabs inside a page: [Tabs](Tabs.en.md).
- A website with pages people read: an ordinary top menu; AppShell is for apps.
- A menu with more than six or seven items: merge, or move the rare ones to a settings page.

## Do

- Three to five items. Fewer is better (Hick's law); from six the fifth becomes "Mer".
- Give every item an icon and one word. The text is what people read.
- Use `href` when the app has routes, so the items are links; otherwise `onNavigate`.
- Pass `label="Main menu"`, `moreLabel="More"` and `skipLabel="Skip to content"` on English surfaces.
- Put `brand` (the wordmark) at the top and `footer` (account, a count) at the bottom of the sidebar.

## Don't

- Don't add your own skip link or your own `<main>`; AppShell has both.
- Don't use long labels on the tabs. They wrap rather than clip, and take room.
- Don't rely on colour alone for the active item; AppShell gives a filled surface and semibold text, leave it.
- Don't render more than one AppShell on a page.

## Example

```jsx
import { AppShell } from 'sussi/components';

<AppShell
  items={[
    { id: 'today', label: 'Today', icon: 'sparkles', href: '#/today' },
    { id: 'projects', label: 'Projects', icon: 'layout-grid', href: '#/projects' },
    { id: 'add', label: 'Add', icon: 'plus', href: '#/add' },
    { id: 'plants', label: 'Plants', icon: (size) => <PlantIcon size={size} />, href: '#/plants' },
  ]}
  current={route}
  label="Main menu" moreLabel="More" skipLabel="Skip to content"
  brand={<span>theapp<i>.</i></span>}
  footer={<Account />}>
  <Page />
</AppShell>
```

## Props

The types are in `components/navigation/AppShell.d.ts`. The card: `components/navigation/appshell.card.html`.

<!-- props: AppShellProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AppShellItem[]` | `[]` | The menu items. |
| `current` | `string` | – | id of the current item. |
| `onNavigate` | `(id: string, e: React.MouseEvent) => void` | – | Called on a click on an item, with its `id`. |
| `brand` | `React.ReactNode` | – | Top of the sidebar, e.g. the wordmark. Sidebar only. |
| `footer` | `React.ReactNode` | – | Bottom of the sidebar, e.g. account or a count. Sidebar only. |
| `label` | `string` | `'Hovedmeny'` | Accessible name of both menus. Default "Hovedmeny". |
| `moreLabel` | `string` | `'Mer'` | Label of the overflow tab. Default "Mer". |
| `skipLabel` | `string` | `'Hopp til innholdet'` | Text of the skip link, the first thing in the tab order (WCAG 2.4.1). It shows when it has focus and moves focus to <main> with code, so an app that routes on the hash keeps its route. Default "Hopp til innholdet"; English surfaces pass "Skip to content". |
| `mainId` | `string` | – | id of <main>, the skip link's target. Default: a generated id. |
| `contained` | `boolean` | `false` | The tab bar at every width, at the bottom of the parent instead of fixed to the screen, and no sidebar. For an app that lives in its own frame, like a phone-width shell on a big screen. The parent gives the height (AppShell fills it), and the page sets its own padding. Default false. |
| `className` | `string` | – | Classes on the frame. |
| `children` | `React.ReactNode` | – | The page; rendered inside `<main>`. |
<!-- /props -->

### AppShellItem

<!-- props: AppShellItem -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | *required* | The key; `current` points at it. |
| `label` | `string` | *required* | The text. One word is best. |
| `icon` | `string \| ((size: number) => React.ReactNode) \| React.ReactNode` | – | A Lucide icon name, or the app's own icon: a function that gets the size (22 in the tab bar, 18 in the sidebar, 20 under "Mer") and returns an element, or an element. Draw your own on Lucide's grid (24 × 24, 1.75 stroke, `currentColor`) so it matches. Decorative: the label names the item. |
| `href` | `string` | – | Link target, e.g. "#/planter". Without it the item is a button and onNavigate does the navigation. |
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/appshell.e2e.test.mjs` and `tests/appshell-hover.e2e.test.mjs`, the rules in `tests/appshell.test.mjs`.

- **Landmarks.** Both menus are `<nav aria-label={label}>` ("Hovedmeny"); only one is visible at a time. The page is `<main id tabIndex={-1}>`, rendered by AppShell. Do not add another `<main>` inside.
- **Skip link.** The first thing Tab lands on is `<a class="s-shell__skip">` ("Hopp til innholdet"): invisible at rest, visible on focus as an accent pill, at least 44 px tall and 4.5:1. Enter moves focus to `<main>` with code and leaves the hash alone, so an app that routes on the hash keeps its route (tested, WCAG 2.4.1).
- **Items.** `<a href>` or `<button type="button">`, `aria-current="page"` on the active one. Every target is at least 44 px (tested in both menus). The icon is decorative; the text is the name.
- **Active item.** Filled `--accent` with `--accent-fg` and semibold text: the fill holds 3:1 against the page and the text 4.5:1 against the fill in both themes and every accent (tested). Hover holds 4.5:1 in the sidebar, the tab bar and "Mer" (tested).
- **"Mer".** A `<button aria-expanded aria-controls>` that opens the list above the page. Enter opens and moves focus to the first item; Esc closes and moves focus back to "Mer"; a click outside closes; a choice navigates, closes, and marks "Mer" as where you are (tested).
- **Focus.** The standard focus ring on every item. `<main>` gets no ring; it is focused only by the skip link.
- **Covered content.** Below 900 px the page has `scroll-padding-bottom` so a focused element does not end up under the tab bar, and a `ToastStack` is lifted above the bar (WCAG 2.4.11). Not in `contained`, where the content scrolls inside the frame.
- **Text.** The tab labels wrap instead of clipping (0.5.3, WCAG 1.4.4).
- **Motion.** Colour transitions on `--dur-fast`, 0 under reduced motion. The tab bar has a blurred backdrop.
- **Built-in text.** "Hovedmeny", "Mer", "Hopp til innholdet" (Norwegian). Override with `label`, `moreLabel`, `skipLabel`.
- **Known limit.** The list under "Mer" closes on a click outside and when focus moves somewhere else, not when focus disappears entirely; that is on purpose, so a tap in Safari lands.

## Content

- One word per item, a noun: "Today", "Projects", "Plants", "Settings".
- The same word as the title of the page the item leads to.
- "More" is enough for the overflow; not "Menu" or "Other".
- `brand` is the wordmark in plain type, with the full stop in the accent, not a logo.
