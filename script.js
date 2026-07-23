const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let state = {
  currentValue: "",
  previousValue: null,
  operator: null,
};

const operatorMap = {
  "+": "+",
  "-": "-",
  "÷": "/",
  "×": "*",
};

function updateDisplay() {
  display.textContent = state.currentValue;
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    state = { ...state, currentValue: state.currentValue + this.textContent };
    updateDisplay();
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    state = {
      ...state,
      previousValue: state.currentValue,
      operator: operatorMap[this.textContent],
      currentValue: "",
    };
    updateDisplay();
  });
});
