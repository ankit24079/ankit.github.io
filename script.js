const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a, .sidebar-nav a");
const yearNode = document.getElementById("year");
const profilePhoto = document.querySelector(".profile-photo");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));
