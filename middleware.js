const Listing = require("./models/listing.js")
const Review = require("./models/reviews.js")
const ExpressError = require("./utils/ExpressError.js");
const  {listingSchema , reviewSchema} = require("./schema.js");
module.exports.isLoggedIn = (req , res , next)=>{       
    if(!req.isAuthenticated()){
        // information RedirectUrkl save
        // original url p aajayenge
        req.session.redirectUrl = req.originalUrl;
         req.flash("error" , "You must be logged in to Create Listing");
     return res.render("users/login");
   
    }
 next();
};


// to resolve the ovveride problem of reques

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
      let {id} = req.params;
   let listing = await Listing.findById(id);
 if (listing.owner.toString() !== res.locals.currUser._id.toString())
    {
        req.flash("error" , "You are not the owner" );
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// module.exports.validateListing = (req, res , next)=>{
//         let {error} = listingSchema.validate(req.body.listing);
//         if(error) 
//         {
//             let errMsg = error.details.map((el)=> el.message).join(",");
//             throw new ExpressError(400 , errMsg);
//         }
//             next();
//     };

// module.exports.validateListing = (req, res, next) => {
//     console.log(req.body);
//     if (!req.body.listing) {
//         throw new ExpressError(400, "Listing data is required");
//     }

//     const { error } = listingSchema.validate(req.body); 
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }
//     next();
// };

// module.exports.validateListing = (req, res, next) => {
//   const { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   }
//   next();
// };
module.exports.validateListing = (req, res, next) => {
    if(!req.body.listing)
    {
        throw console.log("Error in Fetching details");
        
    }
    const { error } = listingSchema.validate(req.body.listing); // ✅ validate entire body
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

module.exports.validateReview=(req , res , next) => {
    
         const { error } = reviewSchema.validate(req.body, { convert: true });
        if(error) 
        {
            let errMsg = error.details.map((el)=> el.message).join(",");
            throw new ExpressError(400 , errMsg);
        }
        else
        {
            next();
        }
    };
    
    module.exports.isReviewAuthor = async(req,res,next)=>{
      let { id , reviewId} = req.params;
   let review= await Review.findById(reviewId);

     if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

 if (review.author.toString() !== res.locals.currUser._id.toString())
    {
        req.flash("error" , "You are not the author of this review" );
        return res.redirect(`/listings/${id}`);
    }
    next();
};
