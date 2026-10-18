# AskHemant — AI automation consulting, launch kit

Everything needed to launch **AskHemant**: Hemant Kumar's AI + automation consulting brand, marketed on Instagram, with a website where businesses book a call. It covers the strategy, brand, website, lead magnet, Instagram content and graphics, DM automation, sales kit, n8n automations and a 90-day plan.

| Decision | Choice | Details |
|---|---|---|
| Brand | **AskHemant**: a personal brand, and the name doubles as the call to action | [`docs/01-brand-and-domain.md`](docs/01-brand-and-domain.md) |
| Domain | **askhemant.ai** (Hostinger), with askhemant.com redirecting to it. Not .si: it's Slovenia's domain and doesn't read as "AI" | same |
| Instagram | **@askhemant** on a Creator account. Backups: @askhemant.ai, @hemantautomates | [`instagram/01-profile-setup.md`](instagram/01-profile-setup.md) |
| Tagline | **No lead left on read.** | |
| Who it's for | Real-estate brokers and channel partners (India first, then UAE), then private clinics. Agencies as a white-label channel. General SMBs for Quick Win and custom AI/product builds | [`docs/00-strategy.md`](docs/00-strategy.md) §2 |
| Flagship offer | **Speed-to-Lead Sprint**: ₹34,999 / $1,499, live in 10 working days | §4 |
| Entry points | Free 20-min **Fit Call** → **Lead Leak Audit** ₹9,999 / $499 (or **AI Build Scoping**, same price, for custom automations and AI products). Side door: **Ask Hemant Session** ₹1,999 / $99 | §4 |
| First clients | **3 Founding Client slots** at ₹14,999 / $599, in exchange for measured results and permission to publish. Closes Mon 30 Nov 2026 | [`sales/10-founding-client-program.md`](sales/10-founding-client-program.md) |
| Lead magnet | **The Lead Leak Kit**: a 13-page PDF. People comment **LEAKS** and get it by DM | [`lead-magnet/`](lead-magnet/) |

> **Not verified:** whether askhemant.ai and @askhemant are free. Domain lookups were blocked from the environment this was built in. Run the 5-minute check in [`docs/01-brand-and-domain.md`](docs/01-brand-and-domain.md) before paying for anything.

---

## Start here: the first 10 things to do

1. **Check and buy the name.** Run the 5-minute check, then buy askhemant.ai and Hostinger Premium. → [`docs/01-brand-and-domain.md`](docs/01-brand-and-domain.md), [`docs/03-accounts-setup-guide.md`](docs/03-accounts-setup-guide.md)
2. **Claim @askhemant**, switch it to a Creator account, and link a Facebook Page so comment automation works. → [`instagram/01-profile-setup.md`](instagram/01-profile-setup.md)
3. **Create the accounts:** Cal.com (username `askhemant`), WhatsApp Business app, Tally, Web3Forms, Razorpay, GA4 and Clarity. Each one gives you a value to paste into the site or the automations. → [`docs/03-accounts-setup-guide.md`](docs/03-accounts-setup-guide.md) §1 lists every value
4. **Fill in the site config and upload the site.** Paste your values into [`website/assets/js/config.js`](website/assets/js/config.js) (plus the Web3Forms key in the hidden field of `website/index.html`). Values you haven't filled in hide their buttons. The Cal.com username `askhemant` is already filled in, so create that account before you deploy. Upload the *contents* of `website/` with File Manager or the GitHub Action. **Don't use hPanel's Git deploy**: it would publish the whole repo, including `docs/` and `sales/`. → [`website/DEPLOY-HOSTINGER.md`](website/DEPLOY-HOSTINGER.md)
5. **Turn on the LEAKS auto-DM** (Meta Business Suite in month 1, ManyChat later). → [`instagram/07-dm-automation-playbook.md`](instagram/07-dm-automation-playbook.md)
6. **Start n8n** on a Hostinger VPS and import the workflows. The demos you'll film for Reels run on these. → [`automations/README.md`](automations/README.md)
7. **Post P01 on Mon 19 Oct at 15:00 IST,** then follow the schedule. → [`instagram/02-launch-posts.md`](instagram/02-launch-posts.md), [`instagram/03-content-calendar-30-days.md`](instagram/03-content-calendar-30-days.md)
8. **Send 10 personal messages a day** to people you know. No cold mass DMs. → [`sales/11-warm-outreach-playbook.md`](sales/11-warm-outreach-playbook.md)
9. **Run every Fit Call from the script.** Send the proposal and payment link the same day. → [`sales/01-fit-call-script.md`](sales/01-fit-call-script.md), [`sales/03-proposal-template.md`](sales/03-proposal-template.md)
10. **Review the scorecard every Sunday.** → [`docs/04-weekly-operating-system.md`](docs/04-weekly-operating-system.md), [`docs/kpi-scorecard.csv`](docs/kpi-scorecard.csv)

The full day-by-day plan, with 177 checkboxes from today to day 90 (Sat 16 Jan 2027) and the price-rise step after it, is in **[`docs/02-launch-checklist.md`](docs/02-launch-checklist.md)**.

---

## What's in the repo

```
docs/          Strategy, brand & domain, 90-day launch checklist, accounts setup, weekly operating system, KPI scorecard, research notes
brand/         Colour + type tokens (tokens.css), self-hosted fonts (SIL OFL), logo mark, wordmark, Instagram avatar
website/       The askhemant.ai static site: Home, Pricing, Book, Kit, Founding, Privacy, Terms, 404
               config.js holds every link and ID; DEPLOY-HOSTINGER.md walks through going live
.github/       Optional GitHub Action that FTP-deploys website/ to Hostinger (skips safely until secrets are added)
lead-magnet/   The Lead Leak Kit: HTML source → 13-page PDF + page PNGs, plus a Google-Sheets-ready ROI calculator
instagram/     Profile setup, launch posts P01–P10, 30-day calendar, 20 reel scripts, stories/broadcast/collabs,
               hashtags & SEO, DM automation playbook, content tracker
instagram/graphics/  Rendered, ready-to-post assets: carousels, highlight covers, reel covers, story frames, video overlays
tools/         render/ re-renders the graphics from instagram/carousels.json (Node + Playwright);
               switch-domain.mjs moves everything to askhemant.com for the lean path
sales/         Fit Call script, Cal.com intake, proposal, pricing sheet, agreement template, onboarding,
               follow-ups, case study + consent, India invoicing notes, founding program, warm outreach,
               audit delivery templates (Lead Leak Audit + AI Build Scoping)
automations/   Six importable n8n workflows: kit signup → pipeline, DEMO speed-to-lead, AI WhatsApp qualifier,
               clinic missed-call text-back, daily digest, Cal.com reminders. Plus WhatsApp templates, prompt, demo data
```

## Editing things later

- **Prices or offer details:** change the source in [`docs/00-strategy.md`](docs/00-strategy.md) §4. Then update:
  - `website/pricing/index.html` (cards and JSON-LD)
  - `website/index.html` (step cards, price cards, FAQ, the founding "List" line)
  - `website/founding/index.html`
  - [`sales/04-pricing-sheet.md`](sales/04-pricing-sheet.md)
  - `instagram/carousels.json`, then re-render
  - `lead-magnet/src/kit.html`, then re-render
  - the WhatsApp catalogue and the Razorpay payment-page amounts

  Finally, run `grep -rn '34,999' .` (with the old price) to catch anything missed.
- **Carousel text:** edit [`instagram/carousels.json`](instagram/carousels.json), then run `node tools/render/render-carousels.mjs`. → [`tools/render/README.md`](tools/render/README.md)
- **Lead magnet:** edit `lead-magnet/src/kit.html`, then run `node lead-magnet/render.mjs` (it also updates the website copy of the PDF).
- **Links and IDs on the site:** in [`website/assets/js/config.js`](website/assets/js/config.js), plus the Web3Forms key in the hidden field of `website/index.html`.
- **Launching on askhemant.com first (lean budget):** run `node tools/switch-domain.mjs askhemant.com` to preview the changes, then add `--write` to apply them. It swaps the domain everywhere and turns off the .com→.ai redirect. Re-render afterwards. → [`website/DEPLOY-HOSTINGER.md`](website/DEPLOY-HOSTINGER.md)

## Needs your input or a professional

- **Your details:** WhatsApp number, city, a face photo (the logo avatar works until then), and the account IDs listed in the setup guide.
- **Open questions:** see [`docs/00-strategy.md`](docs/00-strategy.md) §11. Among them: hours per week, existing work you can show, comfort on camera, budget (full stack ≈ ₹34–52K vs lean ≈ ₹9–15K, estimates).
- **Legal and tax:** have a lawyer check [`sales/05-consulting-agreement-template.md`](sales/05-consulting-agreement-template.md) and the privacy and terms pages, and a CA check [`sales/09-invoicing-and-tax-notes-india.md`](sales/09-invoicing-and-tax-notes-india.md) (GST, LUT, purpose codes).
- **Platform details that change often:** Meta and Instagram menu paths, ManyChat limits, Cal.com plan features and prices. These are flagged as unverified where they appear; check them in the app.

## Ground rules this kit follows

No made-up testimonials, client logos, results or follower numbers. Every demo is labelled **"DEMO – fictional business"**. Every statistic has a source. "Within a minute" is a design target, never a promise. Prices are published and exclude GST.
