A row that opens something: a project, a recipe, a plant. One row, one target.

```jsx
<ListItem href="#/oppskrift/suppe" icon="book-open" title="Linsesuppe" meta="Rask hverdagsmiddag · 20 min" />
<ListItem onClick={openProject} image={cover} title="Tomater" meta="25 % · 3 bed" />
<ListItem icon="archive" title="Frø fra i fjor" meta="Sukkererter · 8 poser" />   {/* plain row, opens nothing */}
<ListItem href="#/p/1" title="Basilikum" trailing={<Badge tone="success">Ferdig</Badge>} />
<ListItem href="#/p/2" onClick={closeSheet} title="Mynte" />                      {/* a link can run onClick too */}
```

- Use `href` when the app has routes (a URL per page): the row is then a link and can open in a new tab. Apps without URL routing use `onClick`, which makes the row a button. A link can also have `onClick`, e.g. to close a sheet before it navigates.
- `disabled` works on both forms: a button is disabled, and a link gets `aria-disabled="true"` and goes nowhere.
- The chevron says "this opens". Hide it with `trailing={null}` only when the list is obviously navigation.
- `children` go under the meta line, and their text becomes part of the row's name for screen readers. The row is an `<a>` or a `<button>`, so children must be phrasing content: `<span>`, `Badge`, `Icon`, `Progress`, text. Don't use `<div>`, `<p>`, headings, or anything clickable. For a progress bar use `<Progress value={40} label="Uploaded" />`: it renders a `<span>`, so it is allowed inside the row.
- No buttons or links inside a row. Need a second action? Put it outside the row, or use a menu on the detail page.
- Something to tick off is a `Checkbox`, not a ListItem. A row that expands in place is a disclosure, not a ListItem.
- Images are decorative by default. Give `imageAlt` only when the picture says something the title doesn't.
