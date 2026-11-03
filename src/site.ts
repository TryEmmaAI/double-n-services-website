// @ts-nocheck — main.js from the static site, unchanged apart from this wrapper.
/* Double N Services: interactions. No dependencies. */
export function initSite(): void {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Attribution ----
     Stored on the landing page for the browser session, then sent with the
     estimate request so GHL knows which ad, listing or page brought the lead.
     A later visit that carries campaign tags (an ad click) replaces it. */
  var ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'];
  var attr = {};
  try {
    var qs = new URLSearchParams(location.search);
    var tagged = ATTR_KEYS.some(function (k) { return qs.get(k); });
    attr = JSON.parse(sessionStorage.getItem('dn_attr') || 'null');
    if (!attr || tagged) {
      var ref = document.referrer && document.referrer.indexOf(location.origin) !== 0 ? document.referrer : '';
      attr = { landing_page: location.pathname + location.search, referrer: ref };
      ATTR_KEYS.forEach(function (k) { if (qs.get(k)) attr[k] = qs.get(k); });
      sessionStorage.setItem('dn_attr', JSON.stringify(attr));
    }
  } catch (err) { attr = attr || {}; }

  /* ---- Year ---- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Header shadow on scroll ---- */
  var hdr = $('#hdr');
  var onScroll = function () {
    hdr.classList.toggle('is-stuck', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var burger = $('#burger');
  var nav = $('#nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Floor Finder ---- */
  var FLOORS = {
    hardwood: {
      page: 'hardwood-flooring/', more: 'Everything about hardwood floors',
      kicker: 'Hardwood',
      title: 'Solid & engineered hardwood',
      desc: 'The floor people notice when they walk in. We install solid and engineered hardwood, match it into existing rooms, and handle the trim and transitions so it reads as one floor instead of a patch.',
      best: 'Living rooms, halls, whole homes',
      also: 'Stairs & landings',
      job: 'Install over several days',
      cta: 'Price my hardwood floor'
    },
    lvp: {
      page: 'luxury-vinyl-flooring/', more: 'Everything about luxury vinyl plank',
      kicker: 'Luxury vinyl plank',
      title: 'Waterproof floors that look like wood',
      desc: 'LVP is the floor we install most often now, and for good reason: it handles spills, dogs, kids and basements without swelling, and modern planks are hard to tell from real timber.',
      best: 'Kitchens, basements, rentals',
      also: 'Whole-home single level',
      job: 'Often done in 1-2 days',
      cta: 'Price my vinyl floor'
    },
    carpet: {
      page: 'carpet-installation/', more: 'Everything about carpet installation',
      kicker: 'Carpet',
      title: 'Carpet, including the awkward rooms',
      desc: 'We help you choose it, measure it and lay it: bedrooms, stairs, landings and closets included. If a crew has ever told you a staircase was "too tricky," that is the part we do properly.',
      best: 'Bedrooms, stairs, basements',
      also: 'Repairs & re-stretching',
      job: 'Most homes in a day',
      cta: 'Price my carpet'
    },
    tile: {
      page: 'tile-flooring/', more: 'Everything about tile floors',
      kicker: 'Tile & grout',
      title: 'Tile laid straight, grout that stays clean',
      desc: 'Tile installation and repair for bathrooms, kitchens and entryways, plus grout cleaning and re-grouting, which is often all an older bathroom actually needs.',
      best: 'Bathrooms, kitchens, entries',
      also: 'Re-grout & deep clean',
      job: 'Sized to the room',
      cta: 'Price my tile job'
    },
    refinish: {
      page: 'hardwood-floor-refinishing/', more: 'Refinish, screen & coat, or replace?',
      kicker: 'Refinishing',
      title: 'Keep the floor you already own',
      desc: 'Sanding, staining and recoating brings a tired hardwood floor back without the cost of replacing it. If the boards are sound, refinishing is almost always the better call.',
      best: 'Older hardwood, scratches, dull finish',
      also: 'Screen & coat refresh',
      job: 'A few days, coats included',
      cta: 'Price my refinishing'
    },
    clean: {
      page: 'carpets-upholstery/', more: 'How our cleaning works',
      kicker: 'Cleaning',
      title: 'Carpet, upholstery and pet odor',
      desc: 'Our DNS Low Moisture Green & Clean System® (bio-active citrus cleaners, truck-mounted extraction and a quick-dry finish) for carpet, sofas, mattresses and leather, plus pet stain and odor removal. Our most reviewed service.',
      best: 'Every 6-12 months',
      also: 'Air ducts, tile & grout',
      job: 'Usually a single visit',
      cta: 'Book a cleaning'
    }
  };

  var stageImgs = $$('.finder-stage img');
  var swatches = $$('.swatch');
  var els = {
    kicker: $('#stageKicker'), stageTitle: $('#stageTitle'),
    eyebrow: $('#fEyebrow'), title: $('#fTitle'), desc: $('#fDesc'),
    best: $('#fBest'), also: $('#fAlso'), job: $('#fJob'), cta: $('#fCta'), more: $('#fMore')
  };

  function selectFloor(key, index) {
    var f = FLOORS[key];
    if (!f) return;

    stageImgs.forEach(function (img) {
      img.classList.toggle('is-active', img.getAttribute('data-stage') === key);
    });
    swatches.forEach(function (b) {
      b.setAttribute('aria-selected', String(b.getAttribute('data-key') === key));
    });

    els.kicker.textContent = f.kicker;
    els.stageTitle.textContent = f.title;
    els.eyebrow.textContent = 'Material ' + (index + 1) + ' of ' + swatches.length;
    els.title.textContent = f.title;
    els.desc.textContent = f.desc;
    els.best.textContent = f.best;
    els.also.textContent = f.also;
    els.job.textContent = f.job;
    els.cta.textContent = f.cta;
    if (els.more) { els.more.href = f.page; els.more.textContent = f.more + ' \u2192'; }
  }

  swatches.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      selectFloor(btn.getAttribute('data-key'), i);
    });
    // Roving arrow-key navigation across the material rail
    btn.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      var next = swatches[(i + dir + swatches.length) % swatches.length];
      next.focus();
      next.click();
    });
  });

  /* ---- Sliders: arrow buttons scroll one "page"; they dim at either end ---- */
  $$('.slider').forEach(function (s) {
    var track = $('.slider-track', s);
    var btns = $$('.slider-btn', s);
    function ends() {
      var max = track.scrollWidth - track.clientWidth - 2;
      btns[0].disabled = track.scrollLeft <= 2;
      btns[1].disabled = track.scrollLeft >= max;
      s.classList.toggle('is-static', max <= 0);
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: Number(b.getAttribute('data-dir')) * track.clientWidth * 0.85, behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', ends, { passive: true });
    window.addEventListener('resize', ends);
    ends();
  });

  /* ---- Reviews: long quotes are clipped to 5 lines with a "Read more" ---- */
  var es = document.documentElement.lang === 'es';
  $$('.slider--rev .rev').forEach(function (card) {
    var q = $('blockquote', card);
    if (q.scrollHeight <= q.clientHeight + 2) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'rev-more';
    b.textContent = es ? 'Leer más' : 'Read more';
    b.addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      b.textContent = open ? (es ? 'Leer menos' : 'Show less') : (es ? 'Leer más' : 'Read more');
    });
    card.appendChild(b);
  });

  /* ---- Our work: service tabs show one row at a time ---- */
  var wtabs = $$('.work-tab');
  wtabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      wtabs.forEach(function (o) {
        var on = o === t;
        o.setAttribute('aria-selected', String(on));
        document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
      });
      window.dispatchEvent(new Event('resize')); // re-check slider ends for the shown row
    });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var n = wtabs[(i + d + wtabs.length) % wtabs.length];
      n.focus(); n.click();
    });
  });

  /* ---- Before/after: the range input moves the divide ---- */
  $$('.ba-compare').forEach(function (box) {
    var r = $('input[type="range"]', box), handle = $('.ba-handle', box);
    function set(v) { v = Math.max(0, Math.min(100, v)); box.style.setProperty('--pos', v + '%'); r.value = v; }
    r.addEventListener('input', function () { set(Number(r.value)); });
    // Drag the handle only, so a swipe elsewhere on the photo still scrolls the row.
    handle.addEventListener('pointerdown', function (e) {
      handle.setPointerCapture(e.pointerId);
      function move(ev) { var b = box.getBoundingClientRect(); set((ev.clientX - b.left) / b.width * 100); }
      function up() { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); }
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      e.preventDefault();
    });
  });

  /* ---- Hero video: hold on the poster if motion is unwelcome ---- */
  var heroVideo = $('#heroVideo');
  if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.autoplay = false;
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
  }

  /* ---- Services dropdown: close on outside click / Escape ---- */
  var dd = $('.nav-dd');
  if (dd) {
    document.addEventListener('click', function (e) {
      if (dd.open && !dd.contains(e.target)) dd.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dd.open) { dd.open = false; dd.querySelector('summary').focus(); }
    });
  }

  /* ---- Estimate wizard ----
     Step 1 picks the kind of job; steps 2 and 3 only show the group of
     questions for that job (hidden groups are disabled so they're neither
     validated nor submitted). Room chips follow Home/Business, and a step with
     data-skip-if is skipped when every ticked service is in that list (a couch
     or duct clean doesn't need rooms). Radios auto-advance when tapped, not
     when arrow-keyed, so keyboard users aren't thrown forward. */
  var form = $('#quoteForm');
  if (form) {
    var steps = $$('.wiz-step', form);
    var bars = $$('.wiz-bar i');
    var barWrap = $('.wiz-bar');
    var nowEl = $('#wizNow');
    var totalEl = $('#wizTotal');
    var backBtn = $('#wizBack');
    var nextBtn = $('#wizNext');
    var sendBtn = $('#wizSend');
    var at = 0;
    var byPointer = false;

    var pageField = $('input[name="page"]', form);
    if (pageField) pageField.value = location.pathname;

    function job() {
      var j = $('input[name="job"]:checked', form);
      return j ? j.value : '';
    }

    function prop() {
      var p = $('input[name="property"]:checked', form);
      return p ? p.value : '';
    }

    // Show only the groups whose data-for lists the chosen job, and the room
    // chips for the chosen property type.
    function syncGroups() {
      var j = job(), pr = prop();
      $$('.wiz-group', form).forEach(function (g) {
        var on = (' ' + g.getAttribute('data-for') + ' ').indexOf(' ' + j + ' ') > -1;
        g.hidden = !on;
        $$('input', g).forEach(function (i) { i.disabled = !on; });
      });
      $$('[data-prop]', form).forEach(function (c) {
        var on = c.getAttribute('data-prop') === pr;
        c.hidden = !on;
        $('input', c).disabled = !on;
      });
    }

    function skipped(s) {
      var list = s.getAttribute('data-skip-if');
      if (!list) return false;
      var ticked = $$('input[name="service"]:checked:not(:disabled)', form);
      return ticked.length > 0 && ticked.every(function (i) { return list.split('|').indexOf(i.value) > -1; });
    }
    // The steps this visitor actually gets, as indexes into steps[].
    function seq() {
      return steps.map(function (s, i) { return i; }).filter(function (i) { return !skipped(steps[i]); });
    }

    function showErr(msg) {
      var step = steps[at];
      var err = $('.wiz-err', step);
      if (!err) {
        err = document.createElement('p');
        err.className = 'wiz-err';
        err.setAttribute('role', 'alert');
        step.appendChild(err);
      }
      err.textContent = msg;
    }
    function clearErr() {
      var err = $('.wiz-err', steps[at]);
      if (err) err.remove();
    }

    function stepValid() {
      var s = steps[at];
      var n = s.getAttribute('data-step');
      var name = n === '1' ? 'job' : n === '4' ? 'timing' : null;
      if (name && !$('input[name="' + name + '"]:checked:not(:disabled)', s)) {
        showErr(form.getAttribute('data-err-pick'));
        return false;
      }
      if (n === '3' && !$('input[name="rooms"]:checked:not(:disabled)', s) && !$('#q-sqft', s).value.trim()) {
        showErr(form.getAttribute('data-err-rooms'));
        return false;
      }
      if (n === '2' && !$('input[name="service"]:checked:not(:disabled)', s)) {
        showErr(form.getAttribute('data-err-tick'));
        return false;
      }
      clearErr();
      return true;
    }

    function render() {
      var order = seq(), pos = order.indexOf(at);
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === at); });
      bars.forEach(function (b, i) { b.hidden = i >= order.length; b.classList.toggle('is-on', i <= pos); });
      barWrap.setAttribute('aria-valuenow', String(pos + 1));
      barWrap.setAttribute('aria-valuemax', String(order.length));
      nowEl.textContent = String(pos + 1);
      totalEl.textContent = String(order.length);
      backBtn.hidden = at === 0;
      var last = at === steps.length - 1;
      nextBtn.hidden = last;
      sendBtn.hidden = !last;
    }

    // Move by dir (+1 / -1) through the steps that apply.
    function go(dir) {
      var order = seq(), pos = order.indexOf(at);
      at = order[Math.max(0, Math.min(pos + dir, order.length - 1))];
      syncGroups();
      render();
      var q = $('.wiz-group:not([hidden]) .wiz-q', steps[at]) || $('.wiz-q', steps[at]);
      if (q) { q.setAttribute('tabindex', '-1'); q.focus({ preventScroll: true }); }
    }

    nextBtn.addEventListener('click', function () { if (stepValid()) go(1); });
    backBtn.addEventListener('click', function () { clearErr(); go(-1); });

    form.addEventListener('pointerdown', function () { byPointer = true; });
    form.addEventListener('keydown', function () { byPointer = false; });
    form.addEventListener('change', function (e) {
      clearErr();
      if (e.target.name === 'job' || e.target.name === 'property') {
        // Changing the job or Home/Business clears answers that belonged to the old one.
        var stale = e.target.name === 'job' ? 'input[name="service"], input[name="rooms"]' : 'input[name="rooms"]';
        $$(stale, form).forEach(function (i) { i.checked = false; });
        syncGroups();
      }
      render();
      if (byPointer && e.target.type === 'radio' && e.target.name !== 'contact' && e.target.name !== 'property' && stepValid()) {
        var from = at; // ignore if Continue was already pressed in the meantime
        setTimeout(function () { if (at === from) go(1); }, 220);
      }
    });

    var startedAt = Date.now();

    // Every answer once, multi-picks joined, so GHL gets one field per question.
    function answers() {
      var out = {};
      new FormData(form).forEach(function (v, k) { out[k] = out[k] ? out[k] + ', ' + v : v; });
      return out;
    }
    function labelOf(name) {
      var i = $('input[name="' + name + '"]:checked', form);
      var l = i && i.closest('label');
      var b = l && ($('b', l) || $('.o-t', l) || $('span', l));
      return b ? b.textContent.trim() : '';
    }
    // One plain-English line for the notification and the contact note.
    function summary(a) {
      var z = a.zip ? zipLookup(a.zip) : null;
      return [
        labelOf('property') + ' · ' + labelOf('job') + (a.service ? ': ' + a.service : ''),
        a.rooms || a.sqft ? 'Rooms: ' + (a.rooms || 'not given') + (a.sqft ? ' (about ' + a.sqft + ' sq ft)' : '') : '',
        a.timing ? 'Timing: ' + a.timing : '',
        a.zip ? 'ZIP ' + a.zip + (z ? ' (' + z[0] + (z[1] ? ', in area' : ', outside usual area') + ')' : '') : '',
        'Prefers: ' + (a.contact || 'Call'),
        'Texts OK: ' + (a.sms_consent ? 'yes' : 'no') + ', offers OK: ' + (a.sms_marketing ? 'yes' : 'no')
      ].filter(Boolean).join(' · ');
    }
    function newId() {
      try { return crypto.randomUUID(); } catch (err) { return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }
    }
    function showSent(dup) {
      $('.ok-msg', card).hidden = !!dup;
      $('.dup-msg', card).hidden = !dup;
      card.classList.add('is-sent');
    }
    var card = $('#estimate');

    // Sends the answers to Double N's GHL inbound webhook (set in build.py FACTS).
    // Form-encoded + no-cors: a "simple" request browsers allow cross-site without
    // a CORS preflight. Until a webhook is set, the form says so and asks people to call.
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var a = answers();
      // Texting needs the consent box; nobody gets texted without it.
      if (a.contact === 'Text' && !a.sms_consent) { showErr(form.getAttribute('data-err-sms')); return; }
      clearErr();
      // Bots: filled the hidden field, or finished the whole form in under 4 seconds. Look sent, send nothing.
      if (a.company_site || Date.now() - startedAt < 4000) { showSent(false); return; }
      delete a.company_site;
      // Same phone again within 15 minutes (double tap, back button, resubmit): don't send a second lead.
      var phone = (a.phone || '').replace(/\D/g, '').slice(-10), last = null;
      try { last = JSON.parse(localStorage.getItem('dn_last') || 'null'); } catch (err) { last = null; }
      if (last && last.phone === phone && Date.now() - last.at < 15 * 60 * 1000) { showSent(true); return; }
      var hook = form.getAttribute('data-webhook');
      if (!hook) { card.classList.add('is-offline'); return; }
      a.submission_id = newId();
      a.submitted_at = new Date().toISOString();
      a.language = document.documentElement.lang || 'en';
      a.summary = summary(a);
      a.job_phrase = { install: 'your new flooring', refinish: 'your floor repair or refresh', clean: 'your cleaning' }[a.job] || '';
      // Proof of consent: the exact words the visitor ticked, and when.
      if (a.sms_consent) {
        a.consent_text = $('input[name="sms_consent"]', form).closest('label').textContent.trim();
        a.consent_timestamp = a.submitted_at;
      }
      Object.keys(attr).forEach(function (k) { if (attr[k]) a[k] = attr[k]; });
      var body = new URLSearchParams();
      Object.keys(a).forEach(function (k) { body.append(k, a[k]); });
      sendBtn.disabled = true;
      fetch(hook, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          try { localStorage.setItem('dn_last', JSON.stringify({ phone: phone, at: Date.now() })); } catch (err) { /* private mode: no dedupe, still sent */ }
          showSent(false);
        })
        .catch(function () { sendBtn.disabled = false; card.classList.add('is-offline'); });
    });

    // ZIP check: Georgia ZIP -> city, and whether it's in the usual service area.
    // ponytail: static table (GeoNames, Georgia only, ~19 KB) instead of an API call.
    var zipEl = $('#q-zip', form), zipNote = $('.zip-note', form), zipMap = null;
    function zipLookup(z) {
      if (!zipMap) {
        zipMap = {};
        GA_ZIPS.split('|').forEach(function (r) { var p = r.split(':'); zipMap[p[0]] = [p[1], p[2] === '1']; });
      }
      return zipMap[z];
    }
    if (zipEl && zipNote) {
      zipEl.addEventListener('input', function () {
        var z = zipEl.value.replace(/\D/g, '').slice(0, 5);
        if (zipEl.value !== z) zipEl.value = z;
        if (z.length < 5) { zipNote.textContent = ''; zipNote.className = 'zip-note'; return; }
        var hit = zipLookup(z);
        var key = !hit ? 'data-zip-out' : hit[1] ? 'data-zip-in' : 'data-zip-near';
        zipNote.textContent = form.getAttribute(key).replace('{city}', hit ? hit[0] : '');
        zipNote.className = 'zip-note ' + (!hit ? 'is-out' : hit[1] ? 'is-in' : 'is-near');
      });
    }

    syncGroups();
    render();

    // "Get a commercial estimate" style links: pre-pick Home/Business, then jump to the form.
    $$('[data-property]').forEach(function (a) {
      a.addEventListener('click', function () {
        var r = $('input[name="property"][value="' + a.getAttribute('data-property') + '"]', form);
        if (r && !r.checked) {
          r.checked = true;
          $$('input[name="rooms"]', form).forEach(function (i) { i.checked = false; });
          syncGroups();
          render();
        }
      });
    });
  }

  /* ---- GHL chat widget (Double N's own). Loaded from here rather than the HTML
     so it also appears when the site is hosted inside AI Studio. ---- */
  if (!document.querySelector('script[data-widget-id]')) {
    var chat = document.createElement('script');
    chat.src = 'https://widgets.leadconnectorhq.com/loader.js';
    chat.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    chat.setAttribute('data-widget-id', '6adb9821c9aed815ed55508f');
    document.body.appendChild(chat);
  }

  /* ---- Keep the GHL chat widget clear of the mobile call bar ----
     The widget positions itself inside a shadow root, so page CSS can't reach
     it. We inject one rule instead. On Double N's own widget this is better set
     as the mobile offset in the GHL widget settings. This is the demo fix. */
  (function liftChatWidget() {
    var tries = 0;
    var timer = setInterval(function () {
      var host = document.querySelector('chat-widget');
      if (host && host.shadowRoot) {
        var style = document.createElement('style');
        style.textContent =
          '@media (max-width: 860px){' +
          '.lc_text-widget,.lc_text-widget--bubble{bottom:78px !important;}' +
          '}';
        host.shadowRoot.appendChild(style);
        clearInterval(timer);
      } else if (++tries > 40) {
        clearInterval(timer);
      }
    }, 250);
  })();

  // Georgia ZIP -> city:inServiceArea (1 = the counties Double N lists). Source: GeoNames.
  var GA_ZIPS = '30002:Avondale Estates:1|30003:Norcross:1|30004:Alpharetta:1|30005:Alpharetta:1|30006:Marietta:1|30007:Marietta:1|30008:Marietta:1|30009:Alpharetta:1|30010:Norcross:1|30011:Auburn:0|30012:Conyers:0|30013:Conyers:0|30014:Covington:0|30015:Covington:0|30016:Covington:0|30017:Grayson:1|30018:Jersey:0|30019:Dacula:1|30021:Clarkston:1|30022:Alpharetta:1|30023:Alpharetta:1|30024:Suwanee:1|30025:Social Circle:0|30026:North Metro:1|30028:Cumming:1|30029:North Metro:1|30030:Decatur:1|30031:Decatur:1|30032:Decatur:1|30033:Decatur:1|30034:Decatur:1|30035:Decatur:1|30036:Decatur:1|30037:Decatur:1|30038:Lithonia:1|30039:Snellville:1|30040:Cumming:1|30041:Cumming:1|30042:Lawrenceville:1|30043:Lawrenceville:1|30044:Lawrenceville:1|30045:Lawrenceville:1|30046:Lawrenceville:1|30047:Lilburn:1|30048:Lilburn:1|30049:Lawrenceville:1|30052:Loganville:1|30054:Oxford:0|30055:Mansfield:0|30056:Newborn:0|30058:Lithonia:1|30060:Marietta:1|30061:Marietta:1|30062:Marietta:1|30063:Marietta:1|30064:Marietta:1|30065:Marietta:1|30066:Marietta:1|30067:Marietta:1|30068:Marietta:1|30069:Marietta:1|30070:Porterdale:0|30071:Norcross:1|30072:Pine Lake:1|30074:Redan:1|30075:Roswell:1|30076:Roswell:1|30077:Roswell:1|30078:Snellville:1|30079:Scottdale:1|30080:Smyrna:1|30081:Smyrna:1|30082:Smyrna:1|30083:Stone Mountain:1|30084:Tucker:1|30085:Tucker:1|30086:Stone Mountain:1|30087:Stone Mountain:1|30088:Stone Mountain:1|30090:Marietta:1|30091:Norcross:1|30092:Peachtree Corners:1|30093:Norcross:1|30094:Conyers:0|30095:Duluth:1|30096:Duluth:1|30097:Duluth:1|30098:Duluth:1|30099:Duluth:1|30101:Acworth:1|30102:Acworth:1|30103:Adairsville:0|30104:Aragon:0|30105:Armuchee:0|30106:Austell:1|30107:Ball Ground:1|30108:Bowdon:1|30109:Bowdon Junction:1|30110:Bremen:0|30111:Clarkdale:1|30112:Carrollton:1|30113:Buchanan:0|30114:Canton:1|30115:Canton:1|30116:Carrollton:1|30117:Carrollton:1|30118:Carrollton:1|30119:Carrollton:1|30120:Cartersville:0|30121:Cartersville:0|30122:Lithia Springs:1|30123:Cassville:0|30124:Cave Spring:0|30125:Cedartown:0|30126:Mableton:1|30127:Powder Springs:1|30129:Coosa:0|30132:Dallas:1|30133:Douglasville:1|30134:Douglasville:1|30135:Douglasville:1|30137:Emerson:0|30138:Esom Hill:0|30139:Fairmount:0|30140:Felton:0|30141:Hiram:1|30142:Holly Springs:1|30143:Jasper:0|30144:Kennesaw:1|30145:Kingston:0|30146:Lebanon:1|30147:Lindale:0|30148:Marble Hill:0|30149:Mount Berry:0|30150:Mount Zion:1|30151:Nelson:1|30152:Kennesaw:1|30153:Rockmart:0|30154:Douglasville:1|30156:Kennesaw:1|30157:Dallas:1|30160:Kennesaw:1|30161:Rome:0|30162:Rome:0|30163:Rome:0|30164:Rome:0|30165:Rome:0|30168:Austell:1|30169:Canton:1|30170:Roopville:1|30171:Rydal:0|30172:Shannon:0|30173:Silver Creek:0|30175:Talking Rock:0|30176:Tallapoosa:0|30177:Tate:0|30178:Taylorsville:0|30179:Temple:1|30180:Villa Rica:1|30182:Waco:0|30183:Waleska:1|30184:White:0|30185:Whitesburg:1|30187:Winston:1|30188:Woodstock:1|30189:Woodstock:1|30204:Barnesville:0|30205:Brooks:1|30206:Concord:0|30212:Experiment:0|30213:Fairburn:1|30214:Fayetteville:1|30215:Fayetteville:1|30216:Flovilla:0|30217:Franklin:0|30218:Gay:0|30220:Grantville:1|30222:Greenville:0|30223:Griffin:0|30224:Griffin:0|30228:Hampton:0|30229:Haralson:1|30230:Hogansville:0|30233:Jackson:0|30234:Jenkinsburg:0|30236:Jonesboro:0|30237:Jonesboro:0|30238:Jonesboro:0|30240:Lagrange:0|30241:Lagrange:0|30248:Locust Grove:0|30250:Lovejoy:0|30251:Luthersville:0|30252:Mcdonough:0|30253:Mcdonough:0|30256:Meansville:0|30257:Milner:0|30258:Molena:0|30259:Moreland:1|30260:Morrow:0|30261:Lagrange:0|30263:Newnan:1|30264:Newnan:1|30265:Newnan:1|30266:Orchard Hill:0|30268:Palmetto:1|30269:Peachtree City:1|30270:Peachtree City:0|30271:Newnan:1|30272:Red Oak:1|30273:Rex:0|30274:Riverdale:0|30275:Sargent:1|30276:Senoia:1|30277:Sharpsburg:1|30281:Stockbridge:0|30284:Sunny Side:0|30285:The Rock:0|30286:Thomaston:0|30287:Morrow:0|30288:Conley:0|30289:Turin:1|30290:Tyrone:1|30291:Union City:1|30292:Williamson:0|30293:Woodbury:0|30294:Ellenwood:0|30295:Zebulon:0|30296:Riverdale:0|30297:Forest Park:0|30298:Forest Park:0|30301:Atlanta:1|30302:Atlanta:1|30303:Atlanta:1|30304:Atlanta:1|30305:Atlanta:1|30306:Atlanta:1|30307:Atlanta:1|30308:Atlanta:1|30309:Atlanta:1|30310:Atlanta:1|30311:Atlanta:1|30312:Atlanta:1|30313:Atlanta:1|30314:Atlanta:1|30315:Atlanta:1|30316:Atlanta:1|30317:Atlanta:1|30318:Atlanta:1|30319:Atlanta:1|30320:Atlanta:1|30321:Atlanta:1|30322:Atlanta:1|30324:Atlanta:1|30325:Atlanta:1|30326:Atlanta:1|30327:Atlanta:1|30328:Atlanta:1|30329:Atlanta:1|30331:Atlanta:1|30332:Atlanta:1|30333:Atlanta:1|30334:Atlanta:1|30336:Atlanta:1|30337:Atlanta:1|30338:Atlanta:1|30339:Atlanta:1|30340:Atlanta:1|30341:Atlanta:1|30342:Atlanta:1|30343:Atlanta:1|30344:Atlanta:1|30345:Atlanta:1|30346:Atlanta:1|30348:Atlanta:1|30349:Atlanta:1|30350:Atlanta:1|30353:Atlanta:1|30354:Atlanta:1|30355:Atlanta:1|30356:Atlanta:1|30357:Atlanta:1|30358:Atlanta:1|30359:Atlanta:1|30360:Atlanta:1|30361:Atlanta:1|30362:Atlanta:1|30363:Atlanta:1|30364:Atlanta:1|30366:Atlanta:1|30368:Atlanta:1|30369:Atlanta:1|30370:Atlanta:1|30371:Atlanta:1|30374:Atlanta:1|30375:Atlanta:1|30377:Atlanta:1|30378:Atlanta:1|30380:Atlanta:1|30384:Atlanta:1|30385:Atlanta:1|30388:Atlanta:1|30392:Atlanta:1|30394:Atlanta:1|30396:Atlanta:1|30398:Atlanta:1|30401:Swainsboro:0|30410:Ailey:0|30411:Alamo:0|30412:Alston:0|30413:Bartow:0|30414:Bellville:0|30415:Brooklet:0|30417:Claxton:0|30420:Cobbtown:0|30421:Collins:0|30423:Daisy:0|30424:Dover:0|30425:Garfield:0|30426:Girard:0|30427:Glennville:0|30428:Glenwood:0|30429:Hagan:0|30434:Louisville:0|30436:Lyons:0|30438:Manassas:0|30439:Metter:0|30441:Midville:0|30442:Millen:0|30445:Mount Vernon:0|30446:Newington:0|30447:Norristown:0|30448:Nunez:0|30449:Oliver:0|30450:Portal:0|30451:Pulaski:0|30452:Register:0|30453:Reidsville:0|30454:Rockledge:0|30455:Rocky Ford:0|30456:Sardis:0|30457:Soperton:0|30458:Statesboro:0|30459:Statesboro:0|30460:Statesboro:0|30461:Statesboro:0|30464:Stillmore:0|30467:Sylvania:0|30470:Tarrytown:0|30471:Twin City:0|30473:Uvalda:0|30474:Vidalia:0|30475:Vidalia:0|30477:Wadley:0|30499:Reidsville:0|30501:Gainesville:0|30502:Chestnut Mountain:0|30503:Gainesville:0|30504:Gainesville:0|30506:Gainesville:0|30507:Gainesville:0|30510:Alto:0|30511:Baldwin:0|30512:Blairsville:0|30513:Blue Ridge:0|30514:Blairsville:0|30515:Buford:1|30516:Bowersville:0|30517:Braselton:1|30518:Buford:1|30519:Buford:1|30520:Canon:0|30521:Carnesville:0|30522:Cherry Log:0|30523:Clarkesville:0|30525:Clayton:0|30527:Clermont:0|30528:Cleveland:0|30529:Commerce:1|30530:Commerce:1|30531:Cornelia:0|30533:Dahlonega:0|30534:Dawsonville:0|30535:Demorest:0|30536:Ellijay:0|30537:Dillard:0|30538:Eastanollee:0|30539:East Ellijay:0|30540:Ellijay:0|30541:Epworth:0|30542:Flowery Branch:0|30543:Gillsville:0|30545:Helen:0|30546:Hiawassee:0|30547:Homer:0|30548:Hoschton:1|30549:Jefferson:1|30552:Lakemont:0|30553:Lavonia:0|30554:Lula:0|30555:Mc Caysville:0|30557:Martin:0|30558:Maysville:0|30559:Mineral Bluff:0|30560:Morganton:0|30562:Mountain City:0|30563:Mount Airy:0|30564:Murrayville:0|30565:Nicholson:1|30566:Oakwood:0|30567:Pendergrass:1|30568:Rabun Gap:0|30571:Sautee Nacoochee:0|30572:Suches:0|30573:Tallulah Falls:0|30575:Talmo:1|30576:Tiger:0|30577:Toccoa:0|30580:Turnerville:0|30581:Wiley:0|30582:Young Harris:0|30597:Dahlonega:0|30598:Toccoa Falls:0|30599:Commerce:1|30601:Athens:0|30602:Athens:0|30603:Athens:0|30604:Athens:0|30605:Athens:0|30606:Athens:0|30607:Athens:0|30608:Athens:0|30609:Athens:0|30612:Athens:0|30619:Arnoldsville:0|30620:Bethlehem:0|30621:Bishop:0|30622:Bogart:0|30623:Bostwick:0|30624:Bowman:0|30625:Buckhead:0|30627:Carlton:0|30628:Colbert:0|30629:Comer:0|30630:Crawford:0|30631:Crawfordville:0|30633:Danielsville:0|30634:Dewy Rose:0|30635:Elberton:0|30638:Farmington:0|30639:Franklin Springs:0|30641:Good Hope:0|30642:Greensboro:0|30643:Hartwell:0|30645:High Shoals:0|30646:Hull:0|30647:Ila:0|30648:Lexington:0|30650:Madison:0|30655:Monroe:0|30656:Monroe:0|30660:Rayle:0|30662:Royston:0|30663:Rutledge:0|30664:Sharon:0|30665:Siloam:0|30666:Statham:0|30667:Stephens:0|30668:Tignall:0|30669:Union Point:0|30671:Maxeys:0|30673:Washington:0|30677:Watkinsville:0|30678:White Plains:0|30680:Winder:0|30683:Winterville:0|30701:Calhoun:0|30703:Calhoun:0|30705:Chatsworth:0|30707:Chickamauga:0|30708:Cisco:0|30710:Cohutta:0|30711:Crandall:0|30719:Dalton:0|30720:Dalton:0|30721:Dalton:0|30722:Dalton:0|30724:Eton:0|30725:Flintstone:0|30726:Graysville:0|30728:La Fayette:0|30730:Lyerly:0|30731:Menlo:0|30732:Oakman:0|30733:Plainville:0|30734:Ranger:0|30735:Resaca:0|30736:Ringgold:0|30738:Rising Fawn:0|30739:Rock Spring:0|30740:Rocky Face:0|30741:Rossville:0|30742:Fort Oglethorpe:0|30746:Sugar Valley:0|30747:Summerville:0|30750:Lookout Mountain:0|30751:Tennga:0|30752:Trenton:0|30753:Trion:0|30755:Tunnel Hill:0|30756:Varnell:0|30757:Wildwood:0|30802:Appling:0|30803:Avera:0|30805:Blythe:0|30806:Boneville:0|30807:Camak:0|30808:Dearing:0|30809:Evans:0|30810:Gibson:0|30811:Gough:0|30812:Gracewood:0|30813:Grovetown:0|30814:Harlem:0|30815:Hephzibah:0|30816:Keysville:0|30817:Lincolnton:0|30818:Matthews:0|30819:Mesena:0|30820:Mitchell:0|30821:Norwood:0|30822:Perkins:0|30823:Stapleton:0|30824:Thomson:0|30828:Warrenton:0|30830:Waynesboro:0|30833:Wrens:0|30901:Augusta:0|30903:Augusta:0|30904:Augusta:0|30905:Augusta:0|30906:Augusta:0|30907:Augusta:0|30909:Augusta:0|30912:Augusta:0|30914:Augusta:0|30916:Augusta:0|30917:Augusta:0|30919:Augusta:0|30999:Augusta:0|31001:Abbeville:0|31002:Adrian:0|31003:Allentown:0|31004:Bolingbroke:0|31005:Bonaire:0|31006:Butler:0|31007:Byromville:0|31008:Byron:0|31009:Cadwell:0|31010:Cordele:0|31011:Chauncey:0|31012:Chester:0|31013:Clinchfield:0|31014:Cochran:0|31015:Cordele:0|31016:Culloden:0|31017:Danville:0|31018:Davisboro:0|31019:Dexter:0|31020:Dry Branch:0|31021:Dublin:0|31022:Dudley:0|31023:Eastman:0|31024:Eatonton:0|31025:Elko:0|31026:Eatonton:0|31027:East Dublin:0|31028:Centerville:0|31029:Forsyth:0|31030:Fort Valley:0|31031:Gordon:0|31032:Gray:0|31033:Haddock:0|31034:Hardwick:0|31035:Harrison:0|31036:Hawkinsville:0|31037:Mc Rae Helena:0|31038:Hillsboro:0|31039:Howard:0|31040:Dublin:0|31041:Ideal:0|31042:Irwinton:0|31044:Jeffersonville:0|31045:Jewell:0|31046:Juliette:0|31047:Kathleen:0|31049:Kite:0|31050:Knoxville:0|31051:Lilly:0|31052:Lizella:0|31054:Mc Intyre:0|31055:Mc Rae Helena:0|31057:Marshallville:0|31058:Mauk:0|31059:Milledgeville:0|31060:Milan:0|31061:Milledgeville:0|31062:Milledgeville:0|31063:Montezuma:0|31064:Monticello:0|31065:Montrose:0|31066:Musella:0|31067:Oconee:0|31068:Oglethorpe:0|31069:Perry:0|31070:Pinehurst:0|31071:Pineview:0|31072:Pitts:0|31075:Rentz:0|31076:Reynolds:0|31077:Rhine:0|31078:Roberta:0|31079:Rochelle:0|31081:Rupert:0|31082:Sandersville:0|31083:Scotland:0|31084:Seville:0|31085:Shady Dale:0|31086:Smarr:0|31087:Sparta:0|31088:Warner Robins:0|31089:Tennille:0|31090:Toomsboro:0|31091:Unadilla:0|31092:Vienna:0|31093:Warner Robins:0|31094:Warthen:0|31095:Warner Robins:0|31096:Wrightsville:0|31097:Yatesville:0|31098:Warner Robins:0|31099:Warner Robins:0|31106:Atlanta:1|31107:Atlanta:1|31119:Atlanta:1|31126:Atlanta:1|31131:Atlanta:1|31136:Atlanta:1|31139:Atlanta:1|31141:Atlanta:1|31144:Kennesaw:1|31145:Atlanta:1|31146:Atlanta:1|31150:Atlanta:1|31156:Atlanta:1|31169:Peachtree City:1|31192:Atlanta:1|31193:Atlanta:1|31195:Atlanta:1|31196:Atlanta:1|31201:Macon:0|31202:Macon:0|31203:Macon:0|31204:Macon:0|31205:Macon:0|31206:Macon:0|31207:Macon:0|31208:Macon:0|31209:Macon:0|31210:Macon:0|31211:Macon:0|31213:Macon:0|31216:Macon:0|31217:Macon:0|31220:Macon:0|31221:Macon:0|31294:Macon:0|31295:Macon:0|31296:Macon:0|31297:Macon:0|31301:Allenhurst:0|31302:Bloomingdale:0|31303:Clyo:0|31304:Crescent:0|31305:Darien:0|31307:Eden:0|31308:Ellabell:0|31309:Fleming:0|31310:Hinesville:0|31312:Guyton:0|31313:Hinesville:0|31314:Fort Stewart:0|31315:Fort Stewart:0|31316:Ludowici:0|31318:Meldrim:0|31319:Meridian:0|31320:Midway:0|31321:Pembroke:0|31322:Pooler:0|31323:Riceboro:0|31324:Richmond Hill:0|31326:Rincon:0|31327:Sapelo Island:0|31328:Tybee Island:0|31329:Springfield:0|31331:Townsend:0|31333:Walthourville:0|31401:Savannah:0|31402:Savannah:0|31403:Savannah:0|31404:Savannah:0|31405:Savannah:0|31406:Savannah:0|31407:Port Wentworth:0|31408:Savannah:0|31409:Savannah:0|31410:Savannah:0|31411:Savannah:0|31412:Savannah:0|31414:Savannah:0|31415:Savannah:0|31416:Savannah:0|31418:Savannah:0|31419:Savannah:0|31420:Savannah:0|31421:Savannah:0|31501:Waycross:0|31502:Waycross:0|31503:Waycross:0|31510:Alma:0|31512:Ambrose:0|31513:Baxley:0|31515:Baxley:0|31516:Blackshear:0|31518:Bristol:0|31519:Broxton:0|31520:Brunswick:0|31521:Brunswick:0|31522:Saint Simons Island:0|31523:Brunswick:0|31524:Brunswick:0|31525:Brunswick:0|31527:Jekyll Island:0|31532:Denton:0|31533:Douglas:0|31534:Douglas:0|31535:Douglas:0|31537:Folkston:0|31539:Hazlehurst:0|31542:Hoboken:0|31543:Hortense:0|31544:Jacksonville:0|31545:Jesup:0|31546:Jesup:0|31547:Kings Bay:0|31548:Kingsland:0|31549:Lumber City:0|31550:Manor:0|31551:Mershon:0|31552:Millwood:0|31553:Nahunta:0|31554:Nicholls:0|31555:Odum:0|31556:Offerman:0|31557:Patterson:0|31558:Saint Marys:0|31560:Screven:0|31561:Sea Island:0|31562:Saint George:0|31563:Surrency:0|31564:Waresboro:0|31565:Waverly:0|31566:Waynesville:0|31567:West Green:0|31568:White Oak:0|31569:Woodbine:0|31598:Jesup:0|31599:Jesup:0|31601:Valdosta:0|31602:Valdosta:0|31603:Valdosta:0|31604:Valdosta:0|31605:Valdosta:0|31606:Valdosta:0|31620:Adel:0|31622:Alapaha:0|31623:Argyle:0|31624:Axson:0|31625:Barney:0|31626:Boston:0|31627:Cecil:0|31629:Dixie:0|31630:Du Pont:0|31631:Fargo:0|31632:Hahira:0|31634:Homerville:0|31635:Lakeland:0|31636:Lake Park:0|31637:Lenox:0|31638:Morven:0|31639:Nashville:0|31641:Naylor:0|31642:Pearson:0|31643:Quitman:0|31645:Ray City:0|31647:Sparks:0|31648:Statenville:0|31649:Stockton:0|31650:Willacoochee:0|31698:Valdosta:0|31699:Moody Afb:0|31701:Albany:0|31702:Albany:0|31703:Albany:0|31704:Albany:0|31705:Albany:0|31706:Albany:0|31707:Albany:0|31708:Albany:0|31709:Americus:0|31711:Andersonville:0|31712:Arabi:0|31714:Ashburn:0|31716:Baconton:0|31719:Americus:0|31720:Barwick:0|31721:Albany:0|31722:Berlin:0|31727:Brookfield:0|31730:Camilla:0|31733:Chula:0|31735:Cobb:0|31738:Coolidge:0|31739:Cotton:0|31743:De Soto:0|31744:Doerun:0|31747:Ellenton:0|31749:Enigma:0|31750:Fitzgerald:0|31753:Funston:0|31756:Hartsfield:0|31757:Thomasville:0|31758:Thomasville:0|31760:Irwinville:0|31763:Leesburg:0|31764:Leslie:0|31765:Meigs:0|31768:Moultrie:0|31769:Mystic:0|31771:Norman Park:0|31772:Oakfield:0|31773:Ochlocknee:0|31774:Ocilla:0|31775:Omega:0|31776:Moultrie:0|31778:Pavo:0|31779:Pelham:0|31780:Plains:0|31781:Poulan:0|31782:Putney:0|31783:Rebecca:0|31784:Sale City:0|31787:Smithville:0|31788:Moultrie:0|31789:Sumner:0|31790:Sycamore:0|31791:Sylvester:0|31792:Thomasville:0|31793:Tifton:0|31794:Tifton:0|31795:Ty Ty:0|31796:Warwick:0|31798:Wray:0|31799:Thomasville:0|31801:Box Springs:0|31803:Buena Vista:0|31804:Cataula:0|31805:Cusseta:0|31806:Ellaville:0|31807:Ellerslie:0|31808:Fortson:0|31810:Geneva:0|31811:Hamilton:0|31812:Junction City:0|31814:Louvale:0|31815:Lumpkin:0|31816:Manchester:0|31820:Midland:0|31821:Omaha:0|31822:Pine Mountain:0|31823:Pine Mountain Valley:0|31824:Preston:0|31825:Richland:0|31826:Shiloh:0|31827:Talbotton:0|31829:Upatoi:0|31830:Warm Springs:0|31831:Waverly Hall:0|31832:Weston:0|31833:West Point:0|31836:Woodland:0|31901:Columbus:0|31902:Columbus:0|31903:Columbus:0|31904:Columbus:0|31905:Fort Benning:0|31906:Columbus:0|31907:Columbus:0|31908:Columbus:0|31909:Columbus:0|31914:Columbus:0|31917:Columbus:0|31993:Columbus:0|31995:Fort Benning:0|31997:Columbus:0|31998:Columbus:0|31999:Columbus:0|39813:Arlington:0|39815:Attapulgus:0|39817:Bainbridge:0|39818:Bainbridge:0|39819:Bainbridge:0|39823:Blakely:0|39824:Bluffton:0|39825:Brinson:0|39826:Bronwood:0|39827:Cairo:0|39828:Cairo:0|39829:Calvary:0|39832:Cedar Springs:0|39834:Climax:0|39836:Coleman:0|39837:Colquitt:0|39840:Cuthbert:0|39841:Damascus:0|39842:Dawson:0|39845:Donalsonville:0|39846:Edison:0|39851:Fort Gaines:0|39852:Fowlstown:0|39854:Georgetown:0|39859:Iron City:0|39861:Jakin:0|39862:Leary:0|39866:Morgan:0|39867:Morris:0|39870:Newton:0|39877:Parrott:0|39885:Sasser:0|39886:Shellman:0|39897:Whigham:0|39901:Atlanta:1';

  // ponytail: deliberately no scroll-reveal animation. The page reads fine
  // static, and nothing here should depend on JS to become visible.
}
