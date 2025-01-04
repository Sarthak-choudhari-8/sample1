const express =  require("express");
const router =  express.Router({mergeParams:true});

const wrapAsync = require("../utils/wrapAsync.js");
const expressError =  require("../utils/expressErros.js");

const Listing = require("../models/listing");
const Review = require("../models/feedback.js");
const {isLoggedIn ,isOwner} =  require("../middleware.js");
const listingController = require("../controller/listing.js");

const multer =  require("multer");
const {storage} = require("../cloudConfig.js");
const upload =  multer ({storage});


//index route 
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('url2'), wrapAsync( listingController.createlisting));






 //create new route
 router.get("/new",isLoggedIn,(listingController.createForm));  

 
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,upload.single('url2'),isOwner,wrapAsync(listingController.updateListing))
.delete( isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

    
    
   
 
    //edit route
    router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editListing));
    
  
    
    





    module.exports = router;