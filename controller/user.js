const Listing = require("../models/listing");
const Review =  require("../models/feedback");
const User =  require("../models/user");

module.exports.getSignupForm = (req ,res) =>{
    res.render("users/signup.ejs");
    // res.send("form")
    
    
    }

 module.exports.Signup =  async(req,res)=>{
    try{
        let {username ,email,password}=  req.body;
        let newUser = await  new User({email , username});
        console.log(newUser);
        const registeredUser = await  User.register(newUser , password);
        console.log(registeredUser);
    
        req.login(registeredUser,(err)=>{
          if(err){
            next(err);
          }
          req.flash("success" ," Welcome to Air BNB");
          res.redirect("/listings");
        })
       
    }
    catch(e){
        req.flash("error" ,e.message);
        res.redirect("/signup")
    }
    }   

 module.exports.getLoginForm = (req,res)=>{
    res.render("users/login.ejs");
    }   

   module.exports.Login=  (req, res) => {
        req.flash("success" ,"welcome back to wanderlust");
       let redirectUrl =    res.locals.redirectUrl || "/listings" ;
           res.redirect(redirectUrl);
           
         } 

         module.exports.Logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "Logged out Successfully");
        console.log("logged out successfullly");
        res.redirect("/listings"); 
    });
}

 
    
        