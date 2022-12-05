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
    timer: 2000,
  });
}
