//Select elements we need
const cardButtons = document.querySelectorAll('.btn');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');
const closeButton = document.querySelector('.delete');

//HANDLER FUNCTION
const handleClick = event => {
    const button = event.currentTarget;
    const card = button.closest('.card');

    //grab the image source, description and text content from the cards
    const imgSrc = card.querySelector('img').src;
    const desc = card.querySelector('img').dataset.description;
    const name = card.querySelector('h5').textContent;

    //pop the modal with the new info
    const modalInnerHTML = `
        <img 
        width="600" height="600" 
        src="${imgSrc.replace('200', '600')}" 
        alt="${name}"> 
        <button class="delete">X</button>
        </img>
        <p>${desc}</p>
    `;

    //place inner html to our page
    const innerRange = document.createRange().createContextualFragment(modalInnerHTML);
    modalInner.innerHTML = modalInnerHTML;
    modalOuter.classList.add('modal-outer-open');
};

//Event listener that pops the inner contents out
cardButtons.forEach(button => {
    button.addEventListener('click', handleClick);
});


//Close the inner page
const closeModal = () => modalOuter.classList.remove('modal-outer-open');

modalOuter.addEventListener('click', function (event) {
    const isOutside = !event.target.closest('.model-inner');

   if (isOutside) {
        closeModal();
   }else if (event.target.closest('.delete')) {
        closeModal();
   }
});

window.addEventListener('keydown', function (event) {
    if(event.key === 'Escape') {
        closeModal ();
    }
});