function aiFn() {
  const element1 = document.getElementById("ai_div");
  const element2 = document.getElementById("hybrid_div");
  const btn2 = document.querySelector("#hybridBtn");
  const btn1 = document.querySelector("#aiBtn");

  btn2.classList.remove("active");
  btn1.classList.add("active");

  if (element1) {
    element1.style.display = "flex";
  }

  if (element2) {
    element2.style.display = "none";
  }
}

function hybridFn() {
  const element1 = document.getElementById("hybrid_div");
  const element2 = document.getElementById("ai_div");
  const btn1 = document.querySelector("#hybridBtn");
  const btn2 = document.querySelector("#aiBtn");

  btn1.classList.add("active");
  btn2.classList.remove("active");

  if (element1) {
    element1.style.display = "flex";
  }

  if (element2) {
    element2.style.display = "none";
  }
}

function currencyChanged(value) {
  if (value == "usd") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    usdElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "cad") {
    const cadElements = document.querySelectorAll("#cad");
    const usdElements = document.querySelectorAll("#usd");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    cadElements.forEach(function (element) {
      element.style.display = "block";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "inr") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    inrElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "gbp") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    gbpElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "eur") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    eurElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "aed") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    aedElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "jpy") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    jpyElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "mxn") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    mxnElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    audElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  if (value == "aud") {
    const usdElements = document.querySelectorAll("#usd");
    const cadElements = document.querySelectorAll("#cad");
    const inrElements = document.querySelectorAll("#inr");
    const gbpElements = document.querySelectorAll("#gbp");
    const eurElements = document.querySelectorAll("#eur");
    const aedElements = document.querySelectorAll("#aed");
    const jpyElements = document.querySelectorAll("#jpy");
    const mxnElements = document.querySelectorAll("#mxn");
    const audElements = document.querySelectorAll("#aud");

    audElements.forEach(function (element) {
      element.style.display = "block";
    });
    cadElements.forEach(function (element) {
      element.style.display = "none";
    });
    usdElements.forEach(function (element) {
      element.style.display = "none";
    });
    inrElements.forEach(function (element) {
      element.style.display = "none";
    });
    gbpElements.forEach(function (element) {
      element.style.display = "none";
    });
    eurElements.forEach(function (element) {
      element.style.display = "none";
    });
    aedElements.forEach(function (element) {
      element.style.display = "none";
    });
    jpyElements.forEach(function (element) {
      element.style.display = "none";
    });
    mxnElements.forEach(function (element) {
      element.style.display = "none";
    });
  }
}
