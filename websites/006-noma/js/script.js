const navbarMenu = document.querySelector(".navbar__menu");
const navbarLinks = document.querySelector(".navbar__links");

if (navbarMenu && navbarLinks) {
  navbarMenu.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-active");

    navbarLinks.classList.toggle("is-open", isOpen);
    navbarMenu.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

const collectionSlider = document.querySelector(".collection__slider");
const nextButton = document.querySelector(".collection__arrow--next");
const prevButton = document.querySelector(".collection__arrow--prev");

if (collectionSlider && nextButton && prevButton) {
  const getScrollAmount = () => {
    const card = collectionSlider.querySelector(".collection-card");

    if (!card) return 400;

    const styles = window.getComputedStyle(collectionSlider);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return card.offsetWidth + gap;
  };

  const scrollCollection = (direction) => {
    collectionSlider.scrollBy({
      left: getScrollAmount() * direction,
      behavior: "smooth"
    });
  };

  nextButton.addEventListener("click", () => {
    scrollCollection(1);
  });

  prevButton.addEventListener("click", () => {
    scrollCollection(-1);
  });
}


const animatedElements = document.querySelectorAll("[data-animate]");

if (animatedElements.length) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}