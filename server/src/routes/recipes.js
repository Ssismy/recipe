const Recipes=require("../models/Recipes");
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");

router.get("/",async(req,res)=>{
  
    try{
      const response=await Recipes.find({});
      res.json(response.splice(0,9));
    }catch(err){
        res.json(err);
    }
})


router.post("/",async(req,res)=>{
    const recipe=new Recipes(req.body);
    try{
      const response=await recipe.save();
      res.json(response);
    }catch(err){
        res.json(err);
    }
})


router.get("/:recipeID",async(req,res)=>{
  try{
    const response=await Recipes.findById(req.params.recipeID);
    res.json(response);
  }catch(err){
    res.json(err);
  }
})

module.exports=router;