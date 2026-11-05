---
name: FileButton
group: buttons
status: new
since: 0.5.7
kort: components/buttons/filebutton.card.html
typer: components/buttons/FileButton.d.ts
---

# FileButton

A button that opens the file chooser. It looks like [Button](Button.en.md), with the same variants and sizes, but is a `<label class="s-btn">` around a visually hidden `<input type="file">`. The input stays in the tab order, so Tab lands on it and the label shows the focus ring. `onFiles` gets the files picked, and the input is reset after each pick.

## When to use

- Taking or picking a picture: `accept="image/*"`, and `capture="environment"` for the back camera on a phone.
- Restoring a backup or reading an export: `accept=".json,application/json"`.
- Several files at once with `multiple`.

## When not to

- Drag and drop or a whole upload area: that is the app's own component. FileButton is only the button.
- An action that does not open the chooser: [Button](Button.en.md).
- Showing how far an upload has come: [Progress](Progress.en.md).

## Do

- Name the outcome in the text: "Take photo", "Choose file", "Restore from backup". Never "Browse".
- Set `accept`, so the chooser shows only what fits.
- Give feedback after the pick (the file name, a preview, a toast). The button itself shows nothing.
- Use `ref.current.click()` when the app wants to open the chooser from somewhere else; `ref` reaches the input.

## Don't

- Don't put a `Button` inside a `FileButton`. That is a button inside a label.
- Don't count on `capture` on a desktop; the chooser opens as usual there.
- Don't leave out the text. There is no built-in one.
- Don't `disabled` without an explanation beside it.

## Example

```jsx
import { FileButton } from 'sussi/components';

<FileButton iconLeft="image" accept="image/*" capture="environment" onFiles={([file]) => takePhoto(file)}>Take photo</FileButton>
<FileButton variant="secondary" iconLeft="image" accept="image/*" multiple onFiles={add}>Choose pictures</FileButton>
<FileButton variant="ghost" size="sm" accept=".json,application/json" onFiles={([file]) => restore(file)}>Restore from backup</FileButton>
```

## Props

The types are in `components/buttons/FileButton.d.ts`. The card: `components/buttons/filebutton.card.html`.

<!-- props: FileButtonProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'danger'` | `'primary'` | The same variants as Button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The same sizes as Button. |
| `iconLeft` | `string` | – | Lucide icon name shown before the label (e.g. "image", "upload") |
| `iconRight` | `string` | – | Lucide icon name shown after the label |
| `fullWidth` | `boolean` | `false` | Fills the width. |
| `accept` | `string` | – | What the chooser offers, e.g. "image/*" or ".json,application/json" |
| `capture` | `'user' \| 'environment'` | – | On phones: open the camera instead of the library. "environment" is the back camera, "user" the front. |
| `multiple` | `boolean` | `false` | Several files at once. |
| `disabled` | `boolean` | `false` | Disabled: takes neither focus nor clicks. |
| `onFiles` | `(files: File[]) => void` | – | The files picked, never empty. The input is reset after each pick, so picking the same file again calls this again. |
| `className` | `string` | – | Reaches the label, not the input |
| `style` | `React.CSSProperties` | – | Reaches the label, not the input |
| `children` | `React.ReactNode` | – | The text on the button. |

Plus every attribute of `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), except `type`, `size`, `value`, `children`.
<!-- /props -->

`className` and `style` go to the label. Everything else (`id`, `name`, `aria-describedby`) goes to the input, and `ref` reaches the input.

## Accessibility

The behaviour is tested in `tests/filebutton.e2e.test.mjs`, the rules in `tests/filebutton.test.mjs`.

- **Element and role.** A `<label>` with the button classes around an `<input type="file">`. The input is hidden with `clip`, not `display:none`, so it keeps keyboard focus.
- **Keyboard.** Tab lands on the input. Enter opens the chooser (tested; Space is the browser's usual behaviour for a file input). A disabled input is skipped by Tab.
- **Name.** The label's text, that is `children`, through `<label>`. The icons are decorative.
- **Focus.** The label shows a 2 px ring in `--focus-color` with a 2 px offset when the input has keyboard focus (`:has(:focus-visible)`), like Button. With a mouse there is no ring.
- **State.** `disabled` sets `disabled` on the input and gives the label 50% opacity, a `not-allowed` cursor and `pointer-events:none`. A click opens nothing.
- **Picks.** `onFiles` is called only with a non-empty list. The input is reset, so the same file twice in a row calls it twice.
- **Target and contrast.** As Button: 30/38/46 px, the same fill and text.
- **Built-in text.** None. The text is yours.
- **Known limit.** The focus ring uses `:has()`, which needs a browser that supports it.

## Content

- Verb first: "Take photo", "Choose file", "Upload picture".
- Say what is being picked when it is not obvious: "Choose pictures", "Restore backup (.json)".
- Say what happens next somewhere else, in a toast or by the preview: "Picture added".
- A rejected file? Explain why, without blame: "The file is over 20 MB. Try a smaller one."
