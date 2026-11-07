// Dates the Norwegian way, and the English way for English surfaces. Framework-free, no dependencies:
// Intl.DateTimeFormat with nb-NO and en-GB, so the month names and the order come from the browser, not
// from a table here. «30. okt. 2026», «30. oktober 2026», «i dag» / «i går» / «i morgen», «14:30» and a
// time range «14:30–15:15».
//
// A date-only string («2026-10-30», what an <input type="date"> and a database date column give) is read as
// a local calendar day: new Date('2026-10-30') would be midnight UTC, which is the day before in a time
// zone west of Greenwich. Days are compared on calendar dates (year, month, day), never on 24-hour
// arithmetic, so a day that is 23 or 25 hours long around a DST change still counts as one day.
const LOCALE = { nb: 'nb-NO', en: 'en-GB' };
const formatters = new Map();

const formatter = (lang, options) => {
  const key = lang + JSON.stringify(options);
  let f = formatters.get(key);
  if (!f) { f = new Intl.DateTimeFormat(LOCALE[lang] || LOCALE.nb, options); formatters.set(key, f); }
  return f;
};
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?$/;

/** A Date from a Date, a timestamp or a string. «YYYY-MM-DD» and «YYYY-MM-DDTHH:mm[:ss]» without a zone are local; anything else goes to the Date constructor. null when it is not a date. */
export function tilDato(verdi) {
  if (verdi instanceof Date) return Number.isNaN(verdi.getTime()) ? null : new Date(verdi.getTime());
  if (typeof verdi === 'number') { const d = new Date(verdi); return Number.isNaN(d.getTime()) ? null : d; }
  if (typeof verdi !== 'string') return null;
  const m = DATE_ONLY.exec(verdi.trim());
  if (m) {
    const [, y, mo, d, h = 0, mi = 0, s = 0, ms = 0] = m;
    if (+h > 23 || +mi > 59 || +s > 59) return null; // 14:99 would roll over to 15:39 in the constructor; that is not a time
    const date = new Date(+y, +mo - 1, +d, +h, +mi, +s, +String(ms).padEnd(3, '0'));
    // 2026-02-30 rolls over to March in the constructor; that is not a date
    return date.getFullYear() === +y && date.getMonth() === +mo - 1 && date.getDate() === +d ? date : null;
  }
  const date = new Date(verdi);
  return Number.isNaN(date.getTime()) ? null : date;
}

const pad = (n) => String(n).padStart(2, '0');

/** «YYYY-MM-DD» for the local calendar day, the inverse of tilDato for a date-only string. '' when it is not a date. */
export function tilIsoDato(verdi) {
  const d = tilDato(verdi);
  return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : '';
}

// The calendar day as a number of days, from the local year, month and day: immune to DST and the zone.
const dagnummer = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000;

/** Are the two on the same local calendar day? false when either is not a date. */
export function erSammeDag(a, b) {
  const da = tilDato(a), db = tilDato(b);
  return !!da && !!db && dagnummer(da) === dagnummer(db);
}

/**
 * The date: «30. okt. 2026» (stil «kort», default) or «30. oktober 2026» («lang»); en «30 Oct 2026», «30 October 2026».
 * `aar: false` leaves the year out, `aar: 'auto'` leaves it out when it is the current year (`naa`). '' when it is not a date.
 */
export function formatDato(verdi, { lang = 'nb', stil = 'kort', aar = true, naa } = {}) {
  const d = tilDato(verdi);
  if (!d) return '';
  const withYear = aar === 'auto' ? d.getFullYear() !== (tilDato(naa) || new Date()).getFullYear() : aar !== false;
  return formatter(lang, { day: 'numeric', month: stil === 'lang' ? 'long' : 'short', ...(withYear ? { year: 'numeric' } : {}) }).format(d);
}

/** The time of day, «14:30», 24-hour in both languages. '' when it is not a date. */
export function formatTid(verdi, { lang = 'nb' } = {}) {
  const d = tilDato(verdi);
  return d ? formatter(lang, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(d) : '';
}

/** The date and the time: nb «30. okt. 2026 kl. 14:30», en «30 Oct 2026, 14:30». Takes formatDato's options. */
export function formatDatoTid(verdi, valg = {}) {
  const d = tilDato(verdi);
  if (!d) return '';
  const lang = valg.lang || 'nb';
  return formatDato(d, valg) + (lang === 'en' ? ', ' : ' kl. ') + formatTid(d, { lang });
}

/**
 * «i dag», «i går» or «i morgen» (en «today», «yesterday», «tomorrow») against `naa` (now by default), else the date as
 * formatDato gives it, with `aar: 'auto'` unless you say otherwise. Days are compared as calendar days. '' when it is not a date.
 */
export function formatRelativ(verdi, { lang = 'nb', naa, ...rest } = {}) {
  const d = tilDato(verdi);
  if (!d) return '';
  const now = tilDato(naa) || new Date();
  const diff = dagnummer(d) - dagnummer(now);
  if (diff >= -1 && diff <= 1) return new Intl.RelativeTimeFormat(LOCALE[lang] || LOCALE.nb, { numeric: 'auto' }).format(diff, 'day');
  return formatDato(d, { lang, aar: 'auto', naa: now, ...rest });
}

/**
 * A time range. The same day: «14:30–15:15», or with `dato` «30. okt. 2026 kl. 14:30–15:15». Across days, both ends in full:
 * «30. okt. 2026 kl. 22:00 – 31. okt. 2026 kl. 06:00». Only `fra`: its time. '' when `fra` is not a date.
 */
export function formatTidsrom(fra, til, { lang = 'nb', dato = false, ...rest } = {}) {
  const a = tilDato(fra), b = tilDato(til);
  if (!a) return '';
  if (!b) return dato ? formatDatoTid(a, { lang, ...rest }) : formatTid(a, { lang });
  if (dagnummer(a) === dagnummer(b)) {
    const range = formatTid(a, { lang }) + '–' + formatTid(b, { lang });
    return dato ? formatDato(a, { lang, ...rest }) + (lang === 'en' ? ', ' : ' kl. ') + range : range;
  }
  return formatDatoTid(a, { lang, ...rest }) + ' – ' + formatDatoTid(b, { lang, ...rest });
}
