document.addEventListener("DOMContentLoaded", () => {
  /* Footer year */
  const year = document.getElementById("footer-year");
  if (year) year.textContent = new Date().getFullYear();

  /* Newsletter form (no backend yet: validates and shows a message) */
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");

  if (form && message) {
    const input = form.querySelector('input[type="email"]');

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!input.checkValidity()) {
        message.textContent = "Hmm, that email doesn't look right. Mind checking it?";
        input.focus();
        return;
      }

      message.textContent = "You're in! Watch your inbox for the good stuff.";
      form.reset();
    });
  }

  console.log("Muddy Paws Club is ready! 🐾");
});
