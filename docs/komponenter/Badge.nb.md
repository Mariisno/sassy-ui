---
navn: Badge
gruppe: display
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/badge/
typer: dist/display/Badge.d.ts
---

# Badge

En liten pille som viser status, versjon eller antall, og som ikke kan trykkes på. Syv toner (neutral, accent, success, warning, danger, info, clay) som myk bakgrunn med mørk tekst, en valgfri prikk foran, `outline` for en gjennomsiktig variant med kant, og `mono` for tall og versjoner. Pillen vokser med teksten.

## Når du bruker den

- Status på en rad eller et kort: «Ferdig», «Trenger gjennomgang», «Pauset».
- Versjon, antall eller id i monospace: `v1.2.0`, `12`, `#482`.
- Et lite stikkord ved en tittel: «Ny», «Beta».
- `dot` når statusen har en farge folk kjenner igjen fra andre steder i appen.

## Når du ikke bruker den

- Noe som kan trykkes, filtreres eller fjernes: [Tag](Tag.nb.md).
- En hel beskjed eller en advarsel: [Toast](Toast.nb.md) eller tekst.
- Et tall som endrer seg hele tida (nedtelling, framdrift): tekst i monospace, eller [Progress](Progress.nb.md).

## Gjør

- Ett eller to ord, setningsform.
- Velg tonen etter mening, ikke etter farge: `success` for ferdig, `warning` for snart, `danger` for stoppet, `info` for opplysning.
- La `accent` følge appens aksent (`data-accent`); `success` er alltid mose.
- Sett ordet, ikke bare prikken. En farge alene sier ingenting for mange.

## Ikke gjør

- Ikke legg `onClick` på en Badge. Den er et `<span>` uten rolle, og tastaturet når den ikke.
- Ikke bruk flere enn én Badge per rad. Da blir ingen av dem lest.
- Ikke skriv hele setninger i den.
- Ikke bruk `danger` for alt som er viktig; da mister rødt mening.

## Eksempel

```jsx
import { Badge } from 'sassy/components';

<Badge tone="success" dot>Ferdig</Badge>
<Badge tone="warning">Trenger gjennomgang</Badge>
<Badge tone="accent">Ny</Badge>
<Badge mono outline>v1.2.0</Badge>
```

## Props

Typene står i `dist/display/Badge.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/badge/).

<!-- props: BadgeProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'clay'` | `'neutral'` | `accent` følger appens `data-accent`; `success` er alltid mose. `clay` er leire uansett aksent. |
| `dot` | `boolean` | `false` | En statusprikk foran teksten. |
| `outline` | `boolean` | `false` | Gjennomsiktig med kant i stedet for fyll. |
| `mono` | `boolean` | `false` | Monospace, for versjoner, tall og id-er. |
| `children` | `React.ReactNode` | – | Teksten, ett eller to ord. |

Pluss alle attributtene til `<span>` (`React.HTMLAttributes<HTMLSpanElement>`).
<!-- /props -->

## Tilgjengelighet

- **Element og rolle.** Et `<span>` uten rolle. Den er tekst, og leses som teksten den inneholder. `id`, `data-*` og `aria-*` når elementet.
- **Tastatur og fokus.** Ingen; den kan ikke trykkes.
- **Navn og tilstand.** Teksten. Prikken (`dot`) er et tomt `<span>` i `currentColor` og bærer ingen mening alene: ordet gjør det.
- **Kontrast.** `accent` er `--accent-soft-fg` på `--accent-soft`, holdt til 4,5:1 i begge temaer og alle aksenter (testet). `neutral` er `--fg-2` på `--surface-2`, 4,5:1 på flatene. Statustonene er `--<tone>-fg` på `--<tone>-soft`; temamotoren holder hvert par til 4,5:1 når du lager et eget tema (testet). `outline` er `--fg-2` på gjennomsiktig med en `--border-strong`-kant.
- **Tekst.** 12 px medium, eller DM Mono 400 med `mono`. Pillen vokser med teksten og klippes ikke (0.5.3, WCAG 1.4.4).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** `tone="clay"` er alltid leire, uansett aksent; den er for prosjektfarger, ikke status.

## Innhold

- Ett ord når det går: «Ferdig», «Pauset», «Ny».
- Fortid eller tilstand, aldri handling: «Arkivert», ikke «Arkiver».
- Tall og versjoner i `mono`, uten mellomrom mellom bokstav og tall: `v1.2.0`.
- Samme ord for samme status over hele appen.
