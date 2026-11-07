---
name: Disclosure
group: display
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/disclosure/
typer: dist/display/Disclosure.d.ts
---

# Disclosure

A section that shows and hides: native `<details>` and `<summary>`, so the browser gives the button role, `aria-expanded`, Enter and Space, and the content is in the page whether the section is open or not. The row is 44 px tall with the title and a chevron that turns when the section opens, on `--dur-base`, which is 0 under reduced motion. Uncontrolled with `defaultOpen`, or controlled with `open` and `onToggle`. One section at a time; a list of sections is several Disclosures after each other, not an accordion.

## When to use

- Something people need now and then, under what they need every time: details, help, a long list, "show more".
- A setting or a form with a rare part: "Advanced" under the usual.
- Several short sections on one page, each of which can stand open on its own: the notes for each variety in the sowing log.

## When not to

- Switching between views that belong together: [Tabs](Tabs.en.md).
- Something that opens over the page, with the focus inside: [Dialog](Dialog.en.md) or [Popover](Popover.en.md).
- A list of actions behind one button: [Menu](Menu.en.md).
- Content people need every time. That sits on the page, not behind a row.

## Do

- Let `title` say what the section holds: "Watering and feeding", not "Show more" or "Details". It is the button's name.
- Pass a heading element in `title` (`<h3>`) when the section is part of the page outline; it keeps the row's size.
- Use `defaultOpen` for a section that should stand open at the start, and leave the rest closed.
- Go controlled (`open` + `onToggle`) only when the app needs to know or steer the state; `onToggle` must then update `open`, or the section snaps back.
- Keep what is inside secondary. What people need every time stays outside.

## Don't

- Don't close the others when one opens. Several Disclosures are a list of sections, not an accordion.
- Don't put a button or a link inside `title`: the row is a button already.
- Don't use it as a menu or a dropdown.
- Don't hide an error message or anything that must be read in a closed section.

## Example

```jsx
import { Disclosure } from 'sassy/components';

<Disclosure title="Watering and feeding">
  <p>Water in the morning, so the leaves dry. Feed every other week from June.</p>
</Disclosure>

<Disclosure title="Sowing date per variety" defaultOpen>
  <ul><li>Tomato: mid March, indoors</li><li>Peas: May, straight in the ground</li></ul>
</Disclosure>

<Disclosure title={<h3>Soil types</h3>} open={open} onToggle={setOpen}>
  <p>Sandy soil drains fast. Clay holds the water.</p>
</Disclosure>
```

## Props

The types are in `dist/display/Disclosure.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/disclosure/).

<!-- props: DisclosureProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | *required* | The row's text: what the section holds, e.g. «Vanning og gjødsling». Pass a heading element (`<h3>`) when the section is a part of the page outline. |
| `open` | `boolean` | – | Controlled: whether the section is open. Pair with `onToggle`; leave it out for an uncontrolled section. |
| `defaultOpen` | `boolean` | `false` | Uncontrolled: open on the first render. Default false. |
| `onToggle` | `(open: boolean) => void` | – | Called with the new state when the person opens or closes the section. With `open` set, the app updates `open` here. |
| `children` | `React.ReactNode` | – | The section's content. Rendered whether the section is open or not. |
| `className` | `string` | – | Your own classes on the `<details>`. |
| `style` | `React.CSSProperties` | – | Your own styles on the `<details>`. |

Plus every attribute of `<details>` (`React.DetailsHTMLAttributes<HTMLDetailsElement>`), except `title`, `open`, `onToggle`.
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** A `<details>` with a `<summary>`. The browser gives the `<summary>` the button role and `aria-expanded` from the `open` attribute; no role or `aria-expanded` is added, and the computed role and state are tested in Chromium's accessibility tree (`DisclosureTriangle`, `expanded`). Note that Playwright and Testing Library see the row as `summary` or `group`, not as `button`: find it with `getByText` or `locator('summary')`. The content is in the DOM while the section is closed, so find in page finds it in most browsers, but it is not shown until it opens (tested).
- **Name.** `title`. A heading in `title` sits directly in the `<summary>` carrying the title class itself (no `<span>` around it), becomes part of the page outline and keeps the row's type (tested).
- **Keyboard.** Tab reaches the row; Enter and Space open and close (tested). The focus stays on the row. No key handlers of its own.
- **Focus.** Sassy's `:focus-visible` on the row: 2 px `--focus-color`, 2 px outside, with the row's corners (colour, width and offset tested).
- **Contrast.** The title is `--fg-1` on `--surface-1` (4.5:1 or more) and the chevron `--fg-3` (3:1 or more) in both themes and all six accents, measured on the tokens and in the browser, also on hover (tested). The frame is `--border` and carries no meaning; the chevron and `open` do.
- **Target size.** The row is at least 44 px tall across the full width (WCAG 2.5.8, tested).
- **Motion.** The chevron turns 180° on `--dur-base`; the token is 0 under `prefers-reduced-motion`, and the transition is removed as well (WCAG 2.3.3, tested). The content appears without animation.
- **Controlled.** `onToggle` is called once per change with the new state. The browser opens the element before React hears of it; when the app does not take the change (update `open`), the element is set back, without another `onToggle` (tested). Set `open` synchronously in `onToggle` (a plain `setState`), not after a call or an `await`: otherwise the row closes and opens again, and flickers.
- **Built-in text.** None.
- **Known limits.** No accordion (the `name` attribute on `<details>` is not used). No `disabled`: a section that cannot open is left out. The content does not animate in.

## Content

- `title` is what the section holds, as a noun: "Watering and feeding", "Sowing date per variety", "Advanced".
- Not "Show more", "Read more" or "Details" alone; a screen reader lists the rows, and they must tell apart.
- The content starts straight away. Don't repeat the title in the first line.
- The component has no text of its own; the title is whatever language the surface is in.
