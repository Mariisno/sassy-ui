---
name: Switch
group: controls
status: stable
since: 0.2.0
side: https://mariisno.github.io/sassy-ui/en/components/switch/
typer: dist/controls/Switch.d.ts
---

# Switch

A toggle for settings that apply at once, with no save button. A native `<input type="checkbox" role="switch">` inside a `<label>`, with a 34 × 20 px track that fills with the accent when on, and a thumb that slides across. `label` and `description` as in Checkbox.

## When to use

- A setting that takes effect the moment you press it: dark theme, notifications, sound.
- When it is clear what "on" means without more explanation, or `description` can say it in one line.
- On a settings page where nothing is saved with a button ("Changes save as you go").

## When not to

- A choice in a form that is saved together: [Checkbox](Checkbox.en.md).
- One choice among several: [Radio](Radio.en.md).
- Something that triggers an action instead of changing a state: [Button](Button.en.md).
- Showing that something is on when it cannot be changed: [Badge](Badge.en.md).

## Do

- Drive it from the app's state (`checked` and `onChange`) and save at the same moment.
- Write `label` as what is on: "Dark theme", "Notifications".
- Use `description` when the consequence is not obvious: "Also when the app is closed".
- Give feedback only when something happens off screen, and quietly then (a toast without an action).

## Don't

- Don't put a Switch in a form with a "Save" button. It then does not apply at once, and people are misled.
- Don't phrase the text as an action ("Turn on notifications"); the switch is the action.
- Don't use it for a destructive change that needs confirmation.
- Don't show "On"/"Off" as text beside it; the track and the thumb show it, and the screen reader says it.

## Example

```jsx
import { Switch } from 'sassy/components';

<Switch label="Dark theme" checked={dark} onChange={(e) => setDark(e.target.checked)} />
<Switch label="Notifications" description="Also when the app is closed" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
```

## Props

The types are in `dist/controls/Switch.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/switch/).

<!-- props: SwitchProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | – | The text beside the switch. |
| `description` | `React.ReactNode` | – | A line under the text, in `--fg-3`. |

Plus every attribute of `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), except `type`.
<!-- /props -->

`ref` reaches the native `<input>` (tested).

## Accessibility

- **Element and role.** A native `<input type="checkbox">` with `role="switch"` inside `<label>`. The screen reader says "switch, on/off".
- **Name.** The text in `label` and `description`, through `<label>`.
- **Keyboard.** Space toggles. Nothing of its own.
- **State.** `checked` on the input. On: the track fills with `--accent`, the thumb slides 14 px. Off: the track is `--surface-3` with a 1 px `--border-control` edge, and the white thumb has a `--fg-3` ring, since white on the light track alone is 1.28:1 (tested). In dark mode the thumb on an on-track is `--accent-fg`, held at 3:1 against the track in every accent (tested).
- **Focus.** A 2 px `outline` in `--focus-color` around the track on keyboard focus.
- **Contrast.** The track edge is `--border-control`, at least 3:1 against the surfaces (tested).
- **Motion.** The track colour and the thumb transition on `--dur-base` (200 ms), 0 under reduced motion.
- **Target.** The track is 34 × 20 px; the click target is the whole label. Known limit: under 44 px on touch. Give the row room in the app.
- **Built-in text.** None.

## Content

- `label` is the state that is on, as a noun or a short phrase: "Dark theme", "Sound when a session ends".
- `description` says the reach: "Also when the app is closed", "Only on this device".
- The settings page can say it once, at the top: "Changes save as you go." Then no switch has to.
- No "Are you sure?". If the switch applies at once, it can be switched off again at once.
