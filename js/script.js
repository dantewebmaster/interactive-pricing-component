const rangeInput = document.querySelector('#range');
const rangeInputBar = document.querySelector('#range-bar');
const rangeValue = document.querySelector('#page-views-value');
const priceElement = document.querySelector('#price');

const MAX_ON_K = 1000;

// set value + width on init app
const convertedRangeValue = rangeInput.value * 10;
const viewsNumber = convertedRangeValue < MAX_ON_K ? convertedRangeValue : 1;
const viewsText = convertedRangeValue < MAX_ON_K ? 'K' : 'M';
rangeValue.innerText = `${viewsNumber} ${viewsText}`;
rangeInputBar.style.width = `${rangeInput.value}%`;

handlePrice(convertedRangeValue);

// set value  and width on input changed
rangeInput.oninput = (e) => {
  const convertedRangeValueChanged = e.target.value * 10;
  const viewsNumberChanged =
    convertedRangeValueChanged < MAX_ON_K ? convertedRangeValueChanged : 1;
  const viewsTextChanged = convertedRangeValueChanged < MAX_ON_K ? 'K' : 'M';

  rangeInputBar.style.width = `${e.target.value}%`;

  rangeValue.innerText = `${viewsNumberChanged} ${viewsTextChanged}`;

  handlePrice(convertedRangeValueChanged);
};

function handlePrice(value) {
  // - 10K pageviews / $8 per month
  // - 50K pageviews / $12 per month
  // - 100K pageviews / $16 per month
  // - 500k pageviews / $24 per month
  // - 1M pageviews / $36 per month

  const priceByViews = {
    baby: '$8.00',
    starter: '$12.00',
    medium: '$16.00',
    large: '$24.00',
    bigger: '$36.00',
  };

  if (value < 50) {
    return (priceElement.innerText = priceByViews['baby']);
  }

  if (value < 100) {
    return (priceElement.innerText = priceByViews['starter']);
  }

  if (value < 500) {
    return (priceElement.innerText = priceByViews['medium']);
  }

  if (value < 1000) {
    return (priceElement.innerText = priceByViews['large']);
  }

  if (value >= 1000) {
    return (priceElement.innerText = priceByViews['bigger']);
  }
}
