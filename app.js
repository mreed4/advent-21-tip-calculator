const tipAmount = document.querySelector("#tip-amount");
const totalPerPerson = document.querySelector("#total-per-person");
const billAmount = document.querySelector("#bill-amount");
const numberOfPeople = document.querySelector("#number-of-people");

const tipButtons = document.querySelectorAll("input[name='tip']");
const calculateButton = document.querySelector("#calculate");

let percentage = 0;
let defaultPercentage = 0.2;

(function setDefaultPercentage() {
  tipButtons.forEach((button) => {
    if (button.value.includes(`${defaultPercentage * 100}%`)) {
      button.checked = true;
    }
  });
  percentage = defaultPercentage;
})();

function calculate(percentage) {
  const bill = parseFloat(billAmount.value);
  const people = parseInt(numberOfPeople.value);
  const tip = bill * percentage;
  const total = bill + tip;
  const perPerson = total / people;

  tipAmount.textContent = `${tip.toFixed(2)}`;
  totalPerPerson.textContent = `${perPerson.toFixed(2)}`;
}

function setPercentage(button) {
  percentage = button.value.split("%")[0] / 100;
  console.log(percentage);
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPercentage(button);
  });
});

calculateButton.addEventListener("click", () => {
  calculate(percentage);
});

billAmount.addEventListener("blur", () => {
  if (billAmount.value === "" || parseFloat(billAmount.value) === 0) {
    calculateButton.disabled = true;
  }

  if (billAmount.value !== "" && parseFloat(billAmount.value) > 0) {
    calculateButton.disabled = false;
  }

  if (Number(billAmount.value) < 0) {
    billAmount.value = "0";
  }

  if (billAmount.value !== "" && !billAmount.value.includes(".")) {
    billAmount.value += ".00";
  }

  if (billAmount.value.includes(".") && [3, 4].includes(billAmount.value.length)) {
    billAmount.value += "0";
  }
});
