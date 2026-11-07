---
navn: Heading
gruppe: display
status: new
sidenVersjon: 0.11.0
side: https://mariisno.github.io/sassy-ui/komponenter/heading/
typer: dist/display/Heading.d.ts
---

# Heading

En overskrift der nivå og utseende er to ting: `level` velger elementet, `<h1>` til `<h6>`, så sidas disposisjon blir riktig, og `size` velger utseendet fra typerollene (`display`, `h1`, `h2`, `h3`, `h4`), så en seksjon kan være en h2 som ser ut som en h3. Uten `size` følger utseendet nivået, det samme som base.css gir en bar `<h1>`–`<h4>`; h5 og h6 ser ut som h4. Klassene `.s-display` og `.s-h1`–`.s-h4` gir de samme utseendene uten React.

## Når du bruker den

- Tittelen på en side, og overskriftene på seksjonene under den.
- En overskrift som må ha et annet nivå enn den ser ut som: en h2 i et kort som skal se ut som en h3.
- En stor tittel på en landingsside: `size="display"`.
- Uten React: `<h2 class="s-h3">` gir samme utseende.

## Når du ikke bruker den

- Tekst som bare skal være stor eller fet, uten å være en overskrift: [Text](Text.nb.md) med `size="lead"`, eller `<strong>`.
- Tittelen i en Dialog, et Card eller en EmptyState: de har sin egen.
- Ledeteksten til et felt: `label` på [Input](Input.nb.md).

## Gjør

- Velg `level` etter disposisjonen: én h1 per side, og ingen hoppede nivåer på vei ned (h2 → h3, ikke h2 → h4).
- Bruk `size` når utseendet skal avvike fra nivået, ikke et annet nivå.
- La luft komme fra oppsettet ([Stack](Stack.nb.md) med `gap`); overskriften har ingen marg.
- Gi overskriften `tabIndex={-1}` og flytt fokus dit med ref-en etter et sidebytte i en enkeltsideapp.

## Ikke gjør

- Ikke velg nivå etter størrelse; en h4 fordi h2 er for stor bryter disposisjonen for skjermlesere.
- Ikke flere h1 på samme side.
- Ikke en overskrift uten tekst, eller bare med et ikon.
- Ikke `display` på mer enn én tittel per side; den er for forsider.

## Eksempel

```jsx
import { Heading, Text, Stack } from 'sassy/components';

<Stack gap={2}>
  <Heading level={1}>Sådagbok</Heading>
  <Text size="lead" tone="muted">Alt du har sådd i år, uke for uke.</Text>
</Stack>
<Heading level={2}>Denne uka</Heading>
<Heading level={3} size="h4">Vanning</Heading>
<Heading level={1} size="display">Hagen</Heading>
```

Uten React: `<h2 class="s-h3">Vanning</h2>`.

## Props

Typene står i `dist/display/Heading.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/heading/).

<!-- props: HeadingProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | *påkrevd* | Overskriftsnivået, 1–6: elementet er `<h1>`–`<h6>`. Følg sidas disposisjon: én h1, og ingen hoppede nivåer på vei ned. |
| `size` | `HeadingSize` | – | Utseendet, når det skal avvike fra nivået: `display`, `h1`, `h2`, `h3` eller `h4`. Standard: nivåets eget (h5 og h6 ser ut som h4). |
| `children` | `React.ReactNode` | – | Overskriftsteksten. |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLHeadingElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** `<h1>`–`<h6>` etter `level`, så rollen er heading og nivået det elementet sier (testet for alle seks). Et nivå utenfor 1–6 blir det nærmeste; uten et gyldig tall blir det h2.
- **Navn.** Teksten i overskriften.
- **Tastatur og fokus.** Ingen; overskriften er ikke i tabrekka. Med `tabIndex={-1}` kan en app flytte fokus dit (ref-en når elementet).
- **Kontrast.** `--fg-1` på `--bg`, `--surface-1`, `--surface-2` og `--surface-3`, over 11:1 i begge temaer og alle aksenter.
- **Størrelse og bryting.** Utseendet er typerollene `--type-display`, `--type-h1`, `--type-h2` og `--type-h3`, og h4-regelen fra base.css (16 px halvfet), og følger nettleserens zoom. `text-wrap: balance` og `overflow-wrap: anywhere`, så et langt ord brytes i stedet for å flyte ut ved 320 px (testet).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen.
- **Kjente grenser.** Tokenene er i px, så nettleserens minste skriftstørrelse virker, men ikke en endret standard skriftstørrelse; zoom virker.

## Innhold

- Kort og konkret: «Denne uka», ikke «Oversikt over alt som skjedde denne uka».
- Stor forbokstav bare i første ord: «Planter i drivhuset».
- Ingen punktum på slutten, og ikke kolon.
- Overskriften sier hva seksjonen inneholder, så en som hopper mellom overskrifter vet hvor de er.
