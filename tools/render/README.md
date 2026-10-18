# tools/render: the AskHemant graphics renderer

This folder turns text into on-brand Instagram graphics. You edit JSON, run one command, and get PNGs in [`instagram/graphics/`](../../instagram/graphics/). The JSON is the source of truth, not the PNGs and not Canva, so a re-render always matches the copy.

- **Carousels:** [`instagram/carousels.json`](../../instagram/carousels.json) → `render-carousels.mjs` → `instagram/graphics/carousels/<id>/slide-NN.png` (1080 × 1350)
- **Everything else** (Reel covers, Stories, highlight covers, video overlays, end cards): [`data/assets.json`](./data/assets.json) → `render-assets.mjs` → `instagram/graphics/{reel-covers,stories,highlights,overlays}/` (1080 × 1920)

What each output is for, and when to post it: [`instagram/graphics/README.md`](../../instagram/graphics/README.md).

---

## 1. Set up once

You need Node.js 18 or newer and Playwright's Chromium.

```bash
npm i -D playwright          # from the repo root (or: npm i -g playwright)
npx playwright install chromium
```

The fonts (Space Grotesk, Inter, JetBrains Mono) are self-hosted in [`brand/fonts/`](../../brand/fonts/). The renderer loads them from [`brand/tokens.css`](../../brand/tokens.css), so nothing needs installing on your computer and no internet connection is needed.

## 2. Render

Run these from the repo root.

```bash
node tools/render/render-carousels.mjs                 # every carousel in instagram/carousels.json
node tools/render/render-carousels.mjs --id P11,P12    # only these
node tools/render/render-carousels.mjs --pdf           # also <id>/<id>-document.pdf (LinkedIn document post)

node tools/render/render-assets.mjs                    # covers, stories, highlights, overlays, end cards
node tools/render/render-assets.mjs --only covers      # highlights | covers | stories | overlays (comma-separated)
node tools/render/render-assets.mjs --stopwatch 00:43  # one extra stopwatch pill, tight + full-frame
```

Options for both scripts:

| Option | What it does |
|---|---|
| `--sheet <dir>` | Also writes an overview PNG (a contact sheet) of everything rendered, for review. Point it outside the repo |
| `--force` | Writes files even when QA fails. Use it only to *look* at a problem, never to post |
| `--scale 2` | (carousels only) renders at 2160 × 2700 for print or zoom |
| `--json <file>` / `--out <dir>` | (carousels only) uses a different JSON file or output folder, e.g. for drafts |

Each run deletes that carousel's old `slide-NN.png` files first, so a carousel that shrinks from 10 slides to 8 doesn't leave stale slides behind.

## 3. QA (runs automatically, every file)

Nothing is written unless it passes, unless you add `--force`. The report prints `ok`, `warn` or `FAIL` per file.

| Check | Rule |
|---|---|
| **Fit** | Text never overflows. Sizes shrink step by step to fit, but never below **64 px for headings and 34 px for body** on carousels. If copy still doesn't fit at the minimum, the slide FAILs: cut words |
| **Fonts** | All three brand fonts load. Any character the brand fonts can't draw (it would fall back to a system font) FAILs. `→ ≈ ✓ ✗` are drawn as inline icons automatically |
| **Contrast** | WCAG AA for every text element (4.5:1 normal, 3:1 large) |
| **Amber** | Amber text on a light background FAILs (1.68:1). On Paper, the highlight is an amber band behind Ink text |
| **Safe zones** | Reel covers: title inside the middle 1080 × 1080 (y 420–1500). Stories: top 250 px and bottom 340 px clear. Overlays: inside the Reel safe area. Highlight icons: inside the central circle |
| **Canvas** | No element outside the 1080-wide canvas |
| **Rag** (warning) | A heading or paragraph that ends on a lone short word |
| **Structure** (warning) | Slide 1 should be a `hook`, the last slide the Indigo `cta` |

After rendering, **open and look at every PNG** before posting. The checks catch mechanical problems, not meaning.

## 4. Carousel JSON reference

`instagram/carousels.json` → `{ "carousels": [ { "id", "title", "lane", "demo"?, "slides": [ … ] } ] }`

Every slide has a `layout`. One template per layout:

| `layout` | Background | Fields | Notes |
|---|---|---|---|
| `hook` | Paper | `eyebrow`, `heading`, `highlight`, `body` | Slide 1. Wordmark top-left, "Swipe →" bottom-right |
| `statement` | Paper | `eyebrow`, `heading`, `body`, `source`? | An eyebrow like `Leak 03` adds a big `03` tile. A body containing `Free fix: …` (or `Free fix tonight: …`) moves the fix into a green callout, like the Kit |
| `list` | Paper | `eyebrow`, `heading`, `items[]`, `body`? | Item `Name: ₹X / $Y …` → price row. Item `04 · Text` → number tile. Item `Lead: rest` → bold lead. A list whose eyebrow or heading contains "not" gets ✗ markers; a list of questions gets numbers; otherwise ✓ |
| `steps` | Paper | `eyebrow`, `heading`, `items[]` | Numbered timeline. `Day 5: text` puts "DAY 5" in the node; `Optional: text` gets a dashed node; `Lead: rest` sets the lead in bold on its own line |
| `compare` | Paper | `eyebrow`, `heading`, `left{label, items[]}`, `right{label, items[]}`, `source`? | Left option on white, right option on Indigo, "vs" between |
| `price` | Paper | `eyebrow`, `heading`, `price{inr, usd, note}`, `body` | Big price on an Ink card. `note` is split on ` · `; a part containing "GST" goes on the card label, the rest become ✓ terms |
| `stat` | Ink | `eyebrow`, `heading`, `highlight`, `body`, `source` | The highlight is shown huge in amber; a `%` highlight also gets a 0–100 bar. **Every stat needs a `source`** |
| `cta` | Indigo | `eyebrow`, `heading`, `highlight`, `body` | Last slide. `Comment WORD` in the heading shows a comment pill with WORD; an `askhemant.ai/...` URL shows a link pill (and isn't repeated at the start of the body) |

Optional fields on any slide: `"demo": true` (or on the carousel, for every slide) adds the amber **DEMO – fictional business** badge top-left; `"bg": "paper" | "ink" | "indigo"` overrides the background; `"marker": "check" | "cross" | "number" | "none"` overrides list markers; `"source"` adds a source line at the bottom (Slate on Paper; Mist on Ink, where Slate would fail contrast); `"maxHeading": 92` caps the heading size in px, so a series of slides in one carousel shares one size (P04's Leak 01–03 use it: without it each heading is fitted on its own and the sizes jump between swipes).

**Typography is automatic:** straight quotes become curly, prices (`₹34,999 / $1,499`), times (`10 pm`), dates (`Mon 30 Nov`) and hyphenated words never split across lines, short words are kept with the next word in headings, and headings are line-balanced (it also tries one sentence per line). Use `\n` in a string to force a line break.

**`highlight`** must be text that appears in the `heading` (case-insensitive). If it isn't found, the report warns.

### Adding a new carousel (P11 onward)

1. Add an object to `carousels.json` with a new `id`, a `hook` first and a `cta` last, 7–10 slides, at most about 30 words per middle slide.
2. `node tools/render/render-carousels.mjs --id P11`
3. Fix any FAIL or warning by editing the copy, then look at every PNG.

## 5. Assets JSON reference (`data/assets.json`)

| Key | Produces | Edit to… |
|---|---|---|
| `highlights[]` | `highlights/<file>` | Change an icon: `flag`, `tag`, `stopwatch`, `workflow`, `question`, `chart` |
| `reelCovers[]` | `reel-covers/<id>-cover.png` + `reel-covers/title-overlays/<id>-title.png` | Add a cover for every new Reel: `id`, `bg` (`ink`, `indigo`, `paper`), `kicker`, `title` (≤ 6 words), `highlight`, `small`, `demo` (true for every demo Reel), `strike` (struck-through text), `fine` (small print), and an optional `device`: `message`, `notify`, `stopwatch`, `clock`, `slots`, `flow` or `chips` (see the existing entries). On a cover, give `slots` neutral `labels` (P06 uses `01`–`03`): a posted cover stays up after slots fill, so it must never show an OPEN/TAKEN count |
| `stories.askHemantSunday` / `askHemantSundayAnswer` | the Sunday question box and answer background | Change the prompt line or the answer time |
| `stories.newPost[]` | `stories/new-post*.png` | Add a teaser frame per post: `file`, `format` (`post` or `reel`), `label`, `line`, `demo` |
| `stories.founding` | `stories/founding-slots-N-of-3.png`, `founding-closed.png` | `variants` lists what to render (3, 2, 1, 0, "closed") |
| `stories.kitDm[]` / `kitComment` | `kit-dm-me-kit.png` ("DM me KIT", the Story/Live default), `kit-dm-me-leaks.png` ("DM me LEAKS", optional alternative) and `kit-comment-leaks.png` | Each `kitDm` entry names its `file`, `cta` and `keyword` |
| `overlays` | badge, stopwatch pills, labels, lower third, end cards | `stopwatchTimes`, `labels`, `lowerThird`, `endCards[]` |

## 6. Files here

```
tools/render/
├── render-carousels.mjs     carousels.json → carousels/<id>/slide-NN.png (+ --pdf)
├── render-assets.mjs        data/assets.json → covers, stories, highlights, overlays
├── data/assets.json         copy for every non-carousel graphic
├── lib/render-core.mjs      Playwright launch, contact sheets, QA report
└── templates/
    ├── base.css             brand tokens import, DEMO badge, stopwatch pill, kicker
    ├── shared.js            text formatting, icons, auto-fit, heading balancing, QA checks
    ├── carousel.html/.css/.js   one layout per carousel `layout` value
    └── assets.html/.css/.js     Reel covers, Stories, highlights, overlays, end cards
```

To preview a template by hand, open a rendered PNG; the templates themselves are filled by the scripts (the browser blocks `file://` JSON loading, so opening `carousel.html` directly shows an empty page).

## 7. Rules the renderer can't check for you

- **DEMO label:** every Skyline Realty or SmileCare Dental visual has `"demo": true`. Never remove it to make a demo look real.
- **Stopwatch times** on overlays must copy the time the recording itself shows. Render the exact time with `--stopwatch mm:ss`; never pre-fill a time you haven't recorded.
- **Founding slots:** post only the `founding-slots-N-of-3.png` that matches reality, and switch to `founding-closed.png` after Mon 30 Nov 2026 (or `founding-slots-0-of-3.png` if all 3 are taken sooner).
- **Statistics** need a source on the slide (`source`), from the strategy or research files only.
- **No invented proof:** no client names, results, testimonials or follower counts in any JSON.
- **Prices** exactly as published (INR and USD), excluding GST.
