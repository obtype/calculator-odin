function add(num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, operator, num2){
    if (operator == '+') {
        return add(num1, num2);
    }
    if (operator == '-') {
        return subtract(num1, num2);
    }
    if (operator == '*') {
        return multiply(num1, num2);
    }
    if (operator == '/') {
        return divide(num1, num2);
    }
}

function equate(e){
    
    let answer = round(operate(input1.value, operator, input2.value).toString());
    if (answer === undefined){
        answer = '';
    }
    console.log(answer);
    displayValue = answer;
    displayBox.textContent = displayValue;
    operator = '';
    input1.value = '';
    input1.state = 'active';
    input2.value = '';
    input2.state = 'inactive';
    displayValue = '';

}

function clear(){
    operator = '';
    input1.value = '';
    input1.state = 'active';
    input2.value = '';
    input2.state = 'inactive';
    displayValue = '';
    displayBox.textContent = displayValue;

}

function backspace(){
    if(input1.state === 'active'){
        input1.value = input1.value.slice(0,-1);
    }
    else if(input2.state === 'active' && input2.value === ''){
        operator = '';
        input1.state = 'active';
        input2.state = 'inactive';
    }
    else if(input2.state === 'active'){
        input2.value = input2.value.slice(0,-1);
    }

    displayValue = displayValue.slice(0,-1);
    displayBox.textContent = displayValue;
    console.log(`input1 : ${input1.value}`);
    console.log(`input2 : ${input2.value}`);

}

function round(num){

    const significatDecimals = 3;

    if(!num.includes('.')){
        return num;
    }

    let arr = num.split('.');
    if (arr[1].length <= 3){
        return num;
    }

    let count = 0;

    for(let i = 0; i < arr[1].length; i++){

        if (arr[1][i] != 0){
            break;
        }
        count++    
    }
    
    let multiplier = Math.pow(10, significatDecimals + count)
    num *= multiplier
    num = Math.round(num);
    num /= multiplier;

    return num.toString();
    
}

function numberEvent(e){
    if(input1.state === 'active'){
        input1.value += e.target.textContent;
    }
    else {  //if(input2.state === 'active')
        input2.value += e.target.textContent;
    }
    displayValue += e.target.textContent;
    displayBox.textContent = displayValue;
    console.log(`input1 : ${input1.value}`);
    console.log(`input2 : ${input2.value}`);

}

function operatorEvent(e){
    if(operator !== ''){
        let temp = round(operate(input1.value, operator, input2.value).toString());
        input1.value = temp;
        displayValue = temp + e.target.textContent;
        input1.state = 'inactive';
        input2.state = 'active';
        input2.value = '';
        displayBox.textContent = displayValue;
        operator = e.target.textContent;
        console.log(operator);
    }
    else{
        operator = e.target.textContent;
        displayValue += e.target.textContent;
        displayBox.textContent = displayValue;
        input1.state = 'inactive';
        input2.state = 'active';
        console.log(operator);
    }
}


let input1, input2, operator, display;

operator = '';
input1 = {value: '', state: 'active'};
input2 = {value: '', state: 'inactive'};
displayValue = '';




const numericButtons = document.querySelectorAll('.numbers button');
const operatorButtons = document.querySelectorAll('.operators button');
const equalButton = document.querySelector('#equal');
const displayBox = document.querySelector('.screen');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');
//console.log(displayBox.attributes['data-state'].value);


numericButtons.forEach(node => {
    node.addEventListener('click', numberEvent)
});


operatorButtons.forEach(node => {
    node.addEventListener('click', operatorEvent)
});


equalButton.addEventListener('click', equate);

clearButton.addEventListener('click', clear);

backspaceButton.addEventListener('click', backspace);




