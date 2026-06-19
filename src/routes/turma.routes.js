const router = require("express").Router();
const turmaController = require("../controllers/turma.controller");

router.post("/", turmaController.cadastrar);
router.get("/", turmaController.listar);
router.get("/:id", turmaController.buscar);
router.delete("/:id", turmaController.excluir);

module.exports = router;