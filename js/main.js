document.addEventListener("DOMContentLoaded", function () {
  initFadeAnimations();
  setupThemeToggle();
  setupSmoothScrolling();
});

function initFadeAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0;
  };

  const handleScroll = () => {
    fadeElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("visible");
      }
    });
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const position = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    });
  });
}

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector("header").offsetHeight;

  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      const currentHash = window.location.hash.substring(1);
      if (currentHash !== section.id) {
        history.replaceState(null, null, `#${section.id}`);

        updateDocumentTitle(section.id);
        updateActiveLink(section.id);
      }
    }
  });
});

function updateDocumentTitle(sectionId) {
  const baseName = "Malwina Juchiewicz - Portfolio";
  let pageTitle = baseName;

  switch (sectionId) {
    case "home":
      pageTitle = baseName;
      break;
    case "skills":
      pageTitle = `${baseName} | Skills`;
      break;
    case "projects":
      pageTitle = `${baseName} | Projects`;
      break;
    case "contact":
      pageTitle = `${baseName} | Contact`;
      break;
    default:
      pageTitle = baseName;
  }

  document.title = pageTitle;
}

function updateActiveLink(sectionId) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(
    `.nav-links a[href="#${sectionId}"]`
  );
  if (activeLink) {
    activeLink.classList.add("active");
  }
}
