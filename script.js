const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    display.textContent = display.textContent + this.textContent;
  });
});
