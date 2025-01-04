const express =  require("express");
const router =  express.Router();
const User =  require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError =  require("../utils/expressErros.js");
const flash =  require("connect-flash");
const passport =  require("passport");
const { saveRedirectUrl } =  require("../middleware.js");


const passportlocalmongoose =  require("passport-local-mongoose");
const userController =  require("../controller/user.js");


router
.route("/signup")
.get((userController.getSignupForm))
.post(userController.Signup);


router
.route("/login")
.get(userController.getLoginForm)
.post(saveRedirectUrl 
, passport.authenticate('local', {
failureRedirect: '/login',
failureFlash: true 
}) , userController.Login);




  router.get("/logout",userController.Logout);
        


module.exports =  router;

// passport.authenticate('local', { failureRedirect: '/login' }),