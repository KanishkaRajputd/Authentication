const express=require("express");
const app=express();

const connect=require("./configs/db");

const usercontroler=require("./controoller/user.controller");
const {register,login}=require("./controoller/auth.controller")

const productController=require("./controoller/product.contoller")

app.use(express.json());

app.use("/users",usercontroler);
app.post("/register",register);
app.post("/login",login);

app.post("/product",productController)
app.listen(4777,async()=>{
try{
await connect();
console.log("listening port 4777");
}
catch(err){
    console.log(err.message);
}
})