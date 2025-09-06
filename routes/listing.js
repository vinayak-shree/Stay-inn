const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const  {listingSchema , reviewSchema} = require("../schema.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");

const multer = require('multer');
// upload folder  k andr save krwayega

const {storage} = require("../cloudConfig.js");

const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn , 
    upload.single('image'),
    wrapAsync(listingController.create)
);

router.get("/new", isLoggedIn, (listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.show))
.put(isLoggedIn,isOwner , upload.single('image'), validateListing, wrapAsync(listingController.update))
.delete(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.delete))





// // Index Route
// router.get("/",wrapAsync(listingController.index));

// New Route
// is authenticated --> stores user session information




// Show Route
// router.get("/:id" , (listingController.show));

// // Create Route
// router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.create));


// Edit route
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.edit));

//update route
// router.put("/:id",isLoggedIn,isOwner ,  validateListing, wrapAsync(listingController.update));

//Delete route
// Delete /listings/:id

// router.delete("/:id" ,isLoggedIn, isOwner, validateListing, wrapAsync(listingController.delete));


module.exports = router;