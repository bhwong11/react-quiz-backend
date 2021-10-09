const db = require('../models');

const show = async(req,res)=>{
    try{
        const foundUser = await db.User.findById(req.params.id);
        if(foundUser){
            res.status(200).json({
                status:200,
                message:'success',
                user:foundUser
            })
        }else{
            res.status(400).json({
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
        const updatedUser = db.User.findByIdAndUpdate(req.params.id,req.body,{new:true});
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
        const deletedUser = await db.User.findByIdAndDelete(req.params.id)
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