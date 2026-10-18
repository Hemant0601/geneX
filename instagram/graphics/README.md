# AskHemant Instagram graphics

Every PNG here is rendered from text by [`tools/render/`](../../tools/render/). **Don't edit the PNGs. Edit the text and re-render** (§4), so the graphics always match the copy in [`carousels.json`](../carousels.json) and [`tools/render/data/assets.json`](../../tools/render/data/assets.json).

Brand system: Signal Indigo `#4338CA`, Lead Amber `#FFB020` (never as text on light backgrounds), Ink `#0B1020`, Paper `#F7F5F0`; Space Grotesk headings, Inter body, JetBrains Mono for times, prices and counters. Source: [`brand/tokens.css`](../../brand/tokens.css), [`docs/01-brand-and-domain.md`](../../docs/01-brand-and-domain.md) §7.

**99 files:** 36 carousel slides · 6 highlight covers · 10 Reel covers + 10 title overlays · 22 Story frames · 15 overlays and end cards.

---

## 1. What each asset is for

### Carousels: `carousels/<id>/slide-NN.png` (1080 × 1350)
Upload the slides in number order as one carousel post. Slide 1 is the hook (Ink on Paper, one amber-marked phrase); the last slide is the Indigo CTA. Sources sit in small type at the bottom of any slide with a statistic.

| Folder | Post | Slides | CTA |
|---|---|---|---|
| [`carousels/P02/`](./carousels/P02/) | Tue 20 Oct · "Who I help, how I work, my prices" · **pin #1** | 10 | Comment PRICE |
| [`carousels/P04/`](./carousels/P04/) | Thu 22 Oct · "7 places your enquiries go cold" (Lead Leak Kit teaser) | 9 | Comment LEAKS |
| [`carousels/P07/`](./carousels/P07/) | Tue 27 Oct · Open Price Book: the ₹34,999 / $1,499 Sprint | 9 | Book a free Fit Call (link in bio) |
| [`carousels/P09/`](./carousels/P09/) | Thu 29 Oct · "Meta's free WhatsApp AI vs what you actually need" | 8 | Comment LEAKS |

Captions, alt text and hashtags: [`02-launch-posts.md`](../02-launch-posts.md).

### Reel covers: `reel-covers/<id>-cover.png` (1080 × 1920)
Upload as the custom cover (**Edit cover → Add from camera roll**). The title sits in the middle 1080 × 1080, so it survives the profile grid's crop and stays clear of the bottom 420 px of Reel UI. Demo Reels carry the **DEMO – fictional business** badge on the cover.

| File | Reel | Background |
|---|---|---|
| `P01-cover.png` | Mon 19 Oct · "No lead left on read." | Indigo |
| `T01-cover.png` | Tue 20 Oct · trial reel of P01 · "On a site visit. New lead. Now what?" | Ink |
| `P03-cover.png` | Wed 21 Oct · "Watch the timer." · Skyline Realty · **DEMO** · pin #2 | Ink |
| `T02-cover.png` | Thu 22 Oct · trial reel of P03 · **DEMO** | Ink |
| `P05-cover.png` | Fri 23 Oct · "The 10 pm test" · #AutomateKaro | Paper |
| `P06-cover.png` | Mon 26 Oct · "3 founding clients" · pin #3. The three rings are numbered 01–03, not "OPEN", because a pinned cover stays up after slots fill; the live count goes in the founding Story frames | Indigo |
| `T03-cover.png` | Tue 27 Oct · trial reel of P06 · "₹14,999 instead of ₹34,999" | Indigo |
| `P08-cover.png` | Wed 28 Oct · "Build Log #1" | Ink |
| `T04-cover.png` | Thu 29 Oct · trial reel of P08 · "My own funnel. Real numbers." | Paper |
| `P10-cover.png` | Fri 30 Oct · "Missed call → booked" · SmileCare Dental · **DEMO** | Ink |

On the grid, the three pinned posts (P02 Paper · P03 Ink · P06 Indigo) sit in the top row; below them, newest first: P10 Ink · P09 Paper · P08 Ink / P07 Paper · P05 Paper · P04 Paper / P01 Indigo. Trial reels (T01–T04) go to non-followers and don't sit in this sequence.

**`reel-covers/title-overlays/<id>-title.png`** (transparent, 1080 × 1920): the same title on Ink boxes, for putting over a real frame of you from the video (brand rule: real photos only). In Edits or Canva, put the frame underneath and this PNG on top, then export at 1080 × 1920 and use that as the cover. Demo titles keep their DEMO badge.

### Highlight covers: `highlights/` (1080 × 1920, Indigo, centred white icon)
These are the exact file names [`01-profile-setup.md`](../01-profile-setup.md) §9 refers to. When you set a cover, Instagram crops to a circle; centre it on the icon.

| File | Highlight | Create |
|---|---|---|
| `highlight-01-start-here.png` | Start Here (flag) | Day 1 |
| `highlight-02-pricing.png` | Pricing (price tag) | Day 1 |
| `highlight-03-demos.png` | Demos (stopwatch) | After P03, Wed 21 Oct |
| `highlight-04-build-log.png` | Build Log (terminal) | After P08, Wed 28 Oct |
| `highlight-05-faq.png` | FAQ (question bubble) | Day 1 |
| `highlight-06-results.png` | Results (bar chart) | **Hold back.** Only once real, measured, consented results exist (month 2–3 at the earliest). Never create it empty or fill it with demos |

### Story frames: `stories/` (1080 × 1920; top 250 px and bottom 340 px kept clear)
Upload the PNG as a Story background, then add the live sticker on top in the Instagram app. The soft panels show where the sticker goes.

| File | Use | Sticker to add |
|---|---|---|
| `ask-hemant-sunday-question.png` | Sunday 10:00 IST: the question box (Indigo, wordmark) | **Question** sticker on the panel. Rotate the prompt each week ([`05-stories-broadcast-collabs.md`](../05-stories-broadcast-collabs.md) §2) |
| `ask-hemant-sunday-answer.png` | Sunday 17:00–19:00: one answer per frame | Share the question response onto the panel, type the answer below. Never show who asked |
| `new-post.png`, `new-reel.png` | Any day: share a new post or Reel | Post sticker (share the post to your Story, then move it onto the white card) |
| `new-post-P01.png` … `new-post-P10.png` | The same, with each launch post's hook line. P03 and P10 carry the DEMO badge | Post sticker |
| `founding-slots-3-of-3.png`, `-2-of-3`, `-1-of-3` | From Mon 26 Oct (and every Sunday until 30 Nov): founding status | **Link** sticker to `askhemant.ai/founding?utm_source=ig&utm_medium=story&utm_campaign=founding` over the white pill; a countdown sticker to Mon 30 Nov is optional |
| `founding-slots-0-of-3.png` | If all 3 slots are taken before 30 Nov | Link sticker to `/pricing` |
| `founding-closed.png` | From Tue 1 Dec 2026 | Link sticker to `/pricing` |
| `kit-dm-me-kit.png` | Kit promo (e.g. Thu, with the kit link). Stories can't take comments, so the CTA is **DM me KIT**, the DM keyword for Stories and Lives ([`07-dm-automation-playbook.md`](../07-dm-automation-playbook.md) §2.4). `kit-dm-me-leaks.png` ("DM me LEAKS") is an optional alternative, only if you also add LEAKS as a DM keyword | Link sticker to `askhemant.ai/kit?utm_source=ig&utm_medium=story&utm_campaign=kit` if you prefer a tap |
| `kit-comment-leaks.png` | When you share a post whose CTA is LEAKS (P01, P03, P04, P05, P08, P09, P10) | Post sticker on the panel |

**Post only the founding frame that is true today.** A slot count that isn't real, in either direction, breaks the no-fake-scarcity rule. Update the Pricing highlight the same day the count changes.

### Overlays: `overlays/` (transparent PNG unless noted)
For Edits / CapCut / OBS. "Tight" files are just the element; `frame-*` files are full 1080 × 1920 frames with the element already in position (drop on top of the whole clip).

| File | What | Where it goes |
|---|---|---|
| `demo-badge.png`, `frame-demo-badge.png` | **DEMO – fictional business** | Top-left of the Reel safe area (x 65, y 280), on **every** demo frame from first to last, cover included |
| `stopwatch-00-00.png`, `frame-stopwatch-00-00.png` | The amber stopwatch pill at 00:00 | Top-right of the safe area. Use it at the moment the lead arrives |
| `stopwatch-00-15.png`, `-00-30`, `-00-45`, `-01-00` | Sample times | **Only** when they match the time on your recording. For any other time: `node tools/render/render-assets.mjs --stopwatch 00:43` |
| `label-lead-arrives.png`, `label-reply-sent.png` | White labels to sit under the stopwatch | Under the pill, at those two moments |
| `label-2x-speed.png` | "2× speed" | On any part you speed up (qualification, booking). Never inside the timed segment |
| `lower-third-hemant.png`, `frame-lower-third-hemant.png` | Name tag: Hemant · AskHemant | First appearance on camera, 2–3 seconds, above the caption area |
| `end-card-leaks.png` (opaque Indigo) | "Comment LEAKS → the free Lead Leak Kit" | Last 2–3 seconds of every LEAKS Reel |
| `end-card-founding.png` (opaque Indigo) | "Comment FOUNDING → the founding-client details" | Last 2–3 seconds of P06 and T03 |

The timed segment ("lead arrives" → "reply sent") is one uncut take, and the pill only copies the time the recorded stopwatch shows ([`02-launch-posts.md`](../02-launch-posts.md), rules 2–4). "Within a minute" is a design target, never a promise.

---

## 2. Posting order (launch weeks 1–2)

Times are IST, from [`02-launch-posts.md`](../02-launch-posts.md) (which owns the schedule).

| Day | Feed | Story frames | Highlights / overlays |
|---|---|---|---|
| **Mon 19 Oct** | P01 Reel 15:00 → `P01-cover.png` | `new-post-P01.png` | Create **Start Here**, **Pricing**, **FAQ** with highlights 01, 02, 05. Edit: `end-card-leaks.png`, `lower-third-hemant.png` |
| **Tue 20 Oct** | P02 carousel 15:00 → `carousels/P02/` (pin #1) · T01 trial 18:00 → `T01-cover.png` | `new-post-P02.png` | — |
| **Wed 21 Oct** | P03 Reel 15:00 → `P03-cover.png` (pin #2) | `new-post-P03.png` | Create **Demos** (`highlight-03-demos.png`). Edit: `frame-demo-badge.png`, stopwatch, labels, `end-card-leaks.png` |
| **Thu 22 Oct** | P04 carousel 15:00 → `carousels/P04/` · T02 trial 18:00 → `T02-cover.png` | `new-post-P04.png` or `kit-comment-leaks.png`, plus `kit-dm-me-kit.png` | — |
| **Fri 23 Oct** | P05 Reel **19:30** → `P05-cover.png` | `new-post-P05.png` | Edit: `end-card-leaks.png` |
| **Sun 25 Oct** | — | `ask-hemant-sunday-question.png` (10:00), `ask-hemant-sunday-answer.png` (17:00–19:00) | — |
| **Mon 26 Oct** | P06 Reel 15:00 → `P06-cover.png` (pin #3) | `new-post-P06.png`, `founding-slots-3-of-3.png` | Edit: `end-card-founding.png`. Add the founding frame to **Pricing** |
| **Tue 27 Oct** | P07 carousel 15:00 → `carousels/P07/` · T03 trial 18:00 → `T03-cover.png` | `new-post-P07.png` | — |
| **Wed 28 Oct** | P08 Reel 15:00 → `P08-cover.png` | `new-post-P08.png` | Create **Build Log** (`highlight-04-build-log.png`) |
| **Thu 29 Oct** | P09 carousel 15:00 → `carousels/P09/` · T04 trial 18:00 → `T04-cover.png` | `new-post-P09.png`, `kit-dm-me-kit.png` | — |
| **Fri 30 Oct** | P10 Reel 15:00 → `P10-cover.png` | `new-post-P10.png` | Edit: `frame-demo-badge.png`, stopwatch, `end-card-leaks.png` |
| **Sun 1 Nov** | — | Ask Hemant Sunday frames + `founding-slots-N-of-3.png` (the true N) | — |

From Mon 2 Nov (P11 onward), add each new carousel to `carousels.json` and each new Reel cover / teaser frame to `assets.json`, then re-render ([`03-content-calendar-30-days.md`](../03-content-calendar-30-days.md)).

---

## 3. Before you post any graphic (30 seconds)

- [ ] Opened the PNG and read every word.
- [ ] Demo visual? The DEMO badge is visible and uncropped.
- [ ] Prices exactly as published and "excl. GST" in the caption.
- [ ] Any statistic has its source on the slide and in the caption.
- [ ] Founding frame shows today's real slot count.
- [ ] One CTA, and "check your message requests" on comment CTAs.

## 4. How to re-render and how to edit text

```bash
# carousels: edit instagram/carousels.json, then
node tools/render/render-carousels.mjs            # or --id P04
# everything else: edit tools/render/data/assets.json, then
node tools/render/render-assets.mjs               # or --only covers | stories | highlights | overlays
node tools/render/render-assets.mjs --stopwatch 00:43
```

- **Change carousel copy:** edit the slide's `heading`, `body`, `items` or `source` in [`carousels.json`](../carousels.json). Keep the `highlight` an exact phrase from the `heading`. Sizes shrink automatically to fit; if a slide FAILs, the copy is too long, so cut words rather than forcing it.
- **Change a cover title, Story line or end card:** edit [`tools/render/data/assets.json`](../../tools/render/data/assets.json). Cover titles: 6 words or fewer.
- **Force a line break:** put `\n` in the text.
- **Add a demo:** set `"demo": true` on the carousel, slide, cover or Story entry. The badge then appears top-left automatically.
- **A new Reel:** add an entry to `reelCovers` (and to `stories.newPost`), then `--only covers,stories`.

Setup, the full JSON reference and every QA rule: [`tools/render/README.md`](../../tools/render/README.md). Canva is only a fallback for quick one-offs; anything made there should copy these files' colours, fonts and layout.
