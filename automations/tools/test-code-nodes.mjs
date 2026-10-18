#!/usr/bin/env node
/**
 * Unit tests for the Code nodes inside automations/0X-*.json, run outside n8n.
 *
 *   node automations/tools/test-code-nodes.mjs
 *
 * Each test takes a Code node's jsCode exactly as it ships in the workflow JSON and runs it
 * with a small stand-in for n8n ($input, $('Node'), $env, this.helpers, require). Sheet rows
 * are synthetic, so these tests cover the branches a live run can only reach with a real
 * Google Sheet: returning leads, chat history, dedupe, digest maths and booking matching.
 * All people and businesses here are fictional test data.
 */
import { createHmac } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEMO = join(DIR, 'demo');
const require = createRequire(import.meta.url);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const wfs = {};
for (const f of ['01-kit-signup-to-pipeline', '02-demo-speed-to-lead-first-reply', '03-demo-ai-qualifier-inbound', '04-demo-missed-call-text-back-clinic', '05-daily-owner-digest', '06-calcom-booking-to-pipeline']) {
  wfs[f.slice(0, 2)] = JSON.parse(readFileSync(join(DIR, f + '.json'), 'utf8'));
}
function configOf(wf, overrides = {}) {
  const c = wf.nodes.find((n) => n.name === 'Config');
  const cfg = {};
  for (const a of c.parameters.assignments.assignments) cfg[a.name] = a.value;
  const fill = {
    '{{GOOGLE_SHEET_ID}}': 'SHEET', '{{WA_PHONE_NUMBER_ID}}': '111', '{{ALERT_WHATSAPP_NUMBER}}': '+919800000009',
    '{{CALCULATOR_COPY_URL}}': 'https://docs.google.com/spreadsheets/d/TEST/copy', '{{DEMO_SHEET_ID}}': 'DEMO',
    '{{DEMO_WA_PHONE_NUMBER_ID}}': '222', '{{DEMO_TEST_NUMBERS}}': '+919800000001,+919800000009',
  };
  for (const k of Object.keys(cfg)) if (typeof cfg[k] === 'string' && fill[cfg[k]]) cfg[k] = fill[cfg[k]];
  return Object.assign(cfg, overrides);
}

/** Run one Code node. outputs: { 'Node name': [json, …] } for $('Node name'). */
async function run(wfKey, nodeName, { input = [{}], outputs = {}, env = {}, binary } = {}) {
  const node = wfs[wfKey].nodes.find((n) => n.name === nodeName);
  if (!node) throw new Error(`no node ${nodeName} in ${wfKey}`);
  const items = input.map((json, i) => ({ json, ...(i === 0 && binary ? { binary } : {}) }));
  const $input = { all: () => items, first: () => items[0], item: items[0] };
  const $ = (name) => {
    if (!(name in outputs)) throw new Error(`Referenced node "${name}" is unexecuted`);
    const arr = outputs[name].map((json) => ({ json }));
    return { first: () => arr[0], last: () => arr[arr.length - 1], all: () => arr, item: arr[0] };
  };
  const $env = new Proxy(env, { get: (t, k) => t[k] });
  const ctx = {
    helpers: {
      getBinaryDataBuffer: async (i, prop) => {
        const b = items[i].binary && items[i].binary[prop];
        if (!b) throw new Error('no binary');
        return Buffer.from(b.data, 'base64');
      },
    },
  };
  const req = (m) => { if (m === 'crypto') return require('crypto'); throw new Error(`Cannot find module '${m}'`); };
  const fn = new AsyncFunction('$input', '$', '$env', 'require', node.parameters.jsCode);
  const out = await fn.call(ctx, $input, $, $env, req);
  const result = (out || []).map((i) => i.json);
  collectTemplates(wfKey, result);
  return result;
}

/** Every WhatsApp template payload a Code node produces, for the consistency test at the end. */
const sentTemplates = [];
function collectTemplates(wfKey, value) {
  if (!value || typeof value !== 'object') return;
  if (value.type === 'template' && value.template && value.template.name) {
    const body = (value.template.components || []).find((c) => c.type === 'body');
    sentTemplates.push({ wf: wfKey, name: value.template.name, lang: value.template.language.code, params: body ? body.parameters.length : 0 });
    return;
  }
  for (const v of Object.values(value)) collectTemplates(wfKey, v);
}

let passed = 0, failed = 0;
const results = [];
async function test(name, fn) {
  try { await fn(); passed++; results.push(`ok   ${name}`); }
  catch (e) { failed++; results.push(`FAIL ${name}\n     ${e.message}`); }
}
function eq(a, b, msg) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); }
function ok(v, msg) { if (!v) throw new Error(msg); }
async function throwsLike(p, re, msg) {
  try { await p; } catch (e) { if (re.test(e.message)) return; throw new Error(`${msg}: wrong error "${e.message}"`); }
  throw new Error(`${msg}: did not throw`);
}
function fillDemo(file, vars = {}) {
  let t = readFileSync(join(DEMO, file), 'utf8');
  const v = { __TEST_NUMBER__: '+919800000001', __NOW__: new Date().toISOString(), __MSG_ID__: 'T1', __UNIX__: String(Math.floor(Date.now() / 1000)), __TEST_WA_ID__: '919800000001', __PHONE_NUMBER_ID__: '222', __TEXT__: 'hello', ...vars };
  for (const [k, val] of Object.entries(v)) t = t.split(k).join(val);
  return t;
}
const istIso = (d) => new Date(d.getTime() + 330 * 60000).toISOString().slice(0, 19) + '+05:30';

/* -------------------------------------------------- 01 */
const tallyRaw = fillDemo('tally-kit-signup.json');
const tallySig = createHmac('sha256', 'tally-secret').update(tallyRaw).digest('base64');
const tallyItem = (cfg, raw = tallyRaw, sig = tallySig) => ({
  input: [{ ...cfg, headers: sig ? { 'tally-signature': sig } : {}, body: JSON.parse(raw) }],
  binary: { data: { data: Buffer.from(raw).toString('base64'), mimeType: 'application/json' } },
  env: { TALLY_SIGNING_SECRET: 'tally-secret' },
});

await test('01 normalise: signed Tally payload → clean lead', async () => {
  const [l] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'])));
  eq(l.signature_check, 'valid (raw body)', 'signature');
  eq([l.first_name, l.whatsapp, l.business_type, l.lane, l.leads_per_month], ['Meera', '+919800000001', 'Real estate (broker, agent, channel partner, developer)', 'RE', '40–100'], 'fields');
  eq([l.marketing_consent, l.keyword, l.source, l.temperature, l.send_welcome], ['yes', 'LEAKS', 'ig / dm / leaks', 'hot', true], 'derived');
  eq(l.wa_welcome_payload.template.name, 'ah_kit_welcome', 'template');
  eq(l.wa_welcome_payload.to, '919800000001', 'to digits');
});
await test('01 normalise: bad signature is rejected', async () => {
  await throwsLike(run('01', 'Verify + normalise', tallyItem(configOf(wfs['01']), tallyRaw, 'AAAA')), /signature check failed: mismatch/, 'bad sig');
});
await test('01 normalise: missing secret is rejected with setup hint', async () => {
  const t = tallyItem(configOf(wfs['01'])); t.env = {};
  await throwsLike(run('01', 'Verify + normalise', t), /no secret: set TALLY_SIGNING_SECRET/, 'no secret');
});
await test('01 normalise: require_signature=false skips the check', async () => {
  const [l] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'], { require_signature: false }), tallyRaw, ''));
  ok(/not checked/.test(l.signature_check), 'not checked');
});
await test('01 normalise: unfilled Config placeholders stop the run', async () => {
  const cfg = configOf(wfs['01'], { calculator_url: '{{CALCULATOR_COPY_URL}}' });
  await throwsLike(run('01', 'Verify + normalise', tallyItem(cfg)), /Fill these in the Config node first: calculator_url/, 'placeholder');
});
await test('01 normalise: no consent → no welcome; local number → E.164; clinic lane', async () => {
  const body = JSON.parse(tallyRaw);
  const f = body.data.fields;
  f.find((x) => x.key === 'question_consent').value = [];
  f.find((x) => x.key === 'question_consent_opt_yes').value = false;
  f.find((x) => x.key === 'question_wa').value = '098000 00001';
  f.find((x) => x.key === 'question_bt').value = ['opt_cl'];
  f.find((x) => x.key === 'question_lpm').value = ['opt_20'];
  const [l] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'], { require_signature: false }), JSON.stringify(body), ''));
  eq([l.marketing_consent, l.send_welcome, l.whatsapp, l.lane, l.temperature], ['no', false, '+919800000001', 'CL', 'warm'], 'no-consent lead');
  ok(/no WhatsApp consent/.test(l.welcome_skip_reason), 'reason');
});
await test('01 normalise: utm_campaign maps to the keywords FOUNDING and KIT (story / kit)', async () => {
  for (const [campaign, kw] of [['founding', 'FOUNDING'], ['story', 'KIT'], ['kit', 'KIT'], ['price', 'PRICE'], ['clinic', 'CLINIC'], ['faq', '']]) {
    const body = JSON.parse(tallyRaw);
    body.data.fields.find((x) => x.key === 'question_utm_campaign').value = campaign;
    const [l] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'], { require_signature: false }), JSON.stringify(body), ''));
    eq(l.keyword, kw, campaign);
  }
});
await test('01 build row: a STOP recorded by hand survives a re-submission without consent', async () => {
  const body = JSON.parse(tallyRaw);
  body.data.fields.find((x) => x.key === 'question_consent').value = [];
  body.data.fields.find((x) => x.key === 'question_consent_opt_yes').value = false;
  const [lead] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'], { require_signature: false }), JSON.stringify(body), ''));
  const existing = { row_number: 3, lead_id: 'AH-STOP', whatsapp: '+919800000001', stage: 'Replied', marketing_consent: 'stopped', notes: '' };
  const [row] = await run('01', 'Build pipeline row', { input: [existing], outputs: { 'Verify + normalise': [lead] } });
  ok(!('marketing_consent' in row) && !('consent_at' in row), 'stopped is not overwritten by "no"');
});
await test('01 build row: new lead gets every Pipeline column, stage New, honest seconds_to_reply', async () => {
  const [lead] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'])));
  const stamp = { ...lead, welcome_ok: true, welcome_status: 'accepted', welcome_message_id: 'wamid.X', welcome_sent_ms: lead.lead_received_ms + 2340 };
  const [row] = await run('01', 'Build pipeline row', { input: [{ error: 'sheet down' }], outputs: { 'Verify + normalise': [lead], 'Stamp welcome': [stamp] } });
  const cols = readFileSync(join(DIR, 'sheets', 'pipeline.csv'), 'utf8').trim().split(',');
  eq(Object.keys(row), cols, 'column order matches sheets/pipeline.csv');
  eq([row.stage, row.seconds_to_reply, row.form], ['New', 2.3, 'kit_calculator'], 'values');
});
await test('01 build row: returning lead never resets stage or first-contact times', async () => {
  const [lead] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'])));
  const existing = { row_number: 7, lead_id: 'AH-OLD', whatsapp: '+919800000001', stage: 'Call booked', first_name: 'Meera', first_reply_sent_at: '2026-10-19T10:00:00+05:30', notes: 'first note' };
  const [row] = await run('01', 'Build pipeline row', { input: [existing], outputs: { 'Verify + normalise': [lead], 'Stamp welcome': [{ ...lead, welcome_ok: true, welcome_status: 'accepted', welcome_sent_ms: lead.lead_received_ms + 900 }] } });
  eq(row.lead_id, 'AH-OLD', 'same lead');
  ok(!('stage' in row) && !('first_reply_sent_at' in row) && !('lead_received_at' in row), 'untouched columns are absent');
  ok(row.notes.startsWith('first note | Re-submitted'), 'notes appended');
});
await test('01 build alert: flags a failed Sheet write', async () => {
  const [lead] = await run('01', 'Verify + normalise', tallyItem(configOf(wfs['01'])));
  const [a] = await run('01', 'Build alert', { input: [{ error: 'boom' }], outputs: { Config: [configOf(wfs['01'])], 'Verify + normalise': [lead], 'Build pipeline row': [{ stage: 'New' }], 'Stamp welcome': [{ welcome_status: 'accepted' }] } });
  const p = a.alert_payload.template.components[0].parameters.map((x) => x.text);
  eq(p.length, 8, '8 template variables');
  ok(/Sheet write FAILED/.test(p[7]), 'sheet failure shown');
  ok(p.every((t) => t && !/[\n\t]/.test(t)), 'no empty or multi-line params');
});

/* -------------------------------------------------- 02 */
const cfg02 = configOf(wfs['02']);
await test('02 normalise: website form → template payload + rendered history text', async () => {
  const [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, headers: {}, query: {}, body: JSON.parse(fillDemo('skyline-website-form-lead.json')) }] });
  eq([l.authorised, l.send_whatsapp, l.whatsapp, l.source, l.lang], [true, true, '+919800000001', 'website_form', 'en'], 'lead');
  eq(l.wa_payload.template.components[0].parameters.map((p) => p.text), ['Riya', 'Skyline Heights (DEMO)', 'Skyline Realty (DEMO)'], 'params');
  ok(l.rendered_first_reply.startsWith('Hi Riya, thanks for asking about Skyline Heights (DEMO)!'), 'rendered');
});
await test('02 normalise: Meta lead (field_data) → Hinglish template', async () => {
  const [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, body: JSON.parse(fillDemo('skyline-meta-lead-ads-relay.json')) }] });
  eq([l.source, l.lead_name, l.lang, l.wa_payload.template.language.code], ['meta_lead_ads', 'Arjun Demo', 'hi', 'hi'], 'meta lead');
});
await test('02 normalise: safety list, opt-in and raw leadgen webhooks block sending', async () => {
  const body = JSON.parse(fillDemo('skyline-website-form-lead.json'));
  let [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, allowed_recipients: '{{DEMO_TEST_NUMBERS}}', body }] });
  ok(!l.send_whatsapp && /allowed_recipients not set/.test(l.skip_reason), 'unset list blocks all');
  [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, body: { ...body, whatsapp_opt_in: 'no' } }] });
  ok(!l.send_whatsapp && /opt-in/.test(l.skip_reason), 'no opt-in');
  [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, body: { entry: [{ changes: [{ field: 'leadgen', value: { leadgen_id: '1' } }] }] } }] });
  ok(!l.send_whatsapp && /Graph API/.test(l.skip_reason), 'raw leadgen');
});
await test('02 normalise: wrong demo key → not authorised', async () => {
  const [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, headers: { 'x-demo-key': 'nope' }, body: {} }], env: { DEMO_WEBHOOK_KEY: 'right' } });
  eq(l.authorised, false, 'unauthorised');
});
await test('02 stamp: row matches sheets/demo_leads.csv and seeds history_json', async () => {
  const [l] = await run('02', 'Stamp + normalise lead', { input: [{ ...cfg02, body: JSON.parse(fillDemo('skyline-website-form-lead.json')) }] });
  const [row] = await run('02', 'Stamp reply + build row', { input: [{ statusCode: 200, body: { messages: [{ id: 'wamid.OK' }] } }], outputs: { Config: [cfg02], 'Stamp + normalise lead': [l] } });
  eq(Object.keys(row), readFileSync(join(DIR, 'sheets', 'demo_leads.csv'), 'utf8').trim().split(','), 'columns');
  eq([row.wa_status, row.stage, JSON.parse(row.history_json)[0].role], ['accepted', 'Qualifying', 'assistant'], 'row');
  ok(typeof row.seconds_to_reply === 'number', 'seconds is a number');
});

/* -------------------------------------------------- 03 */
const cfg03 = configOf(wfs['03']);
const inbound = (text, from = '919800000001') => JSON.parse(fillDemo('skyline-whatsapp-inbound-text.json', { __TEXT__: text, __TEST_WA_ID__: from }));
async function extract(text, opts = {}) {
  const raw = JSON.stringify(inbound(text, opts.from));
  const sig = 'sha256=' + createHmac('sha256', 'meta-secret').update(raw).digest('hex');
  return run('03', 'Verify + extract message', {
    input: [{ ...cfg03, headers: { 'x-hub-signature-256': opts.badSig ? 'sha256=00' : sig }, body: JSON.parse(raw) }],
    binary: { data: { data: Buffer.from(raw).toString('base64') } }, env: { WA_APP_SECRET: 'meta-secret' },
  });
}
await test('03 verify token: right token returns the challenge, wrong token does not', async () => {
  let [r] = await run('03', 'Check verify token', { input: [{ query: { 'hub.mode': 'subscribe', 'hub.verify_token': 'vt', 'hub.challenge': '42' } }], env: { WA_VERIFY_TOKEN: 'vt' } });
  eq([r.ok, r.challenge], [true, '42'], 'ok');
  [r] = await run('03', 'Check verify token', { input: [{ query: { 'hub.mode': 'subscribe', 'hub.verify_token': 'x', 'hub.challenge': '42' } }], env: { WA_VERIFY_TOKEN: 'vt' } });
  eq([r.ok, r.challenge], [false, ''], 'mismatch');
});
await test('03 extract: signed text message; statuses and strangers ignored; bad signature rejected', async () => {
  const [m] = await extract('2BHK in Baner');
  eq([m.wa_e164, m.text, m.profile_name], ['+919800000001', '2BHK in Baner', 'Riya Demo'], 'message');
  eq((await extract('hi', { from: '919800000077' })).length, 0, 'stranger ignored');
  await throwsLike(extract('hi', { badSig: true }), /signature check failed: mismatch/, 'bad sig');
  const status = { object: 'whatsapp_business_account', entry: [{ changes: [{ value: { metadata: { phone_number_id: '222' }, statuses: [{ id: 'wamid.X', status: 'delivered' }] } }] }] };
  eq((await run('03', 'Verify + extract message', { input: [{ ...cfg03, require_signature: false, body: status }] })).length, 0, 'status ignored');
});
const historyRow = (extra = {}) => ({
  row_number: 4, lead_id: 'SKY-1', whatsapp: '+919800000001', lead_name: 'Riya Demo', project: 'Skyline Heights (DEMO)', source: 'website_form',
  property_type: '2BHK', locality: '', bot_paused: 'no', opted_out: 'no', temperature: 'unknown', agent_alerted_at: '',
  history_json: JSON.stringify([{ role: 'assistant', text: 'Hi Riya, thanks for asking about Skyline Heights (DEMO)! May I ask 2 quick questions?' }, { role: 'user', text: 'Yes, ask me' }, { role: 'assistant', text: 'Which area works for you?' }]),
  ...extra,
});
await test('03 build request: history → valid Messages API body (user first and last, alternating, no temperature)', async () => {
  const [msg] = await extract('Baner, around 90 lakh');
  const [r] = await run('03', 'Build Claude request', { input: [historyRow({ row_number: 2, lead_id: 'OLD' }), historyRow()], outputs: { Config: [cfg03], 'Verify + extract message': [msg] } });
  const b = r.anthropic_body;
  eq([r.route, r.lead.lead_id, b.model], ['ai', 'SKY-1', 'claude-haiku-5-5'], 'latest row + model');
  eq(b.messages.map((m) => m.role), ['user', 'assistant', 'user', 'assistant', 'user'], 'roles');
  eq(b.messages[b.messages.length - 1].content, 'Baner, around 90 lakh', 'last turn');
  ok(!('temperature' in b) && b.output_config.format.type === 'json_schema' && b.output_config.effort === 'low', 'output config');
  ok(b.system[0].cache_control && /KNOWN ANSWERS: property_type: 2BHK/.test(b.system[1].text), 'system blocks');
});
await test('03 build request: duplicate delivery, opt-out, paused chat and STOP are handled in code', async () => {
  const [msg] = await extract('hello again');
  const o = { Config: [cfg03], 'Verify + extract message': [msg] };
  eq((await run('03', 'Build Claude request', { input: [historyRow({ last_inbound_id: msg.message_id })], outputs: o })).length, 0, 'duplicate');
  eq((await run('03', 'Build Claude request', { input: [historyRow({ opted_out: 'yes' })], outputs: o }))[0].route, 'silent', 'opted out');
  eq((await run('03', 'Build Claude request', { input: [historyRow({ bot_paused: 'yes' })], outputs: o }))[0].route, 'silent', 'paused');
  const [stop] = await extract('STOP');
  eq((await run('03', 'Build Claude request', { input: [historyRow()], outputs: { ...o, 'Verify + extract message': [stop] } }))[0].route, 'stop', 'stop');
});
await test('03 build request: repeat delivery found in history_json ids is skipped; a late delivery gets no free-form reply', async () => {
  const [msg] = await extract('hello again');
  const o = { Config: [cfg03], 'Verify + extract message': [msg] };
  const hist = JSON.parse(historyRow().history_json).concat([{ role: 'user', text: 'hello again', ids: msg.message_ids }, { role: 'assistant', text: 'Hi!' }]);
  eq((await run('03', 'Build Claude request', { input: [historyRow({ last_inbound_id: 'wamid.NEWER', history_json: JSON.stringify(hist) })], outputs: o })).length, 0, 'older retry skipped');
  const old = { ...msg, sent_ms: Date.now() - 25 * 3600000 };
  const [r] = await run('03', 'Build Claude request', { input: [historyRow()], outputs: { ...o, 'Verify + extract message': [old] } });
  eq([r.route, r.window_closed], ['silent', true], 'outside 24 h window');
  const [stopOld] = await extract('STOP');
  const req = (await run('03', 'Build Claude request', { input: [historyRow()], outputs: { ...o, 'Verify + extract message': [{ ...stopOld, sent_ms: Date.now() - 25 * 3600000 }] } }))[0];
  const d = (await run('03', 'Parse AI reply + decide', { input: [req], outputs: { Config: [cfg03], 'Build Claude request': [req] } }))[0];
  eq([d.send_reply, d.row.opted_out], [false, 'yes'], 'late STOP: opted out, no text sent');
});
function aiResponse(obj, stop = 'end_turn') {
  return { statusCode: 200, body: { stop_reason: stop, content: [{ type: 'thinking', thinking: '', signature: 's' }, ...(obj ? [{ type: 'text', text: JSON.stringify(obj) }] : [])] } };
}
const baseAi = { reply: 'What budget range works for you?', language: 'en', fields: { property_type: '', locality: 'Baner', budget: '', timeline: '', finance: '', purpose: '' }, next_field: 'budget', temperature: 'unknown', handover: false, handover_reason: 'none', wants_site_visit: false, opted_out: false, summary: '2BHK in Baner', confidence: 'high' };
async function parse(aiResp, row = historyRow(), text = 'Baner') {
  const [msg] = await extract(text);
  const [req] = await run('03', 'Build Claude request', { input: [row], outputs: { Config: [cfg03], 'Verify + extract message': [msg] } });
  const input = req.route === 'ai' ? [aiResp] : [req];
  return (await run('03', 'Parse AI reply + decide', { input, outputs: { Config: [cfg03], 'Build Claude request': [req] } }))[0];
}
await test('03 parse: normal turn merges fields (empty never erases), no handover, no alert', async () => {
  const d = await parse(aiResponse(baseAi));
  eq([d.send_reply, d.alert, d.row.locality, d.row.stage], [true, false, 'Baner', 'Qualifying'], 'decision');
  ok(!('property_type' in d.row), 'empty AI field does not erase the saved 2BHK');
  eq(JSON.parse(d.row.history_json).slice(-2).map((h) => h.role), ['user', 'assistant'], 'history appended');
  eq(d.transcript.map((t) => t.direction), ['in', 'out'], 'transcript');
});
await test('03 parse: site-visit request → hot, paused, one agent alert with summary and link', async () => {
  const d = await parse(aiResponse({ ...baseAi, reply: 'Book here: https://cal.com/askhemant/demo-site-visit', wants_site_visit: true, handover: true, handover_reason: 'site_visit_requested', temperature: 'hot' }));
  eq([d.alert, d.row.temperature, d.row.bot_paused, d.row.stage, d.row.handover_reason], [true, 'hot', 'yes', 'Handed over', 'site_visit_requested'], 'handover');
  ok(d.row.visit_requested_at && d.row.agent_alerted_at, 'timestamps');
  const p = d.alert_payload.template.components[0].parameters.map((x) => x.text);
  eq([d.alert_payload.template.name, p[2], p[5]], ['agent_hot_lead_alert', '+919800000001', 'https://cal.com/askhemant/demo-site-visit'], 'alert');
  const again = await parse(aiResponse({ ...baseAi, handover: true, handover_reason: 'hot_lead', temperature: 'hot' }), historyRow({ agent_alerted_at: '2026-10-19T10:00:00+05:30' }));
  eq(again.alert, false, 'alert only once per lead');
});
await test('03 parse: refusal, HTTP 500 and bad JSON fall back to a person', async () => {
  for (const r of [aiResponse(null, 'refusal'), { statusCode: 500, body: { error: { message: 'x' } } }, { statusCode: 200, body: { stop_reason: 'end_turn', content: [{ type: 'text', text: 'not json' }] } }]) {
    const d = await parse(r);
    ok(d.ai_error && d.alert && /will reply here shortly/.test(d.reply_payload.text.body) && d.row.handover_reason === 'ai_error', 'fallback for ' + JSON.stringify(r).slice(0, 40));
  }
});
await test('03 parse: JSON wrapped in a code fence is still read; an empty text block falls back to a person', async () => {
  const fenced = { statusCode: 200, body: { stop_reason: 'end_turn', content: [{ type: 'text', text: 'Here you go:\n```json\n' + JSON.stringify(baseAi) + '\n```' }] } };
  const d = await parse(fenced);
  eq([d.ai_error, d.row.locality, d.alert], ['', 'Baner', false], 'fenced JSON parsed');
  const e = await parse({ statusCode: 200, body: { stop_reason: 'end_turn', content: [{ type: 'thinking', thinking: '' }] } });
  eq([e.ai_error, e.row.handover_reason], ['no text block', 'ai_error'], 'no text block');
  const h = JSON.parse(d.row.history_json);
  ok(Array.isArray(h[h.length - 2].ids) && h[h.length - 2].ids.length, 'inbound message ids saved in history_json');
});
await test('03 parse: STOP sends one confirmation and opts out; new lead gets every column', async () => {
  const d = await parse(null, historyRow(), 'STOP');
  eq([d.row.opted_out, d.row.stage, d.alert], ['yes', 'Opted out', false], 'stop');
  const fresh = await parse(aiResponse(baseAi), { error: 'no rows' });
  eq(Object.keys(fresh.row), readFileSync(join(DIR, 'sheets', 'demo_leads.csv'), 'utf8').trim().split(','), 'new-lead columns');
});

/* -------------------------------------------------- 04 */
const cfg04 = configOf(wfs['04']);
const callCases = [
  ['generic', JSON.parse(fillDemo('smilecare-missed-call-generic.json')), {}],
  ['knowlarity', JSON.parse(fillDemo('smilecare-missed-call-knowlarity.json')), {}],
  ['twilio', Object.fromEntries(new URLSearchParams(fillDemo('smilecare-missed-call-twilio.form', { __TEST_NUMBER_URLENC__: '%2B919800000001' }).trim())), {}],
  ['exotel', {}, Object.fromEntries(new URLSearchParams(fillDemo('smilecare-missed-call-exotel.query', { __TEST_NUMBER_10__: '9800000001' }).trim()))],
];
await test('04 normalise: Exotel, Knowlarity, Twilio and generic payloads all map to one missed call', async () => {
  for (const [provider, body, query] of callCases) {
    const [c] = await run('04', 'Normalise call event', { input: [{ ...cfg04, headers: {}, query, body }] });
    eq([c.provider, c.caller_e164, c.missed, c.eligible], [provider, '+919800000001', true, true], provider);
    eq(c.wa_payload.template.name, 'clinic_missed_call', provider + ' template');
  }
});
await test('04 normalise: answered calls and unknown callers are not texted', async () => {
  let [c] = await run('04', 'Normalise call event', { input: [{ ...cfg04, body: { caller: '+919800000001', status: 'completed' } }] });
  ok(!c.missed && !c.eligible, 'answered');
  [c] = await run('04', 'Normalise call event', { input: [{ ...cfg04, body: { caller: '+919800000077', status: 'no-answer' } }] });
  ok(!c.eligible && /DEMO safety list/.test(c.skip_reason), 'not on list');
});
await test('04 dedupe: a caller texted 20 minutes ago is not texted again', async () => {
  const [c] = await run('04', 'Normalise call event', { input: [{ ...cfg04, body: { caller: '+919800000001', status: 'no-answer' } }] });
  const recent = { caller: '+919800000001', text_back_sent_at: istIso(new Date(Date.now() - 20 * 60000)) };
  eq((await run('04', 'Skip if texted recently', { input: [recent], outputs: { Config: [cfg04], 'Normalise call event': [c] } }))[0].text_back, false, '20 min ago');
  const old = { caller: '+919800000001', text_back_sent_at: istIso(new Date(Date.now() - 3 * 3600000)) };
  const [d] = await run('04', 'Skip if texted recently', { input: [old], outputs: { Config: [cfg04], 'Normalise call event': [c] } });
  ok(d.text_back && d.wa_payload, '3 h ago → text again, payload carried');
});

/* -------------------------------------------------- 05 */
await test('05 summarise: yesterday only, median, within 60 s, hot names, bookings, waiting', async () => {
  const now = new Date();
  const todayIst = istIso(now).slice(0, 10);
  const y = new Date(todayIst + 'T10:00:00+05:30'); y.setUTCDate(y.getUTCDate() - 1);
  const at = (h) => istIso(new Date(y.getTime() + h * 3600000));
  const rows = [
    { lead_id: 'A', first_name: 'Asha', lead_received_at: at(0), first_reply_sent_at: at(0), seconds_to_reply: 2, temperature: 'hot', lane: 'RE' },
    { lead_id: 'B', first_name: 'Bilal', lead_received_at: at(1), first_reply_sent_at: at(1), seconds_to_reply: 8, temperature: 'warm', lane: 'RE' },
    { lead_id: 'C', first_name: 'Chitra', lead_received_at: at(2), first_reply_sent_at: at(2), seconds_to_reply: 75, temperature: 'hot', lane: 'CL' },
    { lead_id: 'D', first_name: 'Dev', lead_received_at: at(3), first_reply_sent_at: '', seconds_to_reply: '', temperature: 'cold', lane: 'GEN', marketing_consent: 'yes' },
    { lead_id: 'E', first_name: 'Esha', lead_received_at: at(4), first_reply_sent_at: '', seconds_to_reply: '', marketing_consent: 'no', lane: 'RE' },
    { lead_id: 'F', first_name: 'Old', lead_received_at: at(-30), seconds_to_reply: 1, temperature: 'hot', booked_at: at(5) },
    { lead_id: 'G', first_name: 'Today', lead_received_at: istIso(now), seconds_to_reply: 1, temperature: 'hot' },
  ];
  const cfg = configOf(wfs['05']);
  const [d] = await run('05', 'Summarise yesterday', { input: rows, outputs: { Config: [cfg] } });
  const p = d.wa_payload.template.components[0].parameters.map((x) => x.text);
  eq(p.slice(2), ['5 (RE 3, CL 1, GEN 1)', '8 s', '2 of 3', '2 (Asha, Chitra)', '1', '1'], 'digest values');
  eq(d.to, '+919800000009', 'recipient');
});
await test('05 summarise: empty day respects send_when_empty; sheet error is reported', async () => {
  const cfg = configOf(wfs['05'], { send_when_empty: false });
  eq((await run('05', 'Summarise yesterday', { input: [{}], outputs: { Config: [cfg] } })).length, 0, 'nothing sent');
  await throwsLike(run('05', 'Summarise yesterday', { input: [{ error: 'forbidden' }], outputs: { Config: [configOf(wfs['05'])] } }), /Could not read the sheet/, 'sheet error');
});

/* -------------------------------------------------- 06 */
const cfg06 = configOf(wfs['06']);
function calItem(file, hours = 26, mutate) {
  const start = new Date(Date.now() + hours * 3600000);
  const body = JSON.parse(fillDemo(file, { __START__: start.toISOString(), __END__: new Date(start.getTime() + 1200000).toISOString() }));
  if (mutate) mutate(body);
  const raw = JSON.stringify(body);
  return {
    input: [{ ...cfg06, headers: { 'x-cal-signature-256': createHmac('sha256', 'cal-secret').update(raw).digest('hex') }, body }],
    binary: { data: { data: Buffer.from(raw).toString('base64') } }, env: { CALCOM_WEBHOOK_SECRET: 'cal-secret' },
  };
}
await test('06 normalise: signed booking → slug, label, IST time, intake answers', async () => {
  const [b] = await run('06', 'Verify + normalise booking', calItem('calcom-booking-created.json'));
  eq([b.event, b.slug, b.event_label, b.whatsapp, b.email], ['created', 'fit-call', 'free 20-min Fit Call', '+919800000001', 'meera.test@example.com'], 'booking');
  ok(/ IST$/.test(b.when_label) && b.start_ist.endsWith('+05:30'), 'IST labels');
  eq([b.intake.business_type, b.intake.lead_sources, b.intake.leads_per_month, b.intake.reply_speed, b.intake.fix_first, b.intake.budget], ['Real estate: broker or agent (India)', '99acres / MagicBricks / Housing.com, Meta (Facebook/Instagram) lead ads, Instagram DMs', '40–100', 'Same day', 'Enquiries that arrive after 9 pm', '₹15–40K (about $170–450)'], 'intake (labels from sales/02-cal-com-intake-form.md)');
  eq((await run('06', 'Verify + normalise booking', { ...calItem('calcom-booking-created.json', 26, (x) => { x.triggerEvent = 'PING'; }) })).length, 0, 'PING ignored');
});
async function match(rows, file = 'calcom-booking-created.json', hours = 26, mutate) {
  const [b] = await run('06', 'Verify + normalise booking', calItem(file, hours, mutate));
  return (await run('06', 'Match lead + build row', { input: rows, outputs: { Config: [cfg06], 'Verify + normalise booking': [b] } }))[0];
}
await test('06 match: kit lead found by email moves New → Call booked; reminder scheduled 2 h before', async () => {
  const { row, decision } = await match([{ lead_id: 'AH-1', email: 'meera.test@example.com', stage: 'New', notes: '' }]);
  eq([row.lead_id, row.stage, row.booking_status, row.whatsapp], ['AH-1', 'Call booked', 'confirmed', '+919800000001'], 'row');
  ok(decision.send_confirmation && decision.schedule_reminder, 'confirm + remind');
  const startMs = Date.parse(decision.start_iso);
  eq(Math.round((startMs - Date.parse(decision.reminder_at)) / 60000), 120, 'reminder 120 min before');
});
await test('06 match: later stages are never moved back; booking 1 h ahead gets no reminder', async () => {
  const { row, decision } = await match([{ lead_id: 'AH-2', whatsapp: '+919800000001', stage: 'Proposal' }], 'calcom-booking-created.json', 1);
  ok(!('stage' in row), 'stage untouched');
  ok(decision.send_confirmation && !decision.schedule_reminder, 'too close for a reminder');
});
await test('06 match: cancellation flags booking_status only; unknown attendee becomes a new full row', async () => {
  const c = await match([{ lead_id: 'AH-3', booking_uid: 'demo-booking-T1', stage: 'Call booked' }], 'calcom-booking-cancelled.json');
  eq([c.row.booking_status, 'stage' in c.row, c.decision.send_confirmation], ['cancelled', false, false], 'cancel');
  const n = await match([]);
  eq(Object.keys(n.row), readFileSync(join(DIR, 'sheets', 'pipeline.csv'), 'utf8').trim().split(','), 'new row columns');
  eq([n.row.stage, n.row.form, n.row.lane], ['Call booked', 'calcom_fit-call', 'RE'], 'new row values');
});
await test('06 match: red route (budget under ₹15K, or real estate / clinic under 20 leads) adds the Kit + Session note', async () => {
  const red = (k, v, more) => (x) => { x.payload.responses[k].value = v; if (more) x.payload.responses[more[0]].value = more[1]; };
  const cases = [
    ['budget under ₹15K', red('budget', 'Under ₹15K (under about $170)')],
    ['real estate, under 20 leads', red('leads-per-month', 'Under 20')],
    ['clinic, under 20 leads', red('leads-per-month', 'Under 20', ['business-type', 'Clinic: dental'])],
    ['Other business, budget under ₹15K', red('budget', 'Under ₹15K (under about $170)', ['business-type', 'Other business'])],
  ];
  for (const [k, mutate] of cases) {
    const { row } = await match([], 'calcom-booking-created.json', 26, mutate);
    ok(/ROUTE \(red\): .*Ask Hemant Session link \(₹1,999 \/ \$99\)/.test(row.notes), `${k}: ${row.notes}`);
  }
  const { row } = await match([]);
  ok(!/ROUTE/.test(row.notes), 'a fit lead gets no routing note');
});
await test('06 match: "Other business" with a budget of ₹15K or more is green-GEN (keep the Fit Call), even under 20 leads', async () => {
  for (const leads of ['40–100', 'Under 20']) {
    const { row } = await match([], 'calcom-booking-created.json', 26, (x) => { x.payload.responses['business-type'].value = 'Other business'; x.payload.responses['leads-per-month'].value = leads; });
    ok(!/ROUTE \(red\)|Ask Hemant Session/.test(row.notes), `${leads}: no red note: ${row.notes}`);
    ok(/ROUTE \(green-GEN\): keep the Fit Call; likely outcome is a Quick Win Build or an AI Build Scoping\./.test(row.notes), `${leads}: green-GEN note`);
    eq(row.lane, 'GEN', 'lane');
  }
});
await test('06 match: a lead who replied STOP (marketing_consent = stopped) gets no WhatsApp confirmation or reminder', async () => {
  const { row, decision } = await match([{ lead_id: 'AH-9', email: 'meera.test@example.com', stage: 'New', marketing_consent: 'stopped', notes: '' }]);
  eq([row.stage, decision.send_confirmation, decision.schedule_reminder], ['Call booked', false, false], 'no WhatsApp');
  ok(/replied STOP/.test(row.notes), 'note explains why');
});
await test('06 still booked?: sends only when uid, start and status still match', async () => {
  const { decision } = await match([{ lead_id: 'AH-1', email: 'meera.test@example.com', stage: 'New' }]);
  const live = { lead_id: 'AH-1', booking_uid: decision.booking_uid, booking_start: decision.booking_start, booking_status: 'confirmed', reminder_sent_at: '' };
  const o = { Config: [cfg06], 'Match lead + build row': [{ decision }] };
  const [r] = await run('06', 'Still booked?', { input: [live], outputs: o });
  eq(r.reminder_payload.template.name, 'ah_call_reminder_2h', 'reminder');
  eq((await run('06', 'Still booked?', { input: [{ ...live, booking_status: 'cancelled' }], outputs: o })).length, 0, 'cancelled');
  eq((await run('06', 'Still booked?', { input: [{ ...live, booking_uid: 'other' }], outputs: o })).length, 0, 'rescheduled');
  eq((await run('06', 'Still booked?', { input: [{ ...live, marketing_consent: 'stopped' }], outputs: o })).length, 0, 'STOP while waiting');
});

/* -------------------------------------------------- config */
await test('config: every workflow uses one Graph API version, newer than v21.0 (removed 21 Jan 2027)', async () => {
  const versions = Object.values(wfs).map((wf) => configOf(wf).wa_graph_version);
  eq(new Set(versions).size, 1, 'same version everywhere');
  const m = /^v(\d+)\.0$/.exec(versions[0]);
  ok(m && Number(m[1]) >= 22, `version ${versions[0]}`);
});

/* -------------------------------------------------- templates */
const TPL = JSON.parse(readFileSync(join(DIR, 'whatsapp-templates.json'), 'utf8')).templates;
await test('templates: every payload the workflows send matches whatsapp-templates.json (name, language, variable count)', async () => {
  ok(sentTemplates.length >= 8, 'collected payloads');
  for (const s of sentTemplates) {
    const t = TPL.find((x) => x.name === s.name && x.language === s.lang);
    ok(t, `no template ${s.name}/${s.lang} in whatsapp-templates.json`);
    const vars = new Set((t.components.find((c) => c.type === 'BODY').text.match(/{{\d+}}/g) || []));
    eq(s.params, vars.size, `${s.name}/${s.lang} variable count`);
    ok(t.used_by.includes(s.wf), `${s.name}/${s.lang} used_by should include ${s.wf}`);
  }
  for (const wf of Object.values(wfs)) {
    for (const a of wf.nodes.find((n) => n.name === 'Config').parameters.assignments.assignments) {
      if (/template$/.test(a.name)) ok(TPL.some((t) => t.name === a.value), `Config ${a.name} = ${a.value} is not in whatsapp-templates.json`);
    }
  }
});
await test("templates: Meta's format rules (names, sequential variables, not first or last, samples, lengths, opt-out)", async () => {
  const seen = new Set();
  for (const t of TPL) {
    const id = `${t.name}/${t.language}`;
    ok(!seen.has(id), `duplicate ${id}`); seen.add(id);
    ok(/^[a-z0-9_]{1,512}$/.test(t.name), `${id}: name must be lowercase letters, digits, underscores`);
    ok(['UTILITY', 'MARKETING'].includes(t.category), `${id}: category`);
    const body = t.components.find((c) => c.type === 'BODY');
    ok(body && body.text.length <= 1024, `${id}: body missing or over 1,024 characters`);
    const nums = (body.text.match(/{{(\d+)}}/g) || []).map((v) => Number(v.slice(2, -2)));
    const distinct = [...new Set(nums)];
    eq(distinct, distinct.map((_, i) => i + 1), `${id}: variables must be {{1}}..{{n}} in order`);
    ok(!/^\s*{{\d+}}/.test(body.text) && !/{{\d+}}\s*[.!?]?\s*$/.test(body.text), `${id}: a variable may not start or end the body`);
    ok(!/{{\d+}}\s*{{\d+}}/.test(body.text), `${id}: adjacent variables`);
    if (nums.length) eq(body.example.body_text[0].length, distinct.length, `${id}: one sample value per variable`);
    const footer = t.components.find((c) => c.type === 'FOOTER');
    if (footer) ok(footer.text.length <= 60, `${id}: footer over 60 characters`);
    const buttons = (t.components.find((c) => c.type === 'BUTTONS') || { buttons: [] }).buttons;
    ok(buttons.length <= 10 && buttons.every((b) => b.text.length <= 25), `${id}: buttons`);
    if (t.category === 'MARKETING') ok(/STOP/.test(body.text), `${id}: marketing templates carry a STOP opt-out`);
    ok(t.account !== 'demo' || !/askhemant/i.test(body.text), `${id}: demo templates must not name AskHemant`);
  }
});

console.log(results.join('\n'));
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
