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

function createLi() {
    const li = document.createElement('li');
    return li;
  }

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

function salvarTarefas() {
    const liTarefas = ulTarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        tarefaTexto = tarefaTexto.replace('Concluído', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criarTarefa(tarefa);
    }
}
adicionaTarefasSalvas();

//funcao criar tarefa

function criarTarefa(textoInput) {
    resultado.classList.add('content-right')
    const li = createLi();
    li.innerText = textoInput;
    ulTarefas.appendChild(li);
    clearInput();
    buttonDelete(li);
    buttonCheck(li);
    salvarTarefas();
}

//acoes de evento
btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
})

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-list')) {
        el.parentElement.remove();
        salvarTarefas();
    }
})

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('button-check')) {
        $('li').textNode().addClass('concluido')
    }
})


