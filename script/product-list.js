const productContainer = document.querySelector(".product-listing");
const customSelect = document.querySelector(".custom-select");
const selected = customSelect.querySelector(".selected");
const selectedContainer = customSelect.querySelector(".selected-container");
const optionsContainer = customSelect.querySelector(".options");
const optionsList = customSelect.querySelectorAll(".option");
const advertisement = document.querySelector(".advertisement");

let pageSize = parseInt(selected.textContent.trim());
let pageNumber = 1;
let totalPages = Infinity;
let isLoading = false;

selectedContainer.addEventListener("click", () => {
  customSelect.classList.toggle("active");
});

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = `${option.textContent}`;
    optionsList.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    customSelect.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("active");
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
  document.getElementById("productPopUp").classList.add("active");
};

const closeProductPopUp = () => {
  document.getElementById("productPopUp").classList.remove("active");
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
    const advertisementClone = advertisement.cloneNode(true);
    productContainer.innerHTML = "";
    productContainer.appendChild(advertisementClone);

    loadProducts();
  });
});

loadProducts();

window.addEventListener("scroll", handleScroll);

function centerAdvertisement() {
  const computedStyle = window.getComputedStyle(productContainer);
  const columnCount = computedStyle
    .getPropertyValue("grid-template-columns")
    .split(" ").length;
  startColumn = Math.floor((columnCount - 2) / 2) + 1;
  advertisement.style.gridColumn = `${startColumn} / span 2`;
}

window.addEventListener("load", centerAdvertisement);
window.addEventListener("resize", centerAdvertisement);
