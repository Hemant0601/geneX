#!/usr/bin/env node
/**
 * Generates the six importable n8n workflows in automations/ (01-…06-*.json).
 *
 *   node automations/tools/build-workflows.mjs
 *
 * Why a generator: the Code-node bodies below are real JavaScript functions, so a
 * syntax error fails here rather than inside n8n; the AI system prompt and JSON schema
 * are copied word for word from prompts/real-estate-qualifier.md; and node ids are
 * stable between runs, so diffs stay readable.
 *
 * The JSON files are the deliverable. If you change a workflow inside n8n, export it and
 * overwrite the JSON, and from then on edit that workflow in n8n, not here.
 *
 * Rules kept here (see automations/README.md):
 *  - Core nodes only: webhook, respondToWebhook, code, if, set, httpRequest, googleSheets,
 *    scheduleTrigger, wait, noOp.
 *  - No secret in any parameter. API tokens live in n8n credentials; webhook signing
 *    secrets are read with $env inside Code nodes only, and never written to output.
 *  - Non-secret settings sit in each workflow's "Config" node, as {{PLACEHOLDER}} tokens.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..');

/* ------------------------------------------------------------------ */
/* Small builders                                                       */
/* ------------------------------------------------------------------ */

function uuid(seed) {
  const h = createHash('sha1').update(seed).digest('hex');
  const v = (8 + (parseInt(h[16], 16) & 3)).toString(16);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-${v}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

/**
 * Turn a function into Code-node source: the helpers it uses first, then the function body.
 * Helpers are found by name (including helpers used by helpers), so a node can never miss one.
 * The second argument is kept for readability; anything listed there is included too.
 */
function code(fn, helpers = []) {
  const src = fn.toString();
  const body = src.slice(src.indexOf('{') + 1, src.lastIndexOf('}'));
  const registry = HELPERS();
  const needed = new Set(helpers.map((h) => h.name));
  let changed = true;
  while (changed) {
    changed = false;
    const haystack = body + [...needed].map((n) => registry[n].toString()).join('\n');
    for (const name of Object.keys(registry)) {
      if (!needed.has(name) && new RegExp(`\\b${name}\\s*\\(`).test(haystack)) { needed.add(name); changed = true; }
    }
  }
  const helperSrc = Object.keys(registry).filter((n) => needed.has(n)).map((n) => dedent(registry[n].toString())).join('\n\n');
  return (helperSrc ? helperSrc + '\n\n' : '') + dedent(body).trim() + '\n';
}

function dedent(text) {
  const lines = text.replace(/^\n+/, '').split('\n');
  const indents = lines.slice(1).filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l, i) => (i === 0 ? l.trimStart() : l.slice(Math.min(min, l.match(/^ */)[0].length)))).join('\n');
}

const CRED = {
  waOwn: { httpHeaderAuth: { id: 'ahWhatsAppOwn001', name: 'WhatsApp Cloud API – AskHemant' } },
  waDemo: { httpHeaderAuth: { id: 'ahWhatsAppDemo01', name: 'WhatsApp Cloud API – DEMO' } },
  anthropic: { httpHeaderAuth: { id: 'ahAnthropicKey01', name: 'Anthropic API key' } },
  sheets: { googleSheetsOAuth2Api: { id: 'ahGoogleSheets01', name: 'Google Sheets – AskHemant' } },
};

class Workflow {
  constructor(file, name, settings = {}) {
    this.file = file;
    this.name = name;
    this.nodes = [];
    this.connections = {};
    this.settings = {
      executionOrder: 'v1',
      timezone: 'Asia/Kolkata',
      saveDataErrorExecution: 'all',
      saveDataSuccessExecution: 'all',
      saveManualExecutions: true,
      callerPolicy: 'workflowsFromSameOwner',
      ...settings,
    };
  }
  add(name, type, typeVersion, position, parameters, extra = {}) {
    if (this.nodes.some((n) => n.name === name)) throw new Error(`${this.file}: duplicate node name ${name}`);
    this.nodes.push({ id: uuid(`${this.file}:${name}`), name, type, typeVersion, position, parameters, ...extra });
    return name;
  }
  connect(from, to, output = 0) {
    const c = (this.connections[from] ??= { main: [] });
    while (c.main.length <= output) c.main.push([]);
    c.main[output].push({ node: to, type: 'main', index: 0 });
  }
  chain(...names) {
    for (let i = 0; i < names.length - 1; i++) this.connect(names[i], names[i + 1]);
  }
  toJSON() {
    return {
      name: this.name,
      nodes: this.nodes,
      connections: this.connections,
      active: false,
      settings: this.settings,
      pinData: {},
      meta: { templateCredsSetupCompleted: false },
    };
  }
  write() {
    const path = join(OUT, this.file);
    writeFileSync(path, JSON.stringify(this.toJSON(), null, 2) + '\n');
    console.log(`wrote ${path} (${this.nodes.length} nodes)`);
  }
}

/* node factories -------------------------------------------------------- */

function webhook(wf, name, pos, { method, path, responseMode = 'onReceived', rawBody = false, notes }) {
  const options = rawBody ? { rawBody: true } : {};
  return wf.add(name, 'n8n-nodes-base.webhook', 2, pos,
    { httpMethod: method, path, responseMode, options },
    { webhookId: uuid(`webhook:${wf.file}:${name}`), ...(notes ? { notes } : {}) });
}

/**
 * Respond to Webhook. JSON is sent as text with an explicit Content-Type: on node version 1.1
 * (n8n 1.123) a "JSON" body built from an expression that reads node data came back empty in
 * our end-to-end test, while the same body sent as text arrived intact.
 */
function respond(wf, name, pos, { code: responseCode = 200, body, contentType = 'application/json; charset=utf-8' }) {
  const respondWith = 'text';
  const options = { responseCode, responseHeaders: { entries: [{ name: 'Content-Type', value: contentType }] } };
  const parameters = { respondWith, options };
  if (body !== undefined) parameters.responseBody = body;
  return wf.add(name, 'n8n-nodes-base.respondToWebhook', 1.1, pos, parameters);
}

function config(wf, pos, values, notes) {
  const assignments = Object.entries(values).map(([key, value]) => ({
    id: uuid(`${wf.file}:cfg:${key}`),
    name: key,
    value,
    type: typeof value === 'boolean' ? 'boolean' : typeof value === 'number' ? 'number' : 'string',
  }));
  return wf.add('Config', 'n8n-nodes-base.set', 3.4, pos,
    { mode: 'manual', assignments: { assignments }, includeOtherFields: true, options: {} },
    { notes: notes || 'Edit the values here (or replace the {{TOKENS}} in the JSON before import). Non-secret settings only.', notesInFlow: true });
}

function codeNode(wf, name, pos, js, extra = {}) {
  return wf.add(name, 'n8n-nodes-base.code', 2, pos, { mode: 'runOnceForAllItems', jsCode: js }, extra);
}

function ifTrue(wf, name, pos, expression, extra = {}) {
  return wf.add(name, 'n8n-nodes-base.if', 2, pos, {
    conditions: {
      options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
      conditions: [{
        id: uuid(`${wf.file}:${name}:cond`),
        leftValue: `={{ ${expression} }}`,
        rightValue: '',
        operator: { type: 'boolean', operation: 'true', singleValue: true },
      }],
      combinator: 'and',
    },
    options: {},
  }, extra);
}

/** POST a JSON body (an expression) to an API, never throwing on 4xx/5xx. */
function httpJson(wf, name, pos, { url, body, credentials, headers = [], timeout = 15000, notes }) {
  const parameters = {
    method: 'POST',
    url,
    authentication: 'genericCredentialType',
    genericAuthType: 'httpHeaderAuth',
    sendHeaders: headers.length > 0,
    sendBody: true,
    specifyBody: 'json',
    jsonBody: body,
    options: { timeout, response: { response: { fullResponse: true, neverError: true } } },
  };
  if (headers.length) parameters.headerParameters = { parameters: headers };
  else delete parameters.sendHeaders;
  return wf.add(name, 'n8n-nodes-base.httpRequest', 4.2, pos, parameters,
    { credentials, onError: 'continueRegularOutput', ...(notes ? { notes } : {}) });
}

const WA_URL = (cfg = "$('Config').first().json") =>
  `={{ ${cfg}.wa_api_base + '/' + ${cfg}.wa_graph_version + '/' + ${cfg}.wa_phone_number_id + '/messages' }}`;

function sheet(wf, name, pos, { operation, docExpr, tab, matchOn, filter, allMatches = false, alwaysOutput = false, notes }) {
  const parameters = {
    authentication: 'oAuth2',
    resource: 'sheet',
    operation,
    documentId: { __rl: true, mode: 'id', value: docExpr },
    sheetName: { __rl: true, mode: 'name', value: tab },
  };
  if (operation === 'read') {
    if (filter) parameters.filtersUI = { values: [{ lookupColumn: filter.column, lookupValue: filter.value }] };
    parameters.options = allMatches ? { returnAllMatches: 'returnAllMatches' } : {};
  } else {
    parameters.columns = {
      mappingMode: 'autoMapInputData',
      value: {},
      matchingColumns: matchOn ? [matchOn] : [],
      schema: [],
    };
    parameters.options = { cellFormat: 'RAW', handlingExtraData: 'ignoreIt' };
  }
  return wf.add(name, 'n8n-nodes-base.googleSheets', 4.5, pos, parameters, {
    credentials: CRED.sheets,
    onError: 'continueRegularOutput',
    ...(alwaysOutput ? { alwaysOutputData: true } : {}),
    ...(notes ? { notes } : {}),
  });
}

/* ------------------------------------------------------------------ */
/* Helpers copied into Code nodes (each node is self-contained)        */
/* ------------------------------------------------------------------ */

function istIso(d) {
  // ISO 8601 in India Standard Time, e.g. 2026-10-19T23:42:05+05:30
  const t = new Date((d instanceof Date ? d : new Date(d)).getTime() + 330 * 60000);
  return t.toISOString().slice(0, 19) + '+05:30';
}

function istDate(d) {
  return istIso(d).slice(0, 10);
}

function toE164(raw, defaultCc) {
  // Best-effort E.164 for India (+91) and UAE (+971) numbers. Returns '' if unsure.
  if (raw === undefined || raw === null) return '';
  let s = String(raw).trim().replace(/[\s\-().\/]/g, '');
  if (!s) return '';
  if (s.startsWith('00')) s = '+' + s.slice(2);
  const digits = s.replace(/\D/g, '');
  if (s.startsWith('+')) return /^[1-9]\d{7,14}$/.test(digits) ? '+' + digits : '';
  const cc = String(defaultCc || '91').replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]/.test(digits) && cc === '91') return '+91' + digits;
  if (digits.length === 11 && digits.startsWith('0') && /^[6-9]/.test(digits[1])) return '+91' + digits.slice(1);
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits[2])) return '+' + digits;
  if (digits.length === 10 && digits.startsWith('05')) return '+971' + digits.slice(1);
  if (digits.length === 9 && digits.startsWith('5') && cc === '971') return '+971' + digits;
  if (digits.length === 12 && digits.startsWith('9715')) return '+' + digits;
  return '';
}

function cleanParam(v, max) {
  // WhatsApp template parameters: no new lines or tabs, no 4+ spaces in a row, never empty.
  let s = v === undefined || v === null ? '' : String(v);
  s = s.replace(/[\r\n\t]+/g, ' ').replace(/ {4,}/g, '   ').trim();
  if (max && s.length > max) s = s.slice(0, max - 1).trimEnd() + '…';
  return s || '-';
}

function readEnv(name) {
  // $env is blocked by default on n8n 2.x (N8N_BLOCK_ENV_ACCESS_IN_NODE). Never throws.
  try {
    const v = $env[name];
    return v === undefined || v === null ? '' : String(v);
  } catch (e) {
    return '';
  }
}

function missingConfig(cfg, keys) {
  return keys.filter((k) => cfg[k] === undefined || cfg[k] === null || String(cfg[k]).trim() === '' || String(cfg[k]).includes('{{'));
}

function waTemplate(toE164Number, name, lang, params) {
  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: String(toE164Number).replace(/\D/g, ''),
    type: 'template',
    template: {
      name,
      language: { code: lang || 'en' },
      components: params.length ? [{ type: 'body', parameters: params.map((p) => ({ type: 'text', text: cleanParam(p, 900) })) }] : [],
    },
  };
}

function waText(toE164Number, text) {
  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: String(toE164Number).replace(/\D/g, ''),
    type: 'text',
    text: { preview_url: true, body: String(text).slice(0, 4000) },
  };
}

function waResult(r) {
  // Reads an HTTP Request node result (fullResponse + neverError) from the Cloud API.
  if (!r) return { ok: false, status: 'not sent', id: '' };
  if (r.error) return { ok: false, status: 'failed: ' + String(r.error.message || r.error).slice(0, 180), id: '' };
  const code = Number(r.statusCode || 0);
  const b = r.body || {};
  const id = b.messages && b.messages[0] && b.messages[0].id ? b.messages[0].id : '';
  if (code >= 200 && code < 300 && id) return { ok: true, status: 'accepted', id };
  const e = b.error || {};
  return { ok: false, status: `failed ${code || '?'}${e.code ? ' / ' + e.code : ''}: ${String(e.message || 'no message id').slice(0, 160)}`, id: '' };
}

function allowedSet(list, defaultCc) {
  // '*' = anyone; '' or an unfilled {{TOKEN}} = nobody (fail safe for demos).
  const s = String(list || '').trim();
  if (s === '*') return { any: true, set: new Set(), configured: true };
  if (!s || s.includes('{{')) return { any: false, set: new Set(), configured: false };
  return { any: false, set: new Set(s.split(/[,;\s]+/).map((n) => toE164(n, defaultCc)).filter(Boolean)), configured: true };
}

function newId(prefix) {
  const d = istDate(new Date()).replace(/-/g, '').slice(2);
  return `${prefix}-${d}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function laneOf(businessType) {
  const s = String(businessType || '').toLowerCase();
  if (/real\s*estate|realty|broker|property|channel\s*partner|developer/.test(s)) return 'RE';
  if (/clinic|dental|dentist|derm|aesthetic|physio|doctor|hospital|skin/.test(s)) return 'CL';
  return 'GEN';
}

function leadsMin(text) {
  const s = String(text || '').toLowerCase();
  if (!s) return null;
  if (/under|less than|below|<\s*\d/.test(s)) return 0;
  const m = s.replace(/,/g, '').match(/\d+/);
  return m ? Number(m[0]) : null;
}

function fitTemperature(lane, min) {
  // ICP fit from form answers (strategy §2: roughly 40-500 enquiries a month; under ~20 is too few).
  if (min === null || min === undefined) return 'unknown';
  if ((lane === 'RE' || lane === 'CL') && min >= 40) return 'hot';
  if ((lane === 'RE' || lane === 'CL') && min >= 20) return 'warm';
  if (lane === 'GEN' && min >= 40) return 'warm';
  return 'cold';
}

async function rawBodyOf(ctx, item, itemIndex) {
  // The exact bytes the sender signed. Needs the Webhook node option "Raw Body".
  try {
    if (item.binary && item.binary.data) {
      const buf = await ctx.helpers.getBinaryDataBuffer(itemIndex, 'data');
      if (buf && buf.length) return { raw: buf.toString('utf8'), how: 'raw' };
    }
  } catch (e) { /* fall through */ }
  try {
    const b = item.binary && item.binary.data;
    if (b && typeof b.data === 'string' && b.data.length > 0 && !b.id) return { raw: Buffer.from(b.data, 'base64').toString('utf8'), how: 'raw' };
  } catch (e) { /* fall through */ }
  return { raw: JSON.stringify((item.json && item.json.body) || {}), how: 'reserialised' };
}

async function checkSignature(ctx, item, opts) {
  // opts: { required, secretEnv, header, prefix, encoding }
  if (!opts.required) return { ok: true, status: 'not checked (Config require_signature = false)' };
  const secret = readEnv(opts.secretEnv);
  if (!secret) return { ok: false, status: `no secret: set ${opts.secretEnv} in the n8n environment (and N8N_BLOCK_ENV_ACCESS_IN_NODE=false on n8n 2.x), or set require_signature = false in Config while testing` };
  let crypto;
  try { crypto = require('crypto'); } catch (e) {
    return { ok: false, status: 'the crypto module is blocked: set NODE_FUNCTION_ALLOW_BUILTIN=crypto in the n8n environment' };
  }
  const headers = (item.json && item.json.headers) || {};
  let received = String(headers[opts.header] || headers[opts.header.toLowerCase()] || '').trim();
  if (!received) return { ok: false, status: `missing ${opts.header} header` };
  if (opts.prefix && received.startsWith(opts.prefix)) received = received.slice(opts.prefix.length);
  const { raw, how } = await rawBodyOf(ctx, item, 0);
  const expected = crypto.createHmac('sha256', secret).update(raw, 'utf8').digest(opts.encoding);
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { ok, status: ok ? `valid (${how} body)` : `mismatch (${how} body${how === 'reserialised' ? ': turn on Raw Body in the Webhook node' : ''})` };
}

function fmtWhen(iso, tz) {
  const zone = tz || 'Asia/Kolkata';
  const d = new Date(iso);
  let s;
  try {
    s = new Intl.DateTimeFormat('en-IN', { timeZone: zone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true }).format(d);
  } catch (e) {
    s = istIso(d).replace('T', ' ').slice(0, 16);
    return s + ' IST';
  }
  const label = zone === 'Asia/Kolkata' || zone === 'Asia/Calcutta' ? 'IST' : zone === 'Asia/Dubai' ? 'UAE time' : zone.split('/').pop().replace(/_/g, ' ') + ' time';
  return `${s.replace(/\s+/g, ' ')} ${label}`;
}

function HELPERS() {
  return { istIso, istDate, toE164, cleanParam, readEnv, missingConfig, waTemplate, waText, waResult, allowedSet, newId, laneOf, leadsMin, fitTemperature, rawBodyOf, checkSignature, fmtWhen };
}

/* ------------------------------------------------------------------ */
/* Prompt + schema for workflow 03 (single source of truth: the .md)   */
/* ------------------------------------------------------------------ */

const promptMd = readFileSync(join(OUT, 'prompts', 'real-estate-qualifier.md'), 'utf8');
function block(marker) {
  const m = promptMd.match(new RegExp(`<!-- ${marker}:START -->\\s*\`\`\`\\w*\\n([\\s\\S]*?)\\n\`\`\`\\s*<!-- ${marker}:END -->`));
  if (!m) throw new Error(`prompts/real-estate-qualifier.md: ${marker} block not found`);
  return m[1];
}
const QUALIFIER_PROMPT = block('PROMPT');
const QUALIFIER_SCHEMA = JSON.parse(block('SCHEMA'));
const PROMPT_VERSION = (promptMd.match(/`(real-estate-qualifier v[\d.]+)`/) || [])[1];
if (!PROMPT_VERSION) throw new Error('prompt version not found');

/* Shared column lists (keep in sync with automations/sheets/*.csv) ---- */

const PIPELINE_COLUMNS = ['date', 'source', 'keyword', 'lane', 'business_type', 'stage', 'value', 'lead_id', 'first_name', 'whatsapp', 'email', 'leads_per_month', 'marketing_consent', 'consent_at', 'form', 'lead_received_at', 'first_reply_sent_at', 'seconds_to_reply', 'temperature', 'booking_event', 'booking_uid', 'booking_start', 'booked_at', 'booking_status', 'reminder_sent_at', 'updated_at', 'notes'];
const DEMO_LEAD_COLUMNS = ['lead_id', 'business', 'demo_flag', 'lead_name', 'whatsapp', 'email', 'source', 'project', 'source_created_at', 'lead_received_at', 'first_reply_sent_at', 'seconds_to_reply', 'source_delay_seconds', 'wa_message_id', 'wa_status', 'temperature', 'stage', 'property_type', 'locality', 'budget', 'timeline', 'finance', 'purpose', 'summary', 'handover_reason', 'bot_paused', 'opted_out', 'visit_requested_at', 'booked_at', 'agent_alerted_at', 'last_inbound_id', 'last_message_at', 'history_json', 'updated_at', 'notes'];
const DEMO_CONVERSATION_COLUMNS = ['ts', 'lead_id', 'business', 'whatsapp', 'direction', 'message_id', 'text', 'route', 'temperature', 'handover', 'model', 'prompt_version', 'ai_error', 'demo_flag'];
const DEMO_CALL_COLUMNS = ['call_id', 'business', 'demo_flag', 'provider', 'caller', 'called_number', 'call_status', 'missed', 'call_received_at', 'text_back_sent_at', 'seconds_to_text_back', 'wa_message_id', 'wa_status', 'booking_link', 'notes'];
export const COLUMNS = { Pipeline: PIPELINE_COLUMNS, Demo_Leads: DEMO_LEAD_COLUMNS, Demo_Conversations: DEMO_CONVERSATION_COLUMNS, Demo_Clinic_Calls: DEMO_CALL_COLUMNS };

/** Turns a code body that contains the literal token __COLUMNS_X__ into real JSON. */
function withConst(js, name, value) {
  return js.split(name).join(JSON.stringify(value));
}

/**
 * WhatsApp Cloud API base and Graph API version, copied into every workflow's Config node.
 * v26.0 (29 Jul 2026) is the newest version in Meta's changelog on 18 Oct 2026; v21.0 is removed
 * on 21 Jan 2027. Meta keeps each version for about 2 years after the NEXT one ships, and calls
 * to an expired version are silently served by the oldest live one. To move versions: check
 * developers.facebook.com/docs/graph-api/changelog/versions, change it here, rebuild, and test
 * on the DEMO workflows first (or edit wa_graph_version in each Config node after import).
 */
const WA_DEFAULTS = { wa_api_base: 'https://graph.facebook.com', wa_graph_version: 'v26.0' };

/* ================================================================== */
/* 01  Kit sign-up → Pipeline (case study #0)                         */
/* ================================================================== */

function build01() {
  const wf = new Workflow('01-kit-signup-to-pipeline.json', 'AskHemant 01 · Kit sign-up → Pipeline + WhatsApp (case study #0)');
  const W = webhook(wf, 'Tally webhook', [0, 300], {
    method: 'POST', path: 'askhemant/kit-signup', rawBody: true,
    notes: 'Tally form (askhemant.ai/kit calculator) → Integrations → Webhooks → this Production URL. Add a signing secret in Tally and the same value as TALLY_SIGNING_SECRET in n8n.',
  });
  const C = config(wf, [220, 300], {
    pipeline_sheet_id: '{{GOOGLE_SHEET_ID}}',
    pipeline_tab: 'Pipeline',
    ...WA_DEFAULTS,
    wa_phone_number_id: '{{WA_PHONE_NUMBER_ID}}',
    alert_whatsapp_number: '{{ALERT_WHATSAPP_NUMBER}}',
    calculator_url: '{{CALCULATOR_COPY_URL}}',
    welcome_template: 'ah_kit_welcome',
    welcome_template_lang: 'en',
    alert_template: 'ah_internal_new_lead',
    alert_template_lang: 'en',
    default_country_code: '91',
    require_signature: true,
  });

  const normalise = async function () {
    const item = $input.first();
    const cfg = item.json;
    const missing = missingConfig(cfg, ['pipeline_sheet_id', 'wa_phone_number_id', 'alert_whatsapp_number', 'calculator_url']);
    if (missing.length) throw new Error('Fill these in the Config node first: ' + missing.join(', '));

    const sig = await checkSignature(this, item, {
      required: cfg.require_signature !== false, secretEnv: 'TALLY_SIGNING_SECRET',
      header: 'tally-signature', prefix: '', encoding: 'base64',
    });
    if (!sig.ok) throw new Error('Tally signature check failed: ' + sig.status);

    const now = new Date();
    const body = cfg.body || {};
    const data = body.data || {};
    const fields = Array.isArray(data.fields) ? data.fields : [];

    function text(f) {
      if (!f) return '';
      const v = f.value;
      const opts = Array.isArray(f.options) ? f.options : [];
      const label = (id) => {
        const o = opts.find((x) => x.id === id);
        return o ? String(o.text ?? o.name ?? id) : String(id);
      };
      if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? label(x) : (x && (x.text || x.name)) || '')).filter(Boolean).join(', ');
      if (typeof v === 'boolean') return v ? 'yes' : '';
      if (v && typeof v === 'object') return String(v.text || v.name || '');
      if (typeof v === 'string' && opts.length) return label(v);
      return v === undefined || v === null ? '' : String(v).trim();
    }
    const find = (re, types) => fields.find((f) => re.test(String(f.label || '')) && (!types || types.includes(f.type)));
    const hidden = (name) => {
      const f = fields.find((x) => x.type === 'HIDDEN_FIELDS' && String(x.label || '').toLowerCase() === name);
      return f ? text(f) : '';
    };
    const CHOICE = ['DROPDOWN', 'MULTIPLE_CHOICE', 'MULTI_SELECT', 'INPUT_TEXT', 'INPUT_NUMBER', 'RANKING'];

    const firstName = text(find(/first\s*name|^name$|your name/i, ['INPUT_TEXT'])).split(/\s+/)[0] || '';
    const phoneField = fields.find((f) => f.type === 'INPUT_PHONE_NUMBER') || find(/whats\s*app|phone|mobile/i, ['INPUT_TEXT', 'INPUT_NUMBER']);
    const whatsapp = toE164(text(phoneField), cfg.default_country_code);
    const businessType = text(find(/business|industry|what do you (sell|do)/i, CHOICE));
    const leadsPerMonth = text(find(/lead|enquir/i, CHOICE));
    const consentField = find(/consent|tips|follow.?up|agree|opt.?in|updates/i, ['CHECKBOXES', 'CHECKBOX', 'MULTIPLE_CHOICE']);
    const consentText = text(consentField).toLowerCase();
    const consent = !!consentText && !/^(no|false|0)$/.test(consentText);

    const utm = { source: hidden('utm_source'), medium: hidden('utm_medium'), campaign: hidden('utm_campaign'), content: hidden('utm_content') };
    // Comment keywords LEAKS / PRICE / FOUNDING / CLINIC; the DM keyword KIT (Stories, Lives) sends
    // utm_campaign=story, and the Story link sticker sends utm_campaign=kit (instagram/07 §2.4).
    let keyword = hidden('keyword').toUpperCase();
    if (!keyword) {
      if (/leak/i.test(utm.campaign)) keyword = 'LEAKS';
      else if (/price/i.test(utm.campaign)) keyword = 'PRICE';
      else if (/founding/i.test(utm.campaign)) keyword = 'FOUNDING';
      else if (/clinic/i.test(utm.campaign)) keyword = 'CLINIC';
      else if (/^(story|kit)$/i.test(utm.campaign)) keyword = 'KIT';
    }
    const lane = laneOf(businessType);
    const min = leadsMin(leadsPerMonth);

    let skip = '';
    if (!consent) skip = 'not sent: no WhatsApp consent';
    else if (!whatsapp) skip = 'not sent: WhatsApp number unreadable';

    const lead = {
      lead_id: newId('AH'),
      date: istDate(now),
      source: [utm.source, utm.medium, utm.campaign].filter(Boolean).join(' / ') || 'direct',
      keyword,
      lane,
      business_type: businessType,
      first_name: firstName,
      whatsapp,
      whatsapp_raw: text(phoneField),
      leads_per_month: leadsPerMonth,
      marketing_consent: consent ? 'yes' : 'no',
      consent_at: consent ? istIso(now) : '',
      form: 'kit_calculator',
      lead_received_at: istIso(now),
      lead_received_ms: now.getTime(),
      temperature: fitTemperature(lane, min),
      tally_submission_id: String(data.submissionId || data.responseId || ''),
      signature_check: sig.status,
      send_welcome: !skip,
      welcome_skip_reason: skip,
      wa_welcome_payload: skip ? null : waTemplate(whatsapp, cfg.welcome_template, cfg.welcome_template_lang, [firstName || 'there', cfg.calculator_url]),
    };
    return [{ json: lead }];
  };
  const N = codeNode(wf, 'Verify + normalise', [440, 300],
    code(normalise, [istIso, istDate, toE164, cleanParam, readEnv, missingConfig, waTemplate, newId, laneOf, leadsMin, fitTemperature, rawBodyOf, checkSignature]),
    { notes: 'Checks the Tally-Signature header, then turns the Tally payload into one clean lead (first name, E.164 WhatsApp, business type, leads a month, consent, UTMs).' });

  const IFW = ifTrue(wf, 'Send welcome?', [660, 300], '$json.send_welcome === true',
    { notes: 'Only people who ticked the separate, unticked consent box get a WhatsApp welcome (DPDP).' });
  const SEND = httpJson(wf, 'WhatsApp: welcome template', [880, 200], {
    url: WA_URL(), credentials: CRED.waOwn,
    body: '={{ JSON.stringify($json.wa_welcome_payload) }}',
  });
  const stamp = function () {
    const sentMs = Date.now();
    const lead = $('Verify + normalise').first().json;
    const res = waResult($input.first().json);
    return [{ json: Object.assign({}, lead, { welcome_ok: res.ok, welcome_status: res.status, welcome_message_id: res.id, welcome_sent_ms: sentMs }) }];
  };
  const ST = codeNode(wf, 'Stamp welcome', [1100, 200], code(stamp, [waResult]),
    { notes: 'Takes the timestamp right after the API call, so seconds_to_reply is honest.' });
  const FIND = sheet(wf, 'Find lead by WhatsApp', [1320, 300], {
    operation: 'read',
    docExpr: "={{ $('Config').first().json.pipeline_sheet_id }}",
    tab: 'Pipeline',
    filter: { column: 'whatsapp', value: "={{ $json.whatsapp || '__none__' }}" },
    alwaysOutput: true,
  });

  const buildRow = function () {
    const lead = $('Verify + normalise').first().json;
    const now = new Date();
    let w = null;
    if (lead.send_welcome) {
      try { w = $('Stamp welcome').first().json; } catch (e) { w = null; }
    }
    const welcomeStatus = lead.send_welcome ? (w ? w.welcome_status : 'failed: no API result') : lead.welcome_skip_reason;
    const sentAt = w && w.welcome_ok ? istIso(new Date(w.welcome_sent_ms)) : '';
    const secs = w && w.welcome_ok ? Math.round((w.welcome_sent_ms - lead.lead_received_ms) / 100) / 10 : '';

    const found = $input.all().map((i) => i.json)
      .find((r) => r && r.lead_id && lead.whatsapp && String(r.whatsapp || '').trim() === lead.whatsapp);
    const note = `Kit sign-up ${lead.date}. Welcome: ${welcomeStatus}.` + (lead.whatsapp ? '' : ` WhatsApp number unreadable ("${lead.whatsapp_raw}").`);

    let row;
    if (found) {
      row = {
        lead_id: found.lead_id,
        business_type: lead.business_type || found.business_type,
        lane: lead.lane,
        leads_per_month: lead.leads_per_month || found.leads_per_month,
        marketing_consent: lead.marketing_consent,
        consent_at: lead.consent_at,
        temperature: lead.temperature,
        updated_at: istIso(now),
        notes: (found.notes ? found.notes + ' | ' : '') + 'Re-submitted: ' + note,
      };
      // A STOP recorded by hand (marketing_consent = stopped) stays until the person ticks the box again.
      if (/^stop/i.test(String(found.marketing_consent || '').trim()) && lead.marketing_consent !== 'yes') {
        delete row.marketing_consent;
        delete row.consent_at;
      }
      if (!found.first_name && lead.first_name) row.first_name = lead.first_name;
      if (!found.first_reply_sent_at && sentAt) { row.first_reply_sent_at = sentAt; row.seconds_to_reply = secs; }
    } else {
      row = {};
      for (const col of __PIPELINE_COLUMNS__) row[col] = '';
      Object.assign(row, {
        date: lead.date, source: lead.source, keyword: lead.keyword, lane: lead.lane,
        business_type: lead.business_type, stage: 'New', lead_id: lead.lead_id,
        first_name: lead.first_name, whatsapp: lead.whatsapp, leads_per_month: lead.leads_per_month,
        marketing_consent: lead.marketing_consent, consent_at: lead.consent_at, form: lead.form,
        lead_received_at: lead.lead_received_at, first_reply_sent_at: sentAt, seconds_to_reply: secs,
        temperature: lead.temperature, updated_at: istIso(now), notes: note,
      });
    }
    return [{ json: row }];
  };
  const BR = codeNode(wf, 'Build pipeline row', [1540, 300],
    withConst(code(buildRow, [istIso]), '__PIPELINE_COLUMNS__', PIPELINE_COLUMNS),
    { notes: 'New lead: full row with stage New. Returning lead: updates only the kit fields, never the stage or first-contact times.' });
  const UP = sheet(wf, 'Upsert Pipeline row', [1760, 300], {
    operation: 'appendOrUpdate', matchOn: 'lead_id',
    docExpr: "={{ $('Config').first().json.pipeline_sheet_id }}", tab: 'Pipeline',
  });

  const buildAlert = function () {
    const cfg = $('Config').first().json;
    const lead = $('Verify + normalise').first().json;
    const row = $('Build pipeline row').first().json;
    let w = null;
    try { w = $('Stamp welcome').first().json; } catch (e) { w = null; }
    const isNew = row.stage === 'New';
    const welcome = lead.send_welcome ? (w ? w.welcome_status : 'failed') : lead.welcome_skip_reason;
    const sheetResult = $input.first().json;
    const sheetOk = !(sheetResult && sheetResult.error);
    const payload = waTemplate(cfg.alert_whatsapp_number, cfg.alert_template, cfg.alert_template_lang, [
      isNew ? 'new' : 'returning',
      lead.first_name || 'no name',
      lead.business_type || 'not given',
      lead.leads_per_month || 'not given',
      lead.lane,
      lead.marketing_consent,
      lead.source,
      welcome + (sheetOk ? '' : ' (Sheet write FAILED: check n8n)'),
    ]);
    return [{ json: { alert_payload: payload } }];
  };
  const BA = codeNode(wf, 'Build alert', [1980, 300], code(buildAlert, [cleanParam, waTemplate]));
  const AL = httpJson(wf, 'WhatsApp: alert Hemant', [2200, 300], {
    url: WA_URL(), credentials: CRED.waOwn,
    body: '={{ JSON.stringify($json.alert_payload) }}',
    notes: 'Utility template to Hemant\'s personal WhatsApp (must be a different number from the business number).',
  });

  wf.chain(W, C, N, IFW);
  wf.connect(IFW, SEND, 0);
  wf.connect(IFW, FIND, 1);
  wf.chain(SEND, ST, FIND, BR, UP, BA, AL);
  return wf;
}

/* ================================================================== */
/* 02  DEMO: Skyline Realty speed-to-lead first reply                 */
/* ================================================================== */

function build02() {
  const wf = new Workflow('02-demo-speed-to-lead-first-reply.json', 'AskHemant 02 · DEMO Skyline Realty · speed-to-lead first reply (DEMO – fictional business)');
  const W = webhook(wf, 'Lead webhook (DEMO)', [0, 300], {
    method: 'POST', path: 'demo/skyline/lead', responseMode: 'responseNode',
    notes: 'DEMO – fictional business. Receives a website-form lead or a Meta lead-ads relay. Test with automations/demo/send-demo-lead.sh.',
  });
  const C = config(wf, [220, 300], {
    demo_sheet_id: '{{DEMO_SHEET_ID}}',
    leads_tab: 'Demo_Leads',
    ...WA_DEFAULTS,
    wa_phone_number_id: '{{DEMO_WA_PHONE_NUMBER_ID}}',
    allowed_recipients: '{{DEMO_TEST_NUMBERS}}',
    business_name: 'Skyline Realty (DEMO)',
    default_project: 'Skyline Heights (DEMO)',
    demo_label: 'DEMO – fictional business',
    first_reply_template: 'lead_first_reply',
    default_country_code: '91',
  }, 'DEMO – fictional business. allowed_recipients: comma-separated numbers that may receive demo messages (your own test phones). "*" allows anyone: only for a real client build.');

  const normalise = function () {
    const receivedAt = new Date();
    const item = $input.first();
    const cfg = item.json;
    const headers = cfg.headers || {};
    const query = cfg.query || {};
    const body = cfg.body && typeof cfg.body === 'object' ? cfg.body : {};

    const key = readEnv('DEMO_WEBHOOK_KEY');
    if (key && String(headers['x-demo-key'] || query.key || '') !== key) {
      return [{ json: { authorised: false } }];
    }
    const missing = missingConfig(cfg, ['demo_sheet_id', 'wa_phone_number_id']);
    if (missing.length) throw new Error('Fill these in the Config node first: ' + missing.join(', '));

    let f = {};
    let source = 'website_form';
    let unsupported = '';
    if (Array.isArray(body.entry)) {
      unsupported = 'raw Meta leadgen webhook: fetch the lead from the Graph API first (see README), then post its fields here';
      source = 'meta_lead_ads';
    } else if (Array.isArray(body.field_data)) {
      source = 'meta_lead_ads';
      for (const fd of body.field_data) f[String(fd.name || '').toLowerCase()] = Array.isArray(fd.values) ? fd.values[0] : fd.values;
      f.created_time = body.created_time;
      f.meta_lead_id = body.id;
    } else {
      f = Object.assign({}, body.lead && typeof body.lead === 'object' ? body.lead : body);
      if (f.source) source = String(f.source);
    }
    const pick = (...keys) => {
      for (const k of keys) if (f[k] !== undefined && f[k] !== null && String(f[k]).trim() !== '') return String(f[k]).trim();
      return '';
    };
    const name = pick('full_name', 'name', 'lead_name') || [pick('first_name'), pick('last_name')].filter(Boolean).join(' ');
    const rawPhone = pick('whatsapp', 'whatsapp_number', 'phone_number', 'phone', 'mobile');
    const whatsapp = toE164(rawPhone, cfg.default_country_code);
    const optRaw = pick('whatsapp_opt_in', 'wa_opt_in', 'consent', 'opt_in').toLowerCase();
    const optIn = ['yes', 'true', '1', 'on', 'y'].includes(optRaw);
    const allow = allowedSet(cfg.allowed_recipients, cfg.default_country_code);
    const allowed = allow.any || allow.set.has(whatsapp);
    const lang = /^(hi|hinglish)$/i.test(pick('language', 'lang')) ? 'hi' : 'en';
    const project = pick('project', 'property', 'listing', 'project_name') || cfg.default_project;
    const createdRaw = pick('submitted_at', 'created_time', 'created_at');
    const created = createdRaw && !isNaN(new Date(createdRaw)) ? new Date(createdRaw) : null;

    let reason = '';
    if (unsupported) reason = unsupported;
    else if (!whatsapp) reason = 'no readable WhatsApp number';
    else if (!optIn) reason = 'no WhatsApp opt-in on the form';
    else if (!allow.configured) reason = 'allowed_recipients not set in Config (DEMO_TEST_NUMBERS)';
    else if (!allowed) reason = 'number not in allowed_recipients (DEMO safety list)';

    const firstName = name.split(/\s+/)[0] || '';
    const params = [firstName || 'there', project, cfg.business_name];
    const rendered = lang === 'hi'
      ? `Namaste ${params[0]} ji, ${params[1]} ke baare mein poochne ke liye thank you! Main ${params[2]} ka WhatsApp assistant hoon. Sahi options bhejne ke liye 2 chhote sawaal pooch loon?`
      : `Hi ${params[0]}, thanks for asking about ${params[1]}! I'm the WhatsApp assistant for ${params[2]}. May I ask 2 quick questions so we send you the right options?`;

    return [{
      json: {
        authorised: true,
        send_whatsapp: !reason,
        skip_reason: reason,
        lead_id: newId('SKY'),
        lead_name: name,
        whatsapp,
        email: pick('email'),
        source,
        project,
        property_type: pick('property_type', 'bhk', 'configuration'),
        locality: pick('locality', 'location', 'area'),
        budget: pick('budget'),
        source_created_at: created ? istIso(created) : '',
        source_delay_seconds: created ? Math.max(0, Math.round((receivedAt - created) / 100) / 10) : '',
        lead_received_at: istIso(receivedAt),
        lead_received_ms: receivedAt.getTime(),
        lang,
        rendered_first_reply: rendered,
        wa_payload: reason ? null : waTemplate(whatsapp, cfg.first_reply_template, lang, params),
      },
    }];
  };
  const N = codeNode(wf, 'Stamp + normalise lead', [440, 300],
    code(normalise, [istIso, toE164, cleanParam, readEnv, missingConfig, waTemplate, allowedSet, newId]),
    { notes: 'lead_received_at is stamped here, the moment the lead reaches the system. "Within a minute" is a design target measured from this point, not a promise.' });
  const AUTH = ifTrue(wf, 'Authorised?', [660, 300], '$json.authorised === true');
  const R401 = respond(wf, 'Respond 401', [880, 460], { code: 401, body: '={{ JSON.stringify({ ok: false, error: "invalid or missing demo key" }) }}' });
  const IFS = ifTrue(wf, 'Send first reply?', [880, 300], '$json.send_whatsapp === true');
  const SEND = httpJson(wf, 'WhatsApp: first-reply template', [1100, 200], {
    url: WA_URL(), credentials: CRED.waDemo, body: '={{ JSON.stringify($json.wa_payload) }}',
    notes: 'Approved template "lead_first_reply" with "Yes, ask me" / "Call me instead" buttons. The reply opens the 24-hour window for workflow 03.',
  });

  const stamp = function () {
    const sentMs = Date.now();
    const cfg = $('Config').first().json;
    const lead = $('Stamp + normalise lead').first().json;
    let res = { ok: false, status: 'not sent: ' + lead.skip_reason, id: '' };
    if (lead.send_whatsapp) res = waResult($input.first().json);
    const row = {};
    for (const col of __DEMO_LEAD_COLUMNS__) row[col] = '';
    Object.assign(row, {
      lead_id: lead.lead_id,
      business: cfg.business_name,
      demo_flag: cfg.demo_label,
      lead_name: lead.lead_name,
      whatsapp: lead.whatsapp,
      email: lead.email,
      source: lead.source,
      project: lead.project,
      source_created_at: lead.source_created_at,
      lead_received_at: lead.lead_received_at,
      first_reply_sent_at: res.ok ? istIso(new Date(sentMs)) : '',
      seconds_to_reply: res.ok ? Math.round((sentMs - lead.lead_received_ms) / 100) / 10 : '',
      source_delay_seconds: lead.source_delay_seconds,
      wa_message_id: res.id,
      wa_status: res.status,
      temperature: 'unknown',
      stage: res.ok ? 'Qualifying' : 'New',
      property_type: lead.property_type,
      locality: lead.locality,
      budget: lead.budget,
      bot_paused: 'no',
      opted_out: 'no',
      history_json: res.ok ? JSON.stringify([{ role: 'assistant', text: lead.rendered_first_reply, at: istIso(new Date(sentMs)) }]) : '[]',
      updated_at: istIso(new Date()),
      notes: cfg.demo_label,
    });
    return [{ json: row }];
  };
  const ST = codeNode(wf, 'Stamp reply + build row', [1320, 300],
    withConst(code(stamp, [istIso, waResult]), '__DEMO_LEAD_COLUMNS__', DEMO_LEAD_COLUMNS),
    { notes: 'first_reply_sent_at = when the Cloud API accepted the message. Delivery to the phone adds network time; the on-screen stopwatch shows the true end-to-end time.' });
  const LOG = sheet(wf, 'Log lead (Demo_Leads)', [1760, 300], {
    operation: 'append', docExpr: "={{ $('Config').first().json.demo_sheet_id }}", tab: 'Demo_Leads',
  });
  const R200 = respond(wf, 'Respond 200', [1540, 300], {
    code: 200,
    body: '={{ JSON.stringify({ ok: true, demo: $json.demo_flag, lead_id: $json.lead_id, lead_received_at: $json.lead_received_at, first_reply_sent_at: $json.first_reply_sent_at, seconds_to_reply: $json.seconds_to_reply, whatsapp: $json.wa_status }) }}',
  });

  wf.chain(W, C, N, AUTH);
  wf.connect(AUTH, IFS, 0);
  wf.connect(AUTH, R401, 1);
  wf.connect(IFS, SEND, 0);
  wf.connect(IFS, ST, 1);
  wf.chain(SEND, ST, R200, LOG); // answer first, then write the Sheet
  return wf;
}

/* ================================================================== */
/* 03  DEMO: AI qualifier on inbound WhatsApp                          */
/* ================================================================== */

function build03() {
  const wf = new Workflow('03-demo-ai-qualifier-inbound.json', 'AskHemant 03 · DEMO Skyline Realty · AI qualifier on inbound WhatsApp (DEMO – fictional business)');
  const PATH = 'demo/whatsapp/inbound';

  // --- GET: Meta's verification handshake --------------------------------
  const WG = webhook(wf, 'Meta verification (GET)', [0, 0], {
    method: 'GET', path: PATH, responseMode: 'responseNode',
    notes: 'Meta App → WhatsApp → Configuration → Callback URL = this Production URL; Verify token = the value of WA_VERIFY_TOKEN.',
  });
  const verify = function () {
    const q = $input.first().json.query || {};
    const mode = q['hub.mode'] ?? (q.hub && q.hub.mode);
    const token = q['hub.verify_token'] ?? (q.hub && q.hub.verify_token);
    const challenge = q['hub.challenge'] ?? (q.hub && q.hub.challenge);
    const expected = readEnv('WA_VERIFY_TOKEN');
    const ok = mode === 'subscribe' && !!expected && String(token) === expected;
    return [{ json: { ok, challenge: ok ? String(challenge ?? '') : '', reason: !expected ? 'WA_VERIFY_TOKEN not set or not readable' : ok ? 'ok' : 'token mismatch' } }];
  };
  const VG = codeNode(wf, 'Check verify token', [220, 0], code(verify, [readEnv]));
  const IFV = ifTrue(wf, 'Token OK?', [440, 0], '$json.ok === true');
  const RCH = respond(wf, 'Respond challenge', [660, -80], { code: 200, body: '={{ $json.challenge }}', contentType: 'text/plain' });
  const R403 = respond(wf, 'Respond 403', [660, 80], { code: 403, body: 'Forbidden', contentType: 'text/plain' });
  wf.chain(WG, VG, IFV);
  wf.connect(IFV, RCH, 0);
  wf.connect(IFV, R403, 1);

  // --- POST: messages ------------------------------------------------------
  const WP = webhook(wf, 'WhatsApp events (POST)', [0, 400], {
    method: 'POST', path: PATH, rawBody: true,
    notes: 'Answers 200 at once (Meta retries slow webhooks). Subscribe the app to the "messages" field.',
  });
  const C = config(wf, [220, 400], {
    demo_sheet_id: '{{DEMO_SHEET_ID}}',
    leads_tab: 'Demo_Leads',
    conversations_tab: 'Demo_Conversations',
    ...WA_DEFAULTS,
    wa_phone_number_id: '{{DEMO_WA_PHONE_NUMBER_ID}}',
    allowed_recipients: '{{DEMO_TEST_NUMBERS}}',
    agent_whatsapp_number: '{{ALERT_WHATSAPP_NUMBER}}',
    agent_alert_template: 'agent_hot_lead_alert',
    agent_alert_template_lang: 'en',
    business_name: 'Skyline Realty (DEMO)',
    business_profile: 'Skyline Realty (DEMO – fictional business) is a small brokerage that helps people buy apartments, villas and plots. An agent confirms prices, availability and possession dates personally. Site visits run Monday to Saturday, 10 am to 7 pm.',
    agent_name: 'a Skyline Realty agent',
    site_visit_booking_link: 'https://cal.com/askhemant/demo-site-visit',
    demo_label: 'DEMO – fictional business',
    ai_api_base: 'https://api.anthropic.com',
    ai_model: 'claude-haiku-5-5',
    ai_effort: 'low',
    ai_max_tokens: 4096,
    prompt_version: PROMPT_VERSION,
    default_country_code: '91',
    require_signature: true,
  }, 'DEMO – fictional business. The model id lives here (ai_model). The system prompt is in the "Build Claude request" node and in prompts/real-estate-qualifier.md.');

  const extract = async function () {
    const item = $input.first();
    const cfg = item.json;
    const sig = await checkSignature(this, item, {
      required: cfg.require_signature !== false, secretEnv: 'WA_APP_SECRET',
      header: 'x-hub-signature-256', prefix: 'sha256=', encoding: 'hex',
    });
    if (!sig.ok) throw new Error('Meta signature check failed: ' + sig.status);

    const body = cfg.body || {};
    if (body.object !== 'whatsapp_business_account') return [];
    const ownId = String(cfg.wa_phone_number_id || '');
    const msgs = [];
    for (const entry of body.entry || []) {
      for (const ch of entry.changes || []) {
        const v = ch.value || {};
        const pid = v.metadata && v.metadata.phone_number_id ? String(v.metadata.phone_number_id) : '';
        if (pid && ownId && !ownId.includes('{{') && pid !== ownId) continue;
        const names = {};
        for (const c of v.contacts || []) names[c.wa_id] = (c.profile && c.profile.name) || '';
        for (const m of v.messages || []) msgs.push({ m, name: names[m.from] || '' });
      }
    }
    if (!msgs.length) return []; // delivery/read statuses and other events: nothing to answer

    const from = msgs[0].m.from;
    const allow = allowedSet(cfg.allowed_recipients, cfg.default_country_code);
    if (!(allow.any || allow.set.has(toE164('+' + from, cfg.default_country_code)))) return []; // DEMO safety list: not even marked as read
    const mine = msgs.filter((x) => x.m.from === from);
    const parts = [];
    let nonText = false;
    for (const { m } of mine) {
      if (m.type === 'reaction') continue;
      if (m.type === 'text') parts.push(m.text && m.text.body ? m.text.body : '');
      else if (m.type === 'button') parts.push((m.button && (m.button.text || m.button.payload)) || '');
      else if (m.type === 'interactive') {
        const i = m.interactive || {};
        parts.push((i.button_reply && i.button_reply.title) || (i.list_reply && i.list_reply.title) || '');
      } else { nonText = true; parts.push(`[${m.type} message]`); }
    }
    const text = parts.filter(Boolean).join('\n').trim();
    if (!text) return [];
    const last = mine[mine.length - 1].m;
    const now = new Date();
    return [{
      json: {
        wa_from: from,
        wa_e164: toE164('+' + from, cfg.default_country_code),
        profile_name: mine[0].name,
        message_id: last.id,
        message_ids: mine.map((x) => x.m.id),
        text: text.slice(0, 2000),
        non_text: nonText,
        received_at: istIso(now),
        sent_at: last.timestamp ? istIso(new Date(Number(last.timestamp) * 1000)) : '',
        sent_ms: last.timestamp ? Number(last.timestamp) * 1000 : 0,
        signature_check: sig.status,
      },
    }];
  };
  const X = codeNode(wf, 'Verify + extract message', [440, 400],
    code(extract, [istIso, toE164, readEnv, rawBodyOf, checkSignature]),
    { notes: 'Checks X-Hub-Signature-256 with WA_APP_SECRET, ignores status callbacks and reactions, and returns the lead\'s message as plain text.' });
  const READ = httpJson(wf, 'WhatsApp: mark as read', [660, 240], {
    url: WA_URL(), credentials: CRED.waDemo, timeout: 8000,
    body: "={{ JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: $json.message_id }) }}",
  });
  const LOAD = sheet(wf, 'Load lead + history', [880, 400], {
    operation: 'read', docExpr: "={{ $('Config').first().json.demo_sheet_id }}", tab: 'Demo_Leads',
    filter: { column: 'whatsapp', value: "={{ $json.wa_e164 || '__none__' }}" },
    allMatches: true, alwaysOutput: true,
  });

  const buildRequest = function () {
    const cfg = $('Config').first().json;
    const msg = $('Verify + extract message').first().json;
    const missing = missingConfig(cfg, ['demo_sheet_id', 'wa_phone_number_id', 'ai_model']);
    if (missing.length) throw new Error('Fill these in the Config node first: ' + missing.join(', '));

    const rows = $input.all().map((i) => i.json).filter((r) => r && r.lead_id && toE164(r.whatsapp, cfg.default_country_code) === msg.wa_e164);
    rows.sort((a, b) => (Number(a.row_number) || 0) - (Number(b.row_number) || 0));
    const row = rows.length ? rows[rows.length - 1] : null;
    if (row && row.last_inbound_id && msg.message_ids.includes(String(row.last_inbound_id))) return []; // Meta re-delivered the same message

    const FIELDS = ['property_type', 'locality', 'budget', 'timeline', 'finance', 'purpose'];
    const lead = row ? Object.assign({}, row) : {
      lead_id: newId('SKY'), business: cfg.business_name, demo_flag: cfg.demo_label,
      lead_name: msg.profile_name, whatsapp: msg.wa_e164, source: 'whatsapp_inbound',
      project: '', lead_received_at: msg.received_at, stage: 'Qualifying', temperature: 'unknown',
      bot_paused: 'no', opted_out: 'no', history_json: '[]', is_new: true,
    };
    let history = [];
    try { history = JSON.parse(lead.history_json || '[]'); } catch (e) { history = []; }
    if (!Array.isArray(history)) history = [];
    // Meta retries webhooks for days: skip a delivery whose message ids are already in the chat history.
    const seen = new Set(history.flatMap((h) => (h && Array.isArray(h.ids) ? h.ids : [])).map(String));
    if (msg.message_ids.length && msg.message_ids.every((id) => seen.has(String(id)))) return [];
    // Free-form text is allowed only within 24 hours of the lead's message (23.5 h keeps a margin).
    const windowClosed = !!msg.sent_ms && Date.now() - msg.sent_ms > 23.5 * 3600000;

    const allow = allowedSet(cfg.allowed_recipients, cfg.default_country_code);
    const isStop = /^\s*(stop|stop all|unsubscribe|opt[\s-]?out|band karo|bandh karo|mat bhejo|no more messages)\s*[.!]*\s*$/i.test(msg.text);
    let route = 'ai';
    let note = '';
    if (!(allow.any || allow.set.has(msg.wa_e164))) return []; // DEMO safety list: ignore and store nothing
    if (String(lead.opted_out).toLowerCase() === 'yes') { route = 'silent'; note = 'lead opted out earlier'; }
    else if (isStop) { route = 'stop'; if (windowClosed) note = 'STOP recorded; no confirmation sent: outside the 24-hour window'; }
    else if (windowClosed) { route = 'silent'; note = 'late delivery, outside the 24-hour window: no free-form reply; answer with a template or by hand'; }
    else if (String(lead.bot_paused).toLowerCase() === 'yes') { route = 'silent'; note = 'assistant paused after handover: an agent is handling this chat'; }

    const known = FIELDS.map((k) => `${k}: ${lead[k] ? String(lead[k]) : '""'}`).join('; ');
    const context = [
      'BUSINESS CONTEXT',
      `Business: ${cfg.business_name}`,
      `About the business: ${cfg.business_profile}`,
      `Agent who takes over: ${cfg.agent_name}`,
      `SITE VISIT LINK: ${cfg.site_visit_booking_link || '(none: offer a call instead)'}`,
      `Time now: ${new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date())} IST`,
      `Lead first name: ${(String(lead.lead_name || '').split(/\s+/)[0]) || 'unknown'}`,
      `Enquiry: ${lead.project ? 'about ' + lead.project : 'direct WhatsApp message'}, source: ${lead.source || 'unknown'}`,
      `KNOWN ANSWERS: ${known}`,
      msg.non_text ? 'Note: the lead sent a photo, voice note or file. You can only read text: ask them to type it, or hand over.' : '',
    ].filter(Boolean).join('\n');

    const turns = history.slice(-16).map((h) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: String(h.text || '').trim() })).filter((t) => t.content);
    turns.push({ role: 'user', content: msg.text });
    if (turns[0].role !== 'user') turns.unshift({ role: 'user', content: `[Enquiry form: ${lead.project || 'property enquiry'}, via ${lead.source || 'website'}]` });
    const messages = [];
    for (const t of turns) {
      const prev = messages[messages.length - 1];
      if (prev && prev.role === t.role) prev.content += '\n' + t.content;
      else messages.push({ role: t.role, content: t.content });
    }

    const anthropicBody = {
      model: cfg.ai_model,
      max_tokens: Number(cfg.ai_max_tokens) || 4096,
      system: [
        { type: 'text', text: __QUALIFIER_PROMPT__, cache_control: { type: 'ephemeral' } },
        { type: 'text', text: context },
      ],
      messages,
      output_config: { effort: cfg.ai_effort || 'low', format: { type: 'json_schema', schema: __QUALIFIER_SCHEMA__ } },
    };
    return [{ json: { route, note, window_closed: windowClosed, msg, lead, history, anthropic_body: anthropicBody } }];
  };
  const BREQ = codeNode(wf, 'Build Claude request', [1100, 400],
    withConst(withConst(code(buildRequest, [istIso, istDate, toE164, missingConfig, allowedSet, newId]), '__QUALIFIER_PROMPT__', QUALIFIER_PROMPT), '__QUALIFIER_SCHEMA__', QUALIFIER_SCHEMA),
    { notes: `System prompt ${PROMPT_VERSION}. Source of truth: automations/prompts/real-estate-qualifier.md. Opt-outs, paused chats, numbers outside the DEMO safety list, repeat deliveries (message ids already in history_json) and late deliveries outside the 24-hour window never reach the model.` });
  const IFAI = ifTrue(wf, 'Needs AI?', [1320, 400], "$json.route === 'ai'");
  const AI = httpJson(wf, 'Claude: qualify lead', [1540, 300], {
    url: "={{ $('Config').first().json.ai_api_base + '/v1/messages' }}",
    credentials: CRED.anthropic, timeout: 45000,
    headers: [{ name: 'anthropic-version', value: '2023-06-01' }, { name: 'content-type', value: 'application/json' }],
    body: '={{ JSON.stringify($json.anthropic_body) }}',
    notes: 'Anthropic Messages API. Credential: Header Auth, name x-api-key. Structured output (JSON schema) so the reply is always parseable.',
  });

  const parse = function () {
    const cfg = $('Config').first().json;
    const req = $('Build Claude request').first().json;
    const { msg, lead, history, route } = req;
    const now = new Date();
    const FIELDS = ['property_type', 'locality', 'budget', 'timeline', 'finance', 'purpose'];
    const fallback = `Thanks for your message! ${cfg.agent_name ? cfg.agent_name.charAt(0).toUpperCase() + cfg.agent_name.slice(1) : 'An agent'} will reply here shortly.`;

    let ai = null;
    let aiError = '';
    if (route === 'ai') {
      const r = $input.first().json || {};
      const b = r.body || {};
      if (r.error) aiError = 'http error: ' + String(r.error.message || r.error).slice(0, 120);
      else if (Number(r.statusCode) >= 300) aiError = `http ${r.statusCode}: ${String((b.error && b.error.message) || '').slice(0, 120)}`;
      else if (b.stop_reason === 'refusal') aiError = 'refusal';
      else if (b.stop_reason === 'max_tokens') aiError = 'max_tokens';
      else {
        // Structured output makes the first text block strict JSON. If the model id in Config is ever
        // switched to one without it, accept JSON wrapped in prose or a code fence, else fall back.
        const t = (b.content || []).find((c) => c && c.type === 'text' && typeof c.text === 'string');
        const raw = t ? t.text.trim() : '';
        const tryParse = (s) => { try { return JSON.parse(s); } catch (e) { return null; } };
        ai = raw ? tryParse(raw) : null;
        if (!ai && raw) { const m = raw.match(/\{[\s\S]*\}/); ai = m ? tryParse(m[0]) : null; }
        if (!raw) aiError = 'no text block';
        else if (!ai) aiError = 'unparseable JSON';
        if (ai && (typeof ai !== 'object' || Array.isArray(ai) || typeof ai.reply !== 'string' || !ai.fields || typeof ai.fields !== 'object')) { ai = null; aiError = 'JSON missing fields'; }
      }
    }

    const upd = { lead_id: lead.lead_id, last_inbound_id: msg.message_id, last_message_at: istIso(now), updated_at: istIso(now) };
    let reply = '';
    let handover = false;
    let reason = 'none';
    let temperature = lead.temperature || 'unknown';
    let wantsVisit = false;

    if (route === 'stop') {
      reply = `Done. You won't get more messages from ${cfg.business_name} here. If you need us again, just message this number.`;
      upd.opted_out = 'yes';
      upd.stage = 'Opted out';
      upd.bot_paused = 'yes';
    } else if (route === 'ai' && ai) {
      for (const k of FIELDS) {
        const v = ai.fields && typeof ai.fields[k] === 'string' ? ai.fields[k].trim() : '';
        if (v) upd[k] = v.slice(0, 120);
      }
      temperature = ['hot', 'warm', 'cold', 'unknown'].includes(ai.temperature) ? ai.temperature : temperature;
      wantsVisit = ai.wants_site_visit === true;
      reason = ai.handover_reason || 'none';
      if (wantsVisit || ['asked_for_human', 'site_visit_requested', 'hot_lead'].includes(reason)) temperature = 'hot';
      handover = ai.handover === true || temperature === 'hot' || wantsVisit;
      if (handover && reason === 'none') reason = wantsVisit ? 'site_visit_requested' : 'hot_lead';
      reply = String(ai.reply || '').trim();
      if (!reply) reply = fallback;
      if (reply.length > 900) reply = reply.slice(0, 897).trimEnd() + '…';
      if (ai.opted_out === true) { upd.opted_out = 'yes'; upd.stage = 'Opted out'; upd.bot_paused = 'yes'; handover = false; }
      if (ai.summary) upd.summary = String(ai.summary).slice(0, 300);
    } else if (route === 'ai') {
      reply = fallback;
      handover = true;
      reason = 'ai_error';
    }
    if (req.window_closed) reply = ''; // outside the 24-hour window: record, never send free-form text

    upd.temperature = temperature;
    if (handover) {
      upd.bot_paused = 'yes';
      upd.handover_reason = reason;
      if (!upd.stage) upd.stage = 'Handed over';
    } else if (!upd.stage && route === 'ai') {
      upd.stage = 'Qualifying';
    }
    if (wantsVisit && !lead.visit_requested_at) upd.visit_requested_at = istIso(now);

    const alert = handover && !lead.agent_alerted_at && !!cfg.agent_whatsapp_number && !String(cfg.agent_whatsapp_number).includes('{{');
    if (alert) upd.agent_alerted_at = istIso(now);

    const hist = history.concat([{ role: 'user', text: msg.text, at: msg.received_at, ids: msg.message_ids }]);
    if (reply) hist.push({ role: 'assistant', text: reply, at: istIso(now) });
    upd.history_json = JSON.stringify(hist.slice(-30));

    let row = upd;
    if (lead.is_new) {
      row = {};
      for (const col of __DEMO_LEAD_COLUMNS__) row[col] = lead[col] !== undefined && lead[col] !== null ? lead[col] : '';
      Object.assign(row, upd);
      row.notes = cfg.demo_label + ': started by an inbound WhatsApp message';
    }

    const merged = Object.assign({}, lead, upd);
    const summary = merged.summary || FIELDS.filter((k) => merged[k]).map((k) => merged[k]).join(', ') || 'no details yet';
    const reasonLabel = {
      asked_for_human: 'asked for a person', site_visit_requested: 'wants a site visit', hot_lead: 'hot lead',
      out_of_scope: 'asked something only an agent can answer', low_confidence: 'assistant unsure', complaint: 'unhappy, needs a person', ai_error: 'assistant error',
    }[reason] || reason;
    const alertPayload = alert ? waTemplate(cfg.agent_whatsapp_number, cfg.agent_alert_template, cfg.agent_alert_template_lang, [
      cfg.business_name,
      String(merged.lead_name || 'Lead'),
      msg.wa_e164,
      summary,
      reasonLabel,
      cfg.site_visit_booking_link || 'not set',
    ]) : null;

    const transcript = [
      { ts: msg.received_at, lead_id: lead.lead_id, business: cfg.business_name, whatsapp: msg.wa_e164, direction: 'in', message_id: msg.message_id, text: msg.text, route, temperature: '', handover: '', model: '', prompt_version: '', ai_error: '', demo_flag: cfg.demo_label },
    ];
    if (reply) transcript.push({ ts: istIso(now), lead_id: lead.lead_id, business: cfg.business_name, whatsapp: msg.wa_e164, direction: 'out', message_id: '', text: reply, route, temperature, handover: handover ? 'yes' : 'no', model: route === 'ai' ? cfg.ai_model : '', prompt_version: route === 'ai' ? cfg.prompt_version : '', ai_error: aiError, demo_flag: cfg.demo_label });
    else if (req.note) transcript[0].ai_error = req.note;

    return [{
      json: {
        send_reply: !!reply,
        reply_payload: reply ? waText(msg.wa_e164, reply) : null,
        alert,
        alert_payload: alertPayload,
        ai_error: aiError,
        row,
        transcript,
      },
    }];
  };
  const P = codeNode(wf, 'Parse AI reply + decide', [1760, 400],
    withConst(code(parse, [istIso, cleanParam, waTemplate, waText]), '__DEMO_LEAD_COLUMNS__', DEMO_LEAD_COLUMNS),
    { notes: 'Code, not the model, decides handover, the agent alert (once per lead), opt-out and the fallback reply.' });
  const IFR = ifTrue(wf, 'Send reply?', [1980, 400], '$json.send_reply === true');
  const SR = httpJson(wf, 'WhatsApp: send reply', [2200, 300], {
    url: WA_URL(), credentials: CRED.waDemo, body: '={{ JSON.stringify($json.reply_payload) }}',
    notes: 'Free-form text: allowed because the lead messaged within the last 24 hours.',
  });
  const rowOnly = function () {
    return [{ json: $('Parse AI reply + decide').first().json.row }];
  };
  const RO = codeNode(wf, 'Lead row', [2420, 400], code(rowOnly));
  const UL = sheet(wf, 'Upsert lead (Demo_Leads)', [2640, 400], {
    operation: 'appendOrUpdate', matchOn: 'lead_id', docExpr: "={{ $('Config').first().json.demo_sheet_id }}", tab: 'Demo_Leads',
  });
  const alertDecision = function () {
    const d = $('Parse AI reply + decide').first().json;
    return [{ json: { alert: d.alert === true, alert_payload: d.alert_payload } }];
  };
  const AD = codeNode(wf, 'Alert decision', [2860, 400], code(alertDecision),
    { notes: 'Carries the decision past the Sheets node, so the next nodes read plain $json.' });
  const IFA = ifTrue(wf, 'Alert agent?', [3080, 400], '$json.alert === true');
  const AA = httpJson(wf, 'WhatsApp: hot-lead alert to agent', [3300, 300], {
    url: WA_URL(), credentials: CRED.waDemo, body: '={{ JSON.stringify($json.alert_payload) }}',
    notes: 'Utility template "agent_hot_lead_alert" with the summary and the site-visit booking link.',
  });
  const transcriptRows = function () {
    return $('Parse AI reply + decide').first().json.transcript.map((t) => ({ json: t }));
  };
  const TR = codeNode(wf, 'Transcript rows', [3520, 400], code(transcriptRows));
  const LT = sheet(wf, 'Log transcript (Demo_Conversations)', [3740, 400], {
    operation: 'append', docExpr: "={{ $('Config').first().json.demo_sheet_id }}", tab: 'Demo_Conversations',
    notes: 'Every turn, with model and prompt_version, for the human review of the first 100 conversations.',
  });

  wf.chain(WP, C, X);
  wf.connect(X, READ); // side branch (runs first: it sits higher on the canvas)
  wf.chain(X, LOAD, BREQ, IFAI);
  wf.connect(IFAI, AI, 0);
  wf.connect(IFAI, P, 1);
  wf.chain(AI, P, IFR);
  wf.connect(IFR, SR, 0);
  wf.connect(IFR, RO, 1);
  wf.chain(SR, RO, UL, AD, IFA);
  wf.connect(IFA, AA, 0);
  wf.connect(IFA, TR, 1);
  wf.chain(AA, TR, LT);
  return wf;
}

/* ================================================================== */
/* 04  DEMO: SmileCare Dental missed-call text-back                    */
/* ================================================================== */

function build04() {
  const wf = new Workflow('04-demo-missed-call-text-back-clinic.json', 'AskHemant 04 · DEMO SmileCare Dental · missed call → WhatsApp text-back (DEMO – fictional business)');
  const PATH = 'demo/smilecare/missed-call';
  const WP = webhook(wf, 'Missed call (POST)', [0, 200], {
    method: 'POST', path: PATH,
    notes: 'Generic JSON, Twilio StatusCallback (form-encoded) or Knowlarity call-log push. DEMO – fictional business.',
  });
  const WG = webhook(wf, 'Missed call (GET)', [0, 400], {
    method: 'GET', path: PATH,
    notes: 'Exotel Passthru applet (sends the call details as query parameters).',
  });
  const C = config(wf, [220, 300], {
    demo_sheet_id: '{{DEMO_SHEET_ID}}',
    calls_tab: 'Demo_Clinic_Calls',
    ...WA_DEFAULTS,
    wa_phone_number_id: '{{DEMO_WA_PHONE_NUMBER_ID}}',
    allowed_recipients: '{{DEMO_TEST_NUMBERS}}',
    clinic_name: 'SmileCare Dental (DEMO)',
    booking_link: 'https://cal.com/askhemant/demo-clinic-slot',
    template: 'clinic_missed_call',
    template_lang: 'en',
    dedupe_minutes: 60,
    demo_label: 'DEMO – fictional business',
    default_country_code: '91',
  }, 'DEMO – fictional business. Health data: log only the caller number and call times, never symptoms or treatment.');

  const normalise = function () {
    const item = $input.first();
    const cfg = item.json;
    const headers = cfg.headers || {};
    const q = cfg.query || {};
    const b = cfg.body && typeof cfg.body === 'object' ? cfg.body : {};
    const key = readEnv('DEMO_WEBHOOK_KEY');
    if (key && String(headers['x-demo-key'] || q.key || b.key || '') !== key) return [];
    const missing = missingConfig(cfg, ['demo_sheet_id', 'wa_phone_number_id']);
    if (missing.length) throw new Error('Fill these in the Config node first: ' + missing.join(', '));

    const d = Object.assign({}, q, b);
    const get = (...keys) => {
      for (const k of keys) if (d[k] !== undefined && d[k] !== null && String(d[k]).trim() !== '') return String(d[k]).trim();
      return '';
    };
    let provider = get('provider').toLowerCase();
    if (!provider) {
      if (d.AccountSid || d.CallStatus) provider = 'twilio';
      else if (d.CallSid && (d.CallFrom || d.DialCallStatus || d.CallType)) provider = 'exotel';
      else if (d.caller_id || d.dispnumber || d.business_call_type || d.knowlarity_number) provider = 'knowlarity';
      else provider = 'generic';
    }
    let caller = '', called = '', status = '', callId = '';
    if (provider === 'twilio') {
      caller = get('From', 'Caller'); called = get('To', 'Called');
      status = get('DialCallStatus', 'CallStatus'); callId = get('CallSid');
    } else if (provider === 'exotel') {
      caller = get('CallFrom', 'From'); called = get('CallTo', 'To');
      status = get('DialCallStatus', 'CallType', 'Status'); callId = get('CallSid');
    } else if (provider === 'knowlarity') {
      caller = get('caller_id', 'customer_number', 'caller'); called = get('dispnumber', 'knowlarity_number', 'called_number');
      status = get('business_call_type', 'call_status', 'call_type', 'status'); callId = get('uuid', 'call_id', 'callid');
    } else {
      caller = get('caller', 'from', 'caller_number', 'phone'); called = get('called', 'to', 'called_number');
      status = get('status', 'call_status', 'event'); callId = get('call_id', 'id');
    }
    const s = status.toLowerCase().replace(/[\s_]+/g, '-');
    const missed = /^(missed|no-?answer|noanswer|not-?answered|busy|failed|cancel+ed|call-attempt|missed-call|unanswered)$/.test(s);
    const callerE164 = toE164(caller, cfg.default_country_code);
    const allow = allowedSet(cfg.allowed_recipients, cfg.default_country_code);
    let reason = '';
    if (!missed) reason = `not a missed call (status "${status || 'none'}")`;
    else if (!callerE164) reason = 'caller number unreadable (withheld or landline)';
    else if (!allow.configured) reason = 'allowed_recipients not set in Config (DEMO_TEST_NUMBERS)';
    else if (!(allow.any || allow.set.has(callerE164))) reason = 'caller not in allowed_recipients (DEMO safety list)';
    const now = new Date();
    return [{
      json: {
        call_id: callId || newId('CALL'),
        provider,
        caller: callerE164 || caller,
        caller_e164: callerE164,
        called_number: called,
        call_status: status,
        missed,
        call_received_at: istIso(now),
        call_received_ms: now.getTime(),
        eligible: !reason,
        skip_reason: reason,
        wa_payload: reason ? null : waTemplate(callerE164, cfg.template, cfg.template_lang, [cfg.clinic_name, cfg.booking_link]),
      },
    }];
  };
  const N = codeNode(wf, 'Normalise call event', [440, 300],
    code(normalise, [istIso, toE164, cleanParam, readEnv, missingConfig, waTemplate, allowedSet, newId]),
    { notes: 'Maps Exotel / Knowlarity / Twilio / generic payloads to one shape. Check field names against your provider account before going live.' });
  const IFM = ifTrue(wf, 'Missed + allowed?', [660, 300], '$json.eligible === true');
  const RECENT = sheet(wf, 'Recent texts to caller', [880, 200], {
    operation: 'read', docExpr: "={{ $('Config').first().json.demo_sheet_id }}", tab: 'Demo_Clinic_Calls',
    filter: { column: 'caller', value: "={{ $json.caller_e164 || '__none__' }}" },
    allMatches: true, alwaysOutput: true,
  });
  const dedupe = function () {
    const cfg = $('Config').first().json;
    const call = $('Normalise call event').first().json;
    const windowMs = (Number(cfg.dedupe_minutes) || 60) * 60000;
    const recent = $input.all().map((i) => i.json)
      .filter((r) => r && r.text_back_sent_at && String(r.caller) === call.caller_e164)
      .map((r) => new Date(r.text_back_sent_at).getTime())
      .filter((t) => !isNaN(t) && call.call_received_ms - t < windowMs);
    return [{ json: { text_back: recent.length === 0, skip_reason: recent.length ? `already texted this caller in the last ${cfg.dedupe_minutes} minutes` : '', wa_payload: call.wa_payload } }];
  };
  const DD = codeNode(wf, 'Skip if texted recently', [1100, 200], code(dedupe),
    { notes: 'A patient who calls three times gets one message, not three.' });
  const IFT = ifTrue(wf, 'Text back?', [1320, 200], '$json.text_back === true');
  const SEND = httpJson(wf, 'WhatsApp: missed-call template', [1540, 100], {
    url: WA_URL(), credentials: CRED.waDemo,
    body: '={{ JSON.stringify($json.wa_payload) }}',
    notes: 'Utility template "clinic_missed_call" with the booking link.',
  });
  const logRow = function () {
    const sentMs = Date.now();
    const cfg = $('Config').first().json;
    const call = $('Normalise call event').first().json;
    let res = null;
    try { res = waResult($('WhatsApp: missed-call template').first().json); } catch (e) { res = null; }
    let reason = call.skip_reason;
    if (!reason && !res) {
      try { reason = $('Skip if texted recently').first().json.skip_reason; } catch (e) { reason = 'not sent'; }
    }
    const row = {};
    for (const col of __DEMO_CALL_COLUMNS__) row[col] = '';
    Object.assign(row, {
      call_id: call.call_id,
      business: cfg.clinic_name,
      demo_flag: cfg.demo_label,
      provider: call.provider,
      caller: call.caller,
      called_number: call.called_number,
      call_status: call.call_status,
      missed: call.missed ? 'yes' : 'no',
      call_received_at: call.call_received_at,
      text_back_sent_at: res && res.ok ? istIso(new Date(sentMs)) : '',
      seconds_to_text_back: res && res.ok ? Math.round((sentMs - call.call_received_ms) / 100) / 10 : '',
      wa_message_id: res ? res.id : '',
      wa_status: res ? res.status : 'not sent: ' + reason,
      booking_link: res && res.ok ? cfg.booking_link : '',
      notes: cfg.demo_label,
    });
    return [{ json: row }];
  };
  const LR = codeNode(wf, 'Build call log row', [1760, 300],
    withConst(code(logRow, [istIso, waResult]), '__DEMO_CALL_COLUMNS__', DEMO_CALL_COLUMNS));
  const LOG = sheet(wf, 'Log call (Demo_Clinic_Calls)', [1980, 300], {
    operation: 'append', docExpr: "={{ $('Config').first().json.demo_sheet_id }}", tab: 'Demo_Clinic_Calls',
  });

  wf.connect(WP, C);
  wf.connect(WG, C);
  wf.chain(C, N, IFM);
  wf.connect(IFM, RECENT, 0);
  wf.connect(IFM, LR, 1);
  wf.chain(RECENT, DD, IFT);
  wf.connect(IFT, SEND, 0);
  wf.connect(IFT, LR, 1);
  wf.chain(SEND, LR, LOG);
  return wf;
}

/* ================================================================== */
/* 05  Daily owner digest, 08:00 IST                                   */
/* ================================================================== */

function build05() {
  const wf = new Workflow('05-daily-owner-digest.json', 'AskHemant 05 · Daily owner digest (08:00 IST)');
  const T = wf.add('Every day 08:00 IST', 'n8n-nodes-base.scheduleTrigger', 1.2, [0, 300], {
    rule: { interval: [{ field: 'cronExpression', expression: '0 8 * * *' }] },
  }, { notes: 'Uses the workflow time zone (Settings → Timezone = Asia/Kolkata).' });
  const C = config(wf, [220, 300], {
    digest_sheet_id: '{{GOOGLE_SHEET_ID}}',
    digest_tab: 'Pipeline',
    business_label: 'AskHemant',
    recipients: '{{ALERT_WHATSAPP_NUMBER}}',
    ...WA_DEFAULTS,
    wa_phone_number_id: '{{WA_PHONE_NUMBER_ID}}',
    template: 'ah_daily_digest',
    template_lang: 'en',
    send_when_empty: true,
    default_country_code: '91',
  }, 'Own funnel by default (Pipeline tab). To film demo D5, duplicate this workflow and point it at the DEMO sheet: digest_tab = Demo_Leads, business_label = "Skyline Realty (DEMO)", the DEMO phone number id and the DEMO WhatsApp credential.');
  const R = sheet(wf, 'Read lead log', [440, 300], {
    operation: 'read', docExpr: "={{ $('Config').first().json.digest_sheet_id }}", tab: "={{ $('Config').first().json.digest_tab }}",
    alwaysOutput: true,
  });

  const summarise = function () {
    const cfg = $('Config').first().json;
    const missing = missingConfig(cfg, ['digest_sheet_id', 'recipients', 'wa_phone_number_id']);
    if (missing.length) throw new Error('Fill these in the Config node first: ' + missing.join(', '));
    const first = $input.first() ? $input.first().json : {};
    if (first && first.error) throw new Error('Could not read the sheet: ' + String(first.error.message || first.error));
    const rows = $input.all().map((i) => i.json).filter((r) => r && (r.lead_id || r.call_id));

    const todayIst = istDate(new Date());
    const y = new Date(todayIst + 'T00:00:00+05:30');
    y.setUTCDate(y.getUTCDate() - 1);
    const yesterday = istDate(y);
    const dayOf = (v) => {
      if (!v) return '';
      const s = String(v);
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
      const d = new Date(s);
      return isNaN(d) ? '' : istDate(d);
    };
    const inDay = (r) => (dayOf(r.lead_received_at) || dayOf(r.date)) === yesterday;
    const leads = rows.filter(inDay);
    const secs = leads
      .map((r) => (r.seconds_to_reply === '' || r.seconds_to_reply === undefined || r.seconds_to_reply === null ? NaN : Number(r.seconds_to_reply)))
      .filter((n) => isFinite(n) && n >= 0)
      .sort((a, b) => a - b);
    const median = secs.length ? (secs.length % 2 ? secs[(secs.length - 1) / 2] : (secs[secs.length / 2 - 1] + secs[secs.length / 2]) / 2) : null;
    const fmt = (s) => {
      if (s === null) return 'no replies yet';
      if (s < 60) return `${Math.round(s * 10) / 10} s`;
      if (s < 3600) return `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`;
      return `${Math.floor(s / 3600)} h ${Math.round((s % 3600) / 60)} min`;
    };
    const within60 = secs.filter((s) => s <= 60).length;
    const hot = leads.filter((r) => String(r.temperature).toLowerCase() === 'hot');
    const names = hot.map((r) => String(r.first_name || r.lead_name || '').split(/\s+/)[0]).filter(Boolean).slice(0, 3);
    const bookings = rows.filter((r) => dayOf(r.booked_at) === yesterday).length;
    const visitRequests = rows.filter((r) => dayOf(r.visit_requested_at) === yesterday).length;
    const waiting = leads.filter((r) => !r.first_reply_sent_at && !/^(no|stop)/i.test(String(r.marketing_consent || '').trim()) && String(r.opted_out || '').toLowerCase() !== 'yes').length;
    const lanes = {};
    for (const r of leads) if (r.lane) lanes[r.lane] = (lanes[r.lane] || 0) + 1;
    const laneText = Object.keys(lanes).length ? ' (' + Object.entries(lanes).map(([k, v]) => `${k} ${v}`).join(', ') + ')' : '';

    if (!leads.length && !bookings && cfg.send_when_empty === false) return [];

    const dateLabel = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short' }).format(y);
    const params = [
      cfg.business_label,
      dateLabel,
      String(leads.length) + laneText,
      fmt(median),
      secs.length ? `${within60} of ${secs.length}` : 'no replies yet',
      hot.length ? `${hot.length}${names.length ? ' (' + names.join(', ') + ')' : ''}` : '0',
      String(bookings) + (visitRequests ? ` (plus ${visitRequests} site-visit requests)` : ''),
      String(waiting),
    ];
    const text = `${params[0]} lead summary for ${params[1]}: new leads ${params[2]}; median first reply ${params[3]}; answered within 60 s ${params[4]}; hot leads ${params[5]}; bookings ${params[6]}; still waiting for a first reply ${params[7]}.`;
    const to = String(cfg.recipients).split(/[,;\s]+/).map((n) => toE164(n, cfg.default_country_code)).filter(Boolean);
    if (!to.length) throw new Error('recipients in Config has no valid WhatsApp number');
    return to.map((n) => ({ json: { to: n, digest_text: text, wa_payload: waTemplate(n, cfg.template, cfg.template_lang, params) } }));
  };
  const S = codeNode(wf, 'Summarise yesterday', [660, 300],
    code(summarise, [istIso, istDate, toE164, cleanParam, missingConfig, waTemplate]),
    { notes: 'Yesterday 00:00–24:00 IST: leads, median seconds_to_reply, share answered within 60 s, hot leads, bookings, leads still waiting. digest_text is ready for an email node if you prefer email.' });
  const SEND = httpJson(wf, 'WhatsApp: digest template', [880, 300], {
    url: WA_URL(), credentials: CRED.waOwn, body: '={{ JSON.stringify($json.wa_payload) }}',
    notes: 'Utility template "ah_daily_digest". One message per recipient.',
  });
  wf.chain(T, C, R, S, SEND);
  return wf;
}

/* ================================================================== */
/* 06  Cal.com booking → Pipeline, confirmation + 2-hour reminder      */
/* ================================================================== */

function build06() {
  const wf = new Workflow('06-calcom-booking-to-pipeline.json', 'AskHemant 06 · Cal.com booking → Pipeline + WhatsApp confirmation and 2-hour reminder');
  const W = webhook(wf, 'Cal.com webhook', [0, 300], {
    method: 'POST', path: 'askhemant/calcom', rawBody: true,
    notes: 'Cal.com → Settings → Developer → Webhooks: this Production URL; triggers Booking created, Booking rescheduled, Booking cancelled; Secret = CALCOM_WEBHOOK_SECRET.',
  });
  const C = config(wf, [220, 300], {
    pipeline_sheet_id: '{{GOOGLE_SHEET_ID}}',
    pipeline_tab: 'Pipeline',
    ...WA_DEFAULTS,
    wa_phone_number_id: '{{WA_PHONE_NUMBER_ID}}',
    confirmation_template: 'ah_call_confirmation',
    reminder_template: 'ah_call_reminder_2h',
    template_lang: 'en',
    reminder_minutes_before: 120,
    event_labels: JSON.stringify({ 'fit-call': 'free 20-min Fit Call', 'ask-hemant-session': '45-min Ask Hemant Session', 'audit-workshop': '60-min Audit workshop', 'audit-review': '30-min Audit review', kickoff: 'kickoff call', 'client-call': '30-min client call' }),
    stage_moving_events: 'fit-call',
    default_country_code: '91',
    require_signature: true,
  }, 'event_labels: Cal.com event slug → words used in the WhatsApp messages. stage_moving_events: slugs that move a lead to "Call booked".');

  const normalise = async function () {
    const item = $input.first();
    const cfg = item.json;
    const missing = missingConfig(cfg, ['pipeline_sheet_id', 'wa_phone_number_id']);
    if (missing.length) throw new Error('Fill these in the Config node first: ' + missing.join(', '));
    const sig = await checkSignature(this, item, {
      required: cfg.require_signature !== false, secretEnv: 'CALCOM_WEBHOOK_SECRET',
      header: 'x-cal-signature-256', prefix: '', encoding: 'hex',
    });
    if (!sig.ok) throw new Error('Cal.com signature check failed: ' + sig.status);

    const body = cfg.body || {};
    const ev = { BOOKING_CREATED: 'created', BOOKING_RESCHEDULED: 'rescheduled', BOOKING_CANCELLED: 'cancelled' }[String(body.triggerEvent || '').toUpperCase()];
    if (!ev) return []; // PING, meeting events and anything else
    const p = body.payload || {};
    const att = (p.attendees || [])[0] || {};
    const responses = Object.assign({}, p.userFieldsResponses || {}, p.responses || {});
    const val = (v) => {
      if (v === undefined || v === null) return '';
      if (typeof v !== 'object') return String(v).trim();
      if (Array.isArray(v)) return v.map(val).filter(Boolean).join(', ');
      if ('value' in v) return val(v.value);
      if (v.firstName || v.lastName) return [v.firstName, v.lastName].filter(Boolean).join(' ');
      if (v.optionValue) return String(v.optionValue);
      return '';
    };
    const ans = (re, exclude) => {
      for (const [k, v] of Object.entries(responses)) {
        const label = v && typeof v === 'object' && !Array.isArray(v) && v.label ? String(v.label) : '';
        if ((re.test(k) || re.test(label)) && !(exclude && (exclude.test(k) || exclude.test(label)))) {
          const s = val(v);
          if (s) return s;
        }
      }
      return '';
    };
    const slug = String(p.type || (p.eventType && p.eventType.slug) || '').toLowerCase();
    let labels = {};
    try { labels = JSON.parse(cfg.event_labels || '{}'); } catch (e) { labels = {}; }
    const meta = p.metadata || {};
    const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map((k) => meta[k] || ans(new RegExp('^' + k + '$', 'i'))).filter(Boolean);
    const name = att.name || ans(/^name$|your.?name/i);
    const intake = {
      business_type: ans(/business/i),
      city: ans(/city|market/i),
      lead_sources: ans(/source|come from/i, /utm/i),
      leads_per_month: ans(/leads?.*(month|mo\b)|how many/i),
      reply_speed: ans(/reply|respond|speed/i),
      fix_first: ans(/fix|automate/i, /budget/i),
      budget: ans(/budget/i),
    };
    const start = p.startTime ? new Date(p.startTime) : null;
    return [{
      json: {
        event: ev,
        slug,
        event_label: labels[slug] || p.eventTitle || 'call',
        moves_stage: String(cfg.stage_moving_events || '').split(/[,\s]+/).includes(slug),
        uid: String(p.uid || ''),
        reschedule_uid: String(p.rescheduleUid || p.fromReschedule || ''),
        start_iso: start && !isNaN(start) ? start.toISOString() : '',
        start_ist: start && !isNaN(start) ? istIso(start) : '',
        when_label: start && !isNaN(start) ? fmtWhen(start.toISOString(), att.timeZone || 'Asia/Kolkata') : '',
        attendee_tz: att.timeZone || 'Asia/Kolkata',
        name,
        first_name: String(name || '').split(/\s+/)[0] || '',
        email: String(att.email || ans(/e-?mail/i) || '').toLowerCase(),
        whatsapp: toE164(ans(/whats\s*app|phone|mobile/i) || att.phoneNumber || p.smsReminderNumber || '', cfg.default_country_code),
        source: utm.length ? utm.join(' / ') : 'cal.com',
        intake,
        cancellation_reason: String(p.cancellationReason || ''),
        signature_check: sig.status,
      },
    }];
  };
  const N = codeNode(wf, 'Verify + normalise booking', [440, 300],
    code(normalise, [istIso, toE164, readEnv, missingConfig, rawBodyOf, checkSignature, fmtWhen]),
    { notes: 'Checks X-Cal-Signature-256, then reads the booking, the attendee and the intake answers (matched by question label, so renaming identifiers is safe).' });
  const READ = sheet(wf, 'Read Pipeline', [660, 300], {
    operation: 'read', docExpr: "={{ $('Config').first().json.pipeline_sheet_id }}", tab: 'Pipeline', alwaysOutput: true,
  });

  const match = function () {
    const cfg = $('Config').first().json;
    const b = $('Verify + normalise booking').first().json;
    const now = new Date();
    const rows = $input.all().map((i) => i.json).filter((r) => r && r.lead_id);
    const found = rows.find((r) => b.uid && String(r.booking_uid) === b.uid)
      || rows.find((r) => b.reschedule_uid && String(r.booking_uid) === b.reschedule_uid)
      || rows.find((r) => b.whatsapp && toE164(r.whatsapp, cfg.default_country_code) === b.whatsapp)
      || rows.find((r) => b.email && String(r.email || '').toLowerCase() === b.email);

    const intake = b.intake;
    const intakeText = [
      intake.business_type && `Business: ${intake.business_type}`,
      intake.city && `City/market: ${intake.city}`,
      intake.lead_sources && `Sources: ${intake.lead_sources}`,
      intake.leads_per_month && `Leads/month: ${intake.leads_per_month}`,
      intake.reply_speed && `Reply speed: ${intake.reply_speed}`,
      intake.fix_first && `Fix first: ${intake.fix_first}`,
      intake.budget && `Budget: ${intake.budget}`,
    ].filter(Boolean).join(' · ');
    const lane = laneOf(intake.business_type);
    const lowBudget = /<\s*₹?\s*15|under\s*₹?\s*15|less than\s*₹?\s*15/i.test(intake.budget);
    const nicheLane = lane === 'RE' || lane === 'CL';
    const fewLeads = /under\s*20/i.test(intake.leads_per_month);
    const otherBusiness = /other business/i.test(intake.business_type);
    // Routing, sales/02-cal-com-intake-form.md §4. Red: budget under ₹15K, OR (real estate or clinic AND under
    // 20 leads a month). "Other business" with a budget of ₹15K or more is green-GEN: keep the Fit Call.
    const redWhy = [lowBudget && 'budget under ₹15K', nicheLane && fewLeads && 'real estate or clinic with under 20 leads a month'].filter(Boolean);
    let route = '';
    if (b.slug === 'fit-call' && redWhy.length) route = ` ROUTE (red): ${redWhy.join(' and ')}: send the Kit and the Ask Hemant Session link (₹1,999 / $99) instead (message R1).`;
    else if (b.slug === 'fit-call' && otherBusiness && intake.budget) route = ' ROUTE (green-GEN): keep the Fit Call; likely outcome is a Quick Win Build or an AI Build Scoping.';
    const status = { created: 'confirmed', rescheduled: 'rescheduled', cancelled: 'cancelled' }[b.event];
    const what = b.event === 'cancelled'
      ? `${b.event_label} cancelled${b.cancellation_reason ? ' (' + b.cancellation_reason + ')' : ''}.`
      : `${b.event_label} ${b.event === 'rescheduled' ? 'moved to' : 'booked for'} ${b.when_label}.`;
    const note = `${istDate(now)}: ${what}${b.event !== 'cancelled' && intakeText ? ' ' + intakeText + '.' : ''}${route}`;

    let row;
    if (found) {
      row = { lead_id: found.lead_id, updated_at: istIso(now), notes: (found.notes ? found.notes + ' | ' : '') + note };
      const sameBooking = !b.uid || String(found.booking_uid) === b.uid || String(found.booking_uid) === b.reschedule_uid || !found.booking_uid;
      if (b.event === 'cancelled') {
        if (sameBooking) row.booking_status = 'cancelled';
      } else {
        Object.assign(row, { booking_event: b.slug, booking_uid: b.uid, booking_start: b.start_ist, booked_at: istIso(now), booking_status: status });
        if (b.moves_stage && ['', 'new', 'replied'].includes(String(found.stage || '').trim().toLowerCase())) row.stage = 'Call booked';
      }
      if (!found.whatsapp && b.whatsapp) row.whatsapp = b.whatsapp;
      if (!found.email && b.email) row.email = b.email;
      if (!found.first_name && b.first_name) row.first_name = b.first_name;
      if (!found.business_type && intake.business_type) { row.business_type = intake.business_type; row.lane = lane; }
      if (!found.leads_per_month && intake.leads_per_month) row.leads_per_month = intake.leads_per_month;
    } else {
      row = {};
      for (const col of __PIPELINE_COLUMNS__) row[col] = '';
      Object.assign(row, {
        date: istDate(now), source: b.source, lane, business_type: intake.business_type,
        stage: b.event !== 'cancelled' && b.moves_stage ? 'Call booked' : 'New',
        lead_id: newId('AH'), first_name: b.first_name, whatsapp: b.whatsapp, email: b.email,
        leads_per_month: intake.leads_per_month, form: 'calcom_' + (b.slug || 'booking'),
        lead_received_at: istIso(now), temperature: fitTemperature(lane, leadsMin(intake.leads_per_month)),
        booking_event: b.slug, booking_uid: b.uid, booking_start: b.start_ist,
        booked_at: b.event === 'cancelled' ? '' : istIso(now), booking_status: status,
        updated_at: istIso(now), notes: note,
      });
    }

    const minutes = Number(cfg.reminder_minutes_before) || 120;
    const startMs = b.start_iso ? new Date(b.start_iso).getTime() : NaN;
    const reminderMs = startMs - minutes * 60000;
    const active = b.event === 'created' || b.event === 'rescheduled';
    // marketing_consent = stopped: the person replied STOP on WhatsApp (recorded by hand). No WhatsApp at all.
    const stopped = !!found && /^stop/i.test(String(found.marketing_consent || '').trim());
    if (stopped && active && b.whatsapp) row.notes += ' WhatsApp confirmation and reminder not sent: this person replied STOP (marketing_consent = stopped).';
    const canMessage = active && !!b.whatsapp && !stopped;
    const decision = {
      event: b.event,
      lead_id: row.lead_id,
      booking_uid: b.uid,
      booking_start: b.start_ist,
      send_confirmation: canMessage,
      confirmation_payload: canMessage ? waTemplate(b.whatsapp, cfg.confirmation_template, cfg.template_lang, [b.first_name || 'there', b.event_label, b.when_label]) : null,
      schedule_reminder: canMessage && isFinite(reminderMs) && reminderMs > now.getTime() + 10 * 60000,
      reminder_at: isFinite(reminderMs) ? new Date(reminderMs).toISOString() : '',
      whatsapp: b.whatsapp,
      first_name: b.first_name,
      event_label: b.event_label,
      when_label: b.when_label,
      start_iso: b.start_iso,
    };
    return [{ json: { row, decision } }];
  };
  const M = codeNode(wf, 'Match lead + build row', [880, 300],
    withConst(code(match, [istIso, istDate, toE164, cleanParam, waTemplate, newId, laneOf, leadsMin, fitTemperature]), '__PIPELINE_COLUMNS__', PIPELINE_COLUMNS),
    { notes: 'Finds the lead by booking uid, WhatsApp or email. Moves the stage forward only (New/Replied → Call booked); a cancellation is flagged in booking_status, never moved backwards.' });
  const rowOnly = function () {
    return [{ json: $('Match lead + build row').first().json.row }];
  };
  const RO = codeNode(wf, 'Pipeline row', [1100, 300], code(rowOnly));
  const UP = sheet(wf, 'Upsert Pipeline row', [1320, 300], {
    operation: 'appendOrUpdate', matchOn: 'lead_id', docExpr: "={{ $('Config').first().json.pipeline_sheet_id }}", tab: 'Pipeline',
  });
  const decisionOnly = function () {
    return [{ json: $('Match lead + build row').first().json.decision }];
  };
  const D1 = codeNode(wf, 'Decision', [1540, 300], code(decisionOnly),
    { notes: 'Carries the decision past the Sheets / HTTP nodes, so the next nodes read plain $json.' });
  const IFC = ifTrue(wf, 'Send confirmation?', [1760, 300], '$json.send_confirmation === true');
  const CONF = httpJson(wf, 'WhatsApp: booking confirmation', [1980, 200], {
    url: WA_URL(), credentials: CRED.waOwn,
    body: '={{ JSON.stringify($json.confirmation_payload) }}',
    notes: 'Utility template "ah_call_confirmation". The Cal.com booking form tells people they will get WhatsApp confirmations and reminders.',
  });
  const D2 = codeNode(wf, 'Decision (after send)', [2200, 200], code(decisionOnly));
  const IFR = ifTrue(wf, 'Schedule reminder?', [2420, 200], '$json.schedule_reminder === true');
  const WAIT = wf.add('Wait until 2 h before', 'n8n-nodes-base.wait', 1.1, [2640, 100], {
    resume: 'specificTime',
    dateTime: '={{ $json.reminder_at }}',
  }, { webhookId: uuid(`wait:${wf.file}`), notes: 'Waiting executions are stored in the n8n database, so they survive restarts.' });
  const RE = sheet(wf, 'Re-check booking', [2860, 100], {
    operation: 'read', docExpr: "={{ $('Config').first().json.pipeline_sheet_id }}", tab: 'Pipeline',
    filter: { column: 'lead_id', value: '={{ $json.lead_id }}' },
    alwaysOutput: true,
  });
  const stillOn = function () {
    const cfg = $('Config').first().json;
    const d = $('Match lead + build row').first().json.decision;
    const r = $input.all().map((i) => i.json).find((x) => x && x.lead_id === d.lead_id);
    if (!r) return [];
    const active = ['confirmed', 'rescheduled'].includes(String(r.booking_status || '').toLowerCase());
    const same = String(r.booking_uid || '') === d.booking_uid && String(r.booking_start || '') === d.booking_start;
    const future = new Date(d.start_iso).getTime() > Date.now();
    const stopped = /^stop/i.test(String(r.marketing_consent || '').trim());
    if (!active || !same || !future || stopped || r.reminder_sent_at) return [];
    return [{ json: { lead_id: d.lead_id, reminder_payload: waTemplate(d.whatsapp, cfg.reminder_template, cfg.template_lang, [d.first_name || 'there', d.event_label, d.when_label]) } }];
  };
  const SO = codeNode(wf, 'Still booked?', [3080, 100], code(stillOn, [cleanParam, waTemplate]),
    { notes: 'Sends nothing if the booking was cancelled or moved while waiting (a reschedule starts its own wait).' });
  const REM = httpJson(wf, 'WhatsApp: 2-hour reminder', [3300, 100], {
    url: WA_URL(), credentials: CRED.waOwn, body: '={{ JSON.stringify($json.reminder_payload) }}',
    notes: 'Utility template "ah_call_reminder_2h": "Reply 1 to confirm". Replies land in the WhatsApp Business app (coexistence) for Hemant to read.',
  });
  const remRow = function () {
    const d = $('Still booked?').first().json;
    const res = waResult($input.first().json);
    return [{ json: { lead_id: d.lead_id, reminder_sent_at: res.ok ? istIso(new Date()) : 'failed: ' + res.status, updated_at: istIso(new Date()) } }];
  };
  const RR = codeNode(wf, 'Reminder row', [3520, 100], code(remRow, [istIso, waResult]));
  const UP2 = sheet(wf, 'Mark reminder sent', [3740, 100], {
    operation: 'appendOrUpdate', matchOn: 'lead_id', docExpr: "={{ $('Config').first().json.pipeline_sheet_id }}", tab: 'Pipeline',
  });

  wf.chain(W, C, N, READ, M, RO, UP, D1, IFC);
  wf.connect(IFC, CONF, 0);
  wf.chain(CONF, D2, IFR);
  wf.connect(IFR, WAIT, 0);
  wf.chain(WAIT, RE, SO, REM, RR, UP2);
  return wf;
}

/* ------------------------------------------------------------------ */

const builds = [build01, build02, build03, build04, build05, build06];
const SHEET_FILES = { Pipeline: 'pipeline.csv', Demo_Leads: 'demo_leads.csv', Demo_Conversations: 'demo_conversations.csv', Demo_Clinic_Calls: 'demo_clinic_calls.csv' };
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  for (const b of builds) b().write();
  // Header rows for the Google Sheet tabs (File › Import › Upload, or paste into row 1).
  for (const [tab, file] of Object.entries(SHEET_FILES)) {
    writeFileSync(join(OUT, 'sheets', file), COLUMNS[tab].join(',') + '\n');
    console.log(`wrote ${join(OUT, 'sheets', file)} (${tab}: ${COLUMNS[tab].length} columns)`);
  }
}
export { builds };
