const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const operate = (operator, a, b) => {
  return operators[operator](a, b);
};

let input = document.querySelector(".input");

let displayValue = "";

let calculateValue = "";

let calculateArr;

const populate = (text) => {
  calculateValue += text;
  displayValue += text;
  input.value = displayValue;
};

let numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", (e) => {
    populate(e.target.textContent);
  });
});

let operBtns = document.querySelectorAll(".oper");
operBtns.forEach((operBtn) => {
  operBtn.addEventListener("click", (e) => {
    calculateArr = calculateValue.split(" ");
    if (calculateArr.length === 1) {
      calculateValue += ` ${e.target.textContent} `;
      displayValue = "";
    } else if (calculateArr.length === 3) {
      calculateArr[0] = +calculateArr[0];
      calculateArr[2] = +calculateArr[2];

      displayValue = operate(calculateArr[1], calculateArr[0], calculateArr[2]);

      if (displayValue.toString().length > 15) {
        displayValue =
          Math.abs(displayValue) < 1
            ? +displayValue.toFixed(13)
            : +displayValue.toPrecision(14);
      }

      input.value = displayValue;
      calculateValue = displayValue.toString();
      calculateArr = [];
      calculateValue += ` ${e.target.textContent} `;
      displayValue = "";
    }
  });
});

// EQUAL BUTTON CRASHES PROGRAM IF ONLY ONE VALUE ENTERED
let equalBtn = document.querySelector(".eq");
equalBtn.addEventListener("click", () => {
  calculateArr = calculateValue.split(" ");
  if (calculateArr[0] === "") return;
  if (calculateArr.length === 1) {
    input.value = calculateArr[0];
    displayValue = calculateArr[0];
    calculateValue = calculateArr[0];
  } else if (calculateArr.length === 2) {
    input.value = "ERR";
    displayValue = "";
    calculateValue = "";
    calculateArr = [];
  } else {
    calculateArr[0] = +calculateArr[0];
    calculateArr[2] = +calculateArr[2];

    displayValue = operate(calculateArr[1], calculateArr[0], calculateArr[2]);

    // input.value = displayValue;
    // displayValue = "";
    // calculateValue = "";
    // calculateArr = [];
    if (displayValue.toString().length > 15) {
      displayValue =
        Math.abs(displayValue) < 1
          ? +displayValue.toFixed(13)
          : +displayValue.toPrecision(14);
    }

    input.value = displayValue;
    calculateValue = displayValue.toString();
    calculateArr = [];
  }
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  input.value = 0;
  displayValue = "";
  calculateValue = "";
  calculateArr = [];
});

let decBtn = document.querySelector(".dec");
decBtn.addEventListener("click", (e) => {
  if (!displayValue.toString().includes(".")) populate(e.target.textContent);
});
