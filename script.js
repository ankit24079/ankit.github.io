const navLinks = document.querySelectorAll(".site-nav a");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const profilePhoto = document.querySelector(".profile-photo");
const sectionIds = ["home", "about", "experience", "projects", "skills", "education", "contact"];
const trackedSections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
  });
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
