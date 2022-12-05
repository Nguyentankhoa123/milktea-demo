const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a");
const foodTitle = document.querySelectorAll(".product_title button");
const foodList = document.querySelectorAll(".product_item");
const login = document.querySelector(".login button");
const register = document.querySelector(".register button");
const modal1 = document.getElementById("id01");
const modal2 = document.getElementById("id02");
const signupText = document.getElementById("signup-text");

const $products = [
  {
    name: "Trà Sữa Chocolate",
    price: 26000,
    photo: "images/chocolate.jpg",
  },
  {
    name: "Trà Sữa Vị Nhài",
    price: 30000,
    photo: "images/trasuavinhai.jpg",
  },
  {
    name: "Trà Đào Bưởi Hồng Trân Châu",
    price: 27000,
    photo: "images/tra-dao-buoi-hong-tran-chau-baby.jpg",
  },
  {
    name: "Trà Xanh",
    price: 26000,
    photo: "images/Tra-Xanh-2.jpg",
  },
  {
    name: "Trà Sữa Ô Long",
    price: 28000,
    photo: "images/trasuaolong.jpg",
  },
  {
    name: "Trà Dứa Nhiệt Đới",
    price: 25000,
    photo: "images/traduanhietdoi.jpg",
  },
  {
    name: "Trà Xanh Xoài",
    price: 250000,
    photo: "images/tra-xanh-xoai.jpg",
  },
  {
    name: "Ô Long Xoài Kem Cà Phê",
    price: 30000,
    photo: "images/O-Long-xoai-kem-coffee.jpg",
  },
  {
    name: "Hồng Trà Bưởi Mật Ong",
    price: 32000,
    photo: "images/hong-tra-buoi-mat-ong.jpg",
  },
  {
    name: "Sữa Chua Mận Hạt Sen",
    price: 27000,
    photo: "images/sua-chua-man-hat-sen-.png",
  },
  {
    name: "Trà Sữa Macchiato Trân Châu",
    price: 31000,
    photo: "images/machiaototranchau.jpg",
  },
  {
    name: "Dâu Tằm Kem Phô Mai",
    price: 28000,
    photo: "images/dautamkemphomai.jpg",
  },
  {
    name: "Trà Xanh Kem Phô Mai",
    price: 31000,
    photo: "images/machiaototranchau.jpg",
  },
  {
    name: "Matcha Đậu Đỏ",
    price: 30000,
    photo: "images/matchadaudo.jpg",
  },
  {
    name: "Trà Sữa Matcha",
    price: 30000,
    photo: "images/matcha.jpg",
  },
  {
    name: "Trà Sữa Trân Châu Hoàng Gia",
    price: 31000,
    photo: "images/chanchauhoanggia.jpg",
  },
  {
    name: "Jelly Đào",
    price: 3000,
    photo: "images/jellydao.jpg",
  },
  {
    name: "Củ Năng",
    price: 5000,
    photo: "images/cunang.jpg",
  },
  {
    name: "Khúc Bạch",
    price: 3000,
    photo: "images/khucbach.jpg",
  },
  {
    name: "Trân Châu Hoàng Kim",
    price: 4000,
    photo: "images/tranchauhoangkim.jpg",
  },
];

navLinks.forEach((link) => {
  index = document.querySelector("#link_index");
  if (activePage == "/") {
    index.classList.add("active");
  } else {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

window.addEventListener("scroll", () => {
  const scrollUp = document.querySelector(".scrollUp");
  scrollUp.classList.toggle("active", window.scrollY > 20);
});

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

/* Login */

login.addEventListener("click", () => {
  document.getElementById("id01").style.display = "block";
});

window.addEventListener("click", function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }

  if (event.target == modal2) {
    modal2.style.display = "none";
  }
});

/* Register */

register.addEventListener("click", () => {
  document.getElementById("id02").style.display = "block";
});

signupText.addEventListener("click", () => {
  modal1.style.display = "none";
  document.getElementById("id02").style.display = "block";
});

const pwShowHide = document.querySelector(".showHide");
const pwFields = document.getElementById("password");

pwShowHide.addEventListener("click", () => {
  if (pwFields.type === "password") {
    pwFields.type = "text";
    pwShowHide.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    pwFields.type = "password";
    pwShowHide.classList.replace("fa-eye", "fa-eye-slash");
  }
});

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

const phone = document.getElementById("phone"),
  regUser = document.getElementById("reg_username"),
  email = document.getElementById("email"),
  regPass = document.getElementById("reg_password"),
  rePass = document.getElementById("reg_rePassword");

function signUp() {
  //Kiem tra tai khoan da ton tai
  var dup = accounts.filter((e) => e.uid == regUser.value)[0];
  if (dup != null) {
    alert("Tài khoản đã tồn tại!");
  } else {
    if (regPass.value != rePass.value) {
      alert("Mật khẩu nhập lại không chính xác!");
    } else {
      //Them tai khoan moi
      alert("Tạo tài khoản thành công!");
      accounts.push({
        phone: phone.value,
        email: email.value,
        uid: regUser.value,
        pwd: regPass.value,
      });
    }
  }

  //Cap nhat lai localStorage accounts
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

const userName = document.getElementById("username");

function signIn() {
  //Tim user co ton tai
  user = accounts.filter((e) => e.uid == userName.value)[0];
  if (user != null) {
    if (user.pwd == pwFields.value) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("loginUser", user.uid);
    } else {
      alert("Sai mật khẩu!");
      loginError();
    }
  } else {
    alert("Tài khoản không tồn tại!");
    loginError();
  }
}

function loginError() {
  //Cap nhat so lan dang nhap loi
  loginTime = parseInt(localStorage.getItem("loginTime")) || 0;
  localStorage.setItem("loginTime", loginTime + 1);
}

function setUser(userName) {
  const authMenu = document.querySelector(".auth_menu");
  const userMenu = document.querySelector(".user_menu");
  authMenu.innerHTML =
    `<img src = "images/image_user.jpg" class="image_user">` +
    userName +
    `<div class="logout" onClick="logOut()">Đăng xuất</div>`;
}

document.addEventListener("DOMContentLoaded", function (event) {
  let loginUser = localStorage.getItem("loginUser");
  if (loginUser != null) {
    setUser(loginUser);
  }
  loginTime = parseInt(localStorage.getItem("loginTime"));
  if (loginTime == 5) {
    disableLogin();
    setTimeout(enableLogin, 10000);
    localStorage.setItem("loginTime", 0);
  }
});

function enableLogin() {
  //Enable cho phep nhap input login
  userName.disabled = false;
  pwFields.disabled = false;
}

function disableLogin() {
  //Disable khong cho nhap input login
  userName.disabled = true;
  pwFields.disabled = true;
}

function logOut() {
  localStorage.removeItem("loginUser");
  const mainMenu = document.querySelector(".main_menu");
  mainMenu.style.display = "none";
  location.reload();
}

const bars = document.querySelector(".menu_bars");
const mainMenu = document.querySelector(".main_menu");
const bodyOverlay = document.querySelector(".body_overlay");
const authMenu = document.querySelector(".auth_menu");
const headerLogo = document.querySelector(".header_logo");

bars.addEventListener("click", () => {
  bars.classList.toggle("active");
  mainMenu.classList.toggle("push");
  bodyOverlay.classList.toggle("active");
  authMenu.classList.toggle("active");
  headerLogo.classList.toggle("active");
});

window.onclick = function (event) {
  if (event.target == bodyOverlay) {
    mainMenu.classList.remove("push");
    bodyOverlay.classList.remove("active");
    bars.classList.remove("active");
    authMenu.classList.remove("active");
    headerLogo.classList.remove("active");
  }
};
