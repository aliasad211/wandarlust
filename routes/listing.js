const express = require("express");
const router = express.Router();
//require wrapAsyncfunction used for error handling
const wrapAsync = require("../util/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js")
const upload = multer({storage})

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListings));

//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(isLoggedIn, isOwner, upload.single("listing[image]"),validateListing,  wrapAsync(listingController.updateListings))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListings));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListings));


module.exports = router;





// Index route
// app.get("/listings",  async (req, res) => {
//     try {
//         const allListings = await Listing.find({});
//         res.render("listing/index", { allListings });
//     } catch (error) {
//         console.error("Error fetching listings:", error);
//         res.status(500).send("Server Error");
//     }
// });
//show route
// app.get("/listings/:id", async(req, res)=>{
//   let {id} = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listing/show.ejs", {listing});
// });
//create Route
// app.post("/listings", async (req, res, next)=>{
//     // let {title, description, image, price, country, location} = req.body;
//     try {
//         let listing = req.body.listing;
//         const newListing = new Listing(listing);
//         await newListing.save();
//         res.redirect("/listings");
//     }catch(err) {
//         next(err);
//     }
// });
//Edit Route
// app.get("/listings/:id/edit", async (req, res) => {
//     try {
//         let { id } = req.params;
//         const listing = await Listing.findById(id);
        
//         if (!listing) {
//             return res.status(404).send('Listing not found');
//         }
//         res.render("listing/edit.ejs", { listing });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });
//update route
// router.put("/:id", validateListing,  wrapAsync(async (req, res)=>{
//     if(req.body.listing) {
//         throw new ExpressError(400, "send valid data for listing");
//     }
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, {...req.body.listing});
//     res.redirect(`/listings/${id}`);
//     })
// );
//delete Route
// app.delete("/listings/:id", async(req, res)=>{
//     let {id} = req.params;
//     await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
// });

