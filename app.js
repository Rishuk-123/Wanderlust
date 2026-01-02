const express=require("express");
const app=express();
const mongoose=require("mongoose")
const port=8080;
const MONGO_url="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_url);
}
app.get("/",(req,res)=>{
    res.send("Hi i am root!")
})
app.listen(port,()=>{
    console.log(`this is listening to port ${port}`)
});