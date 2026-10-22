/* App designs: one page, a list of apps. Opening one shows a single working phone. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = () => innerWidth <= 860;
  const ORDER = ['claimo', 'slates', 'quire', 'rewind'];
  const PLATFORM = { ios: 'iOS', android: 'Android' };

  $('#mode').addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  const fam = new Set();
  Object.values(APPS).forEach(a => (a.fonts || []).forEach(f => fam.add(f)));
  if (fam.size) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?' + [...fam].map(f => 'family=' + f).join('&') + '&display=swap'; document.head.appendChild(l); }

  const tpl = $('#app-tpl'), list = $('#apps');
  let current = null;

  const close = (item, instant) => {
    if (!item) return;
    const { li, row, panel, phone } = item;
    li.classList.remove('open'); row.setAttribute('aria-expanded', 'false'); panel.setAttribute('inert', '');
    setTimeout(() => { if (!li.classList.contains('open') && phone.p) { phone.p.destroy(); phone.p = null; } }, instant || reduce ? 0 : 600);
    if (current === item) current = null;
  };

  /* glide the page so the app's title sits at the top and the phone below it is fully in view while the panel opens, instead of scrolling after it */
  let raf = 0;
  const follow = el => {
    cancelAnimationFrame(raf);
    const t0 = performance.now();
    const step = now => {
      const d = el.getBoundingClientRect().top - 64;
      const k = reduce ? 1 : .16;
      scrollTo({ top: scrollY + (Math.abs(d) < 1 ? d : d * k), behavior: 'instant' });
      if (now - t0 < 800 && !reduce) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  addEventListener('wheel', () => cancelAnimationFrame(raf), { passive: true });
  addEventListener('touchstart', () => cancelAnimationFrame(raf), { passive: true });

  ORDER.forEach((id, i) => {
    const app = APPS[id], c = CASES[id]; if (!app || !c) return;
    const f = tpl.content.cloneNode(true), li = $('.app', f);
    const row = $('.row', li), panel = $('.panel', li), live = $('.live', li), chips = $('.chips', li);
    $('.num', li).textContent = String(i + 1).padStart(2, '0');
    $('.name', li).textContent = app.name;
    $('.line', li).textContent = c.problem;
    $('.meta', li).textContent = `${PLATFORM[app.platform] || 'iOS'} · ${app.screens.length} screens`;
    $('.hint', li).textContent = c.hint.replace(/^This phone works\.\s*/, '');
    li.id = id;
    const phone = { p: null };
    const item = { li, row, panel, phone };
    app.screens.forEach((s, n) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.screen = s.id;
      b.innerHTML = `<i>${String(n + 1).padStart(2, '0')}</i>${s.title}`;
      b.addEventListener('click', () => phone.p && phone.p.go(s.id, 'fade'));
      chips.appendChild(b);
    });
    const mark = s => $$('.chip', li).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.screen === s)));
    live.addEventListener('phone:screen', e => mark(e.detail.screen));
    const fit = () => phone.p && phone.p.fitTo(Math.min(live.clientWidth || 380, 380), narrow() ? Math.min(innerHeight * .78, 720) : Math.min(innerHeight - 230, 760));
    addEventListener('resize', fit);

    row.addEventListener('click', () => {
      if (li.classList.contains('open')) return close(item);
      close(current); current = item;
      if (!phone.p) { phone.p = new Phone(live, id, { screen: c.sig[0] }); mark(c.sig[0]); }
      fit();
      li.classList.add('open'); row.setAttribute('aria-expanded', 'true'); panel.removeAttribute('inert');
      follow(li);
    });
    list.appendChild(f);
  });

  $('#copy').addEventListener('click', () => {
    const t = $('#mail').textContent.trim(), after = $('#after');
    const sel = () => getSelection().selectAllChildren($('#mail'));
    const done = ok => { after.textContent = ok ? 'Copied.' : 'Selected. Press Ctrl or Cmd + C.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(() => done(true), () => { sel(); done(false); });
    else { sel(); done(false); }
  });
})();
