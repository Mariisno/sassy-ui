# Contributing to Sassy

Thank you for helping. Sassy is a small design system with one maintainer (Mari Notland), so a short issue before a big pull request saves us both time.

## Before you start

- **Bugs:** open an issue with the bug template: what you did, what you expected, what happened, browser and theme (light/dark, accent).
- **New components or tokens:** open an issue first and describe the need. Show where you would use it. Sassy grows from real use, not from completeness.
- **Small fixes** (typos, docs, an obvious CSS bug) can go straight to a pull request.

## The rules a change must keep

- **Tokens only.** Components use the CSS custom properties in `tokens/`; no hard-coded colours, no gradients.
- **Contrast is tested.** Text holds 4.5:1 and non-text 3:1 (WCAG 2.2 AA) in light and dark and in every accent. If you add a colour pair, name it in the pull request, so it is added to the tests.
- **Keyboard and screen readers.** Every interactive part is reachable by Tab, has a visible focus ring, a name and the right role. Targets are at least 24 × 24 px (44 px on touch where Sassy already does so).
- **Motion respects `prefers-reduced-motion`.**
- **Both languages.** Built-in text is Norwegian by default with a prop to override; docs are Norwegian and English.
- **No breaking changes without a deprecation.** While Sassy is 0.x, a minor version (0.6 → 0.7) may break and a patch (0.6.0 → 0.6.1) only fixes and adds; from 1.0, only a major version breaks. A renamed prop, token, class or component keeps the old name working for at least one minor version: the old prop is still read, the old token is an alias (`--old: var(--new)`), the old class stays next to the new one. Mark it `@deprecated` in the `.d.ts` and list it under **Deprecated** in `CHANGELOG.md`, with what to use instead. It is removed in a later minor version at the earliest, under **Breaking**, with one line on what an app must change.

## Where the source is

This repository holds what a user needs: the built components in `dist/` (with their types), the CSS and the tokens, the fonts and icons, the docs in `docs/` and the documentation site in `side/`. It is generated from a private working repository, which has the component sources, the specimen cards and the test suite. So `dist/` and `side/` are built files: do not edit them by hand.

## Making the change

1. **Docs, CSS and tokens** (`docs/`, `styles.css`, `components/components.css`, `tokens/`) can be changed here in a pull request.
2. **A component's behaviour or props:** open an issue, or a pull request that shows the change (a patch to the file in `dist/` is fine as a sketch). The maintainer makes it in the source and in the docs in both languages.
3. Check it in a browser: in an app of your own, or on the component's page on the [documentation site](https://mariisno.github.io/sassy-ui/), in light and dark and in the accents the change touches. Use it with the keyboard alone, and run an accessibility checker such as axe (WCAG 2.2 AA).
4. The full test suite (tokens, contrast in every theme and accent, the component rules, browser tests and axe) lives in the working repository and runs there before every release. The maintainer runs it on your change before it is merged.
5. A change has an entry under `## Unreleased` in `CHANGELOG.md`. Keep the pull request small and say what changed, why, and how you checked it.

## Code of conduct

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Licence

By contributing you agree that your contribution is licensed under the licence of the part you change: MIT for code and docs, CC BY 4.0 for the mascot drawings (see [LICENSES.md](LICENSES.md)).

---

**Norsk:** Åpne gjerne en sak før en stor endring. En endring må bruke tokens, holde kontrastkravene i lys og mørk og i alle aksenter, virke med tastatur og skjermleser, respektere redusert bevegelse, ha tekst på norsk og engelsk, og ikke bryte noe uten en avvikling først. Kildekoden til komponentene ligger i et privat arbeidsrepo; her ligger det bygde (`dist/`), CSS, tokens, dokumentasjonen og dokumentasjonssiden. Sjekk endringen i nettleseren, med tastatur og med axe, i lys og mørk; testene kjøres av vedlikeholderen før en endring tas inn.
