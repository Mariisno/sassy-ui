---
navn: BackLink
gruppe: navigation
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/backlink/
typer: dist/navigation/BackLink.d.ts
---

# BackLink

«Tilbake»: en [Link](Link.nb.md) på egen linje med en chevron foran teksten, øverst på en side som ble åpnet fra en annen: en plante fra lista, en dag fra uka. Den er Link, så `href`, eller `as` med `to` for en ruter, og `ref` når `<a>`; `standalone` gir medium vekt og minst 24 px høyde. Teksten er «Tilbake» som standard og sier hvor den går når det hjelper: «Tilbake til planter».

## Når du bruker den

- Øverst på en detaljside som ble åpnet fra en liste eller en oversikt.
- Et steg i en flyt med egne sider, der forrige side har en adresse.
- En side som åpnes fra flere steder, med navnet på stedet i teksten.

## Når du ikke bruker den

- Hovednavigasjonen: [AppShell](AppShell.nb.md) og [Tabs](Tabs.nb.md).
- Et steg tilbake inne på sida (et skjema i flere deler): en [Button](Button.nb.md) med `onClick`.
- Lukke noe som ligger over sida: lukkeknappen i [Dialog](Dialog.nb.md).
- En lenke i løpende tekst: [Link](Link.nb.md).

## Gjør

- La den gå til et kjent sted med `href` eller `to`, så den virker også når sida ble åpnet fra et bokmerke.
- Sett den først i innholdet, før overskriften, én per side.
- Si hvor den går når sida har mer enn én vei tilbake: «Tilbake til planter».
- Send `as={RouterLink}` med `to` i en app med React Router, så sida ikke lastes på nytt.

## Ikke gjør

- Ikke `history.back()`: en lenke har et mål, og det kan ikke finnes noen forrige side.
- Ikke `onClick` uten `href`: det er en knapp.
- Ikke flere tilbake-lenker på én side, og ikke én i bunnen.
- Ikke ta bort understreken; chevronen er pynt, teksten bærer meningen.

## Eksempel

```jsx
import { BackLink } from 'sassy/components';
import { Link as RouterLink } from 'react-router-dom';

<BackLink href="/planter" />
<BackLink href="/planter">Tilbake til planter</BackLink>
<BackLink as={RouterLink} to="/uke" />
<BackLink href="/plants">Back</BackLink>
```

## Props

Typene står i `dist/navigation/BackLink.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/backlink/).

<!-- props: BackLinkProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `href` | `string` | – | Hvor lenka går: sida denne ble åpnet fra, f.eks. `/planter`. |
| `as` | `React.ElementType` | – | Elementet eller komponenten den rendres som, standard `a`. Send en ruters Link (React Router: `as={RouterLink}` med `to`); den må rendre en `<a>`. |
| `to` | `string` | – | Med `as` satt til en ruters Link: ruta, f.eks. `/planter`. Sendes videre til den. |
| `children` | `React.ReactNode` | `'Tilbake'` | Lenketeksten. Standard «Tilbake»; engelske flater sender «Back». Si hvor den går når det hjelper: «Tilbake til planter». |
| `className` | `string` | – | Egne klasser på lenka. |

Pluss alle propsene til `LinkProps`, unntatt `variant`, `external`, `target`, `newTabLabel`.
<!-- /props -->

Resten av [Link](Link.nb.md) sine props går gjennom, unntatt `variant`, `external`, `target` og `newTabLabel`: en tilbake-lenke går alltid i samme fane.

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester; fargen er Link sin (testet).

- **Element og rolle.** En `<a href>` fra Link, rolle `link` fra elementet. Med `as` er det det ruteren rendrer (testet). Ingen rolle legges til.
- **Navn.** Nøyaktig lenketeksten, «Tilbake» eller den du gir, ingenting mer: `getByRole('link', { name: 'Tilbake', exact: true })` finner den (testet). Chevronen er `aria-hidden` (testet). Ingen skjult tekst om ny fane: `target` er ikke en prop.
- **Tastatur og fokus.** Tab og Enter som en lenke. Fokusringen er Sassys `:focus-visible` med `--radius-xs` på hjørnene (testet). `ref` når `<a>` (testet).
- **Kontrast.** `--accent-text` holder 4,5:1 på `--bg`, `--surface-1` og `--surface-2` i begge temaer og alle seks aksenter, og det gjør `--accent-hover` også (testet rendret). Understreken skiller lenka fra teksten rundt uten farge (WCAG 1.4.1). Kjent grense: ikke på `--surface-3` og `--accent-soft`.
- **Treffflate.** Minst 24 px høy (WCAG 2.5.8, testet), som Link `standalone`.
- **Bevegelse.** Ingen; fargen toner på `--dur-fast`.
- **Innebygd tekst.** «Tilbake». Overstyr med `children`; engelske flater sender «Back».
- **Kjente grenser.** Ingen `disabled`: en tilbake-lenke som ikke kan brukes, tas bort. Ingen «tilbake» uten mål. Lenka bryter ikke (`white-space:nowrap`), så chevronen og teksten står på én linje; en lang tekst blir bred i stedet for å brekke. Hold den kort.

## Innhold

- «Tilbake» alene når det bare finnes én vei tilbake.
- «Tilbake til planter», «Tilbake til uka» når sida kan åpnes fra flere steder: stedet som et substantiv i bestemt form.
- Ikke «Gå tilbake», «Forrige» eller bare chevronen.
- På engelsk: «Back», «Back to plants».
