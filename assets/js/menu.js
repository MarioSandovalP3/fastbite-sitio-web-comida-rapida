document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation (same as in main page)
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinkItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

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

  // Quick View Modal
  const quickViewBtns = document.querySelectorAll(".quick-view-btn");
  const modal = document.getElementById("quickViewModal");
  const closeModal = document.querySelector(".close-modal");
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductTitle = document.getElementById("modalProductTitle");
  const modalProductDescription = document.getElementById(
    "modalProductDescription"
  );
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalTotalPrice = document.getElementById("modalTotalPrice");
  const quantityInput = document.querySelector(".quantity-input");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const sizeBtns = document.querySelectorAll(".size-btn");

  quickViewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".product-card");
      const productImage = card.querySelector(".product-image img").src;
      const productTitle = card.querySelector(".product-title").textContent;
      const productDescription = card.querySelector(
        ".product-description"
      ).textContent;
      const productPrice = card.querySelector(".product-price").textContent;

      modalProductImage.src = productImage;
      modalProductTitle.textContent = productTitle;
      modalProductDescription.textContent = productDescription;
      modalProductPrice.textContent = productPrice;
      modalTotalPrice.textContent = productPrice;

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Quantity Selector
  plusBtn.addEventListener("click", function () {
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotalPrice();
  });

  minusBtn.addEventListener("click", function () {
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
      updateTotalPrice();
    }
  });

  quantityInput.addEventListener("change", function () {
    if (parseInt(this.value) < 1) this.value = 1;
    updateTotalPrice();
  });

  // Size Selector
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      sizeBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      updateTotalPrice();
    });
  });

  // Update Total Price
  function updateTotalPrice() {
    const basePrice = parseFloat(
      modalProductPrice.textContent.replace("$", "")
    );
    const quantity = parseInt(quantityInput.value);
    let total = basePrice * quantity;

    // Check for size price changes
    const activeSize = document.querySelector(".size-btn.active").textContent;
    if (activeSize === "Mediano") total += 1.5 * quantity;
    if (activeSize === "Grande") total += 2.5 * quantity;

    // Check for extras
    const extras = document.querySelectorAll(
      ".extras-checkboxes input:checked"
    );
    extras.forEach((extra) => {
      if (extra.parentElement.textContent.includes("$1.00"))
        total += 1.0 * quantity;
      if (extra.parentElement.textContent.includes("$1.50"))
        total += 1.5 * quantity;
    });

    modalTotalPrice.textContent = "$" + total.toFixed(2);
  }

  // Update total price when extras are checked
  document.querySelectorAll(".extras-checkboxes input").forEach((checkbox) => {
    checkbox.addEventListener("change", updateTotalPrice);
  });

  // Add to cart from modal
  document
    .querySelector(".add-to-cart-modal")
    .addEventListener("click", function () {
      alert("Producto añadido al carrito!");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

  // Add to cart from cards
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const productTitle =
        this.closest(".product-card").querySelector(
          ".product-title"
        ).textContent;
      alert(`${productTitle} añadido al carrito!`);
    });
  });

  // Smooth scrolling for menu categories
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.filter;
      if (category !== "all") {
        const categorySection = document.getElementById(category);
        if (categorySection) {
          window.scrollTo({
            top: categorySection.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });
});
