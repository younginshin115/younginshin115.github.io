document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.highlight').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '&#10697;';
    block.appendChild(btn);

    btn.addEventListener('click', function () {
      var codeEl = block.querySelector('.rouge-code') || block.querySelector('code');
      var text = codeEl ? codeEl.innerText : '';
      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = '&#10003;';
        setTimeout(function () { btn.innerHTML = '&#10697;'; }, 2000);
      });
    });
  });
});
