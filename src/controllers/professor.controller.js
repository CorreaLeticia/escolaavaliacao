const prisma = require("../data/prisma");


// LOGIN DO PROFESSOR
const login = async (req, res) => {

    const { email, senha } = req.body;


    const professor = await prisma.professor.findFirst({
        where: {
            email,
            senha
        }
    });


    if (!professor) {
        return res.status(401).json({
            mensagem: "Email ou senha inválidos"
        });
    }


    req.session.professorId = professor.id;


    res.status(200).json({
        id: professor.id,
        nome: professor.nome
    });

};



// LOGOUT
const logout = async (req, res) => {

    req.session.destroy(() => {

        res.status(200).json({
            mensagem: "Logout realizado"
        });

    });

};



// CADASTRO DE PROFESSOR
const cadastrar = async (req,res)=>{

    const {nome,email,senha} = req.body;


    const professor = await prisma.professor.create({

        data:{
            nome,
            email,
            senha
        }

    });


    res.status(201).json(professor);

};



// BUSCAR PROFESSOR LOGADO
const buscar = async(req,res)=>{

    const professor = await prisma.professor.findUnique({

        where:{
            id:req.session.professorId
        }

    });


    res.status(200).json(professor);

};



module.exports = {
    login,
    logout,
    cadastrar,
    buscar
};