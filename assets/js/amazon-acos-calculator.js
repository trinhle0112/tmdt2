const acosCalculatorForm = document.querySelector('#acosCalculatorForm');

const calculateAcos = () => {
  const targetProfitMargin = document.querySelector(
    '#targetProfitMargin'
  ).value;
  const productPrice = document.querySelector('#productPrice').value;
  const manufacturingCosts = document.querySelector(
    '#manufacturingCosts'
  ).value;
  const shippingAndOverheadCosts = document.querySelector(
    '#shippingAndOverheadCosts'
  ).value;
  const amazonCosts = document.querySelector('#amazonCosts').value;
  const warehouseOrFbaCosts = document.querySelector(
    '#warehouseOrFbaCosts'
  ).value;
  const profitSelector = document.querySelector('#profit');
  const breakevenSelector = document.querySelector('#breakeven');
  const targetAcosSelector = document.querySelector('#targetAcos');

  const availableBudget =
    productPrice -
    manufacturingCosts -
    amazonCosts -
    warehouseOrFbaCosts -
    shippingAndOverheadCosts -
    productPrice * (targetProfitMargin / 100);
  const profit =
    productPrice -
    manufacturingCosts -
    amazonCosts -
    warehouseOrFbaCosts -
    shippingAndOverheadCosts -
    availableBudget;
  const target = Math.round((availableBudget / productPrice) * 100);
  const breakeven = Math.round(
    ((productPrice -
      manufacturingCosts -
      amazonCosts -
      warehouseOrFbaCosts -
      shippingAndOverheadCosts) /
      productPrice) *
      100
  );

  if (!isNaN(profit) && !isNaN(breakeven) && !isNaN(target)) {
    profitSelector.innerHTML = '$' + profit.toFixed(2);
    breakevenSelector.innerHTML = breakeven.toFixed(2) + '%';
    targetAcosSelector.innerHTML = target.toFixed(2) + '%';
  } else {
    profitSelector.innerHTML = '$0';
    breakevenSelector.innerHTML = '0%';
    targetAcosSelector.innerHTML = '0%';
  }
};

acosCalculatorForm.addEventListener('keyup', () => {
  calculateAcos();
});
