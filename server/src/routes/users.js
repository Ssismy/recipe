const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const Users=require("../models/Users");
const bcrypt=require("bcrypt")


router.post("/register",async(req,res)=>{
    const{username,password}=req.body;

    const user=await Users.findOne({username:username});

    if(user){
        res.json({message:"User has already exists"})
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=new Users({username,password:hashedPassword})
    await newUser.save();

    res.json({message:"User Register Successfully"});
}
)

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const user=await Users.findOne({username:username});

    if(!user){
        return res.json({message:"User doesn't exist"})
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({message:"Username or Password is incorrect"})
    }
    const token=jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id})
})

module.exports=router;