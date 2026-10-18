# The Lead Leak Kit (lead magnet)

**The Lead Leak Kit: 7 places your enquiries go cold, and the WhatsApp fixes**
Promise: *In 10 minutes, find where your enquiries go cold and fix the biggest leak this week. No new software needed.*
Delivered ungated by the LEAKS auto-DM, hosted at `askhemant.ai/kit/lead-leak-kit.pdf`. The bonus calculator sits behind the 4-field Tally form on `askhemant.ai/kit` (strategy §5 stage 4 and §7).

| File | What it is |
|---|---|
| `lead-leak-kit.pdf` | The kit: 13 mobile pages, each exactly 1080×1350 px (810×1012.5 pt), fonts embedded, about 0.4 MB |
| `pages/page-01.png` … `page-13.png` | The same pages as 1080×1350 PNGs. Each one works as an Instagram carousel slide |
| `lead-leak-calculator.xlsx` | Bonus: the Lead Leak Calculator (formulas only, Google Sheets compatible) |
| `src/kit.html`, `src/kit.css` | Source of the PDF. Uses `../../brand/tokens.css`, the self-hosted brand fonts and `brand/logo/*` |
| `render.mjs` | Renders the PDF and PNGs, runs layout QA, copies the PDF to `website/kit/lead-leak-kit.pdf` |
| `src/build_calculator.py` | Builds the calculator with openpyxl |
| `src/verify_calculator.py` | Recomputes every calculator result independently (see "Checking the maths") |

## Page map

| Page | Content | Carousel use |
|---|---|---|
| 01 | Cover: "7 places your enquiries go cold …and the WhatsApp fixes" | Hook slide (Ink on Paper, one amber word on an Ink block) |
| 02 | How to use this kit in 10 minutes + contents | |
| 03 | Leaks 01–02: after-hours enquiries; portal leads that never reach WhatsApp (BYU/HBR source line) | P04 teaser slides |
| 04 | Leaks 03–04: unanswered Instagram DMs; no qualifying questions | P04 teaser slides |
| 05 | Leaks 05–06: no visit reminders; no follow-up after day 2 (Planet DDS source line) | P04 teaser slides |
| 06 | Leak 07: leads that aren't logged anywhere + "Which leak first?" picker | P04 teaser slides |
| 07 | Template 01 first reply (+ clinic missed-call version) and how to set away/greeting messages and quick replies | |
| 08 | The 6-question qualification script = templates 02–04, with Hot/Warm/Cold sorting | "Send to your junior agent" post |
| 09 | Templates 05–07: visit offer, 24-hour and 2-hour reminders | |
| 10 | Templates 08–10: no-show rescue, day-7 revival, day-30 check-in (marketing, with STOP opt-out) | |
| 11 | The 10 pm self-test, step by step, scored out of 6 (Ink page) | |
| 12 | Free tools first: WhatsApp Business app, Meta's free tools, and what free tools won't do | |
| 13 | Next step: free 20-min Fit Call at askhemant.ai/book, founding slots (₹14,999 / $599, closes Mon 30 Nov 2026), About Hemant (Indigo CTA page) | |

The strategy brief says "10-page PDF". It is 13 pages because every page keeps body text at 30 px or larger so it reads on a phone. All the required content is there: 7 leaks, 10 templates in English and Hinglish, the 6-question script, the 10 pm self-test and the free-tools page. Real-estate first, with **Clinic** lines where they fit.

## Editing and re-rendering

1. Edit the copy in `src/kit.html`. Each page is one `<section class="page" id="…">`. Styles are in `src/kit.css`, and every colour and font comes from `brand/tokens.css`.
   - Page numbers (`.pgn`, `.pgt`) and cross-references (`<span data-to="script">8</span>`) are filled in at render time, so reordering pages keeps "page 8" correct.
   - Mark small text (labels, kickers, footers, source lines) with `data-small`. Anything else must be 30 px or larger, or the render fails.
   - Amber (`--ah-amber`) only goes inside Ink or Indigo elements. Never use it as text on Paper or white.
   - Use `›` for menu paths, not `→`: the brand font files have no arrow glyph (render.mjs fails on characters the fonts can't draw). Don't put `₹` in JetBrains Mono, which has no ₹ glyph either.
2. Render from the repo root:
   ```bash
   node lead-magnet/render.mjs            # QA, then PDF + PNGs + copy to website/kit/
   node lead-magnet/render.mjs --no-copy  # don't touch website/kit/
   node lead-magnet/render.mjs --force    # write outputs even if QA fails (still exits 1)
   ```
   You need Node 18+ and Playwright with Chromium. In this repo's build environment Playwright is preinstalled globally and render.mjs finds it. On your own machine, run `npm i -D playwright && npx playwright install chromium` once.
3. QA that render.mjs runs on every page before it writes anything:
   - page is exactly 1080×1350 and nothing overflows its content area (no clipping);
   - no body text under 30 px; no broken cross-references; every image loads;
   - every brand font weight that's used is actually loaded (no silent system-font fallback);
   - no character outside the brand fonts' glyph sets;
   - no amber text on a light background.

   It also crops the PDF MediaBox to exactly 810×1012.5 pt. Chromium rounds paper size up to 0.01 in, which would otherwise leave a 0.7 px white strip.
4. Read every `pages/page-NN.png` before publishing. QA catches layout problems, not wrong words.

Prefer Canva? Import the PNGs as a starting point, but `src/kit.html` stays the source of truth, so reflect any wording changes there too.

## Facts and claims used (check before each re-publish)

- **Statistics (each has a source line on its page):** BYU ScholarsArchive / HBR "The Short Life of Online Sales Leads" (2011), an audit of 2,241 US firms: about 37% answered web leads within an hour and 23% never did (p.03). Planet DDS 2025 via DOCS Education: 6.9% average dental no-show rate, 12.9% cancellations (p.05). Both are labelled US data.
- **Free-tool features:** WhatsApp Business app quick replies (`/` shortcut), labels, away and greeting messages, catalogue, short link and QR code; Meta Business Suite inbox with instant replies; Meta's Business AI in WhatsApp (launched in India in 2026). Menu paths such as Settings › Business tools › Quick replies and Inbox › Automations are as documented in Oct 2026 but were **not checked in the app**. Open each menu once and fix any label that has moved.
- **No invented proof:** no testimonials, client names, results or follower counts. The About section says AskHemant launched in October 2026 and has no client case studies yet. The kit contains no demo visual, so no DEMO badge is needed. The cover chat is a generic illustration with no business name.
- **Prices** match the strategy and exclude GST: Founding Client Pilot ₹14,999 / $599 for Audit + Sprint (3 slots, closes Mon 30 Nov 2026 or when full); Speed-to-Lead Sprint ₹34,999 / $1,499. The Fit Call is free, 20 minutes, at askhemant.ai/book.
- **Compliance:** templates 09 and 10 are marketing messages and carry a STOP opt-out line. Reminders 06 and 07 are tagged Utility. The kit tells readers to message only people who enquired, to honour every STOP, and that it is general guidance, not legal advice. The Hinglish uses gender-neutral verb forms ("hum", "kijiye", "karein") so any broker can send it.

## The Lead Leak Calculator

`lead-leak-calculator.xlsx` has three tabs:

- **How to use:** the steps, the assumptions, and "Your numbers, your estimate. Not a promise."
- **Your numbers:** 13 yellow input cells. They start with **example** values, and a red banner on Results says so until you change them. The win-back guess (input 11) and the fix cost (input 12) start blank, so the calculator never shows an ROI the owner didn't type. Percentage cells only accept values from 0% to 100%.
- **Results:** formulas only, grouped into A. where enquiries leak, B. what that's worth at your own close rate, and C. your what-if, plus break-even. Each line explains how it is calculated, and the assumptions are listed in plain words. It uses only `+ − × ÷`, `IF`, `IFERROR`, `AND` and `OR`: no Excel-only functions, macros or named ranges.

Rebuild after changing labels or example values:
```bash
python3 lead-magnet/src/build_calculator.py      # needs: pip install openpyxl
python3 lead-magnet/src/verify_calculator.py     # optional: LibreOffice and/or pip install formulas
```

### Checking the maths

`verify_calculator.py` writes three scenarios into a copy of the workbook and recalculates it with **LibreOffice (headless)** and the Python **`formulas`** engine. It then compares every Results cell with a hand-written Python model. All 20 results matched in all 3 scenarios (examples; 60 enquiries with a 10% guess and a ₹34,999 fix cost; zero enquiries).

Hand check of the example scenario:
- 120 enquiries × 30% after hours = 36, of which 80% are answered next day = **28.8**.
- 84 daytime enquiries × 30% answered after 1 hour = **25.2**.
- Late in total = 54 (45%). Not followed up after day 2 = 50%.
- At risk = 120 × [1 − (1 − 0.45) × (1 − 0.50)] = 120 × 0.725 = **87**.
- At a 2% close rate that is 1.74 deals; × ₹1,50,000 = **₹2,61,000 a month** passing through a leak.
- For comparison, revenue now = 2.4 deals × ₹1,50,000 = ₹3,60,000.

These are example inputs, not benchmarks.

### Publishing it as a Google Sheet ("make a copy" link)

1. Upload `lead-leak-calculator.xlsx` to Google Drive.
2. Right-click it, then **Open with › Google Sheets**. Then **File › Save as Google Sheets**, so you work on a native Sheet rather than the .xlsx.
3. In the new Sheet, change a yellow cell and check that Results updates. Then press Ctrl+Z to put the example back.
4. **Share › General access › Anyone with the link › Viewer.**
5. Copy the link and change the end from `/edit?usp=sharing` (or `/edit#gid=…`) to **`/copy`**. For example: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/copy`. Anyone opening it is asked to make their own copy, so nobody edits yours or sees anyone else's numbers.
6. Put that `/copy` link wherever the calculator is delivered after the Tally form: the Tally thank-you screen and/or the n8n WhatsApp welcome message.

## Open items for Hemant

- Create the Google Sheet `/copy` link (steps above) and paste it into the Tally kit form's thank-you page. For the n8n WhatsApp welcome, it replaces the `{{CALCULATOR_COPY_URL}}` token (`calculator_url` in workflow 01's Config node; see `automations/README.md`).
- Open each WhatsApp Business app and Meta Business Suite menu the kit names and confirm the labels still match.
- Before re-sharing, re-read the Business AI line on p.12 against what your app shows.
