(function () {
  'use strict';

  var wraps = document.querySelectorAll('.card__disc-wrap');

  wraps.forEach(function (wrap) {
    var card = wrap.closest('.card');

    function handleMove(clientX, clientY) {
      var rect = card.getBoundingClientRect();
      var x = (clientX - rect.left) / rect.width - 0.5;
      var y = (clientY - rect.top) / rect.height - 0.5;

      var rotateY = x * 22;
      var rotateX = y * -22;

      wrap.style.transform =
        'translateX(-50%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    
      var cardRect = card.getBoundingClientRect();
      var px = ((clientX - cardRect.left) / cardRect.width) * 100;
      var py = ((clientY - cardRect.top) / cardRect.height) * 100;

       card.style.setProperty('--mouse-x', px + '%');
       card.style.setProperty('--mouse-y', py + '%');
    }

    function reset() {
      wrap.style.transform = 'translateX(-50%) rotateX(0deg) rotateY(0deg)';
    }

    card.addEventListener('mousemove', function (e) {
      handleMove(e.clientX, e.clientY);
    });
    card.addEventListener('mouseleave', reset);

    card.addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      handleMove(t.clientX, t.clientY);
    }, { passive: true });
    card.addEventListener('touchend', reset);
  });
})();
