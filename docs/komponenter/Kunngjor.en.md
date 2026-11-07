---
name: Kunngjor
group: utils
status: new
since: 0.11.0
side: https://mariisno.github.io/sassy-ui/en/components/kunngjor/
typer: dist/utils/kunngjor.d.ts
---

# Kunngjor

`kunngjor(melding, { haster })` («announce», with «urgent») tells a screen reader something that has no place on the screen as text: «Saved», «3 plants found», «The row moved down». A framework-free function without dependencies, safe to import on a server: nothing touches the document before the first call. The message goes through a live region that is created the first time it is needed, visually hidden and kept in the page: a polite one (`role="status"`), and an urgent one (`role="alert"`) the first time `haster` is used. Each call empties the region and writes the message a moment later, so the same message twice is read twice.

## When to use

- When something happens without anything visible changing where the focus is: a filter that updated a list («3 plants found»), a row that moved, a save in the background.
- After a keyboard action whose result is elsewhere on the page.
- When the app has a status line that updates often, and only the end result should be read.

## When not to

- When the message should be seen too: [Toast](Toast.en.md) in a `ToastStack` (which is its own live region) or [Alert](Alert.en.md).
- An error in a field: `error` on [Input](Input.en.md) is read by itself.
- The errors of a form after a submit: [ErrorSummary](ErrorSummary.en.md) takes the focus.
- The characters in a field: `count` on Input and Textarea has its own, delayed announcement.

## Do

- Say the result, briefly: «3 plants found», not «Your search has now completed and returned 3 results».
- Keep messages polite; use `haster` only for what cannot wait, such as a lost connection.
- Call it after the change is made, not before.
- Send one message per event; calls that come close together are read together.

## Don't

- Don't announce every keystroke or every row of a list; wait until the user stops (debounce) and say the total.
- Don't use it instead of visible text when sighted people need the message too.
- Not `haster` for confirmations such as «Saved»; it interrupts what is being read.
- Don't add a live region of your own next to it for the same thing; a new one is often empty when it is read.

## Example

```jsx
import { kunngjor, Input } from 'sassy/components';

function PlantList({ plants }) {
  const [query, setQuery] = useState('');
  const hits = plants.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    if (!query) return;
    const t = setTimeout(() => kunngjor(`${hits.length} plants found`), 500);
    return () => clearTimeout(t);
  }, [query, hits.length]);
  return <Input label="Search plants" mode="search" value={query} onChange={(e) => setQuery(e.target.value)} />;
}

kunngjor('Lost the connection. We will save when it is back.', { haster: true });
```

## Props

The types are in `dist/utils/kunngjor.d.ts`. A live example is on [its page on the documentation site](https://mariisno.github.io/sassy-ui/en/components/kunngjor/).

`kunngjor(melding: string, valg?: KunngjorValg): void`. An empty message, or a call without a document (on a server), does nothing.

<!-- props: KunngjorValg -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `haster` | `boolean` | – | `true` reads the message at once, interrupting what is being read (an assertive region, `role="alert"`). Only for what cannot wait: a lost connection, a failed save. Default false: polite, after what is being read. |
<!-- /props -->

## Accessibility

The behaviour is tested in a browser, and that it is safe without a document in unit tests.

- **Element and role.** A `<div>` with `role="status"`, `aria-live="polite"` and `aria-atomic="true"`; with `haster` a separate one with `role="alert"` and `aria-live="assertive"`. Each is created on the first call of its kind (not on import) and stays, so the region is in the page before it changes the next time. The first time it waits 500 ms before writing, so the screen reader has seen the empty region.
- **Repeats.** Each call empties the region and writes the message 100 ms later; the same message twice is read twice (tested). Calls within those 100 ms are read together, in order. The text is removed after 7 seconds, so it is not left behind for someone browsing the page.
- **Modal dialogs.** While a modal dialog is open (a `<dialog>` opened as modal, or `aria-modal="true"` as in Sassy's Dialog), the region moves into the innermost one: a screen reader treats everything outside as gone, live regions included (tested). If the dialog closes before the message is written (save in a dialog, announce «Saved», close), the region moves back to `<body>` and the message is written there after a new 500 ms pause (tested). A hidden element with `aria-modal` does not count.
- **Visibility.** 1 × 1 px and clipped, never `display:none`, with the style set on the element, so it works without Sassy's CSS too.
- **Focus.** Never moved.
- **Built-in text.** None; the message is the app's.
- **Known limits.** How and when a message is read is up to the screen reader. A polite message may be read after what is being read now, or merged with it; an urgent one interrupts.

## Content

- The result, not the process: «Saved», «3 plants found», «The row is now number 2 of 5».
- One short sentence. No «Success!», no emoji.
- The same words as on the screen, so the one who sees and the one who hears get the same message.
- In Norwegian the same: «Lagret», «3 planter funnet».
