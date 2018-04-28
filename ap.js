const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");
const operatorKeys = document.querySelectorAll(".key--operator");

function calculate(firstValue, secondValue, action) {
    const N1 = parseFloat(firstValue),
        N2 = parseFloat(secondValue);
    switch (action) {
        case 'add':
            return N1 + N2;
        case 'subtract':
            return N1 - N2;
        case 'multiply':
            return N1 * N2;
        case 'divide':
            return N1 / N2;
    }
    return 0;
}

function getDisplayedOutput(action, currentDisplayText, keyContent, dataset) {
    const result = {
        displayText: currentDisplayText,
        pressedOperator: isOperator(action) ? action : undefined
    };
    if (!action) { //number
        if (currentDisplayText == '0' || isOperator(dataset.previousKeyType) || dataset.previousKeyType === 'calculate') {
            result.displayText = keyContent;
        } else {
            result.displayText += keyContent;
        }
    }
    switch (action) {
        case 'decimal':
            if (isOperator(dataset.previousKeyType) || dataset.previousKeyType === 'calculate') {
                result.displayText = '0.';
            } else if (!currentDisplayText.includes('.')) {
                result.displayText += '.';
            }
            break;
        case 'calculate':
            if (dataset.operator) result.displayText = calculate(dataset.firstValue, currentDisplayText, dataset.operator);
            break;
        case 'clear':
            result.displayText = 0;
    }
    return result;
}

function isOperator(action) {
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return true;
    return false;
}

function updateDisplay(displayText, pressedOperator) {
    display.textContent = displayText;
    if (pressedOperator) {
        Array.from(operatorKeys)
            .forEach(k => {
                if (k.dataset.action === pressedOperator) {
                    k.classList.add('is-depressed');
                } else {
                    k.classList.remove("is-depressed");
                }
            });
    }
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const displayedNum = display.textContent;
        const {
            displayText,
            pressedOperator
        } = getDisplayedOutput(action,
            displayedNum,
            key.textContent,
            calculator.dataset
        );
        updateDisplay(displayText, pressedOperator);
        calculator.dataset.previousKeyType = action;
        if (isOperator(action)) {
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }
    }
});