# WhatsApp message templates

Every template the workflows send, ready to submit in **WhatsApp Manager › Account tools › Message templates › Create template**. The same templates are in [`whatsapp-templates.json`](./whatsapp-templates.json) in the Cloud API format, so you can submit them all from a terminal instead (see [Submit with the API](#submit-with-the-api)). `tools/test-code-nodes.mjs` checks that the two stay in line with what the workflows send.

**Two WhatsApp accounts, kept apart**

| Account | Phone number | Used by | Business name shown |
|---|---|---|---|
| **AskHemant** (your own WABA) | Your business number, with the WhatsApp Business app kept through Meta's coexistence onboarding (see the README) | 01 kit sign-up, 05 digest, 06 bookings | AskHemant |
| **DEMO** | Meta's free **test number** (Meta App › WhatsApp › API Setup) | 02 speed-to-lead, 03 AI qualifier, 04 missed call | "Test Number" in the chat header. The business name **Skyline Realty (DEMO)** or **SmileCare Dental (DEMO)** goes into a variable, and the video gets the amber **DEMO – fictional business** badge |

The DEMO templates are generic on purpose (the business name is `{{3}}` or `{{1}}`), so the same approved wording can be reused on a client's own account during a Sprint.

## Rules these templates follow (check before you edit one)

- **Opt-in first.** Business-initiated messages (every template here) go only to people who opted in to WhatsApp messages from that business. Workflow 01 checks the separate, unticked consent box; workflow 02 checks `whatsapp_opt_in` on the form; workflow 06 messages people who gave a WhatsApp number on a booking form that says confirmations and reminders come by WhatsApp. Add that sentence to the Cal.com booking question.
- **24-hour window.** Free-form text is allowed only within 24 hours of the person's last message to you. Outside the window, only an approved template can start the chat. Workflow 03 replies with free text because it always answers a message that just arrived.
- **Category.** *Utility* = tied to something the person asked for or booked (delivery of the calculator, a booking confirmation, a reminder, an internal alert). *Marketing* = anything promotional, including re-engagement. Meta reviews the category and **can change it** (for example, it may decide `lead_first_reply` is marketing). Check the category after approval, because the price differs: about ₹0.13 per utility message and ₹0.86 per marketing message in India, per one reseller ([MyOperator](https://support.myoperator.com/portal/en/kb/articles/whatsapp-has-shifted-to-per-message-pricing-effective-july-1-2025-based-on-message-categories-and-your-recipient-s-country-in-india-there-are-three-paid-categories)). Confirm on Meta's live rate card ([Meta pricing](https://developers.facebook.com/docs/whatsapp/pricing)).
- **Opt-out.** Every marketing template ends with "Reply STOP to opt out". Workflow 03 treats STOP, unsubscribe and *band karo* as an opt-out without asking the AI. Honour every STOP everywhere, and never message an opted-out number again.
- **Format** (also checked by `tools/test-code-nodes.mjs`):
  - Template names use only lowercase letters, digits and underscores.
  - Variables run `{{1}}`, `{{2}}`… in order.
  - A variable never starts or ends the body, and two variables never sit side by side.
  - Every variable has a sample value.
  - The body is at most 1,024 characters, the footer at most 60, and a button at most 25.
  - Variable values sent by the workflows never contain new lines or tabs (the `cleanParam` helper strips them).
- **No general-purpose bot.** Meta has banned general-purpose AI chatbots on the WhatsApp Business Platform since 15 Jan 2026 ([respond.io](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban)). The qualifier is scoped to one business's property enquiries and says so if asked anything else.
- **Hinglish.** Meta has no separate Hinglish language. Submit the Romanised-Hindi version under **Hindi (hi)** as a second language of the same template name. Workflow 02 sends `hi` when the lead's form says Hinglish. If a reviewer rejects Romanised Hindi under `hi`, submit it as its own template in English, for example `lead_first_reply_hinglish`, and change the template name in the workflow's Config node.

## Templates sent by the workflows

### 1. `ah_kit_welcome`: Utility · en (hi optional) · AskHemant account · workflow 01

Sent seconds after a kit sign-up, **only if the person ticked the WhatsApp consent box**.

| | |
|---|---|
| Body (en) | Hi {{1}}, here is the Lead Leak Calculator you asked for on askhemant.ai: {{2}}<br><br>Open it, choose File > Make a copy, and enter your own numbers. It shows what slow replies may be costing you, using only the numbers you type.<br><br>Reply STOP if you don't want WhatsApp messages from AskHemant. |
| Body (hi, optional) | Namaste {{1}} ji, askhemant.ai par aapne jo Lead Leak Calculator maanga tha, yeh raha: {{2}}<br><br>Ise kholiye, File > Make a copy chuniye aur apne numbers daaliye. Yeh sirf aapke daale hue numbers se dikhata hai ki der se reply karne ka kitna nuksaan ho sakta hai.<br><br>WhatsApp messages nahi chahiye toh STOP likhiye. |
| Footer | AskHemant · askhemant.ai |
| Variables | {{1}} first name ("there" if blank) · {{2}} the calculator's "make a copy" link (`calculator_url` in Config = `{{CALCULATOR_COPY_URL}}`) |
| Sample values | Meera · https://docs.google.com/spreadsheets/d/EXAMPLE/copy |

### 2. `ah_internal_new_lead`: Utility · en · AskHemant account → Hemant's personal WhatsApp · workflow 01

| | |
|---|---|
| Body | Lead Leak Kit sign-up ({{1}} lead).<br>Name: {{2}}<br>Business type: {{3}}<br>Leads a month: {{4}}<br>Lane: {{5}}<br>WhatsApp tips consent: {{6}}<br>Source: {{7}}<br>Welcome message: {{8}}<br><br>Reply to them personally within 4 working hours, then update the stage in the Pipeline sheet. |
| Variables | {{1}} new / returning · {{2}} first name · {{3}} business type · {{4}} leads a month · {{5}} lane RE / CL / GEN · {{6}} yes / no · {{7}} UTM source, e.g. "ig / dm / leaks" · {{8}} welcome result (adds "Sheet write FAILED" if the Sheet write failed) |
| Sample values | new · Meera · Real estate (India) · 40–100 · RE · yes · ig / dm / leaks · accepted |

### 3. `ah_daily_digest`: Utility · en · AskHemant account · workflow 05 (08:00 IST)

| | |
|---|---|
| Body | Good morning. {{1}} lead summary for {{2}}.<br><br>New leads: {{3}}<br>Median first reply: {{4}}<br>Answered within 60 seconds: {{5}}<br>Hot leads: {{6}}<br>Bookings made: {{7}}<br>Still waiting for a first reply: {{8}}<br><br>The details are in your Google Sheet. |
| Variables | {{1}} business label · {{2}} yesterday's date · {{3}} count with lanes · {{4}} median `seconds_to_reply` · {{5}} "x of y" · {{6}} count with first names · {{7}} bookings (plus site-visit requests on the demo sheet) · {{8}} leads with no first reply yet |
| Sample values | AskHemant · Mon, 19 Oct · 4 (RE 3, CL 1) · 3.2 s · 3 of 3 · 1 (Meera) · 1 · 1 |

For the D5 demo, submit the same template on the DEMO account too (same name and text), because templates belong to one WhatsApp Business Account.

### 4. `ah_call_confirmation`: Utility · en · AskHemant account · workflow 06

| | |
|---|---|
| Body | Hi {{1}}, your {{2}} with Hemant is booked for {{3}}.<br><br>The Google Meet link is in your Cal.com confirmation email. To change the time, use the reschedule link in that email. |
| Variables | {{1}} first name · {{2}} event label from Config `event_labels` · {{3}} start time in the attendee's time zone |
| Sample values | Meera · free 20-min Fit Call · Tue, 27 Oct, 11:00 am IST |

### 5. `ah_call_reminder_2h`: Utility · en · AskHemant account · workflow 06

| | |
|---|---|
| Body | Hi {{1}}, a quick reminder: your {{2}} with Hemant starts at {{3}}, in about 2 hours.<br><br>Reply 1 to confirm. To reschedule, use the link in your Cal.com email. |
| Variables | same as `ah_call_confirmation` |
| Note | "Reply 1" arrives in your WhatsApp Business app (coexistence), where you read it yourself. Nothing automatic happens on the reply |

### 6. `lead_first_reply`: Utility · en + hi · DEMO account · workflow 02

The speed-to-lead first reply. When the lead taps a button, the 24-hour window opens and workflow 03 takes over.

| | |
|---|---|
| Body (en) | Hi {{1}}, thanks for asking about {{2}}! I'm the WhatsApp assistant for {{3}}. May I ask 2 quick questions so we send you the right options? |
| Buttons (en) | Quick reply: **Yes, ask me** · Quick reply: **Call me instead** |
| Body (hi) | Namaste {{1}} ji, {{2}} ke baare mein poochne ke liye thank you! Main {{3}} ka WhatsApp assistant hoon. Sahi options bhejne ke liye 2 chhote sawaal pooch loon? |
| Buttons (hi) | **Haan, poochiye** · **Call kijiye** |
| Variables | {{1}} first name · {{2}} project / listing · {{3}} business name (demo: "Skyline Realty (DEMO)") |
| Sample values | Riya · Skyline Heights (DEMO) · Skyline Realty (DEMO) |
| Keep in sync | Workflow 02 saves the rendered text as the first turn of the chat history. If you change the wording here, change it in `tools/build-workflows.mjs` (`rendered`) too |

### 7. `agent_hot_lead_alert`: Utility · en · DEMO account → the agent (your own second phone in the demo) · workflow 03

| | |
|---|---|
| Body | Hot lead for {{1}}.<br>Name: {{2}}<br>WhatsApp: {{3}}<br>Summary: {{4}}<br>Why now: {{5}}<br>Site-visit booking link: {{6}}<br><br>Please call or message them as soon as you can. |
| Variables | {{1}} business · {{2}} lead name · {{3}} lead's number · {{4}} AI summary (max 300 characters) · {{5}} reason, e.g. "wants a site visit", "asked for a person", "assistant error" · {{6}} booking link |
| Sample values | Skyline Realty (DEMO) · Riya Demo · +919800000001 · 2BHK in Baner, 80L to 1Cr, buying in 2 months · wants a site visit · https://cal.com/askhemant/demo-site-visit |

### 8. `clinic_missed_call`: Utility · en (hi optional) · DEMO account · workflow 04

| | |
|---|---|
| Body (en) | Hi, this is {{1}}. Sorry we missed your call, we were with a patient. How can we help? Reply here, or book a slot online: {{2}}<br><br>You can also call us back on this number. |
| Body (hi) | Namaste, yeh {{1}} hai. Maaf kijiye, aapka call miss ho gaya, us waqt treatment chal raha tha. Kaise madad karein? Yahin reply kijiye, ya online slot book kijiye: {{2}}<br><br>Aap isi number par call back bhi kar sakte hain. |
| Variables | {{1}} clinic name (demo: "SmileCare Dental (DEMO)") · {{2}} booking link |
| Opt-in | A phone call is not WhatsApp opt-in by itself. For a real clinic, the IVR greeting should say "If we miss your call, we'll send you a WhatsApp message from [clinic]", and the clinic should check Meta's current opt-in policy. Never put symptoms or treatment details in this message |

## Prepared for client builds (not sent by workflows 01–06)

They are the Lead Leak Kit's templates 05–10 (pages 9–10 of the kit), made ready for Meta approval for the Sprint's visit booking and 30-day follow-up.

| Name | Category | Body (en) | Buttons |
|---|---|---|---|
| `site_visit_reminder_24h` | Utility | Hi {{1}}, a quick reminder: your site visit at {{2}} is tomorrow at {{3}}. Reply 1 to confirm or 2 to reschedule. | — |
| `site_visit_reminder_2h` | Utility | See you today at {{1}}! Location: {{2}}<br>Your agent, {{3}}, will meet you at the gate. Running late? Just reply here. | — |
| `visit_no_show_rescue` | Utility | We missed you at {{1}} today. No problem! Shall I book a new slot, or send a video tour first? | Book a new slot · Send a video tour |
| `lead_day7_revival` | **Marketing** | Hi {{1}}, still looking in {{2}}? {{3}} new options in your budget came up this week. Want the details?<br><br>Reply STOP to opt out. | Send details · Stop messages |
| `lead_day30_checkin` | **Marketing** | Hi {{1}}, it's a month since your {{2}} enquiry. Are you still planning to buy, or shall I close it for now?<br><br>Reply STOP to opt out. | Still looking · Close it · Stop messages |
| `ah_kit_day2_followup` (AskHemant account) | **Marketing** | Hi {{1}}, did you try the 10 pm test from the Lead Leak Kit? Reply with the time your first reply took and I'll tell you the first leak I'd fix.<br><br>Reply STOP to opt out. | — |

Send `lead_day7_revival` only when the new options are real. Marketing templates to Indian numbers can also be held back by Meta's per-person limits on marketing messages, so never build a funnel step that depends on one arriving.

## Submit with the API

Use a **system user token** from Meta Business Settings, with `whatsapp_business_management`. It goes in an environment variable, never in a file:

```bash
export WA_TOKEN='paste-the-system-user-token'   # never commit this
export WABA_ID='your WhatsApp Business Account ID'
# Submit every AskHemant-account template (use "demo" and the DEMO WABA_ID for the others):
node -e '
const t = require("./automations/whatsapp-templates.json").templates.filter((x) => x.account === process.argv[1]);
for (const { name, language, category, components } of t) console.log(JSON.stringify({ name, language, category, components }));
' askhemant | while read -r tpl; do
  curl -sS -X POST "https://graph.facebook.com/v21.0/$WABA_ID/message_templates" \
    -H "Authorization: Bearer $WA_TOKEN" -H 'Content-Type: application/json' -d "$tpl"; echo
done
```

Approval usually arrives in minutes, but can take longer. Start on day 1, because it sets the pace of every build (strategy §5, stage 10). Rejected? Read the reason in WhatsApp Manager, change the wording here and in the JSON, re-run `node automations/tools/test-code-nodes.mjs`, and resubmit.
