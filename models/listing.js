const mongoose =  require("mongoose");
const Schema =  mongoose.Schema;
// const Review_Model =  require("./review");

const ListingSchema =  new Schema({

    title:String,

    description:String,

    image:{
        url:String,
    filename:String,
    

    },

    price:Number,

    location:String,
 
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Feedback"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },


});

const Listing = mongoose.model("Listing"  , ListingSchema);

module.exports = Listing;

