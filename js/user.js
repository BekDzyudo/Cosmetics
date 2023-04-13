document.getElementById("logout").onclick = function () {
  window.location.replace("../login.html");
};

// slider
let index = 1;
sliderShow(index);
function sliderShow(n) {
  let slider = document.getElementsByClassName("banner_top");
  let dot = document.getElementsByClassName("indikator");
  if (n > slider.length) {
    index = 1;
  }
  if (n < 1) {
    index = slider.length;
  }
  for (let i = 0; i < slider.length; i++) {
    slider[i].style.display = "none";
  }
  for (let i = 0; i < dot.length; i++) {
    dot[i].className = dot[i].className.replace("active", "");
  }

  slider[index - 1].style.display = "flex";
  dot[index - 1].className += " active";
}

function nextprev(n) {
  sliderShow((index += n));
}
function clickDot(n) {
  sliderShow((index = n));
}
// ==================================================================

// Products

let our_row = document.querySelector(".our_row");
let newPro = document.getElementById("newPro");
let onsalePro = document.getElementById("onsalePro");
let upcomingPro = document.getElementById("upcomingPro");
let korzinka = document.querySelectorAll(".korzinka");
let addRemove = document.querySelector(".addRemove");
let minus = document.getElementById("minus");
let pilus = document.getElementById("pilus");
let sonPro = document.getElementById("sonPro");
let productsArr = [];
let newProArr = [];
let onsaleProArr = [];
let upcomingProArr = [];

function getAllProducts() {
  fetch(
    "https://book-shelter-60a65-default-rtdb.firebaseio.com/cosmeticProducts.json"
  )
    .then((res) => {
      if (!res.ok) throw new Error("nimadir xato");
      return res.json();
    })
    .then((res) => {
      productsArr = Object.keys(res || {}).map((item) => {
        return {
          ...res[item],
          id: item,
        };
      });

      newProArr = productsArr.filter((item) => {
        return item.category === "new";
      });
      onsaleProArr = productsArr.filter((item) => {
        return item.category === "onsale";
      });
      upcomingProArr = productsArr.filter((item) => {
        return item.category === "upcoming";
      });

      // renderHtmlProducts();
      renderIf();
      renderPageinationNumbers(newProArr.length);
      renderHtmlBookUser(choppedBooksItem(newProArr));
    })
    .catch((err) => {})
    .finally(() => {});
}
getAllProducts();

function renderHtmlProducts() {
  let result = productsArr
    .map((item, index) => {
      let result = `
      <div class="our_card">
      <div class="our_img">
       <img src=${item.files} alt="">
      </div>
      <div class="our_bottom">
         <p class="our_card_desc">
           ${item.products_desc}
         </p>
         <div class="our_shop">
           <p class="price">$${item.price.replace(
             /\B(?=(\d{3})+(?!\d))/g,
             " "
           )}</p>
           <i id="korzinka" class="fa fa-shopping-cart" aria-hidden="true"></i>
         </div>
      </div>
      <form action="" class="ourForm">
       <input type="button" value=${item.category} id="ourBtn">
      </form>
     </div>
    `;
      return result;
    })
    .join(" ");
  our_row.innerHTML = result;
}

// =====================================================================
// Blog

let blog_row = document.querySelector(".blog_row");
let blogArr = [];

function getAllBlog() {
  fetch(
    "https://book-shelter-60a65-default-rtdb.firebaseio.com/cosmeticBlog.json"
  )
    .then((res) => {
      if (!res.ok) throw new Error("nimadir xato");
      return res.json();
    })
    .then((res) => {
      blogArr = Object.keys(res || {}).map((item) => {
        return {
          ...res[item],
          id: item,
        };
      });
      // renderHtmlBlog();
      renderPageinationNumbersBlog(blogArr.length);
      renderHtmlBlogUser(choppedBlogsItem(blogArr));
    })
    .catch((err) => {})
    .finally(() => {});
}

getAllBlog();

function renderHtmlBlog() {
  let result = blogArr
    .map((item, index) => {
      let d = new Date(item.dateBlog);
      let datestring =
        d.getDate() +
        "." +
        (d.getMonth() + 1) +
        "." +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      let result = `
      <div class="blog_card">
      <div class="blog_image">
        <img src=${item.filesBlog} alt="">
      </div>
      <h3>${item.categoryBlog}</h3>
      <h2>${item.products_desc_Blog}</h2>
      <p>Posted by <span id="author">${item.author}</span> <span id="years">${datestring}</span> </p>
    </div>
    `;
      return result;
    })
    .join(" ");
  blog_row.innerHTML = result;
}

function renderIf() {
  newPro.addEventListener("click", () => {
    renderPageinationNumbers(newProArr.length);
    renderHtmlBookUser(choppedBooksItem(newProArr));

    newPro.style.color = "#5a5ac9";
    onsalePro.style.color = "black";
    upcomingPro.style.color = "black";
    newPro.style.borderBottom = "1px solid #5a5ac9";
    onsalePro.style.borderBottom = "none";
    upcomingPro.style.borderBottom = "none";
  });
  onsalePro.addEventListener("click", () => {
    renderPageinationNumbers(onsaleProArr.length);
    renderHtmlBookUser(choppedBooksItem(onsaleProArr));

    newPro.style.color = "black";
    onsalePro.style.color = "#5a5ac9";
    upcomingPro.style.color = "black";
    newPro.style.borderBottom = "none";
    onsalePro.style.borderBottom = "1px solid #5a5ac9";
    upcomingPro.style.borderBottom = "none";
  });
  upcomingPro.addEventListener("click", () => {
    renderPageinationNumbers(upcomingProArr.length);
    renderHtmlBookUser(choppedBooksItem(upcomingProArr));

    newPro.style.color = "black";
    onsalePro.style.color = "black";
    upcomingPro.style.color = "#5a5ac9";
    newPro.style.borderBottom = "none";
    onsalePro.style.borderBottom = "none";
    upcomingPro.style.borderBottom = "1px solid #5a5ac9";
  });
}

// Blog Pagination

let step = 4;
let page = 1;

function choppedBlogsItem(blogs) {
  let start = step * page - step;
  let end = start + step;

  return blogs.slice(start, end);
}

function renderHtmlBlogUser(yengiArr) {
  let result = yengiArr // booksArr
    .map((item, index) => {
      let d = new Date(item.dateBlog);
      let datestring =
        d.getDate() +
        "." +
        (d.getMonth() + 1) +
        "." +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();

      let result = `
      <div class="blog_card">
      <div class="blog_image">
        <img src=${item.filesBlog} alt="">
      </div>
      <h3>${item.categoryBlog}</h3>
      <h2>${item.products_desc_Blog}</h2>
      <p>Posted by <span id="author">${item.author}</span> <span id="years">${datestring}</span> </p>
    </div>
    `;
      return result;
    })
    .join(" ");
  blog_row.innerHTML = result;
}

function renderPageinationNumbersBlog(length) {
  let pageNumbers = Math.ceil(length / step);
  let result = "";
  for (let i = 0; i < pageNumbers; i++) {
    result += `
    <li>
    <button class="blogBtnPage ${page == i + 1 ? "active" : ""}">${
      i + 1
    }</button>
  </li>
    `;
  }
  document.querySelector(".blogPage").innerHTML = result;

  document.querySelectorAll(".blogBtnPage").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      page = +e.target.innerHTML;
      getAllBlog();
    });
  });
}

// ========================================================================
// Products Pagenation

function choppedBooksItem(products) {
  let start = step * page - step;
  let end = start + step;

  return products.slice(start, end);
}

function renderHtmlBookUser(yengiArr) {
  let result = yengiArr // booksArr
    .map((item, index) => {
      let result = `
      <div class="our_card">
      <div class="our_img">
       <img src=${item.files} alt="">
      </div>
      <div class="our_bottom">
         <p class="our_card_desc">
           ${item.products_desc}
         </p>
         <div class="our_shop">
           <p class="price">$${item.price.replace(
             /\B(?=(\d{3})+(?!\d))/g,
             " "
           )}</p>
           <i class="fa fa-shopping-cart korzinka" aria-hidden="true"></i>
           
         </div>
      </div>
      <form action="" class="ourForm">
       <input type="button" value=${item.category} id="ourBtn">
      </form>
     </div>
    `;
      return result;
    })
    .join(" ");
  our_row.innerHTML = result;
}

function renderPageinationNumbers(length) {
  let pageNumbers = Math.ceil(length / step);
  let result = "";
  for (let i = 0; i < pageNumbers; i++) {
    result += `
    <li>
    <button class="productBtnPage ${page == i + 1 ? "active" : ""}">${
      i + 1
    }</button>
  </li>
    `;
  }
  document.querySelector(".productPage").innerHTML = result;

  document.querySelectorAll(".productBtnPage").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      page = +e.target.innerHTML;
      getAllProducts();
    });
  });
}
document.getElementById("kassaIcon").onclick = function () {
  window.location.replace("../kassa.html");
};
