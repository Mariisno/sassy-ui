---
navn: Toast
gruppe: feedback
status: stable
sidenVersjon: 0.2.0
kort: components/feedback/toast.card.html
typer: components/feedback/Toast.d.ts
---

# Toast

Kort tilbakemelding som ikke står i veien: «Oppgave arkivert», med «Angre» ved siden av. `ToastStack` er beholderen nede til høyre og liveregionen (`role="status"`, `aria-live="polite"`); den står i sida fra start, tom, og toastene legges i den. En `Toast` alene er `role="status"` selv. Fem toner som bare bytter ikon og ikonfarge, en valgfri handling og en lukkeknapp som heter «Lukk».

## Når du bruker den

- Bekrefte at noe er gjort, uten å avbryte: «Lagret», «Oppgave arkivert».
- Angre etter en handling som kan gjøres om, i stedet for «Er du sikker?» før den.
- En stille advarsel som ikke krever svar: «Du er frakoblet. Vi lagrer når nettet er tilbake.»

## Når du ikke bruker den

- Noe som må besvares før du går videre: [Dialog](Dialog.nb.md).
- En feil i et felt: `error` på [Input](Input.nb.md), der feilen er.
- En ny versjon av appen: [NyVersjon](NyVersjon.nb.md), som er en toast med to handlinger.
- Innhold som skal bli stående: tekst på sida, eller en [Badge](Badge.nb.md).

## Gjør

- Render `ToastStack` fra start, også tom. En region som kommer ferdig fylt blir ofte ikke lest.
- Gi destruktive handlinger «Angre» (`actionLabel` + `onAction`) og la handlingen skje med en gang.
- La appen fjerne toasten etter noen sekunder når den ikke har handling; en med handling blir til folk har sett den.
- Send `closeLabel="Dismiss"` på engelske flater.
- Én linje i `title`, fortid for det som er gjort.

## Ikke gjør

- Ikke flytt fokus til toasten. Den leses opp; folk fortsetter der de var.
- Ikke flere enn én toast om samme ting; bytt teksten i den som er der.
- Ikke en toast for alt. Et lagret skjema som viser det lagrede trenger ingen.
- Ikke `danger` for noe som gikk bra.

## Eksempel

```jsx
import { Toast, ToastStack } from 'sussi/components';

<ToastStack>
  {arkivert && <Toast tone="success" title="Oppgave arkivert" actionLabel="Angre" onAction={angre} onClose={lukk} />}
  {frakoblet && <Toast tone="warning" title="Du er frakoblet" description="Vi lagrer når nettet er tilbake." />}
</ToastStack>
```

## Props

Typene står i `components/feedback/Toast.d.ts`. Kortet: `components/feedback/toast.card.html`.

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
| `className` | `string` | – | Klasser på toasten. |
| `style` | `React.CSSProperties` | – | Stil på toasten. |

Pluss alle attributtene til `<div>` (`React.HTMLAttributes<HTMLDivElement>`), unntatt `title`.
<!-- /props -->

`ToastStack` tar attributtene til en `<div>` (`id`, `className`, `data-*`, `aria-*`); de når beholderen (`tests/refs.e2e.test.mjs`).

## Tilgjengelighet

- **Element og rolle.** `ToastStack` er en `<div role="status" aria-live="polite" aria-relevant="additions text">`. En `Toast` inni den har ingen egen rolle; en `Toast` alene er `role="status"` (testet i `tests/refs.e2e.test.mjs`). `id`, `data-*` og `aria-*` når toasten.
- **Navn.** Teksten i `title` og `description`. Ikonet er dekorativt.
- **Tastatur.** Handlingen og lukkeknappen er vanlige knapper som Tab når i sin tur i dokumentet. Ingenting flytter fokus når en toast kommer (testet for NyVersjon, som er bygd av de samme delene).
- **Fokus.** Standard fokusring på handlingen og på ×.
- **Kontrast.** `title` er `--fg-1`, `description` `--fg-2` og handlingen `--accent-text`, alle 4,5:1 på toastens flate (`--surface-1` i lyst tema, `--surface-2` i mørkt; `tests/contrast.test.mjs`). Ikonet er `--fg-3` eller statusfargen.
- **Mål.** Handlingen er minst 24 × 24 px (WCAG 2.5.8, `tests/polish.test.mjs`); lukkeknappen er en IconButton `sm`, 30 px. Kjent grense: under 44 px.
- **Plassering.** Nede til høyre, 20 px fra kanten. Under 480 px spenner stabelen bredden med 16 px marg, så en 360 px toast får plass på 320 px. I en side med AppShell (ikke `contained`) ligger stabelen over fanelinja under 900 px (WCAG 2.4.11).
- **Bevegelse.** Toasten stiger inn på `--dur-slow`, 0 under redusert bevegelse.
- **Innebygd tekst.** «Lukk» på lukkeknappen. Overstyr med `closeLabel`.
- **Kjent grense.** Toasten fjerner ikke seg selv. Tidsuret er appens; «omtrent fem sekunder uten handling» er rådet, ikke koden.

## Innhold

- `title` i fortid for det som er gjort: «Oppgave arkivert», «Lagret». Ikke «Oppgaven din har blitt arkivert!».
- `description` bare når noe mer skjer: «Vi lagrer når nettet er tilbake.»
- Handlingen er ett ord: «Angre». Sjelden noe annet.
- Ingen «Suksess!» og ingen emoji. Tonen sier det med ikonet.
