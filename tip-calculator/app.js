// Selectors
const container = document.querySelector('.container');


function update () {
    // BILL AMOUNT CALCULATION SELECTORS
    //Bill
    const bill = document.querySelector('.bill-input').value;
    //Tip
    const tipPercent = document.querySelector('.tip-range').value;
    const innerTipRate = document.querySelector('.tip-rate-value');
    const innerTipValue = document.querySelector('.tip-amount');
    //Card
    const card = document.querySelector('.card-checkbox').checked;
    //Total
    const total = document.querySelector('.total-amount');
    
    // SPLIT SECTION SELECTORS
    const split = document.querySelector('.split-range').value;
    const innerSplit = document.querySelector('.split-value');
    //Bill Each
    const billEach = document.querySelector('.billEach');
    //Total Each
    const tipEach = document.querySelector('.tipEach');

    //COUPON SELECTOR
    const coupon = document.querySelector('.coupon-code').value;

    console.log(coupon);
    //BILL AMOUNT CALCULATIONS
    const COMMISION = 1.05;

    // Tip Rate Slider 
    innerTipRate.innerHTML = tipPercent;

    //Tip Amount
    const tipValue = (bill * (tipPercent /  100)).toFixed(2);
    innerTipValue.innerHTML = tipValue;
     
    //SPLIT SECTION
    if (split == 1) {
        innerSplit.innerHTML = split + ' person';
    }else {
        innerSplit.innerHTML = split + ' people';
    }
    
    if (card) {
        //Total Amount
        total.innerHTML = ((bill *  (1 + tipPercent / 100)) * COMMISION).toFixed(2);
        //Bill Each
        billEach.innerHTML = (((total.innerHTML - tipValue) / split) * COMMISION).toFixed(2);
        //Tip Each
        tipEach.innerHTML = ((tipValue / split) * COMMISION).toFixed(2);
    }else {
        //Total Amount
        total.innerHTML = (bill *  (1 + tipPercent / 100)).toFixed(2);
        //Bill Each
        billEach.innerHTML = ((total.innerHTML - tipValue) / split).toFixed(2);
        //Tip Each
        tipEach.innerHTML = (tipValue / split).toFixed(2);
    } 


    if (card && coupon == 'GOKSU10') {
        total.innerHTML = (((bill *  (1 + tipPercent / 100)) * COMMISION) * 0.9).toFixed(2);
    }else if (coupon == 'GOKSU10') {
        total.innerHTML = ((bill *  (1 + tipPercent / 100)) * 0.9).toFixed(2);
    }

    
}


//Event Listeners
container.addEventListener('input', update);
container.addEventListener('submit', e => {
    e.preventDefault();
});



















































/* 
MY JAVASCRIPT
*/
// const billInput = document.querySelector('.bill-input');
// const slider = document.querySelector('.slider');

// const rangeValue = document.querySelector('.range');
// const splitValue = document.querySelector('.split-range');

// const tipValue = document.querySelector('.tip-amount-inner');

// function bill() {
//     console.log(billInput.value);
// }

// function innerTipValue () {
//     const tipRate = document.querySelector('.tip-rate-value');
//     tipRate.value = rangeValue.value;
//     tipRate.innerHTML = tipRate.value;
// }

// function split () {
//     const splitPerson = document.querySelector('.split-value');
//     splitPerson.innerHTML = splitValue.value;
// }


// billInput.addEventListener('input', bill); 
// rangeValue.addEventListener('input', innerTipValue);
// splitValue.addEventListener('input', split);
// tipValue.addEventListener('input', tippo);