var checkExtraPrice = document.querySelector('#checkExtraPrice');
var extraPrice = document.querySelector('#extraPrice');

var option1RangeSlider = document.querySelector('#option1RangeSlider');
var option2RangeSlider = document.querySelector('#option2RangeSlider');
var option3RangeSlider = document.querySelector('#option3RangeSlider');

var option1QtyInput = document.querySelector('#option1QtyInput');
var option2QtyInput = document.querySelector('#option2QtyInput');
var option3QtyInput = document.querySelector('#option3QtyInput');

var option1Qty = document.querySelector('#option1Qty');
var option2Qty = document.querySelector('#option2Qty');
var option3Qty = document.querySelector('#option3Qty');

var option1Price = document.querySelector('#option1Price');
var option1Extra = document.querySelector('#option1Extra');
var option2Price = document.querySelector('#option2Price');
var option3Price = document.querySelector('#option3Price');
var totalPrice = document.querySelector('#totalPrice');

var numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function enterValue() {
  option1RangeSlider.value = option1QtyInput.value;
  option2RangeSlider.value = option2QtyInput.value;
  option3RangeSlider.value = option3QtyInput.value;
  calculate();
}

function checkStatus() {
  checkExtraPrice.checked = !checkExtraPrice.checked;
  checkExtraPrice.checked
    ? extraPrice.classList.add('d-block')
    : extraPrice.classList.remove('d-block');
  calculate();
}

function calculate() {
  sumOptions();
  showInput();
  showSummary();
}

function sumOptions() {
  return (
    this.calculateOption1() +
    this.calculateExtraPrice() +
    this.calculateOption2() +
    this.calculateOption3()
  );
}

function showInput() {
  option1QtyInput.value = option1RangeSlider.value;
  option2QtyInput.value = option2RangeSlider.value;
  option3QtyInput.value = option3RangeSlider.value;
}

function showSummary() {
  option1Qty.innerHTML = option1RangeSlider.value;
  option2Qty.innerHTML = option2RangeSlider.value;
  option3Qty.innerHTML = option3RangeSlider.value;

  option1Price.innerHTML = numberFormatter.format(calculateOption1());
  option1Extra.innerHTML = numberFormatter.format(calculateExtraPrice());
  option2Price.innerHTML = numberFormatter.format(calculateOption2());
  option3Price.innerHTML = numberFormatter.format(calculateOption3());
  totalPrice.innerHTML = numberFormatter.format(sumOptions());
}

function calculateOption1() {
  return option1RangeSlider.value * 49;
}

function calculateExtraPrice() {
  return checkExtraPrice.checked ? 9 : 0;
}

function calculateOption2() {
  return option2RangeSlider.value * 129;
}

function calculateOption3() {
  return option3RangeSlider.value * 150;
}

calculate();
