const rangeInput = document.querySelector('#range');
const rangeInputBar = document.querySelector('#range-bar');
const rangeValue = document.querySelector('#page-views-value');
const priceElement = document.querySelector('#price');
const discountSwitch = document.querySelector('#discount-switch');

const MAX_ON_K = 1000;

let withDiscount = false;

const priceByViews = {
  baby: 8.0,
  starter: 12.0,
  medium: 16.0,
  large: 24.0,
  bigger: 36.0,
};

// set value + width on init app
const convertedRangeValue = rangeInput.value * 10;
const viewsNumber = convertedRangeValue < MAX_ON_K ? convertedRangeValue : 1;
const viewsText = convertedRangeValue < MAX_ON_K ? 'K' : 'M';

rangeValue.innerText = `${viewsNumber} ${viewsText}`;
rangeInputBar.style.width = `${rangeInput.value}%`;

handlePrice(convertedRangeValue);

function handlePrice(rangeValue) {
  // - 10K pageviews / $8 per month
  // - 50K pageviews / $12 per month
  // - 100K pageviews / $16 per month
  // - 500k pageviews / $24 per month
  // - 1M pageviews / $36 per month

  let currentValue;

  if (rangeValue < 50) {
    currentValue = withDiscount
      ? addDiscount(priceByViews['baby'])
      : priceByViews['baby'];

    return (priceElement.innerText = formatMoney(currentValue));
  }

  if (rangeValue < 100) {
    currentValue = withDiscount
      ? addDiscount(priceByViews['starter'])
      : priceByViews['starter'];

    return (priceElement.innerText = formatMoney(currentValue));
  }

  if (rangeValue < 500) {
    currentValue = withDiscount
      ? addDiscount(priceByViews['medium'])
      : priceByViews['medium'];

    return (priceElement.innerText = formatMoney(currentValue));
  }

  if (rangeValue < 1000) {
    currentValue = withDiscount
      ? addDiscount(priceByViews['large'])
      : priceByViews['large'];

    return (priceElement.innerText = formatMoney(currentValue));
  }

  if (rangeValue >= 1000) {
    currentValue = withDiscount
      ? addDiscount(priceByViews['bigger'])
      : priceByViews['bigger'];

    return (priceElement.innerText = formatMoney(currentValue));
  }
}

function addDiscount(value, percent = 25) {
  const totalPercent = (percent / 100) * value;
  return value - totalPercent;
}

function formatMoney(value, currency = 'BRL', locale = 'pt-BR') {
  if (!value) return;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

/*
 * Event listeners
 */
// set value  and width on input changed
rangeInput.oninput = (event) => {
  const convertedRangeValueChanged = event.target.value * 10;
  const viewsNumberChanged =
    convertedRangeValueChanged < MAX_ON_K ? convertedRangeValueChanged : 1;
  const viewsTextChanged = convertedRangeValueChanged < MAX_ON_K ? 'K' : 'M';

  rangeInputBar.style.width = `${event.target.value}%`;
  rangeValue.innerText = `${viewsNumberChanged} ${viewsTextChanged}`;

  handlePrice(convertedRangeValueChanged);
};

discountSwitch.onchange = (event) => {
  withDiscount = event.target.checked;
  const convertedRangeValue = rangeInput.value * 10;

  handlePrice(convertedRangeValue);
};
