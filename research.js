const lightbox = document.querySelector(".lightbox");
const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxVideo = document.querySelector(".lightbox-video");
const lightboxVideoSource = lightboxVideo
  ? lightboxVideo.querySelector("source")
  : null;
const lightboxClose = document.querySelector(".lightbox-close");
const mediaTriggers = document.querySelectorAll(".lightbox-trigger");
const themeToggle = document.querySelector(".theme-toggle");

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

if (themeToggle) {
  const initialTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  setTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  });
}

function closeLightbox() {
  if (!lightbox || !lightboxMedia || !lightboxVideo || !lightboxVideoSource) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxMedia.src = "";
  lightboxMedia.alt = "";
  lightboxMedia.hidden = false;
  lightboxVideo.pause();
  lightboxVideo.hidden = true;
  lightboxVideoSource.src = "";
  lightboxVideo.load();
}

if (lightbox && lightboxMedia && lightboxVideo && lightboxVideoSource) {
  mediaTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const src = trigger.getAttribute("data-src");
      const alt = trigger.getAttribute("data-alt") || "";
      const type = trigger.getAttribute("data-type") || "image";

      if (!src) {
        return;
      }

      if (type === "video") {
        lightboxMedia.src = "";
        lightboxMedia.alt = "";
        lightboxMedia.hidden = true;
        lightboxVideoSource.src = src;
        lightboxVideo.hidden = false;
        lightboxVideo.load();
        lightboxVideo.play().catch(() => {});
      } else {
        lightboxVideo.pause();
        lightboxVideo.hidden = true;
        lightboxVideoSource.src = "";
        lightboxVideo.load();
        lightboxMedia.hidden = false;
        lightboxMedia.src = src;
        lightboxMedia.alt = alt;
      }

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
