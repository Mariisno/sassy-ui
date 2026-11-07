---
navn: Tag
gruppe: display
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/tag/
typer: dist/display/Tag.d.ts
---

# Tag

En pilleformet brikke for filtre, kategorier og valg som kan fjernes. Uten `onClick` er den et `<span>` med kant; med `selected` eller `onClick` blir den en bryterknapp (`aria-pressed`) som fylles med den myke aksenten når den er valgt. `onRemove` legger en egen fjern-knapp (×, 24 px) ved siden av teksten, aldri inni bryteren, med navnet «Fjern <tekst>».

## Når du bruker den

- Filtre i en rad: «Åpne», «Mine», «Denne uka», gjerne i en [ScrollRow](ScrollRow.nb.md) på telefon.
- Kategorier og stikkord på en ting: «research», «urter».
- Valg som er gjort og kan tas bort igjen: valgte farger, valgte personer.

## Når du ikke bruker den

- Status som ikke kan trykkes på: [Badge](Badge.nb.md).
- Ett valg blant få, i et skjema: [Radio](Radio.nb.md).
- Visninger som bytter innhold: [Tabs](Tabs.nb.md) `variant="segmented"`.
- En handling: [Button](Button.nb.md). En Tag endrer en tilstand, den gjør ikke noe.

## Gjør

- Styr `selected` fra appens tilstand; da er `aria-pressed` alltid sann.
- Send `removeLabel` på engelske flater («Remove Figma»), og alltid når innholdet ikke er ren tekst.
- Hold teksten til ett eller to ord i setningsform.
- La det være lov å ha ingen valgt. Et filter uten valg viser alt.

## Ikke gjør

- Ikke legg `onClick` på en Tag som bare er pynt. Da lover den noe den ikke holder.
- Ikke sett en lenke inni. Hele taggen er målet.
- Ikke bruk fjern-knappen til «slett tingen». Den fjerner valget, ikke objektet.
- Ikke mer enn én rad med tagger per visning; flere blir et lager, ikke et filter.

## Eksempel

```jsx
import { Tag } from 'sassy/components';

<Tag icon="hash">research</Tag>
<Tag selected={åpne} onClick={() => setÅpne(!åpne)}>Åpne</Tag>
<Tag onRemove={() => fjern('urter')}>urter</Tag>
<Tag onRemove={() => fjern('figma')} removeLabel="Remove Figma">Figma</Tag>
```

## Props

Typene står i `dist/display/Tag.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/tag/).

<!-- props: TagProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `icon` | `string` | – | Lucide-ikonnavn foran teksten. |
| `selected` | `boolean` | – | Gjør den til en bryter (`aria-pressed`). |
| `onClick` | `(e: React.MouseEvent) => void` | – | Klikk på taggen (bryteren). |
| `onRemove` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | – | Viser en fjern-knapp (×) ved siden av teksten: en egen knapp, 24 px, som tastaturet når. |
| `removeLabel` | `string` | `'Fjern <text>'` | Tilgjengelig navn på fjern-knappen. Standard «Fjern <tekst>» når innholdet er tekst, ellers «Fjern». |
| `children` | `React.ReactNode` | – | Teksten. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren.

- **Element og rolle.** Uten `onClick` og `selected`: et `<span>`. Med en av dem: en `<button type="button">` med `aria-pressed`. Med `onRemove`: et `<span>` som holder teksten (eller bryterknappen) og en egen `<button>` for ×. En knapp står aldri inni en annen.
- **Navn.** Taggen heter teksten sin. Fjern-knappen heter `removeLabel`, ellers «Fjern <tekst>» når innholdet er tekst eller tall, ellers bare «Fjern». Ikonet er dekorativt.
- **Tastatur.** Tab når bryteren og fjern-knappen hver for seg. Enter og mellomrom på × fjerner (testet); på bryteren veksler de. Å fjerne veksler ikke bryteren (`stopPropagation`).
- **Tilstand.** `aria-pressed="true"` fyller med `--accent-soft` og `--accent-soft-fg`, 4,5:1 i alle aksenter (testet). Valgt er altså både farge og attributt.
- **Fokus.** Standard fokusring (2 px `--focus-color`) på bryteren og på ×.
- **Kontrast.** Uvalgt er `--fg-2` på `--surface-1` med `--border-strong`-kant; hover går til `--fg-1`.
- **Mål.** Taggen er minst 28 px høy, fjern-knappen 24 × 24 px (WCAG 2.5.8 minste mål, testet). Kjent grense: begge er under de 44 px Sassy vil ha på berøringsskjerm; gi radene luft.
- **Tekst.** Vokser med innholdet, klippes ikke (0.5.3).
- **Bevegelse.** Overganger på `--dur-fast`, 0 under redusert bevegelse.
- **Innebygd tekst.** «Fjern» / «Fjern <tekst>». Overstyr med `removeLabel`.

## Innhold

- Små bokstaver for stikkord («research», «urter»), setningsform for filtre («Denne uka»).
- Samme ord i filteret som i tingen det filtrerer på.
- `removeLabel` sier hva som fjernes: «Fjern urter», ikke «Lukk».
- Ingen tellere i taggen; antallet står i [Tabs](Tabs.nb.md) `count` eller i overskriften.
