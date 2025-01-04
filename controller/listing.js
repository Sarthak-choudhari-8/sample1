const Listing = require("../models/listing");
const Review =  require("../models/feedback");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

};

module.exports.createForm = (req, res) => {

    res.render("listings/new.ejs");

}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate('owner', { strictPopulate: false });
    if (!data) {
        req.flash("error", "listings does not exist ");
        res.redirect("/listings");
    }
    // console.log("this is whole listing ")
    // console.log(data.reviews); 
    // console.log("whole listing done ")
    res.render("listings/show.ejs", { data });
}

module.exports.createlisting = async (req, res) => {

let url =  req.file.path;
let filename = req.file.filename

    let { title, description, price, location, country ,url2 } = req.body;

    
    const new_user = new Listing({

        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
        owner: req.user._id
    });
new_user.image = {url,filename};
    // console.log(new_user);
    await new_user.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    // console.log("edit route activated");
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("listings/edit.ejs", { data });

};

module.exports.updateListing =  async(req,res)=>{


    let{id} = req.params;
    let {title, description ,  price , location , country,url2} =  req.body;
    
    let listing =  await Listing.findByIdAndUpdate({_id : id},{title:title,description:description,price:price,location:location,country:country});
    

if(typeof req.file != "undefined"){
    let url =  req.file.path;
    let filename = req.file.filename
    listing.image = {url ,filename}
    await listing.save(); 
}

    req.flash("success","listing updated ")
    res.redirect("/listings");
    
    };

    module.exports.deleteListing = async(req,res)=>{
        let {id} =  req.params ;
        let listing = await Listing.findById(id);
    await Review.deleteMany({_id : {$in : listing.reviews}});
    
        await Listing.findByIdAndDelete(id);
        req.flash("success"," listing deleted ");
    
            res.redirect("/listings");
        };