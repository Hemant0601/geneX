# Fit Call Script (20 minutes)

**For:** Hemant · **Event:** Cal.com *Fit Call* (`https://cal.com/askhemant/fit-call`, 20 min, free, Tue–Thu, max 6 a week) on Google Meet
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §4 (offers), §5 (Fit Call script, funnel stage 7) · intake and routing: [`02-cal-com-intake-form.md`](./02-cal-com-intake-form.md) · prices: [`04-pricing-sheet.md`](./04-pricing-sheet.md) · after the call: [`03-proposal-template.md`](./03-proposal-template.md), [`07-follow-up-templates.md`](./07-follow-up-templates.md)

> **The promise of the call:** a diagnosis and an honest yes or no on fit. **Hemant diagnoses but doesn't design the solution on the call** (designing is what the Audit is for). No pressure, no "today only" offers. The only deadline you may mention is the real one: founding slots close **Mon 30 Nov 2026** or when full.
>
> Lines in quote blocks are said out loud. Hinglish lines (HI) are there for callers who switch to Hindi; Hindi first-person verbs are gendered, so adjust *karta/karti* to the form you use.

---

## 0. Before the call (10 minutes, the hour before)

- [ ] **Read the intake answers** on the Cal.com booking (business type, city/market, lead sources, leads a month, reply speed, task to fix first, budget band). Check the routing in [`02-cal-com-intake-form.md`](./02-cal-com-intake-form.md) §4 was applied; if a red-route booking slipped through, still take the call, but plan to end on the Kit + Session.
- [ ] **Look at their public presence for 3 minutes:** Instagram, website, a portal listing. Note the lead sources you can see. **Do not send a test enquiry without their consent.**
- [ ] **2-hour WhatsApp reminder sent** (`/confirm`): "Hi [Name], a quick reminder: our 20-min Fit Call is today at [time] IST on Google Meet: [link]. Reply 1 to confirm."
- [ ] Open: the **call notes template** (§6), the pipeline Sheet row, your WhatsApp chat with them, the [`04-pricing-sheet.md`](./04-pricing-sheet.md) cheat-table, and the **Audit payment link** `{{RAZORPAY_AUDIT_LINK}}` (quick reply `/audit`).
- [ ] Check **capacity**: how many Sprints are running (max 2 at once) and the earliest start date you can honestly offer.
- [ ] Check **founding slots** left (`foundingSlotsLeft` in [`website/assets/js/config.js`](../website/assets/js/config.js)) and today's date versus Mon 30 Nov 2026.
- [ ] Camera on, notifications off, a glass of water. Start the call 1 minute early.

---

## 1. Minute 0–2: open and set the frame

> "Hi [Name], thanks for making the time. Here's how I'd like to use the 20 minutes: you tell me how leads reach you and what happens to them, I'll ask a few questions, and by the end I'll tell you honestly whether I can help and what the next step would be. If I can't help, I'll say so and point you to the free fixes. Sound good?"

HI:
> "Hi [Name], time dene ke liye thanks. 20 minute aise use karte hain: aap batayiye leads aap tak kaise aati hain aur unke saath kya hota hai, main kuch sawaal poochunga, aur end mein seedha bataunga ki main help kar sakta hoon ya nahi, aur agla step kya hoga. Help nahi kar paaya toh woh bhi bataunga, aur free fixes bhi. Theek hai?"

If they ask to record: fine, agree. If you want to record: ask first ("Mind if I record this for my notes? It stays private.") and only if they say yes.

---

## 2. Minute 2–10: diagnose

Ask in this order. Write their **exact words** for the problem; they go into the proposal's "the problem, in your words" box. Don't pitch, don't design, don't mention tools yet.

| # | Question (EN) | HI | Listen for |
|---|---|---|---|
| 1 | "Walk me through where your leads come from. Which sources, and roughly how many a month from each?" | "Leads kahan-kahan se aati hain? Har source se mahine mein lagbhag kitni?" | 99acres / MagicBricks / Housing.com, Meta lead ads, Instagram DMs, website, referrals, walk-ins; Property Finder / Bayut / Dubizzle (Dubai); phone calls (clinics). Volume per source. **Under about 20 a month total = too few to show a return** |
| 2 | "When a new enquiry comes in, who replies, and how fast, honestly?" | "Nayi enquiry aati hai toh reply kaun karta hai, aur kitni der mein? Honestly." | Owner by hand, a junior, nobody at night; "jab time mile" |
| 3 | "What happens to an enquiry that comes in at 10 pm, or while you're on a site visit or with a patient?" | "Raat 10 baje ya site visit / patient ke time jo enquiry aati hai, uska kya hota hai?" | After-hours leak; NRI buyers in Gulf/UK/US time zones (a hypothesis to test: note it if it comes up) |
| 4 | "After the first reply, what happens next? Do you ask any questions before calling back?" | "Pehle reply ke baad kya hota hai? Call back se pehle koi sawaal poochte hain?" | No qualification; junk Meta leads eating calling time |
| 5 | "How do site visits / appointments get booked, and does anyone remind people?" | "Site visit ya appointment kaise book hoti hai, aur reminder koi bhejta hai?" | No reminders, no-shows, no Maps pin |
| 6 | "If someone doesn't reply after day 2, what happens?" | "Day 2 ke baad agar lead reply na kare, toh kya hota hai?" | No follow-up at all |
| 7 | "Where does every lead end up: a sheet, a CRM, WhatsApp chats? Can you see what happened to each one?" | "Saari leads end mein kahan jaati hain: sheet, CRM, ya WhatsApp chats mein? Har lead ka kya hua, dikh jaata hai?" | Not logged; owner can't see juniors' replies |
| 8 | "Roughly what's one closed deal worth to you? Commission, or average treatment value?" | "Ek closed deal aapke liye lagbhag kitne ki hoti hai? Commission ya average treatment value?" | **Their number, not yours.** You'll use it only in their own ROI worksheet |
| 9 | "What have you already tried? A CRM, a WhatsApp tool, Meta's free AI, a VA?" | "Ab tak kya try kiya hai? CRM, koi WhatsApp tool, Meta ka free AI, koi assistant?" | What failed and why; tools to reuse |
| 10 | "Who else decides on something like this, and when would you want it working?" | "Is tarah ka decision aur kaun leta hai, aur aap ise kab tak chalu dekhna chahenge?" | Partner/doctor co-owner; festive season; launch of a new project |

**Short on time?** Questions 1, 2, 6, 8 are the minimum.

---

## 3. Minute 10–15: name the leaks and recommend

### 3.1 Name the 1–2 biggest leaks (in their words)

Map what you heard to the kit's 7 leaks: (1) after-hours enquiries · (2) portal leads that never reach WhatsApp · (3) unanswered Instagram DMs · (4) no qualifying questions · (5) no visit reminders · (6) no follow-up after day 2 · (7) leads not logged anywhere. For clinics: missed calls, no-shows, no recall or review requests.

> "From what you've told me, the two biggest leaks are [leak 1, using their words: 'the portal leads that wait until the next morning'] and [leak 2: 'nobody follows up after day two']. The rest are smaller. Does that match how it feels from your side?"

HI:
> "Aapne jo bataya, usme do sabse bade leaks hain: [leak 1, unke shabdon mein] aur [leak 2]. Baaki chhote hain. Aapko bhi aisa hi lagta hai?"

**Rules:** use only numbers they gave you. Don't estimate their lost revenue for them. If you mention outside data, say the source: *"In a US audit of 2,241 firms, only about 37% answered web leads within an hour (BYU / HBR)."* Never present it as your result.

### 3.2 Choose the recommendation

| If… | Recommend | Say |
|---|---|---|
| **Simple setup:** 1–3 sources, 1–2 people replying, sources you're confident you can capture, clear decision-maker | **Speed-to-Lead Sprint (Solo)** ₹34,999 / $1,499, or **Missed-Call & No-Show Recovery Sprint** for clinics (same price) | §4 "Sprint" |
| **Not simple:** 4+ sources, a team of 3+ agents, a portal you're unsure about, a CRM already in place, or they want depth before committing | **Lead Leak Audit** ₹9,999 / $499 (100% credited to a Sprint booked within 30 days) | §4 "Audit" |
| 3–10 agents, round-robin or by-area assignment, a CRM, manager reporting | **Audit first**, then likely the **Speed-to-Lead System (Team)** ₹79,999 / $2,999 | §4 "Audit", mention Team as the likely build |
| In niche, about 40–500 enquiries a month, 2+ sources, OK with measured and published results, **before Mon 30 Nov 2026 with slots open** | **Founding Client Program** ₹14,999 / $599 for Audit + Solo or Clinic Sprint | §4 "Founding" |
| Wants an internal AI assistant or an AI product | **Audit first** (Custom AI Agent / AI Product Build is scoped only after an Audit; from ₹1,50,000 / $6,000) | §4 "Audit" |
| One repetitive workflow outside lead handling | **Quick Win Build** ₹24,999 / $999 | §4 "Quick Win" |
| Under about 20 leads a month, budget under ₹15K, out of niche, or a "general ChatGPT on WhatsApp" bot | **Not a fit:** the free Kit + the **Ask Hemant Session** ₹1,999 / $99 | §4 "Not a fit" |
| Wants bulk or cold WhatsApp blasting | **Decline** | §4 "Decline" |

---

## 4. Minute 15–20: price, timeline, next step

Say the price plainly, once, then stop talking.

### Audit (send the payment link during the call)
> "My recommendation is the Lead Leak Audit. It's ₹9,999 [or $499], done in 5 working days. You fill a short pre-audit form, we do a 60-minute workshop, and with your permission I send timed test enquiries through up to 3 of your own channels. You get a Leak Report with each leak, the evidence, the fix and the effort; a map of your lead flow today and after; an ROI worksheet using your own numbers; and a fixed quote for the build. If you go ahead with a Sprint within 30 days, the full ₹9,999 is credited. Shall I send the payment link on WhatsApp now?"

HI:
> "Meri recommendation Lead Leak Audit hai. ₹9,999, 5 working days mein. Aap ek chhota pre-audit form bharte hain, 60 minute ka workshop hota hai, aur aapki permission se main aapke 3 tak channels par timed test enquiries bhejta hoon. Aapko milegi Leak Report: har leak, uska proof, fix aur effort; aaj ka aur naya lead flow map; aapke apne numbers par ROI worksheet; aur build ka fixed quote. 30 din mein Sprint lete hain toh poore ₹9,999 credit. Payment link abhi WhatsApp par bhej doon?"

**If yes, send on WhatsApp while still on the call** (India):
> Here's the Lead Leak Audit payment link (₹9,999, 100% credited to a Sprint booked within 30 days): {{RAZORPAY_AUDIT_LINK}}. Price excludes GST. As soon as it's through, I'll send the pre-audit form and the workshop booking link (within 1 working day).

**Outside India:** "I'll send you a Skydo invoice for $499 today." Then send it the same day ([`09-invoicing-and-tax-notes-india.md`](./09-invoicing-and-tax-notes-india.md) §5.1).

### Sprint (proposal within 24 hours)
> "Your setup is simple enough to skip the Audit. The Speed-to-Lead Sprint is ₹34,999 [or $1,499], live in 10 working days from the day I have all the access. It covers up to 3 lead sources, an instant WhatsApp first reply on the official platform, an AI qualifier scoped to your business, alerts for hot leads, visit booking with reminders, 30 days of follow-up, and a lead log with an 8 am digest. 50% to start, 50% at go-live. The WhatsApp message fees and provider plan are on your own account; I'll put an estimate for your volume in the proposal. I'll send a one-page proposal with two options and a 3-minute video by [tomorrow, time]. It's valid for 7 days."

HI:
> "Aapka setup simple hai, Audit skip kar sakte hain. Speed-to-Lead Sprint ₹34,999 ka hai, saara access milne ke 10 working days mein live. 3 tak lead sources, official platform par turant WhatsApp reply, aapke business ke hisaab se AI qualifier, hot leads ke alerts, reminders ke saath visit booking, 30 din ka follow-up, aur lead log ke saath subah 8 baje ka digest. 50% shuru mein, 50% go-live par. WhatsApp message fees aur provider plan aapke apne account par; aapke volume ka estimate proposal mein hoga. Kal [time] tak ek page ka proposal, do options aur 3 minute ka video bhej dunga. 7 din valid rahega."

**Never promise:** "within a minute" as an outcome ("it's designed to reply within a minute of the lead reaching the system"), deals, revenue, or a start date you can't keep with 2 Sprints already running.

### Founding (agreement within 24 hours)
> "You're a good fit for one of my 3 founding slots. It's the Audit plus the full Sprint for ₹14,999 [$599] instead of ₹34,999 [$1,499], same scope. In return, in writing: we measure how leads are handled now during the build, measure again 30 days after go-live, and I can publish the numbers, named or anonymised, your choice. A testimonial only if you're happy, in your own words, and a 30-minute feedback interview. It closes on Mon 30 Nov or when the 3 slots are signed. If you'd like it, I'll send the written terms within 24 hours; the 50% deposit comes after you've signed."

Rules: offer it only to people who meet the criteria in [`10-founding-client-program.md`](./10-founding-client-program.md) §4. **Don't send `{{RAZORPAY_FOUNDING_LINK}}` until the agreement is signed.**

### Quick Win
> "That's a single workflow, so it's a Quick Win Build: ₹24,999 [$999], 7 to 10 working days, with documentation, a handover video and a 14-day bug-fix window. I'll confirm the exact steps in a one-page proposal by [tomorrow]."

### Not a fit
> "Honestly, a full system isn't the right fit yet, [because you get under about 20 leads a month / because it's outside what I build]. Two things that will help: the free Lead Leak Kit covers the quick fixes with tools you already have, and if you want an hour of focused help, the Ask Hemant Session is ₹1,999 [$99], with the recording and a written action list within 24 hours. And if you build with me within 14 days, the fee is credited."

HI:
> "Seedhi baat: abhi full system sahi fit nahi hai, [kyunki mahine mein 20 se kam leads hain / kyunki yeh mere kaam ke bahar hai]. Do cheezein kaam aayengi: free Lead Leak Kit aapke existing tools se quick fixes deta hai, aur ek ghante ki focused help chahiye toh Ask Hemant Session ₹1,999 ka hai, recording aur 24 ghante mein written action list ke saath. 14 din mein build karte hain toh fees credit."

Then send `/notfit` or `/session` on WhatsApp.

### Decline (bulk / cold WhatsApp)
> "I don't build bulk or cold WhatsApp broadcasts. They break Meta's rules and get numbers banned, and since 15 Jan 2026 general-purpose AI chatbots aren't allowed on the WhatsApp Business Platform either. What I can do is make sure every person who *does* enquire gets answered."

---

## 5. Common questions on the call

| They ask | Answer |
|---|---|
| "Can you do it cheaper?" | "The price is published and the same for everyone. If the Sprint feels like too big a step, the Audit is ₹9,999 and fully credited; or the free kit first." (+ founding, if eligible) |
| "Meta's WhatsApp AI is free now." | "Use it if you only need FAQs. It doesn't pull in your portal and Meta-form leads, qualify them your way, alert the right agent, book the visit and follow up on day 7. That's the connected part I build." |
| "Do you guarantee results?" | "No. I commit to the scope, the 10-working-day timeline (or your first month of Lead Desk Care is free) and the bug-fix warranty. Results we measure, not promise." |
| "Who owns it?" | "You. It runs on your accounts, and the build is yours on full payment. I keep my general templates." |
| "What does it cost to run?" | "WhatsApp charges per message started by the business; replies inside 24 hours are free. At about ₹0.86 per marketing message (one reseller's India rate), 300 leads × 3 follow-ups is about ₹775 a month before GST and provider fees. I'll estimate yours in the proposal." |
| "Can I see a client result?" | "Not yet: I'm new, and I won't show you anything I haven't measured. You can see my own funnel working (comment LEAKS on any post) and the demos, which are labelled as fictional businesses." |
| "What if it breaks?" | "14-day bug-fix warranty (30 days on the Team system). After that, Lead Desk Care at ₹9,999 a month covers monitoring and fixes within 1 working day." |
| "Data / privacy?" | "Everything stays on your accounts. I act as your data processor under a written clause, use minimal data, and remove my access at the end." |

---

## 6. Call notes template (copy into the Sheet or a doc)

```
Fit Call · [Name] · [Business] · [date, time IST] · lane: RE / CL / GEN · market: India / UAE / other
Sources & volume:     [source: n/month] [source: n/month] ...  Total ≈ [n]/month
Who replies / speed:  [who] · [typical first-reply time] · after hours: [what happens]
After first reply:    [qualification? booking? reminders? follow-up after day 2?]
Logging:              [sheet / CRM / none]
Deal value (theirs):  [₹/$ per closed deal, their words]
Tried already:        [tools]
Decision-maker(s):    [who] · wanted by: [date]
The problem, in their words: "[exact quote]"
Leak 1: [ ]   Leak 2: [ ]
Recommendation:       Audit / Solo Sprint / Clinic Sprint / Team (after Audit) / Founding / Quick Win / Session / not a fit
Next step agreed:     [payment link sent? proposal by (date/time)? founding terms by (date/time)?]
NRI after-hours angle mentioned?  yes / no
```

---

## 7. Post-call checklist

**Within 15 minutes**
- [ ] Update the pipeline Sheet: stage → **Showed**, then **Proposal** or **Won/Lost**; value; lane; next step + date.
- [ ] WhatsApp label: Showed / Proposal / Won.
- [ ] Send the **recap** ([`07-follow-up-templates.md`](./07-follow-up-templates.md) §1): the 2 leaks in their words, the recommendation, the next step.

**If the Audit link was sent**
- [ ] Payment received? → send the pre-audit form and the hidden **Audit Workshop** link (`https://cal.com/askhemant/audit-workshop`) **within 1 working day**, and log the receipt ([`09-invoicing-and-tax-notes-india.md`](./09-invoicing-and-tax-notes-india.md)).
- [ ] Not paid by the next morning → one gentle reminder (07 §8), then wait.

**If a proposal is due**
- [ ] Proposal + 3-minute Loom **within 24 hours** ([`03-proposal-template.md`](./03-proposal-template.md)), valid **7 days**.
- [ ] Per-client Razorpay Payment Link (50% deposit) or Skydo invoice prepared, expiring with the proposal.
- [ ] Calendar reminders for the follow-ups on **D+2, D+5, D+7** (07 §3).

**If founding**
- [ ] Score them against the criteria in [`10-founding-client-program.md`](./10-founding-client-program.md) §4. Send the agreement with the founding schedule ([`05-consulting-agreement-template.md`](./05-consulting-agreement-template.md) Schedule E) **within 24 hours**, or a kind decline.

**If not a fit**
- [ ] Send `/notfit` + kit + Session link. Stage → Lost (reason: not fit). Ask: "Would it be OK if I check in when your volume grows?" Only follow up if they say yes.

**Every call**
- [ ] Write one line for the weekly scorecard: what objection came up, what leak, and whether the NRI angle appeared.
- [ ] No-show? → rebook message 10 minutes after the start time (07 §6), once.
