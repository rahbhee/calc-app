const calculate = (n1, operator, n2) =>{
  let result = ''
  if (operator === 'add'){
    result = parseFloat (n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply'){
    result = parseFloat (n1) * parseFloat (n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
}
return result;
}

const maxCharacters = 30;
const calculator = document.querySelector ('.calc-main');
const keys = calculator.querySelector('.grid-container');
const display = document.querySelector('.calc');

keys.addEventListener('click', e => {
  if (e.target.matches('button')){
;
e.target.style.opacity = '0.3';


setTimeout(() => {
e.target.style.opacity = '1';
}, 300);

    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType


   
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const secondValue = displayedNum

    if (
      firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'
    ) {
      const calcValue = calculate(firstValue, operator, secondValue)
      display.textContent = calcValue
      calculator.dataset.firstValue = calcValue
    } else {
      calculator.dataset.firstValue = displayedNum
    }

    calculator.dataset.previousKeyType = 'operator'
    
    calculator.dataset.operator = action
    
  }

  if (!action) {
    calculator.dataset.previousKey = 'number';

      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number'
  }

  
  if (action === 'decimal') {
    if (!displayedNum.includes('.')) {
      display.textContent = displayedNum + '.'
    } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
      display.textContent = '0.'
    }
    calculator.dataset.previousKey = 'decimal'
  }
  
  if (action === 'reset'){
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
    display.textContent = 0
  calculator.dataset.previousKeyType = 'clear'
  }
  if(action === 'delete'){
    calculator.dataset.previousKey = 'delete'
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
    const newDisplay = display.textContent.slice(0, -1);
    display.textContent = newDisplay;
    console.log('delete key!')
  }
  if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const secondValue = displayedNum

    if (firstValue) {
      if (previousKeyType === 'calculate') {
        firstValue = displayedNum
        secondValue = calculator.dataset.modValue
      }
      display.textContent = calculate(firstValue, operator, secondValue)
    }
    calculator.dataset.modValue = secondValue 
  calculator.dataset.previousKeyType = 'calculate'
  }
}
})


