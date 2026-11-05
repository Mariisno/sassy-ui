---
navn: AppShell
gruppe: navigation
status: stable
sidenVersjon: 0.3.0
kort: components/navigation/appshell.card.html
typer: components/navigation/AppShell.d.ts
---

# AppShell

Rammen rundt en app, med hovedmenyen: en fanelinje nederst under 900 px og en 248 px sidemeny fra 900 px, begge `<nav aria-label="Hovedmeny">` med `aria-current="page"` på punktet du er på. Opptil fem faner får plass; med flere blir den femte «Mer», en liste over resten som kan brukes med tastatur. AppShell rendrer sidas `<main>` med luft til fanelinja og hjemindikatoren, og det første i tabrekkefølgen er en hopp-lenke til `<main>`. `contained` gir fanelinja i alle bredder, nederst i appens egen ramme.

## Når du bruker den

- Rundt hele appen, én gang, med tre til fem punkter i hovedmenyen.
- En app som skal virke like godt på telefon og på en stor skjerm.
- `contained` for en app som holder seg telefonbred på en stor skjerm, inne i sin egen ramme.

## Når du ikke bruker den

- Faner inne på en side: [Tabs](Tabs.nb.md).
- Et nettsted med sider folk leser: en vanlig toppmeny; AppShell er for apper.
- En meny med mer enn seks–sju punkter: slå sammen, eller flytt det sjeldne til en innstillingsside.

## Gjør

- Tre til fem punkter. Færre er bedre (Hicks lov); fra seks blir det femte «Mer».
- Gi hvert punkt et ikon og ett ord. Teksten er det folk leser.
- Bruk `href` når appen har ruter, så punktene er lenker; ellers `onNavigate`.
- Send `label="Main menu"`, `moreLabel="More"` og `skipLabel="Skip to content"` på engelske flater.
- Legg `brand` (ordmerket) øverst og `footer` (konto, et tall) nederst i sidemenyen.

## Ikke gjør

- Ikke en egen hopp-lenke eller et eget `<main>`; AppShell har begge.
- Ikke lange tekster på fanene. De bryter i stedet for å klippes, og tar plass.
- Ikke farge alene for det aktive punktet; AppShell gir fylt flate og halvfet tekst, la det stå.
- Ikke mer enn én AppShell på en side.

## Eksempel

```jsx
import { AppShell } from 'sussi/components';

<AppShell
  items={[
    { id: 'idag', label: 'I dag', icon: 'sparkles', href: '#/idag' },
    { id: 'prosjekter', label: 'Prosjekter', icon: 'layout-grid', href: '#/prosjekter' },
    { id: 'legg', label: 'Legg til', icon: 'plus', href: '#/legg' },
    { id: 'planter', label: 'Planter', icon: (size) => <PlanteIkon size={size} />, href: '#/planter' },
  ]}
  current={rute}
  brand={<span>appen<i>.</i></span>}
  footer={<Konto />}>
  <Side />
</AppShell>
```

## Props

Typene står i `components/navigation/AppShell.d.ts`. Kortet: `components/navigation/appshell.card.html`.

<!-- props: AppShellProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `items` | `AppShellItem[]` | `[]` | Menypunktene. |
| `current` | `string` | – | `id` til punktet du er på. |
| `onNavigate` | `(id: string, e: React.MouseEvent) => void` | – | Kjøres ved klikk på et punkt, med `id`. |
| `brand` | `React.ReactNode` | – | Toppen av sidemenyen, f.eks. ordmerket. Bare i sidemenyen. |
| `footer` | `React.ReactNode` | – | Bunnen av sidemenyen, f.eks. konto eller et tall. Bare i sidemenyen. |
| `label` | `string` | `'Hovedmeny'` | Tilgjengelig navn på begge menyene. |
| `moreLabel` | `string` | `'Mer'` | Teksten på overflytsfanen. |
| `skipLabel` | `string` | `'Hopp til innholdet'` | Teksten på hopp-lenka, det første i tabrekkefølgen (WCAG 2.4.1). Vises når den har fokus og flytter fokus til `<main>` med kode, så en app som ruter på hash beholder ruta. Engelske flater sender «Skip to content». |
| `mainId` | `string` | – | Id på `<main>`, målet for hopp-lenka. Standard: en generert id. |
| `contained` | `boolean` | `false` | Fanelinja i alle bredder, nederst i forelderen i stedet for festet til skjermen, og ingen sidemeny. For en app som lever i sin egen ramme, som et telefonbredt skall på en stor skjerm. Forelderen gir høyden (AppShell fyller den), og sida setter sin egen luft. |
| `className` | `string` | – | Klasser på ramma. |
| `children` | `React.ReactNode` | – | Siden; rendres inne i `<main>`. |
<!-- /props -->

### AppShellItem

<!-- props: AppShellItem -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `id` | `string` | *påkrevd* | Nøkkelen; `current` peker på den. |
| `label` | `string` | *påkrevd* | Teksten. Ett ord er best. |
| `icon` | `string \| ((size: number) => React.ReactNode) \| React.ReactNode` | – | Et Lucide-ikonnavn, eller appens eget: en funksjon som får størrelsen (22 i fanelinja, 18 i sidemenyen, 20 under «Mer») og gir et element, eller et element. Dekorativt: teksten er navnet. |
| `href` | `string` | – | Lenkemål, f.eks. «#/planter». Uten blir punktet en knapp, og `onNavigate` navigerer. |
<!-- /props -->

## Tilgjengelighet

Oppførselen er testet i `tests/appshell.e2e.test.mjs` og `tests/appshell-hover.e2e.test.mjs`, reglene i `tests/appshell.test.mjs`.

- **Landemerker.** Begge menyene er `<nav aria-label={label}>` («Hovedmeny»); bare én er synlig om gangen. Sida er `<main id tabIndex={-1}>`, rendret av AppShell. Ikke legg et `<main>` til inni.
- **Hopp-lenke.** Det første Tab lander på er `<a class="s-shell__skip">` («Hopp til innholdet»): usynlig i ro, synlig med fokus som en aksentpille, minst 44 px høy og 4,5:1. Enter flytter fokus til `<main>` med kode og rører ikke hashen, så en app som ruter på hash beholder ruta (testet, WCAG 2.4.1).
- **Punktene.** `<a href>` eller `<button type="button">`, `aria-current="page"` på det aktive. Hvert mål er minst 44 px (testet i begge menyer). Ikonet er dekorativt; teksten er navnet.
- **Aktivt punkt.** Fylt `--accent` med `--accent-fg` og halvfet tekst: flaten holder 3:1 mot sida og teksten 4,5:1 mot flaten i begge temaer og alle aksenter (testet). Hover holder 4,5:1 i sidemeny, fanelinje og «Mer» (testet).
- **«Mer».** En `<button aria-expanded aria-controls>` som åpner lista over sida. Enter åpner og flytter fokus til første punkt; Esc lukker og flytter fokus tilbake til «Mer»; et klikk utenfor lukker; et valg navigerer, lukker, og «Mer» markeres som der du er (testet).
- **Fokus.** Standard fokusring på alle punkter. `<main>` får ingen ring; den fokuseres bare av hopp-lenka.
- **Dekket innhold.** Under 900 px har sida `scroll-padding-bottom` så et fokusert element ikke havner under fanelinja, og en `ToastStack` løftes over linja (WCAG 2.4.11). Ikke i `contained`, der innholdet ruller inni ramma.
- **Tekst.** Fanetekstene bryter i stedet for å klippes (0.5.3, WCAG 1.4.4).
- **Bevegelse.** Fargeoverganger på `--dur-fast`, 0 under redusert bevegelse. Fanelinja har et uskarpt bakteppe.
- **Innebygd tekst.** «Hovedmeny», «Mer», «Hopp til innholdet». Overstyr med `label`, `moreLabel`, `skipLabel`.
- **Kjent grense.** Lista under «Mer» lukker ved klikk utenfor og ved at fokus går et annet sted, ikke ved at fokus forsvinner helt; det er med vilje, så et trykk i Safari lander.

## Innhold

- Ett ord per punkt, substantiv: «I dag», «Prosjekter», «Planter», «Innstillinger».
- Samme ord som i sidetittelen punktet fører til.
- «Mer» er nok for overflyten; ikke «Meny» eller «Annet».
- `brand` er ordmerket i ren tekst, med punktum i aksent, ikke en logo.
