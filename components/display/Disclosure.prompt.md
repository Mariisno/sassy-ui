A section that shows and hides: native `<details>`/`<summary>` with the title in a 44 px row and a chevron that turns when it opens. The content is in the page whether it is open or not.

```jsx
<Disclosure title="Vanning og gjødsling">
  <p>Vann om morgenen. Gjødsle annenhver uke fra juni.</p>
</Disclosure>
<Disclosure title="Sådato per sort" defaultOpen>…</Disclosure>
<Disclosure title={<h3>Jordtyper</h3>} open={open} onToggle={setOpen}>…</Disclosure>   {/* controlled */}
```

- The browser gives the summary the button role, `aria-expanded`, Enter and Space; nothing is added. `title` is the row's text and the button's name: say what the section holds, not «Vis mer».
- Uncontrolled by default (`defaultOpen` for open at start). `open` + `onToggle` for a controlled one: the app must update `open` in `onToggle`, or the section snaps back.
- One section at a time. Several Disclosures after each other are a list of sections, not an accordion: opening one does not close the others.
- Keep what is inside secondary: details, help, a long list. Something people need every time stays on the page, outside a Disclosure.
- The chevron turns on `--dur-base`, which is 0 under `prefers-reduced-motion`. The colours are `--fg-1`, `--fg-3`, `--surface-1` and `--border`, no state colour.
- Not for a menu (`Menu`), a settings panel that opens over the page (`Dialog`, `Popover`) or switching between views (`Tabs`).
