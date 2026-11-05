---
navn: Textarea
gruppe: inputs
status: stable
sidenVersjon: 0.2.0
kort: components/inputs/inputs.card.html
typer: components/inputs/Textarea.d.ts
---

# Textarea

Et flerlinjes tekstfelt for notater og beskrivelser, med samme ledetekst, hjelpetekst og feil som [Input](Input.nb.md). Et native `<textarea>` med fire synlige linjer som standard (`rows`), minst 88 px høyt, og som kan dras høyere loddrett.

## Når du bruker den

- Tekst som kan bli lengre enn én linje: notater, beskrivelser, en melding.
- Når folk skal se flere linjer av det de har skrevet mens de skriver.

## Når du ikke bruker den

- Én linje (navn, e-post, et tall): [Input](Input.nb.md).
- Formatert tekst med verktøylinje: det er en editor, som Sussi ikke har.
- Et valg: [Select](Select.nb.md), [Radio](Radio.nb.md).

## Gjør

- Sett `rows` etter hvor mye folk pleier å skrive: 3 for en kommentar, 6–8 for en beskrivelse.
- Si i `hint` hva som er lov: «Markdown virker.», «Vises på prosjektsida.»
- Gi `error` som peker videre: «Skriv minst én setning.»
- Merk feltet `optional` når det er det; de fleste notater er valgfrie.

## Ikke gjør

- Ikke `placeholder` som instruksjon; den forsvinner idet du skriver.
- Ikke tegngrense uten å vise antallet; sett en teller i `hint` når det er en grense.
- Ikke slå av loddrett endring av størrelse. Den er der for de som trenger plass.
- Ikke `rows={1}`. Da er det en Input.

## Eksempel

```jsx
import { Textarea } from 'sussi/components';

<Textarea label="Notater" optional hint="Markdown virker." rows={5} />
<Textarea label="Beskrivelse" error="Skriv minst én setning." defaultValue="" />
```

## Props

Typene står i `components/inputs/Textarea.d.ts`. Kortet: `components/inputs/inputs.card.html`.

<!-- props: TextareaProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `string` | – | Ledeteksten over feltet. |
| `hint` | `string` | – | Hjelpetekst under feltet, koblet med `aria-describedby`. |
| `error` | `string` | – | Feilmelding. Erstatter hjelpeteksten, setter `aria-invalid` og leses opp. |
| `optional` | `boolean` | – | Legger et stille «Valgfritt» etter ledeteksten. |
| `optionalLabel` | `string` | `'Valgfritt'` | Teksten på valgfri-merket. |
| `rows` | `number` | `4` | Antall synlige linjer. |

Pluss alle attributtene til `<textarea>` (`React.TextareaHTMLAttributes<HTMLTextAreaElement>`).
<!-- /props -->

`ref` når det native `<textarea>`-elementet (`tests/refs.e2e.test.mjs`).

## Tilgjengelighet

Koblingene er testet i `tests/forms.e2e.test.mjs` (hjelpetekst og egen `aria-describedby` er testet på et Textarea).

- **Element og rolle.** Et native `<textarea>` med en `<label for>` som peker på det.
- **Navn.** `label`.
- **Beskrivelse og feil.** Som Input: `hint` eller `error` i `${id}-hint` med `aria-describedby` (din egen beholdes, testet); `error` setter `aria-invalid="true"` og `role="alert"`.
- **Tastatur.** Nettleserens: Enter gir ny linje, Tab går videre. Ikke noe eget.
- **Fokus.** Ramma får `--border-focus`-kant og 2 px `outline` i `--focus-color`; med feil er outlinen `--danger`.
- **Kontrast.** Som Input: kanten `--border-control` minst 3:1, teksten `--fg-1`, hjelpetekst `--fg-3`, feil `--danger-fg`.
- **Tilstand.** `disabled` på elementet, 55 % gjennomsiktig.
- **Mål.** Minst 88 px høy; `rows` og dra-håndtaket (`resize: vertical`) gir mer.
- **Bevegelse.** Som Input.
- **Innebygd tekst.** «Valgfritt» med `optional`; overstyr med `optionalLabel`.
- **Kjent grense.** Ingen teller eller tegngrense innebygd; en grense må appen vise i `hint`.

## Innhold

- Ledeteksten er et substantiv: «Notater», «Beskrivelse», «Melding».
- `hint` sier hva som er lov og hvor det vises: «Markdown virker.», «Bare du ser dette.»
- `placeholder` står tomt, eller er et kort eksempel.
- `error` peker videre: «Skriv minst én setning.» Ikke «For kort».
