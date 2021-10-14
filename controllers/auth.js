const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async(req,res)=>{
    try{
        const foundUserEmail = await db.User.findOne({email:req.body.email})
        console.log('FOUND USER',foundUserEmail)
        if(foundUserEmail){
            return res.status(400).json({
                status:400,
                message:'A user with that email already exist'
            })
        }
        const foundUserUsername = await db.User.findOne({username:req.body.username})
        console.log('FOUND USERname',foundUserUsername)
        if(foundUserUsername){
            return res.status(400).json({
                status:400,
                message:'A user with that username already exist'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const createdUser = await db.User.create({...req.body,password:hash});
        const token = jwt.sign({_id:createdUser._id},process.env.SECRET,{
            expiresIn:"1d",
        })
        return res.status(200).json({
            status: 200,
            message:'success',
            createdUser,
            token,
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:error,
        })
    }
}

const login = async (req,res)=>{
    try{
        const foundUser = await db.User.findOne({username:req.body.username}).select('+password')
        if(!foundUser){
            return res.status(400).json({
                status:400,
                message: 'Username or password is not found"',
            })
        }
        const isMatch = bcrypt.compare(foundUser.password,req.body.password)
        if(isMatch){
            const token = jwt.sign({_id:foundUser._id},process.env.SECRET,{
                expiresIn:"1d",
            })

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
    
            return res.status(200).json({
                status:200,
                message:"success",
                user:foundUser,
                quizzes: userQuizzes,
                completeScore,
                token,
            })
        }else{
            return res.status(400).json({
                status:400,
                message: "Username or password is not found"
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

module.exports ={
    register,
    login,
}