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
const display = document.querySelector('.calc')

keys.addEventListener('click', e => {
  if (e.target.matches('button')){
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))
   
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    
    key.classList.add('.is-depressed')
   
    

    calculator.dataset.previousKeyType = 'operator'

    calculator.dataset.firstValue = displayedNum
    calculator.dataset.operator = action
    
  }
  
  if (action === 'decimal') {
    if (!displayedNum.includes('.')) {
      display.textContent = displayedNum + '.'
    } else if (previousKeyType === 'operator') {
      display.textContent = '0.'
    }
    calculator.dataset.previousKey = 'decimal'
  }
  
  if (action === 'reset'){
  calculator.dataset.previousKeyType = 'clear' 
  display.textContent = '0'
  }
  if(action === 'delete'){
    calculator.dataset.previousKey = 'delete'
    const newDisplay = display.textContent.slice(0, -1);
      display.textContent = newDisplay;
    console.log('delete key!')
  }
  if (action === 'calculate') {
    calculator.dataset.previousKey = 'calculate'
    console.log('equal key!')
  }
  
  
  if (!action) {
    calculator.dataset.previousKey = 'number';

      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
  }

  if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const secondValue = displayedNum

    display.textContent = calculate(firstValue, operator, secondValue)
  }

}
})


