const express = require('express');
// parent id parameter agar use hot to mergeParams use krna h ------ /:id/ ----- 
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const Review = require('../models/reviews.js');
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/review.js")
// Reviews Route
/* id nhi pahunch paa rhi*/
router.post("/",isLoggedIn,validateReview , wrapAsync(reviewController.create));

// Delete Review Route

router.delete("/:reviewId" ,isLoggedIn , isReviewAuthor ,  wrapAsync(reviewController.delete));
 
module.exports = router;