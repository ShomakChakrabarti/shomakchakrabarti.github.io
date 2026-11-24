/* Course-material protection for the Information Economics textbook.
   Deterrence only. Nothing here blocks text selection, right-click or
   keyboard navigation, because those are what screen readers, text-to-speech
   tools (such as Read&Write) and keyboard users rely on.

   1. Copying: a long copy (more than COPY_LIMIT characters) gets a usage
      notice added to the clipboard. Short copies (an equation, a definition)
      are left alone.
   2. Printing: Ctrl+P / Cmd+P and the browser's Print command show an
      accessible notice; the printed page itself is blanked by protect.css.
   3. Watermark name: if the book is embedded in Canvas, the parent page can
      send the student's name with postMessage and it is shown in the corner.
      The name is never put in the URL. */
(function () {
  'use strict';

  var COPY_LIMIT = 300;
  var COPY_NOTE = '\n\n— Information Economics (ECON20512) course materials. ' +
    'For students enrolled on ECON20512 only. Uploading these materials to ChatGPT ' +
    'or any other AI tool is not permitted.';
  /* Origins allowed to send the student's name. Change to your Canvas address. */
  var NAME_ORIGINS = ['https://canvas.manchester.ac.uk'];
  var PRINT_MESSAGE = 'Printing is disabled for ECON20512 materials. They are read online ' +
    'and may not be printed, saved as PDF or uploaded to AI tools.';

  /* ---------- 1. Copying and selection ---------- */
  function editable(el) {
    return el && el.closest && el.closest('input, textarea, select, [contenteditable="true"]');
  }
  document.addEventListener('selectstart', function (e) { if (!editable(e.target)) e.preventDefault(); });
  document.addEventListener('dragstart', function (e) { if (!editable(e.target)) e.preventDefault(); });
  document.addEventListener('copy', function (e) {
    var sel = window.getSelection ? window.getSelection().toString() : '';
    if (!sel || sel.length <= COPY_LIMIT || !e.clipboardData) return;
    e.clipboardData.setData('text/plain', sel + COPY_NOTE);
    e.preventDefault();
  });

  /* ---------- 2. Printing ---------- */
  var notice = null, lastFocus = null;
  function buildNotice() {
    notice = document.createElement('div');
    notice.className = 'ie-print-notice';
    notice.setAttribute('role', 'alertdialog');
    notice.setAttribute('aria-modal', 'false');
    notice.setAttribute('aria-labelledby', 'ie-print-msg');
    notice.hidden = true;
    var p = document.createElement('p');
    p.id = 'ie-print-msg';
    p.style.margin = '0';
    p.textContent = PRINT_MESSAGE;
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = 'OK';
    b.addEventListener('click', hideNotice);
    notice.appendChild(p);
    notice.appendChild(b);
    notice.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideNotice(); });
    document.body.appendChild(notice);
  }
  function showNotice() {
    if (!notice) buildNotice();
    lastFocus = document.activeElement;
    notice.hidden = false;
    notice.querySelector('button').focus();
  }
  function hideNotice() {
    if (!notice) return;
    notice.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      showNotice();
    }
  });
  /* Print from the browser menu cannot be cancelled, but the printed page is
     blank (protect.css) and the notice explains why. */
  window.addEventListener('beforeprint', showNotice);

  /* ---------- 3. Watermark name (Canvas embed) ---------- */
  function setName(name) {
    if (typeof name !== 'string') return;
    name = name.replace(/[^\p{L}\p{M}\s'.-]/gu, '').trim().slice(0, 60);
    if (!name) return;
    var el = document.querySelector('.ie-wm-name');
    if (!el) {
      el = document.createElement('div');
      el.className = 'ie-wm-name';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    el.textContent = 'Prepared for ' + name + ' · ECON20512';
    try { sessionStorage.setItem('ie-student-name', name); } catch (e) {}
  }
  window.addEventListener('message', function (e) {
    if (NAME_ORIGINS.indexOf(e.origin) === -1) return;
    if (e.data && e.data.type === 'ie-student-name') setName(e.data.name);
  });
  function init() {
    try { var n = sessionStorage.getItem('ie-student-name'); if (n) setName(n); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
