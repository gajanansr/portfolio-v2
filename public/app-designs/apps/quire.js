(() => {
  /* ---------- data ---------- */
  const THEMES = [
    { id: 'paper', name: 'Paper' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'eink', name: 'E-ink' },
    { id: 'night', name: 'Night' },
    { id: 'black', name: 'Black' }
  ];
  const darkTheme = t => t === 'night' || t === 'black';

  // Covers are typographic: flat bookcloth, the title in Literata. Colours are content, not chrome.
  const BOOKS = {
    pp: { t: 'Pride and Prejudice', a: 'Jane Austen', y: '1813', f: 'EPUB', size: '2.1 MB', p: 52, cloth: '#7a2c24', ink: '#f3e6cf', file: 'pride-and-prejudice.epub', ch: 61 },
    hw: { t: 'The Home and the World', a: 'Rabindranath Tagore', y: '1916', f: 'EPUB', size: '612 KB', p: 18, cloth: '#2c4a3e', ink: '#e4efe6', file: 'home-and-the-world.epub', ch: 12 },
    ge: { t: 'Great Expectations', a: 'Charles Dickens', y: '1861', f: 'PDF', size: '4.8 MB', p: 0, cloth: '#283a56', ink: '#e8e3d4', file: 'Great_Expectations.pdf', ch: 59 },
    gi: { t: 'Gitanjali', a: 'Rabindranath Tagore', y: '1912', f: 'EPUB', size: '188 KB', p: 100, cloth: '#9a6230', ink: '#fff4e2', file: 'gitanjali.epub', ch: 103 },
    me: { t: 'Meditations', a: 'Marcus Aurelius', y: '180', f: 'TXT', size: '402 KB', p: 7, cloth: '#3a3633', ink: '#ece6dc', file: 'meditations-long.txt', ch: 12 },
    sc: { t: 'Pride and Prejudice', a: '1813 first edition, scan', y: '1813', f: 'PDF', size: '38 MB', p: 1, cloth: '#e3d8c2', ink: '#3a2e1e', file: 'pp-1813-vol1-scan.pdf', ch: 0, scan: true }
  };
  const SHELF = ['pp', 'hw', 'ge', 'gi', 'me', 'sc'];

  // Pride and Prejudice, Chapter 34. Real text, set by hand into pages.
  const PAGES = [
    { n: 187, html: `<h2 class="q-chap"><span>Chapter</span>34</h2>
      <p class="q-first">When they were gone, Elizabeth, as if intending to exasperate herself as much as possible against Mr. Darcy, chose for her employment the examination of all the letters which Jane had written to her since her being in Kent.</p>
      <p>They contained no actual complaint, nor was there any revival of past occurrences, or any communication of present suffering. But in all, and in almost every line of each, there was a want of that cheerfulness which had been used to characterise her style.</p>` },
    { n: 188, html: `<p class="q-first">While settling this point, she was suddenly roused by the sound of the door-bell, and her spirits were a little fluttered by the idea of its being Colonel Fitzwilliam himself, who had once before called late in the evening, and might now come to inquire particularly after her.</p>
      <p>But this idea was soon banished, and her spirits were very differently affected, when, to her utter amazement, she saw Mr. Darcy walk into the room. In an hurried manner he immediately began an inquiry after her health, imputing his visit to a wish of hearing that she were better. She answered him with cold civility.</p>
      <p>He sat down for a few moments, and then getting up, walked about the room. Elizabeth was surprised, but said not a word.</p>` },
    { n: 189, html: `<p class="q-first">After a silence of several minutes, he came towards her in an agitated manner, and thus began:</p>
      <p>“In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.”</p>
      <p>Elizabeth’s astonishment was beyond expression. She stared, coloured, doubted, and was silent. This he considered sufficient encouragement; and the avowal of all that he felt, and had long felt for her, immediately followed.</p>` }
  ];
  const QUOTE = 'In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.';

  const HL_COLORS = [{ id: 'sun', name: 'Yellow' }, { id: 'rose', name: 'Rose' }, { id: 'sage', name: 'Sage' }];

  const FILES = [
    { id: 'pp', name: 'pride-and-prejudice.epub', kind: 'EPUB', size: '2.1 MB', date: '18 Oct' },
    { id: 'ge', name: 'Great_Expectations.pdf', kind: 'PDF', size: '4.8 MB', date: '18 Oct' },
    { id: 'sc', name: 'pp-1813-vol1-scan.pdf', kind: 'PDF', size: '38 MB', date: '12 Oct' },
    { id: 'me', name: 'meditations-long.txt', kind: 'TXT', size: '402 KB', date: '9 Oct' },
    { id: 'x1', name: 'Boarding pass BLR-DEL.pdf', kind: 'PDF', size: '96 KB', date: '2 Oct', other: true },
    { id: 'x2', name: 'IMG_2041.jpg', kind: 'JPG', size: '3.2 MB', date: '30 Sep', other: true, dim: true }
  ];

  /* ---------- small pieces ---------- */
  // The mark: a gathering of folded sheets, stitched at the fold.
  const mark = (c = 'currentColor') => `<svg class="q-mark" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${c}" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
    <path d="M6 12 24 40 42 12"/><path d="M13 12 24 31 35 12"/><path d="M20 12 24 21 28 12"/></svg>`;

  const I = {
    back: '<svg viewBox="0 0 24 24"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 9.5 16a6.5 6.5 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
    add: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
    lib: '<svg viewBox="0 0 24 24"><path d="M4 3h3v18H4zm5 0h3v18H9zm5.2.8 2.9-.8 4.7 17.4-2.9.8z"/></svg>',
    hl: '<svg viewBox="0 0 24 24"><path d="m15.3 3.3 5.4 5.4-9.6 9.6H5.7v-5.4zM4 20h16v2H4z"/></svg>',
    habit: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8z"/><path d="M12 6a6 6 0 1 0 6 6h-6z"/></svg>',
    aa: '<svg viewBox="0 0 24 24"><path d="M9.6 4h2.1l5.3 14h-2.2l-1.3-3.6H7.8L6.5 18H4.3zm-1.1 8.6h4.4L10.7 6.4zM19 9.2c1.7 0 2.8 1 2.8 2.7V18h-1.8v-1a2.6 2.6 0 0 1-2.3 1.2c-1.5 0-2.6-.9-2.6-2.3 0-1.5 1.2-2.4 3-2.4h1.9v-.5c0-.9-.6-1.4-1.5-1.4-.8 0-1.4.4-1.6 1l-1.6-.5c.4-1.3 1.8-2.2 3.7-2.2zm-1 7.4c1.1 0 2-.7 2-1.7v-.6h-1.8c-.9 0-1.4.4-1.4 1.1 0 .7.5 1.2 1.2 1.2z"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24"><path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2zm0 15-5-2.2L7 18V5h10z"/></svg>',
    toc: '<svg viewBox="0 0 24 24"><path d="M3 9h14V7H3zm0 4h14v-2H3zm0 4h14v-2H3zm16 0h2v-2h-2zm0-10v2h2V7zm0 6h2v-2h-2z"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M18 16a3 3 0 0 0-2.1.8L8.9 12.7a3 3 0 0 0 0-1.4l7-4A3 3 0 1 0 15 5a3 3 0 0 0 .1.7l-7 4.1a3 3 0 1 0 0 4.4l7.1 4.1a3 3 0 1 0 2.8-2.3z"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11z"/></svg>',
    note: '<svg viewBox="0 0 24 24"><path d="M3 17.2V21h3.8L17.8 9.9l-3.7-3.7zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>',
    flame: '<svg viewBox="0 0 24 24"><path d="M13.5.7s.7 2.6.7 4.7c0 2-1.3 3.6-3.3 3.6s-3.5-1.6-3.5-3.6l.1-.4A13.4 13.4 0 0 0 4 14a8 8 0 0 0 16 0C20 8.6 17.4 3.8 13.5.7zM11.7 19c-1.8 0-3.2-1.4-3.2-3.1 0-1.6 1-2.8 2.8-3.1 1.8-.4 3.6-1.2 4.6-2.6.4 1.3.6 2.7.6 4.1 0 2.6-2.1 4.7-4.8 4.7z"/></svg>',
    zoom: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 9.5 16a6.5 6.5 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM12 10h-2v2H9v-2H7V9h2V7h1v2h2z"/></svg>',
    info: '<svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9zm3 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>',
    wifioff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 8.8a15 15 0 0 1 20 0M5.5 12.3a10 10 0 0 1 13 0M9 15.8a5 5 0 0 1 6 0"/><circle cx="12" cy="19.4" r="1.2" fill="currentColor" stroke="none"/><path d="M3.5 3.5l17 17"/></svg>',
    expand: '<svg viewBox="0 0 24 24"><path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5z"/></svg>',
    image: '<svg viewBox="0 0 24 24"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5z"/></svg>'
  };
  const ico = (n, cls = '') => `<span class="q-i ${cls}" aria-hidden="true">${I[n]}</span>`;

  // size: s (shelf, with title), m (continue card, title only), l (book page, title + author), xs / w (no text)
  function cover(id, size = 's') {
    const b = BOOKS[id];
    const style = `style="--cl:${b.cloth};--ci:${b.ink}"`;
    if (size === 'xs' || size === 'w') return `<div class="q-cover q-cover-${size}" ${style}><span class="q-cv-mk">${mark(b.ink)}</span></div>`;
    if (b.scan) return `<div class="q-cover q-cover-${size} scan" ${style}><span class="q-cv-t">1813 edition</span><span class="q-cv-mk">${mark(b.ink)}</span></div>`;
    return `<div class="q-cover q-cover-${size}" ${style}><span class="q-cv-t">${b.t}</span>${size === 'l' ? `<span class="q-cv-a">${b.a}</span>` : ''}<span class="q-cv-mk">${mark(b.ink)}</span></div>`;
  }

  const appbar = (title, acts = '') => `<header class="q-appbar"><h2 class="q-title">${title}</h2><div class="q-acts">${acts}</div></header>`;
  const navbar = (cur) => `<nav class="q-nav" aria-label="Quire">
    ${[['library', 'Library', 'lib'], ['highlights', 'Highlights', 'hl'], ['habit', 'Reading', 'habit']].map(([id, n, i]) =>
      `<button class="q-nav-b${cur === id ? ' on' : ''}" ${cur === id ? 'aria-current="page"' : `data-go="${id}" data-dir="fade"`}><span class="q-nav-pill">${ico(i)}</span><span class="q-nav-l">${n}</span></button>`).join('')}
  </nav>`;

  /* ---------- page curl geometry (render draws the still frame, mount drives the drag) ---------- */
  function curl(x, y, W, H) {
    // x: where the page's free edge is (W = flat, -W = fully turned). y: grip height.
    const fold = (x + W) / 2;
    const a = Math.max(-0.22, Math.min(0.22, (y / H - 0.5) * 0.42)) * Math.min(1, (W - x) / (W * 0.5));
    const dx = Math.tan(a) * H / 2;
    const tx = fold + dx, bx = fold - dx;
    const ftx = tx - (W - tx), fbx = bx - (W - bx);
    const flat = x >= W - 0.5;
    const deg = a * 180 / Math.PI;
    const depth = Math.min(1, (W - x) / W);
    return {
      top: flat ? 'clip-path:none' : `clip-path:polygon(0 0,${tx}px 0,${bx}px ${H}px,0 ${H}px)`,
      flap: flat ? 'display:none' : `clip-path:polygon(${ftx}px 0,${tx}px 0,${bx}px ${H}px,${fbx}px ${H}px);--fold:${fold}px;--depth:${depth}`,
      shade: flat ? 'display:none' : `left:${fold}px;transform:rotate(${-deg}deg);opacity:${Math.min(1, depth * 2.2)}`
    };
  }

  /* ---------- reader ---------- */
  function pageHTML(s, i, cls = '') {
    const pg = PAGES[i];
    if (!pg) return `<div class="q-page t-${s.theme} ${cls}"><div class="q-end">${mark()}<p>Chapter 35 begins on the next page.</p></div></div>`;
    return `<div class="q-page t-${s.theme} ${cls}${s.justify ? '' : ' rag'}" style="--fs:${s.size}px;--lh:${s.lh}">
      <div class="q-text" lang="en">${pg.html}</div>
      <div class="q-folio"><span>Chapter 34</span><span>${pg.n} of 360</span></div>
    </div>`;
  }

  function readerHTML(s, ctx, opts = {}) {
    const W = ctx.width, H = ctx.height;
    const g = curl(W, H * 0.82, W, H);
    const chrome = opts.chrome ?? s.chrome;
    return `<div class="q-reader t-${s.theme}${chrome ? ' chrome' : ''}" data-reader>
      <div class="q-stage" data-stage>
        ${pageHTML(s, s.page + 1, 'q-under')}
        <div class="q-shade" data-shade style="${g.shade}"></div>
        ${pageHTML(s, s.page, 'q-top')}
        <div class="q-flap t-${s.theme}" data-flap style="${g.flap}"></div>
      </div>
      <header class="q-rbar t-${s.theme}" style="padding-top:${ctx.safeTop}px">
        <button class="q-ib" data-go="details" data-dir="pop" aria-label="Back to book">${ico('back')}</button>
        <div class="q-rbar-t"><b>Pride and Prejudice</b><span>Chapter 34</span></div>
        <button class="q-ib" data-go="highlight" aria-label="Highlight">${ico('bookmark')}</button>
        <button class="q-ib" data-go="type" data-dir="up" aria-label="Type and theme">${ico('aa')}</button>
      </header>
      <footer class="q-rfoot t-${s.theme}" style="padding-bottom:${ctx.safeBottom + 8}px">
        <div class="q-rfoot-row"><span>4 min left in chapter</span><span>52%</span></div>
        <div class="q-slider" aria-hidden="true"><i style="width:52%"></i><b style="left:52%"></b></div>
      </footer>
    </div>`;
  }

  /* ---------- screens ---------- */
  const R = {
    welcome(s, ctx) {
      return `<div class="q-scr q-welcome" style="padding-top:${ctx.safeTop}px;padding-bottom:${ctx.safeBottom}px">
        <div class="q-wel-art">${mark()}</div>
        <div class="q-wel-copy">
          <h2 class="q-display">A quiet place to read</h2>
          <p class="q-body">Add an EPUB, PDF or text file. It stays a file on this phone.</p>
        </div>
        <div class="q-list q-promise">
          <div class="q-li">${ico('wifioff', 'q-li-ic')}<div class="q-li-t"><b>No internet permission</b></div></div>
          <div class="q-li">${ico('lock', 'q-li-ic')}<div class="q-li-t"><b>No account, no sync</b></div></div>
        </div>
        <div class="q-wel-acts">
          <button class="q-btn q-btn-filled" data-go="import" data-dir="up">${ico('add')}Add books</button>
        </div>
      </div>`;
    },

    import(s, ctx) {
      const n = s.picked.size;
      return `<div class="q-scr q-picker" style="padding-top:${ctx.safeTop}px">
        <header class="q-appbar q-pk-bar">
          <button class="q-ib" data-back aria-label="Cancel">${ico('close')}</button>
          <h2 class="q-title q-pk-t">${n ? `${n} selected` : 'Download'}</h2>
          <button class="q-btn q-btn-filled q-btn-s${n ? '' : ' off'}" ${n ? 'data-act="openPicked"' : 'disabled'}>Open</button>
        </header>
        <div class="q-scroll q-pk-list" data-keep-scroll="pk">
          ${FILES.filter(f => !f.other).map(f => fileRow(f, s)).join('')}
        </div>
      </div>`;
    },

    library(s, ctx) {
      const pp = BOOKS.pp;
      return `<div class="q-scr q-lib" style="padding-top:${ctx.safeTop}px">
        ${appbar('Library', `<button class="q-ib" aria-label="Search your books">${ico('search')}</button><button class="q-ib" data-go="import" data-dir="up" aria-label="Add books">${ico('add')}</button>`)}
        <div class="q-scroll q-pad-nav" data-keep-scroll="lib">
          <button class="q-card q-cont" data-go="reader">
            ${cover('pp', 'm')}
            <div class="q-cont-body">
              <span class="q-overline">Continue reading</span>
              <b class="q-cont-t">${pp.t}</b>
              <span class="q-cont-place">Chapter 34</span>
              <div class="q-prog"><i style="width:${pp.p}%"></i></div>
            </div>
          </button>
          <div class="q-sec-h"><h3 class="q-h3">On this phone</h3></div>
          <div class="q-shelf">
            ${SHELF.map(id => `<button class="q-book" data-go="${id === 'sc' ? 'scan' : 'details'}" aria-label="${BOOKS[id].t}">${cover(id, 's')}</button>`).join('')}
          </div>
        </div>
        ${navbar('library')}
      </div>`;
    },

    details(s, ctx) {
      const b = BOOKS.pp;
      const chaps = [[33, 'More than once did Elizabeth'], [34, 'When they were gone'], [35, 'Elizabeth awoke the next morning']];
      return `<div class="q-scr q-det" style="padding-top:${ctx.safeTop}px">
        <header class="q-appbar"><button class="q-ib" data-go="library" data-dir="pop" aria-label="Back">${ico('back')}</button><span class="q-grow"></span><button class="q-ib" aria-label="More">${ico('more')}</button></header>
        <div class="q-scroll" data-keep-scroll="det">
          <div class="q-det-hero">
            ${cover('pp', 'l')}
            <h2 class="q-det-t">${b.t}</h2>
            <p class="q-det-a">${b.a}</p>
          </div>
          <button class="q-btn q-btn-filled q-btn-wide q-btn-xl" data-go="reader">Resume</button>
          <div class="q-list q-chaps">${chaps.map(([n, t]) => `<div class="q-li q-chap-row${n === 34 ? ' cur' : ''}"><span class="q-chap-n">${n}</span><div class="q-li-t"><b>${t}</b></div><span class="q-chap-s">${n === 34 ? 'Now' : n < 34 ? ico('check') : ''}</span></div>`).join('')}</div>
        </div>
      </div>`;
    },

    reader(s, ctx) {
      return readerHTML(s, ctx, ctx.static ? { chrome: false } : {});
    },

    type(s, ctx) {
      const sizes = [16, 17, 18, 19, 20, 22, 24];
      const idx = Math.max(0, sizes.indexOf(s.size));
      return `<div class="q-scr q-typesheet">
        <div class="q-typeback">${readerHTML(s, ctx, { chrome: false })}</div>
        <div class="q-scrim" data-back></div>
        <section class="q-sheet" style="padding-bottom:${ctx.safeBottom + 16}px" aria-label="Type and theme">
          <div class="q-grab"></div>
          <div class="q-sh-head"><h2 class="q-title">Page</h2><button class="q-btn q-btn-text" data-act="resetType">Reset</button></div>
          <div class="q-themes" role="radiogroup" aria-label="Theme">
            ${THEMES.map(t => `<button class="q-theme${s.theme === t.id ? ' on' : ''}" role="radio" aria-checked="${s.theme === t.id}" data-act="theme" data-v="${t.id}"><span class="q-sw t-${t.id}">Aa</span><span class="q-theme-l">${t.name}</span></button>`).join('')}
          </div>
          <div class="q-row q-size">
            <button class="q-ib q-ib-tonal" data-act="size" data-v="-1" aria-label="Smaller text"><span class="q-a-s">A</span></button>
            <div class="q-mslider" aria-hidden="true"><i style="width:${(idx / (sizes.length - 1)) * 100}%"></i><b style="left:${(idx / (sizes.length - 1)) * 100}%"></b></div>
            <button class="q-ib q-ib-tonal" data-act="size" data-v="1" aria-label="Larger text"><span class="q-a-l">A</span></button>
          </div>
        </section>
      </div>`;
    },

    highlight(s, ctx) {
      const words = QUOTE.split(' ');
      const [a, b] = s.sel;
      const para = words.map((w, i) => {
        const on = i >= a && i <= b;
        return `<span class="w${on ? ' sel hl-' + s.hlc : ''}${on && i === a ? ' s-a' : ''}${on && i === b ? ' s-b' : ''}" data-i="${i}">${i === 0 ? '“' : ''}${w}${i === words.length - 1 ? '”' : ''}${i < words.length - 1 && on && i < b ? ' ' : ''}</span>${i < words.length - 1 && !(on && i < b) ? ' ' : ''}`;
      }).join('');
      return `<div class="q-scr q-hl t-${s.theme}">
        <header class="q-appbar q-hl-bar" style="padding-top:${ctx.safeTop}px">
          <button class="q-ib" data-back aria-label="Back">${ico('back')}</button>
          <div class="q-rbar-t"><b data-count>${b - a + 1} words selected</b></div>
          <button class="q-btn q-btn-text" data-act="saveHl">Keep</button>
        </header>
        <div class="q-page t-${s.theme} q-hl-page" style="--fs:${s.size}px;--lh:${s.lh}">
          <div class="q-text" lang="en">
            <p class="q-first q-dim">After a silence of several minutes, he came towards her in an agitated manner, and thus began:</p>
            <p class="q-hl-p" data-words>${para}</p>
            <p class="q-dim">Elizabeth’s astonishment was beyond expression. She stared, coloured, doubted, and was silent.</p>
          </div>
        </div>
        <div class="q-hl-tool" role="toolbar" aria-label="Highlight" style="bottom:${ctx.safeBottom + 16}px">
          <div class="q-hl-colors">${HL_COLORS.map(c => `<button class="q-hc q-hc-${c.id}${s.hlc === c.id ? ' on' : ''}" data-act="hlc" data-v="${c.id}" aria-label="${c.name}"></button>`).join('')}</div>
          <button class="q-btn q-btn-filled q-btn-s" data-go="share" data-dir="up">${ico('share')}Card</button>
        </div>
      </div>`;
    },

    share(s, ctx) {
      const words = QUOTE.split(' ').slice(s.sel[0], s.sel[1] + 1).join(' ');
      return `<div class="q-scr q-share" style="padding-top:${ctx.safeTop}px">
        <header class="q-appbar"><button class="q-ib" data-back aria-label="Close">${ico('close')}</button><h2 class="q-title">Passage card</h2><span class="q-grow"></span></header>
        <div class="q-card-stage">
          <figure class="q-pcard t-${s.card} ${s.cardFmt}">
            <span class="q-pcard-mk">${mark()}</span>
            <blockquote>“${words}”</blockquote>
            <figcaption><b>Pride and Prejudice</b><span>Jane Austen</span></figcaption>
          </figure>
        </div>
        <section class="q-sheet q-share-ctl" style="padding-bottom:${ctx.safeBottom + 16}px">
          <div class="q-row q-share-row">
            <div class="q-pal" role="radiogroup" aria-label="Card colour">
              ${THEMES.map(t => `<button class="q-palb${s.card === t.id ? ' on' : ''}" role="radio" aria-checked="${s.card === t.id}" data-act="card" data-v="${t.id}" aria-label="${t.name}"><span class="q-sw t-${t.id}"></span></button>`).join('')}
            </div>
          </div>
          <button class="q-btn q-btn-filled q-btn-wide" data-act="shareCard">${ico('share')}Share image</button>
        </section>
      </div>`;
    },

    highlights(s, ctx) {
      const items = [
        { c: 'sun', t: 'In vain have I struggled. It will not do. My feelings will not be repressed.' },
        { c: 'rose', t: 'I could easily forgive his pride, if he had not mortified mine.' },
        { c: 'sage', t: 'Where the mind is without fear and the head is held high.', b: 'Gitanjali' }
      ];
      const f = s.hlFilter;
      const shown = items.filter(x => f === 'all' || x.c === f).slice(0, 2);
      const order = ['all', 'sun', 'rose', 'sage'];
      const names = { all: 'All colours', sun: 'Yellow', rose: 'Rose', sage: 'Sage' };
      const nextF = order[(order.indexOf(f) + 1) % order.length];
      return `<div class="q-scr q-hls" style="padding-top:${ctx.safeTop}px">
        ${appbar('Highlights')}
        <div class="q-chips"><button class="q-chip" data-act="hlFilter" data-v="${nextF}" aria-label="Filter by colour">${f !== 'all' ? `<i class="q-dot q-hc-${f}"></i>` : ''}${names[f]}${ico('expand')}</button></div>
        <div class="q-scroll q-pad-nav" data-keep-scroll="hls">
          ${shown.length ? shown.map(x => `<button class="q-card q-hli" data-go="reader">
            <p class="q-hli-t"><span class="hl-${x.c}">${x.t}</span></p>
            <span class="q-hli-b">${x.b || 'Pride and Prejudice'}</span>
          </button>`).join('') : `<div class="q-empty">${mark()}<p>No highlights in this colour yet.</p></div>`}
        </div>
        ${navbar('highlights')}
      </div>`;
    },

    habit(s, ctx) {
      const today = 14, goal = s.goal, pct = Math.min(1, today / goal);
      const R0 = 54, C = 2 * Math.PI * R0;
      // The week of 19 Oct: minutes read, Monday to Thursday so far.
      const week = [['M', 22], ['T', 25], ['W', 31], ['T', 14], ['F', null], ['S', null], ['S', null]];
      return `<div class="q-scr q-habit" style="padding-top:${ctx.safeTop}px">
        ${appbar('Reading', `<button class="q-ib" data-go="widget" aria-label="Widgets">${ico('more')}</button>`)}
        <div class="q-scroll q-pad-nav" data-keep-scroll="habit">
          <div class="q-ringbox">
            <svg class="q-ring" viewBox="0 0 128 128" aria-hidden="true">
              <circle cx="64" cy="64" r="${R0}" class="q-ring-bg"/>
              <circle cx="64" cy="64" r="${R0}" class="q-ring-fg" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - pct)).toFixed(1)}"/>
            </svg>
            <div class="q-ring-c"><b>${today}</b><span>of ${goal} min</span></div>
          </div>
          <p class="q-streak">${ico('flame')}4 day streak</p>
          <div class="q-week">${week.map(([d, m], i) => `<div class="q-day${m == null ? ' fut' : m >= goal ? ' l2' : ' l1'}${i === 3 ? ' today' : ''}"><i></i><span>${d}</span></div>`).join('')}</div>
        </div>
        ${navbar('habit')}
      </div>`;
    },

    widget(s, ctx) {
      const pp = BOOKS.pp;
      return `<div class="q-scr q-home" style="padding-top:${ctx.safeTop}px;padding-bottom:${ctx.safeBottom}px">
        <div class="q-glance"><b>Thursday, 22 Oct</b></div>
        <div class="q-wgrid">
          <button class="q-w q-w-book" data-go="reader">
            ${cover('pp', 'w')}
            <div class="q-w-body"><b>${pp.t}</b><span>Chapter 34</span>
            <div class="q-prog"><i style="width:${pp.p}%"></i></div></div>
          </button>
          <div class="q-w q-w-goal">
            <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" class="bg"/><circle cx="32" cy="32" r="26" class="fg" stroke-dasharray="163.4" stroke-dashoffset="${(163.4 * (1 - 14 / 20)).toFixed(1)}"/></svg>
            <div class="q-w-gt"><b>14 of 20</b><span>min today</span></div>
          </div>
        </div>
        <div class="q-dock">${['#4a6b5c', '#b88a3c', '#4a6290'].map(c => `<span class="q-app" style="background:${c}"></span>`).join('')}<span class="q-app q-app-q">${mark('#fdf9f7')}</span></div>
        <div class="q-searchbar">${ico('search')}<span>Search</span></div>
      </div>`;
    },

    scan(s, ctx) {
      return `<div class="q-scr q-scan" style="padding-top:${ctx.safeTop}px;padding-bottom:${ctx.safeBottom}px">
        <header class="q-appbar"><button class="q-ib" data-go="library" data-dir="pop" aria-label="Back">${ico('back')}</button><div class="q-rbar-t"><b>Pride and Prejudice, 1813</b></div><button class="q-ib" aria-label="Zoom">${ico('zoom')}</button></header>
        <div class="q-scan-label">${ico('info', 'q-li-ic')}<div class="q-li-t"><b>Scanned pages, shown as they are</b></div></div>
        <div class="q-scan-view">
          <div class="q-scanpage">
            <p class="sc-1">PRIDE</p><p class="sc-2">AND</p><p class="sc-1">PREJUDICE:</p>
            <p class="sc-3">A NOVEL.</p><p class="sc-4">IN THREE VOLUMES.</p>
            <span class="sc-rule"></span>
            <p class="sc-4">BY THE AUTHOR OF</p><p class="sc-4">“SENSE AND SENSIBILITY.”</p>
            <span class="sc-rule"></span>
            <p class="sc-3">VOL. I.</p>
            <p class="sc-5">London:</p>
            <p class="sc-4">PRINTED FOR T. EGERTON,<br>MILITARY LIBRARY, WHITEHALL.</p>
            <p class="sc-4">1813.</p>
          </div>
        </div>
        <div class="q-scan-foot"><span>Page 3 of 324</span></div>
      </div>`;
    }
  };

  function fileRow(f, s) {
    const on = s.picked.has(f.id);
    return `<button class="q-li q-pk-row${on ? ' on' : ''}${f.dim ? ' dim' : ''}" ${f.dim ? 'disabled' : `data-act="pick" data-v="${f.id}"`}>
      <span class="q-pk-ic">${on ? ico('check') : ico(f.kind === 'JPG' ? 'image' : 'doc')}</span>
      <div class="q-li-t"><b>${f.name}</b><span>${f.kind} · ${f.size}</span></div>
    </button>`;
  }

  /* ---------- the app ---------- */
  const app = {
    id: 'quire',
    name: 'Quire',
    platform: 'android',
    fonts: ['Roboto+Flex:opsz,wght@8..144,400..700', 'Literata:ital,opsz,wght@0,7..72,400..600;1,7..72,400'],
    tone: 'dark',
    signature: 'reader',
    system: {
      summary: 'Material 3 on near-neutral paper with one madder accent, the colour of a cloth-bound spine. The chrome stays quiet; the book text and the five reading themes do the work.',
      palette: [
        { token: '--q-primary', name: 'Madder', value: '#8e2a2f', role: 'Primary: filled buttons, selection, progress' },
        { token: '--q-on-primary', name: 'Paper', value: '#fdf9f7', role: 'Text and icons on primary' },
        { token: '--q-primary-container', name: 'Madder wash', value: '#fdd9d7', role: 'Nav indicator, tonal buttons, chips' },
        { token: '--q-on-primary-container', name: 'Madder ink', value: '#3a0e0f', role: 'Text on madder wash' },
        { token: '--q-surface', name: 'Surface', value: '#fdf9f7', role: 'App background' },
        { token: '--q-surface-container', name: 'Container', value: '#f1eeec', role: 'Cards, nav bar, sheets' },
        { token: '--q-on-surface', name: 'Ink', value: '#161312', role: 'Primary text' },
        { token: '--q-on-surface-variant', name: 'Graphite', value: '#524f4e', role: 'Secondary text, icons' }
      ],
      type: [
        { role: 'Book text', family: 'Literata', sample: 'In vain have I struggled.', spec: '18/27 · 400 · justified, hyphenated' },
        { role: 'Title', family: 'Roboto Flex', sample: 'Library', spec: '28/36 · 500 (M3 headline small)' },
        { role: 'Body', family: 'Roboto Flex', sample: 'Resume at 52%', spec: '16/24 · 400; labels 14/20 · 500' },
        { role: 'Caption', family: 'Roboto Flex', sample: '4 min left in chapter', spec: '14/20 · 400' }
      ],
      radius: '16 / 20 / 999',
      contrast: [
        { pair: 'Ink on surface', ratio: '17.7:1' },
        { pair: 'Graphite on surface', ratio: '7.8:1' },
        { pair: 'Paper on madder', ratio: '8.0:1' },
        { pair: 'Madder ink on wash', ratio: '12.9:1' },
        { pair: 'Paper theme text', ratio: '14.8:1' },
        { pair: 'Sepia theme text', ratio: '11.2:1' },
        { pair: 'E-ink theme text', ratio: '13.8:1' },
        { pair: 'Night theme text', ratio: '11.1:1' },
        { pair: 'Black theme text', ratio: '9.7:1' }
      ]
    },
    screens: [
      { id: 'welcome', title: 'First launch', caption: 'The empty state: an empty shelf and two promises the system enforces.' },
      { id: 'import', title: 'Add books', caption: "Android's file picker, filtered to what Quire can read. It only sees what you choose.", sheet: true },
      { id: 'library', title: 'Library', caption: 'One book to continue, the rest on a shelf of plain covers. No store, no feed.' },
      { id: 'details', title: 'Book', caption: 'The cover, one button to resume, three chapters.' },
      { id: 'reader', title: 'Reader', caption: 'Book typesetting on a flat page. Drag from the edge and the page turns under your finger.', tone: s => darkTheme(s.theme) ? 'light' : 'dark' },
      { id: 'type', title: 'Type and theme', caption: 'Five themes re-ink the page live. E-ink has zero chroma.', sheet: true, tone: s => darkTheme(s.theme) ? 'light' : 'dark' },
      { id: 'highlight', title: 'Highlight', caption: 'Long-press a word, then drag the handles to the end of the thought.', tone: s => darkTheme(s.theme) ? 'light' : 'dark' },
      { id: 'share', title: 'Passage card', caption: 'Dress a passage in any reading palette; Android shares it, Quire sends nothing.', sheet: true },
      { id: 'highlights', title: 'Highlights', caption: 'Kept passages, one colour filter.' },
      { id: 'habit', title: 'Reading habit', caption: 'A daily goal, a streak that pauses instead of shaming, one week.' },
      { id: 'widget', title: 'Home-screen widgets', caption: 'Your book and today’s goal, one tap from the page.' },
      { id: 'scan', title: 'Scanned book', caption: 'A scan is shown as pages and labelled honestly. No OCR inventing words.', tone: 'light' }
    ],
    init() {
      return {
        picked: new Set(['pp', 'ge']),
        theme: 'paper', size: 18, lh: 1.5, justify: true,
        page: 1, chrome: true,
        sel: [15, 28], hlc: 'sun',
        card: 'sepia', cardFmt: 'square',
        hlFilter: 'all', goal: 20
      };
    },
    render(id, s, ctx) { return (R[id] || R.library)(s, ctx); },
    action(name, v, s, ctx, el) {
      const sizes = [16, 17, 18, 19, 20, 22, 24];
      switch (name) {
        case 'pick': s.picked.has(v) ? s.picked.delete(v) : s.picked.add(v); break;
        case 'openPicked': ctx.go('library', 'reset'); ctx.toast(`${s.picked.size} book${s.picked.size > 1 ? 's' : ''} added`); return false;
        case 'theme': return reink(v, s, ctx, el);
        case 'size': { const i = Math.max(0, Math.min(sizes.length - 1, sizes.indexOf(s.size) + +v)); s.size = sizes[i]; break; }
        case 'lh': s.lh = +v; break;
        case 'justify': s.justify = !s.justify; break;
        case 'resetType': s.size = 18; s.lh = 1.5; s.justify = true; s.theme = 'paper'; break;
        case 'hlc': s.hlc = v; break;
        case 'saveHl': ctx.toast('Kept in Highlights'); return false;
        case 'copyHl': ctx.toast('Passage copied'); return false;
        case 'noteHl': ctx.toast('Note added'); return false;
        case 'card': s.card = v; break;
        case 'cardFmt': s.cardFmt = v; break;
        case 'shareCard': ctx.toast('Image handed to the share sheet'); return false;
        case 'hlFilter': s.hlFilter = v; break;
        case 'goal': s.goal = +v; break;
      }
    },
    mount(root, s, ctx, id) {
      if (id === 'reader') return mountReader(root, s, ctx);
      if (id === 'highlight') return mountHighlight(root, s, ctx);
      if (id === 'habit') {
        const fg = root.querySelector('.q-ring-fg');
        if (fg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const end = fg.getAttribute('stroke-dashoffset'); fg.style.strokeDashoffset = fg.getAttribute('stroke-dasharray');
          requestAnimationFrame(() => requestAnimationFrame(() => { fg.style.transition = 'stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)'; fg.style.strokeDashoffset = end; }));
        }
      }
    }
  };

  /* the theme switch re-inks the page outward from the swatch you touched */
  function reink(theme, s, ctx, el) {
    if (theme === s.theme) return false;
    const layer = el.closest('.ph-layer');
    const back = layer && layer.querySelector('.q-typeback');
    if (!back || matchMedia('(prefers-reduced-motion: reduce)').matches) { s.theme = theme; return; }
    s.theme = theme;
    const fresh = document.createElement('div');
    fresh.className = 'q-typeback q-reink';
    fresh.innerHTML = readerHTML(s, ctx, { chrome: false });
    const lr = layer.getBoundingClientRect(), er = el.getBoundingClientRect(), k = lr.width / ctx.width;
    fresh.style.setProperty('--cx', ((er.left + er.width / 2 - lr.left) / k) + 'px');
    fresh.style.setProperty('--cy', ((er.top + er.height / 2 - lr.top) / k) + 'px');
    back.after(fresh);
    layer.querySelectorAll('.q-theme').forEach(b => { const on = b.dataset.v === theme; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
    ctx.phone.sb.classList.toggle('light', darkTheme(theme)); ctx.phone.homeEl.classList.toggle('light', darkTheme(theme));
    let done = false;
    const land = () => { if (done) return; done = true; ctx.rerender(); };
    fresh.addEventListener('animationend', land, { once: true });
    setTimeout(land, 700);
    return false;
  }

  /* ---------- signature: the page turn ---------- */
  function mountReader(root, s, ctx) {
    const stage = root.querySelector('[data-stage]');
    const reader = root.querySelector('[data-reader]');
    const top = stage.querySelector('.q-top'), flap = stage.querySelector('[data-flap]'), shade = stage.querySelector('[data-shade]');
    const W = ctx.width, H = ctx.height;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let drag = null, anim = 0, guardT = 0;
    const apply = (x, y) => { const g = curl(x, y, W, H); top.style.cssText = g.top; flap.style.cssText = g.flap; shade.style.cssText = g.shade; };
    const local = e => { const r = stage.getBoundingClientRect(), k = r.width / W; return [(e.clientX - r.left) / k, (e.clientY - r.top) / k]; };
    const tween = (x0, y0, x1, y1, ms, ease, done) => {
      cancelAnimationFrame(anim);
      if (reduce) { apply(x1, y1); done && done(); return; }
      const t0 = performance.now();
      let finished = false;
      const finish = () => { if (finished) return; finished = true; cancelAnimationFrame(anim); clearTimeout(guard); apply(x1, y1); done && done(); };
      const step = now => {
        const t = Math.min(1, (now - t0) / ms), e = ease(t);
        apply(x0 + (x1 - x0) * e, y0 + (y1 - y0) * e);
        if (t < 1) anim = requestAnimationFrame(step); else finish();
      };
      clearTimeout(guardT); const guard = guardT = setTimeout(finish, ms + 120);
      anim = requestAnimationFrame(step);
    };
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const spring = t => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
    const turn = (x, y) => tween(x, y, -W, y + (H * 0.5 - y) * 0.3, 360, easeOut, () => {
      if (s.page < PAGES.length - 1) { s.page++; ctx.rerender(); } else { s.page = 0; ctx.rerender(); ctx.toast('Back to page 187 for the demo'); }
    });
    const down = e => {
      if (e.target.closest('.q-rbar, .q-rfoot')) return;
      const [x, y] = local(e);
      drag = { x0: x, y0: y, t0: performance.now(), x, y, lastX: x, lastT: performance.now(), v: 0, moving: false };
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const move = e => {
      if (!drag) return;
      const [x, y] = local(e);
      const now = performance.now();
      drag.v = (x - drag.lastX) / Math.max(1, now - drag.lastT); drag.lastX = x; drag.lastT = now;
      if (!drag.moving && Math.abs(x - drag.x0) > 8 && drag.x0 > W * 0.45 && x < drag.x0) { drag.moving = true; reader.classList.remove('chrome'); s.chrome = false; }
      if (drag.moving) { drag.x = Math.min(W, x - (W - drag.x0) * 0.15); drag.y = y; apply(drag.x, drag.y); }
    };
    const up = () => {
      if (!drag) return;
      const d = drag; drag = null;
      if (d.moving) {
        if (d.x < W * 0.55 || d.v < -0.45) turn(d.x, d.y);
        else tween(d.x, d.y, W, d.y, 420, spring, () => apply(W, d.y));
        return;
      }
      if (performance.now() - d.t0 > 400) return;
      if (d.x0 > W * 0.72) { const y = d.y0; tween(W, y, W * 0.86, y, 90, easeOut, () => turn(W * 0.86, y)); }
      else if (d.x0 < W * 0.28) { if (s.page > 0) { s.page--; ctx.rerender(); } }
      else { s.chrome = !s.chrome; reader.classList.toggle('chrome', s.chrome); }
    };
    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    return () => { cancelAnimationFrame(anim); clearTimeout(guardT); };
  }

  /* ---------- long-press highlight with handles ---------- */
  function mountHighlight(root, s, ctx) {
    const box = root.querySelector('[data-words]');
    const page = root.querySelector('.q-hl-page');
    const words = QUOTE.split(' ');
    let press = 0, mode = null;
    const wordAt = e => { const el = document.elementFromPoint(e.clientX, e.clientY); const w = el && el.closest && el.closest('.w'); return w && box.contains(w) ? +w.dataset.i : null; };
    const paint = () => {
      const [a, b] = s.sel;
      box.innerHTML = words.map((w, i) => {
        const on = i >= a && i <= b;
        return `<span class="w${on ? ' sel hl-' + s.hlc : ''}${on && i === a ? ' s-a' : ''}${on && i === b ? ' s-b' : ''}" data-i="${i}">${i === 0 ? '“' : ''}${w}${i === words.length - 1 ? '”' : ''}${i < words.length - 1 && on && i < b ? ' ' : ''}</span>${i < words.length - 1 && !(on && i < b) ? ' ' : ''}`;
      }).join('');
      const t = root.querySelector('[data-count]'); if (t) t.textContent = `${b - a + 1} word${b > a ? 's' : ''} selected`;
    };
    const down = e => {
      const i = wordAt(e); if (i == null) return;
      const [a, b] = s.sel;
      if (i === a) mode = 'a'; else if (i === b) mode = 'b';
      else {
        mode = null;
        press = setTimeout(() => { s.sel = [i, i]; mode = 'b'; paint(); }, 420);
      }
      try { page.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault();
    };
    const move = e => {
      if (!mode) return;
      const i = wordAt(e); if (i == null) return;
      const [a, b] = s.sel;
      if (mode === 'a') s.sel = [Math.min(i, b), b]; else s.sel = [a, Math.max(i, a)];
      paint();
    };
    const up = () => { clearTimeout(press); mode = null; };
    page.addEventListener('pointerdown', down); page.addEventListener('pointermove', move);
    page.addEventListener('pointerup', up); page.addEventListener('pointercancel', up);
    return () => clearTimeout(press);
  }

  (window.APPS = window.APPS || {})[app.id] = app;
})();
