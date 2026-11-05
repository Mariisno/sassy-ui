---
navn: Spinner
gruppe: feedback
status: new
sidenVersjon: 0.7.0
kort: components/feedback/spinner.card.html
typer: components/feedback/Spinner.d.ts
---

# Spinner

Noe skjer, og ingen vet hvor lenge: en ring i aksenten som snurrer. `role="status"` med `label` som visuelt skjult tekst, så en skjermleser hører «Laster» der andre ser ringen. Under `prefers-reduced-motion` står den stille og pulserer. Med `aria-hidden` er den pynt ved siden av egen tekst, uten rolle og uten tekst. Button sin `loading` har sin egen, like ring; bruk den inne i en knapp.

## Når du bruker den

- Noe pågår uten kjent lengde og varer mer enn omtrent et sekund: henter en liste, lagrer, logger inn.
- En hel visning venter: `size="lg"` midt i flaten, med `label` som sier hva som hentes.
- Ett ord i en linje venter: `size="sm"` ved siden av teksten, med `aria-hidden` når teksten alt sier det.

## Når du ikke bruker den

- Noe med kjent lengde: [Progress](Progress.nb.md).
- Innhold med kjent form (en liste, et kort): [Skeleton](Skeleton.nb.md), så ingenting hopper når det kommer.
- Inne i en knapp: `loading` på [Button](Button.nb.md).
- En hel side som laster: Sussi i `sover`-positur.

## Gjør

- Gi alltid `label`, i presens: «Laster», «Lagrer», «Henter oppskrifter». Det er det skjermleseren hører.
- Bruk `aria-hidden` bare når teksten ved siden av alt sier hva som skjer, og legg `role="status"` på den teksten i stedet.
- Vent omtrent et sekund før du viser den; en ring som blafrer er verre enn ingenting.
- Fjern den når innholdet er der, og la innholdet ta plassen.

## Ikke gjør

- Ikke en Spinner uten `label` og uten `aria-hidden`: da er det en tom statusregion.
- Ikke en Spinner inne i en Button; knappen har sin egen.
- Ikke flere spinnere i samme visning. Én sier det.
- Ikke en spinner som et tegn på at appen er treg: finn ut hvorfor.

## Eksempel

```jsx
import { Spinner, Button } from 'sussi/components';

<Spinner label="Laster" />
<Spinner size="lg" label="Henter oppskrifter" />
<p role="status">Lagrer <Spinner size="sm" aria-hidden /></p>
<Button loading>Lagrer</Button>
```

## Props

Typene står i `components/feedback/Spinner.d.ts`. Kortet: `components/feedback/spinner.card.html`.

<!-- props: SpinnerProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `sm` 16 px (i en tekstlinje), `md` 24 px, `lg` 40 px (en hel visning). |
| `label` | `string` | – | Hva som skjer, i presens: «Laster», «Lagrer». Påkrevd, med mindre `aria-hidden` gjør spinneren til pynt ved siden av egen tekst. |
| `aria-hidden` | `boolean \| 'true' \| 'false'` | – | `true` når teksten ved siden av alt sier hva som skjer: spinneren har da ingen rolle og ingen egen tekst. |
| `className` | `string` | – | Egne klasser på spinneren. |
| `style` | `React.CSSProperties` | – | Egne stiler på spinneren. |

Pluss alle attributtene til `<span>` (`React.HTMLAttributes<HTMLSpanElement>`).
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/laster.e2e.test.mjs`, fargereglene i `tests/spinner.test.mjs`.

- **Element og rolle.** En `<span role="status">` med ringen `aria-hidden` og `label` som visuelt skjult tekst (`.s-sr-only`: 1 px, klippet, ikke `display:none`, så den leses). Med `aria-hidden` har spennet ingen rolle og ingen tekst (testet).
- **Navn.** `label`, som innhold i statusregionen. En live-region som kommer ferdig fylt leses ikke alltid; når opplesingen må være sikker, ha en `role="status"`-tekst i siden fra start og sett teksten når lastingen begynner (mønsteret i [Skeleton](Skeleton.nb.md)).
- **Tastatur og fokus.** Ingen; den kan ikke betjenes, og den flytter ikke fokus.
- **Kontrast.** Buen er `--accent` gjennom `currentColor`, 3:1 mot `--bg`, `--surface-1` og `--surface-2` i begge temaer og alle aksenter (WCAG 1.4.11; `tests/spinner.test.mjs` måler tokenene, `tests/laster.e2e.test.mjs` den renderte fargen). Resten av ringen er `--surface-3`, et spor, ikke et signal.
- **Bevegelse.** Ringen snurrer (0,8 s, lineært). Under `prefers-reduced-motion` står den stille og pulserer i opasitet (1,6 s), og Button sin `.s-btn__spin` gjør det samme (WCAG 2.3.3, testet).
- **Størrelser.** `sm` 16 px med 2 px strek, `md` 24 px med 3 px, `lg` 40 px med 4 px (testet).
- **Innebygd tekst.** Ingen; `label` er appens.
- **Kjente grenser.** Ingen tone-prop: ringen er alltid aksenten. Sett `color` i `style` eller en klasse for en annen farge (buen er `currentColor`).

## Innhold

- `label` er det som skjer, i presens og uten punktum: «Laster», «Lagrer», «Henter oppskrifter».
- Si hva som hentes når det er mer enn én ting på siden: «Henter oppskrifter», ikke bare «Laster».
- Engelske flater: «Loading», «Saving», «Loading recipes».
