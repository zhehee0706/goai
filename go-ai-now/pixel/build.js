'use strict';
// Go AI pixel art. Same company as Go Paws, so it reuses the Go Paws pixel library, the nine-colour brand palette and
// Pogo himself (scripts/pixel in the Go Paws repo, read only). Light from the top left, Midnight outline, no
// half-transparent pixels. Run:  node pixel/build.js   ->  app/img/pixel/*.png (1x) + pixel/preview/*.png (review)
const fs = require('fs');
const path = require('path');
const GOPAWS = path.resolve(__dirname, '../../Go Paws Website/scripts/pixel');
const P = require(path.join(GOPAWS, 'pixel.js'));
const { R, OUTLINE } = require(path.join(GOPAWS, 'palette.js'));
const POGO = require(path.join(GOPAWS, 'pogo.js'));

const OUT = path.join(__dirname, '..', 'app', 'img', 'pixel');
const PREVIEW = path.join(__dirname, 'preview');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(PREVIEW, { recursive: true });

const K = (hex) => P.c(hex) >>> 0;
const GOLD = { deep: R.gold[1], shade: R.gold[2], base: R.gold[3], lit: R.gold[4], hi: R.champagne[4] };
const BLUE = { deep: R.mineral[1], shade: R.mineral[2], base: R.mineral[3], lit: R.mineral[4], hi: R.mineral[5] };
const INK = R.midnight[3], INK_LIT = R.ocean[4], IVORY = R.ivory[3], WHITE = R.parchment[4];
const lightBy = (mat) => {
  const up = new Map([[K(mat.base), K(mat.lit)], [K(mat.shade), K(mat.base)]]);
  const down = new Map([[K(mat.base), K(mat.shade)], [K(mat.shade), K(mat.deep)]]);
  return [(k) => up.get(k >>> 0), (k) => down.get(k >>> 0)];
};

/* ------------------------------------------------------------------ logo: the bolt fish */
// The Go Paws fish swims right with motion arcs behind it; Go AI's fish carries a gold bolt down its side.
function mark() {
  const s = P.surface(32, 24);
  s.poly([3, 5, 9, 11, 9, 13, 3, 19, 5, 12], BLUE.base);        // tail
  s.ellipse(17, 12, 10, 8, BLUE.base);                           // body
  s.poly([14, 4, 20, 1, 22, 5], BLUE.base);                      // dorsal fin
  s.rim(...lightBy(BLUE));
  s.stamp([             // the bolt, across the body
    '...gg',
    '..ggl',
    '.ggl.',
    'gggggg',
    '..ggs.',
    '..gs..',
    '.gs...',
  ].map((r) => r.padEnd(6, '.')), { g: GOLD.base, l: GOLD.lit, s: GOLD.shade }, 13, 7);
  s.stamp(['hh', 'h.'], { h: BLUE.hi }, 10, 6);                  // gloss
  s.outline(OUTLINE);
  s.stamp(['ww', 'wp'], { w: WHITE, p: OUTLINE }, 22, 9);        // eye
  s.stamp(['o', 'o'], { o: OUTLINE }, 26, 13);                   // mouth line
  return s;
}
// Chunky rounded letters (one per grid), 3 px strokes like the Go Paws logotype.
const GLYPH = {
  G: ['..ooooo..', '.ooooooo.', 'ooo...ooo', 'ooo......', 'ooo.ooooo', 'ooo.ooooo', 'ooo...ooo', '.oooooooo', '..ooooo.o'],
  O: ['..ooooo..', '.ooooooo.', 'ooo...ooo', 'ooo...ooo', 'ooo...ooo', 'ooo...ooo', 'ooo...ooo', '.ooooooo.', '..ooooo..'],
  A: ['..ooooo..', '.ooooooo.', 'ooo...ooo', 'ooo...ooo', 'ooooooooo', 'ooooooooo', 'ooo...ooo', 'ooo...ooo', 'ooo...ooo'],
  I: ['ooooooo', 'ooooooo', '..ooo..', '..ooo..', '..ooo..', '..ooo..', '..ooo..', 'ooooooo', 'ooooooo'],
};
function word(text, col, shade) {
  const w = [...text].reduce((n, ch) => n + (ch === ' ' ? 4 : GLYPH[ch][0].length + 1), 0) + 1;
  const s = P.surface(w, 11);
  let x = 0;
  for (const ch of text) {
    if (ch === ' ') { x += 4; continue; }
    s.stamp(GLYPH[ch], { o: col }, x, 0);
    x += GLYPH[ch][0].length + 1;
  }
  // a drop shadow one pixel down-right in the shade colour gives the letters weight at 1x
  const out = P.surface(w + 1, 11);
  out.blit(s.copy().recolor({ [P.hex(col)]: P.hex(shade) }), 1, 1).blit(s, 0, 0);
  return out;
}
function lockup(textCol, shade) {
  const m = mark(), wd = word('GO AI', textCol, shade);
  const s = P.surface(m.w + 1 + wd.w, 24);
  s.blit(m, 0, 0).blit(wd, m.w + 1, 6);
  return s.crop(2, 0, s.w - 2, 22);
}

/* ------------------------------------------------------------------ Super Pogo: Pogo with a gold cape and mask */
const CAPE = { deep: R.gold[1], shade: R.gold[2], base: R.gold[3], lit: R.gold[4] };
function cape(s, wave, ox, oy, lift) {
  // tied at the neck (ox+12..20, oy+18) and streaming out to the left as if he is flying right. wave 0..3 moves a
  // ripple along the trailing edge so the four frames loop.
  const y0 = oy + 17 - lift, a = [0, 2, 3, 1][wave], b = [2, 0, 1, 3][wave];
  s.poly([
    ox + 20, y0, ox + 10, y0 - 3,                       // over the shoulders
    ox - 2, y0 - 5 + a, ox - 9, y0 - 2 + b,             // top edge streaming left
    ox - 13, y0 + 3 - a,                                // trailing tip
    ox - 9, y0 + 7 - b, ox - 3, y0 + 9 + a,             // bottom edge
    ox + 8, y0 + 8, ox + 14, y0 + 4,
  ], CAPE.base);
  s.rim(...lightBy(CAPE));
  s.line(ox + 6, y0 + 1, ox - 8, y0 + 1 + b - a, CAPE.shade);      // a fold along the middle
  s.line(ox + 4, y0 - 2, ox - 4, y0 - 3 + a, CAPE.lit);            // wind catching the top
  s.outline(OUTLINE);
}
function mask(s, ox, oy, lift) {
  // a domino mask: body pixels across the eye row turn Midnight; the eye whites stay
  const body = new Set([BLUE.base, BLUE.lit, BLUE.hi, BLUE.shade].map(K));
  for (let y = oy + 11 - lift; y <= oy + 13 - lift; y++) for (let x = ox + 7; x <= ox + 24; x++) if (body.has(s.get(x, y) >>> 0)) s.set(x, y, INK_LIT);
  s.stamp(['oo.', '.oo', 'o.o'], { o: INK_LIT }, ox + 25, oy + 10 - lift);   // ribbon tails
}
function superPogo(o, wave) {
  const W = 48, H = 36, ox = 15, oy = 2, lift = o.lift || 0;
  const s = P.surface(W, H);
  cape(s, wave, ox, oy, lift);
  const pogo = POGO.frame32(o);
  s.blit(pogo, ox, oy);
  mask(s, ox, oy, 0);
  return s;
}
const SUPER = {
  // flying / idle hover: cape flutters, small bob
  fly: { fps: 8, frames: [0, 1, 2, 3].map((w) => superPogo({ lift: [0, 1, 1, 0][w], fins: { l: 'point', r: 'up' }, eyes: 'right', mouth: 'grin' }, w)) },
  // charging up: crouch, eyes shut, then burst open with fins up
  power: {
    fps: 8, frames: [
      superPogo({ squash: 2, lag: 1, eyes: 'closed', mouth: 'flat' }, 0),
      superPogo({ squash: 2, lag: 1, eyes: 'closed', mouth: 'flat' }, 1),
      superPogo({ squash: 1, eyes: 'half', mouth: 'small' }, 2),
      superPogo({ squash: -1, lift: 3, eyes: 'wide', mouth: 'open', fins: { l: 'up', r: 'up' } }, 3),
      superPogo({ squash: -1, lift: 5, eyes: 'happy', mouth: 'open', fins: { l: 'wave1', r: 'wave1' } }, 2),
      superPogo({ lift: 4, eyes: 'happy', mouth: 'open', fins: { l: 'wave2', r: 'wave2' } }, 1),
    ],
  },
  cheer: { fps: 4, frames: [superPogo({ eyes: 'happy', mouth: 'open', fins: { l: 'up', r: 'up' } }, 0), superPogo({ eyes: 'happy', mouth: 'open', fins: { l: 'up', r: 'up' }, lift: 2 }, 2)] },
  wave: { fps: 6, frames: [0, 1, 2, 3].map((w) => superPogo({ fins: { r: w % 2 ? 'wave2' : 'wave1' }, mouth: w > 1 ? 'open' : 'grin' }, w)) },
};

/* ------------------------------------------------------------------ 16 px power icons */
const ICON_PAL = { o: OUTLINE, g: GOLD.base, l: GOLD.lit, s: GOLD.shade, b: BLUE.base, h: BLUE.lit, d: BLUE.shade, w: WHITE, i: INK, v: IVORY, m: R.moss[3], n: R.moss[4], e: R.earth[3] };
const ICONS = {
  create: [ // camera with a gold flash
    '.....oooo.......',
    '....oggggo......',
    '.oooooooooooooo.',
    'ohhhhhhhhhhhhhho',
    'ohbbbboooobbbbdo',
    'ohbbbowwhhobbbdo',
    'ohbbowhhhhhobbdo',
    'ohbbohhiihhobbdo',
    'ohbbohhiihhobbdo',
    'ohbbbohhhhobbbdo',
    'ohbbbboooobbbbdo',
    'odddddddddddddd o'.replace(' ', ''),
    '.oooooooooooooo.',
    '................',
    '................',
    '................',
  ],
  week: [ // calendar page with a bolt
    '..o...o...o.....',
    '.ooooooooooooo..',
    'ogggggggggggggo.',
    'ossssssssssssso.',
    'ovvvvvvvvvvvvvo.',
    'ovvvvvvvlgvvvvo.',
    'ovvvvvvlgvvvvvo.',
    'ovvvvvlgggvvvvo.',
    'ovvvvvvvgsvvvvo.',
    'ovvvvvvgsvvvvvo.',
    'ovvvvvvsvvvvvvo.',
    'ovvvvvvvvvvvvvo.',
    '.ooooooooooooo..',
    '................',
    '................',
    '................',
  ],
  share: [ // phone showing a QR
    '...oooooooooo...',
    '..oiiiiiiiiiio..',
    '..oiwwwiiwwwio..',
    '..oiwiwiiwiwio..',
    '..oiwwwiiwwwio..',
    '..oiiiiiiiiiio..',
    '..oiwwwiwiwiio..',
    '..oiwiwiiwiwio..',
    '..oiwwwiwwiiio..',
    '..oiiiiiiiiiio..',
    '..oiiiigliiiio..',
    '..oiiiiiiiiiio..',
    '...oooooooooo...',
    '................',
    '................',
    '................',
  ],
  members: [ // stamp card, three gold stamps
    '................',
    '.oooooooooooooo.',
    'ommmmmmmmmmmmmmo',
    'omnnnnnnnnnnnnmo',
    'omnoggoggo.oo.mo',
    'omnoglogloo..omo',
    'omnoggoggo.oo.mo',
    'omnnnnnnnnnnnnmo',
    'omnoo.oo.oo.o.mo',
    'omno..o..o..o.mo',
    'omnoo.oo.oo.o.mo',
    'ommmmmmmmmmmmmmo',
    '.oooooooooooooo.',
    '................',
    '................',
    '................',
  ],
  report: [ // rising bars and a gold arrow
    '..........oooo..',
    '..........ollo..',
    '.........oggso..',
    '...oo...ogso.o..',
    '..ogo..ogso.....',
    '.ogso.ogso..oo..',
    'ogso.ogso..ohho.',
    '.so..oso...ohdo.',
    '.......oo..ohdo.',
    '......ohho.ohdo.',
    '..oo..ohdo.ohdo.',
    '.ohho.ohdo.ohdo.',
    '.ohdo.ohdo.ohdo.',
    'oooooooooooooooo',
    '................',
    '................',
  ],
  whatsapp: [ // chat bubble with a tick
    '...oooooooooo...',
    '..ommmmmmmmmmo..',
    '.omnnnnnnnnnnmo.',
    'omnnnnnnnnnnwnmo',
    'omnnnnnnnnnwwnmo',
    'omnnwnnnnnwwnnmo',
    'omnnwwnnnwwnnnmo',
    'omnnnwwnwwnnnnmo',
    'omnnnnwwwnnnnnmo',
    '.omnnnnwnnnnnmo.',
    '..ommmmmmmmmmo..',
    '..omo.oooooo....',
    '..oo............',
    '................',
    '................',
    '................',
  ],
};
function icon(rows) {
  const s = P.surface(16, 16);
  s.stamp(rows.map((r) => r.padEnd(16, '.').slice(0, 16)), ICON_PAL, 0, 0);
  const b = s.bbox();
  // centre vertically
  const out = P.surface(16, 16);
  out.blit(s, 0, Math.floor((16 - (b.y + b.h)) / 2));
  return out;
}

/* ------------------------------------------------------------------ member stamp + power burst */
function stamp(filled) {
  const s = P.surface(16, 16);
  if (!filled) { s.ring(7.5, 7.5, 7, 7, R.ivory[1], 1); return s; }
  s.ellipse(7.5, 7.5, 7, 7, GOLD.base);
  s.rim(...lightBy(GOLD));
  s.stamp(['..oo....', '.ooooo.o', 'ooowooooo', '.ooooo.o', '..oo....'].map((r) => r.padEnd(9, '.')), { o: INK, w: GOLD.hi }, 3, 5);   // little fish
  s.outline(OUTLINE);
  return s;
}
function powerBurst() {
  const frames = [];
  const N = 8, C = 15.5;
  for (let f = 0; f < N; f++) {
    const s = P.surface(32, 32), t = f / (N - 1);
    const r = 3 + t * 12;
    // rays: 8 directions, length shrinks as they fly out
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2 + Math.PI / 8, len = Math.max(0, 6 - t * 6);
      if (len < 1) continue;
      const x0 = C + Math.cos(a) * r, y0 = C + Math.sin(a) * r;
      s.line(Math.round(x0), Math.round(y0), Math.round(x0 + Math.cos(a) * len), Math.round(y0 + Math.sin(a) * len), k % 2 ? GOLD.lit : GOLD.hi);
    }
    if (t < 0.5) s.ring(C, C, r * 0.7, r * 0.7, GOLD.base, 1);
    if (f < 3) { s.ellipse(C, C, 3 - f, 3 - f, GOLD.hi); }
    frames.push(s);
  }
  return frames;
}
function bolt() {
  const s = P.surface(9, 14);
  s.stamp(['....oooo', '...ollo.', '..ollo..', '.ollooo.', 'olllllo.', 'oooolo..', '..olo...', '.olo....', '.oo.....', 'oo......'].map((r) => r.padEnd(9, '.')), { o: OUTLINE, l: GOLD.lit }, 0, 2);
  return s;
}

/* ------------------------------------------------------------------ write */
const strip = (frames) => { const w = frames[0].w, s = P.surface(w * frames.length, frames[0].h); frames.forEach((f, i) => s.blit(f, i * w, 0)); return s; };
const files = {
  'logo-mark': mark(),
  'logo-dark': lockup(INK, R.ocean[5]),
  'logo-light': lockup(IVORY, R.gold[2]),
  'super-fly': strip(SUPER.fly.frames),
  'super-power': strip(SUPER.power.frames),
  'super-cheer': strip(SUPER.cheer.frames),
  'super-wave': strip(SUPER.wave.frames),
  icons: strip(Object.values(ICONS).map(icon)),
  stamps: strip([stamp(false), stamp(true)]),
  burst: strip(powerBurst()),
  bolt: bolt(),
};
for (const [name, s] of Object.entries(files)) { s.save(path.join(OUT, `${name}.png`)); console.log(name.padEnd(12), `${s.w}x${s.h}`, s.stats ? JSON.stringify(s.stats()) : ''); }

// review sheets on dark / mid / light backgrounds
const BGS = ['#0c1b26', '#4e7194', '#f5f3ee'];
const onBg = (f, bg) => P.surface(f.w, f.h).clear(bg).blit(f, 0, 0);
for (const [name, s] of Object.entries(files)) {
  P.sheet(BGS.map((bg) => ({ img: onBg(s, bg) })), { cols: 3, gap: 2, bg: '#000000' }).save(path.join(PREVIEW, `${name}.png`), { scale: name.startsWith('logo') ? 6 : 5 });
}
console.log('icon order:', Object.keys(ICONS).join(','));
