document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const operationDisplay = document.createElement('div');
    operationDisplay.id = 'operation';
    document.querySelector('.result').appendChild(operationDisplay);

    let currentInput = '0';
    let operator = '';
    let previousInput = '';

    function updateDisplay(value) {
        input.value = value;
    }

    function updateOperationDisplay(value) {
        operationDisplay.textContent = value;
    }

    function appendCharacter(character) {
        if (character === '+/-') {
            if (currentInput.startsWith('-')) {
                currentInput = currentInput.slice(1);
            } else {
                currentInput = '-' + currentInput;
            }
        } else if (character === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else if (character === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } else {
            if (currentInput === '0') {
                currentInput = character;
            } else {
                currentInput += character;
            }
        }
        updateDisplay(currentInput);
    }

    function clearDisplay() {
        currentInput = '0';
        operator = '';
        previousInput = '';
        updateDisplay(currentInput);
        updateOperationDisplay('');
    }

    function calculateResult() {
        if (previousInput && operator && currentInput) {
            try {
                const result = eval(previousInput + operator + currentInput);
                updateDisplay(result.toFixed(2)); // Ограничиваем до двух знаков после запятой
                previousInput = '';
                operator = '';
                currentInput = result.toString();
                updateOperationDisplay('');
            } catch (e) {
                updateDisplay('Error');
            }
        }
    }

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', (event) => {
            const value = event.target.innerText;

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '0') {
                    if (previousInput === '') {
                        previousInput = currentInput;
                    } else if (operator !== '') {
                        calculateResult();
                    }
                    operator = value;
                    updateOperationDisplay(`${previousInput} ${operator}`);
                    currentInput = '';
                }
            } else if (value === '=') {
                calculateResult();
            } else if (value === 'AC') {
                clearDisplay();
            } else {
                appendCharacter(value);
            }
        });
    });

    // Обработчик для начального отображения
    updateDisplay(currentInput);
});

