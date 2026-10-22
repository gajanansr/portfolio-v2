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
      $$('.chip', ch).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.screen === s)));
    };
    liveHost.addEventListener('phone:screen', e => mark(e.detail.screen));
    const go = (s, scroll) => { live.go(s, 'fade'); if (scroll) liveHost.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); };
    $$('.chip', ch).forEach(b => b.addEventListener('click', () => go(b.dataset.screen, false)));
    const rail = $('.rail', ch);
    /* a screen in the strip opens in place: the thumbnail grows into a working phone in the same row */
    let open = null;
    const W1 = () => narrow() ? 300 : 340;
    const close = (instant) => {
      if (!open) return;
      const { cell, ph, holder, lp, w0, h0, thumb } = open; open = null;
      cell.classList.remove('open'); cell.querySelector('.cell-hit').setAttribute('aria-expanded', 'false');
      cell.style.width = w0 + 'px'; ph.style.width = w0 + 'px'; ph.style.height = h0 + 'px';
      holder.style.transform = `scale(${w0 / W1()})`; holder.style.opacity = '0'; thumb.style.opacity = '';
      setTimeout(() => { lp.destroy(); holder.remove(); cell.style.width = ''; ph.style.width = ''; ph.style.height = ''; }, instant || reduce ? 0 : 560);
    };
    const openCell = (cell, s) => {
      if (open && open.cell === cell) return close();
      close(true);
      const ph = $('.cell-ph', cell), thumb = ph.firstElementChild;
      const r = ph.getBoundingClientRect(), w0 = r.width, h0 = r.height, w1 = W1();
      const holder = document.createElement('div'); holder.className = 'cell-live';
      cell.appendChild(holder);
      const lp = new Phone(holder, id, { screen: s.id }); lp.fitTo(w1);
      const h1 = parseFloat(lp.root.style.height);
      holder.style.transform = `scale(${w0 / w1})`; holder.style.opacity = '0';
      cell.style.width = w0 + 'px'; ph.style.width = w0 + 'px'; ph.style.height = h0 + 'px';
      open = { cell, ph, holder, lp, w0, h0, thumb };
      cell.classList.add('open'); cell.querySelector('.cell-hit').setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        cell.style.width = w1 + 'px'; ph.style.width = w1 + 'px'; ph.style.height = h1 + 'px';
        holder.style.transform = 'scale(1)'; holder.style.opacity = '1'; thumb.style.opacity = '0';
        const left = cell.offsetLeft - (rail.clientWidth - w1) / 2;
        rail.scrollTo({ left: Math.max(0, left), behavior: reduce ? 'auto' : 'smooth' });
        $$('.cell', rail).forEach(x => x.setAttribute('aria-current', String(x === cell)));
      }));
    };
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return; io.disconnect();
      app.screens.forEach(s => {
        const cell = document.createElement('div');
        cell.className = 'cell'; cell.dataset.screen = s.id;
        cell.innerHTML = `<button class="cell-hit" type="button" aria-expanded="false" aria-label="Open ${s.title} here"><span class="cell-ph"></span><span class="cell-t">${s.title}</span><span class="cell-c">${s.caption || ''}</span></button>`;
        rail.appendChild(cell);
        new Phone($('.cell-ph', cell), id, { static: true, screen: s.id }).fitTo(narrow() ? 150 : 176);
        $('.cell-hit', cell).addEventListener('click', () => openCell(cell, s));
      });
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
