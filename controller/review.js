const Listing = require("../models/listing");
const Review =  require("../models/feedback");
// const User =  require("./models/user.js");


module.exports.addReview =  async (req,res)=>{
    console.log("review post route activated ");
let listing =  await Listing.findById(req.params.id);
let newReview =  new Review (req.body.review);
newReview.author =  req.user._id;
listing.reviews.push(newReview);
// console.log(newReview);
await newReview.save();
await listing.save();

req.flash("success","New review created")
res.redirect(`/listings/${req.params.id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let {id , reviewId} =  req.params;
    
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    ;
    req.flash("success","review deleted ")
    res.redirect(  `/listings/${id}`);
    }