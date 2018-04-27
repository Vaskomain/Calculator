const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

function calculate(firstValue, secondValue, action) {
    let result = "";
    if (action === 'add') {
        result = parseFloat(firstValue) + parseFloat(secondValue);
    } else if (action === 'subtract') {
        result = parseFloat(firstValue) - parseFloat(secondValue);
    } else if (action === 'multiply') {
        result = parseFloat(firstValue) * parseFloat(secondValue);
    } else if (action === 'divide') {
        result = parseFloat(firstValue) / parseFloat(secondValue);
    }
    return result;
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        if (!action) {
            calculator.dataset.previousKeyType = 'number';
            if (displayedNum == '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }
        if (action === 'decimal') {
            calculator.dataset.previousKeyType = 'decimal';
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            } else if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove("is-depressed"));
            key.classList.add('is-depressed');

        }
        if (action === 'calculate') {
            calculator.dataset.previousKeyType = 'calculate';
            const secondValue = displayedNum;
            const firstValue = calculator.dataset.firstValue;
            const actionToPerform = calculator.dataset.operator;
            if (!actionToPerform) {
                return null;
            }
            display.textContent = calculate(firstValue, secondValue, actionToPerform);
        }
        if (action === 'clear') {
            calculator.dataset.previousKeyType = 'clear';
            display.textContent = 0;
        }
    }
});