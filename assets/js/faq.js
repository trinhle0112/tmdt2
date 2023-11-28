function amazonppcFn() {
  const element1 = document.getElementById("amazonppc");
  const element2 = document.getElementById("agencies");
  const element3 = document.getElementById("pricing-faq");
  const element4 = document.getElementById("smart-fulfillment");

  const btn1 = document.querySelector("#amazonppcBtn");
  const btn2 = document.querySelector("#agenciesBtn");
  const btn3 = document.querySelector("#pricingBtn");
  const btn4 = document.querySelector("#smartBtn");

  element1.style.display = "block";
  element2.style.display = "none";
  element3.style.display = "none";
  element4.style.display = "none";

  btn1.classList.add("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
}

function agenciesFn() {
  const element1 = document.getElementById("agencies");
  const element2 = document.getElementById("amazonppc");
  const element3 = document.getElementById("pricing-faq");
  const element4 = document.getElementById("smart-fulfillment");

  const btn1 = document.querySelector("#agenciesBtn");
  const btn2 = document.querySelector("#amazonppcBtn");
  const btn3 = document.querySelector("#pricingBtn");
  const btn4 = document.querySelector("#smartBtn");

  element1.style.display = "block";
  element2.style.display = "none";
  element3.style.display = "none";
  element4.style.display = "none";

  btn1.classList.add("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
}

function pricingFn() {
  const element1 = document.getElementById("pricing-faq");
  const element2 = document.getElementById("agencies");
  const element3 = document.getElementById("amazonppc");
  const element4 = document.getElementById("smart-fulfillment");

  const btn1 = document.querySelector("#pricingBtn");
  const btn2 = document.querySelector("#agenciesBtn");
  const btn3 = document.querySelector("#amazonppcBtn");
  const btn4 = document.querySelector("#smartBtn");

  element1.style.display = "block";
  element2.style.display = "none";
  element3.style.display = "none";
  element4.style.display = "none";

  btn1.classList.add("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
}

function smartFn() {
  const element1 = document.getElementById("smart-fulfillment");
  const element2 = document.getElementById("agencies");
  const element3 = document.getElementById("pricing-faq");
  const element4 = document.getElementById("amazonppc");

  const btn1 = document.querySelector("#smartBtn");
  const btn2 = document.querySelector("#agenciesBtn");
  const btn3 = document.querySelector("#pricingBtn");
  const btn4 = document.querySelector("#amazonppcBtn");

  element1.style.display = "block";
  element2.style.display = "none";
  element3.style.display = "none";
  element4.style.display = "none";

  btn1.classList.add("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
}
