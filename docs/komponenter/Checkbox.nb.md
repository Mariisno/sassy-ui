---
navn: Checkbox
gruppe: controls
status: stable
sidenVersjon: 0.2.0
kort: components/controls/controls.card.html
typer: components/controls/Checkbox.d.ts
---

# Checkbox

En avkrysningsboks for uavhengige ja/nei-valg og oppgavelister. Et native `<input type="checkbox">` inni en `<label>`, med en tegnet boks (18 px, 5 px hjørner) som fylles med aksenten når den er valgt, en valgfri `description` under teksten, og `indeterminate` for «noen av disse».

## Når du bruker den

- Flere valg som ikke utelukker hverandre: hvilke dager, hvilke kategorier.
- En oppgave som kan hukes av.
- Et valg i et skjema som lagres med en knapp («Husk meg», «Send meg ukesoppsummering»).
- `indeterminate` på en «velg alle» når bare noen under er valgt.

## Når du ikke bruker den

- Ett valg blant få: [Radio](Radio.nb.md).
- En innstilling som virker med en gang, uten lagreknapp: [Switch](Switch.nb.md).
- Mange valg som filtre i en rad: [Tag](Tag.nb.md) med `selected`.
- En rad som åpner noe: [ListItem](ListItem.nb.md). Noe som hukes av er en Checkbox, ikke en rad.

## Gjør

- Gi alltid `label`. Boksen alene sier ingenting.
- Skriv teksten som det som blir sant når boksen er valgt: «Send meg en ukesoppsummering».
- Bruk `description` til det korte tillegget («Mandager kl. 08»), ikke til en ny setning med et annet valg.
- Sett `indeterminate` fra appens tilstand; komponenten setter det på det native feltet.

## Ikke gjør

- Ikke bruk den til et valg som skal lagres umiddelbart. Da venter folk på en lagreknapp som ikke finnes.
- Ikke formuler teksten som et spørsmål eller en nektelse («Ikke send e-post»). Dobbel nektelse er vanskelig.
- Ikke legg en lenke eller knapp inni `label`; hele etiketten er klikkflaten.
- Ikke bruk `disabled` som «ikke tilgjengelig i din plan» uten å si det ved siden av.

## Eksempel

```jsx
import { Checkbox } from 'sussi/components';

<Checkbox label="Skriv testplan" defaultChecked />
<Checkbox label="Send meg en ukesoppsummering" description="Mandager kl. 08" checked={ukentlig} onChange={(e) => setUkentlig(e.target.checked)} />
<Checkbox label="Velg alle" indeterminate={noenValgt} checked={alleValgt} onChange={velgAlle} />
```

## Props

Typene står i `components/controls/Checkbox.d.ts`. Kortet med Checkbox, Radio og Switch: `components/controls/controls.card.html`.

<!-- props: CheckboxProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | Teksten ved siden av boksen. |
| `description` | `React.ReactNode` | – | En linje under teksten, i `--fg-3`. |
| `indeterminate` | `boolean` | `false` | Delvis valgt (en strek i stedet for en hake). Settes på det native feltet. |

Pluss alle attributtene til `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), unntatt `type`.
<!-- /props -->

`ref` når det native `<input>`-elementet, og `indeterminate` virker også når appen har sin egen `ref` (`tests/refs.e2e.test.mjs`).

## Tilgjengelighet

- **Element og rolle.** Et native `<input type="checkbox">` inni `<label>`. Feltet er visuelt skjult (`opacity:0`, 0 × 0 px); boksen ved siden av tegner tilstanden.
- **Navn.** Teksten i `label` og `description`, gjennom `<label>`. Begge blir en del av navnet. Uten `label` har feltet ikke noe navn: send `aria-label` selv.
- **Tastatur.** Mellomrom veksler, som en vanlig avkrysningsboks. Ikke noe eget.
- **Tilstand.** `checked` og `indeterminate` på det native feltet (`indeterminate` settes som egenskap i en effekt). Valgt fyller boksen med `--accent` og viser en hake i `--accent-fg`; `indeterminate` viser en strek. `disabled` gir 50 % gjennomsiktighet og `not-allowed`.
- **Fokus.** Boksen får en 2 px `outline` i `--focus-color` med 2 px avstand når feltet har tastaturfokus (`.s-check__input:focus-visible + .s-check__box`).
- **Kontrast.** Boksens kant er `--border-control`, holdt til minst 3:1 mot `--bg`, `--surface-1` og `--surface-2` i begge temaer og alle aksenter (`tests/contrast.test.mjs`, `tests/focus.test.mjs`). Haken er `--accent-fg` på `--accent`, 4,5:1.
- **Bevegelse.** Fyll og hake går over på `--dur-fast`, 0 under redusert bevegelse.
- **Mål.** Boksen er 18 px; klikkflaten er hele etiketten (boks pluss tekst, omtrent 22 px høy). Kjent grense: under 44 px på berøringsskjerm. Gi raden luft i appen når den brukes i en liste for fingre.
- **Innebygd tekst.** Ingen.

## Innhold

- Teksten er en påstand som er sann når boksen er valgt: «Vis fullførte oppgaver».
- Kort. Flytt forklaringen til `description`: «Mandager kl. 08», «Bare du ser dette».
- Ingen punktum etter teksten, punktum i `description` bare når den er en hel setning.
- Flere bokser under hverandre begynner med samme ordklasse (alle verb eller alle substantiv).
