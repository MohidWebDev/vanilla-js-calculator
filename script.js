const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

let state = {
  currentValue: "",
  previousValue: null,
  operator: null,
  justCalculated: false,
  waitingForNewValue: false,
};

const operatorMap = {
  "+": "+",
  "-": "-",
  "÷": "/",
  "×": "*",
};

const MAX_DIGITS = 16;

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
};

function updateDisplay() {
  let displayValue = String(state.currentValue);

  if (displayValue.replace("-", "").replace(".", "").length > MAX_DIGITS) {
    const num = Number(displayValue);
    displayValue = num.toExponential(9);
  }

  display.textContent = displayValue;
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

  const result = operation(prev, curr);
  return result;
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (state.justCalculated) {
      state = {
        ...state,
        currentValue: this.textContent,
        justCalculated: false,
      };
    } else if (state.waitingForNewValue) {
      state = {
        ...state,
        currentValue: this.textContent,
        waitingForNewValue: false,
      };
    } else if (state.currentValue === "0") {
      state = {
        ...state,
        currentValue: this.textContent,
      };
    } else if (
      state.currentValue.replace("-", "").replace(".", "").length >= MAX_DIGITS
    ) {
      return;
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
        currentValue: String(result),
        waitingForNewValue: true,
      };
    } else {
      state = {
        ...state,
        previousValue: state.currentValue,
        operator: operatorMap[this.textContent],
        waitingForNewValue: true,
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
    waitingForNewValue: false,
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
  } else if (state.waitingForNewValue) {
    state = {
      ...state,
      currentValue: "0.",
      waitingForNewValue: false,
    };
  } else if (!state.currentValue.includes(".")) {
    state = {
      ...state,
      currentValue: state.currentValue + ".",
    };
  }
  updateDisplay();
});

backspaceButton.addEventListener("click", function () {
  if (state.justCalculated || state.waitingForNewValue) {
    return;
  }

  state = {
    ...state,
    currentValue: state.currentValue.slice(0, -1),
  };
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
  } else if (key === "Escape") {
    clearButton.click();
  } else if (key === "Backspace") {
    backspaceButton.click();
  }
});
