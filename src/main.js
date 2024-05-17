/* Loader */

window.addEventListener("load", function () {
  const Loader = document.querySelector(".loader-container");
  const LoadingBar = document.querySelector(".loader");
  Loader.className += "loaded";
  LoadingBar.className += "loaded";
});

/* - - - - - - */


/* On scroll animation */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));

/* - - - - - - */


/* Swiper */

var swiper = new Swiper(".slide-content", {
  spaceBetween: 30,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  },
});

/* - - - - - - */


/* navBar */

const navToggle = document.querySelector("#navToggle");
const navClose = document.querySelector("#navClose");
const nav = document.querySelector(".navBar__links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.add("nav__open");
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    nav.classList.remove("nav__open");
    document.body.style.height = "";
    document.body.style.overflow = "";
  });
}

/* - - - - */


/* Fetch data */

let allDishes = [];

const addDataToHTML = (targetElement, itemList) => {
  targetElement.innerHTML = "";
  if (itemList.length > 0) {
    itemList.forEach((dish) => {
      let newDish = document.createElement("div");
      newDish.classList.add("dishes-card");
      newDish.dataset.id = dish.id;
      newDish.innerHTML = `
        <div class="card-top ${dish.img_class}">
          <img src="${dish.img_src}" alt="${dish.name}">
        </div>

        <button class="addToCart">
          <span>Add to Cart</span>
        </button>

        <div class="card-bottom">
          <span class="card-title">${dish.name}</span>
          <span class="card-price">${dish.price} DH</span>
          <span class="card-ingredients">${dish.ingredients}</span>
        </div>
      `;
      targetElement.appendChild(newDish);
    });
  }
};

const fetchData = (url, itemList, targetElement) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      itemList.length = 0;
      itemList.push(...data);
      allDishes.push(...data);
      addDataToHTML(targetElement, itemList);
    });
};

/* - - - - - - - - */


/* Main Dishes data */
const mainDishes = document.querySelector("#mainDish");
let mainDishes_List = [];

fetchData("../data/mainDishes.json", mainDishes_List, mainDishes);

/* Soups data */
const soups = document.querySelector("#Soup");
let soups_List = [];

fetchData("../data/SoupsData.json", soups_List, soups);

/* Salades data */
const salades = document.querySelector("#Salade");
let salades_List = [];

fetchData("../data/SaladesData.json", salades_List, salades);

/* Desserts data */
const desserts = document.querySelector("#Dessert");
let desserts_List = [];

fetchData("../data/DessertsData.json", desserts_List, desserts);

/* - - - - - - - - */


/* Cart list */

const cartOpen = document.querySelector(".cart-icon");
const cartClose = document.querySelector(".close-cart-btn");
const cart = document.querySelector(".cart-TAB");
const sections = document.querySelectorAll(".wrapper");

cartOpen.addEventListener("click", () => {
  cart.classList.add("cart-show");
  sections.forEach(section => {
    section.classList.add("body-move");
  });
});

cartClose.addEventListener("click", () => {
  cart.classList.remove("cart-show");
  sections.forEach(section => {
    section.classList.remove("body-move");
  });
});

/* - - - - */


/* Checkout */

const checkoutOpen = document.querySelector(".checkout-btn");
const checkoutClose = document.querySelector(".fa-xmark");
const checkout = document.querySelector(".checkout-TAB");
let checkoutTotal = document.querySelector(".checkout-details .total-price");
let checkoutQuantity = document.querySelector(".checkout-details .total-quantity");

checkoutOpen.addEventListener("click", () => {
  checkout.classList.add("checkout-show");
});

checkoutClose.addEventListener("click", () => {
  checkout.classList.remove("checkout-show");
});

/* - - - - */


/* Add to cart */

const cartList = document.querySelector(".cart-list");
let cartTotal = document.querySelector(".cart-icon span");
let CartListHTML = [];

const DisplayDish = () => {
  cartList.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;
  if (CartListHTML.length > 0) {
    CartListHTML.forEach(dish => {
      totalItems += dish.quantity;
      let newCart_item = document.createElement("div");
      newCart_item.classList.add("list-item");
      newCart_item.dataset.id = dish.dishID;

      let findDish = allDishes.findIndex((value) => value.id == dish.dishID);
      let info = allDishes[findDish];

      newCart_item.innerHTML = `
        <div class="list-image">
          <img src="${info.img_src}" alt="${info.name}">
        </div>

        <div class="details">
          <span class="details-title">${info.name} </span>
          <span class="details-price">${info.price * dish.quantity} DH</span>
        </div>

        <div class="quantity">
          <button class="plus-btn">+</button>
          <span>${dish.quantity}</span>
          <button class="minus-btn">-</button>
        </div>
      `;
      cartList.appendChild(newCart_item);
    });
    cartTotal.innerHTML = totalItems;
    checkoutQuantity.innerHTML = totalItems;
    CartListHTML.forEach(dish => {
      totalPrice += dish.quantity * allDishes[dish.dishID - 1].price;
    });
    checkoutTotal.innerHTML = totalPrice + " DH";
  }
}

const UpdateCart = (dishID) => {
  let DishisPresent = CartListHTML.findIndex((value) => value.dishID === dishID);
  if (CartListHTML.length <= 0) {
    CartListHTML = [{
      dishID: dishID,
      quantity: 1
    }]
  } else if (DishisPresent < 0) {
    CartListHTML.push({
      dishID: dishID,
      quantity: 1
    });
  } else {
    CartListHTML[DishisPresent].quantity += 1;
  }
  DisplayDish();
  saveDataLocal();
};

const addToCart = (targetElement) => {
  targetElement.addEventListener("click", (event) => {
    let clickPosition = event.target;
    if (clickPosition.classList.contains("addToCart")) {
      let dishID = clickPosition.parentElement.dataset.id;
      UpdateCart(dishID);
    };
  })
};

addToCart(mainDishes);
addToCart(salades);
addToCart(soups);
addToCart(desserts);

cartList.addEventListener("click", (event) => {
  let clickPosition = event.target;
  let listItem = clickPosition.closest('.list-item');
  let dishID = listItem.dataset.id;
  let findDish = CartListHTML.findIndex((value) => value.dishID == dishID);

  console.log(CartListHTML[findDish]);

  if (clickPosition.classList.contains("plus-btn")) {
    CartListHTML[findDish].quantity += 1;
    
  } else if (clickPosition.classList.contains("minus-btn")) {
    if (CartListHTML[findDish].quantity > 1) {
      CartListHTML[findDish].quantity -= 1;
    } else {
      CartListHTML.splice(findDish, 1);
    }
  }
  DisplayDish();
  saveDataLocal();
});

/* - - - - - - */