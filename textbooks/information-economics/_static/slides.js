/* HTML lecture slides for the Information Economics textbook (ECON20512).
   - Steps: elements with data-ov="a-b" (and maths with class ov-a-b) are
     shown only on steps a to b of their slide, as Beamer overlays are.
   - Keys (when the slides have focus or are full screen): right arrow, down
     arrow, Page Down or space = next step; left, up, Page Up = previous step;
     Home / End = first / last slide; F = full screen; P = pen; H = highlighter;
     E = eraser; Esc = stop annotating.
   - Annotations: pen, highlighter and eraser on each slide. They are saved in
     this browser only (localStorage), separately for each deck and slide, so
     each student's notes are private to their own device. */
(function () {
  'use strict';
  var OVRX = /(?:^|\s)ov-(\d+)-(\d+)(?:\s|$)/;
  var COLOURS = [['#8C2F5A', 'Plum'], ['#1F4E9A', 'Blue'], ['#B03A2E', 'Red'], ['#2F3034', 'Black']];
  var HIGHLIGHT = 'rgba(232, 178, 30, 0.38)';

  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }

  function Deck(root, idx) {
    var self = this;
    this.root = root;
    this.slug = (location.pathname.split('/').pop() || 'deck').replace(/\.html$/, '') + '-' + idx;
    this.slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    this.k = 0; this.step = 1;
    this.pos = root.querySelector('.d-pos');
    this.live = document.createElement('div');
    this.live.className = 'visually-hidden sr-only';
    this.live.setAttribute('aria-live', 'polite');
    this.live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);';
    root.appendChild(this.live);
    var saved = store('ie-slide-pos:' + this.slug);
    if (saved && saved.k < this.slides.length) { this.k = saved.k; this.step = 1; }

    root.querySelector('.d-next').addEventListener('click', function () { self.next(); });
    root.querySelector('.d-prev').addEventListener('click', function () { self.prev(); });
    var all = root.querySelector('.d-all');
    all.addEventListener('click', function () {
      var on = !root.classList.contains('all-steps');
      root.classList.toggle('all-steps', on);
      all.setAttribute('aria-pressed', String(on));
      self.slides.forEach(function (s, i) { s.hidden = on ? false : i !== self.k; });
      if (!on) self.show();
    });
    root.querySelector('.d-full').addEventListener('click', function () { self.fullscreen(); });
    this.buildInk();
    document.addEventListener('keydown', function (e) { self.key(e); });
    document.addEventListener('fullscreenchange', function () { self.redraw(); });
    window.addEventListener('resize', function () { self.redraw(); });
    this.show();
    if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise.then(function () { self.show(); });
    }
  }

  Deck.prototype.active = function () {
    return document.fullscreenElement === this.root || this.root.contains(document.activeElement);
  };
  Deck.prototype.key = function (e) {
    if (!this.active() || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ') { this.next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { this.prev(); }
    else if (k === 'Home') { this.go(0, 1); }
    else if (k === 'End') { this.go(this.slides.length - 1, 1); }
    else if (k === 'f' || k === 'F') { this.fullscreen(); }
    else if (k === 'p' || k === 'P') { this.setTool('pen'); }
    else if (k === 'h' || k === 'H') { this.setTool('hl'); }
    else if (k === 'e' || k === 'E') { this.setTool('erase'); }
    else if (k === 'Escape') { if (this.tool) { this.setTool(null); } else return; }
    else return;
    e.preventDefault();
  };
  Deck.prototype.steps = function () { return parseInt(this.slides[this.k].getAttribute('data-steps') || '1', 10); };
  Deck.prototype.next = function () {
    if (this.root.classList.contains('all-steps')) return;
    if (this.step < this.steps()) { this.step++; this.show(); }
    else if (this.k < this.slides.length - 1) { this.go(this.k + 1, 1); }
  };
  Deck.prototype.prev = function () {
    if (this.root.classList.contains('all-steps')) return;
    if (this.step > 1) { this.step--; this.show(); }
    else if (this.k > 0) { this.k--; this.step = this.steps(); this.show(true); }
  };
  Deck.prototype.go = function (k, step) { this.k = k; this.step = step; this.show(true); };
  Deck.prototype.show = function (announce) {
    var self = this, s = this.slides[this.k];
    if (!this.root.classList.contains('all-steps')) {
      this.slides.forEach(function (x, i) { x.hidden = i !== self.k; });
    }
    var st = this.step;
    s.querySelectorAll('[data-ov]').forEach(function (el) {
      var r = el.getAttribute('data-ov').split('-');
      el.classList.toggle('ov-off', st < +r[0] || st > +r[1]);
    });
    s.querySelectorAll('[class*="ov-"]').forEach(function (el) {
      var c = el.getAttribute('class') || '', m = OVRX.exec(c);
      if (!m) return;
      var off = st < +m[1] || st > +m[2];
      if (el.classList) el.classList.toggle('ov-off', off);
    });
    this.pos.textContent = 'Slide ' + (this.k + 1) + ' of ' + this.slides.length +
      (this.steps() > 1 ? ' · step ' + st + ' of ' + this.steps() : '');
    if (announce) this.live.textContent = s.getAttribute('aria-label') || '';
    store('ie-slide-pos:' + this.slug, { k: this.k });
    this.redraw();
  };
  Deck.prototype.fullscreen = function () {
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else if (this.root.requestFullscreen) { this.root.requestFullscreen(); this.root.focus(); }
  };

  /* ---------------- annotation ---------------- */
  Deck.prototype.buildInk = function () {
    var self = this, bar = this.root.querySelector('.deck-bar');
    var stage = this.root.querySelector('.deck-stage');
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'ink';
    this.canvas.setAttribute('aria-hidden', 'true');
    stage.appendChild(this.canvas);
    this.colour = COLOURS[0][0]; this.tool = null;
    var sep = document.createElement('span'); sep.className = 'd-sep'; bar.appendChild(sep);
    this.btn = {};
    [['pen', 'Pen'], ['hl', 'Highlighter'], ['erase', 'Eraser']].forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = t[1]; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { self.setTool(self.tool === t[0] ? null : t[0]); });
      bar.appendChild(b); self.btn[t[0]] = b;
    });
    this.sw = [];
    COLOURS.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'd-swatch'; b.style.background = c[0];
      b.setAttribute('aria-label', c[1] + ' pen'); b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () {
        self.colour = c[0]; self.sw.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        if (self.tool !== 'pen') self.setTool('pen');
      });
      bar.appendChild(b); self.sw.push(b);
    });
    var undo = document.createElement('button');
    undo.type = 'button'; undo.textContent = 'Undo';
    undo.addEventListener('click', function () { var a = self.ink(); a.pop(); self.saveInk(a); self.redraw(); });
    var clr = document.createElement('button');
    clr.type = 'button'; clr.textContent = 'Clear slide';
    clr.addEventListener('click', function () { self.saveInk([]); self.redraw(); });
    bar.appendChild(undo); bar.appendChild(clr);

    var cur = null, cv = this.canvas;
    function pt(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; }
    cv.addEventListener('pointerdown', function (e) {
      if (!self.tool) return;
      cv.setPointerCapture(e.pointerId); e.preventDefault();
      if (self.tool === 'erase') { self.eraseAt(pt(e)); cur = { erase: true }; return; }
      cur = { t: self.tool, c: self.tool === 'hl' ? HIGHLIGHT : self.colour, p: [pt(e)] };
    });
    cv.addEventListener('pointermove', function (e) {
      if (!cur) return;
      if (cur.erase) { self.eraseAt(pt(e)); return; }
      cur.p.push(pt(e)); self.redraw(cur);
    });
    function end() {
      if (cur && !cur.erase && cur.p.length > 1) { var a = self.ink(); a.push(cur); self.saveInk(a); }
      cur = null; self.redraw();
    }
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  };
  Deck.prototype.setTool = function (t) {
    this.tool = t;
    this.root.classList.toggle('drawing', !!t);
    for (var k in this.btn) this.btn[k].setAttribute('aria-pressed', String(k === t));
  };
  Deck.prototype.inkKey = function () { return 'ie-ink:' + this.slug + ':' + this.k; };
  Deck.prototype.ink = function () { return store(this.inkKey()) || []; };
  Deck.prototype.saveInk = function (a) { store(this.inkKey(), a.length ? a : null); };
  Deck.prototype.eraseAt = function (p) {
    var a = this.ink(), r = 0.018, n = a.length;
    a = a.filter(function (s) { return !s.p.some(function (q) { return Math.abs(q[0] - p[0]) < r && Math.abs(q[1] - p[1]) < r * 1.33; }); });
    if (a.length !== n) { this.saveInk(a); this.redraw(); }
  };
  Deck.prototype.redraw = function (extra) {
    var cv = this.canvas; if (!cv) return;
    var r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    var w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    var g = cv.getContext('2d');
    g.clearRect(0, 0, w, h);
    var strokes = this.ink();
    if (extra) strokes = strokes.concat([extra]);
    strokes.forEach(function (s) {
      g.strokeStyle = s.c; g.lineCap = 'round'; g.lineJoin = 'round';
      g.lineWidth = (s.t === 'hl' ? 0.022 : 0.0035) * w;
      g.beginPath();
      s.p.forEach(function (q, i) { var x = q[0] * w, y = q[1] * h; if (i) g.lineTo(x, y); else g.moveTo(x, y); });
      g.stroke();
    });
  };

  function init() {
    document.querySelectorAll('.ie-deck').forEach(function (d, i) { if (!d._deck) d._deck = new Deck(d, i); });
    initVotes();
  }
  /* ---------------- class votes ----------------
     \vote{id}{A}{B} in a deck becomes two buttons. A student's choice is kept
     in this browser only (localStorage), so it survives moving between slides
     and reloading; nothing is sent anywhere. */
  function initVotes() {
    document.querySelectorAll('.vote').forEach(function (v) {
      if (v._vote) return; v._vote = true;
      var key = 'ie-vote:' + v.getAttribute('data-vote');
      var msg = v.querySelector('.vote-msg');
      function show(c) {
        v.querySelectorAll('.vote-btn').forEach(function (b) {
          var on = b.getAttribute('data-choice') === c;
          b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('chosen', on);
        });
        msg.textContent = c ? 'You voted ' + c + '. Keep it in mind: the next slide shows what each question measures. (Click the other option to change your vote.)' : '';
      }
      show(store(key));
      v.addEventListener('click', function (e) {
        var b = e.target.closest('.vote-btn'); if (!b) return;
        e.stopPropagation();
        var c = b.getAttribute('data-choice'); store(key, c); show(c);
      });
      v.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') e.stopPropagation();   /* press the button, do not change slide */
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
