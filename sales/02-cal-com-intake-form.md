# Cal.com Event Types, Intake Form and Routing Rules

**For:** Hemant · **Account:** cal.com/askhemant (Cal.com Free) · **Embedded at:** askhemant.ai/book
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §4 ("Free or paid discovery call?") and §5 (funnel stages 5–6) · account clicks: [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §9 · the call itself: [`01-fit-call-script.md`](./01-fit-call-script.md)

> **The rule in one line:** the Fit Call is **free but gated**. Anyone whose budget is **under ₹15K**, or who is **outside the niche**, gets the free **Lead Leak Kit** and the **₹1,999 / $99 Ask Hemant Session** link instead of a free call (strategy §4).
>
> Cal.com menu names below are general knowledge and **unverified** (hidden events, booking limits, booking-question types, "requires confirmation", routing forms and webhooks on the free plan were not researched). Fix this file if your screen differs.

---

## 1. Event types

| Event | URL | Length | Visibility | Who gets the link | Availability schedule | Key settings |
|---|---|---|---|---|---|---|
| **Fit Call** | `https://cal.com/askhemant/fit-call` | 20 min | **Public** (embedded on /book) | Everyone, via bio link 1 and the site | **Fit Calls:** Tue–Thu 11:00–13:00 and 16:00–18:00 IST, plus 2 evening slots (Tue 19:30–19:50, Thu 20:30–20:50 IST) for the UK and US East | Max **6 bookings a week**; minimum notice **12 hours** (time to read the intake); 10-min buffer after; bookable up to 21 days ahead; Google Meet; the intake form in §2 |
| **Ask Hemant Session** | `https://cal.com/askhemant/ask-hemant-session` | 45 min | Hidden | Shown on the Razorpay / PayPal success page after paying ₹1,999 / $99 | **Paid work:** Mon–Fri 11:00–13:00 and 15:00–18:00 IST, plus Tue/Thu 19:30–21:00 | Minimum notice 4 hours (the Session promise is **within 48 hours**); questions in §3 |
| **Audit Workshop** | `https://cal.com/askhemant/audit-workshop` | 60 min | Hidden | Sent within 1 working day of the ₹9,999 / $499 Audit payment | Paid work | Question: "Who else from your team will join?" |
| **Audit Review** | `https://cal.com/askhemant/audit-review` | 30 min | Hidden | Sent with the Leak Report and Loom (Audit day 5) | Paid work | — |
| **Kickoff** | `https://cal.com/askhemant/kickoff` | 45 min | Hidden | Sent after the deposit and the signed agreement | Paid work | Question: "Have you completed the onboarding form? (yes/no)" |
| **Client call** *(optional)* | `https://cal.com/askhemant/client-call` | 45 min | Hidden | Active clients only | Paid work | For the day-5 demo, go-live training, the 2 Team training sessions and the monthly Growth optimisation call |

If Cal.com Free doesn't offer **hidden** event types, keep them off the public profile by sending their links by hand only ([`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §9).

### Event descriptions (paste into each event)

**Fit Call**
> A 20-minute diagnosis of your lead flow and an honest yes or no on fit. Free. I'll only pitch if it's a fit.
>
> Please answer the 7 short questions so I can come prepared. If your budget is under ₹15K, or your business is outside real estate and clinics, I'll point you to the free kit and the paid Session instead: it's not a trap, it just saves you 20 minutes.

**Ask Hemant Session**
> 45 minutes on any AI or automation question. You get the recording and a written action list within 24 hours. 100% of the fee is credited to an Audit or build booked within 14 days. Book only after paying (₹1,999 / $99, price excludes GST).

**Audit Workshop**
> The 60-minute workshop for your Lead Leak Audit. Please fill the pre-audit form first. Bring whoever replies to your leads day to day.

**Audit Review**
> 30 minutes to go through your Leak Report, the lead-flow map, the ROI worksheet (your numbers) and the fixed quote.

**Kickoff**
> 45 minutes to start your build: we go through the access checklist together, confirm the scope and set the go-live date. The 10-working-day clock starts when the checklist is complete.

---

## 2. The Fit Call intake form (Cal.com → event → Advanced → Booking questions)

Cal.com already asks for **name** and **email**. Add these, in this order, all **required** except Q9. Question types are Cal.com's standard ones *(names unverified)*.

| # | Label (exact) | Type | Options (exact) | Help text |
|---|---|---|---|---|
| 1 | **What kind of business do you run?** | Select (dropdown) | `Real estate: broker or agent (India)` · `Real estate: channel partner` · `Real estate: developer sales team` · `Real estate: broker or agency in Dubai / UAE` · `Clinic: dental` · `Clinic: skin / aesthetic` · `Clinic: physio` · `Clinic: other` · `Marketing agency (I run ads or marketing for clients)` · `Other business` | — |
| 2 | **Which city or market are you in?** | Short text | — | e.g. Pune, Gurugram, Dubai Marina |
| 3 | **Where do your leads come from?** | Multiple select (checkboxes) | `99acres / MagicBricks / Housing.com` · `Property Finder / Bayut / Dubizzle` · `Meta (Facebook/Instagram) lead ads` · `Instagram DMs` · `Website form` · `Phone calls` · `WhatsApp` · `Referrals` · `Walk-ins` · `Other` | Tick all that apply |
| 4 | **Roughly how many leads or enquiries do you get a month?** | Select | `Under 20` · `20–40` · `40–100` · `100–500` · `500+` | A rough range is fine (same ranges as the kit form) |
| 5 | **How fast does a new lead usually get its first reply today?** | Select | `Within 5 minutes` · `Within an hour` · `Same day` · `Next day or later` · `Honestly, I don't know` | "I don't know" is a useful answer |
| 6 | **What's the one thing you'd fix first?** | Long text | — | e.g. "night-time portal leads", "follow-ups", "no-shows". Applying for a founding slot? Write "founding" here |
| 7 | **What budget do you have in mind for fixing it?** | Select | `Under ₹15K (under about $170)` · `₹15–40K (about $170–450)` · `₹40K–1L (about $450–1,150)` · `₹1L+ (about $1,150+)` | All my prices are published at askhemant.ai/pricing. USD figures use ₹88 = $1 |
| 8 | **Your WhatsApp number** | Phone | — | For the 2-hour reminder only. I won't add you to any list |
| 9 | Anything else I should know? | Long text, optional | — | — |

Privacy line under the form (Cal.com description or the /book page): *"Your answers go to Cal.com and to Hemant's private pipeline sheet, only to prepare for the call. Privacy notice: askhemant.ai/privacy."*

**Why these exact questions:** they are the 7 gate questions in strategy §4 (business type, city or market, lead sources, leads a month, reply speed, task to fix first, budget band), plus the number for the WhatsApp reminder (strategy §5 stage 6). Q1's options map to the lanes: real estate → **RE**, clinic → **CL**, agency / other → **GEN**.

---

## 3. Session and Audit booking questions

**Ask Hemant Session** (after payment):
1. **What do you want to ask?** (long text, required)
2. **Name or email you paid with** (short text, required) so you can match it to the Razorpay or PayPal payment before the call.
3. **Anything I should look at beforehand?** (URL or long text, optional)

**Audit Workshop:** "Who else from your team will join?" (short text, optional).
**Kickoff:** "Have you completed the onboarding form?" (yes/no).

Check every Session and Audit booking against a received payment. If a booking has no payment, message once: "Hi [Name], I can't see the payment for this booking yet. Here's the link: [link]. The slot stays reserved for 12 hours."

---

## 4. Routing rules (apply to every Fit Call booking within 4 working hours)

The 12-hour minimum notice gives you time to triage. Open each new booking and give it a colour:

| Colour | Rule | Action |
|---|---|---|
| **Green: keep** | Q1 is real estate (India or UAE) or a clinic **and** Q7 is ₹15–40K or higher **and** Q4 is 20 or more | Keep the call. Prepare with [`01-fit-call-script.md`](./01-fit-call-script.md) §0 |
| **Green + founding flag** | Green, Q6 mentions "founding", Q4 is 40–100 or 100–500 (or 500+), before Mon 30 Nov 2026 with slots left | Keep. Read [`10-founding-client-program.md`](./10-founding-client-program.md) §4 before the call. Max 1 founding slot for a Dubai broker |
| **Green: Team or Audit likely** | Green and (Q7 is ₹40K–1L or ₹1L+, or 4+ sources ticked, or a team mentioned) | Keep. Expect to recommend the Audit, then the Team system |
| **Amber: keep, set expectations** | In niche, budget ≥ ₹15K, but Q4 is `20–40` or Q5 is `Within 5 minutes` | Keep. Be ready to say a full system may not pay off yet |
| **Red: route to Kit + Session** | Q7 is **Under ₹15K**, **or** Q4 is **Under 20**, **or** Q1 is **Other business** | Cancel with message R1 (below) |
| **Red: agency before partner launch** | Q1 is **Marketing agency** and the booking is before **Mon 16 Nov 2026** | If Q6 names a specific broker or clinic client with a lead problem: keep. Otherwise cancel with message R2 |
| **Agency from 16 Nov** | Q1 is Marketing agency | Keep (Agency Partner channel, list price −25%) |
| **Red: declined work** | Q6 asks for bulk or cold WhatsApp messaging, or a general-purpose ChatGPT bot on WhatsApp | Cancel with message R3 |
| **Week full** | A 7th booking in the same week, or 2 Sprints already running and they need a start this month | Move to next week with message R4 (Cal.com's weekly limit should stop this) |
| **Spam / test** | Fake details | Cancel without a message |

**Founding-only note:** Q4 of 20–40 is below the founding range (about 40–500 enquiries a month); keep the call if green, but don't offer a founding slot.

### Cancellation and reschedule messages (paste into Cal.com's cancellation reason, and send the same on WhatsApp)

**R1: route to Kit + Session**
- **EN:** Hi [Name], thanks for booking. I read your answers before every call, and I don't think a free Fit Call is the best use of your time yet, [because a full system pays off from about 20 leads a month / because my builds focus on real estate and clinics / because the build starts above ₹15K]. Two things that will help right now: the free Lead Leak Kit (askhemant.ai/kit) covers the quick fixes with tools you already have, and if you'd like 45 minutes of focused help on your exact setup, the Ask Hemant Session is ₹1,999 / $99 with a written action list: askhemant.ai/pricing. The fee is credited if we build within 14 days.
- **HI:** Hi [Name], booking ke liye thanks. Har call se pehle answers padhta hoon, aur lagta hai abhi free Fit Call aapke time ka sabse achha use nahi hoga, [kyunki full system mahine ki lagbhag 20 leads se upar faayda deta hai / kyunki mere builds real estate aur clinics par focused hain / kyunki build ₹15K se upar shuru hota hai]. Abhi do cheezein kaam aayengi: free Lead Leak Kit (askhemant.ai/kit) existing tools se quick fixes deta hai, aur apne setup par 45 minute ki focused help chahiye toh Ask Hemant Session ₹1,999 ka hai, written action list ke saath: askhemant.ai/pricing. 14 din mein build karein toh fees credit.

**R2: agency before 16 Nov**
- **EN:** Hi [Name], thanks for booking. I'm opening the Agency Partner option from Mon 16 Nov: any of my systems, built under your brand, at list price −25%. Until then I'm only taking calls about a specific broker or clinic client. If you have one in mind, rebook and name them in the "fix first" box; otherwise email hello@askhemant.ai and I'll send the partner details when it opens.
- **HI:** Hi [Name], booking ke liye thanks. Agency Partner option Mon 16 Nov se khul raha hai: mere systems aapke brand ke under, list price se 25% kam. Tab tak sirf kisi specific broker ya clinic client ke baare mein calls le raha hoon. Koi client dhyan mein hai toh rebook karke "fix first" box mein unka zikr kijiye; warna hello@askhemant.ai par email kijiye, partner details khulte hi bhej dunga.

**R3: declined work**
- **EN:** Hi [Name], thanks for booking. I don't build bulk or cold WhatsApp broadcasts, or general-purpose chatbots on WhatsApp (Meta has banned those on the Business Platform since 15 Jan 2026). If you ever want every incoming enquiry answered fast instead, I'd be glad to help: askhemant.ai/kit is a good start.
- **HI:** Hi [Name], booking ke liye thanks. Bulk ya cold WhatsApp broadcasts, ya WhatsApp par general-purpose chatbots main nahi banata (Meta ne 15 Jan 2026 se Business Platform par inhe ban kiya hai). Agar kabhi har aane waali enquiry ka fast reply chahiye ho, toh zaroor help karunga: askhemant.ai/kit se shuru kijiye.

**R4: week full**
- **EN:** Hi [Name], thanks for booking. This week's calls are full, so I'd rather move you than rush it. Could you pick a slot next week here: https://cal.com/askhemant/fit-call? Sorry for the shuffle.
- **HI:** Hi [Name], booking ke liye thanks. Is hafte ki calls full hain, aur jaldi mein karne se behtar hai agle hafte theek se karein. Yahan agle hafte ka slot chun lijiye: https://cal.com/askhemant/fit-call. Asuvidha ke liye maafi.

**Optional automation:** Cal.com has a **"Requires confirmation"** setting and a **Routing Forms** app that could send Q7 = Under ₹15K straight to the Session page *(both unverified on the free plan)*. Default: **leave them off** and triage by hand, so good leads aren't kept waiting. Turn "requires confirmation" on only if spam bookings appear.

---

## 5. Confirmation and reminders

- **Booking confirmation** (Cal.com email, standard). Add to the confirmation text: *"I'll send a WhatsApp reminder 2 hours before. If you need to move it, use the reschedule link in this email."*
- **24-hour email reminder** through Cal.com Workflows, if the free plan allows *(unverified)*.
- **2-hour WhatsApp reminder by hand** from the WhatsApp Business app (`/confirm`):
  > Hi [Name], a quick reminder: our 20-min Fit Call is today at [time] IST on Google Meet: [link]. Reply 1 to confirm.
  - **HI:** Hi [Name], yaad dila raha hoon: aaj [time] IST par Google Meet par hamari 20-min Fit Call hai: [link]. Confirm karne ke liye 1 reply kijiye.
- **No reply to the reminder:** join anyway. **No-show after 10 minutes:** rebook message in [`07-follow-up-templates.md`](./07-follow-up-templates.md) §6.

---

## 6. Into the pipeline Sheet

Each booking becomes a row in the **Calls** tab (booking date, call date, showed y/n, outcome, next step) and moves the Leads row to **Call booked** ([`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §20). Cal.com webhooks → n8n on the free plan are unverified; if they're missing, add rows by hand after triage. Copy Q1 (lane), Q3, Q4 and Q7 into the row: they feed the **day-60 niche decision** (strategy §9).

---

## 7. When to change the rule (check at day 60, Thu 17 Dec 2026)

If **any** of these is true by day 60 (strategy §4):
- more than **8 Fit Calls a week**, or
- a **show rate below 70%**, or
- **3+ documented results** exist,

then either **shorten the Fit Call to 15 minutes** (change the event length and the description) **or make the ₹9,999 / $499 Lead Leak Audit the only way in** (hide the Fit Call, point /book at the Audit payment, and update bio link 1). Log the decision in [`docs/04-weekly-operating-system.md`](../docs/04-weekly-operating-system.md).
