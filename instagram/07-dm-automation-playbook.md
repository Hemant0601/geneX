# DM Automation Playbook: comment → DM → conversation → Fit Call

**For:** Hemant Kumar · **Written:** Sun 18 Oct 2026 · **Covers:** month 1 (Meta Business Suite, free) and month 2+ (ManyChat Essential)
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §5 (funnel, DM scripts) and §7 (lead magnet); [`docs/research/instagram-playbook.md`](../docs/research/instagram-playbook.md) §7 (automation rules). Account setup clicks: [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §7 and §19 and [`01-profile-setup.md`](./01-profile-setup.md) §3. Posts that use each keyword: [`02-launch-posts.md`](./02-launch-posts.md).

> **How to read this**
> - Text in quote blocks is **copy-paste ready**. `[Square brackets]` are things you fill in per person.
> - Every message comes in **English (EN)** and **Hinglish (HI)**. Use the language the person wrote in. The automated first DM stays in English (it's the exact strategy text); switch to Hinglish from your first personal reply if they write in Hinglish.
> - **Hindi verbs are gendered in the first person** (*karta/karti hoon*). The Hinglish below uses neutral forms where possible (*bhej diya hai*, *dekhte hain*, *batayiye*). Where a first-person verb is unavoidable it uses the form already in the launch scripts (*karta hoon*); change it to the form you naturally use.
> - **Menu names were checked by web search on 18 Oct 2026, but only through third-party guides.** Meta's own step-by-step path could not be confirmed. Anything marked *(unverified)* may be labelled differently on your screen. Fix this file when it is.

---

## 0. The system on one screen

```
Post CTA: "Comment LEAKS"     Story/Live CTA: "DM me LEAKS"     Profile: FAQ buttons
        │                                  │                              │
        ▼                                  ▼                              ▼
Comment to Message (auto)        Custom keyword reply (auto)      FAQ answer (auto)
 = ONE private reply, ≤7 days     (they messaged first)            (they tapped first)
        │                                  │                              │
        └──────────────► their reply opens Meta's 24-hour window ◄────────┘
                                           │
                                           ▼
             Hemant's PERSONAL reply, within 4 working hours (always inside 24 h)
             one concrete idea → a test they can run → the free Fit Call link
                                           │
                     ┌─────────────────────┼──────────────────────┐
                     ▼                     ▼                      ▼
           askhemant.ai/book        Kit + Ask Hemant Session    "Not now": ask permission
           (Cal.com intake)         (under ₹15K / out of niche)  to check back; then stop
```

| Keyword | Comment variants to set up (exact, case-sensitive) | What the first DM delivers | Live by | Used by |
|---|---|---|---|---|
| **LEAKS** | `LEAKS`, `Leaks`, `leaks`, `LEAK`, `leak` | The Lead Leak Kit (ungated) + 1 question | **Mon 19 Oct, before 15:00 IST** | P01, P03, P04, P05, P08, P09, P10 and trial reels T01, T02, T04 |
| **PRICE** | `PRICE`, `Price`, `price`, `PRICES`, `prices` | The full price list + 1 question | **Tue 20 Oct, before 15:00 IST** | P02, and anyone asking about price |
| **FOUNDING** | `FOUNDING`, `Founding`, `founding` | Founding-client details + 1 question | **Mon 26 Oct, before 15:00 IST** | P06, T03 |
| **CLINIC** *(month 2)* | `CLINIC`, `Clinic`, `clinic`, `CLINICS`, `clinics` | Clinic kit (later: the Missed-Call Recovery Playbook) + 1 question | When the clinic magnet is ready (month 2, from 16 Nov) | Clinic posts from month 2 |
| **LEAKS in DMs** *(DM keyword; fallback KIT)* | `LEAKS`, `Leaks`, `leaks` (fallback `KIT`, `Kit`, `kit`) | Same as LEAKS | Thu 22 Oct (with the Stories setup) | Story CTAs and Lives: "DM me LEAKS" ([`05-stories-broadcast-collabs.md`](./05-stories-broadcast-collabs.md) §6) |

FOUNDING is an addition to the strategy's keyword list (made in [`02-launch-posts.md`](./02-launch-posts.md)). KIT is a fallback only: Meta reportedly lets each keyword sit in one automation, so `LEAKS` may not be usable for both comments and DMs (§2.4).

**Your service level:** personal reply **within 4 working hours** (strategy §5 funnel), and **never later than 24 hours** after the person's last message. Working hours = Mon–Sat 10:00–19:00 IST (the WhatsApp Business hours in [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §8).

---

## 1. The rules

### 1.1 Meta's rules (no tool can bend these)

| Rule | What it means for you | Source |
|---|---|---|
| **One private reply per comment, within 7 days** of the comment | The keyword automation sends exactly one DM. You can't send a second "did you get it?" message to someone who only commented. On a Live, the reply must go out during the broadcast | [Meta: private replies](https://developers.facebook.com/docs/instagram-platform/private-replies/) |
| **Follow-ups only after the person replies, inside 24 hours of that reply** (the "24-hour messaging window") | Each time they write, a new 24-hour window opens. Automation and API tools (Meta Business Suite automations, ManyChat) may only message inside it | [Meta: private replies](https://developers.facebook.com/documentation/business-messaging/instagram-messaging/features/private-replies), [Meta: messaging policy](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview), [Inro](https://www.inro.social/glossary/24-hour-messaging-window) |
| **Human Agent tag** extends replies to 7 days, for a **human** answering a real question, never for promotion | Through the API it needs Meta's approval. Don't plan around it. If a human reply is needed after 24 hours, keep it to the answer they asked for | [Meta: messaging policy](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview) |
| **Non-followers get your DM in Message Requests** | Every CTA says "check your message requests". Check your own Requests folder twice a day | [Meta: private replies](https://developers.facebook.com/docs/instagram-platform/private-replies/) |
| Reported but **unconfirmed**: new limits on DMs to non-follower commenters | Watch the delivery rate in your tests (§2.7). If test DMs stop arriving, reply by hand | [Meta developer community thread](https://developers.secure.facebook.com/community/threads/805868338192432) via the research file |

### 1.2 AskHemant house rules (stricter than Meta's)

1. **Every message is one the person asked for.** A comment keyword, a DM, a story reply, a tapped FAQ or a booking. Likes, follows, views and poll votes are **not** requests.
2. **The first DM delivers what the post promised, with no gate.** The kit link is ungated (strategy §7).
3. **One question per message.** The answer is what opens the conversation.
4. **Pitch only after a real exchange.** The Fit Call link goes in your *personal* reply, after they've answered.
5. **At most one personal follow-up** if they go quiet, and only while their last message is under 24 hours old. Then stop. Exception: they asked you to come back ("message me Monday"): one message on that day is fine.
   - *Note:* typing a reply yourself in the Instagram app isn't technically blocked after 24 hours (the window is enforced on automation tools and the API). The house rule is the same anyway: chasing people who stopped replying looks like spam, and users report action blocks after aggressive messaging ([research](../docs/research/instagram-playbook.md) §7).
6. **No cold automated DMs, ever.** No DMs to new followers, no "follow to DM" (ManyChat reportedly blocks it under 1,000 followers anyway), no mass DMs, no DM lists.
7. **Instagram is not WhatsApp consent.** Move to WhatsApp only when they give you their number for a reason (a booking, the kit form with the consent box ticked) or tap your `wa.me` link. Marketing on WhatsApp needs the separate, unticked consent box (DPDP) and approved templates.
8. **Never ask for a phone number in the DM before they want a call.** Cal.com collects it.
9. **Never screenshot or repost anyone's DM** without written permission. Content uses anonymised, paraphrased questions.
10. **Same integrity rules as every post:** "within a minute" is a design target measured from when a lead reaches the system; no guaranteed results; demos say *DEMO – fictional business*; statistics carry their source.

### 1.3 Who you may message, and how

| What the person did | What you may send | Channel |
|---|---|---|
| Commented a keyword | **One** private reply (the automation), within 7 days | Instagram |
| Replied to that DM, sent you a DM, replied to a Story, tapped an FAQ | Conversation for 24 hours after each of their messages | Instagram |
| Booked a Fit Call (gave their WhatsApp number on the form) | Cal.com confirmation and reminder emails; **one** WhatsApp reminder 2 hours before ("Reply 1 to confirm") | Email, WhatsApp |
| Filled the kit form **and ticked** the consent box | The n8n WhatsApp welcome and approved templates, with STOP to opt out | WhatsApp |
| Filled the kit form **without** ticking the box | Nothing on WhatsApp. They have the calculator; that's what they asked for | — |
| Messaged your WhatsApp number | Conversation, as on any WhatsApp chat. No broadcast lists or groups | WhatsApp |
| Liked, followed, viewed, voted in a poll | Nothing | — |

---

## 2. Month 1: Meta Business Suite (free)

### 2.0 What the October 2026 check found

Checked by web search on Sun 18 Oct 2026 (third-party guides quoting Meta's help pages; Meta's own step-by-step path was not found):

- **Where it lives:** Meta Business Suite → **Inbox → Automations**. Meta calls these "inbox automations" and ships about ten templates: instant reply, away message, frequently asked questions, custom keywords, **comment to message**, and others ([Omnichat](https://blog.omnichat.ai/instagram-automation/), [getkanal](https://getkanal.com/blog/instagram-automatic-messages)).
- **What Meta says it does:** "Send a message reply to comments on your posts that contain specific keywords or phrases" (quoted by [getkanal](https://getkanal.com/blog/instagram-automatic-messages)). **One Meta page reportedly says "hashtags" instead of keywords** ([CreatorFlow](https://creatorflow.so/blog/instagram-built-in-automation/)). Test plain `LEAKS` first; if it never triggers, try `#LEAKS` in the test and see §2.8.
- **Limits (reported, unverified):** up to **5 keywords** per automation; **exact, case-sensitive** matching; **each keyword in only one automation**; **desktop-only** setup; for DM keyword automations, the reply waits **about 15 minutes** in case a human answers first ([CreatorFlow](https://creatorflow.so/blog/instagram-built-in-automation/), research file §7).
- **Watch out for Meta Business Agent / Business AI.** CreatorFlow reports a Meta statement that **turning on Meta Business Agent pauses existing automations**, including away messages and instant replies ([CreatorFlow](https://creatorflow.so/blog/instagram-built-in-automation/)). **Don't switch on Meta's AI agent for @askhemant's inbox** while you rely on these automations. (Testing it on a *demo* account for content is fine.)
- **Unknowns you'll only see on screen:** whether Comment to Message can also post a **public** reply (assume not: reply publicly by hand, §4); whether it can apply to **all posts** or needs each post selected; whether it appears for a **Creator** account (if not, see §2.8).

### 2.1 Before you start (10 minutes)

- [ ] @askhemant is a **Creator** account, linked to the **AskHemant Facebook Page** ([`01-profile-setup.md`](./01-profile-setup.md) §3).
- [ ] In the Instagram app: **Settings → Messages and story replies → Message controls → Connected tools → Allow access to messages: ON** *(path unverified)*. Business Suite and ManyChat need this to read and send DMs.
- [ ] On a **desktop**, business.facebook.com → **Inbox** shows an **Instagram** tab with your DMs.
- [ ] A **second Instagram account that does not follow @askhemant**, logged in on your phone, for testing.
- [ ] The links work: `askhemant.ai/kit`, `askhemant.ai/pricing`, `askhemant.ai/founding`. If the domain isn't live yet, use the Google Drive fallback in [`01-profile-setup.md`](./01-profile-setup.md) §3 and swap back the same day.
- [ ] Meta Business Agent / Business AI is **off** for this inbox (§2.0).

### 2.2 Create the LEAKS automation (click by click)

*(Paths as reported; unverified. Labels may differ slightly.)*

1. Desktop → **business.facebook.com** → top-left account switcher → choose **AskHemant**.
2. Left menu → **Inbox**.
3. Top right of the inbox → **Automations** (sometimes behind a lightning-bolt icon or a **⋯ More** menu).
4. **Create automation** (or **+ Create**) → pick the template **Comment to message** (or "Send a message to people who comment").
5. **Channel:** Instagram only. Untick Facebook if both are shown.
6. **Name:** `LEAKS – Lead Leak Kit`.
7. **Posts:** choose **All posts and reels** if offered. If you can only pick specific posts, select every post whose CTA says LEAKS, and add a step to your posting routine: *"Add this post to the keyword automation."*
8. **Keywords:** type each one and press Enter after each: `LEAKS` · `Leaks` · `leaks` · `LEAK` · `leak` (5 = the reported maximum).
9. **Message:** paste exactly:
   > Here's your Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=leaks. Quick question so I can point you to the right fix: what do you sell, and where do most of your leads come from (portals, Meta ads, Instagram, referrals)?
10. If it offers **buttons or a link preview**, leave them off; plain text with the link is the most reliable.
11. **Save** → make sure the toggle shows **On / Active**.
12. Run the test in §2.7 before the next post goes live.

### 2.3 PRICE and FOUNDING (same steps, different text)

**PRICE** · name `PRICE – price list` · keywords `PRICE` · `Price` · `price` · `PRICES` · `prices` · message:
> My full price list → askhemant.ai/pricing. What's the one thing you'd automate first?

**FOUNDING** · name `FOUNDING – founding clients` · keywords `FOUNDING` · `Founding` · `founding` · message:
> Here are the founding-client details → askhemant.ai/founding?utm_source=ig&utm_medium=dm&utm_campaign=founding. 3 slots at ₹14,999 / $599 (prices exclude GST), closing Mon 30 Nov 2026 or when full. To check the fit: what do you sell, and roughly how many enquiries do you get a month?

**FOUNDING after it closes** (Mon 30 Nov 2026, 23:59 IST, or the moment the 3rd slot is signed): **edit the message, don't delete the automation**, so late commenters still get an honest answer:
> Thanks for asking. The founding program is now closed: all 3 slots are taken. Full-price Audits and Sprints are open, and every price is published → askhemant.ai/pricing?utm_source=ig&utm_medium=dm&utm_campaign=founding. What do you sell, and where do most of your leads come from?

(If it closed on the date rather than by filling up, replace "all 3 slots are taken" with "it closed on Mon 30 Nov 2026".)

### 2.4 LEAKS (or KIT) as a DM keyword for Stories and Lives (custom keywords)

Stories can't take comments, and private replies to Live comments must go out during the broadcast, so Story and Live CTAs say **"DM me LEAKS"** ([`05-stories-broadcast-collabs.md`](./05-stories-broadcast-collabs.md) §6).

1. Inbox → Automations → **Create** → template **Custom keywords** (replies to DMs that contain a keyword).
2. Channel: Instagram. Keywords: `LEAKS` · `Leaks` · `leaks` (plus `KIT` · `Kit` if there's room).
   - **If Business Suite refuses** because LEAKS already lives in the Comment to Message automation (each keyword reportedly fits in only one automation), use `KIT` · `Kit` · `kit` instead, and change Story and Live CTAs to **"DM me KIT"**. Tell the owner of [`05-stories-broadcast-collabs.md`](./05-stories-broadcast-collabs.md) to swap the word too.
3. Message: the same text as LEAKS (§2.2), with `utm_campaign=story` instead of `leaks`:
   > Here's your Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=story. Quick question so I can point you to the right fix: what do you sell, and where do most of your leads come from (portals, Meta ads, Instagram, referrals)?
4. Expect the reply after **about 15 minutes** if you haven't answered first (reported). If you're online, just send the `/kit` saved reply (§8) yourself.

### 2.5 FAQ buttons ("ice breakers")

Up to **4 questions** that show when someone opens a new chat with you; tapping one sends the question and returns your answer ([Meta: ice breakers](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api/ice-breakers), [CreatorFlow](https://creatorflow.so/blog/instagram-built-in-automation/)). Set them in Business Suite → Inbox → Automations → **Frequently asked questions**, or in the Instagram app under your professional tools *(paths unverified)*. They reportedly show only once per person ([LiveDune](https://wiki.livedune.com/en/articles/9707475-icebreakers-introductory-messages)), and a tapped FAQ may land in your **Requests** folder, so check Requests daily.

| # | Question (button text) | Automatic answer (EN) |
|---|---|---|
| 1 | What do you build? | I build AI + WhatsApp lead systems for real-estate brokers and clinics: every enquiry gets an instant reply, the qualifying questions, a booked visit or appointment, and 30 days of follow-up. Fixed price, live in 10 working days, built on your own accounts. What do you sell, and where do your leads come from? |
| 2 | What does it cost? | Every price is published → askhemant.ai/pricing (prices exclude GST). The main build, the Speed-to-Lead Sprint, is ₹34,999 / $1,499. What's the one thing you'd automate first? |
| 3 | Get the free Lead Leak Kit | Here it is, no email needed → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=faq. Start with the 10 pm test on page 11. Where do most of your leads come from? |
| 4 | Book a free 20-min call | Here's the booking page → askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=faq. It's a 20-minute diagnosis and an honest yes or no on fit. I'll only pitch if it's a fit. |

Hinglish versions to send by hand when someone taps an FAQ and writes in Hinglish:

| # | HI |
|---|---|
| 1 | Main real-estate brokers aur clinics ke liye AI + WhatsApp lead systems banata hoon: har enquiry ko turant reply, qualifying sawaal, visit ya appointment booking, aur 30 din ka follow-up. Fixed price, 10 working days mein live, aapke apne accounts par. Aap kya bechte hain, aur leads kahan se aati hain? |
| 2 | Saare prices published hain → askhemant.ai/pricing (GST alag). Main build, Speed-to-Lead Sprint, ₹34,999 ka hai. Sabse pehle aap kya automate karna chahenge? |
| 3 | Yeh raha kit, email ki zaroorat nahi → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=faq. Page 11 ka 10 pm test sabse pehle try kijiye. Aapki zyada leads kahan se aati hain? |
| 4 | Booking page yeh raha → askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=faq. 20 minute ka diagnosis, aur fit hai ya nahi, seedha jawab. Pitch tabhi, jab fit ho. |

### 2.6 Away message, instant reply, saved replies, labels

- **Away message: ON.** Outside Mon–Sat 10:00–19:00 IST:
  > Thanks for your message. I'm offline right now and will reply personally on my next working morning (Mon–Sat, IST). Prices: askhemant.ai/pricing · Free 20-min Fit Call: askhemant.ai/book
  - **HI (for your saved replies):** Message ke liye shukriya. Abhi offline hoon; agli working morning (Mon–Sat, IST) personally reply milega. Prices: askhemant.ai/pricing · Free 20-min Fit Call: askhemant.ai/book
- **Instant reply: OFF** at launch. It can fire on top of a keyword DM and make the thread feel robotic. Your personal reply is the product.
- **Saved replies** (Instagram app → Settings → *Business tools and controls* or *Creator tools and controls* → **Saved replies** *(path unverified)*): add the shortcuts in §8 (on Instagram you type the shortcut word, e.g. `kit`, and tap the suggestion; WhatsApp uses `/kit`).
- **Labels** in the Business Suite inbox *(feature location unverified)*: `kw-LEAKS` · `kw-PRICE` · `kw-FOUNDING` · `kw-CLINIC` · `story` · `AHS` (Ask Hemant Sunday) · `lane-RE` · `lane-CL` · `lane-GEN` · `replied` · `call-booked` · `not-fit` · `founding-applicant`. Mirror them in the pipeline Sheet (§9).

### 2.7 Test protocol (before every post that uses a keyword)

Use the second account (not following @askhemant), on mobile data rather than office Wi-Fi if you can:

- [ ] Comment the keyword in **lowercase** (`leaks`). Within 2 minutes: does the DM arrive? Note the delay.
- [ ] Is it in **Message requests** (expected for non-followers)?
- [ ] Does the link open the right page, with the UTM tags intact?
- [ ] Comment `LEAKS please` and `Leaks!` once each. Do they trigger? Write the answer here: ______. (If not, people who add words won't get the DM; reply to those by hand.)
- [ ] Comment the same keyword again on the same post. Expect **no** second DM (one private reply per comment, and many tools send one per person per post).
- [ ] Reply to the DM from the test account → it appears in your Business Suite inbox and the Instagram app.
- [ ] Delete the test comments. Log the result in the Content tab of the pipeline Sheet.

### 2.8 Troubleshooting

| Problem | Try this |
|---|---|
| "Comment to message" isn't in the template list | Check Instagram is connected to the Page (Business Suite → Settings → Business assets). Check *Allow access to messages*. Still missing: switch @askhemant to a **Business** account (free, reversible, [`01-profile-setup.md`](./01-profile-setup.md) §2), set it up, test again |
| The automation exists but never fires | Turn it off and on. Check the post is selected. Try `#LEAKS` in a test (one Meta page says "hashtags"). Check Meta Business Agent is off. If it still fails twice, **reply to every keyword comment by hand** with the `/kit` saved reply within 4 working hours, and bring the ManyChat switch forward (§3) |
| DM arrives for followers but not non-followers | Look in the test account's **Requests → Hidden requests**. If it's missing entirely, it's the unconfirmed non-follower restriction (§1.1): reply by hand and tell people in captions to follow first if they want the DM in their main inbox |
| Someone comments a variant you didn't list (`Leakz`, `LEAKS!!`) | Reply by hand with `/kit`. If one variant keeps appearing, swap it in for the least-used of your 5 keywords |
| Two DMs arrive | Two automations share a keyword (for example after moving to ManyChat). Turn one off |
| You hit an action block | Stop all manual DMs for 24 hours, keep automations running, and don't paste the same text dozens of times in a row: personalise the first line |

---

## 3. Month 2: ManyChat Essential

### 3.1 When to switch (any one of these)

1. **More than 25 different people comment a keyword in a 30-day period** (count unique commenters in the Content tab). ManyChat's own plan is irrelevant until then, but Free stops at 25 contacts, so you'd jump straight to Essential ([ManyChat](https://manychat.com/blog/manychat-pricing-explained/)).
2. Meta's automation **fails your test twice** (§2.7–2.8).
3. You want things Meta's tool doesn't do: **rotating public replies**, **tags and branching**, a **button** that opens the 24-hour window, or **one flow across comments, story replies and DMs**.

**Decide at the day-28 review, Sun 15 Nov** ([`docs/00-strategy.md`](../docs/00-strategy.md) §9: stay native, ManyChat Essential, or your own n8n flow). Switch on a weekday morning **before** a post goes live, never during a launch.

**Cost (confirm at manychat.com/pricing):** Essential about **$14–17 a month** for **250 active contacts** (anyone you exchange messages with that month), with overage reported at about $0.10 per contact. Pro (about $29–39) adds AI and WhatsApp, which you don't need here ([research](../docs/research/instagram-playbook.md) §7, [ManyChat](https://manychat.com/blog/manychat-pricing-explained/)).

**ManyChat or your own n8n flow?** n8n on the Instagram Messaging API is a better portfolio piece (a Build Log Reel), but needs Meta developer access for your own account *(unverified)* and your time during founding deliveries. Default: **ManyChat now, n8n as a month-3 Build Log project.**

### 3.2 Setup (click by click)

*(Steps as described by third-party guides, e.g. [SetSmart](https://setsmart.io/blog/instagram-comment-to-dm-automation) and [getkanal](https://getkanal.com/blog/manychat-instagram); labels unverified.)*

1. **manychat.com → Get started → Instagram.** Log in with the Facebook profile that admins the AskHemant Page, and choose **@askhemant**. ManyChat needs a Business or Creator account linked to a Facebook Page.
2. In the Instagram app, confirm **Allow access to messages** is ON (§2.1).
3. **Settings → Billing → Essential**, monthly billing first (switch to annual after 3 months if you keep it).
4. **Settings → General:** time zone **Asia/Kolkata**. Install the **ManyChat mobile app** and turn on notifications for conversations assigned to you.
5. **Settings → Tags:** create `kw_leaks` · `kw_price` · `kw_founding` · `kw_clinic` · `kw_kit` · `src_story` · `src_ahs` · `lane_re` · `lane_cl` · `lane_gen` · `lang_hi` · `answered_q` · `handover` · `call_booked` · `not_fit` · `founding_applicant`.
6. **Settings → Fields → User fields:** `business_type` · `lead_source` · `leads_per_month` · `first_keyword` · `language`.
7. **Turn off the matching Meta Business Suite automation first** (Inbox → Automations → toggle Off), *then* publish the ManyChat one, within the same 5 minutes. Otherwise people get two DMs.
8. **Automations → + New automation → Start from scratch.** Trigger: **Instagram → Post or Reel Comments** → **Any post or reel** (or *Next post*) → **Specific words** → add `leaks`, `leak` (ManyChat's keyword matching is reportedly not case-sensitive; still test the capitalised forms).
9. **Public reply: ON** → paste 3–5 variants from §4 (ManyChat rotates them, which looks less like spam).
10. **Opening DM with one button.** ManyChat's comment flows send one first message with a single content block ([getkanal](https://getkanal.com/blog/manychat-instagram)). Make it a short message plus a button. The tap is a user action, so it opens the 24-hour window for the link and question:
    - **Text:** Hi! Tap below and I'll send the Lead Leak Kit straight away.
    - Button: `Send me the kit`
11. **After the button:** Message 2 = the LEAKS DM (§4.1), then a **User Input / wait for reply** step that saves the answer to `lead_source`, then the branching in §4.1 (quick-reply buttons are optional; free text is fine).
12. **Actions on every path:** add tag `kw_leaks`, set `first_keyword = LEAKS`, and when the person answers: tag `answered_q`, **assign the conversation to Hemant** in Live Chat, and **pause automation for this contact** so you take over by hand.
13. **Publish → test** exactly as §2.7. Then repeat for **PRICE**, **FOUNDING**, **CLINIC**, and a **DM keyword** trigger and a **Story reply** trigger for `LEAKS` (and `KIT`, if you used the fallback).
14. **Ice breakers:** if you set FAQs in ManyChat (*Settings → Instagram* or the Conversation Starters area *(unverified)*), they replace the ones from §2.5: use the same 4.
15. **Logging:** ManyChat's Google Sheets integration and External Request (webhook to n8n) were reported as higher-plan features *(unverified)*. On Essential, add each person who answered to the pipeline Sheet by hand during your daily DM block, or export contacts weekly. Don't pay for Pro just for this.
16. Known issue: a Sep 2026 community thread reports keyword triggers with **0 runs** even on a fresh flow ([ManyChat community](https://community.manychat.com/general-q-a-43/keyword-automation-not-triggering-at-all-instagram-comments-dm-0-runs-even-on-a-fresh-flow-10781)). If that happens: deactivate any older automation on the same keyword, re-test from a non-following account, and reply by hand meanwhile.

**Same rules in ManyChat:** one private reply per comment within 7 days; follow-ups only within 24 hours of the person's reply; no broadcasts or sequences to people who didn't ask; no "follow to DM".

### 3.3 Handover: when the bot stops and Hemant starts

The automation's only jobs are to deliver the promised link and ask one question. **A human takes over the moment the person writes anything.** Specifically, hand over (assign to Hemant, pause automation) when the person:
- answers the question, asks anything, or sends a voice note, photo or link;
- mentions money, a deadline, a complaint, health details or anything personal;
- writes in Hinglish (tag `lang_hi`, reply in Hinglish);
- says "call me", "send details", "interested" or a number.

---

## 4. The keyword flows

### 4.1 LEAKS (the main flow)

**Trigger:** comment `LEAKS` / `Leaks` / `leaks` / `LEAK` / `leak` on any post, or the same word sent as a DM or story reply (or `KIT`, if you used the fallback).

**Public comment replies (rotate; by hand in month 1, automatic in ManyChat):**

| # | EN | HI |
|---|---|---|
| 1 | Sent. Check your message requests if you don't see it. | Bhej diya hai. Na dikhe toh message requests check kijiye. |
| 2 | On its way to your DMs. If you don't follow me yet, it lands in message requests. | DM mein aa gaya hai. Follow nahi kiya hai toh message requests mein milega. |
| 3 | Kit's in your DMs. Try the 10 pm test first. | Kit DM mein hai. Pehle 10 pm test try kijiye. |
| 4 | Done. Tell me where your leads come from and I'll point you to the first fix. | Ho gaya. Batayiye leads kahan se aati hain, pehla fix wahin se dekhte hain. |
| 5 | Sent you the Lead Leak Kit. Message requests, if it's not in your main inbox. | Lead Leak Kit bhej diya hai. Main inbox mein na ho toh message requests dekhiye. |

Never put a link in a public reply (it isn't clickable) and never reply with the price publicly for LEAKS.

**Private DM (automated, exact strategy text):**
- **EN:** Here's your Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=leaks. Quick question so I can point you to the right fix: what do you sell, and where do most of your leads come from (portals, Meta ads, Instagram, referrals)?
- **HI (ManyChat language button, or by hand):** Yeh raha aapka Lead Leak Kit → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=leaks. Ek chhota sa sawaal, taaki sahi fix bata sakoon: aap kya bechte hain, aur zyada leads kahan se aati hain (portals, Meta ads, Instagram, referrals)?

**The follow-up question** is already inside the DM. Its answer tells you the lane, the source and whether to offer a call.

**Branching on the reply** (classify within your 4-hour window; tag the lane):

| They say… | Branch | Tag | Your next message |
|---|---|---|---|
| Property, flats, plots, "broker", "channel partner", + portals or Meta ads | **A. India real estate** | `lane_re` | Personal reply A (below) |
| Dubai, "off-plan", Property Finder, Bayut, Dubizzle, viewings | **B. Dubai real estate** | `lane_re` | Personal reply B |
| Dental, skin, derm, aesthetic, physio, "patients" | **C. Clinic** | `lane_cl` | Personal reply C |
| "I run ads for brokers/clinics", agency | **D. Agency** | `lane_gen` | Personal reply D |
| Any other business (coaching, D2C, CA firm, school…) | **E. Other business** | `lane_gen` | Personal reply E |
| "I want to learn n8n", "I'm starting an agency", student | **F. Learner** | `lane_gen` | Personal reply F (no call) |
| Asks the price | **G. Price** | + `kw_price` | The PRICE DM text (§4.2), then continue as A–E |
| "Send details", "interested", "call me" | **H. Vague interest** | — | Objection reply §7.3 |
| No answer | **I. Silent** | — | Nothing. You've used your one private reply |

**Personal reply scripts** (only after they answer, inside 24 hours; strategy §5):

**A. India real estate** (strategy text; pick the leak that matches their source)
- **EN:** Thanks [Name]. With [source] leads, the first leak I'd check is [after-hours replies / no follow-up after day 2]. Quick test: enquire on one of your own listings tonight at 10 pm and time the reply. If you want, I'll map your whole lead flow on a free 20-min call: askhemant.ai/book. I'll only pitch if it's a fit.
- **HI:** Thanks [Name]. [Source] waali leads mein sabse pehla leak jo main check karta hoon, woh hai [raat ke replies / day 2 ke baad follow-up na hona]. Ek quick test: aaj raat 10 baje apni hi kisi listing par enquiry bhejiye aur reply ka time note kijiye. Chahen toh free 20-min call par poora lead flow map kar dete hain: askhemant.ai/book. Pitch tabhi, jab fit ho.

| Their main source | Leak to name first | Kit page |
|---|---|---|
| 99acres / MagicBricks / Housing.com | "portal leads that never reach WhatsApp" or "after-hours replies" | 3 |
| Meta lead ads | "no qualifying questions, so junk leads eat your calling time" or "after-hours replies" | 3–4, 8 |
| Instagram | "DMs sitting in message requests" | 4 |
| Referrals / WhatsApp | "no follow-up after day 2" or "leads that aren't logged anywhere" | 5–6 |

**B. Dubai real estate**
- **EN:** Thanks [Name]. With [Property Finder / Bayut / Dubizzle] leads, the first thing I'd check is how fast the first WhatsApp reply goes out after 9 pm, and whether anyone follows up after day 2. Quick test: enquire on one of your own listings tonight and time the reply. If you want, I'll map your lead flow on a free 20-min call (evening slots work for the UAE): askhemant.ai/book. I'll only pitch if it's a fit.
- **HI:** Thanks [Name]. [Property Finder / Bayut / Dubizzle] leads mein pehle yeh dekhte hain: raat 9 baje ke baad pehla WhatsApp reply kitni der mein jaata hai, aur day 2 ke baad follow-up hota hai ya nahi. Aaj raat apni ek listing par enquiry bhej kar reply ka time dekhiye. Chahen toh free 20-min call par lead flow map kar dete hain: askhemant.ai/book. Pitch tabhi, jab fit ho.

**C. Clinic**
- **EN:** Thanks [Name]. For clinics the first leak is usually missed calls during procedures and lunch, then no-shows without a reminder. Quick test: count how many calls went unanswered last Tuesday. If you want, I'll map your appointment flow on a free 20-min call: askhemant.ai/book. I'll only pitch if it's a fit.
- **HI:** Thanks [Name]. Clinics mein pehla leak aksar yeh hota hai: procedure ya lunch ke time missed calls, aur phir bina reminder ke no-shows. Quick test: pichhle Tuesday kitni calls unanswered gayin, gin lijiye. Chahen toh free 20-min call par appointment flow map kar dete hain: askhemant.ai/book. Pitch tabhi, jab fit ho.

**D. Agency** (Agency Partner opens from month 2, 16 Nov 2026, at list price −25%)
- **EN:** Thanks [Name]. Makes sense: you bring the leads, and the leak is usually what happens after the form. I'm opening an Agency Partner option from mid-November: any of my systems, built under your brand, at 25% off list. Is there one client of yours where slow replies are hurting results right now?
- **HI:** Thanks [Name]. Samajh gaya: leads aap laate hain, aur leak aksar form ke baad hota hai. Mid-November se Agency Partner option khul raha hai: mere systems aapke brand ke under, list price se 25% kam. Kya aapka koi ek client hai jahan abhi slow replies results kharab kar rahe hain?

**E. Other business**
- **EN:** Thanks [Name]. The kit is written for property and clinic enquiries, but the 10 pm test works for any business that gets leads. My builds focus on real estate and clinics; for anything else, the best start is a 45-min Ask Hemant Session (₹1,999 / $99, 100% credited if we build within 14 days): askhemant.ai/pricing. What's the one task you'd automate first?
- **HI:** Thanks [Name]. Kit property aur clinic enquiries ke liye likha hai, par 10 pm test har business par chalta hai jahan leads aati hain. Mere builds real estate aur clinics par focused hain; baaki businesses ke liye best start hai 45-min Ask Hemant Session (₹1,999, 14 din mein build karein toh poora credit): askhemant.ai/pricing. Aap sabse pehle kaunsa kaam automate karna chahenge?

**F. Learner / builder**
- **EN:** Love that. The kit is aimed at business owners, but the lead-flow ideas still apply. I share my own builds every Wednesday (Build Log). If you ever want 1:1 help on a specific build, that's the 45-min Ask Hemant Session: askhemant.ai/pricing. Good luck with it!
- **HI:** Badhiya! Kit business owners ke liye hai, par lead-flow ke ideas aapke kaam aayenge. Har Wednesday main apne builds share karta hoon (Build Log). Kisi specific build par 1:1 help chahiye ho toh 45-min Ask Hemant Session hai: askhemant.ai/pricing. All the best!

**Human handover:** every branch is a human reply. The automation stops after the first DM (month 1 by design; month 2 by "pause automation", §3.3).

**Tagging:** label `kw-LEAKS` + lane + `replied` in the inbox; add a row to the Leads tab (§9).

### 4.2 PRICE

**Trigger:** comment `PRICE` / `Price` / `price` / `PRICES` / `prices` (P02; and anyone who asks "price?" anywhere).

**Public replies:**

| # | EN | HI |
|---|---|---|
| 1 | Sent you the full price list. Check your message requests. | Poori price list bhej di hai. Message requests check kijiye. |
| 2 | Every price is published. It's in your DMs now. | Saare prices published hain. Abhi DM mein hain. |
| 3 | In your DMs. Running costs are explained too. | DM mein hai. Running costs bhi samjhaye hain. |
| 4 | Done. Prices exclude GST; the list is in your message requests. | Ho gaya. Prices GST ke bina hain; list message requests mein hai. |

**Private DM (exact strategy text):**
- **EN:** My full price list → askhemant.ai/pricing. What's the one thing you'd automate first?
- **HI:** Meri poori price list → askhemant.ai/pricing. Sabse pehle aap kya automate karna chahenge?

**Branching on the reply:**

| They say… | Next message (EN) | HI |
|---|---|---|
| A clear task ("reply to portal leads", "follow-ups") | Good one to start with. That's the core of the Speed-to-Lead Sprint (₹34,999 / $1,499, live in 10 working days after access). Where do those leads come from today, and roughly how many a month? | Achha starting point hai. Yahi Speed-to-Lead Sprint ka core hai (₹34,999, access ke baad 10 working days mein live). Abhi yeh leads kahan se aati hain, aur mahine mein lagbhag kitni? |
| "Too expensive" | Objection reply §7.1 | §7.1 |
| "Meta's AI is free" | §7.2 | §7.2 |
| Gives source + volume (≥ about 20 leads a month) | Thanks. At [volume] a month from [source], the first leak I'd check is [after-hours replies / no follow-up after day 2]. Want me to map it on a free 20-min call? askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=price. I'll only pitch if it's a fit. | Thanks. [Source] se mahine ki [volume] leads mein pehle [raat ke replies / day 2 ke baad follow-up] check karte hain. Free 20-min call par map kar dein? askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=price. Pitch tabhi, jab fit ho. |
| Under 20 leads a month, or a budget under ₹15K | `/notfit` (§8) | `/notfit` HI |

**Handover/tagging:** human from the first reply; tag `kw-PRICE` + lane.

### 4.3 FOUNDING (P06, T03; until Mon 30 Nov 2026)

**Trigger:** comment `FOUNDING` / `Founding` / `founding`.

**Public replies:**

| # | EN | HI |
|---|---|---|
| 1 | Sent you the details. Check your message requests. | Details bhej di hain. Message requests check kijiye. |
| 2 | In your DMs: what you get and what I ask in return. | DM mein hai: aapko kya milega aur badle mein main kya maangta hoon. |
| 3 | Sent. It closes Mon 30 Nov or when the 3 slots are taken. | Bhej diya. Mon 30 Nov ya 3 slots bharte hi band. |

Only say "X slots left" publicly if it's true at that moment (check `foundingSlotsLeft` in [`website/assets/js/config.js`](../website/assets/js/config.js)).

**Private DM (exact text from [`01-profile-setup.md`](./01-profile-setup.md) §3):**
- **EN:** Here are the founding-client details → askhemant.ai/founding?utm_source=ig&utm_medium=dm&utm_campaign=founding. 3 slots at ₹14,999 / $599 (prices exclude GST), closing Mon 30 Nov 2026 or when full. To check the fit: what do you sell, and roughly how many enquiries do you get a month?
- **HI:** Founding-client ki details yahan hain → askhemant.ai/founding?utm_source=ig&utm_medium=dm&utm_campaign=founding. 3 slots, ₹14,999 / $599 (GST alag), Mon 30 Nov 2026 tak ya slots bharne tak. Fit check karne ke liye: aap kya bechte hain, aur mahine mein lagbhag kitni enquiries aati hain?

**Branching on the reply** (criteria in [`sales/10-founding-client-program.md`](../sales/10-founding-client-program.md)):

| They are… | Next message (EN) | HI |
|---|---|---|
| In niche (broker/channel partner/Dubai broker/clinic), about 40–500 enquiries a month, 2+ sources | That sounds like a strong fit. Next step is a free 20-min Fit Call so we both check it properly: askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=founding. Write "founding" in the "task to fix first" box. If it fits on both sides, I'll send the written terms within 24 hours. | Yeh strong fit lag raha hai. Agla step free 20-min Fit Call hai, taaki dono taraf se theek se check ho: askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=founding. "Task to fix first" box mein "founding" likh dijiye. Dono taraf fit hua toh 24 ghante mein written terms bhej dunga. |
| In niche but under about 20 enquiries a month | Thanks for the honesty. Under about 20 enquiries a month there's too little data to measure a before/after, so the founding slot wouldn't be fair on you. The free kit fixes the basics without new software: askhemant.ai/kit. When volume grows, message me. | Honest jawab ke liye thanks. Mahine mein 20 se kam enquiries par before/after measure karne layak data nahi banta, toh founding slot aapke saath fair nahi hoga. Free kit bina naye software ke basics theek kar deta hai: askhemant.ai/kit. Volume badhe toh message kijiye. |
| Out of niche | Personal reply E (§4.1) | E |
| "Can I get this price without being published?" | Fair question. The price is low *because* of the published, measured results, so I can't separate them. Anonymised is the default, though: your name is only shown if you say yes in writing. Full price, with no publication, is ₹34,999 / $1,499 for the Sprint. | Sahi sawaal. Price kam isi liye hai kyunki results measure karke publish hote hain, toh dono alag nahi ho sakte. Haan, default anonymised hai: aapka naam tabhi dikhega jab aap likh kar haan kahein. Bina publication ke full price Sprint ₹34,999 hai. |

**After close:** switch the DM to the closed text in §2.3; public reply: "The founding program has closed. Full prices are in your DMs." / "Founding program band ho gaya hai. Full prices DM mein hain."

**Tagging:** `kw-FOUNDING` + `founding-applicant` once they book; Leads tab `keyword = FOUNDING`.

### 4.4 CLINIC (month 2, from 16 Nov 2026)

The clinic magnet (*The Missed-Call Recovery Playbook*, strategy §7) isn't written yet. Until it is, the CLINIC DM sends the Lead Leak Kit, which already has clinic lines (missed-call first reply, reminders, no-show rescue). **When the playbook is published, change only the link.**

**Trigger:** comment `CLINIC` / `Clinic` / `clinic` / `CLINICS` / `clinics` (5 keywords). New automation in Business Suite (or ManyChat), same steps as §2.2.

**Public replies:**

| # | EN | HI |
|---|---|---|
| 1 | Sent. Check your message requests. | Bhej diya hai. Message requests check kijiye. |
| 2 | In your DMs: the missed-call text-back and reminder templates. | DM mein hai: missed-call text-back aur reminder templates. |
| 3 | Done. Start with the missed-call count test. | Ho gaya. Pehle missed calls gin kar dekhiye. |

**Private DM:**
- **EN:** Here's the clinic version of my kit, with the missed-call text-back and reminder templates → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=clinic. Quick question so I can point you to the right fix: what kind of clinic do you run, and roughly how many calls do you miss in a busy week?
- **HI:** Yeh raha mere kit ka clinic version, missed-call text-back aur reminder templates ke saath → askhemant.ai/kit?utm_source=ig&utm_medium=dm&utm_campaign=clinic. Ek chhota sa sawaal: aapka clinic kis type ka hai, aur busy hafte mein lagbhag kitni calls miss hoti hain?

**Branching:**

| They say… | Next message |
|---|---|
| A clinic + a number of missed calls | Personal reply C (§4.1), mentioning their number: "At [N] missed calls a week, the text-back is the first fix." |
| No-shows are the problem | **EN:** Thanks. No-shows usually drop when there's a reminder 24 hours and 2 hours before, with a one-tap reschedule. Planet DDS reported a 6.9% average dental no-show rate in 2025 (US practices), so it's worth measuring yours. Want me to map your appointment flow on a free 20-min call? askhemant.ai/book<br>**HI:** Thanks. No-shows aksar tab kam hote hain jab 24 ghante aur 2 ghante pehle reminder jaaye, aur ek tap mein reschedule ho sake. Planet DDS ke hisaab se 2025 mein dental no-show rate average 6.9% tha (US practices), toh apna rate measure karna kaam ka hai. Free 20-min call par appointment flow map karein? askhemant.ai/book |
| Wants AI to answer medical questions | **EN:** I don't build that: medical questions always go to your team. The system handles booking, reminders and missed calls, and hands everything else to a person.<br>**HI:** Yeh main nahi banata: medical sawaal hamesha aapki team ke paas jaate hain. System booking, reminders aur missed calls sambhalta hai; baaki sab ek insaan ko handover. |

Source for the no-show figure: [DOCS Education / Planet DDS](https://www.docseducation.com/node/53377) (strategy §2). Never present it as Hemant's result.

---

## 5. Stories, story replies and "Ask Hemant Sunday"

### 5.1 Story replies (any day)

A story reply is a DM the person chose to send, so the 24-hour window is open. Reply personally within 4 working hours. Pitch nothing on the first reply unless they ask; give one useful thing.

| Story type | Typical reply | Your answer (EN) | HI |
|---|---|---|---|
| Poll ("How fast do you reply after 9 pm?") | "Next morning, honestly" | Honest answer, thank you. That's the most common one. The 10 pm test in the kit shows what that costs you: want the link? | Honest jawab, thanks. Sabse common yahi hai. Kit ka 10 pm test dikhata hai iska kitna nuksaan hota hai: link bhejoon? |
| Question box ("What would you automate first?") | A task | Good one. [One concrete idea for that task]. If you want, I'll go deeper on a free 20-min call: askhemant.ai/book | Achha sawaal. [Us task ke liye ek concrete idea]. Chahen toh free 20-min call par detail mein dekhte hain: askhemant.ai/book |
| Behind the scenes / Build Log | "How did you do this?" | Comment → Meta auto-DM → Tally form → n8n → Google Sheet → WhatsApp. I'm building it in public every Wednesday. What are you trying to connect? | Comment → Meta auto-DM → Tally form → n8n → Google Sheet → WhatsApp. Har Wednesday public mein bana raha hoon. Aap kya connect karna chahte hain? |
| "DM me LEAKS" | `LEAKS` | The DM keyword automation (§2.4) or `/kit` | `/kit` HI |
| Story mention (they tagged @askhemant) | — | Thank you for the mention, [Name]! That made my day. | Mention ke liye bahut thanks, [Name]! |

**Never DM poll voters, question-box viewers or story viewers who didn't write to you.**

### 5.2 Ask Hemant Sunday (question box, Sun 10:00–19:00 IST)

The Stories mechanics live in [`05-stories-broadcast-collabs.md`](./05-stories-broadcast-collabs.md) §2. How to handle what comes in:

1. **Answer 5–10 questions publicly** on Stories by sharing the response with your answer on top. Before sharing, **check the screen doesn't show who asked**, and don't share any response that names a business, a person, a phone number or a health detail; paraphrase it instead.
2. **Don't answer publicly:** price negotiations, anything about a specific named business, medical or legal questions (say you'll answer the general version), anything personal.
3. **Private follow-up (optional, by hand, the next day as in [`05-stories-broadcast-collabs.md`](./05-stories-broadcast-collabs.md) §2.1):** if a question clearly needs a private answer or describes the asker's own business problem, send **one** private message. Whether a question-sticker answer opens Meta's 24-hour window isn't confirmed, and you're typing it by hand anyway, so keep it to one helpful message with no link unless they ask:
   - **EN:** Hi [Name], thanks for your question on Ask Hemant Sunday. I answered the general version on Stories; if you want, tell me a bit more about your setup and I'll give you a specific suggestion.
   - **HI:** Hi [Name], Ask Hemant Sunday par sawaal ke liye thanks. General jawab Stories par diya hai; chahen toh apne setup ke baare mein thoda aur batayiye, specific suggestion de dunga.
   If they reply, the 24-hour window is open and §6 applies. If they don't, stop.
4. **Save the best questions** (anonymised) in the Content tab as future hooks; tag `AHS`.
5. **No Ask Hemant Sunday on Sun 8 Nov** (Diwali), per [`03-content-calendar-30-days.md`](./03-content-calendar-30-days.md).

### 5.3 Broadcast channel (month 2, at about 300 followers)

Opt-in by joining; one post a week; never DM people to "join my channel". Channel posts can point to keyword posts ("Comment LEAKS on today's Reel") but the DMs still follow §1.

---

## 6. DM-to-call conversion scripts

### 6.1 The ladder

1. **They answer the question** → personal reply with **one concrete idea + one test** (§4.1 A–F).
2. **They engage with the idea** (ran the test, asked a follow-up) → **offer the Fit Call**.
3. **They book** → thank, set expectations, confirm.
4. **They don't fit** → kit + Session, kindly.
5. **"Not now"** → ask permission to check back; then stop.

### 6.2 Scripts

**Offer the call (after a real exchange)**
- **EN:** Sounds like the [leak] is costing you more than the rest combined. Want me to map your whole lead flow and tell you honestly what I'd fix first? It's a free 20-min Fit Call: askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=[keyword]. I'll only pitch if it's a fit.
- **HI:** Lagta hai [leak] baaki sab se zyada nuksaan kar raha hai. Chahen toh poora lead flow map karke seedha batata hoon pehle kya fix karna chahiye? Free 20-min Fit Call: askhemant.ai/book?utm_source=ig&utm_medium=dm&utm_campaign=[keyword]. Pitch tabhi, jab fit ho.

**"What happens on the call?"**
- **EN:** 20 minutes on Google Meet. You tell me where leads come from and what happens after they arrive; I name the 1–2 biggest leaks and tell you honestly whether I can help. If it's a fit, I'll suggest the next step and its price. If it isn't, you leave with the free fixes.
- **HI:** Google Meet par 20 minute. Aap batayiye leads kahan se aati hain aur aane ke baad kya hota hai; main 1–2 sabse bade leaks naam se bataunga, aur seedha bataunga ki main help kar sakta hoon ya nahi. Fit hua toh agla step aur uska price; fit nahi hua toh free fixes ke saath.

**They booked**
- **EN:** Booked, thank you [Name]. The 7 questions on the form help me come prepared, so the call is about you, not about me. I'll send a WhatsApp reminder 2 hours before. See you on [day].
- **HI:** Booking ho gayi, thanks [Name]. Form ke 7 sawaal se main tayyari ke saath aaunga, taaki call aapke baare mein ho. 2 ghante pehle WhatsApp reminder aayega. [Day] ko milte hain.

**Doesn't fit (under ₹15K, under about 20 leads a month, or out of niche)** → `/notfit` (§8).

**"Not now"** → §7.4.

**UTM per source:** `utm_source=ig&utm_medium=dm&utm_campaign=` `leaks` · `price` · `founding` · `clinic` · `story` · `ahs` · `faq`. They let GA4 and the Leads tab show which keyword produced each booking.

---

## 7. Objection replies

Reply once, warmly, with a fact, then hand the decision back. Never argue twice.

### 7.1 Price ("too expensive", "thoda kam karo", "budget nahi hai")
- **EN:** Fair. Two honest options: the free kit fixes the basics with tools you already have (askhemant.ai/kit), and the Lead Leak Audit (₹9,999 / $499) shows exactly what's leaking before you spend more, with the full fee credited if you build within 30 days. I don't discount the build itself, because the price is the same for everyone and published. If one recovered deal covers it, it's worth a look; if not, the kit is the right step for now.
- **HI:** Bilkul samajh sakta hoon. Do honest options: free kit aapke paas jo tools hain unhi se basics theek kar deta hai (askhemant.ai/kit), aur Lead Leak Audit (₹9,999) zyada kharch karne se pehle dikha deta hai ki exactly kya leak ho raha hai; 30 din mein build karein toh poori fees credit. Build par discount nahi deta, kyunki price sab ke liye same hai aur published hai. Agar ek deal bachne se cost nikal aati hai toh dekhne layak hai; nahi toh abhi kit hi sahi step hai.
- *If they're eligible and slots are open (before Mon 30 Nov):* add "There's also a founding price, ₹14,999 / $599, for 3 businesses that agree to measured, published results: askhemant.ai/founding." / "3 businesses ke liye founding price bhi hai, ₹14,999, measured aur published results ke badle: askhemant.ai/founding."

### 7.2 "Meta's WhatsApp AI is free now. Why pay you?"
- **EN:** Fair question. Meta's free WhatsApp AI is great for FAQs, and if that's all you need, use it. What it doesn't do is pull in your portal and Meta-form leads, ask your qualifying questions, alert the right agent, book the visit on your calendar and follow up on day 7. That's the part I build, on your own accounts.
- **HI:** Sahi sawaal. Meta ka free WhatsApp AI FAQs ke liye badhiya hai, aur agar sirf itna chahiye toh wahi use kijiye. Woh aapki portal aur Meta-form leads ko andar nahi laata, aapke qualifying sawaal nahi poochta, sahi agent ko alert nahi karta, calendar par visit book nahi karta, aur day 7 par follow-up nahi karta. Woh hissa main banata hoon, aapke apne accounts par.
- (The EN line is the objection reply in [`docs/01-brand-and-domain.md`](../docs/01-brand-and-domain.md) §8. Before quoting features, check Meta's current Business AI capabilities; they change.)

### 7.3 "Send details" / "Interested" / "Share info"
- **EN:** Happy to. Everything is published here: askhemant.ai/pricing (what's included, what isn't, running costs). So I send you the *right* details: what do you sell, and where do most of your leads come from?
- **HI:** Zaroor. Saari details yahan published hain: askhemant.ai/pricing (kya included hai, kya nahi, running costs). Sahi details bhejne ke liye bas itna batayiye: aap kya bechte hain, aur zyada leads kahan se aati hain?

### 7.4 "Later" / "After Diwali" / "Abhi busy hoon"
- **EN:** Totally fine. Want me to check back after [date they named / Diwali]? If yes, I'll send one message then, and that's it. Meanwhile the 10 pm test in the kit takes 5 minutes.
- **HI:** Bilkul theek hai. [Unki date / Diwali] ke baad ek baar check karoon? Haan kahein toh us din sirf ek message bhejunga, bas. Tab tak kit ka 10 pm test 5 minute ka hai.
- If they say yes, note "next: [date]" in the row's `notes`. On that day, one message:
  - **EN:** Hi [Name], checking back as promised. Still want to look at your lead flow? Free 20-min call: askhemant.ai/book. No worries if not.
  - **HI:** Hi [Name], jaisa kaha tha, check kar raha hoon. Lead flow dekhna hai abhi? Free 20-min call: askhemant.ai/book. Nahi toh koi baat nahi.

### 7.5 Other common ones

| Objection | EN | HI |
|---|---|---|
| "Is this a bot?" | The first message was automatic (it sends the kit); this one is me, Hemant. | Pehla message automatic tha (kit bhejne ke liye); yeh main hoon, Hemant. |
| "Do you guarantee more deals / replies within a minute?" | No, and be wary of anyone who does. "Within a minute" is what the system is designed for, measured from when a lead reaches it. I guarantee the scope, the 10-working-day timeline (or your first month of Care is free) and the bug-fix warranty. | Nahi, aur jo guarantee de unse savdhaan rahiye. "Within a minute" system ka design target hai, lead system tak pahunchne ke time se. Guarantee scope, 10 working days ki timeline (warna pehla mahina Care free) aur bug-fix warranty ki hai. |
| "Will it work with 99acres / MagicBricks?" | Where the portal sends an alert email or allows an export, yes; I confirm each source before quoting. If a portal can't be connected, I tell you upfront. | Jahan portal alert email bhejta hai ya export allow karta hai, haan; quote se pehle har source confirm karta hoon. Koi portal connect nahi ho sakta toh pehle hi bata dunga. |
| "We already have a CRM" | Great, I build into it if it has an API (Zoho, HubSpot and most others). The CRM stores leads; the system makes sure each one gets a reply and a follow-up. | Badhiya, agar uska API hai (Zoho, HubSpot, aur zyadatar) toh usi mein build karte hain. CRM leads store karta hai; system ensure karta hai ki har lead ko reply aur follow-up mile. |
| "Is my data safe?" | It stays on your accounts: your WhatsApp provider, your Sheet or CRM. I work as your data processor under a written clause and remove my access at the end. | Data aapke hi accounts par rehta hai: aapka WhatsApp provider, aapki Sheet ya CRM. Main written clause ke under data processor ki tarah kaam karta hoon, aur end mein apna access hata deta hoon. |
| "Can you run our ads too?" | No, I don't run ads. I make sure the leads you already pay for don't leak. | Nahi, ads main nahi chalata. Jo leads ke liye aap pehle se pay karte hain, woh leak na hon, yeh main dekhta hoon. |

---

## 8. Saved replies (Instagram) and WhatsApp quick replies

Add these as Instagram **saved replies** (shortcut → text). The WhatsApp Business app uses the same shortcuts with `/` ([`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §8).

| Shortcut | EN | HI |
|---|---|---|
| `kit` | Here's the free Lead Leak Kit: askhemant.ai/kit. What do you sell, and where do most of your leads come from? | Free Lead Leak Kit yeh raha: askhemant.ai/kit. Aap kya bechte hain, aur zyada leads kahan se aati hain? |
| `price` | My full price list, all prices published: askhemant.ai/pricing (prices exclude GST). What's the one thing you'd automate first? | Poori price list, saare prices published: askhemant.ai/pricing (GST alag). Sabse pehle aap kya automate karna chahenge? |
| `book` | Happy to map your lead flow on a free 20-min Fit Call: askhemant.ai/book. I'll only pitch if it's a fit. | Free 20-min Fit Call par aapka lead flow map kar dete hain: askhemant.ai/book. Pitch tabhi, jab fit ho. |
| `founding` | Founding details: askhemant.ai/founding. 3 slots at ₹14,999 / $599 (prices exclude GST), closing Mon 30 Nov 2026 or when full. What do you sell, and roughly how many enquiries a month? | Founding details: askhemant.ai/founding. 3 slots, ₹14,999 / $599 (GST alag), Mon 30 Nov 2026 tak ya slots bharne tak. Aap kya bechte hain, aur mahine mein kitni enquiries? |
| `session` | The Ask Hemant Session is 45 minutes on any AI or automation question, with the recording and a written action list within 24 hours: ₹1,999 → {{RAZORPAY_SESSION_LINK}} · outside India $99 → {{PAYPAL_SESSION_LINK}}. 100% credited to an Audit or build booked within 14 days. | Ask Hemant Session: kisi bhi AI ya automation sawaal par 45 minute, recording aur 24 ghante mein written action list: ₹1,999 → {{RAZORPAY_SESSION_LINK}} · India ke bahar $99 → {{PAYPAL_SESSION_LINK}}. 14 din mein Audit ya build book karein toh poora credit. |
| `notfit` | Thanks for the detail. Honestly, a full system isn't the right fit yet. The free kit covers the quick fixes (askhemant.ai/kit), and if you'd like an hour of focused help, the Ask Hemant Session is ₹1,999 / $99: askhemant.ai/pricing. | Details ke liye thanks. Seedhi baat: abhi full system sahi fit nahi hai. Free kit quick fixes cover karta hai (askhemant.ai/kit), aur focused help chahiye toh Ask Hemant Session ₹1,999 ka hai: askhemant.ai/pricing. |
| `meta` | §7.2 EN | §7.2 HI |
| `details` | §7.3 EN | §7.3 HI |
| `later` | §7.4 EN | §7.4 HI |
| `requests` | If you don't follow me yet, my DM lands in your message requests. Check there. | Agar aap mujhe follow nahi karte, toh mera DM message requests mein milega. Wahan check kijiye. |
| `timeline` | Live in 10 working days after access is granted (the clock starts when the access checklist is done). Day 5 you see a demo; day 10 it goes live. If I miss it, your first month of Lead Desk Care is free. | Access milne ke baad 10 working days mein live (checklist poori hone par clock shuru). Day 5 demo, day 10 live. Late hua toh pehla mahina Lead Desk Care free. |
| `breaks` | Every build has a 14-day bug-fix warranty (30 days on the Team system). After that, Lead Desk Care (₹9,999/mo / $299/mo) covers monitoring and fixes within 1 working day. | Har build ke saath 14 din ki bug-fix warranty (Team system par 30 din). Uske baad Lead Desk Care (₹9,999/mahina) monitoring aur 1 working day mein fixes cover karta hai. |
| `privacy` | Your data stays on your own accounts. I act as your data processor under a written clause and remove my access when we finish. Privacy notice: askhemant.ai/privacy | Data aapke apne accounts par rehta hai. Main written clause ke under data processor hoon, aur kaam khatam hone par access hata deta hoon. Privacy notice: askhemant.ai/privacy |
| `agency` | From mid-November: any of my systems, built under your agency's brand, at list price −25%. You own the client. Email hello@askhemant.ai to talk it through. | Mid-November se: mere systems aapki agency ke brand ke under, list price se 25% kam. Client aapka. Baat karne ke liye hello@askhemant.ai par email kijiye. |

---

## 9. Tracking

**Pipeline Sheet → the leads tab** ([`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §20 calls it "Leads"; the n8n workflows in [`automations/`](../automations/) write to a tab named `Pipeline`, so use whatever [`automations/README.md`](../automations/README.md) says). The workflows use these headers, so type DM rows into the same columns: `date` · `source` (the UTM source, `ig`) · `keyword` · `lane` · `business_type` · `stage` (New → Replied → Call booked → Showed → Proposal → Won/Lost) · `value` · `lead_id` · `first_name` · `whatsapp` (only if they gave it) · `notes` (put "next: [date]" here for agreed check-backs). Leave the automation columns (`lead_received_at`, `first_reply_sent_at`, booking fields…) empty.

- Add a row when a person **answers** the DM question (stage "Replied"). Commenters who never answer stay as a count only.
- **Qualified conversation** (the KPI): a business owner or decision-maker **in the niche** (broker, channel partner, Dubai broker, clinic, or an agency with such clients) who answered and described a real lead-handling problem.

**Weekly numbers for the Sunday scorecard** ([`docs/00-strategy.md`](../docs/00-strategy.md) §9):

| Metric | Planning rate *(estimate)* | Where from |
|---|---|---|
| Keyword comments, by keyword | — | Count on each post |
| Commenters who answer the DM question | 35% | Leads tab rows ÷ comments |
| Answered → call booked | 15% (a vendor claims 15–22%; unverified) | Leads tab stage |
| Your median personal reply time | target ≤ 4 working hours | Note the times on 10 replies a week |
| DM test pass rate | 100% | §2.7 log |

Replace the planning rates with your real ones after the day-28 review.

---

## 10. Launch timeline

| When | Do |
|---|---|
| **Mon 19 Oct, before 15:00 IST** | LEAKS automation live and tested (§2.2, §2.7). Away message on. Saved replies `kit`, `price`, `book`, `requests`, `notfit` added |
| **Tue 20 Oct, before 15:00** | PRICE live and tested |
| **Thu 22 Oct** | LEAKS DM keyword, or the KIT fallback (§2.4) and the 4 FAQs (§2.5). All saved replies in §8. Labels created |
| **Mon 26 Oct, before 15:00** | FOUNDING live and tested |
| **Daily** | DM block inside the 40-minute engagement slot: Requests folder → keyword replies → personal replies → Sheet rows |
| **Sun 15 Nov (day 28)** | Decide: stay native / ManyChat Essential / n8n (§3.1) |
| **Month 2 (from 16 Nov)** | CLINIC automation when the clinic magnet is ready (§4.4). Agency replies point to the partner offer |
| **Mon 30 Nov, 23:59 IST** (or when the 3rd slot is signed) | Switch FOUNDING to the closed text (§2.3); hide the founding catalogue item; update `foundingSlotsLeft` |

---

## Sources

**Meta (first-party)**
- [Meta: Instagram private replies](https://developers.facebook.com/docs/instagram-platform/private-replies/) · [Meta: private replies (business messaging docs)](https://developers.facebook.com/documentation/business-messaging/instagram-messaging/features/private-replies)
- [Meta: Messenger Platform and IG Messaging API policy overview](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview) (24-hour window, Human Agent tag)
- [Meta: Instagram ice breakers](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api/ice-breakers) (max 4 questions)
- [Meta developer community: non-follower DM restrictions](https://developers.secure.facebook.com/community/threads/805868338192432) (unconfirmed)

**Third-party guides (checked 18 Oct 2026; menu names unverified)**
- [getkanal: Instagram automatic messages](https://getkanal.com/blog/instagram-automatic-messages) · [getkanal: ManyChat for Instagram](https://getkanal.com/blog/manychat-instagram)
- [CreatorFlow: Instagram built-in automation](https://creatorflow.so/blog/instagram-built-in-automation/) (limits, FAQ to Requests, Business Agent pauses automations)
- [Omnichat: Instagram automation](https://blog.omnichat.ai/instagram-automation/)
- [SetSmart: comment-to-DM automation](https://setsmart.io/blog/instagram-comment-to-dm-automation)
- [LiveDune: ice breakers](https://wiki.livedune.com/en/articles/9707475-icebreakers-introductory-messages)
- [Inro: 24-hour messaging window](https://www.inro.social/glossary/24-hour-messaging-window)
- [ManyChat: pricing explained](https://manychat.com/blog/manychat-pricing-explained/) · [ManyChat community: keyword trigger with 0 runs](https://community.manychat.com/general-q-a-43/keyword-automation-not-triggering-at-all-instagram-comments-dm-0-runs-even-on-a-fresh-flow-10781)

**Statistics quoted**
- [DOCS Education / Planet DDS: 6.9% dental no-show rate, 2025](https://www.docseducation.com/node/53377)
- Planning conversion rates: [`docs/00-strategy.md`](../docs/00-strategy.md) §9 (estimates)
