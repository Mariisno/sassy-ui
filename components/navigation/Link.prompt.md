A link: the accent text colour and an underline, in running text or on its own line. With `target="_blank"` it says so: `rel="noopener noreferrer"`, an external icon and the visually hidden «(åpner i ny fane)».

```jsx
<p>Les mer om <Link href="/jord">jordtyper</Link> før du sår.</p>
<Link variant="standalone" href="/saadagbok">Se hele sådagboka</Link>
<Link href="https://example.com/frø" target="_blank">Frøkatalogen</Link>
<Link as={RouterLink} to="/planter/tomat">Tomat</Link>   {/* React Router keeps client-side routing */}
<Link href="https://example.com" target="_blank" newTabLabel="(opens in a new tab)">Seed catalogue</Link>
```

- `inline` (default) sits in a sentence and wraps with it; `standalone` is a link on its own line, medium weight and at least 24 px tall.
- `target="_blank"` adds `rel="noopener noreferrer"`, the icon and the hidden «(åpner i ny fane)»; English surfaces pass `newTabLabel="(opens in a new tab)"`. `external` shows the icon on a link that leaves the app in the same tab, `external={false}` hides it.
- `as` takes a router's Link (React Router: `as={RouterLink}` with `to`); it must render an `<a>`. Plain `<a>` elsewhere already look the same: base.css styles every link.
- The text says where the link goes: «sådagboka», never «her» or «klikk her». It is what a screen reader lists.
- Something that does something on the page (save, open a dialog) is a `Button` (`variant="ghost"` for a quiet one), never a Link with `onClick`. A row that opens something is a `ListItem`.
- The colour holds 4.5:1 on `--bg`, `--surface-1` and `--surface-2`; not on `--surface-3` or `--accent-soft`.
