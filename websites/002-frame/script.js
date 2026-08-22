(function () {
  var strip = document.getElementById("filmstrip");
  if (!strip) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    var shift = Math.min(y * 0.35, window.innerWidth * 0.25);
    strip.style.transform = "translateX(-" + shift + "px)";
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();

(function () {
  var dayTabs = document.querySelectorAll(".day-tab");
  var rows = document.querySelectorAll(".prog-row");
  var panelImage = document.getElementById("programmeImage");

  if (!dayTabs.length || !rows.length) return;

  function setActiveDay(day) {
    dayTabs.forEach(function (tab) {
      var isActive = tab.dataset.day === day;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    var firstVisibleRow = null;

    rows.forEach(function (row) {
      var matches = row.dataset.day === day;
      row.classList.toggle("is-visible", matches);

      if (matches && !firstVisibleRow) {
        firstVisibleRow = row;
      }

      if (!matches) {
        row.classList.remove("is-active");
        row.setAttribute("aria-pressed", "false");
      }
    });

    if (firstVisibleRow) {
      setActiveRow(firstVisibleRow);
    }
  }

  function setActiveRow(row) {
    rows.forEach(function (r) {
      var isThis = r === row;
      r.classList.toggle("is-active", isThis);
      r.setAttribute("aria-pressed", isThis ? "true" : "false");
    });

    var newSrc = row.dataset.image;
    if (!panelImage || !newSrc) return;

    panelImage.classList.remove("is-loaded");

    var preload = new Image();
    preload.onload = function () {
      panelImage.src = newSrc;
      panelImage.alt = row.querySelector(".prog-title").textContent + " — film still";
      window.requestAnimationFrame(function () {
        panelImage.classList.add("is-loaded");
      });
    };
    preload.src = newSrc;
  }

  dayTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setActiveDay(tab.dataset.day);
    });
  });

  rows.forEach(function (row) {
    row.addEventListener("click", function () {
      if (row.classList.contains("is-visible")) {
        setActiveRow(row);
      }
    });
  });

  setActiveDay("fri");

  if (panelImage) {
    panelImage.classList.add("is-loaded");
  }
})();

(function () {
  var navNodes = document.querySelectorAll(".nav-node");
  var indicator = document.querySelector(".nav-indicator");
  var sections = document.querySelectorAll("section, footer.site-footer");

  if (!navNodes.length || !sections.length) return;

  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (indicator) {
      indicator.style.width = scrollPercent + "%";
    }
  }, { passive: true });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var id = entry.target.getAttribute("id");
      if (entry.target.tagName.toLowerCase() === "footer") {
        id = "tickets";
      }

      navNodes.forEach(function (node) {
        node.classList.toggle("is-active", node.getAttribute("data-section") === id);
      });
    });
  }, {
    root: null,
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
