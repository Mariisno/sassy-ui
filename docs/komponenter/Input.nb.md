---
navn: Input
gruppe: inputs
status: stable
sidenVersjon: 0.2.0
kort: components/inputs/inputs.card.html
typer: components/inputs/Input.d.ts
---

# Input

Et énlinjes tekstfelt med ledetekst, hjelpetekst og feilmelding innebygd. Feltet er et native `<input>` i en ramme (`.s-control`) som viser fokus, feil og slått av; ledeteksten er en `<label>` som peker på feltet; hjelpeteksten, eller feilen når det er en, er koblet med `aria-describedby`, og en feil setter `aria-invalid` og leses opp. `mode` sier hva feltet er til (tall, e-post, telefon, dato, passord …) og setter riktig `type`, tastatur på telefonen og autofyll; passord får en vis/skjul-knapp. `Field` er den samme ledetekst/hjelpetekst/feil-anatomien rundt en kontroll du lager selv.

## Når du bruker den

- Kort tekst: navn, e-post, søk, tall, adresse.
- Med `icon` eller `prefix`/`suffix` når feltet trenger en ledetråd i seg: et søkeikon, «https://», «kg».
- `Field` rundt din egen kontroll (en datovelger, et fargefelt) så den får samme ledetekst, hjelpetekst og feil som resten av skjemaet.

## Når du ikke bruker den

- Flere linjer: [Textarea](Textarea.nb.md).
- Et valg blant kjente alternativer: [Select](Select.nb.md), [Radio](Radio.nb.md) eller [Tag](Tag.nb.md).
- Av eller på: [Switch](Switch.nb.md) eller [Checkbox](Checkbox.nb.md).
- Velge en fil: [FileButton](FileButton.nb.md).

## Gjør

- Gi alltid `label`. Et felt med bare `placeholder` mister navnet idet du skriver.
- Merk det sjeldne valgfrie feltet med `optional` i stedet for å sette stjerne på alle de påkrevde.
- Skriv `error` som en forklaring med neste steg: «Det ser ikke ut som en e-post ennå.»
- Bruk `hint` til format og konsekvens: «Slik det står på lappen.», «Vises på profilen din.»
- Sett `mode` på alle felt som ikke er fri tekst (`number`, `email`, `phone`, `date` …), så telefonen gir riktig tastatur og nettleseren fyller inn riktig. Tabellen under sier hva hver setter.

## Ikke gjør

- Ikke bruk `placeholder` som ledetekst. Den er et eksempel, i `--fg-3`, og forsvinner.
- Ikke feilmelding før folk har hatt sjansen til å fylle ut. Valider når feltet forlates eller skjemaet sendes.
- Ikke «Ugyldig verdi», feilkoder eller utropstegn.
- Ikke `prefix`/`suffix` som eneste bærer av en enhet; si enheten i ledeteksten eller hjelpeteksten også.
- Ikke `type="number"` for tall. `mode="number"` gir tekst med talltastatur: `type="number"` endrer verdien under musehjulet, slipper «e» og «-» gjennom og leses dårlig. Valider teksten i appen.

## Eksempel

```jsx
import { Input, Field } from 'sussi/components';

<Input label="Prosjektnavn" placeholder="f.eks. Hagedagbok" />
<Input icon="search" placeholder="Søk" suffix="⌘K" aria-label="Søk" />
<Input label="E-post" mode="email" error="Det ser ikke ut som en e-post ennå." />
<Input label="Vekt" mode="decimal" suffix="kg" hint="I kilo, med komma." optional />
<Input label="Planter per rad" mode="number" />
<Input label="Sådd" mode="date" />
<Input label="Passord" mode="password" autoComplete="new-password" hint="Minst tolv tegn." />
<Field label="Farge" htmlFor="farge" hint="Vises på prosjektkortet.">
  <input id="farge" type="color" aria-describedby="farge-hint" />
</Field>
```

## Props

Typene står i `components/inputs/Input.d.ts`. Kortet med Input, Textarea og Select: `components/inputs/inputs.card.html`.

<!-- props: InputProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `string` | – | Ledeteksten over feltet. |
| `hint` | `string` | – | Hjelpetekst under feltet, koblet med `aria-describedby`. |
| `error` | `string` | – | Feilmelding. Erstatter hjelpeteksten, setter `aria-invalid` og den røde kanten, og leses opp (`role="alert"`). |
| `optional` | `boolean` | – | Legger et stille «Valgfritt» etter ledeteksten. |
| `optionalLabel` | `string` | `'Valgfritt'` | Teksten på valgfri-merket. Engelske flater sender «optional». |
| `icon` | `string` | – | Lucide-ikon foran teksten i feltet. |
| `prefix` | `React.ReactNode` | – | Tekst foran (monospace), f.eks. «https://». |
| `suffix` | `React.ReactNode` | – | Tekst bak (monospace), f.eks. «kg» eller et ⌘K-hint. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px høy. |
| `mode` | `InputMode` | – | Hva feltet er til: setter `type`, `inputMode` og `autoComplete` (se tabellen under). `number` er hele tall, `decimal` tall med komma eller punktum, `phone`, `email`, `url`, `search`, `date`, `time`, `password`. Din egen `type`, `inputMode` eller `autoComplete` vinner. Uten settes ingenting. |
| `passwordToggle` | `boolean` | `true` | Med `mode="password"`: vis/skjul-knappen i enden av feltet. Standard true. |
| `passwordToggleLabel` | `string` | `'Vis passord'` | Navnet på passordknappen, en vippeknapp med `aria-pressed`. Standard «Vis passord»; engelske flater sender «Show password». |

Pluss alle attributtene til `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), unntatt `size`, `prefix`.
<!-- /props -->

`ref` når det native `<input>`-elementet, så appen kan flytte fokus til det første feltet med feil (`tests/refs.e2e.test.mjs`).

### Hva `mode` setter

| `mode` | `type` | `inputMode` | `autoComplete` | Bruk til |
| --- | --- | --- | --- | --- |
| `number` | `text` | `numeric` | – | Hele tall: antall, år, postnummer. Ikke `type="number"`. |
| `decimal` | `text` | `decimal` | – | Tall med komma eller punktum: vekt, pris, mengde. |
| `phone` | `tel` | `tel` | `tel` | Telefonnummer. |
| `email` | `email` | `email` | `email` | E-postadresse. |
| `url` | `url` | `url` | `url` | Nettadresse. |
| `search` | `search` | `search` | – | Søkefelt; Enter-tasten på telefonen sier «Søk» (`enterKeyHint`). |
| `date` | `date` | – | – | Dato, med nettleserens egen velger. |
| `time` | `time` | – | – | Klokkeslett, med nettleserens egen velger. |
| `password` | `password` | – | `current-password` | Passord, med vis/skjul-knapp. Send `autoComplete="new-password"` når passordet settes. |

Det du sender selv av `type`, `inputMode`, `autoComplete` eller `enterKeyHint` vinner over tabellen. Uten `mode` settes ingenting, som før.

### Field

<!-- props: FieldProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `string` | – | Ledeteksten. |
| `hint` | `string` | – | Hjelpetekst under kontrollen. |
| `error` | `string` | – | Feilmelding; vises i stedet for hjelpeteksten, med `role="alert"`. |
| `optional` | `boolean` | – | Legger valgfri-merket etter ledeteksten. |
| `optionalLabel` | `string` | `'Valgfritt'` | Teksten på valgfri-merket. |
| `htmlFor` | `string` | – | Id-en til kontrollen, så ledeteksten peker på den. |
| `hintId` | `string` | – | Id-en hjelpeteksten eller feilen får. Standard `${htmlFor}-hint`; pek kontrollens `aria-describedby` på den. |
| `children` | `React.ReactNode` | – | Kontrollen. |
<!-- /props -->

## Tilgjengelighet

Koblingene er testet i `tests/forms.e2e.test.mjs`.

- **Element og rolle.** Et native `<input>` (typen kommer fra `mode`, eller er din: `text`, `email` …) med en `<label for>` som peker på det. Id-en er `id` eller en generert.
- **Navn.** `label`. `prefix`, `suffix` og ikonet er visuelle og blir ikke en del av navnet. Uten `label` må du sende `aria-label` (som søkefeltet i eksempelet).
- **Beskrivelse.** `hint`, eller `error` når det er en, får id-en `${id}-hint`, og feltets `aria-describedby` peker på den. Din egen `aria-describedby` beholdes i tillegg (testet).
- **Feil.** `error` setter `aria-invalid="true"`, bytter kanten til `--danger` og leses opp når den dukker opp (`role="alert"`); en `hint` har ingen rolle (testet, WCAG 4.1.3).
- **Tastatur.** Nettleserens. Ikke noe eget. `mode` velger tastaturet på telefonen (`inputMode`); `number` og `decimal` er tekstfelt med talltastatur, så verdien ikke endres av musehjulet og skjermleseren leser det som et vanlig felt.
- **Passord.** `mode="password"` legger en knapp i enden av feltet, en IconButton (24, 30 eller 38 px etter `size`, aldri under 24) med `aria-pressed` og navnet «Vis passord» (`passwordToggleLabel`), som bytter `type` til `text` og tilbake; verdien beholdes. Knappen har sin egen fokusring; mens den har fokus (mus eller tastatur) tegner ramma ingen ring og beholder hvilekanten, eller `--danger`-kanten ved feil. `passwordToggle={false}` tar den bort (testet, `tests/input-modes.e2e.test.mjs`).
- **Fokus.** Ramma får `--border-focus`-kant og en 2 px `outline` i `--focus-color` når feltet har fokus (`:focus-within`); med feil er outlinen `--danger`. Selve feltet har ingen egen ring.
- **Kontrast.** Kanten er `--border-control`, minst 3:1 mot flatene (`tests/focus.test.mjs`, `tests/contrast.test.mjs`). Teksten er `--fg-1`, plassholder og hjelpetekst `--fg-3` (4,5:1 på `--bg`, `--surface-1` og `--surface-2`), feil `--danger-fg`.
- **Tilstand.** `disabled` gir `disabled` på feltet, 55 % gjennomsiktighet, `--surface-2` og ingen pekerhendelser.
- **Mål.** 30, 38 eller 46 px høy etter `size`.
- **Bevegelse.** Kant og skygge går over på `--dur-fast`, 0 under redusert bevegelse.
- **Innebygd tekst.** «Valgfritt» etter ledeteksten med `optional`. Overstyr med `optionalLabel` («optional» på engelske flater, testet). «Vis passord» på passordknappen; overstyr med `passwordToggleLabel`.

## Innhold

- Ledeteksten er et substantiv, uten kolon: «E-post», «Prosjektnavn».
- `placeholder` er et eksempel som begynner med «f.eks.», eller står tomt. Aldri en instruks.
- `hint` er én setning om format eller konsekvens, med punktum.
- `error` sier hva som er galt og hva du gjør: «Det ser ikke ut som en e-post ennå.» «Navnet er i bruk. Prøv et annet.» Aldri «Ugyldig».
- Merk det valgfrie, ikke det påkrevde. De fleste felt er påkrevd.
