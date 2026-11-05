The app frame with the main menu: tab bar at the bottom on phones, sidebar from 900 px.

```jsx
<AppShell
  items={[{ id: 'idag', label: 'I dag', icon: 'sparkles', href: '#/idag' }, { id: 'garderobe', label: 'Garderobe', icon: 'layout-grid', href: '#/garderobe' }, { id: 'legg', label: 'Legg til', icon: 'plus', href: '#/legg' }]}
  current={route}
  brand={<span>sussi<i>.</i></span>}
  footer={<Konto />}>
  <Page />
</AppShell>
```

- 3–5 items. With six or more, the fifth tab becomes "Mer" (`moreLabel`), a list of the rest. Fewer than five is better (Hick's law).
- Every item has an icon and a short label. The label is what people read; keep it to one word. The icon is a Lucide name, or the app's own as `icon: (size) => <PlantIcon size={size} />`, drawn on Lucide's grid.
- The active item gets a filled surface and a semibold label, never colour alone.
- AppShell renders `<main>`, pads it for the tab bar and the safe area, and names both menus "Hovedmeny" (`label`).
- The first thing in the tab order is a skip link to `<main>` ("Hopp til innholdet", `skipLabel`). It shows when it has focus and moves focus with code, so the route in the hash stays. Don't add your own.
- English surfaces pass `label="Main menu"`, `moreLabel="More"` and `skipLabel="Skip to content"`.
- An app that stays phone-width on a big screen passes `contained`: the tab bar sits at the bottom of the app's own frame at every width, and there is no sidebar. Give the parent a height; the page sets its own padding.
