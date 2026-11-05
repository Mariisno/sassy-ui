---
navn: Popover
gruppe: overlays
status: new
sidenVersjon: 0.6.0
kort: components/overlays/menu.card.html
typer: components/overlays/Popover.d.ts
---

# Popover

En ikke-modal flate forankret til knappen som åpner den. Knappen får `aria-expanded` og `aria-controls` og veksler panelet ved klikk; panelet legger seg under knappen (over med `side="top"`), snur når det ikke er plass og det er mer rom på den andre sida, og holder seg 8 px innenfor skjermkanten, også på 320 px. Fokus flyttes inn når det åpner, Esc lukker med fokus tilbake på knappen, et klikk utenfor og fokus som går et annet sted lukker, og Tab ved panelets kant går tilbake gjennom knappen, så sidas tabrekkefølge fortsetter derfra. [Menu](Menu.nb.md) er en Popover med `role="menu"`; bruk den for en liste med handlinger.

## Når du bruker den

- Noen få kontroller som hører til én knapp: et filter, et datovalg, et fargevalg.
- Et kort skjema som ikke trenger hele skjermen: «Gi nytt navn», «Legg til merkelapp».
- `portal` når knappen står i en dialogkropp, en sidemeny eller noe med `overflow: hidden` eller en transform.
- `align="end"` for en knapp til høyre i en rad, så panelet ikke går utenfor.

## Når du ikke bruker den

- En liste med handlinger: [Menu](Menu.nb.md), som har rollene og tastene en meny skal ha.
- En oppgave som trenger full oppmerksomhet, eller noe som ikke kan angres: [Dialog](Dialog.nb.md).
- Et hint ved et ikon: [Tooltip](Tooltip.nb.md).
- Innhold som er for langt for skjermen: panelet ruller, men en side eller et ark er bedre.

## Gjør

- Gi `trigger` ett element som kan ta fokus, en Button eller en IconButton.
- Navngi panelet med `aria-label` eller `aria-labelledby`, og gi det `role="dialog"` når det er mer enn en gruppe kontroller.
- Legg en knapp som lukker inni panelet når noe skal bekreftes («Bruk filter»); ellers holder Esc og et klikk utenfor.
- Hold innholdet kort: noen kontroller, ett kort skjema.

## Ikke gjør

- Ikke en streng eller et fragment som `trigger`; det kan ikke ta ref og handlere, så ingenting åpner (en advarsel i utvikling).
- Ikke en Popover uten `portal` fra en dialogkropp eller et kort med `overflow: hidden`; panelet klippes.
- Ikke en [Tooltip](Tooltip.nb.md) på en kontroll i panelet; panelet ruller og klipper bobla ved kanten. Bruk kontrollens egen tekst.
- Ikke viktig innhold bare i en popover; den lukker når fokus går videre.

## Eksempel

```jsx
import { Popover, Button, Checkbox } from 'sussi/components';

<Popover trigger={<Button variant="secondary" iconRight="chevron-down">Filter</Button>} aria-label="Filter">
  <Checkbox label="Bare mine" />
  <Checkbox label="Ferdige også" />
</Popover>

<Popover portal align="end" trigger={<Button variant="secondary">Gi nytt navn</Button>} aria-label="Gi nytt navn" onOpenChange={(åpen, hvorfor) => logg(hvorfor)}>
  <Input label="Navn" defaultValue="Tomater" />
</Popover>
```

## Props

Typene står i `components/overlays/Popover.d.ts`. Kortet: `components/overlays/menu.card.html` (menyen og en popover). `placePopover(utløser, panel, visning, { side, align })` er plasseringa alene, eksportert for tester og for egne flater.

<!-- props: PopoverProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | *påkrevd* | Ett element som kan ta fokus, en Button eller en IconButton. Det klones med ref, handlerne og ARIA-attributtene. En streng eller et fragment kan ikke ta dem, så ingenting åpner; i utvikling logges en advarsel. |
| `children` | `React.ReactNode` | – | Innholdet i panelet: noen få kontroller, et kort skjema. |
| `open` | `boolean` | – | Styrt åpen-tilstand. Utelat den for en ustyrt popover. |
| `defaultOpen` | `boolean` | `false` | Åpen fra start, ustyrt. |
| `onOpenChange` | `(open: boolean, reason: string) => void` | – | Kjøres med ny tilstand og hvorfor: 'trigger', 'keyboard', 'escape', 'outside', 'blur', 'tab' eller 'select' (Menu). |
| `side` | `'bottom' \| 'top'` | `'bottom'` | Foretrukket side. Snur når det ikke er plass. |
| `align` | `'start' \| 'end'` | `'start'` | Hvilken kant av utløseren panelet stiller seg etter. 'start' er venstre; 'end' for en knapp til høyre i en rad. |
| `portal` | `boolean` | `false` | Rendrer panelet i `document.body` (position: fixed), så en posisjonert, transformert eller klippet forelder (en dialogkropp, en sidemeny, et kort med overflow hidden) ikke kan kutte det eller tegne over. Av som standard; ingen virkning uten `document`. I en forhåndsrendret app: åpne den etter hydrering. |
| `autoFocus` | `boolean` | `true` | Flytt fokus inn i panelet ved åpning. Menu slår den av og setter fokus selv. |
| `panelRef` | `React.Ref<HTMLDivElement>` | – | Når panelelementet. |
| `className` | `string` | – | Klasser på panelet. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `children`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/popover.e2e.test.mjs`, reglene og plasseringa i `tests/popover.test.mjs`.

- **Element og rolle.** Utløseren klones med `aria-expanded` og, mens panelet er åpent, `aria-controls` som peker på panelets id (testet). Panelet er en `<div tabIndex={-1}>` uten egen rolle; `role`, `aria-label`, `id`, `data-*` og `aria-*` når det.
- **Fokus inn.** Den første kontrollen i panelet, ellers panelet selv (testet for begge).
- **Tastatur.** Esc lukker og setter fokus tilbake på utløseren (testet). Tab etter siste kontroll og Shift+Tab før første lukker og går tilbake gjennom utløseren, så fokus lander på elementet etter eller før den (testet).
- **Lukking.** Et klikk utenfor lukker uten å flytte fokus til utløseren (testet). Fokus som går til et annet element lukker (testet); fokus som bare forsvinner (ingen `relatedTarget`, som et trykk i Safari) gjør det ikke.
- **I en dialog.** Med eller uten `portal`: dialogens fokusfelle slipper fokus inn i et panel hvis utløser står i dialogen, dialogens Tab-runde holder panelets kontroller utenfor, og Esc lukker popoveren først, dialogen ved neste trykk (testet for begge). En popover et annet sted på sida kan ikke ta fokus ut av en åpen dialog (testet).
- **Plassering.** Under utløseren med 6 px luft, over når det ikke er plass og det er mer rom der (testet nederst på skjermen); 8 px innenfor skjermkanten på 320 px uten sidelengs rulling (testet). Med `portal` er panelet et barn av `<body>` og står likevel ved utløseren inni en transformert, klippet forelder (testet).
- **Kontrast.** Panelet er `--surface-1` (`--surface-2` i mørkt tema) med `--border` og `--shadow-lg`; teksten arver `--fg-1`.
- **Bevegelse.** Panelet toner inn 4 px på `--dur-fast` (`s-popover-down`, `s-popover-up` over). Under `prefers-reduced-motion` er animasjonen fjernet (testet: `none`, `0s`).
- **Mål.** Høyst skjermen minus 16 px i begge retninger (`100dvh`/`100dvw`, med `vh`/`vw` som reserve), så panelet ruller inni når innholdet er høyere.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Panelet ruller når det er høyere enn skjermen, så en Tooltip inni klippes ved kanten. En utløser som ikke kan ta ref åpner ingenting; i utvikling logges en advarsel.

## Innhold

- Knappen sier hva panelet inneholder: «Filter», «Sorter», «Gi nytt navn».
- En knapp inni panelet sier utfallet: «Bruk filter», «Lagre navn».
- Ingen tittel i panelet når knappen allerede sier det; `aria-label` gjentar knappens tekst.
