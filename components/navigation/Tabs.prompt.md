Switch between sibling views — underline for page sections, segmented for compact view toggles.

```jsx
<Tabs aria-label="Prosjekt" items={[{ id: 'tasks', label: 'Oppgaver', count: 12 }, { id: 'notes', label: 'Notater' }]} onChange={setTab}>
  <TabPanel value="tasks">…</TabPanel>
  <TabPanel value="notes">…</TabPanel>
</Tabs>
<Tabs variant="segmented" aria-label="Visning" items={[{ id: 'list', label: 'Liste' }, { id: 'board', label: 'Tavle' }]} />
```

- Put the content in `TabPanel`s as children, so each tab is tied to its panel for screen readers. A segmented filter without panels can leave them out.
- Give the tab list a name with `aria-label` when there is no heading right above it.
- Keyboard comes built in: Tab reaches the selected tab only, ←/→ move and select, Home/End jump to the ends, and Tab again goes into the panel.
