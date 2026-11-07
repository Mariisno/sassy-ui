---
name: BackLink
group: navigation
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/backlink/
typer: dist/navigation/BackLink.d.ts
---

# BackLink

"Back": a [Link](Link.en.md) on its own line with a chevron before the text, at the top of a page that was opened from another: a plant from the list, a day from the week. It is Link, so `href`, or `as` with `to` for a router, and the ref reach the `<a>`; `standalone` gives the medium weight and at least 24 px of height. The text defaults to «Tilbake» and names the place when that helps: "Back to plants".

## When to use

- At the top of a detail page that was opened from a list or an overview.
- A step in a flow with pages of its own, where the previous page has an address.
- A page that opens from several places, with the name of the place in the text.

## When not to

- The main navigation: [AppShell](AppShell.en.md) and [Tabs](Tabs.en.md).
- A step back inside the page (a form in several parts): a [Button](Button.en.md) with `onClick`.
- Closing something over the page: the close button in [Dialog](Dialog.en.md).
- A link in running text: [Link](Link.en.md).

## Do

- Let it go to a known place with `href` or `to`, so it works when the page was opened from a bookmark too.
- Put it first in the content, before the heading, one per page.
- Name the place when the page has more than one way back: "Back to plants".
- Pass `as={RouterLink}` with `to` in an app with React Router, so the page does not reload.

## Don't

- No `history.back()`: a link has a target, and there may be no previous page.
- No `onClick` without `href`: that is a button.
- No several back links on one page, and none at the bottom.
- Don't remove the underline; the chevron is decoration, the text carries the meaning.

## Example

```jsx
import { BackLink } from 'sassy/components';
import { Link as RouterLink } from 'react-router-dom';

<BackLink href="/plants">Back</BackLink>
<BackLink href="/plants">Back to plants</BackLink>
<BackLink as={RouterLink} to="/week">Back to the week</BackLink>
<BackLink href="/planter" />
```

## Props

The types are in `dist/navigation/BackLink.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/backlink/).

<!-- props: BackLinkProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | – | Where the link goes: the page this one was opened from, e.g. `/planter`. |
| `as` | `React.ElementType` | – | The element or component to render, default `a`. Pass a router's Link (React Router: `as={RouterLink}` with `to`); it must render an `<a>`. |
| `to` | `string` | – | With `as` set to a router's Link: the route, e.g. `/planter`. Passed through to it. |
| `children` | `React.ReactNode` | `'Tilbake'` | The link text. Default «Tilbake»; English surfaces pass "Back". Name the place when it helps: «Tilbake til planter». |
| `className` | `string` | – | Your own classes on the link. |

Plus every prop of `LinkProps`, except `variant`, `external`, `target`, `newTabLabel`.
<!-- /props -->

The rest of [Link](Link.en.md)'s props pass through, except `variant`, `external`, `target` and `newTabLabel`: a back link always goes in the same tab.

## Accessibility

The behaviour is tested in a browser, the rules in unit tests; the colour is Link's (tested).

- **Element and role.** An `<a href>` from Link, role `link` from the element. With `as` it is what the router renders (tested). No role is added.
- **Name.** Exactly the link text, «Tilbake» or the one you give, nothing more: `getByRole('link', { name: 'Tilbake', exact: true })` finds it (tested). The chevron is `aria-hidden` (tested). No hidden new-tab text: `target` is not a prop.
- **Keyboard and focus.** Tab and Enter like a link. The focus ring is Sassy's `:focus-visible` with `--radius-xs` corners (tested). The ref reaches the `<a>` (tested).
- **Contrast.** `--accent-text` holds 4.5:1 on `--bg`, `--surface-1` and `--surface-2` in both themes and all six accents, and so does `--accent-hover` (tested as rendered). The underline tells the link from the text around it without colour (WCAG 1.4.1). Known limit: not on `--surface-3` and `--accent-soft`.
- **Target size.** At least 24 px tall (WCAG 2.5.8, tested), like Link `standalone`.
- **Motion.** None; the colour fades on `--dur-fast`.
- **Built-in text.** «Tilbake». Override with `children`; English surfaces pass "Back".
- **Known limits.** No `disabled`: a back link that cannot be used is left out. No "back" without a target. The link does not wrap (`white-space:nowrap`), so the chevron and the text stay on one line; a long text gets wide instead of breaking. Keep it short.

## Content

- "Back" alone when there is only one way back.
- "Back to plants", "Back to the week" when the page can open from several places: the place as a noun.
- Not "Go back", "Previous" or the chevron alone.
- In Norwegian: «Tilbake», «Tilbake til planter».
