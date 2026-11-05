---
name: Link
group: navigation
status: new
since: 0.7.0
kort: components/navigation/link.card.html
typer: components/navigation/Link.d.ts
---

# Link

A link: the accent text colour (`--accent-text`) and the underline base.css already gives every `<a>`, plus the variants. `inline` sits in running text and wraps with it; `standalone` is a link on its own line, in medium weight and at least 24 px tall. With `target="_blank"` the link says so: `rel="noopener noreferrer"`, an external icon and the visually hidden «(åpner i ny fane)», so a screen reader hears where it goes. `as` takes a router's Link, so the app keeps client-side routing.

## When to use

- Something that leads somewhere else: another page in the app, a document, a page outside.
- A word or a phrase in a sentence that leads on: "Read about `soil types` before you sow."
- A link on its own line under a paragraph or a card: "See the whole sowing log".

## When not to

- Something that does something on the page (saves, opens a dialog, switches a view): [Button](Button.en.md), `variant="ghost"` for a quiet one.
- A row that opens something: [ListItem](ListItem.en.md).
- An action in a message: `actionLabel` on [Alert](Alert.en.md) or [Toast](Toast.en.md).
- The main navigation: [AppShell](AppShell.en.md) and [Tabs](Tabs.en.md).

## Do

- Let the text say where the link goes: "the sowing log", "the seed catalogue". That is what a screen reader lists.
- Use `inline` in a sentence and `standalone` when the link stands alone; it then gets medium weight and a 24 px target.
- Pass `as={RouterLink}` with `to` in an app with React Router, so the page does not reload. `to` only works together with `as`; a plain `<a>` needs `href`.
- Keep `target="_blank"` the exception, for a page outside the app people should come back from. The link says so itself.
- Keep the link on `--bg`, `--surface-1` or `--surface-2`, where the colour holds 4.5:1.

## Don't

- No "here", "click here" or "read more" as link text.
- No `onClick` without `href`: that is a button.
- Don't remove the underline in running text; in text it is what tells a link from the words around it.
- No link on `--surface-3` or `--accent-soft`; the colour does not hold 4.5:1 there for every accent.

## Example

```jsx
import { Link } from 'sussi/components';
import { Link as RouterLink } from 'react-router-dom';

<p>Read about <Link href="/soil">soil types</Link> before you sow.</p>
<Link variant="standalone" href="/sowing-log">See the whole sowing log</Link>
<Link href="https://example.com/seeds" target="_blank" newTabLabel="(opens in a new tab)">The seed catalogue</Link>
<Link as={RouterLink} to="/plants/tomato">Tomato</Link>
<Link variant="standalone" href="https://example.com/seeds" external>The seed catalogue</Link>
```

## Props

The types are in `components/navigation/Link.d.ts`. The card: `components/navigation/link.card.html`.

<!-- props: LinkProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `React.ElementType` | `'a'` | The element or component to render, default `a`. Pass a router's Link (React Router: `as={RouterLink}` with `to`); it must render an `<a>`. Its own props go straight through. |
| `to` | `string \| { pathname?: string; search?: string; hash?: string }` | – | Only with `as` set to a router's Link: the route, e.g. `/planter/tomat` or `{ pathname, search, hash }` (React Router's `To`). Passed through to it; a plain `<a>` ignores it, so give `href` there. |
| `variant` | `'inline' \| 'standalone'` | `'inline'` | `inline` (default) sits in running text; `standalone` is a link on its own line: medium weight, still inline text, with a target of at least 24 px. |
| `external` | `boolean` | – | Shows the external icon after the text. Default: on when `target="_blank"`, off otherwise. `false` hides the icon on a new-tab link; `true` shows it on a link that leaves the app in the same tab. |
| `newTabLabel` | `string` | `'(åpner i ny fane)'` | The visually hidden text after the link text when `target="_blank"`. Default «(åpner i ny fane)»; English surfaces pass "(opens in a new tab)". |
| `children` | `React.ReactNode` | – | The link text. Say where it goes, not «her» or «klikk her». |
| `className` | `string` | – | Your own classes on the link. |
| `style` | `React.CSSProperties` | – | Your own styles on the link. |

Plus every attribute of `<a>` (`React.AnchorHTMLAttributes<HTMLAnchorElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in `tests/link.e2e.test.mjs`, the colour rules in `tests/link.test.mjs`.

- **Element and role.** An `<a href>`, role `link` from the element. With `as` it is what that component renders; React Router's Link renders an `<a>`. No role is added.
- **Name.** The link text, plus «(åpner i ny fane)» as visually hidden text (`.s-sr-only`, 1 px and clipped, not `display:none`) when `target="_blank"` (tested). The icon is `aria-hidden`.
- **Keyboard and focus.** Tab and Enter like any link. The focus ring is Sussi's `:focus-visible` (2 px `--focus-color`, 2 px outside), with `--radius-xs` corners (tested). `ref` reaches the `<a>`.
- **Contrast.** `--accent-text` holds 4.5:1 on `--bg`, `--surface-1` and `--surface-2` in both themes and all six accents, and so does `--accent-hover` (the hover colour) (`tests/link.test.mjs` measures the tokens, `tests/link.e2e.test.mjs` the rendered colour). The underline tells the link from the text around it without colour (WCAG 1.4.1). Known limit: not on `--surface-3` and `--accent-soft`.
- **Target.** `standalone` is ordinary text in the line with `padding-block` for a target of at least 24 px (WCAG 2.5.8, tested); the external icon hangs on the last word and never ends up alone on a line (tested). An `inline` link follows the line height of the text (24 px in body text) and is exempt as part of a sentence.
- **New tab.** `target="_blank"` always gives `rel="noopener noreferrer"`, also when `rel` is set to something else (tested). The hidden text is technique G201: the link says so before it opens anything new.
- **Motion.** None; the colour and the underline fade over `--dur-fast`.
- **Built-in text.** «(åpner i ny fane)». Override with `newTabLabel`.
- **Known limits.** No `disabled`: a link that cannot be used is removed. No colour of its own for visited links. The colour is always the accent; a link inside an [Alert](Alert.en.md) inherits the tone's colour from `.s-alert__text a`.

## Content

- The link text is the place it goes to, as a noun: "the sowing log", "the seed catalogue", "the settings".
- In a sentence, link the words that carry the meaning, not the whole sentence: "Read about `soil types` before you sow."
- A `standalone` link starts with a verb when it does something further: "See the whole sowing log", "Open the seed catalogue".
- English surfaces pass `newTabLabel="(opens in a new tab)"`.
