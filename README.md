# Sassy

Sassy is a design system by NotlandDesign, made by Mari Notland. Its mascot is Sussi, her cat.

A small, warm design system for calm everyday apps: design tokens, CSS and React components, built for WCAG 2.2 AA in light and dark. Norwegian by default, English where you need it.

**Norsk:** Sassy er et designsystem fra NotlandDesign, laget av Mari Notland. Maskoten er Sussi, katten hennes. Et lite, varmt designsystem for rolige hverdagsapper: tokens, CSS og React-komponenter, laget for WCAG 2.2 AA i lys og mørk modus. Norsk som standard.

> Version 0.11.0. Documentation: [mariisno.github.io/sassy-ui](https://mariisno.github.io/sassy-ui/), in Norwegian and English. Each component also has its notes in `docs/komponenter/`, and its page on the site shows it live.

## Quick start

With only CSS (the tokens, the fonts and the `.s-*` component classes), it is one line in `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sassy-ui@v0.11.0/styles.css">
```

With React (18.3 or 19), install from GitHub:

```sh
npm install github:Mariisno/sassy-ui#v0.11.0
```

Then `import 'sassy/styles.css'` once and the components from `'sassy'`: `import { Button } from 'sassy'`. Set `data-theme="light"` or `"dark"` on `<html>`.

The full walk-through: [Getting started](docs/getting-started.en.md). It covers CSS only, React with npm and a page with no build step, the theme and the accents, your own colours, and runnable examples.

## Your own colours

One colour in, a whole theme out, with the contrast checked in light and dark:

```sh
npx sassy-tema --aksent "#2F6F9F" --navn hav > hav.css
```

Then `data-tema="hav"` on `<html>`. In code: `import { lagTema, tilCss } from 'sassy/tema'`. You can also override surfaces, text and status colours, or set fonts, radius, spacing and motion. If a combination cannot hold the contrast rules, you get a clear warning instead of a theme that fails. Six ready-made accents ship with it: moss (`moss`, the default), clay (`clay`), fjord, lichen (`lichen`), lyng and ochre (`ochre`).

## What is in the box

- **Tokens** in CSS (`tokens/`) and as JSON in the W3C design tokens format (`tokens/sassy.tokens.json`, also `sassy/tokens.json`), for Style Dictionary and design tools.
- **Components:** buttons, form fields, checkbox, radio, switch, select, tabs, dialog and bottom sheet, menu and popover, tooltip, toast, progress, empty state, list item, badge, tag, card, an app shell with a tab bar or sidebar, icons (Lucide) and the Sussi mascot.
- **Fonts:** Schibsted Grotesk and DM Mono, self-hosted, no Google Fonts.
- **Rules that hold:** contrast for every token pair in light, dark and every accent, keyboard and screen reader support, 44 px touch targets, `prefers-reduced-motion`.

## Licences

Code under MIT. The Sussi mascot drawings under CC BY 4.0 (credit «Sussi the cat by Mari Notland»; not to be used as your own brand or logo). Fonts under the SIL Open Font License, Lucide icons under ISC. Details in [LICENSES.md](LICENSES.md).

## Contributing

Issues and small pull requests are welcome; read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) first. Security issues: see [SECURITY.md](SECURITY.md).

This repository holds the built package (`dist/`, with the types), the CSS and tokens, the fonts and icons, the docs and the documentation site (`side/`). It is generated from a private working repository, where the component sources live, so the history starts here.
