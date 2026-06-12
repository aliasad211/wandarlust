// Import the Listing model created in list.js
const Listing = require("../models/list.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listing/index", { allListings });
};

module.exports.renderNewForm = (req, res)=>{
    res.render("listing/new");
};

module.exports.showListings = async(req, res)=>{
    let {id} = req.params;
  const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
  if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  };
  res.render("listing/show.ejs", {listing, currentUser: req.user});
 };

//  module.exports.createListings = async (req, res, next)=>{
//       console.log("REQ.USER in createListings:", req.user);
//     console.log("REQ.BODY in createListings:", req.body);
//     console.log("REQ.FILE in createListings:", req.file); 
//     let response = await geocodingClient.forwardGeocode({
//         query: req.body.listing.location,
//         limit: 1,
//       })
//      .send();
        
//     let url = req.file.path;
//     let filename = req.file.filename;
//     let listing = req.body.listing;
//     const newListing = new Listing(listing);
//     newListing.owner = req.user._id;
//     newListing.image =  {url, filename};
//     newListing.geometry = response.body.features[0].geometry;
//     // let savedListing = await newListing.save();
//     // console.log(savedListing);
//     try {
//         let savedListing = await newListing.save();
//         console.log("Saved Listing:", savedListing); // Ye print karega agar save successful
//     } catch (e) {
//         console.log("Error saving listing:", e); // Ye error show karega agar save fail ho
//     }
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
// };

module.exports.createListings = async (req, res, next) => {
    console.log("REQ.USER in createListings:", req.user);
    console.log("REQ.BODY in createListings:", req.body);
    console.log("REQ.FILE in createListings:", req.file); 

    try {
        // Geocoding inside try
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        }).send();

        let url = req.file?.path;
        let filename = req.file?.filename;

        const newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = { url, filename };
        }

        if (response.body.features.length > 0) {
            newListing.geometry = response.body.features[0].geometry;
        }

        let savedListing = await newListing.save();
        console.log("Saved Listing:", savedListing);

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");

    } catch (e) {
        console.log("Error in createListings:", e);
        req.flash("error", "Listing creation failed");
        res.redirect("/listings/new");
    }
};


module.exports.editListings = async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
      };

      let originalImageurl = listing.image && listing.image.url 
        ? listing.image.url 
        : "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60";
      // Save the modified URL
      originalImageurl = originalImageurl.replace("/upload", "/upload/w_250/e_blur:50");
      res.render("listing/edit.ejs", { listing, originalImageurl });
      
};

module.exports.updateListings = async(req, res)=>{
     let {id} = req.params;
     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
     if(typeof req.file !== "undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {url, filename};
     await listing.save();
    }
   req.flash("success", "Listing Updated Successfully!");
   res.redirect(`/listings/${id}`);
};

module.exports.deleteListings = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};