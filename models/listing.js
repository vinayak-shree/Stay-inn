const mongoose = require('mongoose');
const Review = require('./reviews.js');
// const User = require('./user.js');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{ type:String,
        required:true,
    },
    description : String,
 image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
},
    price : Number,
    // guests: Number,
    location : String,
    country : String,
    reviews : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    // refer user.js
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category:{
      type: String,
      enum: ["mountains" , "deserts" , " farms" , "arctic"],
    }
});

listingSchema.post("findOneAndDelete" , async(listing)=>{

  if(listing){

    await Review.deleteMany({_id:{$in: listing.reviews}});
}
  });

const Listing = mongoose.model("Listing" , listingSchema);
// To Export listing in app.js
module.exports = Listing;