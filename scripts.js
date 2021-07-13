const inputTarefa = document.querySelector('.nova-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const resultado = document.querySelector('#resultado')
const ulTarefas = document.querySelector('.tarefas');
const dataAtual = document.querySelector('.data');
const pCheck = document.querySelector('.tarefaLista')

let data = new Date();
let dia = String(data.getDate()).padStart(2, '0')
let mes = String(data.getMonth() + 1).padStart(2, '0')
let ano = String(data.getUTCFullYear())
let dataAgora = 'Hoje é ' + dia + '/' + mes + '/' + ano
dataAtual.innerHTML = dataAgora;

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

function buttonCheck(botao) {
    const botaoConcluido = document.createElement('button');
    botaoConcluido.innerText = 'Concluído';
    botaoConcluido.setAttribute('class', 'button-check');
    botao.appendChild(botaoConcluido);
}


//funcao criar tarefa

function criarTarefa() {
    resultado.classList.add('content-right')
    const li = document.createElement('li');
    li.innerHTML = `<p class="tarefaLista">${inputTarefa.value}</p>`;
    ulTarefas.appendChild(li);
    clearInput();
    buttonDelete(li);
    buttonCheck(li);
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

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-check')) {

        $('.tarefaLista').first().addClass('concluido')
    }
})


