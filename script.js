// Get the page elements once, so they can be reused in the submit handler.
const form = document.querySelector("#converter-form");
const temperatureInput = document.querySelector("#temperature");
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");
const result = document.querySelector("#result");

// Unit symbols make the result concise and readable.
const symbols = {
  celsius: "°C",
  fahrenheit: "°F",
  kelvin: "K",
};

// Convert every input to Celsius first. Celsius is the common base unit.
function toCelsius(value, unit) {
  if (unit === "fahrenheit") return (value - 32) * (5 / 9);
  if (unit === "kelvin") return value - 273.15;
  return value;
}

// Convert a Celsius value into the requested output unit.
function fromCelsius(value, unit) {
  if (unit === "fahrenheit") return (value * 9) / 5 + 32;
  if (unit === "kelvin") return value + 273.15;
  return value;
}

// Run the conversion when the user submits the form.
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Keep the browser from reloading the page.

  const inputValue = Number(temperatureInput.value);
  const celsiusValue = toCelsius(inputValue, fromUnit.value);
  const convertedValue = fromCelsius(celsiusValue, toUnit.value);

  // Limit long decimal results without adding unnecessary trailing zeroes.
  const displayValue = Number(convertedValue.toFixed(2));
  result.textContent = `${inputValue} ${symbols[fromUnit.value]} = ${displayValue} ${symbols[toUnit.value]}`;
});
