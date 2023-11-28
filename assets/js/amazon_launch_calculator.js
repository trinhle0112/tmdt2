const DOM = {
  productAge: document.querySelector('#product-age'),
  giveAwayDaysLength: document.querySelector('.give-away-days-length'),
  productPrice: document.querySelector('.product-price'),
  findingMethod: document.querySelector('.finding-method'),
  searchVolume: document.querySelector('.search-volume-number'),
  currentRankingPosition: document.querySelector('.current-ranking-number'),
  targetRankingPosition: document.querySelector('.target-ranking-number'),
  units: document.querySelector('.units'),
  budget: document.querySelector('.budget'),
};

const events = ['input', 'change'];

const coupleKeySelectors = [
  ['search-volume-number', 'search-volume-range'],
  ['current-ranking-number', 'current-ranking-range'],
  ['target-ranking-number', 'target-ranking-range'],
];

const productAgeStatusEnum = {
  true: 'old',
  false: 'new',
};

const triggerTargetRankingMax = currentRankingPosition => {
  const targetRankingPositionRange = document.querySelector(`.${coupleKeySelectors[2][1]}`);
  const targetRankingPositionNumber = document.querySelector(`.${coupleKeySelectors[2][0]}`);
  const maxTargetRankingValue =
    currentRankingPosition == 1 ? 1 : Number(currentRankingPosition) - 1;
  [targetRankingPositionNumber, targetRankingPositionRange].forEach(targetRanking => {
    targetRanking.max = maxTargetRankingValue;
    if (
      Number(currentRankingPosition) < Number(targetRankingPositionNumber.value) ||
      Number(currentRankingPosition) == Number(targetRankingPositionNumber.value)
    ) {
      targetRanking.value = maxTargetRankingValue;
    }
  });
};

const addCoupleChangingEvent = () => {
  coupleKeySelectors.forEach(([keyNumber, keyRange]) => {
    const numberTxt = document.querySelector(`.${keyNumber}`);
    const rangerSliderPicker = document.querySelector(`.${keyRange}`);
    events.forEach(event => {
      numberTxt.addEventListener(`${event}`, function () {
        rangerSliderPicker.value = this.value;
        if (keyNumber === coupleKeySelectors[1][0]) {
          triggerTargetRankingMax(this.value);
        }
      });
    });
    events.forEach(event => {
      rangerSliderPicker.addEventListener(`${event}`, function () {
        numberTxt.value = this.value;
        if (keyRange === coupleKeySelectors[1][1]) {
          triggerTargetRankingMax(this.value);
        }
      });
    });
  });
};

function calculateAmazonValue() {
  const productAgeStatusValue = productAgeStatusEnum[DOM.productAge.checked.toString()];
  const giveAwayDaysLengthValue = Number(DOM.giveAwayDaysLength.value);
  const productPrice = Number(DOM.productPrice.value);
  const selectedFindingMethod = DOM.findingMethod.value;
  const amazonSearchVolumeValue = Number(DOM.searchVolume.value);
  const currentRankingPositionValue = Number(DOM.currentRankingPosition.value);
  const targetRankingPositionValue = Number(DOM.targetRankingPosition.value);

  let oldProductSfbPercent = 0;
  let totalRebatedUnit = 0;
  let budget = 0;

  if (productAgeStatusValue == 'new') {
    if (selectedFindingMethod === 'custom-url') {
      oldProductSfbPercent =
        parseFloat(currentRankingPositionValue) / parseFloat(targetRankingPositionValue) / 1750;
      totalRebatedUnit = oldProductSfbPercent * amazonSearchVolumeValue;
      budget = parseFloat(totalRebatedUnit) * parseFloat(productPrice);
    } else {
      oldProductSfbPercent =
        parseFloat(currentRankingPositionValue) / parseFloat(targetRankingPositionValue) / 3000;
      totalRebatedUnit = oldProductSfbPercent * amazonSearchVolumeValue;
      budget = parseFloat(totalRebatedUnit) * parseFloat(productPrice);
    }
  } else {
    if (selectedFindingMethod == 'custom-url') {
      oldProductSfbPercent =
        parseFloat(currentRankingPositionValue) / parseFloat(targetRankingPositionValue) / 834;
      totalRebatedUnit = oldProductSfbPercent * amazonSearchVolumeValue;
      budget = parseFloat(totalRebatedUnit) * parseFloat(productPrice);
    } else {
      oldProductSfbPercent =
        parseFloat(currentRankingPositionValue) / parseFloat(targetRankingPositionValue) / 1250;
      totalRebatedUnit = oldProductSfbPercent * amazonSearchVolumeValue;
      budget = parseFloat(totalRebatedUnit) * parseFloat(productPrice);
    }
  }
  let parDay = 1;
  let totalDaysPer = parDay / giveAwayDaysLengthValue;
  let units = parseFloat(totalDaysPer) * parseFloat(totalRebatedUnit);
  let unit = '';

  if (Math.round(units.toFixed(2)) === 0) {
    unit = 1;
  } else {
    unit = Math.round(units.toFixed(2));
  }
  if (isNaN(unit)) {
    DOM.units.textContent = '-';
  } else {
    DOM.units.textContent = unit;
  }
  if (isNaN(budget)) {
    DOM.budget.textContent = '-';
  } else {
    DOM.budget.textContent = addCommas(budget.toFixed(2));
  }
}

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

calculateAmazonValue();
(() => {
  addCoupleChangingEvent();
  const convertTwoDimensionalArrayToDom = (dimensionalArray = []) =>
    dimensionalArray.flat().map(key => document.querySelector(`.${key}`));
  const formControls = [
    ...Object.values(DOM).slice(0, 4),
    ...convertTwoDimensionalArrayToDom(coupleKeySelectors),
  ];
  events.forEach(event =>
    formControls.forEach(dom => {
      dom.addEventListener(`${event}`, calculateAmazonValue);
    })
  );
})();
