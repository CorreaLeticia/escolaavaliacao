const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();


app.use(cors({

    origin:[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],

    credentials:true

}));


app.use(express.json());


app.use(
    session({

        secret:"saep-escola",

        resave:false,

        saveUninitialized:false,

        cookie:{
            secure:false
        }

    })
);



const professorRoutes = require("./src/routes/professor.routes");
const turmaRoutes = require("./src/routes/turma.routes");
const atividadeRoutes = require("./src/routes/atividade.routes");



app.use("/professores", professorRoutes);
app.use("/turmas", turmaRoutes);
app.use("/atividades", atividadeRoutes);



app.get("/",(req,res)=>{

    res.json({
        mensagem:"API funcionando"
    });

});



app.listen(3000,()=>{

    console.log("Servidor rodando na porta 3000");

});