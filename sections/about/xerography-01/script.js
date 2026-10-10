(function () {
  "use strict";

  var frame = document.getElementById("photoFrame");
  var img = document.getElementById("portraitImg");
  var tileGrid = document.getElementById("tileGrid");

  var RADIUS = 260;       // px, broadened cursor influence zone
  var MAX_SHIFT = 24;     // px, max separation distance
  var MAX_ROT = 5;        // max rotation degrees for the "very close" stage
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  // Editorial, non-uniform tiling fractions (x, y, w, h) on a 0-1 scale.
  // Perfectly tiles the full container boundary with zero gaps or overlaps.
  var TILES = [
    { x: 0,      y: 0,    w: 0.45, h: 0.60 },
    { x: 0,      y: 0.60, w: 0.20, h: 0.40 },
    { x: 0.20,   y: 0.60, w: 0.25, h: 0.40 },
    { x: 0.45,   y: 0,    w: 0.183,h: 0.35 },
    { x: 0.633,  y: 0,    w: 0.183,h: 0.35 },
    { x: 0.816,  y: 0,    w: 0.184,h: 0.35 },
    { x: 0.45,   y: 0.35, w: 0.27, h: 0.40 },
    { x: 0.45,   y: 0.75, w: 0.27, h: 0.25 },
    { x: 0.72,   y: 0.35, w: 0.28, h: 0.25 },
    { x: 0.72,   y: 0.60, w: 0.28, h: 0.40 }
  ];

  var tiles = []; // Holds element tracking states
  var containerW = 0;
  var containerH = 0;
  var pointer = { x: -9999, y: -9999, active: false };
  var tapOpen = false;

  function buildTiles() {
    tileGrid.innerHTML = "";
    tiles = [];

    var rect = frame.getBoundingClientRect();
    containerW = rect.width;
    containerH = rect.height;

    // Use currentSrc to fallback properly on responsive image configurations
    var src = img.currentSrc || img.getAttribute("src");

    TILES.forEach(function (t) {
      var px = t.x * containerW;
      var py = t.y * containerH;
      var pw = t.w * containerW;
      var ph = t.h * containerH;

      // Base black-and-white toner tile
      var el = document.createElement("div");
      el.className = "tile";
      el.style.left = px + "px";
      el.style.top = py + "px";
      el.style.width = pw + "px";
      el.style.height = ph + "px";
      el.style.backgroundImage = "url('" + src + "')";
      el.style.backgroundSize = containerW + "px " + containerH + "px";
      el.style.backgroundPosition = (-px) + "px " + (-py) + "px";

      // Misaligned red toner registration ghost layer
      var ghost = document.createElement("div");
      ghost.className = "tile-ghost";
      ghost.style.left = px + "px";
      ghost.style.top = py + "px";
      ghost.style.width = pw + "px";
      ghost.style.height = ph + "px";
      ghost.style.backgroundImage = "url('" + src + "')";
      ghost.style.backgroundSize = containerW + "px " + containerH + "px";
      ghost.style.backgroundPosition = (-px) + "px " + (-py) + "px";

      tileGrid.appendChild(el);
      tileGrid.appendChild(ghost);

      // Stable directional outward vectors derived from tile positioning relative to frame center
      var cx = px + pw / 2;
      var cy = py + ph / 2;
      var dx = cx - containerW / 2;
      var dy = cy - containerH / 2;
      var mag = Math.hypot(dx, dy) || 1;

      tiles.push({
        el: el,
        ghost: ghost,
        cx: cx,
        cy: cy,
        dirX: dx / mag,
        dirY: dy / mag,
        rotSign: (Math.round(cx + cy) % 2 === 0) ? 1 : -1
      });
    });

    // Hide fallback baseline image so it does not blend behind the fractures
    img.style.opacity = "0";
  }

  function applyTileState(tile, t) {
    if (reduceMotion) t = 0; // Absolute safety compliance override

    var shift = t * MAX_SHIFT;
    var tx = tile.dirX * shift;
    var ty = tile.dirY * shift;
    var rot = tile.rotSign * MAX_ROT * t;

    // Shift coordinates using precise float parsing for fluid frame rendering
    tile.el.style.transform =
      "translate(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px) rotate(" + rot.toFixed(2) + "deg)";
    
    // Ghost layer opacity and micro-offset acceleration mimicking analog press misalignment
    tile.ghost.style.opacity = (t * 0.85).toFixed(2);
    tile.ghost.style.transform =
      "translate(" + (tx * 1.35 + 2).toFixed(2) + "px," + (ty * 1.35 + 2).toFixed(2) + "px) rotate(" + (rot * 0.5).toFixed(2) + "deg)";
  }

  function render() {
    if (tapOpen) {
      tiles.forEach(function (tile) { applyTileState(tile, 1); });
      return;
    }

    if (!pointer.active) {
      tiles.forEach(function (tile) { applyTileState(tile, 0); });
      return;
    }

    tiles.forEach(function (tile) {
      var dx = tile.cx - pointer.x;
      var dy = tile.cy - pointer.y;
      var dist = Math.hypot(dx, dy);
      
      // Proximity Calculation Curve (Extra Challenge Requirement):
      // Swapping uniform linear factors for exponential scaling. Creates an initial resistance,
      // breaking rapidly into massive displacement only when the cursor gets extremely close.
      var linearFactor = Math.max(0, 1 - dist / RADIUS);
      var exponentialFactor = Math.pow(linearFactor, 2.5); 
      
      applyTileState(tile, exponentialFactor);
    });
  }

  function toLocal(clientX, clientY) {
    var rect = frame.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  // ==========================================================================
  // EVENT PIPELINES
  // ==========================================================================

  frame.addEventListener("mousemove", function (e) {
    if (isCoarsePointer) return;
    var p = toLocal(e.clientX, e.clientY);
    pointer.x = p.x;
    pointer.y = p.y;
    pointer.active = true;
    render();
  });

  frame.addEventListener("mouseleave", function () {
    pointer.active = false;
    render();
  });

  // Mobile Touch Framework (Option B Fallback: Tap to Separate/Assemble)
  frame.addEventListener("click", function () {
    if (!isCoarsePointer) return;
    tapOpen = !tapOpen;
    frame.setAttribute("aria-pressed", String(tapOpen));
    render();
  });

  // Keyboard accessibility compliance
  frame.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tapOpen = !tapOpen;
      frame.setAttribute("aria-pressed", String(tapOpen));
      render();
    }
  });

  // Responsive Layout Pipeline Window Synchronization
  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      buildTiles();
      render();
    }, 150);
  });

  // Initialize System
  function init() {
    buildTiles();
    render();
  }

  if (img.complete) {
    init();
  } else {
    img.addEventListener("load", init);
  }
})();
