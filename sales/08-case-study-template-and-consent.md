# Case Study Template + Client Consent Form

**For:** Hemant · **When:** after a client's **30-day after-measurement** (founding pilots from about mid-December 2026; strategy §9 targets 1–3 published by day 90)
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §8 ("Building proof with no case studies") · measurement method: [`10-founding-client-program.md`](./10-founding-client-program.md) §6 · publication terms in the agreement: [`05-consulting-agreement-template.md`](./05-consulting-agreement-template.md) clause 15 and Schedule E

> **Rules that never bend** (strategy §8)
> - Publish **only numbers you measured**, and show how: a timer, a log or a screenshot, with the **sample size (n)** and the dates.
> - Client names, logos and screens appear **only with written permission**. **Anonymise by default.**
> - **If the results are weak, publish them honestly or not at all. Never round up.** No "up to", no best-day cherry-picking.
> - Testimonials are **quoted word for word** and never strengthened. No testimonial is ever written for the client.
> - Vendor statistics are cited and never presented as your results. No income claims, no "guaranteed ROI".
> - Every case study includes **"what didn't work"**.
> - **Disclose the founding discount** on founding case studies: *"Founding client: discounted price in exchange for measurement and permission to publish."*
> - Never show the client's customers: no names, numbers, chats or faces. Blur everything in screenshots.

---

## 1. The measurements (same definitions everywhere)

| Metric | Definition | Source |
|---|---|---|
| **Median first-reply time** | For each lead: time from when the lead **reached the system** (form submit, portal alert email received, DM received, missed call logged) to the first reply sent to that lead. Report the median across all leads in the period | Lead log timestamps |
| **% answered within 5 minutes** | Share of leads whose first reply came within 5 minutes, across every connected source | Lead log |
| **% qualified** | Share of leads for whom the agreed qualifying answers (e.g. budget, type, locality, timeline) were captured | Lead log / CRM |
| **Bookings per 100 leads** | Site visits / viewings / appointments booked ÷ leads × 100 | Calendar + log |
| **No-show rate** | Booked visits or appointments where the person didn't come ÷ bookings | Client's record |
| **Owner-reported hours saved** | The owner's own estimate per week. **Always labelled "self-reported"** | Feedback interview |
| Context | Number of leads (n) per period, dates, sources connected, anything unusual (festive week, a new project launch, an ad budget change) | Notes |

**Baseline** = the build period before go-live (how leads were handled before the system). **After** = the 30 days from go-live. If n is under about 30 in either period, say "small sample" next to the numbers.

---

## 2. Case study template (fill in, then cut into formats)

```
CASE STUDY #[n]: [Headline = one measured change: "Median first reply: [before] → [after] (n = [ ] leads)"]
Status: [Founding client: discounted price in exchange for measurement and permission to publish] / [Full-price client]
Published: [named / anonymised] · Consent form signed: [date] · Client reviewed the draft: [date]

1. THE BUSINESS (only what the consent form allows)
   [Named: "Business name, city"] or [Anonymised: "A 4-agent brokerage in [city / 'a western Indian metro'] selling resale flats"]
   Lead sources: [ ] · Leads a month: [ ] · Who answered leads before: [ ]

2. BEFORE (measured during the build, [dates], n = [ ])
   - Median first reply: [ ]
   - Answered within 5 minutes: [ ]%
   - Qualified: [ ]%
   - Bookings per 100 leads: [ ] · No-show rate: [ ]%
   - In the owner's words: "[quote about the problem, from the Fit Call or interview, with permission]"

3. WHAT WE BUILT ([Offer], live in [n] working days after access)
   Diagram: [source 1] + [source 2] + [source 3] → WhatsApp first reply → AI qualifier (hot/warm/cold)
            → hot-lead alert to agent → visit booking + 24 h / 2 h reminders → 30-day follow-up → Sheet/CRM → 8 am digest
   Built on the client's own accounts: [BSP], [CRM/Sheet], [AI provider], [hosting]

4. AFTER (30 days from go-live, [dates], n = [ ])
   - Median first reply: [ ] (from when the lead reached the system)
   - Answered within 5 minutes: [ ]%
   - Qualified: [ ]%
   - Bookings per 100 leads: [ ] · No-show rate: [ ]%
   - Owner-reported hours saved: [ ] a week (self-reported)

5. MONTHLY RUNNING COST (actual, client's accounts)
   Meta WhatsApp fees ₹[ ] · provider plan ₹[ ] · AI usage ₹[ ] · hosting ₹[ ] · total ₹[ ] (before GST)

6. WHAT DIDN'T WORK (required)
   (Illustrative wording only: replace with what you actually found, with real counts.)
   - [e.g. "Portal alert emails reached the system [x] minutes after the enquiry, so portal leads missed the 1-minute target."]
   - [e.g. "The Hinglish qualifier misread budgets in [n] of the first 100 conversations; fixed on day [n]."]
   - [e.g. "Bookings changed but no-shows didn't; the 2-hour reminder timing needed changing."]

7. IN THE CLIENT'S WORDS (only if they chose to give one; word for word)
   "[exact quote]" (Name, title, if named; otherwise "the owner")

8. METHOD AND CAVEATS
   How each number was measured; sources excluded and why; seasonality (e.g. Diwali week in the baseline);
   "Results from one business; yours will differ."
```

**Prompts for "what didn't work"** (ask yourself and the client in the interview): Which source was slowest to reach the system? Where did the AI get it wrong? Which message got the most opt-outs? What did the team ignore? What would you build differently?

---

## 3. Publishing formats

| Format | Structure |
|---|---|
| **Carousel** (1080×1350, 8–9 slides, brand template) | 1 Hook: the one measured change, with n · 2 The business (anonymised or named) and the problem in their words · 3 Before (numbers, Leak Red) · 4 What we built (diagram) · 5 After at 30 days (numbers, Replied Green, with n) · 6 Running cost a month · 7 What didn't work · 8 Quote (if any) + method line · 9 CTA (Indigo): "Comment LEAKS" or "Book a free Fit Call" |
| **Reel** (30–45 s) | Hook: the before number on screen, then the after number, with "n = [ ] leads, measured" · screen recording of the real log (blurred) · one "what didn't work" line · CTA |
| **Results highlight** | Add the Results highlight **only once this first real case study exists** (strategy §5). Covers: the carousel + the Reel |
| **/case-studies page** | Planned for month 3 (not yet in the repo). Same sections as §2; method and caveats in full |
| **Proposals and Fit Calls** | A one-line mention with the link, only within the consent given |

**Caption must include:** the sample size and dates, the method in one line, the founding disclosure if relevant, "Shared with permission" (or "Anonymised"), and no claim beyond what was measured.

**Before publishing, check:**
- [ ] Every number matches the measurement sheet exactly (no rounding up).
- [ ] n and dates are shown.
- [ ] "What didn't work" is in.
- [ ] The consent form covers every item shown (name, logo, screens, quote, video) and every channel used.
- [ ] The client reviewed the final draft (date recorded).
- [ ] No customer data visible; screenshots blurred.
- [ ] Founding disclosure present (if founding).

---

## 4. Consent form (plain language)

Send as a Google Doc / PDF through Zoho Sign, or a Tally form that records the same answers. One per client. Keep the signed copy in the client folder.

✂ ───────────────────────────── consent form starts ─────────────────────────────

### Permission to share our results: AskHemant

**Business:** [legal name] · **Signed by:** [name, title] · **Project:** [offer, go-live date]

Hemant Kumar (AskHemant) would like to share how the system worked for your business, so other business owners can see real, measured results. **You choose exactly what is shared. You can say no to any or all of it, and saying no doesn't change anything about your service or price.** [Founding clients: "Your founding agreement already gives permission to publish the measured numbers, named or anonymised as you chose; this form records the details, and everything beyond the numbers is still optional."]

**1. What may be shared** (tick each one you agree to)

| Item | Yes | No |
|---|---|---|
| Our measured numbers (before and 30 days after), with the method and sample size | ☐ | ☐ |
| The type of business and city (e.g. "a brokerage in Pune") | ☐ | ☐ |
| Our business **name** | ☐ | ☐ |
| Our **logo** | ☐ | ☐ |
| Screenshots of the system, with all customer names and numbers blurred | ☐ | ☐ |
| A **quote** from me, exactly as written below | ☐ | ☐ |
| My **name and photo** next to the quote | ☐ | ☐ |
| A **video** testimonial (recorded separately; I see it before it's used) | ☐ | ☐ |

**2. Where it may be shared** (tick all that apply)
☐ Instagram / Facebook ☐ LinkedIn ☐ YouTube ☐ askhemant.ai ☐ In proposals and sales calls ☐ A downloadable PDF case study

**3. My quote** (in my own words; it will be used exactly as written, or not at all)
> "_______________________________________________________________"

**4. What AskHemant promises**
- I'll **show you the final version before it's published** and change anything that's factually wrong.
- I'll never publish your customers' names, numbers, chats or faces.
- I'll never edit your quote to sound better, and never add numbers you haven't seen.
- I'll show the method and the sample size, and include what didn't work.
- [Founding: I'll say you were a founding client who paid a discounted price in exchange for measurement and permission to publish.]

**5. Changing your mind**
You can withdraw any permission at any time by emailing **hello@askhemant.ai**. I'll remove the content from my own channels (Instagram, LinkedIn, YouTube, website, PDFs) **within 7 days**. I can't recall copies other people have already saved or shared. Withdrawing doesn't change your price or service.

**6. Payment**
I'm not paying you, or giving you a discount, for a testimonial. [Founding clients: the founding price was given in exchange for measurement and permission to publish the numbers, as set out in your agreement; the quote and video are still optional.]

**Signed:** ____________________ **Date:** __________
**AskHemant (Hemant Kumar):** ____________________ **Date:** __________

✂ ───────────────────────────── consent form ends ───────────────────────────────

---

## 5. Consent log (Client tab of the pipeline Sheet)

| Client | Form signed | Numbers | Name | Logo | Screens | Quote | Photo | Video | Channels | Draft reviewed | Published | Withdrawn |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | [date] | Y/N | Y/N | Y/N | Y/N | Y/N | Y/N | Y/N | [list] | [date] | [date, links] | [date or —] |
