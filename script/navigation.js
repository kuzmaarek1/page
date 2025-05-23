document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link");
  const closeButton = document.querySelector(".close-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const closeMobileMenu = () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  closeButton.addEventListener("click", closeMobileMenu);

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  const handleActiveNavLink = () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", handleActiveNavLink);
  handleActiveNavLink();
});

window.addEventListener("scroll", () => {
  let navbar = document.querySelector(".navigation-bar");
  if (window.scrollY > 1) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

const observer = new MutationObserver(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const hash = window.location.hash;
  document.documentElement.style.scrollBehavior = "auto";

  window.scrollTo(0, 0);
  const productHeart = document.querySelector(".product-heart");
  const productId = document.querySelectorAll(".product-id");
  const heroPhoto = document.querySelector(".hero-photo");
  const advertisement = document.querySelector(".advertisement");

  if (!hash) {
    document.documentElement.style.scrollBehavior = "smooth";
    observer.disconnect();
  }

  if (
    productHeart &&
    productId.length > 13 &&
    advertisement &&
    heroPhoto &&
    hash
  ) {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "auto" });
      document.documentElement.style.scrollBehavior = "smooth";
    }
    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
