(function () {
  "use strict";

  var field = document.getElementById("dot-field");

  var CELL = 44;
  var RADIUS = 170;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var dots = [];
  var cols = 0;
  var rows = 0;
  var maxScale = 2.4;

  function updateResponsiveSettings() {
    var width = window.innerWidth;

    if (width <= 480) {
  
      CELL = 20;
      RADIUS = 100;
      maxScale = 1.5;
    } else if (width <= 640) {
    
      CELL = 29;
      RADIUS = 130;
      maxScale = 1.5;
    } else if (width <= 900) {
    
      CELL = 36;
      RADIUS = 150;
      maxScale = 1.9;
    } else {
    
      CELL = 40;
      RADIUS = 160;
      maxScale = 2.4;
    }
  }

  var pointer = {
    x: -9999,
    y: -9999,
    active: false
  };
  
  var releaseRipple = {
  active: false,
  x: 0,
  y: 0,
  start: 0
  };
  var idleTimer = null;
  var idleTick = 0;
  var isIdle = true;

  function buildGrid() {
    field.innerHTML = "";
    dots = [];

    var w = window.innerWidth;
    var h = window.innerHeight;

    cols = Math.ceil(w / CELL) + 1;
    rows = Math.ceil(h / CELL) + 1;

    var gridWidth = (cols - 1) * CELL;
    var gridHeight = (rows - 1) * CELL;

    var offsetX = (w - gridWidth) / 2;
    var offsetY = (h - gridHeight) / 2;

    var frag = document.createDocumentFragment();

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {

        var x = offsetX + c * CELL;
        var y = offsetY + r * CELL;

        var el = document.createElement("div");

        el.className = "dot";

        el.style.left = x + "px";
        el.style.top = y + "px";

        frag.appendChild(el);

        dots.push({
          el: el,
          x: x,
          y: y
        });
      }
    }

    field.appendChild(frag);
  }

  function render() {
    var cx;
    var cy;
    var active;

    if (pointer.active) {

      cx = pointer.x;
      cy = pointer.y;
      active = true;

    } else if (isIdle && !reduceMotion) {

      var w = window.innerWidth;
      var h = window.innerHeight;
      var t = idleTick / 90;
      var pulse = (Math.sin(t) + 1) / 2;

      cx = w / 2;
      cy = h / 2;

      active = true;

      var pulseRadius =
        pulse * Math.max(w, h) * 0.6;
      applyPulse(cx, cy, pulseRadius);
      return;
    } else {
      active = false;
    }

    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      if (!active) {
        d.el.style.transform =
          "translate(-50%, -50%) scale(1)";
        d.el.style.backgroundColor = "";
        continue;
      }

      var dx = d.x - cx;
      var dy = d.y - cy;

      var dist = Math.hypot(dx, dy);

      if (dist > RADIUS) {

        d.el.style.transform =
          "translate(-50%, -50%) scale(1)";

        d.el.style.backgroundColor = "";
        continue;
      }

      var t = 1 - dist / RADIUS;
      t = t * t * (3 - 2 * t);
      var scale = 1 + t * maxScale;
      var mix = Math.min(1, t * 1.3);
      d.el.style.transform =
        "translate(-50%, -50%) scale(" +
        scale.toFixed(3) +
        ")";
      d.el.style.backgroundColor =
        mixColor(mix);
    }
  }
  
  function triggerReleaseRipple(x, y) {
  releaseRipple.active = true;
  releaseRipple.x = x;
  releaseRipple.y = y;
  releaseRipple.start = performance.now();

  var duration = 650;

  function rippleFrame(now) {
    if (!releaseRipple.active) return;
    var progress =
      (now - releaseRipple.start) / duration;
    if (progress >= 1) {
      releaseRipple.active = false;
      render();
      return;
    }

    var eased =
      1 - Math.pow(1 - progress, 3);
    var radius =
      10 + eased * 75;
    var strength =
      (1 - eased) * 0.8;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var dx =
        d.x - releaseRipple.x;
      var dy =
        d.y - releaseRipple.y;
      var dist =
        Math.hypot(dx, dy);
      var distanceFromRing =
        Math.abs(dist - radius);
      var band =
        CELL * 1.5;
      if (distanceFromRing > band) {
        continue;
      }
      var t =
        1 - distanceFromRing / band;

      t =
        t * t * (3 - 2 * t);

      var scale =
        1 + t * strength;
      d.el.style.transform =
        "translate(-50%, -50%) scale(" +
        scale.toFixed(3) +
        ")";

      d.el.style.backgroundColor =
        mixColor(t * strength);
    }
    requestAnimationFrame(rippleFrame);
  }
    requestAnimationFrame(rippleFrame);
  }

  function applyPulse(cx, cy, ringRadius) {
    var band = CELL * 3;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var dx = d.x - cx;
      var dy = d.y - cy;
      var dist = Math.hypot(dx, dy);
      var delta = Math.abs(
        dist - ringRadius
      );

      if (delta > band) {

        d.el.style.transform =
          "translate(-50%, -50%) scale(1)";
        d.el.style.backgroundColor = "";
        continue;
      }

      var t = 1 - delta / band;

      t = t * t * (3 - 2 * t);

      var scale =
        1 + t * Math.min(1.1, maxScale);

      var mix =
        Math.min(1, t * 0.9);

      d.el.style.transform =
        "translate(-50%, -50%) scale(" +
        scale.toFixed(3) +
        ")";

      d.el.style.backgroundColor =
        mixColor(mix);
    }
  }

  function mixColor(t) {
    // Ink
    var inkR = 17;
    var inkG = 17;
    var inkB = 17;
    // Red
    var redR = 218;
    var redG = 41;
    var redB = 28;

    var r = Math.round(
      inkR + (redR - inkR) * t
    );

    var g = Math.round(
      inkG + (redG - inkG) * t
    );

    var b = Math.round(
      inkB + (redB - inkB) * t
    );

    var a =
      0.16 + 0.84 * t;

    return (
      "rgba(" +
      r + "," +
      g + "," +
      b + "," +
      a.toFixed(2) +
      ")"
    );
  }

  function tick() {

    if (isIdle) {
      idleTick++;
      render();
    }
    requestAnimationFrame(tick);
  }

  function markActive() {
    isIdle = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      isIdle = true;
    }, 1400);
  }

  window.addEventListener(
    "resize",
    debounce(function () {

      updateResponsiveSettings();

      buildGrid();

      render();

    }, 150)
  );

  window.addEventListener(
    "mousemove",
    function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      markActive();
      render();
    }
  );

  window.addEventListener(
  "mouseleave",
  function () {
    if (pointer.active) {
      triggerReleaseRipple(
        pointer.x,
        pointer.y
      );
    }
    
    pointer.active = false;
    render();
      }
    );

  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches && e.touches[0]) {
        pointer.x =
          e.touches[0].clientX;
        pointer.y =
          e.touches[0].clientY;
        pointer.active = true;
        markActive();
        render();
      }

    },
    {
      passive: true
    }
  );

  window.addEventListener(
  "touchend",
  function () {
    if (pointer.active) {
      triggerReleaseRipple(
        pointer.x,
        pointer.y
      );
    }
    pointer.active = false;
    }
  );
  
  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(
        fn,
        wait
      );
    };
  }

  updateResponsiveSettings();
  buildGrid();
  render();
  if (!reduceMotion) {
    requestAnimationFrame(tick);
  }
})();