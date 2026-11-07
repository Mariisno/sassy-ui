// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
const LOCALE = { nb: "nb-NO", en: "en-GB" };
const formatters = /* @__PURE__ */ new Map();
const formatter = (lang, options) => {
  const key = lang + JSON.stringify(options);
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(LOCALE[lang] || LOCALE.nb, options);
    formatters.set(key, f);
  }
  return f;
};
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?$/;
function tilDato(verdi) {
  if (verdi instanceof Date) return Number.isNaN(verdi.getTime()) ? null : new Date(verdi.getTime());
  if (typeof verdi === "number") {
    const d = new Date(verdi);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof verdi !== "string") return null;
  const m = DATE_ONLY.exec(verdi.trim());
  if (m) {
    const [, y, mo, d, h = 0, mi = 0, s = 0, ms = 0] = m;
    if (+h > 23 || +mi > 59 || +s > 59) return null;
    const date2 = new Date(+y, +mo - 1, +d, +h, +mi, +s, +String(ms).padEnd(3, "0"));
    return date2.getFullYear() === +y && date2.getMonth() === +mo - 1 && date2.getDate() === +d ? date2 : null;
  }
  const date = new Date(verdi);
  return Number.isNaN(date.getTime()) ? null : date;
}
const pad = (n) => String(n).padStart(2, "0");
function tilIsoDato(verdi) {
  const d = tilDato(verdi);
  return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : "";
}
const dagnummer = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5;
function erSammeDag(a, b) {
  const da = tilDato(a), db = tilDato(b);
  return !!da && !!db && dagnummer(da) === dagnummer(db);
}
function formatDato(verdi, { lang = "nb", stil = "kort", aar = true, naa } = {}) {
  const d = tilDato(verdi);
  if (!d) return "";
  const withYear = aar === "auto" ? d.getFullYear() !== (tilDato(naa) || /* @__PURE__ */ new Date()).getFullYear() : aar !== false;
  return formatter(lang, { day: "numeric", month: stil === "lang" ? "long" : "short", ...withYear ? { year: "numeric" } : {} }).format(d);
}
function formatTid(verdi, { lang = "nb" } = {}) {
  const d = tilDato(verdi);
  return d ? formatter(lang, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d) : "";
}
function formatDatoTid(verdi, valg = {}) {
  const d = tilDato(verdi);
  if (!d) return "";
  const lang = valg.lang || "nb";
  return formatDato(d, valg) + (lang === "en" ? ", " : " kl. ") + formatTid(d, { lang });
}
function formatRelativ(verdi, { lang = "nb", naa, ...rest } = {}) {
  const d = tilDato(verdi);
  if (!d) return "";
  const now = tilDato(naa) || /* @__PURE__ */ new Date();
  const diff = dagnummer(d) - dagnummer(now);
  if (diff >= -1 && diff <= 1) return new Intl.RelativeTimeFormat(LOCALE[lang] || LOCALE.nb, { numeric: "auto" }).format(diff, "day");
  return formatDato(d, { lang, aar: "auto", naa: now, ...rest });
}
function formatTidsrom(fra, til, { lang = "nb", dato = false, ...rest } = {}) {
  const a = tilDato(fra), b = tilDato(til);
  if (!a) return "";
  if (!b) return dato ? formatDatoTid(a, { lang, ...rest }) : formatTid(a, { lang });
  if (dagnummer(a) === dagnummer(b)) {
    const range = formatTid(a, { lang }) + "\u2013" + formatTid(b, { lang });
    return dato ? formatDato(a, { lang, ...rest }) + (lang === "en" ? ", " : " kl. ") + range : range;
  }
  return formatDatoTid(a, { lang, ...rest }) + " \u2013 " + formatDatoTid(b, { lang, ...rest });
}
export {
  erSammeDag,
  formatDato,
  formatDatoTid,
  formatRelativ,
  formatTid,
  formatTidsrom,
  tilDato,
  tilIsoDato
};
