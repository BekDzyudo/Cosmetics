document.getElementById("loginBtn").onclick = function () {
  window.location.replace("../admin.html");
  addRegister();
};

let token = localStorage.getItem("reg");
// if (token) {
//   window.location.replace("../admin.html");
// }

let username = document.getElementById("username");
let password = document.getElementById("password");

let loginArr = [];

function addRegister() {
  let loginObj = {
    username: username.value,
    password: password.value,
  };
  loginArr.push(loginObj);
  localStorage.setItem("reg", JSON.stringify(loginArr));
}
