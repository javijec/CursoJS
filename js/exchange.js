let exchangeRate = 1;

const currencySelector = document.getElementById("currency-selector");

currencySelector.addEventListener("change", updateExchangeRate);

// Actualizar la tasa de cambio
async function updateExchangeRate() {
    if (currencySelector.value === "dolar") {
      const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
      const data = await response.json();
      exchangeRate = data.blue.value_sell;
      localStorage.setItem("dolar", JSON.stringify(exchangeRate));
    } else {
      exchangeRate = 1;
    }
  }
