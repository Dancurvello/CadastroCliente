const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const btnSalvar = document.querySelector('#btnSalvar')
const sNascimento = document.querySelector('#m-nascimento')
const sCpf = document.querySelector('#m-cpf')
const sCelular = document.querySelector('#m-celular')
const sEmail = document.querySelector('#m-email')
const sEndereco = document.querySelector('#m-endereco')
const sObservacao = document.querySelector('#m-observacao')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sNascimento.value = itens[index].nascimento
    sCpf.value = itens[index].cpf
    sCelular.value = itens[index].celular
    sEmail.value = itens[index].email
    sEndereco.value = itens[index].endereco
    sObservacao.value = itens[index].observacao

    id = index
  } else {
    sNome.value = ''
    sNascimento.value = ''
    sCpf.value = ''
    sCelular.value = ''
    sEmail.value = ''
    sEndereco.value = ''
    sObservacao.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.nascimento}</td>
    <td>${item.cpf}</td>
    <td>${item.celular}</td>
    <td>${item.email}</td>
    <td>${item.endereco}</td>
    <td>${item.observacao}</td>
        <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sNascimento.value == '' || sCpf.value == '' || sCelular.value == '' || sEmail.value == '' || sEndereco.value == '' || sObservacao.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].nascimento = sNascimento.value
    itens[id].cpf = sCpf.value
    itens[id].celular = sCelular.value
    itens[id].email = sEmail.value
    itens[id].endereco = sEndereco.value
    itens[id].observacao = sObservacao.value

  } else {
    itens.push({'nome': sNome.value, 'nascimento': sNascimento.value, 'cpf': sCpf.value, 'celular': sCelular.value, 'email': sEmail.value, 'endereco': sEndereco.value, 'observacao': sObservacao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()