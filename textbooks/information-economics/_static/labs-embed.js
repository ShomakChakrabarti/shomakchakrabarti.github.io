/* Resize embedded interactive labs to fit their content.
   Each lab page posts {infoeconLab, height} to its parent when it loads or
   changes size; we find the frame it came from and set its height. */
window.addEventListener('message', function (e) {
  var d = e.data;
  if (!d || !d.infoeconLab || !d.height) return;
  var frames = document.querySelectorAll('iframe');
  for (var i = 0; i < frames.length; i++) {
    if (frames[i].contentWindow === e.source) {
      frames[i].style.height = d.height + 'px';
      frames[i].style.aspectRatio = 'auto';
      var p = frames[i].parentElement;               /* PreTeXt wraps the frame in a sized box */
      if (p && p.classList.contains('interactive-iframe-container')) {
        frames[i].style.width = '100%'; p.style.width = '100%'; p.style.height = 'auto'; p.style.paddingTop = '0';
      }
    }
  }
});
