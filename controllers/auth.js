const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//models
const {User} = require('../models');

const register = async(req,res)=>{
    try{
        const foundUserEmail = await User.find({email:req.body.email})
        if(foundUserEmail){
            return res.status(400).json({
                status:400,
                message:'A user with that email already exist'
            })
        }
        const foundUserUsername = await User.find({username:req.body.username})
        if(foundUserUsername){
            return res.status(400).json({
                status:400,
                message:'A user with that username already exist'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt)
        const createdUser = await db.User.create({...req.body,password:hash})

        return res.status(200).json({
            status: 200,
            message:'success',
            createdUser
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
        const foundUser = await User.findOne({username:req.body.username}).select('+password')
        if(!foundUser){
            return res.status(400).json({
                status:400,
                message: 'No user with that username was found',
            })
        }
        const isMatch = bcrypt.compare(foundUser.password,req.body.password)
        if(isMatch){
            const token = jwt.sign({_id:foundUser._id},"supersecretwaffles",{
                expiresIn:"1d",
            })
    
            return res.status(200).json({
                status:200,
                message:"success",
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