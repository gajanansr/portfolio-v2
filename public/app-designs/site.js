/* App designs page: builds each case study from window.CASES and window.APPS, wires the live phones. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = () => innerWidth <= 860;
  const ORDER = ['claimo', 'slates', 'quire', 'rewind'];

  /* theme, shared key with next-themes on the main site */
  $('#mode').addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  /* fonts the apps ask for */
  const fam = new Set();
  Object.values(APPS).forEach(a => (a.fonts || []).forEach(f => fam.add(f)));
  if (fam.size) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?' + [...fam].map(f => 'family=' + f).join('&') + '&display=swap'; document.head.appendChild(l); }

  const total = ORDER.reduce((n, id) => n + (APPS[id] ? APPS[id].screens.length : 0), 0);
  $$('.count').forEach(e => e.textContent = total);

  /* hero phones */
  $$('.hero-phones a').forEach(a => {
    const app = APPS[a.dataset.app]; if (!app) return;
    const p = new Phone(a, app.id, { static: true, screen: app.signature || app.screens[0].id });
    const fit = () => p.fitTo(a.getBoundingClientRect().width || 200);
    fit(); addEventListener('resize', fit);
  });

  /* one chapter per app */
  const COVER = { claimo: 'home', slates: 'home', quire: 'library', rewind: 'today' };
  const PLATFORM = { ios: 'iOS', android: 'Android' };
  const tpl = $('#case-tpl'), holder = $('#cases');
  ORDER.forEach(id => {
    const app = APPS[id], c = CASES[id]; if (!app || !c) return;
    const f = tpl.content.cloneNode(true);
    const ch = $('.chapter', f);
    ch.id = id; ch.setAttribute('aria-labelledby', id + '-h');
    $('.ch-kicker', ch).textContent = `${PLATFORM[app.platform] || 'iOS'} · ${app.screens.length} screens · 2026 redesign`;
    const h = $('.ch-name', ch); h.id = id + '-h'; h.textContent = app.name;
    $('.ch-line', ch).textContent = c.line;
    const links = [];
    c.facts.forEach(([k, v]) => { const m = v.match(/href="([^"]+)">([^<]+)</); if (m && (k === 'Shipped' || k === 'Code')) links.push(`<a href="${m[1]}">${k === 'Code' ? 'Code on GitHub' : 'Live: ' + m[2]}</a>`); });
    $('.ch-links', ch).innerHTML = links.join('');
    $('.ch-statement', ch).textContent = c.problem;
    $('.ch-sig', ch).textContent = c.sig[1];
    $('.ch-sig-p', ch).textContent = c.hint;
    const chips = $('.ch-chips', ch);
    [c.sig[0], ...c.decisions.map(d => d[0])].forEach(scr => {
      const meta = app.screens.find(s => s.id === scr); if (!meta) return;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.screen = scr; b.textContent = meta.title;
      chips.appendChild(b);
    });
    $('.ch-flow-count', ch).textContent = `${app.screens.length} screens, in order`;
    $('.rail', ch).setAttribute('aria-label', app.name + ' screens');
    const sys = app.system || {};
    $('.dots', ch).innerHTML = (sys.palette || []).slice(0, 7).map(p => `<i style="background:${p.value}" title="${p.name} ${p.value}"></i>`).join('');
    const faces = [...new Set((sys.type || []).map(t => t.family))].join(', ');
    $('.sys-txt', ch).textContent = [faces, 'every text pair measured at 4.5:1 or better'].filter(Boolean).join(' · ');
    holder.appendChild(f);
    build(ch, id, app, c);
  });

  function build(ch, id, app, c) {
    const cover = $('.ch-cover-phone', ch);
    const cp = new Phone(cover, id, { static: true, screen: app.screens.some(s => s.id === COVER[id]) ? COVER[id] : app.screens[0].id });
    const fitCover = () => cp.fitTo(Math.min(cover.clientWidth, 360), narrow() ? 620 : Math.min(innerHeight * .8, 720));
    fitCover();

    const liveHost = $('.ch-live', ch);
    const live = new Phone(liveHost, id, { screen: c.sig[0] });
    const fit = () => live.fitTo(Math.min(ch.clientWidth, 420), narrow() ? Math.min(innerHeight * .8, 740) : Math.min(innerHeight - 120, 800));
    fit();
    const mark = s => {
      $$('.cell', ch).forEach(x => x.setAttribute('aria-current', String(x.dataset.screen === s)));
      $$('.chip', ch).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.screen === s)));
    };
    liveHost.addEventListener('phone:screen', e => mark(e.detail.screen));
    const go = (s, scroll) => { live.go(s, 'fade'); if (scroll) liveHost.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); };
    $$('.chip', ch).forEach(b => b.addEventListener('click', () => go(b.dataset.screen, false)));
    const rail = $('.rail', ch);
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return; io.disconnect();
      app.screens.forEach(s => {
        const cell = document.createElement('button');
        cell.className = 'cell'; cell.type = 'button'; cell.dataset.screen = s.id;
        cell.setAttribute('aria-label', `Open ${s.title} on the phone above`); cell.title = s.caption || s.title;
        cell.innerHTML = `<span class="cell-ph"></span><span class="cell-t">${s.title}</span>`;
        rail.appendChild(cell);
        new Phone($('.cell-ph', cell), id, { static: true, screen: s.id }).fitTo(narrow() ? 150 : 176);
        cell.addEventListener('click', () => go(s.id, true));
      });
      mark(live.current);
    }, { rootMargin: '800px 0px' });
    io.observe(rail);
    mark(c.sig[0]);
    addEventListener('resize', () => { fit(); fitCover(); });
  }

  /* nav highlights the case in view */
  const navLinks = $$('.nav a[href^="#"]');
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('.chapter').forEach(s => so.observe(s));

  /* entrances: only what starts below the fold */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.ch-cover-text > *, .ch-cover-phone, .ch-problem > *, .ch-try > *, .ch-flow-head, .ch-system, .contact > *');
    els.forEach(el => { el.classList.add('rise'); if (el.getBoundingClientRect().top > innerHeight) el.classList.add('pre'); });
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('pre'); ro.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.pre').forEach(el => ro.observe(el));
  }

  /* copy email */
  $('#copy').addEventListener('click', () => {
    const t = $('#mail').textContent.trim(), after = $('#after');
    const sel = () => getSelection().selectAllChildren($('#mail'));
    const done = ok => { after.textContent = ok ? 'Copied.' : 'Selected. Press Ctrl or Cmd + C to copy.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(() => done(true), () => { sel(); done(false); });
    else { sel(); done(false); }
  });
})();
