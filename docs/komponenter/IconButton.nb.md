---
navn: IconButton
gruppe: buttons
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/iconbutton/
typer: dist/buttons/IconButton.d.ts
---

# IconButton

En kvadratisk knapp med bare et ikon, for verktøylinjer, handlinger på en rad og hjørnet av en dialog. `label` er påkrevd og blir både `aria-label` og `title`, så knappen alltid har et navn. Tre varianter (ghost, secondary, primary), tre størrelser (30, 38, 46 px) og `round` for flytende handlinger.

## Når du bruker den

- En handling hvis ikon alle kjenner: lukk (×), mer (…), søk, innstillinger, legg til.
- Der det ikke er plass til tekst: i en rad, i en toast, i toppen av en dialog.
- Flytende handling nederst på en telefonside, med `round` og `variant="primary"`.

## Når du ikke bruker den

- Når ikonet ikke er opplagt: bruk [Button](Button.nb.md) med `iconLeft` og tekst. Tekst ved siden av ikonet er regelen i Sassy, ikke unntaket.
- Den primære handlingen på en side: [Button](Button.nb.md). Et ikon alene bærer ikke så mye vekt.
- En fargeprikk som velges: [Swatch](Swatch.nb.md).

## Gjør

- Gi `label` det knappen gjør: «Lukk», «Mer», «Legg til oppgave». Det er hele navnet.
- Pakk den i en [Tooltip](Tooltip.nb.md) når meningen ikke er sikker. Tooltip fjerner `title`, så det blir bare én boble.
- Hold deg til ikonene i settet (`dist/icon/iconData.js`).
- Bruk `size="lg"` på berøringsskjerm; `md` er 38 px.

## Ikke gjør

- Ikke utelat `label`. Uten den er knappen taus for skjermleser.
- Ikke legg vekt på farge alene: `primary` er for den ene flytende handlingen, ikke for pynt.
- Ikke bruk to ulike ikoner for samme handling i samme app.
- Ikke sett tekst inni den. Da er det en Button.

## Eksempel

```jsx
import { IconButton, Tooltip } from 'sassy/components';

<IconButton icon="ellipsis" label="Mer" onClick={åpneMeny} />
<IconButton icon="plus" label="Legg til oppgave" variant="secondary" size="sm" onClick={nyOppgave} />
<Tooltip content="Søk" kbd="⌘K"><IconButton icon="search" label="Søk" onClick={søk} /></Tooltip>
<IconButton icon="arrow-up-right" label="Åpne" variant="primary" round />
```

## Props

Typene står i `dist/buttons/IconButton.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/iconbutton/).

<!-- props: IconButtonProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `icon` | `string` | *påkrevd* | Lucide-ikonnavn. |
| `label` | `string` | *påkrevd* | Tilgjengelig navn, påkrevd. Blir `aria-label` og `title`. |
| `variant` | `'ghost' \| 'secondary' \| 'primary'` | `'ghost'` | ghost (uten ramme), secondary (flate og kant), primary (aksentfyll). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 30 px, md 38 px, lg 46 px kvadrat. |
| `round` | `boolean` | `false` | Rund, for flytende handlinger. |

Pluss alle attributtene til `<button>` (`React.ButtonHTMLAttributes<HTMLButtonElement>`).
<!-- /props -->

`ref` når det native `<button>`-elementet (testet).

## Tilgjengelighet

- **Element og rolle.** Et native `<button type="button">`.
- **Navn.** `label` settes som `aria-label` og `title`. Ikonet er dekorativt (`aria-hidden`). Inne i en Tooltip fjernes `title`, og bobla kobles til knappen med `aria-describedby` (testet).
- **Tastatur.** Enter og mellomrom, som en vanlig knapp.
- **Fokus.** 2 px `outline` i `--focus-color` ved tastaturfokus, 3:1 mot flatene i begge temaer og alle aksenter.
- **Kontrast.** Ghost-varianten er `--fg-2` på gjennomsiktig og går til `--fg-1` på hover. `primary` har `--accent-fg` på `--accent`, 4,5:1 i alle aksenter. En `<a class="s-iconbtn">` er ikke understreket (0.5.6) og holder 4,5:1 på hover (testet).
- **Tilstand.** `disabled` på elementet, 50 % gjennomsiktig.
- **Bevegelse.** Overganger på `--dur-fast`, 0 under redusert bevegelse. Trykk flytter 1 px ned.
- **Mål.** 30, 38 og 46 px kvadrat. Bare `lg` når 44 px.
- **Innebygd tekst.** Ingen; `label` er appens.

## Innhold

- `label` er et verb eller det verbet peker på: «Lukk», «Mer», «Søk», «Innstillinger».
- Samme ord som i resten av appen. Heter det «Lukk» i dialogen, heter det «Lukk» her.
- Ikke «Klikk her for å …». Skjermleseren sier allerede «knapp».
- Tooltipen gjentar `label`, eventuelt med snarvei i `kbd`.
