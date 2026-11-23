/* Text-width switch for the Information Economics textbook.
   Adds a small "Text width" control (bottom right) to Jupyter Book pages,
   PreTeXt pages and the standalone interactive pages. The reader's choice is
   remembered in this browser. Edit WIDTHS to change the presets. */
(function () {
  var KEY = 'ie-text-width';
  var ORDER = ['narrow', 'standard', 'wide', 'full'];
  var LABEL = { narrow: 'Narrow', standard: 'Standard', wide: 'Wide', full: 'Full' };
  /* maximum width of the text column for each preset; 'standard' keeps the
     theme's own width */
  var WIDTHS = { narrow: '36rem', wide: '72rem', full: 'none' };

  function get() { try { return localStorage.getItem(KEY) || 'standard'; } catch (e) { return 'standard'; } }
  function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) { document.documentElement.setAttribute('data-ie-width', v); }
  apply(get());

  var css = [
    /* Jupyter Book (sphinx-book-theme) */
    'html[data-ie-width="narrow"] .bd-main .bd-content .bd-article-container{max-width:' + WIDTHS.narrow + '!important;margin:0 auto}',
    'html[data-ie-width="wide"] .bd-page-width,html[data-ie-width="full"] .bd-page-width{max-width:none!important}',
    'html[data-ie-width="wide"] .bd-main .bd-content .bd-article-container{max-width:' + WIDTHS.wide + '!important}',
    'html[data-ie-width="full"] .bd-main .bd-content .bd-article-container{max-width:none!important}',
    /* PreTeXt */
    'html[data-ie-width="narrow"] .ptx-main>.ptx-content{max-width:' + WIDTHS.narrow + '!important}',
    'html[data-ie-width="wide"] .ptx-page,html[data-ie-width="full"] .ptx-page{max-width:none!important}',
    'html[data-ie-width="wide"] .ptx-main>.ptx-content,html[data-ie-width="wide"] .ptx-content-footer{max-width:' + WIDTHS.wide + '!important}',
    'html[data-ie-width="full"] .ptx-main>.ptx-content,html[data-ie-width="full"] .ptx-content-footer{max-width:none!important}',
    /* standalone interactive pages */
    'html[data-ie-width="narrow"] main .col{max-width:' + WIDTHS.narrow + '!important}',
    'html[data-ie-width="wide"] .wrap,html[data-ie-width="full"] .wrap{max-width:none!important}',
    'html[data-ie-width="wide"] main .col{max-width:' + WIDTHS.wide + '!important}',
    'html[data-ie-width="full"] main .col{max-width:none!important}',
    /* the control */
    '.ie-width{position:fixed;right:14px;bottom:14px;z-index:2000;display:flex;align-items:center;gap:2px;' +
      'padding:4px;border-radius:999px;border:1px solid rgba(128,128,128,.45);background:rgba(128,128,128,.16);' +
      '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font:500 12.5px/1 system-ui,-apple-system,"Segoe UI",sans-serif;color:inherit}',
    '.ie-width>span{padding:0 6px 0 8px;opacity:.8}',
    '.ie-width button{font:inherit;color:inherit;background:transparent;border:0;border-radius:999px;padding:6px 9px;cursor:pointer}',
    '.ie-width button:hover{background:rgba(128,128,128,.22)}',
    '.ie-width button[aria-pressed="true"]{background:#1F4E79;color:#fff}',
    '.ie-width button:focus-visible{outline:2px solid #1F4E79;outline-offset:1px}',
    '.ie-width .ie-min{padding:6px 8px}',
    '.ie-width.collapsed>*:not(.ie-min){display:none}',
    '@media print{.ie-width{display:none}}',
    '@media (max-width:700px){.ie-width{right:8px;bottom:8px}.ie-width>span{display:none}}'
  ].join('\n');

  function build() {
    if (document.querySelector('.ie-width')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement('div');
    box.className = 'ie-width'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Text width');
    var lab = document.createElement('span'); lab.textContent = 'Text width'; box.appendChild(lab);
    var cur = get();
    ORDER.forEach(function (v) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = LABEL[v]; b.dataset.w = v;
      b.setAttribute('aria-pressed', v === cur ? 'true' : 'false');
      b.addEventListener('click', function () {
        apply(v); put(v);
        box.querySelectorAll('button[data-w]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        window.dispatchEvent(new Event('resize'));
      });
      box.appendChild(b);
    });
    var min = document.createElement('button');
    min.type = 'button'; min.className = 'ie-min'; min.textContent = '↔';
    min.title = 'Show or hide the text-width control'; min.setAttribute('aria-label', 'Show or hide the text-width control');
    min.addEventListener('click', function () { box.classList.toggle('collapsed'); });
    box.appendChild(min);
    document.body.appendChild(box);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
