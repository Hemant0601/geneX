# Pricing Sheet (internal)

**For:** Hemant only. **Not for sending as-is**: clients see askhemant.ai/pricing and the proposal.
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §4 (offer ladder, founding, price rise, running costs) and §5 (delivery rules). Public version: [`website/pricing/index.html`](../website/pricing/index.html). If anything here disagrees with the strategy, the strategy wins: fix this file.

**Global rules**
- **All prices exclude GST.** Add GST only once you're GST-registered and your CA confirms how ([`09-invoicing-and-tax-notes-india.md`](./09-invoicing-and-tax-notes-india.md)).
- **Currency:** clients whose business is in India pay in **INR**; everyone else (UAE, UK, US, …) in **USD**. The client's business location decides, not the payer's card.
- **Running costs are always the client's, on the client's own accounts:** WhatsApp per-message fees, the WhatsApp provider (BSP) plan, AI API usage, CRM, hosting.
- **These are launch prices.** No ad-hoc discounts. The only reduced prices are the **Founding Client Program** (until Mon 30 Nov 2026) and **Agency Partner −25%** (from Mon 16 Nov 2026). No festive "offers", no fake countdowns.
- **Capacity:** max **6 Fit Calls a week**; max **2 Sprints at once**; Sessions within 48 hours.
- **Proposal validity:** 7 days. A price change never affects a proposal already sent (within its validity) or accepted.

---

## 1. The ladder at a glance

| # | Offer | India | International | Payment | Split (start / go-live) | Timeline | Warranty |
|---|---|---|---|---|---|---|---|
| 0 | Lead Leak Kit | Free | Free | — | — | Instant | — |
| 1 | Fit Call (20 min) | Free (intake required) | Free | — | — | Tue–Thu, max 6/week | — |
| 1b | **Ask Hemant Session** (45 min) | **₹1,999** | **$99** | 100% upfront | — | Within 48 hours | — |
| 2 | **Lead Leak Audit** | **₹9,999** | **$499** | 100% upfront | — | 5 working days | — |
| F | **Founding Client Pilot** (Audit + Solo or Clinic Sprint) | **₹14,999** | **$599** | 50/50 | ₹7,500 / ₹7,499 · $300 / $299 | ~3 weeks + 30-day measurement | 14 days |
| 3a | **Speed-to-Lead Sprint (Solo)** | **₹34,999** | **$1,499** | 50/50 | ₹17,500 / ₹17,499 · $750 / $749 | 10 working days after access | 14 days |
| 3b | **Speed-to-Lead System (Team)** | **₹79,999** | **$2,999** | 50/50 | ₹40,000 / ₹39,999 · $1,500 / $1,499 | 15 working days | 30 days |
| 3c | **Missed-Call & No-Show Recovery Sprint** | **₹34,999** | **$1,499** | 50/50 | ₹17,500 / ₹17,499 · $750 / $749 | 10 working days | 14 days |
| 4a | **Lead Desk Care** | **₹9,999/mo** | **$299/mo** | Monthly in advance | — | 30 days' notice to cancel | — |
| 4b | **Lead Desk Growth** | **₹24,999/mo** | **$799/mo** | Monthly in advance | — | 3-month minimum | — |
| Q | **Quick Win Build** | **₹24,999** | **$999** | 50/50 *(default; **Decision for Hemant**, below)* | ₹12,500 / ₹12,499 · $500 / $499 | 7–10 working days | 14-day bug-fix window |
| C | **Custom AI Agent / AI Product Build** | **from ₹1,50,000** | **from $6,000** | At least 50% upfront; rest by milestones set in the Audit | — | 4–8 weeks | Set in the Audit |
| + | Extra lead source | ₹4,999 | $199 | With the build | — | 3–7 days | As build |
| + | Google review-request flow | ₹7,999 | $349 | With the build | — | 3–7 days | As build |
| + | Listing-to-content kit (AI captions + reel scripts from listing details) | ₹12,999 | $549 | With the build | — | 3–7 days | As build |
| + | Out-of-scope change requests | ₹2,000/hour | $60/hour | Agreed in writing first; invoiced monthly or at go-live | — | — | — |

Split rule: 50% rounded **up** to the nearest rupee/dollar at the start, the rest at go-live (so the total is exact). Matches the Razorpay setup in [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §14.

> **Decision for Hemant: Quick Win Build payment terms.** The strategy gives no terms for the Quick Win. This file, the proposal template and the agreement use **50/50 (₹12,500 + ₹12,499 · $500 + $499) as the default**; the alternative is 100% upfront, as for the Audit. Decide before the first Quick Win proposal and change all three files together.

---

## 2. Each offer: scope, exclusions, terms, next step

### 0. Lead Leak Kit (lead magnet)
- **Scope:** 13-page PDF (the 7 leaks, 10 WhatsApp templates in English and Hinglish, the 6-question qualification script, the 10 pm self-test, "free tools first"). Bonus: the Lead Leak Calculator behind a 4-field Tally form. The owner enters every number.
- **Delivered:** ungated in the LEAKS auto-DM; askhemant.ai/kit.
- **Upsell path:** → personal DM reply → Fit Call.

### 1. Fit Call
- **Scope:** 20-minute diagnosis; the 1–2 biggest leaks named; an honest yes or no and the next step. **Not included:** designing the solution (that's the Audit).
- **Gate:** the 7-question Cal.com intake; under ₹15K or out of niche → Kit + Session ([`02-cal-com-intake-form.md`](./02-cal-com-intake-form.md) §4).
- **Next step:** Audit (link sent on WhatsApp during the call), Sprint proposal within 24 hours, founding terms within 24 hours, or Kit + Session.

### 1b. Ask Hemant Session (side door)
- **Scope:** 45-minute call on any AI or automation question · the recording · a written action list **within 24 hours**.
- **Not included:** building it (that's a Quick Win Build or a Sprint).
- **Terms:** 100% upfront (Razorpay `{{RAZORPAY_SESSION_LINK}}`; abroad PayPal `{{PAYPAL_SESSION_LINK}}`). Free reschedule with 24 hours' notice; if Hemant cancels and no new time works, full refund (website terms §9).
- **Credit:** **100% credited to an Audit or build booked within 14 days** of the Session.
- **Upsell path:** → Quick Win Build (non-niche) · → Audit (niche) · → Kit for DIY.

### 2. Lead Leak Audit
- **Scope:** pre-audit form · 60-minute workshop · timed test enquiries through **up to 3** of the client's own channels (with consent) · current and proposed lead-flow map · **Leak Report** (each leak, evidence, fix, effort) · ROI worksheet using **the client's own numbers** · system blueprint with a **fixed quote** · 20-minute recorded walkthrough + 30-minute review call. (Loom's free plan reportedly caps recordings at 5 minutes: use Loom's paid plan, or an OBS/phone recording shared unlisted via YouTube or Google Drive.)
- **Not included:** the build · invented ROI.
- **Timeline:** 5 working days from the workshop.
- **Terms:** 100% upfront (`{{RAZORPAY_AUDIT_LINK}}`; abroad a Skydo invoice for $499). Full refund if cancelled before the workshop; after it, not refundable but still credited (website terms §9).
- **Credit:** **100% credited to a Sprint booked within 30 days.** House rule: count the 30 days from the day the Leak Report is delivered, and say so in the Leak Report. The credit also applies to the Team system or Clinic Sprint quoted in the blueprint.
- **Upsell path:** → Solo Sprint / Team / Clinic Sprint / Custom AI (scoped only after an Audit).

### F. Founding Client Pilot (3 slots, closes Mon 30 Nov 2026 23:59 IST or when full)
- **Scope:** Lead Leak Audit + Solo Sprint, **or** Lead Leak Audit + Missed-Call & No-Show Recovery Sprint. Same scope as list price; nothing cut. Baseline measured during the build; re-measured 30 days after go-live; human review of the first 100 AI conversations.
- **In return, in writing:** build period = baseline; measurement 30 days after go-live; permission to publish the numbers (named or anonymised, client's choice); a testimonial in their own words only if they're happy; a 30-minute feedback interview.
- **Terms:** 50/50 (₹7,500 + ₹7,499 · $300 + $299). Deposit link `{{RAZORPAY_FOUNDING_LINK}}` **only after selection and a signed agreement**.
- **Not combinable** with the Agency discount. A Session fee paid in the previous 14 days is credited (it's an Audit + build).
- **Target mix:** 2 real estate + 1 clinic; at most 1 Dubai broker. Full program: [`10-founding-client-program.md`](./10-founding-client-program.md).
- **Upsell path:** → Lead Desk Care at warranty end → case study → referrals.

### 3a. Speed-to-Lead Sprint (Solo)
- **Scope:** capture from **up to 3 sources** (Meta lead ads, website form, Instagram DMs, portal alerts where the portal allows) · instant WhatsApp first reply on the official platform · AI qualifier scoped to the business, English or Hinglish (budget, BHK/type, locality, timeline, loan or cash, self-use or investment) · hot/warm/cold tags · handover rules (hot lead → WhatsApp alert to the agent) · site-visit booking with reminders 24 h and 2 h before + Maps pin · 30-day follow-up of 6–8 messages with opt-out · log in Google Sheets or the existing CRM · 8 am daily digest · up to 10 Meta-approved templates · Loom handover + 1-page SOP · **14-day bug-fix warranty**.
- **Not included:** running costs · a 4th+ source (add-on) · portal integrations the portal doesn't allow · running ads / buying leads · voice-AI calls · bulk or cold broadcasts · CRM licences · AI answers to price negotiations (to a human).
- **Timeline:** 10 working days **after access is granted**. Day 5 demo, day 10 go-live, warranty ends 14 days after go-live (strategy: "day 24") → retainer offer.
- **On-time promise:** not live within 10 working days of full access → **first month of Lead Desk Care free**.
- **Upsell path:** → Care (default) or Growth · → Team when sources > 3 or agents > 1–2 · → add-ons (extra source, review flow, listing-to-content kit).

### 3b. Speed-to-Lead System (Team)
- **Scope:** everything in 3a + **up to 6 sources and 10 agents** · round-robin or by-area assignment · CRM integration (Zoho, HubSpot, any CRM with an API) · manager dashboard (Sheets or Looker Studio) · missed-call text-back if the phone provider supports webhooks · weekly owner report · 2 team training sessions · **30-day warranty**.
- **Not included:** CRM licences · more than 6 sources / 10 agents (quote after the Audit) · running costs.
- **Timeline:** 15 working days. Sell **after an Audit** unless the setup is unusually clean.
- **Upsell path:** → Lead Desk Growth (3-month minimum).

### 3c. Missed-Call & No-Show Recovery Sprint (clinics)
- **Scope:** missed call → WhatsApp text-back → booking link or bot → reminders 24 h and 2 h before → post-visit review request → recall reminders · DPDP-aware consent capture · minimal health data · **14-day warranty**.
- **Not included:** AI replies to medical questions (they go to the clinic team) · practice-management software licences · running costs. Official WhatsApp Business Platform only.
- **Timeline:** 10 working days.
- **Upsell path:** → Care · → review-request add-on if not already covered · → second location as a new Sprint (quote).

### 4a. Lead Desk Care (retainer)
- **Scope:** monitoring and error alerts · fixes within 1 working day · 2 small changes a month · monthly prompt tuning from real conversations · 1-page monthly report (response time, leads handled, bookings, no-shows) · WhatsApp support during IST business hours (Mon–Sat 10:00–19:00).
- **Not included:** new automations (Growth includes one a month); changes beyond 2 small ones (hourly rate).
- **Terms:** monthly in advance; **30 days' notice to cancel**; the current paid month isn't refunded. Offered **at warranty end** to every Sprint client.

### 4b. Lead Desk Growth (retainer)
- **Scope:** everything in Care + **1 new automation a month** (standard scope, about Quick-Win size) · 45-minute optimisation call · A/B tests of follow-up messages · quarterly roadmap.
- **Terms:** monthly in advance; **3-month minimum**. Pitch to the best client in month 3 (strategy §9).

### Q. Quick Win Build
- **Scope:** one workflow of up to about 10 steps for any business (e.g. form → CRM → WhatsApp/email follow-up; invoice PDF → AI extraction → Sheet or Zoho Books) · documentation · Loom handover · 14-day bug-fix window.
- **Not included:** workflows beyond about 10 steps · licences and API usage.
- **Usually sold via:** the Ask Hemant Session (credit applies within 14 days).

### C. Custom AI Agent / AI Product Build
- **Scope:** a GPT- or Claude-powered assistant trained on company SOPs and documents, or a first version of an AI-powered product. **Only scoped after an Audit**; scope, milestones and acceptance criteria are set there.
- **Not included:** a fixed price before the Audit · model and hosting costs (client's accounts).

---

## 3. Credits, in practice

Credits are the **amount actually paid**, and they chain. The total a client pays never drops below the price of the final item.

| Path | Pays | Total |
|---|---|---|
| Session → Audit (within 14 days) | ₹1,999 + ₹8,000 | ₹9,999 |
| Audit → Solo Sprint (within 30 days) | ₹9,999 + deposit ₹7,501 + go-live ₹17,499 | ₹34,999 |
| Session → Audit → Sprint | ₹1,999 + ₹8,000 + ₹7,501 + ₹17,499 | ₹34,999 |
| Audit → Team (within 30 days) | ₹9,999 + ₹30,001 + ₹39,999 | ₹79,999 |
| Session → Quick Win (within 14 days) | ₹1,999 + ₹10,501 + ₹12,499 | ₹24,999 |
| USD: Audit → Solo Sprint | $499 + $251 + $749 | $1,499 |

House rule: the credit comes off the **deposit** first; the go-live payment stays the same.

---

## 4. Delivery rules that affect price

- **Clock:** starts when the **access checklist** is complete ([`06-client-onboarding-checklist.md`](./06-client-onboarding-checklist.md)). Delays from approvals or access the client controls pause it.
- **Max 2 Sprints at once.** If both slots are busy, quote the next real start date in the proposal.
- **On-time promise** (Sprints): not live within 10 working days of full access → first month of Care free.
- **Quality:** a human reviews the first 100 AI conversations in every pilot.
- **Overdue payment:** work may pause until paid; timelines move by the pause (website terms §4).
- **Payment fees** (Razorpay 2% + GST, Skydo $19, PayPal ~4.4% + $0.30) are absorbed by Hemant *(house default; don't surcharge)*.

---

## 5. Agency Partner (from Mon 16 Nov 2026): list price −25%

**What the strategy says:** "Any of the systems above, built under the agency's brand. The agency owns the client. Rights to publish an anonymised case study are written into the partner agreement." 25%, not 30%, to protect a solo operator's margin.

| Offer | India list → partner | International list → partner |
|---|---|---|
| Speed-to-Lead Sprint (Solo) | ₹34,999 → **₹26,249** | $1,499 → **$1,124** |
| Missed-Call & No-Show Recovery Sprint | ₹34,999 → **₹26,249** | $1,499 → **$1,124** |
| Speed-to-Lead System (Team) | ₹79,999 → **₹59,999** | $2,999 → **$2,249** |
| Quick Win Build | ₹24,999 → **₹18,749** | $999 → **$749** |
| Custom AI Agent / AI Product Build | from ₹1,50,000 → **from ₹1,12,500** | from $6,000 → **from $4,500** |

(−25% rounded **down** to the whole rupee/dollar.)

> **Decision for Hemant: does the Agency −25% apply beyond builds?** The strategy says "any of the systems above", which clearly covers the builds in the table. Decide before the first partner call (suggested default: the same −25%) for: Lead Leak Audit (₹7,499 / $374), add-ons (₹3,749 / $149 · ₹5,999 / $261 · ₹9,749 / $411 · ₹1,500 / $45 an hour), Lead Desk Care (₹7,499 / $224 a month) and Growth (₹18,749 / $599 a month). **Never discounted:** the Ask Hemant Session. **Never stacked** with founding pricing.

**Partner terms to write into the agreement:** the agency is the client (signs, pays, owns the end-client relationship) · end-client accounts still in the **end client's** name · same scope, out-of-scope list and timelines · anonymised case-study rights · the agency handles first-line client contact unless agreed otherwise · payment 50/50 per project.

---

## 6. Price rise (only with proof)

- **When:** from **Mon 18 Jan 2027**, **only if at least 3 documented results exist** (measured, consented case data per [`08-case-study-template-and-consent.md`](./08-case-study-template-and-consent.md)).
- **New prices:** Lead Leak Audit **₹14,999 / $699**; Speed-to-Lead Sprint (Solo) **₹44,999 / $1,999**.
- **Announce:** **Mon 4 Jan 2027** (a real deadline, so honest scarcity). Say what changes and that proposals already sent keep their price for their 7-day validity.
- **Not specified:** the other offers (Team, Clinic Sprint, retainers, Quick Win, add-ons, Session) stay at launch prices unless you decide otherwise. **Decision for Hemant:** whether the Clinic Sprint follows the Solo Sprint (it's the same price today).
- **If fewer than 3 documented results by Mon 4 Jan:** don't announce. Re-check monthly; announce 2 weeks ahead whenever it's true.
- **Update on the day:** [`website/pricing/index.html`](../website/pricing/index.html) (incl. its JSON-LD), [`website/index.html`](../website/index.html), this file, the WhatsApp catalogue, the Razorpay Audit page amount. Agency partner prices follow the new list automatically.

---

## 7. Fit Call rule change (check day 60, Thu 17 Dec 2026)

If more than **8 Fit Calls a week**, or a **show rate below 70%**, or **3+ documented results** → shorten the Fit Call to 15 minutes **or** make the ₹9,999 / $499 Audit the only way in ([`02-cal-com-intake-form.md`](./02-cal-com-intake-form.md) §7).

---

## 8. Running costs (show in every proposal) *(worked example, estimate)*

- Meta has charged per WhatsApp message since 1 Jul 2025; replies inside the 24-hour customer-service window are free ([Meta](https://developers.facebook.com/docs/whatsapp/pricing)).
- One reseller lists about **₹0.86 per marketing message** and **₹0.13 per utility message** in India ([MyOperator](https://support.myoperator.com/portal/en/kb/articles/whatsapp-has-shifted-to-per-message-pricing-effective-july-1-2025-based-on-message-categories-and-your-recipient-s-country-in-india-there-are-three-paid-categories)); the tooling research found sources ranging ₹0.86–1.09 for marketing and ~₹0.145 for utility. Check Meta's live rate card.
- **Example:** 300 new leads a month × 3 follow-ups started by the business ≈ 900 marketing messages ≈ **₹775 a month**, before GST and provider fees.

---

## 9. Payment methods

| Client | Offer | Method | Fee *(absorbed)* |
|---|---|---|---|
| India | Session, Audit, founding deposit | Razorpay **Payment Pages** (reusable): `{{RAZORPAY_SESSION_LINK}}`, `{{RAZORPAY_AUDIT_LINK}}`, `{{RAZORPAY_FOUNDING_LINK}}` | 2% + GST |
| India | Sprint/Team/Quick Win deposits and balances, retainers | Razorpay **Payment Link** per client, named with the proposal number, expiring with the proposal | 2% + GST |
| Abroad | Audit, Sprints, retainers, founding | **Skydo** USD invoice (main); Wise Business (backup) | Skydo $19 flat under $2,000; $29 for $2,001–10,000 |
| Abroad | $99 Session only | **PayPal** `{{PAYPAL_SESSION_LINK}}` | ~4.4% + $0.30 + conversion |
| Anyone | — | **Not Stripe** (invite-only for new Indian accounts) | — |

Details, purpose codes and FIRA: [`09-invoicing-and-tax-notes-india.md`](./09-invoicing-and-tax-notes-india.md).
