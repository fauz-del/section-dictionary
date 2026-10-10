const navbarToggle = document.querySelector(".navbar__toggle");
const navbarMenu = document.querySelector(".navbar__menu");

if (navbarToggle && navbarMenu) {
  function setMenuOpen(isOpen) {
    navbarMenu.classList.toggle("is-open", isOpen);

    navbarToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navbarToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  }

  navbarToggle.addEventListener("click", () => {
    const isOpen =
      navbarToggle.getAttribute("aria-expanded") === "true";

    setMenuOpen(!isOpen);
  });

  navbarMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      navbarToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenuOpen(false);
    }
  });
}
