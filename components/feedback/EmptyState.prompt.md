What a list or page shows when there is nothing in it yet. One heading, one line, at most one action.

```jsx
<EmptyState icon="inbox" title="Ingen plagg ennå" description="Legg til det første plagget, så dukker det opp her."
  action={<Button iconLeft="plus" onClick={add}>Legg til plagg</Button>} />
<EmptyState icon="search" title="Ingen treff" description="Prøv et kortere ord, eller fjern et filter." level={3} />
<EmptyState framed icon="info" title="Du er frakoblet" description="Det du gjør nå, lagres når nettet er tilbake." />
```

- Say what is empty and what to do next. No blame, no exclamation marks, no "Oops".
- One action at most, and only when there is a clear next step. A filtered list with no hits offers to clear the filter, not to add.
- `level` follows the page: h2 under the page's h1, h3 inside a section. Default 2.
- `framed` when it sits among cards; plain when it fills a page.
- The icon is decorative (`aria-hidden`). The heading carries the meaning.
