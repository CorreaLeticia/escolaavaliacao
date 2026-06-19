const prisma = require("../data/prisma");

const cadastrar = async (req,res)=>{

    try{

        console.log(
            "SESSÃO CADASTRAR:",
            req.session
        );

        if(!req.session.professorId){

            return res.status(401).json({
                mensagem:"Professor não autenticado"
            });

        }

        const {nome}=req.body;

        const turma =
        await prisma.turma.create({

            data:{
                nome,
                professorId:
                req.session.professorId
            }

        });

        res.status(201).json(turma);

    }catch(erro){

        console.log(
            "Erro cadastrar turma:",
            erro
        );

        res.status(500).json({
            mensagem:"Erro ao cadastrar turma"
        });

    }

};

const listar = async(req,res)=>{

    try{

        console.log(
            "SESSÃO LISTAR:",
            req.session
        );

        if(!req.session.professorId){

            return res.status(401).json({

                mensagem:
                "Sem sessão"

            });

        }

        const turmas =
        await prisma.turma.findMany({

            where:{
                professorId:
                req.session.professorId
            }

        });

        res.status(200).json(
            turmas
        );

    }catch(erro){

        console.log(
            "Erro listar:",
            erro
        );

        res.status(500).json({

            mensagem:
            "Erro"

        });

    }

};

const buscar = async(req,res)=>{

    try{

        const {id}=req.params;

        const turma =
        await prisma.turma.findUnique({

            where:{
                id:Number(id)
            }

        });

        res.status(200).json(turma);

    }catch(erro){

        console.log(erro);

        res.status(500).json({
            mensagem:"Erro"
        });

    }

};

const excluir = async(req,res)=>{

    try{

        const {id}=req.params;

        const atividades =
        await prisma.atividade.count({

            where:{
                turmaId:Number(id)
            }

        });

        if(atividades>0){

            return res.status(400).json({

                mensagem:
                "Você não pode excluir uma turma com atividades cadastradas"

            });

        }

        await prisma.turma.delete({

            where:{
                id:Number(id)
            }

        });

        res.status(200).json({

            mensagem:
            "Turma excluída"

        });

    }catch(erro){

        console.log(erro);

        res.status(500).json({

            mensagem:"Erro"

        });

    }

};


module.exports={
cadastrar,
listar,
buscar,
excluir
};