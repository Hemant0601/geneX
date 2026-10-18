# Instagram profile setup: @askhemant

**For:** Hemant Kumar (they/them) · **Written:** Sun 18 Oct 2026 · **Do it:** Sun 18 Oct evening, or Mon 19 Oct before 13:00 IST. P01 goes live at 15:00 IST on Mon 19 Oct, so the profile and the LEAKS automation must be working before then.

**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §5 (profile copy, DM scripts) and [`docs/01-brand-and-domain.md`](../docs/01-brand-and-domain.md) §5 (handle steps). Posts are in [`02-launch-posts.md`](./02-launch-posts.md). The full DM flows are in [`07-dm-automation-playbook.md`](./07-dm-automation-playbook.md).

> **Before you start**
> - **The handle hasn't been checked.** Instagram's username check was blocked from the research environment. Do step 1 first.
> - **Menu paths change.** Paths marked *(UI path unverified)* come from general knowledge, not from Meta's documentation. If a menu has moved, use Settings → search.
> - **Placeholders:** `{{WHATSAPP_NUMBER}}` is digits with the country code, no `+` or spaces (e.g. `9198XXXXXXXX`). Never type a made-up number.

---

## Contents

1. [Claim the handle](#1-claim-the-handle)
2. [Switch to a Creator account (and why)](#2-switch-to-a-creator-account)
3. [Link a Facebook Page and Meta Business Suite](#3-link-a-facebook-page-and-meta-business-suite)
4. [Name field](#4-name-field)
5. [Bio, plus 2 alternates for an A/B test](#5-bio)
6. [Profile photo](#6-profile-photo)
7. [The 5 bio links, with UTM tags](#7-the-5-bio-links)
8. [Contact buttons](#8-contact-buttons)
9. [Highlights](#9-highlights)
10. [Pinned posts](#10-pinned-posts)
11. [Settings: security, comments, hidden words, message requests](#11-settings)
12. [First 60 minutes checklist](#12-first-60-minutes-checklist)

---

## 1. Claim the handle

**Order of preference** (from [`brand-brief.json`](../docs/brand-brief.json)):

| # | Handle | When to use it |
|---|---|---|
| 1 | **@askhemant** | First choice |
| 2 | @askhemant.ai | If @askhemant is taken. The period reads like the domain and is allowed |
| 3 | @hemantautomates | If both of the above are taken |
| 4 | @hemant.automates | Last personal-name fallback |
| — | @kramik.ai | Only if the brand itself changes to Kramik |

Whichever handle you get, keep **AskHemant** as the brand on the site, in the name field and on every graphic.

**Steps:**
1. **Check (30 seconds).** Open your personal account → **Edit profile → Username** → type `askhemant`. If the app accepts it, the handle is free. **Don't save it on your personal account.** Back out.
2. **Create a separate business account.** Profile → menu → **Add account → Create new account** → username `askhemant`. Sign up with your phone or a Gmail you'll always control. Add `hello@askhemant.ai` as the account email once the mailbox exists.
3. **Confirm the email and phone** straight away. Instagram uses them for recovery.
4. **Impersonation guard (optional, 2 minutes).** Also register **@askhemant.ai**, set it to **private**, and give it the bio `Official account: @askhemant`. Post nothing on it.
5. **The same name everywhere, the same day:** Threads (it uses the Instagram handle), YouTube @askhemant, the Facebook Page "AskHemant" (step 3), a LinkedIn custom URL (`linkedin.com/in/askhemant` if free). X is optional.

**Don't:** buy a handle from a third party; put "official" or "verified" in the name; mass-follow or mass-DM from the new account. Users report temporary action blocks after aggressive activity on new accounts ([`research/instagram-playbook.md`](../docs/research/instagram-playbook.md) §7).

---

## 2. Switch to a Creator account

**Path:** Settings → *Account type and tools* → **Switch to professional account** → **Creator** *(UI path unverified)*.
- **Category:** "Entrepreneur". If the label looks odd on the profile, turn off *Display category label*.
- **Pronouns (optional, your choice):** Edit profile → Pronouns → `they/them`. You can show them to followers only or to everyone.

**Why Creator, not Business:**
- **AskHemant is a personal brand.** Creator is the account type built for a person rather than a shop ([NapoleonCat](https://napoleoncat.com/blog/instagram-creator-vs-business-account/)).
- **Reach is reportedly the same** for both types, so nothing is lost.
- **Creator accounts reportedly get the full music library** for Reels. Business accounts get a restricted one.
- **Broadcast channels:** older guides limited them to Creator accounts. You'll want one from about 300 followers.
- **Switching is free and reversible.** Switch to Business **only if a tool you need requires it**. The likely trigger: Meta Business Suite's *Comment to Message* doesn't appear for the Creator account in step 3, or ManyChat later asks for Business. Check the tool's docs first.
- **Skip Meta Verified at launch.** It doesn't buy organic reach. Revisit after about 3 months, or sooner if impersonators appear ([CreatorFlow](https://creatorflow.so/blog/is-meta-verified-worth-it/)).

---

## 3. Link a Facebook Page and Meta Business Suite

**Why this is required:** the free LEAKS and PRICE auto-DMs run on **Meta Business Suite → Inbox → Automations → Comment to Message**. Business Suite manages an Instagram account through a connected Facebook Page. Some DM tools, ManyChat included, have historically needed a linked Page too. Current requirements are unverified, so link the Page anyway: it costs nothing and unblocks every option.

**Steps** (desktop, business.facebook.com) *(UI path unverified)*:
1. **Create the Page.** On Facebook: Pages → **Create new Page** → name `AskHemant`, category "Business consultant". Bio: `No lead left on read. AI + WhatsApp lead systems for real-estate brokers and clinics. askhemant.ai`. Use the same profile photo as Instagram.
2. **Connect Instagram.** Open Meta Business Suite with the Page selected → **Settings → Business assets → Instagram accounts → Connect** → log in as @askhemant. Or, from the Page: Settings → **Linked accounts → Instagram**.
3. **Check it worked.** In Business Suite → **Inbox**, both Messenger and Instagram tabs should show. Send a test DM to @askhemant from a second account and confirm it appears.
4. **Create the comment automations.** Business Suite → **Inbox → Automations → Comment to Message**:

| Automation | Keywords (exact, as typed) | Private reply | Live by |
|---|---|---|---|
| **LEAKS** | `LEAKS`, `Leaks`, `leaks`, `LEAK`, `leak` | "Here's your Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=leaks. Quick question so I can point you to the right fix: what do you sell, and where do most of your leads come from (portals, Meta ads, Instagram, referrals)?" | **Before P01, Mon 19 Oct 15:00 IST** |
| **PRICE** | `PRICE`, `Price`, `price`, `PRICES`, `prices` | "My full price list → askhemant.ai/pricing. What's the one thing you'd automate first?" | **Before P02, Tue 20 Oct 15:00 IST** |
| **FOUNDING** (proposed; see note) | `FOUNDING`, `Founding`, `founding` | "Here are the founding-client details → askhemant.ai/founding?utm_source=ig&utm_medium=dm&utm_campaign=founding. 3 slots at ₹14,999 / $599 (prices exclude GST), closing Mon 30 Nov 2026 or when full. To check the fit: what do you sell, and roughly how many enquiries do you get a month?" | **Before P06, Mon 26 Oct 15:00 IST** |

- **What's reported about these automations** (third parties quoting Meta's help pages; unverified): keywords match exactly and are case-sensitive, so every variant is listed. An automation takes up to 5 keywords, and each keyword can belong to only one automation. Setup is desktop-only. The keyword reply may wait about 15 minutes in case a human replies first.
- **Meta's rules, which no tool can bend:** one private reply per comment, sent within 7 days. Follow-ups only after the person replies, and within 24 hours of that reply ([Meta: private replies](https://developers.facebook.com/docs/instagram-platform/private-replies/)). For non-followers, the DM lands in **Message requests**. That's why every CTA says "check your message requests".
- **FOUNDING is new.** The strategy names only LEAKS, PRICE and (from month 2) CLINIC. The P06 founding Reel needs a keyword of its own so founding conversations don't start with the kit. If you'd rather not add a third automation, answer FOUNDING comments by hand. At 3 slots, volume will be low.
- **Test before every launch post.** From a second account that does **not** follow @askhemant, comment `leaks` (lowercase) on the post. Check that (a) the DM arrives, (b) it lands in Message requests, and (c) the link opens the kit. Delete the test comment afterwards.
- **If askhemant.ai isn't live yet** (a new domain can take a few hours to resolve): upload `website/kit/lead-leak-kit.pdf` to Google Drive (*Anyone with the link: Viewer*), put that link in the LEAKS reply, and swap back to `askhemant.ai/kit?...` as soon as the site loads. Do the same for PRICE with a Drive copy of the price list, or reply by hand.
- **When to upgrade:** if more than 25 people a month comment, move to ManyChat Essential (about $14–17 a month), because ManyChat Free stops at 25 contacts since 2 Mar 2026 ([ManyChat](https://manychat.com/blog/manychat-pricing-explained/)). Or build the flow in n8n. Decide at the day-28 review (Sun 15 Nov).

---

## 4. Name field

```
Hemant | AI Automation Consultant · Real Estate
```

- **47 characters** (counted; Instagram allows up to 64). The name field is searchable separately from the username, so the keywords "AI Automation Consultant" and "Real Estate" earn their place.
- **Backup** if it reads too long on small phones: `Hemant | AI Lead Systems for Brokers`.
- **Set it once, carefully.** Instagram has long limited name changes to about 2 in 14 days (general knowledge; check in-app). Don't use them on typos.
- **After the day-60 niche decision (Thu 17 Dec):** if clinics win, this is one of the three things that change (with the bio and pinned post #3).

---

## 5. Bio

**Bio A: live from day 1** (exact copy from the strategy):
```
AI + WhatsApp systems so no lead waits
Real estate & clinics · India + UAE
Fixed prices · live in 10 working days
Free kit: comment LEAKS ↓
```
**139 characters** including the 3 line breaks (136 without). The limit is 150.

**Two alternates for an A/B test** (counted the same way):

| Bio | Copy | Characters | What it tests |
|---|---|---|---|
| **B: broker-only focus** | `I build AI + WhatsApp lead systems for brokers`<br>`Reply, qualify, book the site visit`<br>`Fixed prices · India + UAE`<br>`Free kit: comment LEAKS ↓` | **135** (132 without breaks) | Does naming only brokers, and spelling out what the system does, convert better than "real estate & clinics"? |
| **C: tagline first** | `No lead left on read.`<br>`WhatsApp + AI for real estate & clinics`<br>`Published prices · built on your accounts`<br>`Free kit: comment LEAKS ↓` | **129** (126 without breaks) | Do trust signals (published prices, your own accounts) beat "live in 10 working days"? |

**How to run the test** (Instagram has no built-in bio A/B, so rotate by week):
- **Bio A, Mon 19 Oct – Sun 1 Nov.** Keep the profile stable through the two launch weeks.
- **Bio B, Mon 2 – Sun 8 Nov.** Bio C, Mon 9 – Sun 15 Nov.
- **Measure each week:**
  - profile visits (Insights);
  - link taps, from GA4 sessions with `utm_medium=bio`;
  - follows per 100 profile visits;
  - LEAKS comments that came from profile visitors (hard to separate, so treat as directional).
- **Decide at the day-28 review (Sun 15 Nov).** Diwali week (around 8 Nov, unverified) and differences in post quality make week-to-week comparisons noisy. Only switch if one bio is clearly ahead on link taps per visit. Otherwise keep Bio A.
- **Change only the bio** during the test: not the name field, links or photo.
- Every alternate keeps the published keyword **LEAKS** and makes no claims beyond the strategy.

---

## 6. Profile photo

**Final:** Hemant's face, head and shoulders, on a solid **Signal Indigo #4338CA** background.
- A real photo in natural light at a real desk. No stock photo, no logo, no AI-generated portrait.
- Upload a 1080×1080 image. Keep the face centred and filling about 60% of the frame, because Instagram crops to a circle and shows it at about 110 px on phones.
- Easiest way to get the background: photograph against a plain wall, remove the background (Canva's free tools or a phone editor), then place the cut-out on #4338CA.
- Use the same photo on Threads, the Facebook Page, YouTube and LinkedIn so people recognise you everywhere.

**Interim (until the photo is ready):** [`brand/logo/instagram-avatar-1080.png`](../brand/logo/instagram-avatar-1080.png), the AH chat-bubble mark. Aim to swap in the face photo during week 1. A personal brand sells trust, and a face does that faster than a logo.

**If you'd rather keep your face private** (open question 12 in the strategy): keep the AH mark permanently and lean on screen recordings with voiceover. The content plan still works.

---

## 7. The 5 bio links

Edit profile → **Links → Add external link**. Instagram shows only link 1 on the profile; the rest sit behind "and 4 more" ([Social Media Today](https://www.socialmediatoday.com/news/instagram-adds-capacity-to-display-5-links-in-profile-bio/)). Instagram doesn't report link clicks, so every website link carries UTM tags in the same format as the strategy (`utm_source=ig&utm_medium=bio`). GA4 then shows which link brought each visit through the landing page.

| # | Title (as shown) | URL |
|---|---|---|
| 1 | **Book a free Fit Call** | `https://askhemant.ai/book?utm_source=ig&utm_medium=bio` |
| 2 | **Lead Leak Kit (free)** | `https://askhemant.ai/kit?utm_source=ig&utm_medium=bio` |
| 3 | **Prices (all published)** | `https://askhemant.ai/pricing?utm_source=ig&utm_medium=bio` |
| 4 | **WhatsApp Hemant** | `https://wa.me/{{WHATSAPP_NUMBER}}?text=Hi%20Hemant%2C%20saw%20your%20Instagram` |
| 5 | **3 founding slots · closes 30 Nov** | `https://askhemant.ai/founding?utm_source=ig&utm_medium=bio` |

- **Link 4** can't carry UTM tags (wa.me doesn't pass them on). Its pre-filled text, "Hi Hemant, saw your Instagram", tells you the source when the chat opens.
- **Link 5 after Mon 30 Nov 2026,** or as soon as all 3 slots are signed: remove it, or retitle it `Lead Leak Audit` and point it to `https://askhemant.ai/pricing?utm_source=ig&utm_medium=bio`. Never leave a closed deadline in the bio.
- **Test every link** from a phone that isn't logged in to anything. The pages must load over https, and link 4 must open WhatsApp with the text filled in.

---

## 8. Contact buttons

Edit profile → **Contact options** *(UI path unverified)*:
- **Email:** `hello@askhemant.ai`
- **Phone / WhatsApp:** `{{WHATSAPP_NUMBER}}`, the WhatsApp Business app number. Choose WhatsApp as the contact method if offered. Some app versions link WhatsApp from Edit profile → **Add WhatsApp** instead.
- **Display contact info:** On.
- **No "Book" action button.** On Instagram these are a Business-account feature that runs through partner apps. Link 1 covers booking.

Set the WhatsApp Business app's greeting and away messages before launch. Use templates 01 and the clinic missed-call line from the Lead Leak Kit, so your own replies pass your own 10 pm test.

---

## 9. Highlights

**Covers:** 1080×1920 PNGs in [`instagram/graphics/highlights/`](./graphics/highlights/). There is one per highlight: Start Here, Pricing, Demos, Build Log, FAQ, and Results (held back); exact file names are in [`graphics/README.md`](./graphics/README.md). Each is the icon centred in the circle-safe area, on Indigo.

**How to create one:** a highlight needs at least one Story. Post the first frame as a Story → tap **Highlight** → **New** → name it → **Edit cover** → pick the cover PNG from your camera roll.

**Order on the profile:** a highlight usually jumps to the front when you add a Story to it (general knowledge; check in-app). To get the order below, add the last frame to each in reverse order: FAQ, Build Log, Demos, Pricing, Start Here. Start Here then sits first.

| # | Name (max ~15 chars shows) | Create | What goes in (frames) |
|---|---|---|---|
| 1 | **Start Here** | Day 1 | (1) "I'm Hemant. I build AI + WhatsApp systems so no lead waits." (2) Who I help: brokers, channel partners and clinics, India + UAE. (3) What the system does: reply, qualify, book, remind, follow up 30 days, log. (4) How it works: Fit Call → Audit → Sprint. (5) "Every demo here is labelled DEMO – fictional business. No client case studies yet; I'll publish real ones with permission." (6) Link sticker → `askhemant.ai/book?utm_source=ig&utm_medium=story`. Add a share of P01 once it's live |
| 2 | **Pricing** | Day 1 | (1) "Every price is published." (2) Lead Leak Audit ₹9,999 / $499, 100% credited to a Sprint within 30 days. (3) Speed-to-Lead Sprint ₹34,999 / $1,499; Team System ₹79,999 / $2,999; Clinic Sprint ₹34,999 / $1,499. (4) Lead Desk Care ₹9,999 / $299 a month; Growth ₹24,999 / $799 a month. (5) Ask Hemant Session ₹1,999 / $99. (6) "All prices exclude GST. Running costs are billed to your own accounts." Link sticker → `/pricing`. Add shares of P02 and P07 |
| 3 | **Demos** | After P03 (21 Oct) | Shares of P03 (Skyline Realty – DEMO) and P10 (SmileCare Dental – DEMO). **Every frame keeps the amber "DEMO – fictional business" badge.** Add a link sticker to `/demos` only once that page exists |
| 4 | **Build Log** | After P08 (28 Oct) | A share of P08, then one frame a week with the real numbers from the Sunday scorecard: comments, kit sign-ups, median DM reply time, calls booked. Post the numbers even when they're small or zero |
| 5 | **FAQ** | Day 1 | One question per frame: **Price?** "Published at askhemant.ai/pricing. Sprint ₹34,999 / $1,499, excluding GST." · **How long?** "Live in 10 working days after you give access. If not, your first month of Lead Desk Care is free." · **My data?** "Everything runs on your own Meta, WhatsApp and CRM accounts. I act as a processor; health details stay off WhatsApp for clinics." · **Why not Meta's free AI?** "Use it if you only need FAQs. I connect what it doesn't do on its own (as of Oct 2026): your portal and Meta-form leads, routing to the right agent, day-7 and day-30 follow-ups, and your CRM." · **What if it breaks?** "14-day bug-fix warranty, then optional Lead Desk Care: fixes within 1 working day." End with a question sticker: "Ask Hemant anything" |
| 6 | **Results** | **Only when real results exist** | Measured, consented founding-pilot numbers with the method and sample size, plus testimonials quoted word for word. **Don't create it empty and don't fill it with demos.** Expected no earlier than the first 30-day measurements (month 2–3) |

---

## 10. Pinned posts

Instagram lets you pin up to 3 posts to the top of the grid (check in-app). Post → **⋯ → Pin to your profile**.

| Slot | Post | Why |
|---|---|---|
| **#1** | **P02**: carousel "Who I help, how I work, my prices" (Tue 20 Oct) | Answers the first three questions a profile visitor has |
| **#2** | **P03**: Reel "Watch the timer" (Skyline Realty – DEMO) (Wed 21 Oct) | The best proof of the core offer, labelled as a demo |
| **#3** | **P06**: Reel "I'm taking 3 founding clients" (Mon 26 Oct) | The real offer with a real deadline. Replace it after 30 Nov or once the slots are full |

**Timeline:**
- Mon 19 Oct: pin **P01** as a placeholder.
- Tue 20 Oct: pin **P02**.
- Wed 21 Oct: pin **P03**.
- Mon 26 Oct: unpin P01 and pin **P06**.

**Order:** recently, Instagram has shown the most recently pinned post first (top-left); this is unverified, so check after pinning. If it does, re-pin in reverse order on Mon 26 Oct: P06 first, then P03, then P02 last, so P02 lands in slot #1.

**After the founding close (Mon 30 Nov or when full):** replace P06 with the best-performing Open Price Book or Build Log post until the first real case study exists.

---

## 11. Settings

Menu names below are *(UI path unverified)*. If one isn't where it says, use the search bar at the top of Settings.

### Security (do this first; the account will hold leads)
- [ ] **Two-factor authentication with an authenticator app** (Google Authenticator, Microsoft Authenticator or similar), not SMS only. Path: Accounts Center → Password and security → Two-factor authentication.
- [ ] **Backup codes:** download them, print them, keep them offline. Not in the same Google Drive as the account email.
- [ ] **A strong unique password** in a password manager.
- [ ] **Login alerts on.** Check *Where you're logged in* weekly.
- [ ] **Recovery:** confirm the email and phone, and add `hello@askhemant.ai` once it exists.
- [ ] Facebook Page admins: only you. Add a second admin only someone you'd trust with the account.

### Privacy and discovery
- [ ] **Account privacy: Public.**
- [ ] **Search engines:** Settings → Account privacy → *Allow public photos and videos to appear in search engine results*: **On**. Public professional posts have been eligible for Google results since July 2025 ([Kontentino](https://www.kontentino.com/q-and-a/instagram-search-seo/)).
- [ ] **Sharing:** allow sharing posts and Reels to Stories and in messages. Sends are the strongest signal for reaching non-followers ([Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/)).
- [ ] **Trial reels:** Professional dashboard → check whether *Trial reels* is available. If not, T01–T04 in [`02-launch-posts.md`](./02-launch-posts.md) post as Stories instead (see the note there).

### Comments
- [ ] **Allow comments from: Everyone.** The LEAKS funnel depends on comments from non-followers.
- [ ] **Hidden Words → Hide comments: On.** **Advanced comment filtering: On.**
- [ ] **Custom words and phrases (Hidden Words → Manage custom words):** start with spam phrases only, for example `buy followers`, `promote it on`, `promo on @`, `crypto signals`, `forex`, `earn daily`, `telegram me`, `check my bio for`. Add more as spam arrives.
- [ ] **Never hide words a buyer would use:** `LEAKS`, `leak`, `PRICE`, `price`, `cost`, `FOUNDING`, `details`, `interested`, `BHK`, `site visit`, `investment`, `WhatsApp`, `DM`. Hiding these would silently break the funnel.
- [ ] **On each launch post, pin your own first comment** with the CTA ("Comment LEAKS ↓ and I'll DM you the kit"). Reply to every real comment within the day.
- [ ] Use **Restrict** for trolls and **Limits** if a post attracts a pile-on. Don't argue in public.

### Messages and message requests
- [ ] **Message controls → Others on Instagram:** deliver to **Message requests**, not "Don't receive requests". Commenters and leads who don't follow you must still be able to reach you.
- [ ] **Hidden Words → Hide message requests: On**, but **check the *Hidden requests* folder every day**. Filters sometimes catch real enquiries.
- [ ] **Notifications:** turn on comments, DMs and message requests. You're selling speed-to-lead, so your own replies must be fast. The strategy's target is a personal reply within 4 working hours.
- [ ] **Saved replies** (Settings → Business/Creator tools → Saved replies): add shortcuts for the Fit Call link, the kit link and the price list, so manual replies stay fast and consistent.
- [ ] **Activity status: Off** (optional), so people don't expect an instant reply at 1 am.

### Profile hygiene
- [ ] **Pronouns** set or left blank, your choice (step 2).
- [ ] **Category label** shown or hidden (step 2).
- [ ] **No follower or "results" claims** anywhere on the profile until they're measured and consented.

---

## 12. First 60 minutes checklist

Prepared copy is all in this file. Have open: this page, `brand/logo/instagram-avatar-1080.png`, the highlight covers, a second Instagram account for testing, and a laptop for Meta Business Suite.

| Minutes | Do | Done when |
|---|---|---|
| **0–5** | Check `askhemant` → create the new account (§1). Fall back to @askhemant.ai, then @hemantautomates | The account exists under the best available handle |
| **5–12** | Authenticator 2FA, backup codes saved offline, email and phone confirmed, login alerts on (§11 Security) | You can log in on a second device using the authenticator |
| **12–15** | Switch to **Creator**, category "Entrepreneur", pronouns optional (§2) | Profile shows Professional dashboard |
| **15–22** | Name field, **Bio A**, interim avatar, 5 links, email + WhatsApp contact options (§4–§8) | All 5 links open correctly on a logged-out phone |
| **22–35** | Facebook Page "AskHemant" → connect @askhemant in Meta Business Suite (§3) | Instagram DMs appear in the Business Suite inbox |
| **35–45** | Create the **LEAKS** and **PRICE** Comment to Message automations, and test from the second account (§3). If askhemant.ai isn't live, use the Drive fallback | The test comment produces the DM in Message requests and the link opens the kit |
| **45–50** | Comments, Hidden Words, message controls, notifications, search-engine setting (§11) | Keywords aren't in the hidden-words list |
| **50–56** | Post Story frames for **Start Here**, **Pricing** and **FAQ**, and save each as a highlight with its cover (§9) | 3 highlights visible on the profile |
| **56–60** | Claim the handle on Threads, YouTube and LinkedIn; optional @askhemant.ai guard (§1). Screenshot the profile from a logged-out phone and check that the name, bio, link 1 and photo look right | Screenshot saved; Monday's checklist ([`docs/02-launch-checklist.md`](../docs/02-launch-checklist.md)) updated |

**Gate before P01 (Mon 19 Oct, 15:00 IST):** the profile is complete, the LEAKS automation passed the second-account test, and the kit link opens (askhemant.ai or the Drive fallback). If the LEAKS DM fails, post P01 anyway but change its CTA to "DM me LEAKS" and reply by hand.

**The first 60 minutes after each post goes live:**
- [ ] Pin your CTA comment, then reply to every comment within the hour. Replies add to the conversation and show you're responsive.
- [ ] Check the auto-DM fired for every keyword comment. Reply by hand to any it missed (within 7 days of the comment).
- [ ] Share the post to your Story, with a poll or question sticker.
- [ ] Log the post in [`content-tracker.csv`](./content-tracker.csv) with its ID, lane and keyword.
- [ ] Answer DM replies to the kit question personally, inside the 24-hour window. The personal-reply script is in [`07-dm-automation-playbook.md`](./07-dm-automation-playbook.md).
