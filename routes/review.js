const express =  require("express");
const router =  express.Router({mergeParams :true});

const wrapAsync = require("../utils/wrapAsync.js");
const expressError =  require("../utils/expressErros.js");

const Listing = require("../models/listing");
const Review = require("../models/feedback.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");

const reviewController = require("../controller/review.js");


router.post("/", isLoggedIn ,wrapAsync(reviewController.addReview));


router.delete("/:reviewId" , isLoggedIn,isAuthor,wrapAsync (reviewController.deleteReview));

module.exports =  router;
