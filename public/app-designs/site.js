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

  /* case studies */
  const tpl = $('#case-tpl'), holder = $('#cases');
  const lives = {};
  ORDER.forEach(id => {
    const app = APPS[id], c = CASES[id]; if (!app || !c) return;
    const f = tpl.content.cloneNode(true);
    const sec = $('.case', f);
    sec.id = id; sec.setAttribute('aria-labelledby', id + '-h');
    const h = $('.c-name', sec); h.id = id + '-h'; h.textContent = app.name;
    $('.c-line', sec).textContent = c.line;
    $('.c-facts', sec).innerHTML = c.facts.map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
    $('.hint', sec).textContent = c.hint;
    $('.c-problem', sec).textContent = c.problem;
    $('.c-approach', sec).textContent = c.approach;
    $('.sig h3', sec).textContent = c.sig[1];
    $('.sig-p', sec).textContent = c.sig[2];
    const dec = $('.decisions', sec);
    c.decisions.forEach(([scr, t, d]) => {
      if (!app.screens.some(s => s.id === scr)) return;
      const b = document.createElement('button');
      b.className = 'decision'; b.type = 'button'; b.dataset.screen = scr;
      b.innerHTML = `<b>${t}</b><span class="d">${d}</span><span class="go">Show</span>`;
      dec.appendChild(b);
    });
    const sys = app.system;
    if (sys) {
      $('.sys-sum', sec).textContent = sys.summary || '';
      $('.swatches', sec).innerHTML = (sys.palette || []).map(p =>
        `<div class="sw"><i style="background:${p.value}"></i><div><b>${p.name}</b><span title="${p.role || ''}">${p.role || ''}</span><code>${p.value}</code></div></div>`).join('');
      $('.types', sec).innerHTML = (sys.type || []).map(t =>
        `<div class="ty"><span>${t.role}</span><p class="smp" style="font-family:'${t.family}', system-ui">${t.sample || app.name}</p><span>${t.family}${t.spec ? ' · ' + t.spec : ''}</span></div>`).join('');
      $('.contrast', sec).innerHTML = (sys.contrast || []).slice(0, 8).map(x => `<li>${x.pair} · ${x.ratio}</li>`).join('');
    } else $('.c-system', sec).remove();
    $('.flow-head p', sec).textContent = `${app.screens.length} screens, in the order a person meets them. Tap one to open it on the phone.`;
    $('.rail', sec).setAttribute('aria-label', app.name + ' screens');
    const [src, alt, cap] = c.photo;
    const img = $('.band img', sec); img.src = src; img.alt = alt;
    $('.band figcaption', sec).textContent = cap;
    holder.appendChild(f);
    build(sec, id, app, c);
  });

  function build(sec, id, app, c) {
    const liveHost = $('.live', sec);
    const live = new Phone(liveHost, id, { screen: c.sig[0] });
    lives[id] = live;
    const fit = () => live.fitTo(Math.min($('.c-phone', sec).clientWidth - 40, 400), narrow() ? Math.min(innerHeight * .78, 720) : Math.min(innerHeight - 180, 780));
    fit();
    const mark = s => {
      $$('.cell', sec).forEach(x => x.setAttribute('aria-current', String(x.dataset.screen === s)));
      $$('.decision', sec).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.screen === s)));
    };
    liveHost.addEventListener('phone:screen', e => mark(e.detail.screen));
    const go = s => { live.go(s, 'fade'); if (narrow()) liveHost.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); };
    $('.sig .btn', sec).addEventListener('click', () => go(c.sig[0]));
    $$('.decision', sec).forEach(b => b.addEventListener('click', () => go(b.dataset.screen)));
    const rail = $('.rail', sec);
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return; io.disconnect();
      app.screens.forEach(s => {
        const cell = document.createElement('button');
        cell.className = 'cell'; cell.type = 'button'; cell.dataset.screen = s.id;
        cell.setAttribute('aria-label', `Open ${s.title} on the phone`);
        cell.innerHTML = `<span class="cell-ph"></span><span class="cell-t">${s.title}</span><span class="cell-c">${s.caption || ''}</span>`;
        rail.appendChild(cell);
        new Phone($('.cell-ph', cell), id, { static: true, screen: s.id }).fitTo(narrow() ? 164 : 196);
        cell.addEventListener('click', () => go(s.id));
      });
      mark(live.current);
    }, { rootMargin: '800px 0px' });
    io.observe(rail);
    mark(c.sig[0]);
    addEventListener('resize', fit);
  }

  /* nav highlights the case in view */
  const navLinks = $$('.nav a[href^="#"]');
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('.case').forEach(s => so.observe(s));

  /* entrances: only what starts below the fold */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.c-head, .c-text > *, .c-system > *, .flow-head, .band, .contact > *');
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
