document.addEventListener("DOMContentLoaded", () => {
  /* ---------- NAVIGATION ---------- */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 02 — PLACE: drag-reveal comparison ---------- */
  const placeReveal = document.querySelector(".place__reveal");
  const placeOverlay = document.getElementById("placeRevealOverlay");
  const placeLine = document.getElementById("placeRevealLine");
  const placeInstruction = document.querySelector(".place__reveal-instruction");

  if (placeReveal && placeOverlay && placeLine) {
    let isDragging = false;

    const updateReveal = (clientX) => {
      const rect = placeReveal.getBoundingClientRect();
      let position = ((clientX - rect.left) / rect.width) * 100;
      position = Math.max(0, Math.min(100, position));
      placeOverlay.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      placeLine.style.left = `${position}%`;
    };

    placeReveal.addEventListener("pointerenter", () => {
      if (placeInstruction) placeInstruction.style.opacity = "0";
    });

    placeReveal.addEventListener("pointermove", (event) => {
      if (event.pointerType === "mouse" || isDragging) {
        updateReveal(event.clientX);
      }
    });

    placeReveal.addEventListener("pointerdown", (event) => {
      isDragging = true;
      placeReveal.setPointerCapture(event.pointerId);
      updateReveal(event.clientX);
    });

    placeReveal.addEventListener("pointerup", (event) => {
      isDragging = false;
      if (placeReveal.hasPointerCapture(event.pointerId)) {
        placeReveal.releasePointerCapture(event.pointerId);
      }
    });

    placeReveal.addEventListener("pointercancel", () => {
      isDragging = false;
    });
  }

  /* ---------- 03 — STAYS: expanding image reveals ---------- */
  const stayRows = document.querySelectorAll(".stay-row");

  if (stayRows.length) {
    stayRows.forEach((row) => {
      const trigger = row.querySelector(".stay-row__trigger");
      if (!trigger) return;

      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", () => {
        const isOpen = row.classList.contains("is-open");

        // Close every stay
        stayRows.forEach((otherRow) => {
          otherRow.classList.remove("is-open");
          const otherTrigger = otherRow.querySelector(".stay-row__trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        });

        // Open the clicked stay
        if (!isOpen) {
          row.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

/* ---------- 04 — EXPERIENCES SLIDER ---------- */
const experiencesTrack =
  document.getElementById("experiencesTrack");
const experienceItems =
  document.querySelectorAll(".experiences__item");
const experiencePrev =
  document.getElementById("experiencePrev");
const experienceNext =
  document.getElementById("experienceNext");
const experienceCounter =
  document.getElementById("experienceCounter");
if (
  experiencesTrack &&
  experienceItems.length &&
  experiencePrev &&
  experienceNext
) {

  let currentSlide = 0;
  const totalSlides =
    experienceItems.length;

  const updateSlider = () => {
    const slideWidth =
      experienceItems[0].getBoundingClientRect().width;
      
    experiencesTrack.style.transform =
      `translate3d(${
        -currentSlide * slideWidth
      }px, 0, 0)`;
    if (experienceCounter) {
      experienceCounter.textContent =
        `${String(currentSlide + 1).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`;
    }
    experiencePrev.disabled =
      currentSlide === 0;

    experienceNext.disabled =
      currentSlide === totalSlides - 1;
  };
  
  experienceNext.addEventListener(
    "click",
    () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlider();
      }
    }
  );

  experiencePrev.addEventListener(
    "click",
    () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    }
  );

  let touchStartX = 0;
  let touchEndX = 0;
  experiencesTrack.addEventListener(
    "touchstart",
    (event) => {
      touchStartX =
        event.changedTouches[0].clientX;
    },
    { passive: true }
  );
  experiencesTrack.addEventListener(
    "touchend",
    (event) => {
      touchEndX =
        event.changedTouches[0].clientX;
      const distance =
        touchStartX - touchEndX;
      if (Math.abs(distance) < 50) {
        return;
      }
      if (distance > 0) {
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
        }
      } else {
        if (currentSlide > 0) {
          currentSlide--;
        }
      }
      updateSlider();
    },
    { passive: true }
  );
  window.addEventListener(
    "resize",
    updateSlider
  );
  updateSlider();
}

  /* ---------- 07 — BOOKING ---------- */
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const guestCount = bookingForm.querySelector("[data-guest-count]");
    const guestIncrease = bookingForm.querySelector("[data-guest-increase]");
    const guestDecrease = bookingForm.querySelector("[data-guest-decrease]");
    const accommodationOptions = bookingForm.querySelectorAll(
      "[data-accommodation]",
    );
    const bookingError = document.getElementById("bookingError");
    const bookingSuccess = document.getElementById("bookingSuccess");
    const bookingReset = document.getElementById("bookingReset");

    let guests = 2;
    let accommodation = "CABIN";

    // Date restrictions
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    checkIn.min = todayString;
    checkOut.min = todayString;

    checkIn.addEventListener("change", () => {
      if (!checkIn.value) return;
      checkOut.min = checkIn.value;
      if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
      }
    });

    // Guests
    const updateGuests = () => {
      guestCount.textContent = String(guests).padStart(2, "0");
    };

    guestIncrease.addEventListener("click", () => {
      if (guests < 8) {
        guests++;
        updateGuests();
      }
    });

    guestDecrease.addEventListener("click", () => {
      if (guests > 1) {
        guests--;
        updateGuests();
      }
    });

    updateGuests();

    // Accommodation
    accommodationOptions.forEach((option) => {
      option.addEventListener("click", () => {
        accommodation = option.dataset.accommodation;
        accommodationOptions.forEach((item) =>
          item.classList.remove("is-selected"),
        );
        option.classList.add("is-selected");
      });
    });

    // Submit
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      bookingError.textContent = "";

      if (!checkIn.value) {
        bookingError.textContent = "Please select a check-in date.";
        return;
      }
      if (!checkOut.value) {
        bookingError.textContent = "Please select a check-out date.";
        return;
      }
      if (checkOut.value <= checkIn.value) {
        bookingError.textContent = "Check-out must be after check-in.";
        return;
      }

      const formatDate = (dateString) => {
        const date = new Date(dateString + "T00:00:00");
        return date
          .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
          .toUpperCase();
      };

      const formattedDates = `${formatDate(checkIn.value)} — ${formatDate(checkOut.value)}`;

      document.querySelector("[data-confirm-stay]").textContent = accommodation;
      document.querySelector("[data-confirm-dates]").textContent =
        formattedDates;
      document.querySelector("[data-confirm-guests]").textContent = String(
        guests,
      ).padStart(2, "0");

      bookingForm.style.display = "none";
      bookingSuccess.classList.add("is-visible");
    });

    // Reset
    if (bookingReset) {
      bookingReset.addEventListener("click", () => {
        bookingForm.reset();
        guests = 2;
        accommodation = "CABIN";

        accommodationOptions.forEach((option, index) => {
          option.classList.toggle("is-selected", index === 0);
        });

        updateGuests();
        checkIn.min = todayString;
        checkOut.min = todayString;
        bookingError.textContent = "";
        bookingSuccess.classList.remove("is-visible");
        bookingForm.style.display = "";
      });
    }
  }
});
