document.addEventListener("DOMContentLoaded", function () {
  initRouter();
});

function initRouter() {
  const hash = window.location.hash;
  if (hash) {
    navigateToSection(hash.substring(1));
  }

  window.addEventListener("hashchange", function () {
    const hash = window.location.hash;
    if (hash) {
      navigateToSection(hash.substring(1));
    }
  });
}

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    const headerHeight = document.querySelector("header").offsetHeight;
    const position = section.offsetTop - headerHeight;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });

    updateDocumentTitle(sectionId);
    updateActiveLink(sectionId);
  }
}

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
