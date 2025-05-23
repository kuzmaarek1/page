let swiper;

const loadFeaturedProducts = async () => {
  try {
    const response = await fetch(
      "https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=10"
    );
    const data = await response.json();

    const products = data.data;

    if (products.length === 0) {
      console.log("No featured products available");
      return;
    }

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("swiper-slide");
      productDiv.innerHTML = `
        <div class="product-container">
          <div class="product">
          <div class="product-heart"></div>
            ${
              product.isBestseller
                ? `<div class="product-bestseller">Bestseller</div>`
                : product.limitedEdition
                ? `<div class="product-limitedEdition">Limited Edition</div>`
                : ""
            }
            <img src="${product.image}" alt="${
        product.text
      }" class="product-image" />
          </div>
          <div class="product-info">
            <div class="product-title">${product.text}</div>
            <div class="product-price">€300,00 EUR</div>
          </div>
        </div>
      `;
      swiperWrapper.appendChild(productDiv);
    });

    swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        hideOnClick: false,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      loop: false,
      freeMode: true,
      grabCursor: true,
      momentumBounce: false,
      speed: 500,
      spaceBetween: 20,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        400: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      on: {
        init: function () {
          toggleNavButtons(this);
        },
        slideChange: function () {
          toggleNavButtons(this);
        },
      },
    });
  } catch (error) {
    console.error("Error loading featured products:", error);
  }
};

function toggleNavButtons(swiper) {
  const nextButton = document.querySelector(".swiper-button-next");
  const prevButton = document.querySelector(".swiper-button-prev");

  const totalSlides = swiper.slides.length;
  const slidesPerView = swiper.params.slidesPerView;
  const currentIndex = swiper.activeIndex;

  console.log(currentIndex);
  if (currentIndex >= totalSlides - slidesPerView) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "";
  }

  if (currentIndex === 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "";
  }
}

loadFeaturedProducts();
