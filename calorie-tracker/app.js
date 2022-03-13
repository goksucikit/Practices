//Selectors
const form = document.querySelector('.calorie');
const list = document.querySelector('.list');
const add = document.querySelector('.add-button');
const summary = document.querySelector('.output-container');
const resetButton = document.querySelector('.output-reset');

const totalAmount = document.querySelector('.total-amount');
const averageAmount = document.querySelector('.average-amount');
const highestAmount = document.querySelector('.highest-amount');
const lowestAmount = document.querySelector('.lowest-amount');

const progressTotal = document.querySelector('.progress-total');
const target = document.querySelector('.target');

//State
let dayList = [];
//Submit Handler Function
function submitHandler(e) {
    e.preventDefault();

    const consumed = e.currentTarget.item.value;
    if (!consumed) return; //If no calorie, return nothing
    
    const calorie = {
        consumed,
        id: Date.now(),
    }

    dayList.push(calorie);
    
    if(dayList.length > 6) { //7 days in a week
        add.disabled = true;
        list.style.justifyContent = 'center';
        console.log(dayList);
    };

    //Clear the form
    e.target.reset();

    //Fire off a custom event that will tell anyone else who cares that the items have been updated
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

function display () {
    const html = dayList.map(calorie => 
        `<li class="list-item"
            value = "${calorie.id}">
            <button class="item-name" value="${calorie.id}">${calorie.consumed} kcals</button>
        </li>`)
        .join('');

        list.innerHTML = html;

        //Total Amount
        const total = dayList.reduce(function (sum, item) {
            return sum + parseInt(item.consumed);
        }, 0).toFixed(2);
        totalAmount.innerHTML = total + ' kcals';

        //Average Amount
        const average = (total / dayList.length).toFixed(2); 
        averageAmount.innerHTML = average + ' kcals';

        //Highest Amount
        const highest = Math.max.apply(Math, dayList.map(function(cal) {
             return cal.consumed; 
        }));
        highestAmount.innerHTML = highest.toFixed(2) + ' kcals';

        //Lowest Amount
        const lowest = Math.min.apply(Math, dayList.map(function(cal) {
            return cal.consumed; 
       }));
       lowestAmount.innerHTML = lowest.toFixed(2) + ' kcals';

       //Target Calorie
        let targetCalorie = 12600;
        const target = document.querySelector('.target');
        target.innerHTML = targetCalorie;

       //Progress Amount
       progressTotal.innerHTML = total;

       if(dayList.length > 6) {
        add.disabled = true;
        list.style.justifyContent = 'center';
        resetButton.classList.toggle('output-reset-visible');
        alert (`You have consumed ${total} calories!`);
    }

    //Progress Circle
    function progressCircle () {
        const completedPercent = total / (targetCalorie / 100);
        const progressCircle = document.querySelector('.progress-circle');
        
        progressCircle.style.background = `conic-gradient(#C1DEAE ${completedPercent}%, #DD9E7D ${completedPercent}%)`
    }
    progressCircle();
};

//Delete Daily Inputs on Click
function deleteEvent(id) {
    dayList = dayList.filter(item => item.id !== id);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

//Store Values in Local Storage
function saveData () {
    localStorage.setItem('calories', JSON.stringify(dayList));
}

//Restore Values from Local Storage
function restoreData () {
    const isSaved = JSON.parse(localStorage.getItem('calories'));
    console.log(isSaved.length);
    if(isSaved.length > 0) {
        dayList.push(...isSaved)
    }else if(isSaved.length === 0){
        window.localStorage.clear();
        
    }

    list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

//Reset local storage and reload the page after clear the data
function reset () {
    window.localStorage.clear();
    location.reload();
} 

//Event Handlers
form.addEventListener('submit', submitHandler);
list.addEventListener('itemsUpdated', display);
list.addEventListener('itemsUpdated', saveData);

//Event Delegation
summary.addEventListener('click', e => {
    if (e.target.matches('button')) {
        reset();
    }
})

list.addEventListener('click', e => {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
        deleteEvent(id);
        location.reload();
    }
})

//Call Restore Function
restoreData();