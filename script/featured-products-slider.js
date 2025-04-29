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
           <div class="product-heart">
              <svg class="heart-svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="heart-path" d="M10 17.3252L8.89625 16.3329C7.23858 14.8291 5.86775 13.5369 4.78375 12.4562C3.69975 11.3754 2.84075 10.4134 2.20675 9.57044C1.57275 8.7276 1.12983 7.95869 0.878 7.26369C0.626 6.56885 0.5 5.86377 0.5 5.14844C0.5 3.72927 0.9785 2.5411 1.9355 1.58394C2.89267 0.626937 4.08083 0.148438 5.5 0.148438C6.373 0.148438 7.198 0.352604 7.975 0.760938C8.752 1.16927 9.427 1.75485 10 2.51769C10.573 1.75485 11.248 1.16927 12.025 0.760938C12.802 0.352604 13.627 0.148438 14.5 0.148438C15.9192 0.148438 17.1073 0.626937 18.0645 1.58394C19.0215 2.5411 19.5 3.72927 19.5 5.14844C19.5 5.86377 19.374 6.56885 19.122 7.26369C18.8702 7.95869 18.4272 8.7276 17.7932 9.57044C17.1593 10.4134 16.3018 11.3754 15.221 12.4562C14.1403 13.5369 12.7679 14.8291 11.1038 16.3329L10 17.3252ZM10 15.2984C11.6 13.8588 12.9167 12.6248 13.95 11.5964C14.9833 10.5683 15.8 9.67502 16.4 8.91669C17 8.15835 17.4167 7.48494 17.65 6.89644C17.8833 6.3081 18 5.72544 18 5.14844C18 4.14844 17.6667 3.3151 17 2.64844C16.3333 1.98177 15.5 1.64844 14.5 1.64844C13.7103 1.64844 12.9805 1.87244 12.3105 2.32044C11.6407 2.7686 11.1102 3.39202 10.7192 4.19069H9.28075C8.88325 3.38552 8.35117 2.76052 7.6845 2.31569C7.01783 1.87085 6.28967 1.64844 5.5 1.64844C4.50633 1.64844 3.67458 1.98177 3.00475 2.64844C2.33492 3.3151 2 4.14844 2 5.14844C2 5.72544 2.11667 6.3081 2.35 6.89644C2.58333 7.48494 3 8.15835 3.6 8.91669C4.2 9.67502 5.01667 10.5667 6.05 11.5917C7.08333 12.6167 8.4 13.8523 10 15.2984Z" fill="#1D1D1D"/>
              </svg>
           </div>
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

    const productsHeart = document.querySelectorAll(".product-heart");
    const heartPaths = document.querySelectorAll(".heart-path");

    const originalPath =
      "M10 17.3252L8.89625 16.3329C7.23858 14.8291 5.86775 13.5369 4.78375 12.4562C3.69975 11.3754 2.84075 10.4134 2.20675 9.57044C1.57275 8.7276 1.12983 7.95869 0.878 7.26369C0.626 6.56885 0.5 5.86377 0.5 5.14844C0.5 3.72927 0.9785 2.5411 1.9355 1.58394C2.89267 0.626937 4.08083 0.148438 5.5 0.148438C6.373 0.148438 7.198 0.352604 7.975 0.760938C8.752 1.16927 9.427 1.75485 10 2.51769C10.573 1.75485 11.248 1.16927 12.025 0.760938C12.802 0.352604 13.627 0.148438 14.5 0.148438C15.9192 0.148438 17.1073 0.626937 18.0645 1.58394C19.0215 2.5411 19.5 3.72927 19.5 5.14844C19.5 5.86377 19.374 6.56885 19.122 7.26369C18.8702 7.95869 18.4272 8.7276 17.7932 9.57044C17.1593 10.4134 16.3018 11.3754 15.221 12.4562C14.1403 13.5369 12.7679 14.8291 11.1038 16.3329L10 17.3252ZM10 15.2984C11.6 13.8588 12.9167 12.6248 13.95 11.5964C14.9833 10.5683 15.8 9.67502 16.4 8.91669C17 8.15835 17.4167 7.48494 17.65 6.89644C17.8833 6.3081 18 5.72544 18 5.14844C18 4.14844 17.6667 3.3151 17 2.64844C16.3333 1.98177 15.5 1.64844 14.5 1.64844C13.7103 1.64844 12.9805 1.87244 12.3105 2.32044C11.6407 2.7686 11.1102 3.39202 10.7192 4.19069H9.28075C8.88325 3.38552 8.35117 2.76052 7.6845 2.31569C7.01783 1.87085 6.28967 1.64844 5.5 1.64844C4.50633 1.64844 3.67458 1.98177 3.00475 2.64844C2.33492 3.3151 2 4.14844 2 5.14844C2 5.72544 2.11667 6.3081 2.35 6.89644C2.58333 7.48494 3 8.15835 3.6 8.91669C4.2 9.67502 5.01667 10.5667 6.05 11.5917C7.08333 12.6167 8.4 13.8523 10 15.2984Z";

    const hoverPath =
      "M10 17.3267L8.89625 16.3345C7.23858 14.8307 5.86775 13.5384 4.78375 12.4577C3.69975 11.3769 2.84075 10.415 2.20675 9.57199C1.57275 8.72916 1.12983 7.96024 0.878 7.26524C0.626 6.57041 0.5 5.86533 0.5 5.14999C0.5 3.73083 0.9785 2.54266 1.9355 1.58549C2.89267 0.628494 4.08083 0.149994 5.5 0.149994C6.373 0.149994 7.198 0.354161 7.975 0.762494C8.752 1.17083 9.427 1.75641 10 2.51924C10.573 1.75641 11.248 1.17083 12.025 0.762494C12.802 0.354161 13.627 0.149994 14.5 0.149994C15.9192 0.149994 17.1073 0.628494 18.0645 1.58549C19.0215 2.54266 19.5 3.73083 19.5 5.14999C19.5 5.86533 19.374 6.57041 19.122 7.26524C18.8702 7.96024 18.4272 8.72916 17.7932 9.57199C17.1593 10.415 16.3018 11.3769 15.221 12.4577C14.1403 13.5384 12.7679 14.8307 11.1038 16.3345L10 17.3267Z";

    productsHeart.forEach((product, index) => {
      product.addEventListener("mouseenter", () => {
        heartPaths[index].setAttribute("d", hoverPath);
      });

      product.addEventListener("mouseleave", () => {
        heartPaths[index].setAttribute("d", originalPath);
      });
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
