const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let state = {
  currentValue: "",
  previousValue: null,
  operator: null,
  justCalculated: false,
};

const operatorMap = {
  "+": "+",
  "-": "-",
  "÷": "/",
  "×": "*",
};

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
};

function updateDisplay() {
  display.textContent = state.currentValue;
}

function calculate() {
  const operation = operations[state.operator];
  const prev = Number(state.previousValue);
  const curr = Number(state.currentValue);
  return operation(prev, curr);
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (state.justCalculated) {
      state = {
        ...state,
        currentValue: this.textContent,
        justCalculated: false,
      };
    } else {
      state = { ...state, currentValue: state.currentValue + this.textContent };
    }
    updateDisplay();
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (state.operator && state.previousValue !== null) {
      const result = calculate();
      state = {
        ...state,
        previousValue: result,
        operator: operatorMap[this.textContent],
        currentValue: "",
      };
    } else {
      state = {
        ...state,
        previousValue: state.currentValue,
        operator: operatorMap[this.textContent],
        currentValue: "",
      };
    }
    updateDisplay();
  });
});

equalsButton.addEventListener("click", function () {
  const result = calculate();
  state = {
    ...state,
    currentValue: result,
    previousValue: null,
    operator: null,
    justCalculated: true,
  };
  updateDisplay();
});

clearButton.addEventListener("click", function () {
  state = {
    currentValue: "",
    previousValue: null,
    operator: null,
    justCalculated: false,
  };
  updateDisplay();
});
