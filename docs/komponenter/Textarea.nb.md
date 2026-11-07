---
navn: Textarea
gruppe: inputs
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/textarea/
typer: dist/inputs/Textarea.d.ts
---

# Textarea

Et flerlinjes tekstfelt for notater og beskrivelser, med samme ledetekst, hjelpetekst og feil som [Input](Input.nb.md). Et native `<textarea>` med fire synlige linjer som standard (`rows`), minst 88 px høyt, og som kan dras høyere loddrett. Med `count` og `maxLength` viser det en tegnteller, «12 av 200», som advarer fra 90 % og melder feil over grensen uten å stoppe skrivingen.

## Når du bruker den

- Tekst som kan bli lengre enn én linje: notater, beskrivelser, en melding.
- Når folk skal se flere linjer av det de har skrevet mens de skriver.

## Når du ikke bruker den

- Én linje (navn, e-post, et tall): [Input](Input.nb.md).
- Formatert tekst med verktøylinje: det er en editor, som Sassy ikke har.
- Et valg: [Select](Select.nb.md), [Radio](Radio.nb.md).

## Gjør

- Sett `rows` etter hvor mye folk pleier å skrive: 3 for en kommentar, 6–8 for en beskrivelse.
- Si i `hint` hva som er lov: «Markdown virker.», «Vises på prosjektsida.»
- Gi `error` som peker videre: «Skriv minst én setning.»
- Merk feltet `optional` når det er det; de fleste notater er valgfrie.

## Ikke gjør

- Ikke `placeholder` som instruksjon; den forsvinner idet du skriver.
- Ikke tegngrense uten å vise antallet; bruk `count` med `maxLength`, ikke `maxLength` alene.
- Ikke slå av loddrett endring av størrelse. Den er der for de som trenger plass.
- Ikke `rows={1}`. Da er det en Input.

## Eksempel

```jsx
import { Textarea } from 'sassy/components';

<Textarea label="Notater" optional hint="Markdown virker." rows={5} />
<Textarea label="Beskrivelse" error="Skriv minst én setning." defaultValue="" />
<Textarea label="Notat til såkalenderen" maxLength={200} count hint="Vises under dagen i kalenderen." />
```

Telleren slipper deg forbi grensen og sier fra i stedet for å stoppe deg (som GOV.UK). Sjekk lengden når skjemaet sendes, og vis feilen der, som med alle andre feil:

```jsx
const forLang = notat.length > 200;
<Textarea label="Notat" maxLength={200} count value={notat} onChange={(e) => setNotat(e.target.value)}
  error={sendt && forLang ? 'Notatet kan ha høyst 200 tegn.' : undefined} />
```

## Props

Typene står i `dist/inputs/Textarea.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/textarea/).

<!-- props: TextareaProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `string` | – | Ledeteksten over feltet. |
| `hint` | `string` | – | Hjelpetekst under feltet, koblet med `aria-describedby`. |
| `error` | `string` | – | Feilmelding. Erstatter hjelpeteksten, setter `aria-invalid` og leses opp. |
| `optional` | `boolean` | – | Legger et stille «Valgfritt» etter ledeteksten. |
| `optionalLabel` | `string` | `'Valgfritt'` | Teksten på valgfri-merket. |
| `rows` | `number` | `4` | Antall synlige linjer. |
| `count` | `boolean` | `false` | Med `maxLength`: en tegnteller under feltet, «12 av 200». Fra 90 % sier den hvor mange som er igjen, over grensen hvor mange for mye, og feltet er ugyldig; nettleserens grense slås av, så folk kan skrive forbi og korte ned. En skjermleser hører antallet når skrivingen stopper. Uten `count` er `maxLength` nettleserens harde grense, som før. |
| `countLang` | `'nb' \| 'en'` | `'nb'` | Språket i telleren: `nb` «12 av 200», «18 tegn igjen» (standard) eller `en` «12 of 200», «18 characters left». |

Pluss alle attributtene til `<textarea>` (`React.TextareaHTMLAttributes<HTMLTextAreaElement>`).
<!-- /props -->

`ref` når det native `<textarea>`-elementet (testet).

## Tilgjengelighet

Koblingene er testet i nettleseren (hjelpetekst og egen `aria-describedby` er testet på et Textarea).

- **Element og rolle.** Et native `<textarea>` med en `<label for>` som peker på det.
- **Navn.** `label`.
- **Beskrivelse og feil.** Som Input: `hint` eller `error` i `${id}-hint` med `aria-describedby` (din egen beholdes, testet); `error` setter `aria-invalid="true"` og `role="alert"`.
- **Tegnteller.** Med `count` og `maxLength`: «12 av 200» under feltet, koblet med `aria-describedby` etter hjelpeteksten, med en skjult «tegn» så den leses «12 av 200 tegn». Fra 90 % står «· 18 igjen» i `--warning-fg`, over grensen «· 12 for mye» i `--danger-fg` med et ikon, og feltet får `aria-invalid` og farekanten, så tilstanden aldri er farge alene. Nettleserens `maxlength` slås av, så det du limer inn blir stående. Telleren er ikke en liveregion; en egen, skjult høflig region får «18 tegn igjen» når det har vært stille i ett sekund, ikke for hvert tastetrykk (testet i nettleseren). `countLang="en"` gir «12 of 200» og «18 characters left».
- **Tastatur.** Nettleserens: Enter gir ny linje, Tab går videre. Ikke noe eget.
- **Fokus.** Ramma får `--border-focus`-kant og 2 px `outline` i `--focus-color`; med feil er outlinen `--danger`.
- **Kontrast.** Som Input: kanten `--border-control` minst 3:1, teksten `--fg-1`, hjelpetekst `--fg-3`, feil `--danger-fg`.
- **Tilstand.** `disabled` på elementet, 55 % gjennomsiktig.
- **Mål.** Minst 88 px høy; `rows` og dra-håndtaket (`resize: vertical`) gir mer.
- **Bevegelse.** Som Input.
- **Innebygd tekst.** «Valgfritt» med `optional`; overstyr med `optionalLabel`.
- **Kjent grense.** Telleren teller UTF-16-enheter, som `maxlength` gjør, så en emoji kan telle to. Et skjema som tilbakestilles med `reset()` uten at appen eier verdien, oppdaterer ikke telleren; bruk `value` da.

## Innhold

- Ledeteksten er et substantiv: «Notater», «Beskrivelse», «Melding».
- `hint` sier hva som er lov og hvor det vises: «Markdown virker.», «Bare du ser dette.»
- `placeholder` står tomt, eller er et kort eksempel.
- `error` peker videre: «Skriv minst én setning.» Ikke «For kort».
