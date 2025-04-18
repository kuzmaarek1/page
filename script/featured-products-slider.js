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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20.3252L10.8963 19.3329C9.23858 17.8291 7.86775 16.5369 6.78375 15.4562C5.69975 14.3754 4.84075 13.4134 4.20675 12.5704C3.57275 11.7276 3.12983 10.9587 2.878 10.2637C2.626 9.56885 2.5 8.86377 2.5 8.14844C2.5 6.72927 2.9785 5.5411 3.9355 4.58394C4.89267 3.62694 6.08083 3.14844 7.5 3.14844C8.373 3.14844 9.198 3.3526 9.975 3.76094C10.752 4.16927 11.427 4.75485 12 5.51769C12.573 4.75485 13.248 4.16927 14.025 3.76094C14.802 3.3526 15.627 3.14844 16.5 3.14844C17.9192 3.14844 19.1073 3.62694 20.0645 4.58394C21.0215 5.5411 21.5 6.72927 21.5 8.14844C21.5 8.86377 21.374 9.56885 21.122 10.2637C20.8702 10.9587 20.4272 11.7276 19.7932 12.5704C19.1593 13.4134 18.3018 14.3754 17.221 15.4562C16.1403 16.5369 14.7679 17.8291 13.1038 19.3329L12 20.3252ZM12 18.2984C13.6 16.8588 14.9167 15.6248 15.95 14.5964C16.9833 13.5683 17.8 12.675 18.4 11.9167C19 11.1584 19.4167 10.4849 19.65 9.89644C19.8833 9.3081 20 8.72544 20 8.14844C20 7.14844 19.6667 6.3151 19 5.64844C18.3333 4.98177 17.5 4.64844 16.5 4.64844C15.7103 4.64844 14.9805 4.87244 14.3105 5.32044C13.6407 5.7686 13.1102 6.39202 12.7192 7.19069H11.2808C10.8833 6.38552 10.3512 5.76052 9.6845 5.31569C9.01783 4.87085 8.28967 4.64844 7.5 4.64844C6.50633 4.64844 5.67458 4.98177 5.00475 5.64844C4.33492 6.3151 4 7.14844 4 8.14844C4 8.72544 4.11667 9.3081 4.35 9.89644C4.58333 10.4849 5 11.1584 5.6 11.9167C6.2 12.675 7.01667 13.5667 8.05 14.5917C9.08333 15.6167 10.4 16.8523 12 18.2984Z" fill="#1D1D1D"/>
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

    swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        hideOnClick: true,
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
          slidesPerView: 5,
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
