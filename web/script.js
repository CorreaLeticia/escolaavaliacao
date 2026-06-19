const API = "http://127.0.0.1:3000";
let turmaSelecionada = null;

function showPage(page){
  document.querySelectorAll(".page").forEach(tela=>{
    tela.classList.add("escondido");
  });

  document.getElementById(page).classList.remove("escondido");
}

function abrirModalTurma(){
  document.getElementById("modalTurma").style.display="flex";
}

function fecharModalTurma(){
  document.getElementById("modalTurma").style.display="none";
}

function abrirModalAtividade(){
  document.getElementById("modalAtividade").style.display="flex";
}

function fecharModalAtividade(){
  document.getElementById("modalAtividade").style.display="none";
}

function adicionarTurma(){
  cadastrarTurma();
}

function adicionarAtividade(){
  cadastrarAtividade();
}

async function login(){
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const resposta = await fetch(`${API}/professores/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      senha
    })
  });

  if(resposta.ok){
    const professor = await resposta.json();

    document.getElementById("nomeProfessor").innerText = professor.nome;

    showPage("professor");

    await carregarTurmas();
  } else {
    alert("Email ou senha inválidos");
  }
}

async function carregarTurmas(){
  const resposta = await fetch(`${API}/turmas`, {
    credentials: "include"
  });

  const turmas = await resposta.json();

  const tabela = document.getElementById("listaTurmas");
  tabela.innerHTML = "";

  turmas.forEach((turma)=>{
    tabela.innerHTML += `
      <tr>
        <td>${turma.id}</td>
        <td>${turma.nome}</td>
        <td>
          <button class="visualizar" onclick="verAtividades(${turma.id}, '${turma.nome}')">
            Visualizar
          </button>

          <button class="excluir" onclick="excluirTurma(${turma.id})">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

async function cadastrarTurma(){
  const nome = document.getElementById("inputTurma").value;

  if(!nome){
    alert("Digite o nome da turma");
    return;
  }

  await fetch(`${API}/turmas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ nome })
  });

  document.getElementById("inputTurma").value = "";

  fecharModalTurma();

  await carregarTurmas();
}

async function excluirTurma(id){
  if(!confirm("Deseja excluir?")) return;

  const resposta = await fetch(`${API}/turmas/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  if(resposta.ok){
    await carregarTurmas();
  } else {
    alert("Não é possível excluir turma com atividades cadastradas");
  }
}

async function verAtividades(id, nome){
  turmaSelecionada = id;

  document.getElementById("tituloTurma").innerText = nome;

  showPage("atividades");

  await carregarAtividades();
}

async function carregarAtividades(){
  const resposta = await fetch(`${API}/atividades/${turmaSelecionada}`, {
    credentials: "include"
  });

  const atividades = await resposta.json();

  const tabela = document.getElementById("listaAtividades");
  tabela.innerHTML = "";

  atividades.forEach((atividade)=>{
    tabela.innerHTML += `
      <tr>
        <td>${atividade.id}</td>
        <td>${atividade.descricao}</td>
        <td>
          <button class="excluir" onclick="excluirAtividade(${atividade.id})">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

async function cadastrarAtividade(){
  const descricao = document.getElementById("descricao").value;

  await fetch(`${API}/atividades`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      descricao,
      turmaId: turmaSelecionada
    })
  });

  document.getElementById("descricao").value = "";

  fecharModalAtividade();

  await carregarAtividades();
}

async function excluirAtividade(id){
  if(!confirm("Deseja excluir esta atividade?")) return;

  await fetch(`${API}/atividades/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  await carregarAtividades();
}

async function logout(){
  await fetch(`${API}/professores/logout`, {
    method: "POST",
    credentials: "include"
  });

  showPage("login");
}