// Select the elements
const container = document.querySelector('.container');
const check = document.querySelector('.form-check-input');
const select = document.querySelector('.form-select');
const btn = document.querySelector('.btn');

// IntersectionObserver API for scrolling
const obCallBack = payload => {
    if (payload[0].intersectionRatio === 1) {
        check.disabled = false;
        observed.unobserve(container.lastElementChild);
    }; 
};

const observed = new IntersectionObserver(obCallBack, {
    root: container,
    threshold: 1,
});

observed.observe(container.lastElementChild);


//Enabling options after accepting the terms&conditions by clicking the checkbox
check.onchange = function () {
    if (this.checked = true) {
        select.removeAttribute('disabled');
    };
};


//Make visible and enable the Submit button by choosing an option
select.addEventListener('change', event => {
    const submit = event.target.value;
    
    if (submit != '') {
        btn.disabled = false;
    };

});


