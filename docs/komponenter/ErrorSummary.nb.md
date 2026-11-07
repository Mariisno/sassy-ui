---
navn: ErrorSummary
gruppe: feedback
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/errorsummary/
typer: dist/feedback/ErrorSummary.d.ts
---

# ErrorSummary

Boksen øverst i et skjema etter en mislykket innsending, slik GOV.UK og Designsystemet gjør det: en tittel, en valgfri linje og én lenke per felt med feil. Den tar fokus når den kommer, så folk hører hva som gikk galt og siden ruller dit; hver lenke flytter fokus til feltet sitt, eller til første kontroll i en [Fieldset](Fieldset.nb.md). Appen eier lista: monter boksen når innsendingen feiler, fjern den når skjemaet er gyldig.

## Når du bruker den

- Et skjema med flere felt der innsendingen stoppet på feil, særlig når feltene ikke får plass på én skjerm.
- Skjemaet valideres ved innsending, ikke mens en skriver.
- Feilene står også under feltene (`error` på Input, Fieldset): boksen er inngangen til dem, ikke erstatningen.

## Når du ikke bruker den

- Én feil i ett felt som er synlig: `error` på [Input](Input.nb.md) eller [Fieldset](Fieldset.nb.md) alene.
- En feil som gjelder hele skjemaet og ikke noe felt («Nettet forsvant»): en [Toast](Toast.nb.md) eller en melding over knappen.
- Noe som må besvares før en kan gå videre: [Dialog](Dialog.nb.md).

## Gjør

- Monter boksen over første felt når innsendingen feiler, og fjern den når skjemaet er gyldig.
- Gi den en ny `key` (en teller på innsendinger) ved neste mislykkede forsøk, så fokus flyttes dit igjen.
- Én oppføring per felt, i skjemaets rekkefølge, med feltets `id` og samme tekst som under feltet.
- Pek på `id` til Fieldset for en radio- eller avkrysningsgruppe: fokus lander på første kontroll i gruppa.
- Velg `level` etter sidens overskriftsnivåer; standard er `h2`.

## Ikke gjør

- Ikke la boksen stå når feilene er rettet, og ikke oppdater lista mens en skriver.
- Ikke lenk til noe som ikke finnes på siden; da blir lenka et vanlig ankerhopp.
- Ikke en annen tekst i boksen enn under feltet. Det er samme feil.
- Ikke `autoFocus={false}` uten å si fra på en annen måte: uten fokus og uten `role` sier boksen ingenting.

## Eksempel

```jsx
import { ErrorSummary, Input, Fieldset, Radio, Button } from 'sassy/components';

const [feil, setFeil] = useState([]);
const [forsok, setForsok] = useState(0);
const send = (e) => {
  e.preventDefault();
  const funnet = [];
  if (!navn.trim()) funnet.push({ id: 'navn', message: 'Skriv navnet på planten.' });
  if (!sol) funnet.push({ id: 'sol', message: 'Velg hvor mye sol stedet får.' });
  setFeil(funnet);
  setForsok(forsok + 1);
};
const feilFor = (id) => feil.find((f) => f.id === id)?.message;

<form onSubmit={send} noValidate>
  {feil.length > 0 && <ErrorSummary key={forsok} errors={feil}>Rett feilene under, så kan du lagre.</ErrorSummary>}
  <Input id="navn" label="Navn på planten" value={navn} onChange={(e) => setNavn(e.target.value)} error={feilFor('navn')} />
  <Fieldset id="sol" legend="Hvor mye sol får stedet?" error={feilFor('sol')}>
    <Radio name="sol" value="full" label="Full sol" checked={sol === 'full'} onChange={() => setSol('full')} />
    <Radio name="sol" value="skygge" label="Skygge" checked={sol === 'skygge'} onChange={() => setSol('skygge')} />
  </Fieldset>
  <Button type="submit">Lagre</Button>
</form>
```

## Props

Typene står i `dist/feedback/ErrorSummary.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/errorsummary/).

<!-- props: ErrorSummaryProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | `'Noe må rettes før du kan gå videre'` | Overskriften. Standard «Noe må rettes før du kan gå videre»; engelske flater sender «Something needs fixing before you go on». |
| `errors` | `ErrorSummaryItem[]` | `[]` | Feltene med feil, i skjemaets rekkefølge. |
| `autoFocus` | `boolean` | `true` | Flytt fokus til boksen når den monteres. Gi boksen en ny `key` ved neste mislykkede innsending, så fokus flyttes igjen. |
| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `2` | Overskriftsnivå på tittelen, 2–6. Velg det som passer i sidas disposisjon. |
| `children` | `React.ReactNode` | – | Én linje under tittelen, f.eks. «Rett feilene under, så kan du lagre.» |

Pluss alle attributtene til elementet den rendres som (`React.HTMLAttributes<HTMLElement>`), unntatt `title`.
<!-- /props -->

Hver oppføring i `errors`:

<!-- props: ErrorSummaryItem -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `id` | `string` | – | `id` til kontrollen, eller til Fieldset når feilen gjelder en gruppe. Uten blir meldingen ren tekst, ikke en lenke. |
| `message` | `React.ReactNode` | *påkrevd* | Samme melding som under feltet: «Skriv navnet på planten.» |
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, fargereglene i enhetstester.

- **Element og rolle.** En `<section tabIndex={-1}>` med `aria-labelledby` til tittelen (en region med navn). Innholdet står i en `<div role="alert">`, så det leses også der fokus på en region bare leser navnet. Det er GOV.UKs mønster.
- **Navn.** Tittelen, `h2` som standard (`level`), med et `circle-alert`-ikon foran som er `aria-hidden`.
- **Fokus.** Boksen får fokus når den monteres (`autoFocus`, testet: fokus flytter fra knappen til boksen). Ringen vises på `:focus`, ikke bare `:focus-visible`, så den synes etter et museklikk på knappen også. Lenkene er vanlige `<a href="#id">`; ved klikk flyttes fokus til elementet med den id-en, eller til første kontroll i det når det er en Fieldset, og gruppas legend rulles inn (testet begge). Finnes ikke elementet, skjer det vanlige ankerhoppet.
- **Tastatur.** Tab fra boksen går til første lenke, så videre i dokumentet. Enter på en lenke er klikket.
- **Kontrast.** Kanten er `--danger`, ≥ 3:1 mot `--bg` i begge temaer og alle aksenter (1.4.11). Lenkene og ikonet er `--danger-fg` på `--surface-1`, ≥ 4,5:1 i begge temaer og alle aksenter (testet på tokenparene og de renderte fargene). Lenkene er understreket, så fargen ikke er alene.
- **Bredde.** Flex-kolonne med vanlig tekstbryting; ingenting flyter over på 320 px (testet).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** «Noe må rettes før du kan gå videre» som tittel. Overstyr med `title`.
- **Kjente grenser.** Boksen leses to ganger av enkelte skjermlesere (fokus og alert), som hos GOV.UK. Ved en mislykket innsending monteres feltenes egne `role="alert"` samtidig med boksen, og det er ikke sikkert at alle leses; fokuset på boksen er det pålitelige signalet, og derfor er det boksen som tar det. VoiceOver leser ikke `aria-describedby` på en Fieldset og leser legenden først når fokus går inn i første kontroll, så lenka til en gruppe lander på den kontrollen. `scrollIntoView` ruller bare når legenden er utenfor skjermen.

## Innhold

- Tittelen sier at noe må rettes, ikke at folk gjorde feil: «Noe må rettes før du kan gå videre».
- Linjen under er valgfri og sier hva som skjer etterpå: «Rett feilene under, så kan du lagre.»
- Hver lenke er feltets feiltekst, ordrett: «Skriv navnet på planten.», «Velg hvor mye sol stedet får.»
- Ingen utropstegn, ingen «Feil!»; se ordlista i `docs/innhold.nb.md`.
