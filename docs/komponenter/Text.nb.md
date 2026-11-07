---
navn: Text
gruppe: display
status: new
sidenVersjon: 0.11.0
side: https://mariisno.github.io/sassy-ui/komponenter/text/
typer: dist/display/Text.d.ts
---

# Text

Løpende tekst i typerollene: `size` er `body` (16 px, standard), `sm` (14 px), `lead` (18 px, ingressen under en sidetittel) eller `meta` (12 px DM Mono, én linje metadata); `tone` er `default` (fargen rundt, `--fg-1` på en side), `muted` (`--fg-2`) eller `subtle` (`--fg-3`); `mono` gir DM Mono i alle størrelser. En `<p>` som standard, et annet element med `as`. Alle tonene holder 4,5:1 på `--bg`, `--surface-1` og `--surface-2` i begge temaer og alle aksenter. Klassene `.s-text`, `.s-text--sm`, `.s-text--muted` og de andre gir det samme uten React.

## Når du bruker den

- Ingressen under en sidetittel: `size="lead"`.
- Sekundær tekst under en rad eller i et kort: `size="sm" tone="muted"`.
- Én linje metadata, som en dato eller et antall: `size="meta" tone="subtle"`.
- Tall og koder som skal stå i kolonne: `mono`.

## Når du ikke bruker den

- En overskrift: [Heading](Heading.nb.md).
- En lenke: [Link](Link.nb.md).
- En status med farge: [Badge](Badge.nb.md) eller [Alert](Alert.nb.md).
- Tekst som bare skal leses av skjermlesere: [VisuallyHidden](VisuallyHidden.nb.md).

## Gjør

- La brødteksten være `body`; `sm` og `meta` er for det som er mindre viktig.
- Bruk `muted` for sekundær tekst og `subtle` bare for metadata.
- Velg elementet etter innholdet: `as="span"` inne i en linje, `as="time"` med `dateTime` for en dato.
- La luft komme fra oppsettet ([Stack](Stack.nb.md)); teksten har ingen marg.

## Ikke gjør

- Ikke `subtle` på `--surface-3`; der holder bare `default` og `muted` 4,5:1.
- Ikke en tone som eneste bærer av mening; en feil er `error` på feltet, en status er en Badge.
- Ikke `meta` for setninger; den er 12 px og for én linje.
- Ikke `lead` på mer enn ett avsnitt per side.

## Eksempel

```jsx
import { Text, Heading, Stack } from 'sassy/components';

<Stack gap={2}>
  <Heading level={1}>Sådagbok</Heading>
  <Text size="lead">Alt du har sådd i år, uke for uke.</Text>
  <Text>Tomatene trenger vann hver morgen i juli.</Text>
  <Text size="sm" tone="muted">Sist vannet i går kveld.</Text>
  <Text as="time" size="meta" tone="subtle" dateTime="2026-11-05">5. nov. 2026</Text>
  <Text as="span" mono>12,5 m²</Text>
</Stack>
```

Uten React: `<p class="s-text s-text--sm s-text--muted">Sist vannet i går kveld.</p>`.

## Props

Typene står i `dist/display/Text.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/text/).

<!-- props: TextProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `as` | `'p' \| 'span' \| 'div' \| 'small' \| 'strong' \| 'em' \| 'label' \| 'li' \| 'figcaption' \| 'time'` | `'p'` | Elementet, standard `p`. `span` inne i en linje, `div` rundt blokker, `small`, `strong`, `em`, `label`, `li`, `figcaption` eller `time` der det er det teksten er. |
| `size` | `'body' \| 'sm' \| 'lead' \| 'meta'` | `'body'` | `body` (16 px, standard), `sm` (14 px), `lead` (18 px, ingressen under en sidetittel) eller `meta` (12 px DM Mono, én linje metadata som en dato eller et antall). |
| `tone` | `'default' \| 'muted' \| 'subtle'` | `'default'` | `default` beholder fargen rundt (`--fg-1` på en side), `muted` er `--fg-2` for sekundær tekst, `subtle` er `--fg-3` for metadata. Alle holder 4,5:1 på `--bg`, `--surface-1` og `--surface-2`; på `--surface-3` bruker du `default` eller `muted`. |
| `mono` | `boolean` | `false` | DM Mono i valgt størrelse, for tall og koder. `meta` er mono fra før. |
| `dateTime` | `string` | – | Med `as="time"`: datoen maskinlesbart, f.eks. «2026-11-05». |
| `htmlFor` | `string` | – | Med `as="label"`: id-en til kontrollen den navngir. |
| `children` | `React.ReactNode` | – | Teksten. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** Det `as` sier, `<p>` som standard. Ingen rolle legges til.
- **Navn.** Ingen; det er tekst.
- **Tastatur og fokus.** Ingen.
- **Kontrast.** `default` arver fargen rundt (`--fg-1` på en side, over 11:1). `muted` er `--fg-2` og `subtle` `--fg-3`; begge holder 4,5:1 på `--bg`, `--surface-1` og `--surface-2` i lyst og mørkt tema og alle seks aksentene, målt på tokenene og på den rendrede teksten (testet). På `--surface-3` holder `--fg-3` bare 4,06:1, så der bruker du `default` eller `muted`.
- **Størrelse.** `body` er 16 px med linjehøyde 1,5, `sm` 14 px, `lead` 18 px og `meta` 12 px DM Mono, alle typerollene. `overflow-wrap: anywhere`, så et langt ord brytes ved 320 px (testet).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** `meta` er 12 px; hold den til én linje metadata, ikke til tekst folk må lese.

## Innhold

- Én tanke per avsnitt; korte setninger.
- Ingressen sier hva sida er til, i én setning.
- Metadata er fakta, ikke setninger: «5. nov. 2026», «3 planter».
- Tall med norsk desimalkomma: «12,5 m²».
