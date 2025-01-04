if(process.env.NODE_ENV != "production"){
    require("dotenv").config(); 
}



const express =  require("express");
const app =  express();
const mongoose =  require("mongoose");
const path =  require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const wrapAsync = require("./utils/wrapAsync.js");
const expressError =  require("./utils/expressErros.js");
const session =  require("express-session");
const flash =  require("connect-flash");
const passport =  require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User =  require("./models/user.js");
const passportlocalmongoose =  require("passport-local-mongoose");

// LocalStrategy = require('passport-local'),/






const listingRouter =  require("./routes/listing.js");
const reviewRouter =  require("./routes/review.js");
const userRouter =  require("./routes/user.js");


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended :true}));

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);


//connecting to DB


const MongUrl = "mongodb://127.0.0.1:27017/wanderlust";
main().then( ()=>{
    console.log("connected to DB");
})
.catch((e)=>{
    console.log(e);
});

async function main (){
    await mongoose.connect(MongUrl);
}

//middle ware for sessions 






const sessionOption = {
    secret:"my super secret",
    resave:false,
    saveUninitialized:true ,
    cookie:{
        expires:Date.now() + 7 *24*60 *60 *1000,
        maxAge:7 *24*60 *60 *1000,
        httpOnly:true

    }
};



 


app.use(session(sessionOption)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



 


    app.use((req,res,next)=>{
        res.locals.success =  req.flash("success");
        res.locals.error =  req.flash("error");
        res.locals.currUser =  req.user;
            next();
    });



// middleware for Express router

app.use("/listings" ,listingRouter);
app.use("/listings/:id/reviews" ,reviewRouter);
app.use("/",userRouter);
//routes
app.get("/demouser", async(req,res) =>{
let fakeuser =  new User({
email:  "st@gmail.com",
username:"student-1",


});


let newUser=  await User.register(fakeuser,"hello123");
res.send(newUser);
});



app.get("/",async (req,res) =>{

res.redirect("/listings");

});

// // if no route mathched ->

 app.get("*" , (req,res,next) =>{
   next(new expressError(404," Page not found "));
 });


let port = 8080;
 app.listen(port,  ()=>{
    console.log("server is listening to port " , port);
});

// error handling middleware .. 

app.use((err, req,res,next)=>{
let {status=500 ,  message="default error" } =  err;
console.log(err);
res.status(status).render("listings/error.ejs" , {err});
})

