---
name: Radio
group: controls
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/radio/
typer: dist/controls/Radio.d.ts
---

# Radio

A radio button for one choice among two to five visible options. A native `<input type="radio">` inside a `<label>`, with a round box that gets an accent dot when selected, and an optional `description` under the text. Several Radios with the same `name` form a group, and the browser keeps exactly one selected.

## When to use

- One choice among a few, where every option should be visible: "Private / Public", "Light / Medium / Heavy".
- When the options each need a line of explanation (`description`).
- In a form that is saved with a button.

## When not to

- More than five options: [Select](Select.en.md).
- Two to five short answers that fit on one row: [SegmentedControl](SegmentedControl.en.md), the same radio group in less height.
- Several choices at once: [Checkbox](Checkbox.en.md).
- Switching a view or a filter, where the choice applies at once: [Tabs](Tabs.en.md) `variant="segmented"` or [Tag](Tag.en.md).
- On or off: [Switch](Switch.en.md).

## Do

- Give everyone in the group the same `name` and their own `value`.
- Have one option selected from the start (`defaultChecked`) when there is a sensible default.
- Wrap the group in a [Fieldset](Fieldset.en.md) with a `legend` that says what the choice is about, so the screen reader gets the question; it also gives the group a hint and an error.
- Keep the options short and parallel: "Light", "Medium", "Heavy".

## Don't

- Don't leave a Radio on its own. One option is not a group; that is a Checkbox or a Switch.
- Don't mix Radio and Checkbox in one list.
- Don't use it to navigate or to trigger something at once.
- Don't explain in `label` what belongs in `description`.

## Example

```jsx
import { Fieldset, Radio } from 'sassy/components';

<Fieldset legend="Who sees the project?">
  <Radio name="visibility" value="private" label="Private" description="Only you" defaultChecked />
  <Radio name="visibility" value="link" label="Anyone with the link" />
  <Radio name="visibility" value="public" label="Public" description="Shown on your profile" />
</Fieldset>
```

## Props

The types are in `dist/controls/Radio.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/radio/).

<!-- props: RadioProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | The text beside the button. |
| `description` | `React.ReactNode` | – | A line under the text, in `--fg-3`. |

Plus every attribute of `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), except `type`.
<!-- /props -->

`ref` reaches the native `<input>` (tested).

## Accessibility

- **Element and role.** A native `<input type="radio">` inside `<label>`. The input is visually hidden; the round box draws the state. The group is the browser's: the same `name`.
- **Name.** The text in `label` and `description`, through `<label>`. The question the group answers is the app's to give, in `legend` on [Fieldset](Fieldset.en.md).
- **Keyboard.** Tab lands on the selected option (or the first), the arrow keys move and select within the group, as in every browser. Nothing of its own in the component.
- **State.** `checked` on the input. Selected fills the box with `--accent` and shows a dot in `--accent-fg`. `disabled` gives 50% opacity.
- **Focus.** A 2 px `outline` in `--focus-color` around the box on keyboard focus.
- **Contrast.** The edge is `--border-control`, at least 3:1 against the surfaces in both themes and every accent (tested). The dot is `--accent-fg` on `--accent`.
- **Motion.** The dot transitions on `--dur-fast`, 0 under reduced motion.
- **Target.** The box is 18 px, the click target the whole label. Known limit: under 44 px on touch, like Checkbox.
- **Built-in text.** None.

## Content

- The options are short nouns or adjectives in the same form: "Private", "Public".
- The question sits in Fieldset's `legend`, as a question or a sentence: "Who sees the project?"
- `description` says the consequence, not a repeat: "Only you", "Shown on your profile".
- The default is the safest choice, not the most ambitious one.
