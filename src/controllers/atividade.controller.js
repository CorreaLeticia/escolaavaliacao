const prisma = require("../data/prisma");



// CADASTRAR ATIVIDADE
const cadastrar = async(req,res)=>{


    const {descricao,turmaId}=req.body;



    const atividade = await prisma.atividade.create({

        data:{
            descricao,
            turmaId:Number(turmaId)
        }

    });



    res.status(201).json(atividade);

};





// LISTAR ATIVIDADES DA TURMA
const listar = async(req,res)=>{


    const {turmaId}=req.params;



    const atividades = await prisma.atividade.findMany({

        where:{
            turmaId:Number(turmaId)
        }

    });



    res.status(200).json(atividades);

};





module.exports={

    cadastrar,
    listar

};