const lightbox = document.querySelector(".lightbox");
const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxClose = document.querySelector(".lightbox-close");
const mediaTriggers = document.querySelectorAll(".lightbox-trigger");

function closeLightbox() {
  if (!lightbox || !lightboxMedia) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxMedia.src = "";
  lightboxMedia.alt = "";
}

if (lightbox && lightboxMedia) {
  mediaTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const src = trigger.getAttribute("data-src");
      const alt = trigger.getAttribute("data-alt") || "";

      if (!src) {
        return;
      }

      lightboxMedia.src = src;
      lightboxMedia.alt = alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
