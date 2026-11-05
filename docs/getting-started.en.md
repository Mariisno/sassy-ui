# Getting started

Sussi is a small design system by NotlandDesign: design tokens, CSS and React components, built for WCAG 2.2 AA in light and dark. This page takes you from nothing to a page with a button, a dialog and a toast, in your own colours. Every example is a complete HTML file you can save and open.

## 1. Install

Pick one of three ways. All three give the same CSS and the same components; the difference is whether and where React comes in.

### CSS only

The tokens, the fonts and the `.s-*` classes in one file, from jsDelivr. No JavaScript, no package.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sussi-ui@v0.9.0/styles.css">
```

The file loads the tokens, the fonts (Schibsted Grotesk and DM Mono, hosted in the same place) and the component styles. A whole example:

<!-- eksempel: bare-css.html 400 -->
```html
<!doctype html>
<html lang="nb" data-theme="light" data-accent="moss">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sussi, bare CSS</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sussi-ui@v0.9.0/styles.css">
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

The words in the examples are Norwegian, Sussi's default language; the markup is the same in any language.

### React with npm

React 18.3 or 19, installed from GitHub (the package is not on npm):

```sh
npm install github:Mariisno/sussi-ui#v0.9.0
```

```jsx
import 'sussi/styles.css';
import { Button } from 'sussi';

export default function App() {
  return <Button variant="primary">Lagre</Button>;
}
```

The components are compiled ESM (JavaScript modules with `import` and `export`) in `dist/` with types beside them. React is yours, a peer dependency (the package uses the React your app already has instead of bringing its own), so nothing is bundled twice.

### No build step

One HTML file and an import map (a `<script type="importmap">` that tells the browser where `import 'react'` and `import 'sussi'` come from): React from jsDelivr and Sussi as one ESM file, `dist/sussi.browser.js`. The versions are pinned, so the file looks the same next year.

```html
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@18.3.1/+esm",
    "react/jsx-runtime": "https://cdn.jsdelivr.net/npm/react@18.3.1/jsx-runtime/+esm",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/+esm",
    "react-dom/client": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/client/+esm",
    "sussi": "https://cdn.jsdelivr.net/gh/Mariisno/sussi-ui@v0.9.0/dist/sussi.browser.js"
  }
}
</script>
```

Without a build step there is no JSX, so the example at the bottom writes `h('p', null, …)` with `createElement`. The rest is the same.

## 2. Set the theme and an accent

Two attributes on `<html>` control everything:

```html
<html lang="nb" data-theme="dark" data-accent="fjord">
```

- `data-theme` is `light` or `dark`. Nothing switches on its own; set it from `prefers-color-scheme` if you like, and remember the choice.
- `data-accent` picks one of the six accents: `moss` (the default, no need to set it), `clay`, `fjord`, `lichen`, `lyng` and `ochre`. The accent colours the primary button, links, the focus ring, selected tabs and the soft background of badges.

Every pair in every accent is measured in both modes: button text on the accent 4.5:1, the accent as a surface 3:1, links 4.5:1, the focus ring 3:1 and text on the soft accent 4.5:1. The numbers are on [Foundations](https://mariisno.github.io/sussi-ui/en/foundations/).

## 3. Your own colours

You are not limited to the six. The engine (`tokens/tema.js`) takes one accent colour, derives the whole token group in OKLCH (a colour space where lightness is an axis of its own, so it can move without the hue shifting), and moves lightness only as far as every pair needs to hold the same requirement as Sussi's own accents. What you set yourself never moves.

### In the theme builder

Open the [theme builder](https://mariisno.github.io/sussi-ui/en/theme/), pick a colour and give the theme a name. Everything runs in the browser:

1. **The preview** shows real components in the theme, light and dark side by side.
2. **Under the accent field** the answer is there at once: "OK.", and whether the engine had to move your colour, how far and why. **The report** further down lists every rule with the measured ratio, and under "Moved" everything the engine adjusted. When it says "OK: all 124 pairs hold" (62 in each mode), you are done.
3. **Download CSS** gives you `name.css`. Load it after `styles.css` and set `data-tema="name"` on `<html>` beside `data-theme`. You then need no `data-accent`; the theme file overrides it.

### From the command line

The same theme from the terminal, with the package installed from GitHub (step 1):

```sh
npx sussi-tema --aksent "#2F6F9F" --navn hav > hav.css
```

The CSS goes to stdout (standard output, what `>` sends to the file), the report to stderr (the error stream, which stays in the terminal). `--format json` gives the tokens as DTCG JSON (the W3C format for design tokens, which Style Dictionary and design tools read), `--preset fjord` gives one of the six, and `--overstyr '{"--bg":"#F4F7FA"}' --modus light` locks a surface or a text colour. The theme builder writes the command for you under "The same theme from the command line".

In an app with npm, load the theme file right after Sussi's CSS, `import 'sussi/styles.css';` and then `import './hav.css';`, and set `data-tema="hav"` on `<html>`.

### When a colour has to move

A light yellow is fine as the accent in dark mode, but white button text on it does not hold in light mode. This is the report for `#F2E16B`, exactly as it comes out:

```sh
npx sussi-tema --aksent "#F2E16B" --navn sol > sol.css
```

```text
Sussi theme "sol" (aksent, from #F2E16B): ok, every rule holds
  light: --accent #807200, --accent-text #7C6E00, --accent-fg #F9F8E8, --focus-color #807200
    moved --accent #F2E16B -> #807200 (L -0.353): button text on the accent
    moved --accent-text #807200 -> #7C6E00 (L -0.013): links on --surface-2
    62 pairs measured, tightest --fg-2 on --surface-3: 4.5:1 (needs 4.5:1)
  dark: --accent #F2E16B, --accent-text #F2E16B, --accent-fg #1A1601, --focus-color #F2E16B
    nothing moved
    62 pairs measured, tightest --border-control on --surface-2: 3.22:1 (needs 3:1)
```

Read it like this: in light mode the accent was darkened from `#F2E16B` to `#807200` so the button text holds 4.5:1, and the link colour was moved one step further for `--surface-2`. In dark mode everything held as it was. The theme is OK, and the yellow you chose is still the accent wherever it can be.

When a pair cannot be made to hold, you get **Not OK** instead: the theme builder says "Not OK" under the accent field, with what to change and a value that holds, and the download is called "Download anyway". The command line prints `WARNING` and `ADVARSEL`, the same advice under `TO FIX` and `SLIK RETTER DU`, and exits with code 1. The CSS is still written, with the warning as a comment at the top (`/* NOT OK: … */`), so you can see what is missing. It only happens when something you locked yourself is in the way: the engine cannot move a value you set, and says which one.

<!-- detaljer -->
### What the guarantee covers

The guarantee is the contrast between Sussi's own tokens, where the components use them. In each mode 62 pairs are measured, and every one must hold its requirement before the theme is OK:

- **The accent:** button text on the accent, also while hovered and pressed (4.5:1); the accent as a surface, such as an active row or a progress fill, on the background and the three surfaces (3:1); links on the background, `--surface-1` and `--surface-2` (4.5:1); the focus ring on the same three (3:1); text on the soft accent in badges and selected tags, also while hovered (4.5:1); selected text (4.5:1). A link must also change colour on hover.
- **Text and edges:** body and secondary text on the background and the three surfaces (4.5:1), meta text on the first three (4.5:1) and on `--surface-3` as the switch thumb ring (3:1), the edge of inputs and checkboxes (3:1).
- **Status:** progress fills and toast icons in success, warning, danger and info (3:1), the text in status badges (4.5:1), the error under a field (4.5:1) and the edge of an invalid field (3:1), the text on the danger button, also while hovered (4.5:1), and the colour in `--focus-ring` (3:1).

The rules are `REGLER` in `tokens/tema.js`, and the report in the theme builder shows every pair with its measured value. The guarantee does not cover colours you put on top yourself, images, or components that are not Sussi's; there you measure yourself.
<!-- /detaljer -->

## 4. Three components

With the package installed (step 1) you write JSX. The same three components, running without a build step, are in the example below.

### Button

```jsx
import { Button } from 'sussi';

<Button onClick={save}>Lagre</Button>
<Button variant="secondary" iconLeft="plus" onClick={create}>Ny plante</Button>
<Button variant="danger" iconLeft="trash-2" onClick={() => setOpen(true)}>Slett bedet</Button>
```

One `primary` per view; `secondary`, `soft` and `ghost` for the rest, `danger` for what cannot be undone. `loading` swaps the icon for a spinner and disables the button.

- **Keyboard:** Enter and Space press it, like any `<button>`; the focus ring is 2 px in `--focus-color` and shows on keyboard focus only.
- **Screen reader:** the name is the text on the button, the icon is decorative; `loading` sets `aria-busy`. A button without text has no name, use `IconButton`.

All props: [Button](komponenter/Button.en.md).

### Dialog

```jsx
import { Dialog, Button } from 'sussi';

<Dialog open={open} onClose={() => setOpen(false)} title="Slette bedet?" description="Tomatene og notatene forsvinner." closeLabel="Close"
  footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Behold</Button><Button variant="danger" onClick={remove}>Slett bedet</Button></>}>
  <p>Du kan angre fra toasten etterpå.</p>
</Dialog>
```

The Button opens it with `setOpen(true)`. Always give `onClose`: without it there is no close button, no Esc and no click on the scrim. The title is the question, the buttons say what happens.

- **Keyboard:** focus moves in on open, Tab and Shift+Tab stay inside, Esc closes, and focus returns to the button that opened it.
- **Screen reader:** `role="dialog"` with `aria-modal`, named by `title` and described by `description`; the close button is called "Lukk" unless you pass `closeLabel="Close"`.

All props: [Dialog](komponenter/Dialog.en.md).

### Toast and ToastStack

```jsx
import { Toast, ToastStack } from 'sussi';

<ToastStack>
  {deleted && <Toast tone="success" title="Bedet er slettet" actionLabel="Angre" onAction={undo} onClose={dismiss} closeLabel="Dismiss" />}
</ToastStack>
```

`ToastStack` is the container at the bottom right and the live region itself (an area screen readers read out when its content changes). Have it in the page from the start, empty, and add toasts to it. What can be undone, do at once and offer "Undo" in the toast, instead of "Are you sure?" before.

- **Keyboard:** the action and the close button are ordinary buttons that Tab reaches in document order; nothing moves focus when a toast arrives.
- **Screen reader:** the stack is `role="status"` with `aria-live="polite"`, so the text is announced without interrupting; a toast does not remove itself, the timer is yours.

All props: [Toast](komponenter/Toast.en.md).

## 5. All of it, without a build step

The button opens the dialog, the dialog does something that can be undone, and the answer arrives as a toast. Fjord as the accent, and a button that switches between light and dark. Save the file and open it in the browser. It also works opened straight from disk.

<!-- eksempel: react-uten-bygg.html 420 -->
```html
<!doctype html>
<html lang="nb" data-theme="light" data-accent="fjord">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sussi uten byggesteg</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mariisno/sussi-ui@v0.9.0/styles.css">
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@18.3.1/+esm",
    "react/jsx-runtime": "https://cdn.jsdelivr.net/npm/react@18.3.1/jsx-runtime/+esm",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/+esm",
    "react-dom/client": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/client/+esm",
    "sussi": "https://cdn.jsdelivr.net/gh/Mariisno/sussi-ui@v0.9.0/dist/sussi.browser.js"
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
import { Button, Dialog, Toast, ToastStack } from 'sussi';

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
      open, onClose: () => setOpen(false), title: 'Slette bedet?', description: 'Tomatene og notatene forsvinner.',
      footer: h(Fragment, null,
        h(Button, { variant: 'ghost', onClick: () => setOpen(false) }, 'Behold'),
        h(Button, { variant: 'danger', onClick: slett }, 'Slett bedet')),
    }, h('p', null, 'Du kan angre fra toasten etterpå.')),
    h(ToastStack, null,
      slettet && h(Toast, { tone: 'success', title: 'Bedet er slettet', actionLabel: 'Angre', onAction: () => setSlettet(false), onClose: () => setSlettet(false) })));
}

createRoot(document.getElementById('app')).render(h(App));
</script>
</body>
</html>
```

## Next

- [Components](https://mariisno.github.io/sussi-ui/en/components/): every component with an example, props, accessibility and content.
- [Foundations](https://mariisno.github.io/sussi-ui/en/foundations/): colours with measured contrast, type, spacing, corners, shadows and motion.
- [Tokens](https://mariisno.github.io/sussi-ui/en/tokens/): every token as JSON in the W3C format, for Style Dictionary and design tools.
- [Content](content.en.md): the voice, button text, error messages and empty states.
