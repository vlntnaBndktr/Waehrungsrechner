const form = document.forms.currencyConverter;

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const baseCurrency = form.convertFrom.value;
  convert(baseCurrency);
}

const swap = document.getElementById('swap')

swap.addEventListener('click', exchangeCurrency)

//-------------------------------------------------------------------------

async function convert(baseCurrency) {
  const amount = document.getElementById('amount').value;
  const convertTo = document.getElementById('convertTo').value;

  try {
    const response = await fetch(
      `/convert?amount=${amount}&base=${baseCurrency}&convertTo=${convertTo}`
    );
    if (response.ok) {
      const data = await response.json();
      // mit response.ok check ob Statuscode 200
      const resultElement = document.getElementById('result');
      resultElement.textContent = `Umgerechnet: ${data.convertedAmount.toFixed(
        2
      )} ${convertTo.toUpperCase()}`;

      const timestampElement = document.getElementById('timestamp');
      timestampElement.textContent = `Zeitstempel: ${data.timestamp}`;
    } else {
      throw new Error('Fehler bei der Währungsumrechnung');
    }
  } catch (error) {
    console.log(error);
  }
}

function exchangeCurrency() {
  const convertFrom = document.getElementById('convertFrom');
  const convertTo = document.getElementById('convertTo');

  const temp = convertFrom.value;
  convertFrom.value = convertTo.value;
  convertTo.value = temp;
} 