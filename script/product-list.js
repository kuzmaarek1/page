const productContainer = document.getElementById("product-listing");
const productCountSelect = document.getElementById("product-count");

let pageNumber = 1;
let pageSize = parseInt(productCountSelect.value);
let totalPages = Infinity;
let isLoading = false;

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
      el.innerHTML = `
        <h3>${product.text}</h3>
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
  document.getElementById("popUpProductName").innerText = product.id;
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

productCountSelect.addEventListener("change", () => {
  pageSize = parseInt(productCountSelect.value);
  pageNumber = 1;
  totalPages = Infinity;
  productContainer.innerHTML = "";
  loadProducts();
});

loadProducts();

window.addEventListener("scroll", handleScroll);
