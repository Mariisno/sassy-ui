---
navn: ListItem
gruppe: display
status: stable
sidenVersjon: 0.3.0
kort: components/display/listitem.card.html
typer: components/display/ListItem.d.ts
---

# ListItem

En rad som åpner noe: et prosjekt, en oppskrift, en plante. Med `href` er den en lenke, med `onClick` en knapp, og med ingen av delene en vanlig rad. Foran står et ikon (40 px rute) eller et bilde (48 × 48), så tittel og en metalinje, og bakerst en pil når raden åpner noe. Minst 56 px høy, med en fast kolonne foran så titlene står på linje i en liste som blander ikoner og bilder.

## Når du bruker den

- Lister der hver rad fører til en detaljside: prosjekter, økter, oppskrifter.
- Rader som åpner et ark eller en dialog (`onClick`).
- En rad uten mål, som bare viser tittel og meta, når lista ellers består av rader som åpner noe.

## Når du ikke bruker den

- Noe som hukes av: [Checkbox](Checkbox.nb.md).
- En rad som utvides på stedet: [Disclosure](Disclosure.nb.md).
- En rad med flere handlinger (rediger, slett): legg handlingene på detaljsida, eller bruk et [Card](Card.nb.md) med knapper.
- Innhold folk leser, ikke navigerer i: tekst og [Card](Card.nb.md).

## Gjør

- Bruk `href` når appen har ruter. Da kan raden åpnes i ny fane, og skjermleseren sier «lenke».
- Sett det som skiller radene fra hverandre i `meta`: «25 % · 3 bed», «Rask hverdagsmiddag · 20 min».
- Hold `children` til frasert innhold (`span`, tekst, Badge, Progress-linje): raden er en `<a>` eller `<button>`.
- Gi `imageAlt` bare når bildet sier noe tittelen ikke sier.
- Bruk `trailing` til en [Badge](Badge.nb.md) når status er viktigere enn pila.

## Ikke gjør

- Ikke legg knapper eller lenker inni raden. Hele raden er målet, og en knapp i en knapp er ugyldig.
- Ikke `<div>`, `<p>` eller overskrifter i `children`.
- Ikke skjul pila (`trailing={null}`) med mindre lista åpenbart er navigasjon.
- Ikke `disabled` uten å si hvorfor i `meta`.

## Eksempel

```jsx
import { ListItem, Badge, Progress } from 'sussi/components';

<ListItem href="#/oppskrift/suppe" icon="book-open" title="Linsesuppe" meta="Rask hverdagsmiddag · 20 min" />
<ListItem onClick={åpneProsjekt} image={omslag} title="Tomater" meta="25 % · 3 bed">
  <Progress value={25} label="Framdrift" />
</ListItem>
<ListItem icon="archive" title="Frø fra i fjor" meta="8 poser" />
<ListItem href="#/p/1" title="Basilikum" trailing={<Badge tone="success">Ferdig</Badge>} />
<ListItem href="#/p/2" onClick={lukkArk} title="Mynte" />
```

## Props

Typene står i `components/display/ListItem.d.ts`. Kortet: `components/display/listitem.card.html`.

<!-- props: ListItemProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | *påkrevd* | Tittelen, påkrevd. |
| `meta` | `React.ReactNode` | – | Andre linje, f.eks. «25 % · 3 bed». |
| `icon` | `string` | – | Lucide-ikonnavn, vist i en 40 px rute. |
| `image` | `string` | – | Bilde-URL, vist 48 × 48. Dekorativt uten `imageAlt`. |
| `imageAlt` | `string` | `''` | Hva bildet viser, når det sier noe tittelen ikke sier. Tomt (dekorativt) som standard. |
| `leading` | `React.ReactNode` | – | Noe annet foran, i stedet for ikon eller bilde. |
| `trailing` | `React.ReactNode` | – | Plassen bakerst. Standard: en pil når raden åpner noe. `null` skjuler den. |
| `href` | `string` | – | Gjør raden til en lenke. |
| `onClick` | `(e: React.MouseEvent<HTMLElement>) => void` | – | Gjør raden til en knapp når det ikke er noen `href`. Med `href` kjører den likevel (f.eks. for å lukke et ark først). |
| `disabled` | `boolean` | – | En knapp blir `disabled`; en lenke får `aria-disabled="true"` og mister `href` og `onClick`. |
| `children` | `React.ReactNode` | – | Mer innhold under metalinja, f.eks. en framdriftslinje. Må være frasert innhold (`<span>`, tekst), siden raden er en `<a>` eller `<button>`. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`), unntatt `title`, `onClick`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/listitem.e2e.test.mjs`.

- **Element og rolle.** `<a href>` med `href`, `<button type="button">` med `onClick`, ellers `<div>`. En rad uten mål er ikke fokuserbar og har ingen pil.
- **Navn.** Tittel og meta, med et mellomrom imellom i det tilgjengelige navnet («Linsesuppe Rask hverdagsmiddag · 20 min»). Teksten i `children` blir også en del av navnet. Bildet er dekorativt (`alt=""`) uten `imageAlt`.
- **Tastatur.** Enter og mellomrom på en knapperad, Enter på en lenkerad (testet). En lenke med `onClick` kjører den ved klikk og Enter.
- **Tilstand.** `disabled` på en knapp blir `disabled`; på en lenke blir det `aria-disabled="true"`, og `href` og `onClick` fjernes, så den går ingen steder. Begge er 50 % gjennomsiktige.
- **Fokus.** Standard fokusring, 2 px `--focus-color` (testet synlig på både lenke og knapp).
- **Kontrast.** Tittel `--fg-1`, meta `--fg-2`, pil `--fg-3` som går til `--fg-1` på hover, alt på `--surface-1`. Raden arver Sussis skrift også som knapp (`font:inherit`).
- **Mål.** Minst 56 px høy (testet ≥ 44). En lang tittel bryter og holder pila synlig ved 320 px.
- **Bevegelse.** Overganger på `--dur-fast`; trykk flytter 1 px ned.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** Som `<a>` eller `<button>` tåler raden bare frasert innhold. En framdriftslinje er fin ([Progress](Progress.nb.md) er et `<span>`), en `<div>` er det ikke.

## Innhold

- Tittelen er navnet på tingen: «Tomater», «Linsesuppe».
- `meta` er én linje med det som skiller radene, delt med « · »: «25 % · 3 bed».
- Tall og tid i meta er korte: «20 min», «i går», ikke «20 minutter siden i går».
- Pila trenger ingen tekst. Trenger raden å si «åpne», er tittelen feil.
