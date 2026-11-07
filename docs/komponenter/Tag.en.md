---
name: Tag
group: display
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/tag/
typer: dist/display/Tag.d.ts
---

# Tag

A pill-shaped chip for filters, categories and removable selections. Without `onClick` it is a `<span>` with an edge; with `selected` or `onClick` it becomes a toggle button (`aria-pressed`) that fills with the soft accent when selected. `onRemove` adds a separate remove button (×, 24 px) beside the text, never inside the toggle, named "Fjern <text>" by default.

## When to use

- Filters in a row: "Open", "Mine", "This week", in a [ScrollRow](ScrollRow.en.md) on a phone.
- Categories and keywords on a thing: "research", "herbs".
- Choices made that can be taken away again: picked colours, picked people.

## When not to

- A status that cannot be pressed: [Badge](Badge.en.md).
- One choice among a few, in a form: [Radio](Radio.en.md).
- Views that switch content: [Tabs](Tabs.en.md) `variant="segmented"`.
- An action: [Button](Button.en.md). A Tag changes a state, it does not do something.

## Do

- Drive `selected` from the app's state; then `aria-pressed` is always true to life.
- Pass `removeLabel` on English surfaces ("Remove Figma"), and always when the content is not plain text.
- Keep the text to one or two words in sentence case.
- Allow none to be selected. A filter with nothing selected shows everything.

## Don't

- Don't put `onClick` on a Tag that is only decoration. It then promises something it does not keep.
- Don't put a link inside. The whole tag is the target.
- Don't use the remove button for "delete the thing". It removes the selection, not the object.
- Don't use more than one row of tags per view; more is a store, not a filter.

## Example

```jsx
import { Tag } from 'sassy/components';

<Tag icon="hash">research</Tag>
<Tag selected={open} onClick={() => setOpen(!open)}>Open</Tag>
<Tag onRemove={() => remove('herbs')} removeLabel="Remove herbs">herbs</Tag>
<Tag onRemove={() => remove('figma')} removeLabel="Remove Figma">Figma</Tag>
```

## Props

The types are in `dist/display/Tag.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/tag/).

<!-- props: TagProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | – | Lucide icon name |
| `selected` | `boolean` | – | Makes it a toggle (aria-pressed). |
| `onClick` | `(e: React.MouseEvent) => void` | – | A click on the tag (the toggle). |
| `onRemove` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | – | Shows a remove (×) button beside the label: a real button, 24 px, reachable by keyboard |
| `removeLabel` | `string` | `'Fjern <text>'` | Accessible name of the remove button. Default "Fjern <text>" when the tag's content is text, else "Fjern". |
| `children` | `React.ReactNode` | – | The text. |

Plus every attribute of the element it renders as (`React.HTMLAttributes<HTMLElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser.

- **Element and role.** Without `onClick` and `selected`: a `<span>`. With either: a `<button type="button">` with `aria-pressed`. With `onRemove`: a `<span>` that holds the text (or the toggle button) and a separate `<button>` for ×. A button is never inside another.
- **Name.** The tag is named by its text. The remove button is named `removeLabel`, else "Fjern <text>" when the content is text or a number, else just "Fjern". The icon is decorative.
- **Keyboard.** Tab reaches the toggle and the remove button separately. Enter and Space on × remove (tested); on the toggle they toggle. Removing does not toggle (`stopPropagation`).
- **State.** `aria-pressed="true"` fills with `--accent-soft` and `--accent-soft-fg`, 4.5:1 in every accent (tested). Selected is both colour and attribute.
- **Focus.** The standard focus ring (2 px `--focus-color`) on the toggle and on ×.
- **Contrast.** Unselected is `--fg-2` on `--surface-1` with a `--border-strong` edge; hover goes to `--fg-1`.
- **Target.** The tag is at least 28 px tall, the remove button 24 × 24 px (the WCAG 2.5.8 minimum, tested). Known limit: both are under the 44 px Sassy wants on touch; give the rows room.
- **Text.** Sizes itself to the content, never clipped (0.5.3).
- **Motion.** Transitions on `--dur-fast`, 0 under reduced motion.
- **Built-in text.** "Fjern" / "Fjern <text>" (Norwegian). Override with `removeLabel`.

## Content

- Lower case for keywords ("research", "herbs"), sentence case for filters ("This week").
- The same word in the filter as on the thing it filters by.
- `removeLabel` says what is removed: "Remove herbs", not "Close".
- No counts in the tag; the number sits in [Tabs](Tabs.en.md) `count` or in the heading.
