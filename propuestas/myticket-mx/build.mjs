// Renderiza propuesta.html a PDF (tamaño carta) con Chromium.
// Uso: node build.mjs [--png]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const MODULES = process.env.NODE_MODULES_DIR || path.join(here, 'node_modules');
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = path.join(here, 'Cotizacion-MyTicket-MX-MT-2026-237.pdf');

const face = (family, file, weight) => {
  const b64 = fs.readFileSync(file).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
};
const f = (pkg, name) => path.join(MODULES, '@fontsource', pkg, 'files', name);
const fonts = [
  face('Inter', f('inter', 'inter-latin-400-normal.woff2'), 400),
  face('Inter', f('inter', 'inter-latin-500-normal.woff2'), 500),
  face('Inter', f('inter', 'inter-latin-600-normal.woff2'), 600),
  face('Inter', f('inter', 'inter-latin-700-normal.woff2'), 700),
  face('Source Serif 4', f('source-serif-4', 'source-serif-4-latin-400-normal.woff2'), 400),
  face('Source Serif 4', f('source-serif-4', 'source-serif-4-latin-600-normal.woff2'), 600),
  face('Source Serif 4', f('source-serif-4', 'source-serif-4-latin-700-normal.woff2'), 700),
].join('\n');

const html = fs.readFileSync(path.join(here, 'propuesta.html'), 'utf8').replace('/*FONTS*/', fonts);
const tmp = path.join(here, '.build.html');
fs.writeFileSync(tmp, html);

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Ajuste de densidad: cada página se escala para llenar la caja de texto sin
// invadir el pie, dentro de un rango estrecho para que la tipografía no cambie.
const ZMAX = Number(process.env.ZOOM_MAX || 1.10);
await page.evaluate((zmax) => {
  const pages = [...document.querySelectorAll('.page')];
  // 1) envolver el contenido de cada página
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
  // 2) converger por iteración: zoom es distinto de transform, así que se mide el resultado real
  const z = pages.map(() => 1);
  for (let pass = 0; pass < 4; pass++) {
    pages.forEach((p, i) => {
      const w = wraps[i];
      if (!w) return;
      const top = w.getBoundingClientRect().top;
      const bottom = w.getBoundingClientRect().bottom;
      const height = bottom - top;
      if (height <= 0) return;
      const target = limitOf(p) - top;
      z[i] = Math.min(zmax, Math.max(1, z[i] * (target / height)));
      w.style.zoom = String(z[i]);
    });
  }
}, ZMAX);
await page.evaluate(() => document.fonts.ready);

// Holgura real entre el final del contenido y el pie de página
const gaps = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].map((p, i) => {
    const ftr = p.querySelector('.ftr');
    const limit = ftr ? ftr.getBoundingClientRect().top : p.getBoundingClientRect().bottom - 40;
    const kids = [...p.querySelectorAll(':scope > *, :scope > div > *')]
      .filter(c => !c.classList.contains('ftr') && !c.closest('.ftr'));
    const bottom = Math.max(...kids.map(k => k.getBoundingClientRect().bottom));
    return { p: i + 1, gap: Math.round(limit - bottom) };
  }));
console.log('holgura al pie:', gaps.map(g => `${g.p}:${g.gap}`).join(' '));
const bad = gaps.filter(g => g.gap < 6);
if (bad.length) console.log('AJUSTAR:', JSON.stringify(bad));

await page.pdf({ path: OUT, width: '8.5in', height: '11in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

if (process.argv.includes('--png')) {
  const dir = path.join(here, 'preview');
  fs.mkdirSync(dir, { recursive: true });
  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    await pages[i].screenshot({ path: path.join(dir, `p${String(i + 1).padStart(2, '0')}.png`) });
  }
  console.log('PNG:', pages.length);
}
await browser.close();
fs.unlinkSync(tmp);
console.log('PDF:', OUT, (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB');
