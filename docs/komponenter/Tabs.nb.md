---
navn: Tabs
gruppe: navigation
status: stable
sidenVersjon: 0.2.0
kort: components/navigation/tabs.card.html
typer: components/navigation/Tabs.d.ts
---

# Tabs

Faner som bytter mellom sidestilte visninger: `underline` for seksjoner på en side, `segmented` for visningsvalg og filtre. Tastaturet følger WAI-ARIA-mønsteret for faner: bare den valgte fanen er i tabrekkefølgen, ← og → flytter og velger, Home og End hopper til endene. `TabPanel` som barn kobles til fanen sin med `aria-controls` og `aria-labelledby`, og panelene som ikke vises blir stående montert, så det du har skrevet overlever et bytte. Kan styres (`value`) eller la være (`defaultValue`).

## Når du bruker den

- Seksjoner på én side som deler kontekst: oppgaver, notater, innstillinger for samme prosjekt (`underline`).
- Et kompakt visningsvalg: liste eller tavle, uke eller måned (`segmented`).
- Et filter med to til fire verdier der ett alltid er valgt (`segmented` uten paneler).

## Når du ikke bruker den

- Hovednavigasjonen i appen: [AppShell](AppShell.nb.md).
- Steg i en prosess som skal tas i rekkefølge: knapper «Neste» og «Tilbake».
- Mange faner som ikke får plass: [Select](Select.nb.md), eller legg fanene i en [ScrollRow](ScrollRow.nb.md) som siste utvei.
- Filtre der flere kan være valgt samtidig: [Tag](Tag.nb.md).
- Ett svar i et skjema, som leses ved innsending: [SegmentedControl](SegmentedControl.nb.md). Tabs bytter hva som vises; den svarer på et spørsmål.

## Gjør

- Legg innholdet i `TabPanel`-er som barn, så fane og panel er koblet for skjermleser.
- Gi fanelista et navn med `aria-label` når det ikke står en overskrift rett over.
- To til fem faner, ett eller to ord hver. `count` for et tall som betyr noe («Oppgaver 12»).
- Ha alltid én fane valgt. Uten `defaultValue` er det den første.

## Ikke gjør

- Ikke en fane som er en handling («Legg til»). Faner viser, de gjør ikke.
- Ikke ikoner uten tekst i faner.
- Ikke paneler utenfor `Tabs`; `TabPanel` rendrer ingenting uten en Tabs rundt seg.
- Ikke forskjellige fanesett som ser like ut på samme side uten `aria-label` som skiller dem.

## Eksempel

```jsx
import { Tabs, TabPanel } from 'sussi/components';

<Tabs aria-label="Prosjekt" items={[{ id: 'oppgaver', label: 'Oppgaver', count: 12 }, { id: 'notater', label: 'Notater' }]} onChange={setFane}>
  <TabPanel value="oppgaver">…</TabPanel>
  <TabPanel value="notater">…</TabPanel>
</Tabs>
<Tabs variant="segmented" aria-label="Visning" items={[{ id: 'liste', label: 'Liste', icon: 'list' }, { id: 'tavle', label: 'Tavle', icon: 'layout-grid' }]} value={visning} onChange={setVisning} />
```

## Props

Typene står i `components/navigation/Tabs.d.ts`. Kortet: `components/navigation/tabs.card.html`.

<!-- props: TabsProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `items` | `TabItem[]` | `[]` | Fanene. |
| `value` | `string` | – | Valgt fane (styrt). |
| `defaultValue` | `string` | – | Valgt fane fra start (ustyrt). Ellers den første. |
| `onChange` | `(id: string) => void` | – | Kjøres når en fane velges, med `id`. |
| `variant` | `'underline' \| 'segmented'` | `'underline'` | underline for seksjoner på en side, segmented for visningsvalg og filtre. |
| `id` | `string` | – | Grunnlag for fane- og panel-id-ene. Standard `React.useId()`. |
| `children` | `React.ReactNode` | – | TabPanel-ene, rendret etter fanelista. |
| `aria-label` | `string` | – | Navnet på fanelista, f.eks. «Prosjektvisning». Sendes videre med de andre `aria-*`- og `data-*`-propsene. |
| `className` | `string` | – | Klasser på fanelista. |
| `style` | `React.CSSProperties` | – | Stil på fanelista. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `onChange`, `defaultValue`.
<!-- /props -->

### TabItem

<!-- props: TabItem -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `id` | `string` | *påkrevd* | Nøkkelen; `value` og `TabPanel value` peker på den. |
| `label` | `React.ReactNode` | *påkrevd* | Teksten på fanen. |
| `icon` | `string` | – | Lucide-ikonnavn foran teksten. |
| `count` | `number \| string` | – | Et tall etter teksten, i monospace. |
<!-- /props -->

### TabPanel

<!-- props: TabPanelProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `value` | `string` | *påkrevd* | `id`-en til TabItem-et panelet hører til. |
| `children` | `React.ReactNode` | – | Innholdet. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/tabs.e2e.test.mjs`.

- **Element og rolle.** En `<div role="tablist">` med `<button role="tab" type="button">` for hver fane, `aria-selected` på den valgte, og `aria-controls` til panelet når fanen har et `TabPanel` (ikke ellers, testet). `TabPanel` er en `<div role="tabpanel">` med `aria-labelledby` til fanen sin, `tabIndex=0`, og `hidden` når den ikke er valgt.
- **Navn.** Fanen heter teksten sin (`label`, med `count` etter). Fanelista heter `aria-label`. Panelet heter fanen.
- **Tastatur.** Tab lander på den valgte fanen (roving `tabindex`: 0 på den valgte, −1 på resten) og går videre inn i panelet. ← og → flytter fokus og velger, og går rundt i endene; Home og End hopper til første og siste. `onChange` kalles ved hvert valg (testet).
- **Fokus.** Standard fokusring på fanen, og på panelet, som kan ta fokus selv om det ikke har lenker.
- **Tilstand.** Valgt er `aria-selected="true"`, teksten `--fg-1` og en 2 px strek i `--accent` under (`underline`), eller et hevet segment i `--surface-1` med `--shadow-sm` (`segmented`; `--surface-3` i mørkt tema). Aldri farge alene.
- **Kontrast.** Uvalgt tekst er `--fg-2`, valgt `--fg-1`. `count` er `--fg-3`, og `--fg-2` på den valgte fanen, siden `--fg-3` på det mørke segmentet var 4,31:1 (0.5.3, `tests/polish.test.mjs`).
- **Innhold.** Paneler som ikke vises blir stående montert, så skjemaer i dem beholder det du har skrevet (testet).
- **Mål.** Fanene er 40 px høye, segmentene 30 px. Kjent grense: under 44 px på berøringsskjerm.
- **Bevegelse.** Fargen går over på `--dur-fast`, 0 under redusert bevegelse.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** Bare vannrett. Et valg med pil er umiddelbart (automatisk aktivering); det finnes ikke en modus der Enter må trykkes.

## Innhold

- Fanetekstene er substantiv i flertall eller visningsnavn: «Oppgaver», «Notater», «Liste», «Tavle».
- Ett eller to ord. Får de ikke plass, er det for mange faner.
- `count` er et tall uten tekst: `12`, ikke «12 stk».
- `aria-label` er det fanene handler om: «Prosjekt», «Visning».
