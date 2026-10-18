// Shared plumbing for the AskHemant render scripts: Playwright launch, PNG capture, contact sheets.
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

export const here = path.dirname(fileURLToPath(import.meta.url));
export const RENDER_DIR = path.resolve(here, '..');
export const REPO = path.resolve(RENDER_DIR, '..', '..');
export const TEMPLATES = path.join(RENDER_DIR, 'templates');

export function loadPlaywright() {
  const tries = [import.meta.url, path.join(REPO, 'package.json'), '/opt/node22/lib/node_modules/'];
  for (const t of tries) {
    try { return createRequire(t)('playwright'); } catch { /* next */ }
  }
  console.error('Playwright not found. Install it once with:  npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

export async function launch({ width, height, scale = 1 }) {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
  return { browser, page, errors };
}

export async function openTemplate(page, name) {
  await page.goto(pathToFileURL(path.join(TEMPLATES, name)).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
}

export function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      if (v !== undefined) out[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith('--')) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
}

export const rel = (p) => path.relative(REPO, p) || '.';

export function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }

// A quick overview image of several PNGs (for review only; not for posting).
export async function contactSheet(page, files, outFile, { cols = 5, thumbW = 360, bg = '#2a2d3a', gap = 16 } = {}) {
  if (!files.length) return;
  const imgs = files.map((f) => `<figure><img src="${pathToFileURL(f).href}"><figcaption>${path.basename(path.dirname(f))}/${path.basename(f)}</figcaption></figure>`).join('');
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;background:${bg};font:500 14px/1.2 monospace;color:#ccc}
    .g{display:grid;grid-template-columns:repeat(${cols},${thumbW}px);gap:${gap}px;padding:${gap}px;width:max-content}
    figure{margin:0} img{width:${thumbW}px;display:block;background:repeating-conic-gradient(#555 0 25%,#777 0 50%) 0 0/24px 24px}
    figcaption{padding:6px 0 0}
  </style><div class="g">${imgs}</div>`;
  const tmp = outFile.replace(/\.png$/, '.html');
  fs.writeFileSync(tmp, html);
  await page.setViewportSize({ width: cols * (thumbW + gap) + gap, height: 400 });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  await page.locator('.g').screenshot({ path: outFile });
  fs.unlinkSync(tmp);
}

export function report(results) {
  let fails = 0, warns = 0;
  for (const r of results) {
    const tag = r.problems.length ? 'FAIL' : r.warnings.length ? 'warn' : ' ok ';
    if (r.problems.length) fails++;
    if (r.warnings.length) warns++;
    console.log(`[${tag}] ${r.name}${r.note ? '  ' + r.note : ''}`);
    for (const p of r.problems) console.log(`         ✗ ${p}`);
    for (const w of r.warnings) console.log(`         · ${w}`);
  }
  console.log(`\n${results.length} file(s): ${results.length - fails} passed QA, ${fails} failed, ${warns} with warnings.`);
  return fails;
}
