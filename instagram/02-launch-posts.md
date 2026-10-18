# Launch posts: P01–P10 and trial reels T01–T04

**For:** Hemant Kumar · **Written:** Sun 18 Oct 2026 · **Covers:** Mon 19 Oct – Sun 1 Nov 2026 (launch weeks 1 and 2)
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) (§4 offers and prices, §5 funnel and DM scripts, §6 content system, §8 proof rules) and [`docs/01-brand-and-domain.md`](../docs/01-brand-and-domain.md) (§7 visual identity, §8 voice).
**Related files:** carousel slide spec for the graphics builder → [`carousels.json`](./carousels.json) · profile and automations → [`01-profile-setup.md`](./01-profile-setup.md) · DM flows → [`07-dm-automation-playbook.md`](./07-dm-automation-playbook.md) · rendered graphics → [`graphics/`](./graphics/) · tracking → [`content-tracker.csv`](./content-tracker.csv) · demo workflows → [`automations/demo/`](../automations/demo/) · posts from Mon 2 Nov (P11 onward) → [`03-content-calendar-30-days.md`](./03-content-calendar-30-days.md).

---

## Contents

- [Rules for every post](#rules-for-every-post)
- [Schedule at a glance](#schedule-at-a-glance)
- [Comment-keyword automations these posts rely on](#comment-keyword-automations-these-posts-rely-on)
- [Production plan: what to record when](#production-plan-what-to-record-when)
- Week 1: [P01](#p01--mon-19-oct--reel--no-lead-waits-intro) · [T01](#t01--tue-20-oct--trial-reel-of-p01) · [P02](#p02--tue-20-oct--carousel--who-i-help-how-i-work-my-prices) · [P03](#p03--wed-21-oct--reel--watch-the-timer-skyline-realty--demo) · [P04](#p04--thu-22-oct--carousel--7-places-your-enquiries-go-cold) · [T02](#t02--thu-22-oct--trial-reel-of-p03) · [P05](#p05--fri-23-oct--reel--automatekaro-the-10-pm-test)
- Week 2: [P06](#p06--mon-26-oct--reel--im-taking-3-founding-clients) · [T03](#t03--tue-27-oct--trial-reel-of-p06) · [P07](#p07--tue-27-oct--carousel--open-price-book-the-34999--1499-sprint) · [P08](#p08--wed-28-oct--reel--build-log-1-my-own-instagram-funnel) · [P09](#p09--thu-29-oct--carousel--metas-free-whatsapp-ai-vs-what-you-actually-need) · [T04](#t04--thu-29-oct--trial-reel-of-p08) · [P10](#p10--fri-30-oct--reel--missed-call--whatsapp-text-back-smilecare-dental--demo)

---

## Rules for every post

These come from the strategy's proof rules (§8) and the brand checklist (`01-brand-and-domain.md` §8). None of them bend.

1. **DEMO label.** Every frame that shows Skyline Realty or SmileCare Dental carries the amber **`DEMO – fictional business`** badge, top-left, from the first frame to the last. That includes the Reel cover. The caption says it too. Never crop it out.
2. **The stopwatch is real.** Each timed segment (lead arrives → reply sent) is **one uncut take**.
   - Record the stopwatch inside the same OBS scene: a browser-source stopwatch, or a phone stopwatch in frame. Then the amber pill you add in the edit only copies the time the recording already shows.
   - If you speed up any later part (qualification, booking), label it **"2× speed"** on screen. The recorded clock keeps showing real elapsed time.
   - Never trim frames out of a timed segment.
3. **Times are read off the recording.** Script lines in `[square brackets]`, such as `[mm:ss from the recording]`, are filled in from the real footage or the real Sheet at edit time. **Never pre-fill them.** If a real number is 0, say 0.
4. **"Within a minute" is a design target**, counted from when the lead reaches the system. It's never a promise or a measured client result. Say "design target" on screen or in the voiceover in every demo.
5. **Every statistic shows its source** on screen (Slate, small) and in the caption. Only statistics from the strategy are used here, each with its source. Vendor numbers are never presented as Hemant's results.
6. **No invented proof.** No client names, testimonials, results, follower counts, years of experience or "as seen in". AskHemant is new, and the posts say so.
7. **One CTA per post**, and every comment CTA adds "check your message requests". The DM lands there for non-followers.
8. **Prices** are exactly as published, in INR and USD. Add "prices exclude GST" wherever a price appears in a caption.
9. **Reels:**
   - Burned-in captions in Inter SemiBold, white, on an 80% Ink box, so the Reel works with the sound off.
   - Keep text out of the top 220 px and bottom 420 px (Instagram UI); a safe-zone default, check on a phone.
   - Covers are 1080×1920, with the title in the central 3:4 safe zone because the grid crops them.
   - Speak the keyword phrase in the first sentence when it fits (Instagram transcribes audio for search).
10. **Carousels:**
    - 1080×1350 with 64 px margins. Sources go in Slate at the bottom.
    - The **hook slide is Ink on Paper**. The `highlight` word gets an **amber marker band behind Ink text**, never amber text on a light background (1.68:1 fails).
    - On Ink or Indigo slides (the CTA slide), the highlight may be **amber text**, at large sizes only.
    - The last slide is the **Indigo CTA**.
    - Slide copy lives in [`carousels.json`](./carousels.json). The tables below mirror it; if they ever differ, the JSON wins for the graphics.
11. **Hinglish** where marked: Hinglish voiceover with **English on-screen text**. Don't mix languages within one on-screen line.
12. **Captions:** the keyword-rich phrase goes in the first line; use 3–5 hashtags (the cap since Dec 2025); add custom alt text (Advanced settings → Accessibility); pin your own CTA comment.
13. **Real personal data** (any real commenter, lead or phone number) is blurred. Every demo uses fictional names and `XXXX` numbers.
14. **Log every post** in [`content-tracker.csv`](./content-tracker.csv) with its ID, lane and keyword before you publish.

---

## Schedule at a glance

Times are IST and match [`03-content-calendar-30-days.md`](./03-content-calendar-30-days.md), which owns the schedule. Feed posts go out at 15:00, inside the strategy's 2–5 pm window. The Friday Reels test the evening slot (P05, 19:30) against the afternoon (P10, 15:00), as §6 asks. Trial reels go out at 18:00 on Tue and Thu.

| ID | Date | Time (IST) | Format | Lane | Pillar | Hook (short) | CTA / keyword | Pin |
|---|---|---|---|---|---|---|---|---|
| **P01** | Mon 19 Oct | 15:00 | Reel, 34 s | RE | Straight Talk (cornerstone intro) | "10:42 pm. 'Is the 3BHK still available?' Who replies first?" | LEAKS | Placeholder until 26 Oct |
| **T01** | Tue 20 Oct | 18:00 | Trial reel (P01, hook B) | RE | Straight Talk | "You're on a site visit. Your phone buzzes. New lead. Now what?" | LEAKS | — |
| **P02** | Tue 20 Oct | 15:00 | Carousel, 10 slides | GEN | Open Price Book | "Who I help, how I work, and exactly what I charge" | PRICE | **#1** |
| **P03** | Wed 21 Oct | 15:00 | Reel, 40 s · DEMO | RE | Lead Leaks | "This lead came in at 11:42 pm. Watch who replies first." | LEAKS | **#2** |
| **P04** | Thu 22 Oct | 15:00 | Carousel, 9 slides | RE | Lead Leaks (kit teaser) | "You paid for that enquiry. Here are 7 places it goes cold." | LEAKS | — |
| **T02** | Thu 22 Oct | 18:00 | Trial reel (P03, Hinglish hook) · DEMO | RE | Lead Leaks | "Raat ke 11:42 baje lead aayi…" | LEAKS | — |
| **P05** | Fri 23 Oct | **19:30** | Reel, 33 s · Hinglish | RE | #AutomateKaro | "Aaj raat 10 baje, apni hi listing pe enquiry bhejo." | LEAKS | — |
| — | Sat 24 Oct | — | Build & batch session (record P06, P08, P10, T03, T04) | — | — | — | — | — |
| — | Sun 25 Oct | — | "Ask Hemant Sunday" question-box Story · scorecard review | — | — | — | — | — |
| **P06** | Mon 26 Oct | 15:00 | Reel, 45 s | RE | Open Price Book (founding offer) | "I have zero case studies. So here's my offer to my first 3 clients." | FOUNDING | **#3** |
| **T03** | Tue 27 Oct | 18:00 | Trial reel (P06, hook B) | RE | Open Price Book | "My first 3 clients pay ₹14,999 instead of ₹34,999. Here's the catch." | FOUNDING | — |
| **P07** | Tue 27 Oct | 15:00 | Carousel, 9 slides | RE | Open Price Book | "What ₹34,999 buys you, and what it doesn't" | Book (link in bio) | — |
| **P08** | Wed 28 Oct | 15:00 | Reel, 40 s · real (not a demo) | GEN | Build Log | "Comment LEAKS on this video, and you'll set off the system I'm about to show you." | LEAKS | — |
| **P09** | Thu 29 Oct | 15:00 | Carousel, 8 slides | GEN | Straight Talk | "Meta's WhatsApp AI is free now. Do you still need me?" | LEAKS | — |
| **T04** | Thu 29 Oct | 18:00 | Trial reel (P08, hook B) | GEN | Build Log | "I won't sell you an automation I don't run myself. Here's mine." | LEAKS | — |
| **P10** | Fri 30 Oct | 15:00 | Reel, 36 s · DEMO · Hinglish | CL | Lead Leaks (clinic demo) | "1:12 pm. Lunch break. A patient calls. Nobody picks up." | LEAKS | — |
| — | Sat 31 Oct | — | Build & batch session (week 3) | — | — | — | — | — |
| — | Sun 1 Nov | — | Ask Hemant Sunday · scorecard review | — | — | — | — | — |

**Mix check (P01–P10):** 6 RE, 1 CL, 3 GEN. The 60/20/20 target applies over days 1–60. Clinic content starts properly in week 4 (strategy §9), so the content calendar from P11 makes up the CL share.

---

## Comment-keyword automations these posts rely on

Set up in Meta Business Suite → Inbox → Automations → Comment to Message ([`01-profile-setup.md`](./01-profile-setup.md) §3). Full flows, personal-reply scripts and follow-up rules are in [`07-dm-automation-playbook.md`](./07-dm-automation-playbook.md).

| Keyword automation | Keywords | Auto-DM (private reply) | Used by | Must be live by |
|---|---|---|---|---|
| **LEAKS** | `LEAKS`, `Leaks`, `leaks`, `LEAK`, `leak` | "Here's your Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=leaks. Quick question so I can point you to the right fix: what do you sell, and where do most of your leads come from (portals, Meta ads, Instagram, referrals)?" | P01, T01, P03, T02, P04, P05, P08, T04, P09, P10 | Mon 19 Oct, 15:00 |
| **PRICE** | `PRICE`, `Price`, `price`, `PRICES`, `prices` | "My full price list → askhemant.ai/pricing. What's the one thing you'd automate first?" | P02 (and anyone who asks about price on any post) | Tue 20 Oct, 15:00 |
| **FOUNDING** *(new; see note)* | `FOUNDING`, `Founding`, `founding` | "Here are the founding-client details → askhemant.ai/founding?utm_source=ig&utm_medium=dm&utm_campaign=founding. 3 slots at ₹14,999 / $599 (prices exclude GST), closing Mon 30 Nov 2026 or when full. To check the fit: what do you sell, and roughly how many enquiries do you get a month?" | P06, T03 | Mon 26 Oct, 15:00 |
| *(none)* | — | P07's CTA is the booking link: askhemant.ai/book (bio link 1) | P07 | — |

- **FOUNDING is an addition** to the strategy's keyword list (LEAKS, PRICE, and CLINIC from month 2). If you'd rather not run a third automation, reply to FOUNDING comments by hand within 4 working hours.
- **CLINIC isn't used yet.** The clinic magnet arrives in month 2, so P10 uses LEAKS. The kit already includes clinic lines.
- **After every auto-DM:** when someone answers the question, reply personally inside the 24-hour window, using the script in strategy §5 / the DM playbook. Pitch the Fit Call only after a real exchange.

---

## Production plan: what to record when

Week 1 goes live before the first Saturday batch session, so the week-1 Reels are recorded now.

| When | Record or build | Needs |
|---|---|---|
| **Sun 18 Oct (today) / Mon 19 Oct morning** | P01 (face cam + B-roll), T01 hook B, P05 (face cam; shoot the evening look, see P05) | Clip-on mic; the Skyline Realty demo for P01's B-roll (if it isn't running yet, use the website and kit screens instead, and no demo clips) |
| **Tue 20 Oct** | P03 + T02 hook. Screen-record the Skyline Realty demo running live | The Skyline Realty speed-to-lead workflow in [`automations/demo/`](../automations/demo/) running on n8n with a WhatsApp test number; a second phone as the "agent". **Fallback:** if the demo isn't running by Tue 20 Oct evening, swap P03 and P05 (P05 on Wed 21 Oct at 15:00, P03 on Fri 23 Oct at 15:00) |
| **Graphics builder** | P02, P04, P07, P09 slides from [`carousels.json`](./carousels.json); covers for every Reel and trial reel (titles below) | `tools/render/`; output in [`graphics/carousels/`](./graphics/carousels/) and [`graphics/reel-covers/`](./graphics/reel-covers/) |
| **Sat 24 Oct (batch)** | P06 + T03 hook, P08 + T04 hook, P10 (SmileCare Dental demo). Pull week-1 numbers for P08 from the Sheet | Your own funnel live (Tally → n8n → Sheet → WhatsApp); the SmileCare missed-call demo in `automations/demo/`. **Fallback for P08:** if the funnel isn't finished, film what *is* running and say what's next and what broke. That's still an honest build log |
| **Sat 31 Oct (batch)** | Week-3 posts (P11 onward) per the content calendar | — |

---

# Week 1 (Mon 19 – Sun 25 Oct)

## P01 · Mon 19 Oct · Reel · "No lead waits" intro

| | |
|---|---|
| **Date / time** | Mon 19 Oct 2026, **15:00 IST** |
| **Format / length** | Reel, 9:16, **34 s**. English voiceover |
| **Lane / pillar** | **RE** (mentions clinics) · Straight Talk, cornerstone intro |
| **Goal** | Tell a cold visitor in 30 seconds who Hemant is, what they build and who it's for. Get the first LEAKS comments. Becomes the first share in the *Start Here* highlight |
| **Hook (0–3 s)** | Spoken: *"10:42 pm. A buyer asks, 'Is the 3BHK still available?' Who replies first?"* · On screen: **"10:42 pm: 'Is the 3BHK still available?'"** then **"Who replies first?"** |
| **CTA** | Comment **LEAKS** → free Lead Leak Kit by DM · check your message requests |
| **Automation** | LEAKS |
| **Cover title** | **No lead left on read.** (small line: "I'm Hemant. I build AI + WhatsApp systems so no lead waits.") |
| **Pin** | Pin as a placeholder today; replaced by P06 on Mon 26 Oct |

**Script**

| Time | Spoken (exact) | On-screen text | Shot |
|---|---|---|---|
| 0:00–0:03 | "10:42 pm. A buyer asks, 'Is the 3BHK still available?' Who replies first?" | "10:42 pm: 'Is the 3BHK still available?'" → "Who replies first?" | Close-up of a phone: a WhatsApp enquiry lands from a fictional lead. **DEMO – fictional business** badge top-left. The amber stopwatch pill appears at 00:00 and starts |
| 0:03–0:08 | "Usually? Whoever's awake. I'm Hemant, and I build AI and WhatsApp systems so no lead waits." | "I'm Hemant. I build AI + WhatsApp systems so no lead waits." | Face cam at the desk, natural light, phone in hand |
| 0:08–0:18 | "Here's what that means. Every enquiry gets a WhatsApp reply. My design target is within a minute. The AI asks your qualifying questions: budget, BHK, locality. Hot leads go straight to your phone. The site visit gets booked and reminded. And the follow-ups keep going for 30 days." | Ticks in sequence: "✓ WhatsApp reply (target: within a minute)" · "✓ Budget · BHK · locality" · "✓ Hot lead → your phone" · "✓ Visit booked + reminded" · "✓ 30-day follow-up" | 1–2 s cuts from the Skyline Realty DEMO screen recording (badge visible on every cut), alternating with face cam. If the demo isn't ready, use face cam only |
| 0:18–0:25 | "It's for real-estate brokers and clinics, in India and the UAE. Fixed prices, published on my website. Built on your own accounts. Live in 10 working days." | "Brokers + clinics · India + UAE" · "Fixed, published prices" · "Your own accounts" · "Live in 10 working days" | Face cam → screen scroll of askhemant.ai/pricing |
| 0:25–0:29 | "What I won't do: promise you deals. What I will do: show you the timer." | "No promises. Just the timer." | Face cam; the amber stopwatch pill slides in next to the face |
| 0:29–0:34 | "Comment LEAKS and I'll send you my free Lead Leak Kit: the seven places enquiries go cold. Check your message requests." | "Comment LEAKS → free Lead Leak Kit" · "Check your message requests" | Face cam → end card: Indigo, AskHemant wordmark (on-dark version), "No lead left on read." |

**Shot list:** (1) phone close-up of the fictional 10:42 pm enquiry (DEMO badge); (2) face cam A-roll at the desk; (3) 4–5 B-roll cuts from the Skyline Realty DEMO recording in `automations/demo/`; (4) a scroll of askhemant.ai/pricing; (5) the end card from `brand/logo/wordmark-on-dark.svg`.

**Caption**
```
AI + WhatsApp automation for real estate brokers and clinics: I'm Hemant, and I build systems so no lead waits.

A buyer enquires at 10:42 pm. The first reply comes at 9:15 the next morning. That gap is the problem I work on.

Fast replies are rarer than most owners think. In an audit of 2,241 US firms, only about 37% answered web leads within an hour, and 23% never answered (BYU/HBR, 2011). I haven't found a comparable India study, so I'll run my own small tests here.

What I build, on your own accounts:
→ An instant WhatsApp first reply (design target: within a minute of the lead reaching the system)
→ AI qualifying questions: budget, BHK, locality, timeline
→ Hot-lead alerts to you or your agent
→ Site visits booked, with reminders 24 h and 2 h before
→ 30 days of follow-up, with opt-out
→ Every lead in one sheet, plus an 8 am digest

Fixed prices, all published on askhemant.ai/pricing. Live in 10 working days after access.

AskHemant is brand new, so there are no client case studies yet. Every demo here is labelled DEMO – fictional business.

Comment LEAKS and I'll DM you the free Lead Leak Kit: 7 places your enquiries go cold, and the WhatsApp fixes. Check your message requests if you don't see it.

No lead left on read.

#realestateindia #whatsappautomation #aiautomation #dubairealestate
```

**Alt text:** "Hemant talks to camera at a desk, intercut with a screen recording labelled DEMO – fictional business: a WhatsApp property enquiry at 10:42 pm gets an automatic reply, qualifying questions about budget, BHK and locality, and a booked site visit. Text on screen: I build AI + WhatsApp systems so no lead waits. Comment LEAKS for the free Lead Leak Kit."

---

## T01 · Tue 20 Oct · Trial reel of P01

| | |
|---|---|
| **Date / time** | Tue 20 Oct 2026, **18:00 IST** |
| **Source post** | P01. Same body from 0:08 onward; only the first 8 seconds change |
| **Lane / pillar** | RE · Straight Talk |
| **What it tests** | **Scenario hook (P01: the 10:42 pm enquiry) vs owner-situation hook (T01: on a site visit)** |
| **Hook B (0–3 s)** | Spoken: *"You're on a site visit. Your phone buzzes. New lead. What happens next?"* · On screen: **"On a site visit. New lead. Now what?"** |
| **CTA / automation** | Comment LEAKS · LEAKS |
| **Cover title** | **On a site visit. New lead. Now what?** |

**Replacement opening**

| Time | Spoken | On-screen | Shot |
|---|---|---|---|
| 0:00–0:03 | "You're on a site visit. Your phone buzzes. New lead. What happens next?" | "On a site visit. New lead. Now what?" | Handheld, outdoors or in a corridor: phone buzzing in hand, a quick glance, back in the pocket. If any chat shows on screen, it's the fictional DEMO chat with the badge |
| 0:03–0:08 | "Usually, nothing, until you're back in the car. I'm Hemant, and I build AI and WhatsApp systems so no lead waits." | "I'm Hemant. I build AI + WhatsApp systems so no lead waits." | Face cam |
| 0:08–0:34 | *Same as P01* | *Same as P01* | *Same as P01* |

**How to post:** Reel → Advanced settings / share screen → turn on **Trial** *(UI path unverified; check eligibility in the Professional dashboard)*. Trial reels are shown only to non-followers, with results after about 24 hours ([TechCrunch](https://techcrunch.com/2024/12/10/instagram-rolls-out-trial-reels-that-arent-shown-to-a-creators-followers)).

**Compare after 24 h** (in the tracker): 3-second hold, average watch time, sends per reach, LEAKS comments. If T01 beats P01 on watch time **and** sends, use the site-visit hook style for the week-3 Reels, and share T01 to the profile only if it adds something new.

**If trial reels aren't available on the account yet:** skip the trial and post the first 8 seconds as a Story with a link sticker to P01. Note "no trial" in the tracker.

**Caption** (trial reels still need one)
```
WhatsApp automation for real estate brokers: what happens to a new lead while you're on a site visit?

I'm Hemant. I build AI + WhatsApp systems that reply to every enquiry (design target: within a minute of the lead reaching the system), ask your qualifying questions, book the visit and follow up for 30 days. Fixed, published prices. Built on your own accounts. Every demo is labelled DEMO – fictional business.

Comment LEAKS and I'll DM you the free Lead Leak Kit. Check your message requests.

#realestateindia #whatsappautomation #realestatebroker #aiautomation
```

**Alt text:** "A broker on a site visit glances at a buzzing phone, then Hemant explains to camera how an AI + WhatsApp system answers new property leads, asks qualifying questions and books site visits. Demo screens are labelled DEMO – fictional business. Text: comment LEAKS for the free Lead Leak Kit."

---

## P02 · Tue 20 Oct · Carousel · "Who I help, how I work, my prices"

| | |
|---|---|
| **Date / time** | Tue 20 Oct 2026, **15:00 IST** |
| **Format** | Carousel, **10 slides**, 1080×1350 · spec: `carousels.json` → `P02` |
| **Lane / pillar** | **GEN** · Open Price Book |
| **Goal** | **Pinned #1.** The "start here" post for every profile visitor: who it's for, what they get, the steps, and every main price. Lets buyers sort themselves before a call |
| **Hook (slide 1)** | **"Who I help, how I work, and exactly what I charge"** (highlight: *what I charge*) |
| **CTA** | Comment **PRICE** → full price list by DM · check your message requests |
| **Automation** | PRICE |
| **Pin** | **#1**, pinned the moment it's live |

**Slides**

| # | Layout | Copy (eyebrow · heading · body / items) |
|---|---|---|
| 1 | hook | *Start here* · **Who I help, how I work, and exactly what I charge** · No "DM for price". Every number is in this post. |
| 2 | statement | *Who I help* · **Brokers and clinics who still answer WhatsApp by hand** · Real-estate brokers, small brokerages, channel partners and private clinics. India first, Dubai/UAE too. Roughly 40–500 enquiries a month from 2 or more sources. |
| 3 | list | *What I build* · **One system that answers every enquiry** · Instant WhatsApp first reply · AI asks your qualifying questions · Hot leads alerted to your agent · Site visit booked, reminded twice · 30-day follow-up, with opt-out · Every lead logged, 8 am digest · *Body:* "Within a minute" is my design target, counted from when the lead reaches the system. Not a promise. |
| 4 | steps | *How I work* · **Three steps. A fixed price at each one.** · Free 20-min Fit Call: honest yes or no → Lead Leak Audit: every leak, fixed quote → Sprint: live in 10 working days → Optional: Lead Desk Care keeps it running |
| 5 | price | *Step 2* · **Lead Leak Audit** · **₹9,999 / $499** · 5 working days · 100% credited to a Sprint booked within 30 days · excl. GST · *Body:* Timed test enquiries (with your consent), a lead-flow map, a Leak Report and a fixed quote. |
| 6 | price | *Step 3 · the flagship* · **Speed-to-Lead Sprint (Solo)** · **₹34,999 / $1,499** · Live in 10 working days after access · 50% to start, 50% at go-live · excl. GST · *Body:* Up to 3 lead sources, the AI qualifier, site-visit booking with reminders, 30-day follow-up and a 14-day bug-fix warranty. |
| 7 | list | *Also on the price list* · **Other ways to work with me** · Speed-to-Lead System (Team): ₹79,999 / $2,999 · Missed-Call & No-Show Sprint: ₹34,999 / $1,499 · Lead Desk Care: ₹9,999 / $299 a month · Ask Hemant Session: ₹1,999 / $99 · Quick Win Build: ₹24,999 / $999 · Custom AI Agent: from ₹1,50,000 / $6,000 · *Body:* All prices exclude GST. Running costs are billed to your own accounts. |
| 8 | statement | *How I build* · **Your accounts. Your data. No guaranteed-ROI promises.** · I build on your own Meta, WhatsApp and CRM accounts. WhatsApp fees and AI usage are billed to you directly. You own the system once it's paid for. |
| 9 | statement | *Honest note* · **New brand. No case studies yet. Every demo is labelled.** · So I'm taking 3 founding clients at ₹14,999 / $599 in exchange for measured, publishable results. Closes Mon 30 Nov 2026 or when full. |
| 10 | cta (Indigo) | *Your next step* · **Comment PRICE for the full price list** (highlight: *PRICE*) · I'll DM you every price, what's included, and a running-cost example. Check your message requests. |

**Caption**
```
AI automation consultant for real estate and clinics: who I help, how I work, and every price, published.

New here? Start with this post. I'm Hemant (AskHemant). I build AI + WhatsApp lead systems that reply to every enquiry, ask your qualifying questions, book the site visit or appointment, and follow up for 30 days. On your own accounts, at fixed prices.

Who it's for: real-estate brokers, small brokerages and channel partners (India first, Dubai/UAE too) and private clinics, with roughly 40–500 enquiries a month from 2 or more sources.

How it works:
1. Free 20-min Fit Call: an honest yes or no
2. Lead Leak Audit: ₹9,999 / $499 (100% credited to a Sprint booked within 30 days)
3. Speed-to-Lead Sprint (Solo): ₹34,999 / $1,499, live in 10 working days after access
4. Optional Lead Desk Care: ₹9,999 / $299 a month

All prices exclude GST. Running costs (WhatsApp per-message fees, your provider plan, AI usage) are billed to your own accounts.

Honest note: AskHemant is new, so there are no client case studies yet. Every demo is labelled DEMO – fictional business.

Comment PRICE and I'll DM you the full price list. Check your message requests.

#aiautomation #whatsappautomation #realestateindia #dentalclinic
```

**Alt text:** "10-slide carousel in ink, indigo and off-white. It says who Hemant helps (real-estate brokers, channel partners and private clinics in India and the UAE), what the AI + WhatsApp lead system does (instant reply, qualifying questions, agent alerts, site-visit booking, 30-day follow-up, lead log), the steps (free Fit Call, Lead Leak Audit at ₹9,999 / $499, Speed-to-Lead Sprint at ₹34,999 / $1,499), other prices, and ends: comment PRICE for the full price list."

---

## P03 · Wed 21 Oct · Reel · "Watch the timer" (Skyline Realty – DEMO)

| | |
|---|---|
| **Date / time** | Wed 21 Oct 2026, **15:00 IST** |
| **Format / length** | Reel, 9:16, **40 s**. Screen recording with a face-cam close. English voiceover |
| **Lane / pillar** | **RE** · Lead Leaks |
| **Goal** | **Pinned #2.** The core offer, shown working in one take: lead → WhatsApp reply → qualification → agent alert → visit booked → logged. Earns sends ("send this to your junior agent") and LEAKS comments |
| **Hook (0–3 s)** | Spoken: *"This lead came in at 11:42 pm. Watch who replies first."* · On screen: **"11:42 pm. New lead. Watch the timer."** |
| **DEMO labelling** | Amber **`DEMO – fictional business`** badge top-left on every frame and on the cover. A second line under it at 0:03–0:07: "Skyline Realty is fictional. The workflow is real." |
| **Stopwatch** | Amber JetBrains Mono pill, top-right. Starts on the frame the form is submitted and stops on the frame the first WhatsApp reply appears. One uncut take (rule 2) |
| **CTA** | Comment **LEAKS** · check your message requests |
| **Automation** | LEAKS |
| **Cover title** | **Watch the timer.** (small line: "11:42 pm lead · Skyline Realty") + DEMO badge |
| **Pin** | **#2**, pinned the moment it's live |

**Script**

| Time | Spoken (exact) | On-screen text | Shot |
|---|---|---|---|
| 0:00–0:03 | "This lead came in at 11:42 pm. Watch who replies first." | "11:42 pm. New lead. Watch the timer." | Split screen. Left: phone with the Skyline Realty lead form (fictional lead "Priya", 2BHK, number `+91 98XXX XXXXX`), thumb taps **Submit**. Right: the lead's WhatsApp, empty. Stopwatch pill starts at 00:00 on the tap. DEMO badge top-left |
| 0:03–0:07 | "Skyline Realty is a fictional brokerage I built for demos. The lead is fake. The workflow is real." | "Skyline Realty is fictional. The workflow is real." | Same split screen, uncut; stopwatch running |
| 0:07–0:13 | "Form's in… and there's the WhatsApp reply." | "First reply: [mm:ss from the recording]" | Same take, uncut: the reply bubble lands ("Hi Priya, thanks for asking about Skyline Heights! I'm the Skyline Realty assistant. May I ask 2 quick questions so I send the right options?"). **Stop the pill on this frame** and hold it on screen |
| 0:13–0:21 | "It asks two qualifying questions. Budget: 80 to 90 lakh. 2BHK, ready to move. That's tagged as a hot lead." | "Budget ✓ · BHK ✓ · Timeline ✓ → HOT" + "2× speed" label | Chat continues at 2× (labelled); the lead answers; a "HOT" tag appears in the n8n execution view (small picture-in-picture) |
| 0:21–0:27 | "The agent gets a WhatsApp alert with her answers, and she picks a site-visit slot: Saturday, 11 am." | "Agent alerted · Visit booked: Sat 11 am" | Second phone (the "agent") gets the alert: "HOT lead: Priya (DEMO), 2BHK, ₹80–90L, ready to move. Visit Sat 11 am." The lead replies "1" to the slot offer |
| 0:27–0:33 | "It's logged in the sheet, and the reminders are already scheduled: 24 hours and 2 hours before." | "Logged ✓ · Reminders: 24 h + 2 h ✓" | Google Sheet: a new row appears (fictional data, DEMO). Zoom to about 1.25× on the row |
| 0:33–0:40 | "'Within a minute' is my design target, counted from when the lead reaches the system. Comment LEAKS and I'll DM you the seven places leads go cold. Check your message requests." | "Design target: within a minute of the lead reaching the system" · "Comment LEAKS → free Lead Leak Kit" · "Check your message requests" | Face cam close, with the stopped pill still visible in the corner |

**Shot list:**
- OBS scene: the lead's phone mirror (left), the WhatsApp Web or phone mirror (right), a picture-in-picture of the n8n execution, and the stopwatch in the scene.
- A second phone for the agent alert.
- A Google Sheet with demo rows only.
- A face-cam close.
- Source workflow: the Skyline Realty speed-to-lead demo in [`automations/demo/`](../automations/demo/), running on a WhatsApp test number.
- Record **three full takes** and use the cleanest. Never stitch two takes inside the timed segment.

**Caption**
```
WhatsApp automation for real estate: watch a property lead get a reply, get qualified and book a site visit (DEMO – fictional business).

Skyline Realty is a fictional brokerage I use for demos. The lead is fictional too. The n8n + WhatsApp Cloud API workflow is real, and the stopwatch is recorded in the same take, not added afterwards.

What happens after the 11:42 pm enquiry:
1. WhatsApp first reply: [mm:ss from the recording]
2. Two qualifying questions: budget, BHK, timeline
3. Hot lead → WhatsApp alert to the agent
4. Site visit booked, with reminders 24 h and 2 h before
5. Logged in the sheet for the 8 am digest

"Within a minute" is my design target, counted from when the lead reaches the system. Some sources add their own delay before that (portal alert emails, for example), so I check every source before I quote.

Send this to whoever answers your enquiries at night.

Comment LEAKS and I'll DM you the free Lead Leak Kit. Check your message requests.

#realestateindia #whatsappautomation #realestatebroker #aiautomation
```

**Alt text:** "Screen recording labelled DEMO – fictional business. A fictional lead submits a Skyline Realty enquiry form at 11:42 pm while an amber stopwatch runs. A WhatsApp reply arrives, asks about budget and BHK, tags the lead as hot, alerts the agent and books a Saturday 11 am site visit. The booking appears in a Google Sheet. Hemant explains that within a minute is a design target and asks viewers to comment LEAKS."

---

## P04 · Thu 22 Oct · Carousel · "7 places your enquiries go cold"

| | |
|---|---|
| **Date / time** | Thu 22 Oct 2026, **15:00 IST** |
| **Format** | Carousel, **9 slides**, 1080×1350 · spec: `carousels.json` → `P04` |
| **Lane / pillar** | **RE** · Lead Leaks (Lead Leak Kit teaser) |
| **Goal** | The highest-intent LEAKS post of week 1. Each leak is recognisable and has a free fix, so it gets saved and sent to juniors. The kit is the payoff |
| **Hook (slide 1)** | **"You paid for that enquiry. Here are 7 places it goes cold."** (highlight: *cold*) |
| **CTA** | Comment **LEAKS** · check your message requests |
| **Automation** | LEAKS |
| **Source on slide 2** | BYU ScholarsArchive / HBR, "The Short Life of Online Sales Leads" (2011): 2,241 US firms, about 37% answered within an hour, 23% never. US data ([scholarsarchive.byu.edu/facpub/9711](https://scholarsarchive.byu.edu/facpub/9711)) |

**Slides** (the leaks and fixes match the kit: `lead-magnet/src/kit.html`, pages 3–6 and 11)

| # | Layout | Copy (eyebrow · heading · body / items) |
|---|---|---|
| 1 | hook | *Lead Leak Kit · preview* · **You paid for that enquiry. Here are 7 places it goes cold.** · Most of them happen after the lead lands. Most have a free fix. |
| 2 | stat | *Why speed matters* · **Only about 37% answered web leads within an hour** (highlight: *37%*) · An audit of 2,241 US firms. 23% never answered at all. No comparable India study found, so I'm running my own small tests. · *Source:* BYU ScholarsArchive / HBR, "The Short Life of Online Sales Leads" (2011). US data. |
| 3 | statement | *Leak 01* · **After-hours enquiries** · A Meta-ad lead lands at 10:42 pm. You see it after breakfast. Free fix tonight: a WhatsApp Business away message that thanks them and asks one question. |
| 4 | statement | *Leak 02* · **Portal leads that never reach WhatsApp** · 99acres, MagicBricks or Housing.com alerts sit under OTP emails. You paid for that lead. Free fix: a Gmail filter that stars every portal alert. |
| 5 | statement | *Leak 03* · **Instagram DMs stuck in Message requests** · "Price?" is a raised hand. Three days later, they've forgotten your listing. Free fix: check Message requests every evening. |
| 6 | list | *Leaks 04–07* · **Four more leaks, after the first reply** · 04 · No qualifying questions · 05 · No visit reminders, so no-shows · 06 · No follow-up after day 2 · 07 · Leads not logged anywhere · *Body:* Each one has a free fix in the kit, using the WhatsApp Business app. |
| 7 | steps | *Find your biggest leak* · **The 10 pm test, tonight** (highlight: *10 pm*) · Enquire on your own listing at 10 pm → Use a friend's phone, with their OK → Note the time. Don't warn anyone. → Score the first reply next morning |
| 8 | list | *Inside the free kit* · **The Lead Leak Kit** · All 7 leaks, each with a free fix · 10 WhatsApp templates, English + Hinglish · A 6-question qualification script · The 10 pm self-test scorecard · Bonus: Lead Leak Calculator, your numbers · *Body:* Send this to whoever answers your WhatsApp. |
| 9 | cta (Indigo) | *Free · no email needed* · **Comment LEAKS and I'll DM you the kit** (highlight: *LEAKS*) · If you don't follow me yet, the DM lands in your message requests. Check there. |

**Caption**
```
Real estate lead follow-up: 7 places your property enquiries go cold, and a free fix for each.

Most leaks aren't about your ads. They happen after the enquiry lands:
01 After-hours enquiries
02 Portal leads that never reach WhatsApp
03 Instagram DMs stuck in Message requests
04 No qualifying questions
05 No visit reminders, so no-shows
06 No follow-up after day 2
07 Leads that aren't logged anywhere

Why it matters: in an audit of 2,241 US firms, only about 37% answered web leads within an hour, and 23% never answered (BYU/HBR, "The Short Life of Online Sales Leads", 2011). That's US data. I haven't found a comparable India study, which is why I'm running my own small tests.

Send this to whoever answers your WhatsApp.

Comment LEAKS and I'll DM you the free Lead Leak Kit: all 7 leaks with free fixes, 10 WhatsApp templates in English and Hinglish, the 6-question script and the 10 pm self-test. Check your message requests.

#realestateindia #realestatebroker #whatsappbusiness #leadgeneration #{{CITY}}realestate
```
*City tag:* replace `{{CITY}}` with your city in lowercase with no spaces (for example, Pune gives `#punerealestate`), or delete the tag if you'd rather not name your city.

**Alt text:** "9-slide carousel titled: You paid for that enquiry. Here are 7 places it goes cold. A statistic slide says only about 37% of 2,241 US firms answered web leads within an hour (BYU/HBR, 2011). Then the leaks: after-hours enquiries, portal leads that never reach WhatsApp, Instagram DMs stuck in message requests, no qualifying questions, no visit reminders, no follow-up after day 2, leads not logged. Then the 10 pm self-test, what's inside the free Lead Leak Kit, and: comment LEAKS."

---

## T02 · Thu 22 Oct · Trial reel of P03

| | |
|---|---|
| **Date / time** | Thu 22 Oct 2026, **18:00 IST** |
| **Source post** | P03. Same footage; only the first 3 seconds of voiceover change |
| **Lane / pillar** | RE · Lead Leaks · **DEMO** (badge on every frame, as in P03) |
| **What it tests** | **Hinglish vs English hook on the same demo.** On-screen text stays English (rule 11) |
| **Hook B (0–3 s)** | Spoken (Hinglish): *"Raat ke 11:42 baje lead aayi. Dekho reply kaun pehle karta hai."* ("11:42 at night, a lead came in. Watch who replies first.") · On screen: **"11:42 pm. New lead. Watch the timer."** |
| **Rest** | P03 from 0:03, unchanged (English voiceover) |
| **CTA / automation** | Comment LEAKS · LEAKS |
| **Cover title** | **Watch the timer.** (small line: "11:42 pm lead") + DEMO badge |

**Compare after 24 h:** 3-second hold and average watch time vs P03. If the Hinglish hook wins clearly, lead the India demo Reels in week 3 with Hinglish hooks. How to post, and what to do if trial reels aren't available: see T01.

**Caption**
```
WhatsApp automation for real estate: raat ke 11:42 baje lead aayi. Watch the timer (DEMO – fictional business).

Skyline Realty is a fictional brokerage I use for demos; the workflow is real and the stopwatch is recorded in the same take. Reply, two qualifying questions, agent alert, site visit booked, reminders scheduled. "Within a minute" is my design target, counted from when the lead reaches the system.

Comment LEAKS and I'll DM you the free Lead Leak Kit. Message requests check karna.

#realestateindia #whatsappautomation #whatsappbusiness #realestatebroker
```

**Alt text:** same as P03.

---

## P05 · Fri 23 Oct · Reel · #AutomateKaro: "The 10 pm test"

| | |
|---|---|
| **Date / time** | Fri 23 Oct 2026, **19:30 IST**. The evening-slot test; P10 is the afternoon comparison |
| **Format / length** | Reel, 9:16, **33 s**. **Hinglish voiceover, English on-screen text** |
| **Lane / pillar** | **RE** (one line for clinics in the caption) · Straight Talk / **#AutomateKaro** |
| **Goal** | Give owners a free self-test they can do *tonight*. It's the most "send-able" idea in the kit. People who score 0–3 comment LEAKS for the fixes |
| **Hook (0–3 s)** | Spoken: *"Aaj raat 10 baje, apni hi listing pe enquiry bhejo."* ("Tonight at 10, send an enquiry to your own listing.") · On screen: **"Tonight, 10 pm: enquire on your OWN listing."** |
| **CTA** | Comment **LEAKS** → full scorecard + fixes · check your message requests |
| **Automation** | LEAKS |
| **Cover title** | **The 10 pm test** (small line: "#AutomateKaro") |
| **Stopwatch** | Amber pill showing the real phone clock **22:00** at the start. No timed demo in this Reel |

**Script**

| Time | Spoken (Hinglish, exact) | On-screen (English) | Shot |
|---|---|---|---|
| 0:00–0:03 | "Aaj raat 10 baje, apni hi listing pe enquiry bhejo." | "Tonight, 10 pm: enquire on your OWN listing." | Face cam, evening light (lamp, dark window). Phone held to camera showing the real clock at 22:00 |
| 0:03–0:08 | "Dost ke phone se, unki permission ke saath. Team ko batana mat." | "Use a friend's phone (with their OK). Don't warn your team." | Face cam |
| 0:08–0:13 | "Message simple rakho: 'Is the 3BHK still available?' Aur time note karo." | "Send: 'Is the 3BHK still available?' Note the time." | Phone close-up: typing the message into a **generic** chat (no real broker's name or number visible) |
| 0:13–0:22 | "Subah dekho reply kab aaya. 5 minute ke andar: 3 points. 1 ghante mein: 2. Subah 9 baje tak: 1. Usse late, ya kabhi nahi: zero." | Scorecard builds line by line: "≤ 5 min = 3" · "≤ 1 hour = 2" · "by 9 am = 1" · "later / never = 0" | Graphic overlay on face cam (Ink panel, JetBrains Mono numbers) |
| 0:22–0:27 | "Bonus points: sawaal ka jawab mila? Next step offer hua? 2 din mein follow-up aaya? Har ek ka plus one." | "+1 answered your question · +1 offered a next step · +1 followed up in 2 days = __ / 6" | Same panel |
| 0:27–0:33 | "Score teen ya kam? Wahi aapka sabse bada leak hai. Comment LEAKS, poora scorecard aur free fixes DM mein bhejta hoon. Message requests check karna." | "Score 0–3? That's your biggest leak." · "Comment LEAKS → scorecard + free fixes" · "Check your message requests" · "#AutomateKaro" | Face cam → end card (Indigo, wordmark) |

**Shot list:** face cam in an evening setup (shoot it at night, or with the curtains closed and a warm lamp); a phone close-up with the real clock; the scorecard overlay (from `tools/render/` or the Edits app). No other business's chats appear on screen. The test is the viewer's own listing, so nobody else's data is involved.

**Caption**
```
Real estate lead follow-up test: enquire on your own listing at 10 pm tonight and score the reply. AutomateKaro, episode 1.

Aaj raat ka 5-minute homework:
1. Pick one live listing or ad: portal, Meta ad, Instagram post or website form.
2. At 10 pm, enquire from a friend's phone (with their OK). Don't warn your team.
3. Note the time. Next morning, note the first reply: time, channel, words.
4. Then stay quiet for 2 days. Does anyone follow up?

Score it:
Reply within 5 min = 3 · within 1 hour = 2 · by 9 am next day = 1 · later or never = 0
+1 if they answered your question · +1 if they offered a next step · +1 if they followed up within 2 days

6/6: no leak tonight, so test another source. 4–5: close; fix the point you lost. 0–3: that's your biggest leak.

Clinic owner? Call your clinic during lunch (1–2 pm) and time the callback.

Comment LEAKS and I'll DM you the Lead Leak Kit with the full scorecard and the free fixes. Message requests check karna: if you don't follow me yet, my DM lands there.

#automatekaro #realestateindia #whatsappbusiness #realestatebroker #{{CITY}}realestate
```

**Alt text:** "Hemant speaks to camera at night, in Hinglish with English captions, explaining the 10 pm self-test: enquire on your own property listing at 10 pm from a friend's phone, note the time, and score the first reply. 3 points within 5 minutes, 2 within an hour, 1 by 9 am, 0 later or never, plus 1 point each for answering the question, offering a next step and following up within 2 days. Text: comment LEAKS for the full scorecard."

---

# Week 2 (Mon 26 Oct – Sun 1 Nov)

## P06 · Mon 26 Oct · Reel · "I'm taking 3 founding clients"

| | |
|---|---|
| **Date / time** | Mon 26 Oct 2026, **15:00 IST** |
| **Format / length** | Reel, 9:16, **45 s**. Face cam, English, with one screen scroll |
| **Lane / pillar** | **RE** (the slots are 2 real estate + 1 clinic) · Open Price Book, founding offer |
| **Goal** | **Pinned #3.** The main route to the first paying client (strategy §4). States the offer, the price, what Hemant asks in return, who qualifies and the real deadline, so the right owners comment and the wrong ones rule themselves out |
| **Hook (0–3 s)** | Spoken: *"I have zero case studies. So here's my offer to my first three clients."* · On screen: **"0 case studies. 3 founding slots."** |
| **CTA** | Comment **FOUNDING** → details + how to apply by DM · check your message requests |
| **Automation** | FOUNDING (new; see the automations table). Backup: reply by hand |
| **Cover title** | **3 founding clients** (small line: "Closes Mon 30 Nov") |
| **Pin** | **#3**: unpin P01, pin P06, and check the order (see `01-profile-setup.md` §10) |
| **Scarcity check** | Real: 3 slots, closing Mon 30 Nov 2026 or when full. Before posting, check `foundingSlotsLeft` in `website/assets/js/config.js` still says 3. If any slot is signed by then, say the real number |

**Script**

| Time | Spoken (exact) | On-screen text | Shot |
|---|---|---|---|
| 0:00–0:03 | "I have zero case studies. So here's my offer to my first three clients." | "0 case studies. 3 founding slots." | Face cam, tight, direct to lens |
| 0:03–0:09 | "AskHemant launched a week ago. I could fake testimonials. I won't. I'd rather measure real results with three businesses, and publish them." | "No fake testimonials. Real, measured results." | Face cam |
| 0:09–0:17 | "You get the Lead Leak Audit plus the full Speed-to-Lead Sprint for 14,999 rupees, or 599 dollars. The normal price is 34,999, or 1,499 dollars. Same scope. Nothing cut." | "Audit + Sprint: ₹14,999 / $599" · "List: ₹34,999 / $1,499 · same scope" · small: "Prices exclude GST" | Cut to a screen scroll of askhemant.ai/founding (the price box and slot counter), then back to face cam |
| 0:17–0:27 | "In return, five things, in writing. We measure how your leads are handled during the build, and again 30 days after go-live. I get permission to publish the numbers, named or anonymised. A testimonial in your own words, only if you're happy. And a 30-minute feedback interview." | Numbered list builds: "1 Baseline during the build" · "2 Measure again at 30 days" · "3 Publish the numbers (named or anonymised)" · "4 Testimonial only if you're happy" · "5 30-min feedback interview" | Face cam with the list overlaid on an Ink panel |
| 0:27–0:35 | "I'm looking for two real-estate businesses and one clinic. Roughly 40 to 500 enquiries a month, from two or more sources, answered by hand on WhatsApp today. India or Dubai." | "2 real estate + 1 clinic" · "40–500 enquiries/month · 2+ sources" · "India or Dubai (max 1 Dubai slot)" | Face cam |
| 0:35–0:40 | "If the results are weak, I'll publish them honestly, or not at all. Slots close Monday, 30 November, or when all three are taken." | "Weak results? Published honestly, or not at all." · "Closes Mon 30 Nov 2026 or when full" | Face cam; the slot counter graphic (3 of 3 open) |
| 0:40–0:45 | "Comment FOUNDING and I'll DM you the details. Check your message requests." | "Comment FOUNDING → details by DM" · "Check your message requests" | End card (Indigo, wordmark) |

**Shot list:** face-cam A-roll, two takes per line (it's the pinned offer, so it's worth a clean delivery); a screen recording of askhemant.ai/founding; the numbered-list overlay and slot-counter graphic (`tools/render/` or Edits). No client names or logos: there are none yet, and the Reel says so.

**Caption**
```
AI automation for real estate brokers and clinics: I'm taking 3 founding clients at ₹14,999 / $599, in exchange for a measured before-and-after.

Why: AskHemant is a week old and I have no client case studies. I'm not going to fake them. So three businesses get the Lead Leak Audit + the full Speed-to-Lead Sprint (or, for a clinic, the Missed-Call & No-Show Recovery Sprint) at a founding price.

The price: ₹14,999 / $599. List price: ₹34,999 / $1,499 (with the Audit fee credited). That's about 57–60% off, with the same scope and nothing cut. 50% to start, 50% at go-live. Running costs stay on your own accounts. Prices exclude GST.

What I ask in return, in writing:
1. The build period is the baseline: we measure how leads are handled today
2. We measure again 30 days after go-live
3. Permission to publish the numbers, named or anonymised (your choice)
4. A testimonial in your own words, only if you're happy
5. A 30-minute feedback interview

Who it's for: 2 real-estate businesses and 1 clinic (at most 1 Dubai broker), with roughly 40–500 enquiries a month from 2 or more sources, answered by hand on WhatsApp today.

If the results are weak, I publish them honestly or not at all. No result is guaranteed, at founding or full price.

Closes Mon 30 Nov 2026, or when all 3 slots are signed.

Comment FOUNDING and I'll DM you the details and how to apply. Check your message requests.

#realestateindia #whatsappautomation #dubairealestate #dentalclinic #aiautomation
```

**Alt text:** "Hemant speaks to camera: AskHemant has no case studies yet, so 3 founding clients get the Lead Leak Audit and Speed-to-Lead Sprint for ₹14,999 / $599 instead of ₹34,999 / $1,499. In return: a baseline measurement, a re-measurement 30 days after go-live, permission to publish the numbers, an optional testimonial and a feedback interview. For 2 real-estate businesses and 1 clinic. Closes Mon 30 Nov 2026 or when full. Text: comment FOUNDING."

---

## T03 · Tue 27 Oct · Trial reel of P06

| | |
|---|---|
| **Date / time** | Tue 27 Oct 2026, **18:00 IST** |
| **Source post** | P06. New opening (0:00–0:09), then P06 from 0:17 |
| **Lane / pillar** | RE · Open Price Book |
| **What it tests** | **Price-first hook vs honesty-first hook** ("zero case studies") for the same offer |
| **Hook B (0–3 s)** | Spoken: *"My first three clients pay 14,999 rupees instead of 34,999. Here's the catch."* · On screen: **"₹14,999 instead of ₹34,999. The catch?"** |
| **CTA / automation** | Comment FOUNDING · FOUNDING |
| **Cover title** | **₹14,999 instead of ₹34,999** (small line: "3 founding slots · the catch") |

**Replacement opening**

| Time | Spoken | On-screen | Shot |
|---|---|---|---|
| 0:00–0:03 | "My first three clients pay 14,999 rupees instead of 34,999. Here's the catch." | "₹14,999 instead of ₹34,999. The catch?" · small: "$599 instead of $1,499 · excl. GST" | Face cam, tight |
| 0:03–0:09 | "The catch is, I measure your results and publish them. I have no case studies yet, and I won't fake them. Same Audit, same full Sprint, nothing cut." | "The catch: I measure and publish the results." · "Same scope. Nothing cut." | Face cam → askhemant.ai/founding scroll |
| 0:09–0:37 | *P06 from 0:17 to 0:45 (the five asks, who it's for, honest results, deadline, CTA)* | *Same as P06* | *Same as P06* |

**Compare after 24 h:** watch time and FOUNDING comments vs P06. How to post: see T01.

**Caption**
```
WhatsApp automation for real estate and clinics: my first 3 clients pay ₹14,999 / $599 instead of ₹34,999 / $1,499. The catch: I measure the results and publish them (named or anonymised, your choice).

Lead Leak Audit + full Sprint, same scope. 2 real-estate businesses + 1 clinic. Closes Mon 30 Nov 2026 or when full. Prices exclude GST. No result is guaranteed; weak results get published honestly or not at all.

Comment FOUNDING and I'll DM you the details. Check your message requests.

#realestateindia #whatsappautomation #dubairealestate #dentalclinic
```

**Alt text:** "Hemant explains to camera that the first 3 founding clients pay ₹14,999 instead of ₹34,999 for the Lead Leak Audit and Speed-to-Lead Sprint, and that the catch is that results are measured and published with permission. Closes Mon 30 Nov 2026. Text: comment FOUNDING."

---

## P07 · Tue 27 Oct · Carousel · Open Price Book: the ₹34,999 / $1,499 Sprint

| | |
|---|---|
| **Date / time** | Tue 27 Oct 2026, **15:00 IST** |
| **Format** | Carousel, **9 slides**, 1080×1350 · spec: `carousels.json` → `P07` |
| **Lane / pillar** | **RE** · Open Price Book |
| **Goal** | The most bottom-of-funnel post of the launch. Shows exactly what the flagship includes, what it doesn't, the running costs and the timeline, so the people who book are already sold on the scope |
| **Hook (slide 1)** | **"What ₹34,999 buys you, and what it doesn't"** (highlight: *doesn't*) |
| **CTA** | **Book** a free 20-min Fit Call: link in bio → askhemant.ai/book |
| **Automation** | None needed (booking link). PRICE stays live for anyone who comments "price" |
| **Sources** | Running-cost slide: rate from [MyOperator](https://support.myoperator.com/portal/en/kb/articles/whatsapp-has-shifted-to-per-message-pricing-effective-july-1-2025-based-on-message-categories-and-your-recipient-s-country-in-india-there-are-three-paid-categories) (reseller); per-message pricing since 1 Jul 2025 per [Meta](https://developers.facebook.com/docs/whatsapp/pricing). The ₹775 figure is the strategy's worked example, marked as an estimate |

**Slides**

| # | Layout | Copy (eyebrow · heading · body / items) |
|---|---|---|
| 1 | hook | *Open Price Book* · **What ₹34,999 buys you, and what it doesn't** · The Speed-to-Lead Sprint, line by line. $1,499 outside India. Prices exclude GST. |
| 2 | price | *The flagship* · **Speed-to-Lead Sprint (Solo)** · **₹34,999 / $1,499** · Live in 10 working days after access · 50% to start, 50% at go-live · excl. GST · *Body:* For solo brokers and small teams with 2 or more lead sources. |
| 3 | list | *Included · 1 of 2* · **Getting every lead answered** · Capture from up to 3 lead sources · Instant WhatsApp reply, official platform · AI qualifier in English or Hinglish · Hot, warm and cold tags · Hot lead → WhatsApp alert to agent · *Body:* Sources: Meta lead ads, website form, Instagram DMs, and portal alerts where the portal allows. |
| 4 | list | *Included · 2 of 2* · **Getting the visit booked and tracked** · Site-visit booking, reminders, Maps pin · 30-day follow-up, 6–8 messages, opt-out · Lead log in Sheets or your CRM · 8 am daily digest to you · Up to 10 Meta-approved templates · Loom handover, SOP, 14-day warranty |
| 5 | list | *Not included* · **What's NOT in the ₹34,999** (highlight: *NOT*) · WhatsApp per-message fees (billed by Meta) · Your WhatsApp provider (BSP) plan · AI usage on your own API account · A 4th lead source (+₹4,999 / $199) · Team routing: the Team tier, ₹79,999 / $2,999 · Any promise of deals or revenue |
| 6 | stat | *Running costs · worked example* · **About ₹775 a month in Meta fees** (highlight: *₹775*) · 300 new leads a month × 3 follow-ups you start ≈ 900 marketing messages, before GST and provider fees. An estimate: check Meta's live rate card. · *Source:* ~₹0.86 per marketing message in India, per reseller MyOperator. Meta has charged per message since 1 Jul 2025. |
| 7 | steps | *How the 10 days run* · **From access to go-live in 10 working days** · Day 0: access checklist done, clock starts → Day 1: Meta verification, templates submitted → Day 5: demo of your lead flow → Day 10: go-live → Day 24: warranty ends; Care offered |
| 8 | statement | *The on-time promise* · **Not live in 10 working days? First month of Care free.** · Counted from when your access checklist is complete. After that, Lead Desk Care is optional: ₹9,999 / $299 a month, 30 days' notice to cancel. |
| 9 | cta (Indigo) | *Free · 20 minutes* · **Book a free Fit Call: link in bio** (highlight: *Fit Call*) · askhemant.ai/book. I'll tell you honestly whether the Sprint fits, or whether a free tool will do. Messaged me instead? Check your message requests. |

**Caption**
```
WhatsApp automation cost for real estate in India: what the ₹34,999 / $1,499 Speed-to-Lead Sprint includes, and what it doesn't.

Open Price Book. I publish prices so you can rule me out before we ever talk.

Included:
→ Capture from up to 3 lead sources (Meta lead ads, website form, Instagram DMs, portal alerts where the portal allows)
→ Instant WhatsApp first reply on the official platform
→ AI qualifier in English or Hinglish: budget, BHK/type, locality, timeline, loan or cash, self-use or investment
→ Hot/warm/cold tags, and a WhatsApp alert to your agent for hot leads
→ Site-visit booking with reminders 24 h and 2 h before, plus a Maps pin
→ 30-day follow-up (6–8 messages, with opt-out)
→ Lead log in Google Sheets or your CRM, and an 8 am daily digest
→ Up to 10 Meta-approved templates, a Loom handover, a 1-page SOP and a 14-day bug-fix warranty

Not included: WhatsApp per-message fees (billed by Meta to your account), your WhatsApp provider plan, AI usage on your own API account, a 4th lead source (+₹4,999 / $199), team routing (that's the Speed-to-Lead System (Team), ₹79,999 / $2,999), and any promise of deals or revenue.

Running-cost example (an estimate): 300 new leads a month × 3 follow-ups you start ≈ 900 marketing messages ≈ ₹775 a month in Meta fees, before GST and provider fees. Rate used: about ₹0.86 per marketing message in India, per the reseller MyOperator. Meta has charged per message since 1 Jul 2025; check the live rate card.

Terms: 50% to start, 50% at go-live. Live in 10 working days after your access checklist is complete; if it isn't, your first month of Lead Desk Care is free. Prices exclude GST.

Book a free 20-min Fit Call: link in bio (askhemant.ai/book). Messaged me instead? Check your message requests for my reply.

#whatsappautomation #realestateindia #aiautomation #realestatebroker
```

**Alt text:** "9-slide price carousel titled: What ₹34,999 buys you, and what it doesn't. It shows the Speed-to-Lead Sprint at ₹34,999 / $1,499, live in 10 working days, then what's included (lead capture from 3 sources, instant WhatsApp reply, AI qualifier, agent alerts, site-visit booking and reminders, 30-day follow-up, lead log, daily digest, templates, warranty), what's not included (WhatsApp fees, provider plan, AI usage, extra sources, team routing, any promise of revenue), a running-cost estimate of about ₹775 a month, the 10-day timeline, the on-time promise, and a final slide: book a free Fit Call."

---

## P08 · Wed 28 Oct · Reel · Build Log #1: my own Instagram funnel

| | |
|---|---|
| **Date / time** | Wed 28 Oct 2026, **15:00 IST** |
| **Format / length** | Reel, 9:16, **40 s**. Screen recording + face cam, English |
| **Lane / pillar** | **GEN** · Build Log (case study #0) |
| **Goal** | Proof without clients: Hemant's own funnel (comment → DM → form → n8n → Sheet → WhatsApp), working in public, with **real week-1 numbers**, however small. It's also an interactive post: viewers can trigger step 1 themselves |
| **Hook (0–3 s)** | Spoken: *"Comment LEAKS on this video, and you'll set off the system I'm about to show you."* · On screen: **"Comment LEAKS → watch what happens"** |
| **Labelling** | This is **not** a demo. It's Hemant's real funnel, so it says **"My real funnel · real numbers"** (no DEMO badge). Any real commenter's name, handle or number is **blurred**. The on-camera run uses Hemant's own second test account |
| **Real numbers** | Fill the `[…]` values from the Sheet / scorecard on Sat 24 Oct (data for Mon 19 – Sun 25 Oct). Say the real number even if it's 0 |
| **CTA** | Comment **LEAKS** · check your message requests |
| **Automation** | LEAKS (the Reel demonstrates it) |
| **Cover title** | **Build Log #1** (small line: "my own funnel, real numbers") |

**Script**

| Time | Spoken (exact) | On-screen text | Shot |
|---|---|---|---|
| 0:00–0:03 | "Comment LEAKS on this video, and you'll set off the system I'm about to show you." | "Comment LEAKS → watch what happens" | Phone screen recording: the test account types "LEAKS" under a Reel and posts it |
| 0:03–0:10 | "This is my own Instagram funnel. I won't sell you an automation I don't run myself. Step one: your comment triggers a private DM with the free kit." | "Build Log #1 · my real funnel · real numbers" · "1 · Comment → auto-DM (Meta Business Suite)" | The DM arriving in Message requests on the test account. Cut to the Business Suite automation screen (keywords visible) |
| 0:10–0:18 | "Step two: the kit page has a short form for the bonus calculator. Four fields, and a consent box that's unticked by default." | "2 · Form: name, WhatsApp, business type, leads/month" · "Consent box: unticked by default" | Screen recording: askhemant.ai/kit → the Tally form, filled in with test data |
| 0:18–0:27 | "Step three: n8n catches the form, writes a row in my Google Sheet, pings me on WhatsApp, and sends a welcome message only if you ticked the box." | "3 · n8n → Google Sheet → WhatsApp alert to me → welcome (opt-in only)" | The n8n canvas (self-hosted) running the execution, nodes lighting up → the Sheet row appears (test row) → Hemant's phone buzzes with the alert |
| 0:27–0:35 | "Week one, real numbers: [N] comments, [N] kit sign-ups, and my median DM reply time was [time]. Small numbers. I'll post them every week anyway." | "Week 1 (19–25 Oct): [N] LEAKS comments · [N] kit sign-ups · median reply [time]" | The scorecard tab of the Sheet, real names and numbers blurred, totals visible. Face cam picture-in-picture |
| 0:35–0:40 | "Comment LEAKS and watch it run. Check your message requests." | "Comment LEAKS · watch it run" · "Check your message requests" | Face cam → end card |

**Shot list:**
- OBS screen recordings: Meta Business Suite automation settings; askhemant.ai/kit and the Tally form; the n8n workflow running; the Google Sheet.
- A phone screen recording of the test account commenting and receiving the DM.
- Face cam.
- Source: Hemant's own funnel workflow in [`automations/`](../automations/) (see `automations/README.md` for the file).
- Blur every real personal detail in the Sheet before recording (DPDP), or record from a filtered view that shows only totals and test rows.

**Caption**
```
Instagram DM automation with n8n: Build Log no. 1. My own comment → DM → form → Sheet → WhatsApp funnel, with week-1 numbers.

This is case study zero: my own business, built in public. It's not a demo, so the numbers are real, even when they're small.

The flow:
1. You comment LEAKS → Meta Business Suite sends one private reply with the kit
2. The kit page offers a bonus calculator behind a 4-field Tally form (the marketing-consent box is unticked by default)
3. n8n (self-hosted) writes the row to a Google Sheet, alerts me on WhatsApp, and sends a WhatsApp welcome only if you opted in
4. I reply to you personally, inside Instagram's 24-hour window

Week 1 (19–25 Oct), straight from the Sheet:
• LEAKS comments: [real number]
• Kit sign-ups: [real number]
• My median DM reply time: [real number]
• What broke: [one real thing, and how I fixed it]

Comment LEAKS and you'll trigger step 1 yourself. Check your message requests: that's where the DM lands if you don't follow me yet.

#n8n #buildinpublic #instagramautomation #whatsappautomation #aiautomation
```

**Alt text:** "Screen recording of Hemant's own sales funnel, labelled my real funnel, real numbers. A test account comments LEAKS on a Reel and receives an automatic Instagram DM with the Lead Leak Kit. The kit page form is filled in, an n8n workflow runs, a row appears in a Google Sheet and Hemant's phone gets a WhatsApp alert. Then the week-1 totals from the scorecard. Personal data is blurred."

---

## P09 · Thu 29 Oct · Carousel · "Meta's free WhatsApp AI vs what you actually need"

| | |
|---|---|
| **Date / time** | Thu 29 Oct 2026, **15:00 IST** |
| **Format** | Carousel, **8 slides**, 1080×1350 · spec: `carousels.json` → `P09` |
| **Lane / pillar** | **GEN** · Straight Talk |
| **Goal** | Answer the objection every call will raise ("Meta's AI is free, why pay you?") honestly and in public. Tell FAQ-only businesses to use the free tool. Show multi-source businesses what's still missing. Builds trust, and gets sent to business partners |
| **Hook (slide 1)** | **"Meta's WhatsApp AI is free now. Do you still need me?"** (highlight: *free*) |
| **CTA** | Comment **LEAKS** (the kit has a "free tools first" page) · check your message requests |
| **Automation** | LEAKS |
| **Before posting** | **Re-check Meta's current Business AI / Business Agent features in the app.** They change fast. If Meta has added any item in the right-hand column, remove it from the slide and the caption. Never claim the free tool can't do something it now does |
| **Sources** | Launches: [Deccan Herald](https://www.deccanherald.com/technology/artificial-intelligence/whatsapp-gets-gen-ai-powered-meta-business-agent-for-small-enterprise-owners-in-india-4065355), [UNI](https://www.uniindia.com/whatsapp-unveils-meta-business-agent-for-businesses-in-india/business-economy/news/3902347.html). General-purpose chatbot ban from 15 Jan 2026: [respond.io](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban) |

**Slides**

| # | Layout | Copy (eyebrow · heading · body / items) |
|---|---|---|
| 1 | hook | *Straight talk* · **Meta's WhatsApp AI is free now. Do you still need me?** · Honest answer: maybe not. Here's how to tell. |
| 2 | statement | *What changed in 2026* · **Meta launched Business AI on WhatsApp for Indian businesses** · Business AI arrived in May 2026, Meta Business Agent in July. They answer customers for you, around the clock. Basic FAQ bots are now close to free. · *Source:* Deccan Herald; UNI (2026). Features change often: check your app. |
| 3 | statement | *When free is enough* · **Mostly FAQs? Use Meta's free AI.** · Timings, location, price list, "is it available?". One number, one person replying, leads from one place. Set it up yourself and keep your money. |
| 4 | compare | *Side by side* · **Free AI in the app vs a connected lead system** · Left, *Meta's free AI*: Answers common customer questions · Lives inside your WhatsApp · You set it up, ₹0 · Right, *What you still connect*: Portal, Meta-form and Instagram leads · Routing: hot lead to the right agent · Handover rules you decide · Day-7 and day-30 follow-ups · One log in your Sheet or CRM · *Source:* Based on Meta's announced features, Oct 2026. Check your app. |
| 5 | list | *Decide in 30 seconds* · **4 questions that decide it** · Do leads come from 2+ sources? · Does more than one person reply? · Do leads go quiet after day 2? · Do you know last month's lead count? · *Body:* Mostly no: use the free AI. Mostly yes (or no count at all): you need the connected system. |
| 6 | statement | *The rule since 15 Jan 2026* · **General-purpose AI chatbots are banned on WhatsApp's business platform** · Bots must be scoped to your business: enquiries, bookings, support. So "ChatGPT on WhatsApp" is out. Every assistant I build answers only about your business. · *Source:* respond.io, "WhatsApp general-purpose chatbots ban" (2026). |
| 7 | statement | *Where I fit* · **I use Meta's free tools where they fit, then connect the rest** · Your accounts, your number. I connect lead sources, the qualifier, handover, booking and 30-day follow-up. Solo Sprint: ₹34,999 / $1,499, excl. GST. |
| 8 | cta (Indigo) | *Free tools first* · **Comment LEAKS for the free Lead Leak Kit** (highlight: *LEAKS*) · It has a "free tools first" page: set up Meta's free options before you pay anyone, me included. Check your message requests. |

**Caption**
```
Meta's free WhatsApp Business AI vs a connected lead system: which does your business actually need?

Meta launched Business AI on WhatsApp for Indian businesses in May 2026, and Meta Business Agent in July 2026 (Deccan Herald, UNI). For basic FAQs, that's close to free, and if that's all you need, I'll tell you to use it.

Use the free AI if: most chats are FAQs, one person replies, and leads come from one place.

You need a connected system if: leads come from portals, Meta forms and Instagram; more than one person replies; nobody follows up after day 2; or you don't know last month's lead count.

One rule to know: since 15 Jan 2026, general-purpose AI chatbots aren't allowed on the WhatsApp Business Platform (respond.io). Any assistant has to be scoped to your business. Every one I build is.

Features change fast. This is written for late Oct 2026, so check your app.

Comment LEAKS and I'll DM you the free Lead Leak Kit. It has a "free tools first" page, so you can set up Meta's free options before paying anyone, me included. Check your message requests.

#whatsappbusiness #whatsappautomation #aiautomation #smallbusinessindia
```

**Alt text:** "8-slide carousel titled: Meta's WhatsApp AI is free now. Do you still need me? It explains Meta's 2026 Business AI launch for Indian businesses, says to use the free AI if most chats are FAQs, compares the free AI with a connected lead system (portal and Meta-form leads, routing to the right agent, handover rules, day-7 and day-30 follow-ups, one log in a Sheet or CRM), lists 4 questions that decide it, notes the 15 Jan 2026 ban on general-purpose chatbots on the WhatsApp Business Platform, and ends: comment LEAKS for the free Lead Leak Kit."

---

## T04 · Thu 29 Oct · Trial reel of P08

| | |
|---|---|
| **Date / time** | Thu 29 Oct 2026, **18:00 IST** |
| **Source post** | P08. New opening (0:00–0:03), then P08 from 0:03 with its first spoken sentence trimmed |
| **Lane / pillar** | GEN · Build Log |
| **What it tests** | **Credibility hook vs interactive hook** ("comment and watch it run") |
| **Hook B (0–3 s)** | Spoken: *"I won't sell you an automation I don't run myself. So here's mine, with real numbers."* · On screen: **"My own funnel. Real numbers."** |
| **CTA / automation** | Comment LEAKS · LEAKS |
| **Cover title** | **My own funnel. Real numbers.** |

**Replacement opening**

| Time | Spoken | On-screen | Shot |
|---|---|---|---|
| 0:00–0:03 | "I won't sell you an automation I don't run myself. So here's mine, with real numbers." | "My own funnel. Real numbers." | Face cam, then a quick cut to the n8n canvas |
| 0:03–0:10 | "Step one: you comment LEAKS, and Meta sends you a private DM with my free kit." | "1 · Comment → auto-DM (Meta Business Suite)" | As P08 |
| 0:10–0:40 | *P08 from 0:10, unchanged* | *Same as P08* | *Same as P08* |

**Compare after 24 h:** watch time, sends and LEAKS comments vs P08. How to post: see T01.

**Caption**
```
Instagram DM automation with n8n: I won't sell you an automation I don't run myself, so here's mine. Comment → DM → form → Google Sheet → WhatsApp, with real week-1 numbers (19–25 Oct): [real comments] comments, [real sign-ups] kit sign-ups, median reply [real time].

Case study zero: my own business, built in public. Not a demo.

Comment LEAKS and you'll trigger step 1 yourself. Check your message requests.

#n8n #buildinpublic #instagramautomation #aiautomation
```

**Alt text:** same as P08.

---

## P10 · Fri 30 Oct · Reel · Missed call → WhatsApp text-back (SmileCare Dental – DEMO)

| | |
|---|---|
| **Date / time** | Fri 30 Oct 2026, **15:00 IST**. The afternoon comparison for the Friday slot test (P05 was 19:30) |
| **Format / length** | Reel, 9:16, **36 s**. Screen recording + face cam. **Hinglish voiceover, English on-screen text** |
| **Lane / pillar** | **CL** · Lead Leaks (clinic demo) |
| **Goal** | The first clinic post: show the Missed-Call & No-Show Recovery Sprint working (missed call → WhatsApp text-back → booking → reminders → review request) and get clinic owners into the LEAKS funnel. Their business-type answers feed the day-60 niche decision |
| **Hook (0–3 s)** | Spoken: *"Lunch break mein patient ka call aaya. Kisi ne nahi uthaya. Ab dekho."* ("A patient called during the lunch break. Nobody picked up. Now watch.") · On screen: **"1:12 pm. Missed call. Watch the timer."** |
| **DEMO labelling** | Amber **`DEMO – fictional business`** badge top-left on every frame and on the cover. At 0:03–0:07: "SmileCare Dental is fictional. The workflow is real." The caller is a fictional "Rahul (DEMO)" with number `+91 98XXX XXXXX` |
| **Stopwatch** | Amber pill. Starts on the frame the call ends unanswered and stops on the frame the WhatsApp text-back appears. One uncut take |
| **Statistic** | Planet DDS: 6.9% average dental no-show rate in 2025, cancellations 12.9% (US practices), via [DOCS Education](https://www.docseducation.com/node/53377). On screen with its source |
| **CTA** | Comment **LEAKS** (the kit includes clinic lines; the CLINIC keyword comes in month 2) · check your message requests |
| **Automation** | LEAKS |
| **Cover title** | **Missed call → booked** (small line: "SmileCare Dental") + DEMO badge |

**Script**

| Time | Spoken (Hinglish, exact) | On-screen (English) | Shot |
|---|---|---|---|
| 0:00–0:03 | "Lunch break mein patient ka call aaya. Kisi ne nahi uthaya. Ab dekho." | "1:12 pm. Missed call. Watch the timer." | Phone or clinic softphone screen: an incoming call from "Rahul (DEMO)" rings out → "Missed call". Stopwatch starts. DEMO badge top-left |
| 0:03–0:07 | "SmileCare Dental ek fictional clinic hai, demo ke liye. Workflow real hai." | "SmileCare Dental is fictional. The workflow is real." | Same take, uncut; stopwatch running |
| 0:07–0:13 | "Call miss hua… aur patient ko WhatsApp pe message chala gaya." | "Text-back sent: [mm:ss from the recording]" | Same take, uncut: the patient's WhatsApp gets "Sorry we missed your call, we were with a patient. How can we help? Reply here or book a slot: [link]". **Stop the pill on this frame** |
| 0:13–0:20 | "Patient ne link khola, kal shaam 6 baje ka slot choose kiya. Booking ho gayi." | "Slot booked: tomorrow, 6 pm" + "2× speed" label | Booking link → slot picked → confirmation message (at 2×, labelled) |
| 0:20–0:26 | "Appointment se 24 ghante pehle aur 2 ghante pehle reminder. Visit ke baad, review request." | "Reminders: 24 h + 2 h before" · "After the visit: review request" | The n8n execution view showing the scheduled reminder and review nodes; the reminder message preview |
| 0:26–0:31 | "Planet DDS ke 2025 data mein, dental clinics ka average no-show rate 6.9% tha. Reminders usi gap ke liye hain." | "Average dental no-show rate: 6.9%" · small source: "Planet DDS 2025, US practices, via DOCS Education" | Face cam with the statistic overlaid |
| 0:31–0:36 | "Comment LEAKS: kit mein clinic ke templates bhi hain. Message requests check karna." | "Comment LEAKS → free kit (clinic lines inside)" · "Check your message requests" | Face cam → end card |

**Shot list:**
- The SmileCare Dental missed-call demo in [`automations/demo/`](../automations/demo/), run on a test phone line or a simulated missed-call webhook. If it's simulated, say "simulated missed call" on screen.
- The patient's phone (WhatsApp); the booking page (demo calendar); the n8n execution view; face cam.
- **No health details anywhere on screen:** the demo messages carry only a name and a slot.

**Caption**
```
Missed call WhatsApp text-back for dental clinics: watch a missed lunch-hour call turn into a booked appointment (DEMO – fictional business).

SmileCare Dental is a fictional clinic I use for demos. The workflow is real, and the stopwatch is recorded in the same take.

1:12 pm. The front desk is at lunch and the call goes unanswered. Then:
1. WhatsApp text-back to the caller: [mm:ss from the recording]
2. A booking link, so the patient picks a slot
3. Reminders 24 h and 2 h before the appointment
4. After the visit: a review request, and later a recall reminder

Why the reminders matter: Planet DDS reports a 6.9% average dental no-show rate and 12.9% cancellations in 2025 (US practices, via DOCS Education).

Privacy first: WhatsApp needs the patient's opt-in before a business message, and India's DPDP Act covers health data. So the build includes consent capture and keeps health details off WhatsApp: just a name and a slot. The text-back also needs a phone system that can send a missed-call alert; I check that first.

This is the Missed-Call & No-Show Recovery Sprint: ₹34,999 / $1,499 (prices exclude GST), live in 10 working days.

Comment LEAKS and I'll DM you the free Lead Leak Kit (clinic lines included). Check your message requests.

#dentalclinic #dentalclinicindia #whatsappautomation #clinicmanagement
```

**Alt text:** "Screen recording labelled DEMO – fictional business. At 1:12 pm a call to the fictional SmileCare Dental goes unanswered while an amber stopwatch runs. A WhatsApp text-back reaches the caller with a booking link, the patient books a slot for 6 pm the next day, and reminders 24 hours and 2 hours before plus a review request are scheduled. A statistic reads: average dental no-show rate 6.9% (Planet DDS 2025, US practices). Hindi-English voiceover with English captions. Text: comment LEAKS."

---

## Before you publish (every post, 60 seconds)

- [ ] Every demo frame and the cover carry the **DEMO – fictional business** badge (P03, T02, P10, and P01's B-roll).
- [ ] Timed segments are uncut, and the time on screen and in the caption is **read from the recording**.
- [ ] No `[…]` fill-in or `{{…}}` token is left unfilled in the caption or on screen.
- [ ] Every statistic has its source on screen and in the caption.
- [ ] Prices match [`docs/brand-brief.json`](../docs/brand-brief.json) exactly, and "prices exclude GST" is in the caption wherever a price appears.
- [ ] One CTA, plus "check your message requests".
- [ ] The keyword automation for this post passed a test from a second, non-following account today.
- [ ] 3–5 hashtags, the keyword-rich first line, and the alt text pasted in.
- [ ] Logged in [`content-tracker.csv`](./content-tracker.csv) with ID, lane, pillar and keyword.

## Review on Sun 1 Nov (Ask Hemant Sunday + scorecard)

Add these to the weekly scorecard ([`docs/kpi-scorecard.csv`](../docs/kpi-scorecard.csv)):
- **Per post:** reach, non-follower reach %, average watch time (Reels), sends per reach, saves, keyword comments.
- **Hook tests:** T01–T04 vs P01/P03/P06/P08. Keep the winning hook *style* (scenario vs owner situation, Hinglish vs English, price-first vs honesty-first, interactive vs credibility) for the week-3 Reels.
- **Friday slot:** P05 at 19:30 vs P10 at 15:00, keeping in mind they are different topics and lanes. One pair is a hint, not a result. Repeat the test for 3–4 more Fridays before deciding.
- **Funnel:** LEAKS / PRICE / FOUNDING comments → DM replies to the question → Fit Calls booked → founding applications. These are the real launch-week numbers for Build Log #2.
