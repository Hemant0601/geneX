#!/usr/bin/env node
// Renders the Lead Leak Kit from src/kit.html into:
//   lead-leak-kit.pdf            (one 1080x1350 px page per .page section, backgrounds printed)
//   pages/page-NN.png            (1080x1350 PNG per page, for Instagram carousels)
//   ../website/kit/lead-leak-kit.pdf  (copy for the website; skip with --no-copy)
// and runs layout QA before writing anything:
//   - every .page is exactly 1080x1350 and nothing overflows its <main>
//   - body text is >= 30px (smaller text only inside [data-small])
//   - no broken cross-references, no missing images, all brand fonts loaded
//   - no characters the brand fonts can't draw (they would fall back to a system font)
//   - Lead Amber is never used as text on a light background
// Usage:  node lead-magnet/render.mjs [--no-copy] [--force]
//   --force  write outputs even if QA fails (QA problems are still printed, exit code 1)

import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)('playwright'));
} catch {
  ({ chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright'));
}

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(here, 'src', 'kit.html');
const PDF = path.join(here, 'lead-leak-kit.pdf');
const PNG_DIR = path.join(here, 'pages');
const WEB_COPY = path.resolve(here, '..', 'website', 'kit', 'lead-leak-kit.pdf');
const W = 1080, H = 1350, MIN_BODY_PX = 30;
const args = new Set(process.argv.slice(2));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('requestfailed', (r) => consoleErrors.push(`request failed: ${r.url()}`));

await page.goto(pathToFileURL(SRC).href, { waitUntil: 'load' });
await page.waitForFunction(() => document.documentElement.dataset.ready === '1');
await page.evaluate(() => document.fonts.ready);

const qa = await page.evaluate(({ W, H, MIN_BODY_PX }) => {
  const problems = [];
  const warn = [];
  const pages = [...document.querySelectorAll('.page')];

  // Characters the self-hosted brand fonts can draw (latin + latin-ext subsets in brand/tokens.css).
  const ok = /[ -~ -ÿ–—‘’“”•…′″‹›€₹↓]/;
  const rgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
  const isAmber = (c) => { const [r, g, b] = rgb(c); return r === 255 && g === 176 && b === 32; };
  const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const bgOf = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor;
      const v = rgb(c);
      if (v.length >= 3 && (v.length === 3 || v[3] > 0.5)) return v;
    }
    return [255, 255, 255];
  };

  pages.forEach((p, i) => {
    const n = String(i + 1).padStart(2, '0');
    const r = p.getBoundingClientRect();
    if (Math.round(r.width) !== W || Math.round(r.height) !== H) problems.push(`p${n}: page is ${r.width}x${r.height}, expected ${W}x${H}`);
    const main = p.querySelector(':scope > main');
    if (main && main.scrollHeight > main.clientHeight + 1) problems.push(`p${n}: content overflows by ${main.scrollHeight - main.clientHeight}px`);
    if (main) {
      const free = main.clientHeight - [...main.children].reduce((m, c) => Math.max(m, c.getBoundingClientRect().bottom - main.getBoundingClientRect().top), 0);
      if (free >= 0) warn.push(`p${n}: ${Math.round(free)}px free below content`);
    }
    // horizontal overflow / element outside the page
    p.querySelectorAll('*').forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) return;
      if (b.right > r.right + 1 || b.left < r.left - 1) problems.push(`p${n}: <${el.tagName.toLowerCase()} class="${el.className.baseVal ?? el.className}"> sticks out horizontally`);
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible' && el.clientWidth > 0) problems.push(`p${n}: <${el.tagName.toLowerCase()}> clips text horizontally`);
    });
    // text checks
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      const txt = t.textContent;
      if (!txt.trim()) continue;
      const el = t.parentElement;
      if (el.closest('script,style,svg')) continue;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      if (fs < MIN_BODY_PX && !el.closest('[data-small],sup')) problems.push(`p${n}: ${fs}px body text "${txt.trim().slice(0, 40)}"`);
      for (const ch of txt) {
        if (!ok.test(ch) && ch !== '\n' && ch !== '\t') problems.push(`p${n}: glyph not in brand fonts: "${ch}" (U+${ch.codePointAt(0).toString(16).toUpperCase()}) in "${txt.trim().slice(0, 30)}"`);
      }
      if (txt.includes('₹') && /JetBrains/.test(cs.fontFamily)) problems.push(`p${n}: ₹ set in JetBrains Mono (no ₹ glyph): "${txt.trim().slice(0, 30)}"`);
      if (isAmber(cs.color) && lum(bgOf(el)) > 0.4) problems.push(`p${n}: amber text on a light background: "${txt.trim().slice(0, 30)}"`);
    }
    p.querySelectorAll('[data-broken-ref]').forEach(() => problems.push(`p${n}: broken data-to reference`));
    p.querySelectorAll('img').forEach((img) => { if (!img.complete || img.naturalWidth === 0) problems.push(`p${n}: image failed: ${img.getAttribute('src')}`); });
  });

  // fonts actually used must be loaded
  const used = new Set();
  document.querySelectorAll('.page *').forEach((el) => {
    const cs = getComputedStyle(el);
    if (!el.firstChild || ![...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) return;
    used.add(`${cs.fontWeight} ${cs.fontFamily.split(',')[0].replace(/"/g, '')}`);
  });
  for (const u of used) {
    const [w, ...fam] = u.split(' ');
    const family = fam.join(' ');
    if (!document.fonts.check(`${w} 30px "${family}"`)) problems.push(`font not loaded: ${family} ${w}`);
    const faces = [...document.fonts].filter((f) => f.family.replace(/"/g, '') === family && String(f.weight) === w && f.status === 'loaded');
    if (!faces.length) problems.push(`no loaded @font-face for ${family} ${w} (would fall back)`);
  }
  return { count: pages.length, problems, warn, used: [...used].sort() };
}, { W, H, MIN_BODY_PX });

console.log(`Pages: ${qa.count}`);
console.log(`Fonts used: ${qa.used.join(' | ')}`);
qa.warn.forEach((w) => console.log(`  info  ${w}`));
const problems = [...qa.problems, ...consoleErrors];
problems.forEach((p) => console.log(`  FAIL  ${p}`));

if (problems.length && !args.has('--force')) {
  console.error(`\nQA failed (${problems.length} problem(s)). Nothing written. Fix the source or rerun with --force.`);
  await browser.close();
  process.exit(1);
}

// ---------- PDF ----------
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: PDF, width: `${W}px`, height: `${H}px`, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

// Chromium rounds the paper size up to 0.01 in, so a 1350 px page comes out 1013.04 pt tall
// (1350.72 px) with a thin white strip at the bottom. Crop each MediaBox to exactly
// 1080 x 1350 px (810 x 1012.5 pt), keeping the content's top edge. The replacement has the
// same byte length, so the PDF's cross-reference offsets stay valid.
{
  const buf = fs.readFileSync(PDF).toString('latin1');
  const fmt = (n) => String(Math.round(n * 100) / 100);
  let patched = 0, skipped = 0;
  const out = buf.replace(/\/MediaBox \[([\d.\s-]+)\]/g, (m, inner) => {
    const [x0, , x1, y1] = inner.trim().split(/\s+/).map(Number);
    let box = `[${fmt(x0)} ${fmt(y1 - H * 0.75)} ${fmt(x1)} ${fmt(y1)}]`;
    const orig = `[${inner}]`;
    if (box.length > orig.length) { skipped++; return m; }
    box = box.slice(0, -1) + ' '.repeat(orig.length - box.length) + ']';
    patched++;
    return `/MediaBox ${box}`;
  });
  fs.writeFileSync(PDF, Buffer.from(out, 'latin1'));
  if (skipped) console.log(`  warn  ${skipped} MediaBox(es) left uncropped`);
  else console.log(`PDF pages cropped to ${W}x${H}px (${patched} MediaBoxes)`);
}

// ---------- PNGs ----------
await page.emulateMedia({ media: 'screen' });
fs.mkdirSync(PNG_DIR, { recursive: true });
for (const f of fs.readdirSync(PNG_DIR)) if (/^page-\d+\.png$/.test(f)) fs.unlinkSync(path.join(PNG_DIR, f));
const handles = await page.$$('.page');
for (let i = 0; i < handles.length; i++) {
  const out = path.join(PNG_DIR, `page-${String(i + 1).padStart(2, '0')}.png`);
  await handles[i].screenshot({ path: out, animations: 'disabled' });
}
await browser.close();

const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0);
console.log(`\nWrote ${path.relative(process.cwd(), PDF)} (${kb(PDF)} KB) and ${handles.length} PNGs in ${path.relative(process.cwd(), PNG_DIR)}/`);
if (fs.statSync(PDF).size > 3 * 1024 * 1024) { console.log('  FAIL  PDF is over 3 MB'); process.exitCode = 1; }

if (!args.has('--no-copy')) {
  fs.mkdirSync(path.dirname(WEB_COPY), { recursive: true });
  fs.copyFileSync(PDF, WEB_COPY);
  console.log(`Copied to ${path.relative(process.cwd(), WEB_COPY)}`);
}
if (problems.length) process.exitCode = 1;
