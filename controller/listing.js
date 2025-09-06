const Listing = require("../models/listing.js");


module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.show =  async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews" , populate:"author",}).populate("owner");  
    if(!listing)
    {
        req.flash("error" , "Listing you requested Does not Exist");
       return res.redirect("/listings");
    }
    console.log(listing);
    
    res.render("listings/show.ejs" , {listing ,  currUser: req.user});
};

module.exports.create = async (req, res) => {
    // let url = req.file.path;
    // let filename = req.file.filename;
    const { path: url, filename } = req.file;
    console.log(url);
    console.log(filename);
    
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename}; 
    await newListing.save();
    req.flash("success" , "Listing Created SuccessFully");
    res.redirect("/listings");
};

module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
       if(!listing){
        req.flash("error" ,"Listing You requested Does not exist");
        res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage.replace("/upload" , "/upload/h_300,w-250");
      res.render("listings/edit.ejs" , {listing , originalImage});

};


module.exports.update = async(req,res)=>{
 
    let {id} = req.params;
//    let listing = await Listing.findById(id);

    let listing = await Listing.findByIdAndUpdate(id , {
        ...req.body.listing
    });
// edit k time pr update krenege

    if(typeof req.file!= "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    await listing.save();
    }
         req.flash("success" , "Listing Updated SuccessFully");
    return res.redirect(`/listings/${id}`);
};

module.exports.delete = (async(req , res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted SuccessFully");
    console.log(deletedListing);
    res.redirect("/listings");
});

