# Instagram Growth Playbook for an AI Automation Consultant (late 2025 to 2026)

Prepared for: Hemant Kumar (they/them), solo AI automation consultant
Research date: 2026-10-18
Scope: Growing a B2B / service-business Instagram account from zero and turning followers into booked consultations.

> **How to read this.** Most current detail on Instagram comes from third-party marketing blogs. Only a few points come from first-party sources: Meta developer docs, Instagram's own statements as reported by TechCrunch and Social Media Today, and Buffer's large-sample studies. Each point is labelled **[Confirmed]** (primary or multiple reliable sources), **[Reported]** (secondary sources that broadly agree) or **[Unverified/Estimate]**. Check prices and limits in-app or on the vendor's pricing page before committing money.

---

## 0. TL;DR: the 10 rules for Hemant's account

1. **Optimise for watch time and sends (DM shares).** Instagram's head, Adam Mosseri, named watch time, likes and sends as the top three ranking signals. Sends matter most for reaching non-followers. [Confirmed]
2. **Reels for reach, carousels for trust and saves.** Reels got 36% more reach than carousels in Buffer's 4M-post study. Carousels got 12% more engagement. [Confirmed, Buffer]
3. **Post 3 to 5 feed posts a week.** Buffer's 2M-post study calls this the sustainable sweet spot. More posting helps, but with diminishing returns. [Confirmed, Buffer]
4. **Make only original content.** Since April 2026, Instagram withholds recommendations from accounts that repost unoriginal content they didn't enhance. [Reported, Tubefilter]
5. **Put keywords in the name field, bio, captions, on-screen text and alt text.** Public professional-account posts have been indexable by Google since July 2025. [Reported, multiple]
6. **Use 3 to 5 specific hashtags at most.** Instagram capped hashtags at 5 per post in December 2025. Mosseri says hashtags help search, not distribution. [Reported, multiple]
7. **Use trial reels** to test hooks and topics on non-followers without hurting the grid. [Confirmed, TechCrunch]
8. **Every post ends in a comment keyword** (e.g. "Comment AUDIT"). That keyword triggers an auto-DM, which leads to a human conversation and then a booking link. Stay inside Meta's private-reply rules: one reply per comment, sent within 7 days, with follow-ups only inside the 24-hour window after the user replies. [Confirmed, Meta docs]
9. **Start with a Creator account**, and switch to Business only if a specific tool needs it. Skip Meta Verified at launch. [Recommendation]
10. **Treat Hemant's own Instagram automation as the first case study.** Build the comment-to-DM funnel in n8n, or document the ManyChat setup, and show it publicly. [Recommendation]

---

## 1. How the algorithm ranks content (2025 to 2026)

| Signal | What Instagram has said | Implication for Hemant |
|---|---|---|
| **Watch time** | Mosseri (Jan 2025) called it the most important signal for both connected and unconnected reach. It counts both the share of the video watched and the absolute seconds watched. [Confirmed/Reported: Social Media Today, Social Samosa, MeetEdgar] | Hook in the first 1 to 3 seconds. Keep explainers tight. Loops and replays help. |
| **Sends per reach (DM shares)** | "Sends are a little bit more important than likes for unconnected content." Earlier in 2024 he said send rates already outweighed likes and comments. [Reported] | Make "send this to your ops/finance person" content: checklists, tool comparisons, "this saves 10 hrs/week" demos. |
| **Likes per reach** | Slightly more important than sends for content shown to existing followers. [Reported] | Matters once there is a follower base. |
| **Saves, comments** | Feed some models but are not among the top three Mosseri highlighted. [Reported] | Carousels and frameworks drive saves. Comment keywords drive the funnel. |
| **Originality** | Since April 2026, aggregators lose recommendations while followers still see their posts. The rule has been extended from Reels to photos and carousels. An earlier rule set a threshold of more than 10 reposts in 30 days. [Reported: Tubefilter, House of Marketers] | Don't repost AI-news clips from others without adding analysis. Use original screen recordings and talking-head video. |
| **User-controlled topics ("Your Algorithm")** | Users can now see and edit the Reels topics Instagram thinks they like. It launched in the US and is expanding to Explore and search. [Reported: Search Engine Land] | Stay in a tight topic lane: "AI automation for small business". Clear topical identity matters more when users curate topics. |

Feed, Stories, Reels and Explore each use their own ranking system. Explore leans on early engagement velocity. [Reported: Hootsuite, eClincher]

The metrics to watch in Insights are **average watch time, sends per reach and likes per reach**. These are the three metrics Mosseri pointed creators to. [Reported]

---

## 2. Formats and their jobs

| Format | Primary job | Evidence | How Hemant should use it |
|---|---|---|---|
| **Reels** | Discovery and reach to non-followers | Reels got 36% more reach than carousels and 125% more than single images (Buffer, 4M+ posts). For accounts under 50K followers, Reels bring more impressions (Socialinsider). | Screen-recorded automation demos, "before/after" workflows, talking-head myth-busting. |
| **Trial reels** | Risk-free A/B testing on non-followers | Launched globally on 10 Dec 2024 for professional accounts. Shown only to non-followers, with metrics after 24 hours. You can then share the reel to your profile or archive it (TechCrunch). Some blogs say it can auto-share after 72 hours if it performs. Mosseri reportedly said trials usually get *less* reach than normal reels. Eligibility thresholds such as 1,000 followers and roughly 20 trials a day are **unverified**. | Test two to three hook variants of the same demo. Promote the winner. |
| **Carousels** | Saves, authority, depth | Highest engagement rate: 0.55% vs Reels 0.50% and images 0.45% (Socialinsider 2025). 12% more engagement than Reels (Buffer). | Frameworks, "7 automations every clinic needs", tool stacks, mini case studies, pricing explainers. |
| **Stories** | Warming followers, social proof, direct CTAs | Link stickers are available to all professional accounts. Polls and question stickers are low-effort interactions. No reliable 2025 to 2026 data on frame count. | Daily behind-the-scenes, polls ("Which task eats your week?"), Q&A, link sticker to the booking page. |
| **Broadcast channels** | One-to-many retention (like a newsletter in DMs) | Open to professional accounts in most regions. Older guides say creator accounts only; a 2026 guide says Creator or Business. Grows only through promotion (bio, Story sticker, collaborators). | Weekly "AI tool of the week" plus one booking slot announcement. Start once there are 300 to 500 or more followers (estimate). |
| **Collab posts** | Borrowed audience | Up to 5 collaborators, 6 accounts in total. Each invitee must accept. Works for feed posts, carousels and Reels. Most sources say Stories are excluded. | Co-create with complementary service providers, and with clients once they agree. |

**Reel specs.** Reels can be up to 3 minutes since January 2025. Profile grid thumbnails changed from square to a vertical crop around then. One vendor guide gives the crop as 3:4, about 1080×1440; this figure is unverified. [Reported: Storyboard18, Planoly, socialk.it]
- Design covers at 1080×1920 and keep the title text in the center 3:4 safe zone.

---

## 3. Reel length and hook rules

**Length.** No primary Instagram data exists; these are blog consensus figures, so treat them as directional:
- 7 to 15 seconds for entertainment.
- **15 to 30 seconds (up to about 45 seconds) for educational and business content aimed at new viewers.**
- Over 90 seconds works mainly for warm audiences. [Reported: Klap, Opus, go-viral]
- Let the content set the length: each second must earn its place, because completion rate and watch time both count.

**Hook rules** (practitioner consensus):
1. Viewers decide in the first 1.5 to 3 seconds. Put the payoff or the tension first, not "Hi, I'm Hemant."
2. Make it work with the sound off. Use burned-in on-screen text that states the promise ("This bot answers 80% of your WhatsApp leads"). Only cite a result like that if it is real.
3. Use a pattern interrupt: start mid-action with the automation already running, or open with a surprising number from Hemant's own demo.
4. One idea per Reel. End on a comment-keyword CTA: "Comment FLOW and I'll DM you the template."
5. Speak the keywords out loud and put them in on-screen text. Captions and spoken words feed search (see section 6).

**High-performing B2B angles for an AI consultant** (Hemant's own picks; none are sourced claims):
- "I automated X in 60 seconds" screen recordings, e.g. invoice to Google Sheet, or Instagram DM to CRM.
- "Stop paying for Y: build it with n8n."
- "3 AI automations for [niche]" (clinics, real estate, D2C, coaching, CA firms).
- Teardowns of a business's lead flow, with permission.
- "What an AI automation project actually costs."
- Myths ("AI will replace your staff").
- Build-in-public of Hemant's own funnel.

---

## 4. Carousel best practices

- **Size:** 1080×1350 (4:5 portrait) is the default; it takes the most vertical feed space. The **first slide sets the aspect ratio** for the whole carousel. [Reported, multiple]
- **Slide count:** Up to **20 slides** are allowed. Blogs claim a 7 to 10 slide sweet spot, but this is **unverified** (no primary data). Let the content decide.
- **Structure:**
  - Slide 1 is the hook: a big promise plus a visual.
  - Slide 2 states the problem or the stakes.
  - Slides 3 to N give one idea per slide.
  - The second-to-last slide is a summary.
  - The last slide is the CTA: comment keyword, save, or send to a colleague.
- **Text density:** One thought per slide, a large font, and roughly 20 to 40 words maximum per slide (**estimate**, not a published rule). High contrast. Keep the brand template consistent so the grid is recognisable.
- **Alt text and caption:** Write a descriptive, keyword-rich caption, because carousel slide text may not be readable by search. Add custom alt text.

---

## 5. Profile optimisation

| Element | Recommendation |
|---|---|
| **Account type** | **Creator** by default, because Hemant is a personal brand. Creator accounts reportedly get the full music library, while Business accounts get a more restricted one. Older guidance also limited broadcast channels to creators. **Business** adds action buttons (Book/Reserve via partners) and historically had broader third-party tool support. Organic reach is reportedly not affected by account type. Switching is free and reversible, so switch only if a tool such as a scheduler, ManyChat or the Graph API requires it. Check tool docs. [Reported: NapoleonCat, Later/learnwithsbz, InstantDM] |
| **Name field** | This is the most heavily cited searchable field (separate from @username). Use the format "Hemant Kumar \| AI Automation Consultant" or "Hemant \| AI Automation for Business". Keep it short and natural; keyword weighting is not officially confirmed. |
| **Username** | Match the domain or brand. Avoid underscores and numbers if possible. |
| **Bio formula** | Who I help + outcome + proof or credibility + CTA. Example: "I build AI agents & automations for SMBs · WhatsApp/IG DM bots · n8n/Make workflows · 👇 Book a free automation audit". Add a proof line only once real, permissioned results exist. Never invent numbers. |
| **Links** | Up to **5 bio links**. The first link shows and the rest sit behind "and N more". Link 1 is the booking page or website on the domain. Links 2 to 5 can be a lead magnet, case studies and WhatsApp. Instagram gives no click analytics on these links, so use UTM parameters on the website. [Confirmed: Social Media Today/MediaPost; Reported: Elev8or] |
| **Highlights** | Start Here · Services & Pricing · Demos · Results (once any exist) · FAQ · Free Resources. |
| **Pinned posts** | Instagram supports pinning up to 3 grid posts (long-standing feature; check in the app). Pin: (1) who I am and what I do, (2) the best demo Reel, (3) "how to work with me" or a case-study carousel. |
| **Contact** | Add email and WhatsApp contact options. For India, WhatsApp is a high-intent channel. |

---

## 6. Instagram search and SEO; the current role of hashtags

- **Google indexing:** Since **10 July 2025**, public posts from Business and Creator accounts owned by adults can appear in Google results. It is on by default and can be turned off in settings. Captions, alt text, usernames and bios are used. [Reported: Kontentino, Sendible, Search Engine World, Vasta]
- **Keyword placement:** Use the phrases buyers actually type ("AI chatbot for real estate", "WhatsApp automation", "n8n automation India") in the name field, bio, the first line of each caption, on-screen text, spoken audio and alt text. Prefer long-tail phrases and no stuffing.
- **Hashtags:**
  - Capped at **5 per post or Reel** (Instagram announcement, about 18 to 19 December 2025). It was earlier tested at 3. [Reported: El Diario, TuttoAndroid, Global Dating Insights]
  - Mosseri says hashtags help **search and categorisation, not reach**.
  - Use **3 to 5 specific hashtags**, e.g. #aiautomation #n8n #whatsappautomation #smallbusinessindia, plus one niche tag. Don't use generic #ai or #business.

---

## 7. Comment-keyword to auto-DM automation

### Meta's native tools (free)
- **Meta Business Suite → Inbox → Automations** includes:
  - **Comment to Message:** a DM triggered by keyword comments.
  - **Custom Keywords:** for DMs.
  - Instant Reply.
  - FAQs.
- Reported limits:
  - Up to 5 keywords per automation.
  - Keywords match exactly and are case-sensitive.
  - Each keyword can be used in only one automation.
  - Setup is desktop-only.
  - Keyword replies may wait about 15 minutes for a human to reply first.
- These limits are **reported by third parties quoting Meta's help pages, not verified here.** [Reported: Inro, Getkanal, CreatorFlow]
- Good enough for a launch with 1 to 2 lead magnets.

### ManyChat (2026 pricing)
On **2 March 2026**, ManyChat moved to a contact-based model. Most sources agree on the figures below; a few older pages still show the old 1,000-contact free tier. [Reported: Chatbot.com, Blotato, Featurebase, Mark360, RapidDM, ManyChat blog]

| Plan | Monthly | Billed annually | Active contacts/month | Notes |
|---|---|---|---|---|
| Free | $0 | – | **25** (was 1,000) | 4 live automations, 2 channels, 1 user, "Powered by Manychat" branding. No AI or broadcasts. Automations reportedly stop at contact 26. |
| Essential | ~$17 | ~$14 | 250 | Overage about $0.10 per contact |
| Pro | ~$39 | ~$29 | 2,500 | First tier with WhatsApp, SMS and AI. Overage about $0.05 per contact. Some sources list AI as a ~$29/mo add-on. |
| Business | ~$99 | ~$69 | 7,500 | Team features |
| Advanced | ~$199 | ~$139 | – | – |

*Confirm on manychat.com/pricing before buying.* An "Active Contact" is anyone you exchange messages with in the billing month.

ManyChat's native "Follow to DM" trigger launched in October 2025 as a beta. ManyChat says accounts **under 1,000 followers are likely ineligible**. [Reported]

**Recommendation for Hemant:**
- Use Meta's native Comment to Message during weeks 1 to 4. The ManyChat free tier (25 contacts) is effectively a trial.
- Move to ManyChat Essential or Pro once more than 25 people a month are commenting.
- Or build the flow in **n8n** on the Instagram Messaging API. That doubles as a portfolio demo. Access requirements for one's own account should be checked in Meta's developer docs.

### Meta policy limits (what any tool must obey)
- **Private replies:** one message per comment, sent **within 7 days** of the comment. For Live, it must be sent during the broadcast. [Confirmed: Meta developer docs]
- **Follow-ups:** allowed only if the user responds, and **within 24 hours** of that response. That is the standard 24-hour messaging window. [Confirmed: Meta docs; Reported: KeyCRM, Spur]
- **Human Agent tag:** extends the window to 7 days for **human** support replies only. Bots may not use it, and it is not for promotional sequences. [Reported]
- **Non-followers:** private replies land in the **Message Requests** folder. A report in Meta's developer community (date not verified) claims new restrictions on DMs to non-follower commenters, possibly tied to teen privacy. This is **unconfirmed**; monitor delivery rates. [Confirmed: Meta docs on Requests; Unverified: forum thread]
- **Rate limit:** 750 private-reply calls per hour per Page (Meta rate-limit docs, as reported). Not a practical constraint at launch.
- **Spam risk:** an approved tool does not make every behaviour approved. ManyChat users report temporary blocks after aggressive broadcasts. Rules for Hemant:
  - Every message must be a requested reply.
  - Every DM must deliver the promised value.
  - No cold mass DMs.
  - No unsolicited promotional sequences outside the 24-hour window. [Reported: ManyChat blog, ManyChat community]
- **Opt-in pattern:** the first DM should deliver the promised resource and ask one question, e.g. "What does your business do?" The user's reply opens the 24-hour window for a real conversation.

---

## 8. Posting cadence for a solo creator (recommended plan)

Buffer's 2M-post study (Aug 2025):
- 3 to 5 posts per week is the reach/growth sweet spot. Moving from 1 to 2 posts per week up to 3 to 5 gave about 12% more reach per post.
- Follower growth rose with frequency: +0.12% at 1 to 2 posts per week, +0.26% at 3 to 5, +0.44% at 6 to 9, +0.66% at 10 or more. This is correlational.
- Going a week without posting carries a "no-posting penalty". [Confirmed: Buffer]

**Hemant's sustainable baseline** (the numbers are estimates and recommendations):
- **3 Reels + 2 carousels per week** (5 feed posts).
- **2 trial reels per week** to test hooks, once available on the account.
- **Stories on 5 or more days a week**, 3 to 6 frames a day: one poll or question, one behind-the-scenes, one CTA. This is an estimate; no reliable published benchmark exists.
- **1 broadcast-channel post per week**, once there are a few hundred followers.
- **1 collab post per month** from month 2.
- **15 to 30 minutes a day of community engagement:** reply to every comment and DM, and leave thoughtful comments on 10 to 20 target-niche accounts.
- **Batching:** film 6 to 8 Reels in one weekly session and design carousels from a template.
- **Timing:** Weekday afternoons are the most consistent finding: Buffer 2 to 6 pm, Sprout late morning to mid-afternoon Tue to Thu. India blogs suggest 2 to 5 pm IST on weekdays. To reach both Indian and US/UK clients, test morning and afternoon IST against evening IST (US East Coast morning, a hypothesis to test) in Insights. [Reported: Buffer, Sprout, Hootsuite via SocialPilot, WsCubeTech]

---

## 9. Collaboration posts

- Up to **5 co-authors** per post. The post appears on every collaborator's grid, and they share the engagement. [Reported: Sked, Sprout, Vista Social]
- Partner types:
  - Complementary B2B service providers: web developers, performance marketers, CAs or bookkeepers, Shopify experts, CRM consultants.
  - Niche-community creators: real-estate coaches, clinic-marketing pages, D2C founder communities.
  - With written permission, clients: "We automated their lead follow-up" case-study Reel.
- Formats:
  - "Their marketing + my automation" joint teardown.
  - Co-hosted Live, which can be repurposed into Reels.
  - Shared lead-magnet giveaway via comment keyword.
- Ask collaborators to also give access to their broadcast channel where relevant.

---

## 10. Converting followers into booked calls

**Channel fit caveat:** Instagram suits founder-led SMB buyers who decide alone (D2C, coaches, clinics, agencies, real estate, local services). Committee-bought enterprise B2B lives more on LinkedIn and search. [Reported: Hyperleap] Consider cross-posting to LinkedIn and YouTube Shorts (outside this doc's scope).

**Funnel (recommended):**
1. **Reel or carousel** (discovery). It ends with "Comment AUDIT / BOT / FLOW".
2. **Auto-DM** (private reply). It delivers the promised resource and asks one qualifying question, e.g. "What's your business and the task that eats most of your week?"
   - Example resources: an "AI Automation Checklist for [niche]" PDF, an n8n template, or a 3-minute Loom.
3. **Human follow-up within the 24-hour window.** Hemant replies personally and suggests one concrete automation idea. The pitch comes only after a genuine exchange. One vendor claims 15 to 22% of DM conversations book a call with this approach. That figure is **unverified**; track Hemant's own rate.
4. **Booking link** on Hemant's own domain, e.g. a /book page with a Cal.com or Calendly embed. Include a short intake form covering business type, current tools, the task to automate and budget range. Send WhatsApp reminders.
5. **Clear entry offer:** a free 20 to 30 minute "AI Automation Audit", or a paid fixed-price audit later. The audit leads to a scoped project or retainer.
6. **Warm the rest:**
   - Stories with polls and question boxes; answer questions as new content.
   - A link sticker to /book once a week.
   - A broadcast channel for nurture.
   - Highlights for objections (pricing, timelines, data privacy).
7. **Proof flywheel:** every finished project becomes a carousel, a Reel and a Highlight, posted only with client consent. Until clients exist, use Hemant's own builds and demo projects as proof, clearly labelled as demos.

**KPIs to track weekly:**

| Funnel stage | Metric |
|---|---|
| Content | Reach and non-follower reach; average watch time; sends per reach; saves per reach |
| Profile | Profile visits; link taps (via UTM) |
| Conversation | Keyword comments; DMs started; replies to the qualifying question |
| Sales | Calls booked; show rate; close rate |

---

## 11. Is Meta Verified worth it?

- **What it gives:**
  - Verified badge.
  - Impersonation monitoring.
  - Direct account support (chat/email, call-backs on business tiers).
  - On some plans, visibility features such as search optimisation and extra links, including links in Reels. Which tier includes which feature is unconfirmed. [Reported: Hootsuite, Leadsie, PPC Land]
- **Price (varies by country and changes often):**
  - A Sept 2026 guide lists $14.99 / $49.99 / $149.99 / $499.99 a month for Standard / Plus / Premium / Max per account.
  - In India, business plans reportedly start at **₹639 per app per month**. The report date is unclear.
  - Check in-app. [Reported: CreatorFlow, PPC Land/afaqs]
- **Verdict for Hemant: skip at launch.** It does not directly buy organic reach. Revisit after about 3 months, or sooner if:
  - Instagram becomes a meaningful revenue source (account-recovery support is then worth paying for);
  - impersonators appear, which is common once a consultant gains visibility; or
  - a specific tier's Reel-link feature is confirmed and shown to drive bookings.

---

## 12. 30-day launch checklist (actionable)

**Week 0 (setup)**
- Switch to a Creator account. Optimise the name field, bio and 5 links (link 1 = website /book).
- Create a brand template for carousels and Reel covers.
- Record 3 cornerstone posts and pin them.
- Create Highlights covers.
- Set up Meta Business Suite Comment to Message for 1 to 2 keywords.
- Build the /book page with an intake form on the website.

**Weeks 1 to 4 (each week)**
- 3 Reels + 2 carousels, each with a comment-keyword CTA and 3 to 5 hashtags.
- Trial-reel hook tests when available.
- Daily Stories with a poll or question.
- Reply to every DM within hours.

**End of month 1**
- Review Insights: watch time, sends per reach, keyword comments, DMs and calls.
- Double down on the top 2 topics.
- Decide on ManyChat Essential/Pro or a custom n8n flow.
- Line up the first collab.

---

## Sources

**Algorithm and ranking signals**
- https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/
- https://www.socialsamosa.com/news-2/instagram-reveals-key-factors-for-boosting-reach-8646916
- https://meetedgar.com/blog/instagram-algorithm-explained-for-2025
- https://blog.hootsuite.com/instagram-algorithm/
- https://www.eclincher.com/articles/how-the-instagram-algorithm-works-in-2026
- https://posteverywhere.ai/blog/how-the-instagram-algorithm-works
- https://onlinemarketing.de/?p=351431
- https://sociality.io/blog/instagram-reels-analytics/
- https://tubefilter.com/2026/04/30/instagram-removes-algorithm-recommendations-repost-content-aggregator
- https://houseofmarketers.com/instagram-reels-algorithm-update-original-content/
- https://searchengineland.com/instagram-your-algorithm-465987
- https://usa.inquirer.net/188397/instagrams-reels-personalization

**Trial reels**
- https://techcrunch.com/2024/12/10/instagram-rolls-out-trial-reels-that-arent-shown-to-a-creators-followers
- https://techcrunch.com/2024/05/31/instagram-tests-trial-reels-that-dont-display-to-a-creators-followers
- https://publer.com/blog/instagram-trial-reels-guide/
- https://instantdm.com/blog/how-instagram-trial-reels-work

**Formats, benchmarks, specs**
- https://buffer.com/library/how-often-to-post-on-instagram/
- https://buffer.com/resources/how-often-to-post-on-instagram/
- https://www.hypebot.com/hypebot/2025/08/how-often-should-you-post-on-instagram.html
- https://www.socialinsider.io/data-geeks/instagram_benchmarks_2025.pdf
- https://www.socialinsider.io/blog/instagram-hashtag-study/
- https://blckalpaca.at/en/knowledge-base/social-media/social-media-algorithms-distribution/reels-vs-carousel-instagram-formats
- https://pages.dashsocial.com/hubfs/social-media-benchmark/2025/H2/instagram.pdf
- https://www.storyboard18.com/amp/digital/instagram-extends-reels-to-three-minutes-and-updates-profile-layout-54043.htm
- https://planoly.com/blog/instagram-updates-jan-2025
- https://socialk.it/en/sizes/instagram-reel-size
- https://socialk.it/en/sizes/instagram-carousel-size
- https://www.trymypost.com/blog/instagram-carousel-algorithm-strategy-2026
- https://posteverywhere.ai/blog/instagram-carousel-best-practices
- https://klap.app/blog/how-long-should-reels-be
- https://www.opus.pro/blog/ideal-instagram-reels-length
- https://www.go-viral.app/blog/instagram-reels-length/
- https://socialbee.com/blog/how-to-add-link-to-instagram-story
- https://blog.brandghost.ai/posts/instagram-stories-strategy-guide/

**Broadcast channels and collabs**
- https://setsmart.io/blog/instagram-broadcast-channel
- https://sendible.com/insights/instagram-broadcast-channels
- https://firmbee.com/a-broadcast-channel-on-instagram
- https://skedsocial.com/blog/instagram-collaboration-feature.md
- https://vistasocial.com/insights/instagram-collab-posts
- https://support.sproutsocial.com/hc/en-us/articles/28825824263565-How-do-I-create-Instagram-collab-posts
- https://epidemicsound.com/blog/instagram-collab-posts

**Profile, SEO, hashtags, links**
- https://www.socialmediatoday.com/news/instagram-adds-capacity-to-display-5-links-in-profile-bio/
- https://www.mediapost.com/publications/article/384487/instagram-rolls-out-feature-allowing-up-to-5-links.html
- https://www.elev8or.io/blog/bio/how-to-put-a-link-in-your-instagram-bio
- https://www.kontentino.com/q-and-a/instagram-search-seo/
- https://www.inro.social/blog/instagram-seo
- https://www.sendible.com/insights/how-to-optimise-instagram-posts-for-google-search
- https://www.searchengineworld.com/its-live-instagram-posts-are-ranking-and-showing-in-google-and-bing-seo-meets-social
- https://vasta.me/blog/instagram-and-seo-what-the-new-indexing-update-means-for-your-strategy
- https://www.eldiario.ec/lamarea/instagram-limita-a-cinco-el-numero-de-hashtags-que-se-podran-incluir-por-publicacion-20251219/
- https://www.tuttoandroid.net/news/2025/12/19/instagram-limite-massimo-5-hashtag-post-1132186/
- https://www.globaldatinginsights.com/featured/instagram-to-cap-hashtags-at-five-per-post/
- https://www.storyboard18.com/digital/instagram-tests-three-hashtag-limit-leaving-small-creators-worried-85146.htm

**Account type and Meta Verified**
- https://napoleoncat.com/blog/instagram-creator-vs-business-account/
- https://learnwithsbz.com/business-or-creator-account-on-instagram-which-account-should-you-be-using/
- https://instantdm.com/blog/instagram-creator-vs-business-account-which-one-actually-drives-growth
- https://setsmart.io/blog/instagram-creator-vs-business-account
- https://creatorflow.so/blog/is-meta-verified-worth-it/
- https://blog.hootsuite.com/meta-verified/
- https://www.leadsie.com/blog/meta-verified
- https://ppc.land/meta-verified-expands-to-businesses-on-facebook-and-instagram-in-india/
- https://www.afaqs.com/news/digital/meta-introduces-meta-verified-subscription-for-businesses-in-india

**DM automation, ManyChat, Meta messaging policy**
- https://manychat.com/blog/manychat-pricing-explained/
- https://www.chatbot.com/blog/manychat-pricing/
- https://www.blotato.com/blog/manychat-pricing
- https://www.featurebase.app/blog/manychat-pricing
- https://mark360.ai/blog/manychat-pricing-2026
- https://rapiddm.com/blog/manychat-pricing-2026-contact-limits-cost-guide
- https://hackceleration.com/labs/manychat-pricing
- https://manychat.com/blog/is-manychat-officially-approved-by-instagram/
- https://setsmart.io/blog/is-manychat-safe
- https://community.manychat.com/general-q-a-43/block-2-5395
- https://developers.facebook.com/docs/instagram-platform/private-replies/
- https://developers.facebook.com/documentation/business-messaging/instagram-messaging/features/private-replies
- https://developers.facebook.com/docs/instagram-messaging/overview
- https://developers.facebook.com/documentation/business-messaging/messenger-platform/overview/rate-limiting
- https://developers.secure.facebook.com/community/threads/805868338192432
- https://help.keycrm.app/en/communications-sms-email-instagram-telegram-viber-marketplace-chats-telephony/response-timeframes-on-facebook-and-instagram
- https://www.spurnow.com/blogs/instagram-dm-automation-rules
- https://www.inro.social/glossary/24-hour-messaging-window
- https://www.inro.social/blog/how-to-set-instagram-auto-replies
- https://inro.social/blog/instagram-comment-to-dm-automation
- https://getkanal.com/blog/instagram-automatic-messages
- https://getkanal.com/blog/manychat-instagram
- https://creatorflow.so/blog/instagram-built-in-automation/

**Timing and conversion**
- https://www.socialpilot.co/blog/best-time-to-post-on-instagram
- https://www.wscubetech.com/blog/instagram-post-time/
- https://hyperleap.ai/blog/leads-on-instagram
- https://www.softomatesolutions.com/blog/instagram-dms-sales-channel-message-sequence/
- https://www.folk.app/pt/articles/instagram-lead-generation
