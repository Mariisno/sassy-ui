---
navn: Select
gruppe: inputs
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/select/
typer: dist/inputs/Select.d.ts
---

# Select

En native nedtrekksliste med samme ledetekst, hjelpetekst, feil og ramme som [Input](Input.nb.md). `options` er strenger eller `{ value, label }`, `placeholder` gir et første tomt valg, og pila til høyre er tegnet av Sassy mens lista som åpner seg er nettleserens egen. For fem eller flere alternativer; færre er [Radio](Radio.nb.md) eller segmenterte [Tabs](Tabs.nb.md).

## Når du bruker den

- Ett valg blant fem eller flere kjente alternativer: land, kategori, status med mange trinn.
- Når plassen er knapp og alternativene ikke trenger å være synlige før du velger.
- I et skjema som lagres med en knapp.

## Når du ikke bruker den

- To til fire alternativer: [Radio](Radio.nb.md), så alle er synlige.
- Et valg som bytter visning med en gang: [Tabs](Tabs.nb.md) `variant="segmented"`.
- Flere valg samtidig: [Checkbox](Checkbox.nb.md) eller [Tag](Tag.nb.md).
- Fritekst med forslag: det er en kombinasjonsboks, som Sassy ikke har.

## Gjør

- Gi `label`. Lista alene sier ikke hva den velger.
- Bruk `placeholder` («Velg en type») når det ikke finnes et fornuftig standardvalg, og `error` når det ikke ble valgt: «Velg en type.»
- Sorter alternativene slik folk leter: alfabetisk, eller det vanligste først.
- Gi `{ value, label }` når verdien ikke er det folk skal lese.

## Ikke gjør

- Ikke en Select for ja/nei. Det er en [Switch](Switch.nb.md) eller [Checkbox](Checkbox.nb.md).
- Ikke lange lister uten orden. Over tjue alternativer trenger søk, som Select ikke har.
- Ikke `placeholder` som ledetekst.
- Ikke stil den åpne lista; den er nettleserens, og det er med vilje.

## Eksempel

```jsx
import { Select } from 'sassy/components';

<Select label="Status" options={['Idé', 'Bygger', 'Live', 'Pauset']} defaultValue="Bygger" />
<Select label="Type" placeholder="Velg en type" options={[{ value: 'l', label: 'Leire' }, { value: 's', label: 'Sand' }]} error="Velg en type." />
<Select label="Land" optional options={land} hint="Brukes til valuta." size="sm" />
```

## Props

Typene står i `dist/inputs/Select.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/select/).

<!-- props: SelectProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `string` | – | Ledeteksten over feltet. |
| `hint` | `string` | – | Hjelpetekst under feltet, koblet med `aria-describedby`. |
| `error` | `string` | – | Feilmelding. Erstatter hjelpeteksten, setter `aria-invalid` og leses opp. |
| `optional` | `boolean` | – | Legger et stille «Valgfritt» etter ledeteksten. |
| `optionalLabel` | `string` | `'Valgfritt'` | Teksten på valgfri-merket. |
| `options` | `Array<string \| { value: string; label: string }>` | `[]` | Valgene: strenger, eller `{ value, label }`. |
| `placeholder` | `string` | – | Et første, tomt valg med denne teksten. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px høy. |

Pluss alle attributtene til `<select>` (`React.SelectHTMLAttributes<HTMLSelectElement>`), unntatt `size`.
<!-- /props -->

`ref` når det native `<select>`-elementet (testet).

## Tilgjengelighet

Koblingene er testet i nettleseren.

- **Element og rolle.** Et native `<select>` med `<option>`-er, og en `<label for>` som peker på det. Pila er en `Icon` uten pekerhendelser, dekorativ.
- **Navn.** `label`.
- **Beskrivelse og feil.** Som Input: `hint` eller `error` i `${id}-hint`, pekt på med `aria-describedby` (din egen beholdes); `error` setter `aria-invalid="true"` og `role="alert"` (testet for Select).
- **Tastatur.** Nettleserens: piltaster, bokstav for å hoppe, Enter/mellomrom for å åpne. Ikke noe eget.
- **Fokus.** Ramma får `--border-focus`-kant og 2 px `outline` i `--focus-color`.
- **Kontrast.** Som Input: kanten `--border-control` minst 3:1, teksten `--fg-1`, pila `--fg-3`.
- **Tilstand.** `disabled` på elementet, 55 % gjennomsiktig.
- **Mål.** 30, 38 eller 46 px høy etter `size`.
- **Bevegelse.** Som Input.
- **Innebygd tekst.** «Valgfritt» med `optional`; overstyr med `optionalLabel`.
- **Kjent grense.** Den åpne lista er nettleserens og følger ikke Sassys tema. Plassholdervalget har verdi `""` og kan velges igjen.

## Innhold

- Ledeteksten er det som velges: «Status», «Type», «Land».
- `placeholder` er «Velg …» + substantivet: «Velg en type».
- Alternativene er korte og i samme form: «Idé», «Bygger», «Live».
- `error` når ingenting er valgt: «Velg en type.» Ikke «Feltet er påkrevd».
