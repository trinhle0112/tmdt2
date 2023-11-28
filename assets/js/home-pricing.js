$(document).ready(() => {
  const SWITCH_TYPES = {
    MONTHLY_ANNUAL: "monthlyAnnual",
    AUTO_HYBRID: "autoHybrid",
  };
  const PACKAGE_TYPES = {
    BASIC: "basic",
    STANDARD: "standard",
    STANDARD2: "standard2",
    PREMIUM: "premium",
  };

  const selectors = {
    currency: $("#currency"),

    [SWITCH_TYPES.MONTHLY_ANNUAL]: {
      switchBtn: $(
        "#normal-plan-switch .pricing-tab-switcher, #normal-plan-switch .tab-btn"
      ),
      pricingTab: $(`#normal-plan-switch.pricing-tab`),
    },
    [SWITCH_TYPES.AUTO_HYBRID]: {
      switchBtn: $(
        `#hybrid-plan-switch .pricing-tab-switcher, #hybrid-plan-switch .tab-btn`
      ),
      pricingTab: $(`#hybrid-plan-switch.pricing-tab`),
    },

    [PACKAGE_TYPES.BASIC]: {
      priceText: $("#basic-price"),
      titleText: $("#basic-title"),
      description: $("#basic-description"),
      registerBtn: $("#basic-register"),
      demoBtn:$("#basic-demo"),
      priceFeature: $("#basic-feature"),
    },
    [PACKAGE_TYPES.STANDARD]: {
      priceText: $("#standard-price"),
      titleText: $("#standard-title"),
      description: $("#standard-description"),
      registerBtn: $("#standard-register"),
      demoBtn:$("#standard-demo"),
      priceFeature: $("#standard-feature"),
    },
    [PACKAGE_TYPES.STANDARD2]: {
      priceText: $("#standard-price2"),
      titleText: $("#standard-title2"),
      description: $("#standard-description2"),
      registerBtn: $("#standard-register2"),
      demoBtn:$("#standard-demo2"),
      priceFeature: $("#standard-feature2"),
    },
    [PACKAGE_TYPES.PREMIUM]: {
      priceText: $("#premium-price"),
      titleText: $("#premium-title"),
      description: $("#premium-description"),
      registerBtn: $("#premium-register"),
      demoBtn:$("#premium-demo"),
      priceFeature: $("#premium-feature"),
    },
  };

  let hasAnnualPlanSwitchOn = false;
  let hasHybridPlanSwitchOn = false;
  let hybridFeatures;
  let aiAutomatedFeatures;

  const planData = {
    monthly: null,
    annual: null,
    hybrid: null,
  };

  const getPlansInformation = () => {
    $.getJSON("/assets/data/plans.json", (data) => {
      planData.monthly = data;
      triggerRenderPlan();
    });
    $.getJSON("/assets/data/annual_plans.json", (data) => {
      planData.annual = data;
      triggerRenderPlan();
    });
    $.getJSON("/assets/data/hybrid_plans.json", (data) => {
      planData.hybrid = data;
      triggerRenderPlan();
    });
    $.getJSON("/assets/data/plan_features.json", (data) => {
      hybridFeatures = data.hybridFeatures;
      aiAutomatedFeatures = data.aiAutomatedFeatures;
      triggerRenderPlan();
    });
  };

  const triggerRenderPlan = () => {
    const selectedCurrency = selectors.currency.val();
    if (!hasAnnualPlanSwitchOn && !hasHybridPlanSwitchOn) {
      renderPlan(planData.monthly, selectedCurrency, aiAutomatedFeatures);
    } else if (hasAnnualPlanSwitchOn && !hasHybridPlanSwitchOn) {
      renderPlan(planData.annual, selectedCurrency, aiAutomatedFeatures);
    } else if (!hasAnnualPlanSwitchOn && hasHybridPlanSwitchOn) {
      renderPlan(planData.hybrid, selectedCurrency, hybridFeatures);
    }
  };

  const renderPlan = (plan, currencyCode, features) => {
    if (plan && currencyCode && features) {
      const [basic, standard, standard2, premium] = plan;
      renderPackage(basic, PACKAGE_TYPES.BASIC, currencyCode, features.basic);
      renderPackage(
        standard,
        PACKAGE_TYPES.STANDARD,
        currencyCode,
        features.standard
      );
      renderPackage(
        standard2,
        PACKAGE_TYPES.STANDARD2,
        currencyCode,
        features.standard2
      );
      renderPackage(
        premium,
        PACKAGE_TYPES.PREMIUM,
        currencyCode,
        features.premium
      );
    }
  };

  const renderPackage = (package, packageType, currencyCode, features) => {
    const priceInfo = getPriceInfoByCurrencyCode(package.price, currencyCode);

    if(isNaN(priceInfo.value))
    {
      selectors[packageType].priceText.html(
        `${priceInfo.value}`
      );
    }
else{    selectors[packageType].priceText.html(
      `${priceInfo.symbol} ${priceInfo.value} ${priceInfo.sub}`
    );
}
    selectors[packageType].titleText.html(package.name);
    selectors[packageType].description.html(package.description);
    // selectors[packageType].registerBtn.attr(
    //   "href",
    //   `/account/register?plan=${package.type}&currency=${currencyCode}`
    // );
    if(hasHybridPlanSwitchOn){
      selectors[packageType].registerBtn.hide();
      selectors[packageType].demoBtn.show();
    }
    else{
      selectors[packageType].registerBtn.show();
      selectors[packageType].demoBtn.hide();
    }
    renderFeatures(package, packageType, features);
  };

  const renderFeatures = (package, packageType, features) => {
    selectors[packageType].priceFeature.empty();
    const li = document.createElement("li");
    // const text = `${package.adspend} of ad revenues generated by AutoPilot`;
    // li.classList.add("have", "font-weight-bold");
    // li.append(text);
    selectors[packageType].priceFeature.append(li);
    features.forEach((element) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const text = element.title;
      span.innerHTML = text;
      li.appendChild(span);
      li.className = element.class;
      if (!!element.tooltipContent || !!element.gif) {
        span.className = "dotted";
        span.addEventListener("click", openModal);
        li.classList.add("custom-tooltip");
        li.append(renderTooltipWrapper(element));
      }
      selectors[packageType].priceFeature.append(li);
    });
  };

  const renderTooltipWrapper = (feature) => {
    const div = document.createElement("div");
    div.className = "tooltip-content";
    if (feature.tooltipContent) {
      const p = document.createElement("p");
      p.innerHTML = feature.tooltipContent;
      div.appendChild(p);
    }
    if (feature.gif) {
      const img = document.createElement("IMG");
      img.setAttribute("src", feature.gif);
      img.setAttribute("width", "100%");
      img.setAttribute("height", "auto");
      img.setAttribute("loading", "lazy");
      img.setAttribute("alt", feature.title);
      div.appendChild(img);
    }
    return div;
  };

  const openModal = (event) => {
    const modalGif = document.querySelector("#modalGif");
    const isMobileScreen = window.matchMedia("(max-width: 992px)").matches;
    if (isMobileScreen) {
      const title = event.target.innerText;
      const tooltipContent = event.target.nextSibling.cloneNode(true);
      modalGif.querySelector(".modal-title").innerText = title;
      modalGif
        .querySelector(".modal-body")
        .replaceChild(
          tooltipContent,
          modalGif.querySelector(".modal-body").childNodes[0]
        );
      $("#modalGif").modal("show");
    }
  };

  const getPriceInfoByCurrencyCode = (prices, currencyCode) =>
    prices.find((price) => price.code === currencyCode);

  const onToggleMonthlyAnnualSwitch = () => {
    hasAnnualPlanSwitchOn = !hasAnnualPlanSwitchOn;
    toggleSwitchUiClassNames(SWITCH_TYPES.MONTHLY_ANNUAL);

    if (hasAnnualPlanSwitchOn && hasHybridPlanSwitchOn) {
      onToggleAiHybridSwitch();
    }
  };

  const onToggleAiHybridSwitch = () => {
    hasHybridPlanSwitchOn = !hasHybridPlanSwitchOn;
    toggleSwitchUiClassNames(SWITCH_TYPES.AUTO_HYBRID);

    if (hasHybridPlanSwitchOn && hasAnnualPlanSwitchOn) {
      onToggleMonthlyAnnualSwitch();
    }
  };

  const toggleSwitchUiClassNames = (switchType) => {
    selectors[switchType].switchBtn.toggleClass("active");
    selectors[switchType].pricingTab.toggleClass("seleceted");
  };

  const initEvenListener = () => {
    selectors.currency.change((_) => {
      triggerRenderPlan();
    });

    selectors[SWITCH_TYPES.MONTHLY_ANNUAL].switchBtn.on("click", (_) => {
      onToggleMonthlyAnnualSwitch();
      triggerRenderPlan();
    });

    selectors[SWITCH_TYPES.AUTO_HYBRID].switchBtn.on("click", (_) => {
      onToggleAiHybridSwitch();
      triggerRenderPlan();
    });
  };

  initEvenListener();
  getPlansInformation();
});
