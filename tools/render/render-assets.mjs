#!/usr/bin/env node
// Renders the non-carousel Instagram graphics from tools/render/data/assets.json:
//   instagram/graphics/highlights/   highlight covers (1080 x 1920, Indigo, centred icon)
//   instagram/graphics/reel-covers/  one cover per Reel and trial reel (1080 x 1920)
//                                    + title-overlays/ (transparent title for use over a video frame)
//   instagram/graphics/stories/      Story frames (1080 x 1920, top 250 / bottom 340 px kept clear)
//   instagram/graphics/overlays/     transparent PNGs for video editing + end cards
//
// Usage (from the repo root):
//   node tools/render/render-assets.mjs                         # everything
//   node tools/render/render-assets.mjs --only covers,stories   # highlights | covers | stories | overlays
//   node tools/render/render-assets.mjs --stopwatch 00:43       # one extra stopwatch pill (tight + full frame)
//   node tools/render/render-assets.mjs --sheet /tmp/review     # also write overview PNGs
//   node tools/render/render-assets.mjs --force                 # write files even if QA fails
//
// QA per file: fonts and images load, brand glyphs only, WCAG contrast, no amber text on light
// backgrounds, everything inside its safe zone, headings never below 64 px.
import path from 'path';
import fs from 'fs';
import { REPO, RENDER_DIR, launch, openTemplate, parseArgs, rel, ensureDir, contactSheet, report } from './lib/render-core.mjs';

const args = parseArgs(process.argv.slice(2));
const DATA = JSON.parse(fs.readFileSync(path.join(RENDER_DIR, 'data', 'assets.json'), 'utf8'));
const G = path.join(REPO, 'instagram', 'graphics');
const only = args.only ? new Set(String(args.only).split(',').map((s) => s.trim())) : null;
const want = (k) => !only || only.has(k);

const slug = (t) => String(t).replace(/:/g, '-');
const jobs = [];
const add = (group, file, fn, arg, opts) => jobs.push({ group, file: path.join(G, file), fn, arg, opts });

if (args.stopwatch) {
  const t = String(args.stopwatch);
  if (!/^\d{2}:\d{2}$/.test(t)) { console.error('--stopwatch expects mm:ss, e.g. 00:43'); process.exit(1); }
  add('overlays', `overlays/stopwatch-${slug(t)}.png`, 'renderOverlay', ['stopwatch', t, {}]);
  add('overlays', `overlays/frame-stopwatch-${slug(t)}.png`, 'renderOverlay', ['stopwatch', t, { frame: true }]);
} else {
  if (want('highlights')) for (const h of DATA.highlights) add('highlights', `highlights/${h.file}`, 'renderHighlight', [h]);
  if (want('covers')) for (const c of DATA.reelCovers) {
    add('covers', `reel-covers/${c.id}-cover.png`, 'renderCover', [c, {}]);
    add('covers', `reel-covers/title-overlays/${c.id}-title.png`, 'renderCover', [c, { overlay: true }]);
  }
  if (want('stories')) {
    const S = DATA.stories;
    add('stories', 'stories/ask-hemant-sunday-question.png', 'renderStory', ['askHemantSunday', S.askHemantSunday]);
    add('stories', 'stories/ask-hemant-sunday-answer.png', 'renderStory', ['askHemantSundayAnswer', S.askHemantSundayAnswer]);
    for (const p of S.newPost) add('stories', `stories/${p.file}`, 'renderStory', ['newPost', p]);
    for (const v of S.founding.variants) {
      const f = v === 'closed' ? 'founding-closed.png' : `founding-slots-${v}-of-3.png`;
      add('stories', `stories/${f}`, 'renderStory', ['founding', { ...S.founding, variant: v }]);
    }
    add('stories', 'stories/kit-dm-me-kit.png', 'renderStory', ['kitDm', S.kitDm]);
    add('stories', 'stories/kit-comment-leaks.png', 'renderStory', ['kitComment', S.kitComment]);
  }
  if (want('overlays')) {
    const O = DATA.overlays;
    add('overlays', 'overlays/demo-badge.png', 'renderOverlay', ['badge', O.demoBadge, {}]);
    add('overlays', 'overlays/frame-demo-badge.png', 'renderOverlay', ['badge', O.demoBadge, { frame: true }]);
    for (const t of O.stopwatchTimes) add('overlays', `overlays/stopwatch-${slug(t)}.png`, 'renderOverlay', ['stopwatch', t, {}]);
    add('overlays', 'overlays/frame-stopwatch-00-00.png', 'renderOverlay', ['stopwatch', O.stopwatchTimes[0], { frame: true }]);
    for (const l of O.labels) add('overlays', `overlays/label-${l.toLowerCase().replace(/×/g, 'x').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`, 'renderOverlay', ['label', l, {}]);
    add('overlays', 'overlays/lower-third-hemant.png', 'renderOverlay', ['lowerThird', O.lowerThird, {}]);
    add('overlays', 'overlays/frame-lower-third-hemant.png', 'renderOverlay', ['lowerThird', O.lowerThird, { frame: true }]);
    for (const e of O.endCards) add('overlays', `overlays/${e.file}`, 'renderEndCard', [e]);
  }
}

const { browser, page, errors } = await launch({ width: 1080, height: 1920 });
await openTemplate(page, 'assets.html');

const results = [];
const written = {};
for (const j of jobs) {
  errors.length = 0;
  let res, shot;
  try {
    const info = await page.evaluate(({ fn, arg }) => window.AH[fn](...arg), { fn: j.fn, arg: j.arg });
    await page.evaluate(() => window.AH.ready());
    res = await page.evaluate((info) => window.AH.finishAsset(info), info);
    shot = await page.locator(info.selector).first().screenshot({ type: 'png', omitBackground: !!info.transparent });
  } catch (e) {
    res = { problems: [String(e.message || e)], warnings: [] };
  }
  if (errors.length) res.problems.push(...errors.map((e) => `browser: ${e}`));
  results.push({ name: rel(j.file), problems: res.problems, warnings: res.warnings });
  if (shot && (!res.problems.length || args.force)) {
    ensureDir(path.dirname(j.file));
    fs.writeFileSync(j.file, shot);
    (written[j.group] = written[j.group] || []).push(j.file);
  }
}

if (args.sheet) {
  ensureDir(path.resolve(args.sheet));
  for (const [g, files] of Object.entries(written)) {
    await contactSheet(page, files, path.resolve(args.sheet, `assets-${g}-sheet.png`), { cols: 6, thumbW: 300 });
  }
}
await browser.close();
for (const [g, files] of Object.entries(written)) console.log(`✓ ${g}: ${files.length} file(s)`);
console.log('');
const fails = report(results);
process.exit(fails ? 1 : 0);
