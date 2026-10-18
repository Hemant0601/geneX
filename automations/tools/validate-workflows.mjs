#!/usr/bin/env node
/**
 * Static checks for every automations/*.json n8n workflow.
 *
 *   node automations/tools/validate-workflows.mjs            # all workflows
 *   node automations/tools/validate-workflows.mjs file.json   # one file
 *
 * Exit code 1 if any check fails. Checks:
 *  1. The file parses as JSON and has name, nodes[], connections{}, settings.executionOrder "v1", pinData{}.
 *  2. Every node has id, name, type, typeVersion, position [x, y] and parameters; ids and names are unique.
 *  3. Only the allowed core node types are used.
 *  4. Every connection source and target is an existing node, with valid output indexes (IF has 2).
 *  5. Every node except triggers has an incoming connection; there is at least one trigger.
 *  6. Every $('Node name') reference in expressions and Code nodes points to an existing node.
 *     Outside Code nodes, $('…') may only point at a Set (Config) or Webhook node: in our
 *     end-to-end test on n8n 1.123, $('Some Code node').first() in a Respond, Set or other
 *     non-Code node resolved to nothing. Non-Code nodes read $json instead.
 *  7. Every Code node's JavaScript compiles.
 *  8. Webhook method + path pairs are unique across all workflows; webhook nodes carry a webhookId.
 *  9. No secrets in plain text (tokens, API keys, bearer values, private keys, passwords),
 *     and credentials appear only as {id, name} references.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const ALLOWED = new Set([
  'n8n-nodes-base.webhook', 'n8n-nodes-base.respondToWebhook', 'n8n-nodes-base.code', 'n8n-nodes-base.if',
  'n8n-nodes-base.set', 'n8n-nodes-base.httpRequest', 'n8n-nodes-base.googleSheets',
  'n8n-nodes-base.scheduleTrigger', 'n8n-nodes-base.wait', 'n8n-nodes-base.noOp',
]);
const TRIGGERS = new Set(['n8n-nodes-base.webhook', 'n8n-nodes-base.scheduleTrigger']);
const OUTPUTS = { 'n8n-nodes-base.if': 2 };
const SECRET_PATTERNS = [
  [/EAA[A-Za-z0-9]{30,}/, 'Meta access token'],
  [/sk-ant-[A-Za-z0-9_-]{10,}/, 'Anthropic API key'],
  [/sk-[A-Za-z0-9]{32,}/, 'API key (sk-…)'],
  [/AIza[0-9A-Za-z_-]{35}/, 'Google API key'],
  [/ya29\.[0-9A-Za-z_-]{20,}/, 'Google OAuth token'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/Bearer\s+[A-Za-z0-9._-]{20,}/, 'bearer token'],
  [/xox[abp]-[A-Za-z0-9-]{10,}/, 'Slack token'],
  [/\bAC[0-9a-f]{32}\b/, 'Twilio account SID'],
  [/"(password|passwd|secret|api_?key|access_?token|app_?secret|verify_?token)"\s*:\s*"[^"{}$=][^"]{5,}"/i, 'secret-looking key/value'],
];

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(DIR).filter((f) => /^\d\d-.*\.json$/.test(f)).sort().map((f) => join(DIR, f));

let failures = 0;
const webhookKeys = new Map();
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function walkStrings(value, fn, path = '') {
  if (typeof value === 'string') fn(value, path);
  else if (Array.isArray(value)) value.forEach((v, i) => walkStrings(v, fn, `${path}[${i}]`));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walkStrings(v, fn, path ? `${path}.${k}` : k);
}

for (const file of files) {
  const errors = [];
  const name = basename(file);
  const text = readFileSync(file, 'utf8');
  let wf;
  try {
    wf = JSON.parse(text);
  } catch (e) {
    console.log(`FAIL ${name}: not valid JSON (${e.message})`);
    failures++;
    continue;
  }

  // 1. top level
  if (typeof wf.name !== 'string' || !wf.name) errors.push('missing workflow name');
  if (!Array.isArray(wf.nodes) || !wf.nodes.length) errors.push('nodes must be a non-empty array');
  if (!wf.connections || typeof wf.connections !== 'object') errors.push('connections must be an object');
  if (!wf.settings || wf.settings.executionOrder !== 'v1') errors.push('settings.executionOrder must be "v1"');
  if (!wf.pinData || typeof wf.pinData !== 'object' || Object.keys(wf.pinData).length) errors.push('pinData must be an empty object');
  const nodes = Array.isArray(wf.nodes) ? wf.nodes : [];

  // 2-3. nodes
  const ids = new Set();
  const names = new Set();
  for (const n of nodes) {
    const label = n.name || n.id || '(unnamed)';
    for (const key of ['id', 'name', 'type', 'typeVersion', 'position', 'parameters']) {
      if (n[key] === undefined || n[key] === null) errors.push(`node ${label}: missing ${key}`);
    }
    if (!Array.isArray(n.position) || n.position.length !== 2 || !n.position.every(Number.isFinite)) errors.push(`node ${label}: position must be [x, y]`);
    if (typeof n.typeVersion !== 'number') errors.push(`node ${label}: typeVersion must be a number`);
    if (n.parameters && typeof n.parameters !== 'object') errors.push(`node ${label}: parameters must be an object`);
    if (ids.has(n.id)) errors.push(`duplicate node id ${n.id}`);
    if (names.has(n.name)) errors.push(`duplicate node name ${n.name}`);
    ids.add(n.id);
    names.add(n.name);
    if (!ALLOWED.has(n.type)) errors.push(`node ${label}: type ${n.type} is not in the allowed core set`);
    if (n.credentials) {
      for (const [type, ref] of Object.entries(n.credentials)) {
        const keys = Object.keys(ref || {}).sort().join(',');
        if (keys !== 'id,name') errors.push(`node ${label}: credential ${type} must be an {id, name} reference only`);
      }
    }
    if (n.type === 'n8n-nodes-base.webhook') {
      if (!n.webhookId) errors.push(`node ${label}: webhook without webhookId`);
      const key = `${n.parameters.httpMethod || 'GET'} ${n.parameters.path}`;
      if (webhookKeys.has(key)) errors.push(`webhook ${key} also used in ${webhookKeys.get(key)}`);
      webhookKeys.set(key, `${name} › ${n.name}`);
    }
  }

  // 4-5. connections
  const incoming = new Map(nodes.map((n) => [n.name, 0]));
  for (const [src, conn] of Object.entries(wf.connections || {})) {
    const srcNode = nodes.find((n) => n.name === src);
    if (!srcNode) { errors.push(`connection source "${src}" is not a node`); continue; }
    const outputs = (conn && conn.main) || [];
    const max = OUTPUTS[srcNode.type] || 1;
    if (outputs.length > max) errors.push(`"${src}" has ${outputs.length} outputs, ${srcNode.type} has ${max}`);
    outputs.forEach((targets, i) => {
      for (const t of targets || []) {
        if (!names.has(t.node)) errors.push(`connection ${src}[${i}] → "${t.node}": target is not a node`);
        else incoming.set(t.node, incoming.get(t.node) + 1);
        if (t.type !== 'main' || typeof t.index !== 'number') errors.push(`connection ${src}[${i}] → ${t.node}: needs type "main" and a numeric index`);
      }
    });
  }
  const triggers = nodes.filter((n) => TRIGGERS.has(n.type));
  if (!triggers.length) errors.push('no trigger node (webhook or schedule)');
  for (const n of nodes) {
    if (!TRIGGERS.has(n.type) && !incoming.get(n.name)) errors.push(`node ${n.name} has no incoming connection (unreachable)`);
  }

  // 6-7. references + code
  for (const n of nodes) {
    walkStrings(n.parameters, (s, path) => {
      for (const m of s.matchAll(/\$\(\s*(['"])(.+?)\1\s*\)/g)) {
        if (!names.has(m[2])) errors.push(`node ${n.name} (${path}) references unknown node "${m[2]}"`);
        else if (n.type !== 'n8n-nodes-base.code') {
          const target = nodes.find((x) => x.name === m[2]);
          if (!['n8n-nodes-base.set', 'n8n-nodes-base.webhook'].includes(target.type)) {
            errors.push(`node ${n.name} (${path}) reads $('${m[2]}') (${target.type.replace('n8n-nodes-base.', '')}); outside Code nodes only Set/Webhook nodes may be referenced, use $json`);
          }
        }
      }
      if (s.startsWith('=') && s.includes('{{') && (s.match(/{{/g) || []).length !== (s.match(/}}/g) || []).length) {
        errors.push(`node ${n.name} (${path}): unbalanced {{ }} in expression`);
      }
    });
    if (n.type === 'n8n-nodes-base.code') {
      try { new AsyncFunction('$input', '$', '$env', '$json', 'require', n.parameters.jsCode); }
      catch (e) { errors.push(`node ${n.name}: JavaScript does not compile (${e.message})`); }
      if (/process\s*\.\s*env/.test(n.parameters.jsCode)) errors.push(`node ${n.name}: use $env (guarded), not process.env`);
    }
  }

  // 9. secrets
  for (const [re, what] of SECRET_PATTERNS) {
    const m = text.match(re);
    if (m) errors.push(`possible ${what} in plain text: "${m[0].slice(0, 24)}…"`);
  }

  if (errors.length) {
    failures++;
    console.log(`FAIL ${name}`);
    for (const e of errors) console.log(`  - ${e}`);
  } else {
    const types = [...new Set(nodes.map((n) => n.type.replace('n8n-nodes-base.', '')))].join(', ');
    console.log(`ok   ${name}: ${nodes.length} nodes, ${triggers.length} trigger(s) [${types}]`);
  }
}

console.log(failures ? `\n${failures} workflow(s) failed` : `\nall ${files.length} workflow(s) passed`);
process.exit(failures ? 1 : 0);
