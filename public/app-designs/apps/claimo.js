/* Claimo: Uber and Rapido receipts in, a reimbursement report out. Clean iOS; the claim deck is the signature. */
(() => {
  /* ---------- Bengaluru, as a flat map ---------- */
  const P = {
    hsr: { x: 196, y: 214, n: 'HSR Layout', s: 'HSR', a: '27th Main, Sector 2', tag: 'Home' },
    etv: { x: 248, y: 194, n: 'Embassy TechVillage', s: 'Bellandur', a: 'Outer Ring Road, Bellandur', tag: 'Office' },
    kor: { x: 182, y: 178, n: 'Koramangala 5th Block', s: 'Koramangala', a: '80 Feet Road' },
    ind: { x: 216, y: 140, n: 'Indiranagar', s: 'Indiranagar', a: '100 Feet Road' },
    wf: { x: 322, y: 136, n: 'ITPL, Whitefield', s: 'Whitefield', a: 'Whitefield Main Road' },
    man: { x: 198, y: 84, n: 'Manyata Tech Park', s: 'Manyata', a: 'Nagavara, Outer Ring Road', tag: 'Client' },
    kia: { x: 176, y: 14, n: 'Kempegowda Airport', s: 'Airport', a: 'Terminal 2, Devanahalli', tag: 'Airport' }
  };
  const RIDES = [
    { id: 'r1', d: '2026-10-01', t: '09:12', e: '09:36', svc: 'rb', f: 'hsr', to: 'etv', km: 6.4, fare: 74, st: 'work', who: 'Ravi K', veh: 'KA 01 HQ 7781' },
    { id: 'r2', d: '2026-10-01', t: '19:40', e: '20:18', svc: 'ug', f: 'etv', to: 'hsr', km: 6.8, fare: 312, st: 'work', who: 'Manjunath', veh: 'KA 05 AK 4417' },
    { id: 'r3', d: '2026-10-03', t: '11:05', e: '11:46', svc: 'ug', f: 'hsr', to: 'ind', km: 9.1, fare: 356, st: 'personal', who: 'Syed', veh: 'KA 51 AD 9023' },
    { id: 'r4', d: '2026-10-06', t: '08:58', e: '09:20', svc: 'rb', f: 'hsr', to: 'etv', km: 6.4, fare: 68, st: 'work', who: 'Prakash', veh: 'KA 03 JR 1180' },
    { id: 'r5', d: '2026-10-07', t: '05:10', e: '06:22', svc: 'up', f: 'hsr', to: 'kia', km: 46.2, fare: 1140, st: 'work', who: 'Naveen', veh: 'KA 04 MN 6650' },
    { id: 'r6', d: '2026-10-09', t: '22:15', e: '23:36', svc: 'ug', f: 'kia', to: 'hsr', km: 45.8, fare: 1092, st: 'work', who: 'Imran', veh: 'KA 53 B 2271' },
    { id: 'r7', d: '2026-10-13', t: '09:20', e: '09:45', svc: 'rb', f: 'hsr', to: 'etv', km: 6.4, fare: 81, st: 'work', who: 'Ravi K', veh: 'KA 01 HQ 7781' },
    { id: 'r8', d: '2026-10-14', t: '18:45', e: '19:14', svc: 'ra', f: 'etv', to: 'kor', km: 5.2, fare: 118, st: 'personal', who: 'Lokesh', veh: 'KA 02 AB 3394' },
    { id: 'r9', d: '2026-10-15', t: '09:06', e: '09:29', svc: 'rb', f: 'hsr', to: 'etv', km: 6.4, fare: 72, st: 'new', guess: 'work', why: 'Home to Office on a weekday', who: 'Arun', veh: 'KA 01 JT 5520' },
    { id: 'r10', d: '2026-10-16', t: '14:30', e: '15:38', svc: 'ug', f: 'etv', to: 'man', km: 27.5, fare: 540, st: 'new', guess: 'work', why: 'Office to a saved client place', who: 'Manjunath', veh: 'KA 05 AK 4417' },
    { id: 'r11', d: '2026-10-16', t: '17:55', e: '19:09', svc: 'ug', f: 'man', to: 'etv', km: 27.9, fare: 512, st: 'new', guess: 'work', why: 'Client place back to Office', who: 'Deepak', veh: 'KA 41 C 8806' },
    { id: 'r12', d: '2026-10-18', t: '20:10', e: '20:41', svc: 'rb', f: 'ind', to: 'hsr', km: 9.3, fare: 96, st: 'new', guess: 'personal', why: 'Sunday evening, not from Office', who: 'Kiran', veh: 'KA 03 HY 4127' },
    { id: 'r13', d: '2026-10-20', t: '08:50', e: '09:52', svc: 'ug', f: 'hsr', to: 'wf', km: 21.4, fare: 468, st: 'new', guess: 'work', why: 'Weekday morning from Home', who: 'Sathish', veh: 'KA 50 M 1034' },
    { id: 'r14', d: '2026-10-21', t: '09:15', e: '09:49', svc: 'rb', f: 'hsr', to: 'etv', km: 6.4, fare: 112, st: 'new', guess: 'work', why: 'Home to Office, rain surge', who: 'Arun', veh: 'KA 01 JT 5520' },
    { id: 'r15', d: '2026-10-21', t: '19:30', e: '20:14', svc: 'ug', f: 'etv', to: 'hsr', km: 6.8, fare: null, st: 'error', who: 'Harish', veh: 'KA 05 MF 2290' }
  ];
  const SVC = { ug: { n: 'Uber Go', b: 'uber' }, up: { n: 'Uber Premier', b: 'uber' }, rb: { n: 'Rapido Bike', b: 'rapido' }, ra: { n: 'Rapido Auto', b: 'rapido' } };
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = d => { const x = new Date(d + 'T00:00:00'); return { w: DAYS[x.getDay()], n: x.getDate() }; };
  const rs = n => '₹' + Number(n).toLocaleString('en-IN');
  const sum = a => a.reduce((t, r) => t + (r.fare || 0), 0);
  const by = (s, st) => s.rides.filter(r => r.st === st);
  const get = (s, id) => s.rides.find(r => r.id === id);
  const place = k => P[k].tag || P[k].s;

  /* ---------- icons, SF-style strokes ---------- */
  const sv = (d, w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    back: sv('<path d="M15 5l-7 7 7 7"/>', 2.4),
    close: sv('<path d="M7 7l10 10M17 7 7 17"/>', 2.2),
    chev: sv('<path d="m9.5 6 6 6-6 6"/>', 2.2),
    check: sv('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.6),
    x: sv('<path d="M7 7l10 10M17 7 7 17"/>', 2.6),
    undo: sv('<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>'),
    month: sv('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>', 1.9),
    rides: sv('<circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M9 6.5h5.5a3.5 3.5 0 0 1 0 7h-5a3.5 3.5 0 0 0 0 7H15"/>', 1.9),
    report: sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>', 1.9),
    places: sv('<path d="M12 21s-6.5-6-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.4"/>', 1.9),
    filter: sv('<path d="M4 7h16M7 12h10M10 17h4"/>'),
    search: sv('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>'),
    share: sv('<path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>'),
    mail: sv('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
    folder: sv('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    plus: sv('<path d="M12 5v14M5 12h14"/>', 2.2),
    warn: sv('<path d="M12 4 2.8 20h18.4z"/><path d="M12 10v4.5M12 17.3v.2"/>'),
    lock: sv('<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>'),
    receipt: sv('<path d="M6 3h12v18l-2.4-1.6L13.2 21 12 20l-1.2 1-2.4-1.6L6 21z"/><path d="M9 8h6M9 12h6M9 16h3.5"/>', 1.9),
    bolt: sv('<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>', 1.9),
    calendar: sv('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4M8.5 14h2M13.5 14h2"/>', 1.9),
    doc: sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>', 1.9),
    person: sv('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5"/>', 1.9),
    del: sv('<path d="M9 5h11v14H9l-6-7z"/><path d="m12.5 9.5 5 5M17.5 9.5l-5 5"/>', 1.8),
    g: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/></svg>'
  };
  const logo = () => `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="var(--color-accent)"/><path d="M13 9h14v22l-2.8-1.8L21.4 31 20 30l-1.4 1-2.8-1.8L13 31z" fill="#fff"/><path d="m16.4 19.6 2.6 2.6 4.8-5" fill="none" stroke="var(--color-accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const badge = svc => SVC[svc].b === 'uber' ? '<span class="c-bd c-bd-uber">Uber</span>' : '<span class="c-bd c-bd-rap">Rapido</span>';

  /* ---------- flat map ---------- */
  function map(f, t, o = {}) {
    const w = o.w || 390, h = o.h || 220, pad = o.pad || 40;
    const A = P[f], B = t ? P[t] : null;
    let vb;
    if (!B) { const bw = 330, bh = bw * h / w; vb = [52, 115 - bh / 2, bw, bh]; }
    else {
      let x0 = Math.min(A.x, B.x) - pad, x1 = Math.max(A.x, B.x) + pad, y0 = Math.min(A.y, B.y) - pad, y1 = Math.max(A.y, B.y) + pad;
      let bw = x1 - x0, bh = y1 - y0; const r = w / h;
      if (bw / bh < r) { const nw = bh * r; x0 -= (nw - bw) / 2; bw = nw; } else { const nh = bw / r; y0 -= (nh - bh) / 2; bh = nh; }
      vb = [x0, y0, bw, bh];
    }
    const k = vb[2] / 300;
    let route = '';
    if (B) {
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, bend = Math.min(24, L * .2);
      route = `M${A.x} ${A.y} Q${mx - dy / L * bend} ${my + dx / L * bend} ${B.x} ${B.y}`;
    }
    const pin = (p, cls) => `<g class="pin ${cls}" transform="translate(${p.x} ${p.y}) scale(${k})"><circle r="8"/><circle r="3.6" class="dot"/></g>`;
    const pins = o.pins ? o.pins.map(key => `<g class="pin place" transform="translate(${P[key].x} ${P[key].y}) scale(${k})"><circle r="9"/><circle r="4" class="dot"/></g>`).join('') : '';
    return `<svg class="c-map" viewBox="${vb.map(v => +v.toFixed(1)).join(' ')}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${B ? `Route from ${A.n} to ${B.n}` : 'Map of saved places in Bengaluru'}">
      <rect x="-300" y="-300" width="1000" height="1000" class="land"/>
      <path d="M176 128c8-6 20-4 22 6s-8 16-18 14-10-14-4-20z" class="park"/><path d="M140 146c6-4 14-2 15 4s-6 10-12 8-7-8-3-12z" class="park"/>
      <ellipse cx="264" cy="181" rx="17" ry="7.5" transform="rotate(-18 264 181)" class="lake"/>
      <ellipse cx="158" cy="80" rx="9" ry="5" class="lake"/><ellipse cx="200" cy="124" rx="5.5" ry="3.6" class="lake"/><ellipse cx="216" cy="206" rx="5" ry="3" class="lake"/>
      <g class="road-minor" stroke-width="${1.2 * k}"><path d="M120 60 L300 250M90 200 L330 90M150 20 L260 260M60 120 L340 170"/></g>
      <g class="road" stroke-width="${2.6 * k}"><ellipse cx="204" cy="150" rx="86" ry="68"/>
        <path d="M178 -10C173 36 168 64 176 92S197 128 202 150"/><path d="M202 150C240 146 282 138 360 128"/>
        <path d="M202 150C196 182 212 222 250 270"/><path d="M196 214C232 222 272 230 360 240"/><path d="M202 150C170 150 130 154 60 160"/></g>
      ${B ? `<path d="${route}" class="rt" stroke-width="${3.6 * k}"/>${pin(A, 'a')}${pin(B, 'b')}` : ''}${pins}
    </svg>`;
  }

  /* ---------- pieces ---------- */
  const scr = (ctx, cls, inner) => `<div class="c-s ${cls}" style="--st:${ctx.safeTop}px;--sb:${ctx.safeBottom}px">${inner}</div>`;
  const nav = (o = {}) => `<header class="c-nav">
      ${o.back ? `<button class="c-navbtn c-back" data-back aria-label="Back to ${o.back}">${I.back}<span>${o.back}</span></button>` : (o.left || '<span class="c-navsp"></span>')}
      <div class="c-navt">${o.title || ''}</div>
      ${o.right || '<span class="c-navsp"></span>'}</header>`;
  const tabs = cur => `<div class="c-scrim" aria-hidden="true"></div><nav class="c-tabs" aria-label="Claimo">${[['home', 'October', I.month], ['rides', 'Rides', I.rides], ['report', 'Report', I.report], ['places', 'Places', I.places]].map(([id, n, ic]) =>
    `<button data-go="${id}" data-dir="fade" ${cur === id ? 'aria-current="page"' : ''}>${ic}<span>${n}</span></button>`).join('')}</nav>`;
  const stLabel = { work: 'Work', personal: 'Personal', new: 'To sort', error: 'Needs fare' };
  const rideRow = r => {
    const D = day(r.d);
    return `<button class="c-row c-ride" data-act="open" data-v="${r.id}">
      <span class="c-date"><b>${D.n}</b><span>${D.w}</span></span>
      <span class="c-mid"><span class="c-l1">${place(r.f)} → ${place(r.to)}</span><span class="c-l2">${badge(r.svc)}<span class="c-trunc c-sub">${r.t} · ${r.km} km</span></span></span>
      <span class="c-end"><b class="c-num">${r.fare ? rs(r.fare) : '—'}</b><span class="c-st c-st-${r.st}">${stLabel[r.st]}</span></span></button>`;
  };
  function breakdown(r) {
    const gst = Math.round(r.fare * 0.05 / 1.05);
    if (SVC[r.svc].b === 'uber') {
      const book = r.svc === 'up' ? 40 : 20, toll = (r.f === 'kia' || r.to === 'kia') ? 120 : 0;
      return [['Trip fare', r.fare - gst - book - toll], ['Booking fee', book], toll ? ['Airport toll, NH 44', toll] : null, ['GST 5%', gst]].filter(Boolean);
    }
    return [['Ride fare', r.fare - gst - 3], ['Platform fee', 3], ['GST 5%', gst]];
  }
  const work = s => by(s, 'work');
  const uberWork = s => sum(work(s).filter(r => SVC[r.svc].b === 'uber'));
  const rapWork = s => sum(work(s).filter(r => SVC[r.svc].b === 'rapido'));

  /* ---------- screens ---------- */
  const V = {};

  V.welcome = (s, ctx) => scr(ctx, 'c-welcome', `
    <div class="c-scroll">
      <div class="c-hero">${logo()}</div>
      <h2 class="c-lt">Your rides, already filed.</h2>
      <p class="c-lead">Claimo reads your Uber and Rapido receipts and turns a month of commuting into one PDF your finance team accepts.</p>
      <ul class="c-feats">
        <li><span class="c-fi">${I.receipt}</span><span class="c-mid"><b>Every receipt, found</b><span>Uber and Rapido mail in your inbox, read once.</span></span></li>
        <li><span class="c-fi">${I.rides}</span><span class="c-mid"><b>Sorted in a minute</b><span>Swipe each ride to work or personal.</span></span></li>
        <li><span class="c-fi">${I.report}</span><span class="c-mid"><b>A report finance accepts</b><span>Summary first, then every original receipt.</span></span></li>
      </ul>
    </div>
    <div class="c-foot">
      <button class="c-btn c-btn-g" data-go="connect">${I.g}<span>Continue with Google</span></button>
      <button class="c-btn c-btn-plain" data-go="connect">Sign in with an email link</button>
    </div>`);

  V.connect = (s, ctx) => scr(ctx, 'c-connect', `
    ${nav({ back: 'Welcome' })}
    <div class="c-scroll">
      <h2 class="c-t1">Claimo reads ride receipts. Nothing else.</h2>
      <p class="c-lead">Google asks for read-only Gmail access next. Here is exactly what that covers.</p>
      <p class="c-sh">Claimo reads</p>
      <div class="c-group">
        <div class="c-row"><span class="c-ic c-ic-ok">${I.check}</span><span class="c-mid"><span class="c-l1">Uber and Rapido receipts</span><span class="c-l2 c-sub">From uber.com and rapido.bike only</span></span></div>
        <div class="c-row"><span class="c-ic c-ic-ok">${I.check}</span><span class="c-mid"><span class="c-l1">Date, fare, pickup and drop</span><span class="c-l2 c-sub">And the receipt PDF, to attach</span></span></div>
      </div>
      <p class="c-sh">Claimo never</p>
      <div class="c-group">
        <div class="c-row"><span class="c-ic c-ic-no">${I.x}</span><span class="c-mid"><span class="c-l1">Opens any other email</span></span></div>
        <div class="c-row"><span class="c-ic c-ic-no">${I.x}</span><span class="c-mid"><span class="c-l1">Sends, deletes or labels mail</span></span></div>
      </div>
      <p class="c-note">${I.lock}<span>Receipts stay in your own private database. Disconnect Gmail in Settings and the access is gone at once.</span></p>
    </div>
    <div class="c-foot">
      <button class="c-btn c-btn-p" data-go="sync">Allow read-only access</button>
      <p class="c-fine">Scope requested: gmail.readonly</p>
    </div>`);

  V.sync = (s, ctx) => {
    const list = s.rides.slice(-5).reverse();
    return scr(ctx, 'c-sync', `
    <div class="c-scroll">
      <div class="c-ring" style="--pct:${s.syncPct}"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="tr"/><circle cx="60" cy="60" r="52" class="pr" pathLength="100"/></svg><span class="c-ring-t"><b class="c-num">${Math.round(15 * s.syncPct / 100)}</b><span>receipts</span></span></div>
      <h2 class="c-t2 c-center">Reading October</h2>
      <p class="c-sub c-center">Searched 214 emails since 1 October</p>
      <div class="c-stats">
        <div><b class="c-num">14</b><span>Read</span></div>
        <div><b class="c-num">2</b><span>Duplicates skipped</span></div>
        <div><b class="c-num c-red">1</b><span>Couldn't read</span></div>
      </div>
      <p class="c-sh">Just arrived</p>
      <div class="c-group">${list.map(r => `<div class="c-row c-arr">${badge(r.svc)}<span class="c-mid"><span class="c-l1">${place(r.f)} → ${place(r.to)}</span></span><span class="c-num c-amt">${r.fare ? rs(r.fare) : '—'}</span></div>`).join('')}</div>
    </div>
    <div class="c-foot"><button class="c-btn c-btn-p" data-go="home" data-dir="reset">See October</button></div>`);
  };

  V.home = (s, ctx) => {
    const w = work(s), n = by(s, 'new'), p = by(s, 'personal'), err = by(s, 'error');
    const recent = s.rides.filter(r => r.st !== 'error').slice(-5).reverse();
    return scr(ctx, 'c-home', `
    <div class="c-scroll c-tabbed" data-keep-scroll="home">
      <div class="c-lt-row"><h2 class="c-lt">October</h2><button class="c-avatar" data-go="pro" data-dir="up" aria-label="Account and Claimo Pro">GR</button></div>
      <div class="c-card c-claim">
        <span class="c-cap">Ready to claim</span>
        <b class="c-big c-num">${rs(sum(w))}</b>
        <span class="c-sub">${w.length} work rides · 1 to 21 Oct</span>
        <div class="c-split" role="img" aria-label="${w.length} work, ${n.length} to sort, ${p.length} personal"><i class="w" style="flex:${w.length}"></i><i class="n" style="flex:${n.length}"></i><i class="p" style="flex:${p.length}"></i></div>
        <div class="c-legend"><span><i class="w"></i>Work ${w.length}</span><span><i class="n"></i>To sort ${n.length}</span><span><i class="p"></i>Personal ${p.length}</span></div>
      </div>
      ${n.length ? `<button class="c-card c-cta" data-go="deck"><span class="c-cta-ic">${I.rides}</span><span class="c-mid"><span class="c-l1">${n.length} new ride${n.length > 1 ? 's' : ''} to sort</span><span class="c-l2 c-sub">Swipe right for work, left for personal</span></span><span class="c-chev">${I.chev}</span></button>` : ''}
      ${err.length ? `<button class="c-card c-alert" data-act="open" data-v="${err[0].id}"><span class="c-ic c-ic-warn">${I.warn}</span><span class="c-mid"><span class="c-l1">1 receipt needs you</span><span class="c-l2 c-sub">Uber, 21 Oct: the fare couldn't be read</span></span><span class="c-chev">${I.chev}</span></button>` : ''}
      <div class="c-sh-row"><p class="c-sh">Recent</p><button class="c-link" data-go="rides" data-dir="fade">All rides</button></div>
      <div class="c-group">${recent.map(rideRow).join('')}</div>
    </div>
    ${tabs('home')}`);
  };

  V.deck = (s, ctx) => {
    const n = by(s, 'new'), total = s.deckTotal;
    const done = total - n.length;
    const w = work(s);
    const top = n[0];
    const card = (r, i) => {
      if (i > 0) return `<div class="c-dk c-dk-${i}" aria-hidden="true"></div>`;
      const D = day(r.d);
      return `<article class="c-dk c-dk-0 top" data-id="${r.id}" aria-label="${SVC[r.svc].n} ride, ${D.n} October, ${rs(r.fare)}">
        <span class="c-stamp c-stamp-w" aria-hidden="true">Work</span><span class="c-stamp c-stamp-p" aria-hidden="true">Personal</span>
        <div class="c-dk-head">${badge(r.svc)}<span class="c-sub">${D.w} ${D.n} Oct · ${r.t}</span></div>
        <div class="c-dk-map">${map(r.f, r.to, { w: 318, h: 140 })}</div>
        <div class="c-dk-route">
          <div class="c-stop"><i class="a"></i><span class="c-mid"><span class="c-l1">${P[r.f].n}</span></span><span class="c-sub c-num">${r.t}</span></div>
          <div class="c-stop"><i class="b"></i><span class="c-mid"><span class="c-l1">${P[r.to].n}</span></span><span class="c-sub c-num">${r.e}</span></div>
        </div>
        <div class="c-dk-foot"><span class="c-sub">${r.km} km · ${SVC[r.svc].n}</span><b class="c-num">${rs(r.fare)}</b></div>
        <p class="c-guess c-guess-${r.guess}"><b>Looks like ${r.guess}</b><span>${r.why}</span></p>
      </article>`;
    };
    return scr(ctx, 'c-deck', `
      ${nav({ back: 'October', title: `<span class="c-navtt">Sort new rides</span><span class="c-navts">${n.length ? `${done + 1} of ${total}` : 'Done'}</span>`, right: `<button class="c-navbtn" data-act="undo" aria-label="Undo last swipe" ${s.hist.length ? '' : 'disabled'}>${I.undo}</button>` })}
      <div class="c-pile" aria-live="polite"><span class="c-pile-ic">${I.report}</span><span class="c-mid"><span class="c-l2 c-sub">In the October report</span><b class="c-num c-pile-t">${rs(sum(w))}</b></span><span class="c-pile-n">${w.length} rides</span></div>
      ${top ? `<div class="c-stack">${n.slice(0, 3).map(card).reverse().join('')}</div>
      <div class="c-dk-ctl">
        <button class="c-round c-round-p" data-act="sort" data-v="personal" aria-label="Personal">${I.x}</button>
        <span class="c-sub c-hint">Swipe or tap</span>
        <button class="c-round c-round-w" data-act="sort" data-v="work" aria-label="Work">${I.check}</button>
      </div>` : `<div class="c-done">
        <span class="c-done-ic">${I.check}</span>
        <h2 class="c-t2">Every ride sorted</h2>
        <p class="c-sub c-center">${w.length} work rides make ${rs(sum(w))} for October.</p>
        <button class="c-btn c-btn-p" data-go="report" data-dir="fade">Make the report</button>
      </div>`}`);
  };

  V.ride = (s, ctx) => {
    const r = get(s, s.ride) || get(s, 'r9');
    const D = day(r.d), lines = breakdown(r), seg = r.st === 'personal' ? 'personal' : 'work';
    return scr(ctx, 'c-ride-s', `
    <div class="c-scroll">
      <div class="c-ride-map">${map(r.f, r.to, { w: 390, h: 246, pad: 44 })}<button class="c-float" data-back aria-label="Back">${I.back}</button></div>
      <div class="c-ride-body">
        <div class="c-ride-h"><div class="c-mid"><span class="c-l2">${badge(r.svc)}<span class="c-sub c-trunc">${D.w} ${D.n} Oct 2026</span></span><h2 class="c-t2">${place(r.f)} to ${place(r.to)}</h2></div><b class="c-big2 c-num">${rs(r.fare)}</b></div>
        <div class="c-seg" role="group" aria-label="Claim as"><button data-act="mark" data-v="work" aria-pressed="${seg === 'work'}">Work</button><button data-act="mark" data-v="personal" aria-pressed="${seg === 'personal'}">Personal</button></div>
        <div class="c-group">
          <div class="c-row c-tl"><i class="a"></i><span class="c-mid"><span class="c-l1">${P[r.f].n}</span><span class="c-l2 c-sub">${P[r.f].a}</span></span><span class="c-num c-sub">${r.t}</span></div>
          <div class="c-row c-tl"><i class="b"></i><span class="c-mid"><span class="c-l1">${P[r.to].n}</span><span class="c-l2 c-sub">${P[r.to].a}</span></span><span class="c-num c-sub">${r.e}</span></div>
        </div>
        <p class="c-sh">Fare</p>
        <div class="c-group">${lines.map(([k, v]) => `<div class="c-row c-kv"><span class="c-mid"><span class="c-l1">${k}</span></span><span class="c-num">${rs(v)}</span></div>`).join('')}
          <div class="c-row c-kv c-kv-t"><span class="c-mid"><span class="c-l1">Paid by UPI</span></span><b class="c-num">${rs(r.fare)}</b></div></div>
        <p class="c-sh">Original receipt</p>
        <div class="c-invoice" aria-label="Tax invoice">
          <div class="c-inv-h"><span class="c-trunc">${SVC[r.svc].b === 'uber' ? 'Uber India Systems Pvt Ltd' : 'Roppen Transportation Services'}</span><span>Tax invoice</span></div>
          <div class="c-inv-r"><span>Driver</span><span>${r.who}</span></div>
          <div class="c-inv-r"><span>Vehicle</span><span>${r.veh}</span></div>
          <div class="c-inv-r"><span>Distance</span><span>${r.km} km</span></div>
          <div class="c-inv-r c-inv-t"><span>Total</span><span>${rs(r.fare)}</span></div>
        </div>
      </div>
    </div>`);
  };

  V.fix = (s, ctx) => {
    const val = s.fixFare;
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];
    return scr(ctx, 'c-fix', `
    ${nav({ back: 'October', title: 'Uber, 21 Oct' })}
    <div class="c-scroll">
      <div class="c-fix-h"><span class="c-ic c-ic-warn big">${I.warn}</span><div class="c-mid"><h2 class="c-t3">We couldn't read the fare</h2><p class="c-sub">Uber changed its receipt layout. Everything else came through.</p></div></div>
      <div class="c-group">
        <div class="c-row c-kv"><span class="c-mid"><span class="c-l1">Date</span></span><span class="c-sub">Wed 21 Oct, 19:30</span><span class="c-okc">${I.check}</span></div>
        <div class="c-row c-kv"><span class="c-mid"><span class="c-l1">Pickup</span></span><span class="c-sub c-trunc">Embassy TechVillage</span><span class="c-okc">${I.check}</span></div>
        <div class="c-row c-kv"><span class="c-mid"><span class="c-l1">Drop</span></span><span class="c-sub c-trunc">HSR Layout</span><span class="c-okc">${I.check}</span></div>
        <div class="c-row c-kv c-field"><span class="c-mid"><span class="c-l1">Fare</span></span><b class="c-num c-fare-in">₹ ${val || '0'}</b><i class="c-caret" aria-hidden="true"></i></div>
      </div>
      <p class="c-fine c-left">Type the total from the email, the line that says Total.</p>
    </div>
    <div class="c-keys" role="group" aria-label="Number keypad">${keys.map(k => k === '' ? '<span></span>' : `<button data-act="key" data-v="${k}" ${k === 'del' ? 'aria-label="Delete"' : ''}>${k === 'del' ? I.del : k}</button>`).join('')}</div>
    <div class="c-foot c-foot-row">
      <button class="c-btn c-btn-s" data-act="notride">Not a ride</button>
      <button class="c-btn c-btn-p" data-act="addfare" ${val ? '' : 'disabled'}>Add to rides</button>
    </div>`);
  };

  const WEEKS = [['This week', '19', '31'], ['12 to 18 Oct', '12', '18'], ['5 to 11 Oct', '05', '11'], ['1 to 4 Oct', '01', '04']];
  V.rides = (s, ctx) => {
    const f = s.filter;
    const pass = r => (f === 'all' || r.st === f || (f === 'new' && r.st === 'error')) && s.svcOn[SVC[r.svc].b] && (r.fare == null || r.fare >= s.fareMin);
    const groups = WEEKS.map(([lab, a, b]) => ({ lab, rr: s.rides.filter(r => pass(r) && r.d.slice(8) >= a && r.d.slice(8) <= b).reverse() })).filter(g => g.rr.length);
    return scr(ctx, 'c-rides', `
    <div class="c-scroll c-tabbed" data-keep-scroll="rides">
      <div class="c-lt-row"><h2 class="c-lt">Rides</h2><button class="c-navbtn c-tint" data-go="filters" data-dir="up" aria-label="Filters">${I.filter}</button></div>
      <div class="c-searchf">${I.search}<span>Search places, dates, amounts</span></div>
      <div class="c-chips" role="group" aria-label="Show">${[['all', 'All'], ['work', 'Work'], ['personal', 'Personal'], ['new', 'To sort']].map(([k, n]) => `<button data-act="filter" data-v="${k}" aria-pressed="${f === k}">${n}</button>`).join('')}</div>
      ${groups.map(g => `<div class="c-sh-row"><p class="c-sh">${g.lab}</p><span class="c-sh c-num">${rs(sum(g.rr))}</span></div><div class="c-group">${g.rr.map(rideRow).join('')}</div>`).join('') || '<p class="c-empty">No rides match these filters.</p>'}
    </div>
    ${tabs('rides')}`);
  };

  V.filters = (s, ctx) => {
    const n = s.rides.filter(r => s.svcOn[SVC[r.svc].b] && (r.fare == null || r.fare >= s.fareMin)).length;
    const steps = [0, 100, 300, 500];
    const hist = [3, 4, 2, 1, 1, 2, 0, 0, 0, 0, 2, 0];
    return scr(ctx, 'c-filt', `
    <div class="c-dim" aria-hidden="true"></div>
    <div class="c-sheet">
      <span class="c-grab" aria-hidden="true"></span>
      <header class="c-sheet-h"><button class="c-link" data-act="resetf">Reset</button><b>Filters</b><button class="c-link c-strong" data-back>Done</button></header>
      <div class="c-sheet-b">
        <p class="c-sh">Service</p>
        <div class="c-group">${[['uber', 'Uber', 'Go and Premier'], ['rapido', 'Rapido', 'Bike and Auto']].map(([k, nme, sub]) => `<div class="c-row"><span class="c-bd ${k === 'uber' ? 'c-bd-uber' : 'c-bd-rap'}">${nme}</span><span class="c-mid"><span class="c-l1">${sub}</span></span><button class="c-tog" role="switch" aria-checked="${s.svcOn[k]}" aria-label="${nme}" data-act="svc" data-v="${k}"></button></div>`).join('')}</div>
        <p class="c-sh">Dates</p>
        <div class="c-group c-two"><div class="c-row"><span class="c-mid"><span class="c-l2 c-sub">From</span><span class="c-l1">Thu 1 Oct</span></span></div><div class="c-row"><span class="c-mid"><span class="c-l2 c-sub">To</span><span class="c-l1">Wed 21 Oct</span></span></div></div>
        <p class="c-sh">Fare at least</p>
        <div class="c-card c-fare">
          <div class="c-hist" aria-hidden="true">${hist.map((h, i) => `<i style="height:${8 + h * 10}px" class="${i * 100 >= s.fareMin ? 'on' : ''}"></i>`).join('')}</div>
          <div class="c-seg c-seg-4" role="group" aria-label="Minimum fare">${steps.map(v => `<button data-act="faremin" data-v="${v}" aria-pressed="${s.fareMin === v}">${v ? rs(v) : 'Any'}</button>`).join('')}</div>
        </div>
      </div>
      <div class="c-foot"><button class="c-btn c-btn-p" data-back>Show ${n} rides</button></div>
    </div>`);
  };

  V.places = (s, ctx) => scr(ctx, 'c-places', `
    <div class="c-scroll c-tabbed" data-keep-scroll="places">
      <h2 class="c-lt">Places</h2>
      <div class="c-card c-pmap">${map('hsr', null, { w: 350, h: 200, pins: ['hsr', 'etv', 'man', 'kia'] })}</div>
      <div class="c-group">${[['hsr', 'H', 12], ['etv', 'O', 13], ['man', 'C', 2], ['kia', 'A', 2]].map(([k, l, c]) => `<div class="c-row"><span class="c-pl">${l}</span><span class="c-mid"><span class="c-l1">${P[k].tag}</span><span class="c-l2 c-sub">${P[k].n}</span></span><span class="c-sub c-num">${c} rides</span></div>`).join('')}
        <button class="c-row c-add" data-act="toast" data-v="Search opens here">${I.plus}<span class="c-l1">Add a place</span></button></div>
      <p class="c-sh">Sort automatically</p>
      <div class="c-group">${[['r1', 'Home and Office, weekdays', 'Mark as Work'], ['r2', 'To or from a client', 'Mark as Work'], ['r3', 'Weekends, not from Office', 'Mark as Personal']].map(([k, a, b]) => `<div class="c-row"><span class="c-mid"><span class="c-l1">${a}</span><span class="c-l2 c-sub">${b}</span></span><button class="c-tog" role="switch" aria-checked="${s.rules[k]}" aria-label="${a}" data-act="rule" data-v="${k}"></button></div>`).join('')}</div>
      <p class="c-fine c-left">Rules sorted 9 of 15 October rides before you saw them.</p>
    </div>
    ${tabs('places')}`);

  V.report = (s, ctx) => {
    const w = work(s), n = by(s, 'new');
    return scr(ctx, 'c-report', `
    <div class="c-scroll c-tabbed" data-keep-scroll="report">
      <h2 class="c-lt">New report</h2>
      <div class="c-seg" role="group" aria-label="Period"><button aria-pressed="true">October 2026</button><button data-go="pro" data-dir="up">Custom range <span class="c-probd">Pro</span></button></div>
      <p class="c-sh">What goes in the PDF</p>
      <div class="c-group">${[['full', 'Full report', `Summary page, then every receipt · ${w.length + 1} pages`], ['receipts', 'Receipts only', `The original receipts, merged · ${w.length} pages`]].map(([k, a, b]) => `<button class="c-row c-radio" data-act="contents" data-v="${k}" aria-pressed="${s.contents === k}"><span class="c-rd" aria-hidden="true"></span><span class="c-mid"><span class="c-l1">${a}</span><span class="c-l2 c-sub">${b}</span></span></button>`).join('')}</div>
      <p class="c-sh">Work rides</p>
      <div class="c-group">
        <div class="c-row c-kv">${badge('ug')}<span class="c-mid"><span class="c-l1">Uber</span></span><span class="c-num">${rs(uberWork(s))}</span></div>
        <div class="c-row c-kv">${badge('rb')}<span class="c-mid"><span class="c-l1">Rapido</span></span><span class="c-num">${rs(rapWork(s))}</span></div>
        <div class="c-row c-kv c-kv-t"><span class="c-mid"><span class="c-l1">To claim · ${w.length} rides</span></span><b class="c-num">${rs(sum(w))}</b></div>
      </div>
      ${n.length ? `<button class="c-card c-alert" data-go="deck"><span class="c-ic c-ic-warn">${I.warn}</span><span class="c-mid"><span class="c-l1">${n.length} rides aren't sorted</span><span class="c-l2 c-sub">They stay out until you sort them</span></span><span class="c-chev">${I.chev}</span></button>` : ''}
      <p class="c-sh">Send to</p>
      <div class="c-group"><div class="c-row"><span class="c-ic">${I.person}</span><span class="c-mid"><span class="c-l1">finance@yourcompany.in</span><span class="c-l2 c-sub">Your approver</span></span></div></div>
      <div class="c-inline-cta"><button class="c-btn c-btn-p" data-go="printing" data-dir="fade">Create PDF · ${rs(sum(w))}</button></div>
    </div>
    ${tabs('report')}`);
  };

  const STEPS = ['Summary page', 'Attaching 6 receipts', 'Merging into one PDF', 'Saving to your storage'];
  const stepRow = (t, i, k) => `<div class="c-row"><span class="c-step ${i < k ? 'done' : i === k ? 'now' : ''}">${i < k ? I.check : ''}</span><span class="c-mid"><span class="c-l1">${t}</span></span></div>`;
  V.printing = (s, ctx) => {
    const k = ctx.static ? 2 : 0;
    return scr(ctx, 'c-print', `
    <div class="c-scroll c-center-col">
      <div class="c-docs" aria-hidden="true">
        <div class="c-doc d3"></div><div class="c-doc d2"></div>
        <div class="c-doc d1"><b>October 2026</b><span>Travel reimbursement</span>${[1, 2, 3, 4, 5].map(i => `<i style="width:${60 + (i * 13) % 30}%"></i>`).join('')}<em></em></div>
      </div>
      <h2 class="c-t2 c-center">Making your October report</h2>
      <p class="c-sub c-center">${rs(sum(work(s)))} across ${work(s).length} rides</p>
      <div class="c-group c-steps">${STEPS.map((t, i) => stepRow(t, i, k)).join('')}</div>
    </div>`);
  };

  V.ready = (s, ctx) => {
    const w = work(s);
    return scr(ctx, 'c-ready', `
    ${nav({ right: `<button class="c-navbtn" data-go="home" data-dir="reset" aria-label="Close">${I.close}</button>` })}
    <div class="c-scroll">
      <span class="c-done-ic">${I.check}</span>
      <h2 class="c-lt">October is filed.</h2>
      <p class="c-lead">${w.length} rides, ${rs(sum(w))}. Saved in Reports and ready to send.</p>
      <div class="c-pages" aria-label="Report pages">
        <div class="c-page"><b>Gajanan Rathod</b><span class="c-pg-s">Travel reimbursement, Oct 2026</span>${w.slice(0, 6).map(r => `<span class="c-pl-r"><span>${day(r.d).n} Oct</span><span>${rs(r.fare)}</span></span>`).join('')}<span class="c-pl-r c-pl-t"><span>Total</span><span>${rs(sum(w))}</span></span></div>
        <div class="c-page c-page-r"><span class="c-pg-head">${badge(w[0] ? w[0].svc : 'rb')}<span class="c-pg-s">Receipt 1 of ${w.length}</span></span><div class="c-mini-map">${w[0] ? map(w[0].f, w[0].to, { w: 128, h: 84 }) : ''}</div><span class="c-pl-r c-pl-t"><span>Total</span><span>${w[0] ? rs(w[0].fare) : ''}</span></span></div>
      </div>
      <div class="c-group"><div class="c-row"><span class="c-ic c-ic-acc">${I.doc}</span><span class="c-mid"><span class="c-l1 c-trunc">Claimo-October-2026.pdf</span><span class="c-l2 c-sub">${w.length + 1} pages · 1.4 MB</span></span></div></div>
    </div>
    <div class="c-foot">
      <button class="c-btn c-btn-p" data-act="toast" data-v="Sent to finance@yourcompany.in">${I.mail}<span>Email to approver</span></button>
      <div class="c-foot-row"><button class="c-btn c-btn-s" data-act="toast" data-v="Saved to Files">${I.folder}<span>Save to Files</span></button><button class="c-btn c-btn-s" data-act="toast" data-v="Share sheet opens here">${I.share}<span>Share</span></button></div>
    </div>`);
  };

  V.pro = (s, ctx) => scr(ctx, 'c-pro', `
    ${nav({ right: `<button class="c-navbtn" data-back aria-label="Close">${I.close}</button>` })}
    <div class="c-scroll">
      <div class="c-hero sm">${logo()}</div>
      <h2 class="c-lt c-center">Claimo Pro</h2>
      <p class="c-lead c-center">For people who file every month, and for months that don't match the calendar.</p>
      <div class="c-group">${[[I.calendar, 'Any date range', 'File a client trip from 14 to 19 Oct'], [I.bolt, 'A report on the 1st, by itself', 'Emailed to your approver'], [I.receipt, 'Every month you have ridden', 'Free keeps the last three months']].map(([ic, a, b]) => `<div class="c-row"><span class="c-ic c-ic-acc">${ic}</span><span class="c-mid"><span class="c-l1">${a}</span><span class="c-l2 c-sub">${b}</span></span></div>`).join('')}</div>
      <div class="c-plans" role="radiogroup" aria-label="Plan">
        <button class="c-plan" role="radio" aria-checked="${s.plan === 'm'}" data-act="plan" data-v="m"><span class="c-rd" aria-hidden="true"></span><span class="c-mid"><span class="c-l1">Monthly</span><span class="c-l2 c-sub">First month ₹49</span></span><b class="c-num">₹99<span class="c-per">/mo</span></b></button>
        <button class="c-plan" role="radio" aria-checked="${s.plan === 'q'}" data-act="plan" data-v="q"><span class="c-rd" aria-hidden="true"></span><span class="c-mid"><span class="c-l1">Every 3 months</span><span class="c-l2 c-sub">₹83 a month · save ₹48</span></span><b class="c-num">₹249</b></button>
      </div>
    </div>
    <div class="c-foot">
      <button class="c-btn c-btn-p" data-act="toast" data-v="Razorpay checkout opens here">Continue with Razorpay</button>
      <p class="c-fine">UPI, cards and netbanking. Cancel any time in Settings.</p>
    </div>`);

  /* ---------- the claim deck ---------- */
  function animateTotal(root, from, to) {
    const el = root.querySelector('.c-pile-t'); if (!el || from === to) return;
    const t0 = performance.now(), dur = 520;
    const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = rs(Math.round(from + (to - from) * e)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
    setTimeout(() => { el.textContent = rs(to); }, dur + 60);
    const pile = root.querySelector('.c-pile'); if (pile) { pile.classList.remove('bump'); void pile.offsetWidth; pile.classList.add('bump'); }
  }
  function commit(ctx, s, id, dir) {
    s._from = sum(work(s));
    get(s, id).st = dir; s.hist.push(id);
    ctx.rerender();
  }
  function fly(card, dir, done) {
    if (card._flying) return; card._flying = true;
    const x = dir === 'work' ? 460 : -460;
    card.style.transition = 'transform .3s cubic-bezier(.3,.6,.4,1), opacity .3s';
    card.style.transform = `translate(${x}px, ${dir === 'work' ? -120 : 30}px) rotate(${dir === 'work' ? 16 : -16}deg)`;
    card.style.opacity = '0';
    setTimeout(done, 290);
  }
  function sortTop(ctx, s, dir) {
    const layer = ctx.phone && ctx.phone.layer;
    const card = layer && layer.querySelector('.c-dk.top');
    if (!card) return;
    card.style.setProperty(dir === 'work' ? '--sw' : '--sp', 1);
    fly(card, dir, () => commit(ctx, s, card.dataset.id, dir));
  }
  function mountDeck(root, s, ctx) {
    if (s._from != null) { animateTotal(root, s._from, sum(work(s))); s._from = null; }
    const card = root.querySelector('.c-dk.top');
    if (!card) return;
    let x0 = 0, y0 = 0, dx = 0, dy = 0, t0 = 0, drag = false;
    const bw = root.querySelector('.c-round-w'), bp = root.querySelector('.c-round-p');
    const down = e => { drag = true; x0 = e.clientX; y0 = e.clientY; dx = dy = 0; t0 = performance.now(); card.style.transition = 'none'; try { card.setPointerCapture(e.pointerId); } catch (_) {} };
    const move = e => {
      if (!drag) return;
      const sc = (ctx.phone && ctx.phone.scale) || 1;
      dx = (e.clientX - x0) / sc; dy = (e.clientY - y0) / sc;
      card.style.transform = `translate(${dx}px, ${dy * .3}px) rotate(${dx / 20}deg)`;
      const k = Math.min(1, Math.abs(dx) / 110);
      card.style.setProperty('--sw', dx > 0 ? k : 0); card.style.setProperty('--sp', dx < 0 ? k : 0);
      if (bw) bw.style.transform = `scale(${1 + (dx > 0 ? k * .12 : 0)})`;
      if (bp) bp.style.transform = `scale(${1 + (dx < 0 ? k * .12 : 0)})`;
    };
    const up = () => {
      if (!drag) return; drag = false;
      const v = Math.abs(dx) / Math.max(1, performance.now() - t0);
      if (bw) bw.style.transform = ''; if (bp) bp.style.transform = '';
      if (Math.abs(dx) > 110 || (v > .6 && Math.abs(dx) > 40)) {
        const dir = dx > 0 ? 'work' : 'personal';
        fly(card, dir, () => commit(ctx, s, card.dataset.id, dir));
      } else {
        card.style.transition = 'transform .5s cubic-bezier(.3,1.5,.5,1)';
        card.style.transform = ''; card.style.setProperty('--sw', 0); card.style.setProperty('--sp', 0);
      }
    };
    card.addEventListener('pointerdown', down);
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
    return () => { card.removeEventListener('pointerdown', down); card.removeEventListener('pointermove', move); card.removeEventListener('pointerup', up); card.removeEventListener('pointercancel', up); };
  }

  /* ---------- app ---------- */
  const app = {
    id: 'claimo', name: 'Claimo', platform: 'ios', tone: 'dark',
    fonts: ['Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700'],
    signature: 'deck',
    screens: [
      { id: 'welcome', title: 'Welcome', caption: 'The promise in one line, three features and one way in.' },
      { id: 'connect', title: 'Connect Gmail', caption: 'What Claimo reads and what it never touches, before Google asks.' },
      { id: 'sync', title: 'Reading October', caption: 'Receipts arrive, with duplicates and unreadable mail counted openly.' },
      { id: 'home', title: 'October', caption: 'One number up top: what you can claim. Everything else leads to it.' },
      { id: 'deck', title: 'Claim deck', caption: 'The signature. Swipe right and the ride joins the report; left keeps it personal.' },
      { id: 'ride', title: 'Ride detail', caption: 'Route, fare breakdown and the original invoice, as finance will see it.' },
      { id: 'fix', title: 'Unreadable receipt', caption: 'The error state keeps what was read and asks only for the fare.' },
      { id: 'rides', title: 'All rides', caption: 'Grouped by week with a total, so a missing Monday is easy to spot.' },
      { id: 'filters', title: 'Filters', caption: 'Service, dates and a minimum fare, in one sheet.', sheet: true },
      { id: 'places', title: 'Saved places', caption: 'Home, Office and a client: the rules that sort most rides for you.' },
      { id: 'report', title: 'Report builder', caption: 'The month, what goes in the PDF, and who it goes to.' },
      { id: 'printing', title: 'Making the PDF', caption: 'Each step shown while the report renders.' },
      { id: 'ready', title: 'Report ready', caption: 'Every page previewed, then one tap to the approver.' },
      { id: 'pro', title: 'Claimo Pro', caption: 'The paywall names what you get, priced in rupees.', sheet: true }
    ],
    system: {
      summary: 'Clean iOS: white grouped lists on a system grey, Inter on the iOS type scale, and one ballpoint blue for the single action on each screen. Uber and Rapido appear only as small service badges.',
      palette: [
        { token: '--color-bg', name: 'Grouped grey', value: '#f2f2f7', role: 'Screen background' },
        { token: '--color-surface', name: 'White', value: '#ffffff', role: 'Cards and lists' },
        { token: '--color-text', name: 'Label', value: '#0f1012', role: 'Primary text' },
        { token: '--color-text-secondary', name: 'Secondary label', value: '#55565f', role: 'Supporting text' },
        { token: '--color-accent', name: 'Ballpoint blue', value: '#1d5bd6', role: 'The one action, links' },
        { token: '--color-accent-subtle', name: 'Blue tint', value: '#e7eefc', role: 'Selected rows, icon wells' },
        { token: '--color-success', name: 'Filed green', value: '#16753a', role: 'Work, done' },
        { token: '--color-danger', name: 'Correction red', value: '#c22a1e', role: 'Errors only' }
      ],
      type: [
        { role: 'Large title', family: 'Inter', sample: 'October', spec: '34/41 · 700 · −2%' },
        { role: 'Amount', family: 'Inter', sample: '₹2,767', spec: '40/44 · 700 · tabular' },
        { role: 'Body', family: 'Inter', sample: 'HSR → Office', spec: '17/22 · 500' },
        { role: 'Footnote', family: 'Inter', sample: '6 work rides', spec: '13/18 · 400' }
      ],
      radius: '16 / 12 / 999',
      contrast: [
        { pair: 'Label on white', ratio: '19.0:1' }, { pair: 'Secondary on grouped grey', ratio: '6.5:1' },
        { pair: 'White on blue', ratio: '6.0:1' }, { pair: 'Blue text on white', ratio: '6.9:1' },
        { pair: 'Green on white', ratio: '5.8:1' }, { pair: 'Red on its tint', ratio: '5.0:1' }
      ]
    },
    init() {
      return { rides: RIDES.map(r => ({ ...r })), hist: [], deckTotal: RIDES.filter(r => r.st === 'new').length, ride: 'r9', filter: 'all', svcOn: { uber: true, rapido: true }, fareMin: 0, rules: { r1: true, r2: true, r3: false }, contents: 'full', plan: 'q', fixFare: '298', syncPct: 100 };
    },
    render(id, s, ctx) { return (V[id] || V.home)(s, ctx); },
    action(a, v, s, ctx) {
      if (a === 'open') {
        const r = get(s, v);
        if (r && r.st === 'error') { ctx.go('fix'); return false; }
        s.ride = v; ctx.go('ride'); return false;
      }
      if (a === 'sort') { sortTop(ctx, s, v); return false; }
      if (a === 'undo') { const id = s.hist.pop(); if (id) { s._from = sum(work(s)); get(s, id).st = 'new'; } return; }
      if (a === 'mark') { const r = get(s, s.ride); if (r) r.st = v; return; }
      if (a === 'filter') { s.filter = v; return; }
      if (a === 'svc') { s.svcOn[v] = !s.svcOn[v]; return; }
      if (a === 'faremin') { s.fareMin = +v; return; }
      if (a === 'resetf') { s.svcOn = { uber: true, rapido: true }; s.fareMin = 0; return; }
      if (a === 'rule') { s.rules[v] = !s.rules[v]; return; }
      if (a === 'contents') { s.contents = v; return; }
      if (a === 'plan') { s.plan = v; return; }
      if (a === 'key') { if (v === 'del') s.fixFare = s.fixFare.slice(0, -1); else if (s.fixFare.length < 5) s.fixFare = (s.fixFare + v).replace(/^0+/, ''); return; }
      if (a === 'addfare') { const r = get(s, 'r15'); r.fare = +s.fixFare; r.st = 'new'; s.deckTotal = by(s, 'new').length; s.hist = []; ctx.toast(`Added the ${rs(r.fare)} Uber ride`); ctx.go('home', 'pop'); return false; }
      if (a === 'notride') { const r = get(s, 'r15'); r.st = 'personal'; r.fare = 0; ctx.toast('Marked as not a ride'); ctx.go('home', 'pop'); return false; }
      if (a === 'toast') { ctx.toast(v); return false; }
    },
    mount(root, s, ctx, id) {
      if (id === 'deck') return mountDeck(root, s, ctx);
      if (id === 'printing') {
        const t = [];
        for (let i = 1; i <= 4; i++) t.push(setTimeout(() => {
          root.querySelectorAll('.c-step').forEach((e, j) => { e.className = 'c-step ' + (j < i ? 'done' : j === i ? 'now' : ''); e.innerHTML = j < i ? I.check : ''; });
        }, i * 650));
        t.push(setTimeout(() => ctx.go('ready', 'fade'), 3100));
        return () => t.forEach(clearTimeout);
      }
      if (id === 'sync' && !s.synced) {
        const ring = root.querySelector('.c-ring'), num = ring && ring.querySelector('b');
        if (!ring) return;
        s.synced = true; let p = 0;
        const iv = setInterval(() => { p = Math.min(100, p + 4); ring.style.setProperty('--pct', p); num.textContent = Math.round(15 * p / 100); if (p >= 100) clearInterval(iv); }, 40);
        return () => clearInterval(iv);
      }
    }
  };
  (window.APPS = window.APPS || {})[app.id] = app;
})();
