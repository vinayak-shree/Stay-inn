const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js")
 
module.exports.create = (async(req,res)=>{
    console.log(req.params.id);
    
 let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    
    // author association for every new review  
    await newReview.save();
    listing.reviews.push(newReview._id);
 
   await listing.save();
       req.flash("success" , "Review Created");
 res.redirect(`/listings/${listing._id}`);
});


module.exports.delete = (async(req , res)=>{

    let {id , reviewId} = req.params;
     /* review k andr jaake delete krne k liye*/
   await Listing.findByIdAndUpdate(id , {$pull:{reviews: reviewId}});
     
   await Review.findByIdAndDelete(reviewId);
   req.flash("success" , "Review Deleted");
    res.redirect(`/listings/${id}`);
});