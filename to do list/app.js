//Selectors
const input = document.querySelector('[type="text"]');
const submit = document.querySelector('[type="submit"]');
const list = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Functions
function submitHandler (e) {
    e.preventDefault();

    //Add To Do Div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');

    //Create <li>s
    const newToDo = document.createElement('li');
    newToDo.innerText = input.value;
    if(newToDo.innerText === '') {
        return;
    }
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    saveToLocalStorage(input.value);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.classList.add('btn-complete')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDoDiv.appendChild(completedButton);

    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDoDiv.appendChild(deleteButton);
    
    //Append to List
    list.appendChild(toDoDiv);

    //Clear Input
    input.value = '';
}

function deleteCheck (e) {
    const item = e.target;
    const todo = item.parentElement;
    //delete to do
    if(item.classList[0] === 'btn-delete') {
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //check the completed items
    if(item.classList[0] === 'btn-complete') {
        todo.classList.toggle('completed');
    }
}

function filterToDo (e) {
    let todos = list.childNodes;
    console.log(todos)
    todos.forEach(todo => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;

            case 'done':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            
            case 'undone':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            default: break;        
        }
    })
}

function saveToLocalStorage (todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function restoreFromLocalStorage (todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');

    //Create <li>s
    const newToDo = document.createElement('li');
    newToDo.innerText = todo;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.classList.add('btn-complete')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDoDiv.appendChild(completedButton);

    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDoDiv.appendChild(deleteButton);
    
    //Append to List
    list.appendChild(toDoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const toDoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(toDoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}



// Event Listeners
submit.addEventListener('click', submitHandler);
list.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);
document.addEventListener('DOMContentLoaded', restoreFromLocalStorage);
