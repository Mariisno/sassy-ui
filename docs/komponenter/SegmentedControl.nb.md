---
navn: SegmentedControl
gruppe: inputs
status: new
sidenVersjon: 0.7.0
kort: components/inputs/segmentedcontrol.card.html
typer: components/inputs/SegmentedControl.d.ts
---

# SegmentedControl

To til fem alternativer som utelukker hverandre, på én rad, som én verdi i et skjema. Under panseret er det en native radiogruppe: et `<fieldset role="radiogroup">` med en `<legend>` som gir gruppa navn, og én visuelt skjult `<input type="radio">` per alternativ inne i en `<label>`, så nettleseren gir tastaturet gratis: ett tabulatorstopp, piltastene flytter og velger innenfor gruppa. Utseendet er det samme sporet som [Tabs](Tabs.nb.md) `variant="segmented"`, men rollen er en annen: Tabs bytter hva som vises, SegmentedControl svarer på et spørsmål.

## Når du bruker den

- Et spørsmål med to til fem korte svar som alle skal være synlige samtidig: «Ute / Inne / Drivhus», «Gram / Desiliter / Stykk».
- Et valg i et skjema som leses ved innsending eller med `onChange`, der ett alternativ alltid er valgt.
- Der en [Radio](Radio.nb.md)-gruppe tar for mye plass på høyden, og alternativene er korte nok til å stå ved siden av hverandre.

## Når du ikke bruker den

- Bytte visning eller filter som virker med en gang (liste eller tavle, uke eller måned): [Tabs](Tabs.nb.md) `variant="segmented"`. Den har `role="tablist"` og panelene koblet.
- Flere enn fem alternativer, eller lange etiketter: [Select](Select.nb.md) eller [Radio](Radio.nb.md) med beskrivelser.
- Flere valg samtidig: en gruppe [Checkbox](Checkbox.nb.md), eller [Tag](Tag.nb.md).
- Av eller på: [Switch](Switch.nb.md).

## Gjør

- Gi `label`: spørsmålet alternativene svarer på. Det er gruppas navn. Uten synlig ledetekst, send `aria-label`.
- Gi alltid `defaultValue` eller `value`. En tom segmentert kontroll ser ut som en rad knapper.
- Hold etikettene til ett eller to ord i samme form: «Ute», «Inne», «Drivhus».
- Bruk `fullWidth` i et skjema på telefon, så sporet linjerer med feltene over.
- Gi radioene `name` når skjemaet sendes native; ellers heter de som gruppas id.

## Ikke gjør

- Ikke som visningsbytte. Det som bytter hva som vises, er Tabs.
- Ikke flere enn fem, og ikke ikoner uten tekst. Alle alternativene skal leses på ett blikk.
- Ikke bruk den til handlinger («Lagre», «Slett»): det er [Button](Button.nb.md).
- Ikke en feilmelding under den. Ett alternativ er alltid valgt, så den kan ikke stå tom; valider det som hører til, i feltet ved siden av.

## Eksempel

```jsx
import { SegmentedControl } from 'sussi/components';

<SegmentedControl label="Hvor står planten?" hint="Kan endres senere." options={['Ute', 'Inne', 'Drivhus']} defaultValue="Ute" />

<SegmentedControl
  label="Enhet"
  options={[{ value: 'g', label: 'Gram' }, { value: 'dl', label: 'Desiliter' }, { value: 'stk', label: 'Stykk' }]}
  value={enhet}
  onChange={setEnhet}
  fullWidth
/>

<SegmentedControl aria-label="Sådd" options={[{ value: 'var', label: 'Vår', icon: 'sprout' }, { value: 'host', label: 'Høst', icon: 'leaf' }]} defaultValue="var" />
```

## Props

Typene står i `components/inputs/SegmentedControl.d.ts`. Kortet: `components/inputs/segmentedcontrol.card.html`.

<!-- props: SegmentedControlProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | Spørsmålet eller navnet på gruppa, i `<legend>`: «Hvor står planten?». Uten, send `aria-label`. |
| `hint` | `React.ReactNode` | – | Én linje under kontrollen, f.eks. «Kan endres senere.» Koblet med `aria-describedby`. |
| `options` | `Array<string \| SegmentedOption>` | `[]` | To til fem alternativer. Strenger, eller `{ value, label, icon?, disabled? }`. |
| `name` | `string` | – | Radioenes `name`. Standard er gruppas id. |
| `value` | `string` | – | Den valgte verdien (styrt). |
| `defaultValue` | `string` | – | Verdien som er valgt først (ustyrt). Gi alltid en av de to: en tom segmentert kontroll ser ut som en rad knapper. |
| `onChange` | `(value: string) => void` | – | Kalles med verdien til alternativet som ble valgt. |
| `fullWidth` | `boolean` | – | Sporet fyller bredden, og alternativene deler den likt. |
| `disabled` | `boolean` | – | Slår av alle alternativene og dimmer kontrollen. |

Pluss alle attributtene til `<fieldset>` (`React.FieldsetHTMLAttributes<HTMLFieldSetElement>`), unntatt `onChange`, `defaultValue`.
<!-- /props -->

### SegmentedOption

<!-- props: SegmentedOption -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `value` | `string` | *påkrevd* | Verdien, det `onChange` får. |
| `label` | `React.ReactNode` | *påkrevd* | Teksten på alternativet. |
| `icon` | `string` | – | Lucide-ikon foran teksten. |
| `disabled` | `boolean` | – | Dette alternativet kan ikke velges; resten kan. |
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/segmentedcontrol.e2e.test.mjs`, reglene i `tests/segmentedcontrol.test.mjs`.

- **Element og rolle.** Et native `<fieldset>` med `role="radiogroup"` og en `<legend>`; hvert alternativ er en native `<input type="radio">` i en `<label>`. Ingen egen tastaturkode: alt er nettleserens.
- **Navn.** Gruppa heter det som står i `label` (legenden, også via `aria-labelledby`, så navnet holder med rollen). Hvert alternativ heter etiketten sin. Uten `label` må du sende `aria-label` (testet).
- **Beskrivelse.** `hint` får id-en `<id>-hint`, og gruppa peker på den med `aria-describedby`, pluss det appen selv sender.
- **Tastatur.** Ett tabulatorstopp: Tab lander på det valgte alternativet (eller det første når ingenting er valgt), ←/→ og ↑/↓ flytter og velger innenfor gruppa med rundgang, mellomrom velger, Tab går videre ut av gruppa (testet).
- **Fokus.** Den visuelt skjulte radioen har fokus; ansiktet ved siden av den viser ringen, 2 px `--focus-color` med 2 px avstand (`:focus-visible`).
- **Tilstand.** Det valgte ansiktet løftes med `--surface-1` (`--surface-3` i mørk modus), en skygge og `--fg-1`-tekst; de andre står i `--fg-2` på `--surface-2`. Tilstanden er `:checked` på radioen, så den leses som «valgt» uansett farge. `disabled` på gruppa slår av alle radioene (native) og dimmer dem; `disabled` på ett alternativ slår av det ene.
- **Kontrast.** `--fg-2` på `--surface-2` og `--fg-1` på `--surface-1`/`--surface-3` er minst 4,5:1 i begge temaer og alle aksenter (`tests/segmentedcontrol.test.mjs`).
- **Mål.** Sporet er 36 px høyt og hvert ansikt 30 px høyt, akkurat som Tabs `variant="segmented"`, og minst 40 px bredt (2.5.8).
- **Bevegelse.** Bakgrunn, farge og skygge går over på `--dur-fast`, 0 under redusert bevegelse.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Etikettene brytes ikke. Fem lange ord får ikke plass på 320 px; bruk Radio eller Select da.

## Innhold

- `label` er spørsmålet gruppa svarer på, som et substantiv eller en setning: «Enhet», «Hvor står planten?».
- Alternativene er ett eller to ord i samme form: «Ute», «Inne», «Drivhus». Ikke setninger.
- `hint` er én linje om konsekvens: «Kan endres senere.»
