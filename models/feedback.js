const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    comment: {
        type: String
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
    },

    created_at: {
        type: Date,
        default: Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

}); 

 const Feedback =  mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;