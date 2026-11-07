---
navn: EmptyState
gruppe: feedback
status: stable
sidenVersjon: 0.4.0
side: https://mariisno.github.io/sassy-ui/komponenter/emptystate/
typer: dist/feedback/EmptyState.d.ts
---

# EmptyState

Det en liste eller en side viser når det ikke er noe i den ennå. Et ikon i en 56 px myk aksentsirkel, en overskrift, én rolig linje om hva du kan gjøre, og høyst én handling, som regel en [Button](Button.nb.md). Sentrert, med teksten begrenset til 30 tegn i bredden. Overskriftsnivået velger sida (`level`, standard h2), og `framed` tegner den som et kort når den står blant andre kort.

## Når du bruker den

- En liste uten innhold ennå: første gang, eller etter at alt er fjernet.
- Et søk eller filter uten treff.
- En side som venter på noe utenfra: frakoblet, ingen tilgang.

## Når du ikke bruker den

- Mens noe laster: en [Progress](Progress.nb.md) uten verdi, eller Sussi i `sover`-positur.
- En feil som har skjedd: en feilmelding i konteksten, eller en [Toast](Toast.nb.md) med `danger`.
- En kort melding inni et kort som ellers har innhold: tekst.

## Gjør

- Si hva som er tomt og hva som er neste steg: «Ingen oppgaver ennå» + «Legg til den første, så dukker den opp her.»
- Tilby én handling, og bare når det finnes et tydelig neste steg. Et filter uten treff tilbyr å fjerne filteret, ikke å legge til.
- Velg `level` etter sidas disposisjon: h2 under sidas h1, h3 inne i en seksjon.
- Bruk `framed` blant kort, uten ramme når den fyller sida.

## Ikke gjør

- Ikke «Oops», ikke utropstegn, ikke skyld. En tom liste er ikke en feil.
- Ikke to handlinger. Den andre hører hjemme i menyen.
- Ikke lang tekst; `description` er én linje.
- Ikke et illustrasjonsbilde som bærer mening. Ikonet er dekorativt; overskriften bærer meningen.

## Eksempel

```jsx
import { EmptyState, Button } from 'sassy/components';

<EmptyState icon="inbox" title="Ingen oppgaver ennå" description="Legg til den første, så dukker den opp her."
  action={<Button iconLeft="plus" onClick={nyOppgave}>Legg til oppgave</Button>} />
<EmptyState icon="search" title="Ingen treff" description="Prøv et kortere ord, eller fjern et filter." level={3} />
<EmptyState framed icon="info" title="Du er frakoblet" description="Det du gjør nå, lagres når nettet er tilbake." />
```

## Props

Typene står i `dist/feedback/EmptyState.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/emptystate/).

<!-- props: EmptyStateProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `icon` | `string` | – | Lucide-ikonnavn i en 56 px myk aksentsirkel. Dekorativt. |
| `title` | `React.ReactNode` | *påkrevd* | Overskriften, f.eks. «Ingen oppgaver ennå». |
| `description` | `React.ReactNode` | – | Én linje om hva du kan gjøre, f.eks. «Legg til den første, så dukker den opp her.» |
| `action` | `React.ReactNode` | – | Én handling, som regel en Button. |
| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `2` | Overskriftsnivå, 2–6. Velg det som passer i sidas disposisjon. |
| `framed` | `boolean` | `false` | Tegn den som et kort (surface-1, kant, radius). Uten ligger den rett på sida. |
| `children` | `React.ReactNode` | – | Mer innhold mellom teksten og handlingen, f.eks. en metalinje til. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `title`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren.

- **Element og rolle.** En `<div>` uten rolle, med en ekte overskrift (`<h2>` til `<h6>` etter `level`, begrenset til 2–6) og et `<p>` for `description`.
- **Navn.** Overskriften er det skjermleseren finner i disposisjonen. Ikonet er `aria-hidden` (testet).
- **Tastatur og fokus.** Ingen egne. Handlingen i `action` er en vanlig Button med sin egen fokusring.
- **Kontrast.** Overskriften er `--fg-1`, teksten `--fg-2`, begge 4,5:1 på `--bg` og `--surface-1`. Ikonet er `--accent-soft-fg` på `--accent-soft`, 4,5:1 i alle aksenter (testet).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** Ingen; overskrift og tekst er appens.
- **Kjent grense.** `level` under 2 rundes opp til 2: en EmptyState er aldri sidas h1.

## Innhold

- Overskriften sier hva som mangler, i presens: «Ingen oppgaver ennå», «Ingen treff».
- «ennå» når det kommer noe senere; ikke når søket bare var tomt.
- `description` er ett neste steg, i du-form eller uten subjekt: «Legg til den første, så dukker den opp her.»
- Handlingen gjentar verbet: «Legg til oppgave».
- Lavt trykk. Ikke «Kom i gang nå!», ikke «Du har ikke gjort noe ennå».
