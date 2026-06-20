const navLinks = document.querySelectorAll(".site-nav a");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const profilePhoto = document.querySelector(".profile-photo");
const revealNodes = document.querySelectorAll(".reveal-on-scroll");
const sectionIds = ["home", "featured-research", "research-pipeline", "experience", "projects", "skills", "education", "contact"];
const trackedSections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

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

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
  });
}

if (revealNodes.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

function setActiveLink(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${targetId}`);
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function updateActiveSection() {
  if (trackedSections.length === 0) {
    return;
  }

  const scrollPosition = window.scrollY + 140;
  let activeId = trackedSections[0].id;

  trackedSections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  });

  setActiveLink(activeId);
}

if (navLinks.length > 0) {
  setActiveLink("home");
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav && navToggle && siteNav.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
updateActiveSection();
