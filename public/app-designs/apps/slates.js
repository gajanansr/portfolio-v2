/* Slates — a clean iOS notebook for people who make films on their phones.
   Light system greys, one teal accent, and colour only from the frames themselves. */
(() => {
  /* ---------- icons (24px grid, 1.8 stroke) ---------- */
  const P = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.4"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
    mic: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/>',
    stop: '<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" stroke="none"/>',
    trash: '<path d="M4.5 7h15M9.5 7V4.8h5V7M6.5 7l.9 12.2h9.2L17.5 7"/>',
    restore: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>',
    grip: '<path d="M9 7h.01M15 7h.01M9 12h.01M15 12h.01M9 17h.01M15 17h.01" stroke-width="3" stroke-linecap="round"/>',
    film: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M3.5 9.5h17M8 5v4.5M12.5 5v4.5M17 5v4.5"/>',
    inbox: '<path d="M4 13.5l2.4-7.5h11.2l2.4 7.5V19H4z"/><path d="M4 13.5h4.5l1 2h5l1-2H20"/>',
    doc: '<path d="M7 3.5h7l4 4V20.5H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/>',
    wave: '<path d="M4 12h1.5M8 8v8M11.5 5v14M15 9v6M18.5 11v2"/>',
    link: '<path d="M10 14l4-4M8.5 11.5l-2 2a3.2 3.2 0 0 0 4.5 4.5l2-2M15.5 12.5l2-2A3.2 3.2 0 0 0 13 6l-2 2"/>',
    glasses: '<circle cx="7.5" cy="14" r="3.5"/><circle cx="16.5" cy="14" r="3.5"/><path d="M11 14h2M4 14l1.5-6M20 14l-1.5-6"/>',
    cal: '<rect x="4" y="5.5" width="16" height="14" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    more: '<path d="M6 12h.01M12 12h.01M18 12h.01" stroke-width="3" stroke-linecap="round"/>',
    heart: '<path d="M12 19.5s-7-4.3-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.1c0 5.1-7 9.4-7 9.4z"/>',
    comment: '<path d="M5 18.5l1.2-3.4A7 7 0 1 1 9 18z"/>',
    send: '<path d="M20 4L3.5 11l6.5 2.5L12.5 20z"/><path d="M10 13.5L20 4"/>',
    scene: '<rect x="4" y="5.5" width="16" height="13" rx="2"/><path d="M4 9.5h16"/>',
    person: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/>',
    pen: '<path d="M14.5 5.5l4 4L9 19H5v-4z"/>'
  };
  const ic = (n, cls = '') => `<svg class="sl-i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

  /* ---------- frames: flat illustrated stills, each its own Bengaluru scene ---------- */
  const SCENES = {
    metro: `<rect width="160" height="160" fill="#262a52"/><rect width="160" height="30" fill="#191c38"/>
      <g fill="#ffe7a3"><circle cx="20" cy="30" r="2.5"/><circle cx="60" cy="30" r="2.5"/><circle cx="100" cy="30" r="2.5"/><circle cx="140" cy="30" r="2.5"/></g>
      <rect x="8" y="58" width="144" height="56" rx="8" fill="#dfe3ea"/><rect x="8" y="94" width="144" height="7" fill="#8a46b0"/>
      <g fill="#30395c"><rect x="18" y="66" width="22" height="20" rx="3"/><rect x="48" y="66" width="22" height="20" rx="3"/><rect x="90" y="66" width="22" height="20" rx="3"/><rect x="120" y="66" width="22" height="20" rx="3"/></g>
      <rect x="48" y="66" width="22" height="20" rx="3" fill="#ffd27a"/><rect x="76" y="64" width="8" height="34" rx="1.5" fill="#b9bfca"/>
      <rect y="114" width="160" height="46" fill="#3b3e5c"/><rect y="114" width="160" height="5" fill="#f2c94c"/>`,
    dosa: `<rect width="160" height="160" fill="#f3b544"/><rect y="0" width="160" height="22" fill="#d9952a"/>
      <path d="M118 0v24" stroke="#5a3a1a" stroke-width="2"/><circle cx="118" cy="30" r="8" fill="#fff4cc"/>
      <path d="M58 92c-6-10 6-14 0-24M80 88c-6-10 6-14 0-24M102 92c-6-10 6-14 0-24" fill="none" stroke="#fff8e8" stroke-width="3" stroke-linecap="round" opacity=".9"/>
      <rect y="118" width="160" height="42" fill="#7a3f1e"/><ellipse cx="80" cy="112" rx="62" ry="16" fill="#26201c"/>
      <ellipse cx="80" cy="108" rx="46" ry="10" fill="#e6a54b"/><ellipse cx="80" cy="108" rx="30" ry="5" fill="#f0bf6d"/>`,
    auto: `<rect width="160" height="160" fill="#f28c5c"/><rect y="70" width="160" height="50" fill="#e47852"/><circle cx="128" cy="62" r="13" fill="#ffd9a0"/>
      <rect y="34" width="160" height="16" fill="#555a6b"/><rect x="26" y="50" width="12" height="70" fill="#474b5b"/><rect x="122" y="50" width="12" height="70" fill="#474b5b"/>
      <rect y="120" width="160" height="40" fill="#383944"/><g fill="#e9e5dc"><rect x="10" y="138" width="18" height="3"/><rect x="50" y="138" width="18" height="3"/><rect x="90" y="138" width="18" height="3"/><rect x="130" y="138" width="18" height="3"/></g>
      <path d="M52 118V92q0-18 22-20h14q14 0 16 16v30z" fill="#1d8a4c"/><path d="M58 92q2-14 18-15h12q10 1 12 15z" fill="#f2c230"/>
      <rect x="62" y="84" width="16" height="10" rx="2" fill="#2b2e38"/><circle cx="104" cy="104" r="3.5" fill="#fff4c8"/>
      <circle cx="62" cy="120" r="7" fill="#15161b"/><circle cx="98" cy="120" r="7" fill="#15161b"/>`,
    mgroad: `<rect width="160" height="160" fill="#1d2b4c"/><g fill="#2a3a63"><rect x="6" y="38" width="22" height="70"/><rect x="34" y="20" width="26" height="88"/><rect x="104" y="28" width="24" height="80"/><rect x="132" y="46" width="22" height="62"/></g>
      <g fill="#ffd77f"><rect x="40" y="30" width="4" height="4"/><rect x="50" y="44" width="4" height="4"/><rect x="40" y="58" width="4" height="4"/><rect x="110" y="40" width="4" height="4"/><rect x="118" y="56" width="4" height="4"/><rect x="12" y="52" width="4" height="4"/></g>
      <rect y="108" width="160" height="52" fill="#2d3241"/><g fill="#e8e8e8"><rect x="76" y="118" width="8" height="8"/><rect x="74" y="136" width="12" height="10"/></g>
      <g stroke="#c8ced8" stroke-width="2.5"><path d="M64 108V70M96 108V70"/></g><circle cx="64" cy="68" r="5" fill="#ffe39a"/><circle cx="96" cy="68" r="5" fill="#ffe39a"/>
      <circle cx="20" cy="104" r="14" fill="#214c3a"/><circle cx="142" cy="104" r="14" fill="#214c3a"/>`,
    window: `<rect width="160" height="160" fill="#22252f"/><rect x="22" y="26" width="116" height="94" rx="14" fill="#9aa3ae"/>
      <rect x="28" y="32" width="104" height="82" rx="10" fill="#2e3d66"/><g fill="#ffd57a"><circle cx="44" cy="92" r="2"/><circle cx="58" cy="84" r="2"/><circle cx="70" cy="96" r="2"/><circle cx="86" cy="80" r="2"/><circle cx="52" cy="70" r="1.6"/><circle cx="78" cy="66" r="1.6"/></g>
      <rect x="28" y="98" width="104" height="16" fill="#243052"/>
      <path d="M98 114c0-22 6-34 20-34s18 12 18 22v12z" fill="#0d0f14"/><circle cx="118" cy="66" r="13" fill="#0d0f14"/>
      <rect y="132" width="160" height="28" fill="#2d313d"/>`,
    wiper: `<rect width="160" height="160" fill="#2a3752"/><rect y="88" width="160" height="72" fill="#1f2a40"/>
      <g fill="#e8494a"><circle cx="54" cy="96" r="5"/><circle cx="72" cy="96" r="5"/><circle cx="112" cy="100" r="4"/></g><circle cx="132" cy="92" r="4" fill="#ffd27a"/>
      <g fill="#a9bad3"><circle cx="20" cy="30" r="2.2"/><circle cx="44" cy="52" r="1.6"/><circle cx="90" cy="26" r="2"/><circle cx="120" cy="46" r="2.4"/><circle cx="140" cy="70" r="1.6"/><circle cx="34" cy="78" r="2"/><circle cx="70" cy="40" r="1.4"/><circle cx="104" cy="70" r="1.8"/></g>
      <path d="M24 150L128 52" stroke="#0e1018" stroke-width="5" stroke-linecap="round"/><rect y="134" width="160" height="26" fill="#121520"/>`,
    rooftop: `<rect width="160" height="160" fill="#f6c58f"/><rect y="64" width="160" height="40" fill="#ee9f74"/><circle cx="118" cy="62" r="16" fill="#ffe3b0"/>
      <g fill="#6c5c76"><rect x="0" y="84" width="40" height="76"/><rect x="44" y="96" width="34" height="64"/><rect x="82" y="78" width="40" height="82"/><rect x="126" y="92" width="34" height="68"/></g>
      <g fill="#24222a"><rect x="12" y="70" width="14" height="14" rx="2"/><rect x="54" y="84" width="12" height="12" rx="2"/><rect x="96" y="64" width="14" height="14" rx="2"/><rect x="136" y="80" width="12" height="12" rx="2"/></g>
      <g fill="#ffe1a3"><rect x="10" y="102" width="5" height="5"/><rect x="26" y="116" width="5" height="5"/><rect x="92" y="96" width="5" height="5"/><rect x="104" y="114" width="5" height="5"/></g>`,
    coffee: `<rect width="160" height="160" fill="#c98a58"/><rect y="0" width="160" height="40" fill="#b9784a"/>
      <ellipse cx="80" cy="118" rx="54" ry="16" fill="#9fa3aa"/><ellipse cx="80" cy="114" rx="48" ry="12" fill="#c6cad0"/>
      <path d="M56 58h48l-5 54H61z" fill="#d3d7dc"/><ellipse cx="80" cy="58" rx="24" ry="7" fill="#e3e6ea"/><ellipse cx="80" cy="59" rx="20" ry="5" fill="#d8b183"/>
      <path d="M70 46c-4-6 4-8 0-14M90 46c-4-6 4-8 0-14" fill="none" stroke="#fff5e6" stroke-width="2.5" stroke-linecap="round"/>`
  };
  /* frames are filler photographs of Bengaluru (Wikimedia Commons, credited on the portfolio page) */
  const PHOTOS = ['metro', 'dosa', 'auto', 'window', 'wiper', 'mgroad', 'rooftop', 'coffee'];
  const frame = (k, cls = '', fit = 'slice') => `<img class="sl-frame sl-photo ${cls}" src="assets/slates/${PHOTOS.includes(k) ? k : 'metro'}.jpg" alt="" draggable="false" style="object-fit:${fit === 'meet' ? 'contain' : 'cover'}">`;

  /* ---------- content ---------- */
  const SLATES = [
    { id: 'metro', title: 'Last Metro to Whitefield', kind: 'Short film', frame: 'metro', shots: 9, insp: 14, pages: 6, shoot: 'Sat 8 Nov', fresh: 5 },
    { id: 'coffee', title: 'Filter Coffee', kind: 'Documentary', frame: 'coffee', shots: 3, insp: 6, pages: 2, shoot: 'Sun 16 Nov', fresh: 0 },
    { id: 'rain', title: 'Rain Season', kind: 'Music video', frame: 'wiper', shots: 0, insp: 9, pages: 0, shoot: 'not set', fresh: 0 }
  ];
  const REELS = [
    { title: 'Metro platform symmetry, 12 ways', by: '@cinemetro.in', src: 'Instagram', len: '0:18', frame: 'metro' },
    { title: 'Steam on a dosa tawa at 120 fps', by: '@streetframes', src: 'YouTube', len: '1:42', frame: 'dosa' },
    { title: 'Autos under the flyover at dusk', by: '@blrinmotion', src: 'Instagram', len: '0:24', frame: 'auto' },
    { title: 'Faces in train windows', by: '@nightframes.blr', src: 'Instagram', len: '0:31', frame: 'window' },
    { title: 'The wiper as a natural cut', by: '@editlab', src: 'YouTube', len: '3:05', frame: 'wiper' }
  ];
  const SHOTS = [
    { t: 'Purple Line platform, Indiranagar', size: 'Wide', lens: 24, move: 'Locked off', sec: 6, frame: 'metro' },
    { t: 'Anu checks the last train time', size: 'Close-up', lens: 50, move: 'Handheld', sec: 4, frame: 'window' },
    { t: 'MG Road boulevard from the coach', size: 'POV', lens: 35, move: 'Tracking', sec: 8, frame: 'mgroad' },
    { t: 'Dosa stall near Halasuru', size: 'Medium', lens: 35, move: 'Slow push', sec: 5, frame: 'dosa' },
    { t: 'Rain on the cab windscreen', size: 'Insert', lens: 85, move: 'Locked off', sec: 4, frame: 'wiper' },
    { t: 'An auto idles under the flyover', size: 'Wide', lens: 24, move: 'Pan right', sec: 7, frame: 'auto' },
    { t: 'Rooftops at Whitefield', size: 'Extreme wide', lens: 16, move: 'Drone rise', sec: 6, frame: 'rooftop' },
    { t: 'Anu at the window seat', size: 'Close-up', lens: 50, move: 'Locked off', sec: 5, frame: 'window' },
    { t: 'The last train pulls out', size: 'Wide', lens: 24, move: 'Locked off', sec: 9, frame: 'metro' }
  ];
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const app = {
    id: 'slates', name: 'Slates', platform: 'ios',
    fonts: ['Inter:wght@400;500;600;700', 'Courier+Prime:wght@400;700'],
    tone: 'dark',
    screens: [
      { id: 'share', title: 'Share from Instagram', caption: 'Capture starts where the idea is: Slates sits in the system share sheet, one tap from any reel.', tone: 'light' },
      { id: 'add', title: 'Save to a slate', caption: 'The link comes back with its title, cover and length, so a saved reel is never just a URL.', sheet: true, tone: 'light' },
      { id: 'newslate', title: 'New slate', caption: 'A new film is a title, a type and a date. The reel you were saving comes along as its first inspiration.', tone: 'light' },
      { id: 'fresh', title: 'An empty slate', caption: 'A new slate says what comes next, with its first reel already waiting to be sorted.' },
      { id: 'home', title: 'All slates', caption: 'Every film with its progress at a glance, and the unsorted inbox waiting at the top.' },
      { id: 'overview', title: 'Slate overview', caption: 'One screen answers how far along the film is: shots, runtime, shoot day and what changed.' },
      { id: 'stack', title: 'Sort the inbox', caption: 'The signature: reels come as cards. Swipe right to keep one as a shot, left to let it go.' },
      { id: 'inspo', title: 'Reel detail', caption: 'Marked moments turn a reel into notes you can shoot: a cut point, a colour, a lens.' },
      { id: 'board', title: 'Storyboard', caption: 'Shots in running order with a timeline scaled to their length. Drag a handle to reorder.' },
      { id: 'shot', title: 'Shot detail', caption: 'Framing, lens and length, and a voice note recorded straight onto the shot.' },
      { id: 'script', title: 'Script', caption: 'Real screenplay format, saved as you type, with the element picker above the keyboard.' },
      { id: 'trash', title: 'Trash', caption: 'Nothing is deleted at once. Each item shows the days it has left and comes back with one tap.' }
    ],
    signature: 'stack',
    system: {
      summary: 'A clean, light tool that stays out of the way of the pictures: cool system greys, white cards, Inter on the iOS scale, and one film-leader teal for the thing you can do next. Red appears only while recording and when deleting for good.',
      palette: [
        { token: '--color-bg-grouped', name: 'Grouped grey', value: '#f5f7f9', role: 'Screen background' },
        { token: '--color-bg-surface', name: 'White', value: '#ffffff', role: 'Cards, lists, sheets' },
        { token: '--color-bg-fill', name: 'Fill', value: '#eef0f3', role: 'Controls, chips, wells' },
        { token: '--color-text', name: 'Ink', value: '#14181c', role: 'Titles and body' },
        { token: '--color-text-secondary', name: 'Graphite', value: '#53595f', role: 'Secondary text' },
        { token: '--color-text-tertiary', name: 'Pewter', value: '#686e74', role: 'Captions, metadata' },
        { token: '--color-accent', name: 'Leader teal', value: '#13797e', role: 'The one primary action' },
        { token: '--color-accent-subtle', name: 'Teal wash', value: '#e8f9fa', role: 'Selected rows, badges' },
        { token: '--color-record', name: 'Tally red', value: '#d02b31', role: 'Recording, delete for good' }
      ],
      type: [
        { role: 'Large title', family: 'Inter', sample: 'Slates', spec: '34/41 · 700 · -2%' },
        { role: 'Body', family: 'Inter', sample: 'Purple Line platform', spec: '17/22 · 400' },
        { role: 'Caption', family: 'Inter', sample: 'Wide · 24 mm · 0:06', spec: '13/18 · 500' },
        { role: 'Screenplay', family: 'Courier Prime', sample: 'INT. METRO – NIGHT', spec: '13/16 · 400, script page only' }
      ],
      radius: '20 / 12 / 999',
      contrast: [
        { pair: 'Ink on white', ratio: '17.8:1' }, { pair: 'Ink on grouped grey', ratio: '16.6:1' },
        { pair: 'Graphite on white', ratio: '7.1:1' }, { pair: 'Pewter on grouped grey', ratio: '4.8:1' },
        { pair: 'White on teal', ratio: '5.2:1' }, { pair: 'Teal text on white', ratio: '6.6:1' },
        { pair: 'White on tally red', ratio: '5.2:1' }
      ]
    },

    init() {
      return {
        target: 'metro', note: 'The wiper cleans the frame: use it as the cut into shot 5.',
        newKind: 'Documentary',
        deck: 0, kept: [], skipped: [],
        order: SHOTS.map((_, i) => i), sel: 4, lens: {},
        recording: false, recSec: 0,
        notes: { 4: [{ len: '0:12', text: 'Hold until the wiper clears the frame, then cut.' }, { len: '0:07', text: 'Taillights should bloom red, not orange.' }] },
        el: 'Dialogue',
        trash: [
          { t: 'Flare test, Rain Season', k: 'Shot', d: 27, frame: 'wiper' },
          { t: 'Golden hour at Nandi Hills', k: 'Reel · YouTube', d: 19, frame: 'rooftop' },
          { t: 'Auto stand, Majestic', k: 'Voice note · 0:12', d: 8, frame: 'auto' },
          { t: 'Old cut: Night Shift', k: 'Slate · 4 shots', d: 3, frame: 'mgroad' }
        ],
        restored: [], confirmEmpty: false
      };
    },

    render(id, s, ctx) {
      const top = ctx.safeTop, bot = ctx.safeBottom;
      const nav = (title, o = {}) => `<header class="sl-nav" style="padding-top:${top}px">
        <div class="sl-nav-row">${o.back !== false ? `<button class="sl-navbtn" data-back aria-label="Back">${ic('back')}<span>${o.backLabel || 'Back'}</span></button>` : '<span class="sl-nav-sp"></span>'}
        <span class="sl-nav-title">${o.small || ''}</span>${o.right || '<span class="sl-nav-sp"></span>'}</div>
        ${title ? `<h2 class="sl-large">${title}</h2>` : ''}</header>`;
      const tabbar = active => `<nav class="sl-tabbar" style="bottom:${bot - 8}px" aria-label="Slates">
        <div class="sl-tabs">
          <button class="sl-tab ${active === 'home' ? 'on' : ''}" data-go="home" data-dir="fade">${ic('film')}<span>Slates</span></button>
          <button class="sl-tab ${active === 'stack' ? 'on' : ''}" data-go="stack" data-dir="fade">${ic('inbox')}<span>Inbox</span>${s.deck < REELS.length ? `<i class="sl-badge">${REELS.length - s.deck}</i>` : ''}</button>
          <button class="sl-tab ${active === 'trash' ? 'on' : ''}" data-go="trash" data-dir="fade">${ic('trash')}<span>Trash</span></button>
        </div>
        <button class="sl-fab" data-go="share" data-dir="up" aria-label="Capture a reel">${ic('plus')}</button></nav>`;
      const scroll = (inner, pad = 124) => `<div class="sl-scroll" data-keep-scroll="main" style="padding-bottom:${pad}px">${inner}</div>`;

      switch (id) {
        case 'share': {
          const r = REELS[0];
          return `<div class="sl-scr sl-share">
            <div class="sl-reel-bg">${frame(r.frame, 'sl-reelframe', 'meet')}
              <div class="sl-ig" style="top:${top + 4}px">Reels</div>
              <div class="sl-ig-side">${ic('heart')}<span>18.2K</span>${ic('comment')}<span>214</span>${ic('send')}</div>
            </div>
            <div class="sl-sheet" style="padding-bottom:${bot + 8}px">
              <div class="sl-grab"></div>
              <div class="sl-share-head"><span class="sl-thumb">${frame(r.frame)}</span>
                <div class="sl-min sl-grow"><b class="sl-1l">${r.title}</b><span class="sl-1l sl-sub">instagram.com · ${r.by}</span></div>
                <button class="sl-circle" data-go="home" data-dir="fade" aria-label="Close">${ic('x')}</button></div>
              <div class="sl-apps">
                <span class="sl-app"><i style="background:#1a8cff">${ic('send')}</i><span>AirDrop</span></span>
                <span class="sl-app"><i style="background:#30c759">${ic('comment')}</i><span>Messages</span></span>
                <button class="sl-app hot" data-go="add" data-dir="up"><i class="sl-appicon">${ic('film')}</i><span>Slates</span></button>
                <span class="sl-app"><i style="background:#f5b800">${ic('doc')}</i><span>Notes</span></span>
              </div>
              <div class="sl-group">
                <div class="sl-row"><span class="sl-grow">Copy Link</span>${ic('link', 'dim')}</div>
                <div class="sl-row"><span class="sl-grow">Add to Reading List</span>${ic('glasses', 'dim')}</div>
              </div>
            </div></div>`;
        }

        case 'add': {
          const r = REELS[0];
          return `<div class="sl-scr sl-modal" style="padding-top:${top + 10}px">
            <div class="sl-modal-card">
              <div class="sl-modal-bar"><button class="sl-textbtn" data-back>Cancel</button><b>Save to Slates</b><button class="sl-textbtn strong" data-go="home" data-dir="fade">Save</button></div>
              ${scroll(`
                <div class="sl-card sl-reelcard"><span class="sl-reelthumb">${frame(r.frame)}<i>${r.len}</i></span>
                  <div class="sl-min sl-grow"><span class="sl-sub">${r.src} · ${r.by}</span><b class="sl-2l">${r.title}</b><span class="sl-ok">${ic('check')}Title, cover and length found</span></div></div>
                <p class="sl-label">Note</p>
                <div class="sl-field">${s.note}</div>
                <p class="sl-label">Add to</p>
                <div class="sl-group">${SLATES.map(x => `<button class="sl-row" data-act="target" data-v="${x.id}">
                  <span class="sl-mini">${frame(x.frame)}</span><span class="sl-grow sl-min"><b class="sl-1l">${x.title}</b><span class="sl-sub sl-1l">${x.kind} · ${x.insp} reels</span></span>
                  <span class="sl-radio ${s.target === x.id ? 'on' : ''}">${s.target === x.id ? ic('check') : ''}</span></button>`).join('')}
                </div>
                <div class="sl-group"><button class="sl-row accent" data-go="newslate">${ic('plus')}<span class="sl-grow">New slate from this reel</span></button></div>`, 40)}
            </div></div>`;
        }

        case 'newslate': {
          const r = REELS[1];
          return `<div class="sl-scr sl-modal" style="padding-top:${top + 10}px">
            <div class="sl-modal-card">
              <div class="sl-modal-bar"><button class="sl-textbtn" data-back>Back</button><b>New slate</b><button class="sl-textbtn strong" data-go="fresh" data-dir="fade">Create</button></div>
              ${scroll(`
                <div class="sl-cover">${frame('coffee')}<span class="sl-cover-tag">Cover from first reel</span></div>
                <p class="sl-label">Title</p>
                <div class="sl-field big">Filter Coffee<i class="sl-caret"></i></div>
                <p class="sl-label">Type</p>
                <div class="sl-seg" role="group" aria-label="Type">${['Short film', 'Documentary', 'Music video'].map(k => `<button data-act="kind" data-v="${k}" aria-pressed="${s.newKind === k}">${k}</button>`).join('')}</div>
                <div class="sl-group">
                  <div class="sl-row">${ic('cal', 'tint')}<span class="sl-grow">Shoot day</span><span class="sl-val">Sun 16 Nov</span></div>
                  <div class="sl-row">${ic('person', 'tint')}<span class="sl-grow">Director</span><span class="sl-val">G. Rathod</span></div>
                </div>
                <p class="sl-label">First inspiration</p>
                <div class="sl-card sl-reelcard"><span class="sl-reelthumb sm">${frame(r.frame)}</span>
                  <div class="sl-min sl-grow"><b class="sl-2l">${r.title}</b><span class="sl-sub">${r.src} · ${r.len}</span></div></div>`, 40)}
            </div></div>`;
        }

        case 'fresh': return `<div class="sl-scr">
            ${nav('Filter Coffee', { backLabel: 'Slates', right: `<button class="sl-circle" data-act="toast" data-v="Rename, share or delete" aria-label="More">${ic('more')}</button>` })}
            ${scroll(`<p class="sl-sub pad">Documentary · created just now</p>
              <div class="sl-empty">
                <div class="sl-empty-art" aria-hidden="true"><span></span><span></span><span></span></div>
                <h3>No shots yet</h3>
                <p>Sort your first reel to start the storyboard. Keep what you would shoot, skip the rest.</p>
                <button class="sl-btn" data-go="stack">Sort 1 reel</button>
              </div>
              <div class="sl-group">
                <div class="sl-row">${ic('inbox', 'tint')}<span class="sl-grow">Inspirations</span><span class="sl-val">1 to sort</span></div>
                <div class="sl-row">${ic('scene', 'tint')}<span class="sl-grow">Storyboard</span><span class="sl-val">Empty</span></div>
                <div class="sl-row">${ic('doc', 'tint')}<span class="sl-grow">Script</span><span class="sl-val">Not started</span></div>
              </div>`, 40)}
          </div>`;

        case 'home': {
          const left = REELS.length - s.deck;
          return `<div class="sl-scr">
            ${nav('Slates', { back: false, right: `<button class="sl-circle" data-act="toast" data-v="Search slates, shots and notes" aria-label="Search">${ic('search')}</button>` })}
            ${scroll(`
              ${left ? `<button class="sl-inbox" data-go="stack">
                <span class="sl-inbox-stack"><i>${frame(REELS[2].frame)}</i><i>${frame(REELS[1].frame)}</i><i>${frame(REELS[0].frame)}</i></span>
                <span class="sl-grow sl-min"><b>${left} reels to sort</b><span class="sl-sub sl-2l">Saved from Instagram and YouTube this week</span></span>${ic('next', 'dim')}</button>` : ''}
              <div class="sl-section"><h3>In progress</h3><span class="sl-sub">3 films</span></div>
              ${SLATES.map(x => `<button class="sl-slate" data-go="${x.id === 'coffee' ? 'fresh' : 'overview'}">
                <span class="sl-slate-cover">${frame(x.frame)}${x.fresh ? `<i class="sl-pill">${x.fresh} new</i>` : ''}</span>
                <span class="sl-slate-body"><b class="sl-1l">${x.title}</b><span class="sl-sub sl-1l">${x.kind} · shoot ${x.shoot}</span>
                <span class="sl-progress"><i style="width:${Math.round(Math.min(1, x.shots / 9) * 100)}%"></i></span>
                <span class="sl-counts"><span>${x.shots} shots</span><span>${x.insp} reels</span><span>${x.pages} pages</span></span></span></button>`).join('')}`)}
            ${tabbar('home')}</div>`;
        }

        case 'overview': {
          const x = SLATES[0];
          return `<div class="sl-scr">
            ${nav('', { backLabel: 'Slates', right: `<button class="sl-circle" data-act="toast" data-v="Shared with Ravi and Meghna" aria-label="Share">${ic('send')}</button>` })}
            ${scroll(`
              <div class="sl-hero">${frame(x.frame)}</div>
              <h2 class="sl-title2">${x.title}</h2>
              <p class="sl-sub pad">${x.kind} · Anu misses the last train, then doesn't.</p>
              <div class="sl-stats"><div><b>${x.shots}</b><span>shots</span></div><div><b>${fmt(SHOTS.reduce((a, b) => a + b.sec, 0))}</b><span>runtime</span></div><div><b>8 Nov</b><span>shoot day</span></div></div>
              <div class="sl-group">
                <button class="sl-row" data-go="stack">${ic('inbox', 'tint')}<span class="sl-grow">Inspirations</span>${REELS.length - s.deck ? `<span class="sl-chip">${REELS.length - s.deck} new</span>` : ''}<span class="sl-val">14</span>${ic('next', 'dim')}</button>
                <button class="sl-row" data-go="board">${ic('scene', 'tint')}<span class="sl-grow">Storyboard</span><span class="sl-val">9 shots</span>${ic('next', 'dim')}</button>
                <button class="sl-row" data-go="script">${ic('doc', 'tint')}<span class="sl-grow">Script</span><span class="sl-val">6 pages</span>${ic('next', 'dim')}</button>
                <button class="sl-row" data-go="shot">${ic('wave', 'tint')}<span class="sl-grow">Voice notes</span><span class="sl-val">3</span>${ic('next', 'dim')}</button>
              </div>
              <div class="sl-section"><h3>Recent</h3></div>
              <div class="sl-group">
                <div class="sl-row"><span class="sl-mini">${frame('wiper')}</span><span class="sl-grow sl-min"><b class="sl-1l">Voice note on shot 5</b><span class="sl-sub">Today, 21:40</span></span></div>
                <div class="sl-row"><span class="sl-mini">${frame('dosa')}</span><span class="sl-grow sl-min"><b class="sl-1l">Kept “Steam on a dosa tawa”</b><span class="sl-sub">Yesterday</span></span></div>
                <div class="sl-row"><span class="sl-mini sl-docmini">${ic('doc')}</span><span class="sl-grow sl-min"><b class="sl-1l">Script page 4 edited</b><span class="sl-sub">Mon 20 Oct</span></span></div>
              </div>`, 40)}
          </div>`;
        }

        case 'stack': {
          const left = REELS.length - s.deck;
          if (!left) return `<div class="sl-scr">
            ${nav('Inbox', { back: false })}
            ${scroll(`<div class="sl-empty"><div class="sl-done">${ic('check')}</div><h3>Inbox sorted</h3>
              <p>${s.kept.length} kept as shots, ${s.skipped.length} let go. New reels you save will wait here.</p>
              <button class="sl-btn" data-go="board">Open the storyboard</button>
              <button class="sl-textbtn" data-act="resetdeck">Sort again</button></div>`)}
            ${tabbar('stack')}</div>`;
          const cards = [];
          for (let i = Math.min(REELS.length - 1, s.deck + 2); i >= s.deck; i--) {
            const r = REELS[i], d = i - s.deck;
            cards.push(`<article class="sl-dcard" data-depth="${d}" ${d === 0 ? 'data-top="1"' : ''} style="--d:${d}">
              ${frame(r.frame)}
              <span class="sl-stamp keep">Keep</span><span class="sl-stamp skip">Skip</span>
              <div class="sl-dcap"><span class="sl-dsrc">${r.src} · ${r.len}</span><b class="sl-2l">${r.title}</b><span class="sl-1l">${r.by}</span></div>
            </article>`);
          }
          return `<div class="sl-scr">
            ${nav('Inbox', { back: false, right: `<span class="sl-count">${s.deck + 1} of ${REELS.length}</span>` })}
            <p class="sl-sub pad sl-deckhint">For Last Metro to Whitefield · swipe right to keep</p>
            <div class="sl-deck" style="bottom:${bot + 170}px">${cards.join('')}</div>
            <div class="sl-deckbtns" style="bottom:${bot + 86}px">
              <button class="sl-round" data-act="swipe" data-v="skip" aria-label="Skip">${ic('x')}</button>
              <button class="sl-round sm" data-go="inspo" aria-label="Details">${ic('info')}</button>
              <button class="sl-round keep" data-act="swipe" data-v="keep" aria-label="Keep as a shot">${ic('check')}</button>
            </div>
            ${tabbar('stack')}</div>`;
        }

        case 'inspo': {
          const r = REELS[Math.min(s.deck, REELS.length - 1)];
          return `<div class="sl-scr">
            ${nav('', { backLabel: 'Inbox' })}
            ${scroll(`
              <div class="sl-player">${frame(r.frame)}<span class="sl-play">${ic('play')}</span>
                <div class="sl-scrub"><span class="sl-track"><i style="width:34%"></i><b style="left:34%"></b></span><span class="sl-times"><span>0:06</span><span>${r.len}</span></span></div></div>
              <p class="sl-sub pad">${r.src} · ${r.by}</p>
              <h2 class="sl-title2">${r.title}</h2>
              <div class="sl-note">${ic('pen', 'tint')}<p>${s.note}</p></div>
              <div class="sl-section"><h3>Marked moments</h3><span class="sl-sub">3</span></div>
              <div class="sl-group">
                <div class="sl-row"><span class="sl-time">0:04</span><span class="sl-grow sl-min"><b class="sl-1l">Wiper clears the frame</b><span class="sl-sub">Cut point</span></span></div>
                <div class="sl-row"><span class="sl-time">0:11</span><span class="sl-grow sl-min"><b class="sl-1l">Taillights bloom red</b><span class="sl-sub">Colour</span></span></div>
                <div class="sl-row"><span class="sl-time">0:16</span><span class="sl-grow sl-min"><b class="sl-1l">Focus pulls to the drops</b><span class="sl-sub">Lens · 85 mm</span></span></div>
              </div>
              <button class="sl-btn wide" data-go="shot">Use in shot 5</button>`, 40)}
          </div>`;
        }

        case 'board': {
          const total = SHOTS.reduce((a, b) => a + b.sec, 0);
          return `<div class="sl-scr">
            ${nav('Storyboard', { backLabel: 'Overview', right: `<button class="sl-circle" data-act="toast" data-v="New shot" aria-label="Add shot">${ic('plus')}</button>` })}
            ${scroll(`
              <p class="sl-sub pad">Last Metro to Whitefield · ${s.order.length} shots · ${fmt(total)}</p>
              <div class="sl-timeline" aria-label="Timeline">${s.order.map(i => `<i style="flex:${SHOTS[i].sec}">${frame(SHOTS[i].frame)}</i>`).join('')}</div>
              <ol class="sl-shots">${s.order.map((i, n) => {
                const x = SHOTS[i];
                return `<li class="sl-shotrow" data-idx="${n}">
                  <button class="sl-shotmain" data-act="openshot" data-v="${i}"><span class="sl-shotthumb">${frame(x.frame)}<i>${n + 1}</i></span>
                  <span class="sl-grow sl-min"><b class="sl-2l">${x.t}</b><span class="sl-sub sl-1l">${x.size} · ${s.lens[i] || x.lens} mm · ${fmt(x.sec)}</span></span></button>
                  <button class="sl-handle" data-handle="${n}" aria-label="Reorder shot ${n + 1}">${ic('grip')}</button></li>`;
              }).join('')}</ol>`, 40)}
          </div>`;
        }

        case 'shot': {
          const i = s.sel, x = SHOTS[i], lens = s.lens[i] || x.lens, notes = s.notes[i] || [];
          return `<div class="sl-scr">
            ${nav('', { backLabel: 'Storyboard', small: `Shot ${s.order.indexOf(i) + 1} of 9` })}
            ${scroll(`
              <div class="sl-hero thirds">${frame(x.frame)}<span class="sl-grid"></span><span class="sl-frameinfo">${lens} mm · 2.39:1</span></div>
              <h2 class="sl-title2">${x.t}</h2>
              <div class="sl-specs"><div><span>Size</span><b>${x.size}</b></div><div><span>Move</span><b>${x.move}</b></div><div><span>Length</span><b>${fmt(x.sec)}</b></div></div>
              <p class="sl-label">Lens</p>
              <div class="sl-seg" role="group" aria-label="Lens">${[16, 24, 35, 50, 85].map(l => `<button data-act="lens" data-v="${l}" aria-pressed="${lens === l}">${l} mm</button>`).join('')}</div>
              <div class="sl-section"><h3>Voice notes</h3><span class="sl-sub">${notes.length}</span></div>
              <div class="sl-rec ${s.recording ? 'on' : ''}">
                <div class="sl-wave" aria-hidden="true">${Array.from({ length: 30 }, (_, k) => `<i style="--h:${s.recording ? 20 : 10 + ((k * 37) % 9) * 2}%"></i>`).join('')}</div>
                <div class="sl-recrow"><span class="sl-rectime">${s.recording ? 'Recording · ' + fmt(s.recSec) : 'Tap to record a note'}</span>
                <button class="sl-recbtn ${s.recording ? 'on' : ''}" data-act="rec" aria-label="${s.recording ? 'Stop recording' : 'Record a voice note'}">${ic(s.recording ? 'stop' : 'mic')}</button></div>
              </div>
              <div class="sl-group">${notes.map(n => `<div class="sl-row"><span class="sl-vplay">${ic('play')}</span><span class="sl-grow sl-min"><b class="sl-2l">${n.text}</b><span class="sl-sub">${n.len}</span></span></div>`).join('') || '<div class="sl-row"><span class="sl-sub">No notes on this shot yet.</span></div>'}</div>`, 40)}
          </div>`;
        }

        case 'script': return `<div class="sl-scr">
            ${nav('', { backLabel: 'Overview', small: 'Page 4 of 6', right: `<span class="sl-saved" data-saved>${ic('check')}Saved</span>` })}
            <div class="sl-scroll sl-scriptwrap" data-keep-scroll="main">
              <div class="sl-page" contenteditable="true" spellcheck="false" aria-label="Script page 4">
                <p class="sh">4. EXT. HALASURU – DOSA STALL – NIGHT</p>
                <p class="ac">Rain has thinned to a drizzle. A single bulb swings over a black tawa. Steam lifts into the light.</p>
                <p class="ac">ANU (24), soaked, phone at 4%, stops at the counter.</p>
                <p class="ch">MURTHY</p><p class="pa">(not looking up)</p><p class="di">Last metro gone?</p>
                <p class="ch">ANU</p><p class="di">Eleven fifty-eight. I watched the doors close.</p>
                <p class="ac">He pours batter. It spreads in one slow circle.</p>
                <p class="ch">MURTHY</p><p class="di">Then you have time for one.</p>
                <p class="tr">CUT TO:</p>
                <p class="sh">5. INT. CAB – MOVING – NIGHT</p>
                <p class="ac">Rain on the windscreen. The wiper clears it, and the city blooms red behind.</p>
              </div>
            </div>
            <div class="sl-elbar" style="padding-bottom:${bot + 6}px" role="group" aria-label="Element">${['Scene', 'Action', 'Character', 'Dialogue'].map(e => `<button data-act="el" data-v="${e}" aria-pressed="${s.el === e}">${e}</button>`).join('')}</div>
          </div>`;

        case 'trash': return `<div class="sl-scr">
            ${nav('Trash', { back: false, right: s.trash.length ? `<button class="sl-textbtn danger" data-act="askempty">Empty</button>` : '<span class="sl-nav-sp"></span>' })}
            ${scroll(`
              <p class="sl-sub pad">Items stay for 30 days, then they're deleted for good.</p>
              ${s.confirmEmpty ? `<div class="sl-confirm"><b>Delete ${s.trash.length} items for good?</b><p class="sl-sub">This can't be undone.</p><div class="sl-confirm-btns"><button class="sl-btn ghost" data-act="cancelempty">Cancel</button><button class="sl-btn danger" data-act="doempty">Delete</button></div></div>` : ''}
              ${s.trash.length ? `<div class="sl-group">${s.trash.map((t, i) => `<div class="sl-row tall"><span class="sl-mini">${frame(t.frame)}</span>
                <span class="sl-grow sl-min"><b class="sl-1l">${t.t}</b><span class="sl-sub sl-1l">${t.k} · ${t.d} days left</span><span class="sl-days"><i style="width:${(t.d / 30) * 100}%"></i></span></span>
                <button class="sl-restore" data-act="restore" data-v="${i}">Restore</button></div>`).join('')}</div>`
              : `<div class="sl-empty small"><div class="sl-done grey">${ic('trash')}</div><h3>Trash is empty</h3><p>Deleted shots, reels and notes wait here for 30 days.</p></div>`}
              ${s.restored.length ? `<div class="sl-section"><h3>Recently restored</h3></div><div class="sl-group">${s.restored.map(t => `<div class="sl-row"><span class="sl-mini">${frame(t.frame)}</span><span class="sl-grow sl-min"><b class="sl-1l">${t.t}</b><span class="sl-sub">Back where it was</span></span>${ic('check', 'ok')}</div>`).join('')}</div>` : ''}`)}
            ${tabbar('trash')}</div>`;
      }
      return '';
    },

    action(name, v, s, ctx) {
      switch (name) {
        case 'target': s.target = v; break;
        case 'kind': s.newKind = v; break;
        case 'toast': ctx.toast(v); return false;
        case 'swipe': {
          const card = ctx.phone.layer.querySelector('.sl-dcard[data-top]');
          if (card) fling(card, v === 'keep' ? 1 : -1, () => commit(s, ctx, v));
          else commit(s, ctx, v);
          return false;
        }
        case 'resetdeck': s.deck = 0; s.kept = []; s.skipped = []; break;
        case 'openshot': s.sel = +v; s.recording = false; ctx.go('shot'); return false;
        case 'lens': s.lens[s.sel] = +v; break;
        case 'rec':
          if (s.recording) {
            s.recording = false;
            (s.notes[s.sel] = s.notes[s.sel] || []).unshift({ len: fmt(Math.max(1, s.recSec)), text: 'New voice note' });
            ctx.toast('Voice note saved to the shot');
          } else { s.recording = true; s.recSec = 0; }
          break;
        case 'el': s.el = v; break;
        case 'restore': { const t = s.trash.splice(+v, 1)[0]; if (t) { s.restored.unshift(t); ctx.toast('Restored'); } break; }
        case 'askempty': s.confirmEmpty = true; break;
        case 'cancelempty': s.confirmEmpty = false; break;
        case 'doempty': s.trash = []; s.confirmEmpty = false; break;
      }
    },

    mount(root, s, ctx, id) {
      const offs = [];
      const on = (el, ev, fn, o) => { el.addEventListener(ev, fn, o); offs.push(() => el.removeEventListener(ev, fn, o)); };
      const sc = () => ctx.phone.scale || 1;

      if (id === 'stack') {
        const card = root.querySelector('.sl-dcard[data-top]');
        const next = root.querySelector('.sl-dcard[data-depth="1"]');
        if (card) {
          let x0 = 0, y0 = 0, dx = 0, dy = 0, t0 = 0, active = false;
          const keep = card.querySelector('.keep'), skip = card.querySelector('.skip');
          const paint = () => {
            card.style.transform = `translate(${dx}px, ${dy * .25}px) rotate(${dx / 18}deg)`;
            keep.style.opacity = Math.max(0, Math.min(1, dx / 90));
            skip.style.opacity = Math.max(0, Math.min(1, -dx / 90));
            const k = Math.min(1, Math.abs(dx) / 140);
            if (next) next.style.transform = `translateY(${12 - k * 12}px) scale(${.95 + k * .05})`;
          };
          on(card, 'pointerdown', e => {
            active = true; x0 = e.clientX; y0 = e.clientY; dx = dy = 0; t0 = performance.now();
            card.style.transition = 'none'; if (next) next.style.transition = 'none';
            try { card.setPointerCapture(e.pointerId); } catch (_) {}
          });
          on(card, 'pointermove', e => { if (!active) return; dx = (e.clientX - x0) / sc(); dy = (e.clientY - y0) / sc(); paint(); });
          const end = () => {
            if (!active) return; active = false;
            const v = Math.abs(dx) / Math.max(1, performance.now() - t0);
            if (Math.abs(dx) > 100 || (v > .6 && Math.abs(dx) > 40)) { const dir = dx > 0 ? 1 : -1; fling(card, dir, () => commit(s, ctx, dir > 0 ? 'keep' : 'skip')); }
            else {
              card.style.transition = 'transform .55s cubic-bezier(.34,1.56,.64,1)';
              if (next) next.style.transition = 'transform .4s ease';
              keep.style.opacity = skip.style.opacity = 0;
              dx = dy = 0; paint();
            }
          };
          on(card, 'pointerup', end); on(card, 'pointercancel', end);
        }
      }

      if (id === 'board') {
        const list = root.querySelector('.sl-shots');
        root.querySelectorAll('.sl-handle').forEach(h => {
          on(h, 'pointerdown', e => {
            e.preventDefault();
            const from = +h.dataset.handle, rows = [...list.children], row = rows[from];
            const H = row.getBoundingClientRect().height / sc() + 8;
            const y0 = e.clientY; let to = from;
            row.classList.add('lift');
            try { h.setPointerCapture(e.pointerId); } catch (_) {}
            const move = ev => {
              const dy = (ev.clientY - y0) / sc();
              row.style.transform = `translateY(${dy}px)`;
              to = Math.max(0, Math.min(rows.length - 1, from + Math.round(dy / H)));
              rows.forEach((r, k) => {
                if (k === from) return;
                const shift = (from < to && k > from && k <= to) ? -H : (from > to && k < from && k >= to) ? H : 0;
                r.style.transform = shift ? `translateY(${shift}px)` : '';
              });
            };
            const up = () => {
              h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', up); h.removeEventListener('pointercancel', up);
              if (to !== from) { const it = s.order.splice(from, 1)[0]; s.order.splice(to, 0, it); }
              ctx.rerender();
            };
            h.addEventListener('pointermove', move); h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
          });
        });
      }

      if (id === 'shot' && s.recording) {
        const bars = [...root.querySelectorAll('.sl-wave i')], time = root.querySelector('.sl-rectime');
        let k = 0;
        const t = setInterval(() => {
          k++;
          bars.forEach((b, j) => {
            const a = Math.abs(Math.sin(k * .7 + j * .55)) * .65 + Math.abs(Math.sin(k * .23 + j * 1.7)) * .35;
            b.style.setProperty('--h', Math.round(14 + a * 80) + '%');
          });
          if (k % 8 === 0) { s.recSec++; if (time) time.textContent = 'Recording · ' + fmt(s.recSec); }
        }, 120);
        offs.push(() => clearInterval(t));
      }

      if (id === 'script') {
        const page = root.querySelector('.sl-page'), saved = root.querySelector('[data-saved]');
        let t;
        on(page, 'input', () => {
          saved.textContent = 'Saving…'; saved.classList.add('busy');
          clearTimeout(t); t = setTimeout(() => { saved.innerHTML = ic('check') + 'Saved'; saved.classList.remove('busy'); }, 700);
        });
        offs.push(() => clearTimeout(t));
      }

      return () => offs.forEach(f => f());
    }
  };

  function fling(card, dir, done) {
    card.style.transition = 'transform .32s cubic-bezier(.4,0,1,1), opacity .32s';
    card.style.transform = `translate(${dir * 460}px, 30px) rotate(${dir * 22}deg)`;
    card.style.opacity = '0';
    const st = card.querySelector(dir > 0 ? '.keep' : '.skip'); if (st) st.style.opacity = 1;
    let fired = false; const fire = () => { if (!fired) { fired = true; done(); } };
    card.addEventListener('transitionend', fire, { once: true });
    setTimeout(fire, 360);
  }
  function commit(s, ctx, v) {
    if (s.deck >= REELS.length) return;
    (v === 'keep' ? s.kept : s.skipped).push(s.deck);
    s.deck++;
    if (v === 'keep') ctx.toast('Kept as a shot');
    ctx.rerender();
  }

  (window.APPS = window.APPS || {})[app.id] = app;
})();
