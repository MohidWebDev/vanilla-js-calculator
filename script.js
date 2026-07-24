const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");

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

  if (!operation) {
    return 0;
  }

  const prev = Number(state.previousValue);
  const curr = Number(state.currentValue);

  if (state.operator === "/" && curr === 0) {
    return "Error";
  }

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
    } else if (state.currentValue === "0") {
      state = {
        ...state,
        currentValue: this.textContent,
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

decimalButton.addEventListener("click", function () {
  if (state.justCalculated) {
    state = {
      ...state,
      currentValue: "0.",
      justCalculated: false,
    };
  } else if (!state.currentValue.includes(".")) {
    state = {
      ...state,
      currentValue: state.currentValue + ".",
    };
  }
  updateDisplay();
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    const button = [...numberButtons].find((btn) => btn.textContent === key);
    if (button) button.click();
  } else if (key === ".") {
    decimalButton.click();
  } else if (key === "+" || key === "-") {
    const button = [...operatorButtons].find((btn) => btn.textContent === key);
    if (button) button.click();
  } else if (key === "*") {
    const button = [...operatorButtons].find((btn) => btn.textContent === "×");
    if (button) button.click();
  } else if (key === "/") {
    const button = [...operatorButtons].find((btn) => btn.textContent === "÷");
    if (button) button.click();
  } else if (key === "Enter" || key === "=") {
    equalsButton.click();
  } else if (key === "Escape" || key === "Backspace") {
    clearButton.click();
  }
});
