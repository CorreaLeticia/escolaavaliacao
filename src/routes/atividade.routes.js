const router = require("express").Router();

const atividadeController = require("../controllers/atividade.controller");


// Cadastrar atividade
router.post("/", atividadeController.cadastrar);


// Listar atividades da turma
router.get("/:turmaId", atividadeController.listar);



module.exports = router;