# Deploying askhemant.ai on Hostinger

**For:** Hemant · **Written:** Sun 18 Oct 2026 · **Site:** plain static HTML in this `website/` folder (no build step)

This guide takes you from "nothing bought" to "live, tested site" in about 90 minutes. Hostinger menu names change from time to time; steps marked *(UI path unverified)* come from general knowledge, so look for the nearest match in hPanel.

> **Before paying for anything:** run the 5-minute availability check in [`docs/01-brand-and-domain.md`](../docs/01-brand-and-domain.md) §6 (Instagram handle, Hostinger domain search, WHOIS, Google, trademarks). Claim **`cal.com/askhemant`** in the same 5 minutes, so the booking links on the site point at your account.

> **Lean path:** launching on askhemant.com only, without buying askhemant.ai yet? Read [Lean path: launching on askhemant.com first](#lean-path-launching-on-askhemantcom-first) before §1. It changes §1–§4 and skips §7.

> **Never deploy with hPanel → Advanced → Git.** It publishes the whole repository, including `docs/` and `sales/`. Deploy by uploading the **contents** of `website/` (including `.htaccess`) to `public_html` with File Manager, or with the GitHub Action over FTP (§6).

---

## 1. Buy the domain and hosting (Sun 18 Oct, day 0)

1. On **hostinger.com/in**, buy **Premium Web Hosting** (48 months gives the lowest monthly rate; 12 months costs less cash now).
2. During onboarding, or later in hPanel → **Domains**, claim the **free domain: `askhemant.com`**.
3. Buy **`askhemant.ai`** separately: 2-year minimum, not covered by the free-domain offer.
4. Use your real legal name and contact details as registrant, then **click the verification link Hostinger emails you** straight away. Unverified domains can be suspended.
5. In hPanel → Domains, check both domains show **Active**, with **auto-renew ON** and **transfer lock ON** *(UI path unverified)*.

Full buying steps and costs: [`docs/01-brand-and-domain.md`](../docs/01-brand-and-domain.md) §3–4.

## 2. Connect the domain to the hosting

1. hPanel → **Websites** → add a website (choose "empty site" / "upload your own", not the website builder) with **askhemant.ai** as the main domain *(UI path unverified)*.
2. Domains bought at Hostinger use Hostinger's nameservers automatically. If you bought elsewhere, set the nameservers to the ones hPanel shows for your account (usually `ns1.dns-parking.com` and `ns2.dns-parking.com`) and allow up to 24 hours.

## 3. SSL and HTTPS

1. hPanel → Websites → askhemant.ai → **Security → SSL**: install the free SSL certificate for `askhemant.ai` **and** `www.askhemant.ai` *(UI path unverified)*.
2. Turn on **Force HTTPS** if hPanel offers it. The included `.htaccess` also forces HTTPS and sends `www` to the bare domain, so either is fine.
3. Only after HTTPS works everywhere, you may enable HSTS by un-commenting the `Strict-Transport-Security` line in `.htaccess`.

## 4. Create the mailbox hello@askhemant.ai

1. hPanel → **Emails** → create **hello@askhemant.ai** (included with Premium for year 1).
2. Check that **SPF, DKIM and DMARC** records exist under DNS (they are usually added automatically on Hostinger nameservers).
3. Send a test email to a Gmail address and confirm it doesn't land in spam.

## 5. Fill in the config tokens (one pass)

Every account-specific value lives in **one file: `website/assets/js/config.js`**. Any value still containing `{{` is treated as "not set": the site hides that button or falls back to email, so you can launch before every account is ready and fill them in later.

| Token | Where to get it | Used for |
|---|---|---|
| `{{WHATSAPP_NUMBER}}` | Your WhatsApp Business number, digits only with country code, e.g. `9198XXXXXXXX` | All "WhatsApp me" buttons (`wa.me` links). Hidden until set |
| `{{WEB3FORMS_ACCESS_KEY}}` | [web3forms.com](https://web3forms.com) → enter `hello@askhemant.ai` → key arrives by email | Home-page contact form. **Also appears once in `index.html`** (hidden field for visitors without JavaScript) |
| `{{TALLY_KIT_FORM_ID}}` | Tally → your Lead Leak Calculator form → Share → the ID in `tally.so/r/<ID>` | Embedded calculator form on `/kit/`. Until set, a "message me for the calculator" fallback shows |
| `{{RAZORPAY_SESSION_LINK}}` | Razorpay Dashboard → Payment Links (or Pages) → ₹1,999 "Ask Hemant Session" → full `https://` URL | Pay button on `/book/#session` |
| `{{RAZORPAY_AUDIT_LINK}}` | Razorpay → ₹9,999 "Lead Leak Audit" link | Small "pay for the Audit" link on `/pricing/#audit` |
| `{{RAZORPAY_FOUNDING_LINK}}` | Razorpay → founding deposit link | "Already selected? Pay your deposit" on `/founding/` |
| `{{PAYPAL_SESSION_LINK}}` | PayPal → a $99 payment link | International Session payments on `/book/#session` |
| `{{GA4_MEASUREMENT_ID}}` | Google Analytics → Admin → Data streams → Web → Measurement ID (`G-…`) | Analytics. Not loaded until set |
| `{{CLARITY_PROJECT_ID}}` | [clarity.microsoft.com](https://clarity.microsoft.com) → new project → Settings → Project ID | Heatmaps. Not loaded until set |
| `{{CITY}}` | Your city, e.g. `Pune` | Privacy notice and terms ("based in Pune, India"). Shows "India" until set |

**Replace-all in one go** (macOS or Linux terminal, from the repo root). Put your real values on the right, delete any line you don't have yet, then run:

```bash
cd website
sed -i.bak \
  -e 's#{{WHATSAPP_NUMBER}}#9198XXXXXXXX#g' \
  -e 's#{{WEB3FORMS_ACCESS_KEY}}#your-web3forms-key#g' \
  -e 's#{{TALLY_KIT_FORM_ID}}#abc123#g' \
  -e 's#{{RAZORPAY_SESSION_LINK}}#https://rzp.io/l/xxxx#g' \
  -e 's#{{RAZORPAY_AUDIT_LINK}}#https://rzp.io/l/yyyy#g' \
  -e 's#{{RAZORPAY_FOUNDING_LINK}}#https://rzp.io/l/zzzz#g' \
  -e 's#{{PAYPAL_SESSION_LINK}}#https://www.paypal.com/ncp/payment/XXXX#g' \
  -e 's#{{GA4_MEASUREMENT_ID}}#G-XXXXXXXXXX#g' \
  -e 's#{{CLARITY_PROJECT_ID}}#xxxxxxxxxx#g' \
  -e 's#{{CITY}}#Pune#g' \
  assets/js/config.js index.html
rm -f assets/js/config.js.bak index.html.bak
grep -rn "{{" assets/js/config.js index.html   # anything left is still unset
```

If a value contains `&` or `#`, put a backslash before it (`\&`, `\#`) in the command above.

Other settings in `config.js`:

- **`foundingSlotsLeft`** (default `3`): lower it by hand each time a founding client signs. At `0`, or after 23:59 IST on `foundingDeadline` (`2026-11-30`), the site switches to "closed" automatically.
- **`demoVideoUrl`** (default `""`): paste an `.mp4` URL, or a YouTube or Vimeo link, to show the demo video on the home page. Leave empty to keep the slot hidden.
- `calUsername`, `calFitCallSlug`, `calSessionSlug`: change only if your Cal.com links differ from `cal.com/askhemant/fit-call` and `cal.com/askhemant/ask-hemant-session`.
- `{{GOOGLE_SHEET_ID}}` is **deliberately not** in this file. The website never needs it, and `config.js` is public. It belongs in your n8n credentials only.

Everything in `config.js` is visible to visitors, which is fine for these public IDs and links. Never put API secrets or passwords in it.

### Account settings that go with the tokens

- **Cal.com:** username `askhemant`, claimed during the 5-minute name check (Sun 18 Oct). Before the site goes live and P01 posts (**Mon 19 Oct, 15:00 IST**), a minimal public *Fit Call* event must exist (20 min, slug `fit-call`), or the `/book/` calendar shows Cal.com's "not found" page. The 7 intake questions from `sales/02-cal-com-intake-form.md` and the hidden events can follow on **Tue 20 Oct**: *Ask Hemant Session* (45 min, slug `ask-hemant-session`, booked after payment) and *Client call* (30 min, slug `client-call`, for active clients).
- **Tally calculator form:** 4 fields (first name, WhatsApp number, business type, leads a month) plus a **separate, unticked** marketing-consent checkbox. Add hidden fields `utm_source`, `utm_medium`, `utm_campaign`, `source`: the site passes them in automatically.
- **Web3Forms:** in the dashboard, restrict the key to the `askhemant.ai` domain if offered. After launch, submit a test without JavaScript once to confirm the redirect back to `https://askhemant.ai/#message-sent` works on your plan.
- **GA4:** set **data retention to 14 months** (the privacy notice says so) and mark `kit_submit`, `book_click`, `whatsapp_click`, `pay_click` (plus `book_complete`, `contact_submit`, `kit_download`) as key events.
- **Razorpay:** its website check usually looks for terms, privacy, refund/cancellation and contact information. `/terms/` (section 9) and `/privacy/` cover these; confirm the refund defaults in section 9 first.
- **Recorded walkthroughs:** the Audit and the AI Build Scoping include a "20-minute recorded walkthrough", and the builds a "recorded handover". The public copy never promises Loom, so any tool works. Loom's free plan reportedly caps recordings at 5 minutes, so use Loom's paid plan, or record with OBS or your phone and share the video unlisted via YouTube or Google Drive.

### Decisions for Hemant (the site shows a default until you decide)

- **Decision for Hemant: does the Agency −25% apply beyond builds?** `/pricing/#agency` promises −25% on builds only (the Sprints, the Team system, the Quick Win Build and Custom AI builds) and says Audits and retainers for partner clients are set in the partner agreement. If you extend the discount, update that box and `sales/04-pricing-sheet.md` §5 together.
- **Decision for Hemant: does the Clinic Sprint price also rise on Mon 18 Jan 2027?** The site doesn't mention the price rise. Only if 3 documented results exist: announce on Mon 4 Jan 2027, and on 18 Jan change the Audit to ₹14,999 / $699 and the Solo Sprint to ₹44,999 / $1,999 on `/pricing/` (cards and JSON-LD) and `/` (step cards, price cards, founding "List" line). Update the kit's last page too (`lead-magnet/src/kit.html`, then `node lead-magnet/render.mjs`). The Clinic Sprint stays ₹34,999 / $1,499 unless you decide it follows. The AI Build Scoping is priced the same as the Audit; decide whether it follows too.
- **Decision for Hemant: Quick Win Build payment terms.** Shown as the default, 50% to start and 50% at go-live (₹12,500 + ₹12,499 / $500 + $499), on `/pricing/`, `/terms/` §4 and the home FAQ. Change all three if you decide otherwise.

## 6. Upload the site

Pick **one** of the two methods below. **Never use hPanel → Advanced → Git** (see the end of this section).

### Option A: hPanel File Manager (simplest, manual)

1. On your computer, zip the **contents** of `website/` (not the folder itself), including the hidden `.htaccess`, without the deploy notes:
   ```bash
   cd website && zip -r ../askhemant-site.zip . -x "DEPLOY-HOSTINGER.md" && cd ..
   ```
2. hPanel → **Files → File Manager** → open `public_html`. Delete any placeholder file Hostinger created (for example `default.php`).
3. Upload `askhemant-site.zip`, right-click → **Extract** into `public_html`, then delete the zip.
4. Turn on **Show hidden files** and check that `.htaccess` is there, next to `index.html`.

### Option B: GitHub Action over FTP (automatic on every push)

The workflow is `.github/workflows/deploy-website.yml`. It deploys only `website/`, skips `DEPLOY-HOSTINGER.md`, runs on pushes to `main` that change `website/**`, and can be run by hand (Actions → *Deploy website to Hostinger* → Run workflow). Until the secrets exist it finishes successfully with a notice and deploys nothing.

1. hPanel → **Files → FTP Accounts**: note the FTP host (or IP), username and password, or create an FTP account whose directory is `public_html`.
2. GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - `FTP_SERVER`: the FTP host, e.g. `ftp.askhemant.ai` or the IP hPanel shows
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
3. Optional **variables** (same screen, *Variables* tab):
   - `FTP_SERVER_DIR`: the folder to deploy into. Default `public_html/`. If your FTP account already opens inside `public_html`, set it to `./`.
   - `FTP_PROTOCOL`: default `ftp`. Set `ftps` if your Hostinger FTP supports TLS (try it; it encrypts the password).
4. Push a change under `website/` to `main`, or run the workflow by hand. The first run uploads everything; later runs upload only changed files (the action keeps a `.ftp-deploy-sync-state.json` file on the server; leave it there).

**Important with Option B:** the repo is the source of truth. If you edit `config.js` in File Manager, the next deploy overwrites it with the repo version, so commit config changes to the repo.

**Why never hPanel → Advanced → Git?** Hostinger's Git deploy publishes the whole repository root, which would put `docs/`, `sales/` (prices you negotiate, agreement drafts) and everything else on the public site. Upload the contents of `website/` with Option A, or let Option B do it. Reconsider Git deploy only if the website ever moves to its own repository.

## 7. Redirect askhemant.com to askhemant.ai

1. hPanel → **Domains → askhemant.com → Redirect** (or Websites → askhemant.com → Redirects) → **301 permanent** to `https://askhemant.ai`, keeping the path if offered *(UI path unverified)*.
2. Fallback: add askhemant.com as a parked/alias domain of the askhemant.ai website. The `.htaccess` rule then 301-redirects it to `https://askhemant.ai`.
3. Install SSL on askhemant.com too, so `https://askhemant.com` doesn't show a certificate warning before redirecting.
4. Optional: do the same for `askhemanth.com` if you bought it.

## 8. Post-deploy test checklist

Run this in a private browser window, on your phone and on a laptop.

**Redirects and basics**
- [ ] `http://askhemant.com` → lands on `https://askhemant.ai/` with a padlock
- [ ] `http://www.askhemant.ai` and `https://www.askhemant.ai` → `https://askhemant.ai/`
- [ ] `https://askhemant.ai/pricing` → `https://askhemant.ai/pricing/`
- [ ] `https://askhemant.ai/does-not-exist` → the "left on read" 404 page
- [ ] `https://askhemant.ai/DEPLOY-HOSTINGER.md` → 403 or 404 (never the file)
- [ ] All 7 pages open: `/`, `/pricing/`, `/book/`, `/kit/`, `/founding/`, `/privacy/`, `/terms/`

**Funnel (the Week 1 exit check)**
- [ ] `/book/?utm_source=test&utm_medium=check`: the Cal.com calendar loads; book a test slot; the UTM shows on the booking in Cal.com; cancel it
- [ ] `/kit/`: "Download the PDF" opens `kit/lead-leak-kit.pdf`
- [ ] `/kit/`: the Tally calculator form shows; the consent box is **unticked**; a test submission reaches your Google Sheet via n8n
- [ ] Home → contact form: a test message arrives at hello@askhemant.ai and the green "Thanks" state shows
- [ ] Every WhatsApp button opens a chat with your number
- [ ] Session, Audit and founding pay buttons open the right Razorpay/PayPal pages (do the ₹1 Razorpay test payment from the strategy's Week 1 exit check)
- [ ] Prices show in ₹ on an Indian phone and in $ elsewhere (or switch with the toggle); "All prices exclude GST" is visible
- [ ] Founding counter shows the right number of open slots

**Tracking and sharing**
- [ ] GA4 → Reports → Realtime shows your visit and `book_click` / `whatsapp_click` events
- [ ] Clarity shows a recording within about an hour
- [ ] Paste `https://askhemant.ai` into a WhatsApp chat and LinkedIn's Post Inspector: the preview shows the AskHemant image and title
- [ ] Google Search Console: add `askhemant.ai` as a Domain property, verify by DNS, submit `https://askhemant.ai/sitemap.xml`
- [ ] [securityheaders.com](https://securityheaders.com) shows the headers from `.htaccess`; [PageSpeed Insights](https://pagespeed.web.dev) scores look healthy on mobile

**Legal and accounts**
- [ ] Have a lawyer or CA review `/privacy/` and `/terms/` (see the HTML comments at the top of each file), and confirm the refund defaults in terms section 9
- [ ] Two-factor authentication is on for Hostinger, Cal.com, Tally, Razorpay, Google and Meta (the privacy notice says so)

## 9. Updating the site later

- Edit the HTML files directly; there is no build step. Shared parts (header, footer) repeat on every page, so change all 8 HTML files together.
- After changing `assets/css/*.css` or `assets/js/site.js`, bump the `?v=20261018` value in every page's `<head>` so browsers fetch the new file (they cache CSS/JS for 30 days). `config.js` is never cached long, so it needs no version bump.
- When you change the privacy notice or terms, update the "Last updated" date on the page and `lastmod` in `sitemap.xml`.
- **When the founding program closes** (Mon 30 Nov 2026, 23:59 IST, or as soon as the 3rd slot is signed): the site switches itself to "closed" (set `foundingSlotsLeft` to `0` if a 3rd signing closes it early), but the kit PDF doesn't. Swap the `FOUNDING-BOX` on the kit's last page for the Lead Leak Audit box (`lead-magnet/README.md`, "When the founding program closes"), run `node lead-magnet/render.mjs`, redeploy, and switch the FOUNDING auto-DM to the closed text (`instagram/07-dm-automation-playbook.md` §2.3).
- Planned pages from the strategy (`/demos` in week 2, `/clinics` in week 3, `/case-studies` in month 3): copy an existing page folder, change its title, description, canonical URL and content, then add it to `sitemap.xml` and the nav/footer.

## Lean path: launching on askhemant.com first

Use this if you'd rather not pay for askhemant.ai yet (about ₹16.7–18.5K for the 2-year minimum, an estimate) or it isn't available. You launch on **askhemant.com**, the free domain that comes with Premium hosting, and can move to askhemant.ai later without breaking a link.

1. **§1:** buy Premium Web Hosting and claim the free **askhemant.com**. Skip buying askhemant.ai. Still click the registrant verification link straight away.
2. **Switch the repo to askhemant.com** (from the repo root, Node 18+):
   ```bash
   node tools/switch-domain.mjs askhemant.com           # dry run: lists every file and how many changes
   node tools/switch-domain.mjs askhemant.com --write   # applies them
   ```
   - It replaces `askhemant.ai` (so `hello@askhemant.ai` too) with `askhemant.com` across `website/`, `lead-magnet/src/`, `instagram/` (the Markdown files and `carousels.json`), `tools/render/data/` and `templates/`, `sales/`, `automations/` and `docs/03-accounts-setup-guide.md`.
   - It comments out the askhemant.com → askhemant.ai redirect in `website/.htaccess` (the block between `# BEGIN SECOND-DOMAIN-REDIRECT` and `# END SECOND-DOMAIN-REDIRECT`), which would otherwise send the site to itself.
   - It never touches `docs/00-strategy.md`, `docs/01-brand-and-domain.md`, `docs/research/`, `README.md` or this guide (they record the decision), or the Instagram backup handle `@askhemant.ai`. It lists the lines it left alone on purpose; read them.
3. **Re-render everything that has the domain drawn in:**
   ```bash
   node lead-magnet/render.mjs                                                # kit PDF + pages, and website/kit/lead-leak-kit.pdf
   node tools/render/render-carousels.mjs && node tools/render/render-assets.mjs   # Instagram graphics
   python3 lead-magnet/src/build_calculator.py                                # calculator .xlsx (needs openpyxl)
   ```
   `website/assets/img/og-image.png` (the link preview image) also shows askhemant.ai and has no source file in the repo: replace it with a 1200×630 version that shows askhemant.com before you share links.
4. **§2–§6 and §8, with askhemant.com wherever they say askhemant.ai:** askhemant.com is the website's main domain (§2); SSL for `askhemant.com` and `www.askhemant.com` (§3); the mailbox is **hello@askhemant.com** (§4); the Web3Forms key, Cal.com, GA4, Clarity, Search Console and Razorpay's website field all use askhemant.com. **Skip §7.** In the §8 checklist, `http://www.askhemant.com` should land on `https://askhemant.com/`.
5. **Commit the switch** as one commit, so it's easy to undo, before deploying with Option A or B.

**Moving to askhemant.ai later:** buy it, add it as the website's main domain with SSL, then `git revert` the switch commit. That puts askhemant.ai back everywhere and re-enables the `.htaccess` redirect, so every askhemant.com link (bio, kit PDFs already downloaded, printed material) 301s to askhemant.ai. If later edits make the revert conflict, keep the askhemant.ai side. Re-render (point 3), redeploy, do §7, and keep askhemant.com renewed.

## What's in this folder

```
website/
├── index.html            home (hero, demo, prices, FAQ, contact form)
├── pricing/index.html    every offer, INR/USD toggle, terms
├── book/index.html       Cal.com Fit Call embed + paid Session
├── kit/index.html        Lead Leak Kit landing + Tally calculator
├── kit/lead-leak-kit.pdf the kit (made by the lead-magnet build)
├── founding/index.html   Founding Client Program (3 slots, closes 30 Nov 2026)
├── privacy/index.html    DPDP-aware privacy notice
├── terms/index.html      website + engagement terms
├── 404.html
├── assets/css/           tokens.css (brand), site.css
├── assets/js/            config.js (edit me), site.js
├── assets/fonts/         self-hosted Space Grotesk, Inter, JetBrains Mono (OFL)
├── assets/img/           logos, og-image.png (1200×630)
├── favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
├── robots.txt, sitemap.xml
├── .htaccess             HTTPS, redirects, caching, compression, security headers
└── DEPLOY-HOSTINGER.md   this file (not uploaded)
```
