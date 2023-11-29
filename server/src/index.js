const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

const usersRouter=require("./routes/users");
const recipesRouter=require("./routes/recipes")

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/auth",usersRouter);
app.use("/recipes",recipesRouter);

mongoose.connect("mongodb+srv://sha:MERNpassword12@recipes.12fzh6w.mongodb.net/recipes?retryWrites=true&w=majority")
.then(()=>console.log("DB connection successfully"))
.catch((err)=>{console.log(err)})

app.listen(3001,()=>{
    console.log("SERVER IS RUNNING")
})