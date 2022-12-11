let cart = JSON.parse(localStorage.getItem("cart")) || [];
const products = document.querySelectorAll(".product_item");
const cartShow = document.querySelector(".cart span");

document.addEventListener("DOMContentLoaded", function (event) {
  prdCount = parseInt(localStorage.getItem("cartsCount")) || 0;
  cartShow.textContent = prdCount;
});

function cartCount() {
  let prdCount = localStorage.getItem("cartsCount");

  prdCount = parseInt(prdCount);

  if (prdCount) {
    localStorage.setItem("cartsCount", prdCount + 1);
    cartShow.textContent = prdCount + 1;
  } else {
    localStorage.setItem("cartsCount", 1);
    cartShow.textContent = prdCount = 1;
  }
}

const addToCart = (key) => {
  let added = false;

  cart = cart.map((e) => {
    if (e.key === key) {
      added = true;
      return {
        ...e,
        count: e.count + 1,
      };
    }
    return e;
  });

  if (!added)
    cart.push({
      key,
      count: 1,
    });

  localStorage.setItem("cart", JSON.stringify(cart));
};
products.forEach((product, key) => {
  const button = product.querySelector("button");

  button.addEventListener("click", () => {
    addToCart(key);
    cartCount();
    sweetalertclick();
  });
});

document.addEventListener("DOMContentLoaded", function (event) {
  let loginUser = localStorage.getItem("loginUser");
  if (loginUser != null) {
    document.querySelector(".cart").style.display = "block";
    setUser(loginUser);
  }
});

function sweetalertclick() {
  Swal.fire({
    icon: "success",
    title: "Sản phẩm đã được thêm vào giỏ hàng",
    showConfirmButton: false,
    timer: 1000,
  });
}

const foodTitle = document.querySelectorAll(".product_title button");
const foodList = document.querySelectorAll(".product_item");

foodTitle.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const type = e.target.getAttribute("type-food");
    document
      .querySelector(".product_title button.show")
      .classList.remove("show");
    e.target.classList.add("show");

    foodList.forEach((item) => {
      if (type == "all" || item.getAttribute("type-food") == type) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

/* Search */
document.querySelector(".search-input").addEventListener("keypress", () => {
  let searchInput = document.querySelector(".search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let foodList = document.querySelectorAll(".product_item");

  elements.forEach((element, index) => {
    if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
      foodList[index].classList.remove("hide");
    } else {
      foodList[index].classList.add("hide");
    }
  });
});

const iconSearch = document.querySelector(".fa-magnifying-glass");
const searchIcon = document.querySelector(".search-input");
window.addEventListener("click", (e) => {
  if (e.target == iconSearch) {
    searchIcon.classList.toggle("show-input");
  } else {
    searchIcon.classList.remove("show-input");
  }
  if (e.target == searchIcon) {
    searchIcon.classList.add("show-input");
  }
});
