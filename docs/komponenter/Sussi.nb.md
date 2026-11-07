---
navn: Sussi
gruppe: mascot
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/sussi/
typer: dist/mascot/Sussi.d.ts
---

# Sussi

Maskoten, katten til designeren: hvit med svarte ører, maske, flekker på ryggen og hale, og rosa nese. Alltid svart og hvit, uansett appens aksent; fargene er `--sussi-*`-tokens, og mørkt tema gir henne en tynn lys glorie så de svarte delene ikke forsvinner. Seks positurer som inline SVG: `hode` (logo, favicon, avatar), `ligger`, `titter` (tomme tilstander), `sover` (laster), `strekk` (lek, 404) og `sitter` (velkommen). Dekorativ som standard; `title` gir henne et navn når hun bærer mening alene. `sussiPoses` gir SVG-markeringen per positur for favicons og statiske eksporter.

## Når du bruker den

- Et vennlig ansikt der det hjelper: en tom tilstand (`titter`, `ligger`), lasting (`sover`), en velkomst (`sitter`), en 404 (`strekk`).
- En avatar eller favicon (`hode`, leselig ned til 16 px).
- Sjelden. Én Sussi per skjerm er nok.

## Når du ikke bruker den

- Som logo. Ordmerket er navnet i ren tekst; Sussi er en figur.
- I appens aksentfarge eller andre farger. Hun er svart og hvit.
- Som ikon i knapper og menyer: [Icon](Icon.nb.md).
- Der et ikon alt sier det samme (en tom liste med ikon i [EmptyState](EmptyState.nb.md) trenger ikke en katt i tillegg).

## Gjør

- Bruk `hode` for små størrelser (16–28 px) og 32 px og oppover for hele kroppen.
- Gi `title` bare når hun er det eneste som sier noe: «Laster» på en side som ellers er tom.
- La henne stå ved siden av tekst som bærer meningen; da er hun pynt (`aria-hidden`).
- Velg positur etter situasjonen, og hold deg til én per situasjon i appen.

## Ikke gjør

- Ikke farg henne om, ikke speilvend, ikke tegn nye positurer uten eieren av systemet.
- Ikke animer henne. Hun er stille.
- Ikke `title` på en Sussi ved siden av en overskrift som alt sier det samme.
- Ikke bruk henne som knapp.

## Eksempel

```jsx
import { Sussi, sussiPoses } from 'sassy/components';

<Sussi pose="hode" size={28} />
<Sussi pose="titter" size={96} />
<Sussi pose="sover" size={48} title="Laster" />
const favicon = sussiPoses.hode().split('__ID__').join('favicon');
```

## Props

Typene står i `dist/mascot/Sussi.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/sussi/).

<!-- props: SussiProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `pose` | `SussiPose` | `'hode'` | Stillingen: hode, ligger, titter, sover, strekk, sitter. |
| `size` | `number` | `48` | Kvadrat i px. `hode` leses ned til 16; bruk 32 og oppover for hele kroppen. |
| `title` | `string` | – | Tilgjengelig navn. Utelat det når hun er pynt (det vanlige, ved siden av tekst). |

Pluss alle attributtene til `<svg>` (`React.SVGProps<SVGSVGElement>`), unntatt `dangerouslySetInnerHTML`.
<!-- /props -->

`sussiPoses` er et objekt med en funksjon per positur som gir SVG-markeringen som tekst, med `__ID__` der en unik id skal inn. `sussiPoseNames` er lista over positurnavnene.

## Tilgjengelighet

Oppførselen er testet i nettleseren.

- **Element og rolle.** Et `<svg class="s-sussi">`. Uten `title`: `aria-hidden="true"`, ingen rolle (testet for alle seks positurer). Med `title`: `role="img"` og et `<title>`-element.
- **Navn.** `title`, escapet før det settes inn i markeringen, så `<` og `&` blir tekst (testet).
- **Tastatur og fokus.** Ingen; hun er ikke interaktiv.
- **Unike id-er.** Hver instans får egne `clipPath`-id-er fra `useId`, så flere katter på én side ikke klipper hverandre (testet).
- **Kontrast.** Svart og hvit på enhver flate. I mørkt tema får hun en `drop-shadow`-glorie i `--sussi-halo` (testet), så de svarte delene vises mot mørk bakgrunn.
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** `hode` leses ned til 16 px; hele kroppen trenger 32 px eller mer.

## Innhold

- `title` er det hun gjør eller står for, kort: «Laster», «Ingenting her ennå».
- Hun snakker ikke. Teksten ved siden av gjør det, i samme rolige tone som resten.
- Ikke «Sussi sier …». Hun er en figur, ikke en stemme.
