const router = require("express").Router();

const professorController = require("../controllers/professor.controller");


router.post("/login", professorController.login);

router.post("/logout", professorController.logout);

router.post("/", professorController.cadastrar);

router.get("/perfil", professorController.buscar);


module.exports = router;