---
navn: Link
gruppe: navigation
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/link/
typer: dist/navigation/Link.d.ts
---

# Link

En lenke: aksentens tekstfarge (`--accent-text`) og understreken som base.css alt gir hver `<a>`, pluss variantene. `inline` står i løpende tekst og bryter med den; `standalone` er en lenke på egen linje, i medium vekt og minst 24 px høy. Med `target="_blank"` sier lenka fra: `rel="noopener noreferrer"`, et eksternt ikon og den visuelt skjulte teksten «(åpner i ny fane)», så en skjermleser hører hvor den går. `as` tar en ruters Link, så appen beholder ruting på klienten.

## Når du bruker den

- Noe som fører et annet sted: en annen side i appen, et dokument, en side utenfor.
- Et ord eller en frase i en setning som leder videre: «Les om `jordtyper` før du sår.»
- En lenke på egen linje under et avsnitt eller et kort: «Se hele sådagboka».

## Når du ikke bruker den

- Noe som gjør noe på siden (lagrer, åpner en dialog, bytter visning): [Button](Button.nb.md), `variant="ghost"` for en stille knapp.
- En rad som åpner noe: [ListItem](ListItem.nb.md).
- En handling i en melding: `actionLabel` på [Alert](Alert.nb.md) eller [Toast](Toast.nb.md).
- Hovednavigasjonen: [AppShell](AppShell.nb.md) og [Tabs](Tabs.nb.md).

## Gjør

- La teksten si hvor lenka går: «sådagboka», «frøkatalogen». Det er det en skjermleser lister opp.
- Bruk `inline` i en setning og `standalone` når lenka står alene; da får den medium vekt og en treffflate på 24 px.
- Send `as={RouterLink}` med `to` i en app med React Router, så siden ikke lastes på nytt. `to` virker bare sammen med `as`; en vanlig `<a>` trenger `href`.
- La `target="_blank"` være unntaket, for en side utenfor appen som folk skal komme tilbake fra. Lenka sier selv fra om den nye fanen.
- Hold lenka på `--bg`, `--surface-1` eller `--surface-2`, der fargen holder 4,5:1.

## Ikke gjør

- Ikke «her», «klikk her» eller «les mer» som lenketekst.
- Ikke `onClick` uten `href`: det er en knapp.
- Ikke fjern understreken i løpende tekst; i tekst er den det som skiller en lenke fra ordene rundt.
- Ikke en lenke på `--surface-3` eller `--accent-soft`; der holder ikke fargen 4,5:1 for alle aksenter.

## Eksempel

```jsx
import { Link } from 'sassy/components';
import { Link as RouterLink } from 'react-router-dom';

<p>Les om <Link href="/jord">jordtyper</Link> før du sår.</p>
<Link variant="standalone" href="/saadagbok">Se hele sådagboka</Link>
<Link href="https://example.com/fro" target="_blank">Frøkatalogen</Link>
<Link as={RouterLink} to="/planter/tomat">Tomat</Link>
<Link variant="standalone" href="https://example.com/fro" external>Frøkatalogen</Link>
```

## Props

Typene står i `dist/navigation/Link.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/link/).

<!-- props: LinkProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `as` | `React.ElementType` | `'a'` | Elementet eller komponenten den rendres som, standard `a`. Send en ruters Link (React Router: `as={RouterLink}` med `to`); den må rendre en `<a>`. Dens egne props går rett gjennom. |
| `to` | `string \| { pathname?: string; search?: string; hash?: string }` | – | Bare med `as` satt til en ruters Link: ruta, f.eks. `/planter/tomat` eller `{ pathname, search, hash }` (React Router sin `To`). Sendes videre til den; en vanlig `<a>` ser bort fra den, så gi `href` der. |
| `variant` | `'inline' \| 'standalone'` | `'inline'` | `inline` (standard) står i løpende tekst; `standalone` er en lenke på egen linje: medium vekt, fortsatt vanlig tekst i linja, med en treffflate på minst 24 px. |
| `external` | `boolean` | – | Viser det eksterne ikonet etter teksten. Standard: på når `target="_blank"`, av ellers. `false` skjuler ikonet på en lenke i ny fane; `true` viser det på en lenke som forlater appen i samme fane. |
| `newTabLabel` | `string` | `'(åpner i ny fane)'` | Den visuelt skjulte teksten etter lenketeksten når `target="_blank"`. Standard «(åpner i ny fane)»; engelske flater sender «(opens in a new tab)». |
| `children` | `React.ReactNode` | – | Lenketeksten. Si hvor den går, ikke «her» eller «klikk her». |
| `className` | `string` | – | Egne klasser på lenka. |
| `style` | `React.CSSProperties` | – | Egne stiler på lenka. |

Pluss alle attributtene til `<a>` (`React.AnchorHTMLAttributes<HTMLAnchorElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, fargereglene i enhetstester.

- **Element og rolle.** En `<a href>`, rolle `link` fra elementet. Med `as` er det det komponenten rendrer; React Router sin Link rendrer en `<a>`. Ingen rolle legges til.
- **Navn.** Lenketeksten, pluss «(åpner i ny fane)» som visuelt skjult tekst (`.s-sr-only`, 1 px og klippet, ikke `display:none`) når `target="_blank"` (testet). Ikonet er `aria-hidden`.
- **Tastatur og fokus.** Tab og Enter som en vanlig lenke. Fokusringen er Sassys `:focus-visible` (2 px `--focus-color`, 2 px utenfor), med `--radius-xs` på hjørnene (testet). `ref` når `<a>`.
- **Kontrast.** `--accent-text` holder 4,5:1 på `--bg`, `--surface-1` og `--surface-2` i begge temaer og alle seks aksenter, og det gjør `--accent-hover` (fargen ved hover) også (testet på tokenene og den renderte fargen). Understreken skiller lenka fra teksten rundt uten farge (WCAG 1.4.1). Kjent grense: ikke på `--surface-3` og `--accent-soft`.
- **Treffflate.** `standalone` er vanlig tekst i linja med `padding-block` som gir en treffflate på minst 24 px (WCAG 2.5.8, testet); det eksterne ikonet henger på siste ord og havner aldri alene på en linje (testet). En `inline`-lenke følger linjehøyden i teksten (24 px i brødtekst) og er unntatt som en del av en setning.
- **Ny fane.** `target="_blank"` gir alltid `rel="noopener noreferrer"`, også når `rel` er satt til noe annet (testet). Den skjulte teksten er teknikk G201: lenka sier fra før den åpner noe nytt.
- **Bevegelse.** Ingen; fargen og understreken toner på `--dur-fast`.
- **Innebygd tekst.** «(åpner i ny fane)». Overstyr med `newTabLabel`.
- **Kjente grenser.** Ingen `disabled`: en lenke som ikke kan brukes, tas bort. Ingen egen farge for besøkte lenker. Fargen er alltid aksenten; en lenke i en [Alert](Alert.nb.md) arver tonens farge fra `.s-alert__text a`.

## Innhold

- Lenketeksten er stedet den går til, som et substantiv: «sådagboka», «frøkatalogen», «innstillingene».
- I en setning lenker du ordene som bærer meningen, ikke hele setningen: «Les om `jordtyper` før du sår.»
- En `standalone`-lenke begynner med et verb når den gjør noe videre: «Se hele sådagboka», «Åpne frøkatalogen».
- Engelske flater sender `newTabLabel="(opens in a new tab)"`.
