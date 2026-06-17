const router = require("express").Router();

const turmaController = require("../controllers/turma.controller");


// Cadastrar turma
router.post("/", turmaController.cadastrar);


// Listar turmas do professor logado
router.get("/", turmaController.listar);


// Visualizar turma
router.get("/:id", turmaController.buscar);


// Excluir turma
router.delete("/:id", turmaController.excluir);



module.exports = router;