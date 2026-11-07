---
navn: Progress
gruppe: feedback
status: new
sidenVersjon: 0.5.7
side: https://mariisno.github.io/sassy-ui/komponenter/progress/
typer: dist/feedback/Progress.d.ts
---

# Progress

Hvor langt noe er kommet: en linje (planter vannet, en opplasting) eller en ring (en økt, med tallet i midten). `role="progressbar"` med `aria-valuenow/min/max`; uten `value` er den ubestemt, uten `valuenow` og med en rolig feiing som blir en toning under `prefers-reduced-motion`. Fyllet er aksenten eller en statusfarge, sporet er `--surface-3` med en `--border-control`-kant, så spor og fyll holder 3:1 i begge temaer og alle aksenter.

## Når du bruker den

- Noe som går framover og har en slutt: planter av et antall, en opplasting, et steg av flere.
- En ring med tallet i midten når ett tall er det viktigste på skjermen (tid igjen i en økt).
- Noe som pågår uten kjent lengde: `Progress` uten `value` (ubestemt).

## Når du ikke bruker den

- En statisk andel (lagringsplass brukt): det er en måler, ikke framdrift. Skriv tallet.
- Et tidsur: appen eier klokka. Progress viser den, teller ikke selv.
- Status som ferdig/pauset: [Badge](Badge.nb.md).
- Laster en hel side: Sussi i `sover`-positur, eller en ubestemt Progress med `label="Laster"`.

## Gjør

- Gi alltid `label`, eller `aria-labelledby` til en synlig overskrift. Det er navnet på framdriftslinja.
- Si det folk ville sagt i `valueText`: «12 av 30 planter», «3 min igjen». Ellers leses prosenten.
- Sett `max` til det som telles (planter, sekunder), så `value` kan være det samme tallet som i teksten.
- Velg `tone` etter mening: `success` ferdig, `warning` snart tomt, `danger` over grensa. Ellers aksenten.
- Si tallet i `valueText` også når det står i midten av ringen; midten er rent innhold.

## Ikke gjør

- Ikke en Progress uten navn.
- Ikke `value` som gjetning. Er mengden ukjent, utelat `value`.
- Ikke flere framdriftslinjer oppå hverandre for samme ting.
- Ikke en prosent i `valueText` når tallet er mer konkret.

## Eksempel

```jsx
import { Progress } from 'sassy/components';

<Progress value={12} max={30} label="Planter vannet" valueText="12 av 30 planter" />
<Progress value={0.6} max={1} label="Opplasting" tone="success" />
<Progress label="Laster" />
<Progress variant="ring" value={95} max={180} size={72} label="Økt" valueText="3 min igjen">1:25</Progress>
<h3 id="planter">Planter</h3>
<Progress value={12} max={30} aria-labelledby="planter" />
```

## Props

Typene står i `dist/feedback/Progress.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/progress/).

<!-- props: ProgressProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `variant` | `'bar' \| 'ring'` | `'bar'` | En linje eller en ring. |
| `value` | `number` | – | 0 til `max`. Utelat den mens mengden er ukjent (ubestemt). |
| `max` | `number` | `100` | Send 1 for en brøk, eller antall planter, steg, sekunder. |
| `label` | `string` | – | Det tilgjengelige navnet, påkrevd med mindre `aria-labelledby` peker på en synlig overskrift. |
| `valueText` | `string` | – | Leses i stedet for prosenten, f.eks. «12 av 30 planter» eller «3 min igjen». |
| `size` | `number` | `48` | Bare ringen: diameter i px. Streken følger med (size / 12, minst 3 px). |
| `tone` | `'accent' \| 'success' \| 'warning' \| 'danger'` | `'accent'` | `accent` følger appens `data-accent`. Statustonene bruker Sassys statusfarger. |
| `children` | `React.ReactNode` | – | Bare ringen: det som står i midten, f.eks. tallet. Rent innhold, så si verdien i `valueText` også. |

Pluss alle attributtene til `<span>` (`React.HTMLAttributes<HTMLSpanElement>`), unntatt `children`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, fargereglene i enhetstester.

- **Element og rolle.** Et `<span>` med `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax={max}` og `aria-valuenow` (begrenset til 0–max) når `value` er et tall. Uten `value`: ingen `aria-valuenow`, altså ubestemt. `aria-valuetext` fra `valueText`.
- **Navn.** `label` som `aria-label`. Er `aria-labelledby` satt, droppes `aria-label`, så navnet ikke leses dobbelt (testet).
- **Tastatur og fokus.** Ingen; den kan ikke betjenes.
- **Kontrast.** Sporet er `--surface-3` med en 1 px `--border-control`-kant som holder 3:1 mot `--bg`, `--surface-1` og `--surface-2`; fyllet holder 3:1 mot sporet og mot flatene, i begge temaer og alle aksenter, for alle fire toner. `warning` fyller med `--warning-fg`, siden `--warning` bare er 2,51:1 mot sporet i lyst tema (WCAG 1.4.11).
- **Bevegelse.** Fyllet glir på `--dur-base` når verdien endres, 0 under redusert bevegelse. Ubestemt: linja feier (1,6 s) og ringen snurrer; under `prefers-reduced-motion` blir begge en langsom toning i opasitet (2 s), så noe ukjent fortsatt ser levende ut uten å flytte seg (WCAG 2.3.3).
- **Ring.** SVG-en er `aria-hidden` og `focusable="false"`; innholdet i midten er vanlig tekst. Streken er `size / 12`, minst 3 px, og sporet har en egen kantsirkel.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Ingen nøytral eller pauset tone, ingen prop for linjehøyde (8 px) eller ringens strekbredde.

## Innhold

- `label` er det som telles, som substantiv: «Planter vannet», «Opplasting», «Økt».
- `valueText` er det du ville sagt høyt: «12 av 30 planter», «3 min igjen», «nesten ferdig».
- Et tall i ringen er kort og i monospace (komponenten setter skriften): «1:25», «12».
- Ubestemt: `label` sier hva som skjer, i presens: «Laster», «Lagrer».
