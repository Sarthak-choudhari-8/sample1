const mongoose =  require("mongoose");
const Schema =  mongoose.Schema;
const passportLocalMongoose =  require("passport-local-mongoose");



const userSchema = new Schema({
email:{
    type:String,
    required:true
}


})
userSchema.plugin(passportLocalMongoose);
// userSchema.methods.validPassword = function( pwd ) {
//     // EXAMPLE CODE!
//     return ( this.password === pwd );
// };

const User =   mongoose.model("User",userSchema);

module.exports=  User;