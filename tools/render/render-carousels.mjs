#!/usr/bin/env node
// Renders every carousel in instagram/carousels.json to
//   instagram/graphics/carousels/<id>/slide-01.png … (1080 x 1350)
// using tools/render/templates/carousel.html (+ carousel.css / carousel.js).
//
// Usage (from the repo root):
//   node tools/render/render-carousels.mjs                 # all carousels
//   node tools/render/render-carousels.mjs --id P04,P07    # only these
//   node tools/render/render-carousels.mjs --sheet /tmp/x  # also write an overview PNG per carousel
//   node tools/render/render-carousels.mjs --force         # write PNGs even if QA fails
//   options: --json <file>  --out <dir>  --scale 2 (2160 x 2700 for print/zoom)
//
// QA runs on every slide before anything is written (a carousel with a FAIL is skipped unless --force):
//   text never overflows (sizes auto-shrink, but never below 64 px headings / 34 px body),
//   all brand fonts and images load, no glyphs the brand fonts can't draw, WCAG contrast,
//   no amber text on light backgrounds, nothing outside the canvas; widows are reported as warnings.
import path from 'path';
import fs from 'fs';
import { REPO, launch, openTemplate, parseArgs, rel, ensureDir, contactSheet, report } from './lib/render-core.mjs';

const args = parseArgs(process.argv.slice(2));
const JSON_FILE = path.resolve(REPO, args.json || 'instagram/carousels.json');
const OUT = path.resolve(REPO, args.out || 'instagram/graphics/carousels');
const SCALE = Number(args.scale || 1);
const only = args.id ? String(args.id).split(',').map((s) => s.trim().toUpperCase()) : null;

const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
const carousels = (data.carousels || []).filter((c) => !only || only.includes(String(c.id).toUpperCase()));
if (!carousels.length) { console.error(`No carousels matched in ${rel(JSON_FILE)}`); process.exit(1); }

const { browser, page, errors } = await launch({ width: 1080, height: 1350, scale: SCALE });
await openTemplate(page, 'carousel.html');

const results = [];
let failed = 0;
for (const c of carousels) {
  const total = c.slides.length;
  const rendered = [];
  for (let i = 0; i < total; i++) {
    const slide = c.slides[i];
    const name = `${c.id}/slide-${String(i + 1).padStart(2, '0')}.png`;
    errors.length = 0;
    let res;
    try {
      const { fit } = await page.evaluate(({ slide, ctx }) => window.AH.renderSlide(slide, ctx), { slide, ctx: { id: c.id, index: i + 1, total, demo: !!c.demo } });
      await page.evaluate(() => window.AH.ready());
      res = await page.evaluate((fit) => window.AH.finishSlide(fit), fit);
      const shot = await page.locator('#slide').screenshot({ type: 'png' });
      rendered.push({ name, shot });
    } catch (e) {
      res = { problems: [String(e.message || e)], warnings: [] };
    }
    if (errors.length) res.problems.push(...errors.map((e) => `browser: ${e}`));
    // the last slide must be the Indigo CTA, the first the hook
    if (i === 0 && slide.layout !== 'hook') res.warnings.push('slide 1 is not a hook layout');
    if (i === total - 1 && slide.layout !== 'cta') res.warnings.push('last slide is not the Indigo cta layout');
    results.push({ name: `${c.id} ${String(i + 1).padStart(2, '0')}/${total} ${slide.layout}`, note: res.free != null ? `(${res.free}px spare${Object.entries(res.vars || {}).length ? '; ' + Object.entries(res.vars).map(([k, v]) => `${k} ${v}`).join(' ') : ''})` : '', problems: res.problems, warnings: res.warnings });
  }
  const bad = results.slice(-total).some((r) => r.problems.length);
  if (bad && !args.force) { failed++; console.log(`✗ ${c.id}: QA failed, nothing written (use --force to write anyway)`); continue; }
  const dir = path.join(OUT, c.id);
  ensureDir(dir);
  for (const f of fs.readdirSync(dir)) if (/^slide-\d+\.png$/.test(f)) fs.unlinkSync(path.join(dir, f));
  for (const r of rendered) fs.writeFileSync(path.join(OUT, r.name), r.shot);
  console.log(`✓ ${c.id}: ${rendered.length} slides → ${rel(dir)}/`);
  if (args.sheet) {
    ensureDir(path.resolve(args.sheet));
    await contactSheet(page, rendered.map((r) => path.join(OUT, r.name)), path.resolve(args.sheet, `${c.id}-sheet.png`), { cols: 5, thumbW: 432 });
    await page.setViewportSize({ width: 1080, height: 1350 });
    await openTemplate(page, 'carousel.html');
  }
}
await browser.close();
console.log('');
const fails = report(results);
process.exit(fails || failed ? 1 : 0);
