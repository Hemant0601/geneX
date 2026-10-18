# Client Onboarding Checklist (access, approvals, data)

**For:** Hemant, and a copy for the client (§2 is written so you can paste it to them) · **Used from:** Day 0 (agreement signed + deposit paid) to go-live and offboarding
**Source of truth:** [`docs/00-strategy.md`](../docs/00-strategy.md) §5 (stage 10: "Admin on the client's Meta Business Manager; a WhatsApp provider account in the client's name; CRM and calendar access. Start Meta business verification and template approval on day 1, because they set the timeline") and §5 delivery rules. Tally onboarding form fields: [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §10.2. The agreement calls this list **Schedule C** ([`05-consulting-agreement-template.md`](./05-consulting-agreement-template.md)).

> **Golden rules**
> 1. **Every account is in the client's name** and paid by the client. Hemant gets a role or a partner invite on it.
> 2. **Never collect passwords or one-time codes.** Not on WhatsApp, not by email, not in Tally. Access is granted by invitations and roles. If a tool has no invite feature, the client types the secret into the tool themselves during a screen-share.
> 3. **The 10-working-day clock starts when this checklist is complete** ("Full Access"), not at payment. Write the date down and tell the client.
> 4. Meta menu names change often; paths marked *(unverified)* are general knowledge. Meta now calls Business Manager a **"business portfolio"**.

---

## 1. Day 0: the same day the deposit and signature arrive

- [ ] Confirm the payment in Razorpay / Skydo, and save the receipt or FIRA ([`09-invoicing-and-tax-notes-india.md`](./09-invoicing-and-tax-notes-india.md)).
- [ ] Send the **welcome message** ([`07-follow-up-templates.md`](./07-follow-up-templates.md) §9) with: the Tally onboarding form, the Kickoff link `https://cal.com/askhemant/kickoff`, and §2 of this checklist.
- [ ] Pipeline Sheet: stage → **Won**; create a client folder (Google Drive, client name + agreement number), shared with nobody else.
- [ ] Check capacity: **no more than 2 Sprints at once.**
- [ ] Founding client: lower `foundingSlotsLeft` in [`website/assets/js/config.js`](../website/assets/js/config.js) and redeploy; WhatsApp label **Founding**.
- [ ] Book the kickoff within 2 working days.

---

## 2. The access checklist (send this to the client)

> **Hi [Name], here's everything I need to start. Most items take 2–5 minutes. Nothing here asks for a password: you invite me, and you can remove me at any time. The 10-working-day timeline starts the day the list is complete.**

### A. Meta (Facebook/Instagram) business portfolio
| # | Item | How to do it *(paths unverified)* | Done |
|---|---|---|---|
| A1 | Your Meta **business portfolio** exists and you are its admin | business.facebook.com → if you don't have one: *Create a business portfolio* in your business's legal name | ☐ |
| A2 | **Give AskHemant access** | Option 1 (preferred): *Business settings → Users → Partners → Add → Give a partner access to your assets* → enter AskHemant's business portfolio ID **[Hemant's ID]** → assign: your **Facebook Page**, **Instagram account**, **WhatsApp account**, and **ad account** (lead access; no ad spending needed). Option 2: *Business settings → Users → People → Add* → **hello@askhemant.ai** with admin access on those assets | ☐ |
| A3 | **Lead access** for your Meta lead forms | Page settings → *Leads access* (or Lead access manager) → allow AskHemant / the CRM connection | ☐ |
| A4 | **Business verification** started **on day 1** | Business settings → *Security Center* → *Start verification*. Have ready: legal business name, address and phone matching your documents; your website; one official document (for example a GST certificate, a business registration or a utility bill in the business name) *(document list: general knowledge; Meta shows the accepted list)* | ☐ submitted ☐ approved |

### B. WhatsApp Business Platform (the official API)
| # | Item | How | Done |
|---|---|---|---|
| B1 | **A WhatsApp number for the system, in your business's name** | A number you own that can receive an SMS or call for verification. If it's currently on the WhatsApp or WhatsApp Business **app**, it usually can't be used on the API at the same time; Meta's "coexistence" option wasn't checked, so plan on a **separate number** (a new SIM is simplest) | ☐ |
| B2 | **WhatsApp provider (BSP) account in your name** | Sign up with your chosen provider [AiSensy / Interakt / other, or WhatsApp Cloud API directly in your Meta portfolio], add **your own payment method**, then invite **hello@askhemant.ai** as an admin/team member | ☐ |
| B3 | **Display name** | The name customers see, matching your business name. Meta reviews it | ☐ approved |
| B4 | **Message templates submitted on day 1** | I draft them; you approve the wording; I submit them in your account. Up to 10 (list in §3) | ☐ submitted ☐ approved |
| B5 | **How your leads say yes to WhatsApp** | Meta lead forms: add a line or checkbox such as "Yes, contact me on WhatsApp about this enquiry". Website forms: a WhatsApp consent checkbox (unticked). Portal and Instagram leads enquired with you directly; the first message names your business and offers STOP. *You're responsible for consent (agreement clause 5.4)* | ☐ |

### C. Your lead sources (only the ones in your proposal)
| # | Source | What I need | Done |
|---|---|---|---|
| C1 | Meta lead ads | The names of the live forms; A2 + A3 done. I'll send a test lead | ☐ |
| C2 | Website form | Who manages the site, and either access to the form settings or the email address the form sends to | ☐ |
| C3 | Portals: [99acres / MagicBricks / Housing.com / Property Finder / Bayut / Dubizzle] | Which email receives the lead alerts; you set up a forwarding rule to the address I give you (or the portal's CRM integration, if it offers one). *Alert emails can arrive minutes after the enquiry; the "within a minute" target counts from when the alert reaches the system* | ☐ |
| C4 | Instagram DMs | Your Instagram professional account linked to your Facebook Page; in the Instagram app, *Settings → Messages and story replies → Message controls → Connected tools → Allow access to messages* ON | ☐ |
| C5 | Phone / missed calls (Team system and clinics) | Your phone or IVR provider's name. Missed-call text-back works only if the provider can send a webhook or alert | ☐ |

### D. Where leads are logged, booked and handled
| # | Item | How | Done |
|---|---|---|---|
| D1 | **Lead log** | A Google Sheet in **your** Google account shared with hello@askhemant.ai as Editor, **or** your CRM ([Zoho / HubSpot / other]): invite hello@askhemant.ai as a user, and create the API key yourself during the kickoff screen-share | ☐ |
| D2 | **Calendar** for visits / appointments | A Google Calendar (a new one called "[Business] Visits" is cleanest) shared with hello@askhemant.ai with "Make changes to events" | ☐ |
| D3 | **AI account in your name** | [OpenAI / Anthropic] account → add billing → set a **monthly spend limit** of [₹/$ amount] → you create the API key and paste it into the automation tool yourself at the kickoff | ☐ |
| D4 | **Automation hosting in your name** | [n8n Cloud account / a VPS in your name, e.g. Hostinger KVM with the n8n template] → invite hello@askhemant.ai as a user | ☐ |
| D5 | **Agents who get hot-lead alerts** | Names, WhatsApp numbers, and areas (or round-robin order). Each agent agrees to receive alerts | ☐ |
| D6 | **Business information for the AI assistant** | Your services / projects / inventory or treatment list, price ranges you're happy to share, locations, business hours, FAQs, the tone you want, languages (English/Hinglish), and a **"never say"** list (e.g. discounts, legal or medical advice). A Google Doc is fine | ☐ |
| D7 | **Handover rules** | When should a person take over? (e.g. budget above ₹[ ], NRI buyer, any complaint, any medical question) | ☐ |

### E. Founding clients only
| # | Item | Done |
|---|---|---|
| E1 | Schedule E (measurement and publication) signed in the agreement | ☐ |
| E2 | A way to count **today's** lead handling during the build: lead arrival times and first-reply times for new leads (a shared tally sheet, or read access to the lead log). No customer chat screenshots needed | ☐ |
| E3 | Publication choice recorded: named / anonymised | ☐ |

> **Full Access date: [date]** → go-live due **[date + 10 working days]** (Team: + 15).

---

## 3. Templates to draft and submit on day 1 (Solo Sprint)

Up to 10, based on the kit's templates (`lead-magnet/` pages 7–10). Meta decides each template's **category** (marketing, utility, authentication) when it approves it, and that sets the price per message.

| # | Template | Likely category | Sent to |
|---|---|---|---|
| 1 | First reply to a lead the business contacts first (Meta form / portal) | Marketing or utility | Lead |
| 2 | Visit / appointment confirmation with Maps pin | Utility | Lead |
| 3 | 24-hour reminder | Utility | Lead |
| 4 | 2-hour reminder | Utility | Lead |
| 5 | No-show rescue ("want to pick another time?") | Marketing | Lead |
| 6 | Day-2 follow-up | Marketing | Lead |
| 7 | Day-7 revival | Marketing | Lead |
| 8 | Day-30 check-in, with STOP to opt out | Marketing | Lead |
| 9 | Hot-lead alert | Utility | Agent |
| 10 | 8 am daily digest | Utility | Owner |

Replies inside the 24-hour customer-service window (after the lead writes back) are free-form and free; templates are only needed to *start* or *restart* a conversation. Approval times weren't researched: submit on day 1 and have a plain-text fallback (agent alert by email) ready if one is delayed.

---

## 4. Data handling rules (Hemant)

- **No passwords or OTPs**, ever. If a client sends one, ask them to change it and delete the message.
- **2FA** on every account you are invited to; use your hello@askhemant.ai identity, not a personal one.
- **Least privilege:** ask for the role you need, not "full control", where the tool allows it.
- **Test with fictional data** (the demo businesses, labelled DEMO) until go-live. Don't import real leads into anything of yours.
- **Real personal data stays in the client's accounts.** Never forward it to your personal WhatsApp, never paste it into your own AI chats, never keep it in your Downloads folder.
- **Screens in Looms and content:** blur names and numbers; client screens appear in content only with written permission ([`08-case-study-template-and-consent.md`](./08-case-study-template-and-consent.md)).
- **Clinics:** collect only name, phone, appointment type and time. No diagnoses or clinical notes in the AI assistant or the log. Medical questions go to the clinic team.
- **Opt-outs:** STOP removes the person from follow-ups the same day; test it at go-live.
- **Retention:** as the client decides; your copies deleted within 30 days of the end (agreement clause 12.3).

---

## 5. Kickoff call (45 minutes)

| Min | Agenda |
|---|---|
| 0–5 | Goals in their words (from box 1 of the proposal); confirm the scope and the out-of-scope list |
| 5–20 | Walk the access checklist together on a screen-share; they grant invites live; they paste API keys into the tool themselves |
| 20–30 | Qualifying questions and handover rules (D6–D7); the "never say" list; language |
| 30–38 | Templates: read the drafts together; agree wording |
| 38–43 | Dates: Full Access today or by [date]; day-5 demo slot; go-live date; who approves |
| 43–45 | Founding: confirm the baseline method; everyone: how to reach you (WhatsApp, IST business hours) |

---

## 6. Sprint plan (working days from Full Access)

| Day | Hemant | Client |
|---|---|---|
| **1** | **Start Meta business verification; submit all templates; set display name.** Connect sources (C1–C5) | Approve templates if not done at kickoff |
| 2–3 | Build intake → WhatsApp first reply → qualifier → tags → log; set up the founding baseline count (if founding) | Answer questions within 1 working day |
| 4 | Booking + reminders + agent alerts; follow-up sequence with opt-out | — |
| **5** | **Demo on test leads** (Client call, 30 min) → feedback list | Feedback within 1 working day |
| 6–8 | Fixes; 8 am digest; edge cases (after-hours, duplicates, Hinglish replies, opt-out) | — |
| 9 | Go-live dry run with 5 test leads per source (Schedule A acceptance criteria) | Join the dry run if possible |
| **10** | **Go-live**; balance payment link; Loom handover + 1-page SOP | Approve go-live; pay the balance |
| Go-live → +14 days | **Warranty.** Review AI conversations daily (founding: the **first 100**); tune prompts | Report anything odd |
| **~Day 24** (warranty end) | Warranty-end message with the Lead Desk Care offer ([`07-follow-up-templates.md`](./07-follow-up-templates.md) §12) | Decide on Care |
| Founding: go-live + 30 days | After-measurement; feedback interview; case-study draft ([`10-founding-client-program.md`](./10-founding-client-program.md) §6) | 30-minute interview |

**Team system:** the same sequence over 15 working days (demo around day 8), plus round-robin rules, the CRM integration, the manager dashboard and 2 training sessions.

**If day 10 is missed** for reasons on your side: tell the client that day, and the first month of Lead Desk Care is free (on-time promise). If the delay is from approvals or access they control, the clock pauses: say so in writing the day it happens.

---

## 7. Go-live checklist

- [ ] All Schedule A acceptance tests pass on test leads (log the timings; they're a demo of the design target, not a guarantee).
- [ ] Opt-out (STOP) tested.
- [ ] Hot-lead alert reaches every agent in D5.
- [ ] Reminders scheduled correctly across time zones (UAE clients: Asia/Dubai).
- [ ] Error alerts route to you (and to the client's owner for anything urgent).
- [ ] AI spend limit set on the client's account.
- [ ] Loom handover recorded (record in OBS + Drive if longer than Loom Free's reported 5 minutes) and 1-page SOP sent.
- [ ] Balance payment link sent; go-live message sent ([`07-follow-up-templates.md`](./07-follow-up-templates.md) §11).

---

## 8. Offboarding (end of project, or end of a retainer)

- [ ] Final handover: list of every account, workflow and template, with where it lives (all in the client's name).
- [ ] Remove yourself: partner access in their business portfolio, BSP team member, CRM user, Sheet and calendar sharing, n8n user.
- [ ] Delete your copies of any of their personal data within **30 days**; confirm in writing ([`07-follow-up-templates.md`](./07-follow-up-templates.md) §14).
- [ ] Archive the client folder (documents only, no lead data).
- [ ] Ask for the case study / testimonial only if not yet done and the results are measured ([`08-case-study-template-and-consent.md`](./08-case-study-template-and-consent.md)).
