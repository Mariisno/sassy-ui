---
navn: Icon
gruppe: icon
status: stable
sidenVersjon: 0.2.0
kort: components/icon/icon.card.html
typer: components/icon/Icon.d.ts
---

# Icon

Et Lucide-ikon tegnet inline som SVG, så det arver `currentColor` og Sussis strekbredde 1,75 (mykere enn Lucides 2). Settet er 101 ikoner i `components/icon/iconData.js`: 100 fra Lucide og ett tegnet for Sussi (`yarn`, et garnnøste). Dekorativt som standard (`aria-hidden`); med `title` blir det et bilde med navn. Et navn som ikke finnes i settet rendrer ingenting.

## Når du bruker den

- Hvert glyf i et Sussi-grensesnitt: i knapper, menyer, rader, tomme tilstander.
- Et ikon som bærer mening alene (en statuskolonne uten tekst): med `title`.
- 16 px i tette rader og knapper, 18 px (standard) ved 14 px tekst, 20–24 px alene eller i et kort.

## Når du ikke bruker den

- Emoji: aldri i Sussi-grensesnitt. Bruk et ikon fra settet.
- En illustrasjon eller et bilde: det er ikke et ikon.
- Maskoten: [Sussi](Sussi.nb.md).
- Et ikon som ikke finnes i settet: hent det fra Lucide og legg det i både `iconData.js` og `assets/icons/` først. Et ukjent navn rendrer ingenting, og `tests/icon-names.test.mjs` passer på kortene og promptene.

## Gjør

- Sett et ikon ved siden av tekst, ikke i stedet for tekst, i navigasjon og knapper.
- La fargen arves: `--fg-2` eller `--fg-3` som regel, `--accent-text` for et sjeldent framhevet ikon.
- Gi `title` bare når ikonet sier noe teksten ved siden av ikke sier.
- Bruk samme ikon for samme ting over hele appen.

## Ikke gjør

- Ikke fyll ikonet eller bruk flere farger. Settet er strek, én farge.
- Ikke `title` på et ikon ved siden av en tekst som sier det samme; da leses det dobbelt.
- Ikke skaler med CSS; sett `size`.
- Ikke en ikonfont eller et annet sett ved siden av.

## Eksempel

```jsx
import { Icon } from 'sussi/components';

<Icon name="leaf" />
<Icon name="check" size={16} style={{ color: 'var(--success)' }} />
<Icon name="circle-alert" size={20} title="Trenger gjennomgang" />
<Icon name="yarn" size={24} strokeWidth={2} />
```

## Props

Typene står i `components/icon/Icon.d.ts`. Kortet med hele settet: `components/icon/icon.card.html`.

<!-- props: IconProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `name` | `string` | *påkrevd* | Lucide-ikonnavn, f.eks. «house», «check», «chevron-down». Hele settet står i components/icon/iconData.js. |
| `size` | `number` | `18` | Størrelse i px. 16 i tette rader, 18 standard, 20–24 alene. |
| `strokeWidth` | `number` | `1.75` | Strekbredde. Sussi bruker 1.75 (mykere enn Lucides 2). |
| `title` | `string` | – | Tilgjengelig navn. Utelat den for dekorative ikoner. |

Pluss alle attributtene til `<svg>` (`React.SVGProps<SVGSVGElement>`), unntatt `name`.
<!-- /props -->

## Tilgjengelighet

- **Element og rolle.** Et `<svg>` med `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`. Uten `title`: `aria-hidden="true"`, ingen rolle. Med `title`: `role="img"` og et `<title>`-element inni.
- **Navn.** `title`. Teksten settes inn i rå SVG-markering, så den escapes; et prosjektnavn med `<` eller `&` fra en bruker blir tekst, ikke markering (testet i `tests/icon.e2e.test.mjs`).
- **Tastatur og fokus.** Ingen; ikonet er ikke interaktivt. I en knapp er det knappen som har fokus.
- **Kontrast.** Ikonet er `currentColor`. Ved siden av tekst følger det tekstens farge og kontrast. Alene som informasjon (et statusikon) gjelder 3:1 for grafikk; det er appens valg av farge.
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjent grense.** Et navn som ikke finnes gir `null`, ingen advarsel i nettleseren. Testen `tests/icon-names.test.mjs` fanger det i kort og prompter, ikke i en app som bruker Sussi.

## Innhold

- `title` er et substantiv eller en kort tilstand: «Trenger gjennomgang», «Ferdig», «Nytt».
- Ikke «ikon» i `title`; skjermleseren sier «bilde».
- Ikonet trenger ingen tekst når det står i en [IconButton](IconButton.nb.md) (knappen har `label`) eller ved siden av tekst.
