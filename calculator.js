document.addEventListener("DOMContentLoaded", function (event) {
  const calculator = window.document.querySelector(".calculator");
  const buttons = calculator.querySelector(".buttons");
  const display = window.document.querySelector("#input_display");

  buttons.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.value;
      const previousKeyType = calculator.dataset.previousKeyType;
      console.log(previousKeyType);
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      if (!action) {
        if (
          displayedNum === "0" ||
          previousKeyType === "operator" ||
          previousKeyType === "calculate"
        ) {
          display.value = keyContent;
        } else {
          display.value = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = "number";
      }

      if (action !== "clear") {
        const clearButton = calculator.querySelector("[data-action=clear]");
        clearButton.textContent = "CE";
      }

      if (action === "sign") {
        display.value = displayedNum * -1;
      }

      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        console.log(
          "calc rapido " + firstValue + "-" + operator + "-" + secondValue
        );

        if (
          firstValue &&
          operator &&
          previousKeyType !== "operator" &&
          previousKeyType !== "calculate"
        ) {
          const calcValue = calculate(firstValue, operator, secondValue);
          display.value = calcValue;
          calculator.dataset.firstValue = calcValue;
        } else {
          if (previousKeyType !== "calculate") {
            calculator.dataset.firstValue = displayedNum;
          }
        }

        key.classList.add("is-depressed");
        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
      }

      if (action === "decimal") {
        if (!displayedNum.includes(".")) {
          display.value = displayedNum + ".";
        } else if (
          previousKeyType === "operator" ||
          previousKeyType === "calculate"
        ) {
          display.value = "0.";
        }
        calculator.dataset.previousKeyType = "decimal";
      }

      if (action === "clear") {
        if (key.textContent === "AC") {
          calculator.dataset.firstValue = "";
          calculator.dataset.modValue = "";
          calculator.dataset.operator = "";
          calculator.dataset.previousKeyType = "";
        } else {
          key.textContent = "AC";
        }
        display.value = "0";
        calculator.dataset.previousKeyType = "clear";
      }

      if (action === "calculate") {
        let secondValue = displayedNum;
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

        if (firstValue) {
          if (previousKeyType === "calculate") {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
          }
          display.value = calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
      }
    }
  });

  const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === "add") return firstNum + secondNum;
    if (operator === "subtract") return firstNum - secondNum;
    if (operator === "multiply") return firstNum * secondNum;
    if (operator === "divide") return firstNum / secondNum;
  };
});
