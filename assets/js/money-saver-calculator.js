const tabs = document.getElementsByClassName("tab");
const steps = document.getElementsByClassName("step");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const calculateBtn = document.querySelector("#calculateBtn");
const monthlyPlanBtn = $("#month-btn");
const annuallyPlanBtn = $("#annual-btn");
const planTitle = $("#plan-title");
const bestPlan = $("#best-plan");
const currencySelectionBox = $("#currency");
const plansPackageSelectorKeys = ["#basicpricemon", "#standpricemon", "#prempricemon"];
const annualPlansPackageSelectorKeys = ["#basicpricean", "#standpricean", "#prempricean"];
let plans = [];
let annualPlans = []

const packageId = {
  Essentials: 1,
  Standard: 2,
  Premium: 3,
};

const planType = {
  annually: "annually",
  monthly: "monthly",
};

prevBtn.addEventListener("click", backStep);
nextBtn.addEventListener("click", nextStep);
calculateBtn.addEventListener("click", () => {
  calculatePrices(selectedPlan);
  nextStep();
});

let currentTab = 0;
showTab(currentTab);

function showTab(tabIndex) {
  tabs[tabIndex].style.display = "block";
  prevBtn.disabled = tabIndex === 0;
  nextBtn.style.display = tabIndex < tabs.length - 2 ? "inline-block" : "none";
  calculateBtn.style.display = tabIndex === tabs.length - 2 ? "inline-block" : "none";
  showActiveStep(tabIndex);
}

function backStep() {
  tabs[currentTab].style.display = "none";
  currentTab = currentTab - 1;
  showTab(currentTab);
}

function nextStep() {
  tabs[currentTab].style.display = "none";
  currentTab = currentTab + 1;
  showTab(currentTab);
}

function calculatePrices(selectedPlan) {
  // also get the variables and display the
  /*
  get the success fees for essentials, standard and premium
 add to success fees of each plan. 
 display total
  */
  // let basicCom, standardCom, premiumCom;
  // const monthlyRev = $("#monthly-rev").val();
  // if (selectedPlan === planType.monthly) {
  //   basicCom = Math.round(monthlyRev * 0.025);
  //   standardCom =  Math.round(monthlyRev * 0.015);
  //   premiumCom =  Math.round(monthlyRev * 0.01);
  // }
  // if (selectedPlan === planType.annually) {
  //   basicCom =  Math.round(monthlyRev * 0.02);
  //   standardCom =  Math.round(monthlyRev * 0.01);
  //   premiumCom =  Math.round(monthlyRev * 0.0075);
  // }

  /*
  commission for annual is slightly lower.
  Premium no longer has any commission
  */

  // if (basic_com > maxCharge) basic_com = maxCharge;
  // if (standard_com > maxCharge) standard_com = maxCharge;
  // if (premium_com > maxCharge) premium_com = maxCharge;

  // $("#essential-suc").html(curPrefix + " " + basicCom);
  // $("#standard-suc").html(curPrefix + " " + standardCom);
  // $("#premium-suc").html(curPrefix + " " + premiumCom);

  // const essentialTotal =  Math.round(basicCom+eMonthlyCost);
  // const standardTotal =  Math.round(standardCom + sMonthlyCost);
  // const premiumTotal =  Math.round(premiumCom + pMonthlyCost);
  // $("#essential-tot").html(curPrefix + " " + essentialTotal);
  // $("#standard-tot").html(curPrefix + " " + standardTotal);
  // $("#premium-tot").html(curPrefix + " " + premiumTotal);

  let people = $("#manage-people").val();
  let weekly = $("#often-week").val();
  let daily = $("#often-day").val();
  let campaigns = $("#campaign-numb").val();

  const campHours = campaigns * 0.1;
  const weekHours = people * weekly;
  const dailyHours = people * daily;
  let totalHours = Math.ceil((campHours + weekHours + dailyHours) * 4.1);
  $("#hours-saved").html(totalHours + " hours");

  const planShowing = selectedPlan === planType.monthly ? plans : annualPlans;
  eMonthlyCost = getCostFromPackageId(planShowing, packageId.Essentials, selectedCurrency);
  sMonthlyCost = getCostFromPackageId(planShowing, packageId.Standard, selectedCurrency);
  pMonthlyCost = getCostFromPackageId(planShowing, packageId.Premium, selectedCurrency);
  const minPlan = Math.min(eMonthlyCost, sMonthlyCost, pMonthlyCost);
  if (minPlan == pMonthlyCost) {
    bestPlan.html(" Premium");
  } else if (minPlan == sMonthlyCost) {
    bestPlan.html(" Standard");
  } else {
    bestPlan.html(" Essentials");
  }
}

function showActiveStep(index) {
  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.remove("active");
  }
  if (index !== steps.length) {
    steps[index].classList.add("active");
  }
}

const getCostFromPackageId = (plansArray = [], packageId = 1, selectedCurrency = "USD") =>
  plansArray
    .find(package => package.id === packageId)
    .price.find(price => price.code === selectedCurrency).value;

const getPricesFromPlans = (plansArray = [], selectedCurrency = "USD") =>
  plansArray.map(package => package.price.find(price => price.code === selectedCurrency));

const renderPlanPricesRow = (packagePrices = [], packageSelectorKeys = []) => {
  const withUpdatePackagePriceDom = pricesArray => (plan, index) =>
    $(plan).html(`${pricesArray[index].symbol}${pricesArray[index].value}`);

  packageSelectorKeys.forEach(withUpdatePackagePriceDom(packagePrices));
};

const displayActivePlanType = type => {
  const displayFromId = packageKey =>
    $(packageKey).attr("class", " position-absolute z-index-before");

  const hideFromId = packageKey => $(packageKey).attr("class", " position-absolute z-index-after");

  if (type === planType.monthly) {
    plansPackageSelectorKeys.forEach(displayFromId);
    annualPlansPackageSelectorKeys.forEach(hideFromId);
    selectedPlan = planType.monthly;
    planTitle.html("Monthly Cost");
    monthlyPlanBtn.addClass("active");
    annuallyPlanBtn.removeClass("active");
  }
  if (type === planType.annually) {
    plansPackageSelectorKeys.forEach(hideFromId);
    annualPlansPackageSelectorKeys.forEach(displayFromId);
    selectedPlan = planType.annually;
    planTitle.html("Annually Cost");
    annuallyPlanBtn.addClass("active");
    monthlyPlanBtn.removeClass("active");
  }
};

let curPrefix = "$";
let eMonthlyCost;
let sMonthlyCost;
let pMonthlyCost;
let selectedCurrency = "USD";
let selectedPlan = planType.monthly;

currencySelectionBox.change(async () => {
  plans = await fetch("./assets/data/plans.json").then(res => res.json());

  annualPlans = await fetch("./assets/data/annual_plans.json").then(res => res.json());
  selectedCurrency = currencySelectionBox.val();

  const mapPlansPackageToPrices = getPricesFromPlans(plans, selectedCurrency);
  const mapAnPlansPackageToPrices = getPricesFromPlans(annualPlans, selectedCurrency);

  renderPlanPricesRow(mapPlansPackageToPrices, plansPackageSelectorKeys);
  renderPlanPricesRow(mapAnPlansPackageToPrices, annualPlansPackageSelectorKeys);

  const planShowing = selectedPlan === planType.monthly ? plans : annualPlans;
  eMonthlyCost = getCostFromPackageId(planShowing, packageId.Essentials, selectedCurrency);
  sMonthlyCost = getCostFromPackageId(planShowing, packageId.Standard, selectedCurrency);
  pMonthlyCost = getCostFromPackageId(planShowing, packageId.Premium, selectedCurrency);

  curPrefix = mapPlansPackageToPrices[0].symbol;
  calculatePrices(selectedPlan);
  displayActivePlanType(selectedPlan);
});

window.onload = () => {
  currencySelectionBox.val(selectedCurrency).change();

  monthlyPlanBtn.click(() => {
    displayActivePlanType(planType.monthly);
    calculatePrices(selectedPlan);
  });

  annuallyPlanBtn.click(() => {
    displayActivePlanType(planType.annually);
    calculatePrices(selectedPlan);
  });
};
