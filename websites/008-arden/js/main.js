const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const interest = formData.get("interest");
    const message = formData.get("message");

    const subject = encodeURIComponent(
      `ARDEN enquiry — ${interest}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:hello@arden.example?subject=${subject}&body=${body}`;
  });
}