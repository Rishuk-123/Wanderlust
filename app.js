const express=require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path");
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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

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
//index route
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//create route
// CREATE route
app.post("/listings", async (req, res) => {
    console.log(req.body);           // check data coming
    const newListing = new Listing(req.body.listing);
    await newListing.save();         // save to MongoDB
    res.redirect("/listings");       // go back to index page
});



//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing})
});



app.listen(port,()=>{
    console.log(`this is listening to port ${port}`)
});