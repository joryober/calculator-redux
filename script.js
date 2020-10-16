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
    calculateValue += ` ${e.target.textContent} `;
    displayValue = "";
  });
});

// EQUAL BUTTON CRASHES PROGRAM IF ONLY ONE VALUE ENTERED
let equalBtn = document.querySelector(".eq");
equalBtn.addEventListener("click", () => {
  let decimalMultiplyCount = 0;
  calculateArr = calculateValue.split(" ");
  if (calculateArr.length > 3) {
    input.value = calculateArr[0];
    displayValue = "";
    calculateValue = "";
    calculateArr = [];
  }
  calculateArr[0] = +calculateArr[0];
  calculateArr[2] = +calculateArr[2];
  while (
    !Number.isInteger(calculateArr[0]) ||
    !Number.isInteger(calculateArr[2])
  ) {
    calculateArr[0] *= 10;
    calculateArr[2] *= 10;
    decimalMultiplyCount++;
  }
  displayValue = operate(calculateArr[1], calculateArr[0], calculateArr[2]);
  for (let i = 0; i < decimalMultiplyCount; i++) {
    displayValue /= 10;
  }
  input.value = displayValue;
  displayValue = "";
  calculateValue = "";
  calculateArr = [];
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  input.value = 0;
  displayValue = "";
  calculateValue = "";
});
