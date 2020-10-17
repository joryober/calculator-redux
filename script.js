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
  //Need to refactor into "evaluate" function that can be used in both equalBtn and operBtn
  operBtn.addEventListener("click", (e) => {
    calculateArr = calculateValue.split(" ");
    if (calculateArr.length === 1) {
      calculateValue += ` ${e.target.textContent} `;
      displayValue = "";
    } else if (calculateArr[2] === "") {
      input.value = "ERR";
      displayValue = "";
      calculateValue = "";
      return;
    } else if (calculateArr.length === 3) {
      if (calculateArr[1] === "/" && calculateArr[2] === "0") {
        input.value = "ERR (DIV BY 0)";
        displayValue = "";
        calculateValue = "";
        return;
      }

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

let equalBtn = document.querySelector(".eq");

//Need to refactor into "evaluate" function that can be used in both equalBtn and operBtn
equalBtn.addEventListener("click", () => {
  calculateArr = calculateValue.split(" ");
  if (calculateArr[0] === "") return;
  if (calculateArr.length === 1) {
    input.value = calculateArr[0];
    displayValue = calculateArr[0];
    calculateValue = calculateArr[0];
  } else if (calculateArr[2] === "") {
    input.value = "ERR";
    displayValue = "";
    calculateValue = "";
  } else {
    if (calculateArr[1] === "/" && calculateArr[2] === "0") {
      input.value = "ERR (DIV BY 0)";
      displayValue = "";
      calculateValue = "";
      return;
    }

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
