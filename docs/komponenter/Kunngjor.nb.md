---
navn: Kunngjor
gruppe: utils
status: new
sidenVersjon: 0.11.0
side: https://mariisno.github.io/sassy-ui/komponenter/kunngjor/
typer: dist/utils/kunngjor.d.ts
---

# Kunngjor

`kunngjor(melding, { haster })` sier noe til en skjermleser som ikke har en plass på skjermen som tekst: «Lagret», «3 planter funnet», «Raden er flyttet ned». En funksjon uten rammeverk og uten avhengigheter, trygg å importere på en server: ingenting rører dokumentet før første kall. Meldingen går gjennom en liveregion som lages første gang den trengs, er visuelt skjult og blir stående i sida: én høflig (`role="status"`), og én som haster (`role="alert"`) første gang `haster` brukes. Hvert kall tømmer regionen og skriver meldingen et øyeblikk etter, så samme melding to ganger leses to ganger.

## Når du bruker den

- Når noe skjer uten at noe synlig endrer seg der fokus er: et filter som oppdaterte en liste («3 planter funnet»), en rad som flyttet seg, en lagring i bakgrunnen.
- Etter en handling med tastaturet der resultatet er et annet sted på sida.
- Når appen selv har et statusfelt som oppdateres ofte, og bare sluttresultatet skal leses.

## Når du ikke bruker den

- Når meldingen skal ses også: [Toast](Toast.nb.md) i en `ToastStack` (som er sin egen liveregion) eller [Alert](Alert.nb.md).
- En feil i et felt: `error` på [Input](Input.nb.md) leses av seg selv.
- Feilene i et skjema etter innsending: [ErrorSummary](ErrorSummary.nb.md) tar fokus.
- Antall tegn i et felt: `count` på Input og Textarea har sin egen, forsinkede opplesning.

## Gjør

- Si resultatet, kort: «3 planter funnet», ikke «Søket ditt er nå fullført og ga 3 treff».
- La meldingene være høflige; bruk `haster` bare for det som ikke kan vente, som et brudd i nettet.
- Kall den etter at endringen er gjort, ikke før.
- Send én melding per hendelse; kall som kommer tett leses samlet.

## Ikke gjør

- Ikke kunngjør hvert tastetrykk eller hver rad i en liste; vent til brukeren stopper (debounce) og si totalen.
- Ikke bruk den i stedet for synlig tekst når seende også trenger beskjeden.
- Ikke `haster` for bekreftelser som «Lagret»; den avbryter det som leses.
- Ikke lag en egen liveregion ved siden av for det samme; den nye er ofte tom når den leses.

## Eksempel

```jsx
import { kunngjor, Input } from 'sassy/components';

function Planteliste({ planter }) {
  const [sok, setSok] = useState('');
  const treff = planter.filter((p) => p.navn.toLowerCase().includes(sok.toLowerCase()));
  useEffect(() => {
    if (!sok) return;
    const t = setTimeout(() => kunngjor(`${treff.length} planter funnet`), 500);
    return () => clearTimeout(t);
  }, [sok, treff.length]);
  return <Input label="Søk i planter" mode="search" value={sok} onChange={(e) => setSok(e.target.value)} />;
}

kunngjor('Mistet nettet. Vi lagrer når det er tilbake.', { haster: true });
```

## Props

Typene står i `dist/utils/kunngjor.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/kunngjor/).

`kunngjor(melding: string, valg?: KunngjorValg): void`. En tom melding, eller et kall uten dokument (på en server), gjør ingenting.

<!-- props: KunngjorValg -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `haster` | `boolean` | – | `true` leser meldingen med en gang og avbryter det som leses (en påtrengende region, `role="alert"`). Bare for det som ikke kan vente: et brudd i nettet, en lagring som feilet. Standard false: høflig, etter det som leses. |
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, og at den er trygg uten dokument, i enhetstester.

- **Element og rolle.** En `<div>` med `role="status"`, `aria-live="polite"` og `aria-atomic="true"`; med `haster` en egen med `role="alert"` og `aria-live="assertive"`. Begge lages ved første kall av sitt slag (ikke ved import) og blir stående, så regionen er i sida før den endres neste gang. Første gang venter den 500 ms før den skriver, så skjermleseren har sett den tomme regionen.
- **Gjentakelse.** Hvert kall tømmer regionen og skriver meldingen 100 ms etter; samme melding to ganger leses to ganger (testet). Kall innenfor de 100 ms leses sammen, i rekkefølge. Teksten fjernes etter 7 sekunder, så den ikke ligger igjen for den som blar i sida.
- **Modale dialoger.** Mens en modal dialog er åpen (`<dialog>` åpnet som modal, eller `aria-modal="true"` som Sassys Dialog), flyttes regionen inn i den innerste: en skjermleser behandler alt utenfor som borte, liveregioner også (testet). Lukkes dialogen før meldingen er skrevet (lagre i en dialog, kunngjør «Lagret», lukk), flyttes regionen tilbake til `<body>` og meldingen skrives der etter en ny pause på 500 ms (testet). En skjult dialog med `aria-modal` teller ikke.
- **Synlighet.** 1 × 1 px og klippet, aldri `display:none`, med stilen satt på elementet, så den virker også uten Sassys CSS.
- **Fokus.** Flyttes aldri.
- **Innebygd tekst.** Ingen; meldingen er appens.
- **Kjente grenser.** Hvordan og når en melding leses, bestemmer skjermleseren. En høflig melding kan bli lest etter det som leses nå, eller slått sammen med den; en som haster avbryter.

## Innhold

- Resultatet, ikke prosessen: «Lagret», «3 planter funnet», «Raden er nå nummer 2 av 5».
- Én kort setning. Ingen «Vellykket!», ingen emoji.
- Samme ord som på skjermen, så den som ser og den som hører får samme beskjed.
- På engelsk det samme: «Saved», «3 plants found».
