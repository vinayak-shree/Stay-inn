if(process.env.NODE_ENV!="production"){
require("dotenv").config();
};


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
// const Listing = require('./models/listing.js');
const listings = require('./routes/listing.js');
const reviews = require('./routes/reviews.js');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// To connect database with server localhost
// const mongo_url = "mongodb://localhost:27017/Stayinn";

//Connection to mongo atlas server
const dbUrl = process.env.ATLASDB_URL;

const flash = require("connect-flash");
// Used to create templates or layouts
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
app.engine("ejs" , ejsMate);


// To use Css in app.js

app.use(express.static(path.join(__dirname , "/public")));



async function main() {
    // connect with atlas
    await mongoose.connect(dbUrl)    
}
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));





// To call this Main function 
main().then(()=>{
    console.log("Connected to DataBase");
    
})
.catch((err)=>{
    console.log(err);
    
});

//Create mongo Store
const store = MongoStore.create(
    {
        mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    // touch After interval between session updates
touchAfter: 24*3600,
    }
)
store.on("erro" , ()=>{
    console.log("Error in Session Store" , err);
    
})

const sessionOptions = {
    store,
     secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly:true
    }
}



// middleware
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
// so that every request must know that session is same
app.use(passport.session());
// should authenticate through local Strategy
// use to authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// serialize user into user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req , res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    
    next();
});
//pbkdf -- hasing algorithm implement hoti h
// app.get("/demouser" , async(req,res)=>{
//     let fakeUser = new User({
//         email : "student123@gmail.com",
//         username: "delta-student-delaa",
//     });

//     // store
//     // resgiter method will automatically determine unique usernmae
//    let registeredUser = await User.register(fakeUser , "helloWorld");
//    res.send(registeredUser);
// })




 app.get("/" , (req , res)=>{
    res.redirect("/listings");
 });


app.use("/listings" , listings);
/* :id will stuck hence it can create error*/
app.use("/listings/:id/reviews" , reviews);
app.use("/",userRouter);

/* v5 *splat*/
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found :P"));
});
app.use((err , req , res , next) => {
    console.log(err);
    
    let {statusCode = 500 , message="something Went Wrong"} = err;
    res.status(statusCode).render("error.ejs" , {message});
});

app.listen (8080 , ()=>{
    console.log("Server is running on port 8080");

});
