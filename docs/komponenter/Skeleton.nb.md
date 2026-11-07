---
navn: Skeleton
gruppe: feedback
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/skeleton/
typer: dist/feedback/Skeleton.d.ts
---

# Skeleton

Formen på innhold som ikke har kommet ennå: tekstlinjer, en sirkel (en avatar) eller et rektangel (et bilde, et kort) i `--surface-3`, med et skimmer som feier over nå og da og er av under `prefers-reduced-motion`. Alltid `aria-hidden`: regionen rundt sier at den laster, med `aria-busy="true"` og én statustekst, så en skjermleser hører «Laster oppskrifter» én gang i stedet for tolv grå blokker.

## Når du bruker den

- Innhold med kjent form som tar mer enn omtrent et sekund: en liste av rader, et kort med bilde og tekst, en profil.
- Du vet omtrent hvor mye som kommer, så skjelettet kan ha samme høyde og ingenting hopper når innholdet lander.
- Resten av siden er brukbar mens dette venter.

## Når du ikke bruker den

- Noe uten kjent form, eller noe kort (lagrer, logger inn): [Spinner](Spinner.nb.md).
- Noe med kjent lengde: [Progress](Progress.nb.md).
- En hel side som laster: Sussi i `sover`-positur.
- Et sted som er tomt, ikke på vei: [EmptyState](EmptyState.nb.md).

## Gjør

- Sett `aria-busy="true"` på regionen rundt skjelettene, og ha én statustekst der: en `Spinner` med `label`, eller en visuelt skjult linje med `role="status"` (`.s-sr-only`).
- Ha statusteksten i siden fra start og fyll den når lastingen begynner, så opplesingen er sikker; fjern `aria-busy` og teksten når innholdet er der.
- Speil layouten som kommer: samme antall linjer (`lines`), samme sirkel (`size`), samme korthøyde (`height`).
- Bruk `width` på en enkelt linje for en overskrift eller et kort felt.

## Ikke gjør

- Ikke et skjelett uten en region som sier at den laster; da er det bare grå blokker.
- Ikke én statustekst per rad; én per region.
- Ikke et skjelett som er høyere eller lavere enn innholdet det står for.
- Ikke tekst inne i et skjelett; det er skjult for hjelpeteknologi.

## Eksempel

```jsx
import { Skeleton, Spinner } from 'sassy/components';

<section aria-busy={loading} aria-label="Oppskrift">
  <span className="s-sr-only" role="status">{loading ? 'Laster oppskriften' : ''}</span>
  {loading ? <Spinner size="sm" aria-hidden /> : null}
  {loading ? <Skeleton variant="rect" height={120} /> : <img src={photo} alt="" />}
  {loading ? <Skeleton lines={3} /> : <p>{text}</p>}
</section>

<div className="row">
  <Skeleton variant="circle" size={40} />
  <Skeleton lines={2} />
</div>
<Skeleton width="50%" />
```

## Props

Typene står i `dist/feedback/Skeleton.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/skeleton/).

<!-- props: SkeletonProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | `text` linjer i brødteksthøyde, `circle` (en avatar), `rect` (et bilde, et kort). |
| `lines` | `number` | `1` | Bare `text`: antall linjer. Den siste av flere er kortere, som et avsnitt. |
| `width` | `number \| string` | – | CSS-bredde. `text` og `rect` fyller beholderen som standard. |
| `height` | `number \| string` | – | Bare `rect`: CSS-høyde. Standard 96 px. |
| `size` | `number` | `40` | Bare `circle`: diameter i px. Standard 40. |
| `className` | `string` | – | Egne klasser på skjelettet. |
| `style` | `React.CSSProperties` | – | Egne stiler på skjelettet. |

Pluss alle attributtene til `<span>` (`React.HTMLAttributes<HTMLSpanElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i kilden i enhetstester.

- **Element og rolle.** Et `<span aria-hidden="true">` uten rolle; flere linjer er ett spenn med `aria-hidden` rundt linjene, så ingenting skjules dobbelt (testet). Skjelettet sier ingenting selv.
- **Mønsteret rundt.** Regionen som venter har `aria-busy="true"` og én tekst med `role="status"` (en `Spinner` med `label`, eller en `.s-sr-only`-linje). Testet: regionen har én statusregion, og den eneste teksten i den er statuslinja.
- **Tastatur og fokus.** Ingen; ikke fokuserbart, flytter ikke fokus.
- **Kontrast.** Blokkene er `--surface-3`, en flate, ikke et signal; ingen krav. Skimmeret er et bånd av `--surface-2` (tokens, ingen hex).
- **Bevegelse.** Skimmeret feier over hver 2,4 s. Under `prefers-reduced-motion` er det av, og blokkene står stille (WCAG 2.3.3, testet).
- **Former.** `text` er 0,9 em høy med 0,3 em luft, så linjene følger skriftstørrelsen rundt; den siste av flere er 60 % bred. `circle` er `size` px rund. `rect` er 96 px høy og fyller bredden til `height`/`width` sier noe annet (testet).
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Ingen `aria-busy` på egen hånd; regionen er appens. Ingen variant for en knapp eller et ikon: bruk `rect` med `width` og `height`.

## Innhold

- Statusteksten sier hva som kommer, i presens: «Laster oppskrifter», «Henter profilen».
- Én statustekst per region, ikke én per blokk.
- Engelske flater: «Loading recipes», «Loading the profile».
