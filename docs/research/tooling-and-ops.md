# Tooling & Ops: Lean Stack and Business Setup for a Solo AI Automation Consultant (India, 2026)

Prepared for Hemant Kumar. Research date: 2026-10-18.

**Assumptions:** Hemant works solo from India and serves Indian SMBs plus remote clients in the US, UK, AU and UAE. Launch budget is small, there is no audience or case study yet, and the website is a static HTML site on Hostinger.

**How to read this:**
- Prices change often and differ by Hostinger storefront and billing term. Treat every figure as indicative and confirm it at checkout.
- Most figures come from 2025-2026 secondary sources. Where sources disagree, both figures are shown.
- Items marked **[general knowledge, not re-verified]** could not be checked because this run hit its web-search budget. Check them before relying on them.
- INR conversions assume **₹88 = US$1**. This rate is an estimate.

---

## 1. TL;DR: the recommended stack

| Job | Pick | Cost |
|---|---|---|
| Website hosting | Hostinger **Premium** web hosting (static HTML via File Manager or GitHub auto-deploy) | ~₹149-249/mo intro on a 48-month prepay, renewing at ~₹449-649/mo |
| Domain | `.ai` if the budget allows (2-year minimum); `.si` or `.com`/`.in` as cheaper options | .ai ≈ $89.99 for year 1, then $109.99/yr. .si ≈ $11.99, then $16.99/yr |
| Email (hello@domain) | Mailbox bundled with Premium (free for year 1), then Hostinger Business Starter | ₹0 in year 1, then ~$1-1.6 per mailbox per month |
| Booking | **Cal.com Free**: free discovery call, embedded on the site | ₹0 |
| Payments (India) | **Razorpay Payment Pages/Links** | 2% + 18% GST per transaction, no monthly fee |
| Payments (abroad) | **Skydo** or **Wise Business** for invoices; **PayPal** as a fallback for small or impulse payments | Skydo $19 flat under $2k; PayPal ~4.4% + $0.30 |
| Forms | **Web3Forms** (contact form) + **Tally** (longer "AI audit" intake) | ₹0 |
| Analytics | **GA4 + Microsoft Clarity** | ₹0 |
| Chat | **WhatsApp Business app** + wa.me click-to-chat links | ₹0 |
| Demo lab | Hostinger **KVM 2 VPS with the n8n template** (add once content needs live builds) | ~$7-9/mo promo, ~$15/mo renewal |

**Monthly cost (estimates):**
- **Bare minimum** (hosting + a cheap domain): ≈ **₹200-300/mo (US$2.3-3.4)**.
- **Recommended** (.ai domain + n8n VPS + ~₹500 of AI API credits for demos): ≈ **₹2,100/mo (~US$24)** in year 1, rising to ≈ **₹3,200/mo (~US$36)** at year-2 renewal prices.
- **Upfront cash** is the real hurdle, because the promo prices need long prepaid terms. A 48-month hosting prepay is about ₹7-12k, and a 2-year .ai registration is about ₹16-18k. Details are in §10.

---

## 2. Booking: Cal.com vs Calendly vs Google Calendar

| | Cal.com Free | Calendly Free | Google Calendar appointment schedules |
|---|---|---|---|
| Event types | Unlimited event types and calendar connections, 1 user, branding shown | 1 active event type, 1 calendar, no reminders to invitees | Free personal accounts get 1 booking page |
| Paid bookings | Stripe and PayPal reportedly available on Free (per aggregators) | Not on Free; Standard (~$10-12/user/mo) adds Stripe/PayPal | Paid Workspace plan + **Stripe** required; Google doesn't handle refunds |
| Embed on a static site | Yes: inline, popup and floating button (HTML snippet) | Yes | Booking-page link or button |
| Fit for Hemant | **Best**: several event types (discovery, strategy, follow-up) at ₹0 | Too limited on Free | Paid bookings blocked in practice: Stripe is invite-only in India |

**Stripe matters here.** Stripe's own support page says new accounts in India are **invite-only**, and only existing accounts are still supported. So any "connect Stripe to take payment" feature, in Cal.com, Calendly or Google, is effectively unavailable unless Hemant gets an invite.

**Recommended flow:**
1. **Free 20-30 min "Automation Audit" call** on Cal.com, linked from the Instagram bio and embedded on the site. Qualify leads with booking questions such as business type, monthly lead volume and tools used.
2. **Paid 60-90 min Strategy Session**:
   - **India:** client pays on a Razorpay Payment Page. The thank-you page or receipt carries a link to a **hidden** Cal.com event type **[general knowledge, not re-verified: Cal.com supports hidden event types]**.
   - **Abroad:** use the same flow with Razorpay international cards (once activated), or try Cal.com's PayPal app.
3. Projects are billed by invoice (see §3), not through the booking tool.

---

## 3. Payments

### India: Razorpay
- **Pricing:** most domestic payments cost **2% + 18% GST**. International cards cost **3% + GST** (an effective ~3.54%, with FX conversion on top), and international bank transfers cost **1% + GST** (Razorpay blog; xflowpay 2026).
- **Products:** Payment Links and Payment Pages need no website integration. Paste the link into Instagram DMs or WhatsApp, or put a "Pay" button on the static site.
- Individuals can usually sign up with a PAN, without GST registration. International payments need a separate activation **[general knowledge, not re-verified]**.

### International
| Option | Cost | Notes |
|---|---|---|
| **Skydo** | Flat **$19 under $2k**, $29 for $2,001-10k, 0.3% above $10k; no FX markup; **free FIRA**; settles in about 24h (Skydo's own claims) | RBI-authorised PA-CB (per Skydo). Good default for invoices. |
| **Wise Business** | Local USD, GBP, EUR and AUD account details; receiving a USD SWIFT wire costs up to ~$6.11 (WorldFirst comparison, Apr 2026) | Per Winvesta, **Indian *personal* Wise accounts stopped receiving payments from 5 Apr 2026**. *Business* accounts reportedly still work, so confirm in the app. Per-transfer cap reported at ₹25 lakh. |
| **PayPal** | ~**4.4% + ~$0.30** per received payment, plus currency conversion (Skydo comparison) | Expensive, but foreign clients trust it. Use it for small sums only. A purpose code is needed on withdrawal. |
| **Stripe** | n/a | Invite-only in India (Stripe support). |

**Purpose codes:** pick the RBI purpose code that matches the service.
- **P0802** covers software consultancy and implementation (Xflow). **P1006** covers business and management consultancy **[general knowledge, not re-verified]**.
- Avoid **P1301** and **P1499**, which record the money as personal income.
- Keep the **FIRA/FIRC** for every foreign receipt. It is the proof needed for GST export zero-rating.

---

## 4. Website forms on a static site

| Tool | Free tier | Best use |
|---|---|---|
| **Web3Forms** | 250 submissions/mo, unlimited forms and domains, hCaptcha/spam protection. History kept 30 days. No webhooks, file uploads or API on Free (secondary sources). | **Main contact form.** A plain HTML `<form action>` with an access key and no backend. |
| **Formspree** | ~50 submissions/mo. Paid plans reportedly start around $10-15/mo; sources conflict. | Skip. The cap is too low. |
| **Tally** | Unlimited forms and submissions under a fair-use policy; free embeds; Pro $29/mo | **Longer "AI readiness / automation audit" questionnaire** used as a lead magnet. Can connect to Sheets, Notion or webhooks to feed n8n **[integrations: general knowledge, not re-verified]**. |
| **Hostinger native** | Shared hosting runs PHP, so a small PHP `mail()`/SMTP script can send form mail from the hello@ mailbox **[general knowledge, not re-verified]** | A fallback if Hemant wants no third-party processor. It is more work and more spam risk. |

**Tip:** send the Web3Forms or Tally webhook into an n8n flow that does three things: adds the lead to a Google Sheet or CRM, sends a WhatsApp or email follow-up, and posts an alert. That flow becomes the first **build-in-public demo** (see §9).

---

## 5. Hostinger setup

### Plan for a static site + hello@ email
- **Premium web hosting** is the sweet spot. It includes a **free domain for year 1** (usually standard TLDs, not .ai) and **bundled email: 2 mailboxes per website on Premium** (Business: 5; Cloud Startup: 10), free for the first year.
- Hostinger now sells email as trial-style bundles. A review warns that email may need separate payment after year 1.
- **Prices (India, secondary sources, mid-2026):**
  - Premium: ~₹149-249/mo intro, renewing at ~₹449/mo.
  - Business: ~₹249-349/mo intro, renewing at ~₹649/mo.
  - Single: ₹69/mo on a 48-month term (₹3,312 upfront), but **no free domain**.
  - Renewals run about 2.6-4.2× the headline price.
- **Standalone email if needed:**
  - Business Starter: ~$0.59-0.99/mailbox/mo intro, ~$1.59 renewal; 1,000 sends/day.
  - Business Premium: ~$1.56-2.99 intro, ~$3.99 renewal; 3,000 sends/day.

### Uploading the site
1. **File Manager:** hPanel → Files → File Manager → `public_html`. Upload files, or upload a zip and extract it (Astro docs for Hostinger).
2. **FTP:** hPanel → Files → FTP Accounts, then connect with FileZilla.
3. **Git (recommended):** hPanel → Advanced → **Git** → **Connect with GitHub**. Pick the repo, branch and deploy directory. The Hostinger GitHub App sets up **auto-deploy on push**, with the webhook managed for you. A legacy SSH-key flow works for other Git hosts, with a manual webhook (docs.hostinger.com). One third-party source says Git deploy needs Premium or above.

### SSL
- Hostinger web hosting plans advertise **free SSL**. After DNS propagates, check hPanel → Security → SSL and force HTTPS **[general knowledge, not re-verified]**.

### n8n VPS as a marketing asset
- **KVM 2** has 2 vCPU, 8 GB RAM, 100 GB NVMe and 8 TB bandwidth, plus a **one-click n8n template**.
- **Price:** ~$6.99-8.99/mo promo on long terms, renewing at ~$14.99/mo. VPS Benchmarks lists a higher list price of $24.49 with a $13.99 first-month offer. There is a 30-day money-back guarantee.
- **Why it pays off:** Hemant can run live demos, Reels of builds and client proof-of-concepts on their own infrastructure, and offer **self-hosted n8n setup** as a productised service.
- **Alternative:** one VPS could also serve the static site through Nginx or Caddy, but email would then have to be bought separately. For simplicity, keep the site on shared hosting.

---

## 6. Analytics: what to use for free
- **GA4:** free, and the standard choice. Set up conversions for form submit, Cal.com booking click, WhatsApp click and Razorpay click.
- **Microsoft Clarity:** free heatmaps and session recordings with **no traffic or recording caps**, plus GA4 integration. Microsoft uses aggregated, anonymised data to improve its products, so mention Clarity in the privacy notice.
- **Plausible:** privacy-friendly but **no free plan**. Starter is about **$9/mo for 10k pageviews**, with a 30-day trial; the Community Edition can be self-hosted. Skip it at launch, or self-host it on the VPS later as another demo.

---

## 7. WhatsApp: Business app vs API

| | **WhatsApp Business app** (free) | **WhatsApp Business Platform / API** |
|---|---|---|
| Features | Business profile, **catalog** (up to ~500 items, in collections), **quick replies** (up to ~50, triggered with "/"), greeting and away messages, labels, a short link / QR code, message stats | Programmatic messaging, chatbots, CRM integration, multi-agent inbox through a BSP |
| Cost | ₹0 | **Per-delivered-template pricing since 1 Jul 2025.** India marketing templates cost ~₹0.86-1.09 (sources conflict); utility and authentication ~₹0.145. **Service replies inside the 24h window are free.** Add BSP fees and 18% GST. INR billing is rolling out in 2026. |
| Use for Hemant | **Run the business**: a wa.me/91XXXXXXXXXX?text=… link on the site and Instagram bio, a catalog of service packages, and quick replies for FAQs and pricing | **Sell it**: build WhatsApp API bots for clients, and use a demo number as a showcase |

---

## 8. Legal and tax basics in India *(not legal advice; engage a CA for setup)*

**GST**
- Registration becomes compulsory once **aggregate turnover passes ₹20 lakh/FY** for services (₹10 lakh in special-category states). **Export receipts count toward that turnover.**
- Below the threshold, inter-state and export service suppliers don't have to register (Notif. 10/2017-IGST).
- **Exception:** **OIDAR** (online, automated digital services) can force registration at any turnover. Custom consulting is generally not OIDAR, but selling templates or SaaS to overseas consumers may be. Ask a CA.
- The standard GST rate on consulting is **18%** **[general knowledge, not re-verified]**.

**LUT for exports (zero-rated)**
- A Letter of Undertaking is filed on **Form RFD-11** on the GST portal. It **needs GST registration** and is valid until **31 March each year**, so renew it every FY.
- Zero-rating holds only when all of these are true (Sec. 2(6) IGST Act): supplier in India, recipient outside India, place of supply outside India, payment in convertible foreign exchange, and not merely an intermediary.
- Payment must be realised within ~1 year of invoice; sources differ, and one cites up to 15 months. If it isn't, IGST plus 18% interest becomes payable.
- The invoice must say **"Supply meant for export under LUT without payment of IGST."**
- **Why register voluntarily below ₹20 lakh:** to claim ITC and file the LUT, and because some Indian B2B clients prefer GST-registered vendors.

**Invoicing**
- **If registered:** invoice to include:
  - legal name and address, GSTIN, and a sequential invoice number unique per FY
  - date, client name and address (plus the client's GSTIN for B2B), and place of supply
  - SAC code: e.g., **998313** for IT consulting or **998311** for management consulting **[general knowledge, not re-verified]**
  - taxable value, tax breakup, and the LUT line for exports
- **If unregistered:** issue a plain bill and **don't charge GST**.
- Keep FIRAs alongside the export invoices.

**Income tax** **[general knowledge, not re-verified]**
- Presumptive taxation for professionals (**Sec. 44ADA** under the 1961 Act) deems **50% of gross receipts** as income. The limit is ₹50 lakh, or ₹75 lakh if cash receipts are ≤5%.
- Whether AI or software work counts as an eligible "technical consultancy" profession needs CA confirmation.
- The **new Income-tax Act, 2025 (in force from 1 Apr 2026)** renumbers these provisions.
- Pay advance tax quarterly if the liability exceeds ₹10,000.

**DPDP Act 2023 + DPDP Rules 2025**
- **Timeline:** the Rules were notified on **13-14 Nov 2025** and roll out in phases:
  - Data Protection Board provisions applied immediately.
  - Consent Manager rules apply after ~12 months (Nov 2026).
  - **Most duties, including notice (Rule 3), consent, security and rights, apply after 18 months (~13-14 May 2027).** Hogan Lovells reads notice and consent as applying from 13 Nov 2026. Comply early, since it costs little.
- **Contact-form privacy notice basics:**
  - **What data** is collected (name, email, phone, business details) and the **specific purpose** (reply to the enquiry, schedule a call, send a proposal).
  - **Processors used:** Web3Forms or Tally, Cal.com, Google (GA4), Microsoft (Clarity), Razorpay, Hostinger.
  - **Retention period.**
  - **How to withdraw consent, access, correct or delete data**, and a **named contact email** for grievances.
  - The right to complain to the **Data Protection Board**.
- Use a **separate unticked checkbox** for marketing (newsletter, WhatsApp broadcasts).
- If Hemant targets UK or EU clients, align with GDPR basics as well.

**Consulting / project agreement checklist**
- [ ] Parties; **scope and deliverables**; explicit **out-of-scope** list
- [ ] Milestones, timeline, **acceptance criteria**
- [ ] Fees, currency, **payment terms** (e.g., 50% upfront), late fees, taxes (GST or LUT)
- [ ] **Change-request** process and hourly rate for extra work
- [ ] Client responsibilities: tool access, credentials, data, timely feedback
- [ ] **Third-party costs** (OpenAI/Anthropic API, n8n cloud, WhatsApp API, BSP) billed to the **client's own accounts**
- [ ] **IP:** client owns the deliverables on full payment; Hemant keeps pre-existing templates, code and know-how
- [ ] **Confidentiality / NDA**; **data processing** clause (client = data fiduciary, Hemant = processor; security and deletion at the end)
- [ ] **AI disclaimer:** outputs can be wrong; client does human review; no guaranteed business results
- [ ] Warranty / **support window** (e.g., 14-30 days of bug fixes), then an optional maintenance retainer
- [ ] **Limitation of liability** (capped at fees paid); indemnities
- [ ] Termination and kill fee; non-solicitation
- [ ] **Portfolio / case-study permission** (key while building proof)
- [ ] Governing law and jurisdiction or arbitration (India); e-signature

---

## 9. Proof-building with no clients yet

1. **2-3 founding-client pilots** at free or heavily discounted rates, against a written pilot agreement. In return: a measured before/after (hours saved, lead response time, leads captured), a video or text testimonial, and permission to publish a case study. Cap the scope tightly, e.g., one workflow in 2 weeks.
2. **Dogfood in public.** Automate Hemant's own funnel and post each build as Reels or carousels:
   - an Instagram DM keyword → lead-capture flow
   - form → CRM → WhatsApp follow-up
   - Razorpay paid → Cal.com booking → reminder
3. **Live demo lab on the n8n VPS.** Public "try it" demos, such as "email an invoice PDF, get the extracted data back", plus downloadable workflow templates as lead magnets. Label demos clearly; never present them as client results.
4. **Mini-audits as content.** Publish teardowns such as "how a dental clinic could automate bookings", with no invented numbers.
5. **Secondary channels:**
   - **LinkedIn:** repost every build; B2B buyers and international clients live there.
   - **Upwork:** a variable freelancer fee (reportedly 0-15%) plus paid Connects **[general knowledge, not re-verified]**. Good for the first paid reviews.
   - **Contra:** commission-free for freelancers **[general knowledge, not re-verified]**.
   - **n8n community / template creators:** visibility with automation buyers **[general knowledge, not re-verified]**.

---

## 10. Monthly cost estimate (INR and USD)

| Item | Year 1 (₹/mo) | Year 1 (US$/mo) | Year 2+ (₹/mo) | Notes |
|---|---|---|---|---|
| Hostinger Premium hosting | ~₹199 | ~$2.3 | ~₹449+ | Midpoint of ₹149-249 promo on a 48-mo prepay |
| Domain (.ai) | ~₹700 | ~$8 | ~₹805 | $89.99 yr 1, 2-yr minimum; $109.99/yr renewal |
| Domain (alt: .si) | ~₹88 | ~$1 | ~₹125 | $11.99, then $16.99/yr |
| Email (1 mailbox) | ₹0 | $0 | ~₹140 | Bundled for year 1, then ~$1.59 |
| Cal.com, Web3Forms, Tally, GA4, Clarity, WhatsApp app | ₹0 | $0 | ₹0 | Free tiers |
| Razorpay / Skydo / PayPal | per transaction | per transaction | — | 2% + GST / $19 flat / ~4.4% + $0.30 |
| n8n VPS KVM 2 (optional) | ~₹700 | ~$8 | ~₹1,320 | $7-9 promo, then ~$14.99 |
| AI API credits for demos | ~₹500 | ~$6 | ~₹500 | **Estimate**, usage-based |
| **Total, bare minimum** (hosting + .si) | **~₹290** | **~$3.3** | **~₹715** | |
| **Total, recommended** (hosting + .ai + VPS + API) | **~₹2,100** | **~$24** | **~₹3,200** | |

**Upfront cash (estimates):**
- Hosting 48-mo prepay: **₹7,150-12,000**
- .ai, 2 years: ~**$180-200 (₹15.8-17.6k)**
- VPS 24-mo prepay: ~**$168-216 (₹14.8-19k)**

**Recommendation:** buy the hosting and domain first. Add the VPS when the first build-in-public series starts, or take a one-month VPS term to test.

**Tools the stack leaves out, and why:**
- **Calendly paid:** Cal.com Free covers the same needs.
- **Formspree:** the 50/mo cap is too low.
- **Plausible:** no free tier.
- **Google Workspace paid bookings:** these depend on Stripe, which is invite-only in India.

---

## Sources

**Booking**
- https://costbench.com/software/scheduling/cal-com/free-plan/
- https://zeeg.me/en/blog/post/cal-com-pricing
- https://wikidocs.net/blog/@solobizstack/25315/
- https://costbench.com/changelog/cal-com-price-increase-2026-02/
- https://www.costbench.com/software/scheduling/calendly/free-plan/
- https://zeeg.me/en/blog/post/calendly-standard-plan
- https://www.zoho.com/bookings/explore/calendly-pricing-plans.html
- https://workspace.google.com/intl/en-GB/resources/appointment-scheduling
- https://support.google.com/calendar/answer/11608416?hl=en-ca
- https://workspaceupdates.googleblog.com/2023/07/paid-appointment-bookings-in-google-calendar.html
- https://motopress.com/blog/how-to-take-paid-appointments-with-google-calendar-appointment-scheduling

**Payments**
- https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/
- https://www.xflowpay.com/blog/razorpay-international-payment-gateway-charges
- https://razorpay.com/accept-international-payments
- https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india
- https://thepaypers.com/payments/news/stripe-moves-to-invite-only-in-india
- https://docs.stripe.com/india-exports
- https://www.skydo.com/compare/paypal-fee-calculator-usd-to-inr
- https://www.xflowpay.com/blog/purpose-code-for-freelancers
- https://labnol.org/india/paypal-purpose-codes/12871
- https://www.winvesta.in/blog/wise-vs-winvesta-which-is-actually-better-for-indian-freelancers-in-2026
- https://www.winvesta.in/blog/businesses/wise-india-review-2026-features-fees-limitations-verdict
- https://www.worldfirst.com/sasia/blog/freelancer-payments/best-usd-account-for-freelancers/
- https://vaultleap.com/es/blog/wise-fees-and-limitations-for-freelancers-the-full-picture-in-2026
- https://www.skydo.com/receive-international-payments-in-india/consultant
- https://www.skydo.com/compare/skydo-vs-payoneer

**Forms**
- https://web3forms.com/pricing
- https://freetier.co/directory/products/web3forms
- https://splitforms.com/formspree-free-plan-limits
- https://agentdeals.dev/vendor/formspree
- https://tally.so/help/tally-a-free-typeform-alternative
- https://www.jetadmin.io/blog/tally-review/amp/

**Hostinger (hosting, email, domains, VPS)**
- https://zoutons.com/news/hostinger-web-hosting-email-price-india-2026
- https://zoutons.com/news/hostinger-india-for-small-business-july-2026-deals-from-rs-149
- https://zoutons.com/news/cheapest-web-hosting-india-2026-hostinger-single-plan
- https://hostadvice.com/hosting-company/hostinger-reviews/hostinger-india-pricing/
- https://docs.astro.build/en/guides/deploy/hostinger/
- https://docs.hostinger.com/websites/git
- https://support.hostinger.com/hpanel/can-i-deploy-a-git-repository
- https://support.hostinger.com/en/articles/4625828-parameters-and-limits-of-hostinger-email
- https://bloggerspassion.com/hostinger-business-email-review
- https://www.techradar.com/pro/hostinger-email-review
- https://www.hostinger.com/ae/tld/ai-domain
- https://www.hostinger.com/in/tld/ai-domain
- https://www.hostinger.com/tld/si-domain
- https://cybernews.com/best-domain-registrars/best-si-domain-registrars/
- https://www.itechguides.com/?p=531539
- https://gizmodo.com/best-web-hosting/self-host-n8n
- https://growwstacks.com/blog/how-to-self-host-n8n-hostinger-vps/
- https://www.vpsbenchmarks.com/hosters/hostinger/plans/1055

**Analytics**
- https://analytify.io/microsoft-clarity-vs-google-analytics/
- https://www.bounteous.com/insights/2026/02/11/microsoft-clarity-understanding-user-behavior-beyond-numbers/
- https://searchengineland.com/microsoft-clarity-website-analytics-447323
- https://frontdeskreview.com/software/product-analytics/plausible/
- https://www.temperstack.com/plans/plausible/

**WhatsApp**
- https://learn.rasayel.io/en/blog/whatsapp-business-features/
- https://trengo.com/blog/whatsapp-business-features
- https://www.shopify.in/blog/whatsapp-business
- https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing
- https://m.aisensy.com/blog/whatsapp-api-new-pricing/
- https://www.fyno.io/blog/how-to-save-big-on-sms-costs-with-whatsapp-in-india-updated-clst1n275005yxv47ioyo7mff/
- https://baat.ai/blog/whatsapp-api-pricing-india
- https://www.robylon.ai/blog/whatsapp-business-api-pricing-india
- https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026

**GST and exports**
- https://www.skydo.com/blog/gst-for-freelancers
- https://www.taxaj.com/learn/gst-applicability-tax-rates-freelancers-india-2026/
- https://www.incorpx.io/blog/gst-export-of-services-freelancers-india
- https://www.incorpx.io/blog/gst-for-freelancers-consultants-india
- https://razorpay.com/blog/lut-in-gst/
- https://www.winvesta.in/blog/businesses/how-to-file-lut-for-export-of-services-gst-portal-guide-2025
- https://www.wisemonk.io/blogs/zero-rated-gst-for-freelancers
- https://taxguru.in/goods-and-service-tax/gst-freelancers-consultants-guide-domestic-foreign-clients.html

**DPDP**
- https://www.legal500.com/firms/237811-saga-legal/c-india/news-and-developments/the-privacy-timer-starts-now-analysing-the-dpdp-rules-and-its-18-month-countdown
- https://ca.hoganlovells.com/en/publications/indias-digital-personal-data-protection-act-2023-brought-into-force-
- https://dsklegal.com/?p=26455
- https://lawrbit.com/article/digital-personal-data-protection-rules-2025
- https://www.outlookbusiness.com/technology/govt-notifies-dpdp-rules-experts-flag-need-for-data-mapping-consent-systems

*Research gap:* this run hit its web-search budget before it could check Sec. 44ADA/Income-tax Act 2025 details, the Upwork/Contra fee terms, Hostinger SSL specifics and the Cal.com hidden-event/PayPal app. Those items are flagged **[general knowledge, not re-verified]** above.
