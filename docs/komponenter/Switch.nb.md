---
navn: Switch
gruppe: controls
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/switch/
typer: dist/controls/Switch.d.ts
---

# Switch

En bryter for innstillinger som virker med en gang, uten lagreknapp. Et native `<input type="checkbox" role="switch">` inni en `<label>`, med et 34 × 20 px spor som fylles med aksenten når den er på, og en knott som glir over. `label` og `description` som hos Checkbox.

## Når du bruker den

- En innstilling som slår til idet du trykker: mørkt tema, varsler, lyd.
- Når det er tydelig hva «på» betyr uten mer forklaring, eller `description` kan si det på én linje.
- I en innstillingsside der ingenting lagres med knapp («Endringer lagres etter hvert»).

## Når du ikke bruker den

- Et valg i et skjema som lagres samlet: [Checkbox](Checkbox.nb.md).
- Ett valg blant flere: [Radio](Radio.nb.md).
- Noe som utløser en handling i stedet for å endre en tilstand: [Button](Button.nb.md).
- Å vise at noe er på uten at det kan endres: [Badge](Badge.nb.md).

## Gjør

- Styr den fra appens tilstand (`checked` og `onChange`) og lagre i samme øyeblikk.
- Skriv `label` som det som er på: «Mørkt tema», «Varsler».
- Bruk `description` når konsekvensen ikke er opplagt: «Også når appen er lukket».
- Gi tilbakemelding bare når noe skjer utenfor skjermen, og da stille (en toast uten handling).

## Ikke gjør

- Ikke sett en Switch i et skjema med «Lagre»-knapp. Da virker den ikke med en gang, og folk blir lurt.
- Ikke formuler teksten som en handling («Slå på varsler»); bryteren er handlingen.
- Ikke bruk den til en destruktiv endring som trenger bekreftelse.
- Ikke vis «På»/«Av» som tekst ved siden av; sporet og knotten viser det, og skjermleseren sier det.

## Eksempel

```jsx
import { Switch } from 'sassy/components';

<Switch label="Mørkt tema" checked={mørk} onChange={(e) => setMørk(e.target.checked)} />
<Switch label="Varsler" description="Også når appen er lukket" checked={varsler} onChange={(e) => setVarsler(e.target.checked)} />
```

## Props

Typene står i `dist/controls/Switch.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/switch/).

<!-- props: SwitchProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | Teksten ved siden av bryteren. |
| `description` | `React.ReactNode` | – | En linje under teksten, i `--fg-3`. |

Pluss alle attributtene til `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), unntatt `type`.
<!-- /props -->

`ref` når det native `<input>`-elementet (testet).

## Tilgjengelighet

- **Element og rolle.** Et native `<input type="checkbox">` med `role="switch"` inni `<label>`. Skjermleseren sier «bryter, på/av».
- **Navn.** Teksten i `label` og `description`, gjennom `<label>`.
- **Tastatur.** Mellomrom veksler. Ikke noe eget.
- **Tilstand.** `checked` på feltet. På: sporet fylles med `--accent`, knotten glir 14 px. Av: sporet er `--surface-3` med en 1 px `--border-control`-kant, og den hvite knotten har en `--fg-3`-ring, siden hvit på det lyse sporet alene er 1,28:1 (testet). I mørkt tema er knotten på et på-spor `--accent-fg`, holdt til 3:1 mot sporet i alle aksenter (testet).
- **Fokus.** 2 px `outline` i `--focus-color` rundt sporet ved tastaturfokus.
- **Kontrast.** Sporets kant er `--border-control`, minst 3:1 mot flatene (testet).
- **Bevegelse.** Sporfarge og knott går over på `--dur-base` (200 ms), 0 under redusert bevegelse.
- **Mål.** Sporet er 34 × 20 px; klikkflaten er hele etiketten. Kjent grense: under 44 px på berøringsskjerm. Gi raden luft i appen.
- **Innebygd tekst.** Ingen.

## Innhold

- `label` er tilstanden som er på, som et substantiv eller en kort frase: «Mørkt tema», «Lyd ved fullført økt».
- `description` sier rekkevidden: «Også når appen er lukket», «Bare på denne enheten».
- Innstillingssida kan si én gang, øverst: «Endringer lagres etter hvert.» Da trenger ikke hver bryter si det.
- Ingen «Er du sikker?». Virker bryteren med en gang, kan den slås av igjen med en gang.
