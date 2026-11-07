---
navn: Alert
gruppe: feedback
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/alert/
typer: dist/feedback/Alert.d.ts
---

# Alert

En melding som står i siden til appen fjerner den: en myk statusfarge med den matchende tekstfargen (som Badge), et ikon per tone så fargen aldri er det eneste signalet, en valgfri tittel, en handling og en lukkeknapp. `role="status"` (høflig) som standard, `role="alert"` bare for `tone="danger"` med `urgent`. Den tar aldri fokus; lukking flytter fokus til kontrollen før meldingen, så det ikke faller til `<body>` når meldingen forsvinner (se kjente grenser).

## Når du bruker den

- Noe folk bør vite mens de er på siden: frakoblet, lagret, et skjema som ikke gikk gjennom, en ny versjon.
- Meldingen hører til et sted: over skjemaet, øverst i visningen, under feltgruppa den gjelder.
- Meldingen skal stå til folk har sett den eller til tilstanden er over.

## Når du ikke bruker den

- Noe kort som skjedde nå og ikke trenger å stå: [Toast](Toast.nb.md), med angre.
- Noe som må besvares før en kan gå videre: [Dialog](Dialog.nb.md).
- Feil i ett felt: `error` på [Input](Input.nb.md); Alert over skjemaet bare når det er flere eller feilen gjelder helheten.
- Et tomt sted i appen: [EmptyState](EmptyState.nb.md).

## Gjør

- Velg `tone` etter mening: `info` å vite, `success` det gikk, `warning` noe å passe på, `danger` noe gikk galt.
- Si hva som skjedde og hva en kan gjøre: «Nettet forsvant underveis. Ingenting gikk tapt.» Handlingen i `actionLabel` («Prøv igjen»).
- Sett `urgent` bare på en `danger` som dukker opp fordi folk gjorde noe (lagringen feilet), aldri på en som står i siden fra start.
- Gi `onClose` når meldingen kan lukkes, og fjern den fra siden i `onClose`. Fokus er flyttet før den kalles.
- Pek `focusOnClose` på feltet som bør få fokus etter lukking når kontrollen før meldingen ikke er den rette.

## Ikke gjør

- Ikke flere meldinger om samme ting, og ikke én per felt.
- Ikke `urgent` som en måte å gjøre meldingen viktigere på: `alert` avbryter det skjermleseren holdt på med.
- Ikke flytt fokus til meldingen selv. Den blir lest opp der den kommer.
- Ikke en tittel som gjentar teksten. Tittelen er for en melding på flere linjer.

## Eksempel

```jsx
import { Alert, Button } from 'sassy/components';

<Alert>Endringer lagres etter hvert.</Alert>
<Alert tone="success" title="Lagret">Oppskriften er lagret.</Alert>
<Alert tone="warning" onClose={() => setOffline(false)}>Du er frakoblet. Endringene synkes når du er tilbake.</Alert>
<Alert tone="danger" urgent title="Kunne ikke lagre" actionLabel="Prøv igjen" onAction={retry} onClose={dismiss} focusOnClose={nameRef}>
  Nettet forsvant underveis. Ingenting gikk tapt.
</Alert>
<Alert tone="info" title="Ny versjon" actions={<Button size="sm" variant="secondary">Se hva som er nytt</Button>}>Oppdateringen hentes neste gang du åpner appen.</Alert>
```

## Props

Typene står i `dist/feedback/Alert.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/alert/).

<!-- props: AlertProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Statusfargene og ikonet: `info` (standard), `success`, `warning` eller `danger`. |
| `title` | `React.ReactNode` | – | Én kort linje i medium vekt over teksten. Utelat den når teksten er én linje. |
| `children` | `React.ReactNode` | – | Meldingen. Én eller to setninger: hva som skjedde og hva en kan gjøre. |
| `urgent` | `boolean` | `false` | Bare med `tone="danger"`: `role="alert"` (assertiv) i stedet for `role="status"`. Sett den når meldingen kommer fordi folk nettopp gjorde noe (lagringen feilet), aldri på en som står i siden fra start. |
| `actionLabel` | `string` | – | En teksthandling i meldingens egen farge, f.eks. «Prøv igjen». |
| `onAction` | `() => void` | – | Kalles når handlingen trykkes. |
| `actions` | `React.ReactNode` | – | Flere kontroller etter handlingen, f.eks. en liten sekundær Button. |
| `onClose` | `() => void` | – | Viser lukkeknappen. Appen fjerner meldingen; fokus flyttes først. |
| `closeLabel` | `string` | `'Lukk'` | Tilgjengelig navn på lukkeknappen. Standard «Lukk»; engelske flater sender «Dismiss». |
| `focusOnClose` | `React.RefObject<HTMLElement \| null>` | – | Hvor fokus går når meldingen lukkes. Standard: det fokuserbare elementet nærmest før meldingen. |
| `className` | `string` | – | Egne klasser på meldingen. |
| `style` | `React.CSSProperties` | – | Egne stiler på meldingen. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `title`.
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i nettleseren, fargereglene i enhetstester.

- **Element og rolle.** En `<div role="status">`: en høflig live-region, lest når den endrer seg, uten å avbryte. En region som kommer ferdig fylt leses ikke alltid (særlig VoiceOver); når opplesingen må være sikker, ha meldingen i siden fra start og fyll den, eller bruk `tone="danger"` med `urgent` når det er en feil folk nettopp utløste. Med `tone="danger"` og `urgent` er den `role="alert"` (assertiv). `urgent` på en annen tone ignoreres, så en informasjon kan ikke bli en alarm ved et uhell (testet). En eksplisitt `role` i propsene vinner, for en melding som står i siden fra start og ikke skal være en live-region (`role="none"`).
- **Navn.** Teksten i `title` og `children`. Ikonet er `aria-hidden` og er forskjellig per tone, så tonen vises med form og ikke bare farge (WCAG 1.4.1, testet).
- **Tastatur og fokus.** Ingenting flytter fokus når en melding kommer (testet: fokus blir på knappen som utløste den). Handlingen og lukkeknappen er vanlige knapper i dokumentets rekkefølge. Lukkeknappen flytter fokus før `onClose`: til `focusOnClose` når den er satt, ellers til det fokuserbare elementet nærmest før meldingen i dokumentet, og til det nærmeste etter når det ikke er noe før (testet alle tre).
- **Kontrast.** Teksten er `--<tone>-fg` på `--<tone>-soft`, 4,5:1 i begge temaer og alle aksenter (testet på tokenparene og de renderte fargene for tekst, tittel, handling, ikon og lukkeknapp). Handlingen og lukkeknappen arver tonens farge; lukkeknappens hover er en ring i samme farge, ikke den grå flaten.
- **Mål.** Handlingen er minst 24 × 24 px (WCAG 2.5.8); lukkeknappen er en IconButton `sm`, 30 px. Kjent grense: under 44 px.
- **Bredde.** Flex med `min-width:0` på teksten, så lange ord brytes og ingenting flyter over på 320 px (testet).
- **Bevegelse.** Ingen.
- **Innebygd tekst.** «Lukk» på lukkeknappen. Overstyr med `closeLabel`.
- **Kjente grenser.** Meldingen fjerner ikke seg selv; appen eier tilstanden. Ingen nøytral tone: en melding uten mening er `info`. «Nærmest før» er rekkefølgen i dokumentet, så en melding øverst i et skjema sender fokus til det siste i toppfeltet; sett `focusOnClose` der. Kontroller med `position: fixed` telles ikke, og er det ingen andre fokuserbare elementer, havner fokus på `<body>`.

## Innhold

- Første setning sier hva som skjedde, den neste hva en kan gjøre: «Du er frakoblet. Endringene synkes når du er tilbake.»
- `title` bare når teksten er flere linjer, og da som substantiv eller kort setning: «Kunne ikke lagre», «Ny versjon».
- `actionLabel` er utfallet: «Prøv igjen», «Se hva som er nytt», ikke «OK».
- Ingen utropstegn, ingen skyld: «Nettet forsvant underveis», ikke «Feil!».
- Lukkeknappen heter «Lukk»; engelske flater sender `closeLabel="Dismiss"`.
