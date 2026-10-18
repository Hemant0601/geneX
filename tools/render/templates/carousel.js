/* AskHemant carousel renderer: one function per `layout` in instagram/carousels.json.
   AH.renderSlide(slide, ctx) builds #slide and returns the fit settings for render-carousels.mjs.
   ctx = { id, index (1-based), total, demo }

   Formatting rules (display only; the copy itself always comes from the JSON):
   - `highlight` is the first match in `heading`: amber marker band on Paper, amber text on Ink/Indigo.
   - list items "Name: ₹X / $Y" become price rows; "04 · Text" gets a number tile;
     "Lead: rest" sets the lead in bold. A list whose eyebrow or heading says "not" gets ✗ markers;
     a list of questions gets numbers. Override with slide.marker = check | cross | number | none.
   - step items "Day 5: text" show "Day 5" in the node; "Optional: text" gets a dashed node.
   - statement body "… Free fix: text" moves the fix into a green callout (like the kit).
   - stat: the highlight is shown huge; a % highlight also gets a 0–100 bar.
   - cta: "Comment WORD" shows a comment pill with WORD; an askhemant.ai/... URL shows a link pill
     (and a leading "askhemant.ai/... ." sentence is not repeated in the body).
   Optional per-slide fields the JSON may add: demo (true), bg (paper|ink|indigo), marker, source,
   maxHeading (px cap on the heading size, to keep a series of slides at one size). */
(function () {
  const AH = window.AH;
  const { rich, esc, icon } = AH;

  const DEFAULT_BG = { hook: 'paper', statement: 'paper', list: 'paper', steps: 'paper', compare: 'paper', price: 'paper', stat: 'ink', cta: 'indigo' };
  const pad2 = (n) => String(n).padStart(2, '0');

  function leadSplit(text) {
    const m = String(text).match(/^([^:]{2,34}):\s+(.+)$/);
    return m ? { lead: m[1], rest: m[2] } : null;
  }

  /* ---------- per-layout builders (return inner HTML of .s-content + main alignment) ---------- */
  const L = {};

  L.hook = (s) => ({
    align: 'center',
    html: `
      ${s.eyebrow ? `<div class="kicker" data-small>${rich(s.eyebrow)}</div>` : ''}
      <h1 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h1>
      ${s.body ? `<p class="body" data-role="body">${rich(s.body)}</p>` : ''}`,
    fit: [{ name: '--h', min: 96 }, { name: '--b', min: 38 }, { name: '--h', min: 72 }, { name: '--b', min: 34 }],
  });

  L.statement = (s, ctx) => {
    const num = (s.number != null ? String(s.number) : (String(s.eyebrow || '').match(/^Leak\s+(\d{1,2})$/i) || [])[1]);
    let body = s.body || '';
    let callout = '';
    const fx = body.match(/^(.*?)\s*\b(Free fix(?: tonight| this week)?):\s*(.+)$/i);
    if (fx) {
      body = fx[1];
      const t = fx[3].charAt(0).toUpperCase() + fx[3].slice(1);
      callout = `<div class="callout"><div class="kicker" data-small>${esc(fx[2])}</div><p class="body" data-role="body">${rich(t)}</p></div>`;
    }
    return {
      align: 'center',
      html: `
        ${num ? `<div class="num-tile" data-small>${esc(pad2(num))}</div>` : ''}
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h2>
        <div class="accent"></div>
        ${body ? `<p class="body" data-role="body">${rich(body)}</p>` : ''}
        ${callout}`,
      fit: [{ name: '--h', min: 84 }, { name: '--b', min: 40 }, { name: '--h', min: 64 }, { name: '--b', min: 34 }],
    };
  };

  L.list = (s) => {
    const items = s.items || [];
    let marker = s.marker;
    if (!marker) {
      if (/\bnot\b/i.test(`${s.eyebrow} ${s.heading}`)) marker = 'cross';
      else if (items.length && items.every((t) => /\?\s*$/.test(t))) marker = 'number';
      else marker = 'check';
    }
    const lis = items.map((t, i) => {
      const pm = String(t).match(/^(.+?):\s+((?:from\s)?₹[\d,]+\s\/\s(?:from\s)?\$[\d,]+)(.*)$/);
      if (pm) {
        const [, name, price, suffix] = pm;
        return `<li class="price-row"><span class="t">${rich(name)}</span><span class="p">${rich(price)}${suffix.trim() ? `<small data-small>${rich(suffix.trim())}</small>` : ''}</span></li>`;
      }
      const nm = String(t).match(/^(\d{1,2})\s*·\s*(.+)$/);
      if (nm) return `<li><span class="mk num" data-small>${esc(pad2(nm[1]))}</span><span class="t">${rich(nm[2])}</span></li>`;
      const mk = marker === 'none' ? '' :
        marker === 'number' ? `<span class="mk num" data-small>${pad2(i + 1)}</span>` :
        `<span class="mk ${marker}">${marker === 'cross' ? icon.cross : icon.check}</span>`;
      const ls = leadSplit(t);
      const txt = ls ? `<b>${rich(ls.lead)}:</b> ${rich(ls.rest)}` : rich(t);
      return `<li>${mk}<span class="t">${txt}</span></li>`;
    }).join('');
    return {
      align: 'top',
      html: `
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h2>
        <ul class="items">${lis}</ul>
        ${s.body ? `<p class="note" data-role="body">${rich(s.body)}</p>` : ''}`,
      fit: [{ name: '--gap', min: 20 }, { name: '--h', min: 76 }, { name: '--i', min: 38 }, { name: '--b', min: 34 }, { name: '--gap', min: 14 }, { name: '--h', min: 64 }, { name: '--i', min: 34 }],
      grow: [{ name: '--gap', max: 40 }],
    };
  };

  L.steps = (s) => {
    const items = s.items || [];
    const hasDay = items.some((t) => /^Day\s+\d+:/i.test(t));
    const lis = items.map((t, i) => {
      const day = String(t).match(/^(Day\s+\d+):\s*(.+)$/i);
      const opt = String(t).match(/^(Optional):\s*(.+)$/i);
      if (day) return `<li><span class="node" data-small>${esc(day[1].toUpperCase())}</span><span class="t">${rich(day[2].charAt(0).toUpperCase() + day[2].slice(1))}</span></li>`;
      if (opt) return `<li class="is-opt"><span class="node opt">${icon.plus}</span><span class="t"><b>${esc(opt[1])}</b>${rich(opt[2])}</span></li>`;
      const ls = leadSplit(t);
      const txt = ls ? `<b>${rich(ls.lead)}</b><span class="rest">${rich(ls.rest.charAt(0).toUpperCase() + ls.rest.slice(1))}</span>` : rich(t);
      return `<li><span class="node" data-small>${hasDay ? '' : i + 1}</span><span class="t">${txt}</span></li>`;
    }).join('');
    return {
      align: 'top',
      html: `
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h2>
        <ol class="steps" style="${hasDay ? '--node-w:164px' : ''}">${lis}</ol>
        ${s.body ? `<p class="note" data-role="body">${rich(s.body)}</p>` : ''}`,
      fit: [{ name: '--gap', min: 28 }, { name: '--h', min: 76 }, { name: '--i', min: 38 }, { name: '--gap', min: 18 }, { name: '--h', min: 64 }, { name: '--i', min: 34 }],
      grow: [{ name: '--gap', max: 92 }],
    };
  };

  L.compare = (s) => {
    const col = (side, c) => `
      <div class="col ${side}">
        <div class="kicker" data-small>${rich(c.label)}</div>
        <ul>${(c.items || []).map((t) => `<li><span class="ci">${side === 'left' ? icon.check : icon.plus}</span><span>${rich(t)}</span></li>`).join('')}</ul>
      </div>`;
    return {
      align: 'top',
      html: `
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h2>
        <div class="cols">${col('left', s.left || {})}<div class="vs-row"><span class="vs" data-small>vs</span></div>${col('right', s.right || {})}</div>
        ${s.body ? `<p class="note" data-role="body">${rich(s.body)}</p>` : ''}`,
      fit: [{ name: '--h', min: 72 }, { name: '--gap', min: 12 }, { name: '--i', min: 34 }, { name: '--h', min: 64 }],
    };
  };

  L.price = (s) => {
    const p = s.price || {};
    const parts = String(p.note || '').split(/\s+·\s+/).map((x) => x.trim()).filter(Boolean);
    const gst = parts.find((x) => /GST/i.test(x));
    const terms = parts.filter((x) => x !== gst);
    const label = ['Fixed price', gst].filter(Boolean).join(' · ');
    return {
      align: 'top',
      html: `
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h2>
        <div class="price-card">
          <div class="kicker" data-small>${rich(label)}</div>
          <div class="pc-inr">${rich(p.inr).replace(/,/g, '<span class="cm">,</span>')}</div>
          ${p.usd ? `<div class="pc-usd">${rich(p.usd).replace(/,/g, '<span class="cm">,</span>')} <small data-small>USD</small></div>` : ''}
        </div>
        ${terms.length ? `<ul class="terms">${terms.map((t) => `<li><span class="ci">${icon.check}</span><span>${rich(t.charAt(0).toUpperCase() + t.slice(1))}</span></li>`).join('')}</ul>` : ''}
        ${s.body ? `<p class="body" data-role="body">${rich(s.body)}</p>` : ''}`,
      fit: [{ name: '--price', min: 140, step: 4 }, { name: '--h', min: 76 }, { name: '--b', min: 36 }, { name: '--i', min: 36 }, { name: '--h', min: 64 }, { name: '--price', min: 110 }, { name: '--b', min: 34 }, { name: '--i', min: 34 }],
    };
  };

  L.stat = (s) => {
    const hl = s.highlight || '';
    const pct = hl.match(/^(\d+(?:\.\d+)?)%$/);
    return {
      align: 'top',
      html: `
        ${hl ? `<div class="big">${rich(hl)}</div>` : ''}
        ${pct ? `<div class="bar"><i style="width:${Math.min(100, parseFloat(pct[1]))}%"></i></div><div class="bar-scale" data-small><span>0%</span><span>100%</span></div>` : ''}
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight)}</h2>
        ${s.body ? `<p class="body" data-role="body">${rich(s.body)}</p>` : ''}`,
      fit: [{ name: '--big', min: 260, step: 6 }, { name: '--h', min: 72 }, { name: '--b', min: 38 }, { name: '--big', min: 200, step: 6 }, { name: '--h', min: 64 }, { name: '--b', min: 34 }],
    };
  };

  L.cta = (s) => {
    const kw = (String(s.heading).match(/\bComment\s+([A-Z]{3,})\b/) || [])[1];
    const url = (`${s.body || ''} ${s.heading || ''}`.match(/askhemant\.ai\/[a-z0-9-]+/i) || [])[0];
    let body = s.body || '';
    let box = '';
    if (kw) {
      box = `<div class="cta-box"><span class="ci">${icon.chat}</span><span class="kw">${esc(kw)}</span><span class="go">${icon.arrow}</span></div>`;
    } else if (url) {
      box = `<div class="cta-box"><span class="ci">${icon.link}</span><span class="url">${esc(url)}</span><span class="go">${icon.arrow}</span></div>`;
      body = body.replace(new RegExp('^' + url.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '\\.?\\s*'), '');
    }
    return {
      align: 'center',
      html: `
        <h2 class="h" data-role="heading">${AH.richH(s.heading, s.highlight).replace(/(Comment\s+(?:<mark>)?[A-Z]{3,}(?:<\/mark>)?|(?:<mark>)?Fit Call(?:<\/mark>)?:)/, '<span class="nw">$1</span>')}</h2>
        ${box}
        ${body ? `<p class="body" data-role="body">${rich(body)}</p>` : ''}
        <div class="tagline" data-small>No lead left on read<span style="color:var(--ah-amber)">.</span></div>`,
      fit: [{ name: '--h', min: 88 }, { name: '--b', min: 38 }, { name: '--h', min: 72 }, { name: '--b', min: 34 }],
    };
  };

  AH.layouts = Object.keys(L);

  AH.renderSlide = (slide, ctx) => {
    AH.warnings = [];
    const layout = slide.layout;
    if (!L[layout]) throw new Error(`unknown layout "${layout}" (use one of: ${AH.layouts.join(', ')})`);
    const bg = slide.bg || DEFAULT_BG[layout];
    const demo = !!(slide.demo ?? ctx.demo);
    const isHook = layout === 'hook';
    const isLast = ctx.index === ctx.total;
    const built = L[layout](slide, ctx);
    const dark = bg !== 'paper';

    const counter = `<span class="counter" data-small><b>${pad2(ctx.index)}</b> / ${pad2(ctx.total)}</span>`;
    const headLeft = [
      demo ? AH.demoBadge() : '',
      isHook ? `<img class="wordmark" src="${dark ? AH.asset.wordmarkOnDark : AH.asset.wordmark}" alt="AskHemant">`
             : (slide.eyebrow ? `<span class="kicker" data-small>${rich(slide.eyebrow)}</span>` : ''),
    ].join('');
    const footRight = isHook
      ? `<span class="swipe" data-small>Swipe ${'<span class="g">' + icon.arrow + '</span>'}</span>`
      : isLast ? `<span data-small>askhemant.ai</span>`
      : `<span class="next">${icon.arrow}</span>`;

    const html = `
      <div id="slide" class="slide on-${bg} l-${layout}" data-layout="${layout}" data-align="${built.align}">
        <header class="s-head"><div class="s-head-left">${headLeft}</div>${counter}</header>
        <main class="s-main"><div class="s-content">${built.html}</div></main>
        ${slide.source ? `<div class="s-source" data-small><b>Source:</b> ${rich(slide.source)}</div>` : ''}
        <footer class="s-foot">
          <div class="s-brand" data-small><img class="mark" src="${bg === 'indigo' ? AH.asset.markInverse : AH.asset.mark}" alt="">@askhemant</div>
          <div class="foot-right">${footRight}</div>
        </footer>
      </div>`;
    document.body.innerHTML = html;
    // optional cap on the heading size, so a series of slides (Leak 01, 02, 03) shares one size
    if (slide.maxHeading) {
      const root = document.getElementById('slide');
      const cur = parseFloat(getComputedStyle(root).getPropertyValue('--h'));
      root.style.setProperty('--h', Math.min(cur, Number(slide.maxHeading)) + 'px');
    }
    return { fit: built.fit, grow: built.grow || [] };
  };

  // Fit #slide's content into its <main>, then return QA results.
  AH.finishSlide = (fitVars, growVars = []) => {
    const root = document.getElementById('slide');
    const main = root.querySelector('.s-main');
    const content = root.querySelector('.s-content');
    // measure the space the content may use (main minus its padding)
    const frame = { get clientHeight() { const cs = getComputedStyle(main); return main.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom); } };
    const fits = AH.fit(frame, content, fitVars || [], root);
    if (fits) AH.setHeadings(root, '--h', 64, () => content.getBoundingClientRect().height <= frame.clientHeight + 0.5);
    // sparse slides: open up the rhythm (never past `max`), keeping at least 120 px of air
    if (fits) for (const g of growVars) {
      let guard = 0;
      while (guard++ < 60 && frame.clientHeight - content.getBoundingClientRect().height > 120) {
        const cur = parseFloat(getComputedStyle(root).getPropertyValue(g.name));
        if (!(cur < g.max)) break;
        root.style.setProperty(g.name, Math.min(g.max, cur + 2) + 'px');
      }
      if (content.getBoundingClientRect().height > frame.clientHeight) root.style.setProperty(g.name, (parseFloat(getComputedStyle(root).getPropertyValue(g.name)) - 2) + 'px');
    }
    // optical placement: centred layouts sit slightly above centre, top layouts drop a little
    const free = Math.round(frame.clientHeight - content.getBoundingClientRect().height);
    if (free > 0) content.style.marginTop = Math.round(root.dataset.align === 'center' ? free * 0.42 : Math.min(free * 0.3, 110)) + 'px';
    const qa = AH.qa({ root, minHeading: 64, minBody: 34, bodyScope: '.s-main', fallbackBg: [247, 245, 240] });
    if (!fits) qa.problems.push(`content overflows the slide by ${Math.round(content.getBoundingClientRect().height - frame.clientHeight)}px even at minimum sizes: cut copy`);
    const vars = {};
    for (const v of fitVars || []) vars[v.name] = getComputedStyle(root).getPropertyValue(v.name).trim();
    return { ...qa, vars, free };
  };
})();
