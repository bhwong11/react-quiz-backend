const db = require('../models');

const index = async(req,res)=>{
    try{
        const users = await db.User.find({})
        return res.status(200).json({
            status:200,
            message:'success',
            users,
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
        const foundUser = await db.User.findById(req.userId);
        if(foundUser){
            const userQuizzes = await db.Quiz.find({user:foundUser._id})

            //quizes by difficulty
            const easyQuizzes = userQuizzes.filter(quiz=>quiz.difficulty==='easy')
            const mediumQuizzes = userQuizzes.filter(quiz=>quiz.difficulty==='medium')
            const hardQuizzes = userQuizzes.filter(quiz=>quiz.difficulty==='hard')

            //scores
            let easyScore =0
            let mediumScore =0
            let hardScore =0
            if(easyQuizzes.length>0){
                easyScore = easyQuizzes.map(quiz=>quiz.score).reduce((a,c)=>a+c)
            }
            if(mediumQuizzes.length>0){
                mediumScore = mediumQuizzes.map(quiz=>quiz.score).reduce((a,c)=>a+c)
            }
            if(hardQuizzes.length>0){
                hardScore = hardQuizzes.map(quiz=>quiz.score).reduce((a,c)=>a+c)
            }

            //rank calculate
            const completeScore = ((easyScore*1)+(mediumScore*5)+(hardScore*10))
            
            //find Rank Order
            const allUsers = await db.User.find({})
            const sortedUsernames = allUsers.sort((a,b)=>b.userScore-a.userScore).map(user=>user.username)

            return res.status(200).json({
                status:200,
                message:'success',
                user:foundUser,
                quizzes: userQuizzes,
                completeScore,
                rank:sortedUsernames.indexOf(foundUser.username)+1,
            })
        }else{
            return res.status(400).json({
                status:400,
                message:'could not find user with that ID'
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
        const updatedUser = await db.User.findByIdAndUpdate(req.userId,req.body,{new:true});
        if(!updatedUser){
            res.status(400).json({
                status:400,
                message:'could not find user with that ID'
            })
        }
        return res.status(200).json({
            status:200,
            message:'success',
            user:updatedUser
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
        const deletedUser = await db.User.findByIdAndDelete(req.userId)
        if(!deletedUser){
            res.status(400).json({
                status:400,
                message:'could not find user with that ID'
            })
        }
        return res.status(200).json({
            status:200,
            message:'success',
            user:deletedUser
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
    show,
    index,
    update,
    destroy,
}