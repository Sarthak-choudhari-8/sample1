const mongoose =  require("mongoose");
const Review =  require("../models/feedback.js");
const Listing =  require("../models/listing.js");
let initData =  require("./data.js");



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



initDB = async () => {
    await Listing.deleteMany({});

    initData = initData.map((obj) => ({
        ...obj,owner:"664b97cd7ef5917645f82f18",    }));
        
    await Listing.insertMany(initData);
    console.log("successful listings ...");
} 

 initDB();




//  result =  async () =>{
//    console.log("started");
//    await Review.deleteMany({}).then((res)=>{
//     console.log(res);
//    })
// console.log("done");
// }


// result();

//  result2 =  async () =>{
//    console.log("started");
//    await Listing.findOne({_id:'6645a28836c6f54047f762f6'}).populate('reviews').then((res)=>{
//     console.log(res);
//    })
// console.log("done");
// }



// result2();

// result3 =  async () =>{
//     console.log("started");
//     await Listing.find({_id:'6645a28836c6f54047f762f6'}).then((res)=>{
//      console.log(res);
//     })
//  console.log("done");
//  }
 
 
//  result3();
 

// new ObjectId('6645a59403c5dece60959092')
// new ObjectId('6645af87b89e763c25fd275e')
// new ObjectId('6645b01f022c5b829882f191')