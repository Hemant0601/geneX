#!/usr/bin/env node
// Switches the public domain from askhemant.ai to another domain across the repo's
// public-facing and automation files. Built for the lean path: launch on askhemant.com
// first and move to askhemant.ai later (website/DEPLOY-HOSTINGER.md, "Lean path").
//
// Usage (from the repo root; Node 18+, no dependencies):
//   node tools/switch-domain.mjs askhemant.com           # dry run: lists every file and how many replacements
//   node tools/switch-domain.mjs askhemant.com --write   # applies them
//
// What it changes:
//   - "askhemant.ai" (so also hello@askhemant.ai, www.askhemant.ai, n8n.askhemant.ai, https://askhemant.ai/...)
//     and its regex-escaped form "askhemant\.ai" (.htaccess rules, the carousel link-pill pattern)
//   - in: website/, lead-magnet/src/, lead-magnet/README.md, instagram/ (md, json, csv), tools/render/data/,
//     tools/render/templates/, tools/render/README.md, sales/, automations/ (json, md, demo, tools),
//     docs/03-accounts-setup-guide.md
//   - website/.htaccess: the block between "# BEGIN SECOND-DOMAIN-REDIRECT" and "# END SECOND-DOMAIN-REDIRECT"
//     (askhemant.com -> askhemant.ai) is commented out when the new domain is the one it redirects from,
//     because it would otherwise redirect the site to itself. For any other new domain it is retargeted.
//
// What it never touches:
//   - docs/00-strategy.md, docs/01-brand-and-domain.md, docs/research/ and README.md (the decision history)
//   - website/DEPLOY-HOSTINGER.md (it documents both paths)
//   - binary files (PNG, PDF, XLSX, fonts): re-render those afterwards; the --write output lists the commands
//
// Lines it deliberately leaves alone, and lists so you can review them:
//   - the Instagram handle "@askhemant.ai" (a handle, not a domain; "hello@askhemant.ai" is still changed)
//   - lines that already mention the new domain (e.g. "askhemant.com → 301 redirect → askhemant.ai")
//   - Markdown lines about buying or renewing the .ai domain itself (2-year term, renewal, WHOIS, domain search)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OLD = 'askhemant.ai';

const SCOPE = [
  'website',
  'lead-magnet/src',
  'lead-magnet/README.md',
  'instagram',
  'tools/render/data',
  'tools/render/templates',
  'tools/render/README.md',
  'sales',
  'automations',
  'docs/03-accounts-setup-guide.md',
];
const NEVER = [
  'website/DEPLOY-HOSTINGER.md',
  'docs/00-strategy.md',
  'docs/01-brand-and-domain.md',
  'docs/research',
  'README.md',
];
const BINARY = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.pdf', '.xlsx', '.xls', '.docx',
  '.pptx', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.zip', '.gz', '.mp4', '.mov', '.webm', '.mp3']);
const SKIP_DIRS = new Set(['.git', 'node_modules', 'graphics', 'pages']); // graphics/ and pages/ hold rendered PNGs
const KEEP_MD = /\b2-year\b|renew|first year|Get a new domain|Domain name search|WHOIS/i;
const BEGIN = '# BEGIN SECOND-DOMAIN-REDIRECT';
const END = '# END SECOND-DOMAIN-REDIRECT';

// ---------- arguments ----------
const argv = process.argv.slice(2);
const write = argv.includes('--write');
const unknown = argv.filter((a) => a.startsWith('--') && a !== '--write');
const positional = argv.filter((a) => !a.startsWith('--'));
const usage = 'Usage: node tools/switch-domain.mjs <new-domain> [--write]\n' +
  '  e.g. node tools/switch-domain.mjs askhemant.com          (dry run)\n' +
  '       node tools/switch-domain.mjs askhemant.com --write  (apply)';
if (unknown.length || positional.length !== 1) { console.error(usage); process.exit(1); }
const NEW = positional[0].trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');
if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(NEW)) {
  console.error(`"${positional[0]}" doesn't look like a domain.\n${usage}`); process.exit(1);
}
if (NEW === OLD) { console.error(`The new domain is the same as the current one (${OLD}). Nothing to do.`); process.exit(1); }

// ---------- file walk ----------
const relOf = (abs) => path.relative(REPO, abs).split(path.sep).join('/');
const isNever = (rel) => NEVER.some((n) => rel === n || rel.startsWith(n + '/'));
function walk(abs, out) {
  if (!fs.existsSync(abs)) return out;
  const st = fs.statSync(abs);
  const rel = relOf(abs);
  if (isNever(rel)) return out;
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(abs))) return out;
    for (const name of fs.readdirSync(abs).sort()) walk(path.join(abs, name), out);
  } else if (st.isFile() && !BINARY.has(path.extname(abs).toLowerCase())) {
    out.push(abs);
  }
  return out;
}
const files = [...new Set(SCOPE.flatMap((s) => walk(path.join(REPO, s), [])))];

// ---------- replacement ----------
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const LITERAL = new RegExp(`(?<![A-Za-z0-9-])${esc(OLD)}(?![A-Za-z0-9-])`, 'g');
const ESCAPED = /askhemant(\\{1,2})\.ai(?![A-Za-z0-9-])/g; // askhemant\.ai in regexes, askhemant\\.ai inside JS/JSON strings
const NEW_RE = new RegExp(`(?<![A-Za-z0-9-])${esc(NEW)}(?![A-Za-z0-9-])`, 'i');
const short = (t) => { t = t.trim(); return t.length > 110 ? t.slice(0, 107) + '…' : t; };

function replaceLine(line) {
  let n = 0;
  let out = line.replace(ESCAPED, (_m, bs) => { n++; return NEW.split('.').join(bs + '.'); });
  out = out.replace(LITERAL, (m, offset, whole) => {
    const before = whole[offset - 1];
    const before2 = whole[offset - 2] || '';
    if (before === '@' && !/[A-Za-z0-9._%+-]/.test(before2)) return m; // Instagram handle, not an email
    n++;
    return NEW;
  });
  return { out, n };
}

function transform(rel, text) {
  const lines = text.split('\n');
  const kept = [];
  let count = 0;
  let block = null; // {action}
  const isHtaccess = path.basename(rel) === '.htaccess';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isHtaccess && line.trim() === BEGIN) {
      // Decide what to do with the redirect block from its RewriteCond host pattern.
      let cond = null;
      for (let j = i + 1; j < lines.length && lines[j].trim() !== END; j++) {
        const m = lines[j].match(/^\s*#?\s*RewriteCond\s+%\{HTTP_HOST\}\s+(\S+)/);
        if (m) { cond = m[1]; break; }
      }
      let selfRedirect = false;
      try { selfRedirect = !!cond && new RegExp(cond, 'i').test(NEW); } catch { selfRedirect = false; }
      block = { action: selfRedirect ? 'disable' : 'retarget', changed: false };
      continue;
    }
    if (isHtaccess && block && line.trim() === END) {
      if (block.action === 'disable' && block.changed) {
        // add a one-line note right after BEGIN (once)
        const b = lines.findIndex((l) => l.trim() === BEGIN);
        if (!lines.slice(b + 1, i).some((l) => l.includes('Disabled by tools/switch-domain.mjs'))) {
          const indent = lines[b].match(/^\s*/)[0];
          lines.splice(b + 1, 0, `${indent}# Disabled by tools/switch-domain.mjs: the site runs on ${NEW} itself. Un-comment the rules below once the site moves to ${OLD}.`);
          i++;
        }
      }
      htaccessNote = block.action === 'disable'
        ? (block.changed ? `comments out the ${BEGIN.replace('# BEGIN ', '')} block` : 'redirect block already commented out')
        : 'retargets the second-domain redirect block';
      block = null;
      continue;
    }
    if (isHtaccess && block && block.action === 'disable') {
      if (line.trim() && !/^\s*#/.test(line)) {
        lines[i] = line.replace(/^(\s*)/, '$1# ');
        block.changed = true;
        count++;
      }
      continue; // never rewrite domains inside the disabled block, so it can be re-enabled as it was
    }
    LITERAL.lastIndex = 0; ESCAPED.lastIndex = 0;
    if (!line.includes(OLD) && !/askhemant\\{1,2}\.ai/.test(line)) continue;
    if (NEW_RE.test(line) && !block) {
      kept.push({ line: i + 1, why: `already mentions ${NEW}`, text: line });
      continue;
    }
    if (rel.endsWith('.md') && KEEP_MD.test(line)) {
      kept.push({ line: i + 1, why: `about buying or renewing ${OLD} itself`, text: line });
      continue;
    }
    const { out, n } = replaceLine(line);
    if (/(?<![A-Za-z0-9._%+-])@askhemant\.ai(?![A-Za-z0-9-])/.test(out)) kept.push({ line: i + 1, why: 'Instagram handle @askhemant.ai (kept)', text: line });
    if (n) { lines[i] = out; count += n; }
  }
  return { out: lines.join('\n'), count, kept };
}

// ---------- run ----------
let htaccessNote = '';
const rows = [];
const keptAll = [];
let total = 0;
let htaccessFound = false;
for (const abs of files) {
  const rel = relOf(abs);
  const buf = fs.readFileSync(abs);
  if (buf.includes(0)) continue; // binary without a known extension
  const text = buf.toString('utf8');
  htaccessNote = '';
  const { out, count, kept } = transform(rel, text);
  if (path.basename(rel) === '.htaccess' && text.includes(BEGIN)) htaccessFound = true;
  for (const k of kept) keptAll.push({ rel, ...k });
  if (count && out !== text) {
    rows.push({ rel, count, note: htaccessNote });
    total += count;
    if (write) fs.writeFileSync(abs, out);
  }
}

const w = Math.max(10, ...rows.map((r) => r.rel.length)) + 2;
console.log(`${write ? 'Switched' : 'Dry run:'} ${OLD} → ${NEW}${write ? '' : ' (nothing written; add --write to apply)'}\n`);
if (!rows.length) console.log(`  No occurrences of ${OLD} left in scope. Already switched?`);
for (const r of rows) console.log(`  ${r.rel.padEnd(w)}${String(r.count).padStart(4)}${r.note ? `   + ${r.note}` : ''}`);
console.log(`\n  ${total} change(s) in ${rows.length} file(s).`);
if (!htaccessFound) console.log(`\n  ! website/.htaccess has no "${BEGIN}" marker: check its askhemant.com redirect by hand.`);
if (keptAll.length) {
  console.log(`\nLeft as they are (review these lines by hand):`);
  for (const k of keptAll) console.log(`  ${k.rel}:${k.line}  [${k.why}]  ${short(k.text)}`);
}
console.log(`\nNever touched: ${NEVER.join(', ')}, and binary files (PNG, PDF, XLSX, fonts).`);
if (write && rows.length) {
  console.log(`
Next (from the repo root):
  1. node lead-magnet/render.mjs                                   # the kit PDF + pages, and website/kit/lead-leak-kit.pdf
  2. node tools/render/render-carousels.mjs && node tools/render/render-assets.mjs   # Instagram graphics
  3. python3 lead-magnet/src/build_calculator.py                   # the calculator .xlsx (needs openpyxl)
  4. website/assets/img/og-image.png has ${OLD} drawn into it: replace it with a 1200 x 630 version that shows ${NEW}
  5. If the site was already live and assets/js/site.js changed, bump ?v= in every page's <head>
  6. Re-import the n8n workflows that changed, and update the accounts that store the domain
     (Cal.com, Web3Forms, GA4, Clarity, Search Console, Razorpay, Instagram bio links): website/DEPLOY-HOSTINGER.md, "Lean path"
  7. Check: grep -rn "${OLD}" website   (only lines listed above should remain)`);
}
