const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");

let state = {
  currentValue: "",
  previousValue: null,
  operator: null,
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
