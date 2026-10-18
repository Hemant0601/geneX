/* AskHemant site script: vanilla JS, no dependencies.
   Reads window.ASKHEMANT_CONFIG (assets/js/config.js) and wires links, embeds,
   analytics and forms. Every feature degrades gracefully when a value is unset. */
(function () {
  "use strict";

  var C = window.ASKHEMANT_CONFIG || {};
  var doc = document;
  var root = doc.documentElement;
  root.classList.add("js");

  /* ---------- helpers ---------- */
  function isSet(v) {
    if (v === null || v === undefined) return false;
    if (typeof v === "number") return isFinite(v);
    v = String(v).trim();
    return v !== "" && v.indexOf("{{") === -1;
  }
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function getStore(type) {
    try {
      var s = window[type];
      s.setItem("__ah", "1");
      s.removeItem("__ah");
      return s;
    } catch (e) { return null; }
  }
  var local = getStore("localStorage");
  var session = getStore("sessionStorage");
  function sGet(s, k) { try { return s ? s.getItem(k) : null; } catch (e) { return null; } }
  function sSet(s, k, v) { try { if (s) s.setItem(k, v); } catch (e) { /* storage blocked */ } }
  function sDel(s, k) { try { if (s) s.removeItem(k); } catch (e) { /* storage blocked */ } }
  function show(el) { if (el) { el.hidden = false; el.removeAttribute("aria-hidden"); } }
  function hide(el) { if (el) { el.hidden = true; } }
  function loadScript(src, attrs) {
    var s = doc.createElement("script");
    s.src = src;
    s.async = true;
    if (attrs) Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    doc.head.appendChild(s);
    return s;
  }

  var EMAIL = isSet(C.email) ? C.email : "hello@askhemant.ai";

  /* ---------- UTM pass-through ---------- */
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var utm = {};
  try { utm = JSON.parse(sGet(session, "ah-utm") || "{}") || {}; } catch (e) { utm = {}; }
  try {
    var qs = new URLSearchParams(window.location.search);
    var fresh = false;
    UTM_KEYS.forEach(function (k) {
      var v = qs.get(k);
      if (v) { if (!fresh) { utm = {}; fresh = true; } utm[k] = v.slice(0, 100); }
    });
    if (fresh) sSet(session, "ah-utm", JSON.stringify(utm));
  } catch (e) { /* old browser: no UTM pass-through */ }
  function withUtm(url) {
    var keys = Object.keys(utm);
    if (!keys.length) return url;
    try {
      var u = new URL(url, window.location.href);
      keys.forEach(function (k) { if (!u.searchParams.has(k)) u.searchParams.set(k, utm[k]); });
      return u.toString();
    } catch (e) { return url; }
  }

  /* ---------- analytics (only when IDs are set and the visitor has not opted out) ---------- */
  var optedOut = sGet(local, "ah-analytics-optout") === "1" || navigator.globalPrivacyControl === true;
  var gaId = isSet(C.ga4MeasurementId) && /^G-[A-Z0-9]{4,20}$/i.test(C.ga4MeasurementId) ? C.ga4MeasurementId : null;
  var clarityId = isSet(C.clarityProjectId) && /^[a-z0-9]{4,20}$/i.test(C.clarityProjectId) ? C.clarityProjectId : null;

  if (!optedOut && gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId));
  }
  if (!optedOut && clarityId) {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    loadScript("https://www.clarity.ms/tag/" + encodeURIComponent(clarityId));
  }

  function track(name, params) {
    params = params || {};
    params.page_path = window.location.pathname;
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params);
      if (typeof window.clarity === "function") window.clarity("event", name);
    } catch (e) { /* never break the page for analytics */ }
  }

  doc.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-track]") : null;
    if (!el) return;
    track(el.getAttribute("data-track"), {
      link_text: (el.getAttribute("data-track-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
      link_url: el.getAttribute("href") || ""
    });
  });

  /* ---------- mobile navigation ---------- */
  var navToggle = $("[data-nav-toggle]");
  var nav = $("#site-nav");
  var header = $(".site-header");
  function setNav(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    root.classList.toggle("nav-open", open);
  }
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setNav(false);
    });
    doc.addEventListener("click", function (e) {
      if (navToggle.getAttribute("aria-expanded") === "true" && header && !header.contains(e.target)) setNav(false);
    });
    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width: 960px)");
      var onMq = function () { if (mq.matches) setNav(false); };
      if (mq.addEventListener) mq.addEventListener("change", onMq); else if (mq.addListener) mq.addListener(onMq);
    }
  }
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- currency (INR / USD) ---------- */
  function defaultCurrency() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      return tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "inr" : "usd";
    } catch (e) { return "inr"; }
  }
  function setCurrency(cur, remember) {
    if (cur !== "inr" && cur !== "usd") cur = "inr";
    root.setAttribute("data-currency", cur);
    $$("[data-set-currency]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-currency") === cur ? "true" : "false");
    });
    if (remember) sSet(local, "ah-currency", cur);
  }
  setCurrency(sGet(local, "ah-currency") || defaultCurrency(), false);
  $$("[data-currency-toggle]").forEach(show);
  $$("[data-set-currency]").forEach(function (b) {
    b.addEventListener("click", function () { setCurrency(b.getAttribute("data-set-currency"), true); });
  });

  /* ---------- Cal.com links ---------- */
  var calUser = isSet(C.calUsername) ? C.calUsername : "askhemant";
  var calSlugs = {
    "fit-call": isSet(C.calFitCallSlug) ? C.calFitCallSlug : "fit-call",
    "session": isSet(C.calSessionSlug) ? C.calSessionSlug : "ask-hemant-session"
  };
  function calUrl(kind) { return withUtm("https://cal.com/" + calUser + "/" + (calSlugs[kind] || calSlugs["fit-call"])); }
  $$("[data-cal]").forEach(function (a) { a.setAttribute("href", calUrl(a.getAttribute("data-cal"))); });
  /* keep UTMs on internal links to /book/ so Cal.com receives them */
  if (Object.keys(utm).length) {
    $$('a[href^="/book/"]').forEach(function (a) { a.setAttribute("href", withUtm(a.getAttribute("href")).replace(window.location.origin, "")); });
  }

  /* ---------- WhatsApp links ---------- */
  var waDigits = isSet(C.whatsappNumber) ? String(C.whatsappNumber).replace(/\D/g, "") : "";
  if (waDigits.length < 8) waDigits = "";
  $$("[data-wa]").forEach(function (a) {
    var text = a.getAttribute("data-wa-text") || C.whatsappDefaultText || "Hi Hemant";
    if (waDigits) {
      a.setAttribute("href", "https://wa.me/" + waDigits + "?text=" + encodeURIComponent(text));
      a.setAttribute("rel", "noopener");
      if (!a.hasAttribute("data-track")) a.setAttribute("data-track", "whatsapp_click");
      show(a);
      var wrap = a.closest("[data-wa-wrap]");
      if (wrap) show(wrap);
    } else if (a.getAttribute("data-wa-fallback") === "email") {
      a.setAttribute("href", "mailto:" + EMAIL + "?subject=" + encodeURIComponent(a.getAttribute("data-email-subject") || "Question from askhemant.ai") + "&body=" + encodeURIComponent(text));
      var label = a.getAttribute("data-fallback-label");
      if (label) {
        var labelEl = $("[data-label]", a) || a;
        labelEl.textContent = label;
      }
      a.removeAttribute("data-track");
      show(a);
    } else {
      hide(a);
    }
  });
  $$("[data-wa-text-number]").forEach(function (el) {
    if (waDigits) { el.textContent = "+" + waDigits; show(el.closest("[data-wa-wrap]") || el); }
  });

  /* ---------- payment links ---------- */
  $$("[data-pay]").forEach(function (a) {
    var url = C[a.getAttribute("data-pay")];
    if (isSet(url) && /^https:\/\//i.test(url)) {
      a.setAttribute("href", url);
      a.setAttribute("rel", "noopener");
      a.setAttribute("data-track", "pay_click");
      show(a);
    } else {
      hide(a);
    }
  });
  $$("[data-pay-group]").forEach(function (g) {
    var any = $$("[data-pay]", g).some(function (a) { return !a.hidden; });
    var fb = $("[data-pay-fallback]", g);
    var wrap = $("[data-pay-buttons]", g);
    if (any) { show(wrap); hide(fb); } else { hide(wrap); show(fb); }
  });

  /* ---------- config text (e.g. city) ---------- */
  $$("[data-config-text]").forEach(function (el) {
    var v = C[el.getAttribute("data-config-text")];
    var fmt = el.getAttribute("data-config-format");
    if (isSet(v)) el.textContent = fmt ? fmt.replace("{v}", String(v)) : String(v);
  });

  /* ---------- founding slots ---------- */
  (function () {
    var total = isSet(C.foundingSlotsTotal) ? Number(C.foundingSlotsTotal) : 3;
    var left = isSet(C.foundingSlotsLeft) ? Math.max(0, Number(C.foundingSlotsLeft)) : total;
    var deadlineStr = isSet(C.foundingDeadline) ? C.foundingDeadline : "2026-11-30";
    var deadline = new Date(deadlineStr + "T23:59:59+05:30");
    var past = !isNaN(deadline.getTime()) && Date.now() > deadline.getTime();
    var closed = past || left <= 0;
    $$("[data-founding-slots]").forEach(function (el) { el.textContent = left + " of " + total; });
    $$("[data-slot]").forEach(function (li) {
      var n = Number(li.getAttribute("data-slot"));
      var state = past ? "closed" : n > left ? "taken" : "open";
      li.setAttribute("data-state", state);
      var s = $(".slot-s", li);
      if (s) s.textContent = state === "open" ? "Open" : state === "taken" ? "Taken" : "Closed";
    });
    $$("[data-founding-open]").forEach(function (el) { el.hidden = closed; });
    $$("[data-founding-closed]").forEach(function (el) {
      el.hidden = !closed;
      var reason = $("[data-founding-reason]", el);
      if (reason) reason.textContent = past ? "The founding program closed on Mon 30 Nov 2026." : "All " + total + " founding slots are taken.";
    });
  })();

  /* ---------- demo video slot (home) ---------- */
  (function () {
    var slot = $("[data-demo-video]");
    if (!slot || !isSet(C.demoVideoUrl)) return;
    var url = String(C.demoVideoUrl).trim();
    var frame = $("[data-demo-video-frame]", slot);
    var m;
    if (/\.(mp4|webm)(\?|#|$)/i.test(url)) {
      var v = doc.createElement("video");
      v.src = url;
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      v.setAttribute("aria-label", "Demo video: Skyline Realty, a fictional business");
      frame.appendChild(v);
    } else if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,20})/i))) {
      var yt = doc.createElement("iframe");
      yt.src = "https://www.youtube-nocookie.com/embed/" + m[1] + "?rel=0";
      yt.title = "Demo video: Skyline Realty, a fictional business";
      yt.loading = "lazy";
      yt.allow = "encrypted-media; picture-in-picture; fullscreen";
      frame.appendChild(yt);
    } else if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i))) {
      var vm = doc.createElement("iframe");
      vm.src = "https://player.vimeo.com/video/" + m[1] + "?dnt=1";
      vm.title = "Demo video: Skyline Realty, a fictional business";
      vm.loading = "lazy";
      vm.allow = "fullscreen; picture-in-picture";
      frame.appendChild(vm);
    } else {
      return;
    }
    show(slot);
  })();

  /* ---------- Cal.com inline embed (/book/) ---------- */
  (function () {
    var el = $("[data-cal-inline]");
    if (!el) return;
    var kind = el.getAttribute("data-cal-inline");
    var ns = kind;
    var fallback = $("[data-cal-fallback]");
    var loading = $("[data-cal-loading]");
    try {
      /* Official Cal.com embed snippet (cal.com/docs → Embed → Inline) */
      (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      window.Cal("init", ns, { origin: "https://app.cal.com" });
      var cfg = { layout: "month_view", theme: "light" };
      Object.keys(utm).forEach(function (k) { cfg[k] = utm[k]; });
      window.Cal.ns[ns]("inline", {
        elementOrSelector: "#" + el.id,
        config: cfg,
        calLink: calUser + "/" + (calSlugs[kind] || calSlugs["fit-call"])
      });
      window.Cal.ns[ns]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#4338CA" } }
      });
      window.Cal.ns[ns]("on", { action: "bookingSuccessful", callback: function () { track("book_complete", { event_type: kind }); } });
    } catch (e) {
      hide(el);
      hide(loading);
      show(fallback);
    }
    /* If the calendar hasn't rendered after 12 s (blocked script, offline), show the plain-link fallback */
    var start = Date.now();
    var timer = window.setInterval(function () {
      if ($("iframe", el)) {
        window.clearInterval(timer);
        hide(loading);
      } else if (Date.now() - start > 12000) {
        window.clearInterval(timer);
        hide(loading);
        hide(el);
        show(fallback);
      }
    }, 400);
  })();

  /* ---------- Tally embed (/kit/ calculator) ---------- */
  (function () {
    var box = $("[data-tally-embed]");
    if (!box) return;
    var fb = $("[data-tally-fallback]");
    var id = C.tallyKitFormId;
    if (!isSet(id) || !/^[A-Za-z0-9_-]{3,20}$/.test(id)) { hide(box); show(fb); return; }
    var params = { alignLeft: "1", hideTitle: "1", transparentBackground: "1", dynamicHeight: "1", source: "website-kit" };
    Object.keys(utm).forEach(function (k) { params[k] = utm[k]; });
    var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); }).join("&");
    var iframe = doc.createElement("iframe");
    iframe.setAttribute("data-tally-src", "https://tally.so/embed/" + encodeURIComponent(id) + "?" + q);
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "560");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", "Lead Leak Calculator request form");
    $("[data-tally-frame]", box).appendChild(iframe);
    show(box);
    hide(fb); /* the "message me for the calculator" card is only for when the form isn't configured */
    var fallbackSrc = function () { if (!iframe.src) iframe.src = iframe.getAttribute("data-tally-src"); };
    var s = loadScript("https://tally.so/widgets/embed.js");
    s.onload = function () { try { window.Tally.loadEmbeds(); } catch (e) { fallbackSrc(); } };
    s.onerror = fallbackSrc;
    window.addEventListener("message", function (e) {
      if (!/^https:\/\/tally\.so$/.test(e.origin || "")) return;
      if (typeof e.data === "string" && e.data.indexOf("Tally.FormSubmitted") !== -1) track("kit_submit", { form: "lead_leak_calculator" });
    });
  })();

  /* ---------- contact form (Web3Forms) ---------- */
  (function () {
    var form = $("[data-contact-form]");
    if (!form) return;
    form.noValidate = true;
    var statusEl = $("[data-form-status]", form.parentNode);
    var successEl = $("[data-form-success]", form.parentNode);
    var btn = $("button[type=submit]", form);
    var btnLabel = btn ? btn.textContent : "";
    var keyInput = form.querySelector('input[name="access_key"]');
    if (keyInput && isSet(C.web3formsAccessKey)) keyInput.value = C.web3formsAccessKey;
    UTM_KEYS.forEach(function (k) { var i = form.querySelector('input[name="' + k + '"]'); if (i && utm[k]) i.value = utm[k]; });

    function fieldError(field, msg) {
      var err = doc.getElementById(field.id + "-error");
      if (msg) {
        field.setAttribute("aria-invalid", "true");
        if (err) { err.textContent = msg; err.hidden = false; }
      } else {
        field.removeAttribute("aria-invalid");
        if (err) { err.textContent = ""; err.hidden = true; }
      }
    }
    function checkField(f) {
      var v = String(f.value || "").trim();
      if (f.name === "whatsapp") return v && v.replace(/\D/g, "").length < 8 ? "Please include the country code, e.g. +91 98XXX XXXXX." : "";
      if (!f.required) return "";
      if (f.type === "checkbox") return f.checked ? "" : "Please tick this box so I can reply to you.";
      if (!v) return f.getAttribute("data-required-msg") || "This field is required.";
      if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address.";
      return "";
    }
    function fields() { return $$("input:not([type=hidden]):not([name=botcheck]), select, textarea", form); }
    function validate() {
      var first = null;
      fields().forEach(function (f) {
        var msg = checkField(f);
        fieldError(f, msg);
        if (msg && !first) first = f;
      });
      return first;
    }
    /* clear an error as soon as the field is fixed (no re-validation on blur, which shifts layout under the pointer) */
    fields().forEach(function (f) {
      var onFix = function () { if (f.getAttribute("aria-invalid") === "true" && !checkField(f)) fieldError(f, ""); };
      f.addEventListener("input", onFix);
      f.addEventListener("change", onFix);
    });
    function setStatus(html, kind) {
      if (!statusEl) return;
      statusEl.className = "form-status form-status--" + kind;
      statusEl.innerHTML = html;
      statusEl.hidden = false;
    }
    function mailtoFromForm() {
      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var msg = (form.querySelector('[name="message"]') || {}).value || "";
      return "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Enquiry from " + (name || "askhemant.ai")) + "&body=" + encodeURIComponent(msg);
    }
    function succeed() {
      form.hidden = true;
      if (statusEl) statusEl.hidden = true;
      if (successEl) { successEl.hidden = false; successEl.focus(); }
      track("contact_submit", {});
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (statusEl) statusEl.hidden = true;
      var bot = form.querySelector('[name="botcheck"]');
      if (bot && bot.checked) { succeed(); return; }
      var bad = validate();
      if (bad) { bad.focus(); setStatus("Please check the highlighted fields.", "error"); return; }
      if (!isSet(C.web3formsAccessKey)) {
        setStatus('The form isn’t connected yet. Please <a href="' + mailtoFromForm() + '">email your message to ' + EMAIL + "</a> instead.", "error");
        return;
      }
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== "redirect") data[k] = v; });
      data.access_key = C.web3formsAccessKey;
      data.page = window.location.pathname;
      if (btn) { btn.disabled = true; btn.setAttribute("aria-busy", "true"); btn.textContent = "Sending…"; }
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().catch(function () { return { success: false }; }); })
        .then(function (json) {
          if (json && json.success) succeed();
          else throw new Error((json && json.message) || "failed");
        })
        .catch(function () {
          setStatus('Sorry, that didn’t send. Please try again, or <a href="' + mailtoFromForm() + '">email ' + EMAIL + "</a> directly.", "error");
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.removeAttribute("aria-busy"); btn.textContent = btnLabel; }
        });
    });
  })();

  /* ---------- analytics opt-out control (/privacy/) ---------- */
  (function () {
    var btn = $("[data-analytics-toggle]");
    var state = $("[data-analytics-state]");
    if (!btn) return;
    function render() {
      var off = sGet(local, "ah-analytics-optout") === "1";
      var gpc = navigator.globalPrivacyControl === true;
      if (state) state.textContent = gpc ? "Off (your browser sends a Global Privacy Control signal)." : off ? "Off on this device." : "On, if analytics are configured.";
      btn.textContent = off ? "Turn analytics back on" : "Turn analytics off on this device";
      btn.setAttribute("aria-pressed", off ? "true" : "false");
    }
    show(btn.closest("[data-analytics-control]"));
    btn.addEventListener("click", function () {
      if (sGet(local, "ah-analytics-optout") === "1") sDel(local, "ah-analytics-optout");
      else sSet(local, "ah-analytics-optout", "1");
      render();
    });
    render();
  })();
})();
