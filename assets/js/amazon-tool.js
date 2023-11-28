const DOM = {
  generateBtn: document.querySelector('.generate-btn'),
  toolForm: document.querySelector('.tool-form'),
  resultNotification: document.querySelector('.result'),
  copyBtn: document.querySelector('.copy'),
  newTabBtn: document.querySelector('.new-tab'),
  places: document.querySelectorAll('.place'),
  selectBox: document.querySelector('.select-checkbox'),
  selectedPlace: document.querySelector('.selected-place'),
  dropdownIcon: document.querySelector('.fa-caret-down'),
};

const toolType = DOM.toolForm.name;

const keySelectors = [
  'field-brand',
  'field-keywords',
  'field-asin',
  'low-price',
  'high-price',
  'hidden-keywords',
  'keywords',
  'keyword-1',
  'keyword-2',
  'keyword-3',
  'keyword-4',
  'keyword-5',
  'ASIN-1',
  'ASIN-2',
  'ASIN-3',
  'ASIN-4',
  'Quantity-1',
  'Quantity-2',
  'Quantity-3',
  'Quantity-4',
  'ASINs',
];

const asinValidate = [
  keySelectors[2],
  keySelectors[5],
  keySelectors[12],
  keySelectors[13],
  keySelectors[14],
  keySelectors[15],
];

const numberValidate = [
  keySelectors[3],
  keySelectors[4],
  keySelectors[16],
  keySelectors[17],
  keySelectors[18],
  keySelectors[19],
];

const whiteSpaceValidate = [
  keySelectors[3],
  keySelectors[4],
  keySelectors[16],
  keySelectors[17],
  keySelectors[18],
  keySelectors[19],
  keySelectors[7],
  keySelectors[8],
  keySelectors[9],
  keySelectors[10],
  keySelectors[11],
];

const missingParamsValidate = [
  keySelectors[18],
  keySelectors[19],
  keySelectors[15],
  keySelectors[14],
];

function createQueryParams(userInputRecord = {}) {
  if (toolType === '7') {
    return userInputRecord[keySelectors[20]].split('\n').join('%7C+');
  }
  let canonicalUrl = '';
  const mapInputRecordToQuery = Object.keys(userInputRecord)
    .map(key => {
      let paramValue = userInputRecord[key];
      if (paramValue !== '') {
        switch (key) {
          case keySelectors[0]:
          case keySelectors[1]:
            paramValue = paramValue
              .split(/\s+/)
              .filter(word => word !== '')
              .join('+');
            break;
          case keySelectors[7]:
          case keySelectors[8]:
          case keySelectors[9]:
          case keySelectors[10]:
          case keySelectors[11]:
            canonicalUrl = `${userInputRecord[keySelectors[7]]}-${
              userInputRecord[keySelectors[8]]
            }-${userInputRecord[keySelectors[9]]}-${userInputRecord[keySelectors[10]]}-${
              userInputRecord[keySelectors[11]]
            }/dp/${userInputRecord[keySelectors[2]]}`;
            break;
        }
        return `&${key}=${paramValue}`;
      }
    })
    .join('');
  return canonicalUrl !== '' ? canonicalUrl : mapInputRecordToQuery;
}

function renderResult(userInputRecord = {}) {
  const marketPlace = DOM.selectedPlace.textContent.trim();
  const query = createQueryParams(userInputRecord);
  switch (toolType) {
    case '1':
      return `https://www.${marketPlace}/s/ref=nb_sb_noss_2?url=search-alias%3Daps${query}`;
    case '2':
      return `https://www.${marketPlace}/s/ref=nb_sb_noss_1?url=search-alias%3Daps${query}`;
    case '3':
      return `https://www.${marketPlace}/s/?ie=UTF8${query}&rh=i:aps,ssx:relevance`;
    case '4':
      return `https://www.${marketPlace}/${query}`;
    case '5':
    case '6':
      return `https://www.${marketPlace}/gp/aws/cart/add.html?${query
        .replace(/&/, '')
        .replace(/\-/g, '.')}`;
    case '7':
      return `https://www.${marketPlace}/s/?k=${query}&ref=nb_sb_noss`;
  }
}

const removeDropdownFocusBorder = (formInputKeys = []) => {
  formInputKeys.forEach(inputKey => {
    const inputField = document.querySelector(`.${inputKey}`);
    if (inputField !== null) {
      inputField.addEventListener('click', () => {
        DOM.selectedPlace.classList.remove('border-focus');
      });
    }
  });
};

const isContainWhiteSpace = word => word.split('').includes(' ');

let canOpenInNewTab = false;

const validateUserInput = (userInputRecord = {}) => {
  let message = '';
  let isError = false;
  let keyHasError = '';
  for (let key in userInputRecord) {
    const value = userInputRecord[key];
    if (value !== '' && asinValidate.includes(key)) {
      if (value.length !== 10) {
        message = 'ASIN must be 10 characters long!';
        isError = true;
        keyHasError = key;
      }
      if (isContainWhiteSpace(value) === true) {
        message = 'ASIN must not contain white spaces!';
        isError = true;
        keyHasError = key;
      }
    }

    if (value !== '' && numberValidate.includes(key)) {
      if (!Number(value)) {
        message = 'Input must be a number!';
        isError = true;
        keyHasError = key;
      }
      if (Number(value) < 1) {
        message = 'Number must be greater than 0!';
        isError = true;
        keyHasError = key;
      }
    }

    if (value !== '' && whiteSpaceValidate.includes(key)) {
      if (isContainWhiteSpace(value) === true) {
        message = 'Your input must not contain white spaces!';
        isError = true;
        keyHasError = key;
      }
    }

    if (value !== '' && missingParamsValidate.includes(key)) {
      if (userInputRecord[keySelectors[14]] !== '' && userInputRecord[keySelectors[18]] === '') {
        isError = true;
        keyHasError = keySelectors[18];
        message = 'Quantity field is missing!';
      }
      if (userInputRecord[keySelectors[15]] !== '' && userInputRecord[keySelectors[19]] === '') {
        isError = true;
        keyHasError = keySelectors[19];
        message = 'Quantity field is missing!';
      }
      if (userInputRecord[keySelectors[14]] === '' && userInputRecord[keySelectors[18]] !== '') {
        isError = true;
        keyHasError = keySelectors[14];
        message = 'ASIN field is missing!';
      }
      if (userInputRecord[keySelectors[15]] === '' && userInputRecord[keySelectors[19]] !== '') {
        isError = true;
        keyHasError = keySelectors[15];
        message = 'ASIN filed is missing!';
      }
    }

    if (value !== '' && key === keySelectors[20]) {
      value
        .split('\n')
        .filter(word => word !== '')
        .forEach(asin => {
          if (isContainWhiteSpace(asin) === true) {
            message = 'Your input must not contain white spaces!';
            isError = true;
            keyHasError = key;
          }
          if (asin.length !== 10) {
            message = 'ASIN must be 10 characters long!';
            isError = true;
            keyHasError = key;
          }
        });
    }
  }

  canOpenInNewTab = isError;
  if (isError === true) {
    document.querySelector(`.${keyHasError}`).focus();
    return (DOM.resultNotification.value = message);
  }

  return (DOM.resultNotification.value = renderResult(userInputRecord));
};

DOM.toolForm.addEventListener('submit', e => {
  e.preventDefault();
  const mapUserInputToRecord = keySelectors.reduce((acc, domKey) => {
    const input = document.querySelector(`.${domKey}`);
    if (input) {
      acc[input.name] = input.value;
    }
    return acc;
  }, {});
  validateUserInput(mapUserInputToRecord);
});

DOM.copyBtn.addEventListener('click', () => {
  DOM.resultNotification.select();
  DOM.resultNotification.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(DOM.resultNotification.value);
});

DOM.newTabBtn.addEventListener('click', () => {
  const link =
    canOpenInNewTab === false
      ? DOM.resultNotification.value
      : 'https://www.amazon.com/no-result-found';
  window.open(link, '__blank');
});

DOM.dropdownIcon.addEventListener('click', () => {
  DOM.selectBox.checked === true ? (DOM.selectBox.checked = false) : (DOM.selectBox.checked = true);
  DOM.selectedPlace.classList.add('border-focus');
});

DOM.selectBox.addEventListener('change', () => DOM.selectedPlace.classList.toggle('border-focus'));

DOM.places.forEach(place => {
  place.addEventListener('click', () => {
    DOM.selectBox.checked = false;
    DOM.selectedPlace.innerHTML = `<img src="${place.childNodes[1].src.trim()}"
      alt="flag"
      class="flag"/>${place.textContent.trim()}`;
    DOM.selectedPlace.classList.add('border-focus');
  });
});

removeDropdownFocusBorder(keySelectors);
