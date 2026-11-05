---
navn: Tooltip
gruppe: overlays
status: stable
sidenVersjon: 0.2.0
kort: components/overlays/overlays.card.html
typer: components/overlays/Tooltip.d.ts
---

# Tooltip

En kort tekst som vises ved hover og fokus, etter 300 ms, for ikonknapper og snarveier. Bobla er koblet til utløseren med `aria-describedby`, utløserens native `title` fjernes så det bare blir én boble, Esc skjuler bobla uten å flytte mus eller fokus, og musa kan flyttes fra utløseren over på bobla uten at den lukker (WCAG 1.4.13). `kbd` viser en tastatursnarvei i monospace.

## Når du bruker den

- En [IconButton](IconButton.nb.md) der ikonet ikke er opplagt for alle.
- En snarvei: «Søk» + `kbd="⌘K"`.
- Et kort tillegg til noe som alt har et navn: «Lagres automatisk».

## Når du ikke bruker den

- Informasjon folk må ha: skriv den i grensesnittet. En tooltip er en beskrivelse, ikke et navn, og finnes ikke på berøringsskjerm.
- Lang tekst eller lenker: [Dialog](Dialog.nb.md) eller tekst på sida.
- Feilmeldinger: `error` på feltet.
- Et element som ikke kan ta fokus (tekst, et ikon alene): da når tastaturet aldri bobla.

## Gjør

- Pakk ett element som kan ta fokus, som en IconButton eller Button.
- Hold `content` til noen få ord; bobla bryter ved 260 px.
- La teksten gjenta knappens `label`, eventuelt med snarveien i `kbd`.
- Bruk `side="bottom"` når bobla ellers havner utenfor toppen av skjermen.

## Ikke gjør

- Ikke legg noe inni bobla som kan klikkes.
- Ikke bruk en Tooltip som eneste navn på en knapp; `label` på IconButton er navnet.
- Ikke flere elementer i `children`; bare ett får `aria-describedby`.
- Ikke `open` i produksjon; den er for dokumentasjon og kort.

## Eksempel

```jsx
import { Tooltip, IconButton } from 'sussi/components';

<Tooltip content="Søk" kbd="⌘K"><IconButton icon="search" label="Søk" onClick={søk} /></Tooltip>
<Tooltip content="Lagres automatisk" side="bottom"><IconButton icon="cloud" label="Synkronisering" /></Tooltip>
```

## Props

Typene står i `components/overlays/Tooltip.d.ts`. Kortet, delt med Dialog: `components/overlays/overlays.card.html`.

<!-- props: TooltipProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `content` | `React.ReactNode` | *påkrevd* | Teksten i bobla. |
| `kbd` | `string` | – | Tastatursnarvei vist i monospace, f.eks. «⌘K». |
| `side` | `'top' \| 'bottom'` | `'top'` | Over eller under utløseren. |
| `open` | `boolean` | `false` | Tvungent synlig (for dokumentasjon og forhåndsvisninger). |
| `children` | `React.ReactNode` | *påkrevd* | Ett element, f.eks. en IconButton. Det får `aria-describedby` som peker på bobla. |
| `id` | `string` | – | Id på bobla. Standard én fra `React.useId()`. |
| `className` | `string` | – | Klasser på omslaget. |

Pluss alle attributtene til `<span>` (`React.HTMLAttributes<HTMLSpanElement>`), unntatt `content`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/tooltip.e2e.test.mjs`.

- **Element og rolle.** Et `<span class="s-tip">` rundt utløseren og en `<span role="tooltip" id>` for bobla. Utløseren klones med `aria-describedby` som peker på bobla (din egen `aria-describedby` beholdes foran, testet) og uten `title` (testet; en IconButton utenfor en Tooltip beholder sin).
- **Navn og beskrivelse.** Bobla er en beskrivelse av utløseren, ikke et navn. Utløserens navn er dens eget (`label`).
- **Visning.** Hover eller fokus inni omslaget viser bobla etter 300 ms (`transition-delay`); `open` viser den uten forsinkelse.
- **Tastatur.** Tab til utløseren viser bobla. Esc skjuler den mens fokus eller musa blir der den er (testet begge), og neste hover eller fokus viser den igjen (testet).
- **Peker.** Den viste bobla tar pekeren, og en usynlig bro dekker de 8 px mellom utløser og boble, så musa kan flyttes opp på bobla (testet). En skjult boble tar ikke musa (testet).
- **Kontrast.** `--fg-inverse` på `--surface-inverse`, 12 px medium. `kbd` er monospace med 65 % opasitet; det er et tillegg, ikke eneste bærer av snarveien.
- **Tekst.** Bryter ved `min(260px, 100vw − 32px)` i stedet for å klippes (0.5.3).
- **Bevegelse.** Toner og flytter 4 px på `--dur-fast`, 0 under redusert bevegelse. Forsinkelsen på 300 ms er fast.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Bobla sentreres over eller under utløseren og flytter seg ikke unna skjermkanten; bruk `side` der det trengs. På berøringsskjerm finnes ingen hover; det som står i bobla må også finnes et annet sted.

## Innhold

- Samme ord som knappens `label`: «Søk», «Innstillinger». Ikke en ny formulering.
- Noen få ord, ingen punktum, ingen «Klikk for å …».
- Snarveien i `kbd` med symboler: «⌘K», «Ctrl+K».
- Et tillegg kan være en kort setning uten punktum: «Lagres automatisk».
