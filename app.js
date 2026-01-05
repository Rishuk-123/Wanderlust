const express=require("express");
const app=express();
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const path=require("path");

const Listing=require("./models/listing.js");
const ejsMate = require("ejs-mate");

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
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public"))) 

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

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
       let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

//update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete raute
app.delete("/listings/:id",async (req,res)=>{
     let {id}=req.params;
   let deletedListing=await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   res.redirect("/listings");
})

app.listen(port,()=>{
    console.log(`this is listening to port ${port}`)
});