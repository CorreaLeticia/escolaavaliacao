const prisma = require("../data/prisma");

const login = async (req, res) => {

    try {

        const { email, senha } = req.body;

        console.log("Recebido:", req.body);

        const professor =
        await prisma.professor.findFirst({

            where: {
                email,
                senha
            }

        });

        console.log("Encontrado:", professor);

        if (!professor) {

            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });

        }


        req.session.professorId =
        professor.id;


        console.log(
            "CRIANDO SESSÃO:",
            req.session
        );


        req.session.save((erro)=>{

            if(erro){

                console.log(
                    "Erro sessão:",
                    erro
                );

                return res
                .status(500)
                .json({

                    mensagem:
                    "Erro ao criar sessão"

                });

            }


            console.log(
                "SESSÃO SALVA:",
                req.session
            );


            return res
            .status(200)
            .json({

                id:
                professor.id,

                nome:
                professor.nome

            });

        });


    } catch (erro) {

        console.log(
            "Erro login:",
            erro
        );

        return res
        .status(500)
        .json({

            mensagem:
            "Erro ao realizar login"

        });

    }

};

const logout = async (req, res) => {

    req.session.destroy(() => {

        res.status(200).json({
            mensagem: "Logout realizado"
        });

    });

};
const cadastrar = async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        const professor =
        await prisma.professor.create({

            data: {
                nome,
                email,
                senha
            }

        });

        res.status(201).json(professor);

    } catch (erro) {

        console.log(
            "Erro cadastro:",
            erro
        );

        res.status(500).json({

            mensagem:
            "Erro ao cadastrar"

        });

    }

};

const buscar = async (req, res) => {

    try {

        console.log(
            "SESSÃO PERFIL:",
            req.session
        );

        if (!req.session.professorId) {

            return res.status(401).json({

                mensagem:
                "Professor não autenticado"

            });

        }

        const professor =
        await prisma.professor.findUnique({

            where: {
                id:
                req.session.professorId
            }

        });

        res.status(200).json(
            professor
        );

    } catch (erro) {

        console.log(
            "Erro perfil:",
            erro
        );

        res.status(500).json({

            mensagem:
            "Erro ao buscar professor"

        });

    }

};


module.exports = {
    login,
    logout,
    cadastrar,
    buscar
};