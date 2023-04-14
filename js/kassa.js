let pronum1 = document.getElementById("pronum1");
let pronum2 = document.getElementById("pronum2");
let pronum3 = document.getElementById("pronum3");
let proprice1 = document.getElementById("proprice1");
let proprice2 = document.getElementById("proprice2");
let proprice3 = document.getElementById("proprice3");
proprice1.value = pronum1.value * 38;
proprice2.value = pronum2.value * 54;
proprice3.value = pronum3.value * 27;
pronum1.addEventListener("input", () => {
  if (pronum1.value < 0) {
    proprice1.value = 0;
  }
  proprice1.value = pronum1.value * 38;
});
pronum2.addEventListener("input", () => {
  if (pronum2.value < 0) {
    proprice2.value = 0;
  }
  proprice2.value = pronum2.value * 54;
});
pronum3.addEventListener("input", () => {
  if (pronum3.value < 0) {
    proprice3.value = 0;
  }
  proprice3.value = pronum3.value * 27;
});
