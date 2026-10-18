# AskHemant: Accounts Setup Guide

**For:** Hemant Kumar · **Written:** Sun 18 Oct 2026 · **When:** mostly Sun 18 – Sun 25 Oct (see [`02-launch-checklist.md`](./02-launch-checklist.md))
**Sources:** the tool stack in [`brand-brief.json`](./brand-brief.json) `toolStack`, [`00-strategy.md`](./00-strategy.md) §5, [`research/tooling-and-ops.md`](./research/tooling-and-ops.md), [`research/instagram-playbook.md`](./research/instagram-playbook.md), [`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md).

> **How to read this**
> - One section per account: **why** you need it, **cost**, **exact settings**, the **token it produces** and **where to paste it**.
> - **\*(unverified)\*** marks anything that comes from general knowledge or third-party reports and was not checked in the live product. Menus move: if a label differs, look for the nearest match and fix this file.
> - Prices are from the research (Oct 2026), exclude GST, and may differ in the cart. ₹88 = $1 *(estimate)*.
> - **Security baseline for every account:** a password manager, a unique password, **2FA with an authenticator app** (not SMS only), backup codes stored offline. The privacy notice on the site says 2FA is on for Hostinger, Cal.com, Tally, Razorpay, Google and Meta, so it has to be true.
> - Use **hello@askhemant.ai** as the login email wherever it makes sense once it exists (Mon 19 Oct). Until then use a Gmail address you will always control, and switch later.

---

## Contents

1. [Token map: what each placeholder is and where it goes](#1-token-map)
2. [Hostinger: hosting, domains, SSL, mailbox, DNS](#2-hostinger-hosting-domains-ssl-mailbox-dns)
3. [Hostinger VPS with n8n](#3-hostinger-vps-with-n8n)
4. [Google account (Calendar, Meet, Sheets, Analytics)](#4-google-account)
5. [Instagram Creator account (+ Threads)](#5-instagram-creator-account--threads)
6. [Facebook Page](#6-facebook-page)
7. [Meta Business Suite, business portfolio and Comment to Message](#7-meta-business-suite-business-portfolio-and-comment-to-message)
8. [WhatsApp Business app](#8-whatsapp-business-app)
9. [Cal.com](#9-calcom)
10. [Tally (kit form, onboarding form)](#10-tally)
11. [Web3Forms](#11-web3forms)
12. [GA4, Microsoft Clarity and Search Console](#12-ga4-microsoft-clarity-and-search-console)
13. [WhatsApp Cloud API for your own automations](#13-whatsapp-cloud-api-for-your-own-automations)
14. [Razorpay](#14-razorpay)
15. [Skydo and Wise Business](#15-skydo-and-wise-business)
16. [PayPal](#16-paypal)
17. [Loom](#17-loom)
18. [Zoho Sign](#18-zoho-sign)
19. [ManyChat (later)](#19-manychat-later)
20. [Google Sheets pipeline](#20-google-sheets-pipeline)
21. [LinkedIn](#21-linkedin)
22. [YouTube Shorts](#22-youtube-shorts)
23. [Content tools and AI API keys](#23-content-tools-and-ai-api-keys)
24. [GitHub deploy secrets](#24-github-deploy-secrets)
25. [Costs and renewal calendar](#25-costs-and-renewal-calendar)
26. [Everything still unverified](#26-everything-still-unverified)

---

## 1. Token map

The repo uses these exact placeholders. Fill them once; anything still containing `{{` is treated by the website as "not set" (the button hides or falls back to email), so you can launch with gaps.

| Token | What it is | Produced by | Paste it into |
|---|---|---|---|
| `{{WHATSAPP_NUMBER}}` | Your WhatsApp Business number, digits only with country code, e.g. `9198XXXXXXXX` | §8 | [`website/assets/js/config.js`](../website/assets/js/config.js) `whatsappNumber`; Instagram bio link 4 (`wa.me/…`); any copy in `instagram/`, `sales/`, `automations/` that shows it. In n8n this number is the **sender**: its Cloud API phone-number ID becomes `{{WA_PHONE_NUMBER_ID}}`, and alerts go to a different number (`{{ALERT_WHATSAPP_NUMBER}}`) |
| `{{WEB3FORMS_ACCESS_KEY}}` | Public key for the home-page contact form | §11 | `config.js` `web3formsAccessKey` **and** the hidden field in [`website/index.html`](../website/index.html) |
| `{{TALLY_KIT_FORM_ID}}` | The ID in `tally.so/r/<ID>` of the Lead Leak Calculator form | §10.1 | `config.js` `tallyKitFormId` only (the n8n kit workflow is linked by Tally's webhook, not by this ID) |
| `{{RAZORPAY_SESSION_LINK}}` | Full `https://` URL of the ₹1,999 Ask Hemant Session payment page | §14 | `config.js` `razorpaySessionLink`; WhatsApp quick reply `/session`; [`sales/07-follow-up-templates.md`](../sales/07-follow-up-templates.md) |
| `{{RAZORPAY_AUDIT_LINK}}` | ₹9,999 Lead Leak Audit payment page | §14 | `config.js` `razorpayAuditLink`; quick reply `/audit`; [`sales/01-fit-call-script.md`](../sales/01-fit-call-script.md) (sent on WhatsApp during the call) |
| `{{RAZORPAY_FOUNDING_LINK}}` | Founding Client Pilot 50% deposit page | §14 | `config.js` `razorpayFoundingLink`; [`sales/10-founding-client-program.md`](../sales/10-founding-client-program.md). Share only after selection and a signed agreement |
| `{{PAYPAL_SESSION_LINK}}` | $99 Ask Hemant Session (international) | §16 | `config.js` `paypalSessionLink` |
| `{{GA4_MEASUREMENT_ID}}` | `G-XXXXXXXXXX` | §12 | `config.js` `ga4MeasurementId` |
| `{{CLARITY_PROJECT_ID}}` | Clarity project ID | §12 | `config.js` `clarityProjectId` |
| `{{GOOGLE_SHEET_ID}}` | The ID between `/d/` and `/edit` in the pipeline Sheet's URL | §20 | **n8n only** (Google Sheets nodes / credentials). **Never** in `config.js` (it is public) and never committed to the repo |
| `{{CITY}}` | Your city, e.g. `Pune` | your decision | `config.js` `city` (privacy and terms pages); city hashtag in [`instagram/06-hashtags-keywords-seo.md`](../instagram/06-hashtags-keywords-seo.md); field-test location |

**Automation-only tokens** (in the n8n workflow JSONs' **Config** nodes; never in `config.js`). Fill them in the Config node after import, or with the one-pass `sed` in [`automations/README.md`](../automations/README.md) §5 on copies kept outside the repo.

| Token | What it is | Produced by | Paste it into |
|---|---|---|---|
| `{{WA_PHONE_NUMBER_ID}}` | Cloud API **phone number ID** of your business sending number (not the number itself) | §13 (developers.facebook.com → your app → WhatsApp → API setup) | Config node of workflows 01, 05, 06 |
| `{{ALERT_WHATSAPP_NUMBER}}` | Your personal WhatsApp in E.164 (`+9198XXXXXXXX`) for new-lead alerts and the 8 am digest; **must differ** from the sending number | your decision | Config node of 01, 05 and 03 (demo agent alert) |
| `{{CALCULATOR_COPY_URL}}` | The Lead Leak Calculator's Google Sheet `/copy` link (`https://docs.google.com/spreadsheets/d/<ID>/copy`) | [`lead-magnet/README.md`](../lead-magnet/README.md) "Publishing it as a Google Sheet" | Config node of 01 (WhatsApp welcome); paste the same link by hand on the Tally thank-you page (§10.1) |
| `{{DEMO_SHEET_ID}}` | ID of the separate "AskHemant DEMO Lab (fictional data)" spreadsheet | §20 / [`automations/README.md`](../automations/README.md) §4 | Config node of 02, 03, 04 |
| `{{DEMO_WA_PHONE_NUMBER_ID}}` | Phone number ID of Meta's **test** number | §13 step 2 | Config node of 02, 03, 04 |
| `{{DEMO_TEST_NUMBERS}}` | Comma-separated E.164 numbers allowed to receive demo messages (your own phones); empty = nobody gets a message | your decision | Config node of 02, 03, 04 |

**n8n environment variables** (set on the VPS in the n8n service's `environment:` or `.env`, per [`automations/README.md`](../automations/README.md) §3; generate random values with `openssl rand -hex 24`; never commit them):

| Variable | Value | Used by |
|---|---|---|
| `GENERIC_TIMEZONE`, `TZ` | `Asia/Kolkata` | all (08:00 IST digest, IST timestamps) |
| `WEBHOOK_URL` | your public n8n address, e.g. `https://n8n.askhemant.ai/` | all webhooks |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | `false` (n8n 2.x blocks env access by default) | signature checks in Code nodes |
| `NODE_FUNCTION_ALLOW_BUILTIN` | `crypto` | signature checks in Code nodes |
| `TALLY_SIGNING_SECRET` | the signing secret you set in Tally (§10.1) | 01 |
| `CALCOM_WEBHOOK_SECRET` | the webhook secret you set in Cal.com (§9) | 06 |
| `WA_APP_SECRET` | Meta app secret (App settings → Basic) | 03 |
| `WA_VERIFY_TOKEN` | any random string, also typed into Meta's webhook setup | 03 |
| `DEMO_WEBHOOK_KEY` | random (optional) | 02, 04 |
| `EXECUTIONS_DATA_PRUNE`, `EXECUTIONS_DATA_MAX_AGE` | `true`, `336` (14 days) | all (executions hold personal data) |

**n8n credentials** (created in n8n, names exactly as in [`automations/README.md`](../automations/README.md) §2): `WhatsApp Cloud API – AskHemant` and `WhatsApp Cloud API – DEMO` (Header Auth, `Bearer <system user token>`, §13), `Anthropic API key` (Header Auth `x-api-key`, demo workflow 03 only, §23), `Google Sheets – AskHemant` (OAuth2). The WhatsApp **Graph API version** is not a token: it is the value set in each workflow's Config node; check Meta's deprecation dates and update it there.

**GitHub deploy secrets** (not tokens in files): `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, optional variables `FTP_SERVER_DIR`, `FTP_PROTOCOL` (§24).

**Not placeholders:** `{{1}}`, `{{2}}` … in [`automations/whatsapp-templates.md`](../automations/whatsapp-templates.md) are WhatsApp template variables that Meta fills per message; leave them as they are.

**Known defaults (no token):** https://askhemant.ai · hello@askhemant.ai · @askhemant (https://instagram.com/askhemant) · Cal.com `askhemant` → https://cal.com/askhemant/fit-call (20 min) and https://cal.com/askhemant/ask-hemant-session (45 min).

**Fill in one pass.** The website part is a single `sed` command in [`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md) §5. To see every place a token is still unset across the repo, from the repo root:

```bash
grep -rn --exclude-dir=.git -E "\{\{(WHATSAPP_NUMBER|WEB3FORMS_ACCESS_KEY|TALLY_KIT_FORM_ID|RAZORPAY_SESSION_LINK|RAZORPAY_AUDIT_LINK|RAZORPAY_FOUNDING_LINK|PAYPAL_SESSION_LINK|GA4_MEASUREMENT_ID|CLARITY_PROJECT_ID|GOOGLE_SHEET_ID|CITY|WA_PHONE_NUMBER_ID|ALERT_WHATSAPP_NUMBER|CALCULATOR_COPY_URL|DEMO_SHEET_ID|DEMO_WA_PHONE_NUMBER_ID|DEMO_TEST_NUMBERS)\}\}" .
```

Replace public values (number, links, IDs, city) in the repo. Paste private values (`{{GOOGLE_SHEET_ID}}`, the automation-only tokens, API tokens, secrets, passwords) **only inside n8n** (Config nodes, credentials, environment variables) after importing the workflows, and keep any filled workflow copies outside the repo.

---

## 2. Hostinger: hosting, domains, SSL, mailbox, DNS

**Why:** hosts the static site, registers askhemant.ai and askhemant.com, and gives you the hello@ mailbox.
**Cost:** Premium Web Hosting ~₹149–249/month intro on a 48-month prepay (~₹7,150–12,000 up front), renewing at ~₹449+/month. askhemant.ai: $89.99–99.99 first year, $109.99/yr renewal, **2-year minimum** (~₹16.7–18.5K up front, estimate). askhemant.com: free in year 1 with Premium, then ~₹1,499/yr. Mailbox: free in year 1, then ~$1–1.6 per mailbox per month.
**Detailed steps:** [`01-brand-and-domain.md`](./01-brand-and-domain.md) §4 and [`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md) §1–8. The short version:

### 2.1 Search and check (before paying)
1. **hostinger.com/in** (India store, ₹ prices) → **Domains → Domain name search** → `askhemant.ai`, `askhemant.com`.
2. Both must show the **standard** price. If either says **"premium"**, stop and use the backups in [`01-brand-and-domain.md`](./01-brand-and-domain.md) §1.

### 2.2 Buy
1. **Hosting → Web Hosting → Premium.** 48 months = lowest monthly rate; 12 months = less cash now.
2. Create the Hostinger account with an email you will always reach. Turn on **2FA** in the account settings straight away *(UI path unverified)*.
3. Claim the **free domain: `askhemant.com`** during onboarding or in hPanel → Domains.
4. **Domains → Get a new domain → `askhemant.ai` → 2-year term** (the minimum). Add WHOIS privacy if offered for .ai *(availability unverified)*.
5. Registrant: your **real legal name, address, phone and email**. Download every invoice.

### 2.3 Verify the domains
1. Click the **registrant verification email** the moment it arrives ([Hostinger docs](https://docs.hostinger.com/domains/registering)). Unverified domains can be suspended; the exact deadline is unverified.
2. hPanel → Domains: both **Active**, **auto-renew ON**, **transfer lock ON** *(UI path unverified)*.
3. Check ownership at [lookup.icann.org](https://lookup.icann.org) (for .ai, use the .ai registry WHOIS if ICANN shows nothing).
4. Calendar reminders 30 days before each renewal (§25).

### 2.4 Website and SSL
1. hPanel → **Websites** → add a website (**empty / upload your own**, not the builder) with **askhemant.ai** as the main domain *(UI path unverified)*.
2. **Security → SSL**: install the free certificate for `askhemant.ai` and `www.askhemant.ai`; turn on **Force HTTPS** if offered. The site's `.htaccess` also forces HTTPS and sends `www` to the bare domain.
3. **askhemant.com → 301 redirect → https://askhemant.ai** (hPanel → Domains → Redirect), plus SSL on the .com so `https://askhemant.com` doesn't warn before redirecting.
4. Upload the site with **File Manager** or the **GitHub Action over FTP** (§24). **Do not use hPanel → Advanced → Git** for this repo: it publishes the whole repository root, which would put `docs/` and `sales/` on the public site ([`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md) §6).

### 2.5 DNS records (hPanel → Domains → askhemant.ai → DNS)
Domains bought at Hostinger use Hostinger's nameservers (usually `ns1.dns-parking.com`, `ns2.dns-parking.com`), so most records appear automatically.

| Record | Value | Why | Status |
|---|---|---|---|
| A / CNAME for `@` and `www` | Set by hPanel when the website is added | The site | Automatic |
| MX, SPF (`TXT v=spf1 …`), DKIM | Set by hPanel when the mailbox is created | Mail delivery | Usually automatic *(unverified)* — check they exist |
| DMARC `TXT` on `_dmarc` | Start with `v=DMARC1; p=none; rua=mailto:hello@askhemant.ai` if none exists | Deliverability, spoofing reports | Add by hand if missing *(general knowledge)* |
| Google Search Console `TXT` | The `google-site-verification=…` value Search Console gives you | Verify the domain property (§12) | Add on Wed 21 Oct |
| A record `n8n` → your VPS IP | Only if you want `n8n.askhemant.ai` instead of the VPS's default hostname | n8n with your own domain (§3) | Optional |

### 2.6 Mailbox hello@askhemant.ai
1. hPanel → **Emails** → create **hello@askhemant.ai** (Premium includes 2 mailboxes per website, free for year 1).
2. Strong password + 2FA if the webmail offers it *(unverified)*.
3. Signature: `Hemant · AskHemant · No lead left on read. · askhemant.ai · @askhemant`.
4. Send a test to Gmail; it must not land in spam. If it does, re-check SPF/DKIM/DMARC.
5. Optional: forward to your Gmail, or add the account to your phone's mail app (IMAP/SMTP settings are in hPanel → Emails → Connect apps *(UI path unverified)*). n8n can send email through this mailbox's SMTP (§3).

---

## 3. Hostinger VPS with n8n

**Why:** runs n8n for your own funnel (case study #0: Tally/Cal.com → Sheet → WhatsApp/email alerts) and the demo lab (Skyline Realty – DEMO, SmileCare Dental – DEMO).
**Cost:** KVM 2 (2 vCPU, 8 GB RAM, 100 GB NVMe, 8 TB bandwidth): ~$6.99–8.99/month on promo terms, ~$14.99/month at renewal; prepay ~₹8.4–19K depending on term; 30-day money-back. On the **lean path**, buy it in week 2.
**Workflow files and wiring:** [`automations/README.md`](../automations/README.md) is the source of truth; follow it if it differs from this section.

1. hPanel → **VPS → KVM 2** → choose the term at checkout → OS/template: **n8n** (the one-click template).
2. Set a long root password and add your **SSH key**; disable password SSH later if you're comfortable *(general knowledge)*.
3. Hostinger VPS **firewall**: allow only 22 (SSH), 80 and 443 *(UI path unverified)*.
4. Open the n8n URL hPanel shows → create the **owner account** with hello@askhemant.ai → turn on **2FA** in n8n's personal settings *(feature availability unverified)*.
5. Settings to check (environment variables on the VPS; the template may already set some *(unverified)*):
   - `GENERIC_TIMEZONE=Asia/Kolkata` and `TZ=Asia/Kolkata`, so the 8 am digest and logs use IST.
   - `WEBHOOK_URL` = your public `https://` n8n address, so Tally and Cal.com webhooks point at the right host.
   - The signing secrets and the rest: the full list is in §1 ("n8n environment variables") and [`automations/README.md`](../automations/README.md) §3.
6. **Credentials inside n8n** (never in the repo):
   - Google Sheets (OAuth2 with your Google account, or a service account shared on the Sheet) → uses `{{GOOGLE_SHEET_ID}}`.
   - SMTP: hello@askhemant.ai (Hostinger SMTP host and port are in hPanel → Emails *(unverified)*).
   - WhatsApp Cloud API token (§13).
   - AI API key with a spending limit (§23).
7. **Import the workflow JSONs** from [`automations/`](../automations/README.md), fill each workflow's **Config** node in the n8n editor (besides `{{GOOGLE_SHEET_ID}}`, it asks for a few n8n-only values such as the WhatsApp phone-number ID, your alert number and the calculator `/copy` link; the README lists them), activate, and copy each **production** webhook URL into Tally (§10) and Cal.com (§9).
8. **Backups:** enable Hostinger's VPS backups/snapshots *(frequency unverified)*, and after every workflow change **download the workflow JSON** and save it to `automations/` (with tokens put back as placeholders).
9. Update n8n monthly; read the release notes first.

---

## 4. Google account

**Why:** Google Calendar (Cal.com conflicts), **Google Meet** (all calls), **Google Sheets** (pipeline, scorecard, calculator), **GA4**, **Search Console**, **YouTube**.
**Cost:** ₹0 on a free Google account.

1. Use one Google account for the business (your existing one, or a new one). 2-Step Verification ON with an authenticator app or passkey; backup codes offline.
2. Google Calendar: create a calendar named **AskHemant** for bookings; keep personal events in your main calendar so Cal.com sees them as busy.
3. Google Meet on a free account: 1:1 calls are fine; group calls with 3+ people on free accounts have historically been capped at 60 minutes *(unverified)*. The Audit Workshop (60 min) and team trainings fit, but keep an eye on it.
4. Drive: a folder **AskHemant / Clients / <client>** per client; share only with that client.

---

## 5. Instagram Creator account (+ Threads)

**Why:** the main discovery channel and the start of the funnel (comment LEAKS → auto-DM).
**Cost:** ₹0. Skip Meta Verified at launch.
**Exact profile copy:** [`instagram/01-profile-setup.md`](../instagram/01-profile-setup.md) (and [`00-strategy.md`](./00-strategy.md) §5).

1. **Check, don't save, on your personal account:** Edit profile → Username → `askhemant`. Then **Add account → Create new account** → username **`askhemant`**. Backups in order: `askhemant.ai` → `hemantautomates` → `hemant.automates`.
2. **Switch to professional → Creator:** Settings → *Account type and tools* → Switch to professional account → **Creator** → category e.g. "Entrepreneur" (hide the label if it looks odd) *(UI path unverified)*. Creator is free and reversible.
3. **Security, same day:** Accounts Center → Password and security → **Two-factor authentication → Authentication app**; save backup codes offline; confirm email (hello@askhemant.ai once it exists) and phone.
4. **Profile:**
   - Name field: `Hemant | AI Automation Consultant · Real Estate`
   - Bio (check it fits the 150-character limit in the app):
     ```
     AI + WhatsApp systems so no lead waits
     Real estate & clinics · India + UAE
     Fixed prices · live in 10 working days
     Free kit: comment LEAKS ↓
     ```
   - Photo: your face (head and shoulders) on Signal Indigo #4338CA.
   - **5 links** (first one shows): `askhemant.ai/book?utm_source=ig&utm_medium=bio` "Book a free Fit Call" · `askhemant.ai/kit` "Lead Leak Kit" · `askhemant.ai/pricing` · `wa.me/{{WHATSAPP_NUMBER}}?text=Hi%20Hemant%2C%20saw%20your%20Instagram` · `askhemant.ai/founding` (until Mon 30 Nov).
   - Contact options: **email** hello@askhemant.ai and **WhatsApp** (the business number) *(UI path unverified)*.
5. **Settings that matter for the funnel** *(UI paths unverified)*:
   - Messages and story replies → Message controls → **Connected tools → Allow access to messages: ON** (needed for Meta Business Suite inbox automations and, later, ManyChat).
   - Keep public posts eligible for search engines (on by default since July 2025 for professional accounts).
   - Comments: no filter that hides one-word comments (LEAKS must stay visible to the automation).
6. **Highlights:** Start Here · Pricing · Demos · Build Log · FAQ. **Results only once real results exist.** Covers: [`instagram/graphics/highlights/`](../instagram/graphics/highlights/).
7. **Threads:** open the Threads app → log in with @askhemant → same name and bio.
8. **Optional impersonation guard:** also register `@askhemant.ai`, set it private, bio "Official account: @askhemant".
9. **Don't:** buy handles; use "official" or "verified" in the name; mass-follow or mass-DM from the new account.
10. **Trial reels:** in the Reel share screen, look for the **Trial** toggle (professional accounts; eligibility can lag on new accounts). If it's missing, see [`02-launch-checklist.md`](./02-launch-checklist.md) "Trial reels".

---

## 6. Facebook Page

**Why:** Meta Business Suite's Instagram inbox automations (Comment to Message) and some DM tools have historically needed the Instagram account linked to a Facebook Page *(current requirement unverified)*; it also reserves the name.
**Cost:** ₹0.

1. From your personal Facebook profile: **Pages → Create new Page** → name **AskHemant** → category e.g. "Business consultant" *(exact category label unverified)*.
2. Username `@askhemant`; website https://askhemant.ai; email hello@askhemant.ai; city `{{CITY}}` (or leave the address hidden).
3. Profile photo: the same face photo as Instagram. Cover: [`brand/logo/wordmark-1600.png`](../brand/logo/wordmark-1600.png) on Paper, or plain Indigo.
4. Button: **Send WhatsApp message** to the business number *(UI path unverified)*.
5. Link Instagram: Page **Settings → Linked accounts → Instagram → Connect** (or Accounts Center) *(UI path unverified)*.
6. Posting: optional. Cross-posting Reels to the Page is fine but not a priority.

---

## 7. Meta Business Suite, business portfolio and Comment to Message

**Why:** the free comment-keyword → DM automation for month 1, post scheduling, and the business portfolio that clients will add you to as a **partner** during onboarding.
**Cost:** ₹0.

### 7.1 Business portfolio (formerly "Meta Business Manager")
1. On a **desktop**, go to business.facebook.com → **Create a business portfolio** → name **AskHemant**, your name, business email hello@askhemant.ai *(naming and path unverified: Meta has renamed Business Manager to "business portfolio")*.
2. **Business settings → Accounts:** add the **AskHemant Page** and the **@askhemant Instagram account**.
3. **Security Center:** require two-factor authentication for everyone in the portfolio *(UI path unverified)*.
4. Note your **Business portfolio ID** (Business settings → Business info). Clients use it to add you as a **partner** with access to their Page, ad account and WhatsApp account: see [`sales/06-client-onboarding-checklist.md`](../sales/06-client-onboarding-checklist.md). **Never ask clients for passwords.**
5. Business verification is not needed for launch. It matters later for the WhatsApp Cloud API's higher limits (§13) *(unverified)*.

### 7.2 Comment to Message (LEAKS and PRICE)
Reported limits, **not verified here**: up to 5 keywords per automation; exact, case-sensitive matching; each keyword in only one automation; desktop-only setup; replies may wait about 15 minutes for a human first ([`research/instagram-playbook.md`](./research/instagram-playbook.md) §7). Full playbook and fallbacks: [`instagram/07-dm-automation-playbook.md`](../instagram/07-dm-automation-playbook.md).

1. Business Suite (desktop) → **Inbox → Automations → Comment to Message** → create *(UI path as reported; unverified)*.
2. **Automation 1 "LEAKS"** — channel Instagram; applies to all posts and Reels (or the specific post, if that's the only option); keywords **`LEAKS, Leaks, leaks, LEAK, leak`**; private message, exactly:
   > Here's your Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=leaks. Quick question so I can point you to the right fix: what do you sell, and where do most of your leads come from (portals, Meta ads, Instagram, referrals)?
3. **Automation 2 "PRICE"** — keywords **`PRICE, Price, price, PRICES, prices`**; private message, exactly:
   > My full price list → askhemant.ai/pricing. What's the one thing you'd automate first?
4. **Automation 3 "FOUNDING"** (optional; the Instagram plan adds it for P06 and T03) — keywords **`FOUNDING, Founding, founding`**; private message, exactly as in [`instagram/02-launch-posts.md`](../instagram/02-launch-posts.md):
   > Here are the founding-client details → askhemant.ai/founding?utm_source=ig&utm_medium=dm&utm_campaign=founding. 3 slots at ₹14,999 / $599 (prices exclude GST), closing Mon 30 Nov 2026 or when full. To check the fit: what do you sell, and roughly how many enquiries do you get a month?

   If you'd rather not run a third automation, answer FOUNDING comments by hand within 4 working hours. **After the founding close** (Mon 30 Nov 2026 23:59 IST, or earlier when full), **edit the message to the closed text** in [`instagram/07-dm-automation-playbook.md`](../instagram/07-dm-automation-playbook.md) §2.3 rather than deleting the automation, so late commenters still get an honest answer.
   **Live by:** LEAKS **Mon 19 Oct 15:00** (P01) · PRICE **Tue 20 Oct 15:00** (P02) · FOUNDING **Mon 26 Oct 15:00** (P06).
5. If the tool offers a **public reply** to the comment, use: "Sent! Check your message requests." (it nudges non-followers to look in Requests).
6. **Test from a second Instagram account** on each live post: comment the keyword in each case variant; the DM must arrive (in **message requests** for non-followers). Delete test comments afterwards.
7. **DM keyword for Stories and Lives (Thu 22 Oct):** add a DM-keyword automation for **`KIT, Kit, kit`** that sends the same kit reply (with `utm_campaign=story`). Story and Live CTAs always say "DM me KIT" (comments on posts keep using LEAKS), which avoids any clash with the LEAKS comment automation ([`instagram/07-dm-automation-playbook.md`](../instagram/07-dm-automation-playbook.md) §2.4).
8. **Month 2 (from Mon 16 Nov):** add **Automation 4 "CLINIC"** (`CLINIC, Clinic, clinic, CLINICS, clinics`). Until *The Missed-Call Recovery Playbook* exists, it sends the same Lead Leak Kit (which has clinic lines); switch the link when the playbook is published ([`instagram/07-dm-automation-playbook.md`](../instagram/07-dm-automation-playbook.md) §4.4).
9. **Rules every tool must obey** ([Meta docs](https://developers.facebook.com/docs/instagram-platform/private-replies/)): one private reply per comment, sent within 7 days; follow-ups only within 24 hours of the person's reply; every message requested; no cold mass DMs.
10. **Planner:** Business Suite → Planner can schedule posts and Reels for Instagram and the Page, which you need for Diwali (Fri 6 – Tue 10 Nov), Christmas and New Year *(Reel scheduling support unverified; Instagram's in-app scheduling is the fallback)*.

---

## 8. WhatsApp Business app

**Why:** your own sales channel: catalogue of offers, quick replies, labels as a mini-pipeline, 2-hour call reminders, the `wa.me` link.
**Cost:** ₹0.
**Produces:** `{{WHATSAPP_NUMBER}}`.

1. **Number:** a **dedicated SIM** is best, so personal chats stay separate. Write it digits-only with country code (e.g. `9198XXXXXXXX`) → `{{WHATSAPP_NUMBER}}`.
   - A number registered in the WhatsApp Business **app** can't simply be used on the **Cloud API** at the same time; Meta has a "coexistence" onboarding for that, whose availability was not checked *(unverified)*. Plan on using **a separate number** for any API sending (§13).
2. **Security:** Settings → Account → **Two-step verification** (6-digit PIN + email); daily chat backup to Google Drive.
3. **Business profile** (Settings → Business tools → Business profile *(UI path unverified)*):
   - Name: **AskHemant** · Category: Professional services (nearest match) *(label unverified)*
   - Description: `AI + WhatsApp lead systems for real-estate brokers and clinics. Fixed prices, live in 10 working days, built on your own accounts. No lead left on read.`
   - Address: `{{CITY}}`, India (or hidden) · Email: hello@askhemant.ai · Websites: https://askhemant.ai and https://instagram.com/askhemant
   - Business hours (suggested): **Mon–Sat 10:00–19:00 IST**. This matches "WhatsApp support during IST business hours" in Lead Desk Care.
4. **Catalogue** (Business tools → Catalogue). One item per offer, prices in ₹, each description ending "Price excludes GST. Full details: askhemant.ai/pricing". International buyers see USD on the website instead.

   | Item | Price | One-line description |
   |---|---|---|
   | Lead Leak Kit | Free | 7 places enquiries go cold + 10 WhatsApp templates. askhemant.ai/kit |
   | Fit Call (20 min) | Free | Diagnosis and an honest yes or no on fit. Intake form required. askhemant.ai/book |
   | Ask Hemant Session (45 min) | ₹1,999 | Any AI or automation question; recording + written action list within 24 hours; 100% credited to an Audit or build booked within 14 days |
   | Lead Leak Audit | ₹9,999 | 5 working days; Leak Report, lead-flow map, ROI worksheet on your numbers, fixed quote; 100% credited to a Sprint booked within 30 days |
   | Founding Client Pilot | ₹14,999 | Audit + Solo or Clinic Sprint, 3 slots, closes Mon 30 Nov 2026 or when full; measured before/after in return. **Hide this item after it closes** |
   | Speed-to-Lead Sprint (Solo) | ₹34,999 | Up to 3 lead sources, instant WhatsApp first reply, AI qualifier, visit booking + reminders, 30-day follow-up; live in 10 working days after access |
   | Speed-to-Lead System (Team) | ₹79,999 | Up to 6 sources and 10 agents, assignment, CRM, manager dashboard; 15 working days |
   | Missed-Call & No-Show Recovery Sprint | ₹34,999 | For clinics: missed call → WhatsApp text-back, booking, reminders, review and recall; 10 working days |
   | Quick Win Build | ₹24,999 | One workflow of up to about 10 steps; 7–10 working days |
   | Lead Desk Care | ₹9,999/month | Monitoring, fixes within 1 working day, 2 small changes a month, monthly report |
   | Lead Desk Growth | ₹24,999/month | Care + 1 new automation a month; 3-month minimum |
   | Custom AI Agent / AI Product Build | From ₹1,50,000 | Scoped only after an Audit; 4–8 weeks |

   Collections: *Start here* (Kit, Fit Call, Session) · *Audit & Sprints* · *Retainers* · *Other builds*.
5. **Quick replies** (Business tools → Quick replies; type `/` in a chat). Minimum set below; fuller texts may live in [`automations/whatsapp-templates.md`](../automations/whatsapp-templates.md) and [`sales/07-follow-up-templates.md`](../sales/07-follow-up-templates.md):
   - `/kit` — "Here's the free Lead Leak Kit: askhemant.ai/kit. What do you sell, and where do most of your leads come from?"
   - `/price` — "My full price list, all prices published: askhemant.ai/pricing (prices exclude GST). What's the one thing you'd automate first?"
   - `/book` — "Happy to map your lead flow on a free 20-min Fit Call: askhemant.ai/book. I'll only pitch if it's a fit."
   - `/audit` — "Here's the Lead Leak Audit payment link (₹9,999, 100% credited to a Sprint booked within 30 days): {{RAZORPAY_AUDIT_LINK}}"
   - `/session` — "Here's the Ask Hemant Session link (45 min, ₹1,999): {{RAZORPAY_SESSION_LINK}}. Outside India: {{PAYPAL_SESSION_LINK}} ($99)."
   - `/confirm` — "Hi [Name], a quick reminder: our 20-min Fit Call is today at [time] IST on Google Meet: [link]. Reply 1 to confirm."
   - `/notfit` — "Thanks for the detail. Honestly, a full system isn't the right fit yet. The free kit covers the quick fixes (askhemant.ai/kit), and if you'd like an hour of focused help, the Ask Hemant Session is ₹1,999 / $99: askhemant.ai/book."
6. **Labels** (matching the pipeline stages): New · Replied · Call booked · Showed · Proposal · Won · Lost, plus lane labels **RE · CL · GEN**, plus Founding and Client. (The app's label limit is reported as 20 *(unverified)*.)
7. **Greeting message** (to new contacts):
   > Hi, this is Hemant from AskHemant. Thanks for messaging. Tell me what you sell and where your leads come from, and I'll reply personally within 4 working hours. Free Lead Leak Kit: askhemant.ai/kit
8. **Away message** (outside business hours):
   > Thanks for your message. I'm offline right now and will reply personally on my next working morning (Mon–Sat, IST). Prices: askhemant.ai/pricing · Free 20-min Fit Call: askhemant.ai/book
9. **Links:** `https://wa.me/{{WHATSAPP_NUMBER}}?text=Hi%20Hemant%2C%20saw%20your%20Instagram` (Instagram bio link 4). The website builds its own link with "Hi Hemant, I found you on askhemant.ai". Business tools → **Short link / QR code** is optional.
10. **Never** add people to broadcast lists or groups without their opt-in; no cold blasting.

---

## 9. Cal.com

**Why:** the free, gated Fit Call booking (embedded at askhemant.ai/book), plus hidden events for paid work.
**Cost:** ₹0 (Cal.com Free: unlimited event types, 1 user, Cal.com branding shown ([Costbench](https://costbench.com/software/scheduling/cal-com/free-plan/))).
**Produces:** no token; the username `askhemant` and slugs are already in `config.js`.

1. **Sign up** at cal.com with your Google account (or hello@) → username **`askhemant`** (if taken, change `calUsername` in `config.js`). 2FA ON (Settings → Security).
2. **General:** timezone **Asia/Kolkata**; time format 12-hour or 24-hour (your choice); week starts Monday.
3. **Calendars:** connect Google Calendar → check conflicts on your main and AskHemant calendars → add new events to the **AskHemant** calendar.
4. **Apps:** install **Google Meet** → set it as the **default conferencing app**.
5. **Appearance:** brand colour **#4338CA** *(setting location unverified)*; avatar = your photo; display name "Hemant · AskHemant".
6. **Availability schedules:**
   - **"Fit Calls"**: Tue, Wed, Thu **11:00–13:00** and **16:00–18:00 IST**, plus **2 evening slots** for the UK and US East: **Tue 19:30–19:50** and **Thu 20:30–20:50 IST** (both inside the strategy's 19:30–21:00 window; widen them if UK/US demand appears).
   - **"Paid work"** (suggested): Mon–Fri 11:00–13:00 and 15:00–18:00 IST, plus Tue/Thu 19:30–21:00. Needed so a paid Session can happen **within 48 hours**.
7. **Event types:**

   | Event | Slug | Length | Visibility | Schedule | Key settings |
   |---|---|---|---|---|---|
   | **Fit Call** | `fit-call` | 20 min | **Public** | Fit Calls | Limit to **6 bookings per week** (Limits tab *(unverified)*); minimum notice 12 hours (time to read the intake); 10-min buffer after; book up to 21 days ahead; Google Meet; the **7 intake questions** from [`sales/02-cal-com-intake-form.md`](../sales/02-cal-com-intake-form.md) (business type, city or market, lead sources, leads a month, current reply speed, the task to fix first, budget band <₹15K / ₹15–40K / ₹40K–1L / ₹1L+ with USD equivalents), all required, plus the booker's WhatsApp number |
   | **Ask Hemant Session** | `ask-hemant-session` | 45 min | Hidden (link sent after payment) | Paid work | Minimum notice 4 hours; question "What do you want to ask?" |
   | **Audit Workshop** | `audit-workshop` | 60 min | Hidden | Paid work | Sent after the ₹9,999 / $499 Audit payment |
   | **Kickoff** | `kickoff` | 45 min | Hidden | Paid work | Sent after the deposit and signed agreement |
   | Audit Review (optional) | `audit-review` | 30 min | Hidden | Paid work | The Audit's 30-minute review call |

   Hidden event types were not verified ([`research/tooling-and-ops.md`](./research/tooling-and-ops.md) §2). If "hidden" isn't available, keep those events out of your public profile by sending their links by hand.
   **Fit Call description:** "A 20-minute diagnosis of your lead flow and an honest yes or no on fit. Free. I'll only pitch if it's a fit." **Routing:** anyone under ₹15K or outside the niche gets the Kit and the Session link instead (template `/notfit` in §8; full rule in [`sales/02-cal-com-intake-form.md`](../sales/02-cal-com-intake-form.md)).
8. **Reminders:** the booking confirmation email is standard. A 24-hour email reminder through **Workflows** may need a paid plan *(unverified)*. The **2-hour WhatsApp reminder** ("Reply 1 to confirm") is sent by hand from the WhatsApp Business app (`/confirm`).
9. **Webhooks → n8n** (Settings → Developer → Webhooks; triggers: booking created, rescheduled, cancelled). Webhooks on the free plan are unverified; if missing, add booking rows to the Sheet by hand.
10. **Test:** book a Fit Call through `askhemant.ai/book/?utm_source=test&utm_medium=check`, check the UTM and answers on the booking, then cancel.

---

## 10. Tally

**Why:** the kit bonus form (the calculator gate, which also feeds the day-60 niche data) and the client onboarding form.
**Cost:** ₹0 (unlimited forms and submissions under fair use; Tally branding on free).
**Produces:** `{{TALLY_KIT_FORM_ID}}`.

Sign up with hello@askhemant.ai; 2FA if offered *(unverified)*.

### 10.1 Kit form: "Lead Leak Calculator"
Matches [`website/kit/index.html`](../website/kit/index.html) ("four quick fields … a separate, unticked box").

| # | Field | Type | Required | Options / notes |
|---|---|---|---|---|
| 1 | First name | Short answer | Yes | |
| 2 | WhatsApp number | Phone number | Yes | Default country India |
| 3 | Business type | Dropdown | Yes | `Real estate (broker, agent, channel partner, developer)` · `Clinic (dental, skin/aesthetic, physio, other)` · `Agency (I run ads or marketing for clients)` · `Other business`. n8n maps these to lanes RE / CL / GEN / GEN. If [`automations/README.md`](../automations/README.md) lists different labels, use those: n8n matches on the label |
| 4 | Leads a month | Dropdown | Yes | `Under 20` · `20–40` · `40–100` · `100–500` · `500+` |
| 5 | Marketing consent | **Checkbox, unticked, not required** | No | "Yes, AskHemant may send me WhatsApp tips and follow-ups about lead systems. I can reply STOP at any time." |
| — | Notice (text block above the button) | Text | — | "Your details go to Tally, then to Hemant's Google Sheet. Privacy notice: askhemant.ai/privacy" |
| — | Hidden fields | Hidden | — | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `source` (the site passes them in automatically, per [`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md) §5; the kit workflow reads the `utm_*` fields to fill the source and keyword columns) |

- **Thank-you page:** "Here's your Lead Leak Calculator → [Google Sheet `/copy` link]. Make a copy and type your own numbers. Your numbers, your estimate. Not a promise. Next: book a free 20-min Fit Call at askhemant.ai/book." How to make the `/copy` link: [`lead-magnet/README.md`](../lead-magnet/README.md). Paste it by hand here, and into the kit workflow's Config node in n8n ([`automations/README.md`](../automations/README.md)).
- **Integrations → Webhooks** → the n8n production webhook URL of `automations/01-kit-signup-to-pipeline.json`, with a **signing secret**: the workflow rejects unsigned calls, so put the same secret into n8n as described in [`automations/README.md`](../automations/README.md) *(Tally webhook availability on free: unverified)*. Also turn on Tally's email notification to hello@ as a backup.
- **Keep the labels as written:** the workflow finds fields by label ("First name", a phone field, "Business type", "Leads a month", a consent checkbox whose text mentions "tips"/"follow-ups") and maps the business type to a lane by its words (real estate/broker/channel partner/developer → RE; clinic/dental/derm/physio → CL; anything else → GEN).
- **Publish → Share:** the link is `tally.so/r/<ID>` → `<ID>` = `{{TALLY_KIT_FORM_ID}}` → `config.js`.

### 10.2 Onboarding form: "AskHemant client onboarding"
Fields follow [`sales/06-client-onboarding-checklist.md`](../sales/06-client-onboarding-checklist.md): legal business name, GSTIN (optional), billing address, main contact and WhatsApp, lead sources with monthly volumes, the client's **Meta business portfolio ID** (so they can add you as a partner), the WhatsApp number to use for the API (owned by the client, in the client's name), preferred WhatsApp provider (BSP) if any, CRM, booking calendar, agents who get hot-lead alerts, business hours, FAQ/price-list document, and (founding clients) measurement and publication consent.
- **Never collect passwords or OTPs.** Access is granted by partner invites and admin roles.
- File uploads on Tally's free plan are unverified; if missing, ask for a shared Drive folder instead.

---

## 11. Web3Forms

**Why:** the home-page contact form on a static site, with no backend.
**Cost:** ₹0 (250 submissions a month, history kept 30 days, no webhooks on free).
**Produces:** `{{WEB3FORMS_ACCESS_KEY}}`.

1. web3forms.com → enter **hello@askhemant.ai** → the access key arrives by email.
2. Paste it into `config.js` **and** the hidden field in [`website/index.html`](../website/index.html) (the `sed` command in [`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md) §5 does both).
3. In the dashboard, restrict the key to `askhemant.ai` if offered; keep spam protection on.
4. Test: send a message from the live site → it arrives at hello@ and the "Thanks" state shows. Once, test with JavaScript off to confirm the redirect back to `https://askhemant.ai/#message-sent`.

---

## 12. GA4, Microsoft Clarity and Search Console

**Why:** see which posts and links bring bookings (UTM-tagged), and where visitors get stuck.
**Cost:** ₹0.
**Produces:** `{{GA4_MEASUREMENT_ID}}`, `{{CLARITY_PROJECT_ID}}`.

### GA4
1. analytics.google.com → Admin → **Create account** "AskHemant" → property **askhemant.ai**, reporting time zone **India (GMT+05:30)**, currency **INR**.
2. **Data stream → Web** → `https://askhemant.ai`, enhanced measurement ON → copy the **Measurement ID** `G-…` → `{{GA4_MEASUREMENT_ID}}` → `config.js`.
3. Admin → Data collection and modification → **Data retention → 14 months** (the privacy notice says so).
4. After the site sends them (allow up to 24–48 hours), mark as **key events**: `kit_submit`, `book_click`, `whatsapp_click`, `pay_click`, plus `book_complete`, `contact_submit`, `kit_download`.
5. Optional: define your own IP as internal traffic and filter it.

### Microsoft Clarity
1. clarity.microsoft.com → sign in → **New project** "askhemant.ai", URL https://askhemant.ai.
2. Settings → Overview → copy the **Project ID** → `{{CLARITY_PROJECT_ID}}` → `config.js`.
3. Settings → **Masking → Strict** (masks all text by default; safest for personal data) *(setting name unverified)*.
4. The site loads GA4 and Clarity only when the IDs are set and never for visitors who opt out.

### Search Console
1. search.google.com/search-console → **Domain** property `askhemant.ai` → add the TXT record in Hostinger DNS (§2.5) → Verify.
2. Sitemaps → submit `https://askhemant.ai/sitemap.xml`.

---

## 13. WhatsApp Cloud API for your own automations

**Why:** n8n needs an API number to send the **WhatsApp welcome** to people who ticked consent on the kit form, and to run the demo lab. The WhatsApp Business **app** (§8) cannot be driven by n8n.
**Cost:** Meta per-message fees: about ₹0.86 per marketing message and ₹0.13 per utility message in India (one reseller's list, [MyOperator](https://support.myoperator.com/portal/en/kb/articles/whatsapp-has-shifted-to-per-message-pricing-effective-july-1-2025-based-on-message-categories-and-your-recipient-s-country-in-india-there-are-three-paid-categories)); replies inside the 24-hour customer-service window are free ([Meta](https://developers.facebook.com/docs/whatsapp/pricing)). Check Meta's live rate card.
**Follow [`automations/README.md`](../automations/README.md)** for the exact method (direct Cloud API or a BSP); this is the outline.

1. developers.facebook.com → create an app (type **Business**), owned by the AskHemant business portfolio → add **WhatsApp**.
2. Use Meta's **test number** for the demo lab first *(test-number limits unverified)*.
3. For real sending: add a **separate number** that is not on the WhatsApp Business app, set the display name "AskHemant", add a payment method.
4. Create a **system user** in Business settings and generate a permanent access token → paste it into n8n credentials only.
5. Submit the welcome message as a **template** for approval (see [`automations/whatsapp-templates.md`](../automations/whatsapp-templates.md)); send it only to people who ticked the consent box; honour every STOP.
6. **Graph API version:** the workflows call `graph.facebook.com` with the Graph API version set in each workflow's Config node. Before Meta retires that version, change it there (test on the demo first); [`automations/README.md`](../automations/README.md) §9 has the current note.
7. Every bot is scoped to one business: general-purpose AI chatbots are banned on the WhatsApp Business Platform since 15 Jan 2026 ([respond.io](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban)).

---

## 14. Razorpay

**Why:** India payments with no website integration: payment pages and links sent on WhatsApp or linked from the site.
**Cost:** **2% + GST** per domestic payment; 3% + GST for international cards (separate activation) ([Razorpay](https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/)). No monthly fee.
**Produces:** `{{RAZORPAY_SESSION_LINK}}`, `{{RAZORPAY_AUDIT_LINK}}`, `{{RAZORPAY_FOUNDING_LINK}}`.

### 14.1 Account and KYC (start Mon 19 Oct)
1. dashboard.razorpay.com → sign up with hello@askhemant.ai and your mobile → 2FA ON.
2. Business type: individual / unregistered (PAN-based). Individuals can usually sign up without GST registration *(general knowledge, unverified)*; labels vary.
3. Documents: PAN, Aadhaar, a bank account **in your own name** for settlements, address.
4. Website: **https://askhemant.ai**. Razorpay's check usually looks for terms, privacy, refund/cancellation and contact details: [`website/terms/index.html`](../website/terms/index.html) §9 (refunds), [`website/privacy/index.html`](../website/privacy/index.html), hello@askhemant.ai. Confirm the refund defaults in terms §9 first.
5. Activation time varies *(unverified)*. Chase it daily in week 1: the exit check needs it.

### 14.2 Payment pages (reusable links for `config.js`)

| Page title | Amount | Customer fields | After payment (success message) | Token |
|---|---|---|---|---|
| **Ask Hemant Session (45 min)** | **₹1,999** | Name, email, WhatsApp, "What do you want to ask?" | "Thanks! Book your 45-min slot here: https://cal.com/askhemant/ask-hemant-session. The recording and a written action list arrive within 24 hours of the call." | `{{RAZORPAY_SESSION_LINK}}` |
| **Lead Leak Audit** | **₹9,999** | Name, email, WhatsApp, business name, GSTIN (optional) | "Thanks! Hemant will send the pre-audit form and your Audit Workshop booking link within 1 working day. 100% of this fee is credited to a Sprint booked within 30 days." | `{{RAZORPAY_AUDIT_LINK}}` |
| **Founding Client Pilot — 50% deposit** | **₹7,500** (50% of ₹14,999, rounded; the go-live balance is ₹7,499, so the total stays ₹14,999) | Name, email, WhatsApp, business name, GSTIN (optional) | "Thanks! Your founding slot is confirmed. Next: the onboarding form and kickoff link, sent today." | `{{RAZORPAY_FOUNDING_LINK}}` |

- Every description says **"Price excludes GST."** If you aren't GST-registered, don't add GST; once registered, follow your CA ([`sales/09-invoicing-and-tax-notes-india.md`](../sales/09-invoicing-and-tax-notes-india.md)).
- The founding page is shared **only** after selection and a signed agreement ([`sales/10-founding-client-program.md`](../sales/10-founding-client-program.md)). Disable it after Mon 30 Nov 2026 or when all 3 slots are taken.
- Copy each page's full `https://` URL into `config.js`.

### 14.3 Per-client payment links
- **Sprint deposits and balances** (50% to start, 50% at go-live; the first half is rounded up), e.g. Solo or Clinic Sprint ₹34,999 = ₹17,500 + ₹17,499; Team ₹79,999 = ₹40,000 + ₹39,999; founding balance ₹7,499. Quick Win ₹24,999 = ₹12,500 + ₹12,499 (**Decision for Hemant:** the strategy sets no Quick Win terms; 50/50 is the default shown, [`sales/04-pricing-sheet.md`](../sales/04-pricing-sheet.md) §1). Create a **Payment Link** per client with their name and the proposal number, expiring with the proposal (7 days).
- **Exit-check test:** a **₹1** Payment Link, paid with your own UPI on Sun 25 Oct, then refunded from the Dashboard.

---

## 15. Skydo and Wise Business

**Why:** international invoices (Dubai, UK, US clients) with a FIRA, which you need for GST export treatment later.
**Cost (Skydo's own claims):** **$19 flat under $2,000**, $29 for $2,001–10,000, 0.3% above $10,000; no FX markup; free FIRA; settles in about 24 hours ([Skydo](https://www.skydo.com/receive-international-payments-in-india/consultant)).

### 15.1 Skydo (main)
1. skydo.com → sign up → KYC (PAN, Aadhaar, bank account, business details) — start **Mon 19 Oct**.
2. Per client: create an **invoice in USD** using the USD prices (Audit $499, Founding $599, Solo Sprint $1,499, …); 50/50 split on Sprints, first half rounded up: $1,499 = $750 + $749; Team $2,999 = $1,500 + $1,499; Founding $599 = $300 + $299.
3. **Purpose code P0802** (software consultancy and implementation) on foreign payments, as the strategy says; confirm with your CA ([`sales/09-invoicing-and-tax-notes-india.md`](../sales/09-invoicing-and-tax-notes-india.md)). Avoid P1301/P1499 (personal income).
4. **Keep every FIRA** with the invoice.
5. See a CA **before the first foreign invoice** (GST registration becomes compulsory above ₹20 lakh a year including exports; an LUT needs registration ([Skydo](https://www.skydo.com/blog/gst-for-freelancers))).

### 15.2 Wise Business (backup only)
- Indian **personal** Wise accounts reportedly stopped receiving payments on 5 Apr 2026 ([Winvesta](https://www.winvesta.in/blog/wise-vs-winvesta-which-is-actually-better-for-indian-freelancers-in-2026)); **business** accounts reportedly still work *(confirm in the app)*. Open one only if Skydo can't serve a client.
- **Stripe:** invite-only for new Indian accounts ([Stripe](https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india)). Don't plan around it.

---

## 16. PayPal

**Why:** only for the **$99 Ask Hemant Session** from international buyers who want to pay instantly.
**Cost:** about **4.4% + $0.30** per payment, plus currency conversion.
**Produces:** `{{PAYPAL_SESSION_LINK}}`.

1. paypal.com/in → **Business account** → link your bank account and PAN → 2FA ON.
2. **Pay links and buttons** → create a payment link: "Ask Hemant Session (45 min)", **$99**, quantity 1, note field "What do you want to ask?" *(menu name unverified)*.
3. Copy the URL (it looks like `https://www.paypal.com/ncp/payment/XXXX`) → `{{PAYPAL_SESSION_LINK}}` → `config.js`.
4. After each payment, send the Session booking link `https://cal.com/askhemant/ask-hemant-session` by email.
5. On withdrawal to India, choose the purpose code your CA confirms and keep the FIRC.

---

## 17. Loom

**Why:** the 3-minute proposal walkthrough, Field Test disclosure videos, the Sprint handover, and the Audit's 20-minute recorded walkthrough.
**Cost:** ₹0 on Free.

1. loom.com → sign up with hello@askhemant.ai → workspace "AskHemant".
2. Free-plan limits are reported as **25 videos and 5 minutes per video** *(unverified)*. That fits proposals (3 min) and disclosures (2 min) but **not the Audit's 20-minute recorded walkthrough** (or a long Sprint handover). For those: Loom's paid plan (upgrade when the first Audit is paid), or an OBS or phone recording shared unlisted via YouTube or Google Drive (link-only).
3. Settings: camera bubble on; sharing = anyone with the link (proposals); for client screens, share only with that client. **Blur or avoid any real personal data on screen** (DPDP).
4. Archive old disclosure videos to stay under the free limit.

---

## 18. Zoho Sign

**Why:** e-signature for the consulting agreement and the founding pilot terms before any deposit.
**Cost:** a free tier exists but its limits were **not researched**; check before relying on it.

1. sign.zoho.in (India data centre) → sign up with hello@askhemant.ai → 2FA ON.
2. Export [`sales/05-consulting-agreement-template.md`](../sales/05-consulting-agreement-template.md) (and the founding terms from [`sales/10-founding-client-program.md`](../sales/10-founding-client-program.md)) to PDF via Google Docs → **Templates → New** → fields: client name, company, signature, date; your signature and date.
3. Signing order: **client first, then you**; automatic reminders every 2 days; expiry 7 days (matches proposal validity).
4. Have a CA or lawyer review the agreement template once before the first client.
5. If the free tier's monthly limit is too small, check current alternatives' free tiers then; nothing else was researched.

---

## 19. ManyChat (later)

**When:** decide at the **day-28 review (Sun 15 Nov)**. Switch when **more than 25 people a month comment**, because ManyChat Free stops at 25 contacts since 2 Mar 2026 ([ManyChat](https://manychat.com/blog/manychat-pricing-explained/)).
**Cost:** Essential ~$14–17/month (250 contacts); Pro ~$29–39/month (2,500 contacts; first tier with WhatsApp and AI). Confirm on manychat.com/pricing.
**Alternative:** your own n8n Instagram flow (a portfolio demo), if Meta's developer access for your account is practical *(unverified)*.

1. Connect @askhemant (requires "Allow access to messages", §5; a linked Facebook Page has historically been required *(unverified)*).
2. Rebuild **LEAKS**, **PRICE**, **FOUNDING** (until the close; then the closed text) and, from month 2, **CLINIC** as comment triggers, plus the LEAKS (or KIT) DM keyword, with exactly the same DM texts as §7.2.
3. **Turn off the matching Meta Business Suite automations** so nobody gets two DMs.
4. Send new contacts to the pipeline Sheet (ManyChat → webhook → n8n, or ManyChat's Sheets integration *(plan availability unverified)*).
5. Same rules: one private reply per comment within 7 days; follow-ups only within 24 hours of the person's reply; no broadcasts to people who didn't ask.
6. ManyChat's "Follow to DM" trigger is reportedly unavailable under 1,000 followers *(unverified)*; ignore it at launch.

---

## 20. Google Sheets pipeline

**Why:** the single pipeline tracker and weekly scorecard; n8n writes to it.
**Cost:** ₹0.
**Produces:** `{{GOOGLE_SHEET_ID}}` (n8n only).

1. Create **"AskHemant Pipeline"** in the business Google account. Keep it **private** (only you and the n8n credential).
2. Tabs:
   - **Pipeline** — the tab the workflows write to. Header row starts with the strategy's columns: `date` · `source` (UTM) · `keyword` · `lane` · `business_type` · `stage` (New → Replied → Call booked → Showed → Proposal → Won/Lost) · `value` ([`00-strategy.md`](./00-strategy.md) §5), followed by the lead, consent, reply-time and booking columns. **Copy the exact header row from [`automations/README.md`](../automations/README.md)**: n8n matches columns by header name, and Cal.com bookings land on the same row as the lead.
   - **Field tests** — test #, channel, sent at, first reply at, minutes to first reply, disclosure sent (y/n). Business names stay in this private sheet only; never published.
   - **Scorecard** — File → Import → upload [`kpi-scorecard.csv`](./kpi-scorecard.csv) → "Insert new sheet". Procedure: [`04-weekly-operating-system.md`](./04-weekly-operating-system.md) §4.
   - **Content** — import [`instagram/content-tracker.csv`](../instagram/content-tracker.csv) the same way.
   - **Outreach** and **Clients** (optional, by hand; n8n never touches them) — the outreach log from [`sales/11-warm-outreach-playbook.md`](../sales/11-warm-outreach-playbook.md) §5 and the consent log from [`sales/08-case-study-template-and-consent.md`](../sales/08-case-study-template-and-consent.md) §5.
   - The DEMO lab uses a **separate** spreadsheet (`{{DEMO_SHEET_ID}}`), never this one.
3. The ID is the part of the URL between `/d/` and `/edit` → `{{GOOGLE_SHEET_ID}}` → n8n Google Sheets nodes only.
4. It holds personal data: keep the retention period stated in the privacy notice and delete test rows after the exit check.

---

## 21. LinkedIn

**Why:** B2B buyers and Dubai brokerages live here; reposting every build costs little.
**Cost:** ₹0.

1. On your personal profile: custom URL **linkedin.com/in/askhemant** (or `/hemantkumar-askhemant` if taken). 2FA ON.
2. Headline: `AI + WhatsApp lead systems for real-estate brokers and clinics · Fixed prices, live in 10 working days · askhemant.ai`.
3. About: the positioning paragraph from [`00-strategy.md`](./00-strategy.md) §1, ending with the free Fit Call link. Contact info: website askhemant.ai, email hello@askhemant.ai.
4. **Featured:** askhemant.ai/book, askhemant.ai/kit, askhemant.ai/pricing.
5. What your Experience section shows is your call (strategy open question 12: "should anything stay private?").
6. **Week 2 (Mon 26 Oct):** one launch post to your network; no mass connection requests or automated messages.
7. **From month 2:** every Reel as a native video; every carousel as a **PDF document post** (export the carousel PNGs to one PDF); links tagged `?utm_source=li&utm_medium=social`.
8. Month 2 agency outreach: one-to-one LinkedIn messages to 10 agencies ([`sales/11-warm-outreach-playbook.md`](../sales/11-warm-outreach-playbook.md)).

---

## 22. YouTube Shorts

**Why:** a second home for every Reel, and searchable.
**Cost:** ₹0.

1. Claim the handle **@askhemant** on the business Google account (a Brand Account makes it easier to add a manager later *(general knowledge)*). Channel name **AskHemant**; description from the Instagram bio; links to askhemant.ai/book and askhemant.ai/kit.
2. **From month 2**, upload each Reel as a Short (vertical, under 60 seconds is always safe; the current maximum is reported as 3 minutes *(unverified)*): title with the buyer phrase (e.g. "WhatsApp automation for real estate: lead answered in under a minute (DEMO)"), description with `askhemant.ai/kit?utm_source=yt&utm_medium=shorts`, "Made for kids: No".
3. Keep "DEMO – fictional business" on screen and in the description of every demo. Use YouTube's altered/synthetic-content disclosure when a video contains realistic AI-generated people or voices *(policy detail unverified)*.
4. Long-form YouTube is a day-90 decision, not a launch task.

---

## 23. Content tools and AI API keys

| Tool | Why | Cost | Settings |
|---|---|---|---|
| Phone + **clip-on mic** | Talking-head hooks, Hinglish voiceovers | ~₹1,500–3,000 one-time *(estimate)* | Record at 1080p+, 30 fps, vertical; airplane mode while recording |
| **OBS Studio** | Screen-recorded demos | ₹0 | Canvas 1080×1920 for vertical demos (or 1920×1080, then crop); 30 fps; hide notifications; zoom about 1.25x on the action; demo data only, never real customer data |
| **Edits** (Instagram's editing app) | Cutting Reels, captions | ₹0 | Captions in Inter SemiBold, white on an 80% Ink box; DEMO badge top-left on every demo frame |
| **Canva Free** (optional) | Quick edits | ₹0 | The source of truth for carousels and covers is [`tools/render/`](../tools/render/) and [`instagram/graphics/README.md`](../instagram/graphics/README.md); Canva is a fallback |
| **OpenAI or Claude API** | AI qualifier in demos and n8n flows | ~₹500/month for demos *(estimate)*; client usage is billed to the client's own account | Set a **monthly spending limit**; keys only in n8n credentials; separate keys per project |

---

## 24. GitHub deploy secrets

**Why:** the workflow [`.github/workflows/deploy-website.yml`](../.github/workflows/deploy-website.yml) uploads only `website/` to Hostinger over FTP on every push to `main` that changes `website/**`.

1. hPanel → Files → **FTP Accounts**: note host, username, password (or create an FTP account rooted at `public_html`).
2. GitHub repo → Settings → Secrets and variables → Actions → secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`; optional variables `FTP_SERVER_DIR` (default `public_html/`) and `FTP_PROTOCOL` (`ftps` if supported).
3. GitHub account 2FA ON. Keep the repository **private**, and never commit API keys, passwords or the Sheet ID.
4. Full steps: [`website/DEPLOY-HOSTINGER.md`](../website/DEPLOY-HOSTINGER.md) §6 Option B.

---

## 25. Costs and renewal calendar

| Item | Up front *(estimate)* | Monthly *(estimate)* |
|---|---|---|
| askhemant.ai, 2-year minimum | ~₹16.7–18.5K | — |
| Hostinger Premium, 48-month prepay (askhemant.com free in year 1, hello@ mailbox) | ~₹7,150–12,000 | — |
| Hostinger KVM 2 VPS with n8n | ~₹8.4–19K depending on term | ~₹700 equivalent on promo; ~₹1,320 at renewal |
| Clip-on mic | ~₹1,500–3,000 | — |
| AI API credits for demos | — | ~₹500 |
| ManyChat Essential (only after more than 25 commenters a month) | — | ~₹1.2–1.5K |
| Cal.com, Tally, Web3Forms, GA4, Clarity, WhatsApp Business app, Canva Free, Loom Free, Edits, OBS | ₹0 | ₹0 |
| **Full stack total** | **~₹34–52K** | **~₹1.2–3.3K** |
| **Lean path** (Premium + .com only; VPS from week 2) | **~₹9–15K** | — |

Transaction fees on top: Razorpay 2% + GST; Skydo $19 per payment under $2K; PayPal about 4.4% + $0.30. Source: [`00-strategy.md`](./00-strategy.md) §5 "Launch budget".

**Renewal reminders** (set each 30 days ahead):
- askhemant.com: free year ends about Oct 2027 → ~₹1,499/yr.
- askhemant.ai: 2-year term ends about Oct 2028 → $109.99/yr.
- hello@ mailbox: bundled for year 1, then ~$1–1.6 per mailbox per month.
- Hostinger Premium: end of the prepaid term (renews at roughly 2.6–4.2x the intro rate).
- VPS: end of the promo term (~$14.99/month after).
- ManyChat, Loom, Zoho Sign: monthly, only if upgraded.

---

## 26. Everything still unverified

Check these the first time you open each product, and fix this file if anything differs.

1. Domain and handle availability (the 5-minute check, [`01-brand-and-domain.md`](./01-brand-and-domain.md) §6).
2. Hostinger menu paths (Websites, SSL, Redirect, Emails, DNS, VPS firewall), WHOIS privacy for .ai, the registrant-verification deadline, auto-added SPF/DKIM/DMARC, VPS backup frequency, and n8n template environment variables.
3. Instagram menu paths (Creator switch, contact options, "Allow access to messages"), trial-reel eligibility on a new account.
4. Whether Comment to Message still needs a linked Facebook Page; its keyword limits (5 per automation, exact and case-sensitive) and the ~15-minute delay; Reel scheduling in Business Suite Planner; the "business portfolio" naming.
5. WhatsApp Business app label limit (20), category names, and "coexistence" for using one number on both the app and the Cloud API.
6. Cal.com: hidden event types, weekly booking limits, brand colour setting, Workflows reminders and webhooks on the free plan.
7. Tally: webhooks and file uploads on the free plan; 2FA.
8. Clarity masking setting names; Google Meet free-plan limits for group calls.
9. WhatsApp Cloud API test-number limits; business verification thresholds.
10. Razorpay: unregistered-individual sign-up labels, activation time, international-card activation.
11. Skydo KYC requirements for individuals; AED support; purpose code P0802 vs P1006 (confirm with a CA).
12. PayPal payment-link menu name; Wise Business status for Indian businesses.
13. Loom free-plan limits (25 videos / 5 minutes); Zoho Sign free-tier limits (not researched at all).
14. ManyChat's Facebook Page requirement and Sheets integration plan.
15. YouTube Shorts maximum length and synthetic-content disclosure details.
16. (Decided, not unverified) Deposit splits round the first half up everywhere: Founding ₹7,500 + ₹7,499 ($300 + $299); Solo/Clinic Sprint ₹17,500 + ₹17,499 ($750 + $749).
