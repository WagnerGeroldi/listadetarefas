const inputTask = document.querySelector('.new-task');
const buttonTask = document.querySelector('.btn-task');
const result = document.querySelector('#result')
const ulTask = document.querySelector('.tasks');
const today = document.querySelector('.date');

/***********Create Date **********/
let dateLocal = new Date();
let day = String(dateLocal.getDate()).padStart(2, '0')
let month = String(dateLocal.getMonth() + 1).padStart(2, '0')
let year = String(dateLocal.getUTCFullYear())
let dateNow = 'Hoje é ' + day + '/' + month + '/' + year
today.innerHTML = dateNow;


/****** Functions ******/

function createLi() {
    const li = document.createElement('li');
    return li;
}

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function buttonDelete(li) {
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Apagar';
    buttonDelete.setAttribute('class', 'button-list');
    li.appendChild(buttonDelete);
}

function saveTask() {
    const liTask = ulTask.querySelectorAll('li');
    const listOfTasks = [];

    for (let tarefa of liTask) {
        let textTask = tarefa.innerText;
        textTask = textTask.replace('Apagar', '').trim();
        listOfTasks.push(textTask);
    }

    const taskJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('tarefas', taskJSON);
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tarefas');
    const listOfTasks = JSON.parse(tasks);

    for (let task in listOfTasks) {
        createTask(task);
    }
}
addSaveTasks();

/********* Main Function ********/

function createTask(textInput) {
    result.classList.add('content-right')
    const li = createLi();
    li.innerText = textInput;
    ulTask.appendChild(li);
    clearInput();
    buttonDelete(li);
    saveTask();
}

//******** Events Actions ***********/

//press enter and submit
inputTask.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

//event click button task
buttonTask.addEventListener('click', function () {
    if (!inputTask.value) return;
    createTask(inputTask.value);
})

//event button delete task
document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-list')) {
        el.parentElement.remove();
        saveTask();
    }
})


