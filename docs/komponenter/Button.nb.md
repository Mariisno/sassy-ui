---
navn: Button
gruppe: buttons
status: stable
sidenVersjon: 0.2.0
kort: components/buttons/buttons.card.html
typer: components/buttons/Button.d.ts
---

# Button

Knappen er den vanlige handlingen i Sussi: én primær per visning, sekundær og ghost for resten. Fem varianter (primary, secondary, soft, ghost, danger), tre størrelser (30, 38 og 46 px), ikon foran eller bak teksten, og en `loading`-tilstand som bytter ikonet med en spinner og slår knappen av uten at fokus forsvinner. Den kan rendres som lenke med `as="a"`.

## Når du bruker den

- En handling som gjør noe når du trykker: lagre, legge til, slette, gå videre.
- Den ene hovedhandlingen på en side eller i en dialog er `primary`. Alternativene er `secondary` eller `ghost`.
- `danger` for det som ikke kan angres, i bunnen av en bekreftelsesdialog.
- `soft` for en handling som skal synes litt, men ikke konkurrere med den primære.

## Når du ikke bruker den

- Bare et ikon, uten tekst: bruk [IconButton](IconButton.nb.md), som alltid har et tilgjengelig navn.
- Velge en fil: bruk [FileButton](FileButton.nb.md), som er en knapp rundt et filfelt.
- Gå til en annen side: en vanlig lenke (`<a>`), eller `Button as="a"` når lenka skal se ut som en knapp.
- Slå noe av eller på: [Switch](Switch.nb.md) eller [Checkbox](Checkbox.nb.md).
- Velge mellom visninger: [Tabs](Tabs.nb.md).

## Gjør

- Én `primary` per visning. Flere primære betyr at ingen er det.
- Si hva som skjer, med et verb først: «Lagre endringer», «Legg til oppgave», «Slett prosjekt».
- Bruk `size="lg"` (46 px) der folk trykker med fingeren. `md` er 38 px, som er under de 44 px Sussi vil ha på berøringsskjerm.
- Sett `loading` mens noe lagres, så den ikke kan trykkes to ganger.
- Angre i en toast framfor en bekreftelsesdialog når handlingen kan gjøres om.

## Ikke gjør

- Ikke skriv «OK», «Send» eller «Ja». Knappen skal si utfallet.
- Ikke bruk `danger` for noe som kan angres. Da holder det med en vanlig knapp og en «Angre»-toast.
- Ikke lag en ikon-knapp av Button ved å utelate teksten. Det er IconButton.
- Ikke sett `disabled` på en knapp uten å si hvorfor et annet sted. Folk ser ikke hva som mangler.

## Eksempel

```jsx
import { Button } from 'sussi/components';

<Button onClick={lagre}>Lagre endringer</Button>
<Button variant="secondary" iconLeft="plus" onClick={nytt}>Nytt prosjekt</Button>
<Button variant="ghost" size="sm" onClick={avbryt}>Avbryt</Button>
<Button variant="danger" iconLeft="trash-2" onClick={slett}>Slett prosjekt</Button>
<Button loading>Lagrer</Button>
<Button as="a" href="#/arkiv" variant="soft" iconRight="arrow-right">Se arkivet</Button>
```

## Props

Typene står i `components/buttons/Button.d.ts`. Kortet med alle varianter, størrelser og tilstander: `components/buttons/buttons.card.html`.

<!-- props: ButtonProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'danger'` | `'primary'` | primary (aksentfyll), secondary (flate og kant), soft (myk aksent), ghost (uten ramme), danger (fare). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px høy. |
| `iconLeft` | `string` | – | Lucide-ikon foran teksten. |
| `iconRight` | `string` | – | Lucide-ikon etter teksten, f.eks. «arrow-right». |
| `loading` | `boolean` | `false` | Viser en spinner i stedet for venstre ikon, skjuler høyre, og slår knappen av mens den beholder fokus (`aria-disabled`, `aria-busy`). |
| `fullWidth` | `boolean` | `false` | Fyller bredden. |
| `as` | `'button' \| 'a'` | `'button'` | Rendres som et annet element, «a» for lenker. |
| `href` | `string` | – | Lenkemål når `as="a"`. |
| `children` | `React.ReactNode` | – | Teksten på knappen. |

Pluss alle attributtene til `<button>` (`React.ButtonHTMLAttributes<HTMLButtonElement>`).
<!-- /props -->

`ref` når det native `<button>`-elementet, så appen kan flytte fokus til den (testet i `tests/refs.e2e.test.mjs`).

## Tilgjengelighet

- **Element og rolle.** Et native `<button type="button">` (`type` kan overstyres, f.eks. `type="submit"`). Med `as="a"` er den en `<a>` og får `href`; da virker ikke `disabled`, og tastaturet bruker Enter alene.
- **Tastatur.** Enter og mellomrom trykker knappen, som en vanlig knapp. Ikke noe eget.
- **Navn.** Teksten i `children`. Ikonene er dekorative (`aria-hidden`), så en knapp uten tekst har ikke noe navn: bruk IconButton.
- **Tilstand.** `disabled` på elementet tar knappen ut av tab-rekkefølgen. `loading` setter i stedet `aria-disabled="true"` og `aria-busy="true"`, og stopper klikket (og innsendingen av skjemaet): native `disabled` ville flyttet fokus til toppen av siden midt i innsendingen, og skjermleseren ville mistet plassen. For en knapp som er slått av, men som skal kunne nås, for eksempel med en [Tooltip](Tooltip.nb.md) som sier hvorfor, gir du `aria-disabled` i stedet for `disabled`: den ser avslått ut, gjør ingenting og beholder fokus. Begge er 50 % gjennomsiktige med `not-allowed`-peker.
- **Fokus.** En 2 px `outline` i `--focus-color` med 2 px avstand, bare ved tastaturfokus (`:focus-visible`). Ringen er en `outline`, så den overlever også forced-colors-modus. `--focus-color` holder 3:1 mot `--bg`, `--surface-1` og `--surface-2` i begge temaer og alle aksenter (`tests/contrast.test.mjs`).
- **Kontrast.** Teksten på den primære knappen holder 4,5:1 mot aksenten i begge temaer og alle aksenter, også på hover og trykk. En lenke med knappeklasser beholder lesbar tekst på hover (`tests/linkbutton.e2e.test.mjs`). Teksten på fareknappen er `--danger-fg-on` (hvit i lyst tema, nesten svart i mørkt), 4,5:1 på `--danger` og `--danger-hover` i begge temaer og alle aksenter (`tests/contrast.test.mjs`).
- **Trykk.** Flytter seg 1 px ned, ingen skalering.
- **Bevegelse.** Overgangene bruker `--dur-fast`, som er 0 under `prefers-reduced-motion`. Under redusert bevegelse står spinneren i `loading` stille og pulserer i stedet.
- **Mål.** 30, 38 og 46 px høy. Bare `lg` når de 44 px Sussi ber om på berøringsskjerm.
- **Innebygd tekst.** Ingen. Knappen sier det du sender inn.

## Innhold

- Verb først, setningsform: «Lagre endringer», ikke «LAGRE» eller «Lagre Endringer».
- Ett til tre ord. Blir det lengre, hører forklaringen hjemme i teksten over knappen.
- Nevn objektet når det er tvil: «Slett prosjekt», ikke «Slett».
- Den primære knappen i en dialog gjentar det tittelen spør om: «Slette prosjektet?» → «Slett prosjekt». Alternativet sier hva som skjer i stedet: «Behold».
- Ingen utropstegn, ingen emoji. Pil (→) er greit i `iconRight`, ikke i teksten.
