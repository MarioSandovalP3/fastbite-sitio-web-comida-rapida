document.addEventListener("DOMContentLoaded", function () {
  // Primero ocultamos el loading cuando todo esté listo
  window.addEventListener("load", function () {
    // Esperamos 1 segundo para que se aprecie la animación (opcional)
    setTimeout(function () {
      const loadingScreen = document.getElementById("loadingScreen");
      loadingScreen.classList.add("hidden");

      // Eliminamos el loading screen después de la animación
      loadingScreen.addEventListener("transitionend", function () {
        loadingScreen.remove();
      });
    }, 1000);
  });

  // Sticky Header on Scroll
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinkItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Scroll Reveal Animation
  const scrollReveal = ScrollReveal({
    origin: "bottom",
    distance: "60px",
    duration: 1000,
    delay: 200,
    reset: true,
  });

  scrollReveal.reveal(".hero-content, .hero-image", { interval: 200 });
  scrollReveal.reveal(".section-header", { origin: "top" });
  scrollReveal.reveal(".feature-card, .testimonial-card, .pricing-card", {
    interval: 200,
  });
  scrollReveal.reveal(".contact-info, .contact-form", {
    origin: "left",
    interval: 200,
  });

  // Alternative Scroll Reveal for browsers that don't support ScrollReveal library
  function checkScroll() {
    const elements = document.querySelectorAll(".reveal");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("load", checkScroll);

  // Hover Effects for Buttons
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Form Submission
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the form data to a server
      alert(
        "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto!"
      );
      this.reset();
    });
  }

  // Fallback for ScrollReveal if library is not loaded
  if (typeof ScrollReveal !== "function") {
    console.log("ScrollReveal library not loaded, using fallback animations");
    window.ScrollReveal = function () {
      return {
        reveal: function () {},
      };
    };
  }

  // Menu Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.dataset.filter;

      productCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Form Validation
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Here you would typically send the data to your server
    console.log("Login attempt with:", { email, password });

    // For demo purposes, we'll just show a success message
    alert("Inicio de sesión exitoso (simulado)");
    // window.location.href = 'profile.html'; // Redirect on successful login
  });
});
