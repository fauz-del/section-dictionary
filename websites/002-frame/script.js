/* =========================================================
   FRAME / 24 — Hero filmstrip scroll drift
   ========================================================= */

(function () {
  var strip = document.getElementById("filmstrip");
  if (!strip) return;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  var ticking = false;
  var maxDrift = 240; // px — how far the strip can shift left
  var driftFactor = 0.3; // how much scroll influences drift

  function update() {
    var y = window.scrollY || window.pageYOffset;
    var drift = Math.min(y * driftFactor, maxDrift);
    strip.style.transform = "translateX(-" + drift + "px)";
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
})();