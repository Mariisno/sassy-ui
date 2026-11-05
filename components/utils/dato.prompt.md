Dates the Norwegian way, and the English way for English surfaces: framework-free functions on `Intl.DateTimeFormat` with nb-NO and en-GB. A date-only string («2026-10-30») is a local calendar day, never midnight UTC.

```js
import { formatDato, formatRelativ, formatTid, formatTidsrom, tilDato, tilIsoDato } from 'sussi/components';

formatDato('2026-10-30')                       // «30. okt. 2026»
formatDato(d, { stil: 'lang' })                // «30. oktober 2026»
formatDato(d, { lang: 'en' })                  // «30 Oct 2026»
formatDato(d, { aar: 'auto' })                 // «30. okt.» this year, «30. okt. 2025» last year
formatRelativ('2026-10-29')                    // «i går», «i dag», «i morgen», else «29. okt.»
formatTid('2026-10-30T14:30')                  // «14:30»
formatTidsrom(fra, til)                        // «14:30–15:15»; across days «30. okt. 2026 kl. 22:00 – 31. okt. 2026 kl. 06:00»
tilIsoDato(new Date())                         // «2026-10-30», what a database date column and <input type="date"> take
```

- Every function takes a Date, a timestamp or a string; `tilDato` is the parser behind them. «YYYY-MM-DD» and «YYYY-MM-DDTHH:mm» without a zone are local; ISO with a zone goes to the Date constructor.
- Not a date (`'2026-02-30'`, `null`): `tilDato` gives `null`, the formatters `''`. Nothing throws.
- Days are compared on calendar dates, so «i går» holds across a DST change and the year end. `naa` fixes «now» in a test.
- `lang: 'en'` for an English surface; the output is the browser's own month names, so it reads the same everywhere Intl does.
- The time is 24-hour with a colon in both languages, as Intl gives it. A range on one day is one en dash without spaces; across days both ends are written in full.
- Not for durations («2 t 15 min») or a calendar grid; those stay in the app.
