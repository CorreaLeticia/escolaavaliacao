const router = require("express").Router();

const atividadeController = require("../controllers/atividade.controller");

router.post("/", atividadeController.cadastrar);
router.get("/:turmaId", atividadeController.listar);


module.exports = router;