// Sassy's documentation site: the theme toggle, the language choice, the menu, search, the light/dark switch on cards
// and examples, the copy buttons and the icon filter. No dependencies.
(function () {
  var doc = document.documentElement;
  doc.classList.add('side-js');
  var tekst = {};
  try { tekst = JSON.parse(document.getElementById('side-tekst').textContent); } catch (e) {}
  // Theme: data-theme on <html>, remembered in localStorage (which may be blocked).
  var knapp = document.getElementById('side-temaknapp');
  function visTema() { if (knapp) knapp.setAttribute('aria-pressed', doc.dataset.theme === 'dark' ? 'true' : 'false'); }
  visTema();
  if (knapp) knapp.addEventListener('click', function () {
    var ny = doc.dataset.theme === 'dark' ? 'light' : 'dark';
    doc.dataset.theme = ny;
    try { localStorage.setItem('sassy-side-tema', ny); } catch (e) {}
    visTema();
    // The embedded cards and examples follow the page; their own switch can still set them apart.
    brytere.forEach(function (b) { velg(b, ny); });
  });
  // «This page is also in English.» is for a browser that does not put Norwegian first (it stayed here by choice).
  var ogsaa = document.querySelector('.side-ogsaa');
  if (ogsaa) ogsaa.hidden = (function norskForst(sprak) {var forste = String((sprak && sprak[0]) || '').toLowerCase();return /^(nb|nn|no)(-|_|$)/.test(forste);})(navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]);
  // The language: a link to the other language is a choice, remembered so a Norwegian page does not send you back.
  document.querySelectorAll('.side-spraak a[hreflang], a[data-spraak]').forEach(function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('sassy-side-spraak', a.getAttribute('hreflang')); } catch (e) {} });
  });
  // Menu below 900 px: the open menu scrolls on its own (side.css) and brings the current page to its middle, as
  // scrollIntoView with block: 'center' inside the menu would, but by hand on scrollTop so the page does not move.
  // Opening it moves focus to the current page's link, which is then in view (or to the first link on a page that is
  // not in the menu), so the focus is never scrolled out of sight; Esc closes it and gives focus back to the button.
  var meny = document.querySelector('.side-menyknapp'), nav = document.getElementById('side-nav');
  function midtstill() {
    var her = nav.querySelector('[aria-current="page"]');
    if (!her || !her.getClientRects().length || nav.scrollHeight <= nav.clientHeight) return;
    var nr = nav.getBoundingClientRect(), hr = her.getBoundingClientRect();
    nav.scrollTop += (hr.top + hr.height / 2) - (nr.top + nav.clientTop + nav.clientHeight / 2);
  }
  function settMeny(open, fokus) {
    if (open) nav.setAttribute('data-open', ''); else nav.removeAttribute('data-open');
    meny.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) midtstill();
    if (open && fokus) {
      var her = nav.querySelector('[aria-current="page"]'), maal = her && her.getClientRects().length ? her : nav.querySelector('a');
      if (maal) {
        maal.focus({ preventScroll: true });
        // Opened from further down the page, the menu is above the screen: bring its top under the header.
        var r = maal.getBoundingClientRect(), topp = meny.closest('header') ? meny.closest('header').getBoundingClientRect().bottom : 0;
        if (r.top < topp || r.bottom > innerHeight) window.scrollBy(0, nav.getBoundingClientRect().top - topp);
      }
    }
    if (!open && fokus) meny.focus();
  }
  // The component groups in the menu: each button opens and closes its own group (only below 900 px is it shown).
  document.querySelectorAll('.side-nav__gruppeknapp').forEach(function (b) {
    b.addEventListener('click', function () { b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); });
  });
  if (meny && nav) {
    meny.hidden = false;
    meny.addEventListener('click', function () { settMeny(!nav.hasAttribute('data-open'), true); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !nav.hasAttribute('data-open') || getComputedStyle(meny).display === 'none') return;
      var a = document.activeElement;
      if (!a || a === document.body || a === meny || nav.contains(a)) { e.preventDefault(); settMeny(false, true); }
    });
  }
  // Light and dark for an embedded card or example: data-theme on the frame's <html> (same origin). Each switch names its frame.
  var brytere = Array.prototype.slice.call(document.querySelectorAll('.side-demo__bryter[data-ramme]'));
  function ramme(b) { return document.getElementById(b.dataset.ramme); }
  function settRamme(f, mode) { try { var d = f && f.contentDocument; if (d && d.documentElement) d.documentElement.dataset.theme = mode; } catch (e) {} }
  function valgt(b) { var p = b.querySelector('[aria-pressed="true"]'); return p ? p.dataset.demoTema : 'light'; }
  function velg(b, mode) { b.querySelectorAll('[data-demo-tema]').forEach(function (o) { o.setAttribute('aria-pressed', o.dataset.demoTema === mode ? 'true' : 'false'); }); settRamme(ramme(b), mode); }
  var start = doc.dataset.theme === 'dark' ? 'dark' : 'light';
  brytere.forEach(function (b) {
    var f = ramme(b);
    velg(b, start);
    b.querySelectorAll('[data-demo-tema]').forEach(function (o) { o.addEventListener('click', function () { velg(b, o.dataset.demoTema); }); });
    if (f) {
      f.addEventListener('load', function () { settRamme(f, valgt(b)); });
      if (f.getAttribute('src') && f.contentDocument && f.contentDocument.readyState === 'complete') settRamme(f, valgt(b));
    }
  });
  // A card or example grows to fit its content (same origin), so nothing is cut off on a phone; the height attribute
  // is where it starts, and it never gets smaller than that. Again on every resize of the frame's body (React draws after load).
  function passHoyde(f) {
    try {
      var d = f.contentDocument;
      if (!d || !d.documentElement) return;
      var kant = f.offsetHeight - f.clientHeight, start = Number(f.getAttribute('height')) || 0;
      var h = Math.min(Math.max(start, d.documentElement.scrollHeight + kant), 4000);
      if (Math.abs(h - f.offsetHeight) > 1) f.style.height = h + 'px';
    } catch (e) {}
  }
  function folgHoyde(f) {
    passHoyde(f);
    try { var w = f.contentWindow, d = f.contentDocument; if (w && w.ResizeObserver && d && d.body) new w.ResizeObserver(function () { passHoyde(f); }).observe(d.body); } catch (e) {}
  }
  document.querySelectorAll('iframe.side-kort').forEach(function (f) {
    f.addEventListener('load', function () { folgHoyde(f); });
    if (f.getAttribute('src') && f.contentDocument && f.contentDocument.readyState === 'complete' && f.contentDocument.URL !== 'about:blank') folgHoyde(f);
  });
  // A card that moves focus into itself loads on request.
  var demo = document.getElementById('demo'), vis = document.getElementById('demo-vis');
  if (demo && vis) vis.addEventListener('click', function () { demo.src = demo.dataset.src; demo.hidden = false; vis.parentElement.hidden = true; });
  // From 900 px the sidebar scrolls on its own: bring the current page into view in it (the nearest edge, as
  // scrollIntoView with block: 'nearest'), without animation and without moving the page. Done by hand on scrollTop:
  // Chromium's scrollIntoView also moves the Tab starting point to the link, so the first Tab skipped the skip link.
  if (nav) {
    var her = nav.querySelector('[aria-current="page"]'), oy = getComputedStyle(nav).overflowY;
    if (her && (oy === 'auto' || oy === 'scroll') && nav.scrollHeight > nav.clientHeight) {
      var nr = nav.getBoundingClientRect(), hr = her.getBoundingClientRect(), luft = 12;
      var topp = nr.top + nav.clientTop, bunn = topp + nav.clientHeight;
      if (hr.bottom > bunn - luft) nav.scrollTop += hr.bottom - bunn + luft;
      else if (hr.top < topp + luft) nav.scrollTop -= topp + luft - hr.top;
    }
  }
  // A link to a section folded into <details> opens it.
  function apneMaal() { var id = decodeURIComponent(location.hash.slice(1)); var el = id && document.getElementById(id); var d = el && (el.tagName === 'DETAILS' ? el : el.closest('details')); if (d) d.open = true; }
  apneMaal();
  window.addEventListener('hashchange', apneMaal);
  // Copy: one button per code block, the clipboard API, «Kopiert» on the button and in a polite live region.
  var melding = document.getElementById('side-kopiert');
  function si(t) { if (!melding) return; melding.textContent = ''; setTimeout(function () { melding.textContent = t; }, 50); }
  document.querySelectorAll('.side-innhold pre').forEach(function (pre) {
    var boks = document.createElement('div');
    boks.className = 'side-kode';
    var topp = document.createElement('div');
    topp.className = 'side-kode__topp';
    var code = pre.querySelector('code');
    var m = code && /language-([\w-]+)/.exec(code.className);
    // A plain text block has no language to name.
    var navn = m && m[1] !== 'text' ? m[1] : '';
    var sprak = document.createElement('span');
    sprak.className = 'side-kode__sprak';
    sprak.textContent = navn;
    if (!navn) sprak.hidden = true;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 's-btn s-btn--ghost s-btn--sm side-kode__kopier';
    b.textContent = tekst.kopier || 'Kopier';
    b.setAttribute('aria-label', (tekst.kopierKode || 'Kopier koden') + (navn ? ' (' + navn + ')' : ''));
    pre.parentNode.insertBefore(boks, pre);
    topp.appendChild(sprak);
    topp.appendChild(b);
    boks.appendChild(topp);
    boks.appendChild(pre);
    var tid;
    b.addEventListener('click', function () {
      var t = pre.textContent;
      function ferdig() { b.textContent = tekst.kopiert || 'Kopiert'; si(tekst.kopiert || 'Kopiert'); clearTimeout(tid); tid = setTimeout(function () { b.textContent = tekst.kopier || 'Kopier'; }, 2000); }
      function marker() { var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); pre.focus(); si(tekst.kopierMarkert || ''); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ferdig, marker); else marker();
    });
  });
  // Search over page titles, headings and the first paragraph under each; the index loads on first use.
  var form = document.querySelector('.side-sok'), inn = document.getElementById('side-sok'), ut = document.getElementById('side-sok-treff'), status = document.getElementById('side-sok-status');
  var indeks = null, laster = null;
  function hent() { if (indeks) return Promise.resolve(indeks); if (!laster) laster = fetch(form.dataset.indeks).then(function (r) { return r.json(); }).then(function (j) { indeks = j; return j; }).catch(function () { return { sider: [], tekst: {} }; }); return laster; }
  function lukk() { ut.hidden = true; ut.innerHTML = ''; }
  function sok() {
    var q = inn.value.trim().toLowerCase();
    if (!q) { lukk(); status.textContent = ''; return; }
    hent().then(function (j) {
      // A synonym (varsel, dropdown, dark mode …) puts the pages it means first. Then a match in a page title (the title that
      // is the words, then one that starts with them, then one that has them), then the page's own text (so "kontrast" finds
      // the foundations and "meny" the Menu), then headings, then the text under them.
      var sider = [], titler = [], tekster = [], overskrifter = [], avsnitt = [], ord = [];
      var har = function (x) { return (x || '').toLowerCase().indexOf(q) >= 0; };
      (j.syn || []).forEach(function (s) { if (q.length >= 3 && (s.o.indexOf(q) === 0 || q.indexOf(s.o) === 0)) s.u.forEach(function (u) { if (ord.indexOf(u) < 0) ord.push(u); }); });
      ord.forEach(function (u) { j.sider.forEach(function (s) { if (s.u === u) sider.push({ t: s.t, u: s.u }); }); });
      j.sider.forEach(function (s) {
        if (ord.indexOf(s.u) < 0) { var tl = (s.t || '').toLowerCase(); if (har(s.t)) titler.push({ t: s.t, u: s.u, v: tl === q ? 0 : tl.indexOf(q) === 0 ? 1 : 2 }); else if (har(s.p)) tekster.push({ t: s.t, u: s.u }); }
        s.h.forEach(function (h) { var r = { t: h.t, u: s.u + '#' + h.i, side: s.t }; if (har(h.t)) overskrifter.push(r); else if (har(h.p)) avsnitt.push(r); });
      });
      titler.sort(function (a, b) { return a.v - b.v; });
      var treff = sider.concat(titler, tekster, overskrifter, avsnitt).slice(0, 12);
      var h = (x) => String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
      ut.innerHTML = treff.length ? '<ul>' + treff.map(function (r) { return '<li><a href="' + h(r.u) + '">' + h(r.t) + (r.side ? ' <span class="side-meta">· ' + h(r.side) + '</span>' : '') + '</a></li>'; }).join('') + '</ul>' : '<p class="side-sok__tom side-hint">' + h(j.tekst.ingenTreff) + '</p>';
      ut.hidden = false;
      status.textContent = treff.length ? j.tekst.treff.replace('{n}', treff.length) : j.tekst.ingenTreff;
    });
  }
  if (form && inn) {
    inn.addEventListener('input', sok);
    inn.addEventListener('focus', function () { hent(); if (inn.value.trim()) sok(); });
    inn.addEventListener('keydown', function (e) { if (e.key === 'Escape') { inn.value = ''; lukk(); } if (e.key === 'ArrowDown') { var a = ut.querySelector('a'); if (a) { e.preventDefault(); a.focus(); } } });
    // In the hits: up and down move between them, up from the first and Esc go back to the field.
    ut.addEventListener('keydown', function (e) {
      var lenker = Array.prototype.slice.call(ut.querySelectorAll('a')), i = lenker.indexOf(document.activeElement);
      if (i < 0) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); if (i < lenker.length - 1) lenker[i + 1].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (i > 0) lenker[i - 1].focus(); else inn.focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); inn.focus(); }
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); var a = ut.querySelector('a'); if (a) location.href = a.href; });
    document.addEventListener('click', function (e) { if (!form.contains(e.target)) lukk(); });
    form.addEventListener('focusout', function (e) { if (!form.contains(e.relatedTarget)) lukk(); });
  }
  // The icon filter.
  var filter = document.getElementById('ikon-filter'), ikoner = document.getElementById('side-ikoner'), ikonStatus = document.getElementById('ikon-status'), tom = document.getElementById('ikon-tom');
  if (filter && ikoner) {
    var alle = Array.prototype.slice.call(ikoner.querySelectorAll('li'));
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase(), n = 0;
      alle.forEach(function (li) { var vis = !q || li.dataset.navn.indexOf(q) >= 0; li.hidden = !vis; if (vis) n++; });
      ikonStatus.textContent = filter.dataset.viser.replace('{n}', n);
      tom.hidden = n > 0;
    });
  }
})();
