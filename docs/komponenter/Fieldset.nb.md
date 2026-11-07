---
navn: Fieldset
gruppe: inputs
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/fieldset/
typer: dist/inputs/Fieldset.d.ts
---

# Fieldset

En gruppe kontroller som hører sammen, først og fremst en radio- eller avkrysningsgruppe: et native `<fieldset>` med en `<legend>` som gir gruppa navn, en valgfri hjelpetekst under legenden og en feil under kontrollene, begge koblet til gruppa med `aria-describedby`. Feilen har ikon og tekst og leses opp (`role="alert"`), så fargen aldri er det eneste signalet; gruppa får også en `--danger`-kant til venstre. Barna er de eksisterende [Radio](Radio.nb.md), [Checkbox](Checkbox.nb.md) og [Switch](Switch.nb.md), uendret.

## Når du bruker den

- Et spørsmål med ett svar blant få: en radiogruppe. Spørsmålet står i `legend`.
- Flere valg som hører til samme spørsmål: en avkrysningsgruppe («Hvilke dager vanner du?»).
- Gruppa trenger en felles hjelpetekst eller en felles feil («Velg minst én dag»).
- Noen få brytere som hører sammen, med `layout="row"`.

## Når du ikke bruker den

- Én avkrysningsboks alene: [Checkbox](Checkbox.nb.md) med `label` er nok.
- Et tekstfelt: [Input](Input.nb.md) har ledetekst, hjelpetekst og feil selv; `Field` for din egen kontroll.
- Som en layoutboks rundt felt som ikke hører sammen. Et `<fieldset>` sier «disse svarer på samme spørsmål».
- Et valg blant mange: [Select](Select.nb.md).

## Gjør

- Gi alltid `legend`, som et spørsmål eller en setning: «Hvor mye sol får stedet?». Den er gruppas navn.
- Gi radioene samme `name`, så piltastene virker innenfor gruppa.
- Skriv feilen som det som må gjøres: «Velg minst én dag.» Samme tekst i ErrorSummary.
- Gi gruppa en `id` når en [ErrorSummary](ErrorSummary.nb.md) lenker til den: fokus lander på første kontroll i gruppa.
- Bruk `layout="row"` bare for to–tre korte alternativer; ellers stabler de.

## Ikke gjør

- Ikke sett `aria-invalid` på gruppa selv; ARIA tillater det ikke på en gruppe. Sett det på kontrollene om appen vil.
- Ikke gjenta spørsmålet i hver `label`; legenden sier det én gang.
- Ikke en feil per boks i gruppa. Feilen gjelder gruppa og står under den.
- Ikke `disabled` på gruppa som «ikke tilgjengelig ennå» uten å si det i `hint`.

## Eksempel

```jsx
import { Fieldset, Radio, Checkbox } from 'sassy/components';

<Fieldset legend="Hvor mye sol får stedet?" hint="Målt midt på dagen.">
  <Radio name="sol" value="full" label="Full sol" description="Seks timer eller mer" />
  <Radio name="sol" value="halv" label="Halvskygge" />
  <Radio name="sol" value="skygge" label="Skygge" />
</Fieldset>

<Fieldset id="dager" legend="Hvilke dager vanner du?" error={dagFeil} layout="row">
  <Checkbox name="dag" value="man" label="Mandag" checked={dager.has('man')} onChange={velg} />
  <Checkbox name="dag" value="tor" label="Torsdag" checked={dager.has('tor')} onChange={velg} />
</Fieldset>
```

## Props

Typene står i `dist/inputs/Fieldset.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/fieldset/).

<!-- props: FieldsetProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `legend` | `React.ReactNode` | *påkrevd* | Spørsmålet eller navnet på gruppa, i `<legend>`: «Hvor mye sol får stedet?» |
| `hint` | `React.ReactNode` | – | Én linje under legenden, f.eks. «Velg alle som passer.» Koblet med `aria-describedby`. Skjult mens det er en feil. |
| `error` | `React.ReactNode` | – | Feilen under kontrollene, med ikon: «Velg minst én dag.» Erstatter hjelpeteksten, leses opp og gir gruppa en farekant. `aria-invalid` settes ikke på gruppa (ARIA tillater det ikke der); sett det på kontrollene om appen vil. |
| `optional` | `boolean` | – | Legger et stille «Valgfritt» etter legenden. |
| `optionalLabel` | `string` | `'Valgfritt'` | Teksten på valgfri-merket. Engelske flater sender «optional». |
| `layout` | `'column' \| 'row'` | `'column'` | `column` (standard) stabler kontrollene; `row` legger dem ved siden av hverandre med bryting, for to–tre korte alternativer. |
| `children` | `React.ReactNode` | – | Kontrollene: Radio, Checkbox eller Switch, med felles `name` for radioer. |

Pluss alle attributtene til `<fieldset>` (`React.FieldsetHTMLAttributes<HTMLFieldSetElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** Et native `<fieldset>` (rolle `group`) med `<legend>`. Nettleseren gir gruppa navn fra legenden, og en skjermleser sier navnet når fokus går inn i gruppa.
- **Navn.** Teksten i `legend`, pluss «Valgfritt» når `optional` er satt. Kontrollene har sine egne navn fra `label`.
- **Beskrivelse.** `hint`, eller `error` når det er en, får id `<id>-hint`, og gruppa peker på den med `aria-describedby` (pluss det appen selv sender, testet). Feilen erstatter hjelpeteksten, som i Field.
- **Feil.** Feilen er tekst med et `circle-alert`-ikon foran (`aria-hidden`) i `--danger-fg`, og `role="alert"`, så den leses når den kommer (WCAG 3.3.1, 4.1.3). Gruppa får en 3 px `--danger`-kant til venstre (≥ 3:1 mot `--bg` i begge temaer). Ikon, tekst og kant: fargen er aldri alene (1.4.1). `aria-invalid` settes ikke på gruppa (ikke tillatt på `group`); appen kan sette det på kontrollene.
- **Tastatur.** Ingenting eget. Radioene flyttes med piltastene, boksene med Tab og mellomrom, som ellers. `disabled` på gruppa slår av alle kontrollene i den (native) og dimmer dem.
- **Fokus.** Kontrollenes egen ring. Lenker en ErrorSummary til gruppas `id`, flyttes fokus til første kontroll (testet).
- **Kontrast.** Legenden er `--fg-1`, hjelpeteksten `--fg-3`, feilen `--danger-fg`, de samme parene som Field (testet).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** «Valgfritt» ved `optional`. Overstyr med `optionalLabel`.
- **Kjente grenser.** Klikkflaten per alternativ er etikettens høyde (omtrent 22 px), som Checkbox og Radio; gi radene luft i en liste for fingre. Når flere felt får feil samtidig ved en innsending, monteres flere `role="alert"` på én gang, og det er ikke sikkert at alle leses; fokuset på [ErrorSummary](ErrorSummary.nb.md) er det pålitelige signalet. VoiceOver leser ikke `aria-describedby` på en gruppe, og leser legenden først når fokus går inn i første kontroll; feilteksten står derfor også som vanlig tekst under kontrollene.

## Innhold

- `legend` er spørsmålet gruppa svarer på: «Hvor mye sol får stedet?», «Hvilke dager vanner du?».
- `hint` er én linje om hvordan en svarer: «Velg alle som passer.», «Målt midt på dagen.»
- `error` sier hva som må gjøres, med punktum: «Velg minst én dag.», «Velg hvor mye sol stedet får.»
- Alternativene er korte og i samme form: «Full sol», «Halvskygge», «Skygge».
