const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".section-rail a");
const sectionMarker = document.querySelector(".section-marker");
const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
  });
}

function updateMarker(link) {
  if (!sectionMarker || !link) {
    return;
  }

  const offset = link.offsetTop - 14;
  sectionMarker.style.transform = `translateY(${offset}px)`;
  sectionMarker.style.height = `${link.offsetHeight}px`;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isActive);

        if (isActive) {
          updateMarker(link);
        }
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));

if (navLinks.length > 0) {
  updateMarker(navLinks[0]);
}

window.addEventListener("resize", () => {
  const activeLink = document.querySelector(".section-rail a.is-active") || navLinks[0];
  updateMarker(activeLink);
});
