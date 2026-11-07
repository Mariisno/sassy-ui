---
navn: Stack
gruppe: layout
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/stack/
typer: dist/layout/Stack.d.ts
---

# Stack

Et oppsett-element: barna i en kolonne (standard) eller en rad, med en avstand fra avstandstokenene (`gap={4}` er `--space-4`, 16 px), valgfri bryting og justering. Flex med avstanden som en egendefinert egenskap, så CSS-en er én regel og steget alltid er et token. Ingen visuell form og ingen rolle: det er Card som er en flate, og AppShell som er en ramme.

## Når du bruker den

- Felter under hverandre i et skjema, kort under hverandre i en liste, avsnitt med jevn luft.
- En rad med små ting som skal bryte: tagger, merker, filterknapper.
- En overskrift til venstre og en knapp til høyre: `direction="row"` med `justify="between"`.

## Når du ikke bruker den

- En flate med kant og fyll: [Card](Card.nb.md).
- Rammen rundt appen, med meny og innhold: [AppShell](AppShell.nb.md).
- En rad som ruller sidelengs: [ScrollRow](ScrollRow.nb.md).
- Et rutenett i to retninger: skriv `display:grid` selv; Stack er én akse.

## Gjør

- Velg `gap` fra skalaen: `2` (8 px) mellom tagger, `3` (12 px) mellom felter, `4` (16 px) mellom kort, `6` (24 px) mellom seksjoner.
- Bruk `wrap` på en rad med et ukjent antall barn, så den ikke flyter ut på en smal skjerm.
- Sett `as="ul"` når barna er en liste; `role="list"` kommer av seg selv, siden listestilen fjernes.
- Legg stabler i hverandre: en kolonne av rader er helt vanlig.

## Ikke gjør

- Ikke en pikselverdi i `gap`; bare steg fra skalaen.
- Ikke `style` med `padding` eller `background` for å lage en flate: det er Card.
- Ikke en Stack rundt ett barn.
- Ikke `direction="row"` for noe som skal bryte som tekst; en setning er et avsnitt.

## Eksempel

```jsx
import { Stack, Input, Textarea, Tag, Button } from 'sassy/components';

<Stack gap={3}>
  <Input label="Plante" />
  <Textarea label="Notat" />
</Stack>
<Stack direction="row" gap={2} wrap>
  <Tag>Tomat</Tag><Tag>Basilikum</Tag><Tag>Salat</Tag>
</Stack>
<Stack direction="row" justify="between" align="center">
  <h2>Sådagbok</h2>
  <Button variant="ghost" iconLeft="plus">Ny rad</Button>
</Stack>
<Stack as="ul" gap={2}>
  <li>Så tomat</li>
  <li>Prikle basilikum</li>
</Stack>
```

## Props

Typene står i `dist/layout/Stack.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/stack/).

<!-- props: StackProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `as` | `'div' \| 'section' \| 'nav' \| 'ul' \| 'ol' \| 'li' \| 'form' \| 'header' \| 'footer'` | `'div'` | Elementet den rendres som, standard `div`. `ul` og `ol` får `role="list"` av seg selv (listestilen fjernes, og det tar listesemantikken bort i Safari); en egen `role` vinner. |
| `direction` | `'column' \| 'row'` | `'column'` | `column` (standard) stabler barna; `row` setter dem ved siden av hverandre, sentrert på tverraksen. |
| `gap` | `StackGap` | `4` | Avstandssteget mellom barna: `--space-<gap>`, så `4` er 16 px, `2` er 8 px, `'1-5'` er 6 px. Standard 4. |
| `wrap` | `boolean` | `false` | `true` lar en rad bryte til neste linje, f.eks. en rad med tagger. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | – | Justering på tverraksen: `start`, `center`, `end`, `stretch` eller `baseline`. Standard: stretch i en kolonne, center i en rad. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | – | Fordeling på hovedaksen: `start` (standard), `center`, `end` eller `between`. |
| `children` | `React.ReactNode` | – | Barna som stables. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** Det `as` sier: `div` (standard), `section`, `nav`, `ul`, `ol`, `li`, `form`, `header` eller `footer`. Ingen rolle legges til, unntatt `role="list"` på `ul` og `ol`: de får `list-style:none`, som tar listesemantikken bort i Safari, så komponenten setter rollen selv; en egen `role` vinner (begge testet).
- **Navn.** Ingen eget. En `section` eller `nav` får navn med `aria-labelledby` eller `aria-label` som ellers.
- **Tastatur og fokus.** Ingen; rekkefølgen i tabrekka er dokumentrekkefølgen, og Stack bytter den aldri om (ingen `order`, ingen `row-reverse`).
- **Kontrast.** Ingen farger; alt arves.
- **Avstand.** `gap` er `var(--space-<n>)`, og avstanden mellom barna er den målte (testet for 2, 3 og 4). Stabelen har `min-width:0`, så den blir ikke bredere enn plassen sin som flex- eller grid-barn; en rad med `wrap` bryter i stedet for å flyte ut (testet ved 320 px). Et langt ord i et barn er barnets sak.
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Én akse. `align` og `justify` er inline-stiler, så de vinner over en klasse; sett dem heller som props enn i `className`.

## Innhold

- Ingen tekst av sin egen.
- Rekkefølgen i stabelen er rekkefølgen en skjermleser leser; legg det viktigste først.
