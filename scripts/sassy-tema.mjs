#!/usr/bin/env node
// Builds a Sassy theme from an accent colour, with the contrast guarantee, and prints the CSS
// (or the DTCG JSON) and a report of what the engine had to move. The engine is tokens/tema.js.
//
//   node scripts/sassy-tema.mjs --aksent "#2F6F9F" --navn hav
//   node scripts/sassy-tema.mjs --aksent "#2F6F9F" --navn hav --format json --ut hav.tokens.json
//   node scripts/sassy-tema.mjs --preset clay
//   node scripts/sassy-tema.mjs --aksent "#2F6F9F" --overstyr '{"--bg":"#F4F7FA"}' --modus light
//   node scripts/sassy-tema.mjs --aksent "#2F6F9F" --radius 1.5 --avstand 1.1 --bevegelse 0.8 --sans "Inter, sans-serif"
//
// Exit codes: 0 ok, 1 the theme is not ok (a pair cannot pass; the output is still written, with the
// warnings as a comment), 2 a usage or input error (one line on stderr, nothing written).
import { existsSync, statSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { lagTema, tilCss, tilDtcg, grupperAdvarsler } from '../tokens/tema.js';

const MED_VERDI = ['aksent', 'preset', 'navn', 'format', 'ut', 'overstyr', 'modus', 'sans', 'mono', 'display', 'radius', 'avstand', 'bevegelse', 'mørkAksent', 'morkAksent'];
const UTEN_VERDI = ['help', 'stille', 'force'];
const USAGE = `Usage: sassy-tema --aksent "#RRGGBB" [--navn <name>] [--format css|json] [--ut <file> [--force]]
       sassy-tema --preset <moss|clay|fjord|lichen|lyng|ochre>
Options: --overstyr '{"--bg":"#…"}' --modus light|dark|begge   --morkAksent "#RRGGBB"
         --sans/--mono/--display "<font list>"   --radius/--avstand/--bevegelse <factor>   --stille   --help`;
const feil = (msg) => { console.error(msg); process.exit(2); };

const args = process.argv.slice(2);
const flagg = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (!a.startsWith('--')) feil(`Unexpected argument: ${a}. Flags are --${[...MED_VERDI, ...UTEN_VERDI].join(', --')}.`);
  const navn = a.slice(2);
  if (UTEN_VERDI.includes(navn)) { flagg[navn] = true; continue; }
  if (!MED_VERDI.includes(navn)) feil(`Unknown flag --${navn}. Flags are --${[...MED_VERDI, ...UTEN_VERDI].join(', --')}.`);
  const v = args[++i];
  if (v === undefined) feil(`--${navn} needs a value`);
  flagg[navn] = v;
}

if (flagg.help) { console.error(USAGE); process.exit(0); }
if (!flagg.aksent && !flagg.preset) feil(USAGE);

const tall = (navn) => { if (flagg[navn] === undefined) return undefined; const n = Number(flagg[navn]); if (!(n > 0)) feil(`--${navn} must be a positive number`); return n; };
let overstyr;
if (flagg.overstyr) {
  try { overstyr = JSON.parse(flagg.overstyr); } catch (e) { feil(`--overstyr is not JSON: ${e.message}`); }
}
const skrift = {};
for (const k of ['sans', 'mono', 'display']) if (flagg[k]) skrift[k] = flagg[k];
const format = flagg.format || 'css';
if (!['css', 'json'].includes(format)) feil('--format must be css or json');
if (flagg.ut) {
  if (existsSync(flagg.ut)) {
    if (statSync(flagg.ut).isDirectory()) feil(`--ut ${flagg.ut} is a folder`);
    if (!flagg.force) feil(`--ut ${flagg.ut} exists; pass --force to overwrite it`);
  } else if (!existsSync(dirname(flagg.ut))) feil(`--ut: the folder ${dirname(flagg.ut)} does not exist`);
}

let tema, ut;
try {
  tema = lagTema({
    navn: flagg.navn, aksent: flagg.aksent, preset: flagg.preset, overstyr, modus: flagg.modus, mørkAksent: flagg['mørkAksent'] ?? flagg.morkAksent,
    skrift: Object.keys(skrift).length ? skrift : undefined, radius: tall('radius'), avstand: tall('avstand'), bevegelse: tall('bevegelse'),
  });
  ut = format === 'json' ? JSON.stringify(tilDtcg(tema), null, 2) + '\n' : tilCss(tema);
} catch (e) { feil(e.message.split('\n')[0]); }

if (flagg.ut) writeFileSync(flagg.ut, ut); else process.stdout.write(ut);

if (!flagg.stille) {
  const linjer = [`Sassy theme "${tema.navn}" (${tema.nivå}${tema.preset ? ', preset ' + tema.preset : ', from ' + tema.aksent}): ${tema.ok ? 'ok, every rule holds' : 'NOT OK'}`];
  for (const mode of ['light', 'dark']) {
    const r = tema.rapport[mode];
    linjer.push(`  ${mode}: --accent ${tema.modi[mode]['--accent']}, --accent-text ${tema.modi[mode]['--accent-text']}, --accent-fg ${tema.modi[mode]['--accent-fg']}, --focus-color ${tema.modi[mode]['--focus-color']}`);
    if (!r.flyttet.length) linjer.push('    nothing moved');
    for (const f of r.flyttet) linjer.push(`    moved ${f.token} ${f.fra} -> ${f.til} (L ${f.deltaL > 0 ? '+' : ''}${f.deltaL}): ${f.hvorfor.map((h) => h.en).join('; ')}`);
    const verste = [...r.målt].sort((p, q) => p.ratio / p.krav - q.ratio / q.krav)[0];
    linjer.push(`    ${r.målt.length} pairs measured, tightest ${verste.par[0]} on ${verste.par[1]}: ${verste.ratio}:1 (needs ${verste.krav}:1)`);
  }
  for (const a of tema.advarsler) linjer.push(`  WARNING ${a.en}\n  ADVARSEL ${a.no}`);
  // What to change, grouped by cause, with a value that holds (tokens/tema.js, grupperAdvarsler).
  for (const g of grupperAdvarsler(tema)) linjer.push(`  TO FIX ${g.en}\n  SLIK RETTER DU ${g.no}`);
  if (flagg.ut) linjer.push(`  wrote ${flagg.ut}`);
  console.error(linjer.join('\n'));
}
process.exit(tema.ok ? 0 : 1);
