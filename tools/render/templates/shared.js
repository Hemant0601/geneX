/* AskHemant graphics: shared helpers for every template (window.AH).
   Text in, safe HTML out. Nothing here invents copy: it only formats the strings it is given. */
(function () {
  const AH = (window.AH = window.AH || {});

  // Paths are relative to tools/render/templates/
  AH.asset = {
    mark: '../../../brand/logo/mark.svg',
    markInverse: '../../../brand/logo/mark-inverse.svg',
    wordmark: '../../../brand/logo/wordmark.svg',
    wordmarkOnDark: '../../../brand/logo/wordmark-on-dark.svg',
    kitCover: '../../../lead-magnet/pages/page-01.png',
  };

  /* ---------- line icons (24px grid, stroke = currentColor) ---------- */
  const S = (d, extra = '') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  AH.icon = {
    check: S('<path d="M4.5 12.5l4.5 4.5L19.5 6.5"/>'),
    cross: S('<path d="M6 6l12 12M18 6L6 18"/>'),
    arrow: S('<path d="M4 12h15M13 6l6 6-6 6"/>'),
    arrowUp: S('<path d="M12 20V5M6 11l6-6 6 6"/>'),
    plus: S('<path d="M12 5v14M5 12h14"/>'),
    stopwatch: S('<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M9.5 2.75h5M12 2.75V6M18.2 6.8l1.4-1.4"/>'),
    chat: S('<path d="M5 4.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7.5L7 21v-3.5H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/>'),
    link: S('<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/>'),
    calendar: S('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    phone: S('<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>'),
  };
  // Glyphs as inline SVG so they never fall back to a system font.
  const G = {
    '→': `<span class="g g-arrow">${AH.icon.arrow}</span>`,
    '≈': `<span class="g g-approx"><svg viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M2.5 9.5c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0M2.5 15.5c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0"/></svg></span>`,
    '✓': `<span class="g">${AH.icon.check}</span>`,
    '✗': `<span class="g">${AH.icon.cross}</span>`,
  };

  AH.esc = (s) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // Typographic polish on already-escaped text: glue prices, times and dates so they never split.
  function polish(html, heading) {
    if (heading) html = html.replace(/(^|[\s(])([A-Za-z]{1,2}) (?=\S)/g, '$1$2&nbsp;'); // glue "No", "a", "I", "to" to the next word
    return html
      .replace(/(from\s)?₹[\d,]+(?:\s\/\s\$[\d,]+)?/g, (m) => `<span class="nw">${m}</span>`)
      .replace(/(?<![\w₹$])\$[\d,]+/g, (m) => `<span class="nw">${m}</span>`)
      .replace(/(\d{1,2}(?::\d{2})?) (am|pm)\b/g, '$1&nbsp;$2')
      .replace(/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, '$1&nbsp;$2')
      .replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (\d)/g, '$1&nbsp;$2')
      .replace(/(\d) (min|working|days|×)/g, '$1&nbsp;$2')
      .replace(/ (→|×|≈) /g, '&nbsp;$1 ')
      .replace(/(\S+) \+ (\S+)/g, '<span class="nw">$1 + $2</span>')
      // never break inside a hyphenated compound ("Speed-to-Lead", "guaranteed-ROI", "30-day")
      .replace(/(^|[\s(>;])([\w₹$%]+(?:-[\w₹$%]+)+)(?=[\s.,:;!?)<]|$)/g, '$1<span class="nw">$2</span>')
      .replace(/[→≈✓✗]/g, (c) => G[c])
      .replace(/\n/g, '<br>');
  }

  /* rich(text, highlight?, {mark}) → HTML string.
     The first occurrence of `highlight` is wrapped in <mark>. Everything else is escaped. */
  // Typographic quotes and apostrophes (the brand fonts have ‘ ’ “ ”).
  AH.smart = (t) => String(t ?? '')
    .replace(/(^|[\s(\[—–-])"/g, '$1“').replace(/"/g, '”')
    .replace(/(^|[\s(\[—–-])'/g, '$1‘').replace(/'/g, '’');

  AH.rich = (text, highlight, heading = false) => {
    const t = AH.smart(text);
    if (highlight) highlight = AH.smart(highlight);
    if (highlight) {
      // match case-insensitively, treating normal and non-breaking spaces alike
      const re = new RegExp(String(highlight).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s\u00A0]+/g, '[\\s\\u00A0]+'), 'i');
      const mm = t.match(re);
      if (mm) {
        const i = mm.index, len = mm[0].length;
        const a = t.slice(0, i), h = t.slice(i, i + len), b = t.slice(i + len);
        return polish(AH.esc(a), heading) + `<mark>${polish(AH.esc(h), heading)}</mark>` + polish(AH.esc(b), heading);
      }
      AH.warnings.push(`highlight "${highlight}" not found in "${t}"`);
    }
    return polish(AH.esc(t), heading);
  };
  // Headings: also glue the last two words when they are short ("need me?"), the classic widow fix.
  AH.richH = (text, highlight) => {
    let t = String(text ?? '').replace(/ → /g, ' →\u00A0'); // in headings the arrow starts the next line, never ends one
    const m = t.match(/^(.*\S)\s+(\S+)\s+(\S+)$/);
    if (m && (m[2] + m[3]).length <= 11 && !/[→×≈]/.test(m[2])) t = `${m[1]} ${m[2]}\u00A0${m[3]}`;
    return AH.rich(t, highlight, true);
  };

  AH.warnings = [];

  AH.el = (html) => {
    const d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  };

  AH.demoBadge = (text = 'DEMO – fictional business') =>
    `<span class="badge-demo" data-small><span class="dot"></span>${AH.esc(text)}</span>`;

  AH.stopwatch = (time, cls = '') =>
    `<span class="stopwatch ${cls}" data-small><span class="sw-ico">${AH.icon.stopwatch}</span><span class="sw-time">${AH.esc(time)}</span></span>`;

  // Wait until every <img> has decoded and every font face in use has loaded.
  AH.ready = async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; }))));
    await Promise.all(imgs.map((im) => (im.decode ? im.decode().catch(() => {}) : null)));
    // make sure every brand face is loaded even when this asset has no text in it
    await Promise.all(['700 40px "Space Grotesk"', '500 40px "Space Grotesk"', '400 40px "Inter"', '500 40px "Inter"', '600 40px "Inter"', '700 40px "Inter"', '500 40px "JetBrains Mono"', '700 40px "JetBrains Mono"']
      .map((f) => document.fonts.load(f, 'Aa0₹').catch(() => {})));
    await document.fonts.ready;
  };

  /* ---------- auto-fit: shrink CSS variables until the content box fits its frame ---------- */
  // vars: [{name:'--h', min:64}, ...] shrunk in order, 2px at a time.
  AH.fit = (frame, content, vars, root) => {
    const wide = () => [...content.querySelectorAll('[data-role]')].some((e) => e.scrollWidth > e.clientWidth + 1);
    const over = () => content.getBoundingClientRect().height > frame.clientHeight + 0.5 || wide();
    let guard = 0;
    for (const v of vars) {
      while (over() && guard++ < 400) {
        const cur = parseFloat(getComputedStyle(root).getPropertyValue(v.name));
        if (!(cur > v.min)) break;
        root.style.setProperty(v.name, Math.max(v.min, cur - (v.step || 2)) + 'px');
      }
    }
    return !over();
  };

  /* ---------- heading line-breaking ----------
     Chrome's text-wrap:balance can leave a lone short first line, so headings are balanced here:
     for each candidate size (100% down to 86% of the fitted size, never below `min`) and each
     max-width (100% down to 55%) that keeps the same line count, score the rag and keep the best.
     Score: squared shortfall of every line but the last, plus penalties for a lone last word or a
     very short last line, plus a small penalty for shrinking. */
  function scoreLines(ls) {
    if (!ls.length) return 0;
    const total = ls.reduce((k, l) => k + l.words.length, 0);
    const mx = Math.max(...ls.map((l) => l.width));
    let sc = 0;
    ls.forEach((l, i) => {
      const r = l.width / mx;
      const w = l.words, lastWord = w[w.length - 1] || '';
      const isLast = i === ls.length - 1;
      const endsSentence = /[.?!][”’)]?$/.test(lastWord);
      const weight = isLast ? 0.5 : endsSentence ? 0.4 : i === 0 ? 1.2 : 1.0;
      sc += weight * (1 - r) ** 2;
      if (!isLast) {
        if (w.length >= 2 && /[.?!][”’)]?$/.test(w[w.length - 2])) sc += 0.25; // a new sentence starts at the line end
        if (/[,:;]$/.test(lastWord)) sc -= 0.04;                                  // breaking at punctuation reads well
      } else if (ls.length > 1 && total >= 4 && w.length === 1) sc += 0.6;       // lone last word
    });
    return sc + 0.08 * Math.max(0, ls.length - 3);
  }
  function balanceWidth(el) {
    el.style.maxWidth = '';
    const full = el.clientWidth;
    let ls = AH.lines(el);
    const base = ls.length;
    let best = { score: scoreLines(ls), w: '' };
    if (base < 2) return best;
    for (let f = 0.98; f >= 0.55; f -= 0.02) {
      el.style.maxWidth = Math.round(full * f) + 'px';
      if (el.scrollWidth > el.clientWidth + 1) break;
      ls = AH.lines(el);
      if (ls.length !== base) break;
      const sc = scoreLines(ls);
      if (sc < best.score - 1e-6) best = { score: sc, w: el.style.maxWidth };
    }
    el.style.maxWidth = best.w;
    return best;
  }
  // Try the heading as written and with a line break after each sentence ("Mostly FAQs? / Use …").
  function balanceOne(el) {
    el.style.textWrap = 'wrap';
    if (!el.dataset.orig) el.dataset.orig = el.innerHTML;
    const orig = el.dataset.orig;
    const broken = orig.replace(/([.?!](?:<\/mark>)?)(?: |&nbsp;|\u00A0)(?=(?:<[^>]+>)*[A-Z“‘₹$0-9])/g, '$1 <br>');
    const variants = broken !== orig ? [[orig, 0], [broken, -0.1]] : [[orig, 0]];
    let best = null;
    for (const [html, bonus] of variants) {
      el.innerHTML = html;
      const r = balanceWidth(el);
      const sc = r.score + bonus;
      if (!best || sc < best.score) best = { score: sc, html, w: r.w };
    }
    el.innerHTML = best.html;
    el.style.maxWidth = best.w;
    return best.score;
  }
  AH.setHeadings = (root, varName, min, fits) => {
    const els = root.matches('[data-role="heading"]') ? [root] : [...root.querySelectorAll('[data-role="heading"]')];
    if (!els.length) return;
    let start = parseFloat(getComputedStyle(root).getPropertyValue(varName));
    if (!(start > 0)) start = parseFloat(getComputedStyle(els[0]).fontSize);
    let best = null;
    for (let v = start; v >= Math.max(min, start * 0.76) - 0.01; v -= 2) {
      root.style.setProperty(varName, v + 'px');
      const sc = els.reduce((k, el) => k + balanceOne(el), 0) + ((start - v) / start) * 1.2;
      if (fits && !fits()) continue;
      if (!best || sc < best.score - 1e-6) best = { v, score: sc, widths: els.map((e) => e.style.maxWidth), htmls: els.map((e) => e.innerHTML) };
      if (sc < 0.03) break;
    }
    if (!best) { root.style.setProperty(varName, start + 'px'); els.forEach(balanceOne); return; }
    root.style.setProperty(varName, best.v + 'px');
    els.forEach((e, i) => { e.style.textWrap = 'wrap'; e.innerHTML = best.htmls[i]; e.style.maxWidth = best.widths[i]; });
  };

  /* ---------- QA, run inside the page after render ---------- */
  // Characters the self-hosted subsets can draw (checked against the woff2 cmaps).
  const OK = /^[ -~ -ÿ–—‘’“”•…€₹↑↓×]$/;
  const rgb = (s) => (String(s).match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const blend = (fg, bg) => { const a = fg.length > 3 ? fg[3] : 1; return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)); };
  function bgOf(el, fallback) {
    const stack = [];
    for (let e = el; e; e = e.parentElement) {
      const v = rgb(getComputedStyle(e).backgroundColor);
      if (v.length >= 3 && (v.length === 3 || v[3] > 0)) { stack.push(v); if (v.length === 3 || v[3] >= 0.99) break; }
    }
    let base = fallback || [255, 255, 255];
    if (stack.length && (stack[stack.length - 1].length === 3 || stack[stack.length - 1][3] >= 0.99)) base = stack.pop().slice(0, 3);
    while (stack.length) base = blend(stack.pop(), base);
    return base;
  }

  /* opts: { root, minHeading, minBody, safe: {x0,y0,x1,y1} | null, bodyScope, checkWidows } */
  AH.qa = (opts) => {
    const root = opts.root;
    const problems = [], warnings = [...AH.warnings];
    const rr = root.getBoundingClientRect();

    // 1. fonts
    for (const f of document.fonts) if (f.status === 'error') problems.push(`font failed: ${f.family} ${f.weight}`);
    for (const spec of ['700 40px "Space Grotesk"', '400 40px "Inter"', '700 40px "Inter"', '700 40px "JetBrains Mono"']) {
      if (!document.fonts.check(spec)) problems.push(`font not loaded: ${spec}`);
    }
    // 2. images
    for (const im of root.querySelectorAll('img')) if (!im.naturalWidth) problems.push(`image missing: ${im.getAttribute('src')}`);

    // 3. text checks
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textEls = new Set();
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      textEls.add(el);
      for (const ch of n.textContent) if (!OK.test(ch)) problems.push(`glyph not in brand fonts: "${ch}" (U+${ch.codePointAt(0).toString(16).toUpperCase()}) in "${n.textContent.trim().slice(0, 40)}"`);
    }
    for (const el of textEls) {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const size = parseFloat(cs.fontSize);
      const label = (el.textContent || '').trim().slice(0, 48);
      const fg = rgb(cs.color);
      const bg = bgOf(el, opts.fallbackBg);
      const fgB = blend(fg, bg);
      const cr = ratio(fgB, bg);
      const bold = parseInt(cs.fontWeight, 10) >= 600;
      const large = size >= 24 || (bold && size >= 18.66);
      const need = large ? 3 : 4.5;
      if (cr < need) problems.push(`contrast ${cr.toFixed(2)}:1 (< ${need}) for "${label}"`);
      // amber text on a light background is banned outright
      if (fg[0] === 255 && fg[1] === 176 && fg[2] === 32 && lum(bg) > 0.4) problems.push(`amber text on light background: "${label}"`);
      // size floors
      const small = el.closest('[data-small]');
      const heading = el.closest('[data-role="heading"]');
      if (heading && opts.minHeading && size < opts.minHeading - 0.5 && !el.closest('[data-role-ok]')) problems.push(`heading ${size}px < ${opts.minHeading}px: "${label}"`);
      if (!small && !heading && opts.minBody && size < opts.minBody - 0.5 && (!opts.bodyScope || el.closest(opts.bodyScope))) problems.push(`body text ${size}px < ${opts.minBody}px: "${label}"`);
      // clipping: text wider than its box
      if (cs.display !== 'inline' && el.clientWidth && el.scrollWidth > el.clientWidth + 2) problems.push(`text wider than its box (${el.scrollWidth} > ${el.clientWidth}px): "${label}"`);
    }

    // 4. everything inside the canvas (and inside the safe zone, when given)
    for (const el of root.querySelectorAll('*')) {
      if (el.closest('[data-bleed]')) continue;
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) continue;
      const x0 = b.left - rr.left, y0 = b.top - rr.top, x1 = b.right - rr.left, y1 = b.bottom - rr.top;
      if (x0 < -1 || y0 < -1 || x1 > rr.width + 1 || y1 > rr.height + 1) { problems.push(`element outside canvas: <${el.tagName.toLowerCase()} class="${el.className && el.className.baseVal === undefined ? el.className : ''}"> ${Math.round(x0)},${Math.round(y0)} → ${Math.round(x1)},${Math.round(y1)}`); continue; }
      const safe = opts.safe;
      if (safe && el.matches('[data-safe], [data-safe] *') && !el.closest('[data-safe-ignore], mark')) {
        if (x0 < safe.x0 - 1 || y0 < safe.y0 - 1 || x1 > safe.x1 + 1 || y1 > safe.y1 + 1) {
          problems.push(`outside safe zone (${safe.x0},${safe.y0})-(${safe.x1},${safe.y1}): "${(el.textContent || el.tagName).trim().slice(0, 40)}" at ${Math.round(x0)},${Math.round(y0)} → ${Math.round(x1)},${Math.round(y1)}`);
        }
      }
    }

    // 5. widows: a heading/body paragraph whose last line is a single short word
    if (opts.checkWidows !== false) {
      for (const el of root.querySelectorAll('[data-role="heading"], [data-role="body"]')) {
        if (el.dataset.orig ? /<br>/.test(el.dataset.orig) : el.querySelector('br')) continue; // deliberate line breaks
        const lines = AH.lines(el);
        if (lines.length >= 2) {
          const last = lines[lines.length - 1];
          const total = lines.reduce((n, l) => n + l.words.length, 0);
          if (total >= 4 && last.words.length === 1 && last.words[0].length <= 12) warnings.push(`widow "${last.words[0]}" on last line of "${el.textContent.trim().slice(0, 40)}"`);
        }
      }
    }
    return { problems: [...new Set(problems)], warnings: [...new Set(warnings)] };
  };

  // Group the words of an element into rendered lines.
  AH.lines = (el) => {
    const words = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      const re = /\S+/g; let m;
      while ((m = re.exec(n.textContent))) {
        const r = document.createRange();
        r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        const rect = r.getClientRects()[0];
        if (rect) words.push({ w: m[0], top: rect.top, h: rect.height, l: rect.left, r: rect.right });
      }
    }
    // inline SVG glyphs count as words too
    for (const g of el.querySelectorAll('.g')) { const rc = g.getBoundingClientRect(); words.push({ w: '·', top: rc.top, h: rc.height, l: rc.left, r: rc.right, glyph: true }); }
    words.sort((a, b) => a.top - b.top);
    const lines = [];
    for (const w of words) {
      const l = lines[lines.length - 1];
      if (l && Math.abs(w.top - l.top) < l.h * 0.5) { l.words.push(w.w); l.l = Math.min(l.l, w.l); l.r = Math.max(l.r, w.r); }
      else lines.push({ top: w.top, h: w.h, words: [w.w], l: w.l, r: w.r });
    }
    for (const l of lines) l.width = l.r - l.l;
    return lines;
  };
})();
