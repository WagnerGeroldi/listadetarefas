const inputTarefa = document.querySelector('.nova-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const resultado = document.querySelector('#resultado')
const ulTarefas = document.querySelector('.tarefas');

function clearInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function buttonDelete(li) {
    const botao = document.createElement('button');
    botao.innerText = 'Apagar';
    botao.setAttribute('class', 'button-list');
    li.appendChild(botao);
}


//funcao criar tarefa

function criarTarefa() {
    resultado.classList.add('content-right')
    const li = document.createElement('li');
    li.innerHTML = `${inputTarefa.value}`;
    ulTarefas.appendChild(li);
    clearInput();
    buttonDelete(li);
}

//acoes de evento
btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criarTarefa();
})

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-list')) {
        el.parentElement.remove();
    }
})