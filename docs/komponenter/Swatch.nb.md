---
navn: Swatch
gruppe: display
status: stable
sidenVersjon: 0.4.0
kort: components/display/swatch.card.html
typer: components/display/Swatch.d.ts
---

# Swatch

En fargeprikk: fargen på et plagg, en blomst, et prosjekt. Uten `onClick` er den en ren prikk, navngitt med `label` eller skjult for skjermleser uten. Med `onClick` er den en bryterknapp (`aria-pressed`) med 44 px mål og en ring når den er valgt. En hex-farge som er under 3:1 mot sida får en fastere kant i det temaet, så hvit vises på lys bakgrunn og svart på mørk.

## Når du bruker den

- Vise fargen på en ting ved siden av navnet dens, i en [ListItem](ListItem.nb.md) `leading`.
- Velge én eller flere farger: en rad med Swatch som knapper, i en gruppe med navn.
- Filtrere på farge.

## Når du ikke bruker den

- Status (ferdig, pauset): [Badge](Badge.nb.md). En farge uten navn sier ingenting.
- Et valg som har tekst: [Tag](Tag.nb.md) eller [Radio](Radio.nb.md).
- En stor fargeflate eller en fargevelger med hjul: det er ikke en prikk.

## Gjør

- Gi alltid `label` til en knapp: fargens navn («Marineblå»). Prikken alene er stum.
- Sett `pressed` fra appens tilstand når den er en bryter; valget vises som ring, ikke bare farge.
- Pakk flere knapper i et element med `role="group"` og `aria-label`.
- Legg mange prikker i en [ScrollRow](ScrollRow.nb.md) på telefon i stedet for å brekke én prikk ned på neste linje.

## Ikke gjør

- Ikke bruk en prikk uten `label` som eneste bærer av informasjon. Uten navn er den `aria-hidden`.
- Ikke sett `pressed` på en knapp som ikke er en bryter (for eksempel «åpne fargevelger»). La den være `undefined`.
- Ikke gi den en annen form enn rund; da er det ikke en Swatch.
- Ikke mer enn ett valg vist med farge alene. Ringen er valget.

## Eksempel

```jsx
import { Swatch, ListItem } from 'sussi/components';

<Swatch color="#1F3A5F" label="Marineblå" />
<div role="group" aria-label="Farge">
  {farger.map((f) => <Swatch key={f.id} color={f.hex} label={f.navn} pressed={valgt === f.id} onClick={() => velg(f.id)} />)}
</div>
<ListItem title="Tulipaner" leading={<Swatch color="#B58AA0" />} />
```

## Props

Typene står i `components/display/Swatch.d.ts`. Kortet, delt med ScrollRow: `components/display/swatch.card.html`.

<!-- props: SwatchProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `color` | `string` | *påkrevd* | En CSS-farge. En hex-verdi (#rgb eller #rrggbb) får også kantsjekken. |
| `label` | `string` | – | Fargens navn, f.eks. «Marineblå». Påkrevd når den er en knapp; uten navn er en ren prikk dekorativ. |
| `pressed` | `boolean` | – | Valgt. Bare på knappeformen; la den være `undefined` for en knapp som ikke er en bryter. |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | – | Gjør den til en knapp. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 16 px, md 22 px, lg 26 px prikk. Knappen er 44 px uansett (34 px med mus). |
| `disabled` | `boolean` | – | Slått av. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`), unntatt `onClick`, `color`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/nye.e2e.test.mjs`.

- **Element og rolle.** Uten `onClick`: et `<span>` med `role="img"` og `aria-label` når `label` er gitt, ellers `aria-hidden="true"`. Med `onClick`: en `<button type="button">` med `aria-label` og `title` lik `label`, og `aria-pressed` når `pressed` er satt (`true`/`false`), ellers ingen `aria-pressed`.
- **Navn.** `label`.
- **Tastatur.** Enter og mellomrom på knappen (mellomrom testet).
- **Tilstand.** `pressed` vises som en ring: 2 px `--bg` og 4 px `--accent` rundt prikken, i tillegg til `aria-pressed`. `disabled` gir 50 % gjennomsiktighet.
- **Fokus.** Standard fokusring (2 px `--focus-color`) på knappen.
- **Kontrast.** Prikken har en svak innerkant (18 % mørk i lyst tema, 18 % lys i mørkt). En hex-farge under 3:1 mot `--bg` eller `--surface-1` i et tema får en 1,5 px `--fg-3`-kant i det temaet (WCAG 1.4.11, testet: hvit og lyng i lyst, svart i mørkt). Andre fargeformater (`rgb()`, navn) får ikke sjekken.
- **Mål.** Knappen er 44 × 44 px (testet på berøring); 34 px med mus og fin peker. Prikken er 16, 22 eller 26 px.
- **Bevegelse.** Kanten går over på `--dur-fast`, 0 under redusert bevegelse.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** Gruppa (`role="group"`, `aria-label`) er appens ansvar. En knapp uten `label` har ikke noe navn.

## Innhold

- `label` er fargens navn slik folk sier det: «Marineblå», «Støvet rosa», ikke «#1F3A5F».
- Gruppa heter det valget gjelder: «Farge», «Blomsterfarge».
- Trenger fargen en forklaring (lager, produsent), hører den hjemme i teksten ved siden av, ikke i `label`.
