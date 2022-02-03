const tabs = document.querySelector('.tabs');
const tabButtons = document.querySelectorAll('[role=tab]');
const tabPanels = document.querySelectorAll('[role=tabpanel]');
const tabPanelsArray = Array.from(tabPanels);


//hide all tab panels
const handleTabClick = event => {

    tabPanels.forEach(panel => {
        panel.hidden = true;
    });
    
    //mark all tabs as unselected
    tabButtons.forEach(button => {
        button.ariaSelected = false;
    });
    
    //mark the clicked tab as selected
    event.currentTarget.setAttribute('aria-selected', 'true');    
    
    //find the associated tabPanel and show it
    const { id } = event.currentTarget;
    const showPanel = tabPanelsArray.find(show => show.getAttribute('aria-labelledby') == id);
    showPanel.hidden = false;
};

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));