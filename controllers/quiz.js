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
        let score = 0;
        if(newQuiz.difficulty==='easy'){
            score=newQuiz.score * 1
        }
        if(newQuiz.difficulty==='medium'){
            score=newQuiz.score * 5
        }
        if(newQuiz.difficulty==='hard'){
            score=newQuiz.score * 10
        }
        const user = await db.User.findByIdAndUpdate(newQuiz.user,{$inc:{userScore:score}},{new:true})
        console.log(user)
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
        const previousQuiz = await db.Quiz.findById(req.params.id);
        let previousScore = 0;
        if(previousQuiz.difficulty==='easy'){
            previousScore=previousQuiz.score * 1
        }
        if(previousQuiz.difficulty==='medium'){
            previousScore=previousQuiz.score * 5
        }
        if(previousQuiz.difficulty==='hard'){
            previousScore=previousQuiz.score * 10
        }

        const updatedQuiz = await db.Quiz.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedQuiz){
            return res.status(400).json({
                status:400,
                message:'could not find Quiz with that ID'
            })
        }
        let newScore = 0;
        if(updatedQuiz.difficulty==='easy'){
            newScore=updatedQuiz.score * 1
        }
        if(updatedQuiz.difficulty==='medium'){
            newScore=updatedQuiz.score * 5
        }
        if(updatedQuiz.difficulty==='hard'){
            newScore=updatedQuiz.score * 10
        }
        const user = await db.User.findByIdAndUpdate(updatedQuiz.user,{$inc:{userScore:(newScore-previousScore)}},{new:true})

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
        let score = 0;
        if(deletedQuiz.difficulty==='easy'){
            score=deletedQuiz.score * 1
        }
        if(deletedQuiz.difficulty==='medium'){
            score=deletedQuiz.score * 5
        }
        if(deletedQuiz.difficulty==='hard'){
            score=deletedQuiz.score * 10
        }
        const user = await db.User.findByIdAndUpdate(deletedQuiz.user,{$inc:{userScore:-score}},{new:true})
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