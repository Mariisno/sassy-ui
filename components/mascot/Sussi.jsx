import React from 'react';

/**
 * Sussi — maskoten i designsystemet Sussi (katten til designeren).
 * Hvit katt, svarte ører og maske, smal hvit bles, svarte flekker på ryggen, svart hale, rosa nese og tredeputer.
 * Hun er alltid svart og hvit. I mørkt tema får hun en tynn lys kant via .s-sussi i components.css.
 * Positurer: hode (logo, favicon, avatar), ligger, titter (tomme tilstander), sover (lasting), strekk (lek, 404), sitter (velkommen).
 */

// Sussi mascot poses. 64×64 grid. Colours come from CSS vars so themes can adjust:
// --sussi-ink (black fur + outline), --sussi-fur (white fur), --sussi-pink (nose, paw pads), --sussi-cover (duvet).
// "__ID__" is replaced with a unique id per instance (clipPaths).
const INK = 'var(--sussi-ink,#1F1D1B)', FUR = 'var(--sussi-fur,#FFFFFF)', PINK = 'var(--sussi-pink,#E9A3A0)', EYE = 'var(--sussi-eye,#6E6C3A)';
// Eyes from sussi-ansikt-forfra.png: dark, big round pupils, a thin olive rim, heavy relaxed lids (flat, no slope). They sit on the mask's lower edge, so the white fur frames them from below.
function eye(cx, cy, dir, id) {
  const cid = id + (dir > 0 ? 'L' : 'R');
  return `<clipPath id="${cid}"><path d="M${cx - 5.4} ${cy - 0.6} Q${cx} ${cy - 2.1} ${cx + 5.4} ${cy - 0.6} L${cx + 5.4} ${cy + 5} L${cx - 5.4} ${cy + 5}Z"/></clipPath>`
    + `<g clip-path="url(#${cid})"><ellipse cx="${cx}" cy="${cy}" rx="4.8" ry="3.2" fill="${EYE}"/><circle cx="${cx}" cy="${cy - 0.2}" r="2.6" fill="${INK}"/><circle cx="${cx - 0.9}" cy="${cy - 0.6}" r=".65" fill="${FUR}" opacity=".9"/></g>`;
}
const HEAD_OUTLINE = 'M32 17.5 C44.5 17.5 53.5 24 55.5 33.5 C57.2 37.5 56.8 42 54 45.5 C50 51.2 42 54.2 32 54.2 C22 54.2 14 51.2 10 45.5 C7.2 42 6.8 37.5 8.5 33.5 C10.5 24 19.5 17.5 32 17.5Z';
function head(k) {
  const id = '__ID__h' + k;
  return `<defs><clipPath id="${id}"><path d="${HEAD_OUTLINE}"/></clipPath></defs>`
    + `<path d="M10.6 28.5 C10.2 21.5 11.2 15.4 13.8 11.4 C17.6 12.8 21.6 15.6 24.6 19Z M53.4 28.5 C53.8 21.5 52.8 15.4 50.2 11.4 C46.4 12.8 42.4 15.6 39.4 19Z" fill="${INK}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`
    + `<path d="${HEAD_OUTLINE}" fill="${FUR}"/>`
    + `<g clip-path="url(#${id})"><path d="M4 14 L30.2 14 C29.4 20 27.4 26 25 31 C23.6 33.6 22.6 35.6 21 37.4 C18 39.8 14.6 40.2 11 39.6 L4 38.8Z M60 14 L33.8 14 C34.6 20 36.6 26 39 31 C40.4 33.6 41.6 35.2 43.4 36.6 C46 38.2 49.6 38.2 53 37.2 L60 36.2Z" fill="${INK}"/></g>`
    + `<path d="${HEAD_OUTLINE}" fill="none" stroke="${INK}" stroke-width="2.2"/>`
    + eye(19.8, 35, 1, id) + eye(44.4, 34.6, -1, id)
    + `<path d="M29.8 40.6 Q32 39.6 34.2 40.6 Q33.8 42.6 32 43.6 Q30.2 42.6 29.8 40.6Z" fill="${PINK}"/>`
    + `<path d="M32 43.6 Q31 46.4 28.4 45.8 M32 43.6 Q33 46.4 35.6 45.8" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>`;
}
const headAt = (x, y, s, k, rot = 0) => `<g transform="${rot ? `rotate(${rot} ${x} ${y}) ` : ''}translate(${x - 32 * s} ${y - 34 * s}) scale(${s})">${head(k)}</g>`;
const paw = (cx, cy, rx = 6, ry = 3.5) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${FUR}" stroke="${INK}" stroke-width="2"/><circle cx="${cx - rx + 1.6}" cy="${cy}" r="1" fill="${PINK}"/>`;
const clipped = (id, body, patches) => `<defs><clipPath id="__ID__${id}"><path d="${body}"/></clipPath></defs><path d="${body}" fill="${FUR}"/><g clip-path="url(#__ID__${id})"><path d="${patches}" fill="${INK}"/></g><path d="${body}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;

const LIGGER_BODY = 'M11 51.5 C10 45 14 39 22 35.5 C28 32.5 33 31 38 31 C50.5 30.5 58.5 36 59.5 44.5 C60 48.5 58.5 51.5 55.5 51.5Z';
const SOVER_BODY = 'M8 44 C6 30 17 18 32 18 C47 18 58 28 57 41 C56.5 48 51 52 44 52 L16 52 C11 52 8.6 49 8 44Z';
const SITTER_BODY = 'M18 58 C11 47 14 32 32 30 C50 32 53 47 46 58Z';

export const sussiPoses = {
  hode: () => head('a'),
  ligger: () => clipped('b', LIGGER_BODY, 'M31 28 C35 27.5 40 27.5 43.5 28.5 C44.5 34 42.5 39.5 38 41.5 C34 42.5 31.5 38.5 31 28Z M49.5 29 C54 29.5 59 33 62 38.5 C58.5 42.5 53 42 51 38.5 C49.8 36 49.2 32 49.5 29Z')
    + `<path d="M58 45.5 C62.5 42 62 35.5 58.5 32.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    + paw(14.5, 52.2) + paw(24.5, 52.6) + headAt(19, 31, 0.56, 'b'),
  titter: () => `<defs><clipPath id="__ID__t"><rect x="0" y="0" width="64" height="47"/></clipPath></defs><g clip-path="url(#__ID__t)"><g transform="translate(0 3.5)">${head('t')}</g></g>`
    + `<path d="M3 47 L61 47" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` + paw(20, 45.4, 5.4, 3) + paw(44, 45.4, 5.4, 3),
  sover: () => `<path d="M10 47 C12 55 26 57.5 35 55" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`
    + clipped('s', SOVER_BODY, 'M20 15 C24 14 28.5 14 31.5 14.8 C32 22.5 30 30 25.5 35 C22 30.5 20.5 23 20 15Z')
    + paw(52, 53, 6.5, 3.4) + headAt(43, 40, 0.54, 's', -12),
  strekk: () => `<path d="M54.5 30 C60 26.5 61.5 20 58.5 15.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M22 39 L17 49" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M22 39 L17 49" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="17" cy="49" r="1.2" fill="${PINK}"/><path d="M28 40.5 L27 51" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M28 40.5 L27 51" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="27" cy="51" r="1.2" fill="${PINK}"/><path d="M44 40 L51 49" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M44 40 L51 49" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="51" cy="49" r="1.2" fill="${PINK}"/><path d="M50 37.5 L58 44" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M50 37.5 L58 44" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="58" cy="44" r="1.2" fill="${PINK}"/><path d="M17 30 C19 22.5 30 20.5 42 22 C52 23.5 57 28 56 34 C55 40 48 42.2 40 41.8 L25 41.4 C19 41 16 36 17 30Z" fill="${FUR}" stroke="${INK}" stroke-width="2.3" stroke-linejoin="round"/><path d="M26 21.7 C30 20.6 36 20.8 39.5 22 C38.5 27.5 34 30 29 29 C26.5 28 25.5 24.5 26 21.7Z" fill="${INK}"/><path d="M46 23.2 C50.5 23.8 54 26 55.2 28.6 C52 31.8 47.5 31 45.6 28.2Z" fill="${INK}"/><circle cx="12.5" cy="34.5" r="9" fill="${FUR}" stroke="${INK}" stroke-width="2.3"/><path d="M5.5 29.5 L2 21.5 L10.5 26Z M11 25.6 L10.5 17 L17.5 25.2Z" fill="${INK}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M4.6 31.5 C6 27 10 25.4 14 25.6 C18 26 21 29 21.3 32.5 C19 34.2 16.5 33.6 15 31.5 L12.6 27.6 L10.2 31.8 C8.5 33.4 6 33.2 4.6 31.5Z" fill="${INK}"/><path d="M8 34.2 Q10.3 36 12.6 34.2" fill="none" stroke="${FUR}" stroke-width="1.8" stroke-linecap="round"/><path d="M4.4 38 L7.4 37.4 L6.4 40.2Z" fill="${PINK}" stroke="${PINK}" stroke-width="1.1" stroke-linejoin="round"/>`,
  sitter: () => `<path d="M46 52 C56 51 58 59 49 61 C42 62 34 61 28 58" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`
    + clipped('i', SITTER_BODY, 'M40 36 C46 35 51 40 50.5 47 C46 48.5 41 44 40 36Z')
    + paw(26, 58.4, 5, 3) + paw(38, 58.4, 5, 3) + headAt(32, 19, 0.56, 'i'),
};
export const sussiPoseNames = Object.keys(sussiPoses);


const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function Sussi({ pose = 'hode', size = 48, title, className, ...rest }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const inner = (title ? '<title>' + esc(title) + '</title>' : '') + (sussiPoses[pose] || sussiPoses.hode)().split('__ID__').join('s' + uid + '_');
  return (
    <svg
      className={['s-sussi', className].filter(Boolean).join(' ')}
      width={size} height={size} viewBox="0 0 64 64"
      role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}
      {...rest}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
