let our_pro = document.querySelector(".our_pro");
let our_blog = document.querySelector(".our_blog");

let products = document.querySelector(".products");
let blogs = document.querySelector(".blogs");
let product_form = document.getElementById("product_form");
let blog_form = document.getElementById("blog_form");
let files = document.getElementById("files");
let filesBlog = document.getElementById("filesBlog");
let products_desc = document.getElementById("products_desc");
let products_desc_Blog = document.getElementById("products_desc_Blog");
let price = document.getElementById("price");
let category = document.getElementById("category");
let categoryBlog = document.getElementById("categoryBlog");
let author = document.getElementById("author");
let dateBlog = document.getElementById("dateBlog");
let savePro = document.getElementById("savePro");
let saveBlog = document.getElementById("saveBlog");
let closePro = document.getElementById("closePro");
let closeBlog = document.getElementById("closeBlog");

document.getElementById("back").onclick = function () {
  window.location.replace("../index.html");
};

our_pro.onclick = function () {
  our_pro.style.color = "orange";
  our_blog.style.color = "white";
};
our_blog.onclick = function () {
  our_pro.style.color = "white";
  our_blog.style.color = "orange";
};

let globalImageUrl;
let globalImageUrlBlog;

function saveProductData() {
  const saveProductObj = {
    files: globalImageUrl,
    products_desc: products_desc.value,
    price: price.value,
    category: category.value,
  };

  fetch(
    "https://book-shelter-60a65-default-rtdb.firebaseio.com/cosmeticProducts.json",
    {
      method: "POST",
      body: JSON.stringify(saveProductObj),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("nimadir xato");
      return res.json();
    })
    .then((res) => {
      product_form.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //   showBtnLoading(false);
      //   getAllBooks();
    });
}

function filefunc(e) {
  const formData = new FormData();

  Promise.all(
    [...e.target.files].map((item) => {
      formData.append("formFile", item);
      return fetch("https://api.oqot.uz/api/1.0/file/upload", {
        method: "POST",
        body: formData,
      }).then((res) => {
        return res.json();
      });
    })
  ).then((res) => {
    globalImageUrl = res
      .map((item) => {
        return `https://api.oqot.uz/api/1.0/file/download/${item}`;
      })
      .join(" ");
  });

  const file1 = e.target.files[0];
  document
    .getElementById("exam_img")
    .setAttribute("src", URL.createObjectURL(file1));
}

files.addEventListener("change", filefunc);
savePro.addEventListener("click", saveProductData);
// =======================================================================
// Blog

function saveBlogData() {
  const saveBlogObj = {
    filesBlog: globalImageUrlBlog,
    products_desc_Blog: products_desc_Blog.value,
    author: author.value,
    categoryBlog: categoryBlog.value,
    dateBlog: dateBlog.value,
  };

  fetch(
    "https://book-shelter-60a65-default-rtdb.firebaseio.com/cosmeticBlog.json",
    {
      method: "POST",
      body: JSON.stringify(saveBlogObj),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("nimadir xato");
      return res.json();
    })
    .then((res) => {
      blog_form.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //   showBtnLoading(false);
      //   getAllBooks();
    });
}

function filefuncBlog(e) {
  const formData = new FormData();

  Promise.all(
    [...e.target.files].map((item) => {
      formData.append("formFile", item);
      return fetch("https://api.oqot.uz/api/1.0/file/upload", {
        method: "POST",
        body: formData,
      }).then((res) => {
        return res.json();
      });
    })
  ).then((res) => {
    globalImageUrlBlog = res
      .map((item) => {
        return `https://api.oqot.uz/api/1.0/file/download/${item}`;
      })
      .join(" ");
  });

  const file2 = e.target.files[0];
  document
    .getElementById("exam_img_blog")
    .setAttribute("src", URL.createObjectURL(file2));
}

filesBlog.addEventListener("change", filefuncBlog);
saveBlog.addEventListener("click", saveBlogData);

// ============================================================================

our_pro.addEventListener("click", () => {
  products.style.display = "block";
  blogs.style.display = "none";
});
our_blog.addEventListener("click", () => {
  blogs.style.display = "block";
  products.style.display = "none";
});
closePro.addEventListener("click", () => {
  products.style.display = "none";
});
closeBlog.addEventListener("click", () => {
  blogs.style.display = "none";
});
