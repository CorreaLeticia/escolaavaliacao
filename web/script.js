const API = "http://localhost:3000";


let turmaSelecionada = null;



// =================
// TROCAR TELAS
// =================

function showPage(page){

    document
    .querySelectorAll(".page")
    .forEach(tela=>{
        tela.classList.add("escondido");
    });


    document
    .getElementById(page)
    .classList.remove("escondido");


}



// =================
// LOGIN
// =================


async function login(){


    const email =
    document.getElementById("email").value;


    const senha =
    document.getElementById("senha").value;



    const resposta =
    await fetch(`${API}/professores/login`,{


        method:"POST",


        headers:{
            "Content-Type":"application/json"
        },


        credentials:"include",


        body:JSON.stringify({
            email,
            senha
        })


    });



    if(resposta.ok){


        const professor =
        await resposta.json();



        document
        .getElementById("nomeProfessor")
        .innerText = professor.nome;



        showPage("professor");


        carregarTurmas();



    }else{


        alert("Email ou senha inválidos");


    }


}





// =================
// TURMAS
// =================


async function carregarTurmas(){


    const resposta =
    await fetch(`${API}/turmas`,{


        credentials:"include"


    });



    const turmas =
    await resposta.json();



    const tabela =
    document.getElementById("listaTurmas");



    tabela.innerHTML="";



    turmas.forEach((turma,index)=>{


        tabela.innerHTML += `


        <tr>

        <td>${index+1}</td>


        <td>${turma.nome}</td>


        <td>


        <button onclick="verAtividades(${turma.id}, '${turma.nome}')">
        Visualizar
        </button>


        <button onclick="excluirTurma(${turma.id})">
        Excluir
        </button>


        </td>


        </tr>


        `;


    });



}




// =================
// CADASTRAR TURMA
// =================


async function cadastrarTurma(){


    const nome =
    document.getElementById("nomeTurma").value;



    await fetch(`${API}/turmas`,{


        method:"POST",


        headers:{
            "Content-Type":"application/json"
        },


        credentials:"include",


        body:JSON.stringify({

            nome

        })


    });



    fecharModalTurma();


    carregarTurmas();


}






// =================
// EXCLUIR TURMA
// =================


async function excluirTurma(id){


    if(!confirm("Deseja excluir essa turma?"))
        return;



    const resposta =
    await fetch(`${API}/turmas/${id}`,{


        method:"DELETE",


        credentials:"include"


    });



    const retorno =
    await resposta.json();



    if(!resposta.ok){


        alert(retorno.mensagem);


    }else{


        carregarTurmas();


    }


}







// =================
// ATIVIDADES
// =================


async function verAtividades(id,nome){


    turmaSelecionada=id;



    document
    .getElementById("nomeTurma")
    .innerText=nome;



    showPage("atividades");



    carregarAtividades();


}







async function carregarAtividades(){



    const resposta =
    await fetch(
        `${API}/atividades/${turmaSelecionada}`,
        {
            credentials:"include"
        }
    );



    const atividades =
    await resposta.json();



    const tabela =
    document.getElementById("listaAtividades");



    tabela.innerHTML="";



    atividades.forEach((atividade,index)=>{


        tabela.innerHTML += `


        <tr>

        <td>${index+1}</td>


        <td>${atividade.descricao}</td>


        </tr>


        `;


    });


}





// =================
// CADASTRAR ATIVIDADE
// =================


async function cadastrarAtividade(){



    const descricao =
    document.getElementById("descricao")
    .value;



    await fetch(`${API}/atividades`,{


        method:"POST",


        headers:{
            "Content-Type":"application/json"
        },


        credentials:"include",


        body:JSON.stringify({

            descricao,

            turmaId:turmaSelecionada

        })


    });



    fecharModalAtividade();


    carregarAtividades();



}







// =================
// LOGOUT
// =================


async function logout(){



    await fetch(
        `${API}/professores/logout`,
        {

        method:"POST",

        credentials:"include"

        }
    );



    showPage("login");


}