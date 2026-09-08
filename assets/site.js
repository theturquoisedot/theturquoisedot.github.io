/* The Turquoise Dot: shared behaviour for every page. No dependencies.
   Edit points for future officers are marked with "EDIT:". */

/* EDIT: analytics. Create a free GoatCounter site (goatcounter.com) under the community
   Google account, then put its code here (the part before .goatcounter.com). Leave empty to disable. */
var TD_GOATCOUNTER_CODE = 'turquoisedot';

(function () {
  'use strict';

  /* ---------- 1. Time-aware content ----------
     Any element with data-until="YYYY-MM-DDTHH:MM:SS+08:00" is hidden once that moment has passed.
     Add data-past="chip" instead to keep the element and only remove the red "next" styling from its chip. */
  var now = Date.now();
  document.querySelectorAll('[data-until]').forEach(function (el) {
    var until = Date.parse(el.getAttribute('data-until'));
    if (isNaN(until) || now <= until) return;
    if (el.getAttribute('data-past') === 'chip') {
      el.querySelectorAll('.chip.next').forEach(function (c) { c.classList.remove('next'); });
      el.querySelectorAll('[data-past-text]').forEach(function (t) { t.textContent = t.getAttribute('data-past-text'); });
    } else {
      el.hidden = true;
    }
  });

  /* ---------- 2. Mobile navigation toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---------- 3. Google Form embed (sponsors page) ----------
     The container carries data-form-src; when it is empty the email fallback stays visible. */
  document.querySelectorAll('.form-embed[data-form-src]').forEach(function (box) {
    var src = (box.getAttribute('data-form-src') || '').trim();
    var fallback = document.querySelector('.form-fallback');
    if (!src) return;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Partnership interest form';
    iframe.loading = 'lazy';
    iframe.setAttribute('allow', 'clipboard-write');
    box.appendChild(iframe);
    if (fallback) fallback.hidden = true;
    document.querySelectorAll('.alt-mail').forEach(function (m) { m.hidden = false; });
  });

  /* ---------- 4. Latest posts (rendered from assets/posts.js when present) ---------- */
  var postsBox = document.querySelector('[data-posts]');
  var liEmbed = document.querySelector('[data-li-embed]');
  if (liEmbed && !liEmbed.querySelector('iframe')) liEmbed.hidden = true;
  if (postsBox && Array.isArray(window.TD_POSTS) && window.TD_POSTS.length) {
    var icons = {
      linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>',
      x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z"/></svg>'
    };
    var max = parseInt(postsBox.getAttribute('data-posts'), 10) || 3;
    window.TD_POSTS.slice(0, max).forEach(function (p) {
      var el = document.createElement('article');
      el.className = 'post reveal';
      var label = p.platform === 'x' ? 'X' : 'LinkedIn';
      var html = '<div class="src">' + (icons[p.platform] || '') + '<span>' + label + (p.date ? ' · ' + p.date : '') + '</span></div>';
      if (p.image) html += '<img src="' + p.image + '" alt="' + (p.alt || '') + '" loading="lazy">';
      html += '<p>' + p.text + '</p>';
      html += '<a class="more" href="' + p.url + '" target="_blank" rel="noopener">Read on ' + label + ' ↗</a>';
      el.innerHTML = html;
      postsBox.appendChild(el);
    });
  } else if (postsBox) {
    var sec = postsBox.closest('section');
    var embed = sec ? sec.querySelector('[data-li-embed]') : null;
    var hasEmbed = embed && embed.querySelector('iframe');
    if (sec && !hasEmbed) sec.hidden = true;
  }

  /* ---------- 5. Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. Analytics (privacy-friendly, no cookies) ---------- */
  if (TD_GOATCOUNTER_CODE) {
    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-goatcounter', 'https://' + TD_GOATCOUNTER_CODE + '.goatcounter.com/count');
    s.src = 'https://gc.zgo.at/count.js';
    document.body.appendChild(s);
  }
})();
