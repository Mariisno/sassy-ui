---
name: Fieldset
group: inputs
status: new
since: 0.7.0
side: https://mariisno.github.io/sassy-ui/en/components/fieldset/
typer: dist/inputs/Fieldset.d.ts
---

# Fieldset

A group of related controls, above all a radio or checkbox group: a native `<fieldset>` with a `<legend>` that names the group, an optional hint under the legend and an error under the controls, both tied to the group with `aria-describedby`. The error carries an icon and text and is announced (`role="alert"`), so colour is never the only signal; the group also gets a `--danger` edge on the left. The children are the existing [Radio](Radio.en.md), [Checkbox](Checkbox.en.md) and [Switch](Switch.en.md), unchanged.

## When to use

- A question with one answer among a few: a radio group. The question goes in `legend`.
- Several choices that belong to one question: a checkbox group ("Which days do you water?").
- The group needs one shared hint or one shared error ("Pick at least one day").
- A few switches that belong together, with `layout="row"`.

## When not to

- One checkbox on its own: [Checkbox](Checkbox.en.md) with `label` is enough.
- A text field: [Input](Input.en.md) has label, hint and error of its own; `Field` for your own control.
- As a layout box around fields that do not belong together. A `<fieldset>` says "these answer the same question".
- A choice among many: [Select](Select.en.md).

## Do

- Always give `legend`, as a question or a sentence: "How much sun does the spot get?". It is the group's name.
- Give the radios the same `name`, so the arrow keys work within the group.
- Write the error as what must be done: "Pick at least one day." The same text in the ErrorSummary.
- Give the group an `id` when an [ErrorSummary](ErrorSummary.en.md) links to it: the focus lands on the first control in the group.
- Use `layout="row"` only for two or three short options; otherwise they stack.

## Don't

- Do not set `aria-invalid` on the group itself; ARIA does not allow it on a group. Set it on the controls if the app wants to.
- Do not repeat the question in every `label`; the legend says it once.
- Not one error per box in the group. The error is about the group and sits under it.
- Not `disabled` on the group as "not available yet" without saying so in `hint`.

## Example

```jsx
import { Fieldset, Radio, Checkbox } from 'sassy/components';

<Fieldset legend="How much sun does the spot get?" hint="Measured at midday.">
  <Radio name="sun" value="full" label="Full sun" description="Six hours or more" />
  <Radio name="sun" value="part" label="Part shade" />
  <Radio name="sun" value="shade" label="Shade" />
</Fieldset>

<Fieldset id="days" legend="Which days do you water?" error={dayError} layout="row" optional optionalLabel="optional">
  <Checkbox name="day" value="mon" label="Monday" checked={days.has('mon')} onChange={pick} />
  <Checkbox name="day" value="thu" label="Thursday" checked={days.has('thu')} onChange={pick} />
</Fieldset>
```

## Props

The types are in `dist/inputs/Fieldset.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/fieldset/).

<!-- props: FieldsetProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `legend` | `React.ReactNode` | *required* | The question or name of the group, in the `<legend>`: "Hvor mye sol får stedet?" |
| `hint` | `React.ReactNode` | – | One line under the legend, e.g. "Velg alle som passer." Linked with aria-describedby. Hidden while there is an error. |
| `error` | `React.ReactNode` | – | The error under the controls, with an icon: "Velg minst én dag." Replaces the hint, is announced, and gives the group a danger edge. `aria-invalid` is not set on the group (ARIA does not allow it there); set it on the controls if the app wants it. |
| `optional` | `boolean` | – | Adds a quiet "Valgfritt" marker to the legend. |
| `optionalLabel` | `string` | `'Valgfritt'` | Text of the optional marker. Default "Valgfritt"; English surfaces pass "optional". |
| `layout` | `'column' \| 'row'` | `'column'` | `column` (default) stacks the controls; `row` lays them side by side and wraps, for two or three short options. |
| `children` | `React.ReactNode` | – | The controls: Radio, Checkbox or Switch, with a shared `name` for radios. |

Plus every attribute of `<fieldset>` (`React.FieldsetHTMLAttributes<HTMLFieldSetElement>`).
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, the rules in unit tests.

- **Element and role.** A native `<fieldset>` (role `group`) with `<legend>`. The browser names the group from the legend, and a screen reader says the name when the focus enters the group.
- **Name.** The text in `legend`, plus "Valgfritt" when `optional` is set. The controls have their own names from `label`.
- **Description.** `hint`, or `error` when there is one, gets the id `<id>-hint`, and the group points at it with `aria-describedby` (plus what the app passes itself, tested). The error replaces the hint, as in Field.
- **Error.** The error is text with a `circle-alert` icon before it (`aria-hidden`) in `--danger-fg`, and `role="alert"`, so it is read when it appears (WCAG 3.3.1, 4.1.3). The group gets a 3 px `--danger` edge on the left (≥ 3:1 on `--bg` in both themes). Icon, text and edge: colour is never alone (1.4.1). `aria-invalid` is not set on the group (not allowed on `group`); the app may set it on the controls.
- **Keyboard.** Nothing of its own. The radios move with the arrow keys, the boxes with Tab and Space, as elsewhere. `disabled` on the group disables every control in it (native) and dims them.
- **Focus.** The controls' own ring. When an ErrorSummary links to the group's `id`, the focus moves to the first control (tested).
- **Contrast.** The legend is `--fg-1`, the hint `--fg-3`, the error `--danger-fg`, the same pairs as Field (tested).
- **Motion.** None.
- **Built-in text.** "Valgfritt" with `optional`. Override with `optionalLabel`.
- **Known limits.** The target per option is the label's height (about 22 px), as Checkbox and Radio; give the rows air in a list for fingers. When several fields get an error at once on a submit, several `role="alert"` regions mount at the same time, and not all of them are guaranteed to be read; the focus on [ErrorSummary](ErrorSummary.en.md) is the reliable signal. VoiceOver does not read `aria-describedby` on a group, and reads the legend only when the focus enters the first control; the error text therefore also stands as plain text under the controls.

## Content

- `legend` is the question the group answers: "How much sun does the spot get?", "Which days do you water?".
- `hint` is one line on how to answer: "Pick all that apply.", "Measured at midday."
- `error` says what must be done, with a full stop: "Pick at least one day.", "Pick how much sun the spot gets."
- The options are short and in the same form: "Full sun", "Part shade", "Shade".
