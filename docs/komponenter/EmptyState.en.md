---
name: EmptyState
group: feedback
status: stable
since: 0.4.0
side: https://mariisno.github.io/sassy-ui/en/components/emptystate/
typer: dist/feedback/EmptyState.d.ts
---

# EmptyState

What a list or a page shows when there is nothing in it yet. An icon in a 56 px soft accent circle, a heading, one calm line on what to do next, and at most one action, usually a [Button](Button.en.md). Centred, with the text capped at 30 characters wide. The heading level is the page's to choose (`level`, default h2), and `framed` draws it as a card when it sits among other cards.

## When to use

- A list with nothing in it yet: the first time, or after everything was removed.
- A search or filter with no hits.
- A page waiting for something from outside: offline, no access.

## When not to

- While something loads: a [Progress](Progress.en.md) without a value, or Sussi in the `sover` pose.
- An error that happened: an error message in context, or a [Toast](Toast.en.md) with `danger`.
- A short note inside a card that otherwise has content: text.

## Do

- Say what is empty and what the next step is: "No tasks yet" + "Add the first one and it shows up here."
- Offer one action, and only when there is a clear next step. A filter with no hits offers to clear the filter, not to add.
- Pick `level` by the page outline: h2 under the page's h1, h3 inside a section.
- Use `framed` among cards, no frame when it fills the page.

## Don't

- No "Oops", no exclamation marks, no blame. An empty list is not an error.
- Don't offer two actions. The second belongs in the menu.
- Don't write long text; `description` is one line.
- Don't use an illustration that carries meaning. The icon is decorative; the heading carries the meaning.

## Example

```jsx
import { EmptyState, Button } from 'sassy/components';

<EmptyState icon="inbox" title="No tasks yet" description="Add the first one and it shows up here."
  action={<Button iconLeft="plus" onClick={newTask}>Add task</Button>} />
<EmptyState icon="search" title="No results" description="Try a shorter word, or clear a filter." level={3} />
<EmptyState framed icon="info" title="You're offline" description="What you do now is saved when the network is back." />
```

## Props

The types are in `dist/feedback/EmptyState.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/emptystate/).

<!-- props: EmptyStateProps -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | – | Lucide icon name, in a 56 px soft accent circle. Decorative. |
| `title` | `React.ReactNode` | *required* | The heading, e.g. "Ingen plagg ennå". |
| `description` | `React.ReactNode` | – | One line on what to do, e.g. "Legg til det første plagget, så dukker det opp her." |
| `action` | `React.ReactNode` | – | One action, usually a Button. |
| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `2` | Heading level, 2–6. Default 2. Pick the one that fits the page outline. |
| `framed` | `boolean` | `false` | Draw it as a card (surface-1, border, radius). Default false: it sits on the page. |
| `children` | `React.ReactNode` | – | Extra content between the text and the action, e.g. a second line of meta. |

Plus every attribute of `<div>` (`React.HTMLAttributes<HTMLDivElement>`), except `title`.
<!-- /props -->

## Accessibility

The behaviour is tested in a browser.

- **Element and role.** A `<div>` without a role, with a real heading (`<h2>` to `<h6>` by `level`, clamped to 2–6) and a `<p>` for `description`.
- **Name.** The heading is what a screen reader finds in the outline. The icon is `aria-hidden` (tested).
- **Keyboard and focus.** None of its own. The action in `action` is an ordinary Button with its own focus ring.
- **Contrast.** The heading is `--fg-1`, the text `--fg-2`, both 4.5:1 on `--bg` and `--surface-1`. The icon is `--accent-soft-fg` on `--accent-soft`, 4.5:1 in every accent (tested).
- **Motion.** None.
- **Built-in text.** None; the heading and the text are the app's.
- **Known limit.** A `level` under 2 is rounded up to 2: an EmptyState is never the page's h1.

## Content

- The heading says what is missing, in the present tense: "No tasks yet", "No results".
- "yet" when something will come later; not when a search was simply empty.
- `description` is one next step, addressed to you or without a subject: "Add the first one and it shows up here."
- The action repeats the verb: "Add task".
- Low pressure. Not "Get started now!", not "You haven't done anything yet".
