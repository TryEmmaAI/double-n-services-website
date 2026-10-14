// @ts-nocheck — main.js from the static site, unchanged apart from this wrapper.
/* Double N Services: interactions. No dependencies. */
export function initSite(): void {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

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

  /* ---- Gallery filters ---- */
  var chips = $$('.chip');
  var items = $$('.gal-item');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      items.forEach(function (it) {
        it.classList.toggle('is-hidden', f !== 'all' && it.getAttribute('data-cat') !== f);
      });
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
     validated nor submitted). Radios auto-advance when tapped, not when
     arrow-keyed, so keyboard users aren't thrown forward. */
  var form = $('#quoteForm');
  if (form) {
    var steps = $$('.wiz-step', form);
    var bars = $$('.wiz-bar i');
    var barWrap = $('.wiz-bar');
    var nowEl = $('#wizNow');
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

    // Show only the groups whose data-for lists the chosen job.
    function syncGroups() {
      var j = job();
      $$('.wiz-group', form).forEach(function (g) {
        var on = (' ' + g.getAttribute('data-for') + ' ').indexOf(' ' + j + ' ') > -1;
        g.hidden = !on;
        $$('input', g).forEach(function (i) { i.disabled = !on; });
      });
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
      var name = at === 0 ? 'job' : at === 2 ? 'size' : at === 3 ? 'timing' : null;
      if (name && !$('input[name="' + name + '"]:checked:not(:disabled)', s)) {
        showErr(form.getAttribute('data-err-pick'));
        return false;
      }
      if (at === 1 && !$('input[name="service"]:checked:not(:disabled)', s)) {
        showErr(form.getAttribute('data-err-tick'));
        return false;
      }
      clearErr();
      return true;
    }

    function render() {
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === at); });
      bars.forEach(function (b, i) { b.classList.toggle('is-on', i <= at); });
      barWrap.setAttribute('aria-valuenow', String(at + 1));
      nowEl.textContent = String(at + 1);
      backBtn.hidden = at === 0;
      var last = at === steps.length - 1;
      nextBtn.hidden = last;
      sendBtn.hidden = !last;
    }

    function go(n) {
      at = Math.max(0, Math.min(n, steps.length - 1));
      syncGroups();
      render();
      var q = $('.wiz-group:not([hidden]) .wiz-q', steps[at]) || $('.wiz-q', steps[at]);
      if (q) { q.setAttribute('tabindex', '-1'); q.focus({ preventScroll: true }); }
    }

    nextBtn.addEventListener('click', function () { if (stepValid()) go(at + 1); });
    backBtn.addEventListener('click', function () { clearErr(); go(at - 1); });

    form.addEventListener('pointerdown', function () { byPointer = true; });
    form.addEventListener('keydown', function () { byPointer = false; });
    form.addEventListener('change', function (e) {
      clearErr();
      if (e.target.name === 'job') {
        // Changing the job clears answers that belonged to the old one.
        $$('input[name="service"], input[name="size"]', form).forEach(function (i) { i.checked = false; });
        syncGroups();
      }
      render();
      if (byPointer && e.target.type === 'radio' && e.target.name !== 'contact' && e.target.name !== 'property' && stepValid()) {
        var from = at; // ignore if Continue was already pressed in the meantime
        setTimeout(function () { if (at === from) go(at + 1); }, 220);
      }
    });

    // Sends the answers to Double N's GHL inbound webhook (set in build.py FACTS).
    // Form-encoded + no-cors: a "simple" request browsers allow cross-site without
    // a CORS preflight. Until a webhook is set, the form says so and asks people to call.
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var card = $('#estimate');
      var hook = form.getAttribute('data-webhook');
      if (!hook) { card.classList.add('is-offline'); return; }
      var body = new URLSearchParams();
      new FormData(form).forEach(function (v, k) { body.append(k, v); });
      sendBtn.disabled = true;
      fetch(hook, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () { card.classList.add('is-sent'); })
        .catch(function () { sendBtn.disabled = false; card.classList.add('is-offline'); });
    });

    syncGroups();
    render();

    // "Get a commercial estimate" style links: pre-pick Home/Business, then jump to the form.
    $$('[data-property]').forEach(function (a) {
      a.addEventListener('click', function () {
        var r = $('input[name="property"][value="' + a.getAttribute('data-property') + '"]', form);
        if (r) r.checked = true;
      });
    });
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

  // ponytail: deliberately no scroll-reveal animation. The page reads fine
  // static, and nothing here should depend on JS to become visible.
}
