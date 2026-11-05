/**
 * Dates the Norwegian way, and the English way for English surfaces. Framework-free: Intl.DateTimeFormat with
 * nb-NO and en-GB. A date-only string («2026-10-30») is read as a local calendar day, never as midnight UTC,
 * and days are compared on calendar dates, so a DST change never moves a date.
 */

/** A Date, a timestamp in ms, or a string: «YYYY-MM-DD», «YYYY-MM-DDTHH:mm[:ss]» (both local; a part out of range is not a date) or anything the Date constructor reads (ISO with a zone). */
export type DatoVerdi = Date | string | number;

export interface DatoValg {
  /** The language: «nb» (nb-NO) or «en» (en-GB). Default "nb". */
  lang?: 'nb' | 'en';
  /** «kort» is «30. okt. 2026», «lang» is «30. oktober 2026» (en «30 Oct 2026», «30 October 2026»). Default "kort". */
  stil?: 'kort' | 'lang';
  /** The year: `true` always, `false` never, `'auto'` only when it is not the current year. Default true; formatRelativ defaults to 'auto'. */
  aar?: boolean | 'auto';
  /** What «now» is, for «i dag» and `aar: 'auto'`. Default the clock; a test passes a fixed date. */
  naa?: DatoVerdi;
}

export interface TidsromValg extends DatoValg {
  /** Put the date before a range on one day: «30. okt. 2026 kl. 14:30–15:15». Default false; a range across days always has its dates. */
  dato?: boolean;
}

/** A Date from a Date, a timestamp or a string; «YYYY-MM-DD» and «YYYY-MM-DDTHH:mm» without a zone are local. `null` when it is not a date. */
export declare function tilDato(verdi: DatoVerdi | null | undefined): Date | null;

/** «YYYY-MM-DD» for the local calendar day, the inverse of tilDato for a date-only string. '' when it is not a date. */
export declare function tilIsoDato(verdi: DatoVerdi | null | undefined): string;

/** Are the two on the same local calendar day? false when either is not a date. */
export declare function erSammeDag(a: DatoVerdi | null | undefined, b: DatoVerdi | null | undefined): boolean;

/** The date: «30. okt. 2026» or «30. oktober 2026»; en «30 Oct 2026», «30 October 2026». '' when it is not a date. */
export declare function formatDato(verdi: DatoVerdi | null | undefined, valg?: DatoValg): string;

/** The time of day, «14:30», 24-hour in both languages. '' when it is not a date. */
export declare function formatTid(verdi: DatoVerdi | null | undefined, valg?: Pick<DatoValg, 'lang'>): string;

/** The date and the time: nb «30. okt. 2026 kl. 14:30», en «30 Oct 2026, 14:30». '' when it is not a date. */
export declare function formatDatoTid(verdi: DatoVerdi | null | undefined, valg?: DatoValg): string;

/** «i dag», «i går», «i morgen» (en «today», «yesterday», «tomorrow») against `naa`, else formatDato with `aar: 'auto'`. '' when it is not a date. */
export declare function formatRelativ(verdi: DatoVerdi | null | undefined, valg?: DatoValg): string;

/** A time range: «14:30–15:15» on one day (with `dato`: «30. okt. 2026 kl. 14:30–15:15»), both ends in full across days. Only `fra`: its time. */
export declare function formatTidsrom(fra: DatoVerdi | null | undefined, til?: DatoVerdi | null, valg?: TidsromValg): string;
