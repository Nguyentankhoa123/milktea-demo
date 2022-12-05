let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartShow = document.querySelector(".cart span");
const productList = document.querySelector(".product_list");
const productTotal = document.querySelector(".product_total");

function getCount() {
  //Lay tong so luong
  var res = localStorage.getItem("cartsCount") || 0;
  return parseInt(res);
}

document.addEventListener("DOMContentLoaded", function (event) {
  //Cap nhat lại the hien thi cartShow khi trang duoc tai
  cartShow.textContent = getCount();
  let loginUser = localStorage.getItem("loginUser");
  if (loginUser != null) {
    document.querySelector(".cart").style.display = "block";
    setUser(loginUser);
  }
});

const updateCount = (newCount) => {
  //Sua lai the hien thi cartShow
  cartShow.innerHTML = newCount;
  //Cap nhat lai localStorage cartsCount
  localStorage.setItem("cartsCount", newCount);
};

function updateTotal() {
  var sum = 0;
  cart.forEach((e) => {
    price = document.getElementById("price" + e.key);
    price.innerHTML = productPrice(e.key);
    sum += productPrice(e.key);
  });
  productTotal.innerHTML = ` <tr>
  <td>Tổng giá tiền</td>
  <td>${sum}đ</td>
  <td onclick="pay()" class = "pay">Đặt hàng</td>
</tr>`;
}

function productPrice(key) {
  product = cart.filter((e) => e.key == key)[0];
  return product.count * $products[product.key].price;
}

const removeCart = (key) => {
  // Lay so luong san pham bi xoa
  amount = cart.filter((e) => e.key == key)[0].count;
  //Cap nhat lai tong so san pham
  var newCount = getCount() - amount;
  updateCount(newCount);
  //Lay danh sach cac san pham con lai
  cart = cart.filter((e) => e.key !== key);
  //Cap nhat lai localStorage cart
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};

let total = 0;
cart.forEach((e) => {
  productList.innerHTML += `<tr>
    <td><img src = "${$products[e.key].photo}" style="width: 80px"/></td>
    <td><p>${$products[e.key].name}</p></td>
    <td class ="button_count">
      <button class="minus" onclick="minus(${e.key})">-</button>
      <span class="count${e.key}">${e.count}</span>
      <button class="plus" onclick="plus(${e.key})">+</button>
    </td>
    <td><p #price_product>${$products[e.key].price}</p></td>
    <td id="price${e.key}">${$products[e.key].price * e.count}</td>
    <td class= "remove-product"><i class="fa-regular fa-circle-xmark" onclick="removeCart(${
      e.key
    })"></i></td>
  </tr>`;

  total += $products[e.key].price * e.count;
});

productTotal.innerHTML += ` <tr>
      <td>Tổng giá tiền</td>
      <td>${total}đ</td>
      <td onclick = "pay()" class="pay">Đặt hàng</td>
</tr>`;

// Dat hang
function pay() {
  alert("Đặt hàng thành công");
  localStorage.removeItem("cart");
  localStorage.removeItem("cartsCount");
  cartShow.textContent = 0;
  location.reload();
}

function minus(key) {
  //Lay so luong va tong so luong
  var amount = cart.filter((e) => e.key == key)[0].count;
  var prdCount = getCount();
  //Kiem tra so luong san pham sau khi giam co bang 0
  if (amount - 1) {
    //Cap nhat lai tong so luong va so luong
    updateCount(prdCount - 1);
    updateAmount(key, false);
    //Sua the hien thi so luong
    count = document.querySelector(".count" + key);
    count.innerHTML = amount - 1;
    updateTotal();
  } else {
    removeCart(key);
  }
}

function plus(key) {
  //Lay so luong san pham
  var amount = cart.filter((e) => e.key == key)[0].count;
  var prdCount = getCount();
  //Cap nhat lai tong so luong va so luong
  updateAmount(key, true);
  updateCount(prdCount + 1);
  //Sua the hien thi so luong
  count = document.querySelector(".count" + key);
  count.innerHTML = amount + 1;
  updateTotal();
}

const updateAmount = (key, add) => {
  cart = cart.map((e) => {
    if (e.key === key) {
      if (add) {
        return {
          ...e,
          count: e.count + 1,
        };
      } else {
        return {
          ...e,
          count: e.count - 1,
        };
      }
    }
    return e;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
};
