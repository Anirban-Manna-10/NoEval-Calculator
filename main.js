let result = document.querySelector("#result");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let delButton = document.querySelector(".del");
let allDel = document.querySelector(".allDel");

class Calculator {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
        result.value = '';
    }

    delete() {
        if (this.currentOperand) {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
            result.value = this.previousOperand + this.operation + this.currentOperand;
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number;
        result.value += number;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        result.value += ` ${operation} `;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand = '';
        result.value = computation;
    }

    updateDisplay() {
        result.value = this.currentOperand;
    }
}

const calculator = new Calculator();

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.getAttribute('val');
        if (op === '=') {
            calculator.compute();
        } else {
            calculator.chooseOperation(op);
        }
    });
});

delButton.addEventListener('click', () => {
    calculator.delete();
});

allDel.addEventListener('click', () => {
    calculator.reset();
});
