---
navn: NyVersjon
gruppe: feedback
status: new
sidenVersjon: 0.5.7
kort: components/feedback/nyversjon.card.html
typer: components/feedback/NyVersjon.d.ts
---

# NyVersjon

«Ny versjon»: varselet om at en ny versjon av appen er klar. En toast bygd av [Toast](Toast.nb.md) sine deler, med «Oppdater» og den stillere «Senere», lest opp høflig fra en liveregion uten å flytte fokus. Som standard rendrer den sin egen `ToastStack` fra start, så regionen finnes før toasten kommer; åpne den med `open`. Oppdagelsen er appens, med hjelperen i `components/feedback/oppdatering.js`: `startOppdatering`, `vedNyVersjon`, `oppdater` og `erOpptatt`.

## Når du bruker den

- En app med service worker, der en ny versjon venter mens du holder på med noe.
- Sammen med `startOppdatering`: den laster på nytt av seg selv når du ikke er midt i noe, og sier fra gjennom `vedNyVersjon` når du er det.
- Med `updating` mens appen venter på at en lagring blir ferdig før den laster på nytt.

## Når du ikke bruker den

- En vanlig beskjed eller «Angre»: [Toast](Toast.nb.md).
- En oppdatering som krever et valg med konsekvenser (data slettes): [Dialog](Dialog.nb.md).
- En app uten service worker: det finnes ingen ny versjon å varsle om.

## Gjør

- Hold komponenten montert fra start og styr den med `open`. Regionen må finnes før toasten legges i den.
- Kall `startOppdatering('/sw.js')` én gang ved last, og la `sw.js` gjøre `skipWaiting` og `clients.claim`.
- Send appens egne grunner til å vente i `opptatt` (en økt som pågår, en lagring på vei).
- Si hvorfor i `description` når `updating` er satt: «Lagrer først.»
- På engelske flater: `title`, `updateLabel`, `laterLabel` og `lang="en"`.

## Ikke gjør

- Ikke render den først når `open` blir sann. Da kommer regionen ferdig fylt, og skjermleseren leser den ikke.
- Ikke kall `location.reload()` selv; `oppdater()` laster på nytt én gang.
- Ikke utelat `onLater` med mindre varselet virkelig skal bli stående.
- Ikke to stabler: i en app med egen `ToastStack`, render den inni med `stack={false}`.

## Eksempel

```jsx
import { useEffect, useState } from 'react';
import { NyVersjon, startOppdatering, vedNyVersjon, oppdater } from 'sussi/components';

startOppdatering('/sw.js', { opptatt: () => øktPågår() });

function Oppdatering() {
  const [vis, setVis] = useState(false);
  useEffect(() => vedNyVersjon(() => setVis(true)), []);
  return <NyVersjon open={vis} onUpdate={oppdater} onLater={() => setVis(false)} description="Oppdater når det passer deg." />;
}
```

## Props

Typene står i `components/feedback/NyVersjon.d.ts` og `components/feedback/oppdatering.d.ts`. Kortet: `components/feedback/nyversjon.card.html`.

<!-- props: NyVersjonProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Vis varselet. La komponenten stå i sida mens varselet er lukket, så live-regionen finnes før toasten kommer. |
| `onUpdate` | `() => void` | *påkrevd* | «Oppdater»: last sida på nytt, eller det som tar i bruk den nye versjonen. |
| `onLater` | `() => void` | – | «Senere»: lukk varselet. Uten den finnes ingen «Senere» (varselet står til appen lastes på nytt). |
| `updating` | `boolean` | `false` | Oppdateringen er på vei: «Oppdater» er slått av og `aria-busy`. Si hvorfor i `description`. |
| `title` | `React.ReactNode` | `'Ny versjon'` | Standard «Ny versjon». Engelske flater sender «New version». |
| `description` | `React.ReactNode` | – | Én linje under tittelen, f.eks. «Oppdater når det passer deg.» Ingenting som standard. |
| `updateLabel` | `React.ReactNode` | `'Oppdater'` | Teksten på «Oppdater». |
| `laterLabel` | `React.ReactNode` | `'Senere'` | Teksten på «Senere». |
| `stack` | `boolean` | `true` | Standard true: toasten kommer i sin egen ToastStack (nede til høyre, over AppShells fanelinje). `false` rendrer bare toasten, inne i appens egen ToastStack; alene er den da `role="status"` selv. |
| `stackProps` | `React.HTMLAttributes<HTMLDivElement>` | – | Når ToastStack-en den rendrer (en `id` for en test, for eksempel). `id`, `data-*` og `aria-*` i de andre propsene når toasten. |
| `className` | `string` | – | Klasser på toasten. |
| `style` | `React.CSSProperties` | – | Stil på toasten. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `title`, `children`.
<!-- /props -->

Hjelperen: `startOppdatering(swUrl, options)` registrerer workeren (`updateViaCache: 'none'`), spør etter en ny når appen kommer i forgrunnen og hver 30. minutt, og laster på nytt én gang ved `controllerchange` med mindre du er opptatt; første installasjon laster aldri på nytt. `vedNyVersjon(lytter)` kalles når en ny versjon venter (med en gang hvis den alt venter) og gir tilbake en funksjon som slutter å lytte. `oppdater()` laster på nytt, én gang. `erOpptatt()` er sann med fokus eller tekst i et felt, eller en åpen dialog (`dialog[open]`, `[aria-modal="true"]`). Enhetstestet mot en falsk `navigator.serviceWorker` i `tests/oppdatering.test.mjs`.

<!-- props: OppdateringOptions from components/feedback/oppdatering.d.ts -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `opptatt` | `() => boolean` | – | Appens egne grunner til å vente med omlastingen, f.eks. en økt som pågår. |
| `hver` | `number` | – | Hvor ofte den spør etter en ny worker, i ms. Standard 30 minutter. |
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/nyversjon.e2e.test.mjs`, reglene i `tests/nyversjon.test.mjs`.

- **Element og rolle.** Med `stack` (standard): en `ToastStack` (`role="status"`, `aria-live="polite"`) som er i sida fra start, tom; toasten inni har ingen egen rolle. Med `stack={false}` inni appens stabel: samme. Alene med `stack={false}`: toasten er `role="status"` selv.
- **Navn.** `title` («Ny versjon»), `description` og de to knappene, lest opp som én beskjed når toasten kommer.
- **Tastatur.** Tab når «Oppdater» og så «Senere», etter fanelinja i AppShell; Enter trykker (testet). Ingenting flytter fokus når toasten kommer (testet).
- **Tilstand.** `updating` setter `disabled` og `aria-busy="true"` på «Oppdater» (50 % gjennomsiktig). «Senere» finnes bare med `onLater`.
- **Fokus.** Standard fokusring på begge knappene.
- **Kontrast.** Tittel, «Oppdater» (`--accent-text`) og «Senere» (`--fg-2`) holder 4,5:1 på toastens flate, og ikonet (`--info`) 3:1, i lyst og mørkt tema og med to aksenter (testet).
- **Mål.** Begge knappene er minst 24 × 24 px (testet). Kjent grense: under 44 px.
- **Plassering.** Nede til høyre; over AppShells fanelinje ved 390 px, ikke dekket (testet, WCAG 2.4.11); får plass på 320 px uten sideveis rulling; tilbake i hjørnet fra 900 px.
- **Bevegelse.** Stiger inn på `--dur-slow`, 0 under redusert bevegelse.
- **Innebygd tekst.** «Ny versjon», «Oppdater», «Senere». Overstyr med `title`, `updateLabel`, `laterLabel`; `lang` når toasten.
- **Kjent grense.** Hjelperen er holdt liten: ingen ventende-worker-håndtrykk, ingen omlasting i bakgrunnen når sida er skjult, og den viser ikke varselet på nytt etter «Senere». Det bygger appen selv om den trenger det.

## Innhold

- Standardteksten er nok: «Ny versjon», «Oppdater», «Senere».
- `description` bare når det er noe å si: «Oppdater når det passer deg.» eller «Lagrer først.» under `updating`.
- Ikke «Du må oppdatere nå». Varselet er lavt trykk; appen laster på nytt selv når du ikke er opptatt.
- På engelsk: «New version», «Update», «Later».
