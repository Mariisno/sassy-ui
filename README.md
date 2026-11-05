# Sussi

A small, warm design system for calm everyday apps: design tokens, CSS and React components, built for WCAG 2.2 AA in light and dark. Made by Mari Notland (NotlandDesign) and named after her cat. Norwegian by default, English where you need it.

**Norsk:** Et lite, varmt designsystem for rolige hverdagsapper: tokens, CSS og React-komponenter, laget for WCAG 2.2 AA i lys og mørk modus. Norsk som standard.

> Version 0.9.0. Documentation: [mariisno.github.io/sussi-ui](https://mariisno.github.io/sussi-ui/), in Norwegian and English. Each component also has its notes in `docs/komponenter/` and a live card in `components/<group>/*.card.html`.

## Quick start

With only CSS (the tokens, the fonts and the `.s-*` component classes), it is one line in `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sussi-ui@v0.9.0/styles.css">
```

With React (18.3 or 19), install from GitHub with `npm install github:Mariisno/sussi-ui#v0.9.0`, then `import 'sussi/styles.css'` once and the components from `'sussi'`: `import { Button } from 'sussi'`. Set `data-theme="light"` or `"dark"` on `<html>`.

The full walk-through: [Getting started](docs/getting-started.en.md). It covers CSS only, React with npm and a page with no build step, the theme and the accents, your own colours, and runnable examples.

## Your own colours

One colour in, a whole theme out, with the contrast checked in light and dark:

```sh
npx sussi-tema --aksent "#2F6F9F" --navn hav > hav.css
```

Then `data-tema="hav"` on `<html>`. In code: `import { lagTema, tilCss } from 'sussi/tema'`. You can also override surfaces, text and status colours, or set fonts, radius, spacing and motion. If a combination cannot hold the contrast rules, you get a clear warning instead of a theme that fails. Six ready-made accents ship with it: moss (`moss`, the default), clay (`clay`), fjord, lichen (`lichen`), lyng and ochre (`ochre`).

## What is in the box

- **Tokens** in CSS (`tokens/`) and as JSON in the W3C design tokens format (`tokens/sussi.tokens.json`, also `sussi/tokens.json`), for Style Dictionary and design tools.
- **Components:** buttons, form fields, checkbox, radio, switch, select, tabs, dialog and bottom sheet, menu and popover, tooltip, toast, progress, empty state, list item, badge, tag, card, an app shell with a tab bar or sidebar, icons (Lucide) and the Sussi mascot.
- **Fonts:** Schibsted Grotesk and DM Mono, self-hosted, no Google Fonts.
- **Rules that hold:** contrast for every token pair in light, dark and every accent, keyboard and screen reader support, 44 px touch targets, `prefers-reduced-motion`.

## Licences

Code under MIT. The Sussi mascot drawings under CC BY 4.0 (credit «Sussi the cat by Mari Notland»; not to be used as your own brand or logo). Fonts under the SIL Open Font License, Lucide icons under ISC. Details in [LICENSES.md](LICENSES.md).

## Contributing

Issues and small pull requests are welcome; read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) first. Security issues: see [SECURITY.md](SECURITY.md).

This repository is generated from a private working repository, so the history starts here.
