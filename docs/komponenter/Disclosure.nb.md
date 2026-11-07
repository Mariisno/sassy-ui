---
navn: Disclosure
gruppe: display
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/disclosure/
typer: dist/display/Disclosure.d.ts
---

# Disclosure

En seksjon som vises og skjules: innebygd `<details>` og `<summary>`, så nettleseren gir knapperollen, `aria-expanded`, Enter og mellomrom, og innholdet står i sida enten seksjonen er åpen eller ikke. Raden er 44 px høy med tittelen og en chevron som snur når seksjonen åpner, på `--dur-base`, som er 0 under redusert bevegelse. Ukontrollert med `defaultOpen`, eller kontrollert med `open` og `onToggle`. Én seksjon om gangen; en liste av seksjoner er flere Disclosure etter hverandre, ikke et trekkspill.

## Når du bruker den

- Noe folk trenger av og til, under det de trenger hver gang: detaljer, hjelp, en lang liste, «vis mer».
- En innstilling eller et skjema med en sjelden del: «Avansert» under det vanlige.
- Flere korte seksjoner på én side, der hver kan stå åpen for seg: notatene til hver sort i sådagboka.

## Når du ikke bruker den

- Bytte mellom visninger som hører sammen: [Tabs](Tabs.nb.md).
- Noe som skal åpne over sida, med fokus inni: [Dialog](Dialog.nb.md) eller [Popover](Popover.nb.md).
- En liste med handlinger bak én knapp: [Menu](Menu.nb.md).
- Innhold folk trenger hver gang. Det står på sida, ikke bak en rad.

## Gjør

- La `title` si hva seksjonen inneholder: «Vanning og gjødsling», ikke «Vis mer» eller «Detaljer». Det er knappens navn.
- Send et overskriftselement i `title` (`<h3>`) når seksjonen er en del av sidas struktur; den beholder radens størrelse.
- Bruk `defaultOpen` for en seksjon som bør stå åpen fra start, og la resten være lukket.
- Kontrollert (`open` + `onToggle`) bare når appen trenger å vite eller styre tilstanden; da må `onToggle` oppdatere `open`, ellers går seksjonen tilbake.
- Hold innholdet i seksjonen sekundært. Det folk trenger hver gang, står utenfor.

## Ikke gjør

- Ikke lukk de andre når én åpner. Flere Disclosure er en liste av seksjoner, ikke et trekkspill.
- Ikke legg en knapp eller en lenke inne i `title`: raden er alt en knapp.
- Ikke bruk den som en meny eller en nedtrekksliste.
- Ikke gjem en feilmelding eller noe som må leses i en lukket seksjon.

## Eksempel

```jsx
import { Disclosure } from 'sassy/components';

<Disclosure title="Vanning og gjødsling">
  <p>Vann om morgenen, så bladene rekker å tørke. Gjødsle annenhver uke fra juni.</p>
</Disclosure>

<Disclosure title="Sådato per sort" defaultOpen>
  <ul><li>Tomat: midten av mars, inne</li><li>Erter: mai, rett i jorda</li></ul>
</Disclosure>

<Disclosure title={<h3>Jordtyper</h3>} open={open} onToggle={setOpen}>
  <p>Sandjord drenerer fort. Leirjord holder på vannet.</p>
</Disclosure>
```

## Props

Typene står i `dist/display/Disclosure.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/disclosure/).

<!-- props: DisclosureProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | *påkrevd* | Radens tekst: det seksjonen inneholder, f.eks. «Vanning og gjødsling». Send et overskriftselement (`<h3>`) når seksjonen er en del av sidas struktur. |
| `open` | `boolean` | – | Kontrollert: om seksjonen er åpen. Brukes sammen med `onToggle`; utelat den for en ukontrollert seksjon. |
| `defaultOpen` | `boolean` | `false` | Ukontrollert: åpen ved første rendring. Standard false. |
| `onToggle` | `(open: boolean) => void` | – | Kalles med den nye tilstanden når noen åpner eller lukker seksjonen. Med `open` satt oppdaterer appen `open` her. |
| `children` | `React.ReactNode` | – | Innholdet i seksjonen. Rendres enten seksjonen er åpen eller ikke. |
| `className` | `string` | – | Egne klasser på `<details>`. |
| `style` | `React.CSSProperties` | – | Egne stiler på `<details>`. |

Pluss alle attributtene til `<details>` (`React.DetailsHTMLAttributes<HTMLDetailsElement>`), unntatt `title`, `open`, `onToggle`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** En `<details>` med en `<summary>`. Nettleseren gir `<summary>` knapperollen og `aria-expanded` fra `open`-attributtet; ingen rolle eller `aria-expanded` legges til, og den beregnede rollen og tilstanden er testet i Chromiums tilgjengelighetstre (`DisclosureTriangle`, `expanded`). Merk at Playwright og Testing Library ser raden som `summary` eller `group`, ikke som `button`: finn den med `getByText` eller `locator('summary')`. Innholdet er i DOM-en også når seksjonen er lukket, så «finn på siden» finner det i de fleste nettlesere, men det er ikke vist før den åpner (testet).
- **Navn.** `title`. En overskrift i `title` står direkte i `<summary>` med tittelklassen selv (ingen `<span>` rundt), blir en del av sidas struktur og beholder radens skrift (testet).
- **Tastatur.** Tab når raden; Enter og mellomrom åpner og lukker (testet). Fokus blir på raden. Ingen egne tastehåndterere.
- **Fokus.** Sassys `:focus-visible` på raden: 2 px `--focus-color`, 2 px utenfor, med radens hjørner (farge, bredde og avstand testet).
- **Kontrast.** Tittelen er `--fg-1` på `--surface-1` (4,5:1 eller mer) og chevronen `--fg-3` (3:1 eller mer) i begge temaer og alle seks aksenter, målt på tokenene og i nettleseren, også ved hover (testet). Ramma er `--border` og bærer ikke mening; chevronen og `open` gjør det.
- **Treffflate.** Raden er minst 44 px høy i hele bredden (WCAG 2.5.8, testet).
- **Bevegelse.** Chevronen snur 180° på `--dur-base`; tokenet er 0 under `prefers-reduced-motion`, og overgangen tas bort i tillegg (WCAG 2.3.3, testet). Innholdet kommer uten animasjon.
- **Kontrollert.** `onToggle` kalles én gang per endring med den nye tilstanden. Nettleseren åpner elementet før React hører om det; sier ikke appen ja (oppdaterer `open`), settes elementet tilbake, uten et nytt `onToggle` (testet). Sett `open` synkront i `onToggle` (en vanlig `setState`), ikke etter et kall eller en `await`: ellers lukkes raden og åpnes igjen, og det blinker.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Ingen trekkspill (`name`-attributtet på `<details>` er ikke tatt i bruk). Ingen `disabled`: en seksjon som ikke kan åpnes, tas bort. Innholdet animeres ikke inn.

## Innhold

- `title` er det seksjonen inneholder, som et substantiv: «Vanning og gjødsling», «Sådato per sort», «Avansert».
- Ikke «Vis mer», «Les mer» eller «Detaljer» alene; en skjermleser lister opp radene, og de må kunne skilles fra hverandre.
- Innholdet begynner rett på. Ikke gjenta tittelen i første linje.
- Engelske flater skriver tittelen på engelsk; komponenten har ingen egen tekst.
