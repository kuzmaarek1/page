const productContainer = document.getElementById("product-listing");
const customSelect = document.querySelector(".custom-select");
const selected = customSelect.querySelector(".selected");
const selectedContainer = customSelect.querySelector(".selected-container");
const optionsContainer = customSelect.querySelector(".options");
const optionsList = customSelect.querySelectorAll(".option");

let pageSize = parseInt(selected.textContent.trim());
let pageNumber = 1;
let totalPages = Infinity;
let isLoading = false;

selectedContainer.addEventListener("click", () => {
  console.log(customSelect.style.border);
  optionsContainer.style.display =
    optionsContainer.style.display === "block" ? "none" : "block";
  selectedContainer.style.borderBottom =
    selectedContainer.style.borderBottom.includes("1px solid")
      ? ""
      : "1px solid #1d1d1d";
  customSelect.style.border = customSelect.style.border.includes("1px solid")
    ? ""
    : "1px solid #eaeae8";
});

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = `${option.textContent}`;

    optionsList.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");

    optionsContainer.style.display = "none";
    selectedContainer.style.borderBottom = "";
    customSelect.style.border = "";
  });
});

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    optionsContainer.style.display = "none";
    selectedContainer.style.borderBottom = "";
    customSelect.style.border = "";
  }
});

const loadProducts = async () => {
  if (isLoading || pageNumber > totalPages) return;
  isLoading = true;

  try {
    const response = await fetch(
      `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const responseData = await response.json();
    const products = responseData.data;

    totalPages = responseData.totalPages;
    console.log("Total Pages: " + totalPages);

    if (products.length === 0 || pageNumber > totalPages) {
      productContainer.innerHTML +=
        "<div class='loader'>No more products...</div>";
      return;
    }

    products.forEach((product) => {
      const el = document.createElement("div");
      el.classList.add("product");
      el.classList.add("product-list");
      el.innerHTML = `
        <div class="product-id">Id: ${product.id
          .toString()
          .padStart(2, "0")}</div>
        <img src="${product.image}" alt="${product.text}" />
      `;
      el.addEventListener("click", () => openProductPopUp(product));
      productContainer.appendChild(el);
    });

    pageNumber++;
  } catch (error) {
    console.error("Error loading products", error);
  } finally {
    isLoading = false;
  }
};

const openProductPopUp = (product) => {
  console.log(product);
  document.getElementById("popUpProductId").innerText = `ID: ${product.id
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("popUpProductImage").src = product.image;
  document.getElementById("productPopUp").setAttribute("aria-hidden", "false");
  document.getElementById("productPopUp").style.display = "block";
};

const closeProductPopUp = () => {
  document.getElementById("productPopUp").style.display = "none";
  document.getElementById("productPopUp").setAttribute("aria-hidden", "true");
};

document
  .getElementById("closePopUp")
  .addEventListener("click", closeProductPopUp);

window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("productPopUp")) {
    closeProductPopUp();
  }
});

const handleScroll = () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom) {
    loadProducts();
  }
};

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    pageSize = parseInt(option.textContent.trim());
    pageNumber = 1;
    totalPages = Infinity;
    productContainer.innerHTML = "";
    loadProducts();
  });
});

loadProducts();

window.addEventListener("scroll", handleScroll);
