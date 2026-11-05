# Changelog

What changed in each version of Sussi. New entries go under `## Unreleased`; a release moves them under its version and date. Versions follow semver: while Sussi is 0.x, a minor version may break (after a deprecation, see `CONTRIBUTING.md`) and a patch only fixes and adds.

## Unreleased

## 0.9.0 · 05.11.2026

Fixes from a walk-through as a new user. Headings `h1`–`h4` now take Sussi's type roles, inputs are 16 px on touch screens so phones do not zoom, and a loading Button keeps its focus. Minor because two things apps can notice changed: bare headings get Sussi's sizes (a class or inline style still wins), and `loading` sets `aria-disabled` instead of `disabled`, so a test that looks for `disabled` on a loading button must look for `aria-disabled`. The documentation site is easier to use on a phone and with the keyboard.

- **Changed** plain `h1`–`h4` elements get Sussi's type roles from the tokens (`--type-h1`, `--type-h2`, `--type-h3`, and semibold `--text-md` for `h4`), so an `<h1>` looks like Sussi without a class. The rule has no specificity, so any class or inline `font` still wins. Visible in an app that relied on the browser's heading sizes.

- **Fixed** Input, Select and Textarea use 16 px text on touch screens, so iOS Safari no longer zooms the page in when a field gets focus. With a mouse they stay at 14 px. Not breaking.

- **Changed** `Button loading` keeps the focus: it sets `aria-disabled="true"` and `aria-busy="true"` instead of native `disabled`, and ignores clicks, so a submit button cannot submit twice and a keyboard or screen reader user is not sent to the top of the page. `aria-disabled` on a Button now gives a button that looks off and does nothing but stays reachable with Tab, for example with a Tooltip that says why. Native `disabled` works as before. If a test looked for `disabled` on a loading button, look for `aria-disabled` instead.

- **Fixed** the ListItem docs now point to Disclosure for a row that expands, and the Button docs say the `loading` spinner pulses under reduced motion. Full stops in the English Button prop descriptions.

- **Changed** the documentation site. The Dialog example works on phones and starts closed with an «Open dialog» button; Esc and its buttons close it and focus goes back. Examples get as tall as their content, so nothing is cut off on a phone. The sidebar scrolls to the page you are on. The components overview shows plain text instead of Markdown links, and says that `sussi` and `sussi/components` are the same file. A one-line code block wraps instead of hiding the end of the line. The theme builder shows an invalid colour or name under its own field, says it is waiting for a valid colour instead of hiding the verdict, and ends with a snippet to copy for a CDN and for npm, filled in with your theme's name. Search: the arrow keys move between the results and back to the field, Esc returns to the field, and common words find the right page (varsel, dropdown, modal, dark mode, knapp, fane). Links that open a new tab say so to screen readers, and the accents on the home page carry their code names.

## 0.8.0 · 04.11.2026

A getting-started guide, a theme builder that says what it did with your colour and what to change when a theme does not hold, a docs site that is easier to use on a phone and with the keyboard, and neutral demo text. Minor because `tokens/tema.js` gains `oppsummer` and `grupperAdvarsler`. Nothing renamed or removed, so apps on 0.7.x sync without changes.

- **Added** `oppsummer(tema)` and `grupperAdvarsler(tema)` in `tokens/tema.js` (`sussi/tema`): one sentence, Norwegian and English, on what the engine did with your colour, and for a theme that is not OK what to change, grouped by cause, with the nearest value that holds. A suggested value keeps every other pair of its field holding, against the engine's derived colours too, so taking it never breaks a pair that held. One bullet per value you set, with pairs counted once and no suggestions that contradict each other; `lagTema` also returns `låst`, what did not move in each mode and why. The report names the two tokens of each measured pair (`målt[].par`), and the warnings say «Lys modus:» / "Light mode:" instead of `light:`. `sussi-tema` names the tightest pair in English and prints `TO FIX` / `SLIK RETTER DU` for a theme that is not OK. Not breaking.

- **Changed** the documentation site: the theme builder says under the accent field what happened to your colour, and when a theme is not OK what to change and to what, with a link to the field; copy buttons on every code block; anchors clear the sticky header; a two-row header on phones; the guide's examples follow dark mode; «På denne siden» on the guide and the content page; a shorter quick start on the home page; English browsers land on the English pages; Esc closes the mobile menu; search covers the text under every heading. The guide explains its jargon at first use and folds the guarantee into a disclosure.

- **Changed** neutral demo text: the examples in the cards, prompts, docs and the theme preview are a garden, a recipe and plants in both languages (Progress «Planter vannet» / "Plants watered", ListItem «Linsesuppe» / "Lentil soup", AppShell «hage.», the Sheet select Watering / Weeding / Harvest, Tag «urter» / "herbs", Select «Leire» / "Clay", the Icon example `leaf`). The `hard-hat` and `yarn` icons stay in the set. Not breaking.

- **Fixed** the licence wording no longer names tests (the package has none), the bug template's version placeholder is the current version (`v0.8.0`), and the Badge example version is neutral (`v1.2.0`). Not breaking.

- **Fixed** on the documentation site, the «Innhold» link under «På denne siden» on the Norwegian component pages went to the top of the page instead of the section.

- **Added** a getting-started guide (`docs/getting-started.en.md`, `docs/kom-i-gang.nb.md`, and "Getting started" on the site): install with CSS only, npm or an import map with no build step, set the theme and an accent, make your own colours and read the engine's report, use Button, Dialog and Toast, with two runnable examples in `docs/eksempler/`.

## 0.7.0 · 30.10.2026

Eleven new components and a date helper, so the common form, feedback and navigation needs are covered: Alert, Spinner and Skeleton; Fieldset and ErrorSummary; SegmentedControl, and `mode` on Input; Link, VisuallyHidden and Stack; Disclosure, BackLink and `dato.js`. Nothing renamed or removed, so apps on 0.6.x sync without changes.

- **Added** `mode` on `Input`: `number`, `decimal`, `phone`, `email`, `url`, `search`, `date`, `time` and `password` set the right `type`, keyboard on a phone and autofill, and a password gets a show/hide toggle. Nothing changes without `mode`.

- **Added** `SegmentedControl`: two to five mutually exclusive options in a row, as one value in a form. A native radio group, so one Tab stop and the arrow keys come from the browser. Not for switching views; that is still `Tabs variant="segmented"`. Not breaking.

- **Added** `Fieldset` and `ErrorSummary`. `Fieldset` is a group of related controls, above all a radio or checkbox group: `<fieldset>` and `<legend>`, a hint and an error tied to the group with `aria-describedby`, the error with an icon and text and announced, never colour alone; the existing Radio, Checkbox and Switch go inside unchanged. `ErrorSummary` is the box at the top of a form after a failed submit: a title, a line and one link per field with an error; it takes the focus when it appears, and each link moves the focus to its field, or to the first control in a Fieldset. Not breaking.

- **Fixed** a radio group with no radio checked drew every radio filled with the accent (the indeterminate style meant for Checkbox). Nothing to change in apps.

- **Added** `Disclosure`, `BackLink` and the date helper `Dato`. `Disclosure` is a section that shows and hides, on the browser's own `<details>`/`<summary>`: a 44 px row with the title and a chevron that turns (not under reduced motion), open at start with `defaultOpen` or controlled with `open` and `onToggle`; one section at a time, not an accordion. `BackLink` is «Tilbake» as a standalone `Link` with a chevron before the text, for the top of a page opened from another; `href`, or `as` with `to` for a router; the text is overridable. The date helper (`formatDato`, `formatRelativ`, `formatTid`, `formatDatoTid`, `formatTidsrom`, `tilDato`, `tilIsoDato`, `erSammeDag`) formats dates the Norwegian way and the English way on `Intl` («30. okt. 2026», «30. oktober 2026», «i dag», «i går», «14:30», «14:30–15:15»); a date-only string is a local day, never midnight UTC, and days are compared on calendar dates, so a DST change never moves one. Not breaking.

- **Added** `Link`, `Stack` and `VisuallyHidden`. `Link` is the styled anchor: the accent text colour and the underline every `<a>` already has, in running text or standalone on its own line; `target="_blank"` adds `rel="noopener noreferrer"`, an external icon and the visually hidden «(åpner i ny fane)», and `as` takes a router's Link so apps keep client-side routing. `Stack` is a layout primitive: a column or a row with a gap from the spacing tokens, wrap and alignment, nothing visual of its own. `VisuallyHidden` is text for assistive technology that nobody sees, with `focusable` for a skip link that shows while it has the focus. Not breaking.

- **Added** `Alert`, `Spinner` and `Skeleton`. `Alert` is an inline message that stays until the app removes it: four tones on the status colours with an icon each, an optional title, an action and a close button; `role="status"` by default, `role="alert"` only for an urgent danger, and closing moves the focus to the control before the alert. `Spinner` is the indeterminate ring in the accent in three sizes, `role="status"` with a visually hidden label or decorative with `aria-hidden`; under `prefers-reduced-motion` it pulses instead of turning, and so does Button's own spinner now. `Skeleton` is text lines, a circle or a rectangle for content on its way, hidden from assistive technology, with the loading pattern (`aria-busy` and one status text) in the docs. Not breaking.

- **Changed** neutral example text in the type specimens and in the Card, Input and Dialog examples. Nothing in the components changes.

## 0.6.0 · 29.10.2026

The first public version.

- **Added** `Menu` and `Popover`: a non-modal panel anchored to a button, placed below or above with a flip when it does not fit, focus in and back, Esc and a click outside to close, and an optional `portal`. `Menu` is the WAI-ARIA menu button pattern on top of it (arrow keys, Home and End, type-ahead, checkable items, groups, separators, a danger item).
- **Added** the theme engine, `sussi/tema` (`tokens/tema.js`), and its CLI `sussi-tema`: one accent colour in, a full theme for light and dark out, with the contrast rules the built-in accents follow checked and reported, your own surfaces and text with `overstyr`, and CSS (`tilCss`) or DTCG JSON (`tilDtcg`) out.
- **Added** the tokens as JSON in the W3C Design Tokens Community Group format, `tokens/sussi.tokens.json` (`sussi/tokens.json`), generated from `tokens/*.css`.
- **Added** `--danger-fg-on`, the text on a `--danger` fill. The danger button uses it and looks the same.
- **Added** documentation for every component in Norwegian and English (`docs/komponenter/`), with props tables, accessibility notes and content guidance, the content guidelines (`docs/innhold.nb.md`, `docs/content.en.md`) and a documentation site with a theme builder.
- **Added** the compiled package: ESM per component with types in `dist/`, a one-file browser build (`sussi/browser`) and a global build for the specimen cards.
- **Added** licences and project files: MIT for the code, CC BY 4.0 for the mascot drawings, OFL for the fonts, ISC for the icons (`LICENSES.md`), and `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` and `SECURITY.md`.

Earlier versions (0.1 to 0.5) were private and are not listed here.
