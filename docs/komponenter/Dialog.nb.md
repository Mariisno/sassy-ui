---
navn: Dialog
gruppe: overlays
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/dialog/
typer: dist/overlays/Dialog.d.ts
---

# Dialog

En modal dialog med bakteppe, etter WAI-ARIA-mønsteret for dialoger: fokus flyttes inn når den åpner, Tab holder seg inni, Esc og et klikk på bakteppet lukker, og fokus går tilbake til det som åpnet den. Navngitt av `title` og beskrevet av `description`; sida bak låses mot rulling. `variant="sheet"` er den samme dialogen reist fra bunnen av skjermen (full bredde på telefon, 560 px sentrert på større skjerm, et håndtak, innholdet ruller inni), og `portal` rendrer den i `<body>` så en posisjonert forelder ikke kan tegne over.

## Når du bruker den

- En oppgave som trenger full oppmerksomhet: et kort skjema, et valg som må tas før du går videre.
- Bekreftelse av noe som ikke kan angres, med en `danger`-knapp og en tydelig «Behold».
- `variant="sheet"` på telefon: et kort skjema, et valg mellom få alternativer, detaljer for én ting.
- `portal` når dialogen åpnes fra noe posisjonert eller transformert, eller fra en annen dialog.

## Når du ikke bruker den

- Noe som kan angres: gjør det, og vis «Angre» i en [Toast](Toast.nb.md).
- En beskjed som ikke krever svar: [Toast](Toast.nb.md).
- Et hint ved et ikon: [Tooltip](Tooltip.nb.md).
- Innhold som er en egen side: en side.

## Gjør

- Tittelen er et spørsmål eller en verbfrase: «Slette prosjektet?», «Logg en økt».
- Knappene sier utfallet: «Slett prosjekt» og «Behold», aldri «OK» og «Avbryt».
- Gi alltid `onClose`; uten den finnes verken lukkeknapp, Esc eller bakteppelukking.
- Si i `description` hva som skjer: «Dette fjerner 12 oppgaver og kan ikke angres.»
- Bruk `initialFocus` når det første feltet ikke er det riktige å starte i.

## Ikke gjør

- Ikke en dialog oppå en dialog uten `portal`; bare den innerste holder fokus og tar Esc.
- Ikke `inline` i produksjon; den er for forhåndsvisninger og kort.
- Ikke fokus på fareknappen fra start. Komponenten unngår det; ikke sett `autofocus` på den.
- Ikke lang tekst i et ark; det er høyst 90 % av skjermen, og innholdet ruller.

## Eksempel

```jsx
import { Dialog, Button, Input } from 'sassy/components';

<Dialog open={åpen} onClose={lukk} title="Slette prosjektet?" description="Dette fjerner 12 oppgaver og kan ikke angres."
  footer={<><Button variant="ghost" onClick={lukk}>Behold</Button><Button variant="danger" onClick={slett}>Slett prosjekt</Button></>} />

<Dialog variant="sheet" portal open={loggÅpen} onClose={lukkLogg} title="Logg en økt" description="En økt du gjorde utenfor appen."
  footer={<><Button variant="ghost" onClick={lukkLogg}>Avbryt</Button><Button onClick={lagre}>Lagre økt</Button></>}>
  <Input label="Minutter" inputMode="numeric" />
</Dialog>
```

## Props

Typene står i `dist/overlays/Dialog.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/dialog/).

<!-- props: DialogProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `open` | `boolean` | `true` | Åpen. Lukket rendrer den ingenting. |
| `onClose` | `() => void` | – | Kjøres av Esc, et klikk på bakteppet og lukkeknappen. Uten den finnes ingen lukkeknapp, og Esc og bakteppet gjør ingenting. |
| `title` | `React.ReactNode` | – | Overskriften; gir dialogen navn (`aria-labelledby`). |
| `description` | `React.ReactNode` | – | En linje under overskriften; beskriver dialogen (`aria-describedby`). |
| `children` | `React.ReactNode` | – | Innholdet. |
| `footer` | `React.ReactNode` | – | Handlinger, høyrestilt. Typisk `<Button variant="ghost">Behold</Button><Button variant="danger">Slett prosjekt</Button>`. |
| `size` | `'md' \| 'lg'` | `'md'` | Bredde: 440 / 600 px for dialogen, 560 / 720 px for arket. |
| `variant` | `'dialog' \| 'sheet'` | `'dialog'` | `dialog` er sentrert. `sheet` glir opp fra bunnen: full bredde på telefon, begrenset og sentrert på en større skjerm, avrundede øvre hjørner, et håndtak, luft til hjemindikatoren, høyst 90 % av høyden med innholdet rullende inni. Samme modale oppførsel. |
| `inline` | `boolean` | `false` | Legger bakteppet absolutt inne i nærmeste posisjonerte forelder (for forhåndsvisninger). Overstyrer `portal`. |
| `portal` | `boolean` | `false` | Rendrer i `document.body` i stedet for der den brukes, så en posisjonert eller transformert forelder ikke kan tegne over. En dialog åpnet fra en annen kan bruke den: bare den innerste åpne holder fokus og håndterer Esc og Tab. Av som standard; ingen virkning uten `document`. I en forhåndsrendret app: åpne den etter hydrering. |
| `closeLabel` | `string` | `'Lukk'` | Tilgjengelig navn på lukkeknappen. Engelske flater sender «Close». |
| `initialFocus` | `React.RefObject<HTMLElement \| null>` | – | Elementet som får fokus ved åpning. Standard: `[autofocus]`/`[data-autofocus]`, så første kontroll i innholdet, så panelet selv (aldri en knapp i bunnen, så Enter ikke bekrefter ved et uhell). |
| `className` | `string` | – | Klasser på panelet. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `title`.
<!-- /props -->

Merk at `open` er `true` når den ikke er satt: en Dialog uten `open` er åpen. Send `open={false}` eller la den være umontert for å skjule den.

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** En `<div role="dialog" aria-modal="true" tabIndex={-1}>` i et bakteppe. `aria-labelledby` peker på `title` (`<h2>`), `aria-describedby` på `description` (testet). `id`, `data-*` og `aria-*` når panelet.
- **Fokus inn.** `initialFocus`, ellers `[autofocus]`/`[data-autofocus]`, ellers den første kontrollen i innholdet, ellers panelet selv, så skjermleseren leser tittelen og Enter ikke kan treffe «Slett» (testet: fokus er inni ved åpning).
- **Tastatur.** Tab og Shift+Tab går rundt inni panelet (testet, åtte trykk hver vei). Esc kaller `onClose` (testet). Et `focusin` utenfor flyttes tilbake inn.
- **Fokus ut.** Ved lukking går fokus tilbake til elementet som hadde det før (testet for Esc og for en knapp i bunnen), når det fortsatt er i dokumentet.
- **Bakteppe.** `mousedown` på bakteppet selv kaller `onClose` (testet for arket). Sida bak får `overflow:hidden` mens dialogen er åpen (testet), ikke med `inline`.
- **Nøstet.** Bare den innerste åpne dialogen holder fokus og håndterer Esc og Tab; et ark åpnet gjennom `portal` fra et annet ark testes slik.
- **Lukkeknapp.** En IconButton med `aria-label="Lukk"` (testet), bare med `onClose`.
- **Kontrast.** Panelet er `--surface-1` (`--surface-2` i mørkt tema); teksten `--fg-1`, beskrivelsen `--fg-2`. Bakteppet er `--overlay-scrim` med 2 px uskarphet. Håndtaket på arket er dekorativt (`aria-hidden`) og trenger ingen kontrast.
- **Bevegelse.** Bakteppet toner inn på `--dur-base` og panelet stiger 8 px på `--dur-slow`; arket glir opp på `--dur-slow` (`s-sheet-up`). Under `prefers-reduced-motion` er varighetene 0, og arkets animasjon er fjernet helt (testet: `none`, `0s`).
- **Mål.** Dialogen er inntil 440 px (`lg` 600), arket 560 (`lg` 720) og full bredde under det, med `env(safe-area-inset-bottom)` under bunnen. Lukkeknappen er 30 px.
- **Innebygd tekst.** «Lukk» på lukkeknappen. Overstyr med `closeLabel` («Close»).
- **Kjente grenser.** Ikke et native `<dialog>`, og sida bak får ikke `inert`; `aria-modal` sier til skjermleseren at resten er utilgjengelig. Uten `title` har dialogen ikke noe navn: send `aria-label` da.

## Innhold

- Tittelen er spørsmålet eller oppgaven: «Slette prosjektet?», «Logg en økt». Ingen «Bekreft».
- `description` sier konsekvensen rett ut: «… og kan ikke angres.» Tallene med: «12 oppgaver».
- Den primære knappen gjentar verbet fra tittelen: «Slett prosjekt». Den andre sier hva som skjer i stedet: «Behold», «Avbryt».
- Ingen utropstegn, ingen «Er du sikker?». Si hva som skjer, og la folk velge.
