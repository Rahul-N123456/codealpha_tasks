// Calculator state
let currentInput = '0';
let previousInput = '';
let operator = '';

// DOM Elements
const display = document.getElementById('display');

// Update display
function updateDisplay() {
    display.value = currentInput;
}

// Append number to current input
function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (number === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (previousInput !== '' && currentInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
}

// Calculate result
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    // Handle floating point precision
    if (!Number.isInteger(result)) {
        result = parseFloat(result.toFixed(10));
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Clear display (AC)
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Delete last character (DEL)
function deleteLast() {
    if (currentInput.length === 1 || currentInput === '-0') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    // Prevent default for calculator keys
    if ((e.key >= '0' && e.key <= '9') || 
        e.key === '.' || 
        e.key === '+' || 
        e.key === '-' || 
        e.key === '*' || 
        e.key === '/' || 
        e.key === '%' ||
        e.key === 'Enter' ||
        e.key === 'Backspace' ||
        e.key === 'Escape') {
        
        // Add visual feedback
        const button = document.querySelector(`button[onclick*="'${e.key}'"]`);
        if (button) {
            button.classList.add('pressed');
            setTimeout(() => button.classList.remove('pressed'), 100);
        }
    }

    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+') {
        appendOperator('+');
    } else if (e.key === '-') {
        appendOperator('-');
    } else if (e.key === '*') {
        appendOperator('*');
    } else if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    } else if (e.key === '%') {
        appendOperator('%');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Add click animation to all buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 100);
    });
});
