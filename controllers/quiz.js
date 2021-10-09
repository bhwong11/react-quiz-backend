const db = require('../models');

const index = async(req,res)=>{
    try{
        const foundQuizzes = await db.Quiz.find({});
            return res.status(200).json({
                status:200,
                message:'success',
                quizzes:foundQuizzes
            })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:error,
        })
    }
}

const create = async(req,res)=>{
    try{
        const newQuiz = await db.Quiz.create(req.body);
            return res.status(200).json({
                status:200,
                message:'success',
                quiz:newQuiz
            })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:error,
        })
    }
}

const show = async(req,res)=>{
    try{
        const foundQuiz = await db.Quiz.findById(req.params.id);
        if(foundQuiz){
            return res.status(200).json({
                status:200,
                message:'success',
                quiz:foundQuiz
            })
        }else{
            res.status(400).json({
                status:400,
                message:'could not find Quiz with that ID'
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:error,
        })
    }
}

const update = async (req,res)=>{
    try{
        const updatedQuiz = db.Quiz.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedQuiz){
            return res.status(400).json({
                status:400,
                message:'could not find Quiz with that ID'
            })
        }
        return res.status(200).json({
            status:200,
            message:'success',
            quiz:updatedQuiz
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:error,
        })
    }
}

const destroy = async(req,res)=>{
    try{
        const deletedQuiz = await db.Quiz.findByIdAndDelete(req.params.id)
        if(!deletedQuiz){
            res.status(400).json({
                status:400,
                message:'could not find Quiz with that ID'
            })
        }
        return res.status(200).json({
            status:200,
            message:'success',
            quiz:deletedQuiz
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:error,
        })
    }
}

module.exports ={
    index,
    create,
    show,
    update,
    destroy,
}