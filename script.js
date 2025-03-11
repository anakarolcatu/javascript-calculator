//TO DO:
// 1. Add keyboard support

//operations functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b != 0 ? a / b : "Error";

//variables for the calculator
let a = '';
let b = '';
let operator = '';
let result = '';

//function to round numbers only if not a int
function formatNumber(number) {
    if (Number.isInteger(parseFloat(number))) {
        return parseFloat(number).toString();
    } else {
        return parseFloat(number).toFixed(2);
    }
}

const operate = function(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch(operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            console.log('Invalid operator');
    }
    if (typeof result === 'number') {
        result = formatNumber(result.toFixed(2));
    }
}

//getting the values from the numbers
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', e => {
        if (operator === ''){
            a += item.textContent;
        } else {
            b += item.textContent;
        }
        updateScreen();
    });
});

//getting the operators
document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', e => {
        if (a !== '' && b !== '' && operator !== '') {
            operate(operator, a, b);
            a = result.toString(); 
            b = ''; 
            operator = item.textContent;
        } else if (a !== '') {
            operator = item.textContent;
        }
        updateScreen();
    });
});

//get the .
document.querySelector('.dot').addEventListener('click', () => {
    if (operator === "") {
        //prevent that the user adds more than one .
        if (!a.includes('.')) { 
            a += ".";
        }
    } else {
        if (!b.includes('.')) { 
            b += ".";
        }
    }
    updateScreen();
});

//using the %
document.querySelector('.percent').addEventListener('click', e => {
    if (b === '' && a !== '') {
        a = parseFloat(a) / 100;
        updateScreen();
    }
})

//using the = signal to start the calculations
document.querySelector('.equal').addEventListener('click', e => {
    if (a != '' && b != '' && operator != '') {
        operate(operator, a, b);
        document.querySelector('.screen').textContent = result;
        //reset the values for the next operation
        a = result;
        b = '';
        operator = '';
        updateScreen();
        if (e) {
            a = '';
        }
    }
})

//clear the screen
document.querySelector('.clear-all').addEventListener('click', e => {
    a = '';
    b = '';
    operator = '';
    updateScreen();
})

//delete button
document.querySelector('.delete').addEventListener('click', e => {
    if (operator === '') {
        a = a.slice(0, -1); 
    } else if (b === '') {
        operator = '';
    } else {
        b = b.slice(0, -1); 
    }
    updateScreen();
});

//updating the screen
function updateScreen() {
    document.querySelector('.screen').textContent = a + (operator ? ` ${operator} ` : '') + b;
}