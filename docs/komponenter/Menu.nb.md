---
navn: Menu
gruppe: overlays
status: new
sidenVersjon: 0.6.0
kort: components/overlays/menu.card.html
typer: components/overlays/Menu.d.ts
---

# Menu

En menyknapp etter WAI-ARIA-mønsteret for menyknapper: en Button eller IconButton med `aria-haspopup="menu"` som åpner en liste med handlinger i en [Popover](Popover.nb.md) med `role="menu"`. Enter, mellomrom og pil ned åpner på første punkt, pil opp på siste; pilene flytter med omløp, Home og End hopper, en bokstav går til neste punkt som begynner med den; Enter og mellomrom velger og lukker, Esc lukker og setter fokus tilbake på knappen, Tab lukker og går videre. Et punkt kan være en lenke (`href`), avkrysset (`checked`), slått av (`disabled`) eller satt til side i farefargen (`danger`); `'-'` er en skillelinje og `{ label, items }` en gruppe med overskrift. Punktene er 44 px på berøring og 32 px med mus.

## Når du bruker den

- Handlingene på én ting bak én knapp: en rads «Flere valg», en sides overflyt.
- Når en av handlingene er slett: bak en meny tar den et bevisst andre trykk, satt til side med `danger`.
- Et valg mellom få innstillinger, som sortering, med `checked` på det som gjelder.
- `portal` når knappen står i en dialogkropp, et kort med `overflow: hidden` eller en transformert forelder.

## Når du ikke bruker den

- Én eller to handlinger en rad alltid trenger: vis dem som knapper.
- Navigasjon mellom sider: [AppShell](AppShell.nb.md) eller [Tabs](Tabs.nb.md).
- Noen få kontroller som hører til en knapp, et filter eller et skjema: [Popover](Popover.nb.md).
- Et valg i et skjema: [Select](Select.nb.md) eller [Radio](Radio.nb.md).

## Gjør

- Skriv punktene som verbfraser i setningsform: «Rediger», «Dupliser», «Slett prosjekt».
- Legg `danger`-punktet sist, etter en skillelinje `'-'`.
- Gi `triggerLabel` et navn som sier hva menyen gjelder når flere står på en side: «Flere valg for Tomater».
- Bruk `align="end"` for en knapp til høyre i en rad, så menyen ikke går utenfor.
- Stopp klikket i en rad som selv åpner noe, så menyknappen ikke åpner raden: `onClick={(e) => e.stopPropagation()}` på din egen `trigger`.

## Ikke gjør

- Ikke mer enn sju punkter; del dem i grupper med overskrift, eller flytt noe til sida.
- Ikke et skjema eller tekst inni menyen; punktene er handlinger. Bruk [Popover](Popover.nb.md).
- Ikke `disabled` for å skjule noe; punktet blir stående og leses. Utelat det heller.
- Ikke en streng eller et fragment som `trigger`; det kan ikke ta ref, så standardknappen brukes i stedet (en advarsel i utvikling).

## Eksempel

```jsx
import { Menu, Button } from 'sussi/components';

<Menu align="end" triggerLabel="Flere valg for Tomater" onSelect={(id) => gjør(id)} items={[
  { id: 'edit', label: 'Rediger', icon: 'pencil' },
  { id: 'copy', label: 'Dupliser', icon: 'copy' },
  '-',
  { id: 'delete', label: 'Slett prosjekt', icon: 'trash-2', danger: true },
]} />

<Menu trigger={<Button variant="secondary" iconRight="chevron-down">Sorter</Button>} onSelect={(id) => setSortering(id)} items={[
  { label: 'Sorter etter', items: [
    { id: 'name', label: 'Navn', checked: sortering === 'name' },
    { id: 'date', label: 'Sist endret', checked: sortering === 'date' },
  ] },
]} />
```

## Props

Typene står i `components/overlays/Menu.d.ts`. Kortet: `components/overlays/menu.card.html`. Resten av propsene er [Popover](Popover.nb.md) sine (`PopoverProps`), minus de menyen setter selv.

<!-- props: MenuProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | – | Knappen. Standard: en IconButton med ellipse-ikonet, navngitt av `triggerLabel`. En utløser som ikke kan ta ref (en streng, et fragment) byttes med standardknappen; i utvikling logges en advarsel. |
| `triggerLabel` | `string` | `'Flere valg'` | Tilgjengelig navn på standardknappen. Engelske flater sender «More actions». |
| `items` | `MenuEntry[]` | `[]` | Punkter, skillelinjer (`'-'` eller `{ separator: true }`) og grupper med overskrift, i rekkefølge. |
| `label` | `string` | – | Tilgjengelig navn på selve menyen. Uten den er menyen navngitt av knappen (`aria-labelledby`). |
| `onSelect` | `(id: string \| undefined, item: MenuItem, event: React.SyntheticEvent) => void` | – | Kjøres for hvert valgte punkt, etter punktets egen `onSelect`. |
| `open` | `boolean` | – | Styrt åpen-tilstand. Utelat den for en ustyrt meny. |
| `defaultOpen` | `boolean` | `false` | Åpen fra start, ustyrt. |
| `onOpenChange` | `(open: boolean, reason: string) => void` | – | Kjøres med ny tilstand og hvorfor: 'trigger', 'keyboard', 'escape', 'outside', 'blur', 'tab' eller 'select'. |
| `side` | `'bottom' \| 'top'` | `'bottom'` | Foretrukket side. Snur når det ikke er plass. |
| `align` | `'start' \| 'end'` | `'start'` | Hvilken kant av knappen menyen stiller seg etter. 'start' er venstre; 'end' for en knapp til høyre i en rad. |
| `portal` | `boolean` | `false` | Rendrer menyen i `document.body` (position: fixed), for en knapp i en dialogkropp, et kort med overflow hidden eller en transformert forelder. Av som standard. |
| `className` | `string` | – | Klasser på menyen. |

Pluss alle propsene til `PopoverProps`, unntatt `trigger`, `children`, `autoFocus`, `panelRef`, `open`, `defaultOpen`, `onOpenChange`, `side`, `align`, `portal`, `className`.
<!-- /props -->

Et punkt i `items`:

<!-- props: MenuItem -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `id` | `string` | – | Gis til `onSelect`. Også React-nøkkelen. |
| `label` | `React.ReactNode` | *påkrevd* | Teksten: en verbfrase i setningsform, «Slett prosjekt». En streng er det bokstavtastene søker i. |
| `icon` | `string \| React.ReactNode` | – | Et Lucide-navn fra settet (se `components/icon/iconData.js`), eller et element. |
| `onSelect` | `(id: string \| undefined, event: React.SyntheticEvent) => void` | – | Kjøres når punktet velges, med `id`. |
| `href` | `string` | – | Rendrer punktet som en lenke (`role="menuitem"` på en `<a>`). |
| `disabled` | `boolean` | – | Blir i lista og leses av skjermleseren (`aria-disabled`), hoppes over av piltastene, gjør ingenting når det velges. |
| `danger` | `boolean` | – | Satt til side i farefargen, for slett og liknende. Legg det sist, etter en skillelinje. |
| `checked` | `boolean` | – | En boolsk verdi gjør punktet til en `menuitemcheckbox` med `aria-checked` og en hake. Å velge det lukker fortsatt menyen. |
| `className` | `string` | – | Klasser på punktet. |
<!-- /props -->

En gruppe i `items` (`{ label, items }`); en skillelinje er `'-'` eller `{ separator: true }`:

<!-- props: MenuGroup -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | *påkrevd* | Gruppas overskrift; leses som navnet på gruppa. |
| `items` | `MenuItem[]` | *påkrevd* | Punktene i gruppa. |
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/menu.e2e.test.mjs`, reglene og kontrasten i `tests/menu.test.mjs`.

- **Element og rolle.** Knappen får `aria-haspopup="menu"`, `aria-expanded` og, mens menyen er åpen, `aria-controls` (testet). Menyen er `role="menu"`, navngitt av knappen (`aria-labelledby`) eller av `label` (testet). Punktene er `role="menuitem"` på `<button>` eller `<a href>`, `role="menuitemcheckbox"` med `aria-checked` når `checked` er satt (testet); `role="separator"` og `role="group"` med `aria-labelledby` til overskriften (testet).
- **Fokus inn.** Første punkt ved Enter, mellomrom, pil ned og klikk; siste ved pil opp (testet).
- **Tastatur.** Pil ned og pil opp flytter med omløp og hopper over `disabled` (testet). Home og End hopper (testet). En bokstav går til neste punkt som begynner med den, med omløp (testet). Enter og mellomrom velger, lukker og setter fokus på knappen (testet). Esc lukker og setter fokus på knappen (testet). Tab lukker og går til elementet etter knappen, Shift+Tab til det før, også fra siste punkt (testet).
- **Lukking.** Et klikk utenfor lukker uten å flytte fokus til knappen (testet). Et klikk på et punkt velger og lukker (testet).
- **Slått av.** `disabled` gir `aria-disabled="true"`, ikke `disabled`, så punktet blir i tilgjengelighetstreet og leses; pilene hopper over det, og et klikk gjør ingenting (testet). Ingen fyll ved hover.
- **I en dialog.** Med eller uten `portal`: pilene holder seg i menyen, Esc lukker menyen og ikke dialogen, Tab og Shift+Tab lukker og holder fokus i dialogen (testet).
- **Plassering.** Som Popover: `align="end"` stiller menyen etter knappens høyre kant, nederst på skjermen snur den opp (testet); innenfor 320 px uten sidelengs rulling (testet); med `portal` et barn av `<body>` ved knappen inni en transformert forelder (testet).
- **Kontrast.** Punktene er `--fg-1` på panelet; hover og fokus er `--surface-2` (`--surface-3` i mørkt tema), målt 4,5:1 i begge temaer. `danger` er `--danger-fg` med `--danger-soft` ved hover, 6,8:1 i begge temaer (testet).
- **Bevegelse.** Popoverens toning på `--dur-fast`; ingen under `prefers-reduced-motion` (testet).
- **Mål.** Punktene er minst 44 px høye på berøring og 32 px med mus (testet); fokusringen ligger innenfor panelet, så rulling ikke klipper den.
- **Innebygd tekst.** «Flere valg» på standardknappen. Overstyr med `triggerLabel` («More actions»).
- **Kjente grenser.** Ingen `menuitemradio`; `checked` gir `menuitemcheckbox`, og å velge et avkrysset punkt lukker menyen. Bokstavsøket leser punktets tekst, så et `label` som ikke er en streng søkes ikke i.

## Innhold

- Punktene er verbfraser i setningsform: «Rediger», «Dupliser», «Slett prosjekt». Ikke «Redigering», ikke «Slett …?».
- Slett nevner objektet når det ikke er opplagt: «Slett prosjekt», ikke bare «Slett».
- Knappen heter «Flere valg» (eller «Flere valg for Tomater» når flere står på en side); engelske flater «More actions».
- Ingen ikoner uten tekst i menyen; ikonet er et tillegg, teksten er punktet.
