const prisma = require("../data/prisma");


// CADASTRAR TURMA
const cadastrar = async(req,res)=>{


    const {nome}=req.body;


    const turma = await prisma.turma.create({

        data:{
            nome,
            professorId:req.session.professorId
        }

    });


    res.status(201).json(turma);

};




// LISTAR TURMAS DO PROFESSOR
const listar = async(req,res)=>{


    const turmas = await prisma.turma.findMany({

        where:{
            professorId:req.session.professorId
        }

    });


    res.status(200).json(turmas);

};





// VISUALIZAR TURMA
const buscar = async(req,res)=>{


    const {id}=req.params;


    const turma = await prisma.turma.findUnique({

        where:{
            id:Number(id)
        }

    });


    res.status(200).json(turma);

};





// EXCLUIR TURMA
const excluir = async(req,res)=>{


    const {id}=req.params;



    const atividades = await prisma.atividade.count({

        where:{
            turmaId:Number(id)
        }

    });



    if(atividades > 0){

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

        mensagem:"Turma excluída com sucesso"

    });


};





module.exports={
    cadastrar,
    listar,
    buscar,
    excluir
};