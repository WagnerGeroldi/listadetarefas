const inputTask = document.querySelector('.nova-tarefa');
const buttonTask = document.querySelector('.btn-tarefa');
const result = document.querySelector('#resultado')
const ulTask = document.querySelector('.tarefas');
const today = document.querySelector('.data');

let dateLocal = new Date();
let day = String(dateLocal.getDate()).padStart(2, '0')
let month = String(dateLocal.getMonth() + 1).padStart(2, '0')
let year = String(dateLocal.getUTCFullYear())
let dateNow = 'Hoje é ' + day + '/' + month + '/' + year
today.innerHTML = dateNow;

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

function buttonCheck(buttonDelete) {
    const buttonTaskComplete = document.createElement('button');
    buttonTaskComplete.innerText = 'Concluído';
    buttonTaskComplete.setAttribute('class', 'button-check');
    buttonDelete.appendChild(buttonTaskComplete);
}

function saveTask() {
    const liTask = ulTask.querySelectorAll('li');
    const listOfTasks = [];

    for (let tarefa of liTask) {
        let textTask = tarefa.innerText;
        textTask = textTask.replace('Apagar', '').trim();
        textTask = textTask.replace('Concluído', '').trim();
        listOfTasks.push(textTask);
    }

    const taskJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('tarefas', taskJSON);
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tarefas') ;
    const listOfTasks = JSON.parse(tasks);

    for (let task of listOfTasks) {
        createTask(task);
    }
}
addSaveTasks();

//funcao criar tarefa

function createTask(textInput) {
    result.classList.add('content-right')
    const li = createLi();
    li.innerText = textInput;
    ulTask.appendChild(li);
    clearInput();
    buttonDelete(li);
    buttonCheck(li);
    saveTask();
}

//acoes de evento
buttonTask.addEventListener('click', function () {
    if (!inputTask.value) return;
    createTask(inputTask.value);
})

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-list')) {
        el.parentElement.remove();
        saveTask();
    }
})

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-check')) {
        $('li').first().addClass('concluido')
    }
})


