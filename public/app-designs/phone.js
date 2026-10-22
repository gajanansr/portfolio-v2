/* Phone runtime. Apps register on window.APPS[id]; see src/apps/CONTRACT.md. */
(() => {
  const APPS = (window.APPS = window.APPS || {});
  const DEV = {
    ios: { w: 390, h: 844, pad: 11, safeTop: 54, safeBottom: 34 },
    android: { w: 412, h: 892, pad: 10, safeTop: 40, safeBottom: 24 }
  };
  const SB = {
    ios: `<span>9:41</span><svg viewBox="0 0 78 13" fill="currentColor" aria-hidden="true"><rect x="0" y="8.5" width="3.2" height="4.5" rx="1"/><rect x="5.2" y="6" width="3.2" height="7" rx="1"/><rect x="10.4" y="3.2" width="3.2" height="9.8" rx="1"/><rect x="15.6" y="0.5" width="3.2" height="12.5" rx="1"/><path d="M33.5 3.6a10.5 10.5 0 0 1 13.4 0l-1.7 1.8a8 8 0 0 0-10 0zM36.4 6.7a6 6 0 0 1 7.6 0L40.2 10.6z"/><rect x="53.5" y=".7" width="22.5" height="11.6" rx="3.6" fill="none" stroke="currentColor" opacity=".4"/><rect x="55.5" y="2.7" width="16.5" height="7.6" rx="2"/><path d="M77.2 4.6v3.8a2 2 0 0 0 0-3.8z" opacity=".4"/></svg>`,
    android: `<span>9:41</span><svg viewBox="0 0 52 14" fill="currentColor" aria-hidden="true"><path d="M2 5.2a9.5 9.5 0 0 1 13 0L8.5 12.5z"/><path d="M19 13 29 3v10z"/><rect x="36" y="2" width="8" height="11" rx="1.5"/><rect x="38.5" y=".6" width="3" height="2" rx=".6"/></svg>`
  };

  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  class Phone {
    constructor(host, appId, opts = {}) {
      const app = APPS[appId];
      if (!app) throw new Error('No app ' + appId);
      this.app = app; this.host = host; this.static = !!opts.static;
      this.dev = DEV[app.platform || 'ios'];
      this.state = app.init ? app.init() : {};
      if (opts.state) Object.assign(this.state, opts.state);
      this.stack = [];
      this.cleanup = null;
      const d = this.dev;
      this.root = el(`<div class="ph${this.static ? ' static' : ''}" ${this.static ? 'aria-hidden="true"' : ''}>
        <div class="ph-dev ${app.platform || 'ios'}" data-ui>
          <div class="ph-scr app-${app.id}" style="width:${d.w}px;height:${d.h}px">
            <div class="ph-sb">${SB[app.platform || 'ios']}</div><div class="ph-island"></div><div class="ph-home"></div>
          </div></div></div>`);
      host.innerHTML = ''; host.appendChild(this.root);
      this.devEl = this.root.querySelector('.ph-dev');
      this.scr = this.root.querySelector('.ph-scr');
      this.sb = this.root.querySelector('.ph-sb');
      this.homeEl = this.root.querySelector('.ph-home');
      this.ctx = {
        platform: app.platform || 'ios', static: this.static,
        safeTop: d.safeTop, safeBottom: d.safeBottom, width: d.w, height: d.h,
        go: (id, dir) => this.go(id, dir || 'push'),
        back: () => this.back(),
        rerender: () => this.rerender(),
        toast: (m) => this.toast(m),
        get screen() { return this._p.current; },
        _p: this,
        phone: this
      };
      this.setScale(opts.scale || 1);
      if (!this.static) this.bind();
      this.current = null;
      this.go(opts.screen || app.screens[0].id, 'none');
    }
    setScale(s) {
      const d = this.dev; const ow = d.w + d.pad * 2, oh = d.h + d.pad * 2;
      this.scale = s;
      this.devEl.style.transform = `scale(${s})`;
      this.root.style.width = ow * s + 'px'; this.root.style.height = oh * s + 'px';
    }
    fitTo(w, h) {
      const d = this.dev; const ow = d.w + d.pad * 2, oh = d.h + d.pad * 2;
      this.setScale(Math.min(w / ow, h ? h / oh : Infinity));
    }
    meta(id) { return this.app.screens.find(s => s.id === id) || {}; }
    paint(layer, id) {
      layer.innerHTML = this.app.render(id, this.state, this.ctx);
      const tone = this.meta(id).tone || this.app.tone || 'dark';
      const light = typeof tone === 'function' ? tone(this.state) === 'light' : tone === 'light';
      this.sb.classList.toggle('light', light);
      this.homeEl.classList.toggle('light', light);
    }
    mount(layer, id) {
      if (this.cleanup) { try { this.cleanup(); } catch (e) {} this.cleanup = null; }
      if (this.app.mount && !this.static) this.cleanup = this.app.mount(layer, this.state, this.ctx, id) || null;
    }
    go(id, dir = 'push') {
      if (dir === 'push' && this.current) this.stack.push(this.current);
      if (dir === 'up' && this.current) this.stack.push(this.current);
      if (dir === 'none' || dir === 'fade' || dir === 'reset') { if (dir === 'reset') this.stack = []; }
      const old = this.layer;
      const layer = document.createElement('div');
      layer.className = 'ph-layer'; layer.dataset.screen = id;
      this.current = id; this.layer = layer;
      this.paint(layer, id);
      this.scr.insertBefore(layer, this.sb);
      const anim = this.static || dir === 'none' || dir === 'reset' ? null : dir;
      if (old) {
        if (anim) {
          const map = { push: ['in-push', 'out-push'], pop: ['in-pop', 'out-pop'], up: ['in-up', null], down: ['in-fade', 'out-down'], fade: ['in-fade', null] };
          const [i, o] = map[anim] || map.fade;
          if (o) old.classList.add(o); if (i) layer.classList.add(i);
          if (anim === 'up') old.style.zIndex = 1;
          if (anim === 'pop' || anim === 'down') { this.scr.insertBefore(old, this.sb); }
          setTimeout(() => old.remove(), 470);
        } else old.remove();
      }
      this.mount(layer, id);
      this.host.dispatchEvent(new CustomEvent('phone:screen', { bubbles: true, detail: { app: this.app.id, screen: id } }));
    }
    back() {
      const prev = this.stack.pop(); if (!prev) return;
      const wasUp = this.meta(this.current).sheet;
      this.go(prev, wasUp ? 'down' : 'pop');
    }
    rerender() {
      if (!this.layer) return;
      const keep = [...this.layer.querySelectorAll('[data-keep-scroll]')].map(n => [n.dataset.keepScroll, n.scrollTop, n.scrollLeft]);
      this.paint(this.layer, this.current);
      keep.forEach(([k, t, l]) => { const n = this.layer.querySelector(`[data-keep-scroll="${k}"]`); if (n) { n.scrollTop = t; n.scrollLeft = l; } });
      this.mount(this.layer, this.current);
    }
    toast(msg) {
      if (this.static) return;
      const t = el(`<div class="ph-toast" role="status">${msg}</div>`);
      this.scr.appendChild(t); setTimeout(() => t.remove(), 2300);
    }
    bind() {
      this.scr.addEventListener('click', e => {
        const t = e.target.closest('[data-go],[data-back],[data-act]');
        if (!t || !this.scr.contains(t)) return;
        if (t.hasAttribute('data-back')) { e.preventDefault(); this.back(); return; }
        if (t.dataset.go) { e.preventDefault(); this.go(t.dataset.go, t.dataset.dir || 'push'); return; }
        if (t.dataset.act && this.app.action) {
          e.preventDefault();
          const before = this.current;
          const r = this.app.action(t.dataset.act, t.dataset.v, this.state, this.ctx, t);
          if (r !== false && this.current === before) this.rerender();
        }
      });
    }
    destroy() { if (this.cleanup) this.cleanup(); this.root.remove(); }
  }
  window.Phone = Phone;
})();
