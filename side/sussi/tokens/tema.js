// Sussi — the theme engine. Build Sussi with your own colours, and keep the contrast guarantee.
//
// Plain ESM, no dependencies, runs in Node and in the browser. Three levels:
//
//   (a) an accent:        lagTema({ navn: 'hav', aksent: '#2F6F9F' })
//   (b) your own colours: lagTema({ navn: 'hav', aksent: '#2F6F9F', overstyr: { '--bg': '#F4F7FA' }, modus: 'light' })
//   (c) a full theme:     lagTema({ …, skrift: { sans: 'Inter, sans-serif' }, radius: 1.5, avstand: 1.1, bevegelse: 0.8 })
//   presets:              lagTema({ preset: 'clay' })  — exactly the values tokens/colors.css has today
//
// The result holds every token of the accent group (what a built-in [data-accent] sets) for light
// and dark, derived in OKLCH from the colour you gave and then pushed, by lightness only, until
// the rules Sussi's own tests hold for its built-in accents pass:
//
//   --accent-fg on --accent                       ≥ 4.5:1   buttons, the active row (WCAG 1.4.3)
//   --accent on --bg, --surface-1/2/3             ≥ 3:1     the active row, the progress fill (1.4.11)
//   --accent-text on --bg, --surface-1/2          ≥ 4.5:1   links, the toast action
//   --focus-color on --bg, --surface-1/2          ≥ 3:1     the focus outline (1.4.11)
//   --accent-soft-fg on --accent-soft (+ hover)   ≥ 4.5:1   soft buttons, badges, selected tags
//   --accent-fg on --accent-hover and -press      ≥ 4.5:1   the button while hovered and pressed
//   --fg-1 on --highlight                         ≥ 4.5:1   selected text
//   --accent-text ≠ --accent-hover                          a link changes colour on hover
//
// and, when you override the surfaces or the text colours (b), the rules for those: --fg-1 and
// --fg-2 ≥ 4.5:1 on every surface, --fg-3 ≥ 4.5:1 on --bg, --surface-1/2 and ≥ 3:1 on --surface-3,
// --border-control ≥ 3:1 on --bg, --surface-1/2. A value you set is never changed; a derived one
// is. When a pair cannot pass without changing a value you set, the theme comes back with
// ok: false and a warning in Norwegian and English that names the pair and the ratio.
//
// tilCss(tema) gives the CSS ([data-tema="hav"] and its dark pairing, like the built-in accents),
// tilDtcg(tema) the tokens in the DTCG format with the same paths as tokens/sussi.tokens.json.

// ---------------------------------------------------------------------------------------------
// Colour: sRGB ↔ OKLab ↔ OKLCH (Björn Ottosson's matrices), WCAG 2 contrast, sRGB gamut mapping.
const clamp01 = (x) => Math.min(1, Math.max(0, x));

export function hexTilRgb(hex) {
  const m = String(hex).trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) throw new TypeError(`Ikke en hex-farge / not a hex colour: ${hex}`);
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
export const rgbTilHex = (rgb) => '#' + rgb.map((c) => Math.round(clamp01(c) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
export const normaliserHex = (hex) => rgbTilHex(hexTilRgb(hex));

const tilLineær = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fraLineær = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function lineærTilOklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
function oklabTilLineær([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/** #RRGGBB → { l, c, h } (OKLCH; l 0–1, h in degrees). */
export function tilOklch(hex) {
  const [L, a, b] = lineærTilOklab(hexTilRgb(hex).map(tilLineær));
  const c = Math.hypot(a, b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c: c < 1e-6 ? 0 : c, h: c < 1e-6 ? 0 : h };
}

const iGamut = (rgb) => rgb.every((c) => c >= -1e-4 && c <= 1 + 1e-4);
const lineærFraOklch = ({ l, c, h }) => oklabTilLineær([l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)]);

/** { l, c, h } → #RRGGBB. A colour outside sRGB keeps its lightness and hue and loses chroma until it fits. */
export function fraOklch({ l, c, h }) {
  l = clamp01(l);
  let rgb = lineærFraOklch({ l, c, h });
  if (!iGamut(rgb)) {
    let lo = 0, hi = c;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (iGamut(lineærFraOklch({ l, c: mid, h }))) lo = mid; else hi = mid;
    }
    rgb = lineærFraOklch({ l, c: lo, h });
  }
  return rgbTilHex(rgb.map((x) => fraLineær(clamp01(x))));
}

const luminans = (hex) => { const [r, g, b] = hexTilRgb(hex).map(tilLineær); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
/** WCAG 2 contrast ratio between two #RRGGBB colours (1–21). */
export function kontrast(a, b) {
  const [x, y] = [luminans(a), luminans(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// ---------------------------------------------------------------------------------------------
// @generert start (scripts/tema-data.mjs)
// Read from tokens/*.css by scripts/tema-data.mjs. Do not edit here; edit the CSS and run the script.
export const FORHÅNDSOPPSETT = {
  "moss": {
    "light": {
      "--accent": "#47663A",
      "--accent-hover": "#385131",
      "--accent-press": "#2C4028",
      "--accent-fg": "#F2F5EF",
      "--accent-soft": "#E3EADC",
      "--accent-soft-hover": "#C8D6BC",
      "--accent-soft-fg": "#2C4028",
      "--accent-text": "#47663A",
      "--border-focus": "#5C7E4C",
      "--focus-color": "#47663A",
      "--focus-ring": "0 0 0 2px #47663A",
      "--highlight": "#D6E09A"
    },
    "dark": {
      "--accent": "#A5BB94",
      "--accent-hover": "#C8D6BC",
      "--accent-press": "#E3EADC",
      "--accent-fg": "#141E13",
      "--accent-soft": "#27331F",
      "--accent-soft-hover": "#314029",
      "--accent-soft-fg": "#C8D6BC",
      "--accent-text": "#A5BB94",
      "--border-focus": "#A5BB94",
      "--focus-color": "#A5BB94",
      "--focus-ring": "0 0 0 2px #A5BB94",
      "--highlight": "#4A5226"
    }
  },
  "clay": {
    "light": {
      "--accent": "#A65B3C",
      "--accent-hover": "#8C4A30",
      "--accent-press": "#733C27",
      "--accent-fg": "#FFFFFF",
      "--accent-soft": "#F6E6DD",
      "--accent-soft-hover": "#EDD3C5",
      "--accent-soft-fg": "#8C4A30",
      "--accent-text": "#A2583A",
      "--border-focus": "#C0714F",
      "--focus-color": "#A65B3C",
      "--focus-ring": "0 0 0 2px #A65B3C",
      "--highlight": "#D6E09A"
    },
    "dark": {
      "--accent": "#E0A586",
      "--accent-hover": "#EBC0A8",
      "--accent-press": "#F6E6DD",
      "--accent-fg": "#171614",
      "--accent-soft": "#3A251B",
      "--accent-soft-hover": "#47301F",
      "--accent-soft-fg": "#E0A586",
      "--accent-text": "#E0A586",
      "--border-focus": "#E0A586",
      "--focus-color": "#E0A586",
      "--focus-ring": "0 0 0 2px #E0A586",
      "--highlight": "#4A5226"
    }
  },
  "fjord": {
    "light": {
      "--accent": "#4A7593",
      "--accent-hover": "#2F5068",
      "--accent-press": "#24405A",
      "--accent-fg": "#FFFFFF",
      "--accent-soft": "#E1EAF0",
      "--accent-soft-hover": "#D2DFE8",
      "--accent-soft-fg": "#2F5068",
      "--accent-text": "#46708D",
      "--border-focus": "#4A7593",
      "--focus-color": "#4A7593",
      "--focus-ring": "0 0 0 2px #4A7593",
      "--highlight": "#D6E09A"
    },
    "dark": {
      "--accent": "#9DB8CB",
      "--accent-hover": "#B8CDDB",
      "--accent-press": "#CDDBE5",
      "--accent-fg": "#0F1C25",
      "--accent-soft": "#1C2A34",
      "--accent-soft-hover": "#243642",
      "--accent-soft-fg": "#9DB8CB",
      "--accent-text": "#9DB8CB",
      "--border-focus": "#9DB8CB",
      "--focus-color": "#9DB8CB",
      "--focus-ring": "0 0 0 2px #9DB8CB",
      "--highlight": "#4A5226"
    }
  },
  "lichen": {
    "light": {
      "--accent": "#6B7732",
      "--accent-hover": "#555F27",
      "--accent-press": "#4A5222",
      "--accent-fg": "#FFFFFF",
      "--accent-soft": "#EEF2D2",
      "--accent-soft-hover": "#E3E9BD",
      "--accent-soft-fg": "#4E5724",
      "--accent-text": "#66712F",
      "--border-focus": "#6B7732",
      "--focus-color": "#6B7732",
      "--focus-ring": "0 0 0 2px #6B7732",
      "--highlight": "#D6E09A"
    },
    "dark": {
      "--accent": "#D6E09A",
      "--accent-hover": "#E2EAB5",
      "--accent-press": "#EAF0C8",
      "--accent-fg": "#1F230C",
      "--accent-soft": "#2C3016",
      "--accent-soft-hover": "#373C1C",
      "--accent-soft-fg": "#D6E09A",
      "--accent-text": "#D6E09A",
      "--border-focus": "#D6E09A",
      "--focus-color": "#D6E09A",
      "--focus-ring": "0 0 0 2px #D6E09A",
      "--highlight": "#4A5226"
    }
  },
  "lyng": {
    "light": {
      "--accent": "#8A4F6C",
      "--accent-hover": "#6E3D56",
      "--accent-press": "#57304A",
      "--accent-fg": "#FFFFFF",
      "--accent-soft": "#F1E3EA",
      "--accent-soft-hover": "#E8D2DD",
      "--accent-soft-fg": "#6E3D56",
      "--accent-text": "#8A4F6C",
      "--border-focus": "#A86E8A",
      "--focus-color": "#8A4F6C",
      "--focus-ring": "0 0 0 2px #8A4F6C",
      "--highlight": "#F1E3EA"
    },
    "dark": {
      "--accent": "#D4A7BC",
      "--accent-hover": "#E2C1D0",
      "--accent-press": "#EDD6E0",
      "--accent-fg": "#2A1520",
      "--accent-soft": "#3A2430",
      "--accent-soft-hover": "#47303C",
      "--accent-soft-fg": "#D4A7BC",
      "--accent-text": "#D4A7BC",
      "--border-focus": "#D4A7BC",
      "--focus-color": "#D4A7BC",
      "--focus-ring": "0 0 0 2px #D4A7BC",
      "--highlight": "#47303C"
    }
  },
  "ochre": {
    "light": {
      "--accent": "#8A6420",
      "--accent-hover": "#7D5A1B",
      "--accent-press": "#5E4314",
      "--accent-fg": "#FFFFFF",
      "--accent-soft": "#F5ECD6",
      "--accent-soft-hover": "#EEDDB6",
      "--accent-soft-fg": "#7D5A1B",
      "--accent-text": "#8A6420",
      "--border-focus": "#B8872D",
      "--focus-color": "#8A6420",
      "--focus-ring": "0 0 0 2px #8A6420",
      "--highlight": "#D6E09A"
    },
    "dark": {
      "--accent": "#E2C17B",
      "--accent-hover": "#EBD29C",
      "--accent-press": "#F0DDB2",
      "--accent-fg": "#171614",
      "--accent-soft": "#3A2E16",
      "--accent-soft-hover": "#46381B",
      "--accent-soft-fg": "#E2C17B",
      "--accent-text": "#E2C17B",
      "--border-focus": "#E2C17B",
      "--focus-color": "#E2C17B",
      "--focus-ring": "0 0 0 2px #E2C17B",
      "--highlight": "#4A5226"
    }
  }
};
export const GRUNNLAG = {
  "light": {
    "--bg": "#FAF8F4",
    "--surface-1": "#FFFFFF",
    "--surface-2": "#F3F0EA",
    "--surface-3": "#E8E3DA",
    "--fg-1": "#23211E",
    "--fg-2": "#6C655B",
    "--fg-3": "#736C62",
    "--fg-disabled": "#B1A99B",
    "--border": "#E8E3DA",
    "--border-strong": "#D5CEC2",
    "--border-control": "#8B8376",
    "--success": "#47663A",
    "--success-soft": "#E3EADC",
    "--success-fg": "#2C4028",
    "--warning": "#B8872D",
    "--warning-soft": "#F5ECD6",
    "--warning-fg": "#7D5A1B",
    "--danger": "#B54A35",
    "--danger-soft": "#F6E1DC",
    "--danger-fg": "#843222",
    "--danger-hover": "#843222",
    "--danger-fg-on": "#FFFFFF",
    "--info": "#4A7593",
    "--info-soft": "#E1EAF0",
    "--info-fg": "#2F5068"
  },
  "dark": {
    "--bg": "#161613",
    "--surface-1": "#1E1E1A",
    "--surface-2": "#262621",
    "--surface-3": "#303029",
    "--fg-1": "#EDEAE3",
    "--fg-2": "#B5AFA4",
    "--fg-3": "#98928A",
    "--fg-disabled": "#5D5950",
    "--border": "#2F2F29",
    "--border-strong": "#3E3D36",
    "--border-control": "#77736A",
    "--success": "#A5BB94",
    "--success-soft": "#27331F",
    "--success-fg": "#C8D6BC",
    "--warning": "#E2C17B",
    "--warning-soft": "#382C14",
    "--warning-fg": "#E2C17B",
    "--danger": "#E29D8E",
    "--danger-soft": "#3A1F19",
    "--danger-fg": "#E29D8E",
    "--danger-hover": "#F6E1DC",
    "--danger-fg-on": "#171614",
    "--info": "#9DB8CB",
    "--info-soft": "#1C2A34",
    "--info-fg": "#9DB8CB"
  }
};
export const SKALAER = {
  "skrift": {
    "--font-sans": "'Schibsted Grotesk',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif",
    "--font-mono": "'DM Mono',ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace",
    "--font-display": "'Schibsted Grotesk',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif"
  },
  "radius": {
    "--radius-xs": "4px",
    "--radius-sm": "6px",
    "--radius-md": "10px",
    "--radius-lg": "14px",
    "--radius-xl": "20px",
    "--radius-pill": "999px",
    "--radius-control": "6px",
    "--radius-card": "14px",
    "--radius-dialog": "20px"
  },
  "avstand": {
    "--space-0": "0",
    "--space-px": "1px",
    "--space-0-5": "2px",
    "--space-1": "4px",
    "--space-1-5": "6px",
    "--space-2": "8px",
    "--space-3": "12px",
    "--space-4": "16px",
    "--space-5": "20px",
    "--space-6": "24px",
    "--space-8": "32px",
    "--space-10": "40px",
    "--space-12": "48px",
    "--space-16": "64px",
    "--space-20": "80px",
    "--space-24": "96px"
  },
  "bevegelse": {
    "--dur-fast": "120ms",
    "--dur-base": "200ms",
    "--dur-slow": "320ms"
  }
};
// @generert slutt

export const MODI = ['light', 'dark'];
export const AKSENTTOKENS = ['--accent', '--accent-hover', '--accent-press', '--accent-fg', '--accent-soft', '--accent-soft-hover', '--accent-soft-fg', '--accent-text', '--border-focus', '--focus-color', '--focus-ring', '--highlight'];
export const STATUSTOKENS = ['--success', '--success-soft', '--success-fg', '--warning', '--warning-soft', '--warning-fg', '--danger', '--danger-soft', '--danger-fg', '--danger-hover', '--danger-fg-on', '--info', '--info-soft', '--info-fg'];
export const GRUNNTOKENS = ['--bg', '--surface-1', '--surface-2', '--surface-3', '--fg-1', '--fg-2', '--fg-3', '--fg-disabled', '--border', '--border-strong', '--border-control', ...STATUSTOKENS];
/** Every token lagTema knows: the only names overstyr accepts. */
export const KJENTE = [...GRUNNTOKENS, ...AKSENTTOKENS];
const FLATER = ['--bg', '--surface-1', '--surface-2'];

// ---------------------------------------------------------------------------------------------
// The rules. `flytt` says which token may move to satisfy the rule, in order of preference; a
// token the user fixed never moves. `kilde` names the Sussi test that holds the rule for the
// built-in accents; the rest are what the components need and the tests do not say yet.
const regel = (a, b, min, flytt, no, en, kilde) => ({ a, b, min, flytt, no, en, kilde });
export const REGLER = [
  regel('--accent-fg', '--accent', 4.5, ['--accent', '--accent-fg'], 'knappetekst på aksenten', 'button text on the accent', 'contrast.test'),
  ...['--bg', '--surface-1', '--surface-2', '--surface-3'].map((s) => regel('--accent', s, 3, ['--accent'], 'aksenten som flate (aktiv rad, framdrift) på ' + s, 'the accent as a surface (active row, progress) on ' + s, s === '--surface-2' || s === '--surface-3' ? 'progress.test' : 'contrast.test')),
  ...FLATER.map((s) => regel('--accent-text', s, 4.5, ['--accent-text'], 'lenker på ' + s, 'links on ' + s, 'contrast.test')),
  ...FLATER.map((s) => regel('--focus-color', s, 3, ['--focus-color'], 'fokusringen på ' + s, 'the focus outline on ' + s, 'contrast.test')),
  regel('--accent-soft-fg', '--accent-soft', 4.5, ['--accent-soft-fg', '--accent-soft'], 'tekst på den myke aksenten (badge, valgt tag)', 'text on the soft accent (badge, selected tag)', 'contrast.test'),
  regel('--accent-soft-fg', '--accent-soft-hover', 4.5, ['--accent-soft-fg', '--accent-soft-hover'], 'tekst på den myke aksenten under hover', 'text on the soft accent while hovered'),
  regel('--accent-fg', '--accent-hover', 4.5, ['--accent-hover', '--accent-fg'], 'knappetekst under hover', 'button text while hovered'),
  regel('--accent-fg', '--accent-press', 4.5, ['--accent-press', '--accent-fg'], 'knappetekst under trykk', 'button text while pressed'),
  regel('--fg-1', '--highlight', 4.5, ['--highlight'], 'markert tekst', 'selected text'),
  // The base pairs, for when the surfaces or the text colours are overridden (b).
  ...['--bg', '--surface-1', '--surface-2', '--surface-3'].flatMap((s) => [
    regel('--fg-1', s, 4.5, ['--fg-1', s], 'brødtekst på ' + s, 'body text on ' + s),
    regel('--fg-2', s, 4.5, ['--fg-2', s], 'sekundær tekst på ' + s, 'secondary text on ' + s, s === '--surface-3' ? 'contrast.test' : undefined),
  ]),
  ...FLATER.map((s) => regel('--fg-3', s, 4.5, ['--fg-3', s], 'metatekst på ' + s, 'meta text on ' + s, 'contrast.test')),
  regel('--fg-3', '--surface-3', 3, ['--fg-3', '--surface-3'], 'bryterknappens ring på sporet', 'the switch thumb ring on the track', 'contrast.test'),
  ...FLATER.map((s) => regel('--border-control', s, 3, ['--border-control', s], 'kanten på felt og bokser på ' + s, 'the edge of inputs and checkboxes on ' + s, 'contrast.test')),
  // The status colours, where the components put them (components.css). They are derived like the accent group when the surfaces change.
  ...['--success', '--danger'].flatMap((t) => ['--bg', '--surface-1', '--surface-2', '--surface-3'].map((s) => regel(t, s, 3, [t], `${t} som framdriftsfyll på ${s}`, `${t} as the progress fill on ${s}`, 'progress.test'))),
  ...['--bg', '--surface-1', '--surface-2', '--surface-3'].map((s) => regel('--warning-fg', s, 3, ['--warning-fg'], 'advarselsfyllet i framdrift på ' + s, 'the warning progress fill on ' + s, 'progress.test')),
  // The toast sits on --surface-1 in light and --surface-2 in dark (components.css), so its icon is checked there, per mode.
  ...['--success', '--warning', '--danger', '--info'].flatMap((t) => [{ ...regel(t, '--surface-1', 3, [t], `${t} som toast-ikon på --surface-1`, `${t} as the toast icon on --surface-1`), modus: 'light' }, { ...regel(t, '--surface-2', 3, [t], `${t} som toast-ikon på --surface-2`, `${t} as the toast icon on --surface-2`), modus: 'dark' }]),
  ...['--success', '--warning', '--danger', '--info'].map((t) => regel(t + '-fg', t + '-soft', 4.5, [t + '-fg', t + '-soft'], `tekst på ${t}-soft (badge)`, `text on ${t}-soft (badge)`)),
  ...FLATER.map((s) => regel('--danger-fg', s, 4.5, ['--danger-fg'], 'feilmeldingen under et felt på ' + s, 'the error under a field on ' + s)),
  ...FLATER.map((s) => regel('--danger', s, 3, ['--danger'], 'kanten på et ugyldig felt på ' + s, 'the edge of an invalid field on ' + s)),
  // The danger button: --danger-fg-on on the fill, as --accent-fg on the accent. The text moves first; --danger is held by more rules.
  regel('--danger-fg-on', '--danger', 4.5, ['--danger-fg-on', '--danger'], 'teksten på fareknappen', 'the text on the danger button', 'contrast.test'),
  regel('--danger-fg-on', '--danger-hover', 4.5, ['--danger-fg-on', '--danger-hover'], 'teksten på fareknappen under hover', 'the text on the danger button while hovered', 'contrast.test'),
  // The colour inside --focus-ring (your own, or --focus-color), for apps that draw their own ring.
  ...FLATER.map((s) => regel('--ringfarge', s, 3, [], 'fargen i --focus-ring på ' + s, 'the colour in --focus-ring on ' + s)),
];
export const ULIKE = [{ a: '--accent-text', b: '--accent-hover', flytt: ['--accent-text', '--accent-hover'], no: 'en lenke skal skifte farge under hover', en: 'a link must change colour on hover', kilde: 'accents.test' }];

// ---------------------------------------------------------------------------------------------
// Lightness search. Moves `tok` (an OKLCH triple) along L, away from or towards `mot`, to the
// nearest L where `ok(hex)` holds. Monotone in L for a fixed hue and chroma, so a bisection.
function søkL(tok, retning, ok) {
  const ende = retning > 0 ? 1 : 0;
  const hexVed = (l) => fraOklch({ ...tok, l });
  // A coarse walk first (ok may hold only on a stretch between two other colours), then a bisection on the edge it found.
  const steg = (ende - tok.l) / 100;
  let lo = tok.l, hi = null;
  for (let i = 1; i <= 100; i++) {
    const l = i === 100 ? ende : tok.l + steg * i;
    if (ok(hexVed(l))) { hi = l; break; }
    lo = l;
  }
  if (hi === null) return null;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (ok(hexVed(mid))) hi = mid; else lo = mid;
  }
  return hexVed(hi);
}
// The nearest hex along L (either direction, the one that moves less first) where ok holds.
function nærmeste(hex, mot, ok, foretrukket) {
  const tok = tilOklch(hex);
  const bort = foretrukket ?? (tok.l >= tilOklch(mot).l ? 1 : -1);
  const kandidater = [søkL(tok, bort, ok), søkL(tok, -bort, ok)].filter(Boolean);
  if (!kandidater.length) return null;
  return kandidater.sort((p, q) => Math.abs(tilOklch(p).l - tok.l) - Math.abs(tilOklch(q).l - tok.l))[0];
}

// ---------------------------------------------------------------------------------------------
// The first guess for the accent group, from the accent and the mode, before any rule is checked.
// Light: a dark accent with a light tint of itself as text, steps darker on hover and press, a
// pale tint as the soft fill. Dark: the mirror image, as the built-in accents do it.
function gjett(aksent, mode) {
  const a = tilOklch(aksent);
  const lys = mode === 'light';
  const steg = (n) => fraOklch({ ...a, l: a.l + n });
  const nedover = lys ? (a.l - 0.13 >= 0.04 ? -1 : 1) : (a.l + 0.12 <= 0.98 ? 1 : -1); // darker in light, lighter in dark; near the ends the other way
  const fg = lys ? fraOklch({ l: 0.975, c: Math.min(a.c, 0.02), h: a.h }) : fraOklch({ l: 0.2, c: Math.min(a.c, 0.04), h: a.h });
  const soft = lys ? fraOklch({ l: 0.94, c: Math.min(a.c * 0.45, 0.045), h: a.h }) : fraOklch({ l: 0.3, c: Math.min(a.c * 0.3, 0.04), h: a.h });
  const softHover = lys ? fraOklch({ l: 0.89, c: Math.min(a.c * 0.55, 0.07), h: a.h }) : fraOklch({ l: 0.36, c: Math.min(a.c * 0.35, 0.05), h: a.h });
  return {
    '--accent': normaliserHex(aksent),
    '--accent-hover': steg(0.07 * nedover),
    '--accent-press': steg(0.13 * nedover),
    '--accent-fg': fg,
    '--accent-soft': soft,
    '--accent-soft-hover': softHover,
    '--accent-soft-fg': lys ? fraOklch({ ...a, l: Math.min(a.l, 0.42) }) : normaliserHex(aksent),
    '--accent-text': normaliserHex(aksent),
    '--border-focus': normaliserHex(aksent),
    '--focus-color': normaliserHex(aksent),
    '--highlight': lys ? soft : softHover,
  };
}

const PRESETNAVN = { moss: 'moss', mose: 'moss', clay: 'clay', leire: 'clay', fjord: 'fjord', lichen: 'lichen', lav: 'lichen', lyng: 'lyng', ochre: 'ochre', oker: 'ochre' };

/**
 * Builds a theme. Options:
 *   navn       the theme's name: [data-tema="<navn>"]; a-z, 0-9 and -. Default: the preset's name, or 'tema'.
 *   aksent     '#RRGGBB', the accent. Or preset: 'moss' | 'clay' | 'fjord' | 'lichen' | 'lyng' | 'ochre'.
 *   overstyr   semantic tokens you set yourself: { '--bg': '#…', '--fg-1': '#…', '--accent': '#…', … },
 *              for the mode in `modus` ('light' by default, 'dark', or 'begge'), or { light: {…}, dark: {…} }.
 *              A token you set never moves; what is derived moves around it. Only tokens the engine
 *              knows (KJENTE: the surfaces, text, lines, status colours and the accent group) are
 *              accepted; anything else throws.
 *   mørkAksent '#RRGGBB', a separate accent for dark mode (default: the same colour, moved as little as needed).
 *   skrift     { sans, mono, display }: CSS font-family lists.
 *   radius     a factor (1.5) or { xs, sm, md, lg, xl, pill }: CSS lengths.
 *   avstand    a factor for the spacing scale (--space-*), or { '1': '5px', … }.
 *   bevegelse  a factor for the durations (--dur-*), or { fast, base, slow }. Reduced motion stays 0.
 * Returns { ok, navn, nivå, modi: { light: {…}, dark: {…} }, rapport, advarsler, … }.
 */
export function lagTema(valg = {}) {
  const preset = valg.preset ? PRESETNAVN[String(valg.preset).toLowerCase()] : undefined;
  if (valg.preset && !preset) throw new TypeError(`Ukjent forhåndsoppsett / unknown preset: ${valg.preset} (${Object.keys(FORHÅNDSOPPSETT).join(', ')})`);
  if (!preset && !valg.aksent) throw new TypeError('lagTema needs aksent (\'#RRGGBB\') or preset.');
  const navn = String(valg.navn ?? preset ?? 'tema').toLowerCase();
  if (!/^[a-z][a-z0-9-]*$/.test(navn)) throw new TypeError(`navn must be a-z, 0-9 and -, starting with a letter: ${navn}`);
  const aksent = valg.aksent ? normaliserHex(valg.aksent) : undefined;
  const mørkAksent = valg.mørkAksent ? normaliserHex(valg.mørkAksent) : undefined;

  const overstyr = perModus(valg.overstyr, valg.modus);
  const advarsler = [];
  const modi = {};
  const låst = {}; // per mode, what did not move and why: 'overstyr' (yours), 'preset', 'grunnlag' (Sussi's own)
  const rapport = {};
  for (const mode of MODI) {
    const fast = {}; // what must not move
    const verdier = {}; // every token in play
    const ekstra = {}; // tokens the rules do not know; passed through
    const flyttet = [];
    // Sussi's own surfaces and text never move; they are free only when the user sets some of them, so the rest can follow.
    const egneFlater = !Object.keys(overstyr[mode] || {}).some((t) => GRUNNTOKENS.includes(t));
    for (const [t, v] of Object.entries(grunnlagFor(mode, overstyr[mode]))) { verdier[t] = v; if (egneFlater) fast[t] = 'grunnlag'; }
    const polStart = luminans(verdier['--bg']) >= 0.18 ? 'light' : 'dark';
    const start = preset ? { ...FORHÅNDSOPPSETT[preset][mode] } : gjett(mode === 'dark' && mørkAksent ? mørkAksent : aksent, polStart);
    delete start['--focus-ring'];
    if (preset) for (const t of Object.keys(start)) fast[t] = 'preset';
    Object.assign(verdier, start);
    for (const [t, v] of Object.entries(overstyr[mode] || {})) {
      if (t === '--focus-ring') { ekstra[t] = v; continue; }
      verdier[t] = normaliserHex(v);
      fast[t] = 'overstyr';
    }
    const fra = { ...verdier };
    const inn = preset ? FORHÅNDSOPPSETT[preset][mode]['--accent'] : (mode === 'dark' && mørkAksent ? mørkAksent : aksent);
    // The polarity of the surfaces decides the shape of the accent group: dark accent with light text on light surfaces, the mirror on dark ones.
    const pol = luminans(verdier['--bg']) >= 0.18 ? 'light' : 'dark';
    const foretrukket = (t) => (AKSENTTOKENS.includes(t) ? (pol === 'light' ? -1 : 1) : undefined);
    const regler = REGLER.filter((r) => !r.modus || r.modus === mode);
    const måler = () => regler.map((r) => ({ ...r, ratio: kontrast(verdier[r.a], verdier[r.b]) }));

    // 1. The accent itself: settle it before anything is derived from it, so hover, press, text and focus follow the final accent.
    const settle = (tokens, runder) => {
      for (let runde = 0; runde < runder; runde++) {
        let endret = false;
        for (const r of regler) {
          // Only rules between tokens that are settled already (the base) or being settled now; a token derived later is not looked at yet.
          if (!tokens.includes(r.a) && !tokens.includes(r.b)) continue;
          if (![r.a, r.b].every((t) => tokens.includes(t) || GRUNNTOKENS.includes(t))) continue;
          if (kontrast(verdier[r.a], verdier[r.b]) >= r.min) continue;
          for (const kandidat of r.flytt) {
            if (fast[kandidat] || !tokens.includes(kandidat)) continue;
            const annen = kandidat === r.a ? r.b : r.a;
            // A move must satisfy this rule and keep every other settled rule the token is in that passes today.
            const andre = regler.filter((r2) => r2 !== r && (r2.a === kandidat || r2.b === kandidat))
              .map((r2) => ({ min: r2.min, mot: r2.a === kandidat ? r2.b : r2.a }))
              .filter(({ mot, min }) => (tokens.includes(mot) || GRUNNTOKENS.includes(mot)) && kontrast(verdier[kandidat], verdier[mot]) >= min);
            const ok = (hex) => kontrast(hex, verdier[annen]) >= r.min + 1e-9 && andre.every(({ mot, min }) => kontrast(hex, verdier[mot]) >= min);
            const ny = nærmeste(verdier[kandidat], verdier[annen], ok, foretrukket(kandidat));
            if (!ny) continue;
            flyttet.push({ token: kandidat, fra: verdier[kandidat], til: ny, regel: `${r.a} på ${r.b} ≥ ${r.min}:1`, a: r.a, b: r.b, krav: r.min, no: r.no, en: r.en });
            verdier[kandidat] = ny;
            endret = true;
            break;
          }
        }
        if (!endret) break;
      }
    };
    settle(['--bg', '--surface-1', '--surface-2', '--surface-3', '--fg-1', '--fg-2', '--fg-3', '--border-control', ...STATUSTOKENS], 8);
    settle(['--accent', '--accent-fg'], 6);
    if (!preset) {
      // 2. Re-derive what follows from the settled accent (unless the user fixed it), then settle the rest.
      const ny = gjett(verdier['--accent'], pol);
      for (const t of AKSENTTOKENS) if (t !== '--accent' && t !== '--accent-fg' && t !== '--focus-ring' && !fast[t]) { verdier[t] = ny[t]; fra[t] = ny[t]; }
    }
    settle(AKSENTTOKENS.filter((t) => t !== '--focus-ring'), 8);
    // 3. Pairs that must differ.
    for (const u of ULIKE) {
      if (verdier[u.a].toUpperCase() !== verdier[u.b].toUpperCase()) continue;
      const kandidat = u.flytt.find((t) => !fast[t]);
      if (!kandidat) { advarsler.push(advarsel('like', mode, u, verdier, fast)); continue; }
      const tok = tilOklch(verdier[kandidat]);
      let ny = verdier[kandidat];
      for (let n = 1; n <= 20 && ny.toUpperCase() === verdier[u.b === kandidat ? u.a : u.b].toUpperCase(); n++) ny = fraOklch({ ...tok, l: tok.l + (foretrukket(kandidat) ?? -1) * 0.012 * n });
      flyttet.push({ token: kandidat, fra: verdier[kandidat], til: ny, regel: `${u.a} ≠ ${u.b}`, a: u.a, b: u.b, no: u.no, en: u.en });
      verdier[kandidat] = ny;
    }
    // 4. Measure everything; what still fails is a warning. The ring's colour is measured as its own token.
    verdier['--ringfarge'] = ekstra['--focus-ring'] ? ekstra['--focus-ring'].slice(-7).toUpperCase() : verdier['--focus-color'];
    if (ekstra['--focus-ring']) fast['--ringfarge'] = 'overstyr';
    const målt = måler();
    for (const m of målt) if (m.ratio < m.min) advarsler.push(advarsel('kontrast', mode, m, verdier, fast));
    for (const u of ULIKE) if (verdier[u.a].toUpperCase() === verdier[u.b].toUpperCase() && !advarsler.some((a) => a.kode === 'like' && a.modus === mode)) advarsler.push(advarsel('like', mode, u, verdier, fast));

    verdier['--focus-ring'] = ekstra['--focus-ring'] ?? `0 0 0 2px ${verdier['--focus-color']}`;
    delete verdier['--ringfarge'];
    modi[mode] = { ...verdier };
    låst[mode] = { ...fast };
    const flyttetTokens = [...new Set(flyttet.map((f) => f.token))];
    rapport[mode] = {
      inn,
      flyttet: flyttetTokens.map((t) => ({ token: t, fra: fra[t], til: verdier[t], deltaL: Math.round((tilOklch(verdier[t]).l - tilOklch(fra[t]).l) * 1000) / 1000, hvorfor: flyttet.filter((f) => f.token === t).map((f) => ({ regel: f.regel, a: f.a, b: f.b, krav: f.krav, no: f.no, en: f.en })) })),
      målt: målt.map((m) => ({ regel: `${m.a} på ${m.b}`, par: [m.a, m.b], a: verdier[m.a], b: verdier[m.b], ratio: Math.round(m.ratio * 100) / 100, krav: m.min, ok: m.ratio >= m.min })),
    };
  }

  const nivå = valg.skrift || valg.radius || valg.avstand || valg.bevegelse ? 'full' : Object.values(overstyr).some((o) => o && Object.keys(o).length) ? 'overstyring' : 'aksent';
  const tema = { ok: advarsler.length === 0, navn, nivå, preset, aksent: aksent ?? (preset ? FORHÅNDSOPPSETT[preset].light['--accent'] : undefined), modi, rapport, advarsler, låst };
  const skalaer = lagSkalaer(valg);
  if (skalaer) tema.skalaer = skalaer;
  return tema;
}

// The base tokens a mode starts from. With your own --bg, the rest follows it: a dark --bg in light mode
// takes the dark set (light text on dark surfaces), every surface and line keeps its distance from
// --bg in lightness and takes its hue, and the text colours shift the same way. Then the rules settle them.
function grunnlagFor(mode, overstyr = {}) {
  const basis = GRUNNLAG[mode];
  if (!overstyr['--bg']) return { ...basis };
  const bg = tilOklch(normaliserHex(overstyr['--bg']));
  const pol = luminans(normaliserHex(overstyr['--bg'])) >= 0.18 ? 'light' : 'dark';
  const fra = GRUNNLAG[pol];
  const dL = bg.l - tilOklch(fra['--bg']).l;
  const ut = {};
  for (const [t, v] of Object.entries(fra)) {
    const o = tilOklch(v);
    if (STATUSTOKENS.includes(t)) { ut[t] = v; continue; } // the status colours of that polarity; the rules move them if the new surfaces need it
    const flate = /^--(surface|border)/.test(t);
    ut[t] = fraOklch({ l: o.l + dL, c: flate ? Math.min(bg.c, 0.05) : o.c, h: flate ? bg.h : o.h });
  }
  ut['--bg'] = normaliserHex(overstyr['--bg']);
  return ut;
}

function perModus(overstyr, modus = 'light') {
  if (!overstyr) return {};
  if (typeof overstyr !== 'object') throw new TypeError('overstyr must be an object of tokens');
  if (overstyr.light || overstyr.dark) {
    for (const k of Object.keys(overstyr)) if (k !== 'light' && k !== 'dark') throw new TypeError(`overstyr: ${k} is neither a mode (light, dark) nor allowed beside one`);
    return { light: sjekkOverstyr(overstyr.light || {}), dark: sjekkOverstyr(overstyr.dark || {}) };
  }
  if (!['light', 'dark', 'begge', 'both'].includes(modus)) throw new TypeError(`modus must be light, dark or begge: ${modus}`);
  const o = sjekkOverstyr(overstyr);
  return modus === 'begge' || modus === 'both' ? { light: o, dark: o } : { [modus]: o };
}
// Overrides name a token the engine knows (KJENTE, lower case) and hold a hex colour; the focus ring holds "x y blur spread #hex".
export const RING = /^(-?\d+(?:\.\d+)?(?:px|rem|em)?)\s+(-?\d+(?:\.\d+)?(?:px|rem|em)?)\s+(\d+(?:\.\d+)?(?:px|rem|em)?)\s+(\d+(?:\.\d+)?(?:px|rem|em)?)\s+#[0-9A-Fa-f]{6}$/;
function sjekkOverstyr(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) throw new TypeError('overstyr must be an object of tokens');
  const ut = {};
  for (const [t, v] of Object.entries(o)) {
    if (!/^--[a-z0-9-]+$/.test(t)) throw new TypeError(`overstyr: "${t}" is not a token name (--lower-case-and-digits)`);
    if (!KJENTE.includes(t)) throw new TypeError(`overstyr: ${t} is not a token lagTema knows (${KJENTE.join(', ')})`);
    if (typeof v !== 'string') throw new TypeError(`overstyr: ${t} must be a string`);
    if (t === '--focus-ring') { if (!RING.test(v.trim())) throw new TypeError(`overstyr: --focus-ring must be "x y blur spread #RRGGBB", not "${v}"`); ut[t] = v.trim(); continue; }
    ut[t] = normaliserHex(v); // throws on anything but a hex colour
  }
  return ut;
}
const UTRYGG = /[;{}<\n\r]|\/\*|\*\//;
const MODUSNAVN = { no: { light: 'Lys modus', dark: 'Mørk modus' }, en: { light: 'Light mode', dark: 'Dark mode' } };

function advarsel(kode, modus, r, verdier, fast = {}) {
  const ratio = r.ratio ?? kontrast(verdier[r.a], verdier[r.b]);
  const navnNo = { preset: 'fra forhåndsoppsettet', overstyr: 'satt av deg', grunnlag: 'Sussis egen' };
  const navnEn = { preset: 'from the preset', overstyr: 'set by you', grunnlag: "Sussi's own" };
  const låst = (t) => (fast[t] ? ` (${navnNo[fast[t]]})` : '');
  const lockedEn = (t) => (fast[t] ? ` (${navnEn[fast[t]]})` : '');
  const modusNo = MODUSNAVN.no[modus], modusEn = MODUSNAVN.en[modus];
  const låstAv = Object.fromEntries([r.a, r.b].filter((t) => fast[t]).map((t) => [t, fast[t]]));
  if (kode === 'like') return {
    kode, modus, tokens: [r.a, r.b], låst: låstAv, verdier: [verdier[r.a], verdier[r.b]],
    no: `${modusNo}: ${r.a} og ${r.b} er begge ${verdier[r.a]}; ${r.no}. Begge er låst, så velg en annen verdi for en av dem.`,
    en: `${modusEn}: ${r.a} and ${r.b} are both ${verdier[r.a]}; ${r.en}. Both are locked, so give one of them another value.`,
  };
  const dinVerdi = fast[r.a] === 'overstyr' || fast[r.b] === 'overstyr';
  const haleNo = dinVerdi ? 'Kan ikke rettes uten å endre en verdi du har satt.' : 'Motoren fant ingen verdi som holder; prøv en annen farge.';
  const haleEn = dinVerdi ? 'Cannot be fixed without changing a value you set.' : 'The engine found no value that holds; try another colour.';
  const vis = (t) => (t === '--ringfarge' ? 'the colour in --focus-ring' : t);
  return {
    kode, modus, tokens: [r.a, r.b], låst: låstAv, verdier: [verdier[r.a], verdier[r.b]], ratio: Math.round(ratio * 100) / 100, krav: r.min, regelNo: r.no, regelEn: r.en,
    no: `${modusNo}: ${vis(r.a)} ${verdier[r.a]}${låst(r.a)} på ${vis(r.b)} ${verdier[r.b]}${låst(r.b)} er ${ratio.toFixed(2)}:1, må være ${r.min}:1 (${r.no}). ${haleNo}`,
    en: `${modusEn}: ${vis(r.a)} ${verdier[r.a]}${lockedEn(r.a)} on ${vis(r.b)} ${verdier[r.b]}${lockedEn(r.b)} is ${ratio.toFixed(2)}:1, needs ${r.min}:1 (${r.en}). ${haleEn}`,
  };
}

// ---------------------------------------------------------------------------------------------
// Level (c): fonts, radius, spacing and motion. A factor scales Sussi's own scale; an object
// sets values. The output is CSS text per custom property.
const lengde = (v, f) => { const m = String(v).match(/^(-?[\d.]+)(px|rem|em|ms|s)?$/); if (!m) return undefined; const n = Number(m[1]) * f; return (Number.isInteger(n) ? n : Math.round(n * 100) / 100) + (m[2] || (n === 0 ? '' : 'px')); };
function lagSkalaer(valg) {
  const ut = {};
  if (valg.skrift) {
    for (const [k, v] of Object.entries(valg.skrift)) {
      if (!['sans', 'mono', 'display'].includes(k)) throw new TypeError(`skrift: unknown family ${k} (sans, mono, display)`);
      if (typeof v !== 'string' || !v.trim()) throw new TypeError(`skrift.${k} must be a CSS font-family list`);
      if (UTRYGG.test(v)) throw new TypeError(`skrift.${k} must not contain ; { } < newlines or comment marks`);
      ut['--font-' + k] = v.trim();
    }
  }
  const skala = (navn, verdi, prefix, hopp = []) => {
    if (verdi === undefined) return;
    const basis = SKALAER[navn];
    if (typeof verdi === 'number') {
      if (!(verdi > 0) || !Number.isFinite(verdi)) throw new TypeError(`${navn} must be a positive factor`);
      for (const [t, v] of Object.entries(basis)) {
        if (hopp.includes(t) || /^var\(/.test(v)) continue;
        const ny = lengde(v, verdi);
        if (ny !== undefined && ny !== v) ut[t] = ny;
      }
    } else if (verdi && typeof verdi === 'object') {
      for (const [k, v] of Object.entries(verdi)) {
        const t = prefix + k;
        if (!(t in basis)) throw new TypeError(`${navn}: unknown step ${k} (${Object.keys(basis).map((x) => x.slice(prefix.length)).join(', ')})`);
        if (!/^-?[\d.]+(px|rem|em|ms|s)?$/.test(String(v))) throw new TypeError(`${navn}.${k}: not a CSS length or time: ${v}`);
        ut[t] = String(v);
      }
    } else throw new TypeError(`${navn} must be a factor or an object`);
  };
  skala('radius', valg.radius, '--radius-', ['--radius-pill']);
  skala('avstand', valg.avstand, '--space-', ['--space-0', '--space-px']);
  skala('bevegelse', valg.bevegelse, '--dur-');
  return Object.keys(ut).length ? ut : undefined;
}

// ---------------------------------------------------------------------------------------------
// Output: CSS. The light block is [data-tema="navn"] and the dark one the pair
// [data-theme="dark"][data-tema="navn"] (the attributes on the same element, as the built-in
// [data-accent] blocks) plus [data-theme="dark"] [data-tema="navn"] (data-tema on a descendant of the
// dark root). Both are (0,2,0) and come after tokens/colors.css, so they win over every [data-accent]
// block, and the light block (0,1,0) wins over [data-theme="dark"] (0,1,0) by order. What one mode's
// block writes, the other mode's block writes too, so the cascade gives exactly modi.<mode> in each
// mode: the accent group always, and the whole base set as soon as any base token differs.
export function tilCss(tema, { selector, darkSelector } = {}) {
  const lys = selector ?? `[data-tema="${tema.navn}"]`;
  if (UTRYGG.test(lys) || (darkSelector && UTRYGG.test(darkSelector))) throw new TypeError('selector must be a plain CSS selector');
  const mørk = darkSelector ?? (lys.startsWith(':root') ? `[data-theme="dark"]${lys.slice(5)}` : lys.startsWith('[') ? `[data-theme="dark"]${lys},[data-theme="dark"] ${lys}` : `[data-theme="dark"] ${lys}`);
  const blokk = (sel, verdier) => `${sel}{\n${Object.entries(verdier).map(([k, v]) => `${k}:${v};`).join('\n')}\n}`;
  const skrives = hvilkeTokens(tema);
  const hvilke = (mode) => Object.fromEntries(skrives.map((t) => [t, tema.modi[mode][t]]));
  const deler = [
    `/* Sussi theme "${tema.navn}", made by tokens/tema.js${tema.aksent ? ' from ' + tema.aksent : ''}. Load after styles.css; set data-tema="${tema.navn}" on <html> beside data-theme, or on an element inside it. */`,
  ];
  if (!tema.ok) deler.push(`/* NOT OK: ${tema.advarsler.length} contrast warning(s). ${tema.advarsler.map((a) => a.en.replace(/\*\//g, '* /')).join(' ')} */`);
  if (tema.skalaer) deler.push(blokk(lys, tema.skalaer));
  deler.push(blokk(lys, hvilke('light')), blokk(mørk, hvilke('dark')));
  const dur = tema.skalaer ? Object.keys(tema.skalaer).filter((t) => t.startsWith('--dur-')) : [];
  if (dur.length) deler.push(`@media (prefers-reduced-motion:reduce){${lys}{${dur.map((t) => `${t}:0ms;`).join('')}}}`);
  return deler.join('\n') + '\n';
}
// The tokens a theme writes, the same list in both modes: the accent group, and the base set when any base token differs from Sussi's own in either mode.
function hvilkeTokens(tema) {
  const baseEndret = MODI.some((mode) => GRUNNTOKENS.some((t) => tema.modi[mode][t].toUpperCase() !== GRUNNLAG[mode][t].toUpperCase()));
  return baseEndret ? [...GRUNNTOKENS, ...AKSENTTOKENS] : [...AKSENTTOKENS];
}

// ---------------------------------------------------------------------------------------------
// Output: DTCG (Format Module 2025.10), the paths tokens/sussi.tokens.json uses: the accent group
// under accent.<navn>.<light|dark>, overridden base tokens under theme.<light|dark>, and fonts,
// radius, spacing and motion under font, radius, space and motion.
const EXT = 'no.sussi';
const farge = (hex) => ({ colorSpace: 'srgb', components: [0, 2, 4].map((i) => Math.round((parseInt(hex.slice(i + 1, i + 3), 16) / 255) * 1e4) / 1e4), alpha: 1, hex: hex.toUpperCase() });
const dim = (text) => { const m = String(text).match(/^(-?[\d.]+)(px|rem|em)?$/); return { value: Number(m[1]), unit: m[2] || 'px' }; };
function sti(name) {
  if (name === '--focus-ring') return [['shadow', 'focus-ring'], 'shadow'];
  if (name === '--focus-color') return [['color', 'focus'], 'color'];
  const parts = name.slice(2).split('-');
  if (['surface', 'fg', 'border', 'accent', 'success', 'warning', 'danger', 'info'].includes(parts[0])) return [['color', parts[0], parts.length > 1 ? parts.slice(1).join('-') : 'default'], 'color'];
  return [['color', parts.join('-')], 'color'];
}
export function tilDtcg(tema) {
  const ut = { $description: `Sussi theme "${tema.navn}", made by tokens/tema.js${tema.aksent ? ' from ' + tema.aksent : ''}. The same paths as sussi.tokens.json; merge over it.` };
  const sett = (path, token) => { let n = ut; for (const [i, k] of path.entries()) { if (i === path.length - 1) n[k] = token; else n = n[k] || (n[k] = {}); } };
  const tokenFor = (name, value) => {
    const [path, type] = sti(name);
    if (type === 'shadow') {
      const m = value.match(RING);
      if (!m) throw new TypeError('--focus-ring is not "x y blur spread #RRGGBB": ' + value);
      return [path, { $type: 'shadow', $value: { color: farge(value.slice(-7)), offsetX: dim(m[1]), offsetY: dim(m[2]), blur: dim(m[3]), spread: dim(m[4]) }, $extensions: { [EXT]: { css: name } } }];
    }
    return [path, { $type: 'color', $value: farge(value), $extensions: { [EXT]: { css: name } } }];
  };
  const skrives = hvilkeTokens(tema);
  for (const mode of MODI) {
    const sel = mode === 'light' ? `[data-tema="${tema.navn}"]` : `[data-theme="dark"][data-tema="${tema.navn}"]`;
    sett(['accent', tema.navn, mode], { $extensions: { [EXT]: { selector: sel } } });
    for (const t of AKSENTTOKENS) { const tok = tokenFor(t, tema.modi[mode][t]); sett(['accent', tema.navn, mode, ...tok[0]], tok[1]); }
    // The base set goes under theme.<mode>, in both modes, as soon as it is written at all (the same rule as tilCss).
    for (const t of skrives) {
      if (AKSENTTOKENS.includes(t)) continue;
      const tok = tokenFor(t, tema.modi[mode][t]);
      sett(['theme', mode, ...tok[0]], tok[1]);
    }
    if (ut.theme?.[mode]) ut.theme[mode].$extensions = { [EXT]: { selector: sel } };
  }
  for (const [t, v] of Object.entries(tema.skalaer || {})) {
    let m;
    if ((m = t.match(/^--font-(\w+)$/))) sett(['font', 'family', m[1]], { $type: 'fontFamily', $value: v.split(',').map((f) => f.trim().replace(/^'(.*)'$/, '$1')), $extensions: { [EXT]: { css: t } } });
    else if ((m = t.match(/^--radius-(\w+)$/))) sett(['radius', m[1]], { $type: 'dimension', $value: dim(v), $extensions: { [EXT]: { css: t } } });
    else if ((m = t.match(/^--space-(.+)$/))) sett(['space', m[1]], { $type: 'dimension', $value: dim(v), $extensions: { [EXT]: { css: t } } });
    else if ((m = t.match(/^--dur-(\w+)$/))) { const d = String(v).match(/^([\d.]+)(ms|s)$/); sett(['motion', 'duration', m[1]], { $type: 'duration', $value: { value: Number(d[1]), unit: d[2] }, $extensions: { [EXT]: { css: t } } }); }
  }
  return ut;
}

// ---------------------------------------------------------------------------------------------
// Plain words for a person: what happened to the colour (oppsummer) and, when a theme is not OK, what to
// change (grupperAdvarsler). Both read only the theme lagTema returned, and give Norwegian and English.
const ROLLE = {
  no: { '--bg': 'bakgrunnen', '--surface-1': 'flaten', '--surface-2': 'flaten', '--surface-3': 'flaten', '--fg-1': 'teksten', '--fg-2': 'den sekundære teksten', '--fg-3': 'metateksten', '--border-control': 'kanten på felt', '--accent': 'aksenten', '--accent-fg': 'knappeteksten', '--accent-text': 'lenkefargen', '--focus-color': 'fokusringen', '--ringfarge': 'fargen i --focus-ring' },
  en: { '--bg': 'the background', '--surface-1': 'the surface', '--surface-2': 'the surface', '--surface-3': 'the surface', '--fg-1': 'the text', '--fg-2': 'the secondary text', '--fg-3': 'the meta text', '--border-control': 'the input border', '--accent': 'the accent', '--accent-fg': 'the button text', '--accent-text': 'the link colour', '--focus-color': 'the focus ring', '--ringfarge': 'the colour in --focus-ring' },
};
const rolle = (språk, t) => ROLLE[språk][t] || t;
// «teksten (--fg-1 #8A8A8A)», or the token alone when it has no everyday name.
const navn = (språk, t, verdi) => (ROLLE[språk][t] ? `${ROLLE[språk][t]} (${t}${verdi ? ' ' + verdi : ''})` : `${t}${verdi ? ' ' + verdi : ''}`);
const stor = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const tallNo = (n) => String(n).replace('.', ',');
const ratioTekst = (r) => Math.round(r * 100) / 100;
const listeNo = (xs) => (xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' og ' + xs.at(-1));
const listeEn = (xs) => (xs.length < 2 ? xs.join('') : xs.length === 2 ? xs.join(' and ') : xs.slice(0, -1).join(', ') + ' and ' + xs.at(-1));

/**
 * One sentence on what the engine did with your colour, in Norwegian (`no`) and English (`en`), from the report:
 * which mode moved the accent, from what to what, and which rule it was moved for. Also the resulting accents
 * (`aksent.light`, `aksent.dark`). When the theme is not OK the sentence says how many pairs fail; the
 * remedies are grupperAdvarsler(tema).
 */
export function oppsummer(tema) {
  const aksent = { light: tema.modi.light['--accent'], dark: tema.modi.dark['--accent'] };
  const alle = MODI.flatMap((m) => tema.rapport[m].målt);
  if (!tema.ok) {
    const under = alle.filter((p) => !p.ok).length + tema.advarsler.filter((a) => a.kode === 'like').length;
    return { ok: false, aksent, under, alle: alle.length,
      no: `Ikke OK: ${under} av ${alle.length} par holder ikke.`,
      en: `Not OK: ${under} of ${alle.length} pairs do not hold.` };
  }
  if (tema.preset) return { ok: true, aksent, no: `OK. Forhåndsoppsettet ${tema.preset} brukes som det er.`, en: `OK. The ${tema.preset} preset is used as it is.` };
  const grunn = (h, språk) => {
    const krav = språk === 'no' ? tallNo(h.krav) : String(h.krav);
    if (h.a === '--accent-fg') return språk === 'no' ? `knappeteksten holder ${krav}:1` : `the button text holds ${krav}:1`;
    if (h.a === '--accent') return språk === 'no' ? `aksenten holder ${krav}:1 mot ${h.b}` : `the accent holds ${krav}:1 against ${h.b}`;
    return språk === 'no' ? `${h.no} holder ${krav}:1` : `${h.en} holds ${krav}:1`;
  };
  const del = (m, språk) => {
    const f = tema.rapport[m].flyttet.find((x) => x.token === '--accent');
    const lys = m === 'light';
    if (!f) return språk === 'no' ? `I ${lys ? 'lys' : 'mørk'} modus brukes fargen din som den er.` : `${lys ? 'Light' : 'Dark'} mode uses your colour as it is.`;
    const mørkere = tilOklch(f.til).l < tilOklch(f.fra).l;
    const grunner = [...new Set(f.hvorfor.filter((h) => h.krav).map((h) => grunn(h, språk)))].slice(0, 2);
    if (språk === 'no') return `I ${lys ? 'lys' : 'mørk'} modus ble aksenten ${mørkere ? 'mørknet' : 'lysnet'} fra ${f.fra} til ${f.til}${grunner.length ? ' så ' + listeNo(grunner) : ''}.`;
    return `In ${lys ? 'light' : 'dark'} mode the accent was ${mørkere ? 'darkened' : 'lightened'} from ${f.fra} to ${f.til}${grunner.length ? ' so ' + listeEn(grunner) : ''}.`;
  };
  const flyttet = MODI.filter((m) => tema.rapport[m].flyttet.some((x) => x.token === '--accent'));
  if (!flyttet.length) return { ok: true, aksent, no: 'OK. Fargen din brukes som den er i begge moduser.', en: 'OK. Your colour is used as it is in both modes.' };
  return { ok: true, aksent, no: 'OK. ' + MODI.map((m) => del(m, 'no')).join(' '), en: 'OK. ' + MODI.map((m) => del(m, 'en')).join(' ') };
}

// What lagTema was given, read back from the theme it returned: the preset, or the accent and the dark accent (the
// report's `inn`), and per mode the values you set (they never move, so the theme holds them as given).
function valgFra(tema) {
  const overstyr = {};
  for (const m of MODI) {
    overstyr[m] = {};
    for (const [t, hvorfor] of Object.entries((tema.låst && tema.låst[m]) || {})) {
      if (hvorfor !== 'overstyr') continue;
      if (t === '--ringfarge') overstyr[m]['--focus-ring'] = tema.modi[m]['--focus-ring'];
      else overstyr[m][t] = tema.modi[m][t];
    }
  }
  return tema.preset ? { preset: tema.preset, overstyr } : { aksent: tema.aksent, mørkAksent: tema.rapport.dark.inn, overstyr };
}

/**
 * The warnings of a theme that is not OK, grouped by their cause, each with what to change. A group is one mode and one
 * value you set (`token`, the field to change), with every pair it fails:
 *   against other values you set ('begge': «teksten og bakgrunnen du satte er for like»),
 *   against colours the engine derives ('en': «har for lite kontrast mot bakgrunnen og de tre flatene (1,5–1,92:1)»).
 * Pairs where nothing is yours ('motor') are one group per mode, counted; two values set as the same colour where they
 * must differ are 'like'.
 * `forslag` is { token, hex, retning: 'mørkere' | 'lysere' }: the nearest value along OKLCH lightness, hue and chroma
 * kept, where every failing pair of the field reaches its requirement, and every pair of the field that holds today
 * still does, whether the other value is fixed (yours, a preset's or Sussi's own) or derived, by the engine's contrast
 * function. When no such value exists, the nearest value for the failing and fixed pairs alone is given only if the
 * engine, run again with it, keeps every pair of the mode that holds today. When the suggestions of one mode would
 * break each other, or none exists, there is none, and the text says to fix one value at a time.
 * `årsak` lists the values of yours involved. `no` and `en` say all of it in one or two sentences.
 */
export function grupperAdvarsler(tema) {
  const grupper = [];
  const FLATER4 = ['--bg', '--surface-1', '--surface-2', '--surface-3'];
  for (const mode of MODI) {
    const mNo = MODUSNAVN.no[mode], mEn = MODUSNAVN.en[mode];
    const verdier = { ...tema.modi[mode], '--ringfarge': tema.modi[mode]['--focus-ring'].slice(-7).toUpperCase() };
    const fast = (tema.låst && tema.låst[mode]) || {};
    const egen = (t) => fast[t] === 'overstyr';
    const regler = REGLER.filter((r) => !r.modus || r.modus === mode);
    const advarsler = tema.advarsler.filter((x) => x.modus === mode);
    const feiler = (r, v = verdier) => kontrast(v[r.a], v[r.b]) < r.min;
    // The nearest value for `token` where every pair of the field holds: the failing ones reach their requirement, and
    // those that hold today keep holding, against a value that does not move and against a derived colour alike (as
    // `andre` in lagTema's settle does). Leaving the derived pairs out let a suggestion fix one pair and break another.
    // When no such value exists, a derived colour may have to move: then the nearest value for the failing and fixed
    // pairs alone, but only if the engine, run with it, makes no pair of the mode fail that holds today.
    const finn = (token) => {
      if (!/^#[0-9A-F]{6}$/i.test(verdier[token] || '')) return null;
      const alle = regler.filter((r) => r.a === token || r.b === token).map((r) => ({ r, mot: r.a === token ? r.b : r.a }));
      const låste = alle.filter(({ r, mot }) => feiler(r) || fast[mot]);
      if (!låste.length) return null;
      const holder = (liste) => (h) => liste.every(({ r, mot }) => kontrast(h, verdier[mot]) >= r.min + 1e-9);
      let hex = nærmeste(verdier[token], verdier[låste[0].mot], holder(alle));
      if (!hex) {
        const h = nærmeste(verdier[token], verdier[låste[0].mot], holder(låste));
        if (h && ingenNyFeil(token, h)) hex = h;
      }
      return hex ? { token, hex, retning: tilOklch(hex).l < tilOklch(verdier[token]).l ? 'mørkere' : 'lysere' } : null;
    };
    // Runs the engine again with `hex` for `token`, as if you had taken the advice, and checks that every pair of the
    // mode that holds today still does.
    const ingenNyFeil = (token, hex) => {
      const valg = valgFra(tema);
      if (token === '--ringfarge') valg.overstyr[mode]['--focus-ring'] = tema.modi[mode]['--focus-ring'].slice(0, -7) + hex;
      else valg.overstyr[mode][token] = hex;
      const nøkkel = (p) => p.regel + '|' + p.krav;
      const før = new Set(tema.rapport[mode].målt.filter((p) => !p.ok).map(nøkkel));
      return lagTema(valg).rapport[mode].målt.every((p) => p.ok || før.has(nøkkel(p)));
    };
    // Each failing pair with a value of yours belongs to the field to change: the first of the pair (the text, the
    // fill) when a value for it exists, else the other.
    const perFelt = new Map();
    const motor = [];
    const forslagFor = new Map();
    const forslag = (t) => { if (!forslagFor.has(t)) forslagFor.set(t, finn(t)); return forslagFor.get(t); };
    for (const a of advarsler) {
      if (a.kode === 'like') {
        const u = ULIKE.find((x) => x.a === a.tokens[0] && x.b === a.tokens[1]);
        grupper.push({ modus: mode, type: 'like', årsak: a.tokens.filter(egen), advarsler: [a], forslag: null,
          no: `${mNo}: ${navn('no', a.tokens[0])} og ${navn('no', a.tokens[1])} du satte er like, ${a.verdier[0]}${u ? '; ' + u.no : ''}. Gi en av dem en annen verdi.`,
          en: `${mEn}: ${navn('en', a.tokens[0])} and ${navn('en', a.tokens[1])} you set are the same, ${a.verdier[0]}${u ? '; ' + u.en : ''}. Give one of them another value.` });
        continue;
      }
      const egne = a.tokens.filter(egen);
      if (!egne.length) { motor.push(a); continue; }
      const felt = egne.length === 2 && !forslag(egne[0]) && forslag(egne[1]) ? egne[1] : egne[0];
      if (!perFelt.has(felt)) perFelt.set(felt, []);
      perFelt.get(felt).push(a);
    }
    const iModus = [];
    for (const [t, liste] of perFelt) {
      // One line per counterpart: the same pair under two rules (a progress fill and a toast icon) is said once, at its lowest ratio.
      const mot = new Map();
      for (const a of liste) {
        const m = a.tokens[0] === t ? a.tokens[1] : a.tokens[0];
        const før = mot.get(m);
        if (!før || a.ratio < før.ratio) mot.set(m, { navn: m, verdi: verdier[m], ratio: ratioTekst(a.ratio), krav: Math.max(a.krav, før ? før.krav : 0), egen: egen(m) });
      }
      const motparter = [...mot.values()];
      const g = { modus: mode, type: motparter.some((m) => m.egen) ? 'begge' : 'en', token: t, årsak: [t, ...motparter.filter((m) => m.egen).map((m) => m.navn)], advarsler: liste, motparter, forslag: forslag(t) };
      iModus.push(g);
    }
    // The suggestions of a mode, taken together: if one breaks a pair with another, none is given.
    const med = { ...verdier };
    for (const g of iModus) if (g.forslag) med[g.token] = g.forslag.hex;
    const brutt = iModus.some((g) => g.forslag) && regler.some((r) => iModus.some((g) => g.forslag && (r.a === g.token || r.b === g.token)) && (fast[r.a] || iModus.some((g) => g.forslag && g.token === r.a)) && (fast[r.b] || iModus.some((g) => g.forslag && g.token === r.b)) && feiler(r, med));
    for (const g of iModus) {
      if (brutt || !g.forslag) { g.forslag = null; g.enOmGangen = brutt || iModus.length > 1; }
      const t = g.token, v = verdier[t];
      const egneMot = g.motparter.filter((m) => m.egen), andreMot = g.motparter.filter((m) => !m.egen);
      const krav = [...new Set(g.motparter.map((m) => m.krav))].sort((p, q) => p - q);
      const kravNo = listeNo(krav.map((k) => tallNo(k) + ':1')), kravEn = listeEn(krav.map((k) => k + ':1'));
      // Counterparts the engine derives: the background and the surfaces in words with a range, anything else by name.
      const beskriv = (ms, språk) => {
        const lo = Math.min(...ms.map((m) => m.ratio)), hi = Math.max(...ms.map((m) => m.ratio));
        const spenn = lo === hi ? (språk === 'no' ? tallNo(lo) : lo) + ':1' : språk === 'no' ? `${tallNo(lo)}–${tallNo(hi)}:1` : `${lo}–${hi}:1`;
        if (ms.every((m) => FLATER4.includes(m.navn))) {
          const navn = ms.map((m) => m.navn), flater = navn.filter((n) => n !== '--bg');
          const deler = [];
          if (navn.includes('--bg')) deler.push(språk === 'no' ? 'bakgrunnen' : 'the background');
          if (flater.length === 3) deler.push(språk === 'no' ? 'de tre flatene' : 'the three surfaces');
          else if (flater.length === 1) deler.push(språk === 'no' ? `flaten ${flater[0]}` : `the surface ${flater[0]}`);
          else if (flater.length) deler.push(språk === 'no' ? `flatene ${listeNo(flater)}` : `the surfaces ${listeEn(flater)}`);
          return `${språk === 'no' ? listeNo(deler) : listeEn(deler)} (${spenn})`;
        }
        return språk === 'no' ? listeNo(ms.map((m) => `${m.navn} (${tallNo(m.ratio)}:1)`)) : listeEn(ms.map((m) => `${m.navn} (${m.ratio}:1)`));
      };
      let no, en;
      if (egneMot.length === 1) {
        const m = egneMot[0];
        no = `${mNo}: ${navn('no', t, v)} og ${navn('no', m.navn, m.verdi)} du satte er for like: ${tallNo(m.ratio)}:1, må være ${tallNo(m.krav)}:1.`;
        en = `${mEn}: ${navn('en', t, v)} and ${navn('en', m.navn, m.verdi)} you set are too alike: ${m.ratio}:1, needs ${m.krav}:1.`;
      } else if (egneMot.length > 1) {
        no = `${mNo}: ${navn('no', t, v)} du satte er for lik ${listeNo(egneMot.map((m) => `${rolle('no', m.navn)} (${m.navn} ${m.verdi}, ${tallNo(m.ratio)}:1)`))}, som du også satte; kravet er ${kravNo}.`;
        en = `${mEn}: ${navn('en', t, v)} you set is too close to ${listeEn(egneMot.map((m) => `${rolle('en', m.navn)} (${m.navn} ${m.verdi}, ${m.ratio}:1)`))}, which you also set; the requirement is ${kravEn}.`;
      }
      if (egneMot.length && andreMot.length) {
        no += ` ${stor(rolle('no', t))} holder heller ikke mot ${beskriv(andreMot, 'no')}.`;
        en += ` ${stor(rolle('en', t))} also fails against ${beskriv(andreMot, 'en')}.`;
      } else if (!egneMot.length) {
        no = `${mNo}: ${ROLLE.no[t] ? `${ROLLE.no[t]} du satte (${t} ${v})` : `${t} ${v}, som du satte,`} har for lite kontrast mot ${beskriv(andreMot, 'no')}; kravet er ${kravNo}.`;
        en = `${mEn}: ${ROLLE.en[t] ? `${ROLLE.en[t]} you set (${t} ${v})` : `${t} ${v}, which you set,`} has too little contrast against ${beskriv(andreMot, 'en')}; the requirement is ${kravEn}.`;
      }
      const f = g.forslag;
      if (f) {
        // At the end of the scale there is nothing beyond: #000000, not «#000000 or darker».
        const ende = f.hex === '#000000' || f.hex === '#FFFFFF';
        no += ` Gjør ${rolle('no', f.token)} ${f.hex}${ende ? '' : ' eller ' + f.retning}.`;
        en += ` Make ${rolle('en', f.token)} ${f.hex}${ende ? '' : ' or ' + (f.retning === 'mørkere' ? 'darker' : 'lighter')}.`;
      } else if (g.enOmGangen) { no += ' Rett én verdi om gangen.'; en += ' Fix one value at a time.'; }
      g.no = no; g.en = en;
      grupper.push(g);
    }
    if (motor.length) {
      // Each pair once, counted, with the lowest ratio and the requirements.
      const par = new Map();
      for (const a of motor) { const k = a.tokens.join('|'); const før = par.get(k); if (!før || a.ratio < før.ratio) par.set(k, { a: a.tokens[0], b: a.tokens[1], ratio: a.ratio, krav: Math.max(a.krav, før ? før.krav : 0) }); }
      const alle = [...par.values()];
      const lo = ratioTekst(Math.min(...alle.map((p) => p.ratio)));
      const krav = [...new Set(alle.map((p) => p.krav))].sort((p, q) => p - q);
      const flater = [...new Set(alle.map((p) => p.b))];
      const egneHer = Object.values(fast).includes('overstyr');
      const gjørNo = egneHer ? `Endre eller tøm verdiene du har satt i ${mNo.toLowerCase()}.` : 'Prøv en annen aksentfarge.';
      const gjørEn = egneHer ? `Change or clear the values you set for ${mEn.toLowerCase()}.` : 'Try another accent colour.';
      const g = { modus: mode, type: 'motor', årsak: [], advarsler: motor, forslag: null };
      if (alle.length === 1) {
        const p = alle[0];
        g.no = `${mNo}: motoren fant ingen verdi som holder for ${p.a} på ${p.b} (${tallNo(lo)}:1, kravet er ${tallNo(p.krav)}:1). ${gjørNo}`;
        g.en = `${mEn}: the engine found no value that holds for ${p.a} on ${p.b} (${lo}:1; the requirement is ${p.krav}:1). ${gjørEn}`;
      } else {
        g.no = `${mNo}: motoren fant ingen verdi som holder for ${alle.length} par på ${listeNo(flater)} (laveste ${tallNo(lo)}:1, kravet er ${listeNo(krav.map((k) => tallNo(k) + ':1'))}). ${gjørNo}`;
        g.en = `${mEn}: the engine found no value that holds for ${alle.length} pairs on ${listeEn(flater)} (lowest ${lo}:1; the ${krav.length > 1 ? 'requirements are' : 'requirement is'} ${listeEn(krav.map((k) => k + ':1'))}). ${gjørEn}`;
      }
      grupper.push(g);
    }
  }
  // The ring's colour is measured as a token of its own; to a person it is the colour in --focus-ring.
  for (const g of grupper) { g.no = g.no.split('--ringfarge').join('--focus-ring'); g.en = g.en.split('--ringfarge').join('--focus-ring'); }
  return grupper;
}

/** The six built-in accents as themes, exactly as tokens/colors.css has them today. */
export const forhåndsoppsett = FORHÅNDSOPPSETT;
export { forhåndsoppsett as forhandsoppsett };
export default lagTema;
