// The theme builder: tokens/tema.js in the browser, a preview on real components, the report and the export.
import { lagTema, tilCss, tilDtcg, FORHÅNDSOPPSETT, oppsummer, grupperAdvarsler } from '/sassy-ui/sassy/tokens/tema.js';

const tekst = JSON.parse(document.getElementById('tema-tekst').textContent);
const $ = (id) => document.getElementById(id);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nb = tekst.lang === 'nb';
const tall = (n) => (nb ? String(n).replace('.', ',') : String(n));
const HEX = /^#?[0-9a-fA-F]{6}$/;
const norm = (v) => (HEX.test(v.trim()) ? '#' + v.trim().replace('#', '').toUpperCase() : null);
const felt = { farge: $('tema-farge'), hex: $('tema-hex'), navn: $('tema-navn'), mork: $('tema-mork') };
const over = { light: { '--bg': $('tema-lys-bg'), '--surface-1': $('tema-lys-surface-1'), '--fg-1': $('tema-lys-fg-1') }, dark: { '--bg': $('tema-mork-bg'), '--surface-1': $('tema-mork-surface-1'), '--fg-1': $('tema-mork-fg-1') } };
const stil = document.createElement('style');
stil.id = 'tema-stil';
document.head.appendChild(stil);
for (const b of document.querySelectorAll('[data-preset-swatch]')) b.style.background = FORHÅNDSOPPSETT[b.dataset.presetSwatch].light['--accent'];
let preset = 'moss';
let tema = null;

// An error names the field it is about, so it can be shown under that field.
const feilI = (el, melding) => Object.assign(new Error(melding), { felt: el });
function valg() {
  const aksent = norm(felt.hex.value);
  if (!aksent) throw feilI(felt.hex, tekst.ugyldigHex);
  const navn = felt.navn.value.trim().toLowerCase() || 'tema';
  if (!/^[a-z][a-z0-9-]*$/.test(navn)) throw feilI(felt.navn, tekst.ugyldigNavn);
  const v = { navn, aksent };
  if (felt.mork.value.trim()) { const m = norm(felt.mork.value); if (!m) throw feilI(felt.mork, tekst.ugyldigHex); v.mørkAksent = m; }
  const o = {};
  for (const mode of ['light', 'dark']) for (const [t, el] of Object.entries(over[mode])) {
    if (!el.value.trim()) continue;
    const h = norm(el.value);
    if (!h) throw feilI(el, tekst.ugyldigHex);
    (o[mode] || (o[mode] = {}))[t] = h;
  }
  if (Object.keys(o).length) v.overstyr = { light: o.light || {}, dark: o.dark || {} };
  // A preset is only itself while nothing else is set.
  if (preset && !v.mørkAksent && !v.overstyr && FORHÅNDSOPPSETT[preset].light['--accent'] === aksent && navn === preset) return { preset, navn };
  return v;
}

function kommando(v) {
  const q = (s) => '"' + s + '"';
  if (v.preset) return 'npx sassy-tema --preset ' + v.preset;
  let s = 'npx sassy-tema --aksent ' + q(v.aksent) + ' --navn ' + v.navn;
  if (v.mørkAksent) s += ' --morkAksent ' + q(v.mørkAksent);
  if (v.overstyr) {
    const l = Object.keys(v.overstyr.light).length, d = Object.keys(v.overstyr.dark).length;
    if (l && d) s += " --overstyr '" + JSON.stringify(v.overstyr) + "'";
    else s += " --overstyr '" + JSON.stringify(l ? v.overstyr.light : v.overstyr.dark) + "' --modus " + (l ? 'light' : 'dark');
  }
  return s;
}

function rapport(t) {
  const status = $('tema-status');
  const alle = ['light', 'dark'].flatMap((m) => t.rapport[m].målt);
  const under = alle.filter((p) => !p.ok).length;
  status.textContent = t.ok ? tekst.temaOkN.replace('{n}', alle.length) : tekst.temaIkkeOkN.replace('{n}', under).replace('{m}', alle.length);
  status.className = 'tema-status ' + (t.ok ? 'tema-status--ok' : 'tema-status--feil');
  status.dataset.ok = String(t.ok);
  $('tema-rapport').innerHTML = ['light', 'dark'].map((m) => {
    const r = t.rapport[m];
    const flyttet = r.flyttet.length ? '<ul>' + r.flyttet.map((f) => '<li><code>' + esc(f.token) + '</code> ' + esc(tekst.fra) + ' <code>' + esc(f.fra) + '</code> ' + esc(tekst.til) + ' <code>' + esc(f.til) + '</code>: ' + f.hvorfor.map((h) => esc(nb ? h.no : h.en)).join('; ') + '</li>').join('') + '</ul>' : '<p class="side-hint">' + esc(tekst.ingenFlyttet) + '</p>';
    const rader = r.målt.map((p) => '<tr><th scope="row"><code>' + esc(p.regel) + '</code></th><td><span class="side-swatch" style="background:' + esc(p.a) + '"></span><code>' + esc(p.a) + '</code> <span class="side-swatch" style="background:' + esc(p.b) + '"></span><code>' + esc(p.b) + '</code></td><td><span class="side-ratio' + (p.ok ? '' : ' side-ratio--under') + '">' + tall(p.ratio) + ':1</span></td><td>' + tall(p.krav) + ':1</td><td>' + (p.ok ? esc(tekst.okOrd) : esc(tekst.ikkeOk)) + '</td></tr>').join('');
    return '<h3>' + esc(m === 'light' ? tekst.lys : tekst.mork) + '</h3><h4>' + esc(tekst.flyttet) + '</h4>' + flyttet + '<details class="side-detaljer"><summary>' + esc(tekst.maalt) + ' (' + r.målt.length + ')</summary><div class="side-rull" tabindex="0"><table class="side-tabell"><thead><tr><th scope="col">' + esc(tekst.regel) + '</th><th scope="col">' + esc(tekst.farger) + '</th><th scope="col">' + esc(tekst.maalt) + '</th><th scope="col">' + esc(tekst.krav) + '</th><th scope="col">OK</th></tr></thead><tbody>' + rader + '</tbody></table></div></details>';
  }).join('');
}

// The verdict under the accent field: the engine's own sentence (oppsummer), the resulting accents, and when the theme is not
// OK what to change, grouped by cause (grupperAdvarsler), each with a link to the field. The CSS download says «anyway».
function dom(t) {
  const o = oppsummer(t);
  $('tema-dom').hidden = false;
  const farge = (mode) => '<span class="tema-dom__farge"><span class="side-swatch" style="background:' + esc(o.aksent[mode]) + '"></span>' + esc(mode === 'light' ? tekst.lys : tekst.mork) + ' <code>' + esc(o.aksent[mode]) + '</code></span>';
  $('tema-dom-farger').innerHTML = esc(tekst.domFarger) + ' ' + farge('light') + ' ' + farge('dark');
  const setning = $('tema-dom-tekst');
  setning.textContent = nb ? o.no : o.en;
  $('tema-dom').className = 'tema-dom ' + (t.ok ? 'tema-dom--ok' : 'tema-dom--feil');
  $('tema-dom').dataset.ok = String(t.ok);
  const grupper = t.ok ? [] : grupperAdvarsler(t);
  const ugyldige = new Set();
  $('tema-advarsler').innerHTML = grupper.length ? '<p class="tema-dom__retter">' + esc(tekst.retter) + '</p><ul>' + grupper.map((g) => {
    let m = nb ? g.no : g.en;
    if (g.type === 'begge' || g.type === 'en') m = g.forslag ? m.replace(/\.$/, '') + (g.type === 'begge' ? tekst.haleBegge : tekst.haleEn) : m + ' ' + (g.type === 'begge' ? tekst.tomBegge : tekst.tomEn);
    for (const tok of g.årsak) if (over[g.modus][tok]) ugyldige.add(over[g.modus][tok]);
    const felt = over[g.modus][g.forslag ? g.forslag.token : g.årsak[0]];
    const lenke = felt ? ' <a href="#' + felt.id + '" data-felt="' + felt.id + '">' + esc(tekst.tilFeltet) + ': ' + esc(document.querySelector('label[for="' + felt.id + '"]').textContent) + ', ' + esc((g.modus === 'light' ? tekst.lysModus : tekst.morkModus).toLowerCase()) + '</a>' : '';
    return '<li>' + esc(m) + lenke + '</li>';
  }).join('') + '</ul>' : '';
  merk(ugyldige);
  lastKnapp(t.ok);
}
// aria-invalid and the visible invalid border (.s-control--invalid) on the fields that stand in the way.
function merk(ugyldige) {
  for (const mode of ['light', 'dark']) for (const el of Object.values(over[mode])) {
    const på = ugyldige.has(el);
    if (på) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    el.closest('.s-control').classList.toggle('s-control--invalid', på);
  }
}
function lastKnapp(ok) {
  const last = $('tema-last-css');
  last.classList.toggle('s-btn--primary', ok);
  last.classList.toggle('s-btn--secondary', !ok);
  $('tema-last-css-tekst').textContent = ok ? tekst.lastCss : tekst.lastLikevel;
}
// While a field holds something that is not a colour (or a name that is not a name), the verdict says what it is waiting
// for: the report, the CSS and the command below still show the previous theme, so they are dimmed and marked (utdatert).
function tomDom(el) {
  const d = $('tema-dom');
  d.hidden = false;
  d.className = 'tema-dom tema-dom--venter';
  delete d.dataset.ok;
  $('tema-dom-farger').textContent = '';
  $('tema-dom-tekst').textContent = el === felt.navn ? tekst.venterNavn : tekst.venter;
  $('tema-advarsler').innerHTML = '';
  merk(new Set());
  lastKnapp(true);
}
// The error stands right under the field it is about (#tema-feil moves there), named by aria-describedby, with
// aria-invalid and the invalid border on the field; a field that is right again gets its own description back.
let feilFelt = null;
function visFeil(el, melding) {
  const feil = $('tema-feil');
  skjulFeil();
  if (!el) el = felt.hex;
  el.closest('.s-field').appendChild(feil);
  feil.textContent = melding;
  feil.hidden = false;
  el.dataset.beskrevet = el.getAttribute('aria-describedby') || '';
  el.setAttribute('aria-describedby', (el.dataset.beskrevet + ' tema-feil').trim());
  el.setAttribute('aria-invalid', 'true');
  el.closest('.s-control').classList.add('s-control--invalid');
  feilFelt = el;
}
function skjulFeil() {
  $('tema-feil').hidden = true;
  if (!feilFelt) return;
  if (feilFelt.dataset.beskrevet) feilFelt.setAttribute('aria-describedby', feilFelt.dataset.beskrevet); else feilFelt.removeAttribute('aria-describedby');
  delete feilFelt.dataset.beskrevet;
  feilFelt.removeAttribute('aria-invalid');
  feilFelt.closest('.s-control').classList.remove('s-control--invalid');
  feilFelt = null;
}
// The command, the CSS, the JSON and the two snippets: dimmed, with a dashed edge and the note before them, while they show
// the previous theme. The note is the code blocks' description, so a screen reader that lands on one hears it.
const KODER = ['tema-kommando', 'tema-css', 'tema-json', 'tema-bruk-cdn', 'tema-bruk-npm'];
function utdatert(paa) {
  $('tema-utdatert').hidden = !paa;
  for (const id of KODER) {
    const pre = $(id).closest('pre'), boks = pre.closest('.side-kode');
    for (const el of [pre, boks]) if (el) { if (paa) el.dataset.utdatert = ''; else delete el.dataset.utdatert; }
    if (paa) pre.setAttribute('aria-describedby', 'tema-utdatert'); else pre.removeAttribute('aria-describedby');
  }
}
$('tema-advarsler').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-felt]');
  if (!a) return;
  e.preventDefault();
  const el = $(a.dataset.felt);
  el.scrollIntoView({ block: 'center' });
  el.focus({ preventScroll: true });
});

function bygg() {
  let v;
  try { v = valg(); tema = lagTema(v); } catch (e) { tomDom(e.felt); visFeil(e.felt, e.message); utdatert(Boolean(tema)); return; }
  skjulFeil();
  utdatert(false);
  const css = tilCss(tema);
  $('tema-css').textContent = css;
  $('tema-json').textContent = JSON.stringify(tilDtcg(tema), null, 2);
  $('tema-kommando').textContent = kommando(v);
  $('tema-bruk-cdn').textContent = '<link rel="stylesheet" href="' + $('tema-bruk-cdn').dataset.cdn + '">\n<link rel="stylesheet" href="' + tema.navn + '.css">\n<html data-theme="light" data-tema="' + tema.navn + '">';
  $('tema-bruk-npm').textContent = "import 'sassy/styles.css';\nimport './" + tema.navn + ".css';";
  // The preview panels are .tema-lys and .tema-mork whatever the page's theme is, so the theme is written for those selectors.
  stil.textContent = tilCss(tema, { selector: '.tema-lys', darkSelector: '.tema-mork' });
  rapport(tema);
  dom(tema);
  document.querySelectorAll('[data-preset]').forEach((b) => b.setAttribute('aria-pressed', v.preset === b.dataset.preset ? 'true' : 'false'));
  window.sassyTema = tema;
}

function lastNed(navn, innhold, type) {
  const url = URL.createObjectURL(new Blob([innhold], { type }));
  const a = document.createElement('a');
  a.href = url; a.download = navn; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$('tema-last-css').addEventListener('click', () => tema && lastNed(tema.navn + '.css', tilCss(tema), 'text/css'));
$('tema-last-json').addEventListener('click', () => tema && lastNed(tema.navn + '.tokens.json', JSON.stringify(tilDtcg(tema), null, 2), 'application/json'));
$('tema-kopier').addEventListener('click', async () => { if (!tema) return; try { await navigator.clipboard.writeText(tilCss(tema)); $('tema-kopiert').textContent = tekst.kopiert; setTimeout(() => { $('tema-kopiert').textContent = ''; }, 2000); } catch {} });

for (const b of document.querySelectorAll('[data-preset]')) b.addEventListener('click', () => {
  preset = b.dataset.preset;
  const hex = FORHÅNDSOPPSETT[preset].light['--accent'];
  felt.hex.value = hex; felt.farge.value = hex; felt.navn.value = preset; felt.mork.value = '';
  for (const mode of ['light', 'dark']) for (const el of Object.values(over[mode])) el.value = '';
  bygg();
});
// Typing and dragging the colour picker fire input many times a frame: rebuild once, in the next frame, with the last value.
let ramme = 0;
const byggSnart = () => { if (!ramme) ramme = requestAnimationFrame(() => { ramme = 0; bygg(); }); };
felt.farge.addEventListener('input', () => { felt.hex.value = felt.farge.value.toUpperCase(); preset = null; byggSnart(); });
felt.hex.addEventListener('input', () => { const h = norm(felt.hex.value); if (h) felt.farge.value = h; preset = null; byggSnart(); });
for (const el of [felt.navn, felt.mork, ...Object.values(over.light), ...Object.values(over.dark)]) el.addEventListener('input', byggSnart);
$('tema-skjema').addEventListener('submit', (e) => { e.preventDefault(); bygg(); });
felt.hex.value = '#47663A';
bygg();

// The preview: real components from the global build, React from unpkg. Both are classic scripts with defer, so they are
// in place by the time a module runs; without them (offline, or a build without dist/) the rest of the page still works.
const S = window["SassyDesignSystem_a2c9b8"];
const R = window.React, RD = window.ReactDOM;
if (!S || !R || !RD) {
  $('tema-forhand-mangler').hidden = false;
} else {
  const h = R.createElement;
  const d = tekst.demo;
  const { Button, Input, Tabs, TabPanel, Toast, Dialog, Progress, Badge, Tag, Menu, Popover } = S;
  function Panel({ modus }) {
    const [open, setOpen] = R.useState(false);
    const [valgt, setValgt] = R.useState(true);
    const base = 'tema-' + modus + '-';
    return h(R.Fragment, null,
      h('div', { className: 'tema-panel__rad' }, h(Button, { id: base + 'primary' }, d.lagre), h(Button, { variant: 'secondary' }, d.avbryt), h(Button, { variant: 'soft' }, d.myk), h(Button, { variant: 'ghost' }, d.stille), h(Button, { variant: 'danger', iconLeft: 'trash-2' }, d.slett)),
      h(Input, { id: base + 'inp', label: d.navn, hint: d.hint }),
      h(Tabs, { 'aria-label': tekst.faner, defaultValue: 'a', id: base + 'tabs', items: [{ id: 'a', label: d.oversikt, count: 3 }, { id: 'b', label: d.notater }] }, h(TabPanel, { value: 'a' }, d.alt), h(TabPanel, { value: 'b' }, d.ingen)),
      h('div', { className: 'tema-panel__rad' }, h(Badge, { tone: 'accent' }, d.ny), h(Badge, { tone: 'success', dot: true }, d.ferdig), h(Badge, { tone: 'warning' }, d.venter), h(Tag, { selected: valgt, onClick: () => setValgt(!valgt) }, d.tag), h(Tag, { onRemove: () => {}, removeLabel: d.fjern }, d.tag2)),
      h(Progress, { value: 60, label: d.framdrift }),
      Menu && Popover ? h('div', { className: 'tema-panel__rad' },
        h(Menu, { triggerLabel: d.mer, items: [{ id: 'rediger', label: d.rediger, icon: 'pencil' }, { id: 'kopier', label: d.kopier, icon: 'copy' }, '-', { id: 'slett', label: d.slett, icon: 'trash-2', danger: true }], onSelect: () => {} }),
        h(Popover, { trigger: h(Button, { variant: 'secondary', iconRight: 'chevron-down' }, d.filter) }, h('p', { style: { padding: '12px 14px', margin: 0 } }, d.filterTekst))) : null,
      h(Toast, { id: base + 'toast', title: d.lagret, description: d.lagretTekst, actionLabel: d.angre, onAction: () => {}, closeLabel: d.lukk }),
      h('div', null, h(Button, { id: base + 'open', variant: 'secondary', onClick: () => setOpen(true) }, d.aapne)),
      h(Dialog, { open, onClose: () => setOpen(false), inline: true, title: d.tittel, description: d.beskrivelse, closeLabel: d.lukk, footer: h(R.Fragment, null, h(Button, { variant: 'ghost', onClick: () => setOpen(false) }, d.behold), h(Button, { variant: 'danger', onClick: () => setOpen(false) }, d.slettProsjekt)) }, h('p', null, d.kropp)));
  }
  for (const modus of ['light', 'dark']) RD.createRoot($('tema-forhand-' + modus)).render(h(Panel, { modus }));
}
