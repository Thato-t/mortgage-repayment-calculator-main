const clearBtn = document.getElementById('clear-btn');
const numberInputs = document.querySelectorAll('.number-inputs');
const errMsgs = document.querySelectorAll('.err');
const radioInputs = document.querySelectorAll('.radio-inputs');
const calculateBtn = document.getElementById('calculate-btn');
const firstPage = document.querySelector('.first-page');
const secondPage = document.querySelector('.second-page');
const outputVal = document.getElementById('output-value');
const overallVal = document.getElementById('overall-value');
const amountBox = document.querySelector('.amount-box');
const miniBox = document.querySelectorAll('.mini-box');
const signs = document.querySelectorAll('.signs');
const radiosWrapper = document.querySelectorAll('.radios-wrapper');

clearBtn.addEventListener('click', () => {
    numberInputs.forEach(input => input.value = '');
    radioInputs.forEach(input => input.checked = false);
    radiosWrapper.forEach(radio => radio.classList.remove('radioBgc'));
    secondPage.style.display = 'none';
    firstPage.style.display = 'block';
})


numberInputs[0].addEventListener('input', () => {
    const inputVal = numberInputs[0].value;
    const regex = /[0-9]\,?[0-9]?/;


    
    if(!inputVal.match(regex) || inputVal.includes('.')){
        errMsgs[0].classList.remove('hide');
        errMsgs[0].textContent = 'Enter a valid number'
        amountBox.style.border = '1px solid var(--red)';
        signs[0].style.backgroundColor = 'var(--red)';
        signs[0].style.color = 'var(--white)'
    }else if(!inputVal){
        errMsgs[0].classList.remove('hide');
        amountBox.style.border = '1px solid var(--red)';
        signs[0].style.backgroundColor = 'var(--red)';
        signs[0].style.color = 'var(--white)'
    }else{
        errMsgs[0].classList.add('hide');
        amountBox.style.border = '1px solid var(--slate-300)';
        signs[0].style.backgroundColor = 'var(--slate-100)';
        signs[0].style.color = 'var(--slate-700)'
        
    }
})

numberInputs[1].addEventListener('input', () => {
    const inputVal = numberInputs[1].value;
    const regex = /[0-9]\,?[0-9]?/;


    
    if(!inputVal.match(regex) || inputVal.includes('.')){
        errMsgs[1].classList.remove('hide');
        errMsgs[1].textContent = 'Enter a valid number'
        miniBox[0].style.border = '1px solid var(--red)';
        signs[1].style.backgroundColor = 'var(--red)';
        signs[1].style.color = 'var(--white)'
    }else if(!inputVal){
        errMsgs[1].textContent = 'This field is required'
        errMsgs[1].classList.remove('hide');
        miniBox[0].style.border = '1px solid var(--red)';
        signs[1].style.backgroundColor = 'var(--red)';
        signs[1].style.color = 'var(--white)'
    }else{
        errMsgs[1].classList.add('hide');
        miniBox[0].style.border = '1px solid var(--slate-300)';
        signs[1].style.backgroundColor = 'var(--slate-100)';
        signs[1].style.color = 'var(--slate-700)'
        
    }
})

numberInputs[2].addEventListener('input', () => {
    const inputVal = numberInputs[2].value;
    const regex = /[0-9]\.?[0-9]?/;
 
    if(!inputVal.match(regex) || inputVal.includes(',')){
        errMsgs[2].classList.remove('hide');
        errMsgs[2].textContent = 'Enter a valid number'
        miniBox[1].style.border = '1px solid var(--red)';
        signs[2].style.backgroundColor = 'var(--red)';
        signs[2].style.color = 'var(--white)'
    }else if(!inputVal){
        errMsgs[2].textContent = 'This field is required'
        errMsgs[2].classList.remove('hide');
        miniBox[1].style.border = '1px solid var(--red)';
        signs[2].style.backgroundColor = 'var(--red)';
        signs[2].style.color = 'var(--white)'
    }else{
        errMsgs[2].classList.add('hide');
        miniBox[1].style.border = '1px solid var(--slate-300)';
        signs[2].style.backgroundColor = 'var(--slate-100)';
        signs[2].style.color = 'var(--slate-700)'
        
    }
})

const radio = () => {
    if(radioInputs[0].checked || radioInputs[1].checked){
        errMsgs[3].classList.add('hide')
    }else{
        errMsgs[3].classList.remove('hide')
    }
}

radioInputs[0].addEventListener('click', () => {
    if(radioInputs[0].checked){
        radiosWrapper[0].classList.add('radioBgc');
        radiosWrapper[1].classList.remove('radioBgc')
    }
    radio()
})

radioInputs[1].addEventListener('click', () => {
    if(radioInputs[1].checked){
        radiosWrapper[1].classList.add('radioBgc');
        radiosWrapper[0].classList.remove('radioBgc')
    }
    radio()
})

const validation = () => {
    numberInputs.forEach(input => {
        if(!input.value){
            errMsgs[0].classList.remove('hide');
            errMsgs[1].classList.remove('hide');
            errMsgs[2].classList.remove('hide');
        }else{
            errMsgs[0].classList.add('hide');
            errMsgs[1].classList.add('hide');
            errMsgs[2].classList.add('hide');
        }
    })
}

const calculations = () => {
    const mortgageAmount = numberInputs[0].value;
    const mortgageTerm = numberInputs[1].value;
    const interestRate = numberInputs[2].value;

    const monthlyInterestOnly = ((mortgageAmount * (interestRate / 100)) / (mortgageTerm * 12)).toFixed(2);
    const overollInterestOnly = ((mortgageAmount * (interestRate / 100))).toFixed(2);
    const monthlyInterestRate = (interestRate / 12).toFixed(2);
    const n = (mortgageTerm * 12).toFixed(2);

    const repaymentNume = (mortgageAmount * monthlyInterestRate);
    const repaymentDenom = (1 - Math.pow((1 + monthlyInterestRate), - n));
    const monthlyRepayment = (repaymentNume / repaymentDenom).toFixed(2);

        
    if(radioInputs[0].checked &&  !isNaN(overollInterestOnly) && !isNaN(monthlyRepayment)){
        outputVal.textContent =  '\u00A3' + monthlyRepayment;
        overallVal.textContent ='\u00A3' +(monthlyRepayment * n).toFixed(2);
        secondPage.style.display = 'block'
        firstPage.style.display = 'none'
    }else if(radioInputs[1].checked && !isNaN(monthlyInterestOnly) && !isNaN(overollInterestOnly)){
        outputVal.textContent =  '\u00A3' + monthlyInterestOnly;
        overallVal.textContent = '\u00A3' + overollInterestOnly;
        secondPage.style.display = 'block'
        firstPage.style.display = 'none'
    }
}

calculateBtn.addEventListener('click', () => {
    validation()
    radio()
    calculations()
})
