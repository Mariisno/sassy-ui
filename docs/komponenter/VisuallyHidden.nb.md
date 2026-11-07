---
navn: VisuallyHidden
gruppe: layout
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/visuallyhidden/
typer: dist/layout/VisuallyHidden.d.ts
---

# VisuallyHidden

Tekst for hjelpemidler som ingen ser: klassen `.s-sr-only` som en komponent. Elementet er 1 px, klippet og utenfor flyten, aldri `display:none` eller `visibility:hidden`, så en skjermleser leser det og `role="status"` på det blir annonsert. `focusable` er for en hopp-lenke eller en annen kontroll som må vises når den har fokus: den kommer da tilbake i flyten der den står i dokumentet, minst 24 px høy. AppShell har sin egen hopp-lenke; denne er for sider uten.

## Når du bruker den

- Ordene bare en skjermleser trenger: «(åpner i ny fane)», en overskrift for en region, det en ikonknapp gjør når den ikke kan ta `aria-label`.
- En statuslinje som skal leses uten å ta plass: `role="status"` med «Lagret» eller «Laster oppskriften».
- En hopp-lenke på en side uten [AppShell](AppShell.nb.md): `as="a"` med `href` og `focusable`.

## Når du ikke bruker den

- Tekst alle skal se: skriv den synlig.
- En kontroll som skal være borte: fjern den. En kontroll som er skjult for synet, er fortsatt i tabrekka.
- Et navn på en knapp som alt har `aria-label` eller `label` ([IconButton](IconButton.nb.md)).
- Innhold som skal være skjult for alle, også skjermlesere: `hidden` eller `aria-hidden`.

## Gjør

- Foretrekk en synlig tekst; bruk denne for det som bare trengs i opplesingen.
- Begynn teksten med et mellomrom når den står inne i en lenke eller en knapp, så de skjulte ordene ikke går i ett med de synlige.
- Sett `focusable` bare på noe som kan ta fokus: en lenke eller en knapp.
- Gi hopp-lenka et mål som kan ta fokus: `id` og `tabIndex={-1}` på innholdet.

## Ikke gjør

- Ikke `display:none` eller `hidden` i tillegg; da leses den ikke.
- Ikke lange avsnitt; en skjermleser får ikke hoppe over dem.
- Ikke `focusable` på en `span`; den kan ikke få fokus, så den vises aldri.
- Ikke en VisuallyHidden som eneste innhold i et element som alle skal kunne bruke.

## Eksempel

```jsx
import { VisuallyHidden, Icon } from 'sassy/components';

<VisuallyHidden as="a" href="#innhold" focusable>Hopp til innholdet</VisuallyHidden>
<h2><VisuallyHidden>Planter i</VisuallyHidden> Drivhuset</h2>
<button type="button"><Icon name="trash-2" /><VisuallyHidden> Slett raden</VisuallyHidden></button>
<VisuallyHidden role="status">Lagret</VisuallyHidden>
```

## Props

Typene står i `dist/layout/VisuallyHidden.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/visuallyhidden/).

<!-- props: VisuallyHiddenProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `as` | `'span' \| 'div' \| 'p' \| 'a' \| 'button' \| 'label' \| 'legend' \| 'h2' \| 'h3'` | `'span'` | Elementet den rendres som, standard `span`. `a` for en hopp-lenke (med `href` og `focusable`), `button` for en kontroll som bare vises med fokus, `div` eller `p` for en tekstblokk. |
| `focusable` | `boolean` | `false` | `true` viser elementet mens det har fokus (en hopp-lenke, WCAG 2.4.1); det står da i flyten, minst 24 px høyt. |
| `href` | `string` | – | Med `as="a"`: lenkemålet, f.eks. `#main`. Sendes videre til elementet. |
| `children` | `React.ReactNode` | – | Teksten en skjermleser leser: «(åpner i ny fane)», en overskrift for en region, et navn på en ikonknapp som ikke kan ta `aria-label`. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** Det `as` sier: `span` (standard), `div`, `p`, `a`, `label`, `legend`, `h2` eller `h3`. Ingen rolle legges til; `role="status"` eller `role="alert"` sendes som prop.
- **Navn.** Teksten. Den er med i navnet på det elementet den står i (en knapp, en lenke), som vanlig tekst.
- **Tastatur og fokus.** Et `focusable` element er i tabrekka som alle andre, og vises mens det har fokus: `position:static`, `inline-flex`, minst 24 px høyt (testet: 1 × 1 px i ro, synlig og minst 24 px med fokus, og Enter flytter fokus til målet). Uten `focusable` er elementet ikke i tabrekka med mindre det selv kan ta fokus; da blir det et usynlig fokus, så ikke gjør det.
- **Kontrast.** Ingen farger av sin egen; en vist hopp-lenke er en vanlig lenke i `--accent-text` (4,5:1), eller det `className` sier.
- **Treffflate.** Vist med fokus: minst 24 px høy (WCAG 2.5.8).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** `clip` er den gamle egenskapen, med vilje: `clip-path` leses ikke like sikkert i alle kombinasjoner. Vist med fokus står lenka i flyten og skyver innholdet under seg ned mens den har fokus; for et overlegg som ikke flytter noe, som AppShell sin pille, gi den `className` med `position:fixed` eller `absolute` og egen stil.

## Innhold

- Kort og konkret: «Slett raden», ikke «Slett».
- Samme ord som ellers i appen; teksten er en del av navnet, ikke en forklaring.
- «(åpner i ny fane)» i parentes etter lenketeksten, som [Link](Link.nb.md) gjør.
