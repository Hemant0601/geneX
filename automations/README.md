# AskHemant automations (n8n)

Six importable n8n workflows. **01, 05 and 06 run Hemant's own funnel**, which is case study #0 (strategy §8): Instagram → DM → kit form → n8n → Google Sheet → WhatsApp, built in public. **02, 03 and 04 power the DEMO builds** filmed for Reels P03, P10 and later: Skyline Realty and SmileCare Dental, both **fictional businesses**, always labelled *DEMO – fictional business*.

"Within a minute" is the **design target**, measured from the moment a lead reaches n8n. It is not a promised or measured client result. The workflows log `lead_received_at`, `first_reply_sent_at` and `seconds_to_reply` so every number you publish can be shown, not claimed.

## What's in this folder

| Path | What it is |
|---|---|
| `01-kit-signup-to-pipeline.json` | Tally kit form → normalise → **Pipeline** sheet → WhatsApp welcome (only with consent) + WhatsApp alert to Hemant |
| `02-demo-speed-to-lead-first-reply.json` | DEMO Skyline Realty: website / Meta lead → WhatsApp first-reply template within seconds → `Demo_Leads` with timestamps → HTTP 200 with the timing |
| `03-demo-ai-qualifier-inbound.json` | DEMO: WhatsApp Cloud API webhook (GET handshake + POST messages) → chat history from the Sheet → Claude (strict JSON) → WhatsApp reply → Sheet → hot lead → agent alert with summary and booking link |
| `04-demo-missed-call-text-back-clinic.json` | DEMO SmileCare Dental: missed-call webhook (Exotel / Knowlarity / Twilio / generic) → WhatsApp template with a booking link → `Demo_Clinic_Calls` |
| `05-daily-owner-digest.json` | Every day 08:00 IST: read the lead log → summarise yesterday → WhatsApp digest |
| `06-calcom-booking-to-pipeline.json` | Cal.com booking created / rescheduled / cancelled → Pipeline stage → WhatsApp confirmation → wait until 2 h before → reminder ("Reply 1 to confirm") |
| `whatsapp-templates.md` / `.json` | Every template: name, category, en + Hinglish body, variables, buttons, sample values; JSON ready for the API |
| `prompts/real-estate-qualifier.md` | The AI qualifier's system prompt and JSON schema, versioned (`v1.0.0`) |
| `sheets/*.csv` | The exact header row of each Google Sheet tab |
| `demo/` | Fictional test payloads, `send-demo-lead.sh`, a DEMO lead form for filming, and the fake-data note |
| `tools/build-workflows.mjs` | Generates the six JSON files and the sheet headers (the AI prompt is copied from `prompts/`) |
| `tools/validate-workflows.mjs` | Static checks: JSON, node ids and names, connections, node types, references, Code syntax, secrets |
| `tools/test-code-nodes.mjs` | 41 unit tests that run the shipped Code-node code against the demo payloads and synthetic sheet rows |

## Architecture

```text
HEMANT'S OWN FUNNEL (case study #0)                     WhatsApp number: AskHemant (coexistence)
-------------------------------------------------------------------------------------------------
Reel / carousel "Comment LEAKS"
  -> Meta auto-DM with the kit link -> askhemant.ai/kit -> Tally calculator form
       --(webhook, Tally-Signature)--> [01 Kit sign-up] --+--> Google Sheet "Pipeline" (row, stage New)
                                                          +--> WhatsApp ah_kit_welcome  (consent ticked only)
                                                          +--> WhatsApp ah_internal_new_lead -> Hemant's phone
  -> askhemant.ai/book -> Cal.com Fit Call
       --(webhook, X-Cal-Signature-256)--> [06 Booking] --+--> Pipeline: stage Call booked, booking columns
                                                          +--> WhatsApp ah_call_confirmation
                                                          +--> Wait until start - 2 h -> re-check Sheet
                                                                 -> WhatsApp ah_call_reminder_2h ("Reply 1")
  08:00 IST --> [05 Digest] -- reads Pipeline --> WhatsApp ah_daily_digest -> Hemant's phone

DEMO LAB (fictional businesses)                          WhatsApp number: Meta's test number
-------------------------------------------------------------------------------------------------
demo form / curl / Meta lead relay --> [02 Speed-to-lead] --> WhatsApp lead_first_reply --> Demo_Leads
lead taps "Yes, ask me" / types   --(Meta webhook, X-Hub-Signature-256)--> [03 AI qualifier]
        -> load row + history_json (Demo_Leads) -> Claude Messages API (JSON schema)
        -> WhatsApp text reply -> Demo_Leads + Demo_Conversations -> hot? -> agent_hot_lead_alert
telephony missed call --(Exotel GET / Twilio / Knowlarity / generic POST)--> [04 Missed call]
        -> dedupe 60 min -> WhatsApp clinic_missed_call -> Demo_Clinic_Calls

Hosting: n8n on a Hostinger KVM 2 VPS (n8n.askhemant.ai). Data: Google Sheets. Messages: WhatsApp
Cloud API (graph.facebook.com). AI: Anthropic API (demo only). Secrets: n8n credentials + env vars.
```

### Design rules (kept on purpose)

- **Core nodes only:** Webhook, Respond to Webhook, Code, IF, Set, HTTP Request, Google Sheets, Schedule Trigger, Wait, NoOp. No community nodes, no LangChain nodes.
- **No secrets in the JSON.**
  - API tokens live in n8n credentials.
  - Webhook signing secrets are environment variables, read only inside Code nodes and never written to output.
  - Non-secret settings sit in each workflow's **Config** node as `{{PLACEHOLDER}}` tokens.
- **Code decides, not the model.** In workflow 03, opt-outs, paused chats, numbers outside the safety list, duplicate deliveries (message ids already logged), late deliveries outside the 24-hour window, handover, the agent alert (once per lead) and the fallback reply are all handled in code. The AI only words the reply and extracts fields.
- **Fail safe for demos.** Demo workflows message only numbers on the `allowed_recipients` safety list (`{{DEMO_TEST_NUMBERS}}`). An unfilled list means nobody gets a message.
- **Signed webhooks.** Tally, Cal.com and Meta requests are HMAC-checked against the raw body. A missing or wrong signature stops the run with a clear error in n8n's execution list.
- **Non-Code nodes read only `$json` or `$('Config')`.** In our end-to-end test on n8n 1.123, `$('Some Code node')` inside a Respond, Set or other non-Code node resolved to nothing, so small Code nodes carry context forward instead. `validate-workflows.mjs` enforces this.

## 1. Set up n8n on the Hostinger VPS

Menu names below are as Hostinger and n8n described them in Oct 2026 and were **not clicked through from this build environment**. Check them as you go.

1. **VPS:** buy a **KVM 2** with the **n8n** application template (strategy §5 budget). Note the server IP.
2. **Domain:** in Hostinger DNS for askhemant.ai, add an **A record** `n8n` → the VPS IP. Use `https://n8n.askhemant.ai` everywhere below (or the default `srvNNNN.hstgr.cloud` hostname, if you keep it).
   - The template's reverse proxy (Traefik) and `WEBHOOK_URL` still point at the `srvNNNN.hstgr.cloud` name, so the new name won't load or get a certificate until you change them. Follow Hostinger's "[Changing the domain for n8n on VPS](https://www.hostinger.com/support/11927159-changing-the-domain-for-n8n-on-vps-at-hostinger/)": wait for DNS to propagate, set the domain in the stack's `.env` (`TRAEFIK_HOST` in the current template), fix the `WEBHOOK_URL` line and the Traefik `Host(...)` rule in `docker-compose.yml` if they add a prefix, then `docker compose down && docker compose up -d`. Variable names differ between template versions, so read `.env` and `docker-compose.yml` first.
3. **Environment:** SSH in (`ssh root@<ip>`), then run `docker compose ls` to find the compose file of the n8n stack. Add the variables in [section 3](#3-environment-variables) to the n8n service's `environment:` (or its `.env`), then `docker compose up -d`.
4. **First login:** open `https://n8n.askhemant.ai`, create the owner account (use hello@askhemant.ai), and turn on 2FA.
5. **Version:** Settings › About shows the n8n version. These files use node versions that exist in n8n 1.x and 2.x. On **2.x**, `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` is required for the signature checks, and "Activate" is called **Publish**.

## 2. Accounts and credentials

### Meta (WhatsApp Cloud API)

1. **Meta Business portfolio** for AskHemant. Start **business verification on day 1**, because it and template approval set the pace (strategy §5, stage 10).
2. **developers.facebook.com › Create app › Business**, then add the **WhatsApp** product. This gives you a **test number** and test WhatsApp Business Account. Use them for the DEMO workflows (02–04), and add your own phones as test recipients.
3. **Your own number** (workflows 01, 05, 06).
   - **To keep the WhatsApp Business app** on {{WHATSAPP_NUMBER}} for your personal replies, onboard it with Meta's **coexistence** flow (app and Cloud API on one number). Availability and steps change, so check Meta's current docs or your provider before you rely on it.
   - **The fallback** is a second number for the API, with the app kept on the main number.
   - **Either way**, `{{ALERT_WHATSAPP_NUMBER}}` (where alerts and digests go) must be a **different number** from the sending one.
4. **System user token:** Business settings › Users › System users › Add (Admin). Assign the app and both WhatsApp accounts, then generate a token with `whatsapp_business_messaging` and `whatsapp_business_management`. It goes **only** into the n8n credentials below.
5. **App secret** (App settings › Basic) → env `WA_APP_SECRET`. **Verify token:** any random string → env `WA_VERIFY_TOKEN`.
6. **Webhook** (after workflow 03 is active):
   1. App › WhatsApp › Configuration.
   2. Callback URL `https://n8n.askhemant.ai/webhook/demo/whatsapp/inbound`, Verify token = `WA_VERIFY_TOKEN`.
   3. Click Verify and save.
   4. Under Webhook fields, subscribe to **messages**.
   - One app has one callback URL. Workflow 03 ignores messages addressed to any phone number other than its `wa_phone_number_id`, so your own number's chats are never answered by the demo bot.
7. **Templates:** submit everything in [`whatsapp-templates.md`](./whatsapp-templates.md).

### Anthropic (workflow 03 only)

Create an API key at console.anthropic.com. Use a separate key for demos, with a monthly spend limit (the strategy budgets about ₹500 a month of AI credits for demos). The model id is in workflow 03's Config (`ai_model`, default `claude-haiku-5-5`, effort `low`).

### Google

Create two spreadsheets in the Google account that n8n signs in with ([section 4](#4-google-sheets)). In n8n, the Google Sheets OAuth2 credential needs a Google Cloud OAuth client; n8n's credential screen shows the redirect URL to paste into Google Cloud.

### Tally and Cal.com

- **Tally** (kit calculator form): Integrations › Webhooks › Endpoint `https://n8n.askhemant.ai/webhook/askhemant/kit-signup`. Set a **signing secret** and put the same value in env `TALLY_SIGNING_SECRET`. Tally then signs each request with `Tally-Signature` (base64 HMAC-SHA256 of the body).
  - **Form fields:** build the form exactly as in [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §10.1: First name, WhatsApp number (phone field), Business type, Leads a month (`Under 20 · 20–40 · 40–100 · 100–500 · 500+`), and a separate, **unticked** consent checkbox mentioning WhatsApp tips and follow-ups. The test payload `demo/tally-kit-signup.json` uses those same labels.
  - **Hidden fields:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`. The website already passes these into the embed.
  - Fields are matched by **label**, so keep words like "first name", "WhatsApp", "business", "leads" and "tips" in the labels. The business type maps to a lane by its words: real estate / broker / channel partner / developer → RE; clinic / dental / skin / aesthetic / physio → CL; anything else → GEN.
- **Cal.com:** Settings › Developer › Webhooks. Subscriber URL `https://n8n.askhemant.ai/webhook/askhemant/calcom`; triggers **Booking created / rescheduled / cancelled**; Secret = env `CALCOM_WEBHOOK_SECRET` (checked against `X-Cal-Signature-256`).
  - Use the booking questions in [`sales/02-cal-com-intake-form.md`](../sales/02-cal-com-intake-form.md). Workflow 06 reads them by label: business, city or market, where leads come from, leads a month, first-reply speed, what to fix, budget, WhatsApp.
  - Workflow 06 sends a WhatsApp **confirmation** as well as the 2-hour reminder, so the WhatsApp question's help text must say so. `sales/02-cal-com-intake-form.md` Q8 currently says "For the 2-hour reminder only"; change it in Cal.com to: "We'll send your booking confirmation and a 2-hour reminder on WhatsApp. I won't add you to any list."
  - Red-route bookings (budget under ₹15K, under 20 leads a month, or "Other business") get a ROUTE note in `notes`, so you can send the Kit and the Ask Hemant Session link instead.
  - Event slugs `fit-call` and `ask-hemant-session` are labelled in Config `event_labels`.
  - The strategy notes that webhooks on Cal.com's free plan are **unverified**. If they aren't available, enter bookings in the Pipeline by hand.

### n8n credentials to create (names exactly as below)

| Credential name | Type | Fields | Used by |
|---|---|---|---|
| `WhatsApp Cloud API – AskHemant` | Header Auth | Name `Authorization`, Value `Bearer <system user token>` | 01, 05, 06 |
| `WhatsApp Cloud API – DEMO` | Header Auth | same (the same token works if one system user has both accounts) | 02, 03, 04 |
| `Anthropic API key` | Header Auth | Name `x-api-key`, Value `sk-ant-…` | 03 |
| `Google Sheets – AskHemant` | Google Sheets OAuth2 API | client ID / secret, then sign in | all |

After import, open any node with a credential warning and pick the matching credential from the list.

## 3. Environment variables

Generate random values with `openssl rand -hex 24`. Never commit them.

| Variable | Value | Why |
|---|---|---|
| `GENERIC_TIMEZONE`, `TZ` | `Asia/Kolkata` | 08:00 IST schedule, IST timestamps |
| `WEBHOOK_URL` | `https://n8n.askhemant.ai/` | n8n shows and registers the right public webhook URLs |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | `false` | Lets Code nodes read the secrets below. **n8n 2.x blocks this by default** |
| `NODE_FUNCTION_ALLOW_BUILTIN` | `crypto` | HMAC signature checks in Code nodes |
| `TALLY_SIGNING_SECRET` | same as in Tally | workflow 01 |
| `CALCOM_WEBHOOK_SECRET` | same as in Cal.com | workflow 06 |
| `WA_APP_SECRET` | Meta app secret | workflow 03 (`X-Hub-Signature-256`) |
| `WA_VERIFY_TOKEN` | random | workflow 03 GET handshake |
| `DEMO_WEBHOOK_KEY` | random (optional) | if set, workflows 02 and 04 require `x-demo-key` (or `?key=`) |
| `EXECUTIONS_DATA_PRUNE`, `EXECUTIONS_DATA_MAX_AGE` | `true`, `336` | Executions contain personal data; keep 14 days (DPDP data minimisation) |

If your n8n uses **external task runners** (a separate runners container, common on 2.x), the Code nodes run there: set `NODE_FUNCTION_ALLOW_BUILTIN` and `N8N_BLOCK_ENV_ACCESS_IN_NODE` and pass the secret variables to that container too. The error message in a failed execution names the missing piece.

Testing locally without secrets? Set `require_signature` to `false` in that workflow's Config node, and set it back before going live.

## 4. Google Sheets

**Do not rename or reorder header cells.** The workflows map columns by header name, and adding columns at the end is fine. Import each header row from `sheets/*.csv` (File › Import › Upload › Replace current sheet), freeze row 1, and format the `whatsapp` and `caller` columns as **Plain text** so the `+` stays.

### Spreadsheet 1: "AskHemant Pipeline" (ID → `{{GOOGLE_SHEET_ID}}`) · tab `Pipeline`

The strategy's pipeline tracker (§5): **date · source (UTM) · keyword · lane · business type · stage · value** come first, then the fields the workflows need.

```text
date,source,keyword,lane,business_type,stage,value,lead_id,first_name,whatsapp,email,leads_per_month,marketing_consent,consent_at,form,lead_received_at,first_reply_sent_at,seconds_to_reply,temperature,booking_event,booking_uid,booking_start,booked_at,booking_status,reminder_sent_at,updated_at,notes
```

| Column | Written by | Values |
|---|---|---|
| `date` | 01, 06 | first contact, `YYYY-MM-DD` IST |
| `source` | 01, 06 | UTM, e.g. `ig / dm / leaks`, or `direct`, `cal.com` |
| `keyword` | 01 | `LEAKS`, `PRICE`, `FOUNDING`, `CLINIC`, or `KIT` (the Stories/Lives DM keyword, `utm_campaign=story` or `kit`), from `utm_campaign` or a `keyword` hidden field. Until the clinic playbook exists, CLINIC sends the same kit |
| `lane` | 01, 06 | `RE` / `CL` / `GEN`, from business type: the day-60 niche decision runs on this |
| `stage` | 01 (New), 06 (Call booked), **you** | `New → Replied → Call booked → Showed → Proposal → Won / Lost`. The workflows only ever move a lead forward from New/Replied; everything later is yours |
| `value` | you | deal value in INR, excluding GST |
| `marketing_consent`, `consent_at` | 01, **you** | `yes` / `no` and when: the DPDP record of the unticked box. Set it to `stopped` by hand when someone replies STOP (below) |
| `lead_received_at`, `first_reply_sent_at`, `seconds_to_reply` | 01 | when n8n received the form → when WhatsApp accepted the welcome. Your own speed-to-lead number for the Build Log |
| `temperature` | 01, 06 | ICP fit from the form: `hot` = real estate or clinic with ≥40 leads a month, `warm` ≥20, else `cold`. It is a fit score, not buying intent |
| `booking_*`, `booked_at`, `reminder_sent_at` | 06 | Cal.com slug, uid, start (IST), `confirmed / rescheduled / cancelled` |
| `notes` | 01, 06 | appended, never overwritten: intake answers, routing note for budgets under ₹15K |

**When someone replies STOP on your number.** Replies to the AskHemant number land in your WhatsApp Business app (coexistence), not in a workflow, so recording an opt-out is your job, the same day: set that person's `marketing_consent` to `stopped` and add "STOP <date>" to `notes`. Workflow 06 then sends them no WhatsApp confirmation or reminder (the booking still lands in the Pipeline, with a note), and workflow 01 keeps `stopped` unless they tick the consent box on the kit form again. Don't WhatsApp them again unless they write to you first. Workflow 03 (DEMO) handles STOP by itself.

### Spreadsheet 2: "AskHemant DEMO Lab (fictional data)" (ID → `{{DEMO_SHEET_ID}}`)

| Tab | Header row (`sheets/…csv`) |
|---|---|
| `Demo_Leads` | `lead_id,business,demo_flag,lead_name,whatsapp,email,source,project,source_created_at,lead_received_at,first_reply_sent_at,seconds_to_reply,source_delay_seconds,wa_message_id,wa_status,temperature,stage,property_type,locality,budget,timeline,finance,purpose,summary,handover_reason,bot_paused,opted_out,visit_requested_at,booked_at,agent_alerted_at,last_inbound_id,last_message_at,history_json,updated_at,notes` |
| `Demo_Conversations` | `ts,lead_id,business,whatsapp,direction,message_id,text,route,temperature,handover,model,prompt_version,ai_error,demo_flag` |
| `Demo_Clinic_Calls` | `call_id,business,demo_flag,provider,caller,called_number,call_status,missed,call_received_at,text_back_sent_at,seconds_to_text_back,wa_message_id,wa_status,booking_link,notes` |

Keep demo data in its own spreadsheet, never in the Pipeline. `bot_paused = yes` means an agent has taken over that chat: clear it to switch the assistant back on. `Demo_Conversations` is the log for reviewing the first 100 AI conversations (strategy §5, delivery rules).

## 5. Fill the placeholders and import

| Token | Workflows | Value |
|---|---|---|
| `{{GOOGLE_SHEET_ID}}` | 01, 05, 06 | ID of "AskHemant Pipeline" (the part between `/d/` and `/edit` in its URL) |
| `{{WA_PHONE_NUMBER_ID}}` | 01, 05, 06 | Cloud API **phone number ID** (not the number) of your business number, from Meta App › WhatsApp › API Setup ([`docs/03`](../docs/03-accounts-setup-guide.md) §13). `{{WHATSAPP_NUMBER}}` in this README is the shared token for that business number itself; no workflow contains it |
| `{{ALERT_WHATSAPP_NUMBER}}` | 01, 05 (digest), 03 (agent alert in the demo) | Your personal WhatsApp in E.164, e.g. `+9198XXXXXXXX`, different from the sending number |
| `{{CALCULATOR_COPY_URL}}` | 01 | Upload `lead-magnet/lead-leak-calculator.xlsx` to Google Sheets, share it as "Anyone with the link: Viewer", and use `https://docs.google.com/spreadsheets/d/<ID>/copy` |
| `{{DEMO_SHEET_ID}}` | 02, 03, 04 | ID of the DEMO lab spreadsheet |
| `{{DEMO_WA_PHONE_NUMBER_ID}}` | 02, 03, 04 | Phone number ID of Meta's test number (same API Setup page) |
| `{{DEMO_TEST_NUMBERS}}` | 02, 03, 04 | Comma-separated E.164 numbers allowed to receive demo messages (your own phones) |

Either edit the Config node in each workflow after import, or fill everything in one pass and import the filled copies. Keep the filled copies **outside this repo**: the IDs aren't secrets, but they are private.

```bash
mkdir -p ~/askhemant-n8n && cd automations
for f in 0*.json; do
  sed -e 's/{{GOOGLE_SHEET_ID}}/PASTE_PIPELINE_SHEET_ID/g' \
      -e 's/{{WA_PHONE_NUMBER_ID}}/PASTE_PHONE_NUMBER_ID/g' \
      -e 's/{{ALERT_WHATSAPP_NUMBER}}/+9198XXXXXXXX/g' \
      -e 's#{{CALCULATOR_COPY_URL}}#https://docs.google.com/spreadsheets/d/PASTE_ID/copy#g' \
      -e 's/{{DEMO_SHEET_ID}}/PASTE_DEMO_SHEET_ID/g' \
      -e 's/{{DEMO_WA_PHONE_NUMBER_ID}}/PASTE_TEST_NUMBER_ID/g' \
      -e 's/{{DEMO_TEST_NUMBERS}}/+9198XXXXXXXX,+9197XXXXXXXX/g' "$f" > ~/askhemant-n8n/"$f"
done
grep -lE '\{\{(GOOGLE_SHEET_ID|WA_PHONE_NUMBER_ID|ALERT_WHATSAPP_NUMBER|CALCULATOR_COPY_URL|DEMO_[A-Z_]+)\}\}' ~/askhemant-n8n/*.json   # should print nothing
```

Then import:

- **In the editor:** Workflows › Add workflow › ⋯ › **Import from File**, once per file.
- **On the server:** `docker cp` the files into the container, then run `n8n import:workflow --input=/path/file.json` inside it.

Open each workflow, pick the credentials, check that **Settings › Timezone** is Asia/Kolkata, and **Activate** (on 2.x: **Publish**). Activate 03 before verifying the Meta webhook. Until a Config value is filled, the run stops at the first Code node with "Fill these in the Config node first: …".

Other Config values you may want to change:

- 02 / 03: `business_name`, `business_profile`, `agent_name`, `site_visit_booking_link`. Create a hidden Cal.com event `demo-site-visit` labelled DEMO, or point the link elsewhere.
- 04: `booking_link` (`demo-clinic-slot`) and `dedupe_minutes`.
- 06: `reminder_minutes_before`, `event_labels`.
- All: `wa_graph_version`, the Graph API version in the WhatsApp URLs (default `v26.0`, the newest in Meta's changelog on 18 Oct 2026). Meta keeps each version for about two years after the next one ships, and quietly serves calls to an expired version with the oldest live one. Once a quarter, check the [versions table](https://developers.facebook.com/docs/graph-api/changelog/versions); to move, change `wa_graph_version` in a DEMO workflow's Config node, run the demo tests, then change it in all six (or change `WA_DEFAULTS` in `tools/build-workflows.mjs`, rebuild and re-import).

## 6. Test with curl

The helper script does the substitutions and signing for you (`demo/README.md`):

```bash
export N8N_URL=https://n8n.askhemant.ai DEMO_TEST_NUMBER=+9198XXXXXXXX
./automations/demo/send-demo-lead.sh skyline-form          # → {"ok":true,…,"seconds_to_reply":…,"whatsapp":"accepted"}
```

The same requests by hand:

```bash
# 02: a DEMO lead (answers with the timing JSON)
curl -sS -X POST "$N8N_URL/webhook/demo/skyline/lead" -H 'Content-Type: application/json' \
  -d '{"full_name":"Riya Demo","whatsapp":"'"$DEMO_TEST_NUMBER"'","project":"Skyline Heights (DEMO)","whatsapp_opt_in":"yes"}'

# 03: Meta's verification handshake (expect the challenge back)
curl -sS "$N8N_URL/webhook/demo/whatsapp/inbound?hub.mode=subscribe&hub.verify_token=$WA_VERIFY_TOKEN&hub.challenge=12345"

# 04: a generic missed call
curl -sS -X POST "$N8N_URL/webhook/demo/smilecare/missed-call" -H 'Content-Type: application/json' \
  -d '{"caller":"'"$DEMO_TEST_NUMBER"'","status":"no-answer","call_id":"TEST-1"}'

# 04: Exotel style (GET); Twilio style (form-encoded POST)
curl -sS "$N8N_URL/webhook/demo/smilecare/missed-call?CallSid=T2&CallFrom=0${DEMO_TEST_NUMBER: -10}&DialCallStatus=no-answer"
curl -sS -X POST "$N8N_URL/webhook/demo/smilecare/missed-call" --data-urlencode "From=$DEMO_TEST_NUMBER" -d 'CallStatus=no-answer&CallSid=T3&AccountSid=TEST'
```

Workflows 01, 03 (POST) and 06 expect signed requests. Use the script with the secrets exported (`TALLY_SIGNING_SECRET=… ./send-demo-lead.sh kit-signup`), or set `require_signature = false` while testing. After each test, check three things: n8n › Executions (every node green, or a clear error), the new Sheet row, and the WhatsApp message on your phone.

**Telephony mappings** (workflow 04 detects the provider itself; check field names in your provider account):

| Provider | Configure | Fields read |
|---|---|---|
| Exotel | Passthru applet → URL (GET), after the Connect applet | `CallSid`, `CallFrom`, `CallTo`, `DialCallStatus` / `CallType` (`no-answer`, `busy`, `failed`, `call-attempt` = missed) |
| Knowlarity | Call-log push / webhook (POST JSON) | `caller_id`, `dispnumber`, `business_call_type` (`Missed`), `uuid` |
| Twilio | Number › StatusCallback (POST form) | `From`, `To`, `CallStatus` / `DialCallStatus` (`no-answer`, `busy`, `failed`, `canceled`), `CallSid` |
| Anything else | POST JSON | `caller`, `called`, `status` (`missed` / `no-answer` / `busy`), `call_id` |

## 7. Film the stopwatch demo (P03 "Watch the timer", P10 clinic)

1. **Set up:** workflows 02 and 03 active on the DEMO test number; your phone in `{{DEMO_TEST_NUMBERS}}` and in Meta's test recipients; your second phone (`{{ALERT_WHATSAPP_NUMBER}}`, which gets the agent alert) in Meta's test recipients too; templates approved; a fresh `Demo_Leads` row state (delete old rows for your number).
2. **Scene (OBS):**
   - Left: `demo/skyline-demo-form.html?hook=https://n8n.askhemant.ai/webhook/demo/skyline/lead`, in a phone-sized browser window.
   - Right: your phone's screen, mirrored (scrcpy for Android, QuickTime for iPhone), with WhatsApp open.
   - Top: a large on-screen stopwatch.
   - Overlay: the amber **DEMO – fictional business** badge, for the whole clip.
3. **One take, no cuts:** start the stopwatch as you tap **Send enquiry**, and stop it when the WhatsApp message appears. Then tap **Yes, ask me**, answer two questions, and ask for a Saturday visit. Show the agent alert arriving on your second phone.
4. **Then show the proof:**
   - The form's result box (n8n's own `seconds_to_reply`).
   - The `Demo_Leads` row.
   - The n8n execution list. Blur the phone numbers.

   That's the "Here's the real number" beat.
5. **Caption honestly:** "DEMO – fictional business. Skyline Realty isn't real; the timer is. Measured from the moment the lead reached the system, one take." Say that delivery time depends on the network, and that real lead sources such as portal alert emails can add delay before that point. **No result claims, and nothing about clients.**
6. **Clinic (P10):** run `./send-demo-lead.sh missed-call generic` while the phone shows WhatsApp, with the stopwatch from the moment of the "missed call". If you have Exotel or Twilio, use a real call to your demo number and let it ring out. `seconds_to_text_back` is logged in `Demo_Clinic_Calls`.
7. **Build Log #1 (P08):** film workflow 01 the same way with a real Tally test submission. Your own `seconds_to_reply` lands in the Pipeline, so it is case study #0's first real number. Delete test rows afterwards.

## 8. Check the files before you change anything

```bash
node automations/tools/build-workflows.mjs      # regenerate the JSON + sheets/*.csv (prompt from prompts/)
node automations/tools/validate-workflows.mjs   # structure, references, Code syntax, secret scan
node automations/tools/test-code-nodes.mjs      # 41 unit tests on the shipped Code-node code
```

If you edit a workflow inside n8n, export it (⋯ › Download) over the JSON here, and stop regenerating that file. Still run `validate-workflows.mjs` on the export before committing.

**Validation done for this version** (Sun 18 Oct 2026):

1. **Static:** all six files parse; ids and names are unique; every connection resolves; only core nodes are used; the secret scan is clean. The validator was also proven to catch planted faults.
2. **Import:** all six imported with `n8n import:workflow` into n8n **1.123.85**, and all six **activated**, including the same-path GET + POST webhooks in 03 and 04.
3. **Live run:**
   - **Setup:** the workflows ran in a real n8n 1.123.85 against a local mock of the WhatsApp and Anthropic APIs. Payloads came from `send-demo-lead.sh`, and the signature checks used real HMACs.
   - **Passed:** signed and unsigned requests (unsigned were rejected); the GET handshake (200 with the challenge, 403 on a wrong token); English and Hinglish templates; safety-list blocking; an API 400; the AI qualify → handover → agent alert path; STOP; an AI HTTP 500 and a refusal (fallback to a person); all four telephony formats; a Cal.com confirmation; and a **Wait that resumed at the scheduled time**.
   - **Mock checks:** the mock verified every outgoing request's shape (template parameters, Messages API body, no `temperature`, user-first/user-last turns).
   - **Both execution modes:** the full set passed in n8n's legacy Code sandbox and again with **task runners on** (the n8n 2.x mode, with `N8N_BLOCK_ENV_ACCESS_IN_NODE=false`). In both, signatures were verified against the raw body.
   - **Digest:** workflow 05 ran through `n8n execute`, with its Sheets read swapped for fictional rows in a test-only copy.
4. **Unit:** 41 tests on the Code nodes with synthetic Sheet rows, including the template-consistency check against `whatsapp-templates.json`, the keyword mapping, a hand-recorded STOP, repeat and late WhatsApp deliveries, fenced-JSON parsing and one Graph API version across all six Config nodes.
5. **Re-run after review** (same day, Graph API default now `v26.0`): validator and unit tests pass; all six files import with `n8n import:workflow` into a fresh n8n 1.123.85 user folder; the live set above passed again in both execution modes, with every WhatsApp call going to `/v26.0/…/messages`, a signed but 25-hour-old WhatsApp delivery getting no AI call and no free-form reply, and the Wait node resuming at its scheduled time (UTC-correct).
6. **Not run live:** the Google Sheets nodes. There was no Google account in the build environment, so every Sheets node errored on the missing credential, and the flows carried on as designed. Their parameters follow n8n's Google Sheets v4.5 node source; check that the first real rows land correctly.

## 9. Known limits and things to check

- **Graph API version.** Config uses `v26.0` (released 29 Jul 2026, the newest in Meta's changelog on 18 Oct 2026; its end date is not announced yet). Older copies of these files used `v21.0`, which Meta's versions table removes on **21 Jan 2027**: if you imported one, change `wa_graph_version` in all six Config nodes before then (section 5 has the steps). The template-submission command in `whatsapp-templates.md` uses the same version.
- **Coexistence** (WhatsApp Business app and API on one number) and Meta's test-number recipient limit are as Meta described them; check before you depend on them.
- **Raw Meta lead-ads webhooks** carry only a `leadgen_id`. Workflow 02 accepts leads already fetched from the Graph API or relayed with their fields. The fetch step is Sprint work.
- **Delivery and read receipts** are ignored. `first_reply_sent_at` is when the Cloud API **accepted** the message, and the phone shows delivery a moment later.
- **Google Sheets as the database** suits demo and solo volumes. Two messages from one lead within a second or two can race on `history_json`, and so can two copies of one webhook delivered at the same moment (the message-id check only sees ids already written to the Sheet). For client volumes, move the log to the client's CRM.
- **The AI qualifier** only words replies and extracts fields. It quotes no prices or availability (prompt rules), and code applies the safety rules. Review the first 100 conversations in `Demo_Conversations` before any client go-live.
- **Privacy.**
  - The DEMO lab holds only fictional leads and your own test phones.
  - Workflow 03 sends demo chats to Anthropic. Before reusing it for a client, list Anthropic and Meta as processors in that client's privacy notice.
  - Hemant's own funnel (01, 05, 06) sends nothing to an AI provider. Its processors (Tally, Cal.com, Google, Meta, Hostinger) are already in askhemant.ai/privacy.
- **Telephony field names** for Exotel and Knowlarity are the commonly documented ones and were not tested against live accounts.
- **Hostinger menu names and n8n UI labels** were not clicked through from here.
