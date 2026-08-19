// Renderiza una propuesta HTML a PDF tamaño carta con Chromium.
//
//   node build.mjs [entrada.html] [--png] [--out archivo.pdf]
//
// - Incrusta las tipografías como data URI (el PDF queda autocontenido).
// - Ajusta la densidad de cada página para que llene la caja de texto sin invadir el pie.
// - Imprime la holgura en píxeles entre el final del contenido y el pie de cada página.
// - Con --png deja un PNG por página en preview/ para revisarlas.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const SRC = path.resolve(argv.find((a) => a.endsWith('.html')) || path.join(here, 'propuesta.html'));
const outFlag = argv.indexOf('--out');
const OUT = path.resolve(outFlag > -1 ? argv[outFlag + 1] : SRC.replace(/\.html$/, '.pdf'));
const DIR = path.dirname(SRC);
const MODULES = process.env.NODE_MODULES_DIR || path.join(DIR, 'node_modules');
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// --- tipografías incrustadas ---------------------------------------------
const face = (family, file, weight) =>
  `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;` +
  `src:url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}) format('woff2');}`;
const f = (pkg, name) => path.join(MODULES, '@fontsource', pkg, 'files', name);
const fonts = [
  face('Inter', f('inter', 'inter-latin-400-normal.woff2'), 400),
  face('Inter', f('inter', 'inter-latin-500-normal.woff2'), 500),
  face('Inter', f('inter', 'inter-latin-600-normal.woff2'), 600),
  face('Inter', f('inter', 'inter-latin-700-normal.woff2'), 700),
].join('\n');

const html = fs.readFileSync(SRC, 'utf8').replace('/*FONTS*/', fonts);
const tmp = path.join(DIR, '.build.html');
fs.writeFileSync(tmp, html);

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// --- ajuste de densidad ---------------------------------------------------
// zoom no es transform: hay que medir el resultado real e iterar hasta converger.
const ZMAX = Number(process.env.ZOOM_MAX || 1.10);
await page.evaluate((zmax) => {
  const pages = [...document.querySelectorAll('.page')];
  const wraps = pages.map((p) => {
    const kids = [...p.children].filter((c) => !c.classList.contains('ftr'));
    if (!kids.length) return null;
    const w = document.createElement('div');
    kids.forEach((c) => w.appendChild(c));
    p.insertBefore(w, p.firstChild);
    return w;
  });
  const limitOf = (p) => {
    const ftr = p.querySelector('.ftr');
    return (ftr ? ftr.getBoundingClientRect().top : p.getBoundingClientRect().bottom - 40) - 16;
  };
  const z = pages.map(() => 1);
  for (let pass = 0; pass < 4; pass++) {
    pages.forEach((p, i) => {
      const w = wraps[i];
      if (!w) return;
      const r = w.getBoundingClientRect();
      if (r.height <= 0) return;
      z[i] = Math.min(zmax, Math.max(1, z[i] * ((limitOf(p) - r.top) / r.height)));
      w.style.zoom = String(z[i]);
    });
  }
}, ZMAX);
await page.evaluate(() => document.fonts.ready);

// --- verificación ---------------------------------------------------------
const gaps = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].map((p, i) => {
    const ftr = p.querySelector('.ftr');
    const limit = ftr ? ftr.getBoundingClientRect().top : p.getBoundingClientRect().bottom - 40;
    const kids = [...p.querySelectorAll(':scope > *, :scope > div > *')]
      .filter((c) => !c.classList.contains('ftr') && !c.closest('.ftr'));
    const bottom = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom));
    return { p: i + 1, gap: Math.round(limit - bottom) };
  }));
console.log('holgura al pie:', gaps.map((g) => `${g.p}:${g.gap}`).join(' '));
const bad = gaps.filter((g) => g.gap < 6);
if (bad.length) console.log('AJUSTAR (recortar contenido en estas páginas):', JSON.stringify(bad));

await page.pdf({ path: OUT, width: '8.5in', height: '11in', printBackground: true,
                 margin: { top: 0, right: 0, bottom: 0, left: 0 } });

if (argv.includes('--png')) {
  const dir = path.join(DIR, 'preview');
  fs.mkdirSync(dir, { recursive: true });
  const els = await page.$$('.page');
  for (let i = 0; i < els.length; i++) {
    await els[i].screenshot({ path: path.join(dir, `p${String(i + 1).padStart(2, '0')}.png`) });
  }
  console.log('PNG:', els.length, '→', dir);
}
await browser.close();
fs.unlinkSync(tmp);
console.log('PDF:', OUT, (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB');
