/* AskHemant vertical assets: Reel covers, Stories, highlight covers, overlays, end cards.
   Each AH.render* function fills <body> and returns { selector, safe, transparent } for render-assets.mjs.
   All copy comes from tools/render/data/assets.json. */
(function () {
  const AH = window.AH;
  const { rich, esc, icon } = AH;

  const BUBBLE = 'M136 48h240c53 0 96 43 96 96v152c0 53-43 96-96 96H214l-104 78c-10 7-23-2-20-14l17-64c-41-11-67-47-67-96V144c0-53 43-96 96-96z';
  const bubbleBg = (bg) => `<svg class="bubble-bg" data-bleed viewBox="0 0 512 512" aria-hidden="true"><path fill="${bg === 'paper' ? 'var(--ah-indigo)' : bg === 'ink' ? 'var(--ah-indigo-tint)' : '#fff'}" d="${BUBBLE}"/></svg>`;
  const wordmark = (bg) => `<img class="wordmark" src="${bg === 'paper' ? AH.asset.wordmark : AH.asset.wordmarkOnDark}" alt="AskHemant">`;
  const markFor = (bg) => (bg === 'indigo' ? AH.asset.markInverse : AH.asset.mark);

  // Highlight icons: 120 x 120 grid, one stroke weight, round ends, plus the amber "unread" dot.
  const HL = {
    flag: '<path d="M30 108V14"/><path d="M30 20c14-8 26 6 40 0s20-6 26-4v44c-6-2-12-2-26 4s-26-8-40 0"/>',
    tag: '<path d="M62 14h34a10 10 0 0 1 10 10v34L60 104a9 9 0 0 1-12.7 0L16 72.7a9 9 0 0 1 0-12.7z"/><circle cx="83" cy="37" r="8"/>',
    stopwatch: '<circle cx="60" cy="68" r="40"/><path d="M48 12h24M60 12v16M60 68V46"/>',
    workflow: '<rect x="10" y="20" width="100" height="80" rx="14"/><path d="M10 40h100"/><path d="M32 58l12 10-12 10M54 80h22"/>',
    question: '<path d="M24 18h72a12 12 0 0 1 12 12v42a12 12 0 0 1-12 12H58L34 104V84H24a12 12 0 0 1-12-12V30a12 12 0 0 1 12-12z"/><path d="M47 40a13 13 0 1 1 18 12c-3 1.6-5 4-5 8"/><circle cx="60" cy="71.5" r="5" fill="currentColor" stroke="none"/>',
    chart: '<path d="M16 14v90h92"/><path d="M40 88V66M62 88V48M84 88V30"/>',
  };
  const DOT = { flag: [100, 14], tag: [104, 14], stopwatch: [92, 34], workflow: [108, 20], question: [108, 16], chart: [104, 14] };

  AH.renderHighlight = (h) => {
    const d = HL[h.icon];
    if (!d) throw new Error(`unknown highlight icon "${h.icon}" (use ${Object.keys(HL).join(', ')})`);
    const [cx, cy] = DOT[h.icon];
    document.body.innerHTML = `
      <div id="canvas" class="canvas hl on-indigo">
        <div class="ico" data-safe><svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${d}<circle cx="${cx}" cy="${cy}" r="11" fill="var(--ah-amber)" stroke="var(--ah-indigo)" stroke-width="5"/></svg></div>
      </div>`;
    // the circular crop: keep the icon inside a 560 px circle around the centre
    return { selector: '#canvas', safe: { x0: 230, y0: 650, x1: 850, y1: 1270 } };
  };

  /* ---------- Reel covers ---------- */
  function device(dv, bg) {
    if (!dv) return '';
    switch (dv.type) {
      case 'message':
        return `<div class="device"><div class="msg"><span class="unread"></span><span class="t">${rich(dv.text)}</span><span class="m" data-small>${rich(dv.time)}</span></div></div>`;
      case 'notify':
        return `<div class="device"><div class="notify"><span class="ico">${icon.chat}</span><span class="l">${rich(dv.label)}</span><span class="s" data-small>${rich(dv.meta || '')}</span></div></div>`;
      case 'stopwatch':
        return `<div class="device sw-big">${AH.stopwatch(dv.time)}${dv.label ? `<div class="sw-label" data-small>${rich(dv.label)}</div>` : ''}</div>`;
      case 'clock':
        return `<div class="device"><span class="clock-pill">${moon}${rich(dv.time)}</span></div>`;
      case 'slots':
        // `labels` (e.g. ["01","02","03"]) shows neutral slot numbers instead of OPEN/TAKEN: use it on any
        // graphic that stays up after the count changes (a pinned Reel cover), so it never shows a stale count
        return `<div class="device"><div class="slots">${Array.from({ length: dv.total }, (_, i) => `<span class="slot ${dv.labels || i < dv.open ? '' : 'taken'}" data-small>${dv.labels ? esc(dv.labels[i] ?? '') : i < dv.open ? 'OPEN' : 'TAKEN'}</span>`).join('')}</div></div>`;
      case 'flow':
      {
        const per = Math.ceil(dv.steps.length / Math.ceil(dv.steps.length / 3));
        const rows = [];
        for (let i = 0; i < dv.steps.length; i += per) rows.push(dv.steps.slice(i, i + per));
        return `<div class="device"><div class="flow">${rows.map((r, ri) => `<div class="row">${r.map((s, i) => `${i ? `<span class="arr">${icon.arrow}</span>` : ''}<span class="step" data-small>${rich(s)}</span>`).join('')}${ri < rows.length - 1 ? `<span class="arr">${icon.arrow}</span>` : ''}</div>`).join('')}</div></div>`;
      }
      case 'chips':
        return `<div class="device"><div class="chips">${dv.items.map((c, i) => `${i ? `<span class="chip-arrow">${downArrow}</span>` : ''}<span class="chip ${c.tone || ''}">${icon[c.icon] || ''}<span>${rich(c.text)}</span></span>`).join('')}</div></div>`;
      default:
        throw new Error(`unknown cover device "${dv.type}"`);
    }
  }
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>';
  const downArrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v15M6 13l6 6 6-6"/></svg>';

  function coverTitle(c) {
    let html = AH.richH(c.title, c.highlight);
    if (c.strike) {
      const s = AH.richH(c.strike);
      html = html.replace(s, `<span class="strike">${s}</span>`);
    }
    return html;
  }

  AH.renderCover = (c, opts = {}) => {
    const bg = opts.overlay ? 'none' : c.bg || 'ink';
    const darkish = bg !== 'paper';
    if (opts.overlay) {
      document.body.innerHTML = `
        <div id="canvas" class="canvas cover overlay-title on-ink" style="background:transparent">
          <div class="zone" data-safe>
            <div class="zone-top">${c.demo ? AH.demoBadge() : '<span></span>'}</div>
            <div class="zone-mid">
              <div class="title-wrap"><h1 class="title" data-role="heading" style="--t:128px">${coverTitle(c)}</h1></div>
              ${c.small ? `<div class="small-wrap"><span class="small">${rich(c.small)}</span></div>` : ''}
            </div>
          </div>
        </div>`;
      return { selector: '#canvas', transparent: true, safe: { x0: 80, y0: 420, x1: 1000, y1: 1500 }, fitVar: '--t' };
    }
    document.body.innerHTML = `
      <div id="canvas" class="canvas cover on-${bg}">
        ${bubbleBg(bg)}
        <div class="zone" data-safe>
          <div class="zone-top">
            ${c.demo ? AH.demoBadge() : `<span class="kicker" data-small>${rich(c.kicker || '')}</span>`}
            ${c.demo && c.kicker ? `<span class="kicker" data-small>${rich(c.kicker)}</span>` : ''}
          </div>
          <div class="zone-mid">
            <h1 class="title" data-role="heading">${coverTitle(c)}</h1>
            ${c.small ? `<p class="small" data-role="body">${rich(c.small)}</p>` : ''}
            ${c.fine ? `<p class="fine" data-small>${rich(c.fine)}</p>` : ''}
            ${device(c.device, bg)}
          </div>
          <div class="zone-foot">
            <span class="handle" data-small><img class="mark" src="${markFor(bg)}" alt="">@askhemant</span>
            <span class="id" data-small>askhemant.ai</span>
          </div>
        </div>
      </div>`;
    return { selector: '#canvas', safe: { x0: 80, y0: 420, x1: 1000, y1: 1500 }, fitVar: '--t' };
  };

  /* ---------- Stories ---------- */
  const STORY_SAFE = { x0: 64, y0: 250, x1: 1016, y1: 1580 };
  const storyShell = (bg, inner, top = true) => `
    <div id="canvas" class="canvas story on-${bg}">
      <div class="safe" data-safe>
        ${top ? `<div class="s-top">${wordmark(bg)}<span class="handle-s" data-small></span></div>` : ''}
        ${inner}
      </div>
    </div>`;

  AH.renderStory = (kind, d) => {
    let html = '';
    if (kind === 'askHemantSunday') {
      html = storyShell('indigo', `
        <div class="s-body">
          <span class="kicker" data-small>${rich(d.kicker)}</span>
          <h1 class="title" data-role="heading">${AH.richH(d.title, d.highlight)}</h1>
          <p class="sub" data-role="body">${rich(d.sub)}</p>
          <div class="sticker-zone" style="--zone-h:400px"></div>
          <div style="margin-top:44px;display:flex;flex-direction:column;gap:22px;align-items:flex-start">
            <span class="mono-chip" data-small><span class="dot"></span>${rich(d.when)}</span>
            <span class="fine" data-small>${rich(d.privacy)}</span>
          </div>
        </div>`);
    } else if (kind === 'askHemantSundayAnswer') {
      html = storyShell('ink', `
        <div class="s-body" style="justify-content:flex-start;padding-top:60px">
          <span class="kicker" data-small>${rich(d.kicker)} · answer</span>
          <div class="sticker-zone" style="--zone-h:380px;margin-top:36px"></div>
          <div style="flex:1"></div>
          <div class="tagline-s" data-small>${rich(d.tagline.replace(/\.$/, ''))}<span class="a">.</span></div>
        </div>`);
    } else if (kind === 'newPost') {
      const bg = d.bg || 'paper';
      html = storyShell(bg, `
        <div class="s-body" style="justify-content:flex-start;padding-top:44px">
          <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
            ${d.demo ? AH.demoBadge() : ''}
            <span class="mono-chip" data-small><span class="dot"></span>${rich(d.label)}</span>
          </div>
          ${d.line ? `<h1 class="title" data-role="heading" style="--t:76px;margin-top:34px;line-height:1.06">${AH.richH(d.line)}</h1>` : ''}
          <div class="slot-wrap">
            <div class="post-slot ${d.format}"></div>
            <span class="tap" data-small>${icon.arrowUp}Tap the ${d.format === 'reel' ? 'Reel' : 'post'} to open it</span>
          </div>
        </div>`);
    } else if (kind === 'founding') {
      const v = d.variant;
      const n = typeof v === 'number' ? v : null;
      let body;
      if (n === 0 || v === 'closed') {
        body = `
          <span class="kicker" data-small>${rich(d.kicker)}</span>
          <h1 class="title" data-role="heading" style="--t:104px;margin-top:30px">${AH.richH(v === 'closed' ? d.closed : d.full)}</h1>
          <p class="sub" data-role="body">${rich(v === 'closed' ? d.closedSub : d.fullSub)}</p>
          ${n === 0 ? `<div class="slot-row">${[0, 1, 2].map(() => '<span class="slot-tile taken" data-small>TAKEN</span>').join('')}</div>` : ''}`;
      } else {
        body = `
          <span class="kicker" data-small>${rich(d.kicker)}</span>
          <div style="display:flex;align-items:flex-end;gap:30px;margin-top:40px">
            <span class="big-n">${n}</span>
            <span class="of-n">of 3 slots<br>open</span>
          </div>
          <div class="slot-row">${[0, 1, 2].map((i) => `<span class="slot-tile ${i < n ? 'open' : 'taken'}" data-small>${i < n ? 'OPEN' : 'TAKEN'}</span>`).join('')}</div>
          <div style="margin-top:30px"><span class="mono-chip" data-small><span class="dot"></span>${rich(d.closes)}</span></div>
          <p class="sub" data-role="body" style="font-size:40px">${rich(d.offer)}</p>
          <p class="fine" style="margin-top:22px">${rich(d.inReturn)}</p>
          <div style="margin-top:44px"><span class="link-pill">${icon.link}${rich(d.link)}<span class="go">${icon.arrow}</span></span></div>`;
      }
      html = storyShell('ink', `<div class="s-body" style="padding-top:40px">${body}</div>`);
    } else if (kind === 'kitDm') {
      html = storyShell('indigo', `
        <div class="s-body" style="justify-content:space-between;padding-top:30px">
          <div>
            <span class="kit-pill" data-small><span class="dot"></span>${rich(d.pill)}</span>
            <h1 class="title" data-role="heading" style="--t:112px">${AH.richH(d.title)}</h1>
            <p class="sub" data-role="body" style="margin-top:24px">${rich(d.sub)}</p>
          </div>
          <img class="kit-cover" src="${AH.asset.kitCover}" alt="">
          <div>
            <span class="dm-pill"><span class="ci">${icon.chat}</span><span class="w">${rich(d.cta).replace(d.keyword, `<b>${esc(d.keyword)}</b>`)}</span><span class="go">${icon.arrow}</span></span>
            <p class="fine" style="margin-top:28px">${rich(d.note)}</p>
            <p class="fine" style="margin-top:8px"><b>${rich(d.alt)}</b></p>
          </div>
        </div>`);
    } else if (kind === 'kitComment') {
      html = storyShell('ink', `
        <div class="s-body" style="justify-content:flex-start;padding-top:40px">
          <h1 class="title" data-role="heading" style="--t:96px">${AH.richH(d.title, d.keyword)}</h1>
          <div class="slot-wrap">
            <div class="post-slot post"></div>
          </div>
          <p class="fine" style="font-size:36px">${rich(d.note)}</p>
        </div>`);
    } else throw new Error(`unknown story "${kind}"`);
    document.body.innerHTML = html;
    return { selector: '#canvas', safe: STORY_SAFE, fitVar: '--t' };
  };

  /* ---------- overlays (transparent) ---------- */
  AH.renderOverlay = (kind, d, opts = {}) => {
    let el = '';
    let pos = '';
    if (kind === 'badge') { el = `<div class="ov-wrap ov-badge">${AH.demoBadge(d)}</div>`; pos = 'left:41px;top:256px'; }
    else if (kind === 'stopwatch') { el = `<div class="ov-wrap ov-sw">${AH.stopwatch(d)}</div>`; pos = 'right:96px;top:256px'; }
    else if (kind === 'label') { el = `<div class="ov-wrap"><span class="ov-label ${/×/.test(d) ? 'speed' : ''}" data-small>${rich(d)}</span></div>`; pos = 'right:96px;top:360px'; }
    else if (kind === 'lowerThird') {
      el = `<div class="ov-wrap"><div class="lt"><img class="mark" src="${AH.asset.mark}" alt=""><div><div class="n">${esc(d.name)}<span class="sep">·</span><span class="brand">${esc(d.brand)}</span></div><div class="r" data-small>${rich(d.role)}</div></div></div></div>`;
      pos = 'left:41px;top:1046px';
    } else throw new Error(`unknown overlay "${kind}"`);
    if (opts.frame) {
      document.body.innerHTML = `<div id="canvas" class="canvas on-none"><div class="frame-pos" style="${pos}" data-safe>${el}</div></div>`;
      return { selector: '#canvas', transparent: true, safe: { x0: 41, y0: 256, x1: 984, y1: 1274 } };
    }
    document.body.innerHTML = `<div id="ov" style="display:inline-block">${el}</div>`;
    return { selector: '#ov .ov-wrap', transparent: true };
  };

  AH.renderEndCard = (e) => {
    const title = AH.richH(e.line, e.keyword);
    document.body.innerHTML = `
      <div id="canvas" class="canvas end on-indigo">
        ${bubbleBg('indigo')}
        <div class="safe" data-safe>
          ${wordmark('indigo')}
          <h1 class="title" data-role="heading">${title}</h1>
          <p class="sub" data-role="body">${rich(e.sub)}</p>
          <span class="dm-pill"><span class="ci">${icon.chat}</span><span class="w">${esc(e.keyword)}</span><span class="go">${icon.arrow}</span></span>
          <p class="fine">${rich(e.note)}</p>
          <div class="tagline-s" style="margin-top:48px" data-small>No lead left on read<span class="a">.</span></div>
        </div>
      </div>`;
    return { selector: '#canvas', safe: { x0: 65, y0: 270, x1: 960, y1: 1250 }, fitVar: '--t' };
  };

  // Shrink the main title (CSS var) until the safe box content fits, then QA.
  AH.finishAsset = (info) => {
    const root = document.querySelector(info.selector);
    const box = root.querySelector('[data-safe]') || root;
    const overflowing = () => {
      const s = info.safe; if (!s) return false;
      const rr = root.getBoundingClientRect();
      for (const el of box.querySelectorAll('*')) {
        const b = el.getBoundingClientRect();
        if (!b.width || !b.height) continue;
        if (b.bottom - rr.top > s.y1 + 0.5 || b.right - rr.left > s.x1 + 0.5) return true;
      }
      return [...box.querySelectorAll('[data-role]')].some((e) => e.scrollWidth > e.clientWidth + 1);
    };
    if (info.fitVar) {
      const t = root.querySelector('.title');
      if (t) {
        let guard = 0;
        while (overflowing() && guard++ < 60) {
          const cur = parseFloat(getComputedStyle(t).getPropertyValue(info.fitVar)) || parseFloat(getComputedStyle(t).fontSize);
          if (cur <= 64) break;
          t.style.setProperty(info.fitVar, (cur - 4) + 'px');
        }
        if (!info.transparent) AH.setHeadings(t, info.fitVar, 64, () => !overflowing());
      }
    }
    const qa = AH.qa({ root, minHeading: info.transparent ? 0 : 64, minBody: info.transparent ? 0 : 28, safe: info.safe || null, fallbackBg: info.transparent ? [11, 16, 32] : undefined, checkWidows: !info.transparent });
    if (overflowing()) qa.problems.push('content does not fit its safe zone');
    return qa;
  };
})();
