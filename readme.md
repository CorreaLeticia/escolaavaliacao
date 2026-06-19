#  Sistema de Controle de Turmas e Atividades

Sistema web para gerenciamento de turmas e atividades de professores, com autenticação e controle de registros.

---

## Funcionalidades

- Login de professor
- Painel principal do professor
- Cadastro de turmas
- Listagem de turmas
- Exclusão de turmas com validação
- Cadastro e listagem de atividades por turma
- Logout do sistema

---

##  Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- API REST

---

## Prints do sistema

-  Tela de login  
  ![Login](./assets/login.png)

-  Painel principal do professor (com listagem de turmas)  
  ![Home](./assets/tela-professor.png)

-  Cadastro de atividade  
  ![Cadastro atividade](./assets/cadastro-atividade.png)

-  Cadastro de turma  
  ![Cadastro turma](./assets/cadastro-turma.png)

-  Exclusão de turma (alerta ou confirmação)  
  ![Exclusão](./assets/exclusao-turma.png)

-  Tela de atividades da turma  
  ![Atividades](./assets/tela-de-atividades.png)

 -  Logout do sistema (retorno ao login)  
  ![Logout](./assets/logout.png)

---

##  Regras do sistema

- Cada turma pertence a um professor
- Cada professor pode ter várias turmas
- Cada atividade pertence a uma turma
- Não é possível excluir turma com atividades cadastradas
- Não é necessário autenticação JWT

---


##  Como executar o projeto

Para executar o sistema corretamente, é necessário rodar o backend (API) e o frontend simultaneamente.

O backend foi desenvolvido em Node.js e utiliza dependências instaladas via npm. Para iniciar o sistema, abra o terminal na pasta do backend e execute o comando `npm install` para instalar todas as dependências necessárias. Em seguida, execute `npm start` para iniciar o servidor da API. O backend ficará disponível em `http://127.0.0.1:3000`, sendo responsável por todas as requisições do sistema, como login, cadastro, listagem e exclusão de turmas e atividades.

Após o backend estar em execução, o frontend deve ser aberto diretamente pelo arquivo `index.html` localizado na pasta do projeto. Também é possível executar o frontend utilizando a extensão Live Server no VS Code, o que facilita a atualização automática da interface.

É importante garantir que o backend esteja ativo antes de abrir o frontend, pois sem a API em execução o sistema não conseguirá realizar autenticação nem manipulação de dados.

Após isso, o usuário poderá acessar o sistema, realizar login com um professor cadastrado no banco de dados e utilizar todas as funcionalidades disponíveis, como cadastro de turmas, visualização de turmas, cadastro de atividades por turma, listagem de atividades, exclusão de registros e logout do sistema.
