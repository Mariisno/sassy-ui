---
navn: Toast
gruppe: feedback
status: stable
sidenVersjon: 0.2.0
side: https://mariisno.github.io/sassy-ui/komponenter/toast/
typer: dist/feedback/Toast.d.ts
---

# Toast

Kort tilbakemelding som ikke står i veien: «Oppgave arkivert», med «Angre» ved siden av. `ToastStack` er beholderen nede til høyre og liveregionen (`role="status"`, `aria-live="polite"`); den står i sida fra start, tom, og toastene legges i den. En `Toast` alene er `role="status"` selv. Fem toner som bare bytter ikon og ikonfarge, en valgfri handling og en lukkeknapp som heter «Lukk». Med `duration` går toasten av seg selv (den kaller `onClose`); klokka står mens pekeren er på den, fokus er inni den eller sida er skjult, og aldri før 5 sekunder. En toast med handling («Angre») har aldri klokke: den står til den er brukt eller lukket, også med `duration`. Uten `duration` står den til appen fjerner den, som før.

## Når du bruker den

- Bekrefte at noe er gjort, uten å avbryte: «Lagret», «Oppgave arkivert».
- Angre etter en handling som kan gjøres om, i stedet for «Er du sikker?» før den.
- En stille advarsel som ikke krever svar: «Du er frakoblet. Vi lagrer når nettet er tilbake.»

## Når du ikke bruker den

- Noe som må besvares før du går videre: [Dialog](Dialog.nb.md).
- En feil i et felt: `error` på [Input](Input.nb.md), der feilen er.
- En ny versjon av appen: [NyVersjon](NyVersjon.nb.md), som er en toast med to handlinger.
- Innhold som skal bli stående: tekst på sida, eller en [Badge](Badge.nb.md).
- En melding bare skjermlesere trenger: [kunngjor](Kunngjor.nb.md).

## Gjør

- Render `ToastStack` fra start, også tom. En region som kommer ferdig fylt blir ofte ikke lest.
- Gi destruktive handlinger «Angre» (`actionLabel` + `onAction`) og la handlingen skje med en gang.
- Gi en ren statustoast `duration` (5–6 sekunder); en med handling blir til folk har sett den, og `duration` virker ikke på den.
- Send `closeLabel="Dismiss"` på engelske flater.
- Én linje i `title`, fortid for det som er gjort.

## Ikke gjør

- Ikke flytt fokus til toasten. Den leses opp; folk fortsetter der de var.
- Ikke flere enn én toast om samme ting; bytt teksten i den som er der.
- Ikke en toast for alt. Et lagret skjema som viser det lagrede trenger ingen.
- Ikke `danger` for noe som gikk bra.

## Eksempel

```jsx
import { Toast, ToastStack } from 'sassy/components';

<ToastStack>
  {arkivert && <Toast tone="success" title="Oppgave arkivert" actionLabel="Angre" onAction={angre} onClose={lukk} />}
  {frakoblet && <Toast tone="warning" title="Du er frakoblet" description="Vi lagrer når nettet er tilbake." />}
  {lagret && <Toast tone="success" title="Lagret" onClose={() => setLagret(false)} duration={6000} />}
</ToastStack>
```

### Slett og angre

Slett med en gang, uten «Er du sikker?», og gi «Angre» i en toast. Appen holder på det som ble slettet til toasten lukkes, og legger det tilbake på samme plass ved «Angre». Toasten har ingen klokke, siden den har en handling: den står til folk har brukt «Angre» eller lukket den, eller til en ny sletting bytter den ut. Når den lukkes, er slettingen endelig; send den til serveren da, eller send den med en gang og gjenopprett ved «Angre».

```jsx
function Bed({ bed, setBed }) {
  const [slettet, setSlettet] = useState(null); // { rad, plass }
  const slett = (rad) => {
    setSlettet({ rad, plass: bed.indexOf(rad) });
    setBed(bed.filter((b) => b !== rad));
  };
  const angre = () => {
    setBed((b) => [...b.slice(0, slettet.plass), slettet.rad, ...b.slice(slettet.plass)]);
    setSlettet(null);
  };
  return (
    <ToastStack>
      {slettet && <Toast key={slettet.rad.id} title="Slettet" description={slettet.rad.navn} actionLabel="Angre" onAction={angre} onClose={() => setSlettet(null)} />}
    </ToastStack>
  );
}
```

- Slett-knappen forsvinner med raden; flytt fokus til neste rad (eller overskriften over lista), så tastaturet ikke havner i `<body>`. Etter «Angre» flytter du fokus til raden som kom tilbake.
- `key` per sletting, så en ny sletting får en ny toast.
- Én toast om gangen for slettinger: en ny sletting gjør den forrige endelig og bytter ut toasten.

## Props

Typene står i `dist/feedback/Toast.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/toast/).

<!-- props: ToastProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `tone` | `'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | Hvilket ikon og hvilken farge ikonet får. |
| `title` | `React.ReactNode` | – | Én linje, fortid for det som er gjort: «Oppgave arkivert». |
| `description` | `React.ReactNode` | – | En linje til, i `--fg-2`. |
| `actionLabel` | `string` | – | Teksten på handlingen, som regel «Angre». |
| `onAction` | `() => void` | – | Kjøres når handlingen trykkes. |
| `onClose` | `() => void` | – | Viser en lukkeknapp (×) som kjører denne. |
| `closeLabel` | `string` | `'Lukk'` | Tilgjengelig navn på lukkeknappen. Standard «Lukk» (som Dialog); engelske flater sender «Dismiss». |
| `duration` | `number` | – | Millisekunder til en ren statustoast går av seg selv: den kaller `onClose` én gang, som × gjør. Standard ingen: toasten står til appen fjerner den. Aldri under 5000. En toast med handling (`actionLabel`) overser den og står til den er brukt eller lukket. Klokka står mens pekeren er på toasten, mens fokus er inni den og mens sida er skjult. |
| `className` | `string` | – | Klasser på toasten. |
| `style` | `React.CSSProperties` | – | Stil på toasten. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `title`.
<!-- /props -->

`ToastStack` tar attributtene til en `<div>` (`id`, `className`, `data-*`, `aria-*`); de når beholderen (testet).

## Tilgjengelighet

- **Element og rolle.** `ToastStack` er en `<div role="status" aria-live="polite" aria-relevant="additions text">`. En `Toast` inni den har ingen egen rolle; en `Toast` alene er `role="status"` (testet i nettleseren). `id`, `data-*` og `aria-*` når toasten.
- **Navn.** Teksten i `title` og `description`. Ikonet er dekorativt.
- **Tastatur.** Handlingen og lukkeknappen er vanlige knapper som Tab når i sin tur i dokumentet. Ingenting flytter fokus når en toast kommer (testet for NyVersjon, som er bygd av de samme delene).
- **Fokus.** Standard fokusring på handlingen og på ×.
- **Kontrast.** `title` er `--fg-1`, `description` `--fg-2` og handlingen `--accent-text`, alle 4,5:1 på toastens flate (`--surface-1` i lyst tema, `--surface-2` i mørkt; testet). Ikonet er `--fg-3` eller statusfargen.
- **Mål.** Handlingen er minst 24 × 24 px (WCAG 2.5.8, testet); lukkeknappen er en IconButton `sm`, 30 px. Kjent grense: under 44 px.
- **Plassering.** Nede til høyre, 20 px fra kanten. Under 480 px spenner stabelen bredden med 16 px marg, så en 360 px toast får plass på 320 px. I en side med AppShell (ikke `contained`) ligger stabelen over fanelinja under 900 px (WCAG 2.4.11).
- **Bevegelse.** Toasten stiger inn på `--dur-slow`, 0 under redusert bevegelse.
- **Innebygd tekst.** «Lukk» på lukkeknappen. Overstyr med `closeLabel`.
- **Tid.** Uten `duration` er det ingen klokke. Med `duration` kalles `onClose` én gang når tida er ute, aldri før 5 sekunder. En toast med handling overser `duration` og står til den er brukt eller lukket: en klokke, også en som står ved hover og fokus, kan ta «Angre» fra den som leser med skjermleserens lesemodus, som verken flytter fokus eller pekeren. Klokka står mens pekeren er på toasten (også en som dukker opp under en peker som står stille), mens fokus er inni den og mens sida er skjult, og går videre med det som var igjen (testet i nettleseren). Toasten som går, leses ikke opp; liveregionen er den samme.
- **Kjent grense.** Det er appen som fjerner toasten i `onClose`; uten `onClose` gjør `duration` ingenting. Det finnes ingen kø: appen holder lista over toaster, og én om gangen om samme ting er rådet.

## Innhold

- `title` i fortid for det som er gjort: «Oppgave arkivert», «Lagret». Ikke «Oppgaven din har blitt arkivert!».
- `description` bare når noe mer skjer: «Vi lagrer når nettet er tilbake.»
- Handlingen er ett ord: «Angre». Sjelden noe annet.
- Ingen «Suksess!» og ingen emoji. Tonen sier det med ikonet.
