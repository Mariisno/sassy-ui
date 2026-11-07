# Kom i gang

Sassy er et lite designsystem fra NotlandDesign: tokens, CSS og React-komponenter, laget for WCAG 2.2 AA i lys og mørk modus. Denne siden tar deg fra null til en side med knapp, dialog og toast, med dine egne farger. Hvert eksempel er en hel HTML-fil du kan lagre og åpne.

## 1. Installer

Velg én av tre måter. Alle tre gir samme CSS og samme komponenter; forskjellen er om og hvor React kommer inn.

### Bare CSS

Tokens, fonter og `.s-*`-klassene i én fil, fra jsDelivr. Ingen JavaScript, ingen pakke.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sassy-ui@v0.11.0/styles.css">
```

Fila laster tokens, fontene (Schibsted Grotesk og DM Mono, hostet samme sted) og komponentstilene. Et helt eksempel:

<!-- eksempel: bare-css.html 400 -->
```html
<!doctype html>
<html lang="nb" data-theme="light" data-accent="moss">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sassy, bare CSS</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sassy-ui@v0.11.0/styles.css">
<style>main{max-width:480px;margin:0 auto;padding:24px 16px;display:grid;gap:16px}</style>
</head>
<body>
<main>
  <h1>Hagelogg</h1>
  <p>Tokens, fonter og <code>.s-*</code>-klassene fra én CSS-fil. Bytt <code>data-theme</code> og <code>data-accent</code> på <code>&lt;html&gt;</code>.</p>
  <div class="s-field">
    <label class="s-field__label" for="plante">Plante</label>
    <div class="s-control"><input id="plante" class="s-control__input" type="text" placeholder="Tomat" aria-describedby="plante-hint"></div>
    <span class="s-field__hint" id="plante-hint">Det som står på frøposen.</span>
  </div>
  <p>
    <button type="button" class="s-btn s-btn--primary">Lagre</button>
    <button type="button" class="s-btn s-btn--secondary">Avbryt</button>
  </p>
  <p><span class="s-badge s-badge--accent">Ny</span> <span class="s-badge">Sådd</span></p>
</main>
</body>
</html>
```

### React med npm

React 18.3 eller 19, installert fra GitHub (pakken ligger ikke på npm):

```sh
npm install github:Mariisno/sassy-ui#v0.11.0
```

```jsx
import 'sassy/styles.css';
import { Button } from 'sassy';

export default function App() {
  return <Button variant="primary">Lagre</Button>;
}
```

Komponentene er kompilert ESM (JavaScript-moduler med `import` og `export`) i `dist/` med typer ved siden av. React er din egen, en peer dependency (pakken bruker React-en appen din allerede har, i stedet for å ta med sin egen), så ingenting dobles.

### Uten byggesteg

Én HTML-fil og en import map (et `<script type="importmap">` som forteller nettleseren hvor `import 'react'` og `import 'sassy'` skal hentes fra): React fra jsDelivr og Sassy som én ESM-fil, `dist/sassy.browser.js`. Versjonene er låst, så fila ser lik ut neste år.

```html
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@18.3.1/+esm",
    "react/jsx-runtime": "https://cdn.jsdelivr.net/npm/react@18.3.1/jsx-runtime/+esm",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/+esm",
    "react-dom/client": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/client/+esm",
    "sassy": "https://cdn.jsdelivr.net/gh/Mariisno/sassy-ui@v0.11.0/dist/sassy.browser.js"
  }
}
</script>
```

Uten byggesteg finnes ingen JSX, så eksemplet nederst skriver `h('p', null, …)` med `createElement`. Resten er likt.

## 2. Sett tema og aksent

To attributter på `<html>` styrer alt:

```html
<html lang="nb" data-theme="dark" data-accent="fjord">
```

- `data-theme` er `light` eller `dark`. Ingenting skifter av seg selv; sett det fra `prefers-color-scheme` om du vil, og husk valget.
- `data-accent` velger én av de seks aksentene: `moss` (standard, trenger ikke settes), `clay`, `fjord`, `lichen`, `lyng` og `ochre`. Aksenten farger primærknappen, lenker, fokusringen, valgte faner og den myke bakgrunnen på badges.

Hvert par i hver aksent er målt i begge moduser: knappetekst på aksenten 4,5:1, aksenten som flate 3:1, lenker 4,5:1, fokusringen 3:1 og tekst på den myke aksenten 4,5:1. Tallene står på [Grunnlag](https://mariisno.github.io/sassy-ui/grunnlag/).

## 3. Dine egne farger

Du trenger ikke én av de seks. Motoren (`tokens/tema.js`) tar én aksentfarge og lager hele tokengruppa i OKLCH (et fargerom der lysheten er en egen akse, så den kan flyttes uten at fargen skifter tone), og flytter lysheten bare så mye at hvert par holder samme krav som Sassys egne aksenter. Det du setter selv, flyttes aldri.

### I temabyggeren

Åpne [temabyggeren](https://mariisno.github.io/sassy-ui/tema/), velg en farge og gi temaet et navn. Alt skjer i nettleseren:

1. **Forhåndsvisningen** viser ekte komponenter med temaet, lys og mørk side om side.
2. **Under aksentfeltet** står svaret med én gang: «OK.», og om motoren måtte flytte fargen din, hvor langt og hvorfor. **Rapporten** lenger ned lister hver regel med målt forhold, og under «Flyttet» alt motoren justerte. Står det «OK: alle 124 par holder» (62 i hver modus), er du i mål.
3. **Last ned CSS** gir deg `navn.css`. Last den etter `styles.css` og sett `data-tema="navn"` på `<html>` ved siden av `data-theme`. Da trenger du ikke `data-accent`; temafila overstyrer den.

### Fra kommandolinjen

Det samme temaet fra terminalen, med pakken installert fra GitHub (steg 1):

```sh
npx sassy-tema --aksent "#2F6F9F" --navn hav > hav.css
```

CSS-en går til stdout (standard ut, det `>` sender til fila), rapporten til stderr (feilstrømmen, som blir stående i terminalen). `--format json` gir tokenene som DTCG-JSON (W3C-formatet for designtokens, som Style Dictionary og designverktøy leser), `--preset fjord` gir en av de seks, og `--overstyr '{"--bg":"#F4F7FA"}' --modus light` låser en flate eller en tekstfarge. Temabyggeren skriver kommandoen for deg under «Samme tema fra kommandolinjen».

I en app med npm laster du temafila rett etter Sassys CSS, `import 'sassy/styles.css';` og så `import './hav.css';`, og setter `data-tema="hav"` på `<html>`.

### Når en farge må justeres

En lys gul er fin som aksent i mørk modus, men hvit knappetekst på den holder ikke i lys modus. Dette er rapporten for `#F2E16B`, slik den faktisk står:

```sh
npx sassy-tema --aksent "#F2E16B" --navn sol > sol.css
```

```text
Sassy theme "sol" (aksent, from #F2E16B): ok, every rule holds
  light: --accent #807200, --accent-text #7C6E00, --accent-fg #F9F8E8, --focus-color #807200
    moved --accent #F2E16B -> #807200 (L -0.353): button text on the accent
    moved --accent-text #807200 -> #7C6E00 (L -0.013): links on --surface-2
    62 pairs measured, tightest --fg-2 on --surface-3: 4.5:1 (needs 4.5:1)
  dark: --accent #F2E16B, --accent-text #F2E16B, --accent-fg #1A1601, --focus-color #F2E16B
    nothing moved
    62 pairs measured, tightest --border-control on --surface-2: 3.22:1 (needs 3:1)
```

Les den slik: i lys modus ble aksenten mørknet fra `#F2E16B` til `#807200` for at knappeteksten skal holde 4,5:1, og lenkefargen ble flyttet et hakk til for `--surface-2`. I mørk modus holdt alt som det var. Temaet er OK, og den gule du valgte er fortsatt aksenten der den kan være det.

Går et par ikke opp, får du **Ikke OK** i stedet: temabyggeren sier «Ikke OK» under aksentfeltet, med hva du kan endre og en verdi som holder, og nedlastingen heter «Last ned likevel». Kommandolinjen skriver `WARNING` og `ADVARSEL`, og det samme rådet under `TO FIX` og `SLIK RETTER DU`, og avslutter med kode 1. CSS-en skrives likevel, med advarselen som en kommentar øverst (`/* NOT OK: … */`), så du ser hva som mangler. Det skjer bare når noe du har låst selv står i veien: motoren kan ikke flytte en verdi du har satt, og sier da hvilken.

<!-- detaljer -->
### Hva garantien dekker

Garantien er kontrasten mellom Sassys egne tokens, der komponentene bruker dem. I hver modus måles 62 par, og hvert av dem må holde kravet før temaet er OK:

- **Aksenten:** knappetekst på aksenten, også under hover og trykk (4,5:1); aksenten som flate, for eksempel en aktiv rad eller framdrift, på bakgrunnen og de tre flatene (3:1); lenker på bakgrunnen, `--surface-1` og `--surface-2` (4,5:1); fokusringen på de samme tre (3:1); tekst på den myke aksenten i badges og valgte tags, også under hover (4,5:1); markert tekst (4,5:1). En lenke skal dessuten skifte farge under hover.
- **Tekst og kanter:** brødtekst og sekundær tekst på bakgrunnen og de tre flatene (4,5:1), metatekst på de tre første (4,5:1) og på `--surface-3` som bryterring (3:1), kanten på felt og avkrysningsbokser (3:1).
- **Status:** framdriftsfyll og toast-ikoner i suksess, advarsel, fare og info (3:1), teksten i statusbadges (4,5:1), feilmeldingen under et felt (4,5:1) og kanten på et ugyldig felt (3:1), teksten på fareknappen, også under hover (4,5:1), og fargen i `--focus-ring` (3:1).

Reglene ligger i `REGLER` i `tokens/tema.js`, og rapporten i temabyggeren viser hvert par med målt verdi. Garantien dekker ikke farger du legger oppå selv, bilder, eller komponenter som ikke er Sassys; der måler du selv.
<!-- /detaljer -->

## 4. Tre komponenter

Med pakken installert (steg 1) skriver du JSX. Samme tre komponenter, kjørende uten byggesteg, står i eksemplet under.

### Button

```jsx
import { Button } from 'sassy';

<Button onClick={lagre}>Lagre</Button>
<Button variant="secondary" iconLeft="plus" onClick={ny}>Ny plante</Button>
<Button variant="danger" iconLeft="trash-2" onClick={() => setOpen(true)}>Slett bedet</Button>
```

Én `primary` per visning; `secondary`, `soft` og `ghost` til resten, `danger` til det som ikke kan angres. `loading` bytter ikonet mot en spinner og sperrer knappen.

- **Tastatur:** Enter og mellomrom trykker, som enhver `<button>`; fokusringen er 2 px i `--focus-color` og vises bare ved tastaturfokus.
- **Skjermleser:** navnet er teksten på knappen, ikonet er dekorativt; `loading` sier `aria-busy`. En knapp uten tekst har ikke noe navn, bruk `IconButton`.

Alle props: [Button](komponenter/Button.nb.md).

### Dialog

```jsx
import { Dialog, Button } from 'sassy';

<Dialog open={open} onClose={() => setOpen(false)} title="Slette bedet?" description="Tomatene og notatene forsvinner."
  footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Behold</Button><Button variant="danger" onClick={slett}>Slett bedet</Button></>}>
  <p>Du kan angre fra toasten etterpå.</p>
</Dialog>
```

Knappen fra Button åpner den med `setOpen(true)`. Gi alltid `onClose`: uten den finnes verken lukkeknapp, Esc eller klikk på bakteppet. Tittelen er spørsmålet, knappene sier hva som skjer.

- **Tastatur:** fokus går inn ved åpning, Tab og Shift+Tab holder seg inni, Esc lukker, og fokus går tilbake til knappen som åpnet.
- **Skjermleser:** `role="dialog"` med `aria-modal`, navngitt av `title` og beskrevet av `description`; lukkeknappen heter «Lukk» (`closeLabel` på engelske flater).

Alle props: [Dialog](komponenter/Dialog.nb.md).

### Toast og ToastStack

```jsx
import { Toast, ToastStack } from 'sassy';

<ToastStack>
  {slettet && <Toast tone="success" title="Bedet er slettet" actionLabel="Angre" onAction={angre} onClose={lukk} />}
</ToastStack>
```

`ToastStack` er beholderen nede til høyre og selve live-regionen (et område skjermlesere leser opp når innholdet endrer seg). Ha den i siden fra start, tom, og legg toaster inn i den. Det som kan angres, gjør du med en gang og gir «Angre» i toasten, i stedet for «Er du sikker?» før.

- **Tastatur:** handlingen og lukkeknappen er vanlige knapper som Tab når i sin tur; ingenting flytter fokus når en toast kommer.
- **Skjermleser:** stabelen er `role="status"` med `aria-live="polite"`, så teksten leses opp uten å avbryte; en toast fjerner seg ikke selv, timeren er din.

Alle props: [Toast](komponenter/Toast.nb.md).

## 5. Alt sammen, uten byggesteg

Knappen åpner dialogen, dialogen gjør noe som kan angres, og svaret kommer som en toast. Fjord som aksent og en knapp som bytter mellom lys og mørk. Lagre fila og åpne den i nettleseren. Den virker også åpnet rett fra disk.

<!-- eksempel: react-uten-bygg.html 420 -->
```html
<!doctype html>
<html lang="nb" data-theme="light" data-accent="fjord">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sassy uten byggesteg</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sassy-ui@v0.11.0/styles.css">
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@18.3.1/+esm",
    "react/jsx-runtime": "https://cdn.jsdelivr.net/npm/react@18.3.1/jsx-runtime/+esm",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/+esm",
    "react-dom/client": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/client/+esm",
    "sassy": "https://cdn.jsdelivr.net/gh/Mariisno/sassy-ui@v0.11.0/dist/sassy.browser.js"
  }
}
</script>
<style>main{max-width:480px;margin:0 auto;padding:24px 16px}</style>
</head>
<body>
<main id="app"></main>
<script type="module">
import { createElement as h, Fragment, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Dialog, Toast, ToastStack } from 'sassy';

function App() {
  const [open, setOpen] = useState(false);
  const [slettet, setSlettet] = useState(false);
  const slett = () => { setOpen(false); setSlettet(true); };
  const byttTema = () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark'; };
  return h('div', { style: { display: 'grid', gap: 16 } },
    h('h1', null, 'Hagelogg'),
    h('p', null, 'Knappen åpner en dialog. Det dialogen gjør kan angres, så svaret kommer som en toast.'),
    h('p', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
      h(Button, { variant: 'danger', iconLeft: 'trash-2', onClick: () => setOpen(true) }, 'Slett bedet'),
      h(Button, { variant: 'secondary', iconLeft: 'moon', onClick: byttTema }, 'Lys eller mørk')),
    h(Dialog, {
      open, onClose: () => setOpen(false), title: 'Slette bedet?', description: 'Tomatene og notatene forsvinner.', closeLabel: 'Lukk',
      footer: h(Fragment, null,
        h(Button, { variant: 'ghost', onClick: () => setOpen(false) }, 'Behold'),
        h(Button, { variant: 'danger', onClick: slett }, 'Slett bedet')),
    }, h('p', null, 'Du kan angre fra toasten etterpå.')),
    h(ToastStack, null,
      slettet && h(Toast, { tone: 'success', title: 'Bedet er slettet', actionLabel: 'Angre', onAction: () => setSlettet(false), onClose: () => setSlettet(false), closeLabel: 'Lukk' })));
}

createRoot(document.getElementById('app')).render(h(App));
</script>
</body>
</html>
```

## Videre

- [Komponenter](https://mariisno.github.io/sassy-ui/komponenter/): alle komponentene med eksempel, props, tilgjengelighet og innhold.
- [Grunnlag](https://mariisno.github.io/sassy-ui/grunnlag/): farger med målt kontrast, skrift, avstand, hjørner, skygger og bevegelse.
- [Tokens](https://mariisno.github.io/sassy-ui/tokens/): alle tokenene som JSON i W3C-formatet, til Style Dictionary og designverktøy.
- [Innhold](innhold.nb.md): stemmen, knappetekster, feilmeldinger og tomme tilstander.
