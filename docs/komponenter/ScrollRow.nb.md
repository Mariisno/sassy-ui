---
navn: ScrollRow
gruppe: display
status: stable
sidenVersjon: 0.4.0
kort: components/display/swatch.card.html
typer: components/display/ScrollRow.d.ts
---

# ScrollRow

En rad som ruller sidelengs uten rullefelt, og som tones ut i kanten der det er mer å se. Barna står på én linje (`display:flex`, ingen bryting, 8 px mellomrom fra `--scrollrow-gap`), og raden setter `data-fade-start` og `data-fade-end` etter hvor du er. Med `label` blir den en navngitt region som tar fokus, så tastaturet kan rulle den når innholdet selv ikke har noe å fokusere. `scrollEdges` er regnestykket bak fadingen, eksportert for tester og apper som tegner sin egen.

## Når du bruker den

- En rad med små, like ting som ikke får plass på en telefon: tagger, fargeprikker, faner.
- Filtre øverst på en liste.
- Når det skal være tydelig at noe er klippet av, uten piler.

## Når du ikke bruker den

- Kort eller innhold folk leser: la det bryte til nye linjer.
- Vertikale lister: vanlig rulling.
- Faner som er hovednavigasjon: [AppShell](AppShell.nb.md) eller [Tabs](Tabs.nb.md); legg Tabs i en ScrollRow bare når de ikke får plass.
- Et bildegalleri: det trenger sideindikatorer og større mål enn dette.

## Gjør

- Gi `label` når barna ikke kan ta fokus (tekst, dekorative prikker). Med knapper eller lenker inni ruller Tab dem allerede inn i bildet.
- Trekk raden ut til skjermkanten med negativ margin og samme padding, så fadingen ligger i kanten av skjermen.
- Legg det viktigste først. Det som står lengst til høyre ser færrest.
- Hold barna i samme størrelse, så raden ser ut som én rad.

## Ikke gjør

- Ikke legg til piler eller et synlig rullefelt. Fadingen er signalet.
- Ikke sett `label` på en rad med knapper; da får tastaturet to stopp for samme ting.
- Ikke bruk den til innhold som må ses i sin helhet (et sammendrag, en advarsel).
- Ikke mer enn én ScrollRow rett under en annen.

## Eksempel

```jsx
import { ScrollRow, Tag, Swatch } from 'sussi/components';

<ScrollRow>
  {typer.map((t) => <Tag key={t} selected={t === valgt} onClick={() => velg(t)}>{t}</Tag>)}
</ScrollRow>
<ScrollRow label="Farger">
  {farger.map((f) => <Swatch key={f.id} color={f.hex} label={f.navn} />)}
</ScrollRow>
<ScrollRow style={{ margin: '0 calc(-1 * var(--space-4))', padding: '0 var(--space-4)' }}>…</ScrollRow>
```

## Props

Typene står i `components/display/ScrollRow.d.ts`. Kortet, delt med Swatch: `components/display/swatch.card.html`.

<!-- props: ScrollRowProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `string` | – | Gir raden navn som region og gjør den fokuserbar, så tastaturet kan rulle den. Gi den når barna ikke kan ta fokus selv. |
| `children` | `React.ReactNode` | – | Det som ligger på rad: tagger, prikker, faner. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`).
<!-- /props -->

`scrollEdges({ scrollLeft, clientWidth, scrollWidth, overflowX })` gir `{ start, end }`: om det er mer å se til venstre og til høyre, med én piksel slingringsmonn, og alltid `false` når elementet ikke kan rulle.

## Tilgjengelighet

Oppførselen er testet i `tests/nye.e2e.test.mjs`.

- **Element og rolle.** En `<div>` med `overflow-x:auto`. Med `label`: `role="region"`, `aria-label` og `tabIndex=0`. Uten `label`: ingen rolle, ikke fokuserbar.
- **Navn.** `label`, når den er gitt.
- **Tastatur.** Med `label` tar raden fokus, og nettleseren ruller et fokusert element som kan rulle med piltastene. Uten `label` ruller Tab barna inn i bildet når de tar fokus.
- **Fokus.** En 2 px `outline` i `--focus-color` på innsiden (`outline-offset:-2px`), så masken ikke skjuler den (testet).
- **Fading.** En maske på 48 px i kanten, satt etter `data-fade-start`/`data-fade-end`. Det er et visuelt hint; ingenting av innholdet er borte for skjermleseren. Målt på nytt ved rulling og med `ResizeObserver` når raden eller første barn endrer størrelse.
- **Kontrast.** Raden har ingen egen farge; barna sine regler gjelder.
- **Bevegelse.** Ingen animasjon. Rullefeltet er skjult (`scrollbar-width:none`), og rullingen er nettleserens egen.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** Uten rullefelt er det bare fadingen som sier at det er mer, og den er svak for noen. Legg det viktigste først.

## Innhold

- Raden har ingen tekst selv. `label` er et substantiv for det den holder: «Farger», «Typer», «Filtre».
- Barna er korte: ett ord per tagg, ett navn per prikk.
- Ikke «Rull for å se mer». Fadingen og tommelen sier det.
