---
name: Dato
group: utils
status: new
since: 0.7.0
kort: components/utils/dato.card.html
typer: components/utils/dato.d.ts
---

# Dato

Dates the Norwegian way, and the English way for English surfaces: functions without a framework and without dependencies, on `Intl.DateTimeFormat` with nb-NO and en-GB, so the month names and the order come from the browser. `formatDato` gives «30. okt. 2026» or «30. oktober 2026» (en "30 Oct 2026", "30 October 2026"), `formatRelativ` "today", "yesterday" and "tomorrow", `formatTid` "14:30" and `formatTidsrom` "14:30–15:15". A date without a time ("2026-10-30", what `<input type="date">` and a database date column give) is read as a local calendar day, never as midnight UTC, and days are compared on calendar dates, so a change to or from DST never moves a date.

## When to use

- A date in a list or a card: "Sown 14 Mar", "30 Oct 2026".
- When an entry happened: "today", "yesterday", else the date.
- A time or a session from–to: "14:30", "14:30–15:15".
- From a Date to `YYYY-MM-DD` for storage, and back.

## When not to

- Durations ("2 h 15 min") and countdowns: the app computes those itself.
- A calendar or a week layout: that is layout, not formatting.
- Languages other than Norwegian and English; use `Intl` directly with that language.
- Date arithmetic (adding days, finding the week number): `tilDato` gives you a Date, the app does the rest.

## Do

- Pass the string straight in: `formatDato('2026-10-30')`. `tilDato` reads it as a local day.
- Use `formatRelativ` in logs and lists where "today" and "yesterday" say more than the date, and `formatDato` where the date should stand still.
- Store days as `tilIsoDato(d)` ("2026-10-30") and times as a Date or ISO with a zone.
- Pass `naa` in tests, so "today" is a fixed day.
- Pass `lang: 'en'` on English surfaces; everything else is the same.

## Don't

- No `new Date('2026-10-30')` for a day: that is midnight UTC, and the day before west of Greenwich.
- Don't count "yesterday" as "24 hours ago"; days are calendar days, also the one that is 23 or 25 hours long.
- Don't write month names or "today" yourself; they would need translating and keeping in step.
- Don't show `''` as a date: a value that is not a date gives an empty string, and then the line is left out.
- Don't rely on formats other than "YYYY-MM-DD", "YYYY-MM-DDTHH:mm" and ISO with a zone: anything else goes to the Date constructor, which reads it differently from browser to browser.

## Example

```jsx
import { formatDato, formatRelativ, formatTid, formatTidsrom, tilDato, tilIsoDato } from 'sussi/components';

formatDato('2026-10-30', { lang: 'en' });                  // "30 Oct 2026"
formatDato('2026-10-30', { lang: 'en', stil: 'lang' });    // "30 October 2026"
formatDato('2026-10-30');                                  // «30. okt. 2026»
formatDato('2026-10-30', { lang: 'en', aar: 'auto' });     // "30 Oct" this year, "30 Oct 2025" last year
formatRelativ('2026-10-29', { lang: 'en' });               // "yesterday"; else "29 Oct"
formatTid('2026-10-30T14:30', { lang: 'en' });             // "14:30"
formatTidsrom('2026-10-30T14:30', '2026-10-30T15:15', { lang: 'en' });   // "14:30–15:15"
tilIsoDato(new Date());                                    // "2026-10-30"
tilDato('2026-02-30');                                     // null

function Row({ entry }) {
  return <span className="meta">{formatRelativ(entry.date, { lang: 'en' })} · {formatTid(entry.start, { lang: 'en' })}</span>;
}
```

## Props

The types are in `components/utils/dato.d.ts`. The card: `components/utils/dato.card.html`.

Every function takes a `DatoVerdi`: a Date, a timestamp in ms, or a string. "YYYY-MM-DD" and "YYYY-MM-DDTHH:mm[:ss]" without a zone are local; anything else (ISO with a zone) goes to the Date constructor. `tilDato(verdi)` gives a Date or `null`; `tilIsoDato(verdi)` gives "YYYY-MM-DD" for the local day; `erSammeDag(a, b)` compares calendar days. `formatDato`, `formatDatoTid` and `formatRelativ` take the options below; `formatTid` only `lang`; `formatTidsrom(fra, til, valg)` also `dato`. A value that is not a date gives an empty string. Unit-tested in `tests/dato.test.mjs`, also under `TZ=Europe/Oslo` and `TZ=America/Los_Angeles`.

<!-- props: DatoValg -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `lang` | `'nb' \| 'en'` | `'nb'` | The language: «nb» (nb-NO) or «en» (en-GB). Default "nb". |
| `stil` | `'kort' \| 'lang'` | `'kort'` | «kort» is «30. okt. 2026», «lang» is «30. oktober 2026» (en «30 Oct 2026», «30 October 2026»). Default "kort". |
| `aar` | `boolean \| 'auto'` | – | The year: `true` always, `false` never, `'auto'` only when it is not the current year. Default true; formatRelativ defaults to 'auto'. |
| `naa` | `DatoVerdi` | – | What «now» is, for «i dag» and `aar: 'auto'`. Default the clock; a test passes a fixed date. |
<!-- /props -->

<!-- props: TidsromValg -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dato` | `boolean` | – | Put the date before a range on one day: «30. okt. 2026 kl. 14:30–15:15». Default false; a range across days always has its dates. |

Plus every prop of `DatoValg`.
<!-- /props -->

## Accessibility

The helper renders nothing; what counts is the text it gives.

- **Readability.** "30 Oct 2026" and "yesterday" are read by a screen reader as ordinary text in the page's language. Set `lang` on the element when a Norwegian date sits on an English page, or the other way round.
- **Abbreviations.** "Oct" is Intl's abbreviation. Where there is room, `stil: 'lang'` gives the full name, which is easier to hear.
- **Ranges.** The en dash in "14:30–15:15" is read as "to" by most screen readers; write "from 14:30 to 15:15" in a sentence where that matters.
- **Relative.** "today" says nothing about which day it is; give the date somewhere else (a `title`, a heading) where people come back to the list later.
- **Known limits.** No weekday, no durations, no `<time datetime>`; set `dateTime={tilIsoDato(d)}` yourself on a `<time>`. The month names come from the browser's ICU and can differ a little (en-GB gives "Sept" in some and "Sep" in others), so a prerendered page formats dates after hydration, or the text may jump. String formats other than the three above go to the Date constructor and are read differently from browser to browser.

## Content

- The short form in lists and cards: "30 Oct 2026". The long form in a heading or a sentence: "30 October 2026".
- The year only when it is not this year: `aar: 'auto'`.
- "today", "yesterday", "tomorrow" in lower case, as Intl gives them; capitalised only first in a sentence.
- Times with a colon, "14:30", in both languages. A range on one day without spaces around the dash: "14:30–15:15".
- In Norwegian: «30. okt. 2026», «30. oktober 2026», «i dag», «i går», «14:30».
