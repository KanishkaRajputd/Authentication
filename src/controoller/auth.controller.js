const User=require("../model/user.model")

const jwt = require('jsonwebtoken');
require('dotenv').config()

const genratetoken=(user)=>{
    return jwt.sign({user}, process.env.SECRET_KEY)
}

const register=async(req,res)=>{

try{
let user=await User.findOne({email:req.body.email});

if(user){
    res.send("Email or password allready taken")

}
const Token=genratetoken(user)

user=await User.create(req.body);
 return res.send(user,Token);
}
catch(err){
  
    return res.send(err.message);
}

}


const login=async(req,res)=>{

try{
const user=await User.findOne({email:req.body.email})

if(!user){
res.send("email or passwod is wrong")

}
const match=checkPassword(req.body.password);

if(!match){

    res.send("email or passwod is wrong");

}
const token = generateToken(user)
return res.status(200).send({user, token});

}catch(err){
    res.send(err.message);
}

}

module.exports={register,login};