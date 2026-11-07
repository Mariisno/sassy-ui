---
navn: Card
gruppe: display
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/card/
typer: dist/display/Card.d.ts
---

# Card

En flate som samler innhold som hører sammen. `outlined` som standard: `--surface-1`, en 1 px `--border` og 14 px hjørner, uten skygge, fordi kanter bærer struktur i Sassy og skygge bare betyr «løftet». `raised` bytter kanten med `--shadow-md` for ting som svever, `sunken` er `--surface-2` uten kant for brønner og sitater. Fire grader luft (none, sm 12, md 20, lg 32 px) og `interactive` for et kort som kan trykkes på.

## Når du bruker den

- En gruppe med innhold som skal skille seg fra sida rundt: et prosjekt, en innstilling, et sammendrag.
- `raised` for det som ligger oppå noe annet: en popover, et flytende panel.
- `sunken` for et felt inni et kort: et sitat, et eksempel, en oppsummering.
- `interactive` med `as="a"` og `href` når hele kortet er en lenke.

## Når du ikke bruker den

- En rad i en liste som åpner noe: [ListItem](ListItem.nb.md). Den har fast høyde, pil og tastaturstøtte.
- Tom liste: [EmptyState](EmptyState.nb.md) med `framed`.
- En beskjed: [Toast](Toast.nb.md).
- En dialog: [Dialog](Dialog.nb.md). Et kort er ikke modalt.

## Gjør

- Hold deg til ett kortnivå. Inni et `outlined` kort bruker du `sunken`, ikke et nytt `outlined`.
- Velg `as` etter innholdet: `article` for en selvstendig enhet, `section` for en gruppe med overskrift, `li` i en liste.
- Gi et interaktivt kort én tydelig destinasjon og gjør det til en lenke (`as="a" href`), så tastaturet når det.
- La overskriften i kortet følge sidens disposisjon (`h2`, `h3`).

## Ikke gjør

- Ikke `interactive` på en `div` med `onClick`. Den får ingen rolle og tar ikke fokus.
- Ikke en farget kant til venstre som statusmarkør. Bruk en [Badge](Badge.nb.md) inni.
- Ikke skygge på kort som ligger i ro. `raised` er for det som svever.
- Ikke kort inni kort inni kort.

## Eksempel

```jsx
import { Card, Badge } from 'sassy/components';

<Card as="article">
  <h3>Oppskriftsapp</h3>
  <p>Fungerer uten nett og synkroniserer når det er tilbake.</p>
  <Badge tone="success" dot>Live</Badge>
</Card>
<Card variant="sunken" padding="sm">Sitat eller eksempel</Card>
<Card interactive as="a" href="#/prosjekt/12" padding="lg">Åpne prosjektet</Card>
```

## Props

Typene står i `dist/display/Card.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/card/).

<!-- props: CardProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `variant` | `'outlined' \| 'raised' \| 'sunken'` | `'outlined'` | outlined (kant, ingen skygge), raised (skygge, for ting som svever), sunken (nedsenket flate, for brønner og sitater). |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | none, sm 12 px, md 20 px, lg 32 px. |
| `interactive` | `boolean` | `false` | Løfter seg litt på hover og får pekerhånd. Gjør den til en lenke med `as="a"`. |
| `as` | `'div' \| 'section' \| 'article' \| 'a' \| 'li'` | `'div'` | Hvilket element den rendres som. |
| `href` | `string` | – | Med `as="a"`: lenkemålet. Sendes videre til elementet. |
| `target` | `string` | – | Med `as="a"`: hvor lenka åpnes, f.eks. «_blank». |
| `rel` | `string` | – | Med `as="a"`: lenkeforholdet, f.eks. «noopener». |
| `children` | `React.ReactNode` | – | Innholdet. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Tilgjengelighet

- **Element og rolle.** Det `as` sier: `div` (standard), `section`, `article`, `a` eller `li`. Ingen rolle legges til. En `section` får bare landemerkesemantikk når den også har et navn (`aria-labelledby`).
- **Tastatur og fokus.** Bare når kortet er en lenke (`as="a"` med `href`): da er det i tabrekkefølgen og får standard fokusring (2 px `--focus-color`). `interactive` alene gir pekerhånd og et 1 px løft på hover, ikke tastaturstøtte.
- **Kontrast.** Teksten er `--fg-1` på `--surface-1` (eller `--surface-2` for `sunken`), 4,5:1 i begge temaer. Kanten (`--border`) er struktur, ikke informasjon, og holdes ikke til 3:1. I mørkt tema er `raised` `--surface-2`, så den stiger lysere i stedet for å stole på skygge.
- **Bevegelse.** `interactive` går over på `--dur-base`, 0 under redusert bevegelse.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** `interactive` uten `as="a"` er visuelt, ikke semantisk. Vil du ha et kort som er en knapp, legg en [Button](Button.nb.md) inni.

## Innhold

- Kortet har én overskrift, så én setning, så eventuelt en Badge eller en handling.
- Overskriften er navnet på tingen («Oppskriftsapp»), ikke en kategori («Prosjekt»).
- Én handling per kort. Flere handlinger hører hjemme på detaljsida.
- Metatekst (dato, antall) i monospace under innholdet.
