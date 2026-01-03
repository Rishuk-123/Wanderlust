const express=require("express");
const app=express();
const mongoose=require("mongoose")
const Listing=require("./models/listing.js");

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

app.get("/testListing",async (req,res)=>{
    let sampleListing=new Listing({
        title:"My new Villa ",
        description:"By the beach ",
        price:2000,
        location:"Calangute,Goa",
        country:"India",
    });
    await sampleListing.save();
    console.log("sample was saved ");
    res.send("successful testing ");
})

app.get("/",(req,res)=>{
    res.send("Hi i am root!")
})
app.listen(port,()=>{
    console.log(`this is listening to port ${port}`)
});