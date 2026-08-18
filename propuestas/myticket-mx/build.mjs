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
  face('Space Grotesk', f('space-grotesk', 'space-grotesk-latin-500-normal.woff2'), 500),
  face('Space Grotesk', f('space-grotesk', 'space-grotesk-latin-700-normal.woff2'), 700),
].join('\n');

const html = fs.readFileSync(path.join(here, 'propuesta.html'), 'utf8').replace('/*FONTS*/', fonts);
const tmp = path.join(here, '.build.html');
fs.writeFileSync(tmp, html);

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Ajuste de densidad: escala uniforme del contenido en las páginas de texto
const ZOOM = Number(process.env.ZOOM || 1.10);
await page.evaluate((z) => {
  document.querySelectorAll('.page:not(.dark)').forEach((p) => {
    const wrap = document.createElement('div');
    wrap.style.zoom = String(z);
    [...p.children].filter((c) => !c.classList.contains('foot')).forEach((c) => wrap.appendChild(c));
    p.insertBefore(wrap, p.firstChild);
  });
}, ZOOM);
await page.evaluate(() => document.fonts.ready);

// Aviso si alguna página se desborda
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].map((el, i) => {
    const top = el.getBoundingClientRect().top + parseFloat(getComputedStyle(el).paddingTop);
    const kids = [...el.querySelectorAll(':scope > *, :scope > div > *')].filter(c => !c.classList.contains('cover-glow'));
    const bottom = Math.max(...kids.map(k => k.getBoundingClientRect().bottom));
    return { i: i + 1, over: Math.round(bottom - (el.getBoundingClientRect().top + el.clientHeight + parseFloat(getComputedStyle(el).paddingTop) - 40)) };
  }).filter(x => x.over > 0));
if (overflow.length) console.log('DESBORDE:', JSON.stringify(overflow));
else console.log('Sin desbordes.');

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
