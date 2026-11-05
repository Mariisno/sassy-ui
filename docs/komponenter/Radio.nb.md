---
navn: Radio
gruppe: controls
status: stable
sidenVersjon: 0.2.0
kort: components/controls/controls.card.html
typer: components/controls/Radio.d.ts
---

# Radio

En radioknapp for ett valg blant to til fem synlige alternativer. Et native `<input type="radio">` inni en `<label>`, med en rund boks som får en prikk i aksenten når den er valgt, og en valgfri `description` under teksten. Flere Radio med samme `name` er en gruppe, og nettleseren sørger for at bare én er valgt.

## Når du bruker den

- Ett valg blant få, der alle alternativene skal være synlige: «Privat / Offentlig», «Lett / Middels / Tung».
- Når alternativene trenger en forklarende linje hver (`description`).
- I et skjema som lagres med en knapp.

## Når du ikke bruker den

- Flere enn fem alternativer: [Select](Select.nb.md).
- To til fem korte svar som får plass på én rad: [SegmentedControl](SegmentedControl.nb.md), den samme radiogruppa i mindre høyde.
- Flere valg samtidig: [Checkbox](Checkbox.nb.md).
- Bytte visning eller filter, der valget virker med en gang: [Tabs](Tabs.nb.md) `variant="segmented"` eller [Tag](Tag.nb.md).
- Av eller på: [Switch](Switch.nb.md).

## Gjør

- Gi alle i gruppa samme `name` og en egen `value`.
- Ha ett alternativ valgt fra start (`defaultChecked`) når det finnes et fornuftig standardvalg.
- Pakk gruppa i en [Fieldset](Fieldset.nb.md) med `legend` som sier hva valget gjelder, så skjermleseren får spørsmålet; den gir også gruppa hjelpetekst og feil.
- Hold alternativene korte og parallelle: «Lett», «Middels», «Tung».

## Ikke gjør

- Ikke la en Radio stå alene. Ett alternativ er ingen gruppe; da er det en Checkbox eller en Switch.
- Ikke bland Radio og Checkbox i samme liste.
- Ikke bruk den til å navigere eller utløse noe med en gang.
- Ikke forklar i `label` det som hører hjemme i `description`.

## Eksempel

```jsx
import { Fieldset, Radio } from 'sussi/components';

<Fieldset legend="Hvem ser prosjektet?">
  <Radio name="synlighet" value="privat" label="Privat" description="Bare du" defaultChecked />
  <Radio name="synlighet" value="lenke" label="Alle med lenka" />
  <Radio name="synlighet" value="offentlig" label="Offentlig" description="Vises på profilen din" />
</Fieldset>
```

## Props

Typene står i `components/controls/Radio.d.ts`. Kortet: `components/controls/controls.card.html`.

<!-- props: RadioProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | Teksten ved siden av knappen. |
| `description` | `React.ReactNode` | – | En linje under teksten, i `--fg-3`. |

Pluss alle attributtene til `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), unntatt `type`.
<!-- /props -->

`ref` når det native `<input>`-elementet (`tests/refs.e2e.test.mjs`).

## Tilgjengelighet

- **Element og rolle.** Et native `<input type="radio">` inni `<label>`. Feltet er visuelt skjult; den runde boksen tegner tilstanden. Gruppa er nettleserens: samme `name`.
- **Navn.** Teksten i `label` og `description`, gjennom `<label>`. Spørsmålet gruppa svarer på må appen gi, i `legend` på [Fieldset](Fieldset.nb.md).
- **Tastatur.** Tab lander på det valgte alternativet (eller det første), piltastene flytter og velger innenfor gruppa, som i alle nettlesere. Ikke noe eget i komponenten.
- **Tilstand.** `checked` på feltet. Valgt fyller boksen med `--accent` og viser en prikk i `--accent-fg`. `disabled` gir 50 % gjennomsiktighet.
- **Fokus.** 2 px `outline` i `--focus-color` rundt boksen ved tastaturfokus.
- **Kontrast.** Kanten er `--border-control`, minst 3:1 mot flatene i begge temaer og alle aksenter (`tests/contrast.test.mjs`). Prikken er `--accent-fg` på `--accent`.
- **Bevegelse.** Prikken går over på `--dur-fast`, 0 under redusert bevegelse.
- **Mål.** Boksen er 18 px, klikkflaten hele etiketten. Kjent grense: under 44 px på berøringsskjerm, som Checkbox.
- **Innebygd tekst.** Ingen.

## Innhold

- Alternativene er korte substantiv eller adjektiv i samme form: «Privat», «Offentlig».
- Spørsmålet står i Fieldsets `legend`, som et spørsmål eller en setning: «Hvem ser prosjektet?»
- `description` sier konsekvensen, ikke en gjentakelse: «Bare du», «Vises på profilen din».
- Standardvalget er det tryggeste, ikke det mest ambisiøse.
